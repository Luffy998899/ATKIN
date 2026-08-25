"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion } from "motion/react";
import LogoMark from "@/components/layout/LogoMark";
import { signOut } from "@/app/admin/actions";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/enquiries", label: "Enquiries" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/divisions", label: "Divisions" },
];

export default function AdminShell({
  children,
  email,
  name,
}: {
  children: React.ReactNode;
  email: string;
  name: string | null;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-svh bg-bone">
      {/* top bar */}
      <header className="sticky top-0 z-50 border-b border-rule bg-bone/95 backdrop-blur-[2px]">
        <div className="mx-auto flex max-w-[100rem] items-center justify-between gap-6 px-5 py-3.5 md:px-8">
          <div className="flex items-center gap-8">
            <Link href="/admin" className="flex items-center gap-3">
              <LogoMark className="h-8 w-8" />
              <span className="leading-[1.05]">
                <span className="display block text-[0.95rem] text-ink">ATIN</span>
                <span className="label block text-[0.45rem] tracking-[0.3em] text-leaf">Admin</span>
              </span>
            </Link>

            <nav className="hidden items-center gap-7 md:flex">
              {LINKS.map((l) => {
                const active = l.href === "/admin" ? pathname === "/admin" : pathname.startsWith(l.href);
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    className={cn(
                      "label link-draw transition-colors",
                      active ? "text-leaf" : "text-ink/55 hover:text-ink",
                    )}
                  >
                    {l.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-5">
            <Link href="/" target="_blank" className="label hidden text-ink/45 hover:text-ink sm:block">
              View site ↗
            </Link>

            <div className="hidden text-right md:block">
              <span className="block text-[0.8rem] leading-tight text-ink">{name ?? "Admin"}</span>
              <span className="label block text-ink/40">{email}</span>
            </div>

            <form action={signOut}>
              <button className="label border border-ink px-4 py-2 text-ink transition-colors hover:bg-ink hover:text-bone">
                Sign out
              </button>
            </form>

            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Menu"
              className="label text-ink md:hidden"
            >
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </div>

        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            className="overflow-hidden border-t border-rule md:hidden"
          >
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="label block border-b border-rule px-5 py-4 text-ink/70"
              >
                {l.label}
              </Link>
            ))}
          </motion.nav>
        )}
      </header>

      <main className="mx-auto max-w-[100rem] px-5 py-10 md:px-8 md:py-14">{children}</main>
    </div>
  );
}
