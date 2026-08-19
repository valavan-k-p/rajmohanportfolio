# PHASE 0 — REPOSITORY & REQUIREMENTS AUDIT

**Date:** 2026-08-20
**Auditor:** Principal engineer (Claude Opus 5)
**Status:** Complete — no blocking questions. Proceeding to Phase 1.

---

## A. CURRENT PROJECT STATE

**Greenfield.** The repository contains no application code.

```
rajmohan/
├── .git/                    initialised 2026-08-20 (this session), no commits yet
├── .gitignore               Next.js-oriented
├── .claude/                 12 skills · 8 agents · 7 commands (dev tooling, 11 MB)
├── images/
│   └── navigation.jpeg      4095×2305, 9.4 MP, 3.0 MB
└── prompt/
    ├── MASTER_PROMPT_RAJMOHAN_WEBSITE.md          26 KB — read in full
    └── Rajmohan_Master_Website_Architecture.pdf   9 pp — read in full
```

Absent: `package.json`, `next.config.*`, `tsconfig.json`, Tailwind config, `src/`, `app/`,
`components/`, `public/`, `design-system/`, `supabase/`, `tests/`, `.github/`, `Dockerfile`,
any lockfile, any `.env`.

**Consequence:** the "preserve existing work / plan migrations before destructive changes"
requirements (master prompt §1) are satisfied vacuously. There is nothing to preserve and no
refactor risk. Everything is additive.

---

## B. EXISTING ARCHITECTURE

None in code. Architecture is defined entirely by the two specification documents, which were
cross-read and are **mutually consistent**. Both mandate:

- ONE Next.js application (explicitly *not* four projects — PDF §25)
- Master navigation at `/` over the supplied image
- Four visually independent portals under `/[locale]/`
- One shared Citizen Service Engine
- One shared Admin/CMS
- Supabase (PostgreSQL + Auth + Storage)
- Cloudflare → AWS ALB → EC2 Docker fleet → Supabase

---

## C. EXISTING DEPENDENCIES

None. Local toolchain verified:

| Tool | Version | Note |
|---|---|---|
| Node | 24.14.1 | exceeds Next.js 15 requirement |
| npm | 11.12.1 | selected package manager (no pnpm/yarn present) |
| git | 2.52.0 | ok |
| Python | 3.14.4 | used for image analysis / optimisation scripts |
| Docker | **not installed** | Dockerfile authored in Phase 17 cannot be built locally |

---

## D. EXISTING UI COMPONENTS

None. To be created from scratch.

---

## E. EXISTING DESIGN SYSTEM

None in the repo. Design authority is defined but not yet written: `design-system/MASTER.md` is
required and does not exist. This is the Phase 1 deliverable.

**Development tooling is installed and verified working** (project-local, `.claude/`):

- **ui-ux-pro-max** — search engine smoke-tested, returns real records. Local data:
  88 styles · 192 product palettes · 192 reasoning profiles · 74 font pairings ·
  119 UX guidelines · 105 icons · 25 chart types · 17 GSAP presets · 22 stack configs.
- **LibreUIUX** — skills `design-principles`, `design-masters`, `design-movements`,
  `brand-systems`, `premium-saas-design`; agents `design-master`, `brand-architect`,
  `visual-historian`, `frontend-developer`, `ui-visual-validator`, `performance-engineer`.

Per PDF §20 these inform implementation; **`design-system/MASTER.md` remains final authority.**
They are dev/design tooling and must NOT become runtime dependencies.

---

## F. EXISTING ASSETS — navigation.jpeg COMPOSITION ANALYSIS

Inspected directly, not assumed. **4095×2305 px, ratio 1.7766 (≈16:9), JPEG/RGB, 3.0 MB.**

**Subject:** single male figure, white short-sleeve shirt, arms crossed, facing camera.
Occupies horizontal **x ≈ 38–63%**, head crown at **y ≈ 27%**, body runs to the bottom edge.

**Background:** colonial-era public building (Egmore-area civic architecture), warm sandal/ivory
grade, sun flare upper-right. TVK flags (red/yellow, elephant emblem) mid-left and mid-right.
Dense crowd across the bottom strip.

**Measured detail map** (luminance sigma; `.` flat / `o` moderate / `#` busy):

```
        0%       25%       50%       75%      100%
  0%    ....................   <- sky, entirely flat
 13%    ....................
 26%    .........##.........   <- subject head enters centre only
 40%    ........##o.........
 53%    .oooooooo##ooo#oooo.   <- building cornice begins
 66%    ##o###o#....o####o##   <- flags + facade
 80%    o##oo########o######   <- crowd
 93%    #oo##o########o###o#
```

**Measured luminance map** (0 dark → 9 bright):

```
  0%    99999999999999999999
 26%    99999999978999999999
 46%    99999999834899999999
 66%    86755679999997675358
 86%    22222224534542222222   <- crowd is dark
```

### Findings that drive Phase 2

1. **Two clean flanking columns exist:** `x 2–35%` and `x 65–98%`, across `y 8–46%`. Both are
   flat (sigma < 8) and contain no subject, flag, or architectural detail. The four portals
   therefore resolve naturally to **2 stacked left + 2 stacked right**, framing the subject's
   head and shoulders without touching him. This satisfies "frame the central subject / never
   obscure the face" from both specs.

