"use client";

import { useState } from "react";
import RecordEditor, { type FieldSpec } from "./RecordEditor";
import { deleteDivision, saveDivision } from "@/app/admin/actions";
import type { Division } from "@/types/db";

const FIELDS: FieldSpec[] = [
  { name: "name", label: "Division name", type: "text", placeholder: "Cardiac & Diabetic" },
  { name: "slug", label: "Slug (auto if blank)", type: "text", placeholder: "cardiac-diabetic" },
  { name: "tagline", label: "Tagline", type: "text", placeholder: "Rhythm you can rely on" },
  { name: "accent", label: "Accent colour (hex)", type: "text", placeholder: "#0c63c4" },
  { name: "product_count_label", label: "SKU label", type: "text", placeholder: "90+ SKUs" },
  { name: "sort_order", label: "Sort order", type: "number" },
  { name: "description", label: "Description", type: "textarea", span: 2 },
  { name: "is_active", label: "Active", type: "checkbox" },
];

export default function DivisionManager({ divisions }: { divisions: Division[] }) {
  const [editing, setEditing] = useState<Division | null>(null);
  const [open, setOpen] = useState(false);

  function edit(d: Division | null) {
    setEditing(d);
    setOpen(true);
  }

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-6 border-b border-rule pb-6">
        <div>
          <span className="label text-leaf">Divisions</span>
          <h1 className="display mt-3 text-[2.2rem] text-ink md:text-[3rem]">
            {divisions.length} therapy divisions
          </h1>
        </div>
        <button
          onClick={() => edit(null)}
          className="group relative overflow-hidden bg-ink px-6 py-3.5 label text-bone transition-colors duration-400 hover:text-ink"
        >
          <span className="absolute inset-0 origin-bottom scale-y-0 bg-leaf transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100" />
          <span className="relative z-10">New division</span>
        </button>
      </div>

      <div className="mt-8 border-t border-rule">
        {divisions.map((d, i) => (
          <button
            key={d.id}
            onClick={() => edit(d)}
            className="group flex w-full items-baseline gap-5 border-b border-rule py-6 text-left transition-colors hover:bg-bone-2"
          >
            <span className="label shrink-0" style={{ color: d.accent ?? "#2fa84f" }}>
              {String(i + 1).padStart(2, "0")}
            </span>

            <span
              className="mt-1 h-3 w-3 shrink-0"
              style={{ background: d.accent ?? "#2fa84f" }}
              aria-hidden
            />

            <span className="min-w-0 flex-1">
              <span className="display block text-[1.3rem] text-ink md:text-[1.7rem]">{d.name}</span>
              <span className="mt-1 block text-[0.85rem] text-ink/50">{d.tagline}</span>
            </span>

            <span className="label hidden shrink-0 text-ink/40 sm:block">
              {d.product_count_label}
            </span>
            <span className="label shrink-0">
              <span className={d.is_active ? "text-leaf" : "text-ink/35"}>
                {d.is_active ? "live" : "hidden"}
              </span>
            </span>
          </button>
        ))}

        {divisions.length === 0 && (
          <p className="py-16 text-center text-[0.9rem] text-ink/50">
            No divisions yet. Run supabase/schema.sql then seed.sql, or create one here.
          </p>
        )}
      </div>

      <RecordEditor
        title={editing ? editing.name : "New division"}
        fields={FIELDS}
        record={editing as unknown as Record<string, unknown> | null}
        open={open}
        onClose={() => setOpen(false)}
        action={saveDivision}
        onDelete={deleteDivision}
      />
    </div>
  );
}
