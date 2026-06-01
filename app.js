const severities = [
  { id: "critical", label: "Critical", color: "#f12f38" },
  { id: "avoid", label: "Avoid", color: "#ff7a1a" },
  { id: "caution", label: "Caution", color: "#f5b800" },
  { id: "flexible", label: "Flexible", color: "#4c91ff" },
  { id: "ignore", label: "Ignore", color: "#8f93ae" }
];

const areas = [
  {
    id: "medical",
    icon: "S",
    title: "Safety & Medical",
    copy: "Allergies, intolerances, medical conditions",
    groups: [
      {
        title: "Allergies",
        options: [
          { id: "peanuts", label: "Peanuts", copy: "Peanut, peanut oil, groundnut, satay, peanut butter.", severity: "critical", ingredients: ["Peanut", "Peanut Oil", "Groundnut", "Satay Sauce", "Peanut Butter"] },
          { id: "tree-nuts", label: "Tree Nuts", copy: "Almond, walnut, cashew, pistachio, and other tree nuts.", severity: "critical", ingredients: ["Almond", "Walnut", "Cashew", "Pistachio", "Hazelnut", "Pecan", "Macadamia", "Brazil Nut", "Pine Nut", "Chestnut"] },
          { id: "shellfish-crustaceans", label: "Shellfish - Crustaceans", copy: "Shrimp, prawn, crab, lobster, crayfish, krill.", severity: "critical", ingredients: ["Shrimp", "Prawn", "Crab", "Lobster", "Crayfish", "Krill"] },
          { id: "mollusks", label: "Shellfish - Mollusks", copy: "Oyster, mussel, clam, scallop, squid, octopus, cuttlefish, snail.", severity: "critical", ingredients: ["Oyster", "Mussel", "Clam", "Scallop", "Squid", "Octopus", "Cuttlefish", "Snail"] },
          { id: "fish", label: "Fish", copy: "Salmon, tuna, cod, anchovy, sardine, mackerel, bonito, eel.", severity: "critical", ingredients: ["Salmon", "Tuna", "Cod", "Anchovy", "Sardine", "Mackerel", "Bonito", "Eel"] },
          { id: "dairy", label: "Dairy", copy: "Milk, cream, cheese, butter, yogurt, whey, casein, ghee.", severity: "avoid", ingredients: ["Milk", "Cream", "Cheese", "Butter", "Yogurt", "Whey", "Casein", "Ghee"] },
          { id: "egg", label: "Egg", copy: "Egg white, egg yolk, mayonnaise, meringue.", severity: "critical", ingredients: ["Egg", "Egg White", "Egg Yolk", "Mayonnaise", "Meringue"] },
          { id: "soy", label: "Soy", copy: "Soybean, soy sauce, tofu, tempeh, miso, edamame.", severity: "critical", ingredients: ["Soybean", "Soy", "Soy Sauce", "Tofu", "Tempeh", "Miso", "Edamame", "Soy Lecithin"] },
          { id: "wheat", label: "Wheat", copy: "Wheat flour, semolina, couscous, bulgur, seitan.", severity: "critical", ingredients: ["Wheat Flour", "Semolina", "Couscous", "Bulgur", "Seitan"] },
          { id: "gluten-allergy", label: "Gluten", copy: "Wheat, barley, rye, malt, brewer's yeast.", severity: "critical", ingredients: ["Wheat", "Barley", "Rye", "Malt", "Brewer's Yeast"] },
          { id: "sesame", label: "Sesame", copy: "Sesame seed, sesame oil, tahini.", severity: "critical", ingredients: ["Sesame Seed", "Sesame Oil", "Tahini"] },
          { id: "corn", label: "Corn", copy: "Corn syrup, corn starch, maize.", severity: "critical", ingredients: ["Corn Syrup", "Corn Starch", "Maize", "Corn"] },
          { id: "mustard", label: "Mustard", copy: "Mustard seed and Dijon mustard.", severity: "critical", ingredients: ["Mustard Seed", "Dijon Mustard", "Mustard"] },
          { id: "celery", label: "Celery", copy: "Celery stalk and celery root.", severity: "critical", ingredients: ["Celery Stalk", "Celery Root", "Celery"] },
          { id: "coconut", label: "Coconut", copy: "Coconut milk and coconut oil.", severity: "critical", ingredients: ["Coconut Milk", "Coconut Oil", "Coconut"] },
          { id: "sulfites", label: "Sulfites", copy: "Wine, dried fruits, vinegar-preserved foods.", severity: "critical", ingredients: ["Sulfites", "Wine", "Dried Fruits", "Vinegar-Preserved Foods"] },
          { id: "fruit-allergies", label: "Fruit Allergies", copy: "Kiwi, mango, banana, avocado, strawberry, peach.", severity: "critical", ingredients: ["Kiwi", "Mango", "Banana", "Avocado", "Strawberry", "Peach"] },
          { id: "legume-allergy", label: "Legumes", copy: "Chickpea, lentil, pea, lupin.", severity: "critical", ingredients: ["Chickpea", "Lentil", "Pea", "Lupin"] }
        ]
      },
      {
        title: "Intolerances",
        options: [
          { id: "lactose", label: "Lactose Intolerance", copy: "Milk, soft cheese, ice cream.", severity: "caution", ingredients: ["Milk", "Soft Cheese", "Ice Cream"] },
          { id: "gluten", label: "Gluten Sensitivity", copy: "Bread, pasta, soy sauce.", severity: "avoid", ingredients: ["Bread", "Pasta", "Soy Sauce", "Wheat", "Barley", "Rye"] },
          { id: "fodmap-vegetables", label: "High-FODMAP Vegetables", copy: "Onion, garlic, shallot, leek, cauliflower.", severity: "caution", ingredients: ["Onion", "Garlic", "Shallot", "Leek", "Cauliflower"] },
          { id: "fodmap-fruits", label: "High-FODMAP Fruits", copy: "Apple, pear, watermelon, mango.", severity: "caution", ingredients: ["Apple", "Pear", "Watermelon", "Mango"] },
          { id: "fodmap-legumes", label: "High-FODMAP Legumes", copy: "Beans and lentils.", severity: "caution", ingredients: ["Beans", "Lentils"] },
          { id: "histamine", label: "Histamine Sensitivity", copy: "Fermented foods, aged cheese, processed meat, vinegar, wine.", severity: "caution", ingredients: ["Fermented Foods", "Aged Cheese", "Processed Meat", "Vinegar", "Wine"] },
          { id: "msg", label: "MSG Sensitivity", copy: "MSG, flavor enhancers, soup base powders.", severity: "caution", ingredients: ["MSG", "Flavor Enhancers", "Soup Base Powders"] },
          { id: "caffeine", label: "Caffeine Sensitivity", copy: "Coffee, tea, matcha, energy drinks, chocolate.", severity: "caution", ingredients: ["Coffee", "Tea", "Matcha", "Energy Drinks", "Chocolate"] },
          { id: "alcohol-sensitivity", label: "Alcohol Sensitivity", copy: "Beer, wine, sake, cooking wine.", severity: "caution", ingredients: ["Beer", "Wine", "Sake", "Cooking Wine"] },
          { id: "artificial-sweeteners", label: "Artificial Sweeteners", copy: "Aspartame, sucralose, saccharin.", severity: "caution", ingredients: ["Aspartame", "Sucralose", "Saccharin"] }
        ]
      },
      {
        title: "Medical Conditions",
        options: [
          { id: "diabetes", label: "Diabetes", copy: "Refined sugar, syrup, sweetened drinks, white rice, high glycemic foods.", severity: "caution", ingredients: ["Refined Sugar", "Syrup", "Sweetened Drinks", "White Rice", "High Glycemic Foods"] },
          { id: "hypertension", label: "Hypertension", copy: "Salt, soy sauce, processed meat, pickled food.", severity: "caution", ingredients: ["Salt", "Soy Sauce", "Processed Meat", "Pickled Food"] },
          { id: "kidney-disease", label: "Kidney Disease", copy: "High potassium foods, banana, potato, spinach, processed cheese.", severity: "caution", ingredients: ["High Potassium Foods", "Banana", "Potato", "Spinach", "Processed Cheese"] },
          { id: "gout", label: "Gout", copy: "Organ meat, anchovy, sardine, beer, shellfish.", severity: "avoid", ingredients: ["Organ Meat", "Anchovy", "Sardine", "Beer", "Shellfish"] },
          { id: "gerd", label: "GERD / Acid Reflux", copy: "Chili, citrus, tomato, fried food, coffee.", severity: "caution", ingredients: ["Chili", "Citrus", "Tomato", "Fried Food", "Coffee"] },
          { id: "ibs", label: "IBS", copy: "Onion, garlic, beans, dairy.", severity: "caution", ingredients: ["Onion", "Garlic", "Beans", "Dairy"] },
          { id: "migraine", label: "Migraine Triggers", copy: "Chocolate, red wine, MSG, aged cheese.", severity: "caution", ingredients: ["Chocolate", "Red Wine", "MSG", "Aged Cheese"] },
          { id: "pregnancy", label: "Pregnancy Restrictions", copy: "Raw fish, unpasteurized cheese, high-mercury fish, alcohol.", severity: "avoid", ingredients: ["Raw Fish", "Unpasteurized Cheese", "High-Mercury Fish", "Alcohol"] },
          { id: "dysphagia", label: "Dysphagia", copy: "Needs soft foods, pureed foods, thickened liquids.", severity: "caution", ingredients: ["Hard Foods", "Dry Foods", "Thin Liquids", "Mixed Textures"] }
        ]
      }
    ]
  },
  {
    id: "religious",
    icon: "R",
    title: "Religious & Cultural",
    copy: "Religious rules and cultural practices",
    groups: [
      {
        title: "Religious Practice",
        options: [
          { id: "halal", label: "Halal", copy: "Pork, bacon, ham, lard, non-halal gelatin, alcohol, mirin, cooking wine.", severity: "avoid", ingredients: ["Pork", "Bacon", "Ham", "Lard", "Non-Halal Gelatin", "Alcohol", "Mirin", "Cooking Wine"] },
          { id: "kosher", label: "Kosher", copy: "Pork, shellfish, non-kosher seafood, mixing meat and dairy.", severity: "avoid", ingredients: ["Pork", "Shellfish", "Non-Kosher Seafood", "Meat and Dairy"] },
          { id: "hindu", label: "Hindu Restrictions", copy: "Beef, with possible egg, onion, or garlic avoidance.", severity: "avoid", ingredients: ["Beef", "Egg", "Onion", "Garlic"] },
          { id: "buddhist", label: "Buddhist Restrictions", copy: "Meat, garlic, onion, chives, leek.", severity: "avoid", ingredients: ["Meat", "Garlic", "Onion", "Chives", "Leek"] },
          { id: "jain", label: "Jain Restrictions", copy: "Root vegetables, potato, onion, garlic, carrot, beetroot, radish.", severity: "avoid", ingredients: ["Root Vegetables", "Potato", "Onion", "Garlic", "Carrot", "Beetroot", "Radish"] }
        ]
      },
      {
        title: "Cultural Restrictions",
        options: [
          { id: "no-pork", label: "No Pork", copy: "Pork belly, bacon, sausage, lard.", severity: "avoid", ingredients: ["Pork Belly", "Bacon", "Sausage", "Lard"] },
          { id: "no-beef", label: "No Beef", copy: "Beef, beef broth, gelatin.", severity: "avoid", ingredients: ["Beef", "Beef Broth", "Gelatin"] },
          { id: "no-raw-food", label: "No Raw Food", copy: "Sushi, tartare, rare meat.", severity: "avoid", ingredients: ["Sushi", "Tartare", "Rare Meat", "Raw Fish", "Raw Meat"] },
          { id: "tcm-heating", label: "TCM Heating Foods", copy: "Fried foods, lamb, chili, longan.", severity: "flexible", ingredients: ["Fried Foods", "Lamb", "Chili", "Longan"] },
          { id: "tcm-cooling", label: "TCM Cooling Foods", copy: "Watermelon, cucumber, herbal jelly.", severity: "flexible", ingredients: ["Watermelon", "Cucumber", "Herbal Jelly"] }
        ]
      }
    ]
  },
  {
    id: "lifestyle",
    icon: "L",
    title: "Lifestyle & Values",
    copy: "Dietary styles, ethics, and sustainability",
    groups: [
      {
        title: "Lifestyle",
        options: [
          { id: "vegetarian", label: "Vegetarian", copy: "Meat, poultry, fish.", severity: "avoid", ingredients: ["Meat", "Poultry", "Fish", "Beef", "Chicken", "Pork", "Salmon", "Shrimp"] },
          { id: "vegan", label: "Vegan", copy: "Meat, dairy, egg, honey, gelatin, fish sauce, oyster sauce.", severity: "avoid", ingredients: ["Meat", "Dairy", "Egg", "Honey", "Gelatin", "Fish Sauce", "Oyster Sauce"] },
          { id: "pescatarian", label: "Pescatarian", copy: "Beef, pork, chicken while allowing fish and seafood.", severity: "avoid", ingredients: ["Beef", "Pork", "Chicken"] }
        ]
      },
      {
        title: "Sustainable & Ethical",
        options: [
          { id: "sustainable-seafood", label: "Sustainable Seafood", copy: "Overfished tuna, shark fin, unsustainably farmed shrimp.", severity: "caution", ingredients: ["Overfished Tuna", "Shark Fin", "Unsustainably Farmed Shrimp"] },
          { id: "animal-welfare", label: "Animal Welfare", copy: "Prefer cage-free eggs, grass-fed beef, free-range poultry.", severity: "flexible", ingredients: ["Conventional Eggs", "Factory-Farmed Beef", "Factory-Farmed Poultry"] },
          { id: "environmental", label: "Environmental Concerns", copy: "Beef, palm oil, unsustainable seafood.", severity: "caution", ingredients: ["Beef", "Palm Oil", "Unsustainable Seafood"] },
          { id: "organic-natural", label: "Organic / Natural", copy: "Artificial preservatives, artificial coloring, GMO products, pesticide-heavy produce.", severity: "flexible", ingredients: ["Artificial Preservatives", "Artificial Coloring", "GMO Products", "Pesticide-Heavy Produce"] }
        ]
      }
    ]
  },
  {
    id: "fitness",
    icon: "F",
    title: "Fitness & Nutrition",
    copy: "Diet goals and nutritional priorities",
    groups: [
      {
        title: "Nutrition",
        options: [
          { id: "high-protein", label: "High Protein", copy: "Prefer chicken breast, egg, Greek yogurt, protein powder, tofu.", severity: "flexible", ingredients: ["Low Protein Dish"] },
          { id: "low-carb", label: "Low Carb", copy: "Rice, bread, pasta, sugar.", severity: "caution", ingredients: ["Rice", "Bread", "Pasta", "Sugar"] },
          { id: "keto", label: "Keto", copy: "Sugar, potato, rice, flour, fruit juice.", severity: "caution", ingredients: ["Sugar", "Potato", "Rice", "Flour", "Fruit Juice"] },
          { id: "paleo", label: "Paleo", copy: "Dairy, legumes, grains, processed foods.", severity: "caution", ingredients: ["Dairy", "Legumes", "Grains", "Processed Foods"] },
          { id: "low-fat", label: "Low Fat", copy: "Fried foods, butter, cream, fatty meat.", severity: "caution", ingredients: ["Fried Foods", "Butter", "Cream", "Fatty Meat"] },
          { id: "low-sodium", label: "Low Sodium", copy: "Soy sauce, pickles, instant noodles, processed foods.", severity: "caution", ingredients: ["Soy Sauce", "Pickles", "Instant Noodles", "Processed Foods"] },
          { id: "low-sugar", label: "Low Sugar", copy: "Soda, dessert, candy, syrup.", severity: "caution", ingredients: ["Soda", "Dessert", "Candy", "Syrup"] },
          { id: "clean-eating", label: "Clean Eating", copy: "Ultra-processed foods and artificial additives.", severity: "flexible", ingredients: ["Ultra-Processed Foods", "Artificial Additives"] }
        ]
      }
    ]
  },
  {
    id: "preferences",
    icon: "P",
    title: "Preferences",
    copy: "Taste, texture, smell, and other preferences",
    groups: [
      {
        title: "Taste",
        options: [
          { id: "spicy", label: "Spicy", copy: "Chili, Sichuan pepper, wasabi.", severity: "caution", ingredients: ["Chili", "Chili Oil", "Sichuan Pepper", "Wasabi"] },
          { id: "bitter", label: "Bitter", copy: "Bitter melon and dark chocolate.", severity: "flexible", ingredients: ["Bitter Melon", "Dark Chocolate"] },
          { id: "sour", label: "Sour", copy: "Vinegar and citrus.", severity: "flexible", ingredients: ["Vinegar", "Citrus"] },
          { id: "sweet", label: "Sweet", copy: "Syrup and dessert.", severity: "flexible", ingredients: ["Syrup", "Dessert"] },
          { id: "umami", label: "Umami", copy: "Mushroom, fish sauce, fermented products.", severity: "flexible", ingredients: ["Mushroom", "Fish Sauce", "Fermented Products"] }
        ]
      },
      {
        title: "Texture",
        options: [
          { id: "slimy", label: "Slimy", copy: "Okra, natto, sea cucumber.", severity: "flexible", ingredients: ["Okra", "Natto", "Sea Cucumber"] },
          { id: "mushy", label: "Mushy", copy: "Eggplant, avocado, overcooked vegetables.", severity: "flexible", ingredients: ["Eggplant", "Avocado", "Overcooked Vegetables"] },
          { id: "crunchy", label: "Crunchy", copy: "Nuts, crackers, raw carrots.", severity: "flexible", ingredients: ["Nuts", "Crackers", "Raw Carrots"] },
          { id: "chewy", label: "Chewy", copy: "Squid, tendon, mochi.", severity: "flexible", ingredients: ["Squid", "Tendon", "Mochi"] }
        ]
      },
      {
        title: "Aroma",
        options: [
          { id: "strong-smells", label: "Strong Smells", copy: "Durian, blue cheese, fermented tofu, natto.", severity: "flexible", ingredients: ["Durian", "Blue Cheese", "Fermented Tofu", "Natto"] },
          { id: "fishy-smells", label: "Fishy Smells", copy: "Anchovy and mackerel.", severity: "flexible", ingredients: ["Anchovy", "Mackerel"] },
          { id: "garlic-onion-smell", label: "Garlic / Onion Smell", copy: "Garlic, onion, chives.", severity: "flexible", ingredients: ["Garlic", "Onion", "Chives"] }
        ]
      },
      {
        title: "Ingredient Dislikes",
        options: [
          { id: "cilantro", label: "Cilantro", copy: "Cilantro garnish and coriander leaf.", severity: "flexible", ingredients: ["Cilantro", "Coriander Leaf"] },
          { id: "mushroom-dislike", label: "Mushroom", copy: "Mushroom flavor and texture.", severity: "flexible", ingredients: ["Mushroom", "Shiitake", "Truffle", "Porcini"] },
          { id: "raisin", label: "Raisin", copy: "Raisins and dried grape pieces.", severity: "flexible", ingredients: ["Raisin", "Raisins"] },
          { id: "olive", label: "Olive", copy: "Olives and olive-heavy dishes.", severity: "flexible", ingredients: ["Olive", "Olives"] },
          { id: "bell-pepper", label: "Bell Pepper", copy: "Bell peppers and capsicum.", severity: "flexible", ingredients: ["Bell Pepper", "Capsicum"] },
          { id: "tomato-dislike", label: "Tomato", copy: "Tomato and tomato-heavy sauces.", severity: "flexible", ingredients: ["Tomato", "Tomato Sauce"] },
          { id: "pickles-dislike", label: "Pickles", copy: "Pickles and pickled vegetables.", severity: "flexible", ingredients: ["Pickles", "Pickled Vegetables"] },
          { id: "mayonnaise-dislike", label: "Mayonnaise", copy: "Mayonnaise and mayo-based sauces.", severity: "flexible", ingredients: ["Mayonnaise", "Mayo"] }
        ]
      }
    ]
  }
];

