import type { SVGProps } from "react";

/** lucide v1 dropped brand marks, so the four we need live here. */
const base = (props: SVGProps<SVGSVGElement>) => ({
  viewBox: "0 0 24 24",
  fill: "currentColor",
  xmlns: "http://www.w3.org/2000/svg",
  "aria-hidden": true as const,
  ...props,
});

export function Linkedin(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.44c0-1.3-.02-2.97-1.81-2.97-1.81 0-2.09 1.41-2.09 2.87V21h-4V9Z" />
    </svg>
  );
}

export function Instagram(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)} fill="none" stroke="currentColor" strokeWidth={1.8}>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Facebook(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <path d="M14 9V7.2c0-.9.2-1.35 1.55-1.35H17V2.6c-.34-.05-1.29-.15-2.4-.15-2.5 0-4.1 1.5-4.1 4.25V9H8v3.4h2.5V21H14v-8.6h2.6l.4-3.4H14Z" />
    </svg>
  );
}

export function Youtube(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <path d="M22.5 7.2a2.75 2.75 0 0 0-1.93-1.95C18.85 4.8 12 4.8 12 4.8s-6.85 0-8.57.45A2.75 2.75 0 0 0 1.5 7.2C1.05 8.93 1.05 12 1.05 12s0 3.07.45 4.8a2.75 2.75 0 0 0 1.93 1.95c1.72.45 8.57.45 8.57.45s6.85 0 8.57-.45a2.75 2.75 0 0 0 1.93-1.95c.45-1.73.45-4.8.45-4.8s0-3.07-.45-4.8ZM9.9 15.3V8.7l5.6 3.3-5.6 3.3Z" />
    </svg>
  );
}
