import { ImageResponse } from "next/og";

import { OG_CONTENT_TYPE, OG_SIZE, OgCard } from "@/components/seo/og-template";
import { caseStudies, getCaseStudy } from "@/content/case-studies/meta";
import { getProject } from "@/content/projects";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const meta = getCaseStudy(slug);
  const project = meta ? getProject(meta.projectSlug) : undefined;

  return new ImageResponse(
    (
      <OgCard
        eyebrow="Case study"
        title={project?.name ?? "Case study"}
        subtitle={project?.tagline ?? ""}
        // Three fits the row at a readable size; the fourth would shrink them
        // below what survives LinkedIn's in-feed scaling.
        metrics={(project?.metrics ?? []).slice(0, 3).map((m) => ({
          value: m.value,
          label: m.label,
        }))}
      />
    ),
    size,
  );
}
