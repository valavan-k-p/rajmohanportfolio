# Rajmohan Arumugam — Digital Office. Redesign Plan

Date started: 2026-08-31
Supersedes: docs/PHASE-0-AUDIT.md (kept for history)

---

## 1. What exists today (audit)

| Area | Current state | Decision |
|---|---|---|
| Framework | Next.js 15.5 App Router, React 19, TypeScript strict | **KEEP** |
| i18n | `next-intl` v3, `/en` `/ta`, `localePrefix: 'always'` | **KEEP**, extend |
| Styling | Tailwind v4 CSS-first (`@theme` in `src/styles/globals.css`) | **KEEP** engine, **REPLACE** tokens |
| Motion | `gsap` + `lenis` + `motion` (framer) all client-side | **REMOVE** — brief §2 mandates "almost still" |
| UI primitives | Radix (accordion, dialog, select, tabs, toast, label) | **KEEP** |
| Backend | Supabase (SSR + service), OTP auth, queries API, rate-limit, Turnstile | **KEEP** — real Citizen Services backend |
| Content governance | `Verification` / `Provenance` / `isPublishable` in `src/lib/content/types.ts` | **KEEP & EXTEND** — this is the trust spine |
| Routing | `/` = full-bleed photo with 4 absolutely-positioned portal hotspots; `/[locale]/[portal]` | **REPLACE** (see §3) |
| Content data | `src/data/*.ts` — mixed structure + prose, portal-specific ad-hoc shapes | **RESTRUCTURE** into typed collections |
| Components | ~90 one-off portal components (`EduHero`, `InfoHero`, `MlaHero`, `HeroSection`…) | **REPLACE** with one shared library |
| Fonts | Instrument Serif/Sans + Cormorant + Noto Tamil (5 families) | **REPLACE** with 2 families x 2 scripts |
| Images | 4 optimised assets; heavy raw library in `reference/Pictures/` (~3 GB, 5 folders) | **BUILD PIPELINE** |

### Problems confirmed against the live site (rajmohan-mu.vercel.app)

- `/` is a photograph with the four portals floated over it and hard-coded `01–04` numerals — the client has explicitly asked for both to change.
- Portal titles ship English **and** Tamil concatenated into one string (`"School Education · பள்ளிக் கல்வி"`), so the Tamil site is not Tamil-first — it is bilingual-in-place.
- No `/news`, `/documents`, `/media`, `/search`, `/about` routes exist at all.
- Every portal invents its own hero, section shell, motion file and typography constants.

---

## 2. Handwritten client notes — decoded

Read from `reference/handwritten-notes-0{1,2,3}.jpg.jpeg`. The Tamil lines were cropped and upscaled before reading.

**Sheet 1 — "WEBSITE"**

1. Image — front cover → **change the hero image**
2. "Rajmohan Name font size (Designation)" → **name and designation share one type family**
3. "NO Need Nos. (change to Vertical)" → **drop the 01/02/03/04 numerals; portals become a vertical list**
4. "Add · விபரம் மறுப்பு" → **add a Disclaimer**
5. "Edu — cover photo change"
6. "நிதி மான்யம் · நிதிநிலை அறிக்கை" → **Budget / Demand for Grants** (see §6)
7. "Book design content" → **Books & Publications section, visual**
8. "EM → Assembly · Announcement · Gallery · Press Release" → **EM = Egmore**

**Sheet 2**

- Edu: News · Proceedings · G.O. · Updates · Press Release · Gallery · Budget
- "(1) 5th  (2) 14th  (4) SMC" → SMC = School Management Committee. **"5th"/"14th" unresolved** (§6)
- TD: **தமிழ் வளர்ச்சி** (Tamil Development) · **தொல்லியல்** (Archaeology) · **கலைப் பண்பாடு** (Art & Culture) · **வெளியீடு** (Publications) — all four bracketed to **gallery**

**Sheet 3**

- DIPR: Updates · Announcements · Gallery
- Egmore: Gallery · **Total count / Ward**
- "Perambalur." — written alone, no context. **PENDING CLARIFICATION — no page will be invented.**

