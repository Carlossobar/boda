import React, { useState, useEffect } from "react";
import { tokens } from "./theme/tokens";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { NavCards } from "./components/NavCards";
import { HeroSection } from "./sections/HeroSection";
import { CountdownSection } from "./sections/CountdownSection";
import { RegistrySection } from "./sections/RegistrySection";
import { StreamingSection } from "./sections/StreamingSection";
import { RsvpSection } from "./sections/RsvpSection";
import { DetailsPage } from "./pages/DetailsPage";

export default function App() {
  const [currentView, setCurrentView] = useState("home");

  useEffect(() => {
    // Load Google Fonts
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600;1,700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.background = tokens.white;
    document.body.style.overflowX = "hidden";
  }, []);

  if (currentView === "details") {
    return <DetailsPage onBack={() => setCurrentView("home")} />;
  }

  return (
    <div style={{ fontFamily: tokens.font.serif }}>
      <Navbar onNavigate={setCurrentView} />
      <HeroSection />
      <CountdownSection />
      <NavCards onNavigate={setCurrentView} />
      <RegistrySection />
      <StreamingSection />
      <RsvpSection />
      <Footer />
    </div>
  );
}
