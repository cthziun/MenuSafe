import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const STORAGE_KEY = "dinetogether.app.v2";

const steps = [
  { title: "Create Dining Session", subtitle: "Choose how you want to plan" },
  { title: "Dietary & Risk Setup", subtitle: "Set dietary identities and risk preferences" },
  { title: "Add Dining Members", subtitle: "Add others you're ordering for" },
  { title: "Import Menu", subtitle: "Add the restaurant menu" },
  { title: "Menu Overview", subtitle: "Review interpreted menu items" },
  { title: "Dish Detail", subtitle: "Understand why a dish is flagged" },
  { title: "Suggested Dishes", subtitle: "Start from the safest candidates" },
  { title: "Add More Dishes", subtitle: "Add dishes you really want" },
  { title: "Group Review", subtitle: "Collect feedback on shortlisted dishes" },
  { title: "Final Summary", subtitle: "See the decision summary and proceed" }
];

const primaryDietaryOptions = ["Vegan", "Vegetarian", "Pescatarian", "Flexitarian", "Halal", "Kosher"];
const moreDietaryOptions = [
  "Gluten-free",
  "Dairy-free",
  "Egg-free",
  "Nut-free",
  "Low FODMAP",
  "Keto",
  "Paleo",
  "Mediterranean",
  "Diabetic-friendly",
  "Low sodium",
  "Low sugar",
  "Low fat",
  "No pork",
  "No beef",
  "Alcohol-free",
  "Raw vegan"
];
const hardConflictOptions = [
  "Peanuts",
  "Tree nuts",
  "Shellfish",
  "Fish",
  "Milk",
  "Eggs",
  "Soy",
  "Wheat",
  "Sesame",
  "Gluten",
  "Pork",
  "Beef",
  "Alcohol",
  "Gelatin",
  "Lard",
  "Meat stock"
];
const softConflictOptions = [
  "Spicy",
  "Mushrooms",
  "Cilantro",
  "Onion",
  "Garlic",
  "Raw vegetables",
  "Fried food",
  "Cream sauce",
  "Cheese",
  "High sodium",
  "High sugar",
  "Greasy",
  "Bitter melon",
  "Organ meat",
  "Strong seafood flavor",
  "Caffeinated"
];
const conflictAliases = {
  Peanuts: ["peanut", "peanuts", "groundnut", "satay"],
  "Tree nuts": ["almond", "cashew", "walnut", "hazelnut", "pistachio", "pecan", "macadamia", "tree nut", "nuts"],
  Shellfish: ["shellfish", "shrimp", "prawn", "crab", "lobster", "clam", "mussel", "oyster", "scallop"],
  Fish: ["fish", "anchovy", "salmon", "tuna", "cod", "bonito", "fish sauce"],
  Milk: ["milk", "dairy", "cream", "butter", "cheese", "yogurt", "ghee"],
  Eggs: ["egg", "eggs", "mayonnaise", "mayo"],
  Soy: ["soy", "soybean", "soy sauce", "tofu", "miso", "edamame"],
  Wheat: ["wheat", "flour", "bread", "noodle", "pasta", "dumpling", "batter"],
  Sesame: ["sesame", "tahini"],
  Gluten: ["gluten", "wheat", "barley", "rye", "flour", "bread", "noodle", "pasta"],
  Pork: ["pork", "bacon", "ham", "lard", "prosciutto", "sausage"],
  Beef: ["beef", "veal", "steak"],
  Alcohol: ["alcohol", "wine", "beer", "mirin", "sake", "shaoxing", "cooking wine", "liquor"],
  Gelatin: ["gelatin", "gelatine"],
  Lard: ["lard", "pork fat"],
  "Meat stock": ["meat stock", "chicken stock", "beef stock", "pork stock", "broth", "bone broth"],
  Spicy: ["spicy", "chili", "chilli", "pepper", "sichuan", "hot sauce", "gochujang"],
  Mushrooms: ["mushroom", "mushrooms", "shiitake", "truffle"],
  Cilantro: ["cilantro", "coriander"],
  Onion: ["onion", "shallot", "scallion", "spring onion"],
  Garlic: ["garlic"],
  "Raw vegetables": ["raw vegetable", "raw vegetables", "salad", "crudite"],
  "Fried food": ["fried", "deep fried", "tempura", "crispy"],
  "Cream sauce": ["cream sauce", "cream", "alfredo", "bechamel"],
  Cheese: ["cheese", "parmesan", "mozzarella", "cheddar", "feta"],
  "High sodium": ["salty", "soy sauce", "miso", "salted", "cured", "pickled"],
  "High sugar": ["sugar", "sweet", "syrup", "caramel", "honey"],
  Greasy: ["greasy", "oily", "fried", "deep fried"],
  "Bitter melon": ["bitter melon"],
  "Organ meat": ["liver", "kidney", "tripe", "heart", "organ meat"],
  "Strong seafood flavor": ["seafood", "fish sauce", "anchovy", "bonito", "shrimp paste"],
  Caffeinated: ["coffee", "tea", "matcha", "caffeine", "espresso"]
};
const defaultProfile = {
  name: "",
  dietary: [],
  hard: [],
  soft: [],
  preferences: [],
  notes: ""
};

