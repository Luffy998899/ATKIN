import type { Metadata } from "next";
import LoginForm from "@/components/admin/LoginForm";
import LogoMark from "@/components/layout/LogoMark";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Admin sign in",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="grid min-h-svh grid-cols-1 bg-bone lg:grid-cols-2">
      {/* form */}
      <div className="flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm">
          <div className="flex items-center gap-3">
            <LogoMark className="h-10 w-10" />
            <span className="leading-[1.05]">
              <span className="display block text-[1.1rem] text-ink">ATIN</span>
              <span className="label block text-[0.5rem] tracking-[0.3em] text-leaf">
                Healthcare
              </span>
            </span>
          </div>

          <h1 className="display mt-12 text-[2.2rem] text-ink">Admin sign in</h1>
          <p className="mt-3 text-[0.9rem] leading-[1.7] text-ink/55">
            Enquiries, products and content for {site.legalName}.
          </p>

          <div className="mt-10">
            <LoginForm />
          </div>
        </div>
      </div>

      {/* ink panel */}
      <div className="relative hidden overflow-hidden bg-ink lg:block">
        <div className="absolute inset-0 flex items-end p-12">
          <div>
            <span className="label text-lime">Restricted</span>
            <p className="display mt-5 max-w-[16ch] text-[2.4rem] leading-[1.05] text-bone">
              One district. One partner. Five hundred brands.
            </p>
            <p className="label mt-8 text-bone/35">
              Access is limited to accounts on the admin list.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
