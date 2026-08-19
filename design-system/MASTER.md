# MASTER DESIGN SYSTEM — RAJMOHAN PUBLIC PORTAL

**Status:** Phase 1 deliverable. **This document is the final design authority.**
`ui-ux-pro-max` and `LibreUIUX` inform it; where they disagree with this file, this file wins.
Portal files in `design-system/pages/` may override *treatment* — never tokens, never
accessibility floors.

---

## 0. GOVERNING PRINCIPLE

The palette is **derived from the supplied asset, not invented.** Every core colour below was
sampled from `public/images/navigation.jpg` and then adjusted only as far as contrast compliance
required. This is why the master navigation reads as one photograph rather than a UI pasted on
top of one.

Applied profile: **`inclusive-design`** (ui-ux-pro-max) — *"best for public services, education,
government"* — which sets a **7:1 contrast target**, one level above WCAG 2.2 AA. We hold that
floor for all body and heading text.

---

## 1. COLOUR

### 1.1 Sampled source values

| Sampled from asset | Hex | Role |
|---|---|---|
| Sky, upper field | `#FFF6D9` | the literal ground the nav portals sit on |
| Building stone, left wing | `#F7DDB4` | deeper sandal |
| Flag red, upper band | `#FE4933` | **decorative only — 3.13:1, fails AA** |
| Flag yellow, lower band | `#FED427` | **decorative/fill only — 1.33:1** |
| Crowd, bottom strip | `#090804` | near-black source for charcoal |

### 1.2 Token scale

```
--sand-50   #FFFBF0    lightest wash
--sand-100  #FFF6D9    ← sampled sky. Primary editorial surface.
--sand-200  #F7DDB4    ← sampled stone. Section banding.
--sand-300  #E9C48F    borders on sand, dividers

--white     #FFFFFF    content surfaces, forms, cards

--maroon-500 #B3241A   6.10:1 on sand — large text ≥24px only
--maroon-600 #96170F   8.01:1 on sand — headings, links, primary UI  ✅
--maroon-700 #7A100B  10.19:1 on sand — authority marks, active state ✅
--maroon-800 #5E0B08  12.73:1 on sand — deepest emphasis ✅

--yellow-400 #FED427   fills, markers, underlines. NEVER carries text.
--yellow-600 #C9A200   the only yellow safe as a hairline on light

--charcoal-900 #1A1714  16.52:1 on sand — body text ✅
--charcoal-700 #3A342D  11.37:1 on sand — secondary text ✅
--charcoal-500 #6B625A   metadata on white only — verify per use
```

### 1.3 Verified contrast matrix

| Foreground | Background | Ratio | Verdict |
|---|---|---|---|
| `charcoal-900` | `sand-100` | **16.52** | AAA |
| `charcoal-700` | `sand-100` | **11.37** | AAA |
| `maroon-700` | `sand-100` | **10.19** | AAA |
| `maroon-600` | `sand-100` | **8.01** | AAA |
| `maroon-500` | `sand-100` | 6.10 | AA only — large text ≥24px |
| `white` | `maroon-700` | **11.02** | AAA |
| `white` | `charcoal-900` | **17.85** | AAA |
| `charcoal-900` | `yellow-400` | **12.46** | AAA — this is how yellow carries text |
| `maroon-700` | `yellow-400` | **7.69** | AAA |
| `flag red #FE4933` | `sand-100` | **3.13** | ❌ FAILS — decorative only |
| `yellow-400` | `sand-100` | **1.33** | ❌ FAILS — never text |

### 1.4 Hierarchy rules

- **Sand** is the default editorial ground. Not white. White is for *content surfaces* that sit
  on sand — forms, cards, tables, article bodies.
- **Maroon** signals authority and navigation. It is not a decoration. If maroon appears, it
  means *this is official* or *this is actionable*.
- **Yellow is scarce.** Active state, one CTA per viewport, metadata emphasis, section markers.
  A page with yellow in more than three places has failed.
- **Charcoal** carries all sustained reading.
- The raw flag red and raw yellow appear **only** in the photograph and in the emblem. They are
  never re-used as UI colour, because both fail contrast and because re-using them would make the
  interface compete with the asset.

> **The spec's hard rule, restated:** do not turn a page into a red/yellow political poster.
> The measured consequence is the same conclusion — those two colours *cannot* carry an interface.

---

## 2. TYPOGRAPHY

**Display:** Instrument Serif — hero headlines, department titles, editorial quotes, section
headings.
**UI / body:** Instrument Sans — navigation, body, labels, buttons, metadata, forms, data.
**Tamil:** Noto Serif Tamil (display) + Noto Sans Tamil (UI/body).

Tamil is **not** a fallback bolted onto a Latin stack. It is a first-class parallel stack, chosen
because Noto Tamil carries a genuine serif/sans pair that mirrors the Latin hierarchy — so a Tamil
page has the same voice as its English counterpart rather than a degraded one. Latin fonts are
never forced to render Tamil (master prompt §6).

### 2.1 Scale (fluid, `clamp()`)

| Token | Min → Max | Use |
|---|---|---|
| `--fs-display` | 3.25 → 6.5rem | master nav wordmark, portal hero |
| `--fs-h1` | 2.5 → 4rem | page title |
| `--fs-h2` | 1.875 → 2.75rem | section |
| `--fs-h3` | 1.375 → 1.75rem | subsection |
| `--fs-lead` | 1.125 → 1.375rem | standfirst |
| `--fs-body` | 1.0625rem | sustained reading — never below 17px |
| `--fs-meta` | 0.875rem | metadata, labels |
| `--fs-micro` | 0.75rem | eyebrow, index numerals — uppercase, `0.18em` tracking |

