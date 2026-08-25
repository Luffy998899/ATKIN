"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Label } from "@/components/ui/Section";
import { TextReveal } from "@/components/motion/TextReveal";

const STEPS = [
  { day: "Day 1", label: "Enquiry", title: "Tell us your district", body: "Send your city, the therapy segments you already sell and the doctors you cover. We check the territory against our partner map the same day." },
  { day: "Day 1–2", label: "Availability", title: "We confirm the territory", body: "If your district is open you get written confirmation of monopoly. If it is not, we tell you straight away rather than selling you a shared area." },
  { day: "Day 2–3", label: "Documents", title: "Licence and GST check", body: "Share your drug licence number and GST certificate. Our compliance desk verifies both before a single carton is allocated to you." },
  { day: "Day 3–5", label: "Agreement", title: "Rates and rights on paper", body: "You receive the net rate list, the monopoly agreement and the promotional-input schedule together. Nothing is left to a phone call." },
  { day: "Day 5–8", label: "Dispatch", title: "Opening order ships", body: "Stock plus your full promotional kit leaves the warehouse within 24–72 hours of payment realisation, with tracking sent the same evening." },
  { day: "Ongoing", label: "Support", title: "Your manager takes over", body: "A named territory manager works your doctor list with you for the first quarter — visual aids, sampling plan and reorder rhythm." },
];

export default function ProcessScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-73%"]);
  const line = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={ref} className="relative h-[400vh] bg-ink">
      <div className="sticky top-0 flex h-svh flex-col overflow-hidden">
        <div className="container-x shrink-0 pt-[calc(var(--nav-h)+3rem)]">
          <div className="grid-12 items-end gap-y-6">
            <div className="col-span-4 md:col-span-6">
              <Label index="06" dark>
                From enquiry to first dispatch
              </Label>
              <h2 className="display mt-7 text-[clamp(2.2rem,5vw,4.2rem)] text-bone">
                <TextReveal text="Eight days," />{" "}
                <TextReveal text="six steps." delay={0.1} wordClassName="text-lime" />
              </h2>
            </div>

            <div className="col-span-4 md:col-span-3 md:col-start-10 md:text-right">
              <span className="label text-bone/35">Scroll →</span>
            </div>
          </div>

          <div className="mt-8 h-px w-full bg-rule-dark">
            <motion.div style={{ width: line }} className="h-full bg-lime" />
          </div>
        </div>

        {/* horizontal track */}
        <div className="flex flex-1 items-center overflow-hidden">
          <motion.div
            style={{ x }}
            className="flex pl-5 md:pl-[max(2.25rem,calc((100vw-90rem)/2+2.25rem))]"
          >
            {STEPS.map((s, i) => (
              <article
                key={s.title}
                className="group w-[80vw] shrink-0 border-l border-rule-dark px-6 sm:w-[52vw] md:w-[38vw] md:px-10 lg:w-[27vw]"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <span className="label text-lime">{String(i + 1).padStart(2, "0")}</span>
                  <span className="label text-bone/35">{s.day}</span>
                </div>

                <div className="num display mt-10 text-[7rem] leading-[0.8] text-bone/10 transition-colors duration-500 group-hover:text-lime/25">
                  {String(i + 1).padStart(2, "0")}
                </div>

                <p className="label mt-10 text-bone/40">{s.label}</p>
                <h3 className="display mt-3 text-[clamp(1.4rem,2.4vw,2rem)] text-bone">
                  {s.title}
                </h3>
                <p className="mt-4 max-w-[38ch] text-[0.9rem] leading-[1.7] text-bone/50">
                  {s.body}
                </p>
              </article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
