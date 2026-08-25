"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/hooks";

const scenes = {
  hero: dynamic(() => import("./HeroCanvas"), { ssr: false }),
  dna: dynamic(() => import("./DnaCanvas"), { ssr: false }),
  pills: dynamic(() => import("./PillStripCanvas"), { ssr: false }),
};

export type SceneProps = { frozen?: boolean };

/**
 * Mounts a WebGL scene once it scrolls into view, and never on devices without
 * WebGL. When the visitor asks for reduced motion the scene still renders — but
 * as a single frozen frame, so they get the composition without the movement.
 */
export default function LazyScene({
  name,
  className,
  rootMargin = "220px",
}: {
  name: keyof typeof scenes;
  className?: string;
  rootMargin?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  const frozen = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // cheap WebGL capability probe
    try {
      const canvas = document.createElement("canvas");
      const ok = canvas.getContext("webgl2") ?? canvas.getContext("webgl");
      if (!ok) return;
    } catch {
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  const Scene = scenes[name];

  return (
    <div ref={ref} className={cn("pointer-events-none absolute inset-0", className)} aria-hidden>
      {show && <Scene frozen={frozen} />}
    </div>
  );
}
