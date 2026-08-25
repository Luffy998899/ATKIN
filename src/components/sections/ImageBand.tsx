"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Figure from "@/components/ui/Figure";
import { Label } from "@/components/ui/Section";

const FRAMES = [
  {
    src: "/media/pharmacist.webp",
    alt: "Pharmacist handing a medicine strip across a chemist counter",
    caption: "Retail counter, Lucknow",
    index: "Fig. 02",
  },
  {
    src: "/media/manufacturing.webp",
    alt: "Technician inspecting an Alu-Alu blister packaging line in a clean room",
    caption: "Blister line, WHO-GMP block",
    index: "Fig. 03",
  },
  {
    src: "/media/lab.webp",
    alt: "Analyst loading a sample into an HPLC instrument in a quality control laboratory",
    caption: "Quality control, batch release",
    index: "Fig. 04",
  },
  {
    src: "/media/partner.webp",
    alt: "Medical representative presenting a product folder to a doctor in a clinic",
    caption: "Partner call, chamber visit",
    index: "Fig. 05",
  },
];

/** Scroll-driven horizontal band. The whole company in four frames. */
export default function ImageBand() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["6%", "-22%"]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-bone-2 py-20 md:py-28">
      <div className="container-x">
        <div className="grid-12 items-end gap-y-4">
          <div className="col-span-4 md:col-span-5">
            <Label index="02">Where the work happens</Label>
            <p className="mt-6 max-w-[34ch] text-[0.95rem] leading-[1.7] text-ink/60">
              From the clean room to the chemist counter — four points on the chain a partner
              inherits when they sign.
            </p>
          </div>
        </div>
      </div>

      <motion.div style={{ x }} className="mt-12 flex gap-4 px-5 md:mt-16 md:gap-6 md:px-9">
        {FRAMES.map((f, i) => (
          <Figure
            key={f.src}
            {...f}
            parallax={false}
            coverClassName="bg-bone-2"
            sizes="(max-width: 768px) 72vw, 30vw"
            className={`aspect-3/4 w-[72vw] shrink-0 sm:w-[42vw] md:w-[30vw] ${
              i % 2 === 1 ? "md:mt-14" : ""
            }`}
          />
        ))}
      </motion.div>
    </section>
  );
}
