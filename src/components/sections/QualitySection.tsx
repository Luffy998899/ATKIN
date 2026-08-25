"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import Counter from "@/components/motion/Counter";
import MagneticButton from "@/components/motion/MagneticButton";
import Figure from "@/components/ui/Figure";

const CAPABILITIES = [
  ["HVAC & clean rooms", "Class-D areas with validated pressure differentials and HEPA filtration on every air handling unit."],
  ["Segregated blocks", "Cephalosporins and general oral solids are manufactured in physically separate blocks with dedicated staff."],
  ["In-house QC lab", "HPLC, UV spectrophotometry, dissolution and disintegration testing on every batch before release."],
  ["Stability chambers", "Accelerated and real-time studies held to ICH zone IVb conditions — the ones that match the Indian climate."],
  ["Purified water system", "Multi-stage RO with continuous conductivity monitoring and a fully validated distribution loop."],
  ["Batch traceability", "Every raw material traced to supplier, batch and COA — retrievable for the full shelf life of the product."],
];

const SPECS = [
  { value: 6, suffix: "", label: "Manufacturing blocks" },
  { value: 42, suffix: "", label: "QC parameters per batch" },
  { value: 100, suffix: "%", label: "Batches lab-released" },
  { value: 36, suffix: " mo", label: "Stability data held" },
];

export default function QualitySection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const panelY = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);

  return (
    <section ref={ref} className="grain relative bg-bone py-24 md:py-32">
      <div className="container-x">
        <div className="grid-12 items-start gap-y-14">
          <div className="col-span-4 md:col-span-6">
            <SectionHeading
              index="07"
              label="Inside the plant"
              title="Compliance you can put in front of"
              highlight="an inspector."
              lead="Certificates are shared before you order, batch records stay retrievable for the whole shelf life, and every lot leaves only after the lab signs it off."
            />

            <div className="mt-10">
              <MagneticButton href="/manufacturing" variant="outline">
                Manufacturing
              </MagneticButton>
            </div>
          </div>

          {/* framed 3D panel */}
          <motion.div
            style={{ y: panelY }}
            className="col-span-4 md:col-span-5 md:col-start-8"
          >
            <Figure
              src="/media/lab.webp"
              alt="Analyst loading a sample into an HPLC instrument in the quality control laboratory"
              caption="In-house QC, every batch"
              index="ICH Zone IVb"
              sizes="(max-width: 768px) 100vw, 40vw"
              className="aspect-4/5 w-full"
            />
          </motion.div>
        </div>

        {/* spec strip */}
        <Reveal className="mt-20 md:mt-28">
          <div className="grid grid-cols-2 border-t border-rule md:grid-cols-4">
            {SPECS.map((s, i) => (
              <div
                key={s.label}
                className={`py-7 md:py-9 ${i > 0 ? "md:border-l md:border-rule md:pl-7" : ""} ${
                  i % 2 === 1 ? "border-l border-rule pl-5 md:pl-7" : ""
                }`}
              >
                <div className="num display text-[clamp(1.9rem,4vw,3.1rem)] leading-none text-ink">
                  <Counter to={s.value} suffix={s.suffix} />
                </div>
                <div className="label mt-3 text-ink/45">{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* capability list, set like a spec sheet */}
        <div className="mt-16 border-t border-rule md:mt-20">
          {CAPABILITIES.map(([title, body], i) => (
            <Reveal key={title} delay={i * 0.05}>
              <div className="group grid-12 items-baseline border-b border-rule py-6 transition-colors duration-400 hover:bg-bone-2">
                <span className="label col-span-1 text-leaf">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="display col-span-3 text-[1.15rem] text-ink md:col-span-4 md:text-[1.5rem]">
                  {title}
                </h3>
                <p className="col-span-4 mt-3 text-[0.9rem] leading-[1.7] text-ink/55 md:col-span-7 md:mt-0">
                  {body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
