import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";

export function Section({
  children,
  className,
  id,
  flush = false,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  /** Drop the default vertical rhythm when the section sets its own. */
  flush?: boolean;
}) {
  return (
    <section id={id} className={cn("relative", !flush && "py-24 md:py-32", className)}>
      {children}
    </section>
  );
}

/**
 * Mono caps sitting on a hairline. This replaces the rounded badge-pill —
 * it reads as a printed section marker rather than a UI chip.
 */
export function Label({
  children,
  index,
  dark = false,
  className,
}: {
  children: ReactNode;
  index?: string;
  dark?: boolean;
  className?: string;
}) {
  return (
    <Reveal direction="up" duration={0.6}>
      <div
        className={cn(
          "flex items-baseline gap-4 border-t pt-3",
          dark ? "border-rule-dark" : "border-rule",
          className,
        )}
      >
        {index && (
          <span className={cn("label", dark ? "text-lime" : "text-leaf")}>{index}</span>
        )}
        <span className={cn("label", dark ? "text-bone/55" : "text-ink/50")}>{children}</span>
      </div>
    </Reveal>
  );
}

export function SectionHeading({
  label,
  index,
  title,
  highlight,
  lead,
  dark = false,
  className,
}: {
  label?: string;
  index?: string;
  title: string;
  highlight?: string;
  lead?: string;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      {label && (
        <Label index={index} dark={dark}>
          {label}
        </Label>
      )}

      <h2
        className={cn(
          "display mt-7 max-w-[16ch] text-[clamp(2.4rem,6vw,5.2rem)]",
          dark ? "text-bone" : "text-ink",
        )}
      >
        <TextReveal text={title} />
        {highlight && (
          <>
            {" "}
            <TextReveal
              text={highlight}
              delay={0.1}
              wordClassName={dark ? "text-lime" : "text-leaf"}
            />
          </>
        )}
      </h2>

      {lead && (
        <Reveal delay={0.16}>
          <p
            className={cn(
              "mt-7 max-w-[46ch] text-[0.98rem] leading-[1.65] md:text-[1.05rem]",
              dark ? "text-bone/60" : "text-ink/60",
            )}
          >
            {lead}
          </p>
        </Reveal>
      )}
    </div>
  );
}