> Correction to the master brief: its "adjust/remove the X-related visual treatment" is sheet-1 item 3 — the *numerals*, not the X/Twitter link.

---

## 3. Route map (as built)

```
/                                 -> redirect into a locale
/[locale]                         Home
/[locale]/about                   About
/[locale]/portals                 Portal index

/[locale]/school-education        Portal
        /news  /go  /proceedings  /press-releases  /budget  /updates

/[locale]/tamil-development       Portal   (+ Archaeology, Art & culture,
        /news  /publications  /policy  /go    Books sections on the portal page)

/[locale]/information-publicity   Portal
        /press-releases  /press-notes  /announcements  /go  /publications

/[locale]/egmore                  Portal   (+ Wards & councillors directory
        /news  /announcements  /assembly     on the portal page)

/[locale]/news                    Feed, filtered by portal
/[locale]/news/[slug]             Article
/[locale]/documents               Document centre: search, type, year, department
/[locale]/documents/[slug]        Document page
/[locale]/media                   Photographs by portal, with lightbox
/[locale]/search                  Site search
/[locale]/services                Citizen services (existing Supabase backend)
/[locale]/disclaimer              <- client note 1.4
/[locale]/accessibility
/[locale]/privacy
/[locale]/citizen/login  /citizen/dashboard    noindex
/admin/*                          Unchanged; CMS abstractions only
```

Galleries are sections on each portal page and collected at `/media`, rather
than a route per portal — one gallery system, four filtered views.

Archives are data, not pages: each entry in `PORTAL_PAGES[portal].archives`
declares the `documentType`s it draws, and a single
`/[locale]/[portal]/[archive]` route renders all of them. Adding an archive to
a portal is a data change.

Language switch preserves the path: `/ta/school-education/go` <-> `/en/school-education/go`.

---

## 4. Content model

`src/content/` — typed collections. No prose inside components.

`Source` is the spine. Every factual record carries a `sourceType` from a fixed
union (`government-website` · `government-order` · `assembly-record` ·
`official-press-release` · `official-social` · `news-report` · `editorial`)
plus `sourceName`, `sourceUrl` and dates. `verification` gates publication —
`unverified` never renders in production.

Collections: `News`, `Document` (GO / Proceeding / PressRelease / PressNote /
Announcement / Budget / Publication all share this shape via `documentType`),
`Project`, `GalleryImage`, `GalleryAlbum`, `Publication`, `Person`, `Ward`,
`Councillor`, `SocialLink`, `Department`, `Metric`.

### Data-honesty rule, enforced in the renderer

`<Metric>` accepts `value: string | null`. `null` renders `—` labelled
"Awaiting verified source". There is no code path that renders `0` unless the
true value is zero. No count-up animation exists anywhere in the codebase.

---

## 5. Verified facts (source registry seed)

| Fact | Value | Source |
|---|---|---|
| Name | Rajmohan Arumugam (ராஜ்மோகன் ஆறுமுகம்) | Wikipedia |
| Office | Cabinet Minister, Government of Tamil Nadu | Wikipedia |
| Departments | School Education; Tamil Development and Information | Wikipedia |
| Assumed office (Minister) | 10 May 2026 | Wikipedia |
| Assumed office (MLA) | 4 May 2026 | Wikipedia |
| Constituency | Egmore (AC **No. 16**), **SC** reserved, Chennai district | Wikipedia |
| Parliamentary constituency | Chennai Central | Wikipedia |
| Party | Tamilaga Vettri Kazhagam (TVK) | Wikipedia |
| 2026 result | 53,901 votes · 45.02% · margin 10,804 · turnout 119,738 | Wikipedia |
| Runner-up | Tamilan Prasanna (DMK) 43,097 · 35.99% | Wikipedia |
| Predecessor | I. Paranthamen (DMK) | Wikipedia |
| DIPR official name | Information and Public Relations Department · செய்தி – மக்கள் தொடர்புத் துறை | dipr.tn.gov.in |
| TD official name | Tamil Development Department · தமிழ் வளர்ச்சித் துறை | tamilvalarchithurai.tn.gov.in |

