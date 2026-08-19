# MASTER PROMPT — RAJMOHAN ARUMUGAM PUBLIC PORTAL

## 0. ROLE

You are the lead product architect, senior UI/UX designer, senior Next.js engineer, accessibility engineer, security engineer, and DevOps engineer for this project.

Build a production-grade public-service and leadership platform for Rajmohan Arumugam.

This is NOT a generic politician template, NOT a simple portfolio, and NOT four unrelated websites.

The product is ONE unified platform with:

1. A cinematic master navigation/entry page.
2. Four visually independent public portals:
   - School Education
   - Tamil Development
   - Information & Publicity
   - MLA / Egmore
3. One shared citizen query/grievance platform.
4. Mobile-number + OTP citizen authentication.
5. One centralized admin/CMS and officer workflow.
6. One shared backend, database, security and deployment architecture.

---

# 1. FIRST: INSPECT THE EXISTING PROJECT

Before changing or creating anything:

- Inspect the entire repository.
- Inspect package.json.
- Inspect the existing Next.js configuration.
- Inspect Tailwind configuration.
- Inspect existing components.
- Inspect existing routes.
- Inspect public assets.
- Inspect `/public/images/`.
- Confirm that `/public/images/navigation.jpg` exists.
- Inspect the two UI/UX repositories already placed in the project folder.
- Identify their installation/configuration and use their capabilities during development.
- Do not delete or overwrite existing work blindly.
- Reuse good existing architecture where appropriate.
- Create a clear migration/refactor plan before destructive changes.

The project already contains:
- UI UX Pro Max Skill:
  https://github.com/nextlevelbuilder/ui-ux-pro-max-skill
- LibreUIUX Claude Code:
  https://github.com/HermeticOrmus/LibreUIUX-Claude-Code

Use both deliberately for UI/UX development. They are development/design tooling, not runtime dependencies.

---

# 2. CORE PRODUCT IDEA

The user enters the website through a single master navigation page.

The master navigation page uses the existing image:

`/public/images/navigation.jpg`

DO NOT generate a replacement background.

DO NOT redesign the supplied background.

DO NOT replace the central subject.

DO NOT unnecessarily crop or alter the composition.

The image is the visual foundation.

Overlay four premium interactive navigation portals around the existing central composition:

01 — SCHOOL EDUCATION
02 — TAMIL DEVELOPMENT
03 — INFORMATION & PUBLICITY
04 — MLA · EGMORE

The four areas must feel like portals into four different digital experiences.

When a user selects one:

Master Navigation
→ transition
→ selected portal
→ completely different visual website experience

The user should feel that they entered a new digital institution, not simply another section.

---

# 3. MASTER NAVIGATION PAGE

Route:

`/`

Primary asset:

`/public/images/navigation.jpg`

The page must prioritize the supplied background image and central subject.

The four navigation boxes should:

- frame the central subject.
- never obscure the important face/body area.
- remain visually balanced.
- work on desktop and mobile.
- be subtle and premium.
- use elegant borders, translucent surfaces, editorial typography, or other refined treatments.
- avoid looking like generic cards.
- have strong hover/focus states.
- support keyboard navigation.
- have meaningful accessible labels.
- use smooth but restrained motion.

Navigation destinations:

`/en/school-education`
`/en/tamil-development`
`/en/information-publicity`
`/en/mla-egmore`

Tamil equivalents:

`/ta/school-education`
`/ta/tamil-development`
`/ta/information-publicity`
`/ta/mla-egmore`

The master page should be visually neutral compared with the four portals.

---

# 4. DESIGN DIRECTION

Use the current White House website as STRUCTURAL inspiration only.

Do NOT clone it.

Do NOT reproduce proprietary layouts, copy, imagery, branding, or exact visual implementation.

Take inspiration from:

- strong government-portal hierarchy
- cinematic hero sections
- editorial typography
- large headlines
- high-authority information presentation
- prominent initiatives
- news/media storytelling
- clear public-service navigation
- disciplined whitespace
- premium institutional composition

Create a distinct Tamil Nadu / TVK-inspired identity.

---

# 5. COLOR SYSTEM

Master palette:

- TVK-inspired deep maroon/red
- TVK-inspired victory yellow
- warm sandal / ivory
- pure white
- deep charcoal / near black

Use the palette with restraint.

Preferred hierarchy:

