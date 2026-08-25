import { createClient } from "@/lib/supabase/server";
import EnquiryTable from "@/components/admin/EnquiryTable";
import type { Enquiry } from "@/types/db";

export const dynamic = "force-dynamic";

export default async function AdminEnquiriesPage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("enquiries")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(500);

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-6 border-b border-rule pb-6">
        <div>
          <span className="label text-leaf">Enquiries</span>
          <h1 className="display mt-3 text-[2.2rem] text-ink md:text-[3rem]">
            {(data ?? []).length} on file
          </h1>
        </div>
      </div>

      {error ? (
        <p className="mt-10 border-l-2 border-red-500 pl-4 text-[0.9rem] text-red-600">
          {error.message}
        </p>
      ) : (
        <EnquiryTable enquiries={(data ?? []) as Enquiry[]} />
      )}
    </div>
  );
}