const restaurantMenus = [
  {
    id: "golden-dragon",
    name: "Golden Dragon Kitchen",
    cuisine: "Chinese Restaurant",
    date: "May 29, 2026 - 18:45",
    dishes: [
      { id: "spring-rolls", name: "Spring Rolls", detail: "Cabbage, carrot, wheat wrapper, shared fryer", tags: ["Wheat", "Shared Fryer", "Deep Fried"] },
      { id: "pork-dumplings", name: "Pork Dumplings", detail: "Pork, wheat wrapper, scallion", tags: ["Pork", "Wheat", "Scallion"] },
      { id: "shrimp-dumplings", name: "Shrimp Dumplings", detail: "Shrimp, wheat starch wrapper", tags: ["Shrimp", "Wheat"] },
      { id: "scallion-pancake", name: "Scallion Pancake", detail: "Wheat flour, scallion, oil", tags: ["Wheat Flour", "Scallion", "Oil"] },
      { id: "hot-sour-soup", name: "Hot & Sour Soup", detail: "Tofu, egg, vinegar, pork broth, chili", tags: ["Egg", "Vinegar", "Pork", "Broth", "Chili"] },
      { id: "corn-egg-drop", name: "Corn Egg Drop Soup", detail: "Corn, egg, soup base", tags: ["Corn", "Egg", "Soup Base Powders"] },
      { id: "kung-pao", name: "Kung Pao Chicken", detail: "Chicken, peanuts, chili, soy sauce", tags: ["Peanut", "Chili", "Soy Sauce", "Chicken"] },
      { id: "mapo", name: "Mapo Tofu", detail: "Tofu, chili oil, fermented bean paste, pork mince", tags: ["Tofu", "Chili Oil", "Fermented Bean Paste", "Pork"] },
      { id: "vegetable-fried-rice", name: "Vegetable Fried Rice", detail: "Rice, vegetables, egg, soy sauce", tags: ["Egg", "Soy Sauce", "Rice"] },
      { id: "dan-dan", name: "Dan Dan Noodles", detail: "Wheat noodles, peanut sauce, chili oil, pork", tags: ["Wheat", "Peanut", "Chili Oil", "Pork"] },
      { id: "salt-pepper-squid", name: "Salt & Pepper Squid", detail: "Squid, salt, pepper, shared fryer", tags: ["Squid", "Shared Fryer", "Deep Fried"] },
      { id: "almond-tofu", name: "Almond Tofu", detail: "Almond flavor, milk, gelatin", tags: ["Almond", "Milk", "Gelatin"] }
    ]
  },
  {
    id: "sakura-izakaya",
    name: "Sakura Izakaya",
    cuisine: "Japanese Restaurant",
    date: "May 28, 2026 - 19:10",
    dishes: [
      { id: "edamame", name: "Edamame", detail: "Steamed soybeans, salt", tags: ["Edamame", "Soybean", "Salt"] },
      { id: "seaweed-salad", name: "Seaweed Salad", detail: "Seaweed, sesame, soy dressing", tags: ["Sesame Seed", "Soy Sauce"] },
      { id: "agedashi-tofu", name: "Agedashi Tofu", detail: "Tofu, wheat coating, fish stock", tags: ["Tofu", "Wheat", "Fish", "Broth"] },
      { id: "gyoza", name: "Gyoza", detail: "Pork, wheat wrapper, garlic", tags: ["Pork", "Wheat", "Garlic"] },
      { id: "salmon-nigiri", name: "Salmon Nigiri", detail: "Raw salmon, rice", tags: ["Raw Fish", "Salmon", "Rice"] },
      { id: "tuna-nigiri", name: "Tuna Nigiri", detail: "Raw tuna, rice", tags: ["Raw Fish", "Tuna", "Rice"] },
      { id: "eel-nigiri", name: "Eel Nigiri", detail: "Eel, sweet soy glaze, rice", tags: ["Eel", "Soy Sauce", "Sugar", "Rice"] },
      { id: "avocado-roll", name: "Avocado Cucumber Roll", detail: "Avocado, cucumber, rice, shared sushi station", tags: ["Avocado", "Rice", "Shared Cutting Board"] },
      { id: "tempura-udon", name: "Tempura Udon", detail: "Wheat noodles, shrimp tempura, fish broth", tags: ["Wheat", "Shrimp", "Fish", "Broth", "Deep Fried"] },
      { id: "curry-rice", name: "Curry Rice", detail: "Rice, curry roux, hidden beef stock", tags: ["Rice", "Beef Broth", "Flour"] },
      { id: "miso-soup", name: "Miso Soup", detail: "Miso, tofu, fish stock", tags: ["Miso", "Tofu", "Fish", "Broth"] },
      { id: "dorayaki", name: "Dorayaki", detail: "Pancake, red bean, egg, wheat", tags: ["Egg", "Wheat", "Sugar"] }
    ]
  },
  {
    id: "mediterranean-garden",
    name: "Mediterranean Garden",
    cuisine: "Mediterranean Restaurant",
    date: "May 27, 2026 - 12:20",
    dishes: [
      { id: "hummus", name: "Hummus", detail: "Chickpea, tahini, olive oil", tags: ["Chickpea", "Tahini", "Sesame Seed"] },
      { id: "baba-ganoush", name: "Baba Ganoush", detail: "Eggplant, tahini, garlic", tags: ["Eggplant", "Tahini", "Garlic"] },
      { id: "falafel", name: "Falafel", detail: "Chickpea, herbs, shared fryer", tags: ["Chickpea", "Shared Fryer", "Deep Fried"] },
      { id: "tzatziki", name: "Tzatziki", detail: "Yogurt, cucumber, garlic", tags: ["Yogurt", "Milk", "Garlic"] },
      { id: "greek-salad", name: "Greek Salad", detail: "Tomato, cucumber, olive, feta", tags: ["Tomato", "Olive", "Cheese"] },
      { id: "tabbouleh", name: "Tabbouleh", detail: "Bulgur, parsley, lemon", tags: ["Bulgur", "Wheat", "Citrus"] },
      { id: "chicken-shawarma", name: "Chicken Shawarma", detail: "Chicken, garlic sauce, pita", tags: ["Chicken", "Garlic", "Wheat"] },
      { id: "beef-kofta", name: "Beef Kofta", detail: "Beef, onion, spices", tags: ["Beef", "Onion"] },
      { id: "lamb-kebabs", name: "Lamb Kebabs", detail: "Lamb, grilled vegetables", tags: ["Lamb", "Grilled"] },
      { id: "sea-bass", name: "Grilled Sea Bass", detail: "Sea bass, lemon, herbs", tags: ["Fish", "Citrus", "Grilled"] },
      { id: "rice-pilaf", name: "Rice Pilaf", detail: "Rice, butter, broth", tags: ["Rice", "Butter", "Broth"] },
      { id: "baklava", name: "Baklava", detail: "Phyllo, walnut, pistachio, honey", tags: ["Wheat", "Walnut", "Pistachio", "Honey"] }
    ]
  },
  {
    id: "spice-route",
    name: "Spice Route",
    cuisine: "Indian Restaurant",
    date: "May 26, 2026 - 20:05",
    dishes: [
      { id: "vegetable-samosa", name: "Vegetable Samosa", detail: "Wheat pastry, potato, shared fryer", tags: ["Wheat", "Potato", "Shared Fryer", "Deep Fried"] },
      { id: "onion-bhaji", name: "Onion Bhaji", detail: "Onion, chickpea flour, shared fryer", tags: ["Onion", "Chickpea", "Shared Fryer", "Deep Fried"] },
      { id: "paneer-tikka", name: "Paneer Tikka", detail: "Paneer, yogurt, spices", tags: ["Cheese", "Yogurt", "Milk"] },
      { id: "butter-chicken", name: "Butter Chicken", detail: "Chicken, butter, cream, tomato", tags: ["Chicken", "Butter", "Cream", "Tomato"] },
      { id: "rogan-josh", name: "Lamb Rogan Josh", detail: "Lamb, chili, onion, garlic", tags: ["Lamb", "Chili", "Onion", "Garlic"] },
      { id: "palak-paneer", name: "Palak Paneer", detail: "Spinach, paneer, cream", tags: ["Spinach", "Cheese", "Cream"] },
      { id: "chana-masala", name: "Chana Masala", detail: "Chickpeas, tomato, onion, chili", tags: ["Chickpea", "Tomato", "Onion", "Chili"] },
      { id: "dal-tadka", name: "Dal Tadka", detail: "Lentils, ghee, garlic", tags: ["Lentil", "Ghee", "Garlic"] },
      { id: "vegetable-korma", name: "Vegetable Korma", detail: "Vegetables, cream, cashew sauce", tags: ["Cream", "Cashew", "Milk"] },
      { id: "garlic-naan", name: "Garlic Naan", detail: "Wheat bread, garlic, butter", tags: ["Wheat", "Garlic", "Butter"] },
      { id: "mango-lassi", name: "Mango Lassi", detail: "Mango, yogurt, sugar", tags: ["Mango", "Yogurt", "Sugar"] },
      { id: "gulab-jamun", name: "Gulab Jamun", detail: "Milk solids, syrup, wheat", tags: ["Milk", "Syrup", "Wheat"] }
    ]
  },
  {
    id: "urban-brunch",
    name: "Urban Brunch Cafe",
    cuisine: "Brunch Cafe",
    date: "May 25, 2026 - 10:15",
    dishes: [
      { id: "avocado-toast", name: "Avocado Toast", detail: "Avocado, wheat toast, lemon", tags: ["Avocado", "Wheat", "Citrus"] },
      { id: "eggs-benedict", name: "Eggs Benedict", detail: "Egg, hollandaise, English muffin, ham", tags: ["Egg", "Butter", "Wheat", "Ham"] },
      { id: "pancake-stack", name: "Pancake Stack", detail: "Wheat, egg, milk, syrup", tags: ["Wheat", "Egg", "Milk", "Syrup"] },
      { id: "granola-bowl", name: "Granola Bowl", detail: "Oats, yogurt, tree nuts, honey", tags: ["Yogurt", "Almond", "Walnut", "Honey"] },
      { id: "turkey-club", name: "Turkey Club", detail: "Turkey, bacon, wheat bread, mayonnaise", tags: ["Bacon", "Wheat", "Mayonnaise"] },
      { id: "tuna-melt", name: "Tuna Melt", detail: "Tuna, cheese, wheat bread", tags: ["Tuna", "Cheese", "Wheat"] },
      { id: "vegan-wrap", name: "Vegan Wrap", detail: "Hummus, vegetables, wheat tortilla", tags: ["Chickpea", "Wheat"] },
      { id: "caesar-salad", name: "Caesar Salad", detail: "Romaine, parmesan, croutons, anchovy dressing", tags: ["Cheese", "Wheat", "Anchovy"] },
      { id: "quinoa-bowl", name: "Quinoa Bowl", detail: "Quinoa, vegetables, tahini dressing", tags: ["Tahini", "Sesame Seed"] },
      { id: "brownie", name: "Brownie", detail: "Chocolate, walnut, egg, butter", tags: ["Chocolate", "Walnut", "Egg", "Butter"] },
      { id: "smoothie", name: "Berry Smoothie", detail: "Berries, yogurt, honey", tags: ["Yogurt", "Milk", "Honey"] },
      { id: "matcha-latte", name: "Matcha Latte", detail: "Matcha, milk, sugar", tags: ["Matcha", "Milk", "Sugar"] }
    ]
  }
];