const emptyApp = {
  mode: "group",
  profile: defaultProfile,
  members: [],
  menuItems: [],
  selectedIds: [],
  reviews: {},
  importSource: "",
  orderStatus: ""
};

function App() {
  const [screen, setScreen] = useState(0);
  const [app, setApp] = usePersistentState();
  const [selectedDishId, setSelectedDishId] = useState(null);
  const [toast, setToast] = useState("");

  const analyzedDishes = useMemo(() => analyzeMenu(app.menuItems, app.profile, app.members), [app.menuItems, app.profile, app.members]);
  const selectedDishes = analyzedDishes.filter((dish) => app.selectedIds.includes(dish.id));
  const selectedDish = analyzedDishes.find((dish) => dish.id === selectedDishId) || analyzedDishes[0] || null;
  const canProceedToMenu = app.profile.name.trim() || app.profile.dietary.length || app.profile.hard.length || app.profile.soft.length;

  function updateApp(updater) {
    setApp((current) => {
      const next = typeof updater === "function" ? updater(current) : updater;
      return { ...current, ...next };
    });
  }

  function showToast(message) {
    setToast(message);
    window.clearTimeout(showToast.timeout);
    showToast.timeout = window.setTimeout(() => setToast(""), 2200);
  }

  function openDish(dish) {
    setSelectedDishId(dish.id);
    setScreen(5);
  }

  function toggleSelected(id) {
    updateApp((current) => ({
      selectedIds: current.selectedIds.includes(id)
        ? current.selectedIds.filter((item) => item !== id)
        : [...current.selectedIds, id]
    }));
  }

  function resetSession() {
    setApp(emptyApp);
    setSelectedDishId(null);
    setScreen(0);
    showToast("Session cleared");
  }

  return (
    <main className="app-shell">
      <section className="stage-copy">
        <div className="step-count">{screen + 1}. {steps[screen].title}</div>
        <p>{steps[screen].subtitle}</p>
      </section>

      <section className="phone" aria-label="DineTogether app preview">
        <StatusBar />
        {screen === 0 && <HomeScreen app={app} updateApp={updateApp} go={setScreen} resetSession={resetSession} />}
        {screen === 1 && <ProfileScreen app={app} updateApp={updateApp} go={setScreen} canProceed={canProceedToMenu} showToast={showToast} />}
        {screen === 2 && <GroupScreen app={app} updateApp={updateApp} go={setScreen} showToast={showToast} />}
        {screen === 3 && <ImportScreen app={app} updateApp={updateApp} go={setScreen} showToast={showToast} />}
        {screen === 4 && <OverviewScreen dishes={analyzedDishes} go={setScreen} openDish={openDish} toggleSelected={toggleSelected} selectedIds={app.selectedIds} />}
        {screen === 5 && <DishDetailScreen go={setScreen} dish={selectedDish} toggleSelected={toggleSelected} selectedIds={app.selectedIds} />}
        {screen === 6 && <SuggestionsScreen go={setScreen} dishes={analyzedDishes} selectedIds={app.selectedIds} toggleSelected={toggleSelected} />}
        {screen === 7 && <AddMoreScreen app={app} updateApp={updateApp} dishes={analyzedDishes} go={setScreen} selectedIds={app.selectedIds} toggleSelected={toggleSelected} showToast={showToast} />}
        {screen === 8 && <ReviewScreen go={setScreen} selectedDishes={selectedDishes} app={app} updateApp={updateApp} showToast={showToast} />}
        {screen === 9 && <SummaryScreen go={setScreen} selectedDishes={selectedDishes} app={app} updateApp={updateApp} showToast={showToast} resetSession={resetSession} />}
        <BottomNav active={screen} setScreen={setScreen} />
        {toast && <div className="toast">{toast}</div>}
      </section>

      <nav className="step-rail" aria-label="App screens">
        {steps.map((step, index) => (
          <button key={step.title} className={screen === index ? "active" : ""} onClick={() => setScreen(index)}>
            {index + 1}
          </button>
        ))}
      </nav>
    </main>
  );
}

function usePersistentState() {
  const [value, setValue] = useState(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      return saved ? { ...emptyApp, ...JSON.parse(saved) } : emptyApp;
    } catch {
      return emptyApp;
    }
  });

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
}

function HomeScreen({ app, updateApp, go, resetSession }) {
  return (
    <Screen>
      <div className="hero-art">
        <div className="hero-person p1" />
        <div className="hero-person p2" />
        <div className="hero-person p3" />
        <div className="table-art"><span /><span /><span /></div>
      </div>
      <div className="brand">
        <h1>DineTogether</h1>
        <p>Smarter dining for everyone.<br />Respect dietary needs.</p>
      </div>
      <h2>How would you like to plan?</h2>
      <ChoiceCard
        icon="group"
        title="I'll plan for the group"
        text="Set up shared ordering decisions."
        active={app.mode === "group"}
        onClick={() => {
          updateApp({ mode: "group" });
          go(1);
        }}
      />
      <ChoiceCard
        icon="person"
        title="I'll plan for myself"
        text="Create a personal dining check."
        active={app.mode === "solo"}
        onClick={() => {
          updateApp({ mode: "solo", members: [] });
          go(1);
        }}
      />
      <button className="secondary" onClick={resetSession}>Start over</button>
    </Screen>
  );
}

