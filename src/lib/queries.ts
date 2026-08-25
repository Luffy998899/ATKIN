import { createClient } from "@supabase/supabase-js";
import type {
  Certification, Division, Product, Stat, Testimonial,
} from "@/types/db";
import {
  fallbackCertifications, fallbackDivisions,
  fallbackProducts, fallbackStats, fallbackTestimonials,
} from "@/lib/data/fallback";

/**
 * Anonymous read-only client. Public tables are exposed through RLS, so this is
 * safe on the server and needs no cookies.
 */
function publicClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false } },
  );
}

/**
 * Every page renders from `fallback` until schema.sql + seed.sql have been run
 * against the project, then automatically switches to live rows.
 */
async function withFallback<T>(
  run: (db: ReturnType<typeof publicClient>) => PromiseLike<{ data: T[] | null; error: unknown }>,
  fallback: T[],
): Promise<T[]> {
  try {
    const { data, error } = await run(publicClient());
    if (error || !data || data.length === 0) return fallback;
    return data;
  } catch {
    return fallback;
  }
}

export const getDivisions = () =>
  withFallback<Division>(
    (db) => db.from("divisions").select("*").eq("is_active", true).order("sort_order"),
    fallbackDivisions,
  );

export async function getDivision(slug: string): Promise<Division | null> {
  const all = await getDivisions();
  return all.find((d) => d.slug === slug) ?? null;
}

export const getProducts = () =>
  withFallback<Product>(
    (db) =>
      db.from("products")
        .select("*, divisions(slug,name,accent)")
        .eq("is_active", true)
        .order("sort_order"),
    fallbackProducts,
  );

export async function getFeaturedProducts(limit = 8): Promise<Product[]> {
  const all = await getProducts();
  const featured = all.filter((p) => p.is_featured);
  return (featured.length ? featured : all).slice(0, limit);
}

export async function getProduct(slug: string): Promise<Product | null> {
  const all = await getProducts();
  return all.find((p) => p.slug === slug) ?? null;
}

export async function getProductsByDivision(divisionId: string): Promise<Product[]> {
  const all = await getProducts();
  return all.filter((p) => p.division_id === divisionId);
}

export const getTestimonials = () =>
  withFallback<Testimonial>(
    (db) => db.from("testimonials").select("*").eq("is_active", true).order("sort_order"),
    fallbackTestimonials,
  );

export const getStats = () =>
  withFallback<Stat>(
    (db) => db.from("stats").select("*").eq("is_active", true).order("sort_order"),
    fallbackStats,
  );

export const getCertifications = () =>
  withFallback<Certification>(
    (db) => db.from("certifications").select("*").eq("is_active", true).order("sort_order"),
    fallbackCertifications,
  );

