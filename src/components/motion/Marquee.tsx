"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export default function Marquee({
  children,
  reverse = false,
  speed = 38,
  className,
  fade = true,
  pauseOnHover = true,
}: {
  children: ReactNode;
  reverse?: boolean;
  speed?: number;
  className?: string;
  fade?: boolean;
  pauseOnHover?: boolean;
}) {
  return (
    <div
      className={cn("relative w-full overflow-hidden", className)}
      style={
        fade
          ? {
              maskImage:
                "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
              WebkitMaskImage:
                "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
            }
          : undefined
      }
    >
      <div
        className={cn("marquee-track", pauseOnHover && "hover:[animation-play-state:paused]")}
        style={{
          animation: `${reverse ? "marquee-reverse" : "marquee"} ${speed}s linear infinite`,
        }}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
