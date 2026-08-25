"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useFinePointer, usePrefersReducedMotion } from "@/lib/hooks";

/**
 * A single hairline ring that follows with lag and inverts over interactive
 * elements. No blur, no glow — it reads as a drafting reticle.
 */
export default function Cursor() {
  const fine = useFinePointer();
  const reduced = usePrefersReducedMotion();
  const enabled = fine && !reduced;

  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState<string | null>(null);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 320, damping: 26, mass: 0.4 });
  const ry = useSpring(y, { stiffness: 320, damping: 26, mass: 0.4 });

  useEffect(() => {
    if (!enabled) return;

    document.documentElement.classList.add("custom-cursor-active");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);

      const el = (e.target as HTMLElement)?.closest?.(
        "[data-cursor], a, button, input, textarea, select",
      ) as HTMLElement | null;

      setHovering(Boolean(el));
      setLabel(el?.dataset?.cursorLabel ?? null);
    };

    window.addEventListener("mousemove", move, { passive: true });
    return () => {
      window.removeEventListener("mousemove", move);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-1 w-1 -translate-x-1/2 -translate-y-1/2 bg-leaf"
        style={{ x, y }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9998] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"
        style={{ x: rx, y: ry }}
        animate={{ width: hovering ? 68 : 26, height: hovering ? 68 : 26 }}
        transition={{ type: "spring", stiffness: 340, damping: 28 }}
      >
        <span
          className={
            hovering
              ? "absolute inset-0 rounded-full bg-leaf mix-blend-multiply"
              : "absolute inset-0 rounded-full border border-ink/40"
          }
        />
        {label && <span className="label relative text-[0.5rem] text-ink">{label}</span>}
      </motion.div>
    </>
  );
}
