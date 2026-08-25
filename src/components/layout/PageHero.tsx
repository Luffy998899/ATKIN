"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { TextReveal } from "@/components/motion/TextReveal";
import { Reveal } from "@/components/motion/Reveal";
import LazyScene from "@/components/three/LazyScene";
import Figure from "@/components/ui/Figure";
import { cn } from "@/lib/utils";

/** Shared masthead: running head, oversized title, and an optional framed
 *  photograph (preferred) or WebGL panel. */
export default function PageHero({
  label,
  title,
  highlight,
  lead,
  crumbs = [],
  image,
  imageAlt,
  caption,
  scene,
  accent,
  children,
  className,
}: {
  label?: string;
  title: string;
  highlight?: string;
  lead?: string;
  crumbs?: { label: string; href?: string }[];
  /** Photograph in the right-hand frame. Takes precedence over `scene`. */
  image?: string;
  imageAlt?: string;
  caption?: string;
  scene?: "hero" | "dna" | "pills";
  accent?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  const hasFrame = Boolean(image || scene);
  return (
    <section className={cn("grain relative overflow-hidden bg-bone pt-[72px]", className)}>
      <div className="container-x">
        {/* running head */}
        <Reveal duration={0.6}>
          <nav className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-rule py-4">
            <Link href="/" className="label text-ink/40 transition-colors hover:text-leaf">
              Home
            </Link>
            {crumbs.map((c) => (
              <span key={c.label} className="flex items-baseline gap-3">
                <span className="label text-rule">/</span>
                {c.href ? (
                  <Link href={c.href} className="label text-ink/40 transition-colors hover:text-leaf">
                    {c.label}
                  </Link>
                ) : (
                  <span className="label text-ink/70">{c.label}</span>
                )}
              </span>
            ))}
            {label && <span className="label ml-auto hidden text-leaf md:block">{label}</span>}
          </nav>
        </Reveal>

        <div className="grid-12 items-end gap-y-10 pb-14 pt-12 md:pb-20 md:pt-16">
          <div className={cn("col-span-4", hasFrame ? "md:col-span-7" : "md:col-span-9")}>
            <h1 className="display text-[clamp(2.8rem,7.6vw,6.8rem)] text-ink">
              <TextReveal text={title} />
              {highlight && (
                <>
                  {" "}
                  <TextReveal
                    text={highlight}
                    delay={0.1}
                    wordClassName="text-leaf"
                    className={accent ? "" : undefined}
                  />
                </>
              )}
            </h1>

            {lead && (
              <Reveal delay={0.18}>
                <p className="mt-8 max-w-[52ch] text-[0.98rem] leading-[1.75] text-ink/60">{lead}</p>
              </Reveal>
            )}

            {children && <Reveal delay={0.3}>{children}</Reveal>}
          </div>

          {image && (
            <div className="col-span-4 md:col-span-4 md:col-start-9">
              <Figure
                src={image}
                alt={imageAlt ?? ""}
                caption={caption}
                index={label}
                sizes="(max-width: 768px) 100vw, 34vw"
                className="aspect-4/3 w-full md:aspect-square"
              />
            </div>
          )}

          {!image && scene && (
            <div className="col-span-4 md:col-span-4 md:col-start-9">
              <div
                className="relative aspect-4/3 w-full overflow-hidden md:aspect-square"
                style={{ background: accent ?? "#0b0e0d" }}
              >
                <LazyScene name={scene} />
                <motion.span
                  aria-hidden
                  initial={{ scaleY: 1 }}
                  animate={{ scaleY: 0 }}
                  transition={{ duration: 1, delay: 0.2, ease: [0.83, 0, 0.17, 1] }}
                  className="absolute inset-0 z-10 origin-bottom bg-bone"
                />
                <span className="label absolute bottom-4 left-4 z-20 text-bone/45">
                  {label ?? "ATIN"}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
