# TAMIL DEVELOPMENT PORTAL — DESIGN SPECIFICATION

**Routes:** `/en/tamil-development`, `/ta/tamil-development`
**Inherits:** `MASTER.md`.

## 1. VISUAL THESIS

**The most culturally distinctive portal — earned through typography, not ornament.**

The spec is emphatic about what this portal must not be: no temple motifs, no kolam, no fake
palm-leaf texture, no ornamental borders, no manuscript pastiche. That prohibition is not a
limitation to work around — it is the brief. A culture with a two-thousand-year literary tradition
is honoured by **treating its script as the primary visual material**, not by decorating around it.

So: Tamil type is the ornament. Set large, set well, given room.

## 2. PALETTE ALLOCATION

The sand-dominant portal. `sand-100` ground throughout, `sand-200` banding, `sand-300` rules.
`maroon-800` — the deepest maroon, used *only here* — for display headings, giving this portal a
gravity the others do not have. `yellow-600` (the muted hairline yellow, never `yellow-400`) for
rules and markers. White reserved strictly for content surfaces.

This is the only portal where `yellow-400` does not appear at all. Vivid yellow would read as
political; muted gold reads as archival. That distinction is the whole portal.

## 3. TYPOGRAPHY TREATMENT — THE CORE OF THE DESIGN

**On `/ta`, Tamil is not a translation — it is the primary text.** Noto Serif Tamil at
`--text-display`, `+6%` size, `1.28` line-height. On `/en`, Tamil still appears: literary
excerpts, work titles, and institution names are set in Tamil script at display size with the
English gloss beneath at `--text-meta`. The Tamil is never the subtitle.

Bilingual pairing pattern:

```
திருக்குறள்                    ← Noto Serif Tamil, --text-h2, maroon-800
Tirukkuṟaḷ                     ← Instrument Sans, --text-meta, charcoal-700, 0.08em tracking
```

Never the reverse order. Never Tamil in parentheses.

## 4. SECTION TREATMENTS

| # | Section | Layout |
|---|---|---|
| 1 | Hero | Tamil display type as the hero *image* — no photograph. Sand ground, maroon-800 type |
| 2 | Tamil Vision | Single measure, centred, wide leading |
| 3 | Official Language | Two-column prose, `sand-200` band |
| 4 | Literature | Editorial index — work title (Tamil) / period / gloss, hairline rows |
| 5 | Awards | Roll format: recipient, year, citation. Tabular, restrained |
| 6 | Nationalised Books | Dense catalogue list, alphabetical, filterable |
| 7 | Sorkuvai | Word-of-the-day treatment — single large Tamil word, etymology beneath |
| 8 | Students & Youth | Photography returns here, 7/5 asymmetric |
| 9 | Tamil Institutions | Map-adjacent list, no decorative map |
| 10 | Research | Document index with `--text-meta` metadata rows |
| 11 | Culture & Heritage | Full-bleed archival photography, single pull-quote |
| 12 | Global Tamil Engagement | Region-grouped list |
| 13 | News | Editorial index |
| 14 | Citizen Query | Shared `<CitizenQueryBlock department="tamil-development">` |
| 15 | Footer | Shared |

## 5. MOTION

The most restrained of the four. Text reveals by opacity only — Tamil glyphs suffer under
transform-based animation at display sizes, and a script this old should not be made to slide.
The Sorkuvai word cross-fades. Nothing else animates.

## 6. CONTENT GOVERNANCE

**Highest sensitivity in the project.** Literary attributions, award recipients, book titles and
institutional claims are all falsifiable public record. Every entry in §4, §5, §6 and §9 requires
`verification: 'verified'` with a source. No literary work, author, award, recipient, year, or
institution name is authored by the implementation. Sections render as marked structure until
content is supplied.
