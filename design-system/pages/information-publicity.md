# INFORMATION & PUBLICITY PORTAL — DESIGN SPECIFICATION

**Routes:** `/en/information-publicity`, `/ta/information-publicity`
**Inherits:** `MASTER.md`. Applied profile: `editorial-grid-magazine` (ui-ux-pro-max).

## 1. VISUAL THESIS

**A working newsroom, not a press-release archive.**

This portal has a different job from the other three: they *present*, this one *publishes*. Its
design must survive twenty new items a week without degrading. That means the layout is a real
editorial grid with defined slots and weights — lead, secondary, brief — and new content flows
into it rather than being hand-placed.

Density is a feature here. This is the one portal permitted to be information-dense.

## 2. PALETTE ALLOCATION

Black-and-white foundation, per spec. `white` ground, `charcoal-900` type, `sand-100` used *only*
as a section divider band — the inverse of the other portals. `maroon-700` for kickers, section
labels, and the masthead rule. `yellow-400` for exactly one thing: the "LATEST" flag on breaking
items. Its scarcity is what makes it read as urgent.

## 3. TYPOGRAPHY TREATMENT

The most conventionally journalistic of the four. Instrument Serif for headlines, set tight
(`-0.02em`, `0.98` leading) and ranged left. Instrument Sans for kickers, bylines, datelines, and
standfirsts. Kickers are `u-eyebrow` in `maroon-700`. Datelines are `.u-tabular` `--text-meta` in
`charcoal-500`.

Headline hierarchy is by **size and weight only** — never by colour. A newsroom that colours its
headlines has stopped being one.

## 4. SECTION TREATMENTS

| # | Section | Layout |
|---|---|---|
| 1 | Hero | Lead story, 8/4 — full-bleed image left, headline + standfirst right |
| 2 | Latest Information | 3-col index, lead item double-width, `yellow-400` LATEST flag |
| 3 | Press Releases | Reverse-chronological table: date · title · department · PDF |
| 4 | Minister Statements | Pull-quote format, attribution + date, one per row |
| 5 | Government Communication | Two-column prose on `sand-100` band |
| 6 | Media | Logo/outlet index, external links, `rel="noopener"` |
| 7 | Publications | Document grid with type + size + language metadata |
| 8 | Video | 16:9 poster grid, facade-loaded — **no third-party player script until click** |
| 9 | Photo Archive | Masonry, lazy, keyboard-navigable lightbox with focus trap |
| 10 | Announcements | Dense dated list |
| 11 | Citizen Query | Shared `<CitizenQueryBlock department="information-publicity">` — labelled "Submit an Information Request" |
| 12 | Footer | Shared |

## 5. MOTION

Almost none, deliberately. News content must not animate in — it delays reading and it reads as
promotional. Permitted: 160ms hover underline on index items; lightbox open/close at
`--duration-ui`. No scroll reveals anywhere in this portal.

## 6. PERFORMANCE NOTE

This portal carries the project's heaviest media load. Video §8 uses a facade pattern (poster
image + click-to-load) so no embed script is fetched on page load. Photo archive §9 is
virtualised beyond 40 items. Both are hard requirements, not optimisations — a newsroom that
loads slowly does not get read.

## 7. CONTENT GOVERNANCE

Press releases, statements, and announcements are the most consequential content in the project:
a fabricated ministerial statement is a serious harm, not a placeholder. Every item requires
`verification: 'verified'` and a source document reference. **No statement, quote, release title,
date, or attribution is authored by the implementation under any circumstances.** Structure ships
empty with a visible marker.
