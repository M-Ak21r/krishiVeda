import * as React from "react";
import { useState } from "react";
import { LanguageSelection } from "./components/LanguageSelection";
import { LoginPage } from "./components/LoginPage";
import { Dashboard } from "./components/Dashboard";
import { WeatherPrediction } from "./components/WeatherPrediction";
import { PesticideRecommendation } from "./components/PesticideRecommendation";
import { ChemicalAnalysis } from "./components/ChemicalAnalysis";
import { ImageAnalysis } from "./components/ImageAnalysis";
import { CropLibrary } from "./components/CropLibrary";
import { VoiceAssistant } from "./components/VoiceAssistant";

type AppState =
  | "language"
  | "login"
  | "dashboard"
  | "weather"
  | "pesticides"
  | "chemicals"
  | "image-analysis"
  | "crop-library";

interface User {
  name: string;
  phone: string;
}

export default function App() {
  const [currentState, setCurrentState] =
    useState<AppState>("language");
  const [selectedLanguage, setSelectedLanguage] =
    useState("en");
  const [user, setUser] = useState<User | null>(null);

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
    setCurrentState("login");
  };

  const handleLogin = (userData: User) => {
    setUser(userData);
    setCurrentState("dashboard");
  };

  const handleNavigate = (page: string) => {
    setCurrentState(page as AppState);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentState("language");
  };

  const handleBack = () => {
    setCurrentState("dashboard");
  };

  switch (currentState) {
    case "language":
      return (
        <LanguageSelection
          onLanguageSelect={handleLanguageSelect}
        />
      );

    case "login":
      return (
        <LoginPage
          onLogin={handleLogin}
          selectedLanguage={selectedLanguage}
        />
      );

    case "dashboard":
      return (
        <>
          <Dashboard
            user={user!}
            selectedLanguage={selectedLanguage}
            onNavigate={handleNavigate}
            onLogout={handleLogout}
          />
          <VoiceAssistant
            selectedLanguage={selectedLanguage}
            onNavigate={handleNavigate}
            currentPage="dashboard"
          />
        </>
      );

    case "weather":
      return (
        <>
          <WeatherPrediction
            selectedLanguage={selectedLanguage}
            onBack={handleBack}
          />
          <VoiceAssistant
            selectedLanguage={selectedLanguage}
            onNavigate={handleNavigate}
            currentPage="weather"
          />
        </>
      );

    case "pesticides":
      return (
        <>
          <PesticideRecommendation
            selectedLanguage={selectedLanguage}
            onBack={handleBack}
          />
          <VoiceAssistant
            selectedLanguage={selectedLanguage}
            onNavigate={handleNavigate}
            currentPage="pesticides"
          />
        </>
      );

    case "chemicals":
      return (
        <>
          <ChemicalAnalysis
            selectedLanguage={selectedLanguage}
            onBack={handleBack}
          />
          <VoiceAssistant
            selectedLanguage={selectedLanguage}
            onNavigate={handleNavigate}
            currentPage="chemicals"
          />
        </>
      );

    case "image-analysis":
      return (
        <>
          <ImageAnalysis
            selectedLanguage={selectedLanguage}
            onBack={handleBack}
          />
          <VoiceAssistant
            selectedLanguage={selectedLanguage}
            onNavigate={handleNavigate}
            currentPage="image-analysis"
          />
        </>
      );

    case "crop-library":
      return (
        <>
          <CropLibrary
            selectedLanguage={selectedLanguage}
            onBack={handleBack}
          />
          <VoiceAssistant
            selectedLanguage={selectedLanguage}
            onNavigate={handleNavigate}
            currentPage="crop-library"
          />
        </>
      );

    default:
      return (
        <LanguageSelection
          onLanguageSelect={handleLanguageSelect}
        />
      );
  }
}