const alternatives = [
  { name: "Tofu with Mixed Vegetables", copy: "Tofu, broccoli, carrot, mushroom", tag: "Best Match", why: "No shellfish" },
  { name: "Lemon Herb Chicken", copy: "Chicken, lemon, herbs", tag: "Good Option", why: "No spicy sauce" },
  { name: "Mushroom Risotto", copy: "Rice, mushroom, parmesan", tag: "Good Option", why: "No shellfish" },
  { name: "Garlic Noodles", copy: "Noodles, garlic, olive oil", tag: "Okay Option", why: "No spicy" }
];

const languageOptions = [
  { id: "zh-TW", label: "Traditional Chinese", chip: "TW" },
  { id: "en", label: "English", chip: "EN" },
  { id: "ja", label: "Japanese", chip: "JA" },
  { id: "ko", label: "Korean", chip: "KO" },
  { id: "es", label: "Spanish", chip: "ES" }
];

const initialState = {
  taxonomyVersion: 5,
  screen: "profile",
  stack: [],
  selectedArea: null,
  selectedOptions: ["peanuts", "tree-nuts", "shellfish-crustaceans", "dairy", "lactose", "spicy"],
  rules: null,
  menuStatus: "idle",
  analysisProgress: 0,
  analysisStep: 0,
  importMethod: "Import Menu",
  communicationLanguage: "zh-TW",
  selectedRestaurant: "golden-dragon",
  selectedFilter: "all",
  selectedDish: "mapo",
  explanationTab: "why",
  history: restaurantMenus.map((restaurant) => ({
    restaurantId: restaurant.id,
    name: restaurant.name,
    cuisine: restaurant.cuisine,
    date: restaurant.date
  }))
};

