import DivisionManager from "@/components/admin/DivisionManager";
import { createClient } from "@/lib/supabase/server";
import type { Division } from "@/types/db";

export const dynamic = "force-dynamic";

export default async function AdminDivisionsPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("divisions").select("*").order("sort_order");

  return <DivisionManager divisions={(data ?? []) as Division[]} />;
}
