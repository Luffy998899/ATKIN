"use client";

import { motion } from "motion/react";
import { Label } from "@/components/ui/Section";
import { TextReveal } from "@/components/motion/TextReveal";
import { Reveal } from "@/components/motion/Reveal";
import EnquiryForm from "@/components/forms/EnquiryForm";
import Marquee from "@/components/motion/Marquee";
import { site } from "@/lib/site";
import { whatsappLink } from "@/lib/utils";
import type { Division } from "@/types/db";

const PROMISES = [
  "Territory availability confirmed within one working day",
  "Monopoly rights written into the agreement",
  "Net rate list and promotional schedule shared upfront",
  "No franchise fee, no security deposit, no renewal charge",
];

const TICKER = ["Monopoly rights", "WHO-GMP certified", "24–72 hr dispatch", "500+ SKUs", "180 districts"];

export default function CtaSection({ divisions }: { divisions: Division[] }) {
  return (
    <section id="apply" className="relative overflow-hidden bg-navy text-bone">
      <div className="container-x py-24 md:py-32">
        <div className="grid-12 gap-y-16">
          {/* left */}
          <div className="col-span-4 md:col-span-5">
            <Label index="11" dark>
              Districts still open
            </Label>

            <h2 className="display mt-7 text-[clamp(2.6rem,6.4vw,5.4rem)] text-bone">
              <TextReveal text="Claim your" />
              <br />
              <TextReveal text="territory." delay={0.1} wordClassName="text-lime" />
            </h2>

            <Reveal delay={0.18}>
              <p className="mt-8 max-w-[40ch] text-[0.98rem] leading-[1.75] text-bone/60">
                Tell us your district and the segments you already sell. We check it against our
                partner map and come back with a straight yes or no — usually the same day.
              </p>
            </Reveal>

            <ul className="mt-10 border-t border-bone/15">
              {PROMISES.map((p, i) => (
                <motion.li
                  key={p}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.07, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-baseline gap-4 border-b border-bone/15 py-3.5"
                >
                  <span className="label shrink-0 text-lime">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-[0.9rem] leading-[1.6] text-bone/70">{p}</span>
                </motion.li>
              ))}
            </ul>

            <Reveal delay={0.45}>
              <div className="mt-10 flex flex-wrap gap-x-10 gap-y-3">
                <a href={site.phoneHref} data-cursor="hover" className="num link-draw text-bone">
                  {site.phone}
                </a>
                <a
                  href={whatsappLink(site.whatsapp, "Hi ATIN Healthcare, is my district still open?")}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  className="label link-draw text-lime"
                >
                  Ask on WhatsApp
                </a>
              </div>
            </Reveal>
          </div>

          {/* form */}
          <div className="col-span-4 md:col-span-6 md:col-start-7">
            <Reveal delay={0.12}>
              <div className="border-t border-bone/25 pt-8">
                <div className="mb-10 flex items-baseline justify-between gap-4">
                  <h3 className="display text-[1.5rem] text-bone">Franchise application</h3>
                  <span className="label text-lime">Accepting partners</span>
                </div>
                <EnquiryForm kind="franchise" divisions={divisions} tone="dark" />
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      <div className="border-t border-bone/15 py-5">
        <Marquee speed={40} fade={false} reverse>
          <span className="flex items-center gap-8 pr-8">
            {Array.from({ length: 4 }).map((_, r) => (
              <span key={r} className="flex items-center gap-8">
                {TICKER.map((x) => (
                  <span key={x} className="flex items-center gap-8">
                    <span className="label text-bone/45">{x}</span>
                    <span className="h-1 w-1 rounded-full bg-lime" />
                  </span>
                ))}
              </span>
            ))}
          </span>
        </Marquee>
      </div>
    </section>
  );
}
