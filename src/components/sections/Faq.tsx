"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { SectionHeading } from "@/components/ui/Section";
import { FAQS } from "@/lib/data/faqs";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="grain relative bg-bone py-24 md:py-32">
      <div className="container-x">
        <div className="grid-12 gap-y-12">
          <div className="col-span-4 md:col-span-4">
            <div className="md:sticky md:top-[calc(var(--nav-h)+3rem)]">
              <SectionHeading
                index="10"
                label="Straight answers"
                title="Questions we get"
                highlight="every week."
                lead="If yours is not here, WhatsApp us — you will get a real answer, not a callback promise."
              />
            </div>
          </div>

          <div className="col-span-4 md:col-span-7 md:col-start-6">
            <div className="border-t border-rule">
              {FAQS.map((item, i) => {
                const isOpen = open === i;
                return (
                  <motion.div
                    key={item.q}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.55, delay: i * 0.03 }}
                    className="border-b border-rule"
                  >
                    <button
                      onClick={() => setOpen(isOpen ? null : i)}
                      data-cursor="hover"
                      aria-expanded={isOpen}
                      className="group flex w-full items-start gap-5 py-6 text-left"
                    >
                      <span className="label mt-1.5 shrink-0 text-leaf">
                        {String(i + 1).padStart(2, "0")}
                      </span>

                      <span className="display flex-1 text-[1.1rem] leading-[1.25] text-ink transition-colors duration-300 group-hover:text-leaf md:text-[1.4rem]">
                        {item.q}
                      </span>

                      <span className="relative mt-2 grid h-4 w-4 shrink-0 place-items-center">
                        <span className="absolute h-px w-4 bg-ink" />
                        <motion.span
                          animate={{ scaleY: isOpen ? 0 : 1 }}
                          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                          className="absolute h-4 w-px bg-ink"
                        />
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="max-w-[60ch] pb-7 pl-11 pr-8 text-[0.92rem] leading-[1.75] text-ink/60">
                            {item.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
