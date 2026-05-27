import { useState, useEffect, useRef } from "react";

// ── Design tokens ────────────────────────────────────────────────
const tokens = {
  cream: "#f0ebe3",
  black: "#1a1a1a",
  white: "#ffffff",
  olive: "#6b7055",
  oliveLight: "#8a9070",
  warmGray: "#9e9890",
  font: {
    serif: "'Cormorant Garamond', 'Times New Roman', serif",
    sansSerif: "'Cormorant', 'Georgia', serif",
  },
};

// ── Hook Responsivo ──────────────────────────────────────────────
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize(); // Evaluar al montar
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
}

// ── Componente Animado (Scroll Fade In) ──────────────────────────
function FadeIn({ children, delay = 0, distance = 30 }) {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          observer.unobserve(domRef.current);
        }
      },
      { threshold: 0.15 } // Se activa cuando el 15% es visible
    );
    if (domRef.current) observer.observe(domRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={domRef}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : `translateY(${distance}px)`,
        transition: `opacity 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}s, transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}s`,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </div>
  );
}

// ── Navbar ───────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = ["INICIO", "NUESTRA HISTORIA", "DETALLES", "CONFIRMAR"];

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
      {/* Logo */}
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

      {/* Nav links */}
      {isMobile ? (
        <div>
          {/* Botón menú móvil */}
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

          {/* Menú desplegable */}
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
                  key={link}
                  href="#"
                  onClick={() => setMenuOpen(false)}
                  style={{
                    fontFamily: tokens.font.serif,
                    fontSize: 16,
                    letterSpacing: 3,
                    color: tokens.black,
                    textDecoration: "none",
                    fontWeight: 500,
                  }}
                >
                  {link}
                </a>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* Menú Escritorio */
        <div style={{ display: "flex", gap: 48, alignItems: "center" }}>
          {navLinks.map((link) => (
            <a
              key={link}
              href="#"
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
              {link}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

// ── Hero Section ─────────────────────────────────────────────────
function HeroSection() {
  const isMobile = useIsMobile();

  return (
    <section style={{ paddingTop: isMobile ? 65 : 90 }}>
      {/* Big title with couple photo */}
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
        {/* Background photo */}
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

        {/* Dark overlay for text legibility */}
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

      {/* Hero section with invitation text */}
      <div
        style={{
          position: "relative",
          height: isMobile ? "75vh" : "75vh",
          minHeight: isMobile ? 400 : 560,
          background: "linear-gradient(135deg, #7a8a7a 0%, #5a6a5a 40%, #8a9a8a 100%)",
          overflow: "hidden",
        }}
      >
        {/* Botanical background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 20% 60%, rgba(180,200,160,0.4) 0%, transparent 60%), radial-gradient(ellipse at 80% 30%, rgba(120,150,110,0.3) 0%, transparent 50%), linear-gradient(160deg, #6b7a60 0%, #4a5a45 50%, #7a8a70 100%)",
          }}
        />
        {/* Decorative circles */}
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

        {/* Centered text */}
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
                fontSize: isMobile ? "18px" : "clamp(20px, 2vw, 30px)",
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
                fontSize: isMobile ? "15px" : "clamp(18px, 1.8vw, 26px)",
                color: tokens.white,
                lineHeight: 1.8,
                letterSpacing: 1,
              }}
            >
              Sábado 3 de Octubre, 2026
              <br />
              Calera de Tango
              <br />
              Santiago, Chile
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ── Navigation Cards Grid ─────────────────────────────────────────
function NavCards() {
  const cards = [
    {
      label: "NUESTRA HISTORIA",
      bg: "linear-gradient(160deg, #2a2420 0%, #3d3028 50%, #1a1510 100%)",
      accent: "#c8b89a",
    },
    {
      label: "LOS DETALLES",
      bg: "linear-gradient(160deg, #b8aa90 0%, #c8bc9c 50%, #a89878 100%)",
      accent: "#f0ebe3",
    },
    {
      label: "CONFIRMAR",
      bg: "linear-gradient(160deg, #6a7a8a 0%, #7a8a9a 50%, #5a6a7a 100%)",
      accent: "#e8e0d8",
    },
    {
      label: "MESA DE REGALOS",
      bg: "linear-gradient(160deg, #b8bcc8 0%, #c8ccd8 50%, #a8acb8 100%)",
      accent: "#2a2a3a",
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
  
  // Activar animación de hover únicamente en desktop
  const activeHover = hovered && !isMobile;

  return (
    <div
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
      {/* Noise texture overlay */}
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

      {/* Decorative grain effect */}
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

// ── Registry Section ──────────────────────────────────────────────
function RegistrySection() {
  const [hovered, setHovered] = useState(false);
  const isMobile = useIsMobile();

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
      {/* Decorative botanical elements */}
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
            MESA DE REGALOS
          </h2>
        </FadeIn>
        <FadeIn distance={30} delay={0.2}>
          <p
            style={{
              fontFamily: tokens.font.serif,
              fontSize: isMobile ? "16px" : "clamp(18px, 1.6vw, 24px)",
              color: tokens.white,
              lineHeight: 1.7,
              fontStyle: "italic",
              marginBottom: isMobile ? 32 : 48,
            }}
          >
            Su presencia es el regalo más valioso para nosotros.
            Si desean hacernos un obsequio, hemos preparado una lista
            de regalos para ayudarnos a comenzar esta nueva etapa juntos.
          </p>
        </FadeIn>
        <FadeIn distance={30} delay={0.4}>
          <button
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
            VER MESA DE REGALOS
          </button>
        </FadeIn>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────
function Footer() {
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
          3 DE OCTUBRE, 2026
        </div>
      </FadeIn>
    </footer>
  );
}

// ── Root App ──────────────────────────────────────────────────────
export default function App() {
  useEffect(() => {
    // Load Google Fonts
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.background = tokens.white;
    document.body.style.overflowX = "hidden";
  }, []);

  return (
    <div style={{ fontFamily: tokens.font.serif }}>
      <Navbar />
      <HeroSection />
      <NavCards />
      <RegistrySection />
      <Footer />
    </div>
  );
}
