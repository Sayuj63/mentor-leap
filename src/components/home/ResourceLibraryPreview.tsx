"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight, BookOpen, Headphones, FileText, Video, ArrowUpRight } from "lucide-react";

const resources = [
  { icon: Video,      title: "Recorded Bootcamps",            count: "12+", desc: "Full immersive bootcamp recordings at your pace" },
  { icon: BookOpen,   title: "Executive Presence Frameworks", count: "8+",  desc: "Structured frameworks Mridu uses in real coaching" },
  { icon: Headphones, title: "Audio Mindset Bundles",         count: "6+",  desc: "Mindset conditioning sessions for your commute" },
  { icon: FileText,   title: "Communication Toolkits",        count: "15+", desc: "Ready-to-use templates and workbooks" },
  { icon: BookOpen,   title: "Leadership Case Studies",       count: "10+", desc: "Real-world breakdowns of leadership moments" },
  { icon: Video,      title: "Public Speaking Drills",        count: "20+", desc: "Practice modules for high-stakes presentations" },
];

// Duplicate for seamless loop
const track = [...resources, ...resources];

const ease = [0.16, 1, 0.3, 1] as const;

export default function ResourceLibraryPreview() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      style={{ backgroundColor: "var(--color-navy)", padding: "96px 0 112px", overflow: "hidden" }}
    >
      {/* Background */}
      <div aria-hidden style={{
        position: "absolute", bottom: 0, left: "35%",
        width: 500, height: 500, borderRadius: "50%",
        background: "rgba(201,168,76,0.05)", filter: "blur(90px)",
        pointerEvents: "none",
      }} />

      {/* ── Header ── */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 80px 64px" }} className="rl-pad">
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 48,
          alignItems: "flex-end",
        }} className="rl-header-grid">

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease }}
          >
            <span style={{
              fontFamily: "var(--font-dm)", fontSize: "0.65rem",
              letterSpacing: "0.14em", textTransform: "uppercase",
              color: "var(--color-gold)", display: "block", marginBottom: 20,
            }}>
              Resource Library
            </span>
            <h2 style={{
              fontFamily: "var(--font-cormorant)", fontWeight: 300,
              fontSize: "clamp(2.4rem, 3.8vw, 4rem)",
              lineHeight: 1.05, letterSpacing: "-0.02em",
              color: "var(--color-cream)", margin: 0,
            }}>
              Learn on your
              <br />
              <em style={{ fontStyle: "italic", fontWeight: 500, color: "var(--color-gold)" }}>
                own terms.
              </em>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease }}
            style={{ display: "flex", flexDirection: "column", gap: 16 }}
          >
            <p style={{
              fontFamily: "var(--font-dm)", fontWeight: 300,
              fontSize: "0.95rem", lineHeight: 1.75,
              color: "rgba(250,250,247,0.55)", margin: 0,
            }}>
              A growing digital library of structured learning tools — built by Mridu,
              unlocking access to your personal AI practice assistant.
            </p>
            <Link
              href="/resource-library"
              style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                fontFamily: "var(--font-dm)", fontSize: "0.82rem",
                color: "var(--color-gold)", textDecoration: "none",
                borderBottom: "1px solid rgba(201,168,76,0.3)", paddingBottom: 2,
                width: "fit-content", transition: "border-color 0.2s",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--color-gold)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,168,76,0.3)"; }}
            >
              Explore Library
              <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* ── Infinite carousel ── */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        {/* Left fade */}
        <div aria-hidden style={{
          position: "absolute", left: 0, top: 0, bottom: 0, width: 120, zIndex: 10,
          background: "linear-gradient(to right, var(--color-navy), transparent)",
          pointerEvents: "none",
        }} />
        {/* Right fade */}
        <div aria-hidden style={{
          position: "absolute", right: 0, top: 0, bottom: 0, width: 120, zIndex: 10,
          background: "linear-gradient(to left, var(--color-navy), transparent)",
          pointerEvents: "none",
        }} />

        <motion.div
          style={{
            display: "flex",
            gap: 20,
            width: "max-content",
            paddingLeft: 80,
          }}
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 32,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {track.map((res, i) => {
            const Icon = res.icon;
            return (
              <Link
                key={i}
                href="/resource-library"
                style={{ textDecoration: "none", flexShrink: 0, width: 280, display: "block" }}
              >
                <div
                  style={{
                    padding: "28px 24px",
                    borderRadius: 16,
                    border: "1px solid rgba(250,250,247,0.08)",
                    backgroundColor: "rgba(250,250,247,0.03)",
                    height: 210,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    cursor: "pointer",
                    transition: "border-color 0.3s, background-color 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "rgba(201,168,76,0.35)";
                    el.style.backgroundColor = "rgba(250,250,247,0.06)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "rgba(250,250,247,0.08)";
                    el.style.backgroundColor = "rgba(250,250,247,0.03)";
                  }}
                >
                  {/* Icon + arrow */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{
                      width: 38, height: 38, borderRadius: 10,
                      backgroundColor: "rgba(201,168,76,0.1)",
                      border: "1px solid rgba(201,168,76,0.18)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <Icon size={17} style={{ color: "var(--color-gold)" }} />
                    </div>
                    <ArrowUpRight size={12} style={{ color: "rgba(201,168,76,0.25)", marginTop: 4 }} />
                  </div>

                  {/* Content */}
                  <div>
                    <div style={{
                      fontFamily: "var(--font-cormorant)", fontWeight: 500,
                      fontSize: "2rem", lineHeight: 1,
                      color: "var(--color-gold)", marginBottom: 5,
                    }}>
                      {res.count}
                    </div>
                    <h3 style={{
                      fontFamily: "var(--font-dm)", fontWeight: 500,
                      fontSize: "0.8rem", color: "var(--color-cream)",
                      margin: "0 0 5px",
                    }}>
                      {res.title}
                    </h3>
                    <p style={{
                      fontFamily: "var(--font-dm)", fontWeight: 300,
                      fontSize: "0.7rem", lineHeight: 1.6,
                      color: "rgba(250,250,247,0.35)", margin: 0,
                    }}>
                      {res.desc}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .rl-pad { padding-left: 48px !important; padding-right: 48px !important; }
          .rl-header-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
        }
        @media (max-width: 640px) {
          .rl-pad { padding-left: 24px !important; padding-right: 24px !important; }
        }
      `}</style>
    </section>
  );
}