Sandal / ivory:
- backgrounds
- large editorial surfaces
- cultural sections

White:
- clean surfaces
- content areas
- forms
- cards

Maroon/red:
- authority
- headings
- navigation accents
- important section markers

Yellow:
- CTA accents
- active states
- highlights
- metadata emphasis

Charcoal:
- primary body text
- navigation text
- long-form reading

DO NOT make every section red/yellow.

The overall experience must remain premium, calm, authoritative and readable.

---

# 6. TYPOGRAPHY

Primary display font:

Instrument Serif

Use for:
- hero headlines
- major statements
- department titles
- editorial quotes
- large section headings

Primary UI/body font:

Instrument Sans

Use for:
- navigation
- body copy
- labels
- buttons
- metadata
- forms
- statistics
- citizen query system

Tamil typography must use a proper Tamil-compatible typeface where required.

Do not force Latin fonts to render Tamil.

Typography must be responsive and accessible.

---

# 7. FOUR PORTALS

## 7.1 SCHOOL EDUCATION

Route:

`/en/school-education`
`/ta/school-education`

Visual identity:

Learning
Students
Schools
Teachers
Future
Transformation

Hero:

- cinematic
- modern
- government-grade
- education-focused
- large editorial headline
- strong photography
- restrained TVK palette
- clear CTA

Sections:

1. Hero
2. Education Vision
3. Current Priorities
4. Schools
5. Students
6. Teachers
7. Curriculum
8. Infrastructure
9. Initiatives
10. Education Timeline
11. News & Announcements
12. Resources
13. Citizen Query
14. Footer

Do not invent achievements, statistics, schemes or ministerial claims.

Use verified content only.

---

# 8. TAMIL DEVELOPMENT

Routes:

`/en/tamil-development`
`/ta/tamil-development`

Visual identity:

Tamil
Language
Literature
Heritage
Knowledge
Culture

This should be the most culturally distinctive portal.

Use:

- sandal/ivory
- maroon
- restrained gold/yellow
- Tamil typography
- editorial layouts
- archival/cultural imagery
- subtle heritage-inspired graphic details
- modern composition

Do NOT create cliché cultural decoration.

Avoid excessive:
- temple motifs
- random kolam patterns
- ornamental borders
- fake manuscript textures
- visual noise

Sections:

1. Hero
2. Tamil Vision
3. Official Language
4. Literature
5. Awards
6. Nationalised Books
7. Sorkuvai
8. Students & Youth
9. Tamil Institutions
10. Research
11. Culture & Heritage
12. Global Tamil Engagement
13. News
14. Citizen Query
15. Footer

---

# 9. INFORMATION & PUBLICITY

Routes:

`/en/information-publicity`
`/ta/information-publicity`

Visual identity:

Information
Communication
Media
Public Access
Press
Government Communication

Use a modern editorial/newsroom language.

Characteristics:

- strong headlines
- large media imagery
- press-style layouts
- clean black/white foundations
- maroon authority accents
- yellow highlights
- video/media modules
- highly scannable information hierarchy

Sections:

1. Hero
2. Latest Information
3. Press Releases
4. Minister Statements
5. Government Communication
6. Media
7. Publications
8. Video
9. Photo Archive
10. Announcements
11. Citizen Query
12. Footer

---

# 10. MLA / EGMORE

Routes:

`/en/mla-egmore`
`/ta/mla-egmore`

This is a digital constituency office.

Visual identity:

People
Representation
Development
Community
Public Service
Accessibility

Use strong real-world photography and human-centered storytelling.

Sections:

1. Hero
2. About Egmore
3. My Representation
4. Constituency Development
5. Public Issues
6. Local Initiatives
7. Events
8. Citizen Services
9. News
10. Raise a Concern
11. Track Your Query
12. Contact
13. Footer

Do not turn this into a campaign-style persuasion site.

Keep public-service information factual and clear.

---

# 11. SHARED CITIZEN QUERY PLATFORM

This is a core product feature.

Every portal must have access to the same centralized query system.

Examples:

School Education:
"Raise an Education Concern"

Tamil Development:
"Share a Tamil Development Concern"

Information & Publicity:
"Submit an Information Request"

MLA / Egmore:
"Raise a Constituency Concern"

Do not build four separate backend systems.

Build ONE Citizen Service Engine.

---