**Election data must be re-confirmed against results.eci.gov.in before the
Egmore constituency profile is marked `verified`.** Wikipedia is a secondary
source and is recorded at `news-report` tier until ECI confirms it.

### Social accounts

| Org | Platform | Handle | Status |
|---|---|---|---|
| School Education | Instagram | `tnschoolsedu` | **verified** — 136K followers, links tnschools.gov.in |
| School Education | X | `tnschoolsedu` | **verified** |
| School Education | Facebook | — | **UNVERIFIED** — only a `/share/` redirect supplied. Hidden. |
| DIPR | Instagram | `tndipr` | pending direct confirmation |
| DIPR | X | `TNDIPRNEWS` | pending direct confirmation |
| DIPR | Facebook | — | **UNVERIFIED** — `/share/` redirect only. Hidden. |
| Tamil Development | Instagram | `tamilvalarchithurai.tn` | pending direct confirmation |

`SocialLinks` renders only records with `verified: true`. Nothing else appears.

---

## 6. Open questions — flagged, not guessed

1. **"Perambalur"** (sheet 3, standalone). No page created.
2. **"(1) 5th (2) 14th"** (sheet 2, beside SMC). There is no class 14, so this
   is unresolved. No content created.
3. **"நிதி மான்யம்"** — reads as either *மான்யம்* (grant) or *மாநிலம்* (state).
   Built as "Budget & Demand for Grants"; label to be confirmed.
4. **Archaeology / Art & Culture under Tamil Development** — requested by the
   client, but the minister's verified portfolio lists only School Education and
   Tamil Development & Information. These are built as *department information*,
   not as *his portfolio*, until confirmed.
5. **Designation wording** — the repo says "Minister for School Education, Tamil
   Development, Information & Publicity"; the official-source wording is
   "School Education; Tamil Development and Information". Using the latter.

---

## 7. Design direction

**Palette** — one warm paper ground, near-black ink, a single deep maroon accent
used sparingly, and hairline rules. No gradients, no glass, no glow. Radii ≤ 2px
except images. Shadows: none, except the mobile menu sheet.

**Type** — two families, each with a matched Tamil companion:

- Display / editorial: **Source Serif 4** + **Noto Serif Tamil**
- UI / metadata: **Inter** + **Noto Sans Tamil**

Name and designation are both set in the display family (client note 1.2). Tamil
is declared *inside the same `font-family` stack*, so a Tamil string on an
English page — and the reverse — always renders in the matching companion face.

**Motion budget** — 120–200ms on opacity, colour and small transforms, for
hover, focus, accordion and dialog only. `prefers-reduced-motion: reduce` sets
every duration to `0.01ms`. The site is designed to be correct with all
animation disabled.

---

## 8. Build order

1. Design tokens, fonts, layout primitives
2. Header · MobileNav · Footer · LanguageSwitcher
3. Content model + source registry + image pipeline
4. Homepage
5. School Education 6. Tamil Development 7. DIPR 8. Egmore
9. News 10. Documents 11. Media 12. Search 13. Citizen Services
14. Tamil localisation pass 15. A11y / perf / QA

---

## 9. Delivery status — 2026-08-31

### Built and verified

| Area | State |
|---|---|
| Design tokens, fonts, motion budget | `src/styles/globals.css`, `src/app/layout.tsx` |
| Header · mobile sheet · footer · language switcher | `src/components/layout/` |
| Component library | `src/components/ui/`, `src/components/content/` |
| Content model + source registry | `src/lib/content/`, `src/content/` |
| Image pipeline | `scripts/image-manifest.mjs` → `npm run images` → `src/content/media/generated.ts` |
| Homepage, About, Portals index | ✅ both languages |
| Four portals + 18 archive routes | ✅ both languages |
| News index + article pages | ✅ |
| Document centre + document pages | ✅ |
| Media galleries + lightbox | ✅ |
| Site search (real index, both languages) | ✅ |
| Citizen services (existing Supabase backend, re-dressed) | ✅ |
| Disclaimer · Accessibility · Privacy | ✅ (client note 1.4) |
| 404, error boundary, sitemap, robots | ✅ |

