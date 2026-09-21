import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Container } from "@/components/primitives/container";
import { ArrowRightIcon } from "@/components/primitives/icons";
import { ProjectLinks } from "@/components/primitives/link-button";
import { MetricList } from "@/components/primitives/metric-list";
import { TagList } from "@/components/primitives/tag";
import { ThemeToggle } from "@/components/primitives/theme-toggle";
import { SiteFooter } from "@/components/home/contact";
import { caseStudies, getCaseStudy } from "@/content/case-studies/meta";
import { getProject } from "@/content/projects";

// Only the slugs below exist; anything else is a 404 at build time rather
// than a rendered shell with no content.
export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const meta = getCaseStudy(slug);
  if (!meta) return {};
  const url = `/work/${meta.slug}`;
  return {
    title: meta.title,
    description: meta.deck,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: meta.title,
      description: meta.deck,
      url,
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.deck,
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const meta = getCaseStudy(slug);
  const project = meta ? getProject(meta.projectSlug) : undefined;
  if (!meta || !project) notFound();

  const { default: Content } = await import(`@/content/case-studies/${slug}.mdx`);
  const other = caseStudies.find((c) => c.slug !== slug);

  return (
    <>
      <header className="pt-10 sm:pt-16">
        <Container>
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="font-mono text-xs tracking-[0.14em] text-text-3 uppercase hover:text-text-1"
            >
              ← Ritesh Ranjan
            </Link>
            <ThemeToggle />
          </div>
        </Container>
      </header>

      <main id="main">
        <Container width="prose">
          <div className="pt-16">
            <p className="font-mono text-xs tracking-[0.14em] text-text-3 uppercase">
              Case study · {meta.readingTimeMin} min read
            </p>
            <h1 className="mt-5 text-3xl">{meta.title}</h1>
            <p className="mt-5 text-lg text-text-2">{meta.deck}</p>

            <MetricList metrics={project.metrics} size="lg" className="mt-10" />
            <TagList items={project.tech} className="mt-8" />
            <ProjectLinks links={project.links} className="mt-6" />
          </div>

          <article className="mt-4 pb-8">
            <Content />
          </article>

          {other ? (
            <nav className="mt-16 border-t border-border-default pt-8 pb-20">
              <p className="font-mono text-xs tracking-[0.14em] text-text-3 uppercase">
                Next case study
              </p>
              <Link
                href={`/work/${other.slug}`}
                className="group mt-3 inline-flex items-center gap-2 text-lg text-text-1 hover:text-accent"
              >
                {other.title}
                <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </nav>
          ) : null}
        </Container>
      </main>

      <SiteFooter />
    </>
  );
}
