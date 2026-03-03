"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Link from "next/link";
import {
  ChevronDown, Play, CheckCircle2, Lock,
  Sparkles, Clock, Users, Award, ArrowRight, Star
} from "lucide-react";

// ── Course data ───────────────────────────────────────────────
const modules = [
  {
    number: "01",
    title: "The Identity Foundation",
    duration: "38 min",
    free: true,
    lessons: [
      { title: "Who Are You, Really?", duration: "9 min", free: true },
      { title: "The Confidence Loop", duration: "11 min", free: true },
      { title: "Rewriting Your Inner Narrative", duration: "18 min", free: true },
    ],
    description: "Discover your authentic self and build the unshakeable foundation every great personality stands on.",
  },
  {
    number: "02",
    title: "Body Language & Presence",
    duration: "44 min",
    free: true,
    lessons: [
      { title: "What Your Posture Says About You", duration: "12 min", free: true },
      { title: "Eye Contact That Commands Respect", duration: "10 min", free: true },
      { title: "The Power Pause", duration: "8 min", free: true },
      { title: "Gestures That Amplify Words", duration: "14 min", free: true },
    ],
    description: "Master the silent language that speaks before you open your mouth.",
  },
  {
    number: "03",
    title: "Communication Mastery",
    duration: "51 min",
    free: true,
    lessons: [
      { title: "The Art of Active Listening", duration: "13 min", free: true },
      { title: "Structuring Thoughts Under Pressure", duration: "16 min", free: true },
      { title: "Tone, Pace & Vocal Authority", duration: "12 min", free: true },
      { title: "Handling Difficult Conversations", duration: "10 min", free: true },
    ],
    description: "Communicate with clarity, conviction, and impact in every situation.",
  },
  {
    number: "04",
    title: "Emotional Intelligence",
    duration: "42 min",
    free: true,
    lessons: [
      { title: "Reading the Room", duration: "11 min", free: true },
      { title: "Managing Your Triggers", duration: "14 min", free: true },
      { title: "Empathy as a Leadership Tool", duration: "17 min", free: true },
    ],
    description: "Develop the emotional radar that separates great communicators from the rest.",
  },
  {
    number: "05",
    title: "Executive Presence",
    duration: "56 min",
    free: true,
    lessons: [
      { title: "Dressing Your Ambition", duration: "14 min", free: true },
      { title: "The 60-Second First Impression", duration: "11 min", free: true },
      { title: "Owning a Room Before You Speak", duration: "15 min", free: true },
      { title: "Building Your Personal Brand", duration: "16 min", free: true },
    ],
    description: "Project authority, warmth and credibility — the trifecta of executive presence.",
  },
];

const stats = [
  { icon: Clock,  value: "4.2 hrs",   label: "Total Content" },
  { icon: Users,  value: "12,400+",   label: "Enrolled" },
  { icon: Award,  value: "Certificate", label: "On Completion" },
  { icon: Star,   value: "4.9 / 5",   label: "Average Rating" },
];

const ease = [0.16, 1, 0.3, 1] as const;

