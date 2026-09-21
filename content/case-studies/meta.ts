/**
 * Case-study metadata. Prose lives in the .mdx file beside this; everything
 * structured lives here, so frontmatter never becomes a second untyped source
 * of truth for the numbers CLAUDE.md §C1 exists to protect.
 */
export type CaseStudyMeta = {
  slug: string;
  projectSlug: string;
  title: string;
  /** Two sentences: what it is, and why it was hard. */
  deck: string;
  readingTimeMin: number;
};

export const caseStudies: CaseStudyMeta[] = [
  {
    slug: "aura",
    projectSlug: "aura",
    title: "Aura — a personal life OS",
    deck:
      "Four life modules over one Postgres schema, built solo and deployed to Cloudflare Workers. The hard parts were a Kanban that stays correct while a background worker writes to the same rows, and fitting the whole server into a 3 MiB script.",
    readingTimeMin: 9,
  },
  {
    slug: "job-switch-agent",
    projectSlug: "job-switch-agent",
    title: "Job Switch Agent — an agent that spends nothing to say no",
    deck:
      "A local-first job search pipeline where the language model extracts data and TypeScript makes every decision. The interesting constraint was cost: a run over 686 postings has to reach a shortlist without making a model call.",
    readingTimeMin: 8,
  },
];

export function getCaseStudy(slug: string): CaseStudyMeta | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
