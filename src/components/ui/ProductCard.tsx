"use client";

import Link from "next/link";
import { motion } from "motion/react";
import PackVisual from "./PackVisual";
import type { Product } from "@/types/db";
import { cn } from "@/lib/utils";

/**
 * Catalogue entry, set like a printed index card: square corners, hairline
 * rules, mono data. The pack panel inverts to ink on hover.
 */
export default function ProductCard({
  product,
  index = 0,
  accent,
  dark = false,
  className,
}: {
  product: Product;
  index?: number;
  accent?: string;
  dark?: boolean;
  className?: string;
}) {
  const tint = accent ?? product.divisions?.accent ?? "#0c63c4";

  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65, delay: (index % 4) * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      <Link
        href={`/products/${product.slug}`}
        data-cursor="hover"
        data-cursor-label="Open"
        className={cn(
          "group flex h-full flex-col border-t pt-4",
          dark ? "border-rule-dark" : "border-rule",
        )}
      >
        {/* pack panel */}
        <div className={cn("relative overflow-hidden", dark ? "bg-ink-2" : "bg-bone-2")}>
          <span
            className="absolute inset-0 origin-bottom scale-y-0 transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100"
            style={{ background: tint }}
          />
          <div className="relative">
            <PackVisual form={product.form} accent={tint} name={product.slug} />
          </div>

          <span
            className={cn(
              "label absolute left-3 top-3 transition-colors duration-400",
              dark ? "text-bone/45" : "text-ink/40",
              "group-hover:text-bone/70",
            )}
          >
            {product.form}
          </span>

          {product.is_featured && (
            <span className="label absolute right-3 top-3 text-leaf transition-colors duration-400 group-hover:text-bone">
              ●
            </span>
          )}
        </div>

        {/* text */}
        <div className="flex flex-1 flex-col pt-4">
          <span className={cn("label", dark ? "text-bone/40" : "text-ink/40")}>
            {product.category ?? product.divisions?.name}
          </span>

          <h3
            className={cn(
              "display mt-2 text-[1.35rem] leading-[1.05] transition-colors duration-300",
              dark ? "text-bone group-hover:text-lime" : "text-ink group-hover:text-leaf",
            )}
          >
            {product.name}
          </h3>

          <p
            className={cn(
              "mt-2 line-clamp-2 text-[0.82rem] leading-[1.5]",
              dark ? "text-bone/45" : "text-ink/50",
            )}
          >
            {product.composition}
          </p>

          <div
            className={cn(
              "num mt-auto flex items-baseline justify-between gap-3 border-t pt-3 text-[0.72rem]",
              dark ? "border-rule-dark text-bone/45" : "border-rule text-ink/45",
            )}
          >
            <span>{product.packing}</span>
            <span
              className={cn(
                "label transition-colors",
                dark ? "text-lime" : "text-leaf",
              )}
            >
              Get a quote
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
