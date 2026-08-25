"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { site } from "@/lib/site";
import { whatsappLink } from "@/lib/utils";

export default function FloatingActions() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => setShow(y > 800));

  if (pathname.startsWith("/admin")) return null;

  return (
    <div className="fixed bottom-0 right-0 z-[880] flex items-stretch">
      <AnimatePresence>
        {show && (
          <motion.button
            key="top"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            onClick={() =>
              globalThis.__lenis?.scrollTo(0) ?? window.scrollTo({ top: 0, behavior: "smooth" })
            }
            aria-label="Back to top"
            data-cursor="hover"
            className="label group relative overflow-hidden bg-ink px-5 text-bone"
          >
            <span className="absolute inset-0 origin-bottom scale-y-0 bg-leaf transition-transform duration-400 group-hover:scale-y-100" />
            <span className="relative z-10 transition-colors duration-300 group-hover:text-ink">
              ↑ Top
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      <a
        href={whatsappLink(
          site.whatsapp,
          `Hi ${site.name}, I'd like to know about your PCD franchise opportunity.`,
        )}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="hover"
        data-cursor-label="Chat"
        className="label group relative overflow-hidden bg-leaf px-6 py-4 text-ink"
      >
        <span className="absolute inset-0 origin-bottom scale-y-0 bg-ink transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100" />
        <span className="relative z-10 transition-colors duration-300 group-hover:text-lime">
          WhatsApp
        </span>
      </a>
    </div>
  );
}
