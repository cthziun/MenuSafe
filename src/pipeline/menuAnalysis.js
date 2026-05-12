import { ALLERGENS, CONDITIONS, DIETARY, SOURCE_LABELS } from "../data/dietaryRules";
import { MENU_KNOWLEDGE_BASE } from "../data/menuKnowledgeBase";

function normalize(value) {
  return String(value || "").trim().toLowerCase();
}

function containsTerm(text, term) {
  return normalize(text).includes(normalize(term));
}

function matchAny(ingredients, terms) {
  const text = ingredients.join(" | ");
  return terms.filter((term) => containsTerm(text, term));
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function getRuleTerms() {
  return unique([
    ...ALLERGENS.flatMap((item) => item.terms || []),
    ...DIETARY.flatMap((item) => [...(item.hard || []), ...(item.soft || [])]),
    ...CONDITIONS.flatMap((item) => [...(item.hard || []), ...(item.soft || [])]),
  ]).sort((a, b) => b.length - a.length);
}

function cleanOcrLine(line) {
  return String(line || "")
    .replace(/\s+/g, " ")
    .replace(/[.$]*\b(?:nt|twd|usd)?\s*\$?\d+(?:[.,]\d{1,2})?\b\s*$/i, "")
    .trim();
}

function parseOcrMenu(rawText) {
  const ruleTerms = getRuleTerms();
  const lines = String(rawText || "")
    .split(/\n+/)
    .map(cleanOcrLine)
    .filter((line) => line.length >= 3)
    .filter((line) => !/^(menu|restaurant|subtotal|total|service|tax)$/i.test(line));

  return lines.slice(0, 20).map((line, index) => {
    const [namePart, ingredientPart] = line.split(/\s*[:：-]\s*/, 2);
    const candidateText = ingredientPart || line;
    const detectedIngredients = ruleTerms.filter((term) => containsTerm(candidateText, term));

    return {
      id: `ocr_${index}_${line.toLowerCase().replace(/[^a-z0-9]+/g, "_").slice(0, 24)}`,
      name: cleanOcrLine(namePart) || `Menu item ${index + 1}`,
      localName: cleanOcrLine(namePart) || `Menu item ${index + 1}`,
      mustTry: false,
      ingredients: detectedIngredients.length ? detectedIngredients : [candidateText],
      description: line,
      fromOcr: true,
      needsStaffConfirmation: detectedIngredients.length === 0 || !ingredientPart,
    };
  });
}

function normalizeStructuredDishes(dishes) {
  if (!Array.isArray(dishes)) return [];

  return dishes
    .map((dish, index) => {
      const name = dish.name || dish.english_name || `Menu item ${index + 1}`;
      const ingredients = unique([
        ...(Array.isArray(dish.visible_ingredients) ? dish.visible_ingredients : []),
        ...(Array.isArray(dish.likely_ingredients) ? dish.likely_ingredients : []),
        ...(Array.isArray(dish.allergy_risks) ? dish.allergy_risks : []),
      ]).map((value) => String(value).trim()).filter(Boolean);

      return {
        id: `vision_${index}_${String(name).toLowerCase().replace(/[^a-z0-9]+/g, "_").slice(0, 24)}`,
        name: dish.english_name || name,
        localName: name,
        mustTry: false,
        ingredients: ingredients.length ? ingredients : ["ingredients not visible"],
        description: [dish.category, dish.price].filter(Boolean).join(" | "),
        fromVision: true,
        uncertaintyNotes: Array.isArray(dish.uncertainty_notes) ? dish.uncertainty_notes : [],
        needsStaffConfirmation: ingredients.length === 0 || Boolean(dish.uncertainty_notes?.length),
      };
    })
    .filter((dish) => dish.localName.trim());
}

function inferAmbiguousRisk(dish, profile) {
  const ingredients = dish.ingredients.map(normalize);
  const hasAmbiguousIngredient = ingredients.some((ingredient) =>
    ["secret sauce", "house sauce", "stock", "broth", "marinade", "chef"].some((term) => ingredient.includes(term))
  );

  if (!hasAmbiguousIngredient) return null;

  const possibleRisks = [];
  if (profile.allergens.includes("peanut") || profile.allergens.includes("tree_nut")) {
    possibleRisks.push("house sauces may use peanut or nut paste");
  }
  if (profile.allergens.includes("soy") || profile.dietary.includes("halal") || profile.dietary.includes("alcohol_free")) {
    possibleRisks.push("secret sauces in Taiwan commonly include soy sauce or cooking wine");
  }
  if (profile.condition !== "none") {
    possibleRisks.push("sauce sodium, sugar, and oil levels are not visible from the menu");
  }

  return {
    layer: 2,
    confidence: possibleRisks.length ? 0.62 : 0.55,
    severity: "soft",
    ingredient: "secret sauce",
    source: SOURCE_LABELS.llm,
    reason: possibleRisks.length
      ? possibleRisks.join("; ")
      : "the menu does not disclose preparation details, so staff confirmation is needed",
  };
}

function profileSeverity(profile, defaultSeverity = "hard") {
  return profile.severity === "soft" ? "soft" : defaultSeverity;
}

export function extractMenuFromOcr(rawText, structuredDishes = []) {
  const visionDishes = normalizeStructuredDishes(structuredDishes);
  if (visionDishes.length) return visionDishes;

  const text = normalize(rawText);
  if (!text) return MENU_KNOWLEDGE_BASE;

  const matchedDishes = MENU_KNOWLEDGE_BASE.filter((dish) => {
    const dishNames = [dish.id, dish.name, dish.localName].map(normalize);
    return dishNames.some((name) => text.includes(name));
  });

  return matchedDishes.length ? matchedDishes : parseOcrMenu(rawText);
}

export function analyzeDish(dish, profile) {
  const findings = [];

  profile.allergens.forEach((id) => {
    const allergen = ALLERGENS.find((item) => item.id === id);
    if (!allergen) return;
    matchAny(dish.ingredients, allergen.terms).forEach((ingredient) => {
      findings.push({
        layer: 1,
        confidence: 0.96,
        severity: "hard",
        ingredient,
        source: SOURCE_LABELS.allergen,
        reason: `${allergen.label} is in your allergen profile.`,
      });
    });
  });

  if (profile.customAllergens.trim()) {
    profile.customAllergens
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean)
      .forEach((term) => {
        if (matchAny(dish.ingredients, [term]).length) {
          findings.push({
            layer: 1,
            confidence: 0.93,
            severity: "hard",
            ingredient: term,
            source: SOURCE_LABELS.allergen,
            reason: `${term} matches a custom allergy you entered.`,
          });
        }
      });
  }

  profile.dietary.forEach((id) => {
    const rule = DIETARY.find((item) => item.id === id);
    if (!rule) return;
    matchAny(dish.ingredients, rule.hard || []).forEach((ingredient) => {
      findings.push({
        layer: 1,
        confidence: 0.94,
        severity: profileSeverity(profile),
        ingredient,
        source: SOURCE_LABELS.dietary,
        reason: `${ingredient} conflicts with ${rule.label}.`,
      });
    });
    matchAny(dish.ingredients, rule.soft || []).forEach((ingredient) => {
      findings.push({
        layer: 1,
        confidence: 0.9,
        severity: "soft",
        ingredient,
        source: SOURCE_LABELS.dietary,
        reason: `${ingredient} may conflict with ${rule.label}; confirm preparation.`,
      });
    });
  });

  const condition = CONDITIONS.find((item) => item.id === profile.condition);
  if (condition && condition.id !== "none") {
    matchAny(dish.ingredients, condition.soft || []).forEach((ingredient) => {
      findings.push({
        layer: 1,
        confidence: 0.91,
        severity: "soft",
        ingredient,
        source: SOURCE_LABELS.condition,
        reason: `${ingredient} may be a concern for ${condition.label}.`,
      });
    });
  }

  const llmFinding = inferAmbiguousRisk(dish, profile);
  if (llmFinding) findings.push(llmFinding);

  const hardFindings = findings.filter((finding) => finding.severity === "hard");
  const softFindings = findings.filter((finding) => finding.severity === "soft");
  const llmFindings = findings.filter((finding) => finding.layer === 2);

  if (hardFindings.length) {
    return {
      ...dish,
      verdict: "red",
      verdictLabel: "Avoid",
      confidence: Math.round(Math.max(...hardFindings.map((finding) => finding.confidence)) * 100),
      source: "Layer 1 rule-based",
      findings,
      summary: hardFindings[0].reason,
      recommendation: "Do not order unless staff can guarantee removal and cross-contact safety.",
    };
  }

  if (softFindings.length || llmFindings.length) {
    const topFinding = [...softFindings, ...llmFindings].sort((a, b) => b.confidence - a.confidence)[0];
    return {
      ...dish,
      verdict: "yellow",
      verdictLabel: "Ask first",
      confidence: Math.round((topFinding?.confidence || 0.6) * 100),
      source: llmFindings.length ? "Layer 2 AI inference" : "Layer 1 rule-based caution",
      findings,
      summary: topFinding?.reason || "Some ingredients or preparation details are uncertain.",
      recommendation: "Ask staff to confirm ingredients, sauce, oil, stock, and preparation before ordering.",
    };
  }

  if (dish.needsStaffConfirmation) {
    return {
      ...dish,
      verdict: "yellow",
      verdictLabel: "Ask first",
      confidence: dish.fromVision ? 68 : 58,
      source: dish.fromVision ? "Gemini vision extraction" : "OCR text analysis",
      findings: [],
      summary: dish.fromVision
        ? "The menu image suggests this dish, but some ingredients or preparation details remain uncertain."
        : "The photo text did not expose enough ingredients for a confident safety check.",
      recommendation: dish.uncertaintyNotes?.length
        ? `Ask staff to confirm: ${dish.uncertaintyNotes.join("; ")}.`
        : "Ask staff to confirm ingredients, sauce, oil, stock, and preparation before ordering.",
    };
  }

  return {
    ...dish,
    verdict: "green",
    verdictLabel: "Likely safe",
    confidence: 92,
    source: "Layer 1 rule-based",
    findings: [],
    summary: "No restricted ingredients found in the structured knowledge base.",
    recommendation: "Good candidate based on the profile, while normal kitchen cross-contact risk still applies.",
  };
}

export function analyzeMenu(profile, rawText, structuredDishes = []) {
  return extractMenuFromOcr(rawText, structuredDishes).map((dish) => analyzeDish(dish, profile));
}
