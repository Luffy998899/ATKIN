"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import LogoMark from "./LogoMark";
import { nav, site } from "@/lib/site";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setPinned(y > 20);
    setHidden(y > prev && y > 260 && !open);
  });

  const isAdmin = pathname.startsWith("/admin");

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (isAdmin) return null;

  return (
    <>
      <motion.header
        animate={{ y: hidden ? "-105%" : "0%" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-[900] transition-colors duration-500",
          pinned ? "bg-bone/92 backdrop-blur-[2px]" : "bg-transparent",
        )}
      >
        <div className="container-x">
          <nav className="flex h-[72px] items-center justify-between gap-8">
            <Link href="/" className="group flex items-center gap-3" data-cursor="hover">
              <LogoMark className="h-9 w-9" />
              <span className="leading-[1.05]">
                <span className="display block text-[1.05rem] tracking-[-0.03em] text-ink">
                  ATIN
                </span>
                <span className="label block text-[0.5rem] tracking-[0.3em] text-leaf">
                  Healthcare
                </span>
              </span>
            </Link>

            <ul className="hidden items-center gap-8 lg:flex">
              {nav.slice(1).map((item) => {
                const active = pathname.startsWith(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      data-cursor="hover"
                      className={cn(
                        "label link-draw transition-colors",
                        active ? "text-leaf" : "text-ink/65 hover:text-ink",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-6">
              <a
                href={site.phoneHref}
                data-cursor="hover"
                className="num hidden text-[0.8rem] text-ink/70 transition-colors hover:text-leaf xl:block"
              >
                {site.phone}
              </a>

              <Link
                href="/contact"
                data-cursor="hover"
                className="group relative hidden overflow-hidden bg-ink px-6 py-3 sm:block"
              >
                <span className="absolute inset-0 origin-bottom scale-y-0 bg-leaf transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100" />
                <span className="label relative z-10 text-bone transition-colors duration-400 group-hover:text-ink">
                  Apply
                </span>
              </Link>

              <button
                onClick={() => setOpen((v) => !v)}
                aria-label={open ? "Close menu" : "Open menu"}
                className="relative z-[1001] flex h-9 w-9 flex-col items-end justify-center gap-[5px] lg:hidden"
              >
                <motion.span
                  animate={open ? { rotate: 45, y: 3.5, width: 22 } : { rotate: 0, y: 0, width: 22 }}
                  className={cn("block h-px", open ? "bg-bone" : "bg-ink")}
                />
                <motion.span
                  animate={
                    open ? { rotate: -45, y: -3.5, width: 22 } : { rotate: 0, y: 0, width: 14 }
                  }
                  className={cn("block h-px", open ? "bg-bone" : "bg-ink")}
                />
              </button>
            </div>
          </nav>
        </div>

        <motion.span
          className="block h-px w-full origin-left bg-rule"
          animate={{ scaleX: pinned ? 1 : 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="menu"
            initial={{ y: "-100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.65, ease: [0.83, 0, 0.17, 1] }}
            className="fixed inset-0 z-[950] bg-ink lg:hidden"
          >
            <div className="container-x flex h-full flex-col justify-end pb-16 pt-24">
              <ul>
                {nav.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.22 + i * 0.05,
                      duration: 0.7,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="border-t border-rule-dark"
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="group flex items-baseline gap-5 py-3.5"
                    >
                      <span className="label w-8 shrink-0 text-lime">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="display text-[2.4rem] text-bone transition-colors duration-300 group-hover:text-lime sm:text-[3.2rem]">
                        {item.label}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-12 flex flex-col gap-2 border-t border-rule-dark pt-6"
              >
                <a href={site.phoneHref} className="num text-lg text-bone">
                  {site.phone}
                </a>
                <a href={`mailto:${site.email}`} className="label text-bone/50">
                  {site.email}
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
