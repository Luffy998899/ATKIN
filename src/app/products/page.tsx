import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import ProductCatalogue from "@/components/sections/ProductCatalogue";
import CtaSection from "@/components/sections/CtaSection";
import { getDivisions, getProducts } from "@/lib/queries";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Product List",
  description:
    "Browse the ATIN Healthcare PCD pharma product list — tablets, capsules, syrups, gels, sachets and injectables across eight therapy divisions, with composition and packing.",
};

export default async function ProductsPage() {
  const [products, divisions] = await Promise.all([getProducts(), getDivisions()]);

  return (
    <>
      <PageHero
        label="Product list"
        title="Every brand, with the salt"
        highlight="printed on it."
        lead="Search by brand, composition or packing. Net rates and the complete division-wise list are shared with your monopoly agreement."
        crumbs={[{ label: "Products" }]}
        image="/media/warehouse.webp"
        imageAlt="Pharmaceutical distribution warehouse stacked with medicine cartons"
        caption="Dispatch, 24–72 hrs"
      />

      <Section className="pt-14 md:pt-16">
        <ProductCatalogue products={products} divisions={divisions} />
      </Section>

      <CtaSection divisions={divisions} />
    </>
  );
}
