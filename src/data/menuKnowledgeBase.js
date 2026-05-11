export const MENU_KNOWLEDGE_BASE = [
  {
    id: "kung_pao",
    name: "Kung Pao Chicken",
    localName: "宮保雞丁",
    mustTry: true,
    ingredients: ["chicken", "peanuts", "dried chili", "soy sauce", "garlic", "sugar"],
    description: "Classic stir-fry with peanuts and a soy-based sauce.",
  },
  {
    id: "steamed_fish",
    name: "Steamed Fish",
    localName: "清蒸鮮魚",
    mustTry: true,
    ingredients: ["fish", "ginger", "scallion", "soy sauce", "sesame oil"],
    description: "Whole fish steamed with aromatics and a light soy sauce.",
  },
  {
    id: "mapo_tofu",
    name: "Mapo Tofu",
    localName: "麻婆豆腐",
    mustTry: true,
    ingredients: ["tofu", "ground pork", "doubanjiang", "soy sauce", "chili oil", "sichuan pepper"],
    description: "Spicy tofu dish commonly made with ground pork and fermented bean paste.",
  },
  {
    id: "seasonal_veg",
    name: "Stir-fried Seasonal Vegetables",
    localName: "清炒時蔬",
    mustTry: false,
    ingredients: ["seasonal vegetables", "garlic", "salt", "vegetable oil"],
    description: "Simple vegetable dish, usually cooked quickly in a wok.",
  },
  {
    id: "braised_pork",
    name: "Red-braised Pork",
    localName: "紅燒肉",
    mustTry: false,
    ingredients: ["pork belly", "soy sauce", "rock sugar", "shaoxing wine", "star anise"],
    description: "Rich braised pork belly with sugar, soy sauce, and cooking wine.",
  },
  {
    id: "secret_noodles",
    name: "Chef's Secret Sauce Noodles",
    localName: "主廚秘製乾麵",
    mustTry: true,
    ingredients: ["noodle", "secret sauce", "scallion", "sesame paste"],
    description: "Noodles served with a house sauce. Exact sauce ingredients are not listed.",
  },
];

export const DEMO_OCR_TEXT = MENU_KNOWLEDGE_BASE
  .map((dish) => `${dish.localName} / ${dish.name}: ${dish.ingredients.join(", ")}`)
  .join("\n");
