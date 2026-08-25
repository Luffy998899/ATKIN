"use client";

import { useActionState, useEffect, useState, useTransition } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { AdminResult } from "@/app/admin/actions";
import { cn } from "@/lib/utils";

export type FieldSpec =
  | { name: string; label: string; type: "text" | "number" | "textarea" | "color"; placeholder?: string; span?: 1 | 2 }
  | { name: string; label: string; type: "select"; options: { value: string; label: string }[]; span?: 1 | 2 }
  | { name: string; label: string; type: "checkbox"; span?: 1 | 2 };

const initial: AdminResult = { ok: false, message: "" };

/**
 * Slide-over record editor shared by the products and divisions screens.
 * `record` null means "create new".
 */
export default function RecordEditor<T extends Record<string, unknown>>({
  title,
  fields,
  record,
  open,
  onClose,
  action,
  onDelete,
}: {
  title: string;
  fields: FieldSpec[];
  record: T | null;
  open: boolean;
  onClose: () => void;
  action: (prev: AdminResult, fd: FormData) => Promise<AdminResult>;
  onDelete?: (id: string) => Promise<AdminResult>;
}) {
  const [state, formAction, pending] = useActionState(action, initial);
  const [deleting, startDelete] = useTransition();

  useEffect(() => {
    if (state.ok && state.message) onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const id = (record?.id as string | undefined) ?? "";

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[80] bg-ink/45"
          />

          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-y-0 right-0 z-[90] w-full max-w-2xl overflow-y-auto border-l border-rule bg-bone"
          >
            <form action={formAction} className="min-h-full p-6 md:p-10">
              <input type="hidden" name="id" value={id} />

              <div className="flex items-start justify-between gap-6 border-b border-ink pb-5">
                <div>
                  <span className="label text-leaf">{id ? "Edit" : "New"}</span>
                  <h2 className="display mt-2 text-[1.8rem] text-ink">{title}</h2>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="label text-ink/45 transition-colors hover:text-ink"
                >
                  Close
                </button>
              </div>

              <div className="mt-8 grid gap-7 md:grid-cols-2">
                {fields.map((f) => (
                  <div key={f.name} className={cn(f.span === 2 && "md:col-span-2")}>
                    <Field field={f} record={record} />
                  </div>
                ))}
              </div>

              {!state.ok && state.message && (
                <p className="label mt-7 border-l-2 border-red-500 pl-3 text-red-600">
                  {state.message}
                </p>
              )}

              <div className="mt-10 flex flex-wrap items-center gap-6 border-t border-rule pt-6">
                <button
                  type="submit"
                  disabled={pending}
                  className="group relative overflow-hidden bg-ink px-8 py-4 label text-bone transition-colors duration-400 hover:text-ink disabled:opacity-50"
                >
                  <span className="absolute inset-0 origin-bottom scale-y-0 bg-leaf transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100" />
                  <span className="relative z-10">{pending ? "Saving…" : "Save"}</span>
                </button>

                {id && onDelete && (
                  <button
                    type="button"
                    disabled={deleting}
                    onClick={() => {
                      if (!confirm("Delete this record permanently?")) return;
                      startDelete(async () => {
                        await onDelete(id);
                        onClose();
                      });
                    }}
                    className="label ml-auto text-red-600 hover:underline disabled:opacity-40"
                  >
                    Delete
                  </button>
                )}
              </div>
            </form>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function Field({
  field,
  record,
}: {
  field: FieldSpec;
  record: Record<string, unknown> | null;
}) {
  const [focused, setFocused] = useState(false);
  const raw = record?.[field.name];
  const value = Array.isArray(raw) ? raw.join(", ") : (raw ?? "");

  const line = (
    <>
      <span className="absolute inset-x-0 bottom-0 block h-px bg-rule" />
      <motion.span
        className="absolute inset-x-0 bottom-0 block h-px origin-left bg-leaf"
        animate={{ scaleX: focused ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      />
    </>
  );

  if (field.type === "checkbox") {
    return (
      <label className="flex items-center gap-3 pt-6">
        <input
          type="checkbox"
          name={field.name}
          defaultChecked={Boolean(raw)}
          className="h-4 w-4 accent-[#2fa84f]"
        />
        <span className="label text-ink/60">{field.label}</span>
      </label>
    );
  }

  return (
    <label className="relative block">
      <span className="label mb-2 block text-ink/45">{field.label}</span>

      {field.type === "textarea" ? (
        <textarea
          name={field.name}
          rows={4}
          defaultValue={String(value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full resize-none bg-transparent pb-3 pt-1 text-[0.92rem] text-ink outline-none"
        />
      ) : field.type === "select" ? (
        <select
          name={field.name}
          defaultValue={String(value)}
          className="w-full appearance-none bg-transparent pb-3 pt-1 text-[0.92rem] text-ink outline-none"
        >
          <option value="" className="bg-bone">
            —
          </option>
          {field.options.map((o) => (
            <option key={o.value} value={o.value} className="bg-bone">
              {o.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={field.type === "number" ? "number" : field.type === "color" ? "text" : "text"}
          step={field.type === "number" ? "any" : undefined}
          name={field.name}
          defaultValue={String(value)}
          placeholder={"placeholder" in field ? field.placeholder : undefined}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full bg-transparent pb-3 pt-1 text-[0.92rem] text-ink outline-none placeholder:text-ink/25"
        />
      )}

      {line}
    </label>
  );
}
