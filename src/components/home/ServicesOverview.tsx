"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import {
  ArrowUpRight,
  Mic2,
  CalendarDays,
  Bot,
  BookOpen,
  Tv2,
  Star,
} from "lucide-react";

const services = [
  {
    id: "01",
    icon: Mic2,
    title: "Executive Coaching",
    subtitle: "1:1 & Group Programs",
    description:
      "Tailored coaching for mid-level professionals, senior leaders, founders, and executives. Build boardroom confidence, executive presence, and promotion readiness.",
    href: "/executive-coaching",
    tag: "Most Popular",
    // placeholder color used as image bg until you swap in a real image
    imageBg: "linear-gradient(135deg, #0D1B3E 0%, #1B2F5E 60%, rgba(201,168,76,0.15) 100%)",
    imageLabel: "Executive Coaching",
  },
  {
    id: "02",
    icon: CalendarDays,
    title: "Live Events",
    subtitle: "Bootcamps & Masterclasses",
    description:
      "Immersive learning experiences for rapid skill building — Speak With Impact, Leadership Presence, Strategic Storytelling, and Media Confidence.",
    href: "/live-events",
    tag: "Live",
    imageBg: "linear-gradient(135deg, #1B2F5E 0%, #0D1B3E 60%, rgba(201,168,76,0.2) 100%)",
    imageLabel: "Live Events",
  },
  {
    id: "03",
    icon: Bot,
    title: "Mentor AI",
    subtitle: "24×7 Growth Partner",
    description:
      "Trained on Mridu's frameworks. Practice scenarios, refine speeches, prep interviews, improve email tone, and get instant feedback. Always on, always sharp.",
    href: "/mentor-ai",
    tag: "AI-Powered",
    imageBg: "linear-gradient(135deg, #0D1B3E 20%, rgba(201,168,76,0.25) 100%)",
    imageLabel: "Mentor AI",
  },
  {
    id: "04",
    icon: BookOpen,
    title: "Resource Library",
    subtitle: "Digital Learning Marketplace",
    description:
      "Recorded bootcamps, communication toolkits, executive presence frameworks, confidence-building exercises, and audio mindset bundles.",
    href: "/resource-library",
    tag: "Self-Paced",
    imageBg: "linear-gradient(135deg, #1B2F5E 0%, #0D1B3E 80%, rgba(201,168,76,0.1) 100%)",
    imageLabel: "Resource Library",
  },
  {
    id: "05",
    icon: Tv2,
    title: "MentorLeap Studio",
    subtitle: "Insights & Strategy",
    description:
      "Deep-dive content on communication psychology, career advancement, leadership case studies, public speaking breakdowns, and real transformation stories.",
    href: "/studio",
    tag: "Free Content",
    imageBg: "linear-gradient(135deg, #0D1B3E 0%, #1B2F5E 50%, rgba(201,168,76,0.18) 100%)",
    imageLabel: "MentorLeap Studio",
  },
  {
    id: "06",
    icon: Star,
    title: "Hire Mridu",
    subtitle: "Corporate Anchor & Moderator",
    description:
      "Broadcast expertise meets executive moderation. Available for corporate summits, conferences, leadership panels, and awards ceremonies.",
    href: "/hire-mridu",
    tag: "Corporate",
    imageBg: "linear-gradient(135deg, #1B2F5E 0%, rgba(201,168,76,0.3) 100%)",
    imageLabel: "Hire Mridu",
  },
];

const CYCLE_DURATION = 5000; // ms per service
const ease = [0.16, 1, 0.3, 1] as const;

