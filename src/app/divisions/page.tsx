import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import DivisionCard from "@/components/ui/DivisionCard";
import CtaSection from "@/components/sections/CtaSection";
import { getDivisions } from "@/lib/queries";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Therapy Divisions",
  description:
    "Eight PCD pharma franchise divisions from ATIN Healthcare — cardiac-diabetic, gynaecology, dermatology, orthopaedic, anti-infectives, gastro, paediatric and nutraceuticals.",
};

export default async function DivisionsPage() {
  const divisions = await getDivisions();

  return (
    <>
      <PageHero
        label="Eight therapy divisions"
        title="Pick the bag your doctors"
        highlight="already carry."
        lead="Most partners start with one segment their existing prescribers know, then widen the basket once the reorder rhythm is set. Every division below is available for monopoly appointment."
        crumbs={[{ label: "Divisions" }]}
        image="/media/pharmacist.webp"
        imageAlt="Pharmacist at a chemist counter with shelves of medicine behind"
        caption="Retail counter, Lucknow"
      />

      <Section>
        <div className="container-x">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {divisions.map((d, i) => (
              <DivisionCard key={d.id} division={d} index={i} />
            ))}
          </div>
        </div>
      </Section>

      <CtaSection divisions={divisions} />
    </>
  );
}