const emptyProfileState = {
  ...initialState,
  selectedOptions: [],
  rules: [],
  selectedArea: null,
  screen: "profile",
  stack: []
};

let state = loadState();

const content = document.getElementById("content");
const title = document.getElementById("screenTitle");
const eyebrow = document.getElementById("screenEyebrow");
const backBtn = document.getElementById("backBtn");
const headerAction = document.getElementById("headerAction");
const navButtons = [...document.querySelectorAll(".tab")];

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem("dietary-app-state"));
    const migratedOptions = migrateSelectedOptions(saved.selectedOptions || initialState.selectedOptions);
    const taxonomyChanged = saved.taxonomyVersion !== initialState.taxonomyVersion;
    return {
      ...initialState,
      ...saved,
      taxonomyVersion: initialState.taxonomyVersion,
      selectedOptions: migratedOptions,
      selectedRestaurant: saved.selectedRestaurant || initialState.selectedRestaurant,
      rules: taxonomyChanged ? null : saved.rules,
      history: taxonomyChanged ? initialState.history : normalizeHistory(saved.history),
      stack: []
    };
  } catch {
    return { ...initialState };
  }
}

function normalizeHistory(history) {
  const existing = new Set((history || []).map((item) => item.restaurantId).filter(Boolean));
  const normalized = (history || []).filter((item) => item.restaurantId && getRestaurant(item.restaurantId));
  restaurantMenus.forEach((restaurant) => {
    if (!existing.has(restaurant.id)) {
      normalized.push({
        restaurantId: restaurant.id,
        name: restaurant.name,
        cuisine: restaurant.cuisine,
        date: restaurant.date
      });
    }
  });
  return normalized;
}

function migrateSelectedOptions(selectedOptions) {
  const legacyMap = {
    nuts: ["peanuts", "tree-nuts"],
    shellfish: ["shellfish-crustaceans", "mollusks"],
    "gluten-allergy": ["gluten-allergy"],
    "low-fodmap": ["fodmap-vegetables", "fodmap-fruits", "fodmap-legumes"],
    "diabetic-friendly": ["diabetes"],
    "hindu-vegetarian": ["hindu"],
    "buddhist-vegetarian": ["buddhist"],
    "no-alcohol-cooking": ["hidden-alcohol"],
    "no-pork-cross-contact": ["no-pork", "shared-grill", "shared-fryer"],
    "plant-forward": ["environmental"],
    "no-bitter": ["bitter"],
    "no-sour": ["sour"],
    "no-mushroom": ["mushroom-dislike"],
    "no-raw-onion": ["garlic-onion-smell"],
    "no-fermented": ["umami", "strong-smells"],
    "no-crunchy": ["crunchy"]
  };
  const validIds = new Set(allOptions().map((option) => option.id));
  const expanded = selectedOptions.flatMap((id) => legacyMap[id] || [id]);
  return [...new Set(expanded)].filter((id) => validIds.has(id));
}

function saveState() {
  localStorage.setItem("dietary-app-state", JSON.stringify({ ...state, stack: [] }));
}

function allOptions() {
  return areas.flatMap((area) => area.groups.flatMap((group) => group.options));
}

function getOption(id) {
  return allOptions().find((option) => option.id === id);
}

function getArea(id) {
  return areas.find((area) => area.id === id);
}

function getRestaurant(id) {
  return restaurantMenus.find((restaurant) => restaurant.id === id) || restaurantMenus[0];
}

function currentRestaurant() {
  return getRestaurant(state.selectedRestaurant);
}

function currentDishes() {
  return currentRestaurant().dishes;
}

function getDish(id) {
  return currentDishes().find((dish) => dish.id === id) || currentDishes()[0];
}

function currentLanguage() {
  return languageOptions.find((language) => language.id === state.communicationLanguage) || languageOptions[0];
}

