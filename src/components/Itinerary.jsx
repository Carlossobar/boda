import React, { useState, useEffect, useRef } from "react";
import { tokens } from "../theme/tokens";
import { useIsMobile } from "../hooks/useIsMobile";
import { FadeIn } from "./FadeIn";

export function Itinerary() {
  const isMobile = useIsMobile();
  const [activeIndex, setActiveIndex] = useState(0);
  const [markerStyle, setMarkerStyle] = useState({ width: 0, left: 0, height: 0, top: 0 });
  const stepRefs = useRef([]);
  const stepperRef = useRef(null);

  const schedule = [
    { time: "13:30", title: "Ceremonia", icon: "💍", desc: "Acompáñanos a dar el 'Sí, quiero' en una ceremonia llena de amor." },
    { time: "15:00", title: "Cocktail", icon: "🥂", desc: "Brindemos juntos por este nuevo comienzo mientras disfrutamos de unos aperitivos." },
    { time: "16:00", title: "Recepción", icon: "✨", desc: "Nuestra entrada oficial para dar inicio a la celebración." },
    { time: "17:00", title: "Banquete", icon: "🍽️", desc: "Disfrutaremos de una deliciosa cena en compañía de todos ustedes." },
    { time: "21:00", title: "Despedida", icon: "🫂", desc: "Es momento de despedirnos " },

  ];

  useEffect(() => {
    const currentStep = stepRefs.current[activeIndex];
    const stepper = stepperRef.current;

    if (currentStep && stepper) {
      setMarkerStyle({
        width: currentStep.offsetWidth,
        height: currentStep.offsetHeight,
        left: currentStep.offsetLeft,
        top: currentStep.offsetTop,
      });
    }
  }, [activeIndex, isMobile]);

  useEffect(() => {
    const handleResize = () => {
      const currentStep = stepRefs.current[activeIndex];
      if (currentStep) {
        setMarkerStyle({
          width: currentStep.offsetWidth,
          height: currentStep.offsetHeight,
          left: currentStep.offsetLeft,
          top: currentStep.offsetTop,
        });
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeIndex]);

  return (
    <div style={{ margin: "60px 0", padding: "0 24px", width: "100%", boxSizing: "border-box", overflow: "hidden" }}>
      <FadeIn distance={20}>
        <h2 style={{ fontFamily: tokens.font.serif, fontSize: isMobile ? 32 : 40, fontWeight: 300, color: tokens.olive, marginBottom: 40, textAlign: "center" }}>
          Itinerario
        </h2>
      </FadeIn>

      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div
          ref={stepperRef}
          style={{
            position: "relative",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            background: "rgba(240,235,227,0.5)",
            borderRadius: 16,
            padding: 8,
            overflowX: isMobile ? "visible" : "auto",
            scrollbarWidth: "none",
          }}
        >
          <div style={{
            position: "absolute",
            top: markerStyle.top,
            left: markerStyle.left,
            width: markerStyle.width,
            height: markerStyle.height,
            background: tokens.white,
            borderRadius: 12,
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            transition: "all 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
            zIndex: 1
          }} />

          {schedule.map((item, i) => {
            const isActive = i === activeIndex;
            return (
              <div
                key={i}
                ref={el => stepRefs.current[i] = el}
                onClick={() => setActiveIndex(i)}
                style={{
                  position: "relative",
                  zIndex: 2,
                  padding: isMobile ? "16px 20px" : "20px 10px",
                  display: "flex",
                  flexDirection: isMobile ? "row" : "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: isMobile ? 16 : 8,
                  cursor: "pointer",
                  flex: isMobile ? "none" : 1,
                  minWidth: isMobile ? "auto" : 100,
                  transition: "color 0.3s ease",
                }}
              >
                <div style={{
                  fontSize: isMobile ? 24 : 28,
                  opacity: isActive ? 1 : 0.6,
                  transform: isActive ? "scale(1.1)" : "scale(1)",
                  transition: "all 0.3s ease"
                }}>
                  {item.icon}
                </div>
                <div style={{
                  fontFamily: tokens.font.sansSerif,
                  fontSize: 14,
                  color: isActive ? tokens.olive : tokens.warmGray,
                  fontWeight: isActive ? 600 : 400,
                  letterSpacing: 1,
                  textAlign: "center"
                }}>
                  {item.time}
                </div>
                {isMobile && (
                  <div style={{
                    fontFamily: tokens.font.serif,
                    fontSize: 18,
                    color: isActive ? tokens.black : tokens.warmGray,
                    marginLeft: "auto",
                    fontWeight: isActive ? 500 : 400
                  }}>
                    {item.title}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div style={{
          marginTop: 24,
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: tokens.white,
          borderRadius: 16,
          padding: isMobile ? "32px 24px" : "48px 40px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.03)"
        }}>
          {schedule.map((item, i) => {
            const isActive = i === activeIndex;
            return (
              <div
                key={i}
                style={{
                  position: isActive ? "relative" : "absolute",
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? "translateY(0) scale(1)" : "translateY(10px) scale(0.98)",
                  transition: "all 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
                  pointerEvents: isActive ? "auto" : "none",
                  textAlign: "center",
                  width: "100%",
                }}
              >
                {!isMobile && (
                  <div style={{ fontSize: 48, marginBottom: 20 }}>{item.icon}</div>
                )}
                <h3 style={{ fontFamily: tokens.font.serif, fontSize: isMobile ? 28 : 36, color: tokens.olive, marginBottom: 16, fontWeight: 400 }}>
                  {item.title}
                </h3>
                <p style={{ fontFamily: tokens.font.sansSerif, fontSize: isMobile ? 15 : 18, color: tokens.black, lineHeight: 1.6, maxWidth: 600, margin: "0 auto", fontStyle: "italic" }}>
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
