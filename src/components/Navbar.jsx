import React, { useState, useEffect } from "react";
import { tokens } from "../theme/tokens";
import { useIsMobile } from "../hooks/useIsMobile";

export function Navbar({ onNavigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { name: "INICIO", href: "#", onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
    { name: "NUESTRA HISTORIA", href: "#" },
    { name: "DETALLES", onClick: () => onNavigate("details") },
    { name: "CONFIRMAR", href: "#rsvp" },
  ];

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: isMobile ? "15px 24px" : "20px 80px",
        background: scrolled ? "rgba(240,235,227,0.95)" : "rgba(240,235,227,0.85)",
        backdropFilter: "blur(8px)",
        borderBottom: scrolled ? "1px solid rgba(0,0,0,0.08)" : "none",
        transition: "all 0.4s ease",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <span
          style={{
            fontFamily: tokens.font.serif,
            fontSize: isMobile ? 22 : 28,
            fontWeight: 400,
            letterSpacing: 2,
            color: tokens.black,
          }}
        >
          C&amp;E
        </span>
        {!isMobile && (
          <span
            style={{
              fontFamily: tokens.font.serif,
              fontSize: 13,
              letterSpacing: 2,
              color: tokens.warmGray,
              fontStyle: "italic",
            }}
          >
            3 de Octubre, 2026
          </span>
        )}
      </div>

      {isMobile ? (
        <div>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: "none",
              border: "none",
              fontSize: 24,
              cursor: "pointer",
              color: tokens.black,
              padding: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            aria-label="Toggle menu"
          >
            {menuOpen ? "✕" : "☰"}
          </button>

          {menuOpen && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                background: "rgba(240,235,227,0.98)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "24px 0",
                gap: 20,
                boxShadow: "0 10px 15px rgba(0,0,0,0.05)",
                borderBottom: "1px solid rgba(0,0,0,0.05)",
              }}
            >
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href || "#"}
                  onClick={(e) => {
                    if (link.onClick) {
                      e.preventDefault();
                      link.onClick();
                    }
                    setMenuOpen(false);
                  }}
                  style={{
                    fontFamily: tokens.font.serif,
                    fontSize: 16,
                    letterSpacing: 3,
                    color: tokens.black,
                    textDecoration: "none",
                    fontWeight: 500,
                  }}
                >
                  {link.name}
                </a>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div style={{ display: "flex", gap: 48, alignItems: "center" }}>
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href || "#"}
              onClick={(e) => {
                if (link.onClick) {
                  e.preventDefault();
                  link.onClick();
                }
              }}
              style={{
                fontFamily: tokens.font.serif,
                fontSize: 13,
                letterSpacing: 3,
                color: tokens.black,
                textDecoration: "underline",
                textUnderlineOffset: 4,
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