# 12. QUERY SUBMISSION FLOW

Flow:

Department
→ Category
→ Subject
→ Description
→ Location
→ Supporting attachments
→ Mobile number
→ OTP
→ Verification
→ Query created
→ Reference ID
→ Status tracking

Example reference:

`EDU-2026-000184`

After submission show:

- success state
- reference number
- selected department
- submission date
- next steps
- track query CTA

---

# 13. MOBILE + OTP AUTHENTICATION

Use Supabase Auth phone authentication.

Citizen flow:

1. Enter mobile number.
2. Send OTP.
3. Enter OTP.
4. Verify.
5. Create authenticated session.
6. Submit or access queries.
7. View query history.

No traditional password is required for citizens.

The citizen dashboard must show:

- My Queries
- Reference IDs
- Department
- Category
- Current Status
- Timeline
- Attachments
- Updates
- Resolution

Never expose sensitive authentication or service-role credentials to browser code.

---

# 14. QUERY STATUS SYSTEM

Default lifecycle:

SUBMITTED
→ RECEIVED
→ UNDER REVIEW
→ ASSIGNED
→ IN PROGRESS
→ RESOLVED

Optional:

NEEDS INFORMATION
REJECTED
CLOSED

Every status change should create a status-history record.

---

# 15. DATABASE ARCHITECTURE

Use Supabase PostgreSQL.

Core tables:

- profiles
- admins
- citizen_profiles
- departments
- query_categories
- queries
- query_attachments
- query_status_history
- query_comments
- otp_sessions
- notifications
- pages
- news
- events
- gallery
- media
- social_links
- site_settings

Core `queries` fields:

- id
- reference_number
- citizen_id
- department_id
- category_id
- subject
- description
- location
- status
- priority
- assigned_to
- created_at
- updated_at
- resolved_at

Use foreign keys and proper indexes.

Use Row Level Security.

---

# 16. ADMIN / CMS

Route:

`/admin`

The admin must be treated as a separate application experience.

Sections:

Dashboard
Queries
School Education
Tamil Development
Information & Publicity
MLA / Egmore
News
Events
Pages
Departments
Gallery
Documents
Citizen Management
Staff / Officers
Analytics
Settings

Admin must support:

- create
- edit
- preview
- publish
- unpublish
- archive
- schedule where needed
- media management
- bilingual content
- query assignment
- query status changes
- officer notes
- citizen communication where approved

---

# 17. ADMIN ROLES

SUPER_ADMIN:
- full access

CONTENT_ADMIN:
- pages
- news
- events
- content

DEPARTMENT_ADMIN:
- assigned department queries
- department content where permitted

MEDIA_ADMIN:
- gallery
- images
- videos

OFFICER:
- assigned queries
- status updates
- permitted internal notes

Apply least privilege.

---

# 18. TECH STACK

Frontend:

- Next.js
- TypeScript
- React
- Tailwind CSS
- shadcn/ui
- Radix UI

Animation:

- GSAP for major transitions, scroll experiences and cinematic interactions.
- Motion/Framer Motion only where useful for micro-interactions.
- Lenis only where it improves the experience and does not hurt accessibility/performance.

Forms:

- React Hook Form
- Zod

Backend:

- Next.js Server Components
- Next.js Route Handlers
- Supabase

Database:

- PostgreSQL

Authentication:

- Supabase Auth

Storage:

- Supabase Storage

Edge:

- Cloudflare

Compute:

- AWS EC2

Load Balancing:

- AWS Application Load Balancer

Containers:

- Docker

Registry:

- Amazon ECR

CI/CD:

- GitHub Actions

Monitoring:

- Sentry
- Cloudflare Analytics
- AWS CloudWatch
- uptime monitoring

---

# 19. PRODUCTION TOPOLOGY

Use:

Internet
→ Cloudflare
→ AWS ALB
→ EC2 fleet
→ Supabase

Recommended production fleet:

- EC2 #1
- EC2 #2
- EC2 #3

Use Docker so all instances run the same image.

Use an Auto Scaling Group.

Use health check:

`/api/health`

or:

`/health`

The ALB must remove unhealthy instances from rotation.

---

# 20. CLOUDFLARE

Cloudflare responsibilities:

- DNS
- CDN
- caching
- WAF
- DDoS protection
- rate limiting
- bot protection
- Turnstile
- edge security