function languageButton(className = "") {
  const language = currentLanguage();
  return `
    <button class="language-select ${className}" type="button" data-action="language">
      <span>
        <strong class="card-title">Communication language</strong>
        <span class="card-copy">${language.label}</span>
      </span>
      <span class="locale-chip">${language.chip}</span>
    </button>
  `;
}

function normalizeIngredient(name) {
  return name.toLowerCase();
}

function generateRules() {
  const rules = [];
  state.selectedOptions.forEach((optionId) => {
    const option = getOption(optionId);
    if (!option) return;
    option.ingredients.forEach((ingredient) => {
      const existing = rules.find((rule) => normalizeIngredient(rule.ingredient) === normalizeIngredient(ingredient));
      if (existing) {
        const oldScore = severities.findIndex((item) => item.id === existing.severity);
        const newScore = severities.findIndex((item) => item.id === option.severity);
        if (newScore < oldScore) existing.severity = option.severity;
        existing.sources = [...new Set([...existing.sources, option.label])];
      } else {
        rules.push({ ingredient, severity: option.severity, sources: [option.label] });
      }
    });
  });
  rules.sort((a, b) => severities.findIndex((item) => item.id === a.severity) - severities.findIndex((item) => item.id === b.severity) || a.ingredient.localeCompare(b.ingredient));
  state.rules = rules;
}

function activeRules() {
  if (!state.rules) generateRules();
  return state.rules.filter((rule) => rule.severity !== "ignore");
}

function scoreDish(dish) {
  const matches = dish.tags.flatMap((tag) => activeRules().filter((rule) => normalizeIngredient(rule.ingredient) === normalizeIngredient(tag)));
  if (!matches.length) return { severity: "safe", matches: [] };
  matches.sort((a, b) => severities.findIndex((item) => item.id === a.severity) - severities.findIndex((item) => item.id === b.severity));
  return { severity: matches[0].severity, matches };
}

function summarizeRestaurant(restaurantId) {
  const restaurant = getRestaurant(restaurantId);
  const counts = { safe: 0, caution: 0, avoid: 0, critical: 0 };
  restaurant.dishes.forEach((dish) => {
    const severity = scoreDish(dish).severity;
    if (severity === "critical") counts.critical++;
    else if (severity === "avoid") counts.avoid++;
    else if (severity === "caution" || severity === "flexible") counts.caution++;
    else counts.safe++;
  });
  return `${counts.safe} Safe / ${counts.caution} Caution / ${counts.avoid + counts.critical} Avoid`;
}

function go(screen, data = {}) {
  state.stack.push(state.screen);
  state.screen = screen;
  Object.assign(state, data);
  render();
}

function replace(screen, data = {}) {
  state.screen = screen;
  Object.assign(state, data);
  render();
}

function goBack() {
  if (!state.stack.length) return;
  state.screen = state.stack.pop();
  render();
}

function setTopBar(config) {
  title.textContent = config.title;
  eyebrow.textContent = config.eyebrow || "";
  backBtn.hidden = !config.back;
  headerAction.hidden = !config.action;
  headerAction.textContent = config.action || "";
  headerAction.onclick = config.onAction || null;
}

function severityPill(id) {
  const item = severities.find((severity) => severity.id === id);
  return `<span class="pill ${id}">${item.label}</span>`;
}

function dishPill(id) {
  if (id === "safe") return `<span class="pill" style="background:#eafaf2;color:var(--green)">Safe</span>`;
  return severityPill(id);
}

function icon(letter) {
  return `<span class="tile-icon">${letter}</span>`;
}

function areaList() {
  setTopBar({ title: "Explore Dietary Areas", eyebrow: "Choose an area to start building your profile", back: false });
  content.innerHTML = `
    <div class="stack">
      ${areas.map((area) => `
        <button class="area-card" type="button" data-area="${area.id}">
          ${icon(area.icon)}
          <span>
            <strong class="card-title">${area.title}</strong>
            <span class="card-copy">${area.copy}</span>
          </span>
          <strong>&gt;</strong>
        </button>
      `).join("")}
      <button class="cta secondary" data-action="rules" type="button">Review generated rules</button>
    </div>
  `;
}

function needsScreen() {
  const area = getArea(state.selectedArea) || areas[0];
  setTopBar({
    title: area.title,
    eyebrow: "Select all that apply.",
    back: true,
    action: "Save",
    onAction: () => {
      generateRules();
      replace("rules");
    }
  });
  content.innerHTML = `
    <div class="stack">
      ${area.groups.map((group) => `
        <section>
          <h2 class="section-title">${group.title}</h2>
          <div class="stack">
            ${group.options.map((option) => `
              <button class="option-row ${state.selectedOptions.includes(option.id) ? "selected" : ""}" type="button" data-option="${option.id}">
                <span>
                  <strong class="card-title">${option.label}</strong>
                  <span class="card-copy">${option.copy}</span>
                </span>
                <span class="check"></span>
              </button>
            `).join("")}
          </div>
        </section>
      `).join("")}
    </div>
  `;
}

function rulesScreen() {
  if (!state.rules) generateRules();
  const visible = state.rules.slice(0, 12);
  setTopBar({ title: "Auto-Generated Rules", eyebrow: "We create a default list of ingredient rules", back: true, action: "Edit", onAction: () => go("severity") });
  content.innerHTML = `
    <div class="stack">
      <div class="notice">
        <strong>We've generated ingredient rules based on your selections.</strong>
        <p class="card-copy">You can review and customize them next.</p>
      </div>
      <h2 class="section-title">Generated Ingredient Rules</h2>
      <div class="rule-list">
        ${visible.map((rule) => `
          <button class="rule-row" type="button" data-rule="${rule.ingredient}">
            <span>
              <strong class="card-title">${rule.ingredient}</strong>
              <span class="card-copy">${rule.sources.join(", ")}</span>
            </span>
            ${severityPill(rule.severity)}
            <strong>&gt;</strong>
          </button>
        `).join("")}
      </div>
      ${state.rules.length > visible.length ? `<button class="text-btn" data-action="severity" type="button">+ Show ${state.rules.length - visible.length} more</button>` : ""}
      <button class="cta" data-action="summary" type="button">View profile summary</button>
    </div>
  `;
}

function severityScreen() {
  if (!state.rules) generateRules();
  setTopBar({ title: "Customize Severity", eyebrow: "Tap a dot to set severity or remove it.", back: true, action: "Done", onAction: () => replace("summary") });
  content.innerHTML = `
    <div class="severity-head">
      <span>Ingredient</span>
      ${severities.map((item) => `<span style="color:${item.color}">${item.label[0]}</span>`).join("")}
      <span>Del</span>
    </div>
    <div>
      ${state.rules.map((rule, index) => `
        <div class="severity-row">
          <span>${rule.ingredient}</span>
          ${severities.map((severity) => `
            <button class="dot-btn ${rule.severity === severity.id ? "active" : ""}" style="color:${severity.color}" data-severity="${severity.id}" data-index="${index}" aria-label="Set ${rule.ingredient} to ${severity.label}">
              <span class="dot" style="background:${severity.color}"></span>
            </button>
          `).join("")}
          <button class="delete-btn" data-delete="${index}" aria-label="Remove ${rule.ingredient}">x</button>
        </div>
      `).join("")}
    </div>
  `;
}

function summaryScreen() {
  const counts = Object.fromEntries(severities.map((item) => [item.id, 0]));
  if (!state.rules) generateRules();
  state.rules.forEach((rule) => counts[rule.severity]++);
  const total = state.rules.length;
  setTopBar({ title: "Profile Summary", eyebrow: "Review your final dietary profile", back: true, action: "Edit", onAction: () => replace("severity") });
  content.innerHTML = `
    <div class="stack">
      <div class="panel hero-panel">
        <span class="badge-icon">S</span>
        <span>
          <strong class="card-title">Profile Strength: Good</strong>
          <span class="card-copy">We'll be cautious and prioritize your safety when information is uncertain.</span>
        </span>
      </div>
      <section class="panel">
        <h2 class="section-title" style="margin-top:0">Summary by Severity</h2>
        ${severities.map((severity) => `
          <div class="summary-row">
            <span class="summary-dot" style="background:${severity.color}"></span>
            <strong class="card-title">${severity.label}</strong>
            <strong class="small">${counts[severity.id]} ingredients</strong>
          </div>
        `).join("")}
        <div class="total-row">Total Rules <span style="float:right">${total} ingredients</span></div>
      </section>
      <div class="notice">
        <strong>You can update your profile anytime in Settings.</strong>
      </div>
      <button class="cta" data-action="scan" type="button">Scan a menu</button>
    </div>
  `;
}

function importScreen() {
  setTopBar({ title: "Import Menu", eyebrow: "Upload, scan, or import any menu", back: false });
  content.innerHTML = `
    <div class="stack">
      ${[
        ["QR", "Scan QR Code", "Scan a code to load a demo menu."],
        ["C", "Take a Photo", "Upload a clear photo of the menu."],
        ["U", "Import from URL", "Paste the restaurant's menu link."],
        ["P", "Upload PDF Menu", "Import a PDF menu file."]
      ].map((item) => `
        <button class="import-card" type="button" data-import-method="${item[1]}">
          ${icon(item[0])}
          <span>
            <strong class="card-title">${item[1]}</strong>
            <span class="card-copy">${item[2]}</span>
          </span>
        </button>
      `).join("")}
      <div class="notice">
        <strong>We support multi-page and multi-language menus.</strong>
      </div>
    </div>
  `;
}

