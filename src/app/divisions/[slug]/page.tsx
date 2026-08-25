import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/layout/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import ProductCard from "@/components/ui/ProductCard";
import { Reveal } from "@/components/motion/Reveal";
import MagneticButton from "@/components/motion/MagneticButton";
import CtaSection from "@/components/sections/CtaSection";
import { getDivision, getDivisions, getProductsByDivision } from "@/lib/queries";

export const revalidate = 300;

export async function generateStaticParams() {
  const divisions = await getDivisions();
  return divisions.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const division = await getDivision(slug);
  if (!division) return { title: "Division not found" };

  return {
    title: `${division.name} Franchise`,
    description:
      division.description ??
      `PCD pharma franchise for the ${division.name} range from ATIN Healthcare.`,
  };
}

export default async function DivisionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const division = await getDivision(slug);
  if (!division) notFound();

  const [products, divisions] = await Promise.all([
    getProductsByDivision(division.id),
    getDivisions(),
  ]);

  const accent = division.accent ?? "#0c63c4";
  const others = divisions.filter((d) => d.id !== division.id);

  return (
    <>
      <PageHero
        label={division.product_count_label ?? "Therapy division"}
        title={division.name}
        highlight={division.tagline ?? undefined}
        lead={division.description ?? undefined}
        crumbs={[{ label: "Divisions", href: "/divisions" }, { label: division.name }]}
        accent={accent}
        image="/media/packs.webp"
        imageAlt="Alu-Alu blister strips and plain medicine cartons laid out on a white surface"
        caption={division.product_count_label ?? "Live range"}
      >
        <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
          <MagneticButton href="/contact">Enquire about this division</MagneticButton>
          <MagneticButton href="/products" variant="ghost">
            <span className="link-draw">Full catalogue</span>
          </MagneticButton>
        </div>
      </PageHero>

      <Section className="grain bg-bone">
        <div className="container-x">
          <SectionHeading
            index="01"
            label="In this division"
            title={`${products.length} live`}
            highlight="formulations."
            lead="Net rates, packing and promotional inputs for every brand below are shared with your monopoly agreement."
          />

          {products.length > 0 ? (
            <div className="mt-16 grid grid-cols-2 gap-x-5 gap-y-12 md:mt-20 md:grid-cols-4 md:gap-x-6">
              {products.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} accent={accent} />
              ))}
            </div>
          ) : (
            <Reveal className="mt-14">
              <p className="max-w-[60ch] border-t border-rule pt-8 text-[0.95rem] leading-[1.75] text-ink/60">
                The full brand list for this division is shared on request — call us or send an
                enquiry and we will email the division-wise rate list the same day.
              </p>
            </Reveal>
          )}
        </div>
      </Section>

      {/* other divisions */}
      <Section className="bg-ink">
        <div className="container-x">
          <SectionHeading
            dark
            index="02"
            label="Widen the basket"
            title="Other"
            highlight="divisions."
          />

          <div className="mt-14 border-t border-rule-dark">
            {others.map((d, i) => (
              <Reveal key={d.id} delay={i * 0.04}>
                <Link
                  href={`/divisions/${d.slug}`}
                  data-cursor="hover"
                  className="group grid-12 items-baseline gap-y-2 border-b border-rule-dark py-6 transition-colors duration-400 hover:bg-ink-2"
                >
                  <span className="label col-span-1" style={{ color: d.accent ?? "#8cc63e" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="display col-span-3 text-[1.2rem] text-bone transition-transform duration-500 group-hover:translate-x-2 md:col-span-5 md:text-[1.7rem]">
                    {d.name}
                  </h3>
                  <p className="col-span-3 text-[0.85rem] text-bone/45 md:col-span-4">{d.tagline}</p>
                  <span className="label col-span-1 text-right text-bone/35 md:col-span-2">
                    {d.product_count_label}
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <CtaSection divisions={divisions} />
    </>
  );
}
