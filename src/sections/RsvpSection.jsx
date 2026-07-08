import React, { useState } from "react";
import { tokens } from "../theme/tokens";
import { useIsMobile } from "../hooks/useIsMobile";
import { FadeIn } from "../components/FadeIn";

export function RsvpSection() {
  const [formData, setFormData] = useState({
    name1: "",
    name2: "",
    name3: "",
    name4: "",
    name5: "",
    name6: "",
    attending: "yes",
    dietary: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hoveredSubmit, setHoveredSubmit] = useState(false);
  const isMobile = useIsMobile();
  const [companionsCount, setCompanionsCount] = useState(0);

  const removeCompanion = (targetNum) => {
    setFormData((prev) => {
      const updated = { ...prev };
      for (let i = targetNum; i <= companionsCount; i++) {
        updated[`name${i}`] = updated[`name${i + 1}`] || "";
      }
      updated[`name${companionsCount + 1}`] = "";
      return updated;
    });
    setCompanionsCount((prev) => Math.max(0, prev - 1));
  };

  // ⚠️ IMPORTANTE: Pega aquí la URL que te dio Google Apps Script en el paso 3.
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzYQKKS26JKjo3c1ivmwJjAmsYAr2G8RusJjzNEp7ptEDF0lIPy8h1esQXsuZpe1yCy/exec";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!GOOGLE_SCRIPT_URL || GOOGLE_SCRIPT_URL === "INSERTAR_URL_AQUI" || GOOGLE_SCRIPT_URL.includes("INSERTAR_URL_AQUI")) {
        alert("Falta configurar la URL de Google Sheets en el código.");
        setIsSubmitting(false);
        return;
      }

      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(formData),
      });

      setSubmitted(true);
    } catch (error) {
      alert("Hubo un error al enviar el formulario. Por favor, intenta de nuevo.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
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
    fontSize: isMobile ? 19 : 22,
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
              fontSize: isMobile ? "20px" : "24px",
              color: tokens.olive,
              fontStyle: "italic",
              lineHeight: 1.6,
              marginBottom: 8,
            }}
          >
            Por favor confírmanos tu asistencia antes del 3 de Septiembre.
          </p>
          <p
            style={{
              fontFamily: tokens.font.serif,
              fontSize: isMobile ? "18px" : "21px",
              color: tokens.black,
              lineHeight: 1.5,
              margin: 0,
            }}
          >
            En caso de no confirmar, <strong style={{ fontWeight: 700, color: "#000000" }}>se entenderá que no participarás de la boda</strong>.
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
              <h3 style={{ fontFamily: tokens.font.serif, fontSize: isMobile ? 28 : 34, color: tokens.olive, marginBottom: 16 }}>¡Gracias por confirmar!</h3>
              <p style={{ fontFamily: tokens.font.serif, fontSize: isMobile ? 20 : 24, color: tokens.warmGray, fontStyle: "italic" }}>
                Hemos recibido tu respuesta.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              <div
                style={{
                  background: "rgba(107, 112, 85, 0.08)",
                  border: `1px solid rgba(107, 112, 85, 0.3)`,
                  borderRadius: 6,
                  padding: isMobile ? "18px 20px" : "22px 28px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  textAlign: "center",
                }}
              >
                <p
                  style={{
                    fontFamily: tokens.font.serif,
                    fontSize: isMobile ? 19 : 22,
                    color: tokens.black,
                    margin: 0,
                    lineHeight: 1.6,
                  }}
                >
                  <strong style={{ color: tokens.olive, fontWeight: 700, fontSize: "1.08em", letterSpacing: 0.5 }}>NOTA IMPORTANTE:</strong> Por favor toma en cuenta que la confirmación es exclusivamente para los{" "}
                  <strong style={{ fontWeight: 700, color: "#000000", paddingBottom: 1 }}>
                    acompañantes invitados por los novios
                  </strong>{" "}
                  indicados en tu invitación.
                </p>
                <div style={{ height: 1, background: "rgba(107, 112, 85, 0.25)", margin: "4px auto", width: "80%" }} />
                <p
                  style={{
                    fontFamily: tokens.font.serif,
                    fontSize: isMobile ? 19 : 22,
                    color: tokens.black,
                    margin: 0,
                    lineHeight: 1.6,
                  }}
                >
                  Amamos a los niños, pero esta vez la boda se realizará{" "}
                  <strong style={{ fontWeight: 700, color: "#000000", fontStyle: "normal", paddingBottom: 1 }}>
                    sin ellos
                  </strong>
                  . ¡Agradecemos mucho tu comprensión!
                </p>
                <div style={{ height: 1, background: "rgba(107, 112, 85, 0.25)", margin: "4px auto", width: "80%" }} />
                <p
                  style={{
                    fontFamily: tokens.font.serif,
                    fontSize: isMobile ? 19 : 22,
                    color: tokens.black,
                    margin: 0,
                    lineHeight: 1.6,
                  }}
                >
                  En caso de no confirmar tu asistencia,{" "}
                  <strong style={{ fontWeight: 700, color: "#000000", fontStyle: "normal", paddingBottom: 1 }}>
                    se entenderá que no participarás de la boda
                  </strong>
                  .
                </p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <p style={{ fontFamily: tokens.font.serif, fontSize: isMobile ? 18 : 20, color: tokens.warmGray, margin: 0, letterSpacing: 1 }}>NOMBRES DE LOS ASISTENTES</p>
                {Array.from({ length: companionsCount + 1 }, (_, i) => i + 1).map((num) => (
                  <div key={num} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <input
                      type="text"
                      name={`name${num}`}
                      placeholder={num === 1 ? "Tu Nombre y Apellido(s)" : `Acompañante ${num - 1}`}
                      value={formData[`name${num}`] || ""}
                      onChange={handleChange}
                      required={num === 1}
                      style={{ ...inputStyle, flex: 1 }}
                      onFocus={(e) => (e.target.style.borderBottomColor = tokens.olive)}
                      onBlur={(e) => (e.target.style.borderBottomColor = tokens.warmGray)}
                    />
                    {num > 1 && (
                      <button
                        type="button"
                        onClick={() => removeCompanion(num)}
                        style={{
                          background: "transparent",
                          border: "none",
                          color: tokens.warmGray,
                          cursor: "pointer",
                          fontFamily: tokens.font.serif,
                          fontSize: isMobile ? 16 : 18,
                          padding: "4px 8px",
                          transition: "color 0.2s ease",
                        }}
                        onMouseEnter={(e) => (e.target.style.color = "#c0392b")}
                        onMouseLeave={(e) => (e.target.style.color = tokens.warmGray)}
                        title="Eliminar acompañante"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}

                <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 8 }}>
                  <div style={{ display: "flex", justifyContent: "flex-start" }}>
                    <button
                      type="button"
                      onClick={() => setCompanionsCount((prev) => prev + 1)}
                      style={{
                        background: "transparent",
                        border: `1px dashed ${tokens.olive}`,
                        borderRadius: 4,
                        padding: "10px 20px",
                        fontFamily: tokens.font.serif,
                        fontSize: isMobile ? 18 : 20,
                        color: tokens.olive,
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "rgba(107, 112, 85, 0.08)";
                        e.currentTarget.style.borderStyle = "solid";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.borderStyle = "dashed";
                      }}
                    >
                      <span style={{ fontSize: 20, fontWeight: 600, lineHeight: 1 }}>+</span> Agregar un acompañante más
                    </button>
                  </div>
                  <span style={{ fontFamily: tokens.font.serif, fontSize: isMobile ? 16 : 18, color: tokens.black, marginLeft: 2 }}>
                    * <strong style={{ fontWeight: 700, color: "#000000" }}>Solo los acompañantes contemplados en tu invitación</strong>
                  </span>
                </div>
              </div>

              <div>
                <p style={{ fontFamily: tokens.font.serif, fontSize: isMobile ? 18 : 20, color: tokens.warmGray, marginBottom: 16, letterSpacing: 1 }}>¿ASISTIRÁS?</p>
                <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: isMobile ? 16 : 32 }}>
                  <label style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer", fontFamily: tokens.font.serif, fontSize: isMobile ? 20 : 22, color: tokens.black }}>
                    <div style={{
                      width: 18, height: 18, borderRadius: "50%", border: `1px solid ${formData.attending === "yes" ? tokens.olive : tokens.warmGray}`,
                      display: "flex", alignItems: "center", justifyContent: "center"
                    }}>
                      {formData.attending === "yes" && <div style={{ width: 10, height: 10, borderRadius: "50%", background: tokens.olive }} />}
                    </div>
                    <input type="radio" name="attending" value="yes" checked={formData.attending === "yes"} onChange={handleChange} style={{ display: "none" }} />
                    Sí, allí estaré
                  </label>
                  <label style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer", fontFamily: tokens.font.serif, fontSize: isMobile ? 20 : 22, color: tokens.black }}>
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
                  disabled={isSubmitting}
                  onMouseEnter={() => setHoveredSubmit(true)}
                  onMouseLeave={() => setHoveredSubmit(false)}
                  style={{
                    fontFamily: tokens.font.serif,
                    fontSize: isMobile ? 17 : 19,
                    letterSpacing: 4,
                    color: hoveredSubmit || isSubmitting ? tokens.white : tokens.olive,
                    background: hoveredSubmit || isSubmitting ? tokens.olive : "transparent",
                    border: `1px solid ${tokens.olive}`,
                    padding: "16px 48px",
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                    transition: "all 0.3s ease",
                    width: isMobile ? "100%" : "auto",
                    opacity: isSubmitting ? 0.7 : 1,
                  }}
                >
                  {isSubmitting ? "ENVIANDO..." : "ENVIAR RESPUESTA"}
                </button>
              </div>
            </form>
          )}
        </div>
      </FadeIn>
    </section>
  );
}
