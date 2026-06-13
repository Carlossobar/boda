import React, { useState } from "react";
import { tokens } from "../theme/tokens";
import { useIsMobile } from "../hooks/useIsMobile";
import { FadeIn } from "./FadeIn";

export function NavCards({ onNavigate }) {
  const cards = [
    {
      label: "NUESTRA HISTORIA",
      bg: "linear-gradient(160deg, #2a2420 0%, #3d3028 50%, #1a1510 100%)",
      accent: "#c8b89a",
    },
    {
      label: "LOS DETALLES",
      onClick: () => onNavigate("details"),
      bg: "linear-gradient(160deg, #b8aa90 0%, #c8bc9c 50%, #a89878 100%)",
      accent: "#f0ebe3",
    },
  ];

  return (
    <section
      className="responsive-grid"
      style={{
        background: tokens.white,
        padding: "0 0 0 0",
      }}
    >
      {cards.map((card, i) => (
        <NavCard key={i} card={card} />
      ))}
    </section>
  );
}

function NavCard({ card }) {
  const [hovered, setHovered] = useState(false);
  const isMobile = useIsMobile();

  const activeHover = hovered && !isMobile;

  return (
    <div
      onClick={() => {
        if (card.onClick) card.onClick();
        else if (card.href) window.location.href = card.href;
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="responsive-card"
      style={{
        position: "relative",
        background: card.bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        overflow: "hidden",
        transition: "transform 0.4s ease",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: activeHover
            ? "rgba(0,0,0,0.15)"
            : "rgba(0,0,0,0)",
          transition: "background 0.4s ease",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.05,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
      <div
        style={{
          position: "relative",
          textAlign: "center",
          transform: activeHover ? "translateY(-4px)" : "translateY(0)",
          transition: "transform 0.4s ease",
          width: "100%",
        }}
      >
        <FadeIn distance={20}>
          <span
            style={{
              fontFamily: tokens.font.serif,
              fontSize: isMobile ? "20px" : "clamp(22px, 2.5vw, 36px)",
              letterSpacing: 6,
              color: card.accent,
              fontWeight: 400,
              display: "block",
              paddingBottom: 8,
              borderBottom: `1px solid ${card.accent}`,
            }}
          >
            {card.label}
          </span>
        </FadeIn>
      </div>
    </div>
  );
}