**Checks passing:** `next build` (96 static pages), `tsc --noEmit`, `eslint .`,
42 unit tests, `validate:content`.

**Measured:** no horizontal overflow at 375 / 768 / 1280 / 1920 on the Tamil
pages (the wider script); name and designation resolve to the same font family;
no console errors; all image and font requests 200.

### Removed

- `gsap`, `lenis`, `motion`, `motion-dom`, `motion-utils`, `d3-geo` — the brief
  caps motion at "almost still" and none was still imported.
- ~90 one-off portal components, replaced by one shared library.
- 152 MB of unreferenced assets moved out of `public/` into
  `reference/legacy-assets/` (gitignored). `public/` is now 6.7 MB.

### Client requests deliberately left unfilled

Each has working UI and an honest empty state naming the real source:

1. **Ward list and councillor count** (note 3) — no official GCC ward-to-AC-16
   mapping located. `src/content/wards.ts` documents exactly what a row needs.
2. **Books and publications** (note 1.7) — the department's catalogue has not
   been supplied.
3. **G.O.s, proceedings, press releases, press notes** — no source PDFs supplied.
4. **SMC material** (note 2) — departmental guidelines not supplied.
5. **DIPR key figures** — no verified departmental figure; the strip is absent
   rather than invented.

### Still pending clarification

1. **"Perambalur"** (note 3, standalone) — no page created.
2. **"(1) 5th (2) 14th"** (note 2, beside SMC) — unresolved.
3. **"நிதி மான்யம்"** vs **"நிதி மாநிலம்"** (note 1.6) — built as Budget.
4. **Facebook accounts** — both supplied links were `/share/` redirects; both
   withheld. Canonical page URLs needed.
5. **DIPR and Tamil Development social handles** — withheld pending direct
   confirmation that the accounts are departmental.
6. **Election data** — re-confirm against results.eci.gov.in to promote the
   Egmore records from `reported` to `verified`.

---

## 10. Mobile, tablet and Tamil optimisation — 2026-09-01

A measurement pass across 360 / 414 / 768 / 1024 / 1440px in both languages.
Everything below was found by measuring the rendered page, not by inspection,
and each fix is now covered by `tests/e2e/responsive.spec.ts` (18 tests).

### Tamil — three real defects

**1. Font-size compounded with nesting depth.** `lang` is inherited, so
`:lang(ta) { font-size: 1.04em }` matched every descendant of the locale
wrapper and multiplied once per level. The same paragraph rendered 17px near
the top of a page and **20.7px six levels down**, and the drift differed per
page. The bump is now applied once, on the locale root, in `rem`
(`[data-locale-root='ta']`), and inherits from there.

**2. Tamil headings carried Latin display tracking.** `tracking-[-0.02em]`
resolved to **-0.8px**. Tamil combining vowel signs (ெ ே ை ொ ோ) hang off the
side of their consonant, so negative tracking slides them into the neighbour.

**3. Tamil headings used Latin display leading.** `leading-[1.06]` gave a 40px
heading a 42px line box; Tamil stacks marks above *and* below the baseline, so
adjacent lines overlapped. Now 1.3.

The cause of 2 and 3 was the same: the corrections sat in `@layer base` and
Tailwind's utilities sit in `@layer utilities`, which wins. They are now
**unlayered**, which beats every layered rule — the one place in the stylesheet
that does this, and the reason is written above the block. Latin typography is
untouched and a test asserts it stays that way.

**4. `Source.conflictNote` was `string`.** It renders in the metadata block, so
two English-only paragraphs were appearing on `/ta/about`. Now `Bilingual`,
checked by the content gate and by a unit test.

### Mobile

| Fix | Detail |
|---|---|
| Touch targets | 25 controls were under 44px — footer links at 19px, search at 32px, language at 38px. `u-tap` grows the hit area with a pseudo-element so small type stays small type; `u-tap-box` grows controls that *are* the box; `u-tap-list` gives coarse-pointer rows 44px. |
| iOS zoom-on-focus | Filter selects and the document search were 15px. Safari zooms below 16px and does not zoom back. Now 16px below the tablet breakpoint (also unlayered — `text-small` was winning). |
| Header overflow | The row ran 16px past a 375px viewport. The Menu label is dropped below `sm`; gaps tighten. |
| Hero order | The photograph came first, putting the name **614px down** — below the fold. Source order is now text then photograph, with no `order` classes; the `lg` grid still puts text left. |