// ── Main Component ────────────────────────────────────────────
export default function FreeCourse() {
  const ref            = useRef(null);
  const inView         = useInView(ref, { once: true, margin: "-60px" });
  const [open, setOpen] = useState<number | null>(0);
  const [enrolled, setEnrolled] = useState(false);
  const [stamping, setStamping] = useState(false);

  const totalLessons   = modules.reduce((a, m) => a + m.lessons.length, 0);
  const expandedModules = open !== null ? open + 1 : 0;
  const progressPct    = enrolled ? 100 : Math.round((expandedModules / modules.length) * 60);

  const handleEnroll = () => {
    if (enrolled) return;
    setStamping(true);
    setTimeout(() => { setStamping(false); setEnrolled(true); }, 900);
  };

  return (
    <section
      ref={ref}
      style={{
        backgroundColor: "var(--color-navy)",
        position: "relative",
        overflow: "hidden",
        padding: "96px 0 112px",
      }}
    >
      {/* ── Atmospheric BG ── */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage:
          "radial-gradient(ellipse 60% 60% at 100% 0%, rgba(201,168,76,0.06) 0%, transparent 65%)," +
          "radial-gradient(ellipse 50% 50% at 0% 100%, rgba(27,47,94,0.6) 0%, transparent 70%)",
      }} />
      {/* Giant watermark */}
      <div aria-hidden style={{
        position: "absolute", top: "-8%", right: "-2%",
        fontFamily: "var(--font-cormorant)", fontWeight: 700,
        fontSize: "clamp(18rem, 30vw, 28rem)",
        lineHeight: 0.85, letterSpacing: "-0.06em",
        color: "rgba(250,250,247,0.025)",
        userSelect: "none", pointerEvents: "none",
        transform: "rotate(-8deg)",
      }}>
        FREE
      </div>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 80px" }} className="fc-wrap">

        {/* ── Header ── */}
        <div style={{ marginBottom: 64 }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease }}
            style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}
          >
            <span style={{
              fontFamily: "var(--font-dm)", fontSize: "0.62rem",
              letterSpacing: "0.16em", textTransform: "uppercase",
              color: "var(--color-gold)",
            }}>
              Free Course
            </span>
            <span style={{
              fontFamily: "var(--font-dm)", fontSize: "0.6rem",
              letterSpacing: "0.1em", textTransform: "uppercase",
              color: "var(--color-navy)",
              backgroundColor: "var(--color-gold)",
              padding: "3px 10px", borderRadius: 999,
            }}>
              No Credit Card
            </span>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "flex-end" }} className="fc-head-grid">
            <motion.h2
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.1, ease }}
              style={{
                fontFamily: "var(--font-cormorant)", fontWeight: 300,
                fontSize: "clamp(2.4rem, 4vw, 4.2rem)",
                lineHeight: 1.02, letterSpacing: "-0.025em",
                color: "var(--color-cream)", margin: 0,
              }}
            >
              Personality
              <br />
              Development
              <br />
              <em style={{ fontStyle: "italic", fontWeight: 500, color: "var(--color-gold)" }}>
                Masterclass.
              </em>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2, ease }}
            >
              <p style={{
                fontFamily: "var(--font-dm)", fontWeight: 300,
                fontSize: "0.95rem", lineHeight: 1.75,
                color: "rgba(250,250,247,0.5)", marginBottom: 28,
              }}>
                A complete, structured course by Mridu Bhandari — covering everything
                from inner confidence to executive presence. Completely free. Forever.
              </p>
              {/* Stat row */}
              <div style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
                {stats.map(({ icon: Icon, value, label }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 12 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.35 + i * 0.07, ease }}
                    style={{ display: "flex", flexDirection: "column", gap: 3 }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <Icon size={13} style={{ color: "var(--color-gold)" }} />
                      <span style={{
                        fontFamily: "var(--font-cormorant)", fontWeight: 500,
                        fontSize: "1.1rem", color: "var(--color-cream)",
                      }}>
                        {value}
                      </span>
                    </div>
                    <span style={{
                      fontFamily: "var(--font-dm)", fontSize: "0.62rem",
                      letterSpacing: "0.08em", textTransform: "uppercase",
                      color: "rgba(250,250,247,0.3)",
                    }}>
                      {label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── Body: accordion + passport ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 360px",
          gap: 40,
          alignItems: "start",
        }} className="fc-body-grid">

          {/* LEFT: Module accordion */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.3, ease }}
          >
            <p style={{
              fontFamily: "var(--font-dm)", fontSize: "0.6rem",
              letterSpacing: "0.14em", textTransform: "uppercase",
              color: "rgba(250,250,247,0.28)", marginBottom: 16,
            }}>
              {modules.length} Modules · {totalLessons} Lessons
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {modules.map((mod, i) => (
                <ModuleRow
                  key={mod.number}
                  mod={mod}
                  index={i}
                  isOpen={open === i}
                  onToggle={() => setOpen(open === i ? null : i)}
                  inView={inView}
                  delay={0.35 + i * 0.06}
                />
              ))}
            </div>
          </motion.div>

          {/* RIGHT: Course passport card */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.4, ease }}
            style={{ position: "sticky", top: 100 }}
          >
            <PassportCard
              progressPct={progressPct}
              enrolled={enrolled}
              stamping={stamping}
              onEnroll={handleEnroll}
              totalLessons={totalLessons}
            />
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .fc-wrap { padding: 0 48px !important; }
          .fc-head-grid { grid-template-columns: 1fr !important; }
          .fc-body-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          .fc-wrap { padding: 0 24px !important; }
        }
      `}</style>
    </section>
  );
}

// ── Module accordion row ──────────────────────────────────────
function ModuleRow({
  mod, index, isOpen, onToggle, inView, delay,
}: {
  mod: typeof modules[0];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  inView: boolean;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{
        backgroundColor: isOpen ? "rgba(201,168,76,0.07)" : "rgba(250,250,247,0.03)",
        border: `1px solid ${isOpen ? "rgba(201,168,76,0.2)" : "rgba(250,250,247,0.07)"}`,
        borderRadius: 14,
        overflow: "hidden",
        transition: "background-color 0.3s, border-color 0.3s",
        marginBottom: 6,
      }}
    >
      {/* Header row */}
      <button
        onClick={onToggle}
        style={{
          width: "100%", background: "none", border: "none",
          padding: "18px 22px", cursor: "pointer",
          display: "flex", alignItems: "center", gap: 16,
          textAlign: "left",
        }}
      >
        {/* Number */}
        <span style={{
          fontFamily: "var(--font-cormorant)", fontWeight: 500,
          fontSize: "1.4rem", lineHeight: 1,
          color: isOpen ? "var(--color-gold)" : "rgba(250,250,247,0.2)",
          width: 32, flexShrink: 0,
          transition: "color 0.3s",
        }}>
          {mod.number}
        </span>

        {/* Title + meta */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontFamily: "var(--font-dm)", fontWeight: 500,
            fontSize: "0.9rem",
            color: isOpen ? "var(--color-cream)" : "rgba(250,250,247,0.7)",
            marginBottom: 3,
            transition: "color 0.3s",
          }}>
            {mod.title}
          </div>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <span style={{ fontFamily: "var(--font-dm)", fontSize: "0.68rem", color: "rgba(250,250,247,0.3)" }}>
              {mod.lessons.length} lessons · {mod.duration}
            </span>
            <span style={{
              fontFamily: "var(--font-dm)", fontSize: "0.55rem",
              letterSpacing: "0.1em", textTransform: "uppercase",
              color: "rgba(201,168,76,0.7)",
              backgroundColor: "rgba(201,168,76,0.1)",
              padding: "2px 8px", borderRadius: 999,
              border: "1px solid rgba(201,168,76,0.15)",
            }}>
              Free
            </span>
          </div>
        </div>

        {/* Chevron */}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown size={16} style={{ color: isOpen ? "var(--color-gold)" : "rgba(250,250,247,0.3)" }} />
        </motion.div>
      </button>

      {/* Expanded content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div style={{ padding: "0 22px 20px 70px" }}>
              {/* Description */}
              <p style={{
                fontFamily: "var(--font-dm)", fontWeight: 300,
                fontSize: "0.8rem", lineHeight: 1.7,
                color: "rgba(250,250,247,0.45)",
                marginBottom: 16, borderLeft: "1px solid rgba(201,168,76,0.2)",
                paddingLeft: 14,
              }}>
                {mod.description}
              </p>

              {/* Lessons */}
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {mod.lessons.map((lesson, j) => (
                  <motion.div
                    key={lesson.title}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: j * 0.05 }}
                    style={{
                      display: "flex", alignItems: "center", gap: 12,
                      padding: "9px 12px", borderRadius: 8,
                      backgroundColor: "rgba(250,250,247,0.03)",
                    }}
                  >
                    <div style={{
                      width: 26, height: 26, borderRadius: "50%",
                      backgroundColor: "rgba(201,168,76,0.1)",
                      border: "1px solid rgba(201,168,76,0.18)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0,
                    }}>
                      <Play size={9} fill="var(--color-gold)" style={{ color: "var(--color-gold)", marginLeft: 1 }} />
                    </div>
                    <span style={{
                      flex: 1, fontFamily: "var(--font-dm)", fontSize: "0.78rem",
                      color: "rgba(250,250,247,0.65)",
                    }}>
                      {lesson.title}
                    </span>
                    <span style={{
                      fontFamily: "var(--font-dm)", fontSize: "0.65rem",
                      color: "rgba(250,250,247,0.28)",
                      flexShrink: 0,
                    }}>
                      {lesson.duration}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Passport card ─────────────────────────────────────────────
function PassportCard({
  progressPct, enrolled, stamping, onEnroll, totalLessons,
}: {
  progressPct: number;
  enrolled: boolean;
  stamping: boolean;
  onEnroll: () => void;
  totalLessons: number;
}) {
  return (
    <div style={{
      backgroundColor: "rgba(250,250,247,0.04)",
      border: "1px solid rgba(250,250,247,0.1)",
      borderRadius: 20,
      overflow: "hidden",
      position: "relative",
    }}>
      {/* Top accent */}
      <div style={{
        height: 3,
        background: "linear-gradient(90deg, var(--color-gold), rgba(201,168,76,0.3))",
      }} />

      <div style={{ padding: "28px 28px 32px" }}>

        {/* Label */}
        <div style={{
          display: "flex", alignItems: "center", gap: 8, marginBottom: 20,
        }}>
          <Sparkles size={13} style={{ color: "var(--color-gold)" }} />
          <span style={{
            fontFamily: "var(--font-dm)", fontSize: "0.6rem",
            letterSpacing: "0.14em", textTransform: "uppercase",
            color: "rgba(201,168,76,0.7)",
          }}>
            Your Course Passport
          </span>
        </div>

        {/* Course title */}
        <h3 style={{
          fontFamily: "var(--font-cormorant)", fontWeight: 400,
          fontSize: "1.5rem", lineHeight: 1.15,
          color: "var(--color-cream)", marginBottom: 6,
        }}>
          Personality Development
          <br />
          <em style={{ fontStyle: "italic", color: "var(--color-gold)" }}>Masterclass</em>
        </h3>
        <p style={{
          fontFamily: "var(--font-dm)", fontWeight: 300, fontSize: "0.72rem",
          color: "rgba(250,250,247,0.35)", marginBottom: 24,
        }}>
          by Mridu Bhandari · MentorLeap
        </p>

        {/* Progress ring + pct */}
        <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 24 }}>
          <ProgressRing pct={progressPct} />
          <div>
            <div style={{
              fontFamily: "var(--font-cormorant)", fontWeight: 500,
              fontSize: "1.8rem", lineHeight: 1,
              color: "var(--color-cream)", marginBottom: 2,
            }}>
              {progressPct}%
            </div>
            <div style={{
              fontFamily: "var(--font-dm)", fontSize: "0.65rem",
              color: "rgba(250,250,247,0.35)",
            }}>
              {enrolled ? "Course unlocked!" : "Explore to preview"}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, backgroundColor: "rgba(250,250,247,0.07)", marginBottom: 20 }} />

        {/* Meta list */}
        {[
          ["Modules", `${modules.length} modules`],
          ["Lessons", `${totalLessons} video lessons`],
          ["Duration", "4h 11min total"],
          ["Access", "Lifetime · Free"],
          ["Certificate", "On completion"],
        ].map(([k, v]) => (
          <div key={k} style={{
            display: "flex", justifyContent: "space-between",
            marginBottom: 10,
          }}>
            <span style={{ fontFamily: "var(--font-dm)", fontSize: "0.72rem", color: "rgba(250,250,247,0.3)" }}>{k}</span>
            <span style={{ fontFamily: "var(--font-dm)", fontSize: "0.72rem", color: "rgba(250,250,247,0.65)" }}>{v}</span>
          </div>
        ))}

        {/* Divider */}
        <div style={{ height: 1, backgroundColor: "rgba(250,250,247,0.07)", margin: "20px 0" }} />

        {/* CTA */}
        <div style={{ position: "relative" }}>
          <button
            onClick={onEnroll}
            disabled={enrolled}
            style={{
              width: "100%", padding: "14px",
              borderRadius: 999,
              backgroundColor: enrolled ? "rgba(201,168,76,0.15)" : "var(--color-gold)",
              border: enrolled ? "1px solid rgba(201,168,76,0.4)" : "none",
              color: enrolled ? "var(--color-gold)" : "var(--color-navy)",
              fontFamily: "var(--font-dm)", fontWeight: 600,
              fontSize: "0.85rem", letterSpacing: "0.04em",
              cursor: enrolled ? "default" : "pointer",
              transition: "all 0.3s ease",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            }}
          >
            {enrolled ? (
              <>
                <CheckCircle2 size={15} />
                Enrolled — Start Learning
              </>
            ) : stamping ? (
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.4 }}
              >
                Enrolling...
              </motion.span>
            ) : (
              <>
                Enroll for Free
                <ArrowRight size={14} />
              </>
            )}
          </button>

          {/* Stamp animation */}
          <AnimatePresence>
            {stamping && (
              <motion.div
                initial={{ scale: 2.5, opacity: 0, rotate: -20 }}
                animate={{ scale: 1, opacity: 1, rotate: -12 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  position: "absolute",
                  top: "50%", left: "50%",
                  transform: "translate(-50%, -50%) rotate(-12deg)",
                  width: 80, height: 80,
                  borderRadius: "50%",
                  border: "3px solid var(--color-gold)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  pointerEvents: "none",
                  zIndex: 10,
                }}
              >
                <span style={{
                  fontFamily: "var(--font-cormorant)", fontWeight: 700,
                  fontSize: "0.7rem", letterSpacing: "0.1em",
                  color: "var(--color-gold)", textAlign: "center",
                  lineHeight: 1.3, textTransform: "uppercase",
                }}>
                  FREE
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <p style={{
          fontFamily: "var(--font-dm)", fontSize: "0.62rem",
          color: "rgba(250,250,247,0.25)", textAlign: "center",
          marginTop: 12,
        }}>
          No sign-up required to preview · Instant access
        </p>
      </div>
    </div>
  );
}

// ── Progress ring SVG ─────────────────────────────────────────
function ProgressRing({ pct }: { pct: number }) {
  const r = 28;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <svg width={70} height={70} style={{ flexShrink: 0 }}>
      {/* Track */}
      <circle cx={35} cy={35} r={r} fill="none" stroke="rgba(250,250,247,0.07)" strokeWidth={4} />
      {/* Progress */}
      <motion.circle
        cx={35} cy={35} r={r} fill="none"
        stroke="var(--color-gold)" strokeWidth={4}
        strokeLinecap="round"
        strokeDasharray={circ}
        animate={{ strokeDashoffset: circ - dash }}
        initial={{ strokeDashoffset: circ }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ transform: "rotate(-90deg)", transformOrigin: "35px 35px" }}
      />
      {/* Center icon */}
      <foreignObject x={21} y={21} width={28} height={28}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}>
          <Sparkles size={13} style={{ color: "var(--color-gold)" }} />
        </div>
      </foreignObject>
    </svg>
  );
}
