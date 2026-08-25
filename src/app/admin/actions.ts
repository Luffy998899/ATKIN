"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { EnquiryStatus } from "@/types/db";

export type AdminResult = { ok: boolean; message: string };

/** Every mutation goes through the cookie-bound client, so RLS decides. */
async function db() {
  return createClient();
}

function str(fd: FormData, key: string, max = 500) {
  const v = fd.get(key);
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

function num(fd: FormData, key: string) {
  const v = str(fd, key, 20);
  if (!v) return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

function slugify(v: string) {
  return v
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

/* ------------------------------- auth ------------------------------- */

export async function signOut() {
  const supabase = await db();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

/* ----------------------------- enquiries ---------------------------- */

export async function setEnquiryStatus(id: string, status: EnquiryStatus): Promise<AdminResult> {
  const supabase = await db();
  const { error } = await supabase.from("enquiries").update({ status }).eq("id", id);

  if (error) return { ok: false, message: error.message };
  revalidatePath("/admin");
  revalidatePath("/admin/enquiries");
  return { ok: true, message: `Marked ${status}` };
}

export async function deleteEnquiry(id: string): Promise<AdminResult> {
  const supabase = await db();
  const { error } = await supabase.from("enquiries").delete().eq("id", id);

  if (error) return { ok: false, message: error.message };
  revalidatePath("/admin/enquiries");
  return { ok: true, message: "Deleted" };
}

/* ------------------------------ products ---------------------------- */

export async function saveProduct(_prev: AdminResult, fd: FormData): Promise<AdminResult> {
  const supabase = await db();

  const id = str(fd, "id", 40);
  const name = str(fd, "name", 140);
  if (!name) return { ok: false, message: "Name is required." };

  const row = {
    name,
    slug: str(fd, "slug", 60) || slugify(name),
    division_id: str(fd, "division_id", 40) || null,
    composition: str(fd, "composition", 300) || null,
    form: str(fd, "form", 40) || "Tablet",
    packing: str(fd, "packing", 80) || null,
    category: str(fd, "category", 80) || null,
    description: str(fd, "description", 1200) || null,
    indications: str(fd, "indications", 400)
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
    mrp: num(fd, "mrp"),
    is_featured: fd.get("is_featured") === "on",
    is_active: fd.get("is_active") === "on",
    sort_order: num(fd, "sort_order") ?? 0,
  };

  const { error } = id
    ? await supabase.from("products").update(row).eq("id", id)
    : await supabase.from("products").insert(row);

  if (error) return { ok: false, message: error.message };

  revalidatePath("/admin/products");
  revalidatePath("/products");
  return { ok: true, message: id ? "Product updated." : "Product created." };
}

export async function deleteProduct(id: string): Promise<AdminResult> {
  const supabase = await db();
  const { error } = await supabase.from("products").delete().eq("id", id);

  if (error) return { ok: false, message: error.message };
  revalidatePath("/admin/products");
  revalidatePath("/products");
  return { ok: true, message: "Deleted" };
}

/* ----------------------------- divisions ---------------------------- */

export async function saveDivision(_prev: AdminResult, fd: FormData): Promise<AdminResult> {
  const supabase = await db();

  const id = str(fd, "id", 40);
  const name = str(fd, "name", 120);
  if (!name) return { ok: false, message: "Name is required." };

  const row = {
    name,
    slug: str(fd, "slug", 60) || slugify(name),
    tagline: str(fd, "tagline", 120) || null,
    description: str(fd, "description", 1000) || null,
    accent: str(fd, "accent", 20) || "#0c63c4",
    product_count_label: str(fd, "product_count_label", 40) || null,
    sort_order: num(fd, "sort_order") ?? 0,
    is_active: fd.get("is_active") === "on",
  };

  const { error } = id
    ? await supabase.from("divisions").update(row).eq("id", id)
    : await supabase.from("divisions").insert(row);

  if (error) return { ok: false, message: error.message };

  revalidatePath("/admin/divisions");
  revalidatePath("/divisions");
  return { ok: true, message: id ? "Division updated." : "Division created." };
}

export async function deleteDivision(id: string): Promise<AdminResult> {
  const supabase = await db();
  const { error } = await supabase.from("divisions").delete().eq("id", id);

  if (error) return { ok: false, message: error.message };
  revalidatePath("/admin/divisions");
  revalidatePath("/divisions");
  return { ok: true, message: "Deleted" };
}
