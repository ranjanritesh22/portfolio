# CLAUDE.md — Portfolio

The working spec for `riteshranjan.dev`. Read PART C before changing any
content; §C1 and §C3 are the two rules that protect the thing this site is
for.

---

# PART A — WHAT WE ARE BUILDING

## A1. Purpose

A personal portfolio for **Ritesh Ranjan**, targeting **Senior Frontend
Engineer** roles at product MNCs, product startups and remote-first companies,
while being open to full-stack scope.

The site is distributed as a **cold link** — dropped into a Twitter/X DM to a
founder, a LinkedIn message to a hiring manager, an email to an HR contact. It
must survive a 30-second recruiter skim *and* reward a CTO who reads for ten
minutes. Those are different readers; the section order serves both (§A3).

This repo is **public and is itself a work sample**. Every dependency is a
claim. Someone will open `package.json`, and the list should be short enough
that each entry survives a "why is this here?".

## A2. Non-negotiables

1. **No unverifiable number.** Every figure traces to §C3.
2. **No dead links and no promises.** A `planned` link renders nothing.
3. **Fast.** A slow frontend portfolio discredits the frontend claim (§C4).
4. **Accessible.** Keyboard-operable throughout, visible focus, AA contrast in
   both themes.
5. **No flashiness.** No scroll reveals, no count-up numbers, no animation
   library, no testimonials, no skills bars.

## A3. Positioning — the whole argument

The failure mode is reading as *a frontend dev overreaching*. The fix is
ordering and evidence, never adjectives. The site never says "passionate about
full-stack" or "aspiring". It shows the work and lets the reader conclude it.

**Frontend depth lands before breadth, and this ordering is not negotiable.**
Depth is what makes him competitive against other frontend candidates; breadth
is what unlocks the scope he wants. Reversed, he reads as a generalist and
loses on both counts.

Section order and the proof each one carries:

| # | Section | Carries |
|---|---|---|
| 1 | Hero | Role, level, location, contact. A two-sentence intro (D19). |
| 1b | Experience | Moved up under the hero (D14). Knack / Brane / Keka, each with its logo. |
| 2 | Selected work | Aura, then Job Switch Agent. Depth and judgement. The full-stack claim is *demonstrated here, before it is stated anywhere*. |
| 3 | How far I take a product | The ownership table — four layers, each citing a specific artefact. Placed after the work so it reads as a summary of evidence, not an opening assertion. |
| 4 | More work | Six compact cards. Range, and a consistent standard across very different sizes. |
| 5 | Tech stack | Eight groups of tools with logos, mirroring the résumé's skills. Moved below the work (D19). |
| 7 | How I work | Values, each pointing at something checkable. The last line is a self-critique on purpose. |
| 8 | Contact | The only place intent is stated outright. |

Two supporting mechanisms:

- **Every backend fact is attached to a consequence, never to a logo.** Not
  "Supabase, Postgres, Workers". Instead: *RLS removed the API layer.* *The
  Worker budget is why three.js is two dynamic boundaries deep.* Consequences
  prove comprehension; logos prove exposure.
- **`domains` on every project** renders a small strip on each card. Scanning
  eight cards, a reader sees Backend, Data model and Infra recur across
  unrelated codebases. That reads as a pattern and costs zero words.

---

# PART B — ARCHITECTURE

## B1. Stack (do not substitute without discussion)

| Concern | Choice | Why |
|---|---|---|
| Framework | Next.js 16.3, App Router, RSC | Matches Aura. Every route statically generated. |
| React | 19.2 | Server Components by default is the whole performance strategy. |
| Language | TypeScript 5.9, `strict` | A malformed project entry is a build error, not a broken card. |
| Styling | Tailwind v4.3, CSS-first `@theme` | Matches storefront-ui. Tokens are real custom properties. |
| Components | Hand-rolled, 8 primitives | His headline credential is building design systems. Using someone else's copy-paste primitives would contradict it. Radix would be more code than it replaces here. |
| Fonts | Newsreader + Inter + JetBrains Mono, via `next/font/google` | A serif display over a sans body is what makes "editorial" legible in a second. Self-hosted, `size-adjust` fallbacks, zero CLS. |
| Long-form | `@next/mdx`, build-time | Two case studies. Velite or Contentlayer would be infrastructure larger than the content it serves. |
| Structured content | Typed TS modules in `content/` | Compiler and tests police it. **No frontmatter** — it would be a second, untyped source of truth for metrics. |
| Class utility | A 6-line `cn()` | No `clsx`, no `cva`, no `tailwind-merge`. A closed 8-component set has no override-collision problem to solve. |
| Icons | Inline SVG for UI; `simple-icons` for tool logos | UI icons are hand-drawn. Tool logos come from `simple-icons`, imported only by Server Components, so it ships zero client JS (D13). |
| Tests | Vitest | Content invariants, not component coverage. See §C2. |
| Deploy | Vercel + custom domain | Next 16 is first-party; `next/og` and static generation need no config. |

