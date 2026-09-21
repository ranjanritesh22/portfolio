import type { Project } from "./types";

/**
 * Array order is display order.
 *
 * Every metric below was counted against the source in the audit recorded in
 * CLAUDE.md §C3. If a number here is not in that table, it does not ship.
 *
 * Note for anyone editing: the Knack Systems storefront platform — the slot/
 * outlet framework, the 72-primitive design system, the seven gateway adapters
 * and Smart Quick Order — is *employer* work and belongs in content/experience.ts.
 * It is not `storefront-ui` and it is not `hermes`. tests/no-conflation.test.ts
 * fails the build if those numbers appear in this file. See CLAUDE.md §C1.
 */
export const projects: Project[] = [
  {
    slug: "aura",
    name: "Aura",
    tagline: "A personal life OS — four modules on one Postgres schema.",
    summary:
      "Finance, Travel, Career and a Job Pipeline in a single app, built solo and deployed to Cloudflare Workers. Every table sits behind row-level security, which is why there is no per-entity API layer at all: the client talks to Postgres and the database decides what it is allowed to see.",
    year: "2026",
    status: "private",
    featured: true,
    tech: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Supabase / Postgres",
      "TanStack Query",
      "three.js",
      "MapLibre GL",
      "Cloudflare Workers",
    ],
    domains: ["frontend", "state-data", "backend", "data-model", "infra", "ai"],
    metrics: [
      { value: "46 / 46", label: "tables behind RLS", note: "~170 policies across 43 migrations" },
      { value: "914", label: "unit tests", note: "47 files, Vitest" },
      { value: "38 / 38", label: "pages are Server Components", note: "plus 33 API routes" },
      { value: "4", label: "draw calls for a 200-node 3D tree", note: "71,988 triangles at 60fps median" },
    ],
    links: [
      {
        kind: "code",
        status: "private",
        reason: "Private repository — it holds my own financial data. The case study covers the architecture instead.",
      },
      { kind: "live", status: "planned", note: "A seeded public demo is a later phase." },
    ],
    cover: {
      src: null,
      kind: "screenshot",
      alt: "Aura's job pipeline Kanban board, showing eight stage columns",
      caption:
        "The job pipeline board. A reorder writes exactly one row, because position is a sortable string rather than an index.",
    },
    caseStudy: "aura",
  },

  {
    slug: "job-switch-agent",
    name: "Job Switch Agent",
    tagline: "A local-first job search agent that spends nothing to say no.",
    summary:
      "Polls ATS boards and a job-alert mailbox, then filters deterministically before any model sees a posting. The language model extracts data; TypeScript decides. It runs entirely on a local Ollama instance, so the pipeline costs nothing to operate — and I built it to run this job search.",
    year: "2026",
    status: "private",
    featured: true,
    tech: [
      "TypeScript",
      "Next.js 15",
      "Drizzle / PGlite",
      "Ollama",
      "Zod",
      "Vitest",
      "Biome",
    ],
    domains: ["ai", "backend", "data-model", "frontend", "infra"],
    metrics: [
      { value: "0", label: "model calls on a 686-job run", note: "527 rule-rejected, 30 shortlisted" },
      { value: "638", label: "tests", note: "58 files, including hostile-input fixtures" },
      { value: "22", label: "typed tools", note: "across 16 explicit workflows" },
      { value: "425", label: "TypeScript files", note: "3 apps, 7 packages" },
    ],
    links: [
      {
        kind: "code",
        status: "private",
        reason: "Private repository — it holds my live job search. The case study covers the architecture instead.",
      },
    ],
    cover: {
      src: null,
      kind: "screenshot",
      alt: "The Job Switch Agent command centre, showing the funnel from polled to shortlisted",
      caption: "The funnel. Most postings are rejected by rules that cost nothing to run.",
    },
    caseStudy: "job-switch-agent",
  },

  {
    slug: "hermes",
    name: "Hermes Commerce",
    tagline: "A B2B storefront with approval chains and quote negotiation.",
    summary:
      "An enterprise B2B commerce platform on Next.js and Medusa v2 that runs with no backend at all — a deterministic catalog sits behind a typed adapter and swaps to a real instance on one environment variable. The B2B layer carries org hierarchies, cost centres, spend limits, multi-level cart approval and RFQ negotiation over a frozen cart.",
    year: "2026",
    status: "wip",
    featured: false,
    tech: ["Next.js 15", "React 19", "TypeScript", "TanStack Query", "Zustand", "Playwright"],
    domains: ["frontend", "state-data", "data-model"],
    metrics: [
      { value: "336", label: "tests, plus 4 E2E specs" },
      { value: "11", label: "decision records" },
      { value: "16", label: "App Router routes" },
    ],
    links: [{ kind: "code", status: "planned", note: "Being prepared for publication." }],
    cover: {
      src: null,
      kind: "screenshot",
      alt: "Hermes Commerce multi-level cart approval flow",
      caption: "An approval chain that is derived from spend rules, never stored.",
    },
  },

  {
    slug: "storefront-ui",
    name: "storefront-ui",
    tagline: "A publishable design-system package for commerce frontends.",
    summary:
      "An open-source UI and theming package for Next.js storefronts, built so a team can compose and override without forking a template and inheriting its upgrade breakage. It deliberately never fetches data, never assumes routing and never talks to a backend — the non-goals are written down and enforced in review.",
    year: "2026",
    status: "public",
    featured: false,
    tech: ["React 19", "TypeScript", "Tailwind v4", "Radix UI", "tsup", "Storybook", "Turborepo"],
    domains: ["design-systems", "frontend"],
    metrics: [
      { value: "72", label: "UI primitives", note: "an enforced five-file shape, 1:1 with folders" },
      { value: "72", label: "Storybook stories" },
      { value: "440", label: "tests" },
    ],
    links: [
      { kind: "code", status: "available", href: "https://github.com/ranjanritesh22/storefront-ui" },
      { kind: "storybook", status: "planned", note: "Built locally; deployment is a later phase." },
    ],
    cover: {
      src: null,
      kind: "screenshot",
      alt: "storefront-ui component library in Storybook",
      caption: "Seventy-two primitives, each with a story, a test and a token-driven theme.",
    },
  },

  {
    slug: "stadiumx",
    name: "StadiumX",
    tagline: "Live cricket as a 3D reconstruction, at 50 KB an over.",
    summary:
      "Every ball of a live match rendered inside a model of the actual venue — trajectories synthesised from ball-by-ball event data rather than proprietary tracking, and labelled honestly in the UI as a reconstruction. Built for fans on Indian mobile data: about a megabyte an hour against a video stream's gigabyte.",
    year: "2026",
    status: "public",
    featured: false,
    tech: ["Next.js 15", "three.js", "React Three Fiber", "TypeScript", "SSE", "Zustand"],
    domains: ["frontend", "state-data", "backend"],
    metrics: [
      { value: "120", label: "tests" },
      { value: "4", label: "data providers behind one interface", note: "with a shared contract test" },
      { value: "13", label: "routes" },
    ],
    links: [
      { kind: "code", status: "available", href: "https://github.com/ranjanritesh22/cricketX" },
    ],
    cover: {
      src: null,
      kind: "screenshot",
      alt: "StadiumX 3D stadium view rendering a delivery",
      caption: "A synthesised delivery. Labelled in-product as a reconstruction, not as tracking data.",
    },
  },

  {
    slug: "parchi",
    name: "Parchi",
    tagline: "A giveaway app where the public key cannot read the odds.",
    summary:
      "A mobile-first draw app where every entry wins something. The interesting part is the security posture: a migration revokes the anonymous role's table access and grants back only display columns, so the public key that reaches every browser cannot read prize tier or remaining stock even if the query asks for them. Draw fairness and claim idempotency are enforced in Postgres, not in the client.",
    year: "2026",
    status: "public",
    featured: false,
    tech: ["Next.js 15", "React 19", "Supabase", "Postgres RLS", "Zod", "TypeScript"],
    domains: ["backend", "data-model", "frontend"],
    metrics: [
      { value: "7", label: "SQL migrations" },
      { value: "9", label: "routes" },
      { value: "33", label: "components" },
    ],
    links: [{ kind: "code", status: "available", href: "https://github.com/ranjanritesh22/luckyU" }],
    cover: {
      src: null,
      kind: "screenshot",
      alt: "Parchi draw and claim flow",
      caption: "Draw fairness lives in a Postgres function, where the client cannot reach it.",
    },
  },

  {
    slug: "healthdecode",
    name: "HealthDecode",
    tagline: "Lab reports explained in plain English or Hindi.",
    summary:
      "Upload a medical lab report and get every value explained in language a patient can act on — on screen and as a downloadable PDF. No accounts, no database, no history kept. Model output is constrained to a schema rather than parsed out of prose, and the whole thing runs on Cloudflare Pages Functions.",
    year: "2026",
    status: "public",
    featured: false,
    tech: ["Vite", "React", "TypeScript", "Cloudflare Pages Functions", "Gemini API"],
    domains: ["ai", "frontend", "infra"],
    metrics: [
      { value: "2", label: "languages" },
      { value: "4", label: "serverless functions" },
    ],
    links: [
      { kind: "code", status: "available", href: "https://github.com/ranjanritesh22/healthDecoder" },
      { kind: "live", status: "planned", note: "Pages project configured; deployment is a later phase." },
    ],
    cover: {
      src: null,
      kind: "screenshot",
      alt: "HealthDecode lab report explanation view",
      caption: "Schema-constrained output, so a malformed model response fails loudly instead of rendering.",
    },
  },

  {
    slug: "promptos",
    name: "promptOS",
    tagline: "A prompt improver with no model and no network.",
    summary:
      "Rewrites and structures prompts entirely on-device — deterministic TypeScript, regex and curated word lists, with no API key and no request leaving the page. Ships as a web app and as a browser extension that injects itself into ChatGPT, Claude, Gemini, Perplexity and Cursor.",
    year: "2026",
    status: "public",
    featured: false,
    tech: ["TypeScript", "Next.js", "Chrome MV3"],
    domains: ["frontend", "ai"],
    metrics: [
      { value: "0", label: "network calls" },
      { value: "5", label: "AI sites supported" },
      { value: "20", label: "tests" },
    ],
    links: [{ kind: "code", status: "available", href: "https://github.com/ranjanritesh22/promptOS" }],
    cover: {
      src: null,
      kind: "screenshot",
      alt: "promptOS extension injecting an optimise button into a chat interface",
      caption: "Deterministic rewriting, so the same prompt always produces the same improvement.",
    },
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const otherProjects = projects.filter((p) => !p.featured);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