function menuPickerScreen() {
  setTopBar({ title: "Select Imported Menu", eyebrow: state.importMethod, back: true });
  content.innerHTML = `
    <div class="stack">
      <div class="notice">
        <strong>Demo mode</strong>
        <p class="card-copy">Choose one fictional restaurant menu to analyze.</p>
      </div>
      <section class="panel">
        ${restaurantMenus.map((restaurant) => `
          <button class="history-card" type="button" data-demo-menu="${restaurant.id}">
            <span class="dish-photo">${restaurant.name[0]}</span>
            <span>
              <strong class="card-title">${restaurant.name}</strong>
              <span class="card-copy">${restaurant.cuisine} · ${restaurant.dishes.length} dishes</span>
              <span class="risk-line" style="color:var(--green)">${summarizeRestaurant(restaurant.id)}</span>
            </span>
            <strong>&gt;</strong>
          </button>
        `).join("")}
      </section>
    </div>
  `;
}

function startAnalysis(restaurantId = state.selectedRestaurant) {
  window.clearTimeout(window.analysisTimer);
  window.clearInterval(window.analysisInterval);
  state.selectedRestaurant = restaurantId;
  state.selectedDish = getRestaurant(restaurantId).dishes[0].id;
  state.selectedFilter = "all";
  state.menuStatus = "analyzing";
  state.analysisProgress = 8;
  state.analysisStep = 0;
  go("analysis");
}

function analysisScreen() {
  const restaurant = currentRestaurant();
  const steps = [
    "Extracting dishes",
    "Identifying ingredients",
    "Detecting hidden ingredients",
    "Matching with your profile",
    "Calculating risk levels"
  ];
  setTopBar({ title: "AI Menu Analysis", eyebrow: restaurant.name, back: true });
  content.innerHTML = `
    <div class="progress-wrap">
      <div class="progress-ring" id="analysisRing" style="--progress:${state.analysisProgress}%"><strong id="analysisPercent">${state.analysisProgress}%</strong></div>
      <strong class="card-title">Analyzing menu...</strong>
      <div class="stack" style="width:100%">
        ${steps.map((step, index) => `<div class="step-row ${index < state.analysisStep ? "done" : index === state.analysisStep ? "active-step" : ""}" data-analysis-step="${index}"><span class="step-mark">${index < state.analysisStep ? "V" : ""}</span><span>${step}</span></div>`).join("")}
      </div>
      <div class="notice" style="width:100%"><strong>This may take a few seconds.</strong></div>
    </div>
  `;
  window.clearTimeout(window.analysisTimer);
  window.clearInterval(window.analysisInterval);
  const startedAt = Date.now();
  const duration = 2600;
  window.analysisInterval = window.setInterval(() => {
    const elapsed = Date.now() - startedAt;
    const progress = Math.min(100, Math.round(8 + (elapsed / duration) * 92));
    const step = Math.min(steps.length - 1, Math.floor((progress / 100) * steps.length));
    state.analysisProgress = progress;
    state.analysisStep = step;
    updateAnalysisDom(progress, step);
  }, 80);
  window.analysisTimer = window.setTimeout(() => {
    window.clearInterval(window.analysisInterval);
    state.analysisProgress = 100;
    state.analysisStep = steps.length;
    state.menuStatus = "complete";
    rememberRestaurant(restaurant.id);
    replace("results");
  }, duration);
}

function updateAnalysisDom(progress, step) {
  const ring = document.getElementById("analysisRing");
  const percent = document.getElementById("analysisPercent");
  if (ring) ring.style.setProperty("--progress", `${progress}%`);
  if (percent) percent.textContent = `${progress}%`;
  document.querySelectorAll("[data-analysis-step]").forEach((row) => {
    const index = Number(row.dataset.analysisStep);
    row.classList.toggle("done", index < step);
    row.classList.toggle("active-step", index === step);
    row.querySelector(".step-mark").textContent = index < step ? "V" : "";
  });
}

function rememberRestaurant(restaurantId) {
  const restaurant = getRestaurant(restaurantId);
  state.history = [
    { restaurantId: restaurant.id, name: restaurant.name, cuisine: restaurant.cuisine, date: "June 1, 2026 - 09:41" },
    ...state.history.filter((item) => item.restaurantId !== restaurant.id)
  ];
}

function resultsScreen() {
  const restaurant = currentRestaurant();
  const scored = currentDishes().map((dish) => ({ ...dish, score: scoreDish(dish) }));
  const counts = { all: scored.length, safe: 0, caution: 0, avoid: 0, critical: 0, flexible: 0, unknown: 0 };
  scored.forEach((dish) => counts[dish.score.severity] = (counts[dish.score.severity] || 0) + 1);
  const filtered = state.selectedFilter === "all" ? scored : scored.filter((dish) => dish.score.severity === state.selectedFilter);
  setTopBar({ title: "Menu Overview", eyebrow: `${restaurant.name} · ${scored.length} dishes analyzed`, back: true });
  content.innerHTML = `
    <div class="filter-bar">
      ${[
        ["all", `All (${counts.all})`],
        ["safe", `Safe (${counts.safe})`],
        ["caution", `Caution (${counts.caution})`],
        ["avoid", `Avoid (${counts.avoid})`],
        ["critical", `Critical (${counts.critical})`]
      ].map((filter) => `<button class="filter-chip ${state.selectedFilter === filter[0] ? "active" : ""}" data-filter="${filter[0]}" type="button">${filter[1]}</button>`).join("")}
    </div>
    <div class="stack">
      ${filtered.map((dish) => `
        <button class="dish-card" type="button" data-dish="${dish.id}">
          <span class="dish-photo">${dish.name[0]}</span>
          <span>
            <strong class="card-title">${dish.name}</strong>
            <span class="card-copy">${dish.detail}</span>
            ${dish.score.matches.length ? `<span class="risk-line">Contains: ${dish.score.matches.map((match) => match.ingredient).join(", ")}</span>` : ""}
          </span>
          ${dishPill(dish.score.severity)}
          <strong>&gt;</strong>
        </button>
      `).join("") || `<div class="empty">No dishes match this filter.</div>`}
    </div>
  `;
}

function explanationScreen() {
  const dish = getDish(state.selectedDish);
  const score = scoreDish(dish);
  const risk = staffRisk(score);
  setTopBar({ title: "Dish Explanation", eyebrow: "Understand why a dish is flagged", back: true, action: "Ask", onAction: () => go("staff") });
  content.innerHTML = `
    <div class="stack">
      <div class="dish-photo explain-photo">${dish.name[0]}</div>
      <div style="text-align:center">
        <h2 class="section-title" style="margin:0">${dish.name}</h2>
        <p class="card-copy">${dish.detail}</p>
        ${dishPill(score.severity)}
      </div>
      <button class="staff-preview ${risk.className}" data-action="staff" type="button">
        <span class="badge-icon">${risk.icon}</span>
        <span>
          <strong class="card-title">Staff Communication Card</strong>
          <span class="card-copy">Show local-language questions to confirm this dish.</span>
        </span>
        <strong>&gt;</strong>
      </button>
      <div class="tabs-inline">
        ${[
          ["why", "Why it's flagged"],
          ["ingredients", "Ingredients"],
          ["details", "Details"]
        ].map((tab) => `<button class="${state.explanationTab === tab[0] ? "active" : ""}" data-explain-tab="${tab[0]}" type="button">${tab[1]}</button>`).join("")}
      </div>
      <section class="panel">
        ${explanationBody(dish, score)}
      </section>
      <section class="panel">
        <strong class="card-title">Confidence Level: Medium <span style="float:right">60%</span></strong>
        <div class="bar" style="--w:60%;margin-top:10px"><span></span></div>
      </section>
      <button class="cta secondary" data-action="alternatives" type="button">Safer Alternatives</button>
    </div>
  `;
}

function explanationBody(dish, score) {
  if (state.explanationTab === "ingredients") {
    return dish.tags.map((tag) => `<p class="card-title">${tag}</p>`).join("");
  }
  if (state.explanationTab === "details") {
    return `<p class="card-copy">This result combines detected menu text, hidden ingredient patterns, and your current dietary rules. Ask staff to confirm preparation when confidence is not high.</p>`;
  }
  if (!score.matches.length) {
    return `<p class="card-copy">No ingredients in this dish currently match your profile rules.</p>`;
  }
  return score.matches.map((match) => `
    <div class="summary-row">
      <span class="summary-dot" style="background:${severities.find((item) => item.id === match.severity).color}"></span>
      <span>
        <strong class="card-title">Contains ${match.ingredient}</strong>
        <span class="card-copy">${match.sources.join(", ")} set this to ${match.severity}.</span>
      </span>
    </div>
  `).join("") + `<p class="card-copy">Cross-contact risk may exist if the kitchen uses shared surfaces or oil.</p>`;
}

