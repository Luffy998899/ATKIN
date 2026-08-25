"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import LogoMark from "./LogoMark";
import Marquee from "@/components/motion/Marquee";
import { Facebook, Instagram, Linkedin, Youtube } from "@/components/ui/SocialIcons";
import { nav, site } from "@/lib/site";

const divisionLinks: [string, string][] = [
  ["Cardiac & Diabetic", "/divisions/cardiac-diabetic"],
  ["Gynaecology & Fertility", "/divisions/gynaecology"],
  ["Dermatology", "/divisions/dermatology"],
  ["Orthopaedic & Pain Care", "/divisions/ortho-pain"],
  ["Antibiotics", "/divisions/anti-infectives"],
  ["Nutraceuticals", "/divisions/nutraceutical"],
];

const socials = [
  { Icon: Linkedin, href: site.socials.linkedin, label: "LinkedIn" },
  { Icon: Instagram, href: site.socials.instagram, label: "Instagram" },
  { Icon: Facebook, href: site.socials.facebook, label: "Facebook" },
  { Icon: Youtube, href: site.socials.youtube, label: "YouTube" },
];

export default function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  return (
    <footer className="relative overflow-hidden bg-ink text-bone">
      {/* oversized wordmark, cropped by the viewport edge */}
      <div className="border-b border-rule-dark py-6">
        <Marquee speed={52} fade={false}>
          <span className="flex items-center gap-12 pr-12">
            {Array.from({ length: 3 }).map((_, i) => (
              <span key={i} className="flex items-center gap-12">
                <span className="display text-[clamp(3rem,9vw,8rem)] leading-none text-bone/10">
                  ATIN HEALTHCARE
                </span>
                <LogoMark className="h-10 w-10 shrink-0 opacity-40" />
              </span>
            ))}
          </span>
        </Marquee>
      </div>

      <div className="container-x py-16 md:py-20">
        <div className="grid-12 gap-y-12">
          <div className="col-span-4 md:col-span-4">
            <Link href="/" className="flex items-center gap-3">
              <LogoMark className="h-10 w-10" />
              <span className="leading-[1.05]">
                <span className="display block text-[1.15rem] text-bone">ATIN</span>
                <span className="label block text-[0.5rem] tracking-[0.3em] text-lime">
                  Healthcare Pvt Ltd
                </span>
              </span>
            </Link>

            <p className="mt-7 max-w-[34ch] text-[0.9rem] leading-[1.7] text-bone/50">
              A WHO-GMP certified PCD pharma franchise company. 500+ formulations, eight therapy
              divisions, monopoly rights honoured in writing.
            </p>

            <div className="mt-8 flex gap-5">
              {socials.map(({ Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  data-cursor="hover"
                  whileHover={{ y: -3 }}
                  className="text-bone/45 transition-colors hover:text-lime"
                >
                  <Icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </div>

          <FooterCol title="Company" className="col-span-2 md:col-span-2 md:col-start-6">
            {nav.map((item) => (
              <FooterLink key={item.href} href={item.href}>
                {item.label}
              </FooterLink>
            ))}
          </FooterCol>

          <FooterCol title="Divisions" className="col-span-2 md:col-span-3 md:col-start-8">
            {divisionLinks.map(([label, href]) => (
              <FooterLink key={href} href={href}>
                {label}
              </FooterLink>
            ))}
          </FooterCol>

          <div className="col-span-4 md:col-span-2 md:col-start-11">
            <h4 className="label border-t border-rule-dark pt-3 text-lime">Reach us</h4>
            <address className="mt-5 space-y-4 not-italic text-[0.85rem] leading-[1.7] text-bone/50">
              <p>
                {site.address.line1}
                <br />
                {site.address.line2}
                <br />
                {site.address.city}
              </p>
              <p>
                <a href={site.phoneHref} className="num link-draw block text-bone">
                  {site.phone}
                </a>
                <a href={`mailto:${site.email}`} className="link-draw mt-1 block text-bone/70">
                  {site.email}
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="mt-16 grid-12 gap-y-4 border-t border-rule-dark pt-6">
          <p className="label col-span-4 text-bone/35 md:col-span-4">
            © {new Date().getFullYear()} {site.legalName}
          </p>
          <p className="col-span-4 text-[0.72rem] leading-[1.7] text-bone/30 md:col-span-8">
            Information on this site is intended for registered medical practitioners and trade
            partners. Products are to be dispensed on the prescription of a registered medical
            practitioner only.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <h4 className="label border-t border-rule-dark pt-3 text-lime">{title}</h4>
      <ul className="mt-5 space-y-2.5">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        data-cursor="hover"
        className="link-draw text-[0.85rem] text-bone/55 transition-colors hover:text-bone"
      >
        {children}
      </Link>
    </li>
  );
}
