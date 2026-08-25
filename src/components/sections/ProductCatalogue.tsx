"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import ProductCard from "@/components/ui/ProductCard";
import type { Division, Product } from "@/types/db";
import { cn } from "@/lib/utils";

type Sort = "featured" | "name" | "price-asc" | "price-desc";

export default function ProductCatalogue({
  products,
  divisions,
}: {
  products: Product[];
  divisions: Division[];
}) {
  const [query, setQuery] = useState("");
  const [division, setDivision] = useState<string | null>(null);
  const [form, setForm] = useState<string | null>(null);
  const [sort, setSort] = useState<Sort>("featured");

  const forms = useMemo(
    () => [...new Set(products.map((p) => p.form).filter(Boolean))] as string[],
    [products],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    const out = products.filter((p) => {
      if (division && p.division_id !== division) return false;
      if (form && p.form !== form) return false;
      if (!q) return true;
      return [p.name, p.composition, p.category, p.divisions?.name, p.packing]
        .filter(Boolean)
        .some((v) => (v as string).toLowerCase().includes(q));
    });

    const sorted = [...out];
    switch (sort) {
      case "name":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "price-asc":
        sorted.sort((a, b) => (a.mrp ?? Infinity) - (b.mrp ?? Infinity));
        break;
      case "price-desc":
        sorted.sort((a, b) => (b.mrp ?? -Infinity) - (a.mrp ?? -Infinity));
        break;
      default:
        sorted.sort(
          (a, b) => Number(b.is_featured) - Number(a.is_featured) || a.sort_order - b.sort_order,
        );
    }
    return sorted;
  }, [products, query, division, form, sort]);

  const active = Boolean(query || division || form || sort !== "featured");

  function reset() {
    setQuery("");
    setDivision(null);
    setForm(null);
    setSort("featured");
  }

  return (
    <div className="container-x">
      {/* filter bar — a printed index header, not a floating card */}
      <div className="sticky top-[72px] z-30 -mx-5 bg-bone/95 px-5 backdrop-blur-[2px] md:-mx-9 md:px-9">
        <div className="grid-12 items-center gap-y-4 border-y border-rule py-4">
          <label className="col-span-4 md:col-span-5">
            <span className="sr-only">Search products</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search a brand, salt or packing…"
              className="w-full bg-transparent text-[0.95rem] text-ink outline-none placeholder:text-ink/30"
            />
          </label>

          <div className="col-span-2 md:col-span-3 md:col-start-7">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="label w-full appearance-none bg-transparent text-ink/60 outline-none"
            >
              <option value="featured" className="bg-bone">Featured first</option>
              <option value="name" className="bg-bone">Name A–Z</option>
              <option value="price-asc" className="bg-bone">MRP ↑</option>
              <option value="price-desc" className="bg-bone">MRP ↓</option>
            </select>
          </div>

          <div className="col-span-2 flex items-baseline justify-end gap-5 md:col-span-2 md:col-start-11">
            <span className="num text-[0.8rem] text-ink/45">
              {String(filtered.length).padStart(2, "0")}
            </span>
            {active && (
              <button onClick={reset} className="label link-draw text-leaf">
                Reset
              </button>
            )}
          </div>
        </div>

        {/* division row */}
        <div className="flex gap-x-6 gap-y-2 overflow-x-auto border-b border-rule py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <Chip active={division === null} onClick={() => setDivision(null)}>
            All
          </Chip>
          {divisions.map((d) => (
            <Chip
              key={d.id}
              active={division === d.id}
              accent={d.accent ?? undefined}
              onClick={() => setDivision(division === d.id ? null : d.id)}
            >
              {d.name}
            </Chip>
          ))}
        </div>

        {/* form row */}
        <div className="flex gap-x-6 overflow-x-auto border-b border-rule py-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {forms.map((f) => (
            <Chip key={f} active={form === f} onClick={() => setForm(form === f ? null : f)}>
              {f}
            </Chip>
          ))}
        </div>
      </div>

      {/* grid */}
      <motion.div
        layout
        className="mt-14 grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3 md:gap-x-6 xl:grid-cols-4"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((p, i) => (
            <motion.div
              key={p.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ProductCard product={p} index={i} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-14 border-t border-rule py-20 text-center"
        >
          <p className="display text-[2rem] text-ink">Nothing matches that.</p>
          <p className="mx-auto mt-4 max-w-[46ch] text-[0.92rem] leading-[1.7] text-ink/55">
            The site shows a cross-section of the catalogue. If you are looking for a specific salt
            or brand, send an enquiry — the full division-wise list runs past 500 SKUs.
          </p>
          <button onClick={reset} className="label link-draw mt-8 text-leaf">
            Clear filters
          </button>
        </motion.div>
      )}
    </div>
  );
}

function Chip({
  children,
  active,
  onClick,
  accent,
}: {
  children: React.ReactNode;
  active?: boolean;
  onClick: () => void;
  accent?: string;
}) {
  return (
    <button
      onClick={onClick}
      data-cursor="hover"
      className={cn(
        "label relative shrink-0 whitespace-nowrap pb-1 transition-colors duration-300",
        active ? "text-ink" : "text-ink/40 hover:text-ink/75",
      )}
    >
      {children}
      <span
        className={cn(
          "absolute inset-x-0 bottom-0 h-px origin-left transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]",
          active ? "scale-x-100" : "scale-x-0",
        )}
        style={{ background: accent ?? "#0b0e0d" }}
      />
    </button>
  );
}
