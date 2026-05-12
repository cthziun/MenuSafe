import React, { useEffect, useMemo, useState } from "react";
import AppHeader from "./src/components/AppHeader";
import { DEMO_OCR_TEXT } from "./src/data/menuKnowledgeBase";
import { analyzeMenu } from "./src/pipeline/menuAnalysis";
import {
  buildProfileNotice,
  buildProfileSummary,
  LOCAL_STORAGE_KEY,
  makeDefaultProfile,
} from "./src/profile/profile";
import CaptureScreen from "./src/screens/CaptureScreen";
import OrderScreen from "./src/screens/OrderScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import ResultsScreen from "./src/screens/ResultsScreen";
import StaffCardOverlay from "./src/screens/StaffCardOverlay";

const OCR_MAX_WIDTH = 1600;

function prepareImageForOcr(file) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    const url = URL.createObjectURL(file);

    image.onload = () => {
      URL.revokeObjectURL(url);
      const scale = Math.min(3, Math.max(1.5, OCR_MAX_WIDTH / image.width));
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(image.width * scale);
      canvas.height = Math.round(image.height * scale);

      const context = canvas.getContext("2d", { willReadFrequently: true });
      context.imageSmoothingEnabled = false;
      context.drawImage(image, 0, 0, canvas.width, canvas.height);

      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      for (let index = 0; index < data.length; index += 4) {
        const gray = data[index] * 0.299 + data[index + 1] * 0.587 + data[index + 2] * 0.114;
        const boosted = gray > 175 ? 255 : gray < 95 ? 0 : gray * 1.2;
        data[index] = boosted;
        data[index + 1] = boosted;
        data[index + 2] = boosted;
      }

      context.putImageData(imageData, 0, 0);
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Could not prepare image for OCR."));
      }, "image/jpeg", 0.78);
    };

    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Could not load image for OCR."));
    };

    image.src = url;
  });
}

function blobToDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("Could not read image data."));
    reader.readAsDataURL(blob);
  });
}

function formatExtractedMenu(dishes) {
  if (!dishes.length) return "";

  return dishes
    .map((dish) => {
      const name = [dish.name, dish.english_name].filter(Boolean).join(" / ");
      const ingredients = [
        ...(Array.isArray(dish.visible_ingredients) ? dish.visible_ingredients : []),
        ...(Array.isArray(dish.likely_ingredients) ? dish.likely_ingredients.map((item) => `${item} (likely)`) : []),
        ...(Array.isArray(dish.allergy_risks) ? dish.allergy_risks.map((item) => `${item} risk`) : []),
      ];
      return `${name || "Menu item"}${dish.price ? ` - ${dish.price}` : ""}: ${ingredients.join(", ")}`;
    })
    .join("\n");
}

async function analyzeMenuImage(imageBlob) {
  const image = await blobToDataUrl(imageBlob);
  const response = await fetch("/api/analyze-menu-image", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ image }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Menu image analysis failed.");
  return Array.isArray(data.dishes) ? data.dishes : [];
}

