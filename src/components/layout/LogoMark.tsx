"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Vector re-draw of the ATIN mark: an open navy→sky ring, the "A" monogram,
 * and the green→lime leaf sweep that cuts across it.
 * `animated` draws the strokes on in sequence.
 */
export default function LogoMark({
  className,
  animated = false,
}: {
  className?: string;
  animated?: boolean;
}) {
  const draw = animated
    ? {
        initial: { pathLength: 0, opacity: 0 },
        animate: { pathLength: 1, opacity: 1 },
      }
    : {};

  return (
    <svg
      viewBox="0 0 100 100"
      className={cn("overflow-visible", className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="ATIN Healthcare"
      role="img"
    >
      <defs>
        <linearGradient id="atin-ring" x1="10" y1="6" x2="86" y2="92" gradientUnits="userSpaceOnUse">
          <stop stopColor="#38b6e8" />
          <stop offset="0.45" stopColor="#0e4fb0" />
          <stop offset="1" stopColor="#04173f" />
        </linearGradient>
        <linearGradient id="atin-a" x1="24" y1="82" x2="74" y2="20" gradientUnits="userSpaceOnUse">
          <stop stopColor="#04173f" />
          <stop offset="0.55" stopColor="#0e4fb0" />
          <stop offset="1" stopColor="#29a9e1" />
        </linearGradient>
        <linearGradient id="atin-leaf" x1="18" y1="86" x2="82" y2="34" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0d5a33" />
          <stop offset="0.45" stopColor="#2fa84f" />
          <stop offset="1" stopColor="#8cc63e" />
        </linearGradient>
        <linearGradient id="atin-leaf-2" x1="30" y1="70" x2="78" y2="38" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2fa84f" />
          <stop offset="1" stopColor="#b7e77f" />
        </linearGradient>
      </defs>

      {/* open ring */}
      <motion.path
        d="M 78 82 A 38 38 0 1 0 68 88"
        stroke="url(#atin-ring)"
        strokeWidth="7.5"
        strokeLinecap="round"
        {...draw}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* A monogram */}
      <motion.path
        d="M 26 82 L 50 22 L 74 82"
        stroke="url(#atin-a)"
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...draw}
        transition={{ duration: 1.2, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* leaf sweep crossing the A */}
      <motion.path
        d="M 18 84 C 34 60 58 46 84 44 C 74 68 50 82 18 84 Z"
        fill="url(#atin-leaf)"
        initial={animated ? { opacity: 0, scale: 0.7, rotate: -12 } : undefined}
        animate={animated ? { opacity: 1, scale: 1, rotate: 0 } : undefined}
        transition={{ duration: 0.9, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: "22px 82px" }}
      />

      {/* leaf midrib */}
      <motion.path
        d="M 20 83 C 40 68 62 54 83 45"
        stroke="#eafbe4"
        strokeOpacity="0.55"
        strokeWidth="1.6"
        strokeLinecap="round"
        {...draw}
        transition={{ duration: 0.8, delay: 1.05, ease: "easeOut" }}
      />

      {/* small accent leaf (the dot of the i in the wordmark) */}
      <motion.path
        d="M 82 20 C 90 20 94 24 94 32 C 86 32 82 28 82 20 Z"
        fill="url(#atin-leaf-2)"
        initial={animated ? { opacity: 0, y: -8 } : undefined}
        animate={animated ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.6, delay: 1.2 }}
      />
    </svg>
  );
}
