"use client";

import { SectionHeading } from "@/components/ui/Section";
import ProductCard from "@/components/ui/ProductCard";
import MagneticButton from "@/components/motion/MagneticButton";
import type { Product } from "@/types/db";

export default function FeaturedProducts({ products }: { products: Product[] }) {
  return (
    <section className="grain relative bg-bone py-24 md:py-32">
      <div className="container-x">
        <div className="grid-12 items-end gap-y-10">
          <div className="col-span-4 md:col-span-7">
            <SectionHeading
              index="04"
              label="Fast-moving range"
              title="The brands your chemist"
              highlight="reorders."
            />
          </div>

          <div className="col-span-4 md:col-span-4 md:col-start-9 md:pb-3">
            <p className="max-w-[36ch] text-[0.95rem] leading-[1.7] text-ink/60">
              A cross-section of the catalogue — the SKUs partners reorder most in their first six
              months on a territory.
            </p>
            <div className="mt-8">
              <MagneticButton href="/products" variant="outline">
                Full product list
              </MagneticButton>
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-x-5 gap-y-12 md:mt-24 md:grid-cols-4 md:gap-x-6">
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
