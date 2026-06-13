import React from "react";
import { tokens } from "../theme/tokens";
import { useIsMobile } from "../hooks/useIsMobile";
import { FadeIn } from "./FadeIn";

export function Footer() {
  const isMobile = useIsMobile();

  return (
    <footer
      style={{
        background: tokens.cream,
        padding: isMobile ? "60px 24px 40px" : "100px 60px 80px",
        textAlign: "center",
      }}
    >
      <FadeIn distance={20}>
        <div
          style={{
            fontFamily: tokens.font.serif,
            fontSize: isMobile ? "44px" : "clamp(48px, 6vw, 84px)",
            fontWeight: 300,
            color: tokens.black,
            marginBottom: 20,
            letterSpacing: 4,
          }}
        >
          C&amp;E
        </div>
      </FadeIn>
      <FadeIn distance={20} delay={0.2}>
        <div
          style={{
            fontFamily: tokens.font.serif,
            fontSize: isMobile ? "15px" : "clamp(18px, 1.8vw, 24px)",
            letterSpacing: 6,
            color: tokens.black,
            lineHeight: 1.8,
          }}
        >
          SÁBADO,
          <br />
          03 DE OCTUBRE, 2026
        </div>
      </FadeIn>
    </footer>
  );
}
