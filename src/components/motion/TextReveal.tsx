"use client";

import { Fragment } from "react";
import { motion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Line-masked, word-by-word rise. The classic "kinetic type" reveal —
 * each word starts below a clipped line and springs up on stagger.
 */
export function TextReveal({
  text,
  className,
  wordClassName,
  delay = 0,
  stagger = 0.045,
  once = true,
  as: Tag = "span",
}: {
  text: string;
  className?: string;
  /** Applied to each animating word — use this for colour, not the root. */
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
  as?: "span" | "h1" | "h2" | "h3" | "p";
}) {
  const words = text.split(" ");

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };

  const word: Variants = {
    hidden: { y: "115%", opacity: 0, rotateX: -55 },
    show: {
      y: "0%",
      opacity: 1,
      rotateX: 0,
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const MotionTag = motion[Tag] as typeof motion.span;

  return (
    // `inline`, not `inline-block`: an inline-block is atomic, so a long phrase
    // would wrap inside its own narrow box instead of flowing with the heading.
    <MotionTag
      className={cn("inline", className)}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.3 }}
    >
      {words.map((w, i) => (
        <Fragment key={`${w}-${i}`}>
          <span
            // pb/-mb keeps descenders clear of the overflow mask
            className="split-line inline-block align-bottom pb-[0.14em] -mb-[0.14em]"
            style={{ perspective: 900 }}
          >
            <motion.span
              variants={word}
              className={cn("split-word", wordClassName)}
              style={{ transformOrigin: "bottom center" }}
            >
              {w}
            </motion.span>
          </span>
          {/* real space between words so the text stays readable to
              screen readers and crawlers, outside the clipping mask */}
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </MotionTag>
  );
}

/** Character-level scramble-in, used for short eyebrow labels. */
export function CharReveal({
  text,
  className,
  delay = 0,
  stagger = 0.03,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  return (
    <motion.span
      className={cn("inline-block", className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.6 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {text.split("").map((c, i) => (
        <motion.span
          key={i}
          className="inline-block"
          variants={{
            hidden: { opacity: 0, y: 12, filter: "blur(6px)" },
            show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5 } },
          }}
        >
          {c === " " ? " " : c}
        </motion.span>
      ))}
    </motion.span>
  );
}