function legacyStaffCommunicationScreen() {
  const dish = getDish(state.selectedDish);
  const score = scoreDish(dish);
  const risk = staffRisk(score);
  const questions = staffQuestions(dish, score);
  const language = currentLanguage();
  setTopBar({ title: "Staff Communication Card", eyebrow: "Show staff what to confirm", back: true });
  content.innerHTML = `
    <div class="stack">
      <section class="staff-card ${risk.className}">
        <div class="staff-card-head">
          <span class="badge-icon">${risk.icon}</span>
          <span>
            <strong class="card-title">${dish.name}</strong>
            <span class="card-copy">${risk.label} · Confidence: ${risk.confidence}</span>
          </span>
        </div>
        <div class="staff-message">
          <strong>請協助確認以下問題：</strong>
          <ol class="question-list">
            ${questions.map((question) => `<li>${question}</li>`).join("")}
          </ol>
          <strong>謝謝！</strong>
        </div>
      </section>
      <section class="panel">
        <strong class="card-title">Why this matters</strong>
        <span class="card-copy">${risk.reason}</span>
      </section>
      <div class="language-row">
        <button class="language-btn active" type="button" data-action="language">+ ${language.label}</button>
        <span class="locale-chip">${language.chip}</span>
      </div>
    </div>
  `;
}

function staffRisk(score) {
  if (!score.matches.length) {
    return {
      className: "safe-staff",
      icon: "S",
      label: "Safe to Eat",
      confidence: "High (90%)",
      reason: "No matching risks were found, but staff can still confirm hidden ingredients and shared equipment."
    };
  }
  const severity = score.matches[0].severity;
  if (severity === "critical" || severity === "avoid") {
    return {
      className: "hard-staff",
      icon: "!",
      label: "Avoid (Hard Conflict)",
      confidence: "Medium (60%)",
      reason: "A selected restriction matches one or more detected ingredients, so staff should confirm before you order."
    };
  }
  return {
    className: "soft-staff",
    icon: "?",
    label: "Caution (Soft Conflict)",
    confidence: "Low (40%)",
    reason: "The dish may be okay if staff can confirm the ingredient, sauce, and preparation details."
  };
}

function staffQuestions(dish, score) {
  const matches = score.matches.map((match) => match.ingredient);
  const matchText = matches.length ? matches.join("、") : "未列出的過敏原或限制食材";
  if (!matches.length) {
    return [
      `這道菜是否含有${matchText}？`,
      "是否使用肉類高湯、魚露、蠔油、酒類或隱藏醬料？",
      "是否與含過敏原的食材共用油鍋、烤盤、砧板或鍋具？"
    ];
  }
  return [
    `這道菜是否含有${matchText}？`,
    `醬料、醃料、高湯或調味粉裡是否含有${matchText}？`,
    "是否能移除這些食材，或改用安全的替代做法？",
    "是否與相同食材共用油鍋、烤盤、砧板或鍋具？"
  ];
}

function staffCommunicationScreen() {
  const dish = getDish(state.selectedDish);
  const score = scoreDish(dish);
  const risk = staffRisk(score);
  const language = currentLanguage();
  const copy = staffCardCopy(score, risk, language.id);
  setTopBar({ title: "Staff Communication Card", eyebrow: "Show staff what to confirm", back: true });
  content.innerHTML = `
    <div class="stack">
      <section class="staff-card ${risk.className}">
        <div class="staff-card-head">
          <span class="badge-icon">${risk.icon}</span>
          <span>
            <strong class="card-title">${dish.name}</strong>
            <span class="card-copy">${copy.riskLabel} · ${copy.confidenceLabel}: ${risk.confidence}</span>
          </span>
        </div>
        <div class="staff-message">
          <strong>${copy.intro}</strong>
          <ol class="question-list">
            ${copy.questions.map((question) => `<li>${question}</li>`).join("")}
          </ol>
          <strong>${copy.thanks}</strong>
        </div>
      </section>
      <section class="panel">
        <strong class="card-title">${copy.whyTitle}</strong>
        <span class="card-copy">${copy.reason}</span>
      </section>
      <div class="language-row">
        <button class="language-btn active" type="button" data-action="language">+ ${language.label}</button>
        <span class="locale-chip">${language.chip}</span>
      </div>
    </div>
  `;
}

function staffCardCopy(score, risk, languageId) {
  const matches = score.matches.map((match) => match.ingredient);
  const hasMatches = matches.length > 0;
  const riskKey = !hasMatches ? "safe" : risk.className === "hard-staff" ? "avoid" : "caution";
  const joined = {
    en: matches.join(", ") || "unlisted allergens or restricted ingredients",
    "zh-TW": matches.join("、") || "未列出的過敏原或限制食材",
    ja: matches.join("、") || "記載されていないアレルゲンや制限食材",
    ko: matches.join(", ") || "표시되지 않은 알레르기 유발 성분 또는 제한 식재료",
    es: matches.join(", ") || "alergenos o ingredientes restringidos no indicados"
  };
  const copy = {
    en: {
      risk: { safe: "Safe to Eat", caution: "Caution (Soft Conflict)", avoid: "Avoid (Hard Conflict)" },
      intro: "Please help confirm:",
      thanks: "Thank you!",
      confidenceLabel: "Confidence",
      whyTitle: "Why this matters",
      reason: hasMatches ? "This dish may contain ingredients that match the diner profile. Please confirm ingredients, sauces, and shared equipment before ordering." : "No matching risks were found, but hidden ingredients and shared equipment can still matter.",
      questions: hasMatches ? [
        `Does this dish contain ${joined.en}?`,
        `Do the sauce, marinade, broth, or seasoning powders contain ${joined.en}?`,
        "Can these ingredients be removed or replaced with a safer preparation?",
        "Is this cooked with shared fryer oil, grill, cutting board, wok, or utensils?"
      ] : [
        `Does this dish contain ${joined.en}?`,
        "Does it use meat broth, fish sauce, oyster sauce, alcohol, or hidden sauces?",
        "Is it cooked with shared fryer oil, grill, cutting board, wok, or utensils?"
      ]
    },
    "zh-TW": {
      risk: { safe: "可安全食用", caution: "注意（可能衝突）", avoid: "避免（重大衝突）" },
      intro: "請協助確認以下問題：",
      thanks: "謝謝！",
      confidenceLabel: "信心程度",
      whyTitle: "為什麼需要確認",
      reason: hasMatches ? "這道菜可能含有與用餐者個人檔案相符的風險食材。點餐前請確認食材、醬料與共用器具。" : "目前沒有偵測到相符風險，但隱藏食材與共用器具仍可能影響安全。",
      questions: hasMatches ? [
        `這道菜是否含有${joined["zh-TW"]}？`,
        `醬料、醃料、高湯或調味粉裡是否含有${joined["zh-TW"]}？`,
        "是否能移除這些食材，或改用安全的替代做法？",
        "是否與這些食材共用油鍋、烤盤、砧板、炒鍋或餐具？"
      ] : [
        `這道菜是否含有${joined["zh-TW"]}？`,
        "是否使用肉類高湯、魚露、蠔油、酒類或隱藏醬料？",
        "是否與含過敏原的食材共用油鍋、烤盤、砧板、炒鍋或餐具？"
      ]
    },
    ja: {
      risk: { safe: "食べられる可能性が高い", caution: "注意（確認が必要）", avoid: "避けてください（重大な衝突）" },
      intro: "以下をご確認ください：",
      thanks: "ありがとうございます！",
      confidenceLabel: "信頼度",
      whyTitle: "確認が必要な理由",
      reason: hasMatches ? "この料理には、食事プロフィールに一致するリスク食材が含まれる可能性があります。注文前に食材、ソース、共用器具を確認してください。" : "一致するリスクは見つかっていませんが、隠れた食材や共用器具の確認は重要です。",
      questions: hasMatches ? [
        `この料理に${joined.ja}は含まれていますか？`,
        `ソース、マリネ、だし、調味料に${joined.ja}は含まれていますか？`,
        "これらの食材を抜く、または安全な作り方に変更できますか？",
        "同じ油、グリル、まな板、中華鍋、器具を共有していますか？"
      ] : [
        `この料理に${joined.ja}は含まれていますか？`,
        "肉のだし、魚醤、オイスターソース、アルコール、隠れたソースを使っていますか？",
        "同じ油、グリル、まな板、中華鍋、器具を共有していますか？"
      ]
    },
    ko: {
      risk: { safe: "안전할 가능성 높음", caution: "주의（확인 필요）", avoid: "피해주세요（중요 충돌）" },
      intro: "아래 내용을 확인해 주세요:",
      thanks: "감사합니다!",
      confidenceLabel: "신뢰도",
      whyTitle: "확인이 필요한 이유",
      reason: hasMatches ? "이 음식에는 식사 프로필과 일치하는 위험 성분이 포함될 수 있습니다. 주문 전에 재료, 소스, 공용 조리 도구를 확인해 주세요." : "일치하는 위험은 발견되지 않았지만, 숨겨진 재료와 공용 조리 도구는 여전히 중요할 수 있습니다.",
      questions: hasMatches ? [
        `이 음식에 ${joined.ko}이/가 들어가나요?`,
        `소스, 양념, 육수, 조미료에 ${joined.ko}이/가 들어가나요?`,
        "이 재료를 빼거나 더 안전한 방식으로 조리할 수 있나요?",
        "같은 튀김 기름, 그릴, 도마, 웍 또는 조리 도구를 함께 사용하나요?"
      ] : [
        `이 음식에 ${joined.ko}이/가 들어가나요?`,
        "고기 육수, 피시 소스, 굴 소스, 술 또는 숨겨진 소스를 사용하나요?",
        "알레르기 유발 성분과 같은 튀김 기름, 그릴, 도마, 웍 또는 조리 도구를 함께 사용하나요?"
      ]
    },
    es: {
      risk: { safe: "Probablemente seguro", caution: "Precaucion (posible conflicto)", avoid: "Evitar (conflicto fuerte)" },
      intro: "Por favor confirme:",
      thanks: "Gracias.",
      confidenceLabel: "Confianza",
      whyTitle: "Por que importa",
      reason: hasMatches ? "Este plato puede contener ingredientes que coinciden con el perfil del comensal. Confirme ingredientes, salsas y equipo compartido antes de pedir." : "No se encontraron riesgos coincidentes, pero los ingredientes ocultos y el equipo compartido aun pueden importar.",
      questions: hasMatches ? [
        `Este plato contiene ${joined.es}?`,
        `La salsa, marinada, caldo o condimentos contienen ${joined.es}?`,
        "Se pueden quitar estos ingredientes o preparar de una forma mas segura?",
        "Se cocina con aceite, parrilla, tabla, wok o utensilios compartidos?"
      ] : [
        `Este plato contiene ${joined.es}?`,
        "Usa caldo de carne, salsa de pescado, salsa de ostras, alcohol o salsas ocultas?",
        "Se cocina con aceite, parrilla, tabla, wok o utensilios compartidos?"
      ]
    }
  };
  const selected = copy[languageId] || copy.en;
  return { ...selected, riskLabel: selected.risk[riskKey] };
}