function ProfileScreen({ app, updateApp, go, canProceed, showToast }) {
  const [hardInput, setHardInput] = useState("");
  const [softInput, setSoftInput] = useState("");
  const [prefInput, setPrefInput] = useState("");
  const [showMoreDietary, setShowMoreDietary] = useState(false);
  const profile = app.profile;

  function updateProfile(patch) {
    updateApp({ profile: { ...profile, ...patch } });
  }

  function addTag(type, value, setter) {
    const clean = value.trim();
    if (!clean) return;
    updateProfile({ [type]: unique([...profile[type], clean]) });
    setter("");
  }

  return (
    <Screen>
      <TopBar title="My Dietary Profile" right="Save" onBack={() => go(0)} onRight={() => showToast("Profile saved")} />
      <SectionTitle title="Your Name" />
      <input className="field" value={profile.name} onChange={(event) => updateProfile({ name: event.target.value })} placeholder="Enter your name" />

      <SectionTitle title="Dietary Identity" />
      <div className="chip-grid">
        {primaryDietaryOptions.map((item) => (
          <button key={item} className={`chip ${profile.dietary.includes(item) ? "active" : ""}`} onClick={() => updateProfile({ dietary: toggle(profile.dietary, item) })}>
            <span className="dot green" />{item}
          </button>
        ))}
        <button className={`chip more-chip ${showMoreDietary ? "active" : ""}`} onClick={() => setShowMoreDietary((current) => !current)}>
          More
        </button>
      </div>
      {showMoreDietary && (
        <OptionPicker
          options={moreDietaryOptions}
          selected={profile.dietary}
          onToggle={(item) => updateProfile({ dietary: toggle(profile.dietary, item) })}
        />
      )}

      <EditableTagBlock
        severity="hard"
        title="Hard Conflicts"
        helper="Ingredients or rules you strictly avoid."
        tags={profile.hard}
        options={hardConflictOptions}
        value={hardInput}
        setValue={setHardInput}
        onAdd={() => addTag("hard", hardInput, setHardInput)}
        onSelect={(tag) => updateProfile({ hard: toggle(profile.hard, tag) })}
        onRemove={(tag) => updateProfile({ hard: profile.hard.filter((item) => item !== tag) })}
      />
      <EditableTagBlock
        severity="soft"
        title="Soft Conflicts"
        helper="Items you prefer to avoid but can compromise on."
        tags={profile.soft}
        options={softConflictOptions}
        value={softInput}
        setValue={setSoftInput}
        onAdd={() => addTag("soft", softInput, setSoftInput)}
        onSelect={(tag) => updateProfile({ soft: toggle(profile.soft, tag) })}
        onRemove={(tag) => updateProfile({ soft: profile.soft.filter((item) => item !== tag) })}
      />

      <SectionTitle title="Additional Preferences" optional />
      <div className="inline-add">
        <input value={prefInput} onChange={(event) => setPrefInput(event.target.value)} placeholder="Add a preference" />
        <button onClick={() => addTag("preferences", prefInput, setPrefInput)}>Add</button>
      </div>
      <TagList tags={profile.preferences} onRemove={(tag) => updateProfile({ preferences: profile.preferences.filter((item) => item !== tag) })} />

      <SectionTitle title="Notes for Others" optional />
      <textarea className="text-area" value={profile.notes} onChange={(event) => updateProfile({ notes: event.target.value })} placeholder="Write anything the group or staff should know." />

      <button className="primary bottom-cta" onClick={() => go(app.mode === "group" ? 2 : 3)} disabled={!canProceed}>Continue</button>
    </Screen>
  );
}

function GroupScreen({ app, updateApp, go, showToast }) {
  const [form, setForm] = useState({ name: "", role: "Adult", notes: "" });
  const organizerName = app.profile.name || "Organizer";

  function addMember() {
    if (!form.name.trim()) {
      showToast("Add a member name first");
      return;
    }
    const member = {
      id: cryptoId(),
      name: form.name.trim(),
      role: form.role,
      notes: splitList(form.notes)
    };
    updateApp({ members: [...app.members, member] });
    setForm({ name: "", role: "Adult", notes: "" });
  }

  function removeMember(id) {
    updateApp({ members: app.members.filter((member) => member.id !== id) });
  }

  return (
    <Screen>
      <TopBar title="Dining Group" right="Next" onBack={() => go(1)} onRight={() => go(3)} />
      <SectionTitle title="You (Organizer)" />
      <MemberCard member={{ name: organizerName, role: "Organizer", notes: profileNotes(app.profile) }} organizer />

      <SectionTitle title="People you're ordering for" />
      {app.members.length ? (
        <div className="stack">
          {app.members.map((member) => <MemberCard key={member.id} member={member} onRemove={() => removeMember(member.id)} />)}
        </div>
      ) : (
        <EmptyState title="No dining members yet" text="Add people manually or continue with only your profile." />
      )}

      <SectionTitle title="Add People" />
      <div className="form-grid">
        <input className="field" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="Member name" />
        <select className="field" value={form.role} onChange={(event) => setForm({ ...form, role: event.target.value })}>
          <option>Adult</option>
          <option>Child</option>
          <option>Senior</option>
        </select>
        <input className="field wide" value={form.notes} onChange={(event) => setForm({ ...form, notes: event.target.value })} placeholder="Needs, separated by commas" />
      </div>
      <button className="list-action" onClick={() => showToast("Share code: " + makeJoinCode(organizerName))}>Scan or Share Member QR Code</button>
      <button className="primary" onClick={addMember}>Add Manually</button>
      <button className="secondary" onClick={() => go(3)}>Continue</button>
    </Screen>
  );
}

