import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { Enquiry } from "@/types/db";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

const STATUSES = ["new", "contacted", "qualified", "closed", "spam"] as const;

export default async function AdminOverview() {
  const supabase = await createClient();

  const [{ data: enquiries }, { count: products }, { count: divisions }] = await Promise.all([
    supabase.from("enquiries").select("*").order("created_at", { ascending: false }).limit(400),
    supabase.from("products").select("id", { count: "exact", head: true }),
    supabase.from("divisions").select("id", { count: "exact", head: true }),
  ]);

  const rows = (enquiries ?? []) as Enquiry[];
  const byStatus = Object.fromEntries(
    STATUSES.map((s) => [s, rows.filter((r) => r.status === s).length]),
  ) as Record<(typeof STATUSES)[number], number>;

  // Server component: reading the clock here is intentional, not a render impurity.
  // eslint-disable-next-line react-hooks/purity
  const weekAgo = Date.now() - 7 * 864e5;
  const week = rows.filter((r) => Date.parse(r.created_at) > weekAgo).length;

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-6 border-b border-rule pb-6">
        <div>
          <span className="label text-leaf">Overview</span>
          <h1 className="display mt-3 text-[2.2rem] text-ink md:text-[3rem]">Enquiry desk</h1>
        </div>
        <Link
          href="/admin/enquiries"
          className="label border border-ink px-5 py-3 text-ink transition-colors hover:bg-ink hover:text-bone"
        >
          All enquiries
        </Link>
      </div>

      {/* counters */}
      <div className="mt-10 grid grid-cols-2 border-t border-rule md:grid-cols-4">
        <Stat label="New" value={byStatus.new} accent />
        <Stat label="Last 7 days" value={week} />
        <Stat label="Products" value={products ?? 0} />
        <Stat label="Divisions" value={divisions ?? 0} />
      </div>

      <div className="mt-4 grid grid-cols-2 border-t border-rule md:grid-cols-4">
        <Stat label="Contacted" value={byStatus.contacted} small />
        <Stat label="Qualified" value={byStatus.qualified} small />
        <Stat label="Closed" value={byStatus.closed} small />
        <Stat label="Spam" value={byStatus.spam} small />
      </div>

      {/* recent */}
      <h2 className="label mt-16 border-t border-rule pt-4 text-ink/45">Latest ten</h2>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[46rem] border-collapse">
          <thead>
            <tr className="border-b border-ink">
              {["Received", "Name", "Phone", "Territory", "Kind", "Status"].map((h) => (
                <th key={h} className="label px-3 py-3 text-left text-ink/45">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.slice(0, 10).map((e) => (
              <tr key={e.id} className="border-b border-rule transition-colors hover:bg-bone-2">
                <td className="num px-3 py-4 text-[0.8rem] text-ink/60">
                  {formatDate(e.created_at)}
                </td>
                <td className="px-3 py-4 text-[0.9rem] text-ink">{e.full_name}</td>
                <td className="num px-3 py-4 text-[0.85rem] text-ink/70">{e.phone}</td>
                <td className="px-3 py-4 text-[0.85rem] text-ink/60">
                  {[e.city, e.state].filter(Boolean).join(", ") || "—"}
                </td>
                <td className="label px-3 py-4 text-ink/50">{e.kind}</td>
                <td className="px-3 py-4">
                  <span
                    className={`label ${e.status === "new" ? "text-leaf" : "text-ink/45"}`}
                  >
                    {e.status}
                  </span>
                </td>
              </tr>
            ))}

            {rows.length === 0 && (
              <tr>
                <td colSpan={6} className="px-3 py-14 text-center text-[0.9rem] text-ink/50">
                  No enquiries yet. Once schema.sql and seed.sql have been run, submissions from the
                  site land here.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  accent,
  small,
}: {
  label: string;
  value: number;
  accent?: boolean;
  small?: boolean;
}) {
  return (
    <div className="border-b border-rule px-1 py-6 md:border-b-0 md:border-l md:border-rule md:px-6 md:first:border-l-0 md:first:pl-0">
      <div
        className={`num display leading-none ${small ? "text-[1.6rem]" : "text-[2.4rem]"} ${
          accent ? "text-leaf" : "text-ink"
        }`}
      >
        {value}
      </div>
      <div className="label mt-2.5 text-ink/45">{label}</div>
    </div>
  );
}
