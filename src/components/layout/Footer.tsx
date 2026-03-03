"use client";
import Link from "next/link";
import Image from "next/image";
import { Linkedin, Instagram, Youtube } from "lucide-react";

const footerLinks = {
  Services: [
    { label: "Executive Coaching", href: "/executive-coaching" },
    { label: "Live Events", href: "/live-events" },
    { label: "Resource Library", href: "/resource-library" },
    { label: "Mentor AI", href: "/mentor-ai" },
    { label: "Studio", href: "/studio" },
    { label: "Hire Mridu", href: "/hire-mridu" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Refund Policy", href: "/refunds" },
  ],
};

const socialLinks = [
  { label: "LinkedIn", href: "#", Icon: Linkedin },
  { label: "Instagram", href: "#", Icon: Instagram },
  { label: "YouTube", href: "#", Icon: Youtube },
];

export default function Footer() {
  return (
    <footer className="bg-navy border-t border-cream/10">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-5 gap-16 mb-16">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="relative w-9 h-9">
                <Image src="/logo.png" alt="MentorLeap" fill className="object-contain" />
              </div>
              <span className="font-cormorant font-semibold text-xl tracking-wide">
                <span className="text-cream">MENTOR</span>
                <span className="text-gold ml-1">LEAP</span>
              </span>
            </Link>
            <p className="text-sm text-cream/50 leading-relaxed max-w-xs mb-8">
              AI-powered professional growth platform. Become job-ready, leadership-ready,
              and promotion-ready.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="w-8 h-8 flex items-center justify-center rounded-full border border-cream/10 text-cream/40 hover:text-gold hover:border-gold transition-all duration-300"
                  aria-label={item.label}
                >
                  <item.Icon size={16} />
                </a>
              ))}
            </div>
          </div>
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-xs text-cream/30 tracking-widest uppercase mb-5">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-cream/60 hover:text-cream transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-8 border-t border-cream/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-cream/30">
            © {new Date().getFullYear()} MentorLeap. All rights reserved.
          </p>
          <p className="text-xs text-cream/30 italic">
            Built for ambitious professionals. Powered by Mentor AI.
          </p>
        </div>
      </div>
    </footer>
  );
}
