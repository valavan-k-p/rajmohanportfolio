# MASTER NAVIGATION — DESIGN SPECIFICATION

**Route:** `/`
**Asset:** `public/images/navigation.jpg` — 4095×2305, 16:9. Supplied. Never modified, never
regenerated, never replaced.
**Inherits:** `design-system/MASTER.md`.

---

## 1. WHAT THE MEASUREMENT DICTATED

Placement here is derived from analysis of the actual image (`docs/PHASE-0-AUDIT.md` §F), not
chosen aesthetically. Three measurements decided the entire design:

**1. The subject occupies x 38–63%, head crown at y 27%.** Anything overlapping that band
obscures him, which both specs forbid outright.

**2. Two flanking columns are provably empty** — `x 2–35%` and `x 65–98%` across `y 8–46%`, both
measuring luminance sigma < 8 (flat sky, no facade, no flags). These are the only regions in the
frame that can carry UI without covering photographic content.

**3. The upper field measures luminance 8–9 of 9 — near-white.** This is the constraint that
shaped everything. White text is impossible there. The reflexive fix is a dark scrim, but a scrim
would destroy the asset we are required to preserve.

**Resolution: dark ink directly on the sky.** Charcoal and maroon on `#FFF6D9` measure 16.52:1 and
10.19:1 — far past the 7:1 floor, with *no overlay at all*. Preserving the photograph and meeting
the accessibility floor turned out to be the same decision.

---

## 2. DESKTOP COMPOSITION (`≥md`, 768px)

Four portals in two flanking stacks. The subject is framed, never touched.

```
┌──────────────────────────────────────────────────────────┐
│                                                          │
│   ┌───────────┐                          ┌───────────┐   │  y 14%
│   │ 01 SCHOOL │                          │ 03 INFO & │   │
│   │ EDUCATION │            ▲             │ PUBLICITY │   │
│   └───────────┘         subject          └───────────┘   │  y 30%
│                        (untouched)                       │
│   ┌───────────┐        x 38–63%          ┌───────────┐   │  y 33%
│   │ 02 TAMIL  │                          │ 04 MLA ·  │   │
│   │ DEVELOPMT │                          │  EGMORE   │   │
│   └───────────┘                          └───────────┘   │  y 49%
│      x 4–32%                                x 68–96%     │
│                     [ flags · facade ]                   │
│                     [     crowd      ]                   │
└──────────────────────────────────────────────────────────┘
```

Portals are positioned in **percentage units against the image**, not in pixels against the
viewport, so they track the composition at every width instead of drifting off it.

## 3. PORTAL ANATOMY

Not a card. A **portal** — a framed threshold, closer to a plaque than a tile.

```
─────────────────────────           ← 1px maroon-600 hairline, top only
01                                  ← index numeral, u-eyebrow, maroon-700
SCHOOL EDUCATION                    ← Instrument Serif, --text-h3, charcoal-900
Learning · Students · Future        ← meta line, charcoal-700, --text-meta
                                 →  ← arrow, appears on hover/focus
```

- Ground: `transparent`. The sky *is* the surface. At `≥lg` a `2%` white wash is permitted for
  edge definition — no more; anything heavier starts erasing the photograph.
- Border: hairline top rule only. No box. No radius beyond `2px` on the hover ground.
- The index numeral is structural, not decorative — it is the only place the composition admits a
  purely typographic accent, and it carries the editorial register the spec asks for.

## 4. INTERACTION

**Hover / focus — the selected portal becomes dominant, the others recede:**

| Property | Selected | Unselected siblings |
|---|---|---|
| Ground | white @ 8% | unchanged |
| Top rule | maroon-600 → `maroon-700`, scales x-origin left | unchanged |
| Title | charcoal-900 → `maroon-700` | opacity 1 → `0.55` |
| Arrow | translateX 0 → 6px, opacity 0 → 1 | — |
| Duration | `--duration-micro` 160ms, `--ease-out-expo` | 160ms |

The recede is opacity only — never blur, never scale-down. Blurring siblings would blur the
photograph behind them.

**Keyboard:** the four portals are a single roving-tabindex group. `↑↓←→` move between them
spatially (left stack ↔ right stack), `Enter`/`Space` activate, `Tab` exits the group. Focus ring
is the standard 2px `maroon-700` at 2px offset — identical to hover state plus the ring, so
keyboard users see exactly what mouse users see. **This is a release gate, called out in both
specs.**

**Activation — the portal transition (`--duration-portal`, 620ms, GSAP):**

1. `0–180ms` — unselected portals fade to 0, stagger 40ms.
2. `120–420ms` — selected portal's title scales 1 → 1.06 and moves toward the optical centre.
3. `280–620ms` — the whole frame lifts (`scale 1 → 1.04`, opacity → 0), revealing the portal's
   own hero beneath. The image scales *with* it, so it reads as moving through the frame rather
   than as a page swap.

Under `prefers-reduced-motion`: a single 120ms cross-fade. No transform, no stagger. The
destination is identical.

## 5. MOBILE (`<md`) — A DIFFERENT COMPOSITION, NOT A SHRUNK ONE

The flanking columns do not exist at narrow widths — they collapse into the subject. Overlaying
there would cover him, which §39 forbids explicitly.

- The image becomes a **fixed upper register**, ~52vh, `object-position: 50% 22%` — anchored on
  the subject's face and the building, cropping the crowd rather than the man.
- The four portals become a **stacked editorial list** on `sand-100` beneath it: full-bleed rows,
  hairline `sand-300` dividers, index numeral left, title and meta right, 44px minimum height.
- No overlay on the photograph at all. It is presented, then navigated from.
- This is deliberately a *different design*, per §39 — "mobile should feel like a deliberately
  designed experience," not a reflow.

## 6. IMAGE HANDLING

`next/image`, `priority`, `fill`, `sizes="100vw"`, `quality={82}`, AVIF → WebP → JPEG.
Rendered widths 400 / 800 / 1200 / 1920 (spec §24).

- `object-position: 50% 30%` desktop, `50% 22%` below `md`.
- **Never** cropped tighter than 16:9 on desktop. On mobile the crop is vertical only and is
  anchored to keep the subject whole.
- A `sand-100` LQIP `blurDataURL` is used so the load-in is a warm field resolving into the
  photograph rather than a grey flash — the ground colour is the sampled sky, so the placeholder
  and the final image share a colour.

## 7. SUCCESS CRITERIA

- [ ] Subject unobstructed at every breakpoint — verified by screenshot, not assumed
- [ ] All four portals keyboard-operable, roving tabindex, visible focus
- [ ] Text contrast ≥7:1 measured against the actual sampled sky
- [ ] No scrim, no gradient overlay, no filter applied to the photograph
- [ ] Transition ≤620ms, and ≤120ms under reduced motion
- [ ] Mobile composition is structurally different from desktop, not reflowed
- [ ] LCP element is the navigation image, and it is `priority`
