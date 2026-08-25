import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/layout/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import PackVisual from "@/components/ui/PackVisual";
import ProductCard from "@/components/ui/ProductCard";
import EnquiryForm from "@/components/forms/EnquiryForm";
import { Reveal } from "@/components/motion/Reveal";
import { getProduct, getProducts } from "@/lib/queries";
import { site } from "@/lib/site";

export const revalidate = 300;

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return { title: "Product not found" };

  return {
    title: `${product.name} — ${product.composition ?? product.form}`,
    description:
      product.description ??
      `${product.name} (${product.composition}) from ATIN Healthcare, available for PCD franchise.`,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const all = await getProducts();
  const accent = product.divisions?.accent ?? "#0c63c4";

  const related = all
    .filter((p) => p.division_id === product.division_id && p.id !== product.id)
    .slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description ?? product.composition,
    category: product.category,
    brand: { "@type": "Brand", name: site.legalName },
    // Net rates are quoted per territory, so no price is published.
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        label={product.category ?? product.divisions?.name ?? "Product"}
        title={product.name}
        lead={product.composition ?? undefined}
        crumbs={[
          { label: "Products", href: "/products" },
          ...(product.divisions
            ? [{ label: product.divisions.name, href: `/divisions/${product.divisions.slug}` }]
            : []),
          { label: product.name },
        ]}
      />

      <Section flush className="grain bg-bone pb-24 md:pb-32">
        <div className="container-x">
          <div className="grid-12 gap-y-14">
            {/* pack + copy */}
            <div className="col-span-4 md:col-span-7">
              <Reveal>
                <div className="relative overflow-hidden" style={{ background: accent }}>
                  <PackVisual
                    form={product.form}
                    accent="#f1efe9"
                    name={product.slug}
                    className="aspect-16/10"
                  />
                  <span className="label absolute left-5 top-5 text-bone/70">{product.form}</span>
                  <span className="label absolute right-5 top-5 text-bone/70">
                    {product.divisions?.name}
                  </span>
                </div>
              </Reveal>

              {/* spec table */}
              <Reveal delay={0.1}>
                <dl className="mt-10 border-t border-rule">
                  <SpecRow label="Composition" value={product.composition ?? "—"} />
                  <SpecRow label="Dosage form" value={product.form ?? "—"} />
                  <SpecRow label="Packing" value={product.packing ?? "—"} />
                  <SpecRow label="Pricing" value="Net rates shared on enquiry" />
                  {product.indications && product.indications.length > 0 && (
                    <SpecRow label="Indicated in" value={product.indications.join(" · ")} />
                  )}
                </dl>
              </Reveal>

              {product.description && (
                <Reveal delay={0.16}>
                  <div className="mt-12 border-t border-rule pt-8">
                    <h2 className="label text-leaf">About this brand</h2>
                    <p className="mt-5 max-w-[60ch] text-[1rem] leading-[1.8] text-ink/70">
                      {product.description}
                    </p>
                  </div>
                </Reveal>
              )}

              <Reveal delay={0.22}>
                <p className="label mt-12 max-w-[70ch] border-t border-rule pt-5 leading-[1.9] text-ink/35">
                  For the use of a registered medical practitioner, hospital or laboratory only. The
                  information above is intended for trade partners and prescribers, not as medical
                  advice to patients.
                </p>
              </Reveal>
            </div>

            {/* enquiry */}
            <div className="col-span-4 md:col-span-4 md:col-start-9">
              <div className="md:sticky md:top-[calc(var(--nav-h)+2rem)]">
                <Reveal delay={0.1}>
                  <div className="border-t border-ink pt-6">
                    <h2 className="display text-[1.5rem] text-ink">Get a quote</h2>
                    <p className="mt-3 max-w-[34ch] text-[0.88rem] leading-[1.7] text-ink/55">
                      Net rate, minimum order and territory availability — back to you within one
                      working day. Prices are quoted per territory, not published.
                    </p>

                    <div className="mt-8">
                      <EnquiryForm kind="product" productName={product.name} compact />
                    </div>
                  </div>
                </Reveal>

                {product.divisions && (
                  <Reveal delay={0.18}>
                    <Link
                      href={`/divisions/${product.divisions.slug}`}
                      data-cursor="hover"
                      className="group mt-10 flex items-baseline justify-between gap-4 border-t border-rule pt-5"
                    >
                      <span>
                        <span className="label block text-ink/40">Part of</span>
                        <span className="display mt-2 block text-[1.15rem] text-ink transition-colors group-hover:text-leaf">
                          {product.divisions.name}
                        </span>
                      </span>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 15 15"
                        fill="none"
                        className="text-leaf transition-transform duration-400 group-hover:translate-x-1 group-hover:-translate-y-1"
                        aria-hidden
                      >
                        <path d="M1 14L14 1M14 1H4M14 1v10" stroke="currentColor" strokeWidth="1.2" />
                      </svg>
                    </Link>
                  </Reveal>
                )}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {related.length > 0 && (
        <Section className="bg-bone-2">
          <div className="container-x">
            <SectionHeading index="02" label="Same bag" title="Detail these" highlight="together." />

            <div className="mt-16 grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-4 md:gap-x-6">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} accent={accent} />
              ))}
            </div>
          </div>
        </Section>
      )}
    </>
  );
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid-12 items-baseline gap-y-1 border-b border-rule py-4">
      <dt className="label col-span-4 text-ink/40 md:col-span-3">{label}</dt>
      <dd className="col-span-4 text-[0.95rem] leading-[1.6] text-ink md:col-span-9">{value}</dd>
    </div>
  );
}
