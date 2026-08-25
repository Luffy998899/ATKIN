"use client";

import { useRef, useState } from "react";
import { motion } from "motion/react";
import { Label } from "@/components/ui/Section";
import { TextReveal } from "@/components/motion/TextReveal";
import type { Testimonial } from "@/types/db";

/** Drag-scrolled pull quotes. Square cards, hairline rules, no avatars. */
export default function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  const [dragging, setDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  return (
    <section className="grain relative overflow-hidden bg-bone-2 py-24 md:py-32">
      <div className="container-x">
        <div className="grid-12 items-end gap-y-8">
          <div className="col-span-4 md:col-span-7">
            <Label index="08">From the field</Label>
            <h2 className="display mt-7 text-[clamp(2.3rem,5vw,4.2rem)] text-ink">
              <TextReveal text="Three hundred partners," />{" "}
              <TextReveal text="one standard." delay={0.1} wordClassName="text-leaf" />
            </h2>
          </div>
          <div className="col-span-4 md:col-span-3 md:col-start-10 md:text-right">
            <span className="label text-ink/35">Drag →</span>
          </div>
        </div>
      </div>

      <div ref={trackRef} className="mt-14 cursor-grab overflow-hidden active:cursor-grabbing">
        <motion.div
          drag="x"
          onDragStart={() => setDragging(true)}
          onDragEnd={() => setDragging(false)}
          dragConstraints={{
            left: -(
              testimonials.length * 420 -
              (typeof window !== "undefined" ? window.innerWidth : 1200) +
              120
            ),
            right: 0,
          }}
          dragElastic={0.1}
          dragTransition={{ power: 0.3, timeConstant: 340 }}
          className="flex"
          style={{ width: "max-content" }}
        >
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="group flex w-[84vw] shrink-0 flex-col justify-between border-l border-rule px-6 sm:w-[26rem] md:px-10"
            >
              <div>
                <span className="label text-leaf">{String(i + 1).padStart(2, "0")}</span>
                <blockquote className="display mt-8 select-none text-[1.25rem] leading-[1.35] text-ink md:text-[1.5rem]">
                  “{t.quote}”
                </blockquote>
              </div>

              <figcaption className="mt-10 border-t border-rule pt-4">
                <span className="block text-[0.95rem] font-medium text-ink">{t.name}</span>
                <span className="label mt-1.5 block text-ink/45">
                  {[t.role, t.company].filter(Boolean).join(" · ")}
                </span>
                <span className="label mt-1 block text-leaf">{t.location}</span>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>

      {dragging && <span className="sr-only">Dragging testimonials</span>}
    </section>
  );
}
