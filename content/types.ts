/**
 * The content contract.
 *
 * Everything the site displays is typed data in this folder. Nothing is
 * hardcoded in a component. Two reasons: a malformed project entry becomes a
 * build error rather than a broken card, and every factual claim on the site
 * lives in one greppable place — which is what makes the metric audit in
 * CLAUDE.md §C3 possible at all.
 */

export type LinkKind = "code" | "live" | "storybook" | "demo" | "writeup";

/**
 * A discriminated union rather than a boolean, because a missing link has
 * three meanings and only one of them is "not yet".
 *
 *   available — a real anchor.
 *   private   — a muted, non-interactive chip carrying `reason`. Silence would
 *               leave a reviewer wondering why the flagship has no code link;
 *               "Private repository" answers it, and nobody expects client or
 *               personal-data code to be public.
 *   planned   — renders nothing at all. No "coming soon" anywhere on this site;
 *               an unbuilt promise is worse than an absent one.
 *
 * Switching a demo on later is one edit: change `status` and add `href`.
 */
export type ProjectLink =
  | { kind: LinkKind; status: "available"; href: string }
  | { kind: LinkKind; status: "private"; reason: string }
  | { kind: LinkKind; status: "planned"; note: string };

/**
 * A verified figure. Every value traces to the audit table in CLAUDE.md §C3.
 *
 * `note` states how the number was arrived at. It is optional in the type but
 * expected in practice: a figure nobody can reproduce is a figure that will be
 * challenged in an interview, and the answer should already be written down.
 */
export type Metric = {
  value: string;
  label: string;
  note?: string;
};

/**
 * The breadth signal, carried structurally rather than in prose.
 *
 * Every project card renders its domains as a small strip. A reader scanning
 * eight cards sees `backend`, `data` and `infra` recur across unrelated
 * codebases, which reads as a pattern rather than a one-off — and it costs
 * zero words, so the written copy stays free to talk about frontend craft.
 * See CLAUDE.md §A3.
 */
export type Domain =
  | "frontend"
  | "design-systems"
  | "state-data"
  | "backend"
  | "data-model"
  | "infra"
  | "ai";

/**
 * `kind` drives an automatic provenance badge, and it is required.
 *
 * This exists for one specific hazard: Aura's local design PNGs are day-one
 * mockups, not screenshots of the shipped app. Marking one `mockup` makes the
 * component label it as a design exploration, so it cannot be presented as a
 * product screenshot by an author who forgot which file was which.
 */
export type MediaKind = "screenshot" | "mockup" | "diagram" | "sketch";

/**
 * `src: null` is the normal state until real screenshots exist, and renders a
 * composed placeholder panel — never a broken image and never an empty grey
 * box that reads as an unfinished site. The caption renders in both states, so
 * the reader gets the information with or without the picture, and the swap
 * costs zero layout shift.
 */
export type ProjectImage = {
  src: string | null;
  kind: MediaKind;
  alt: string;
  caption?: string;
};

export type ProjectStatus = "private" | "public" | "wip";

export type Project = {
  slug: string;
  name: string;
  /** One line, under ~90 characters. Shown under the name on the card. */
  tagline: string;
  /** Two or three sentences. What it is, who it is for, what is hard about it. */
  summary: string;
  year: string;
  status: ProjectStatus;
  /** `true` promotes it to a large card and requires `caseStudy` to be set. */
  featured: boolean;
  tech: string[];
  domains: Domain[];
  /** At most four render on a card. */
  metrics: Metric[];
  links: ProjectLink[];
  cover: ProjectImage;
  /**
   * MDX slug under content/case-studies. Featured projects only.
   *
   * The "Read the case study" call to action renders only when this is set, so
   * an unwritten case study cannot be linked by accident — the site stays
   * shippable with the featured blocks carrying their summaries inline.
   */
  caseStudy?: string;
};

/**
 * One row of the "How far I take a product" table.
 *
 * This is the component that carries the full-stack argument, and it sits
 * *after* the featured projects so it reads as a summary of evidence already
 * seen rather than an upfront assertion. Each row must cite a specific,
 * verifiable artefact — never a skill rating, never a logo, never a bar.
 */
export type OwnershipLayer = {
  layer: string;
  scope: string;
  evidence: string[];
};

export type Role = {
  company: string;
  title: string;
  /** e.g. "Dec 2024" */
  start: string;
  /** `null` means current. */
  end: string | null;
  location: string;
  /** Impact first, mechanism second. Three or four per role. */
  bullets: string[];
  tech: string[];
};

export type CapabilityGroup = {
  /** The four groups carry the full-stack claim structurally — see CLAUDE.md §A3. */
  title: string;
  items: string[];
};

export type Profile = {
  name: string;
  /** The role being targeted, stated plainly. */
  role: string;
  /** The single positioning sentence above the fold. */
  positioning: string;
  location: string;
  availability: string;
  email: string;
  phone: string;
  links: {
    github: string;
    linkedin: string;
    twitter?: string;
  };
  resumePath: string;
};
