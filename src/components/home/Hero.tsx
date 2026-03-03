"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";

const words = ["Job-Ready.", "Leadership-Ready.", "Future-Ready."];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [exiting, setExiting] = useState(false);

  // Entrance animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-line", {
        y: 80,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power4.out",
        delay: 0.3,
      });
      gsap.from(".hero-sub", {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.9,
        ease: "power3.out",
      });
      gsap.from(".hero-cta", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        delay: 1.1,
        ease: "power3.out",
      });
      gsap.from(".hero-stats", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        delay: 1.4,
        ease: "power3.out",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // Word cycling — pure React + CSS animations, no GSAP refs
  useEffect(() => {
    const interval = setInterval(() => {
      // Step 1: trigger exit animation
      setExiting(true);
      // Step 2: after exit, swap word and enter
      setTimeout(() => {
        setCurrentIndex((i) => (i + 1) % words.length);
        setExiting(false);
      }, 450);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ backgroundColor: "var(--color-cream)" }}
    >
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute rounded-full blur-3xl"
          style={{ top: "15%", left: "35%", width: 500, height: 500, background: "rgba(29,79,216,0.04)" }}
        />
        <div
          className="absolute rounded-full blur-3xl"
          style={{ bottom: "15%", right: "15%", width: 380, height: 380, background: "rgba(201,168,76,0.07)" }}
        />
      </div>

      {/* Grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.025,
          backgroundImage:
            "linear-gradient(#0D1B3E 1px, transparent 1px), linear-gradient(90deg, #0D1B3E 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Two-column layout */}
      <div className="relative z-10 w-full hero-container" style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ── LEFT: Content ── */}
          <div className="flex flex-col">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 20px",
                borderRadius: 999,
                border: "1px solid rgba(201,168,76,0.35)",
                background: "rgba(201,168,76,0.06)",
                marginBottom: 40,
                alignSelf: "flex-start",
              }}
            >
              <span
                style={{
                  width: 6, height: 6, borderRadius: "50%",
                  background: "var(--color-gold)",
                  display: "inline-block",
                  animation: "pulse 2s infinite",
                }}
              />
              <span style={{
                fontFamily: "var(--font-dm)",
                fontSize: "0.7rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--color-gold)",
              }}>
                AI-Powered Professional Growth
              </span>
            </motion.div>

            {/* Headline group */}
            <div style={{ marginBottom: 8 }}>
              <div className="overflow-hidden">
                <h1
                  className="hero-line"
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontWeight: 300,
                    fontSize: "clamp(2.8rem, 4.5vw, 5rem)",
                    lineHeight: 1.0,
                    letterSpacing: "-0.02em",
                    color: "var(--color-navy)",
                    margin: 0,
                  }}
                >
                  Become
                </h1>
              </div>

              {/* Cycling word wrapper */}
              <div
                style={{
                  position: "relative",
                  overflow: "hidden",
                  height: "clamp(2.8rem, 4.5vw, 5rem)",
                  marginTop: 4,
                  marginBottom: 4,
                }}
              >
                <span
                  key={currentIndex}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    fontFamily: "var(--font-cormorant)",
                    fontWeight: 600,
                    fontSize: "clamp(2.8rem, 4.5vw, 5rem)",
                    lineHeight: 1.0,
                    letterSpacing: "-0.02em",
                    color: "var(--color-gold)",
                    whiteSpace: "nowrap",
                    animation: exiting
                      ? "wordExit 0.4s ease-in forwards"
                      : "wordEnter 0.5s ease-out forwards",
                  }}
                >
                  {words[currentIndex]}
                </span>
              </div>

              <div className="overflow-hidden">
                <p
                  className="hero-line"
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontWeight: 300,
                    fontSize: "clamp(2.8rem, 4.5vw, 5rem)",
                    lineHeight: 1.0,
                    letterSpacing: "-0.02em",
                    color: "var(--color-navy)",
                    margin: 0,
                  }}
                >
                  Powered by AI.
                </p>
              </div>
            </div>

            {/* Subheading */}
            <p
              className="hero-sub"
              style={{
                fontFamily: "var(--font-dm)",
                fontWeight: 300,
                fontSize: "0.95rem",
                lineHeight: 1.7,
                color: "var(--color-text-muted)",
                maxWidth: 420,
                marginTop: 24,
                marginBottom: 36,
              }}
            >
              MentorLeap is an AI-powered skill acceleration ecosystem combining
              real-world mentorship, executive coaching, and 24×7 AI learning support.
            </p>

            {/* CTAs */}
            <div
              className="hero-cta"
              style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 48 }}
            >
              <Link
                href="/executive-coaching"
                className="group"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "14px 28px",
                  borderRadius: 999,
                  background: "var(--color-navy)",
                  color: "var(--color-cream)",
                  fontFamily: "var(--font-dm)",
                  fontSize: "0.875rem",
                  fontWeight: 400,
                  textDecoration: "none",
                  transition: "background 0.3s",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "var(--color-navy-light)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "var(--color-navy)";
                }}
              >
                Start Your Growth Journey
                <ArrowRight size={16} />
              </Link>

              <Link
                href="/executive-coaching"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "14px 28px",
                  borderRadius: 999,
                  border: "1px solid rgba(13,27,62,0.2)",
                  color: "var(--color-navy)",
                  fontFamily: "var(--font-dm)",
                  fontSize: "0.875rem",
                  fontWeight: 400,
                  textDecoration: "none",
                  transition: "border-color 0.3s, color 0.3s",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--color-gold)";
                  (e.currentTarget as HTMLElement).style.color = "var(--color-gold)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(13,27,62,0.2)";
                  (e.currentTarget as HTMLElement).style.color = "var(--color-navy)";
                }}
              >
                Explore Executive Coaching
              </Link>
            </div>

            {/* Stats */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 40 }}>
              {([
                { value: "500+", label: "Professionals Coached", star: false },
                { value: "20+", label: "Years Experience", star: false },
                { value: "4.9", label: "Average Rating", star: true },
              ] as { value: string; label: string; star: boolean }[]).map((stat) => (
                <div key={stat.label} className="hero-stats">
                  <div style={{
                    fontFamily: "var(--font-cormorant)",
                    fontWeight: 500,
                    fontSize: "2.5rem",
                    color: "var(--color-navy)",
                    lineHeight: 1,
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                  }}>
                    {stat.value}
                    {stat.star && (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--color-navy)" style={{ flexShrink: 0, marginBottom: 2 }}>
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    )}
                  </div>
                  <div style={{
                    fontFamily: "var(--font-dm)",
                    fontSize: "0.62rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--color-text-muted)",
                    marginTop: 5,
                  }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Placeholder image ── */}
          <div
            className="hidden lg:flex items-center justify-center"
            style={{ height: "100%" }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                maxWidth: 520,
                aspectRatio: "4 / 5",
                borderRadius: 20,
                overflow: "hidden",
                background:
                  "linear-gradient(145deg, rgba(13,27,62,0.05) 0%, rgba(201,168,76,0.09) 100%)",
                border: "1px solid rgba(201,168,76,0.18)",
              }}
            >
              {/* Dashed inner frame */}
              <div
                style={{
                  position: "absolute",
                  inset: 16,
                  borderRadius: 12,
                  border: "1px dashed rgba(201,168,76,0.28)",
                  pointerEvents: "none",
                }}
              />

              {/* Placeholder icon + label */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 12,
                }}
              >
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(201,168,76,0.1)",
                    border: "1px solid rgba(201,168,76,0.3)",
                  }}
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="3" width="18" height="18" rx="2"
                      stroke="var(--color-gold)" strokeWidth="1.5" />
                    <circle cx="8.5" cy="8.5" r="1.5"
                      stroke="var(--color-gold)" strokeWidth="1.5" />
                    <path d="M21 15L16 10L5 21"
                      stroke="var(--color-gold)" strokeWidth="1.5"
                      strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-dm)",
                    fontSize: "0.72rem",
                    letterSpacing: "0.09em",
                    textTransform: "uppercase",
                    color: "var(--color-text-muted)",
                  }}
                >
                  Replace with your image
                </p>
              </div>

              {/* Decorative dots */}
              <div style={{
                position: "absolute", top: 24, right: 24,
                width: 32, height: 32, borderRadius: "50%",
                background: "rgba(201,168,76,0.18)",
              }} />
              <div style={{
                position: "absolute", bottom: 28, left: 28,
                width: 16, height: 16, borderRadius: "50%",
                background: "rgba(13,27,62,0.1)",
              }} />
              <div style={{
                position: "absolute", top: "40%", left: 20,
                width: 8, height: 8, borderRadius: "50%",
                background: "rgba(201,168,76,0.3)",
              }} />
            </div>
          </div>

        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        style={{
          position: "absolute",
          bottom: 32,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
        }}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span style={{
          fontFamily: "var(--font-dm)",
          fontSize: "0.62rem",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "var(--color-text-muted)",
        }}>
          Scroll
        </span>
        <ChevronDown size={14} style={{ color: "var(--color-text-muted)" }} />
      </motion.div>

      {/* Keyframes for cycling word + responsive padding */}
      <style>{`
        @keyframes wordEnter {
          0%   { transform: translateY(44px); opacity: 0; }
          100% { transform: translateY(0);    opacity: 1; }
        }
        @keyframes wordExit {
          0%   { transform: translateY(0);     opacity: 1; }
          100% { transform: translateY(-44px); opacity: 0; }
        }
        .hero-container {
          padding: 128px 80px 80px;
        }
        @media (max-width: 1024px) {
          .hero-container { padding: 120px 48px 64px; }
        }
        @media (max-width: 640px) {
          .hero-container { padding: 100px 24px 60px; }
        }
      `}</style>
    </section>
  );
}
