"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "motion/react";
import { SectionHeading } from "@/components/ui/Section";
import MagneticButton from "@/components/motion/MagneticButton";
import type { Division } from "@/types/db";

/**
 * An index, not a card grid. Rows invert into the division's own colour on
 * hover — the interaction a printed catalogue would have if it could move.
 */
export default function DivisionsSection({ divisions }: { divisions: Division[] }) {
  const [hover, setHover] = useState<string | null>(null);

  return (
    <section id="divisions" className="relative bg-ink py-24 md:py-32">
      <div className="container-x">
        <div className="grid-12 items-end gap-y-10">
          <div className="col-span-4 md:col-span-7">
            <SectionHeading
              dark
              index="03"
              label="Eight therapy divisions"
              title="A basket deep enough to"
              highlight="hold a practice."
            />
          </div>

          <div className="col-span-4 md:col-span-4 md:col-start-9">
            <p className="max-w-[38ch] text-[0.95rem] leading-[1.7] text-bone/55">
              Each division carries enough SKUs that a doctor can move from one prescription to the
              next without you ever leaving the room.
            </p>
            <div className="mt-8">
              <MagneticButton href="/divisions" variant="outline-light">
                All divisions
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 border-t border-rule-dark md:mt-24">
        {divisions.map((d, i) => {
          const accent = d.accent ?? "#2fa84f";
          const on = hover === d.id;

          return (
            <motion.div
              key={d.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: i * 0.04 }}
              className="border-b border-rule-dark"
            >
              <Link
                href={`/divisions/${d.slug}`}
                onMouseEnter={() => setHover(d.id)}
                onMouseLeave={() => setHover(null)}
                data-cursor="hover"
                data-cursor-label="Open"
                className="group relative block overflow-hidden"
              >
                {/* colour wipe */}
                <motion.span
                  className="absolute inset-0 origin-bottom"
                  style={{ background: accent }}
                  initial={false}
                  animate={{ scaleY: on ? 1 : 0 }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                />

                <div className="container-x relative">
                  <div className="flex items-baseline gap-4 py-5 md:grid md:grid-cols-12 md:items-center md:gap-6 md:py-8">
                    <span
                      className={`label shrink-0 transition-colors duration-300 md:col-span-1 ${
                        on ? "text-ink/60" : "text-bone/35"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <div className="min-w-0 flex-1 md:col-span-6">
                      <motion.h3
                        animate={{ x: on ? 10 : 0 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className={`display text-[clamp(1.25rem,3.4vw,2.8rem)] transition-colors duration-300 ${
                          on ? "text-ink" : "text-bone"
                        }`}
                      >
                        {d.name}
                      </motion.h3>
                      <p
                        className={`mt-1 text-[0.8rem] transition-colors duration-300 md:hidden ${
                          on ? "text-ink/70" : "text-bone/40"
                        }`}
                      >
                        {d.product_count_label}
                      </p>
                    </div>

                    <p
                      className={`hidden text-sm transition-colors duration-300 md:col-span-3 md:block ${
                        on ? "text-ink/70" : "text-bone/40"
                      }`}
                    >
                      {d.tagline}
                    </p>

                    <div className="flex shrink-0 items-center justify-end gap-6 md:col-span-2">
                      <span
                        className={`label hidden transition-colors duration-300 md:inline ${
                          on ? "text-ink/60" : "text-bone/35"
                        }`}
                      >
                        {d.product_count_label}
                      </span>
                      <motion.span
                        animate={{ x: on ? 4 : 0, y: on ? -4 : 0 }}
                        transition={{ duration: 0.4 }}
                        className={on ? "text-ink" : "text-bone/50"}
                      >
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
                          <path d="M1 14L14 1M14 1H4M14 1v10" stroke="currentColor" strokeWidth="1.2" />
                        </svg>
                      </motion.span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