Tamil renders at **+6%** size and **+0.12** line-height against Latin at the same level: Tamil
glyphs carry more vertical complexity and need the room to stay legible.

### 2.2 Rules

- Line length 62–74 characters. Enforced with `max-width`, not by hand.
- Display serif: `letter-spacing: -0.02em`, `line-height: 0.98–1.05`.
- Body sans: `line-height: 1.65`.
- Never centre more than two consecutive lines of body text.
- Numerals in data contexts use `font-variant-numeric: tabular-nums`.

---

## 3. SPACING & GRID

8px base. `4 8 12 16 24 32 48 64 96 128 192` — nothing between, no magic numbers.

12-column grid, `--gutter: clamp(1rem, 4vw, 2.5rem)`, `--measure-max: 1440px`.
Editorial sections may break the grid asymmetrically (7/5, 8/4, 5/7) — that is the intent, and it
is what keeps the four portals from reading as one template.

## 4. BREAKPOINTS

| Token | Width | Intent |
|---|---|---|
| `sm` | 480px | large phone |
| `md` | 768px | tablet portrait — **master nav composition changes here** |
| `lg` | 1024px | tablet landscape / small laptop |
| `xl` | 1280px | desktop |
| `2xl` | 1536px | wide |

Breakpoints are chosen from the *composition*, not from device marketing names. The `md` boundary
exists because that is the width at which the navigation image's flanking columns collapse into
the central subject.

---

## 5. COMPONENTS

**Buttons** — three ranks only. `primary` (maroon-700 fill, white text, 11.02:1), `secondary`
(hairline maroon-600 on transparent), `ghost` (charcoal-700 text, underline on hover). Minimum
target **44×44px**. Yellow is available as *one* accent fill per viewport, and only with
charcoal-900 text on it.

**Cards** — `border-radius: 2px`. Effectively square. The spec forbids "overly rounded"; the
institutional register demands restraint. Elevation is a hairline border plus ground-tone shift,
not a drop shadow. Shadows are permitted only for genuinely floating layers (dialog, popover).

**Forms** — label always visible, never placeholder-as-label. Error text is `maroon-700`, paired
with an icon so colour is never the sole signal (`inclusive-design`: `--color-symbols: true`).
44px minimum control height. Fieldsets grouped and legended.

**Navigation** — see `pages/navigation.md`.

**Icons** — Lucide, 1.5px stroke, `currentColor`, `24px` default. Used sparingly. Where a
typographic or editorial treatment communicates better than a glyph, use the typography — the spec
forbids "random icons where an editorial treatment is better."

---

## 6. MOTION

| Token | Value |
|---|---|
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` |
| `--ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` |
| `--dur-micro` | 160ms — hover, focus |
| `--dur-ui` | 280ms — state change |
| `--dur-portal` | 620ms — master nav → portal transition |

**GSAP** owns portal transitions, hero sequences, and scroll-driven storytelling.
**Motion** owns micro-interactions and state changes.
**Lenis** is used on long editorial portals only, and is disabled outright under reduced motion.

Motion must communicate hierarchy. Nothing floats, pulses, or spins idly. No parallax beyond a
single subtle depth layer on the master navigation.

**`prefers-reduced-motion: reduce` is not a downgrade path — it is a supported mode.** Transforms
resolve to opacity-only or to instant state. Lenis is not initialised. The portal transition
becomes a 120ms cross-fade. Nothing becomes unreachable, and no information is lost.

---

## 7. ACCESSIBILITY FLOOR

Non-negotiable, enforced in CI (Phase 15):

- Text contrast **≥7:1** body and headings; ≥4.5:1 permitted only for text ≥24px.
- Every interactive element reachable and operable by keyboard, in DOM order.
- Focus is **always visible**: 2px `maroon-700` ring, 2px offset. Never `outline: none` without a
  replacement of equal or better visibility.
- Semantic HTML first. ARIA only to fill a genuine gap.
- One `h1` per page; heading levels never skip.
- Every image has `alt`; decorative images get `alt=""`.
- Form errors announced via `aria-live="polite"` and tied by `aria-describedby`.
- Colour is never the only carrier of meaning.
- Targets ≥44×44px.
- Language switches carry `lang` and `hreflang`.

**The four master-navigation portals must be fully operable without a mouse.** This is called out
separately in both specs and is treated as a release gate, not a nice-to-have.

---

## 8. WHAT THIS SYSTEM REFUSES

Drawn directly from spec §38 / §40 and binding on every portal:

- No glassmorphism. No gradient-on-gradient. No pill-shaped everything.
- No card grid as a default answer to "how do I lay out this section."
- No decorative motion.
- No fabricated statistic, quote, date, award, or scheme name — see §9.
- No temple motifs, kolam, palm-leaf texture, or ornamental borders on the Tamil portal.
- No section that looks like the section above it.

---

## 9. CONTENT GOVERNANCE (binding)

Every content record carries:

```ts
verification: 'verified' | 'reported' | 'proposed' | 'editorial' | 'unverified'
```

`unverified` **does not render in production.** It renders in authoring and staging with a visible
marker. This is a build-level guarantee, not an editorial convention — see
`docs/PHASE-0-AUDIT.md` §H-7.

No pre-existing departmental programme is attributed to Rajmohan personally without a `verified`
record carrying a source.
