import React, { useState, useEffect, useRef } from "react";

export function FadeIn({ children, delay = 0, distance = 30 }) {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          if (domRef.current) observer.unobserve(domRef.current);
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
