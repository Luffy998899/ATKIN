"use client";

import { useMemo, useState } from "react";
import RecordEditor, { type FieldSpec } from "./RecordEditor";
import { deleteProduct, saveProduct } from "@/app/admin/actions";
import type { Division, Product } from "@/types/db";
import { cn, inr } from "@/lib/utils";

const FORMS = ["Tablet", "Capsule", "Syrup", "Injection", "Sachet", "Gel", "Drops"];

export default function ProductManager({
  products,
  divisions,
}: {
  products: Product[];
  divisions: Division[];
}) {
  const [editing, setEditing] = useState<Product | null>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [divisionId, setDivisionId] = useState<string | null>(null);

  const fields: FieldSpec[] = useMemo(
    () => [
      { name: "name", label: "Brand name", type: "text", placeholder: "ATCARD-TM" },
      { name: "slug", label: "Slug (auto if blank)", type: "text", placeholder: "atcard-tm" },
      {
        name: "division_id",
        label: "Division",
        type: "select",
        options: divisions.map((d) => ({ value: d.id, label: d.name })),
      },
      { name: "form", label: "Dosage form", type: "select", options: FORMS.map((f) => ({ value: f, label: f })) },
      { name: "composition", label: "Composition", type: "textarea", span: 2 },
      { name: "packing", label: "Packing", type: "text", placeholder: "10x10 Alu-Alu" },
      { name: "category", label: "Category", type: "text", placeholder: "Anti-hypertensive" },
      { name: "mrp", label: "MRP (₹)", type: "number" },
      { name: "sort_order", label: "Sort order", type: "number" },
      { name: "indications", label: "Indications (comma separated)", type: "textarea", span: 2 },
      { name: "description", label: "Description", type: "textarea", span: 2 },
      { name: "is_featured", label: "Featured", type: "checkbox" },
      { name: "is_active", label: "Active", type: "checkbox" },
    ],
    [divisions],
  );

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      if (divisionId && p.division_id !== divisionId) return false;
      if (!q) return true;
      return [p.name, p.composition, p.category].filter(Boolean).some((v) =>
        (v as string).toLowerCase().includes(q),
      );
    });
  }, [products, query, divisionId]);

  function edit(p: Product | null) {
    setEditing(p);
    setOpen(true);
  }

  const divName = (id: string | null) => divisions.find((d) => d.id === id)?.name ?? "—";

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-6 border-b border-rule pb-6">
        <div>
          <span className="label text-leaf">Products</span>
          <h1 className="display mt-3 text-[2.2rem] text-ink md:text-[3rem]">
            {products.length} brands
          </h1>
        </div>
        <button
          onClick={() => edit(null)}
          className="group relative overflow-hidden bg-ink px-6 py-3.5 label text-bone transition-colors duration-400 hover:text-ink"
        >
          <span className="absolute inset-0 origin-bottom scale-y-0 bg-leaf transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100" />
          <span className="relative z-10">New product</span>
        </button>
      </div>

      {/* filters */}
      <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 border-b border-rule pb-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search brand, salt, category…"
          className="min-w-56 flex-1 bg-transparent text-[0.9rem] text-ink outline-none placeholder:text-ink/30"
        />
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          <Chip active={divisionId === null} onClick={() => setDivisionId(null)}>
            All
          </Chip>
          {divisions.map((d) => (
            <Chip
              key={d.id}
              active={divisionId === d.id}
              onClick={() => setDivisionId(divisionId === d.id ? null : d.id)}
            >
              {d.name}
            </Chip>
          ))}
        </div>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[52rem] border-collapse">
          <thead>
            <tr className="border-b border-ink">
              {["Brand", "Composition", "Division", "Form", "Packing", "MRP", "State"].map((h) => (
                <th key={h} className="label px-3 py-3 text-left text-ink/45">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((p) => (
              <tr
                key={p.id}
                onClick={() => edit(p)}
                className="cursor-pointer border-b border-rule transition-colors hover:bg-bone-2"
              >
                <td className="px-3 py-4 text-[0.9rem] text-ink">{p.name}</td>
                <td className="max-w-[22rem] px-3 py-4 text-[0.82rem] text-ink/60">
                  {p.composition}
                </td>
                <td className="px-3 py-4 text-[0.82rem] text-ink/60">{divName(p.division_id)}</td>
                <td className="label px-3 py-4 text-ink/50">{p.form}</td>
                <td className="num px-3 py-4 text-[0.8rem] text-ink/55">{p.packing}</td>
                <td className="num px-3 py-4 text-[0.85rem] text-ink">{inr(p.mrp)}</td>
                <td className="label px-3 py-4">
                  <span className={p.is_active ? "text-leaf" : "text-ink/35"}>
                    {p.is_active ? "live" : "hidden"}
                  </span>
                  {p.is_featured && <span className="ml-2 text-ink/40">★</span>}
                </td>
              </tr>
            ))}

            {rows.length === 0 && (
              <tr>
                <td colSpan={7} className="px-3 py-16 text-center text-[0.9rem] text-ink/50">
                  No products match. Run supabase/seed.sql to load the starter catalogue.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <RecordEditor
        title={editing ? editing.name : "New product"}
        fields={fields}
        record={editing as unknown as Record<string, unknown> | null}
        open={open}
        onClose={() => setOpen(false)}
        action={saveProduct}
        onDelete={deleteProduct}
      />
    </div>
  );
}

function Chip({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "label relative pb-1 transition-colors",
        active ? "text-ink" : "text-ink/40 hover:text-ink/70",
      )}
    >
      {children}
      <span
        className={cn(
          "absolute inset-x-0 bottom-0 h-px origin-left bg-leaf transition-transform duration-300",
          active ? "scale-x-100" : "scale-x-0",
        )}
      />
    </button>
  );
}
