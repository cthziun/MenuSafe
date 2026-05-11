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

export default function App() {
  const [screen, setScreen] = useState(1);
  const [profile, setProfile] = useState(makeDefaultProfile);
  const [files, setFiles] = useState([]);
  const [ocrText, setOcrText] = useState("");
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

  function handleFiles(event) {
    const uploaded = Array.from(event.target.files || []);
    setFiles(uploaded.map((file) => ({ name: file.name, url: URL.createObjectURL(file) })));
    setOcrText(DEMO_OCR_TEXT);
  }

  function runAnalysis(useDemo = false) {
    const sourceText = useDemo ? DEMO_OCR_TEXT : ocrText;
    if (useDemo && !ocrText) setOcrText(DEMO_OCR_TEXT);

    setIsAnalyzing(true);
    setScreen(2);
    window.setTimeout(() => {
      setResults(analyzeMenu(profile, sourceText));
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
            isAnalyzing={isAnalyzing}
            profileSummary={profileSummary}
            onBack={() => setScreen(1)}
            onFiles={handleFiles}
            onSetOcrText={setOcrText}
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
