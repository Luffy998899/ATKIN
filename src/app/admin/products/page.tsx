import ProductManager from "@/components/admin/ProductManager";
import { createClient } from "@/lib/supabase/server";
import type { Division, Product } from "@/types/db";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const supabase = await createClient();

  const [{ data: products }, { data: divisions }] = await Promise.all([
    supabase.from("products").select("*").order("sort_order"),
    supabase.from("divisions").select("*").order("sort_order"),
  ]);

  return (
    <ProductManager
      products={(products ?? []) as Product[]}
      divisions={(divisions ?? []) as Division[]}
    />
  );
}
