import React, { useState, useEffect } from "react";
import { tokens } from "../theme/tokens";
import { useIsMobile } from "../hooks/useIsMobile";
import { FadeIn } from "../components/FadeIn";

export function CountdownSection() {
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
