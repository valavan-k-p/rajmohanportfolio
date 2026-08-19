# MLA / EGMORE PORTAL — DESIGN SPECIFICATION

**Routes:** `/en/mla-egmore`, `/ta/mla-egmore`
**Inherits:** `MASTER.md`.

## 1. VISUAL THESIS

**A digital constituency office — a place where something gets done, not a place that persuades.**

The spec draws a hard line: this must not become campaign propaganda. The design enforces that
structurally rather than relying on editorial restraint. Two rules do most of the work:

1. **The citizen's own task outranks the representative's record.** "Raise a Concern" and "Track
   Your Query" sit above the fold and are reachable from every scroll position. Achievements, if
   any are ever verified, sit below them.
2. **No hero portrait.** The other three portals may open on photography of the minister; this one
   opens on **Egmore** — the place and the people. A constituency office is identified by its
   constituency.

This is the most utilitarian portal, and that is the correct register for it.

## 2. PALETTE ALLOCATION

`sand-50` ground — the warmest, most approachable of the surfaces. White content cards with
`sand-300` hairlines. `maroon-600` (not 700 — a lighter, less severe authority) for headings.
`yellow-400` for the two citizen-action CTAs only. `charcoal-700` for body, slightly softer than
the charcoal-900 used elsewhere.

The overall effect should be closer to a well-run public office than to a ministry.

## 3. TYPOGRAPHY TREATMENT

The plainest of the four. Instrument Serif used sparingly — section headings only, never for
emphasis or pull-quotes. Instrument Sans carries most of the portal, including subheads. Service
information (hours, address, contact, procedure) is set at `--text-body` minimum, never
`--text-meta`: this is the content people actually come for, and shrinking it to look tidy would
be a design failure.

## 4. SECTION TREATMENTS

| # | Section | Layout |
|---|---|---|
| 1 | Hero | Egmore photography, not portrait. Headline + the two citizen CTAs inline |
| 2 | About Egmore | Two-column prose, constituency facts as a definition list |
| 3 | My Representation | Plain statement of role and remit. Factual register, no superlatives |
| 4 | Constituency Development | Project index: name · status · ward. Table, not cards |
| 5 | Public Issues | Category grid linking directly into a pre-filtered query form |
| 6 | Local Initiatives | Editorial list with photography |
| 7 | Events | Dated list, upcoming first, past collapsed. `Event` structured data |
| 8 | Citizen Services | The functional core — service name, what it needs, how long, where it goes |
| 9 | News | Compact index |
| 10 | Raise a Concern | Shared `<CitizenQueryBlock department="mla-egmore">`, expanded inline — not a link out |
| 11 | Track Your Query | Reference-number lookup, works **without login** (reference + mobile last 4) |
| 12 | Contact | Office address, hours, phone, map link. Highest-contrast block on the page |
| 13 | Footer | Shared |

## 5. MOTION

Minimal. This portal is used by people trying to solve a problem, often on poor connections and
older devices. Hover states and the query form's step transitions only. No scroll reveals, no
GSAP sequences, no Lenis. It should feel instant.

## 6. ACCESSIBILITY EMPHASIS

The likeliest portal to be reached by the widest ability range and the lowest-end devices in the
project. Additional floors beyond `MASTER.md` §7:

- Every service in §8 is fully described in text — never icon-only.
- The §11 tracker is operable with keyboard alone, start to finish, and returns status as text,
  not colour.
- Contact details in §12 are selectable text, never baked into an image.
- Target size raised to **48×48px** throughout this portal.

## 7. CONTENT GOVERNANCE

The highest political-sensitivity surface in the project. **No development project, completion
figure, fund allocation, ward statistic, event, or constituency claim is authored by the
implementation.** §4 and §6 in particular render as marked empty structure until `verified`
records with sources are supplied. Nothing in this portal may imply an outcome that has not
occurred.