export default function ServicesOverview() {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);

  // Progress ticker
  useEffect(() => {
    const step = 100 / (CYCLE_DURATION / 80);
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          setCurrent((c) => (c + 1) % services.length);
          return 0;
        }
        return p + step;
      });
    }, 80);
    return () => clearInterval(interval);
  }, []);

  // Scroll active item into view on mobile
  useEffect(() => {
    const el = itemRefs.current[current];
    const container = listRef.current;
    if (el && container && window.innerWidth < 1024) {
      container.scrollTo({
        left: el.offsetLeft - (container.clientWidth - el.clientWidth) / 2,
        behavior: "smooth",
      });
    }
  }, [current]);

  const handleClick = (i: number) => {
    setCurrent(i);
    setProgress(0);
  };

  return (
    <section
      ref={sectionRef}
      style={{ backgroundColor: "var(--color-navy)", padding: "96px 0 112px" }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 80px" }} className="services-container">

        {/* ── Header ── */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: 72,
            gap: 40,
          }}
          className="services-header"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease }}
          >
            <span
              style={{
                fontFamily: "var(--font-dm)",
                fontSize: "0.65rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--color-gold)",
                display: "block",
                marginBottom: 20,
              }}
            >
              Our Services
            </span>
            <h2
              style={{
                fontFamily: "var(--font-cormorant)",
                fontWeight: 300,
                fontSize: "clamp(2.4rem, 3.8vw, 4rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                color: "var(--color-cream)",
                margin: 0,
              }}
            >
              Everything you need
              <br />
              <em
                style={{
                  fontStyle: "italic",
                  fontWeight: 400,
                  color: "var(--color-gold)",
                }}
              >
                to grow.
              </em>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease }}
            style={{
              fontFamily: "var(--font-dm)",
              fontWeight: 300,
              fontSize: "0.9rem",
              lineHeight: 1.7,
              color: "rgba(250,250,247,0.85)",
              maxWidth: 280,
              margin: 0,
              flexShrink: 0,
            }}
          >
            Six pathways to professional excellence, each designed with a
            specific growth outcome in mind.
          </motion.p>
        </div>

        {/* ── Two-column: list left, visual right ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 64,
            alignItems: "start",
          }}
          className="services-grid"
        >
          {/* LEFT — scrollable service list */}
          <div
            ref={listRef}
            style={{ display: "flex", flexDirection: "column", gap: 2 }}
            className="services-list"
          >
            {services.map((svc, i) => {
              const Icon = svc.icon;
              const isActive = current === i;

              return (
                <motion.div
                  key={svc.id}
                  ref={(el) => { itemRefs.current[i] = el; }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.07 + 0.3, ease }}
                  onClick={() => handleClick(i)}
                  style={{
                    display: "flex",
                    gap: 16,
                    padding: "20px 24px",
                    borderRadius: 12,
                    cursor: "pointer",
                    backgroundColor: isActive
                      ? "rgba(250,250,247,0.05)"
                      : "transparent",
                    border: isActive
                      ? "1px solid rgba(201,168,76,0.2)"
                      : "1px solid transparent",
                    transition: "all 0.3s ease",
                  }}
                >
                  {/* Icon */}
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      backgroundColor: isActive
                        ? "rgba(201,168,76,0.15)"
                        : "rgba(250,250,247,0.05)",
                      transition: "background-color 0.3s ease",
                    }}
                  >
                    <Icon
                      size={16}
                      style={{
                        color: isActive
                          ? "var(--color-gold)"
                          : "rgba(250,250,247,0.6)",
                        transition: "color 0.3s ease",
                      }}
                    />
                  </div>

                  {/* Text + progress */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: 4,
                      }}
                    >
                      <h3
                        style={{
                          fontFamily: "var(--font-cormorant)",
                          fontWeight: 500,
                          fontSize: "1.15rem",
                          color: isActive
                            ? "var(--color-cream)"
                            : "rgba(250,250,247,0.75)",
                          margin: 0,
                          transition: "color 0.3s ease",
                        }}
                      >
                        {svc.title}
                      </h3>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                          opacity: isActive ? 1 : 0.4,
                          transition: "opacity 0.3s ease",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "var(--font-dm)",
                            fontSize: "0.6rem",
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            color: "var(--color-gold)",
                          }}
                        >
                          {svc.tag}
                        </span>
                        <ArrowUpRight
                          size={12}
                          style={{ color: "rgba(201,168,76,0.6)" }}
                        />
                      </div>
                    </div>

                    <p
                      style={{
                        fontFamily: "var(--font-dm)",
                        fontSize: "0.6rem",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "var(--color-gold)",
                        marginBottom: isActive ? 8 : 0,
                        opacity: isActive ? 0.7 : 0,
                        transition: "opacity 0.3s ease, margin 0.3s ease",
                      }}
                    >
                      {svc.subtitle}
                    </p>

                    {isActive && (
                      <p
                        style={{
                          fontFamily: "var(--font-dm)",
                          fontWeight: 300,
                          fontSize: "0.8rem",
                          lineHeight: 1.65,
                          color: "rgba(250,250,247,0.8)",
                          margin: "0 0 12px",
                        }}
                      >
                        {svc.description}
                      </p>
                    )}

                    {/* Progress bar */}
                    <div
                      style={{
                        height: 2,
                        borderRadius: 2,
                        backgroundColor: "rgba(250,250,247,0.3)",
                        overflow: "hidden",
                        opacity: isActive ? 1 : 0,
                        transition: "opacity 0.3s ease",
                      }}
                    >
                      {isActive && (
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 0.08, ease: "linear" }}
                          style={{
                            height: "100%",
                            background:
                              "linear-gradient(to right, var(--color-gold), var(--color-gold-light))",
                            borderRadius: 2,
                          }}
                        />
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* RIGHT — animated visual panel */}
          <div
            style={{ position: "sticky", top: 120 }}
            className="services-visual"
          >
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.5, ease }}
            >
              {/* Image/Visual placeholder */}
              <div
                style={{
                  borderRadius: 20,
                  overflow: "hidden",
                  aspectRatio: "4/3",
                  background: services[current].imageBg,
                  border: "1px solid rgba(201,168,76,0.15)",
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {/* Decorative inner ring */}
                <div
                  style={{
                    position: "absolute",
                    inset: 20,
                    borderRadius: 14,
                    border: "1px dashed rgba(201,168,76,0.2)",
                    pointerEvents: "none",
                  }}
                />

                {/* Service number watermark */}
                <div
                  style={{
                    position: "absolute",
                    top: 32,
                    left: 36,
                    fontFamily: "var(--font-cormorant)",
                    fontWeight: 300,
                    fontSize: "5rem",
                    lineHeight: 1,
                    color: "rgba(201,168,76,0.12)",
                    pointerEvents: "none",
                  }}
                >
                  {services[current].id}
                </div>

                {/* Center icon */}
                <div style={{ textAlign: "center", zIndex: 1 }}>
                  {(() => {
                    const Icon = services[current].icon;
                    return (
                      <div
                        style={{
                          width: 72,
                          height: 72,
                          borderRadius: "50%",
                          backgroundColor: "rgba(201,168,76,0.12)",
                          border: "1px solid rgba(201,168,76,0.3)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          margin: "0 auto 16px",
                        }}
                      >
                        <Icon size={28} style={{ color: "var(--color-gold)" }} />
                      </div>
                    );
                  })()}
                  <p
                    style={{
                      fontFamily: "var(--font-cormorant)",
                      fontWeight: 400,
                      fontSize: "1.4rem",
                      color: "rgba(250,250,247,0.95)",
                      margin: "0 0 6px",
                    }}
                  >
                    {services[current].title}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-dm)",
                      fontSize: "0.65rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "rgba(201,168,76,0.6)",
                      margin: 0,
                    }}
                  >
                    {services[current].subtitle}
                  </p>
                </div>

                {/* CTA button */}
                <Link
                  href={services[current].href}
                  style={{
                    position: "absolute",
                    bottom: 28,
                    right: 28,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "10px 20px",
                    borderRadius: 999,
                    backgroundColor: "rgba(201,168,76,0.15)",
                    border: "1px solid rgba(201,168,76,0.3)",
                    color: "var(--color-gold)",
                    fontFamily: "var(--font-dm)",
                    fontSize: "0.72rem",
                    letterSpacing: "0.06em",
                    textDecoration: "none",
                    transition: "background-color 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor =
                      "rgba(201,168,76,0.25)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor =
                      "rgba(201,168,76,0.15)";
                  }}
                >
                  Explore
                  <ArrowUpRight size={13} />
                </Link>
              </div>

              {/* Progress dots */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 8,
                  marginTop: 20,
                }}
              >
                {services.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handleClick(i)}
                    style={{
                      width: i === current ? 24 : 6,
                      height: 6,
                      borderRadius: 3,
                      backgroundColor:
                        i === current
                          ? "var(--color-gold)"
                          : "rgba(250,250,247,0.3)",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                      transition: "all 0.3s ease",
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 1024px) {
          .services-container { padding: 0 48px !important; }
          .services-header { flex-direction: column !important; align-items: flex-start !important; }
          .services-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .services-visual { position: static !important; }
        }
        @media (max-width: 640px) {
          .services-container { padding: 0 24px !important; }
          .services-list { flex-direction: row !important; overflow-x: auto !important; flex-wrap: nowrap !important; }
        }
      `}</style>
    </section>
  );
}
