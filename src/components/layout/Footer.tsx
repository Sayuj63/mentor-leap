"use client";

import Link from "next/link";
import Image from "next/image";
import { Linkedin, Instagram, Youtube } from "lucide-react";

const footerLinks = {
  Services: [
    { label: "Executive Coaching", href: "/executive-coaching" },
    { label: "Live Events",        href: "/live-events" },
    { label: "Resource Library",   href: "/resource-library" },
    { label: "Mentor AI",          href: "/mentor-ai" },
    { label: "Studio",             href: "/studio" },
    { label: "Hire Mridu",         href: "/hire-mridu" },
  ],
  Company: [
    { label: "About",   href: "/about" },
    { label: "Blog",    href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  Legal: [
    { label: "Privacy Policy",    href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Refund Policy",      href: "/refunds" },
  ],
};

const socials = [
  { label: "LinkedIn",  href: "#", Icon: Linkedin },
  { label: "Instagram", href: "#", Icon: Instagram },
  { label: "YouTube",   href: "#", Icon: Youtube },
];

export default function Footer() {
  return (
    <footer style={{
      backgroundColor: "var(--color-navy)",
      borderTop: "1px solid rgba(250,250,247,0.08)",
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 80px 0" }} className="footer-wrap">

        {/* ── Main grid ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr",
          gap: 64,
          paddingBottom: 64,
          borderBottom: "1px solid rgba(250,250,247,0.08)",
        }} className="footer-grid">

          {/* Brand column */}
          <div>
            <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 12, textDecoration: "none", marginBottom: 24 }}>
              <div style={{ position: "relative", width: 36, height: 36, flexShrink: 0 }}>
                <Image src="/logo.png" alt="MentorLeap" fill style={{ objectFit: "contain" }} />
              </div>
              <span style={{ fontFamily: "var(--font-cormorant)", fontWeight: 600, fontSize: "1.1rem", letterSpacing: "0.06em" }}>
                <span style={{ color: "var(--color-cream)" }}>MENTOR</span>
                <span style={{ color: "var(--color-gold)" }}>LEAP</span>
              </span>
            </Link>

            <p style={{
              fontFamily: "var(--font-dm)", fontWeight: 300,
              fontSize: "0.85rem", lineHeight: 1.75,
              color: "rgba(250,250,247,0.45)",
              maxWidth: 260, marginBottom: 28,
            }}>
              AI-powered professional growth platform. Become job-ready, leadership-ready,
              and promotion-ready.
            </p>

            {/* Socials */}
            <div style={{ display: "flex", gap: 10 }}>
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  style={{
                    width: 34, height: 34,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    borderRadius: "50%",
                    border: "1px solid rgba(250,250,247,0.1)",
                    color: "rgba(250,250,247,0.35)",
                    transition: "color 0.25s, border-color 0.25s",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.color = "var(--color-gold)";
                    el.style.borderColor = "rgba(201,168,76,0.5)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.color = "rgba(250,250,247,0.35)";
                    el.style.borderColor = "rgba(250,250,247,0.1)";
                  }}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 style={{
                fontFamily: "var(--font-dm)", fontSize: "0.6rem",
                letterSpacing: "0.14em", textTransform: "uppercase",
                color: "rgba(250,250,247,0.28)", marginBottom: 20,
              }}>
                {category}
              </h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      style={{
                        fontFamily: "var(--font-dm)", fontSize: "0.82rem",
                        color: "rgba(250,250,247,0.55)",
                        textDecoration: "none",
                        transition: "color 0.25s",
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--color-cream)"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(250,250,247,0.55)"; }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Bottom bar ── */}
        <div style={{
          padding: "24px 0 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          flexWrap: "wrap",
        }}>
          <p style={{
            fontFamily: "var(--font-dm)", fontSize: "0.72rem",
            color: "rgba(250,250,247,0.25)", margin: 0,
          }}>
            © {new Date().getFullYear()} MentorLeap. All rights reserved.
          </p>
          <p style={{
            fontFamily: "var(--font-dm)", fontSize: "0.72rem",
            fontStyle: "italic",
            color: "rgba(250,250,247,0.25)", margin: 0,
          }}>
            Built for ambitious professionals. Powered by Mentor AI.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .footer-wrap { padding: 64px 48px 0 !important; }
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 40px !important; }
        }
        @media (max-width: 640px) {
          .footer-wrap { padding: 56px 24px 0 !important; }
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