function ImportScreen({ app, updateApp, go, showToast }) {
  const [text, setText] = useState("");
  const [url, setUrl] = useState("");
  const [sourceMode, setSourceMode] = useState("text");
  const [isImporting, setIsImporting] = useState(false);

  async function importMenu(payload) {
    setIsImporting(true);
    try {
      const result = await fetch("/api/analyze-menu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await result.json();
      if (!result.ok) throw new Error(data.error || "Menu import failed");
      if (!data.dishes?.length) throw new Error("No menu items were detected.");
      updateApp({ menuItems: data.dishes, importSource: payload.source || sourceMode });
      showToast(`${data.dishes.length} menu items imported`);
      go(4);
    } catch (error) {
      showToast(error.message || "Menu import failed");
    } finally {
      setIsImporting(false);
    }
  }

  function importText() {
    if (!text.trim()) {
      showToast("Paste or type at least one menu item");
      return;
    }
    importMenu({ text, source: sourceMode });
  }

  function addUrlSource() {
    if (!url.trim()) {
      showToast("Enter a menu URL first");
      return;
    }
    importMenu({ url: url.trim(), source: url.trim() });
  }

  function handleFile(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.type.startsWith("text/")) {
      file.text().then((content) => {
        setText(content);
        setSourceMode(file.name);
        importMenu({ text: content, source: file.name });
      });
      return;
    }
    if (file.type.startsWith("image/")) {
      readFileAsDataUrl(file).then((dataUrl) => {
        importMenu({
          file: { name: file.name, mimeType: file.type, dataUrl },
          source: file.name
        });
      });
      return;
    }
    if (file.type === "application/pdf") {
      readFileAsBase64(file).then((base64) => {
        importMenu({
          file: { name: file.name, mimeType: file.type, base64 },
          source: file.name
        });
      });
      return;
    }
    showToast("Please upload an image, PDF, or text file.");
  }

  return (
    <Screen>
      <TopBar title="Import Menu" onBack={() => go(app.mode === "group" ? 2 : 1)} />
      <div className="import-stack">
        <button className={`import-card ${sourceMode === "qr" ? "active" : ""}`} onClick={() => { setSourceMode("qr"); showToast("Camera scanning is not available in this web prototype"); }}>
          <Icon name="qr" />
          <span><strong>Scan Restaurant QR Code</strong><small>Camera QR scanning is not enabled yet.</small></span>
        </button>
        <label className="import-card">
          <Icon name="camera" />
          <span><strong>Upload Photos or Files</strong><small>Analyze menu photos, PDFs, text, or CSV files.</small></span>
          <input type="file" accept="image/*,.txt,.csv,.pdf,application/pdf" onChange={handleFile} disabled={isImporting} hidden />
        </label>
        <div className="import-card form-card">
          <Icon name="link" />
          <span><strong>Import from URL</strong><small>Fetch and analyze a public restaurant menu page.</small></span>
          <input className="field wide" value={url} onChange={(event) => setUrl(event.target.value)} placeholder="https://" />
          <button className="secondary compact-button" onClick={addUrlSource} disabled={isImporting}>Analyze URL</button>
        </div>
      </div>

      <SectionTitle title="Menu Items" />
      <textarea
        className="text-area menu-input"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder={"Type one dish per line. Optional format: Dish name - ingredients or notes"}
      />
      <button className="primary bottom-cta" onClick={importText} disabled={isImporting}>{isImporting ? "Analyzing..." : "Analyze Menu"}</button>
      {app.menuItems.length > 0 && <button className="secondary" onClick={() => go(4)}>View Existing Menu</button>}
    </Screen>
  );
}

