"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Figure from "@/components/ui/Figure";
import LazyScene from "@/components/three/LazyScene";
import MagneticButton from "@/components/motion/MagneticButton";
import { TextReveal } from "@/components/motion/TextReveal";
import { Reveal } from "@/components/motion/Reveal";
import Counter from "@/components/motion/Counter";
import { site } from "@/lib/site";
import type { Stat } from "@/types/db";

const FACTS = ["PCD Pharma Franchise", "WHO-GMP Certified", "Est. 2014 · Baddi, H.P."];

export default function Hero({ stats }: { stats: Stat[] }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  return (
    <section ref={ref} className="grain relative overflow-hidden bg-bone pt-[72px]">
      <div className="container-x">
        {/* running head */}
        <Reveal duration={0.7}>
          <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1 border-b border-rule py-4">
            {FACTS.map((f, i) => (
              <span key={f} className="label flex items-baseline gap-6 text-ink/45">
                {f}
                {i < FACTS.length - 1 && <span className="text-rule">/</span>}
              </span>
            ))}
            <span className="label ml-auto hidden text-leaf md:block">
              Districts open for appointment
            </span>
          </div>
        </Reveal>

        <div className="grid-12 items-stretch gap-y-10">
          {/* ---------------- copy ---------------- */}
          <motion.div
            style={{ y: copyY }}
            className="col-span-4 flex flex-col justify-center pt-10 md:col-span-6 md:pb-16 md:pt-16"
          >
            <h1 className="display text-[clamp(2.4rem,5.2vw,5rem)] text-ink">
              <span className="block">
                <TextReveal text="One district." />
              </span>
              <span className="block">
                <TextReveal text="One partner." delay={0.09} />
              </span>
              <span className="block">
                <TextReveal text="Five hundred brands." delay={0.18} wordClassName="text-leaf" />
              </span>
            </h1>

            <Reveal delay={0.3}>
              <p className="mt-9 max-w-[46ch] text-[1rem] leading-[1.75] text-ink/65">
                {site.legalName} manufactures across eight therapy divisions and appoints exactly one
                franchise partner per district — written into the agreement, not promised on a call.
              </p>
            </Reveal>

            <Reveal delay={0.4}>
              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                <MagneticButton href="/contact">
                  Check your district
                  <Arrow />
                </MagneticButton>
                <MagneticButton href="/products" variant="ghost">
                  <span className="link-draw">See the product list</span>
                </MagneticButton>
              </div>
            </Reveal>
          </motion.div>

          {/* ---------------- photograph ---------------- */}
          <div className="col-span-4 md:col-span-6 md:col-start-7">
            <Figure
              src="/media/doctor.webp"
              alt="Doctor in a white coat with a stethoscope in a clinic consultation room"
              caption="Prescribed by 4,000+ doctors"
              index="Fig. 01"
              priority
              parallax={false}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="aspect-4/5 w-full md:aspect-auto md:h-[min(64svh,36rem)]"
            />

            {/* 3D band — stacked under the frame, never overlapping it */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="relative mt-3 h-24 w-full overflow-hidden bg-ink md:mt-4 md:h-28"
            >
              <LazyScene name="pills" />
              <span className="label absolute bottom-3 left-4 text-bone/45">Our range</span>
              <span className="label absolute bottom-3 right-4 text-lime">8 divisions</span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ---------------- data strip ---------------- */}
      <div className="mt-14 border-t border-rule md:mt-20">
        <div className="container-x">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className={`py-7 md:py-9 ${i > 0 ? "md:border-l md:border-rule md:pl-7" : ""} ${
                  i % 2 === 1 ? "border-l border-rule pl-5 md:pl-7" : ""
                }`}
              >
                <div className="num display text-[clamp(2rem,4vw,3.2rem)] leading-none text-ink">
                  <Counter to={s.value} suffix={s.suffix ?? ""} />
                </div>
                <div className="label mt-3 text-ink/45">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Arrow() {
  return (
    <svg
      width="18"
      height="10"
      viewBox="0 0 18 10"
      fill="none"
      className="transition-transform duration-400 group-hover:translate-x-1"
      aria-hidden
    >
      <path d="M0 5h16M12 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}
