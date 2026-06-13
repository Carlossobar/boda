import React, { useState } from "react";
import { tokens } from "../theme/tokens";
import { useIsMobile } from "../hooks/useIsMobile";
import { FadeIn } from "../components/FadeIn";

export function RegistrySection() {
  const [hovered, setHovered] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [copied, setCopied] = useState(false);
  const isMobile = useIsMobile();

  const bankData = {
    banco: "Mercado Pago",
    tipo: "Cuenta Vista ",
    numero: "1061383970",
    rut: "20871569-0",
    nombre: "Elizabeth Bernales",
    correo: "eabernalesvega@gmail.com"
  };

  const copyBankDetails = () => {
    const textToCopy = `Banco: ${bankData.banco}\nTipo de cuenta: ${bankData.tipo}\nNúmero de cuenta: ${bankData.numero}\nRUT: ${bankData.rut}\nNombre: ${bankData.nombre}\nCorreo: ${bankData.correo}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section
      style={{
        position: "relative",
        minHeight: isMobile ? "75vh" : "80vh",
        background: "linear-gradient(160deg, #6a7055 0%, #7a8060 40%, #5a6045 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: isMobile ? "60px 24px" : "100px 60px",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      {[
        { bottom: "5%", left: "8%", h: 220, w: 60, rotate: "-15deg" },
        { bottom: "5%", right: "8%", h: 200, w: 55, rotate: "10deg" },
        { bottom: "10%", left: "25%", h: 160, w: 45, rotate: "-5deg" },
      ].map((stem, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            bottom: stem.bottom,
            left: stem.left,
            right: stem.right,
            width: stem.w,
            height: stem.h,
            background:
              "linear-gradient(to top, rgba(80,100,60,0.6), rgba(100,130,70,0.3))",
            borderRadius: "50% 50% 10% 10%",
            transform: `rotate(${stem.rotate})`,
            opacity: 0.6,
          }}
        />
      ))}

      <div style={{ position: "relative", zIndex: 1, maxWidth: 720 }}>
        <FadeIn distance={30}>
          <h2
            style={{
              fontFamily: tokens.font.serif,
              fontSize: isMobile ? "28px" : "clamp(28px, 3vw, 48px)",
              letterSpacing: 6,
              color: tokens.white,
              fontWeight: 300,
              marginBottom: isMobile ? 20 : 32,
            }}
          >
            Regalo para los Novios
          </h2>
        </FadeIn>
        <FadeIn distance={30} delay={0.2}>
          <p
            style={{
              fontFamily: tokens.font.serif,
              fontSize: isMobile ? "22px" : "clamp(18px, 1.6vw, 24px)",
              color: tokens.white,
              lineHeight: 1.7,
              fontStyle: "italic",
              marginBottom: isMobile ? 32 : 48,
            }}
          >
            Su presencia es el regalo más valioso para nosotros.
            Si deseas hacernos un obsequio, puedes hacerlo mediante transferencia a nuestra cuenta bancaria.
            Sería de gran ayuda para comenzar esta nueva etapa juntos.
          </p>
        </FadeIn>
        <FadeIn distance={30} delay={0.4}>
          {!showDetails ? (
            <button
              onClick={() => setShowDetails(true)}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              style={{
                fontFamily: tokens.font.serif,
                fontSize: isMobile ? 14 : 16,
                letterSpacing: 4,
                color: hovered && !isMobile ? tokens.black : tokens.white,
                background: hovered && !isMobile ? "rgba(240,235,227,1)" : "rgba(180,170,150,0.5)",
                border: "1px solid rgba(240,235,227,0.6)",
                borderRadius: 50,
                padding: isMobile ? "16px 40px" : "20px 80px",
                maxWidth: "100%",
                boxSizing: "border-box",
                cursor: "pointer",
                transition: "all 0.3s ease",
                backdropFilter: "blur(4px)",
              }}
            >
              VER DATOS BANCARIOS
            </button>
          ) : (
            <div
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: 16,
                padding: isMobile ? "24px" : "40px",
                backdropFilter: "blur(10px)",
                textAlign: "left",
                maxWidth: 400,
                margin: "0 auto",
                boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.2)", paddingBottom: 8 }}>
                  <span style={{ color: "rgba(255,255,255,0.7)", fontFamily: tokens.font.sansSerif, fontSize: 14 }}>Banco</span>
                  <span style={{ color: tokens.white, fontFamily: tokens.font.sansSerif, fontSize: 15, fontWeight: 500 }}>{bankData.banco}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.2)", paddingBottom: 8 }}>
                  <span style={{ color: "rgba(255,255,255,0.7)", fontFamily: tokens.font.sansSerif, fontSize: 14 }}>Tipo</span>
                  <span style={{ color: tokens.white, fontFamily: tokens.font.sansSerif, fontSize: 15, fontWeight: 500 }}>{bankData.tipo}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.2)", paddingBottom: 8 }}>
                  <span style={{ color: "rgba(255,255,255,0.7)", fontFamily: tokens.font.sansSerif, fontSize: 14 }}>Número</span>
                  <span style={{ color: tokens.white, fontFamily: tokens.font.sansSerif, fontSize: 15, fontWeight: 500 }}>{bankData.numero}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.2)", paddingBottom: 8 }}>
                  <span style={{ color: "rgba(255,255,255,0.7)", fontFamily: tokens.font.sansSerif, fontSize: 14 }}>RUT</span>
                  <span style={{ color: tokens.white, fontFamily: tokens.font.sansSerif, fontSize: 15, fontWeight: 500 }}>{bankData.rut}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.2)", paddingBottom: 8 }}>
                  <span style={{ color: "rgba(255,255,255,0.7)", fontFamily: tokens.font.sansSerif, fontSize: 14 }}>Nombre</span>
                  <span style={{ color: tokens.white, fontFamily: tokens.font.sansSerif, fontSize: 15, fontWeight: 500 }}>{bankData.nombre}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: 4 }}>
                  <span style={{ color: "rgba(255,255,255,0.7)", fontFamily: tokens.font.sansSerif, fontSize: 14 }}>Correo</span>
                  <span style={{ color: tokens.white, fontFamily: tokens.font.sansSerif, fontSize: 15, fontWeight: 500 }}>{bankData.correo}</span>
                </div>
              </div>
              <button
                onClick={copyBankDetails}
                style={{
                  width: "100%",
                  fontFamily: tokens.font.serif,
                  fontSize: 15,
                  letterSpacing: 2,
                  color: copied ? tokens.white : tokens.black,
                  background: copied ? tokens.oliveLight : tokens.cream,
                  border: "none",
                  borderRadius: 50,
                  padding: "16px 24px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8
                }}
              >
                {copied ? (
                  <>✓ DATOS COPIADOS</>
                ) : (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                    COPIAR DATOS
                  </>
                )}
              </button>
            </div>
          )}
        </FadeIn>
      </div>
    </section>
  );
}
