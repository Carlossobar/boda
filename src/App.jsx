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
function Navbar({ onNavigate }) {
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
        /* Menú Escritorio */
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

// ── Hero Section ─────────────────────────────────────────────────
function HeroSection() {
  const isMobile = useIsMobile();

  return (
    <section>
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
                fontSize: isMobile ? "32px" : "clamp(20px, 2vw, 30px)",
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
                fontSize: isMobile ? "32px" : "clamp(18px, 1.8vw, 26px)",
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

// ── Countdown Section ─────────────────────────────────────────────
function CountdownSection() {
  const isMobile = useIsMobile();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date("2026-10-03T14:00:00").getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const timeBlocks = [
    { label: "DÍAS", value: timeLeft.days },
    { label: "HRS", value: timeLeft.hours },
    { label: "MIN", value: timeLeft.minutes },
    { label: "SEG", value: timeLeft.seconds },
  ];

  return (
    <section
      style={{
        background: tokens.cream,
        padding: isMobile ? "60px 24px" : "100px 60px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <FadeIn distance={30}>
        <div
          style={{
            fontFamily: tokens.font.serif,
            fontSize: isMobile ? 24 : 32,
            color: tokens.olive,
            letterSpacing: 6,
            marginBottom: 40,
            textAlign: "center",
            fontWeight: 400,
          }}
        >
          FALTAN
        </div>
      </FadeIn>

      <FadeIn distance={30} delay={0.2}>
        <div
          style={{
            display: "flex",
            gap: isMobile ? 24 : 64,
            justifyContent: "center",
          }}
        >
          {timeBlocks.map((block, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                minWidth: isMobile ? 60 : 100,
              }}
            >
              <div
                style={{
                  fontFamily: tokens.font.serif,
                  fontSize: isMobile ? "38px" : "clamp(48px, 6vw, 72px)",
                  fontWeight: 300,
                  color: tokens.black,
                  lineHeight: 1,
                  marginBottom: 12,
                }}
              >
                {String(block.value).padStart(2, "0")}
              </div>
              <div
                style={{
                  fontFamily: tokens.font.sansSerif,
                  fontSize: isMobile ? 12 : 14,
                  letterSpacing: 4,
                  color: tokens.warmGray,
                }}
              >
                {block.label}
              </div>
            </div>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}

// ── Navigation Cards Grid ─────────────────────────────────────────
function NavCards({ onNavigate }) {
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

  // Activar animación de hover únicamente en desktop
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
            Regalo para los Novios
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

// ── RSVP Section ──────────────────────────────────────────────────
function RsvpSection() {
  const [formData, setFormData] = useState({
    name: "",
    attending: "yes",
    guestsCount: "1",
    dietary: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [hoveredSubmit, setHoveredSubmit] = useState(false);
  const isMobile = useIsMobile();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const inputStyle = {
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: `1px solid ${tokens.warmGray}`,
    padding: "12px 0",
    fontFamily: tokens.font.serif,
    fontSize: isMobile ? 16 : 18,
    color: tokens.black,
    outline: "none",
    transition: "border-color 0.3s ease",
    boxSizing: "border-box",
  };

  return (
    <section
      id="rsvp"
      style={{
        background: tokens.cream,
        padding: isMobile ? "80px 24px" : "120px 60px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <FadeIn distance={30}>
        <div style={{ textAlign: "center", marginBottom: 48, maxWidth: 600 }}>
          <h2
            style={{
              fontFamily: tokens.font.serif,
              fontSize: isMobile ? "28px" : "clamp(32px, 3.5vw, 48px)",
              letterSpacing: 4,
              color: tokens.black,
              fontWeight: 300,
              marginBottom: 24,
            }}
          >
            CONFIRMAR ASISTENCIA
          </h2>
          <p
            style={{
              fontFamily: tokens.font.serif,
              fontSize: isMobile ? "16px" : "18px",
              color: tokens.olive,
              fontStyle: "italic",
              lineHeight: 1.6,
            }}
          >
            Por favor confírmanos tu asistencia antes del 3 de Septiembre.
          </p>
        </div>
      </FadeIn>

      <FadeIn distance={30} delay={0.2}>
        <div
          style={{
            background: tokens.white,
            padding: isMobile ? "40px 24px" : "60px 80px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.05)",
            width: "100%",
            maxWidth: 600,
            boxSizing: "border-box",
          }}
        >
          {submitted ? (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <h3 style={{ fontFamily: tokens.font.serif, fontSize: 24, color: tokens.olive, marginBottom: 16 }}>¡Gracias por confirmar!</h3>
              <p style={{ fontFamily: tokens.font.serif, fontSize: 18, color: tokens.warmGray, fontStyle: "italic" }}>
                Hemos recibido tu respuesta.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 32 }}>

              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Nombre y Apellido(s)"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                  onFocus={(e) => e.target.style.borderBottomColor = tokens.olive}
                  onBlur={(e) => e.target.style.borderBottomColor = tokens.warmGray}
                />
              </div>

              <div>
                <p style={{ fontFamily: tokens.font.serif, fontSize: 16, color: tokens.warmGray, marginBottom: 16, letterSpacing: 1 }}>¿ASISTIRÁS?</p>
                <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: isMobile ? 16 : 32 }}>
                  <label style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer", fontFamily: tokens.font.serif, fontSize: 18, color: tokens.black }}>
                    <div style={{
                      width: 18, height: 18, borderRadius: "50%", border: `1px solid ${formData.attending === "yes" ? tokens.olive : tokens.warmGray}`,
                      display: "flex", alignItems: "center", justifyContent: "center"
                    }}>
                      {formData.attending === "yes" && <div style={{ width: 10, height: 10, borderRadius: "50%", background: tokens.olive }} />}
                    </div>
                    <input type="radio" name="attending" value="yes" checked={formData.attending === "yes"} onChange={handleChange} style={{ display: "none" }} />
                    Sí, allí estaré
                  </label>
                  <label style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer", fontFamily: tokens.font.serif, fontSize: 18, color: tokens.black }}>
                    <div style={{
                      width: 18, height: 18, borderRadius: "50%", border: `1px solid ${formData.attending === "no" ? tokens.olive : tokens.warmGray}`,
                      display: "flex", alignItems: "center", justifyContent: "center"
                    }}>
                      {formData.attending === "no" && <div style={{ width: 10, height: 10, borderRadius: "50%", background: tokens.olive }} />}
                    </div>
                    <input type="radio" name="attending" value="no" checked={formData.attending === "no"} onChange={handleChange} style={{ display: "none" }} />
                    No podré asistir
                  </label>
                </div>
              </div>

              {formData.attending === "yes" && (
                <FadeIn distance={10}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
                    <div>
                      <p style={{ fontFamily: tokens.font.serif, fontSize: 16, color: tokens.warmGray, marginBottom: 8, letterSpacing: 1 }}>CANTIDAD DE ASISTENTES</p>
                      <select
                        name="guestsCount"
                        value={formData.guestsCount}
                        onChange={handleChange}
                        style={{
                          ...inputStyle,
                          padding: "8px 0",
                          cursor: "pointer",
                        }}
                        onFocus={(e) => e.target.style.borderBottomColor = tokens.olive}
                        onBlur={(e) => e.target.style.borderBottomColor = tokens.warmGray}
                      >
                        <option value="1">1 persona</option>
                        <option value="2">2 personas</option>
                        <option value="3">3 personas</option>
                        <option value="4">4 personas</option>
                        <option value="5">5 personas</option>
                        <option value="6">6 personas</option>
                      </select>
                    </div>

                    <div>
                      <input
                        type="text"
                        name="dietary"
                        placeholder="Restricciones alimentarias (Opcional)"
                        value={formData.dietary}
                        onChange={handleChange}
                        style={inputStyle}
                        onFocus={(e) => e.target.style.borderBottomColor = tokens.olive}
                        onBlur={(e) => e.target.style.borderBottomColor = tokens.warmGray}
                      />
                    </div>
                  </div>
                </FadeIn>
              )}

              <div>
                <textarea
                  name="message"
                  placeholder="Un mensaje para los novios (Opcional)"
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  style={{
                    ...inputStyle,
                    resize: "vertical",
                    minHeight: 80
                  }}
                  onFocus={(e) => e.target.style.borderBottomColor = tokens.olive}
                  onBlur={(e) => e.target.style.borderBottomColor = tokens.warmGray}
                />
              </div>

              <div style={{ marginTop: 16, textAlign: "center" }}>
                <button
                  type="submit"
                  onMouseEnter={() => setHoveredSubmit(true)}
                  onMouseLeave={() => setHoveredSubmit(false)}
                  style={{
                    fontFamily: tokens.font.serif,
                    fontSize: 15,
                    letterSpacing: 4,
                    color: hoveredSubmit ? tokens.white : tokens.olive,
                    background: hoveredSubmit ? tokens.olive : "transparent",
                    border: `1px solid ${tokens.olive}`,
                    padding: "16px 48px",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    width: isMobile ? "100%" : "auto",
                  }}
                >
                  ENVIAR RESPUESTA
                </button>
              </div>
            </form>
          )}
        </div>
      </FadeIn>
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
          03 DE OCTUBRE, 2026
        </div>
      </FadeIn>
    </footer>
  );
}

// ── Itinerary Component ───────────────────────────────────────────
function Itinerary() {
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
    { time: "18:30", title: "Primer Baile", icon: "💃", desc: "Abriremos la pista de baile con nuestra canción especial." },
    { time: "19:00", title: "¡A Bailar!", icon: "🪩", desc: "Que comience la fiesta, ¡no olviden sus zapatos de baile!" },
    { time: "22:00", title: "Trasnoche", icon: "🍔", desc: "Recargaremos energías con un snack de medianoche para seguir la fiesta." },
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
        {/* Stepper Container */}
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
          {/* Active Marker */}
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

        {/* Slides Container */}
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

// ── Details Page ──────────────────────────────────────────────────
function DetailsPage({ onBack }) {
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

// ── Streaming Section ─────────────────────────────────────────────
function StreamingSection() {
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
            fontSize: isMobile ? "16px" : "18px",
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
          <p style={{ fontFamily: tokens.font.serif, fontSize: 18, margin: 0, fontStyle: "italic", letterSpacing: 1 }}>
            El enlace de YouTube estará disponible aquí el día de la boda.
          </p>
        </div>
      </FadeIn>
    </section>
  );
}

// ── Root App ──────────────────────────────────────────────────────
export default function App() {
  const [currentView, setCurrentView] = useState("home");

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