**Why not Cloudflare Workers, given he ships Aura there:** Aura's own decision
log records production scars from the OpenNext adapter — PPR disabled after
Worker hangs and corrupt RSC streams, middleware pinned, `keep_names: false`.
Betting the one asset that must never break on those exact bugs is a bad
trade. The competence is demonstrated *in the Aura case study* instead. Since
the site is fully static with no runtime data fetching, moving later is small
and reversible.

## B2. Repository layout

```
app/           layout (fonts, theme script, skip link), page, globals.css
content/       types.ts is the contract; everything else is typed data
components/
  primitives/  Container Section Tag MetricList LinkButton ProjectImage
               ThemeToggle icons BrandIcon — the only files allowed raw Tailwind spacing
  home/        Hero, project cards, ownership table, experience, contact
  case-study/  (phase 4)
lib/cn.ts
tests/         content invariants
```

## B3. The content contract

`content/types.ts`. Three parts carry real weight:

- **`ProjectLink` is a discriminated union**, not a boolean. A missing link has
  three meanings: `available` (an anchor), `private` (a muted chip carrying its
  reason — silence would leave a reviewer wondering why the flagship has no
  source link), `planned` (renders nothing at all).
- **`ProjectImage.src: null`** is the normal state until screenshots exist and
  renders a composed placeholder. `kind` is required, so Aura's day-one design
  PNGs are labelled mockups and cannot be passed off as product screenshots.
- **`caseStudy?`** is optional, so the "Read the case study" link cannot point
  at a page that has not been written.

## B4. Theming

Ten semantic tokens, redefined once under `:root[data-theme="dark"]`. Components
reference token names only — never a raw hex, never a Tailwind palette step.
`@theme inline` makes Tailwind emit `var(--text-1)` rather than copying the hex,
so one attribute flip re-themes the page. A blocking script in `<head>` sets the
attribute before first paint, so there is no flash.

Light is the default: this link gets opened from an inbox on a corporate laptop
in the middle of the day.

---

# PART C — ENGINEERING RULES

## C1. The three things that must never be conflated

**This is the most important rule in the repo.** Three separate bodies of work
keep collapsing into one because they all involve commerce frontends and design
systems:

| # | Thing | Lives in | Links |
|---|---|---|---|
| 1 | **Knack Systems internal storefront platform** — slot/outlet framework, 72 primitives, 74 Storybook stories, **7 gateway adapters**, normalizer chain, 706-case suite, Smart Quick Order, Electrolux Spartacus + Avantor ATG migrations | `content/experience.ts`, **only** | None. Employer work. Nobody expects client code. |
| 2 | **`storefront-ui`** — personal open-source package | `content/projects.ts` | Public repo |
| 3 | **Hermes** — personal B2B and B2C storefront template | `content/projects.ts` | None — private repo |

The 72/74/706/7 figures belong to **#1 and only #1**.

**Why it matters:** `storefront-ui` is public. A reviewer who greps it for
"adapter" finds nothing — its README lists "no data fetching" as an explicit
non-goal. At that moment every other number on the site becomes suspect.

`tests/no-conflation.test.ts` makes this a red build. It was verified by
deliberately introducing the conflation and watching four tests fail.

## C2. What the tests are for

Not component coverage — a static content site does not earn that. They assert
things a human reviewer will miss on the fiftieth read:

- Knack's claims never appear in `projects.ts`, and do appear in the Knack role.
- `storefront-ui` never claims an adapter, a gateway or a data layer.
- Experience never borrows a project's figures.
- No `available` link lacks an `https://` href; no `private` link leaks one.
- Every featured project has a case study to link to.
- The words "coming soon" appear nowhere.

## C3. Verified metrics — the only source

Counted from source on 2026-09-21. **A number not in this table does not ship.**
Re-count rather than trusting memory.

**Aura** (`frontend-realm/auraOS`, private, 92 commits / 51 days)
38 page routes · 33 API routes · 227 components · 594 TS/TSX files · ~111k lines
· 43 migrations · **46 tables, all 46 RLS-enabled** · ~170 policies · **914 test
cases** in 47 files · `rank.ts` is 148 lines · 3,445-line DECISIONS.md
Measured: 200-node 3D tree → 4 draw calls, 71,988 triangles, 60fps median, 1.2ms layout.

