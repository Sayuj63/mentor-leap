"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const credentials = [
  { label: "Experience", value: "20+ Years" },
  { label: "Specialty", value: "Exec. Comms" },
  { label: "Background", value: "Broadcasting" },
  { label: "Professionals", value: "500+ Coached" },
];

const ease = [0.16, 1, 0.3, 1] as const;

export default function AboutMridu() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "6%"]);

  return (
    <section
      ref={ref}
      style={{ backgroundColor: "var(--color-cream)", position: "relative", overflow: "hidden" }}
    >
      {/* Watermark letters */}
      <motion.div style={{ y: bgY }} aria-hidden>
        <div style={{
          position: "absolute",
          top: "-6%",
          right: "-1%",
          fontFamily: "var(--font-cormorant)",
          fontWeight: 300,
          fontSize: "clamp(12rem, 25vw, 24rem)",
          lineHeight: 0.85,
          color: "rgba(13,27,62,0.035)",
          letterSpacing: "-0.05em",
          userSelect: "none",
          pointerEvents: "none",
          zIndex: 0,
        }}>
          MB
        </div>
      </motion.div>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 80px" }} className="about-wrap">

        {/* Top rule */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.1, ease }}
          style={{ height: 1, backgroundColor: "var(--color-cream-border)", transformOrigin: "left", marginBottom: 0 }}
        />

        <div style={{ position: "relative", zIndex: 1 }}>

          {/* ── Row 1: label column + giant headline ── */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "180px 1fr",
            borderBottom: "1px solid var(--color-cream-border)",
          }} className="about-top-row">

            {/* Vertical label */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease }}
              style={{
                borderRight: "1px solid var(--color-cream-border)",
                padding: "52px 0",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <span style={{
                fontFamily: "var(--font-dm)",
                fontSize: "0.58rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--color-gold)",
              }}>
                Meet the Founder
              </span>
              <span style={{
                fontFamily: "var(--font-cormorant)",
                fontWeight: 300,
                fontSize: "0.8rem",
                color: "rgba(107,107,107,0.5)",
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}>
                MentorLeap · 2024
              </span>
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.2, ease }}
              style={{ padding: "52px 0 52px 60px" }}
            >
              <h2 style={{
                fontFamily: "var(--font-cormorant)",
                fontWeight: 300,
                fontSize: "clamp(2.6rem, 4.8vw, 5rem)",
                lineHeight: 1.02,
                letterSpacing: "-0.025em",
                color: "var(--color-navy)",
                margin: 0,
              }}>
                Mridu{" "}
                <em style={{ fontStyle: "italic", fontWeight: 500, color: "var(--color-gold)" }}>
                  Bhandari
                </em>{" "}
                didn't just
                <br />
                study communication —
                <br />
                <em style={{ fontStyle: "italic", fontWeight: 500 }}>she lived it.</em>
              </h2>
            </motion.div>
          </div>

          {/* ── Row 2: image | bio ── */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            borderBottom: "1px solid var(--color-cream-border)",
          }} className="about-main-row">

            {/* Image column */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.25, ease }}
              style={{
                borderRight: "1px solid var(--color-cream-border)",
                padding: "60px 60px 60px 0",
                position: "relative",
              }}
            >
              <div style={{
                position: "relative",
                aspectRatio: "3/4",
                borderRadius: 16,
                overflow: "hidden",
                background: "linear-gradient(150deg, rgba(13,27,62,0.07) 0%, rgba(201,168,76,0.09) 100%)",
                border: "1px solid rgba(201,168,76,0.14)",
              }}>
                <Image
                  src="/WhatsApp Image 2026-03-02 at 20.41.01.jpeg"
                  alt="Mridu Bhandari"
                  fill
                  style={{ objectFit: "cover" }}
                />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "45%", background: "linear-gradient(to top, rgba(13,27,62,0.18), transparent)", zIndex: 1 }} />
              </div>

              {/* Tab badge hanging off the right edge */}
              <motion.div
                initial={{ opacity: 0, x: 16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.75, ease }}
                style={{
                  position: "absolute",
                  bottom: 80,
                  right: -1,
                  backgroundColor: "var(--color-navy)",
                  padding: "14px 22px",
                  borderRadius: "10px 0 0 10px",
                  zIndex: 3,
                }}
              >
                <div style={{ fontFamily: "var(--font-cormorant)", fontWeight: 500, fontSize: "1.7rem", color: "var(--color-gold)", lineHeight: 1 }}>20+</div>
                <div style={{ fontFamily: "var(--font-dm)", fontSize: "0.52rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(250,250,247,0.55)", marginTop: 3 }}>Years</div>
              </motion.div>
            </motion.div>

            {/* Bio column */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.35, ease }}
              style={{ padding: "60px 0 60px 60px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}
            >
              <div>
                <p style={{ fontFamily: "var(--font-dm)", fontWeight: 300, fontSize: "1rem", lineHeight: 1.85, color: "var(--color-text-muted)", marginBottom: 20 }}>
                  With over two decades in broadcast journalism, anchoring, and
                  executive communication coaching, Mridu has shaped professionals
                  into confident communicators and strategic leaders.
                </p>
                <p style={{ fontFamily: "var(--font-dm)", fontWeight: 300, fontSize: "0.88rem", lineHeight: 1.8, color: "var(--color-text-muted)", marginBottom: 40 }}>
                  MentorLeap is built on her research, practical frameworks, and
                  real-world training. Mentor AI carries her methodology — but
                  mentorship remains human-led.
                </p>

                {/* 2×2 stat grid */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, backgroundColor: "var(--color-cream-border)", marginBottom: 48 }}>
                  {credentials.map((c, i) => (
                    <motion.div
                      key={c.label}
                      initial={{ opacity: 0, y: 8 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.5 + i * 0.07, ease }}
                      style={{ backgroundColor: "var(--color-cream)", padding: "18px 20px" }}
                    >
                      <div style={{ fontFamily: "var(--font-cormorant)", fontWeight: 500, fontSize: "1.2rem", color: "var(--color-navy)", lineHeight: 1, marginBottom: 3 }}>
                        {c.value}
                      </div>
                      <div style={{ fontFamily: "var(--font-dm)", fontSize: "0.58rem", letterSpacing: "0.09em", textTransform: "uppercase", color: "var(--color-text-muted)" }}>
                        {c.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
                <Link
                  href="/executive-coaching"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    padding: "13px 26px", borderRadius: 999,
                    backgroundColor: "var(--color-navy)", color: "var(--color-cream)",
                    fontFamily: "var(--font-dm)", fontSize: "0.82rem",
                    textDecoration: "none", transition: "background-color 0.3s",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "var(--color-navy-light)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "var(--color-navy)"; }}
                >
                  Book Discovery Call
                  <ArrowUpRight size={14} />
                </Link>
                <Link
                  href="/studio"
                  style={{
                    fontFamily: "var(--font-dm)", fontSize: "0.78rem",
                    color: "var(--color-text-muted)", textDecoration: "none",
                    borderBottom: "1px solid rgba(107,107,107,0.28)", paddingBottom: 2,
                    transition: "color 0.2s, border-color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "var(--color-gold)";
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--color-gold)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "var(--color-text-muted)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(107,107,107,0.28)";
                  }}
                >
                  Read her story →
                </Link>
              </div>
            </motion.div>
          </div>

          {/* ── Row 3: credential ticker ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.65, ease }}
            style={{ padding: "18px 0", display: "flex", alignItems: "center", gap: 0, overflow: "hidden" }}
          >
            {[
              "Award-Winning Broadcast Journalist",
              "Executive Communication Coach",
              "Corporate Trainer",
              "Public Speaker",
              "Mentor & Founder",
              "Award-Winning Broadcast Journalist",
              "Executive Communication Coach",
              "Corporate Trainer",
            ].map((item, i) => (
              <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 20, flexShrink: 0, whiteSpace: "nowrap" }}>
                <span style={{
                  fontFamily: "var(--font-dm)", fontSize: "0.62rem",
                  letterSpacing: "0.12em", textTransform: "uppercase",
                  color: i % 2 === 0 ? "var(--color-text-muted)" : "rgba(107,107,107,0.35)",
                  padding: "0 20px",
                }}>
                  {item}
                </span>
                <span style={{ width: 3, height: 3, borderRadius: "50%", backgroundColor: "var(--color-gold)", opacity: 0.45, flexShrink: 0 }} />
              </span>
            ))}
          </motion.div>

        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .about-wrap { padding: 0 48px !important; }
          .about-top-row { grid-template-columns: 1fr !important; }
          .about-top-row > div:first-child {
            border-right: none !important;
            border-bottom: 1px solid var(--color-cream-border);
            flex-direction: row !important;
            padding: 20px 0 !important;
            justify-content: space-between !important;
          }
          .about-main-row { grid-template-columns: 1fr !important; }
          .about-main-row > div:first-child { border-right: none !important; padding: 48px 0 !important; }
          .about-main-row > div:last-child { padding: 0 0 48px !important; }
        }
        @media (max-width: 640px) {
          .about-wrap { padding: 0 24px !important; }
        }
      `}</style>
    </section>
  );
}
