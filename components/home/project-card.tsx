import Link from "next/link";

import { ProjectLinks } from "@/components/primitives/link-button";
import { MetricList } from "@/components/primitives/metric-list";
import { ProjectImage } from "@/components/primitives/project-image";
import { TagList } from "@/components/primitives/tag";
import { ArrowRightIcon } from "@/components/primitives/icons";
import type { Project } from "@/content/types";
import { DomainStrip } from "./domain-strip";

/**
 * The large editorial block, used for the two projects with case studies.
 *
 * The "Read the case study" link renders only when `caseStudy` is set, so an
 * unwritten page can never be linked by accident — the summary and metrics
 * stand on their own until the write-up exists.
 */
export function FeaturedProject({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <article className="grid gap-8 border-t border-border-default pt-10 md:grid-cols-[1fr_1.1fr] md:gap-12">
      <div>
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-xs text-text-3">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="text-2xl">{project.name}</h3>
        </div>

        <p className="mt-2 text-lg text-text-2">{project.tagline}</p>
        <p className="mt-4 text-text-2">{project.summary}</p>

        <MetricList metrics={project.metrics} className="mt-8" />

        <DomainStrip domains={project.domains} className="mt-8" />
        <TagList items={project.tech} className="mt-4" />

        <div className="mt-6 flex flex-wrap items-center gap-3">
          {project.caseStudy ? (
            <Link
              href={`/work/${project.slug}`}
              className="group inline-flex items-center gap-2 text-sm font-medium text-accent"
            >
              Read the case study
              <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          ) : null}
        </div>

        <ProjectLinks links={project.links} className="mt-5" />
      </div>

      <div>
        <ProjectImage
          image={project.cover}
          label={project.name}
          priority={index === 0}
        />
        {project.cover.caption ? (
          <p className="mt-3 text-sm text-text-3">{project.cover.caption}</p>
        ) : null}
      </div>
    </article>
  );
}

/** The compact card, for everything without a case study. */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="flex flex-col border-t border-border-default pt-6">
      <h3 className="text-lg text-text-1">{project.name}</h3>
      <p className="mt-1 text-sm text-text-2">{project.tagline}</p>
      <p className="mt-3 text-sm text-text-2">{project.summary}</p>

      <MetricList metrics={project.metrics.slice(0, 3)} className="mt-6" />

      {/* mt-auto pins the tail of every card to the same baseline, so a grid of
          cards with unequal copy still reads as a row rather than a ragged set. */}
      <div className="mt-auto pt-6">
        <DomainStrip domains={project.domains} />
        <TagList items={project.tech} className="mt-3" />
        <ProjectLinks links={project.links} className="mt-4" />
      </div>
    </article>
  );
}