function OverviewScreen({ dishes, go, openDish, selectedIds, toggleSelected }) {
  const [filter, setFilter] = useState("all");
  const filtered = dishes.filter((dish) => filter === "all" || dish.risk === filter || (filter === "flagged" && dish.risk !== "ok"));

  return (
    <Screen>
      <TopBar title="Menu Overview" right="Add" onBack={() => go(3)} onRight={() => go(7)} />
      <p className="center-note">{dishes.length} items detected</p>
      <div className="segmented">
        <button className={filter === "all" ? "active" : ""} onClick={() => setFilter("all")}>All ({dishes.length})</button>
        <button className={filter === "flagged" ? "active" : ""} onClick={() => setFilter("flagged")}>Flagged ({dishes.filter((dish) => dish.risk !== "ok").length})</button>
        <button className={filter === "ok" ? "active" : ""} onClick={() => setFilter("ok")}>OK ({dishes.filter((dish) => dish.risk === "ok").length})</button>
      </div>
      {filtered.length ? (
        <div className="dish-list">
          {filtered.map((dish) => (
            <DishCard
              key={dish.id}
              dish={dish}
              onClick={() => openDish(dish)}
              action="View"
              onAction={(event) => {
                event.stopPropagation();
                openDish(dish);
              }}
            />
          ))}
        </div>
      ) : (
        <EmptyState title="No menu items yet" text="Import or add dishes to analyze them." />
      )}
      <Legend />
      <div className="notice">Menu Overview is for inspecting risks. Add dishes to your shortlist from Dish Detail, Suggestions, or Add More.</div>
      <button className="primary bottom-cta" onClick={() => go(6)} disabled={!dishes.length}>Get Suggestions</button>
    </Screen>
  );
}

function DishDetailScreen({ go, dish, selectedIds, toggleSelected }) {
  if (!dish) {
    return (
      <Screen>
        <TopBar title="Dish Detail" onBack={() => go(4)} />
        <EmptyState title="No dish selected" text="Open a menu item first." />
      </Screen>
    );
  }

  return (
    <Screen>
      <button className="floating-back" onClick={() => go(4)} aria-label="Back">&lt;</button>
      <div className="detail-hero">
        <FoodArt tone={dish.tone} />
        <div>
          <h2>{dish.name}</h2>
          {dish.originalName && dish.originalName !== dish.name && <p>{dish.originalName}</p>}
          {!dish.originalName && <p>{dish.description || "No description added"}</p>}
          <RiskLine dish={dish} />
          <AvatarStrip names={dish.people} />
        </div>
      </div>
      <SectionTitle title="Menu Text" />
      <div className="detail-panel">
        <strong>{dish.name}</strong>
        {dish.originalName && dish.originalName !== dish.name && <small>{dish.originalName}</small>}
        {dish.description && <p>{dish.description}</p>}
        {[dish.category, dish.price].filter(Boolean).length > 0 && (
          <p>{[dish.category, dish.price].filter(Boolean).join(" | ")}</p>
        )}
      </div>
      <SectionTitle title="Detected Ingredients & Notes" />
      <IngredientDetails dish={dish} />
      <SectionTitle title="Why is this flagged?" />
      {dish.reasons.length ? (
        <ul className="explain-list">{dish.reasons.map((reason) => <li key={reason}>{reason}</li>)}</ul>
      ) : (
        <p className="body-copy">No conflicts were found against the current profile and group notes.</p>
      )}
      <SectionTitle title="Confidence Level" />
      <div className="meter"><span style={{ width: `${dish.confidence}%` }} /></div>
      <div className="confidence"><small>Based on your typed menu text and saved preferences.</small><b>{dish.confidenceLabel}</b></div>
      <SectionTitle title="Suggested Question for Staff" />
      <button className="question-card" onClick={() => navigator.clipboard?.writeText(dish.question)}>
        {dish.question}<span>Copy</span>
      </button>
      <button className="primary bottom-cta" onClick={() => toggleSelected(dish.id)}>
        {selectedIds.includes(dish.id) ? "Remove from Shortlist" : "Add to Shortlist"}
      </button>
      <button className="secondary" onClick={() => go(6)}>Back to Suggestions</button>
    </Screen>
  );
}

function SuggestionsScreen({ go, dishes, selectedIds, toggleSelected }) {
  const shared = dishes.filter((dish) => dish.risk === "ok").slice(0, 6);
  const review = dishes.filter((dish) => dish.risk !== "hard" && dish.risk !== "ok").slice(0, 6);

  return (
    <Screen>
      <TopBar title="Suggested Starting Dishes" onBack={() => go(4)} />
      <p className="center-note">Sorted from lowest risk to highest confidence</p>
      <SectionTitle title="Recommended Shared Dishes" />
      <DishGroup dishes={shared} empty="No fully compatible dishes yet." selectedIds={selectedIds} toggleSelected={toggleSelected} />
      <SectionTitle title="Needs Confirmation" />
      <DishGroup dishes={review} empty="No uncertain dishes found." selectedIds={selectedIds} toggleSelected={toggleSelected} />
      <button className="primary bottom-cta" onClick={() => go(8)} disabled={!selectedIds.length}>Use Shortlist</button>
      <button className="secondary" onClick={() => go(7)}>Add More Dishes Manually</button>
    </Screen>
  );
}