2. **The upper half is near-white (luminance 8–9).** This is the decisive constraint: white text
   is unusable there, and the conventional dark-scrim treatment would destroy the image the spec
   orders us to preserve. Portals must therefore use **dark ink — charcoal body, maroon accent —
   directly on the sky**, with hairline rules and minimal translucent surfaces. No heavy scrims.
   This is fortunate: it is exactly the sandal/charcoal/maroon hierarchy the palette already
   prescribes, so preserving the asset and honouring the palette are the same decision.

3. **The bottom strip is dark (luminance 1–4)** — the crowd. Anything placed there would need
   light ink. Nothing is planned there; it stays clear.

4. **Mobile cannot reuse desktop placement.** At narrow widths the flanking columns collapse into
   the subject. Master prompt §39 explicitly forbids the four cards covering the central subject.
   Mobile therefore gets a distinct composition: image anchored to the subject via
   `object-position`, portals as a stacked editorial list below the fold-line, not overlaid.

**Asset handling:** the file will be **copied** (never modified or regenerated) to
`public/images/navigation.jpg` to satisfy the path both specs mandate. Original retained.

---

## G. EXISTING BACKEND INTEGRATION

None. No Supabase project, URL, keys, or migrations exist. Migrations and typed clients can be
authored offline; they cannot be *executed* until credentials are supplied. Not blocking for
Phases 1–7.

---

## H. CONFLICTS FOUND AND RESOLVED

| # | Specification says | Reality | Resolution |
|---|---|---|---|
| 1 | Read `prompt/architecture.md` | Does not exist; architecture is `Rajmohan_Master_Website_Architecture.pdf` | Read the PDF in full (9 pp). Same document, different container. No spec content lost. |
| 2 | Confirm `/public/images/navigation.jpg` exists | Asset is `images/navigation.jpeg` — different dir and extension | Copy to `public/images/navigation.jpg` in Phase 1. Identical bytes, no re-encode. |
| 3 | Preserve existing work, plan migrations | Repo is empty | Vacuous. All work is additive. |
| 4 | PDF §10 lists `users` + `citizen_profiles` | Master prompt §15 lists `profiles`, `admins`, `citizen_profiles` | Follow **master prompt** (superset). Supabase supplies `auth.users` natively, so a bespoke `users` table is redundant and would duplicate identity. |
| 5 | Execution prompt phases 0–19; master prompt §39 phases 0–18 | Numbering differs | Follow the **execution prompt** (0–19) — newer, and a superset. |
| 6 | Public architecture = 4 pillars | §37: real portfolio also includes Archaeology, Film Technology & Cinematograph Act, Newsprint Control, Stationery & Printing, Government Press | `departments` table models **all** portfolios; the 4 pillars are the *experience* layer only. Additional departments surfaced transparently, never falsely omitted. |

### H-7 — THE MATERIAL GAP: NO CONTENT SOURCE EXISTS

Both specs repeatedly instruct *"use the project's supplied research/content"* and forbid
inventing achievements, statistics, schemes, quotes, dates, awards, government orders, or
ministerial actions.

**No such research or content file is present in the repository.** The only inputs are the two
specification documents and one photograph.

This is not a blocker, because both specs already prescribe the behaviour for exactly this case
(execution §14 and §42; master §36): *create a clearly marked content placeholder rather than
inventing facts.*

**Adopted as a standing project rule:**

- Every content slot ships as a typed, CMS-backed placeholder carrying an explicit
  `verification: 'unverified' | 'reported' | 'verified' | 'editorial'` field.
- The build renders an unmistakable authoring affordance for unverified content, and
  **`verification: 'unverified'` is blocked from production rendering by default.**
- **Zero** statistics, quotes, dates, achievements, or scheme names will be authored by me.
- No pre-existing departmental programme will be attributed to Rajmohan personally.

Structure, layout, motion, accessibility, security and infrastructure are fully buildable today.
Only the *words and numbers* await the client. Supplying a research/content document at any point
lets the content layer ingest it without structural change.

---

## I. REQUIRED MIGRATIONS

None — nothing to migrate. Forward-only Supabase migrations to be authored from Phase 7.

---

## J. SEQUENCING NOTE

The mandated 0–19 order is sound and will be followed. One observation: Phase 2 (Master
Navigation) is the project's highest-risk visual deliverable and the validation gate for the
entire design direction (master prompt §40 step 10 — *validate visual direction* before scaling
into the portals). Phase 2 will therefore end with an explicit visual-direction checkpoint before
Phase 3 begins.

---

## CHECKPOINT

| Gate | Result |
|---|---|
| Lint | n/a — no code yet |
| Typecheck | n/a — no code yet |
| Tests | n/a — no code yet |
| Specs read in full | both (MD 26 KB + PDF 9 pp) |
| Asset inspected | measured, not assumed |
| Tooling verified | smoke-tested, returns live data |
| Conflicts identified | 7 found, 6 resolved, 1 standing rule adopted |
| Blocking questions | **none** |

**Next:** Phase 1 — Master Design System.