Cache public assets aggressively.

Do not cache personalized citizen/admin responses.

---

# 21. DYNAMIC REQUEST SECURITY

Citizen request:

Citizen
→ Cloudflare
→ Turnstile
→ Next.js API
→ Zod validation
→ authorization
→ rate limit
→ Supabase RLS
→ PostgreSQL

Never trust frontend validation.

Every backend request must validate input again.

Protect against:

- spam
- bots
- repeated submissions
- malformed input
- oversized files
- unauthorized record access
- privilege escalation

---

# 22. MEDIA ARCHITECTURE

Use:

`Supabase Storage`

Buckets/folders:

- navigation
- heroes
- education
- tamil-development
- publicity
- mla
- news
- events
- gallery
- documents

Do not store large media directly in PostgreSQL.

Use Cloudflare R2 later for very large video/media if necessary.

---

# 23. navigation.jpg REQUIREMENT

The master navigation image is:

`/public/images/navigation.jpg`

This is a supplied design asset.

Rules:

- preserve composition
- preserve central subject
- do not generate replacement imagery
- do not unnecessarily crop
- optimize for performance
- use responsive image handling
- maintain visual quality
- build navigation UI over it

The four boxes must be positioned based on the actual image composition.

Do not assume fixed positions without inspecting the image.

---

# 24. IMAGE OPTIMIZATION

Major images should be processed into:

- AVIF
- WebP

Responsive sizes:

- 400px
- 800px
- 1200px
- 1920px

Use Next.js image optimization where appropriate.

Prioritize the master navigation image and each portal hero.

---

# 25. INTERNATIONALIZATION

Build bilingual support from day one.

Locales:

`en`
`ta`

Routes:

`/en/...`
`/ta/...`

Database content should support:

- title_en
- title_ta
- description_en
- description_ta
- content_en
- content_ta

Do not scatter translations inside components.

Create a proper localization/content layer.

---

# 26. DESIGN SYSTEM ARCHITECTURE

Create:

`design-system/MASTER.md`

and portal-specific design definitions:

`design-system/pages/navigation.md`
`design-system/pages/school-education.md`
`design-system/pages/tamil-development.md`
`design-system/pages/information-publicity.md`
`design-system/pages/mla-egmore.md`

MASTER.md defines:

- typography
- spacing
- grid
- color tokens
- accessibility
- motion rules
- component rules
- common navigation
- common buttons
- common forms

Portal files define visual overrides.

Do not allow individual pages to invent unrelated design systems.

---

# 27. MOTION PRINCIPLES

Motion must communicate hierarchy.

Master navigation:

- subtle hover expansion
- depth
- portal focus
- cinematic transition

Portal:

- hero entrance
- scroll reveals
- image transitions
- section transitions
- micro-interactions

Avoid:

- excessive parallax
- unnecessary spinning
- constant floating animations
- slow page transitions
- motion that blocks content

Support:

`prefers-reduced-motion`

---

# 28. ACCESSIBILITY

Target WCAG 2.2 AA where practical.

Requirements:

- semantic HTML
- keyboard navigation
- visible focus
- accessible labels
- proper heading hierarchy
- alt text
- sufficient contrast
- accessible forms
- OTP input accessibility
- error messages
- screen-reader support
- reduced motion
- touch-friendly controls

The four navigation portals must be usable without a mouse.

---

# 29. SEO

Every public page must have:

- title
- meta description
- canonical
- Open Graph
- social metadata
- sitemap
- robots.txt
- structured data where appropriate
- proper heading hierarchy

News pages should use Article structured data.

Events should use Event structured data where applicable.

Person/official profile information should use appropriate structured data where valid.

Do not fabricate structured-data fields.

---

# 30. PERFORMANCE

Target:

- excellent Core Web Vitals
- fast first load
- optimized images
- minimal JavaScript on static pages
- code splitting
- lazy loading below the fold
- edge caching
- optimized fonts
- no unnecessary third-party scripts

Do not sacrifice performance for visual effects.

---

# 31. OFFLINE / FAILURE STATES

Create a polished offline/failure experience.

Provide:

`/offline`

If offline:

- show cached public content where available
- clearly explain that live services require connectivity
- allow retry

Citizen submission must never falsely appear successful while offline.

Admin must fail safely.

---

# 32. ERROR STATES

Design all states:

- loading
- empty
- error
- offline
- unauthorized
- forbidden
- not found
- submission success
- submission failure
- OTP expired
- OTP invalid
- rate limited
- upload failed

Never leave users staring at a blank screen.

---

# 33. CI/CD

Pipeline:

Developer
→ Git
→ GitHub
→ Pull Request
→ GitHub Actions

Checks:

- ESLint
- TypeScript
- unit tests
- integration tests
- Playwright E2E
- accessibility checks
- Lighthouse/performance checks
- production build

Then:

Docker build
→ Amazon ECR
→ rolling deployment
→ EC2 fleet

Environments:

LOCAL
→ STAGING
→ PRODUCTION

Never deploy directly from an unreviewed local machine to production.

---

# 34. TESTING

Unit:

- utility functions
- validation
- query reference generation
- status transitions

Integration:

- auth
- OTP flow
- query creation
- RLS
- file uploads
- admin permissions

E2E:

- master navigation
- all four portals
- Tamil/English switching
- citizen login
- OTP
- query submission
- query tracking
- admin workflow

Visual regression:

- navigation page
- portal heroes
- responsive breakpoints
- critical components

---

# 35. FOLDER ARCHITECTURE

Use a clean structure similar to:

rajamohan-platform/

├── .github/
│   └── workflows/
│       ├── ci.yml
│       ├── build.yml
│       └── deploy.yml
│
├── public/
│   ├── images/
│   │   ├── navigation.jpg
│   │   ├── heroes/
│   │   ├── education/
│   │   ├── tamil/
│   │   ├── publicity/
│   │   ├── mla/
│   │   ├── news/
│   │   └── gallery/
│   ├── fonts/
│   └── icons/
│
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   ├── citizen/
│   │   ├── admin/
│   │   └── api/
│   │
│   ├── components/
│   │   ├── navigation/
│   │   ├── portal/
│   │   ├── heroes/
│   │   ├── education/
│   │   ├── tamil/
│   │   ├── publicity/
│   │   ├── mla/
│   │   ├── citizen/
│   │   ├── admin/
│   │   ├── news/
│   │   ├── events/
│   │   ├── gallery/
│   │   └── common/
│   │
│   ├── lib/
│   │   ├── supabase/
│   │   ├── auth/
│   │   ├── queries/
│   │   ├── storage/
│   │   ├── security/
│   │   └── seo/
│   │
│   ├── data/
│   ├── config/
│   ├── styles/
│   └── middleware.ts
│
├── design-system/
│   ├── MASTER.md
│   └── pages/
│       ├── navigation.md
│       ├── school-education.md
│       ├── tamil-development.md
│       ├── information-publicity.md
│       └── mla-egmore.md
│
├── supabase/
│   ├── migrations/
│   └── seed.sql
│
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
├── scripts/
│   ├── optimize-images.ts
│   └── validate-content.ts
│
├── Dockerfile
├── docker-compose.yml
├── next.config.ts
├── tsconfig.json
└── package.json

---

# 36. CONTENT GOVERNANCE

This is an official/public-facing platform.

Never invent:

- achievements
- statistics
- schemes
- government orders
- ministerial actions
- election facts
- quotes
- dates
- portfolio claims
- awards
- project results

Use verified source material.

Clearly distinguish:

- officially verified
- reported
- proposed
- editorial interpretation

Do not automatically attribute an older departmental scheme to Rajmohan personally.

When content is uncertain, flag it for admin verification instead of publishing an invented claim.

---

# 37. OFFICIAL PORTFOLIO HANDLING

The research collected for this project identifies a broader official portfolio than simply the shorthand "School Education, Tamil Development, Information & Publicity."

The full portfolio research includes:

- School Education
- Archaeology
- Tamil Official Language and Tamil Culture
- Information & Publicity
- Film Technology and Cinematograph Act
- Newsprint Control
- Stationery and Printing
- Government Press

The public-facing architecture can still use the four major experience pillars:

1. School Education
2. Tamil Development
3. Information & Publicity
4. MLA / Egmore

Additional departments must not be falsely omitted if official content requires them. Represent them transparently within the appropriate ministerial ecosystem.

---

# 38. DO NOT OVER-ENGINEER

Do NOT introduce unless there is a real requirement:

- Kubernetes
- microservices
- Kafka
- GraphQL
- multiple databases
- Redis
- complex event-driven infrastructure
- unnecessary separate backend servers

