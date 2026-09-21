import type { CapabilityGroup, OwnershipLayer } from "./types";

/**
 * Four groups, rendered at equal weight.
 *
 * The grouping is the argument: backend and delivery are columns he already
 * occupies, not a wish list appended to a frontend résumé. Nothing here is
 * rated, scored or bar-charted — a self-assessed proficiency number is worth
 * nothing to a reader and invites an argument in the interview.
 */
export const capabilities: CapabilityGroup[] = [
  {
    title: "Frontend & platform",
    items: [
      "React", "Next.js (App Router, RSC, SSR/ISR)", "TypeScript", "Angular",
      "TanStack Query", "Zustand", "NgRx / RxJS", "Tailwind CSS",
      "Design systems & tokens", "Storybook", "WCAG accessibility",
      "Micro-frontends (Module Federation)",
    ],
  },
  {
    title: "Backend & data",
    items: [
      "Node.js", "PostgreSQL", "Row-level security", "Schema design & migrations",
      "Supabase", "Drizzle", "REST & GraphQL", "SQL",
    ],
  },
  {
    title: "AI engineering",
    items: [
      "LLM product features", "Structured output & schema constraints",
      "Agentic workflows", "Prompt-injection defence", "Local models (Ollama)",
      "MCP servers & connectors",
    ],
  },
  {
    title: "Build, test & ship",
    items: [
      "Turborepo", "Vite & Webpack", "Vitest / Jest / RTL", "Playwright",
      "Cloudflare Workers", "Vercel", "CI/CD", "Core Web Vitals",
    ],
  },
];

/**
 * "How far I take a product" — the component that carries the full-stack claim.
 *
 * It sits after the featured work so a reader parses it as a summary of
 * evidence already seen rather than an opening assertion. Each row cites a
 * specific artefact someone could go and verify. Row three is the one that
 * does the real work: "RLS enabled, zero policies" is not a fact a frontend
 * developer who watched a Supabase tutorial can produce.
 */
export const ownership: OwnershipLayer[] = [
  {
    layer: "Interface",
    scope: "The part I have the most depth in, and the reason the rest matters.",
    evidence: [
      "227 components across Aura's four modules, with every one of its 38 pages a Server Component",
      "A 72-primitive design system published as an installable package, with an enforced file shape",
      "Charts hand-built as inline SVG — no charting library, in either project",
    ],
  },
  {
    layer: "Client state & data",
    scope: "Where most frontend work actually gets hard.",
    evidence: [
      "75 TanStack Query modules; an optimistic Kanban reorder that writes exactly one row",
      "Rollback restores the snapshot verbatim, because undoing a drag field-by-field drifts",
      "Keyboard drag announced to screen readers through dnd-kit's announcement API",
    ],
  },
  {
    layer: "Backend & data model",
    scope: "Not a second skill bolted on — the same judgement, one layer down.",
    evidence: [
      "46 tables, 43 migrations and ~170 RLS policies; RLS is why there is no per-entity API layer",
      "A secrets table with row-level security enabled and zero policies — unreadable by any client query",
      "Drizzle over PGlite, so local development and hosted Postgres share one dialect",
    ],
  },
  {
    layer: "Delivery & operations",
    scope: "Shipping it, and keeping it inside its budget.",
    evidence: [
      "7 Cloudflare cron tiers, plus job-alert ingestion over Cloudflare Email Routing",
      "A 3 MiB Worker script budget enforced by explicit dynamic-import boundaries",
      "three.js nested two boundaries deep, so it costs only the visitor who asks for it",
    ],
  },
];

/**
 * How I work. Each line is falsifiable and points at something that exists.
 * The last one is a self-critique on purpose — an engineer who can name his
 * own weak spots reads as senior, and it costs a recruiter nothing because
 * they will not read this far.
 */
export const principles: { text: string; proof: string }[] = [
  {
    text: "Decisions get written down while they are still fresh.",
    proof: "A 3,445-line decision log in Aura; 81 numbered entries in Job Switch Agent.",
  },
  {
    text: "Architecture boundaries belong in the linter, not in a convention nobody remembers.",
    proof: "Importing a model package into the polling app is a build error, verified by adding one on purpose.",
  },
  {
    text: "A model produces data; code makes the decision.",
    proof: "The job extractor has no verdict field, so a hostile posting has nowhere to put one.",
  },
  {
    text: "Numbers on a page should be reproducible by whoever doubts them.",
    proof: "Every figure on this site was counted from source, and the method is recorded alongside it.",
  },
  {
    text: "I would rather state a limitation than have an interviewer find it.",
    proof: "Job Switch Agent's match score is hand-tuned against a sample of 30. That is not an evaluation, and I say so.",
  },
];
