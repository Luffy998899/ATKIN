"use client";

import Marquee from "@/components/motion/Marquee";
import type { Certification } from "@/types/db";

/** Flat printed band. No glass, no glow — just green paper and ink. */
export default function TrustStrip({ certifications }: { certifications: Certification[] }) {
  return (
    <section className="relative overflow-hidden bg-leaf py-4">
      <Marquee speed={44} fade={false}>
        <div className="flex items-center gap-10 pr-10">
          {certifications.map((c) => (
            <span key={c.id} className="flex shrink-0 items-center gap-10">
              <span className="label text-ink">{c.name}</span>
              <Cross />
            </span>
          ))}
        </div>
      </Marquee>
    </section>
  );
}

function Cross() {
  return (
    <svg width="9" height="9" viewBox="0 0 9 9" fill="none" aria-hidden>
      <path d="M4.5 0v9M0 4.5h9" stroke="#0b0e0d" strokeWidth="1" />
    </svg>
  );
}
