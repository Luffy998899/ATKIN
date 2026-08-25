import type { Metadata } from "next";
import { redirect } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Signed out — this is the login page, which needs no shell.
  if (!user) return <div className="min-h-svh bg-bone">{children}</div>;

  // Signed in, but is the account on the admin allow-list? RLS on `admins`
  // means this returns a row only for admins.
  const { data: admin } = await supabase.from("admins").select("id,email,full_name").maybeSingle();

  if (!admin) {
    await supabase.auth.signOut();
    redirect("/admin/login?error=not-authorised");
  }

  return (
    <AdminShell email={admin.email ?? user.email ?? ""} name={admin.full_name ?? null}>
      {children}
    </AdminShell>
  );
}
