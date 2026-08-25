"use client";

import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { cn } from "@/lib/utils";

type Variant = "solid" | "leaf" | "outline" | "outline-light" | "ghost";

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: Variant;
  strength?: number;
  type?: "button" | "submit";
  disabled?: boolean;
};

/**
 * Square-cut button set in mono caps. Leans toward the cursor and fills from
 * the bottom on hover — no pill, no gradient sweep.
 */
export default function MagneticButton({
  children,
  href,
  onClick,
  className,
  variant = "solid",
  strength = 0.28,
  type = "button",
  disabled,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 240, damping: 20, mass: 0.4 });
  const y = useSpring(my, { stiffness: 240, damping: 20, mass: 0.4 });

  function handleMove(e: React.MouseEvent) {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - (r.left + r.width / 2)) * strength);
    my.set((e.clientY - (r.top + r.height / 2)) * strength);
  }

  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  const base =
    "group relative inline-flex items-center justify-center gap-3 overflow-hidden px-7 py-4 label transition-colors duration-400 disabled:opacity-50";

  const skins: Record<Variant, string> = {
    solid: "bg-ink text-bone hover:text-ink",
    leaf: "bg-leaf text-ink hover:text-bone",
    outline: "border border-ink text-ink hover:text-bone",
    "outline-light": "border border-bone/35 text-bone hover:text-ink",
    ghost: "text-ink hover:text-leaf px-0 py-1",
  };

  const fills: Record<Variant, string> = {
    solid: "bg-leaf",
    leaf: "bg-ink",
    outline: "bg-ink",
    "outline-light": "bg-lime",
    ghost: "",
  };

  const inner = (
    <>
      {variant !== "ghost" && (
        <span
          className={cn(
            "absolute inset-0 origin-bottom scale-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100",
            fills[variant],
          )}
        />
      )}
      <span className="relative z-10 flex items-center gap-3">{children}</span>
    </>
  );

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x, y }}
      className="inline-block"
      data-cursor="hover"
    >
      {href ? (
        <Link href={href} className={cn(base, skins[variant], className)}>
          {inner}
        </Link>
      ) : (
        <button
          type={type}
          onClick={onClick}
          disabled={disabled}
          className={cn(base, skins[variant], className)}
        >
          {inner}
        </button>
      )}
    </motion.div>
  );
}
