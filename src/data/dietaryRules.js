export const ALLERGENS = [
  { id: "peanut", label: "Peanut", zh: "花生", terms: ["peanut", "peanuts", "花生"] },
  { id: "tree_nut", label: "Tree nuts", zh: "堅果", terms: ["almond", "cashew", "walnut", "hazelnut", "tree nut", "堅果", "杏仁", "腰果", "核桃"] },
  { id: "shellfish", label: "Shellfish", zh: "甲殼類海鮮", terms: ["shrimp", "prawn", "crab", "lobster", "oyster", "clam", "shellfish", "蝦", "蟹", "蠔", "蛤"] },
  { id: "fish", label: "Fish", zh: "魚類", terms: ["fish", "salmon", "tuna", "anchovy", "魚", "鮭魚", "鮪魚"] },
  { id: "milk", label: "Milk / dairy", zh: "奶類", terms: ["milk", "cream", "cheese", "butter", "dairy", "奶", "牛奶", "起司", "乳酪", "奶油"] },
  { id: "egg", label: "Egg", zh: "蛋", terms: ["egg", "mayonnaise", "蛋", "雞蛋", "美乃滋"] },
  { id: "soy", label: "Soy", zh: "大豆", terms: ["soy", "soy sauce", "tofu", "miso", "edamame", "大豆", "豆腐", "醬油", "味噌"] },
  { id: "wheat", label: "Wheat / gluten", zh: "小麥 / 麩質", terms: ["wheat", "gluten", "flour", "noodle", "bread", "小麥", "麵粉", "麵", "麩質"] },
  { id: "sesame", label: "Sesame", zh: "芝麻", terms: ["sesame", "sesame oil", "sesame paste", "芝麻", "麻油", "芝麻醬"] },
];

export const DIETARY = [
  { id: "vegetarian", label: "Vegetarian", zh: "素食", hard: ["pork", "beef", "chicken", "fish", "shrimp", "pork belly", "ground pork"], soft: ["lard", "stock"] },
  { id: "vegan", label: "Vegan", zh: "全素", hard: ["pork", "beef", "chicken", "fish", "shrimp", "egg", "milk", "butter", "cheese"], soft: ["honey", "stock"] },
  { id: "pork_free", label: "Pork-free", zh: "不吃豬肉", hard: ["pork", "pork belly", "ground pork", "lard", "豬", "豬肉", "豬油"] },
  { id: "beef_free", label: "Beef-free", zh: "不吃牛肉", hard: ["beef", "牛肉"] },
  { id: "seafood_free", label: "Seafood-free", zh: "不吃海鮮", hard: ["fish", "shrimp", "crab", "oyster", "clam", "魚", "蝦", "蟹"] },
  { id: "alcohol_free", label: "Alcohol-free", zh: "不含酒精", hard: ["wine", "beer", "shaoxing wine", "rice wine", "紹興酒", "米酒"] },
  { id: "halal", label: "Halal", zh: "清真", hard: ["pork", "pork belly", "lard", "wine", "shaoxing wine"], soft: ["non-halal meat", "stock"] },
  { id: "kosher", label: "Kosher", zh: "猶太潔食", hard: ["pork", "shellfish", "shrimp", "crab"], soft: ["mixed dairy and meat", "non-kosher kitchen"] },
  { id: "buddhist", label: "Buddhist vegetarian", zh: "佛教素", hard: ["pork", "beef", "chicken", "fish", "shrimp"], soft: ["garlic", "scallion", "onion", "chive"] },
];

export const CONDITIONS = [
  { id: "none", label: "None", zh: "無" },
  { id: "cardiovascular", label: "Cardiovascular / hypertension", zh: "心血管或高血壓", hard: [], soft: ["soy sauce", "salt", "pickled", "fried", "pork belly", "bacon", "high sodium"] },
  { id: "diabetes", label: "Diabetes", zh: "糖尿病", hard: [], soft: ["sugar", "rock sugar", "sweet sauce", "dessert", "white rice", "noodle"] },
  { id: "kidney", label: "Kidney disease", zh: "腎臟病", hard: [], soft: ["high sodium", "soy sauce", "salt", "processed meat"] },
  { id: "weight", label: "Weight management", zh: "體重管理", hard: [], soft: ["fried", "pork belly", "cream", "sugar", "oil"] },
];

export const SOURCE_LABELS = {
  allergen: "FDA Big 9 allergen guidance",
  condition: "WHO healthy diet guidance + Taiwan MOHW chronic disease diet guidance",
  dietary: "Profile dietary rule",
  llm: "LLM inference for ambiguous ingredients",
};
