import { ALLERGENS, CONDITIONS, DIETARY } from "../data/dietaryRules";

export const LOCAL_STORAGE_KEY = "menusafe-health-profile-v1";

export function makeDefaultProfile() {
  return {
    allergens: [],
    customAllergens: "",
    dietary: [],
    condition: "none",
    conditionNote: "",
    severity: "hard",
  };
}

export function buildProfileSummary(profile) {
  const items = [];
  profile.allergens.forEach((id) => {
    const item = ALLERGENS.find((allergen) => allergen.id === id);
    if (item) items.push(`${item.label} allergy`);
  });
  if (profile.customAllergens.trim()) items.push(`${profile.customAllergens.trim()} allergy`);
  profile.dietary.forEach((id) => {
    const item = DIETARY.find((rule) => rule.id === id);
    if (item) items.push(item.label);
  });
  const condition = CONDITIONS.find((item) => item.id === profile.condition);
  if (condition && condition.id !== "none") items.push(condition.label);
  return items.length ? items.join(" · ") : "No restrictions set";
}

export function buildProfileNotice(profile) {
  const notices = [];
  profile.allergens.forEach((id) => {
    const item = ALLERGENS.find((allergen) => allergen.id === id);
    if (item) notices.push(`我對${item.zh}過敏。`);
  });
  if (profile.customAllergens.trim()) {
    notices.push(`我對${profile.customAllergens.trim()}過敏。`);
  }
  profile.dietary.forEach((id) => {
    const item = DIETARY.find((rule) => rule.id === id);
    if (item) notices.push(`我有${item.zh}飲食需求。`);
  });
  const condition = CONDITIONS.find((item) => item.id === profile.condition);
  if (condition && condition.id !== "none") {
    notices.push(`我有${condition.zh}，需要避免高風險食材或調味。`);
  }
  if (profile.conditionNote.trim()) {
    notices.push(`其他注意事項：${profile.conditionNote.trim()}。`);
  }
  return notices.length ? notices : ["目前沒有特別飲食限制。"];
}
