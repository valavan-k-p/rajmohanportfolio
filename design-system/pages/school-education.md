# SCHOOL EDUCATION PORTAL — DESIGN SPECIFICATION

**Routes:** `/en/school-education`, `/ta/school-education`
**Inherits:** `MASTER.md`. Overrides *treatment* only — never tokens, never accessibility floors.

## 1. VISUAL THESIS

**Clarity and forward motion.** Education is the portfolio with the widest public — parents,
students, teachers — so this portal is the most plainly legible of the four. Its distinguishing
move is not colour, it is **structure**: an insistent, visible grid, because a grid reads as
order, and order is what a school system promises.

Where the other portals are atmospheric, this one is *organised*.

## 2. PALETTE ALLOCATION

Ground `white` (not sand — this portal is the brightest of the four, the "daylight" portal).
`sand-100` bands separate major sections. `maroon-700` for headings and section markers.
`yellow-400` reserved for exactly two things: the active timeline node, and the single
"Raise an Education Concern" CTA. `charcoal-900` body.

Deviation from master: white-dominant rather than sand-dominant. Rationale — the other three
portals are sand-grounded; education needs to feel like a lit classroom, and the contrast between
portals is itself the point (each must "feel like a new website").

## 3. TYPOGRAPHY TREATMENT

Instrument Serif at `--text-display` for the hero, but set **tight and left-aligned**, not
centred — this portal is a document, not a poster. Section headings at `--text-h2` sit on a
`sand-300` hairline that runs the full grid width. Statistics use `.u-tabular` at `--text-h1`
with a `--text-meta` label beneath, never the reverse.

## 4. SECTION TREATMENTS

Each must look different from its neighbour (`MASTER.md` §8). Assigned:

| # | Section | Layout |
|---|---|---|
| 1 | Hero | Full-bleed photograph, headline overlaid lower-left, 8/4 split |
| 2 | Education Vision | Centred single column, `u-measure`, generous leading — a statement page |
| 3 | Current Priorities | Numbered editorial list, hairline dividers. **Not cards.** |
| 4 | Schools | Asymmetric 7/5 — image left, standfirst right |
| 5 | Students | Full-bleed photograph with pull-quote |
| 6 | Teachers | 5/7 mirror of Schools — deliberate rhythm, not repetition |
| 7 | Curriculum | Two-column prose, drop cap, `sand-100` ground |
| 8 | Infrastructure | Data band — tabular figures on `charcoal-900` ground, white text (17.85:1) |
| 9 | Initiatives | Staggered 2-col, alternating offsets |
| 10 | Education Timeline | Horizontal scroll-driven (GSAP), vertical stack below `md` |
| 11 | News & Announcements | 3-col editorial index, lead item double-width |
| 12 | Resources | Dense link list, `--text-meta`, grouped by audience |
| 13 | Citizen Query | Shared `<CitizenQueryBlock department="education">` |
| 14 | Footer | Shared |

## 5. MOTION

Scroll reveals: opacity + 12px rise, 280ms, 60ms stagger, fires once. The timeline is the only
GSAP scroll-driven sequence. Nothing else moves on scroll.

## 6. CONTENT GOVERNANCE

Every statistic in §8 Infrastructure and every entry in §10 Timeline requires
`verification: 'verified'` with a source. **Until supplied, these sections render their structure
with a visible unverified marker and are excluded from production builds.** No enrolment figure,
school count, scheme name, or date is authored by the implementation.
