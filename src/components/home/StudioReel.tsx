"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Play, X, ChevronRight } from "lucide-react";
import Link from "next/link";

const videos = [
  {
    id: "xt0wdcVsvL8",
    title: "Mastering Executive Presence",
    subtitle: "How to command any room",
    duration: "12:34",
    views: "48K views",
  },
  {
    id: "flQVpRDAf4M",
    title: "The Art of Confident Speaking",
    subtitle: "Boardroom communication secrets",
    duration: "9:21",
    views: "31K views",
  },
  {
    id: "bZ9BtRfgg6o",
    title: "Leadership Storytelling",
    subtitle: "Move people to action with words",
    duration: "15:08",
    views: "62K views",
  },
  {
    id: "i5pDykiREPw",
    title: "From Manager to Leader",
    subtitle: "The mindset shift that changes everything",
    duration: "11:45",
    views: "27K views",
  },
];

const ease = [0.16, 1, 0.3, 1] as const;

// YouTube thumbnail URL helper
function thumb(id: string) {
  return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
}

export default function StudioReel() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [activeIdx, setActiveIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [lightbox, setLightbox] = useState<string | null>(null);

  const active = videos[activeIdx];

  return (
    <section
      ref={ref}
      style={{
        backgroundColor: "var(--color-navy)",
        padding: "96px 0 0",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* ── Atmospheric background ── */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage:
          "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(201,168,76,0.07) 0%, transparent 70%)," +
          "radial-gradient(ellipse 40% 40% at 80% 80%, rgba(27,47,94,0.5) 0%, transparent 60%)",
      }} />
      {/* Film grain overlay */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.025,
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
        backgroundSize: "128px 128px",
      }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 80px" }} className="sr-wrap">

        {/* ── Header ── */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginBottom: 64,
        }} className="sr-header">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease }}
          >
            <span style={{
              fontFamily: "var(--font-dm)", fontSize: "0.62rem",
              letterSpacing: "0.16em", textTransform: "uppercase",
              color: "var(--color-gold)", display: "block", marginBottom: 18,
            }}>
              Studio · Watch &amp; Learn
            </span>
            <h2 style={{
              fontFamily: "var(--font-cormorant)", fontWeight: 300,
              fontSize: "clamp(2.4rem, 3.8vw, 4.2rem)",
              lineHeight: 1.02, letterSpacing: "-0.025em",
              color: "var(--color-cream)", margin: 0,
            }}>
              Mridu on camera.
              <br />
              <em style={{ fontStyle: "italic", fontWeight: 500, color: "var(--color-gold)" }}>
                Pure insight.
              </em>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease }}
          >
            <Link
              href="/studio"
              style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                fontFamily: "var(--font-dm)", fontSize: "0.8rem",
                color: "rgba(250,250,247,0.5)", textDecoration: "none",
                borderBottom: "1px solid rgba(250,250,247,0.15)", paddingBottom: 2,
                transition: "color 0.2s, border-color 0.2s",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.color = "var(--color-gold)";
                el.style.borderColor = "var(--color-gold)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.color = "rgba(250,250,247,0.5)";
                el.style.borderColor = "rgba(250,250,247,0.15)";
              }}
            >
              Full Channel
              <ChevronRight size={13} />
            </Link>
          </motion.div>
        </div>

        {/* ── Main layout: featured player + strip ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 380px",
          gap: 32,
          alignItems: "stretch",
        }} className="sr-main">

          {/* ── Featured player ── */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15, ease }}
            style={{ position: "relative" }}
          >
            <div style={{
              position: "relative",
              aspectRatio: "16/9",
              borderRadius: 20,
              overflow: "hidden",
              backgroundColor: "#000",
              boxShadow: "0 32px 80px rgba(0,0,0,0.5)",
            }}>
              <AnimatePresence mode="wait">
                {playing ? (
                  <motion.iframe
                    key={active.id + "-player"}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    src={`https://www.youtube.com/embed/${active.id}?autoplay=1&rel=0&modestbranding=1`}
                    title={active.title}
                    allow="autoplay; fullscreen"
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
                  />
                ) : (
                  <motion.div
                    key={active.id + "-thumb"}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.5, ease }}
                    style={{ position: "absolute", inset: 0 }}
                  >
                    {/* Thumbnail */}
                    <img
                      src={thumb(active.id)}
                      alt={active.title}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                    {/* Dark overlay */}
                    <div style={{
                      position: "absolute", inset: 0,
                      background: "linear-gradient(to top, rgba(13,27,62,0.85) 0%, rgba(13,27,62,0.2) 50%, transparent 100%)",
                    }} />

                    {/* Play button */}
                    <button
                      onClick={() => setPlaying(true)}
                      style={{
                        position: "absolute", top: "50%", left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 72, height: 72, borderRadius: "50%",
                        backgroundColor: "rgba(250,250,247,0.12)",
                        border: "2px solid rgba(250,250,247,0.3)",
                        backdropFilter: "blur(8px)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        cursor: "pointer",
                        transition: "background-color 0.25s, border-color 0.25s, transform 0.25s",
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.backgroundColor = "var(--color-gold)";
                        el.style.borderColor = "var(--color-gold)";
                        el.style.transform = "translate(-50%, -50%) scale(1.08)";
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.backgroundColor = "rgba(250,250,247,0.12)";
                        el.style.borderColor = "rgba(250,250,247,0.3)";
                        el.style.transform = "translate(-50%, -50%) scale(1)";
                      }}
                    >
                      <Play size={26} fill="var(--color-cream)" style={{ color: "var(--color-cream)", marginLeft: 3 }} />
                    </button>

                    {/* Meta bottom */}
                    <div style={{
                      position: "absolute", bottom: 0, left: 0, right: 0,
                      padding: "28px 28px 24px",
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                        <span style={{
                          fontFamily: "var(--font-dm)", fontSize: "0.58rem",
                          letterSpacing: "0.12em", textTransform: "uppercase",
                          color: "var(--color-gold)",
                          backgroundColor: "rgba(201,168,76,0.15)",
                          padding: "3px 10px", borderRadius: 999,
                          border: "1px solid rgba(201,168,76,0.25)",
                        }}>
                          {active.duration}
                        </span>
                        <span style={{ fontFamily: "var(--font-dm)", fontSize: "0.7rem", color: "rgba(250,250,247,0.45)" }}>
                          {active.views}
                        </span>
                      </div>
                      <h3 style={{
                        fontFamily: "var(--font-cormorant)", fontWeight: 500,
                        fontSize: "1.7rem", lineHeight: 1.1,
                        color: "var(--color-cream)", margin: "0 0 4px",
                      }}>
                        {active.title}
                      </h3>
                      <p style={{
                        fontFamily: "var(--font-dm)", fontWeight: 300,
                        fontSize: "0.78rem", color: "rgba(250,250,247,0.55)",
                        margin: 0,
                      }}>
                        {active.subtitle}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Stop button when playing */}
              {playing && (
                <button
                  onClick={() => setPlaying(false)}
                  style={{
                    position: "absolute", top: 14, right: 14, zIndex: 10,
                    width: 32, height: 32, borderRadius: "50%",
                    backgroundColor: "rgba(0,0,0,0.6)",
                    border: "none", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  <X size={14} style={{ color: "#fff" }} />
                </button>
              )}
            </div>

            {/* Navigation dots */}
            <div style={{ display: "flex", gap: 6, marginTop: 16, justifyContent: "center" }}>
              {videos.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setActiveIdx(i); setPlaying(false); }}
                  style={{
                    width: i === activeIdx ? 24 : 6,
                    height: 6, borderRadius: 3,
                    backgroundColor: i === activeIdx ? "var(--color-gold)" : "rgba(250,250,247,0.2)",
                    border: "none", cursor: "pointer", padding: 0,
                    transition: "all 0.3s ease",
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* ── Side strip ── */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.25, ease }}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              justifyContent: "flex-start",
            }}
          >
            <p style={{
              fontFamily: "var(--font-dm)", fontSize: "0.6rem",
              letterSpacing: "0.12em", textTransform: "uppercase",
              color: "rgba(250,250,247,0.28)", marginBottom: 4,
            }}>
              Up next
            </p>
            {videos.map((v, i) => (
              <SideCard
                key={v.id}
                video={v}
                active={i === activeIdx}
                delay={0.3 + i * 0.07}
                inView={inView}
                onClick={() => { setActiveIdx(i); setPlaying(false); }}
                onPlay={() => { setActiveIdx(i); setLightbox(v.id); }}
              />
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Tilted film-strip footer ── */}
      <FilmStrip videos={videos} inView={inView} onPlay={(id) => setLightbox(id)} />

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setLightbox(null)}
            style={{
              position: "fixed", inset: 0, zIndex: 100,
              backgroundColor: "rgba(0,0,0,0.92)",
              backdropFilter: "blur(12px)",
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: 32,
            }}
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ duration: 0.35, ease }}
              onClick={(e) => e.stopPropagation()}
              style={{ width: "100%", maxWidth: 960, position: "relative" }}
            >
              <div style={{ aspectRatio: "16/9", borderRadius: 16, overflow: "hidden", backgroundColor: "#000" }}>
                <iframe
                  src={`https://www.youtube.com/embed/${lightbox}?autoplay=1&rel=0`}
                  title="Video"
                  allow="autoplay; fullscreen"
                  style={{ width: "100%", height: "100%", border: "none" }}
                />
              </div>
              <button
                onClick={() => setLightbox(null)}
                style={{
                  position: "absolute", top: -16, right: -16,
                  width: 40, height: 40, borderRadius: "50%",
                  backgroundColor: "rgba(250,250,247,0.1)",
                  border: "1px solid rgba(250,250,247,0.2)",
                  cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >
                <X size={16} style={{ color: "#fff" }} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 1024px) {
          .sr-wrap { padding: 0 48px !important; }
          .sr-main { grid-template-columns: 1fr !important; }
          .sr-header { flex-direction: column !important; align-items: flex-start !important; gap: 16px !important; }
        }
        @media (max-width: 640px) {
          .sr-wrap { padding: 0 24px !important; }
        }
      `}</style>
    </section>
  );
}

// ── Side card ─────────────────────────────────────────────────
function SideCard({
  video, active, delay, inView, onClick, onPlay,
}: {
  video: typeof videos[0];
  active: boolean;
  delay: number;
  inView: boolean;
  onClick: () => void;
  onPlay: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex", gap: 14, alignItems: "center",
        padding: "12px 14px", borderRadius: 14,
        backgroundColor: active
          ? "rgba(201,168,76,0.1)"
          : hovered ? "rgba(250,250,247,0.05)" : "transparent",
        border: `1px solid ${active ? "rgba(201,168,76,0.3)" : "rgba(250,250,247,0.06)"}`,
        cursor: "pointer",
        transition: "all 0.25s ease",
      }}
    >
      {/* Thumb */}
      <div style={{ position: "relative", width: 88, height: 56, borderRadius: 8, overflow: "hidden", flexShrink: 0 }}>
        <img
          src={thumb(video.id)}
          alt={video.title}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "rgba(0,0,0,0.35)",
          display: "flex", alignItems: "center", justifyContent: "center",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.2s",
        }}>
          <button
            onClick={(e) => { e.stopPropagation(); onPlay(); }}
            style={{
              width: 28, height: 28, borderRadius: "50%",
              backgroundColor: "var(--color-gold)",
              border: "none", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <Play size={11} fill="#fff" style={{ color: "#fff", marginLeft: 1 }} />
          </button>
        </div>
        {active && (
          <div style={{
            position: "absolute", bottom: 4, left: 4,
            width: 6, height: 6, borderRadius: "50%",
            backgroundColor: "var(--color-gold)",
          }} />
        )}
      </div>

      {/* Meta */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <h4 style={{
          fontFamily: "var(--font-dm)", fontWeight: 500,
          fontSize: "0.75rem", lineHeight: 1.35,
          color: active ? "var(--color-cream)" : "rgba(250,250,247,0.65)",
          margin: "0 0 3px",
          overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
        }}>
          {video.title}
        </h4>
        <p style={{
          fontFamily: "var(--font-dm)", fontWeight: 300,
          fontSize: "0.65rem", color: "rgba(250,250,247,0.35)",
          margin: 0,
        }}>
          {video.duration} · {video.views}
        </p>
      </div>
    </motion.div>
  );
}

// ── Film strip footer ─────────────────────────────────────────
function FilmStrip({ videos, inView, onPlay }: {
  videos: { id: string; title: string; subtitle: string; duration: string; views: string }[];
  inView: boolean;
  onPlay: (id: string) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{
        marginTop: 64,
        position: "relative",
        height: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: "rotate(-1.5deg)",
        transformOrigin: "center",
      }}
    >
      {/* Film strip rail top */}
      <div style={{
        position: "absolute", top: 0, left: -100, right: -100, height: 24,
        backgroundColor: "rgba(250,250,247,0.04)",
        display: "flex", alignItems: "center",
        gap: 16, padding: "0 16px",
        overflow: "hidden",
      }}>
        {[...Array(32)].map((_, i) => (
          <div key={i} style={{ width: 18, height: 12, borderRadius: 2, backgroundColor: "rgba(250,250,247,0.08)", flexShrink: 0 }} />
        ))}
      </div>
      {/* Film strip rail bottom */}
      <div style={{
        position: "absolute", bottom: 0, left: -100, right: -100, height: 24,
        backgroundColor: "rgba(250,250,247,0.04)",
        display: "flex", alignItems: "center",
        gap: 16, padding: "0 16px",
        overflow: "hidden",
      }}>
        {[...Array(32)].map((_, i) => (
          <div key={i} style={{ width: 18, height: 12, borderRadius: 2, backgroundColor: "rgba(250,250,247,0.08)", flexShrink: 0 }} />
        ))}
      </div>

      {/* Frames */}
      <div style={{
        display: "flex", gap: 4,
        padding: "24px 80px",
        backgroundColor: "rgba(0,0,0,0.3)",
        width: "100vw",
        overflowX: "hidden",
      }}>
        {[...videos, ...videos, ...videos].map((v, i) => (
          <FilmFrame key={i} video={v} onPlay={onPlay} />
        ))}
      </div>
    </motion.div>
  );
}

function FilmFrame({ video, onPlay }: { video: any; onPlay: (id: string) => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onPlay(video.id)}
      style={{
        flexShrink: 0,
        width: 140, height: 100,
        borderRadius: 4,
        overflow: "hidden",
        position: "relative",
        cursor: "pointer",
        transform: hovered ? "scale(1.08) translateY(-4px)" : "scale(1)",
        transition: "transform 0.3s ease",
        border: hovered ? "1px solid rgba(201,168,76,0.5)" : "1px solid rgba(250,250,247,0.06)",
      }}
    >
      <img
        src={thumb(video.id)}
        alt={video.title}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
      <div style={{
        position: "absolute", inset: 0,
        background: hovered ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.5)",
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "background 0.2s",
      }}>
        {hovered && (
          <Play size={18} fill="var(--color-gold)" style={{ color: "var(--color-gold)" }} />
        )}
      </div>
    </div>
  );
}
