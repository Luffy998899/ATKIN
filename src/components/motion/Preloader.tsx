"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, animate } from "motion/react";
import { usePrefersReducedMotion, useSessionFlag } from "@/lib/hooks";

const KEY = "atin-preloaded";

/**
 * First-visit curtain: a bone sheet with a mono counter that ticks to 100,
 * then wipes upward. Skipped on repeat visits and under reduced motion.
 */
export default function Preloader() {
  const alreadySeen = useSessionFlag(KEY);
  const reduced = usePrefersReducedMotion();
  const skip = alreadySeen || reduced;

  const [progress, setProgress] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (skip) return;

    document.body.style.overflow = "hidden";

    const controls = animate(0, 100, {
      duration: 1.7,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setProgress(Math.round(v)),
      onComplete: () => {
        try {
          sessionStorage.setItem(KEY, "1");
        } catch {
          /* private mode — the curtain simply shows again next visit */
        }
        setTimeout(() => setFinished(true), 220);
      },
    });

    return () => {
      controls.stop();
      document.body.style.overflow = "";
    };
  }, [skip]);

  useEffect(() => {
    if (finished || skip) document.body.style.overflow = "";
  }, [finished, skip]);

  const show = !skip && !finished;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[10000] bg-bone"
          exit={{ y: "-100%", transition: { duration: 0.9, ease: [0.83, 0, 0.17, 1] } }}
        >
          <div className="container-x flex h-full flex-col justify-between py-10">
            <div className="flex items-baseline justify-between border-b border-rule pb-4">
              <span className="label text-ink/50">ATIN Healthcare Pvt Ltd</span>
              <span className="label text-leaf">Baddi, H.P.</span>
            </div>

            <div className="flex items-end justify-between gap-6">
              <span className="num display text-[clamp(4rem,18vw,13rem)] leading-[0.8] text-ink">
                {String(progress).padStart(3, "0")}
              </span>
              <span className="label mb-4 text-ink/40">Loading</span>
            </div>

            <div className="border-t border-rule pt-4">
              <div className="h-px w-full bg-rule">
                <motion.div className="h-full bg-leaf" style={{ width: `${progress}%` }} />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
