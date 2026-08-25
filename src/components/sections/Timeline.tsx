"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { SectionHeading } from "@/components/ui/Section";

const MILESTONES = [
  { year: "2014", title: "Four brands, one district", body: "ATIN Healthcare is registered in Baddi with a cardiac-diabetic bag of four brands and a single Himachal district." },
  { year: "2016", title: "First WHO-GMP unit", body: "Manufacturing consolidates into a WHO-GMP certified oral-solids block with a segregated cephalosporin area." },
  { year: "2018", title: "Gynae and derma launch", body: "Two new divisions open, taking the catalogue past 150 SKUs and the partner base past sixty districts." },
  { year: "2020", title: "Nutraceutical licence", body: "FSSAI licensing brings protein blends, omega-3 and immunity formats into the range during a year that demanded them." },
  { year: "2022", title: "Dispatch SLA published", body: "The 24–72 hour dispatch window moves from an internal target to a written commitment in every partner agreement." },
  { year: "2024", title: "Eight divisions, 320 partners", body: "Paediatric and gastro complete the eight-division structure; the network crosses 180 districts." },
  { year: "2026", title: "500+ SKUs live", body: "The catalogue passes five hundred active formulations with 36-month stability data held on every oral solid." },
];

export default function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.75", "end 0.7"] });
  const scaleX = useSpring(scrollYProgress, { stiffness: 110, damping: 26 });

  return (
    <section className="relative bg-bone-2 py-24 md:py-32">
      <div className="container-x">
        <SectionHeading index="02" label="Milestones" title="How the company" highlight="was built." />

        <div ref={ref} className="mt-16 md:mt-24">
          {/* progress rail */}
          <div className="h-px w-full bg-rule">
            <motion.div style={{ scaleX, originX: 0 }} className="h-full w-full bg-leaf" />
          </div>

          <div>
            {MILESTONES.map((m) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="group grid-12 items-baseline gap-y-2 border-b border-rule py-7 transition-colors duration-400 hover:bg-bone"
              >
                <span className="num display col-span-1 text-[1.4rem] text-leaf md:col-span-2 md:text-[2rem]">
                  {m.year}
                </span>
                <h3 className="display col-span-3 text-[1.15rem] text-ink md:col-span-4 md:text-[1.6rem]">
                  {m.title}
                </h3>
                <p className="col-span-4 text-[0.88rem] leading-[1.7] text-ink/55 md:col-span-6">
                  {m.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
