import type { MetadataRoute } from "next";

import { caseStudies } from "@/content/case-studies/meta";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: absoluteUrl("/"), lastModified: now, priority: 1 },
    ...caseStudies.map((c) => ({
      url: absoluteUrl(`/work/${c.slug}`),
      lastModified: now,
      priority: 0.8,
    })),
  ];
}