function alternativesScreen() {
  setTopBar({ title: "Safer Alternatives", eyebrow: "Find better options", back: true });
  content.innerHTML = `
    <div class="stack">
      <div class="panel hero-panel">
        <span class="badge-icon">S</span>
        <span>
          <strong class="card-title">Better options for you</strong>
          <span class="card-copy">Based on your profile and preferences.</span>
        </span>
      </div>
      <section class="panel">
        ${alternatives.map((item) => `
          <div class="alt-card">
            <span class="dish-photo">${item.name[0]}</span>
            <span>
              <strong class="card-title">${item.name}</strong>
              <span class="card-copy">${item.copy}</span>
              <span class="risk-line" style="color:var(--green)">${item.why}</span>
            </span>
            <span class="pill caution">${item.tag}</span>
          </div>
        `).join("")}
      </section>
      <button class="cta secondary" type="button">View More Options</button>
    </div>
  `;
}

function historyScreen() {
  setTopBar({ title: "History", eyebrow: "Recent scans and saved profiles", back: false });
  content.innerHTML = `
    <div class="stack">
      <section class="panel">
        ${state.history.map((item) => `
          <button class="history-card" type="button" data-history-menu="${item.restaurantId}">
            <span class="dish-photo">${item.name[0]}</span>
            <span>
              <strong class="card-title">${item.name}</strong>
              <span class="card-copy">${item.cuisine} · ${item.date}</span>
              <span class="risk-line" style="color:var(--green)">${summarizeRestaurant(item.restaurantId)}</span>
            </span>
            <strong>&gt;</strong>
          </button>
        `).join("")}
      </section>
    </div>
  `;
}

function homeScreen() {
  const restaurant = currentRestaurant();
  const counts = Object.fromEntries(severities.map((severity) => [severity.id, 0]));
  if (!state.rules) generateRules();
  state.rules.forEach((rule) => counts[rule.severity]++);
  setTopBar({ title: "MenuSafe", eyebrow: "Dietary safety assistant", back: false });
  content.innerHTML = `
    <div class="home-center">
      <section class="home-hero">
        <span class="home-shield">S</span>
        <span>
          <strong>Ready to dine safer</strong>
          <span>Screen menus, catch hidden risks, and ask staff with confidence.</span>
        </span>
      </section>
      <div class="home-stats">
        <div><strong>${state.selectedOptions.length}</strong><span>Needs</span></div>
        <div><strong>${activeRules().length}</strong><span>Rules</span></div>
        <div><strong>${restaurantMenus.length}</strong><span>Menus</span></div>
      </div>
      <div class="stack">
        <button class="cta" data-action="scan" type="button">Import menu</button>
        <button class="cta secondary" data-action="summary" type="button">Review profile</button>
        <button class="cta secondary" data-action="history" type="button">Demo restaurant menus</button>
      </div>
      <section class="panel">
        <strong class="card-title">Last demo menu</strong>
        <span class="card-copy">${restaurant.name} &middot; ${summarizeRestaurant(restaurant.id)}</span>
      </section>
      ${languageButton()}
    </div>
  `;
}

function languageScreen() {
  setTopBar({ title: "Select Language", eyebrow: "Used for staff communication", back: true });
  content.innerHTML = `
    <div class="stack">
      <div class="notice">
        <strong>Demo language selector</strong>
        <p class="card-copy">Choose the language shown on communication cards.</p>
      </div>
      <section class="panel">
        ${languageOptions.map((language) => `
          <button class="language-option ${state.communicationLanguage === language.id ? "selected" : ""}" type="button" data-language="${language.id}">
            <span>
              <strong class="card-title">${language.label}</strong>
              <span class="card-copy">${language.chip} communication card</span>
            </span>
            <span class="locale-chip">${language.chip}</span>
          </button>
        `).join("")}
      </section>
    </div>
  `;
}

function settingsScreen() {
  setTopBar({ title: "Settings", eyebrow: "Manage your profile", back: false });
  content.innerHTML = `
    <div class="stack">
      <button class="option-row" data-action="profile" type="button">
        <span><strong class="card-title">Update dietary areas</strong><span class="card-copy">Add or remove profile needs.</span></span>
        <strong>&gt;</strong>
      </button>
      <button class="option-row" data-action="severity" type="button">
        <span><strong class="card-title">Customize severity</strong><span class="card-copy">Adjust ingredient risk levels.</span></span>
        <strong>&gt;</strong>
      </button>
      <button class="cta secondary" data-action="reset" type="button">Clear dietary profile</button>
    </div>
  `;
}

function render() {
  saveState();
  navButtons.forEach((button) => button.classList.toggle("active", button.dataset.tab === primaryTab()));
  const screens = {
    home: homeScreen,
    profile: areaList,
    needs: needsScreen,
    rules: rulesScreen,
    severity: severityScreen,
    summary: summaryScreen,
    scan: importScreen,
    menuPicker: menuPickerScreen,
    analysis: analysisScreen,
    results: resultsScreen,
    explanation: explanationScreen,
    staff: staffCommunicationScreen,
    alternatives: alternativesScreen,
    history: historyScreen,
    language: languageScreen,
    settings: settingsScreen
  };
  screens[state.screen]();
  content.scrollTop = 0;
}

function primaryTab() {
  if (["scan", "menuPicker", "analysis", "results", "explanation", "staff", "alternatives"].includes(state.screen)) return "scan";
  if (["profile", "needs", "rules", "severity", "summary"].includes(state.screen)) return "profile";
  if (state.screen === "language") return "home";
  return state.screen;
}

document.addEventListener("click", (event) => {
  const target = event.target.closest("button");
  if (!target) return;

  if (target === backBtn) return goBack();

  if (target.dataset.tab) {
    replace(target.dataset.tab);
    return;
  }

  if (target.dataset.area) {
    go("needs", { selectedArea: target.dataset.area });
    return;
  }

  if (target.dataset.option) {
    const option = target.dataset.option;
    state.selectedOptions = state.selectedOptions.includes(option)
      ? state.selectedOptions.filter((item) => item !== option)
      : [...state.selectedOptions, option];
    state.rules = null;
    render();
    return;
  }

  if (target.dataset.severity) {
    state.rules[Number(target.dataset.index)].severity = target.dataset.severity;
    render();
    return;
  }

  if (target.dataset.delete) {
    state.rules.splice(Number(target.dataset.delete), 1);
    render();
    return;
  }

  if (target.dataset.filter) {
    state.selectedFilter = target.dataset.filter;
    render();
    return;
  }

  if (target.dataset.dish) {
    go("explanation", { selectedDish: target.dataset.dish, explanationTab: "why" });
    return;
  }

  if (target.dataset.importMethod) {
    go("menuPicker", { importMethod: target.dataset.importMethod });
    return;
  }

  if (target.dataset.demoMenu) {
    startAnalysis(target.dataset.demoMenu);
    return;
  }

  if (target.dataset.historyMenu) {
    startAnalysis(target.dataset.historyMenu);
    return;
  }

  if (target.dataset.explainTab) {
    state.explanationTab = target.dataset.explainTab;
    render();
    return;
  }

  if (target.dataset.language) {
    state.communicationLanguage = target.dataset.language;
    goBack();
    return;
  }

  const action = target.dataset.action;
  if (action === "rules") {
    generateRules();
    go("rules");
  }
  if (action === "severity") go("severity");
  if (action === "summary") go("summary");
  if (action === "scan") replace("scan");
  if (action === "history") replace("history");
  if (action === "staff") go("staff");
  if (action === "alternatives") go("alternatives");
  if (action === "language") go("language");
  if (action === "profile") replace("profile");
  if (action === "reset") {
    localStorage.removeItem("dietary-app-state");
    state = { ...emptyProfileState };
    render();
  }
});

render();
