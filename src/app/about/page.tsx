import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import Counter from "@/components/motion/Counter";
import Timeline from "@/components/sections/Timeline";
import CtaSection from "@/components/sections/CtaSection";
import MagneticButton from "@/components/motion/MagneticButton";
import { getDivisions, getStats } from "@/lib/queries";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "About",
  description:
    "ATIN Healthcare Pvt Ltd is a WHO-GMP certified PCD pharma franchise company with 500+ formulations across eight therapy divisions and 320+ partners nationwide.",
};

const VALUES = [
  {
    title: "The territory is the promise",
    body: "A monopoly right that is not written down is a sales line. Ours is in the agreement, and we have walked away from orders rather than break one.",
  },
  {
    title: "Certificates before cartons",
    body: "Every WHO-GMP, ISO and FSSAI certificate goes to a prospective partner before their first order, with the reference number intact so they can verify it themselves.",
  },
  {
    title: "Dispatch is a quality metric",
    body: "A late carton costs a partner a doctor. We treat a missed dispatch window the same way we treat a failed batch — as a defect with a root cause.",
  },
  {
    title: "Depth over headcount",
    body: "We would rather have 300 partners who reorder every month than 3,000 who ordered once. Growth follows retention, not the other way round.",
  },
];

const STORY = [
  "We started in 2014 with four brands, one cardiac-diabetic bag and a single district in Himachal Pradesh. The founding team had all worked the field — as medical representatives, then as area and regional managers — and had all lost the same argument with a head office at some point: that a distributor's reputation is built or broken by the company behind them, not by the brochure in their hand.",
  "So the company was built backwards from that. First the manufacturing partners were chosen for their audit history rather than their price list. Then the dispatch process was designed around a written service window instead of an aspiration. Only after both were working did the product list grow past forty SKUs.",
  "Today ATIN Healthcare runs eight therapy divisions covering more than 500 formulations — from third-generation cephalosporins and micronised progesterone through to sunscreens, protein blends and paediatric gummies. Every one of them is manufactured in a WHO-GMP certified unit and released only after the lab signs off the batch.",
  "What has not changed is the operating principle. A partner gets a district, a catalogue deep enough to hold a doctor, promotional inputs that arrive with the stock, and one named person to call. Everything else in the business is downstream of that.",
];

export default async function AboutPage() {
  const [stats, divisions] = await Promise.all([getStats(), getDivisions()]);

  return (
    <>
      <PageHero
        label="About the company"
        title="Built by people who have"
        highlight="worked a territory."
        lead="ATIN Healthcare Pvt Ltd was started by field managers who had spent a decade watching good distributors lose good doctors over things a manufacturer controls — dispatch, packaging, and a promise kept."
        crumbs={[{ label: "About" }]}
        image="/media/team.webp"
        imageAlt="The ATIN Healthcare team in conversation around a table in the Baddi office"
        caption="Head office, Baddi"
      />

      {/* story */}
      <Section className="grain bg-bone">
        <div className="container-x">
          <div className="grid-12 gap-y-12">
            <div className="col-span-4 md:col-span-4">
              <div className="md:sticky md:top-[calc(var(--nav-h)+3rem)]">
                <SectionHeading
                  index="01"
                  label="Our story"
                  title="Twelve years, one"
                  highlight="operating principle."
                />
              </div>
            </div>

            <div className="col-span-4 md:col-span-7 md:col-start-6">
              <div className="space-y-7 border-t border-rule pt-8">
                {STORY.map((p, i) => (
                  <Reveal key={i} delay={i * 0.06}>
                    <p className="max-w-[64ch] text-[1rem] leading-[1.8] text-ink/70">{p}</p>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={0.25}>
                <div className="mt-14 grid grid-cols-2 border-t border-rule md:grid-cols-4">
                  {stats.map((s, i) => (
                    <div
                      key={s.id}
                      className={`py-6 ${i > 0 ? "md:border-l md:border-rule md:pl-5" : ""} ${
                        i % 2 === 1 ? "border-l border-rule pl-5" : ""
                      }`}
                    >
                      <div className="num display text-[1.9rem] leading-none text-ink">
                        <Counter to={s.value} suffix={s.suffix ?? ""} />
                      </div>
                      <div className="label mt-2.5 text-ink/45">{s.label}</div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </Section>

      <Timeline />

      {/* values */}
      <Section className="bg-ink">
        <div className="container-x">
          <div className="grid-12 items-end gap-y-8">
            <div className="col-span-4 md:col-span-7">
              <SectionHeading
                dark
                index="03"
                label="How we operate"
                title="Four rules we do not"
                highlight="negotiate."
              />
            </div>
            <div className="col-span-4 md:col-span-3 md:col-start-10 md:pb-2">
              <MagneticButton href="/manufacturing" variant="outline-light">
                How we manufacture
              </MagneticButton>
            </div>
          </div>

          <div className="mt-16 border-t border-rule-dark md:mt-24">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.06}>
                <div className="group grid-12 items-baseline gap-y-3 border-b border-rule-dark py-8 transition-colors duration-500 hover:bg-ink-2 md:py-10">
                  <span className="label col-span-1 text-lime">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="display col-span-3 text-[1.35rem] text-bone md:col-span-5 md:text-[2rem]">
                    {v.title}
                  </h3>
                  <p className="col-span-4 max-w-[54ch] text-[0.92rem] leading-[1.75] text-bone/55 md:col-span-6">
                    {v.body}
                  </p>
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
