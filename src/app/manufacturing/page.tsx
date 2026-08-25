import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import QualitySection from "@/components/sections/QualitySection";
import CtaSection from "@/components/sections/CtaSection";
import { Reveal } from "@/components/motion/Reveal";
import { getCertifications, getDivisions } from "@/lib/queries";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Manufacturing & Quality",
  description:
    "WHO-GMP certified manufacturing, segregated cephalosporin blocks, in-house HPLC quality control and 36-month stability data — how ATIN Healthcare makes and releases every batch.",
};

const FLOW: [string, string][] = [
  ["Raw material intake", "Every consignment is quarantined, sampled and tested against its COA before release to production. Rejected lots go back, not into a blend."],
  ["Dispensing & granulation", "Weighing happens in a dedicated booth under reverse laminar airflow, with double-verification signed by two operators."],
  ["Compression & coating", "In-process checks on weight, hardness, thickness, friability and disintegration are logged every thirty minutes through the run."],
  ["Packing & coding", "Alu-Alu and blister lines run online print inspection, so batch number, manufacturing date and expiry are verified on every strip."],
  ["Finished goods QC", "Assay, dissolution, uniformity of content and microbial limits are cleared in-house before the QA head signs the release note."],
  ["Warehouse & dispatch", "Released stock moves to a temperature-mapped warehouse and ships within 24–72 hours of payment realisation, tracking sent the same evening."],
];

export default async function ManufacturingPage() {
  const [certifications, divisions] = await Promise.all([getCertifications(), getDivisions()]);

  return (
    <>
      <PageHero
        label="Manufacturing & quality"
        title="Every batch has a paper trail"
        highlight="you can follow."
        lead="Our units are WHO-GMP certified with physically segregated blocks, in-house HPLC quality control, and stability data held to ICH zone IVb conditions — the ones that actually match the Indian climate."
        crumbs={[{ label: "Manufacturing" }]}
        image="/media/manufacturing.webp"
        imageAlt="Technician inspecting an Alu-Alu blister packaging line inside a clean room"
        caption="WHO-GMP block"
      />

      <QualitySection />

      {/* batch flow */}
      <Section className="bg-ink">
        <div className="container-x">
          <div className="grid-12 items-end gap-y-8">
            <div className="col-span-4 md:col-span-7">
              <SectionHeading
                dark
                index="07"
                label="Batch journey"
                title="From raw material to"
                highlight="your warehouse."
              />
            </div>
            <div className="col-span-4 md:col-span-4 md:col-start-9 md:pb-3">
              <p className="max-w-[38ch] text-[0.92rem] leading-[1.75] text-bone/50">
                Six controlled stages, each with its own sign-off. A batch cannot advance until the
                previous stage is cleared and recorded.
              </p>
            </div>
          </div>

          <div className="mt-16 border-t border-rule-dark md:mt-24">
            {FLOW.map(([title, body], i) => (
              <Reveal key={title} delay={i * 0.05}>
                <div className="group grid-12 items-baseline gap-y-3 border-b border-rule-dark py-8 transition-colors duration-500 hover:bg-ink-2">
                  <span className="num display col-span-1 text-[1.6rem] text-bone/15 transition-colors duration-500 group-hover:text-lime md:text-[2.4rem]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="display col-span-3 text-[1.25rem] text-bone md:col-span-5 md:text-[1.9rem]">
                    {title}
                  </h3>
                  <p className="col-span-4 max-w-[54ch] text-[0.9rem] leading-[1.75] text-bone/50 md:col-span-6">
                    {body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* certifications */}
      <Section className="grain bg-bone">
        <div className="container-x">
          <div className="grid-12 items-end gap-y-8">
            <div className="col-span-4 md:col-span-7">
              <SectionHeading
                index="08"
                label="Compliance"
                title="Certificates shared before"
                highlight="your first order."
              />
            </div>
            <div className="col-span-4 md:col-span-4 md:col-start-9 md:pb-3">
              <p className="max-w-[38ch] text-[0.92rem] leading-[1.75] text-ink/60">
                Each carries an issuing authority and a reference number. Ask for the scans and
                verify them yourself — we would rather you did.
              </p>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-x-5 gap-y-10 md:mt-24 md:grid-cols-3 md:gap-x-6">
            {certifications.map((c, i) => (
              <Reveal key={c.id} delay={(i % 3) * 0.07}>
                <div className="group h-full border-t border-rule pt-5">
                  <span className="absolute" />
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="label text-leaf">{String(i + 1).padStart(2, "0")}</span>
                    <span className="label text-ink/30">Verified</span>
                  </div>
                  <h3 className="display mt-8 text-[1.5rem] text-ink md:text-[1.9rem]">{c.name}</h3>
                  <p className="mt-3 max-w-[36ch] text-[0.88rem] leading-[1.7] text-ink/55">
                    {c.description}
                  </p>
                  <span className="mt-6 block h-px w-full origin-left scale-x-0 bg-leaf transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <CtaSection divisions={divisions} />
    </>
  );
}