function AddMoreScreen({ app, updateApp, dishes, go, selectedIds, toggleSelected, showToast }) {
  const [query, setQuery] = useState("");
  const [dishName, setDishName] = useState("");
  const [dishNotes, setDishNotes] = useState("");
  const filtered = dishes.filter((dish) => `${dish.name} ${dish.subtitle}`.toLowerCase().includes(query.toLowerCase()));

  function addDish() {
    if (!dishName.trim()) {
      showToast("Enter a dish name first");
      return;
    }
    const dish = {
      id: cryptoId(),
      name: dishName.trim(),
      subtitle: dishNotes.trim(),
      source: "manual"
    };
    updateApp({ menuItems: [...app.menuItems, dish], selectedIds: [...app.selectedIds, dish.id] });
    setDishName("");
    setDishNotes("");
    showToast("Dish added to shortlist");
  }

  return (
    <Screen>
      <TopBar title="Add More Dishes" onBack={() => go(6)} />
      <input className="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search the menu or dish name..." />
      <SectionTitle title="Add from Menu" />
      {filtered.length ? (
        <div className="dish-list compact">
          {filtered.map((dish) => (
            <DishCard key={dish.id} dish={dish} compact onClick={() => toggleSelected(dish.id)} action={selectedIds.includes(dish.id) ? "Remove" : "Add"} />
          ))}
        </div>
      ) : (
        <EmptyState title="No matching dishes" text="Change the search or add a custom dish below." />
      )}
      <SectionTitle title="Add a dish you really want" />
      <div className="form-grid">
        <input className="field wide" value={dishName} onChange={(event) => setDishName(event.target.value)} placeholder="Dish name" />
        <input className="field wide" value={dishNotes} onChange={(event) => setDishNotes(event.target.value)} placeholder="Ingredients or notes" />
      </div>
      <button className="primary" onClick={addDish}>Add Dish</button>
      <button className="secondary" onClick={() => go(8)}>Review Shortlist</button>
    </Screen>
  );
}

function ReviewScreen({ go, selectedDishes, app, updateApp, showToast }) {
  function setVote(dishId, vote) {
    updateApp({ reviews: { ...app.reviews, [dishId]: vote } });
  }

  return (
    <Screen>
      <TopBar title="Group Review" right="Invite" onBack={() => go(7)} onRight={() => showToast("Invite link copied")} />
      <p className="center-note">Review the shortlisted dishes</p>
      {selectedDishes.length ? (
        <div className="review-stack">
          {selectedDishes.map((dish) => (
            <article className="review-card" key={dish.id}>
              <div className="mini-head">
                <FoodArt tone={dish.tone} />
                <div><strong>{dish.name}</strong><OriginalName dish={dish} /><RiskLine dish={dish} /></div>
              </div>
              <div className="feedback-row">
                {["Interested", "Okay", "Not for me"].map((vote) => (
                  <button key={vote} className={app.reviews[dish.id] === vote ? "active" : ""} onClick={() => setVote(dish.id, vote)}>{vote}</button>
                ))}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <EmptyState title="No dishes shortlisted" text="Choose dishes from the menu before review." />
      )}
      <button className="primary bottom-cta" onClick={() => go(9)} disabled={!selectedDishes.length}>See Final Summary</button>
      <button className="secondary" onClick={() => go(7)}>Add More</button>
    </Screen>
  );
}

function SummaryScreen({ go, selectedDishes, app, updateApp, showToast, resetSession }) {
  const hardCount = selectedDishes.filter((dish) => dish.risk === "hard").length;
  const softCount = selectedDishes.filter((dish) => dish.risk === "soft").length;
  const summaryText = makeSummary(app, selectedDishes);

  function exportSummary() {
    navigator.clipboard?.writeText(summaryText);
    showToast("Summary copied");
  }

  return (
    <Screen>
      <div className="summary-burst">*</div>
      <h2>Your Selection Summary</h2>
      <SectionTitle title="Selected Dishes" />
      {selectedDishes.length ? (
        <div className="summary-list">
          {selectedDishes.map((dish) => (
            <div key={dish.id}><span className="check">OK</span>{dish.name} <small>({dish.riskLabel})</small></div>
          ))}
        </div>
      ) : (
        <EmptyState title="No selected dishes" text="Add dishes before proceeding." />
      )}
      <div className="notes-card">
        <strong>Notes</strong>
        <p>{hardCount ? `${hardCount} hard conflict${hardCount > 1 ? "s" : ""} still selected.` : "No hard conflicts selected."}<br />{softCount ? `${softCount} soft conflict${softCount > 1 ? "s" : ""} should be confirmed.` : "No soft conflicts selected."}</p>
        <button onClick={() => go(4)}>View Details</button>
      </div>
      <button className="primary order" disabled={!selectedDishes.length} onClick={() => { updateApp({ orderStatus: "Ready to order" }); showToast("Marked ready to order"); }}>Proceed to Order</button>
      <button className="secondary" onClick={exportSummary}>Export Summary / Ask Staff</button>
      {app.orderStatus && <button className="secondary" onClick={resetSession}>Create New Session</button>}
    </Screen>
  );
}

function analyzeMenu(items, profile, members) {
  const groupTerms = unique([...profile.hard, ...members.flatMap((member) => member.notes || [])]);
  const softTerms = profile.soft;

  return items.map((item, index) => {
    const searchText = getDishSearchText(item);
    const hardMatches = groupTerms.filter((term) => term && termMatches(searchText, term));
    const softMatches = softTerms.filter((term) => term && termMatches(searchText, term));
    const risk = hardMatches.length ? "hard" : softMatches.length ? "soft" : "ok";
    const reasons = [
      ...hardMatches.map((term) => `${term} matches a hard conflict or member note.`),
      ...softMatches.map((term) => `${term} matches a soft conflict.`)
    ];
    const okCount = Math.max(0, 1 + members.length - hardMatches.length);

    return {
      ...item,
      id: item.id || `dish-${index}`,
      tone: risk === "hard" ? "red" : risk === "soft" ? "yellow" : "green",
      risk,
      riskLabel: risk === "ok" ? `${okCount} OK` : risk === "hard" ? `${hardMatches.length} Hard Conflict` : `${softMatches.length} Soft Conflict`,
      people: [profile.name || "You", ...members.map((member) => member.name)].filter(Boolean),
      ok: okCount,
      reasons,
      confidence: item.importConfidence === "low" ? 58 : reasons.length ? 72 : 88,
      confidenceLabel: item.importConfidence === "low" ? "Low" : reasons.length ? "Medium" : "High",
      question: reasons.length
        ? `Can this dish be prepared without ${unique([...hardMatches, ...softMatches]).join(", ")}?`
        : "Can you confirm the main ingredients and cooking method?"
    };
  });
}

function getDishSearchText(item) {
  return [
    item.name,
    item.subtitle,
    ...(item.visibleIngredients || []),
    ...(item.likelyIngredients || []),
    ...(item.allergyRisks || []),
    ...(item.uncertaintyNotes || [])
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function termMatches(text, term) {
  const aliases = conflictAliases[term] || [term, singularize(term)];
  return unique(aliases.map((alias) => String(alias).toLowerCase()).filter(Boolean)).some((alias) => text.includes(alias));
}

function singularize(value) {
  const text = String(value || "").toLowerCase();
  return text.endsWith("s") ? text.slice(0, -1) : text;
}

function parseMenuText(text) {
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [name, ...notes] = line.split(/\s[-:]\s/);
      return {
        id: cryptoId(),
        name: name.trim(),
        originalName: "",
        description: notes.join(" - ").trim(),
        subtitle: notes.join(" - ").trim(),
        source: "typed"
      };
    });
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("Could not read file."));
    reader.readAsDataURL(file);
  });
}