export default function App() {
  const [screen, setScreen] = useState(1);
  const [profile, setProfile] = useState(makeDefaultProfile);
  const [files, setFiles] = useState([]);
  const [ocrText, setOcrText] = useState("");
  const [extractedDishes, setExtractedDishes] = useState([]);
  const [ocrStatus, setOcrStatus] = useState("");
  const [ocrError, setOcrError] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState([]);
  const [expandedDish, setExpandedDish] = useState(null);
  const [selectedDishes, setSelectedDishes] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [showStaffCard, setShowStaffCard] = useState(false);

  useEffect(() => {
    try {
      const savedProfile = window.localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedProfile) setProfile({ ...makeDefaultProfile(), ...JSON.parse(savedProfile) });
    } catch {
      setProfile(makeDefaultProfile());
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(profile));
  }, [profile]);

  const profileSummary = useMemo(() => buildProfileSummary(profile), [profile]);
  const profileNotice = useMemo(() => buildProfileNotice(profile), [profile]);
  const selectedOrder = useMemo(
    () => results.filter((dish) => selectedDishes.includes(dish.id)),
    [results, selectedDishes]
  );

  function toggleListValue(field, id) {
    setProfile((current) => {
      const values = current[field];
      return {
        ...current,
        [field]: values.includes(id) ? values.filter((value) => value !== id) : [...values, id],
      };
    });
  }

  async function handleFiles(event) {
    const uploaded = Array.from(event.target.files || []);
    setFiles(uploaded.map((file) => ({ name: file.name, url: URL.createObjectURL(file) })));
    setOcrText("");
    setExtractedDishes([]);
    setOcrError("");

    if (!uploaded.length) {
      setOcrStatus("");
      return;
    }

    setOcrStatus("Loading image analyzer...");
    try {
      const allDishes = [];
      for (const [index, file] of uploaded.entries()) {
        setOcrStatus(`Preparing photo ${index + 1} of ${uploaded.length}...`);
        const preparedImage = await prepareImageForOcr(file);
        setOcrStatus(`Understanding menu photo ${index + 1} of ${uploaded.length} with Gemini...`);
        allDishes.push(...(await analyzeMenuImage(preparedImage)));
      }

      const text = formatExtractedMenu(allDishes);
      setExtractedDishes(allDishes);
      setOcrText(text);
      setOcrStatus(text ? "Menu extraction complete. Review the dishes, then analyze." : "No dishes were detected.");
    } catch (error) {
      setOcrStatus("");
      setOcrError(error.message || "Image analysis could not run. You can still paste menu text or use the demo menu.");
      console.error(error);
    }
  }

  function handleSetMenuText(text) {
    setOcrText(text);
    setExtractedDishes([]);
  }

  function runAnalysis(useDemo = false) {
    const sourceText = useDemo ? DEMO_OCR_TEXT : ocrText;
    if (useDemo && !ocrText) setOcrText(DEMO_OCR_TEXT);

    setIsAnalyzing(true);
    setScreen(2);
    window.setTimeout(() => {
      setResults(analyzeMenu(profile, sourceText, useDemo ? [] : extractedDishes));
      setSelectedDishes([]);
      setQuantities({});
      setExpandedDish(null);
      setIsAnalyzing(false);
      setScreen(3);
    }, 900);
  }

  function toggleDish(id) {
    setSelectedDishes((current) => {
      if (current.includes(id)) return current.filter((value) => value !== id);
      setQuantities((existing) => ({ ...existing, [id]: existing[id] || 1 }));
      return [...current, id];
    });
  }

  function setQuantity(id, value) {
    setQuantities((current) => ({ ...current, [id]: value }));
  }

  function resetFlow() {
    setScreen(1);
    setFiles([]);
    setOcrText("");
    setExtractedDishes([]);
    setOcrStatus("");
    setOcrError("");
    setResults([]);
    setSelectedDishes([]);
    setQuantities({});
    setExpandedDish(null);
    setShowStaffCard(false);
  }

  return (
    <div className="min-h-screen bg-stone-50 px-4 py-6 text-stone-900">
      <div className="mx-auto w-full max-w-md">
        <AppHeader screen={screen} onReset={resetFlow} />

        {screen === 1 && (
          <ProfileScreen
            profile={profile}
            setProfile={setProfile}
            toggleListValue={toggleListValue}
            onContinue={() => setScreen(2)}
          />
        )}

        {screen === 2 && (
          <CaptureScreen
            files={files}
            ocrText={ocrText}
            ocrStatus={ocrStatus}
            ocrError={ocrError}
            isAnalyzing={isAnalyzing}
            profileSummary={profileSummary}
            onBack={() => setScreen(1)}
            onFiles={handleFiles}
            onSetOcrText={handleSetMenuText}
            onAnalyze={runAnalysis}
          />
        )}

        {screen === 3 && (
          <ResultsScreen
            results={results}
            profileSummary={profileSummary}
            expandedDish={expandedDish}
            selectedDishes={selectedDishes}
            onSetExpandedDish={setExpandedDish}
            onToggleDish={toggleDish}
            onReviewOrder={() => setScreen(4)}
          />
        )}

        {screen === 4 && (
          <OrderScreen
            selectedOrder={selectedOrder}
            quantities={quantities}
            onBack={() => setScreen(3)}
            onSetQuantity={setQuantity}
            onShowStaffCard={() => setShowStaffCard(true)}
          />
        )}

        {showStaffCard && (
          <StaffCardOverlay
            profileNotice={profileNotice}
            selectedOrder={selectedOrder}
            quantities={quantities}
            onClose={() => setShowStaffCard(false)}
          />
        )}
      </div>
    </div>
  );
}
