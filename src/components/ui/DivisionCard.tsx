"use client";

import Link from "next/link";
import { motion } from "motion/react";
import type { Division } from "@/types/db";

export default function DivisionCard({
  division,
  index = 0,
}: {
  division: Division;
  index?: number;
}) {
  const accent = division.accent ?? "#0c63c4";

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className="h-full"
    >
      <Link
        href={`/divisions/${division.slug}`}
        data-cursor="hover"
        data-cursor-label="Open"
        className="group relative flex h-full flex-col border-t border-rule pt-5"
      >
        {/* accent rule that draws across on hover */}
        <span
          className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
          style={{ background: accent }}
        />

        <div className="flex items-baseline justify-between gap-4">
          <span className="label" style={{ color: accent }}>
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="label text-ink/35">{division.product_count_label}</span>
        </div>

        <h3 className="display mt-8 text-[clamp(1.5rem,2.6vw,2.1rem)] text-ink transition-colors duration-300">
          {division.name}
        </h3>

        <p className="mt-2 text-[0.85rem]" style={{ color: accent }}>
          {division.tagline}
        </p>

        <p className="mt-5 text-[0.88rem] leading-[1.7] text-ink/55">{division.description}</p>

        <span className="label mt-auto flex items-center gap-2 pt-8 text-ink/45 transition-colors duration-300 group-hover:text-ink">
          View division
          <svg
            width="13"
            height="13"
            viewBox="0 0 15 15"
            fill="none"
            className="transition-transform duration-400 group-hover:translate-x-1 group-hover:-translate-y-1"
            aria-hidden
          >
            <path d="M1 14L14 1M14 1H4M14 1v10" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        </span>
      </Link>
    </motion.div>
  );
}