### Tablet

| Fix | Detail |
|---|---|
| Hero height | A full 4:5 frame was **692 × 864px** on a portrait tablet. Capped to 20rem, cropping to a landscape band biased to the subject. (`w-full` is load-bearing — with only `aspect-ratio` and `max-height` the browser derived the *width* and the frame collapsed to 333px.) |
| Document + ward tables | Shown from `md`, but the table needs 48rem and a portrait tablet has ~43rem — it had to be scrolled sideways to read a title. Now stacks until `lg`. |
| Gallery | Two columns at 768px. Now three from `md`, four at `xl`. |
| Header at 1024px | The seven nav labels in **Tamil** ran 837px and pushed the row **175px** past the viewport. The desktop nav now appears at `xl`; a landscape tablet uses the sheet, which fits both languages at any width. |

### Also fixed

`<dl>` in `MetricStrip` had `<p>` siblings of `<dt>`/`<dd>` inside its wrapper
`<div>` — invalid, and a serious axe violation on five routes. The description
lines now live inside the `<dd>`, which is also the more correct semantics.

### Verification

`next build` (96 pages) · `tsc` · `eslint` · 43 unit tests ·
`validate:content` · **92 Playwright tests** (46 desktop + 46 mobile),
including 8 axe runs with zero serious or critical violations.

---

## 11. Mobile menu — root cause and fix

Reported as "menu bar not working in the mobile". Two separate bugs, both real.

### 1. The sheet was twelve pixels wide

`Dialog.Content` carried `max-w-sm`. Tailwind resolves `max-w-<name>` against
the **container** scale and falls back to the **spacing** scale when the name is
not found there. This theme defines `--spacing-sm: 0.75rem` and does not define
`--container-sm`, so `max-w-sm` silently resolved to **12px**.

The menu therefore "opened" — the overlay dimmed the page, scroll locked, focus
moved into the sheet — with a 12px sliver at the right edge and nothing to tap.

Fixed with an explicit `--container-sheet: 24rem` and `max-w-sheet`. A comment
on the container block now states the rule: **any width utility on this site
must use a name that exists in the container scale, or a bracket value.** An
audit found no other occurrence.

This is also why the earlier check missed it: it asserted the links were
present and focus had moved, not that anything had a width.

### 2. Widening the window bricked the whole site

The overlay and content were hidden at `xl` with a CSS class while Radix went
on believing the dialog was open. Radix's modal keeps `pointer-events: none` on
`<body>`, a scroll lock, and `aria-hidden` over the rest of the page for as
long as it thinks something is showing. So widening past 1280px with the menu
open — rotating a foldable, dragging a window wider, un-zooming — hid the sheet
and left **the entire site unclickable**, with nothing on screen to dismiss and
no recovery but a reload. This is the state in the reported screenshot.

**CSS cannot close a modal, because it cannot tell Radix it closed.** The sheet
is now closed by state via a `matchMedia` listener, and the responsive `hidden`
classes are gone from the overlay and the content. A test asserts the media
query and `--breakpoint-xl` describe the same width, so they cannot drift.

A teardown guard also restores `<body>` if the dialog is ever unmounted while
open — a Fast Refresh, an error boundary, a layout remount. Belt and braces,
justified by the severity: the failure mode is a public site that cannot be
clicked.

### Also

- `data-scroll-behavior="smooth"` on `<html>`, clearing the Next.js warning
  about smooth scrolling during route transitions.
- The overflow test now waits on `document.fonts.ready`; measuring before web
  fonts land caught a transient overflow once in a full run.

### Verification

`next build` · `tsc` · `eslint` · 43 unit tests · `validate:content` ·
**102 Playwright tests** across desktop and mobile, including five that cover
this menu specifically: open/navigate/cleanup, close by button, close by
Escape, widen-past-breakpoint, and breakpoint agreement.
