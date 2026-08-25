"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Generated pack artwork. Until photography exists, each product gets a vector
 * mock of its actual dosage form, tinted with its division accent.
 */
export default function PackVisual({
  form,
  accent = "#1272cd",
  name,
  className,
}: {
  form?: string | null;
  accent?: string;
  name?: string;
  className?: string;
}) {
  const f = (form ?? "Tablet").toLowerCase();
  const id = (name ?? f).replace(/\W/g, "");

  return (
    <div className={cn("relative aspect-4/3 w-full overflow-hidden", className)}>
      <motion.svg
        viewBox="0 0 200 150"
        className="relative h-full w-full"
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <defs>
          <linearGradient id={`g-${id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={accent} stopOpacity="0.95" />
            <stop offset="1" stopColor="#8cc63e" stopOpacity="0.85" />
          </linearGradient>
          <linearGradient id={`s-${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.42" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0.04" />
          </linearGradient>
        </defs>

        {f.includes("syrup") || f.includes("drops") ? (
          <Bottle id={id} />
        ) : f.includes("capsule") ? (
          <CapsuleStrip id={id} />
        ) : f.includes("gel") || f.includes("cream") ? (
          <Tube id={id} />
        ) : f.includes("sachet") ? (
          <Sachet id={id} />
        ) : f.includes("inject") ? (
          <Vial id={id} />
        ) : (
          <BlisterStrip id={id} />
        )}
      </motion.svg>

      {/* shine sweep */}
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(105deg,transparent_38%,rgba(255,255,255,0.35)_50%,transparent_62%)] transition-transform duration-1000 group-hover:translate-x-full" />
    </div>
  );
}

/* --------------------------- forms --------------------------- */

function BlisterStrip({ id }: { id: string }) {
  return (
    <g>
      <rect x="42" y="26" width="116" height="98" rx="9" fill={`url(#g-${id})`} opacity="0.22" />
      <rect x="42" y="26" width="116" height="98" rx="9" stroke={`url(#g-${id})`} strokeWidth="1.4" fill="none" />
      {[0, 1, 2, 3].map((r) =>
        [0, 1, 2].map((c) => (
          <g key={`${r}-${c}`}>
            <ellipse
              cx={64 + c * 36}
              cy={46 + r * 22}
              rx="13"
              ry="8"
              fill={`url(#g-${id})`}
              opacity="0.85"
            />
            <ellipse cx={60 + c * 36} cy={43 + r * 22} rx="5" ry="2.4" fill={`url(#s-${id})`} />
          </g>
        )),
      )}
      <rect x="42" y="26" width="116" height="12" rx="6" fill={`url(#s-${id})`} opacity="0.35" />
    </g>
  );
}

function CapsuleStrip({ id }: { id: string }) {
  return (
    <g>
      <rect x="40" y="30" width="120" height="90" rx="10" fill={`url(#g-${id})`} opacity="0.18" />
      <rect x="40" y="30" width="120" height="90" rx="10" stroke={`url(#g-${id})`} strokeWidth="1.4" fill="none" />
      {[0, 1, 2].map((r) =>
        [0, 1].map((c) => (
          <g key={`${r}-${c}`} transform={`rotate(-24 ${72 + c * 52} ${50 + r * 26})`}>
            <rect x={54 + c * 52} y={44 + r * 26} width="36" height="13" rx="6.5" fill={`url(#g-${id})`} />
            <rect x={54 + c * 52} y={44 + r * 26} width="18" height="13" rx="6.5" fill="#ffffff" opacity="0.55" />
            <rect x={58 + c * 52} y={46 + r * 26} width="10" height="3" rx="1.5" fill={`url(#s-${id})`} />
          </g>
        )),
      )}
    </g>
  );
}

function Bottle({ id }: { id: string }) {
  return (
    <g>
      <rect x="86" y="16" width="28" height="18" rx="4" fill={`url(#g-${id})`} />
      <rect x="82" y="30" width="36" height="10" rx="3" fill={`url(#g-${id})`} opacity="0.7" />
      <path
        d="M78 40 h44 a10 10 0 0 1 10 10 v72 a10 10 0 0 1 -10 10 h-44 a10 10 0 0 1 -10 -10 v-72 a10 10 0 0 1 10 -10z"
        fill={`url(#g-${id})`}
        opacity="0.3"
      />
      <path
        d="M78 40 h44 a10 10 0 0 1 10 10 v72 a10 10 0 0 1 -10 10 h-44 a10 10 0 0 1 -10 -10 v-72 a10 10 0 0 1 10 -10z"
        stroke={`url(#g-${id})`}
        strokeWidth="1.6"
        fill="none"
      />
      <rect x="74" y="62" width="52" height="34" rx="4" fill="#ffffff" opacity="0.14" />
      <rect x="80" y="70" width="34" height="3.4" rx="1.7" fill="#ffffff" opacity="0.5" />
      <rect x="80" y="79" width="22" height="3" rx="1.5" fill="#ffffff" opacity="0.32" />
      <rect x="72" y="44" width="9" height="76" rx="4.5" fill={`url(#s-${id})`} />
    </g>
  );
}

function Tube({ id }: { id: string }) {
  return (
    <g>
      <rect x="88" y="14" width="24" height="16" rx="4" fill={`url(#g-${id})`} />
      <path
        d="M74 30 h52 v78 l-8 12 h-36 l-8 -12z"
        fill={`url(#g-${id})`}
        opacity="0.32"
      />
      <path d="M74 30 h52 v78 l-8 12 h-36 l-8 -12z" stroke={`url(#g-${id})`} strokeWidth="1.6" fill="none" />
      <rect x="80" y="48" width="40" height="30" rx="3" fill="#ffffff" opacity="0.14" />
      <rect x="85" y="55" width="28" height="3.4" rx="1.7" fill="#ffffff" opacity="0.5" />
      <rect x="85" y="63" width="18" height="3" rx="1.5" fill="#ffffff" opacity="0.32" />
      <rect x="78" y="34" width="8" height="76" rx="4" fill={`url(#s-${id})`} />
      <path d="M78 120 h44" stroke={`url(#g-${id})`} strokeWidth="4" strokeLinecap="round" />
    </g>
  );
}

function Sachet({ id }: { id: string }) {
  return (
    <g>
      <path d="M60 26 h80 v98 h-80z" fill={`url(#g-${id})`} opacity="0.28" />
      <path d="M60 26 h80 v98 h-80z" stroke={`url(#g-${id})`} strokeWidth="1.6" fill="none" />
      <path d="M60 26 h80 v9 h-80z M60 115 h80 v9 h-80z" fill={`url(#g-${id})`} opacity="0.65" />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <rect key={i} x={60 + i * 10} y="35" width="3" height="80" fill="#ffffff" opacity="0.07" />
      ))}
      <circle cx="100" cy="70" r="20" fill="#ffffff" opacity="0.15" />
      <rect x="80" y="96" width="40" height="3.4" rx="1.7" fill="#ffffff" opacity="0.45" />
    </g>
  );
}

function Vial({ id }: { id: string }) {
  return (
    <g>
      <rect x="88" y="18" width="24" height="10" rx="3" fill="#cbd5e1" opacity="0.75" />
      <rect x="90" y="26" width="20" height="8" rx="2" fill={`url(#g-${id})`} />
      <path d="M82 34 h36 v78 a8 8 0 0 1 -8 8 h-20 a8 8 0 0 1 -8 -8z" fill={`url(#g-${id})`} opacity="0.3" />
      <path d="M82 34 h36 v78 a8 8 0 0 1 -8 8 h-20 a8 8 0 0 1 -8 -8z" stroke={`url(#g-${id})`} strokeWidth="1.6" fill="none" />
      <rect x="82" y="70" width="36" height="42" fill={`url(#g-${id})`} opacity="0.55" />
      <rect x="86" y="40" width="7" height="70" rx="3.5" fill={`url(#s-${id})`} />
    </g>
  );
}
