# PHASE 19 — FINAL QA

**Date:** 2026-08-20
**Build:** Next.js 15.5.23 · React 19 · Node 22 target

---

## 1. GATE RESULTS

Run with `npm run verify` (typecheck → lint → unit → production build, into a
throwaway `BUILD_DIR` so a running dev server is never clobbered).

| Gate | Result |
|---|---|
| TypeScript (`strict`, `noUncheckedIndexedAccess`) | **pass**, 0 errors |
| ESLint (`next/core-web-vitals` + `next/typescript`) | **pass**, 0 errors |
| Unit tests | **24 passing** |
| Content governance | **pass** — 0 errors, 46 sections pending |
| Production build | **pass** |

## 2. ROUTES — VERIFIED AGAINST A PRODUCTION SERVER

| Route | Status | Note |
|---|---|---|
| `/` | 200 | master navigation |
| `/en/school-education` … `/ta/mla-egmore` | 200 | 8 portal routes |
| `/en/citizen/login`, `/ta/citizen/login` | 200 | |
| `/en/citizen/dashboard` | 200 | redirects to login without a session |
| `/admin/dashboard` | 200 | redirects to login without an admin session |
| `/api/health` | **503** | correct — see below |
| `/sitemap.xml` | 200 | 9 URLs, both locales, `hreflang` alternates |
| `/robots.txt` | 200 | admin, api and citizen disallowed |
| `/nonexistent` | 404 | bilingual not-found page |

**`/api/health` returning 503 is the designed behaviour**, not a defect: in
production without Supabase configured the instance reports `degraded` so the
ALB drains it rather than routing citizens to a broken page. It returns 200
once credentials are present.

## 3. MEASURED, NOT ASSUMED

Claims in this project were verified by measurement. The record:

- **Palette** — sampled from `navigation.jpg`; all 11 contrast pairs computed.
  The photographed flag red measures **3.13:1** and therefore cannot carry
  text. Body text measures **16.52:1**.
- **Portal placement** — DOM-measured at 375, 800, 1280 px. Subject band
  (x 38–63%) clear at every one.
- **No overlay on the photograph** — `filter: none`, `opacity: 1` asserted at
  runtime and in E2E.
- **Mobile** — `overlapsImage: false`; portals sit entirely below the image.
- **Tamil** — `/ta/tamil-development` renders **5,911 Tamil glyphs** with
  `lang="ta"`.
- **Image optimisation** — 3.0 MB source → **131 KB** AVIF at 1920 px (23×).

## 4. OPEN ITEMS

Ordered by what would block a real launch.

### 4.1 Blocking — external dependencies

| # | Item | Impact |
|---|---|---|
| 1 | **No Supabase project** | Migrations and RLS are written but never executed. OTP, query submission, dashboard and admin are code-complete and **untested against a live database**. |
| 2 | **No content** | All 46 portal sections render as marked structure. Nothing is fabricated (spec §36), so the portals are structurally complete and textually empty. |
| 3 | **No Turnstile keys** | Bot protection falls back to a development bypass. `assertRuntimeEnv()` refuses to boot production without the secret, so this cannot ship silently. |

### 4.2 Known limitation — rate limiting is per-instance

`src/lib/security/rate-limit.ts` stores counters in memory. That is correct for
one instance and **wrong for the three-instance EC2 fleet** in PDF §13: each
instance keeps its own counters, so the effective limit is 3× the configured
one. The interface is already async, so a shared store (Redis, or a Supabase
table with a TTL) drops in without touching call sites.

This is deliberately recorded rather than silently accepted — spec §38 forbids
adding Redis without a real requirement, and the requirement only becomes real
at the second instance.

### 4.3 Not yet built

- **Query submission form UI.** The API, validation, schema, RLS and reference
  generation are complete and tested; the multi-step form component is not.
- **Admin CRUD screens** beyond the dashboard — queries list, news, events,
  pages, gallery, citizens, staff, settings. The role model, capability matrix
  and RLS behind them are complete.
- **Deployment workflow** (`deploy.yml`) — ECR push and rolling EC2 deploy.
  `ci.yml` is complete: lint, typecheck, unit, E2E + axe, build, secret scan.
- **Sentry / CloudWatch wiring.** `SENTRY_DSN` is in the env contract; no
  client is installed.
- **Docker image never built.** Docker is not installed on this machine, so the
  Dockerfile is authored but **unverified**. It must be built once in CI before
  being trusted.

### 4.4 Verified-by-build only

E2E specs (`tests/e2e/navigation.spec.ts`) cover master navigation, all four
portals, both locales, language switching, keyboard operation, subject-clearance
at four viewports, heading structure and axe checks on four routes. They are
written and wired into CI but **have not been executed locally** — Playwright
browsers are not installed here. First real run happens in CI.

## 5. SECURITY POSTURE

Deliberate decisions, recorded so a future maintainer does not "fix" them:

1. **`otp_sessions` has no RLS policy at all.** Service-role only. Any policy
   would be a way to read OTP state with a stolen anon key.
2. **Internal officer notes are filtered in the RLS policy**, not the UI. A
   frontend bug cannot expose them to a citizen.
3. **Reference numbers and status history are database triggers.** A client can
   never supply a reference number, and no code path can skip writing history.
4. **The public tracker requires reference + last 4 phone digits.** References
   are sequential and therefore enumerable; reference alone would let anyone
   walk `EDU-2026-000001` upward and read strangers' grievances.
5. **Turnstile fails closed.** An unreachable verifier rejects the request
   rather than becoming an open door.
6. **`server-only` guards the Supabase server module**, so importing it into a
   client component fails the build instead of leaking the service-role key.
7. **Error responses are opaque codes.** Provider messages are logged, never
   returned — they reveal whether a number is registered.
