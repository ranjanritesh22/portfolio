# riteshranjan.dev

My portfolio. Built so that the repository is worth reading too, since anyone
evaluating me for a frontend role is as likely to open this as the site.

## What it is

A static Next.js site: one home page, two case studies. It is text-first and
quiet on purpose — it gets sent as a cold link and has to work for a recruiter
skimming for thirty seconds and for an engineer reading for ten minutes.

## How it is built

- **Next.js 16** (App Router, React Server Components) — every route is
  statically generated.
- **Tailwind v4**, CSS-first. Ten semantic colour tokens, redefined once for
  the dark theme. Components never reference a raw hex.
- **TypeScript, strict.** Everything the site displays is typed data in
  `content/`, so a malformed entry is a build error rather than a broken card.
- **Eight hand-rolled primitives.** No component library. Building this out of
  someone else's copy-paste primitives would sit badly next to a résumé that
  claims design-system work.
- **One client component** — the theme toggle. Nothing else needs to hydrate.

## Why the content is typed rather than written into components

Because it lets a test enforce the thing I most need enforced.

Three bodies of work in my history all involve commerce frontends and design
systems, and they keep getting conflated: an internal storefront platform I
built for an employer, an open-source package of my own, and a personal B2B
commerce app. Their numbers are different. Attaching the employer platform's
figures to the public package would be the kind of error that, once spotted,
makes every other number on the site suspect.

`tests/no-conflation.test.ts` asserts the separation in both directions. I
verified it by introducing the error on purpose and watching it fail.

The same idea covers the rest: no metric that is not in the audit table in
`CLAUDE.md`, no link to something that does not exist, and a `private`
repository link that says so rather than quietly vanishing.

## Running it

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build        # production build
pnpm typecheck
pnpm test         # content invariants
```

## Not in scope

No blog, no CMS, no contact form, no filterable project index, no analytics
beyond page views. Each of those is a week I would rather spend on the case
studies, which are the part that actually does the convincing.

`CLAUDE.md` holds the full spec, the decision log and the phase plan.
