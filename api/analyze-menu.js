const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = (process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || "").trim();
  if (!apiKey) {
    return response.status(500).json({ error: "Missing GEMINI_API_KEY environment variable." });
  }
  if (apiKey.includes("=") || apiKey.includes("your_") || apiKey.length < 20) {
    return response.status(500).json({
      error: "GEMINI_API_KEY looks invalid. In Vercel, set only the key value, not GEMINI_API_KEY=your_key."
    });
  }

  try {
    const body = request.body || {};
    const parts = await buildGeminiParts(body);
    if (parts.length < 2) {
      return response.status(400).json({ error: "Provide menu text, an image/PDF file, or a URL." });
    }

    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey
        },
        body: JSON.stringify({
          contents: [{ role: "user", parts }],
          generationConfig: {
            responseMimeType: "application/json",
            temperature: 0.1
          }
        })
      }
    );

    const data = await geminiResponse.json();
    if (!geminiResponse.ok) {
      return response.status(502).json({ error: data.error?.message || "Gemini could not analyze the menu." });
    }

    const text = data.candidates?.[0]?.content?.parts?.map((part) => part.text || "").join("\n") || "";
    const parsed = extractJson(text);
    const dishes = Array.isArray(parsed?.dishes) ? parsed.dishes : [];

    return response.status(200).json({
      dishes: normalizeDishes(dishes),
      raw: text
    });
  } catch (error) {
    return response.status(500).json({ error: error.message || "Menu import failed." });
  }
}

async function buildGeminiParts(body) {
  const parts = [
    {
      text: `Extract structured restaurant menu data for a dietary-risk app.

Return JSON only with this shape:
{
  "dishes": [
    {
      "category": "string or empty",
      "name": "dish name as shown or translated",
      "description": "short menu description or empty",
      "price": "visible price or empty",
      "visible_ingredients": ["ingredients explicitly visible in the menu"],
      "likely_ingredients": ["common likely ingredients only when strongly implied"],
      "allergy_risks": ["risk clues such as peanut, dairy, egg, soy, wheat, sesame, shellfish, fish, pork, beef, alcohol, gluten"],
      "uncertainty_notes": ["what should be confirmed with staff"],
      "confidence": "high, medium, or low"
    }
  ]
}

Rules:
- Do not invent dishes.
- Do not treat page headings, slogans, phone/browser UI, or decorative text as dishes.
- If ingredients are uncertain, put them in likely_ingredients or uncertainty_notes.
- Keep dish names concise and readable in English when possible.
- If the image/PDF/text is unclear, return an empty dishes array.`
    }
  ];

  if (body.url) {
    const pageText = await fetchMenuUrl(body.url);
    parts.push({ text: `Menu URL: ${body.url}\n\nPage text:\n${pageText}` });
    return parts;
  }

  if (body.text) {
    parts.push({ text: `Menu text:\n${String(body.text).slice(0, 25000)}` });
  }

  if (body.file?.dataUrl && body.file?.mimeType?.startsWith("image/")) {
    const base64 = String(body.file.dataUrl).split(",")[1];
    if (!base64) throw new Error("Invalid image data.");
    parts.push({
      inline_data: {
        mime_type: body.file.mimeType,
        data: base64
      }
    });
  }

  if (body.file?.base64 && body.file?.mimeType === "application/pdf") {
    parts.push({
      inline_data: {
        mime_type: "application/pdf",
        data: body.file.base64
      }
    });
  }

  return parts;
}

async function fetchMenuUrl(url) {
  let parsedUrl;
  try {
    parsedUrl = new URL(url);
  } catch {
    throw new Error("Enter a valid menu URL.");
  }

  if (!["http:", "https:"].includes(parsedUrl.protocol)) {
    throw new Error("Menu URL must start with http or https.");
  }

  const result = await fetch(parsedUrl.toString(), {
    headers: { "User-Agent": "MenuSafe menu importer" }
  });

  if (!result.ok) {
    throw new Error(`Could not fetch menu URL (${result.status}).`);
  }

  const html = await result.text();
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 30000);
}

function normalizeDishes(dishes) {
  return dishes
    .filter((dish) => dish?.name?.trim())
    .map((dish) => {
      const visibleIngredients = cleanList(dish.visible_ingredients);
      const likelyIngredients = cleanList(dish.likely_ingredients);
      const allergyRisks = cleanList(dish.allergy_risks);
      const uncertaintyNotes = cleanList(dish.uncertainty_notes);
      const subtitleParts = [
        dish.description,
        dish.category,
        dish.price,
        ...visibleIngredients,
        ...likelyIngredients,
        ...allergyRisks,
        ...uncertaintyNotes
      ].filter(Boolean);

      return {
        id: cryptoId(),
        name: String(dish.name).trim(),
        subtitle: subtitleParts.join(" | "),
        visibleIngredients,
        likelyIngredients,
        allergyRisks,
        uncertaintyNotes,
        source: "gemini-import",
        importConfidence: dish.confidence || "medium"
      };
    });
}

function cleanList(value) {
  return Array.isArray(value) ? value.map((item) => String(item).trim()).filter(Boolean) : [];
}

function extractJson(text) {
  const trimmed = String(text || "").trim();
  if (!trimmed) return null;
  try {
    return JSON.parse(trimmed);
  } catch {
    const match = trimmed.match(/\{[\s\S]*\}/);
    if (!match) return null;
    return JSON.parse(match[0]);
  }
}

function cryptoId() {
  return Math.random().toString(36).slice(2, 10);
}
