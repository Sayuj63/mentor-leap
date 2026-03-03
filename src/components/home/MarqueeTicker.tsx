"use client";
import { motion } from "framer-motion";

const items = [
  "Executive Coaching",
  "Mentor AI",
  "Live Bootcamps",
  "Public Speaking",
  "Leadership Presence",
  "Strategic Communication",
  "Boardroom Confidence",
  "Promotion Readiness",
];

export default function MarqueeTicker() {
  return (
    <div className="relative py-5 bg-navy overflow-hidden border-y border-navy">
      {/* Gradient masks */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-navy to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-navy to-transparent z-10" />

      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 25, ease: "linear", repeat: Infinity }}
      >
        {[...items, ...items].map((item, i) => (
          <span key={i} className="flex items-center gap-8">
            <span className="font-cormorant font-300 text-lg text-cream/80 tracking-widest uppercase">
              {item}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}