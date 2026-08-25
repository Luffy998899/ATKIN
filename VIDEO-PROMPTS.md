# Video prompts — ATIN Healthcare

Short, simple clips. Each one is a single continuous shot with no cuts, no text
and no logos, so it drops straight into a section without fighting the layout.

**Global settings for every clip**

- Duration: **5–8 seconds**, seamless loop where noted
- No on-screen text, captions, logos or watermarks
- Colour grade: bone white and cool grey base, deep blue `#062159` and fresh
  green `#2fa84f` as the only accents
- Camera moves slowly and steadily — no whip pans, no shaky handheld
- Real, documentary look; avoid glossy stock-advert lighting

Export **MP4 (H.264) 1920×1080** plus a **WebM** copy, then drop both into
`public/media/` and follow the "How to use them" note at the bottom.

---

## 1 · Hero background loop — `hero-loop.mp4`

> Slow push-in on a modern pharmaceutical clean room. A technician in a white
> gown, hairnet and mask stands beside a running Alu-Alu blister packing machine
> as strips of tablets travel along the line. Bright, even industrial light,
> stainless steel and white surfaces, cool blue-grey tones with a hint of green.
> The camera dollies forward very slowly and steadily. Shallow depth of field,
> 35mm lens, documentary industrial cinematography. No text, no logos, no people
> looking at the camera. 6 seconds, seamless loop.

Use: optional motion backdrop behind the hero photograph.

---

## 2 · Blister strip detail — `strip-macro.mp4`

> Extreme macro of an Alu-Alu blister strip of white tablets rotating slowly on a
> clean bone-white surface. Soft directional light rakes across the foil so the
> embossing catches the light. Shallow depth of field, the near tablets sharp and
> the far end falling out of focus. Calm, clinical, premium product
> cinematography. No text, no branding, no hands. 5 seconds, seamless loop.

Use: small inset panel beside the product catalogue heading.

---

## 3 · Capsules falling — `capsules-fall.mp4`

> Slow-motion shot of two-tone capsules — deep blue over fresh green — falling
> gently through frame against a plain bone-white background and settling into a
> loose pile. Soft even light, real depth of field, no motion blur streaks.
> Clean premium product cinematography, 1000fps look. No text, no hands, no
> containers. 6 seconds.

Use: transition beat between the divisions index and the product grid.

---

## 4 · Doctor writing a prescription — `prescription.mp4`

> Over-the-shoulder shot of an Indian doctor in a white coat writing on a
> prescription pad at a wooden desk in a bright clinic. Only the hand, pen and
> pad are in focus; the doctor's face is out of frame. Warm natural window light
> from the left, a stethoscope resting on the desk, a green plant blurred in the
> background. The camera holds almost still with the faintest drift. Documentary
> healthcare cinematography, 50mm lens. No readable writing, no text, no logos.
> 7 seconds.

Use: the "Why partners stay" statement section.

---

## 5 · QC laboratory — `qc-lab.mp4`

> A female analyst in a white lab coat, safety glasses and blue gloves loads a
> sample vial into an HPLC instrument in a pharmaceutical quality-control
> laboratory. Laboratory glassware and a dissolution apparatus sit on the bench
> beside her. Cool clean lighting, white and blue-grey surfaces, very tidy and
> precise. The camera slowly tracks right. Sharp focus on the hands and the
> instrument. Documentary science cinematography, 50mm lens. No text, no logos.
> 6 seconds.

Use: the manufacturing and quality section.

---

## 6 · Cartons on the dispatch line — `dispatch.mp4`

> Plain unbranded white medicine cartons move steadily along a warehouse
> conveyor towards camera and pass out of frame. A worker's gloved hands lift one
> carton into an open shipping box at the edge of frame. Clean, bright warehouse
> lighting, neutral grey shelving racks blurred behind. The camera is locked off
> at carton height. Documentary logistics cinematography. No text, no barcodes,
> no branding. 5 seconds, seamless loop.

Use: the dispatch step of the six-step process scroll.

---

## 7 · Handshake in a clinic — `handshake.mp4`

> A medical representative in a navy shirt and a senior doctor in a white coat
> shake hands across a wooden desk in a bright clinic chamber. Both are framed
> from the chest down so faces stay out of shot. Warm natural window light, a
> green plant softly out of focus behind them. The camera holds still. Natural,
> candid, documentary business cinematography, 35mm lens. No text, no logos.
> 5 seconds.

Use: the closing call-to-action section.

---

## How to use them

Drop the files in `public/media/`, then swap any `<Figure>` for a muted looping
video — same frame, same caption, same reveal:

```tsx
<div className="relative aspect-4/5 w-full overflow-hidden bg-ink-2">
  <video
    className="absolute inset-0 h-full w-full object-cover"
    autoPlay
    muted
    loop
    playsInline
    preload="metadata"
    poster="/media/lab.webp"
  >
    <source src="/media/qc-lab.webp.webm" type="video/webm" />
    <source src="/media/qc-lab.mp4" type="video/mp4" />
  </video>
</div>
```

Three rules worth keeping:

1. Always set `muted` and `playsInline` — without them iOS refuses to autoplay.
2. Always give a `poster` (the matching WebP already in `public/media/`) so the
   frame is never empty while the video loads.
3. Keep each file **under 3 MB**. Anything heavier should be moved to a CDN or
   Supabase Storage rather than shipped from `public/`.

For visitors who ask for reduced motion, render the poster image instead of the
video — `usePrefersReducedMotion()` in `src/lib/hooks.ts` already returns that.
