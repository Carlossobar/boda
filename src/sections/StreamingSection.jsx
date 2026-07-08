import React from "react";
import { tokens } from "../theme/tokens";
import { useIsMobile } from "../hooks/useIsMobile";
import { FadeIn } from "../components/FadeIn";

export function StreamingSection() {
  const isMobile = useIsMobile();

  return (
    <section
      style={{
        background: tokens.olive,
        color: tokens.white,
        padding: isMobile ? "80px 24px" : "120px 60px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <FadeIn distance={30}>
        <div style={{
          width: 60, height: 60, borderRadius: "50%", background: "rgba(255,255,255,0.1)",
          display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px",
        }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path>
            <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
          </svg>
        </div>
        <h2
          style={{
            fontFamily: tokens.font.serif,
            fontSize: isMobile ? "32px" : "clamp(40px, 4vw, 56px)",
            fontWeight: 300,
            marginBottom: 24,
            letterSpacing: 2,
          }}
        >
          Acompáñanos Online
        </h2>
        <p
          style={{
            fontFamily: tokens.font.sansSerif,
            fontSize: isMobile ? "19px" : "22px",
            lineHeight: 1.8,
            maxWidth: 600,
            margin: "0 auto 40px",
            opacity: 0.9,
          }}
        >
          Sabemos que no todos quienes amamos nos podrán acompañar este día, pero queremos que sean parte de este momento vía streaming.
        </p>

        <div style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px dashed rgba(255,255,255,0.3)",
          padding: "24px 32px",
          borderRadius: 12,
          display: "inline-block",
        }}>
          <p style={{ fontFamily: tokens.font.serif, fontSize: isMobile ? 19 : 22, margin: 0, fontStyle: "italic", letterSpacing: 1 }}>
            El enlace de YouTube estará disponible aquí el día de la boda.
          </p>
        </div>
      </FadeIn>
    </section>
  );
}
