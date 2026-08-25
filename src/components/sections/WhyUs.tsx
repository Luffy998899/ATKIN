"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { Label } from "@/components/ui/Section";
import { TextReveal } from "@/components/motion/TextReveal";
import Figure from "@/components/ui/Figure";

const REASONS = [
  {
    title: "Genuine monopoly rights",
    body: "Your district is yours. It is written into the agreement, and enquiries from your pincodes are routed to you — not quietly sold to the next caller.",
  },
  {
    title: "WHO-GMP manufacturing",
    body: "Every oral solid, liquid and topical is made in certified units with segregated blocks for cephalosporins. Certificates are shared before you order, not after.",
  },
  {
    title: "24–72 hour dispatch",
    body: "Orders leave the warehouse within three working days of payment realisation, with a tracking number the same evening. Late dispatch is treated as a defect.",
  },
  {
    title: "Promotional kit included",
    body: "Visual aids, sample packs, prescription pads, MR bags, catch covers and reminder cards ship with your stock — not two weeks behind it.",
  },
  {
    title: "Rates fixed in writing",
    body: "Net rates stay locked for the stated period so you can quote a chemist with confidence and plan your margin twelve months out.",
  },
  {
    title: "One named manager",
    body: "You get a single point of contact who knows your territory, your order history and your doctors — not a rotating support queue.",
  },
];

export default function WhyUs() {
  const [active, setActive] = useState(0);
  const onEnter = useCallback((i: number) => setActive(i), []);

  return (
    <section className="relative bg-forest py-24 text-bone md:py-32">
      <div className="container-x">
        <div className="grid-12 gap-y-14">
          {/* sticky left rail */}
          <div className="col-span-4 md:col-span-4">
            <div className="md:sticky md:top-[calc(var(--nav-h)+3rem)]">
              <Label index="05" dark>
                Six reasons partners sign
              </Label>

              <h2 className="display mt-7 max-w-[12ch] text-[clamp(2.3rem,5vw,4.2rem)] text-bone">
                <TextReveal text="The things that actually" />{" "}
                <TextReveal text="cost you money." delay={0.1} wordClassName="text-lime" />
              </h2>

              <div className="mt-10 flex items-baseline gap-3 border-t border-bone/15 pt-4">
                <motion.span
                  key={active}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="num display text-4xl text-lime"
                >
                  {String(active + 1).padStart(2, "0")}
                </motion.span>
                <span className="label text-bone/40">/ {String(REASONS.length).padStart(2, "0")}</span>
              </div>

              <Figure
                src="/media/partner.webp"
                alt="Medical representative presenting a product folder to a doctor in a clinic"
                caption="Partner call, chamber visit"
                coverClassName="bg-forest"
                sizes="(max-width: 768px) 100vw, 30vw"
                className="mt-10 hidden aspect-4/3 w-full md:block"
              />
            </div>
          </div>

          {/* entries */}
          <div className="col-span-4 md:col-span-7 md:col-start-6">
            {REASONS.map((r, i) => (
              <Entry key={r.title} {...r} index={i} onEnter={onEnter} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Entry({
  title,
  body,
  index,
  onEnter,
}: {
  title: string;
  body: string;
  index: number;
  onEnter: (i: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });

  useEffect(() => {
    if (inView) onEnter(index);
  }, [inView, onEnter, index]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      className="group border-t border-bone/15 py-9 first:border-t-0 first:pt-0 md:py-12"
    >
      <div className="flex items-baseline gap-5">
        <span className="label shrink-0 text-lime">{String(index + 1).padStart(2, "0")}</span>
        <div>
          <h3 className="display text-[clamp(1.5rem,3vw,2.4rem)] text-bone">{title}</h3>
          <p className="mt-4 max-w-[52ch] text-[0.95rem] leading-[1.75] text-bone/55">{body}</p>
        </div>
      </div>

      <span className="mt-8 block h-px w-full origin-left scale-x-0 bg-lime transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
    </motion.div>
  );
}
