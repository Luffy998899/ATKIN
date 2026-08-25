"use client";

import { Fragment, useMemo, useState, useTransition } from "react";
import { AnimatePresence, motion } from "motion/react";
import { deleteEnquiry, setEnquiryStatus } from "@/app/admin/actions";
import type { Enquiry, EnquiryStatus } from "@/types/db";
import { cn, formatDate } from "@/lib/utils";

const STATUSES: EnquiryStatus[] = ["new", "contacted", "qualified", "closed", "spam"];

export default function EnquiryTable({ enquiries }: { enquiries: Enquiry[] }) {
  const [status, setStatus] = useState<EnquiryStatus | "all">("all");
  const [kind, setKind] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return enquiries.filter((e) => {
      if (status !== "all" && e.status !== status) return false;
      if (kind !== "all" && e.kind !== kind) return false;
      if (!q) return true;
      return [e.full_name, e.phone, e.email, e.city, e.state, e.company, e.message]
        .filter(Boolean)
        .some((v) => (v as string).toLowerCase().includes(q));
    });
  }, [enquiries, status, kind, query]);

  return (
    <div>
      {/* filters */}
      <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4 border-b border-rule pb-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search name, phone, city…"
          className="min-w-56 flex-1 bg-transparent text-[0.9rem] text-ink outline-none placeholder:text-ink/30"
        />

        <div className="flex flex-wrap gap-x-5 gap-y-2">
          <Chip active={status === "all"} onClick={() => setStatus("all")}>
            All
          </Chip>
          {STATUSES.map((s) => (
            <Chip key={s} active={status === s} onClick={() => setStatus(s)}>
              {s}
            </Chip>
          ))}
        </div>

        <div className="flex gap-x-5">
          {["all", "franchise", "contact", "product"].map((k) => (
            <Chip key={k} active={kind === k} onClick={() => setKind(k)} muted>
              {k}
            </Chip>
          ))}
        </div>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[52rem] border-collapse">
          <thead>
            <tr className="border-b border-ink">
              {["Received", "Name", "Phone", "Territory", "Kind", "Status", ""].map((h, i) => (
                <th key={i} className="label px-3 py-3 text-left text-ink/45">
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.map((e) => {
              const open = openId === e.id;
              return (
                <Fragment key={e.id}>
                  <tr
                    onClick={() => setOpenId(open ? null : e.id)}
                    className={cn(
                      "cursor-pointer border-b border-rule transition-colors hover:bg-bone-2",
                      open && "bg-bone-2",
                    )}
                  >
                    <td className="num px-3 py-4 text-[0.78rem] text-ink/55">
                      {formatDate(e.created_at)}
                    </td>
                    <td className="px-3 py-4 text-[0.9rem] text-ink">{e.full_name}</td>
                    <td className="num px-3 py-4 text-[0.85rem] text-ink/70">
                      <a href={`tel:${e.phone}`} onClick={(ev) => ev.stopPropagation()} className="link-draw">
                        {e.phone}
                      </a>
                    </td>
                    <td className="px-3 py-4 text-[0.85rem] text-ink/60">
                      {[e.city, e.state].filter(Boolean).join(", ") || "—"}
                    </td>
                    <td className="label px-3 py-4 text-ink/50">{e.kind}</td>
                    <td className="px-3 py-4">
                      <span className={cn("label", e.status === "new" ? "text-leaf" : "text-ink/45")}>
                        {e.status}
                      </span>
                    </td>
                    <td className="label px-3 py-4 text-right text-ink/35">{open ? "−" : "+"}</td>
                  </tr>

                  <AnimatePresence>
                    {open && (
                      <tr>
                        <td colSpan={7} className="p-0">
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden border-b border-rule bg-bone-2"
                          >
                            <div className="grid gap-8 px-3 py-7 md:grid-cols-3">
                              <dl className="space-y-3">
                                <Detail label="Email" value={e.email} />
                                <Detail label="Firm" value={e.company} />
                                <Detail label="Division" value={e.division} />
                                <Detail label="Experience" value={e.experience} />
                                <Detail label="Product" value={e.product_name} />
                                <Detail label="Source" value={e.source_path} />
                              </dl>

                              <div className="md:col-span-2">
                                <span className="label text-ink/40">Message</span>
                                <p className="mt-2 max-w-[70ch] whitespace-pre-wrap text-[0.9rem] leading-[1.75] text-ink/75">
                                  {e.message || "—"}
                                </p>

                                <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-rule pt-4">
                                  {STATUSES.map((s) => (
                                    <button
                                      key={s}
                                      disabled={pending || e.status === s}
                                      onClick={() =>
                                        startTransition(() => {
                                          void setEnquiryStatus(e.id, s);
                                        })
                                      }
                                      className={cn(
                                        "label transition-colors disabled:opacity-35",
                                        e.status === s ? "text-leaf" : "text-ink/50 hover:text-ink",
                                      )}
                                    >
                                      {s}
                                    </button>
                                  ))}

                                  <button
                                    disabled={pending}
                                    onClick={() => {
                                      if (!confirm(`Delete the enquiry from ${e.full_name}?`)) return;
                                      startTransition(() => {
                                        void deleteEnquiry(e.id);
                                      });
                                    }}
                                    className="label ml-auto text-red-600 hover:underline disabled:opacity-35"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        </td>
                      </tr>
                    )}
                  </AnimatePresence>
                </Fragment>
              );
            })}

            {rows.length === 0 && (
              <tr>
                <td colSpan={7} className="px-3 py-16 text-center text-[0.9rem] text-ink/50">
                  Nothing matches those filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string | null }) {
  return (
    <div>
      <dt className="label text-ink/40">{label}</dt>
      <dd className="mt-0.5 text-[0.85rem] text-ink/75">{value || "—"}</dd>
    </div>
  );
}

function Chip({
  children,
  active,
  onClick,
  muted,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
  muted?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "label relative pb-1 transition-colors",
        active ? "text-ink" : muted ? "text-ink/30 hover:text-ink/60" : "text-ink/45 hover:text-ink",
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
