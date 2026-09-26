import type { CapabilityGroup, OwnershipLayer } from "./types";

/**
 * The stack, as it sits directly under the hero.
 *
 * Mirrors the résumé's Technical Skills so a recruiter matching keywords finds
 * the same words in both places. Nothing is rated, scored or bar-charted — a
 * self-assessed proficiency number is worth nothing to a reader and invites an
 * argument in the interview.
 */
export const capabilities: CapabilityGroup[] = [
  {
    title: "Languages",
    tools: [
      { name: "TypeScript", icon: "typescript" },
      { name: "JavaScript", icon: "javascript" },
      { name: "HTML5", icon: "html5" },
      { name: "CSS3", icon: "css" },
      { name: "Sass / SCSS", icon: "sass" },
      { name: "SQL" },
    ],
  },
  {
    title: "Frontend",
    tools: [
      { name: "React", icon: "react" },
      { name: "Next.js", icon: "nextjs" },
      { name: "Angular", icon: "angular" },
      { name: "TanStack Query", icon: "reactquery" },
      { name: "Zustand" },
      { name: "NgRx", icon: "ngrx" },
      { name: "RxJS", icon: "rxjs" },
    ],
    practices: ["App Router & RSC", "SSR / ISR", "Micro-frontends"],
  },
  {
    title: "UI & design systems",
    tools: [
      { name: "Tailwind CSS", icon: "tailwindcss" },
      { name: "shadcn/ui", icon: "shadcnui" },
      { name: "Storybook", icon: "storybook" },
      { name: "Angular Material", icon: "angular" },
    ],
    practices: ["Design tokens", "Theming", "WCAG accessibility", "Responsive design"],
  },
  {
    title: "Backend & data",
    tools: [
      { name: "Node.js", icon: "nodejs" },
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "Supabase", icon: "supabase" },
      { name: "Drizzle", icon: "drizzle" },
      { name: "GraphQL", icon: "graphql" },
      { name: "MySQL", icon: "mysql" },
    ],
    practices: ["REST APIs", "Schema design & migrations", "Row-level security"],
  },
  {
    title: "AI engineering",
    tools: [
      { name: "OpenAI API" },
      { name: "Claude API", icon: "claude" },
      { name: "MCP", icon: "mcp" },
      { name: "Ollama", icon: "ollama" },
    ],
    practices: [
      "LLM product features", "Agentic workflows", "Structured output",
      "Prompt engineering", "Prompt-injection defence",
    ],
  },
  {
    title: "AI-assisted development",
    tools: [{ name: "Claude Code", icon: "claude" }],
    practices: [
      "Agentic coding", "AI code review", "AI-assisted debugging",
      "Spec-driven development (CLAUDE.md)",
    ],
  },
  {
    title: "Build & performance",
    tools: [
      { name: "Vite", icon: "vite" },
      { name: "Webpack", icon: "webpack" },
      { name: "Turborepo", icon: "turborepo" },
    ],
    practices: [
      "Module Federation", "Code splitting", "Lazy loading", "Tree shaking",
      "Caching", "Core Web Vitals",
    ],
  },
  {
    title: "Testing & delivery",
    tools: [
      { name: "Vitest", icon: "vitest" },
      { name: "Jest", icon: "jest" },
      { name: "Testing Library", icon: "testinglibrary" },
      { name: "Cypress", icon: "cypress" },
      { name: "Playwright" },
      { name: "GitLab CI", icon: "gitlab" },
      { name: "Jenkins", icon: "jenkins" },
      { name: "Azure DevOps" },
      { name: "Cloudflare Workers", icon: "cloudflareworkers" },
      { name: "Vercel", icon: "vercel" },
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
    text: "A coding agent makes me faster. It does not make the decisions.",
    proof: "Every project on this site was built with Claude Code, working from a CLAUDE.md spec checked into its repo. On this site, the rules an agent must not break — never mixing employer and personal figures — are tests, not reminders.",
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