Start with:

Next.js
+ TypeScript
+ Supabase
+ Docker
+ AWS EC2
+ ALB
+ Cloudflare
+ GitHub Actions

Scale only when actual requirements justify it.

---

# 39. DEVELOPMENT ORDER

Do not build randomly.

Follow this order:

PHASE 0
Repository audit + requirements audit

PHASE 1
Master design system

PHASE 2
Master navigation page

PHASE 3
School Education portal

PHASE 4
Tamil Development portal

PHASE 5
Information & Publicity portal

PHASE 6
MLA / Egmore portal

PHASE 7
Shared content architecture

PHASE 8
Citizen authentication + OTP

PHASE 9
Citizen query system

PHASE 10
Citizen dashboard + tracking

PHASE 11
Admin/CMS

PHASE 12
Security + RLS + rate limits

PHASE 13
Bilingual implementation

PHASE 14
SEO + accessibility

PHASE 15
Testing + performance

PHASE 16
Docker + staging

PHASE 17
AWS/Cloudflare production

PHASE 18
Monitoring + backup

---

# 40. CRITICAL DEVELOPMENT RULE

DO NOT jump straight into writing hundreds of components.

Before implementation:

1. inspect repository
2. inspect assets
3. inspect installed packages
4. inspect UI/UX tooling
5. establish design tokens
6. establish route architecture
7. establish data models
8. establish component architecture
9. create the master navigation
10. validate visual direction
11. then scale into the four portals

Do not create duplicate components when a shared component is appropriate.

Do not create generic "AI-looking" UI.

Do not use excessive gradients, glassmorphism, rounded cards or meaningless animations.

Do not use random icons where a typographic/editorial treatment is better.

Do not make every section look identical.

---

# 41. FINAL EXPERIENCE TARGET

The final product should feel like:

A premium government/public-service digital platform
+
editorial political leadership presentation
+
Tamil cultural intelligence
+
modern public information system
+
citizen service portal

It should NOT feel like:

- a template politician website
- a campaign landing page
- a YouTube clone
- an AI-generated dashboard
- four disconnected websites
- a generic government portal

The master navigation is the gateway.

The four portals are independent visual worlds.

The citizen query platform is the shared public-service backbone.

The admin CMS is the operational backbone.

The infrastructure is production-grade.

The content must remain factual and verified.

---

# 42. SUCCESS CRITERIA

The implementation is successful only when:

[ ] Master navigation uses `/public/images/navigation.jpg`.

[ ] Four navigation portals are visually integrated around the existing composition.

[ ] Each portal feels like a different website.

[ ] All portals share one technical platform.

[ ] School Education has a modern hero and full content architecture.

[ ] Tamil Development has a distinctive Tamil cultural/editorial identity.

[ ] Information & Publicity feels like a premium government newsroom.

[ ] MLA / Egmore feels like a digital constituency office.

[ ] All four portals have citizen query functionality.

[ ] Citizen query submission requires mobile OTP authentication.

[ ] Citizens receive a unique reference ID.

[ ] Citizens can track their queries.

[ ] Admins can manage queries.

[ ] Officers can receive assigned queries.

[ ] Query status history is maintained.

[ ] Supabase RLS protects citizen data.

[ ] Turnstile/rate limiting protects public forms.

[ ] Tamil and English are supported from the beginning.

[ ] The website is responsive.

[ ] WCAG-oriented accessibility is implemented.

[ ] SEO is implemented per portal.

[ ] Images are optimized.

[ ] Performance is prioritized.

[ ] Tests exist for critical workflows.

[ ] CI/CD is configured.

[ ] Staging exists before production.

[ ] Production runs through Cloudflare + ALB + Docker + EC2.

[ ] Monitoring and backups are configured.

[ ] No unverified political claims are fabricated.

---

# FINAL INSTRUCTION

Build this project as a serious production system.

Think like:

- a principal product designer
- a senior frontend architect
- a backend architect
- a security engineer
- an accessibility specialist
- a DevOps engineer
- an editorial digital designer

Use the existing project assets and architecture intelligently.

Preserve good existing work.

Do not invent facts.

Do not over-engineer.

Do not rush.

Make the experience visually exceptional while keeping the platform fast, secure, accessible, maintainable and production-ready.
