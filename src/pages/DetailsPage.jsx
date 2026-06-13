import React, { useEffect } from "react";
import { tokens } from "../theme/tokens";
import { useIsMobile } from "../hooks/useIsMobile";
import { FadeIn } from "../components/FadeIn";
import { Itinerary } from "../components/Itinerary";

export function DetailsPage({ onBack }) {
  const isMobile = useIsMobile();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ background: tokens.cream, minHeight: "100vh", paddingBottom: 60 }}>
      {/* Navbar for details page */}
      <nav
        style={{
          padding: isMobile ? "15px 24px" : "20px 80px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "rgba(240,235,227,0.9)",
          backdropFilter: "blur(8px)",
          position: "sticky",
          top: 0,
          zIndex: 100,
          borderBottom: "1px solid rgba(0,0,0,0.08)",
        }}
      >
        <div style={{ fontFamily: tokens.font.serif, fontSize: 24, letterSpacing: 2 }}>C&amp;E</div>
        <button
          onClick={onBack}
          style={{
            background: "none",
            border: "none",
            fontFamily: tokens.font.serif,
            fontSize: 14,
            letterSpacing: 2,
            cursor: "pointer",
            textDecoration: "underline",
            textUnderlineOffset: 4,
            color: tokens.black,
            fontWeight: 500,
          }}
        >
          VOLVER AL INICIO
        </button>
      </nav>

      <div style={{ maxWidth: 800, margin: "0 auto", padding: isMobile ? "40px 24px" : "80px 24px", textAlign: "center" }}>
        <FadeIn distance={20}>
          <h1 style={{ fontFamily: tokens.font.serif, fontSize: isMobile ? 36 : 56, fontWeight: 300, color: tokens.olive, marginBottom: 24 }}>
            Nuestro nuevo comienzo
          </h1>
          <p style={{ fontFamily: tokens.font.sansSerif, fontSize: isMobile ? 16 : 18, color: tokens.black, lineHeight: 1.8, marginBottom: 48, fontStyle: "italic" }}>
            Por el fruto de oraciones, sueños y mucho amor, con gratitud a Dios<br />
            queremos invitarte a celebrar el inicio de nuestra familia
          </p>
        </FadeIn>

        <FadeIn distance={20} delay={0.2}>
          <div style={{ display: "flex", flexDirection: "column", gap: 32, marginBottom: 60 }}>
            {/* Date */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
              <div style={{ width: 50, height: 50, borderRadius: "50%", background: tokens.oliveLight, display: "flex", alignItems: "center", justifyContent: "center", color: tokens.white }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              </div>
              <div style={{ fontFamily: tokens.font.serif, fontSize: 24, color: tokens.black }}>
                03 Octubre 2026
              </div>
            </div>

            <hr style={{ width: "60%", border: "none", borderTop: `1px solid ${tokens.warmGray}`, margin: "0 auto", opacity: 0.5 }} />

            {/* Time */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
              <div style={{ width: 50, height: 50, borderRadius: "50%", background: tokens.oliveLight, display: "flex", alignItems: "center", justifyContent: "center", color: tokens.white }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              </div>
              <div style={{ fontFamily: tokens.font.serif, fontSize: 24, color: tokens.black }}>
                14:00 HRS
              </div>
            </div>

            <hr style={{ width: "60%", border: "none", borderTop: `1px solid ${tokens.warmGray}`, margin: "0 auto", opacity: 0.5 }} />

            {/* Location */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
              <div style={{ width: 50, height: 50, borderRadius: "50%", background: tokens.oliveLight, display: "flex", alignItems: "center", justifyContent: "center", color: tokens.white }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              </div>
              <div style={{ fontFamily: tokens.font.serif, fontSize: 24, color: tokens.black }}>
                Calera de Tango
              </div>
            </div>
          </div>
        </FadeIn>

        <Itinerary />

        <FadeIn distance={20} delay={0.4}>
          <div style={{ marginBottom: 60 }}>
            <h2 style={{ fontFamily: tokens.font.serif, fontSize: isMobile ? 32 : 40, fontWeight: 300, color: tokens.olive, marginBottom: 16 }}>
              Ubicación
            </h2>
            <p style={{ fontFamily: tokens.font.sansSerif, fontSize: isMobile ? 16 : 18, color: tokens.black, lineHeight: 1.6, marginBottom: 32 }}>
              La celebración se realizará en una hermosa parcela en <strong>Calera de Tango</strong>, Región Metropolitana. <br />
              Haz clic en los botones a continuación para abrir la ruta directamente en tu GPS y llegar sin problemas.
            </p>

            <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "center", gap: 16, marginBottom: 40 }}>
              <a
                href="https://www.google.com/maps/place/33°41'47.8%22S+70°51'45.4%22W/@-33.696606,-70.8651769,17z/data=!3m1!4b1!4m4!3m3!8m2!3d-33.696606!4d-70.862602?entry=ttu"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: tokens.font.serif,
                  fontSize: 14,
                  letterSpacing: 2,
                  color: tokens.white,
                  background: tokens.olive,
                  padding: "16px 32px",
                  textDecoration: "none",
                  borderRadius: 4,
                  display: "inline-block",
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
                }}
              >
                ABRIR EN GOOGLE MAPS
              </a>
              <a
                href="https://waze.com/ul?ll=-33.696606,-70.862602&navigate=yes"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: tokens.font.serif,
                  fontSize: 14,
                  letterSpacing: 2,
                  color: tokens.olive,
                  background: "transparent",
                  border: `1px solid ${tokens.olive}`,
                  padding: "16px 32px",
                  textDecoration: "none",
                  borderRadius: 4,
                  display: "inline-block",
                  transition: "all 0.3s ease",
                }}
              >
                ABRIR EN WAZE
              </a>
            </div>

            <iframe
              src="https://maps.google.com/maps?q=-33.696606,-70.862602&hl=es&z=15&output=embed"
              width="100%"
              height={isMobile ? "300" : "450"}
              style={{ border: 0, borderRadius: 16, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </FadeIn>

        <FadeIn distance={20} delay={0.6}>
          <h2 style={{ fontFamily: tokens.font.serif, fontSize: isMobile ? 32 : 40, fontWeight: 300, color: tokens.olive, marginBottom: 20 }}>
            Confirma tu asistencia
          </h2>
          <p style={{ fontFamily: tokens.font.sansSerif, fontSize: 16, color: tokens.black, lineHeight: 1.6, marginBottom: 20 }}>
            Nos encantaría contar contigo en este día tan especial.<br />
            Por favor, confirmar asistencia antes del 12 de septiembre.
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginTop: 24 }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={tokens.olive} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
            <span style={{ fontFamily: tokens.font.sansSerif, fontSize: 20, color: tokens.black, fontWeight: 500 }}>9 222 354 51</span>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
