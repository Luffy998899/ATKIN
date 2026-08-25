# ATIN Healthcare Pvt Ltd — website

A motion-led marketing site and admin desk for a PCD pharma franchise company.
Next.js 16 (App Router) · Tailwind v4 · Motion · React Three Fiber · Supabase.

---

## 1. Run it

```bash
npm install
npm run dev
```

`http://localhost:3000`. Credentials already live in `.env.local`
(`.env.example` shows the shape without secrets).

---

## 2. Set up the database

The site ships with a full copy of its content in `src/lib/data/fallback.ts`, so
it renders correctly **before** the database exists. Once you run the SQL it
switches to live rows automatically — no code change.

In the Supabase dashboard → **SQL Editor**, run in this order:

1. `supabase/schema.sql` — tables, indexes and row-level security
2. `supabase/seed.sql` — 8 divisions, 33 products, testimonials, stats, certifications

### Create an admin user

1. Supabase → **Authentication → Users → Add user** (email + password, confirm it).
2. Copy the new user's UUID, then run in the SQL editor:

```sql
insert into public.admins (id, email, full_name)
values ('<paste-user-uuid>', 'you@atinhealthcare.com', 'Your Name');
```

Sign in at `/admin`. Anyone authenticated but *not* in `public.admins` is signed
straight back out — the allow-list is enforced by RLS, not just by the UI.

---

## 3. What the admin desk does

| Route | Purpose |
| --- | --- |
| `/admin` | Enquiry counters, last ten submissions |
| `/admin/enquiries` | Search/filter, expand a row for full detail, set status, delete |
| `/admin/products` | Create, edit, delete brands; assign division, packing, composition, MRP |
| `/admin/divisions` | Create, edit, delete therapy divisions and their accent colour |

MRP is stored and editable in the admin but **never shown on the public site** —
product pages and cards say *Get a quote* instead, and no price appears in the
structured data.

---

## 4. Where things live

```
src/
  app/
    page.tsx                 landing page — section order lives here
    about | divisions | products | manufacturing | contact
    admin/                   login, overview, enquiries, products, divisions
    actions.ts               public enquiry submission (server action)
    admin/actions.ts         admin mutations (server actions, RLS-guarded)
  components/
    sections/                one file per landing-page section
    motion/                  TextReveal, Reveal, Marquee, Counter, MagneticButton,
                             SmoothScroll (Lenis), Cursor, Preloader
    three/                   HeroCanvas, DnaCanvas, PillStripCanvas, primitives
    ui/                      Figure, ProductCard, DivisionCard, PackVisual, Section
    admin/                   AdminShell, EnquiryTable, ProductManager, DivisionManager
  lib/
    queries.ts               data access with automatic fallback
    data/fallback.ts         mirror of seed.sql
    site.ts                  brand name, phone, address, nav — edit here first
    hooks.ts                 useMediaQuery / usePrefersReducedMotion
supabase/
  schema.sql  seed.sql
public/media/                photography (WebP) used across the site
```

**Change the phone number, address or nav once** in `src/lib/site.ts` — every
surface reads from it.

---

## 5. Art direction

Deliberately not a dark-gradient SaaS template. The rules:

- **Bone paper, ink type.** `#f1efe9` ground, `#0b0e0d` text. Sections invert to
  ink, forest or navy for rhythm — never a gradient wash.
- **The logo's blue and green are printed fields**, not glows. No glassmorphism,
  no blurred colour blobs, no gradient headlines.
- **Bricolage Grotesque** for display, **Instrument Sans** for text,
  **JetBrains Mono** for every label, number and caption.
- Section markers are mono caps on a hairline (`<Label index="03">`), not badge pills.
- Everything sits on a 12-column grid (`.grid-12`) with visible hairline rules.

Colour and type tokens are all in `src/app/globals.css` under `@theme`.

---

## 6. Motion

| Effect | Where |
| --- | --- |
| Inertial scrolling (Lenis) | `SmoothScroll` |
| Word-by-word masked headline reveal | `TextReveal` |
| Panel-wipe image reveal + scroll parallax | `Figure` |
| Scroll-linked word inking | `ScrollStatement` |
| Colour-wipe row inversion | `DivisionsSection` |
| Pinned horizontal scroll | `ProcessScroll` |
| Sticky index that tracks the active entry | `WhyUs` |
| Drag-scrolled quote cards | `Testimonials` |
| Magnetic buttons, custom reticle cursor | `MagneticButton`, `Cursor` |
| WebGL molecule / capsule / DNA scenes | `three/` via `LazyScene` |

**Reduced motion is respected properly.** Lenis and the preloader are skipped,
and WebGL scenes still render but with `frameloop="demand"` — the visitor gets
the composition as a still frame instead of a blank panel.

WebGL scenes only mount when scrolled into view and only where WebGL exists.

> Note: if animations look frozen on your machine, check Windows
> **Settings → Accessibility → Visual effects → Animation effects**. When that is
> off, the OS reports `prefers-reduced-motion: reduce` and the site honours it.

---

## 7. Deploy

Push to a Git host and import into Vercel. Set the three environment variables
from `.env.local` in the project settings, and set `NEXT_PUBLIC_SITE_URL` to the
real domain so canonical URLs, the sitemap and OG tags are correct.

`SUPABASE_SERVICE_ROLE_KEY` is server-only — it is used solely by the enquiry
server action and must never be exposed to the browser.