function readFileAsBase64(file) {
  return readFileAsDataUrl(file).then((dataUrl) => String(dataUrl).split(",")[1] || "");
}

function makeSummary(app, selectedDishes) {
  const lines = [
    "DineTogether Summary",
    `Organizer: ${app.profile.name || "Not set"}`,
    `Dietary identities: ${app.profile.dietary.join(", ") || "None"}`,
    `Hard conflicts: ${app.profile.hard.join(", ") || "None"}`,
    `Soft conflicts: ${app.profile.soft.join(", ") || "None"}`,
    "",
    "Selected dishes:"
  ];
  selectedDishes.forEach((dish) => lines.push(`- ${dish.name}: ${dish.riskLabel}`));
  return lines.join("\n");
}

function profileNotes(profile) {
  return unique([...profile.dietary, ...profile.hard, ...profile.soft, ...profile.preferences]);
}

function splitList(value) {
  return value.split(",").map((item) => item.trim()).filter(Boolean);
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function toggle(list, item) {
  return list.includes(item) ? list.filter((value) => value !== item) : [...list, item];
}

function cryptoId() {
  return Math.random().toString(36).slice(2, 10);
}

function makeJoinCode(name) {
  return `${name.slice(0, 3).toUpperCase() || "DIN"}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}

function StatusBar() {
  return (
    <div className="status-bar">
      <span>9:41</span>
      <span className="status-icons">|||</span>
    </div>
  );
}

function TopBar({ title, left = true, right, onBack, onRight }) {
  return (
    <header className="top-bar">
      <button className="icon-button" onClick={onBack} aria-label="Back">{left ? "<" : ""}</button>
      <strong>{title}</strong>
      <button className="text-action" onClick={onRight}>{right}</button>
    </header>
  );
}

function Screen({ children }) {
  return <div className="screen">{children}</div>;
}

function SectionTitle({ title, optional }) {
  return <h3 className="section-title">{title} {optional && <span>(Optional)</span>}</h3>;
}

function EditableTagBlock({ severity, title, helper, tags, options, value, setValue, onAdd, onSelect, onRemove }) {
  return (
    <section className="risk-block">
      <h3><span className={`dot ${severity === "hard" ? "red" : "orange"}`} />{title}</h3>
      <p>{helper}</p>
      <TagList tags={tags} severity={severity} onRemove={onRemove} />
      <OptionPicker
        options={options.filter((item) => !tags.includes(item))}
        selected={tags}
        severity={severity}
        onToggle={onSelect}
      />
      <div className="inline-add">
        <input value={value} onChange={(event) => setValue(event.target.value)} placeholder="Add custom item" onKeyDown={(event) => event.key === "Enter" && onAdd()} />
        <button onClick={onAdd}>Add</button>
      </div>
    </section>
  );
}

function OptionPicker({ options, selected, onToggle, severity }) {
  if (!options.length) return null;
  return (
    <div className={`option-picker ${severity || ""}`}>
      {options.map((item) => (
        <button key={item} className={selected.includes(item) ? "selected" : ""} onClick={() => onToggle(item)}>
          <span>{item}</span>
          {selected.includes(item) && <b aria-hidden="true">x</b>}
        </button>
      ))}
    </div>
  );
}

function TagList({ tags, severity = "soft", onRemove }) {
  if (!tags.length) return null;
  return (
    <div className="tag-row editable-tags">
      {tags.map((tag) => <button className={severity} key={tag} onClick={() => onRemove(tag)}>{tag} x</button>)}
    </div>
  );
}

function ChoiceCard({ icon, title, text, active, onClick }) {
  return (
    <button className={`choice-card ${active ? "active" : ""}`} onClick={onClick}>
      <Icon name={icon} />
      <span><strong>{title}</strong><small>{text}</small></span>
      <b>&gt;</b>
    </button>
  );
}

function MemberCard({ member, organizer, onRemove }) {
  return (
    <article className="member-card">
      <Avatar name={member.name} />
      <div><strong>{member.name} {organizer && "(You)"}</strong><small>{member.role}</small></div>
      <div className="member-notes">{(member.notes || []).slice(0, 2).map((note) => <span key={note}>{note}</span>)}</div>
      {onRemove ? <button className="remove-button" onClick={onRemove}>x</button> : <b>&gt;</b>}
    </article>
  );
}

function DishGroup({ dishes, empty, selectedIds, toggleSelected }) {
  if (!dishes.length) return <EmptyState title={empty} text="Add more menu information to improve suggestions." />;
  return (
    <div className="recommend-box">
      {dishes.map((dish) => <MiniDish key={dish.id} dish={dish} selected={selectedIds.includes(dish.id)} onClick={() => toggleSelected(dish.id)} />)}
    </div>
  );
}

function DishCard({ dish, compact, onClick, action = "View", onAction }) {
  return (
    <article className={`dish-card ${compact ? "compact" : ""}`} onClick={onClick}>
      <FoodArt tone={dish.tone} />
      <span className="dish-copy">
        <strong>{dish.name}</strong>
        <OriginalName dish={dish} />
        {!dish.originalName && dish.description && <small>{dish.description}</small>}
        <RiskLine dish={dish} />
      </span>
      <button className="dish-action" onClick={onAction || onClick}>{action}</button>
    </article>
  );
}

function MiniDish({ dish, selected, onClick }) {
  return (
    <button className="mini-dish" onClick={onClick}>
      <FoodArt tone={dish.tone} />
      <span><strong>{dish.name}</strong><OriginalName dish={dish} /><RiskLine dish={dish} /></span>
      <b>{selected ? "Added" : "+"}</b>
    </button>
  );
}

function OriginalName({ dish }) {
  if (!dish.originalName || dish.originalName === dish.name) return null;
  return <small className="original-name">{dish.originalName}</small>;
}

function IngredientDetails({ dish }) {
  const groups = [
    ["Visible ingredients", dish.visibleIngredients],
    ["Likely ingredients", dish.likelyIngredients],
    ["Allergy/risk clues", dish.allergyRisks],
    ["Ask staff about", dish.uncertaintyNotes]
  ].filter(([, items]) => Array.isArray(items) && items.length);

  if (!groups.length && !dish.subtitle) {
    return <p className="body-copy">No ingredient details were detected. Ask staff to confirm ingredients and preparation.</p>;
  }

  return (
    <div className="ingredient-groups">
      {groups.map(([label, items]) => (
        <div key={label}>
          <strong>{label}</strong>
          <div className="pill-row">
            {items.map((item) => <span key={`${label}-${item}`}>{item}</span>)}
          </div>
        </div>
      ))}
      {!groups.length && dish.subtitle && <p className="body-copy">{dish.subtitle}</p>}
    </div>
  );
}

function RiskLine({ dish }) {
  return <small className={`risk-line ${dish.risk}`}>{dish.riskLabel}</small>;
}

function Legend() {
  return (
    <div className="legend">
      <span><i className="green-dot" />OK</span>
      <span><i className="orange-dot" />Soft conflict</span>
      <span><i className="red-dot" />Hard conflict</span>
    </div>
  );
}

function BottomNav({ active, setScreen }) {
  const items = [["Home", 0, "home"], ["Session", 2, "session"], ["Profile", 1, "person"], ["Summary", 9, "gear"]];
  return (
    <footer className="bottom-nav">
      {items.map(([label, target, icon]) => (
        <button className={active === target ? "active" : ""} onClick={() => setScreen(target)} key={label}>
          <Icon name={icon} />
          <span>{label}</span>
        </button>
      ))}
    </footer>
  );
}

function EmptyState({ title, text }) {
  return (
    <div className="empty-state">
      <strong>{title}</strong>
      <p>{text}</p>
    </div>
  );
}

function AvatarStrip({ names }) {
  return <div className="avatars">{names.map((name) => <Avatar key={name} name={name} small />)}</div>;
}

function Avatar({ name, small }) {
  const safe = String(name || "U");
  return <span className={`avatar ${small ? "small" : ""}`}>{safe.slice(0, 1).toUpperCase()}</span>;
}

function FoodArt({ tone }) {
  return <span className={`food-art ${tone || "green"}`}><i /><i /><i /></span>;
}

function Icon({ name }) {
  return <span className={`app-icon ${name}`} aria-hidden="true" />;
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  });
}
