import React from "react";
import { tokens } from "../theme/tokens";
import { useIsMobile } from "../hooks/useIsMobile";
import { FadeIn } from "../components/FadeIn";

export function HeroSection() {
  const isMobile = useIsMobile();

  return (
    <section>
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: isMobile ? "80px 20px 60px" : "120px 60px 100px",
          height: isMobile ? "75vh" : "80vh",
          minHeight: isMobile ? "75vh" : 600,
          overflow: "hidden",
        }}
      >
        <img
          src={`${import.meta.env.BASE_URL}hero-couple.jpg`}
          alt="Carlos y Elizabeth"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 20%",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.45)",
          }}
        />

        <FadeIn distance={40}>
          <h1
            style={{
              position: "relative",
              fontFamily: tokens.font.serif,
              fontSize: isMobile ? "clamp(38px, 10vw, 56px)" : "clamp(80px, 10vw, 180px)",
              fontWeight: 300,
              letterSpacing: 4,
              color: tokens.white,
              margin: 0,
              textAlign: "center",
              lineHeight: 1.1,
              textShadow: "0 2px 20px rgba(0,0,0,0.4)",
            }}
          >
            CARLOS &amp; ELIZABETH
          </h1>
        </FadeIn>
      </div>

      <div
        style={{
          position: "relative",
          height: isMobile ? "75vh" : "75vh",
          minHeight: isMobile ? 400 : 560,
          background: "linear-gradient(135deg, #7a8a7a 0%, #5a6a5a 40%, #8a9a8a 100%)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 20% 60%, rgba(180,200,160,0.4) 0%, transparent 60%), radial-gradient(ellipse at 80% 30%, rgba(120,150,110,0.3) 0%, transparent 50%), linear-gradient(160deg, #6b7a60 0%, #4a5a45 50%, #7a8a70 100%)",
          }}
        />
        {[
          { top: "15%", left: "10%", size: 40, opacity: 0.3 },
          { top: "25%", left: "18%", size: 25, opacity: 0.2 },
          { top: "40%", left: "7%", size: 55, opacity: 0.25 },
          { top: "10%", right: "12%", size: 35, opacity: 0.3 },
          { top: "30%", right: "8%", size: 20, opacity: 0.2 },
        ].map((dot, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: dot.top,
              left: dot.left,
              right: dot.right,
              width: dot.size,
              height: dot.size,
              borderRadius: "50%",
              background: "rgba(230,220,190,0.5)",
              opacity: dot.opacity,
            }}
          />
        ))}

        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 24px",
            textAlign: "center",
          }}
        >
          <FadeIn distance={30}>
            <p
              style={{
                fontFamily: tokens.font.serif,
                fontSize: isMobile ? "26px" : "clamp(20px, 2vw, 30px)",
                color: tokens.white,
                lineHeight: 1.6,
                marginBottom: 24,
                fontStyle: "italic",
                maxWidth: 620,
              }}
            >
              Con mucho amor y gratitud, los queremos invitar
              <br />
              a compartir junto a nosotros nuestro día de matrimonio.
            </p>
          </FadeIn>
          <FadeIn distance={30} delay={0.2}>
            <p
              style={{
                fontFamily: tokens.font.serif,
                fontSize: isMobile ? "18px" : "clamp(18px, 1.8vw, 26px)",
                color: tokens.white,
                lineHeight: 1.8,
                letterSpacing: 1,
              }}
            >
              Sábado 03 de Octubre, 2026
              <br />
              Talagante
              <br />
              Santiago, Chile
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
