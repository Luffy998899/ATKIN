"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { Label } from "@/components/ui/Section";

const COPY =
  "Most pharma companies sell you a product list. We hand you a territory, a compliance file you can put in front of any inspector, and a dispatch team that treats your order like their own reputation.";

const KEY = /territory|compliance|dispatch|reputation/i;

/** Editorial pull-statement. Each word inks in as the section passes. */
export default function ScrollStatement() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "end 0.55"] });
  const words = COPY.split(" ");

  return (
    <section className="grain relative bg-bone py-24 md:py-40">
      <div className="container-x">
        <div className="grid-12">
          <div className="col-span-4 md:col-span-3">
            <Label index="01">Why partners stay</Label>
          </div>

          <div ref={ref} className="col-span-4 mt-10 md:col-span-9 md:mt-0">
            <p className="display flex flex-wrap text-[clamp(1.65rem,3.9vw,3.15rem)] leading-[1.24] text-ink">
              {words.map((w, i) => (
                <Word
                  key={i}
                  progress={scrollYProgress}
                  range={[i / words.length, (i + 2) / words.length]}
                  accent={KEY.test(w)}
                >
                  {w}
                </Word>
              ))}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Word({
  children,
  progress,
  range,
  accent,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  accent: boolean;
}) {
  const opacity = useTransform(progress, range, [0.16, 1]);

  return (
    <motion.span
      style={{ opacity }}
      className={`mr-[0.26em] inline-block ${accent ? "text-leaf" : "text-ink"}`}
    >
      {children}
    </motion.span>
  );
}