**Job Switch Agent** (`ranjanritesh22/job-switch-agent`, private, 36 commits)
**638 test cases** in 58 files · 425 TS files · 24 page routes · 3 apps + 7
packages · ~47k lines · 22 typed tools · 16 workflows · 81-entry decision log
Live run: 686 jobs stored → 527 rule-rejected → 30 shortlisted → **0 model calls**.

**storefront-ui** (public) — **72 component folders · 72 stories · 440 test
cases** · 635 files · ~25.6k lines · 158 exports
**Hermes** — 16 routes · 50 components · 336 tests + 4 Playwright specs · 11 ADRs
**StadiumX** — 13 routes · 29 components · 120 tests
**LuckyU** (formerly Parchi) — 9 routes · 33 components · 7 migrations · 0 tests
**healthdecode** — 4 serverless functions · 22 files
**promptOS** — 20 tests · 22 files

> The résumé cites 74 Storybook stories for Knack (#1). `storefront-ui` has 72.
> Different codebases, no conflict.

## C4. Performance budget

Measured on the production build, 2026-09-21:

- **First-load JS: 139 KB gzip.** This is the Next 16 + React 19 App Router
  floor. Application code contributes ~4 KB of it — one client component
  (`ThemeToggle`). Verified that no content data reaches a client chunk.
- The plan's original "< 100 KB" target was not achievable on this framework.
  It was wrong when written, and is recorded here rather than quietly dropped.
- What is actually defended: every route `○ (Static)`, exactly one client
  component, no chart library, no animation library, no icon package, no
  runtime MDX, fonts self-hosted with metric fallbacks.
- Lighthouse ≥ 98 on all four categories is the exit criterion for Phase 7.

## C5. Conventions

- Content is data. Nothing user-visible is hardcoded in a component.
- Only `components/primitives/` may use raw Tailwind spacing utilities.
  Everything else composes `Section` and `Container`. That single rule is what
  keeps vertical rhythm from drifting across eight sections.
- Semantic tokens only. A raw hex in a component is a bug.
- Server Components by default. A new `"use client"` needs a reason in §D.
- Comments explain *why*, never *what*.

## C6. Commands

```
pnpm dev          # dev server
pnpm build        # production build — must be clean before any commit
pnpm start        # serve the production build
pnpm typecheck    # tsc --noEmit
pnpm test         # vitest run — the content invariants
```

## C7. Never

- Never attach Knack's numbers to a public repo (§C1).
- Never add a metric that is not in §C3.
- Never render a link to something that does not exist.
- Never present Aura's design mockups as product screenshots.
- Never add a dependency without a line in §D saying why.
- Never a contact form, a blog, a CMS, or a filterable index in v1.

---

# PART D — DECISION LOG (append only)

**D1.** Next.js 16 + Tailwind v4 over a static-site generator. The repo is a
work sample; it should be built in what the résumé claims.

**D2.** Hand-rolled primitives, no shadcn/ui, no Radix. On a portfolio whose
headline credential is design systems, copy-pasted primitives contradict the
claim. There are no dialogs or comboboxes here; Radix ships runtime JS for
interaction problems a static document does not have.

**D3.** `cn()` instead of `clsx` + `tailwind-merge`. Merge exists to fix
unconstrained `className` override collisions. A closed eight-component set
does not have that problem; shipping it anyway is cargo cult.

**D4.** Newsreader + Inter over Geist. Geist is Vercel's font and Aura's font —
on a portfolio it reads "I used the template", and it would blur Aura's brand
into his own. A serif/sans split reads *publication*; sans-only reads *product*.

**D5.** `ProjectLink` as a discriminated union, not `enabled: boolean`. A
boolean forces a choice between a dead link and silence. The union adds a third
and better state: an honest reason. Adopted after the first pass shipped
booleans.

**D6.** Light theme default. The reader is opening an emailed link on a
corporate laptop at midday.

**D7.** Vercel, not Cloudflare Workers. See §B1 — Aura's own decision log
documents the OpenNext adapter bugs, and the portfolio is the wrong place to
bet on them.

**D8.** Structured content in `.ts`, prose in `.mdx`, no frontmatter.
Frontmatter would be a second untyped source of truth for the exact numbers
§C1 exists to protect.

**D9.** The performance budget in the plan (< 100 KB) was wrong. Recorded in
§C4 with the measured figure rather than quietly restated.

**D10.** `caseStudy` is optional on `Project`, so the home page cannot link an
unwritten case study. This is what keeps the site shippable after Phase 3.

**D12.** Colour tokens were picked by eye and three of six pairs failed AA —
muted text was unreadable on the subtle surface, and neither theme's control
borders reached 3:1. Replaced with values solved for the target ratio against
the *harder* of the two backgrounds. `border` and `border-strong` were split:
decorative rules stay quiet, interactive boundaries meet 1.4.11.
`tests/contrast.test.ts` reads the stylesheet and asserts all twelve pairs,
because eye-picked neutrals fail quietly.

**D11.** D10 did not hold, and shipped two 404s. The field gates the link, but
nothing checked that the slug corresponded to a file, so setting it early
defeated the guard silently. `tests/links-resolve.test.ts` now asserts the file
exists. The lesson is the general one: a rule enforced by remembering is not
enforced, and every guard needs a test that fails when the guard is bypassed.


**D13.** Tech stack with logos moved directly under the hero, ahead of Selected
work, at his request; the old Capabilities section was folded into it. This
knowingly overrides §A3's depth-before-breadth order: a recruiter skimming for
keywords should find them before scrolling, and the case studies still carry
the evidence. Logos come from `simple-icons` (Server Components only, so client
JS was unchanged, measured). Brand colours fall back to the heading colour below
1.5:1 against the chip surface, a check that `tests/brand-color.test.ts` keeps
tied to the stylesheet.

**D14.** Experience moved to sit directly under the tech stack, ahead of the
projects, and an employer-logo strip added below them, at his request. The
logos are 200×200 marks self-hosted in `public/companies/`, one per role, and
`tests/company-logos.test.ts` fails if a role's logo file is missing.

**D15.** Aura's `live` link switched from `planned` to `available` once the
production deployment at `auraos.frontendrealm.com` was confirmed serving
(HTTP 200, redirects to `/login`). The app is auth-gated and holds personal
financial data, so a visitor lands on the sign-in screen, not a demo; the
card's private-repo reason and the case study carry the rest.

**D16.** Hermes's card was rewritten around the template positioning, using
only claims checked against the repo: B2C shop plus B2B layer, and CMS-block
composition (ADR 0006). "No coding" was deliberately left out — blocks cover the
home page only and the content is still in-repo JSON. Its `code` link is
`private`, not `available`: `ranjanritesh22/hermes-ecommerce` is a private repo
(confirmed by the owner; signed-out requests return 404). A first pass linked it
after a mistaken visibility check, so a repo's visibility is verified against
the API, not a page fetch.

**D17.** StadiumX's repo (`ranjanritesh22/cricketX`) was made private by the
owner; the GitHub API returns 404 signed out. Its `code` link moved from
`available` to `private` and its status to `private`, so the card no longer
links to a 404.

**D18.** `ProjectImage.video` added so a card can carry a short demo clip, with
`src` as its poster. Native `<video controls preload="none">`, click to play,
never autoplay: autoplaying motion needs a pause control and a reduced-motion
check, i.e. a client component, and §A2 rules out flashiness anyway. StadiumX's
34.6 s, 2940-wide, 11 MB screen recording was re-encoded to 1280-wide H.264,
no audio, faststart, 770 KB. `tests/project-images.test.ts` fails if a video
file is missing or has no poster.

**D19.** Tech stack moved from under the hero to after More work, reversing
D13's placement; the "Where I've worked" logo strip from D14 removed; the hero
intro cut from a 60-word résumé summary to two sentences. The target is now
full-time roles at US companies, startups and product companies, whose readers
hire on shipped work and want the gist in seconds. The logo strip repeated the
Experience section, which still shows each employer's logo, so
`tests/company-logos.test.ts` still applies. HealthDecode and promptOS got real
screenshots, captured from their local dev servers. LuckyU needs Supabase to
run, so its screens were captured against a throwaway local mock of the
Supabase REST API serving its own `003_seed.sql` catalogue, with no change to
its repo; the seed has no photos, which is why the cards read "No photo yet".

**D20.** AI-assisted development made visible, at his request: a third hero
sentence, an "AI-assisted development" stack group (Claude Code, plus agentic
coding, AI code review, AI-assisted debugging and spec-driven development), and
a How I work principle. The claim is kept to what a reviewer can check: all
nine project repos track a CLAUDE.md (verified 2026-09-26), and four of them
plus this one are public. No speed-up figure is stated — none was measured, and
§C3 applies. It is scoped to personal projects; nothing says the employer roles
used an agent.

**D21.** A headshot added to the hero, at his request, reversing the hero's
original "no photo". For a cold link to a US hiring manager a face makes the
page, and the person, easier to remember. The source was a 4000×3000 phone
photo stored sideways; it was rotated, cropped to a square and resized to a
480px JPEG (about 45 KB), checked for GPS metadata (none). It is `priority`
because it sits above the fold, and it is also the Person JSON-LD `image`.

**D22.** Favicon added, at his request: his "R" mark as `app/icon.png` (192px)
and `app/apple-icon.png` (180px), picked up by Next's file convention with no
metadata code. The source had a semi-transparent smudged halo that looked dirty
on a light tab bar, so it was cropped and flattened onto solid black.

---

# PART E — PHASES

| Phase | Scope | State |
|---|---|---|
| 0 | Scaffold, config, CLAUDE.md | **DONE** |
| 1 | Design tokens + 8 primitives + theme toggle | **DONE** |
| 2 | Content layer + invariant tests | **DONE** |
| 3 | Home page, all eight sections | **DONE** |
| 4 | Case study: Aura (MDX pipeline + layout + write-up) | **DONE** |
| 5 | Case study: Job Switch Agent | **DONE** |
| 6 | Real screenshots and figures | blocked — needs screenshots |
| 7 | SEO, OG images, Lighthouse, a11y | **DONE** |
| 8 | Domain, DNS, launch | blocked — needs the domain |
| 9 | Project demos — Storybook, healthdecode, Aura URL | separate track |

---

# PART F — MILESTONE LOG

## Phases 0–3 — Foundation through home page — **DONE**

### F1. Goal
A complete, sendable home page: tokens, primitives, typed content, and all
eight sections, with the conflation guard in place before any content shipped.

### F2. Delivered
- Next.js 16.3.5, React 19.2.8, Tailwind 4.3.3, TypeScript strict.
- `globals.css`: ten semantic tokens × two themes, `@theme inline`, 1.25 type
  scale, focus ring, reduced-motion block.
- Fonts: Newsreader, Inter, JetBrains Mono via `next/font/google`, self-hosted.
- 8 primitives + 8 inline icons. One client component.
- `content/`: `types.ts`, `profile.ts`, `projects.ts` (8 projects),
  `experience.ts` (3 roles + education), `capabilities.ts` (4 groups, 4
  ownership layers, 5 principles).
- Home page: hero, selected work, ownership table, more work, experience,
  capabilities, how I work, contact, footer.
- `tests/no-conflation.test.ts` — 15 assertions.

### F3. Verified
- `pnpm build` clean; both routes `○ (Static)`.
- `tsc --noEmit` clean.
- 15/15 tests pass. **The guard was verified by deliberately adding "706" and
  "7 gateway adapters" to `storefront-ui` and confirming four tests fail.**
- Production HTML inspected: all 8 sections render, the `private` link state
  renders, "coming soon" appears 0 times.
- First-load JS measured at 139 KB gzip; no content data in any client chunk.

### F4. Out of scope, deliberately
Case-study pages (Phase 4–5) · real images (Phase 6) · OG images and metadata
(Phase 7) · the domain (Phase 8) · a blog · a contact form · a project index.

## Phases 4–7 — Case studies, SEO and accessibility — **DONE**

### F2. Delivered
- MDX pipeline, `/work/[slug]` with `dynamicParams = false`, four content
  blocks (`Decision`, `TradeOff`, `Figure`, `KnownLimits`).
- Both case studies written — ~1,550 and ~1,400 words, three decisions each,
  and a "What I'd do differently" section in both.
- OG images via `next/og`: one shared template, three cards.
- `metadataBase`, canonicals, `summary_large_image`, JSON-LD `Person`,
  `sitemap.xml`, `robots.txt`, `/resume` redirect, 404 page.
- Contrast tokens re-solved; `tests/contrast.test.ts` added.

### F3. Verified
- 10 static routes. 30 tests pass across 3 files.
- Every internal link returns 200 against the production build.
- All three OG routes return `image/png` at 1200×630, ≤ 60 KB.
- One `h1`, heading order unbroken, `lang="en"`, skip link, no image
  without `alt`.
- All twelve contrast pairs meet AA. **Verified by lightening a token and
  watching two assertions fail.**

### F5. Open items
- Confirm the exact domain to buy or point.
- Confirm a Twitter/X handle for `profile.links`.
- Add `public/resume.pdf` — the hero links to it and it does not exist yet.
- Aura's live URL is confirmed (`https://auraos.frontendrealm.com`, D15); the `live` link is `available`.
