"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Photograph in a frame. The entry reveal is a coloured panel that wipes up off
 * the image — a transform, not a clip-path, so the picture is visible even if
 * the animation never runs.
 */
export default function Figure({
  src,
  alt,
  caption,
  index,
  className,
  imgClassName,
  coverClassName = "bg-bone",
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
  parallax = true,
  reveal = true,
  delay = 0,
}: {
  src: string;
  alt: string;
  caption?: string;
  index?: string;
  className?: string;
  imgClassName?: string;
  /** Colour of the wipe panel — match the section behind it. */
  coverClassName?: string;
  priority?: boolean;
  sizes?: string;
  parallax?: boolean;
  reveal?: boolean;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.14, 1]);
  const y = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden bg-ink-2", className)}>
      <motion.div style={parallax ? { scale, y } : undefined} className="absolute inset-0">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className={cn("object-cover", imgClassName)}
        />
      </motion.div>

      {reveal && (
        <motion.span
          aria-hidden
          initial={{ scaleY: 1 }}
          whileInView={{ scaleY: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 1.05, delay, ease: [0.83, 0, 0.17, 1] }}
          className={cn("absolute inset-0 z-10 origin-bottom", coverClassName)}
        />
      )}

      {(caption || index) && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex items-end justify-between gap-4 bg-[linear-gradient(to_top,rgba(11,14,13,0.75),transparent)] p-4 md:p-5">
          {caption && <span className="label text-bone/85">{caption}</span>}
          {index && <span className="label text-lime">{index}</span>}
        </div>
      )}
    </div>
  );
}
