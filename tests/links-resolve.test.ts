import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

import { projects } from "@/content/projects";

/**
 * Added after shipping two 404s.
 *
 * `caseStudy` was meant to be the guard that stops the home page linking a
 * write-up that does not exist — but the guard only works if the field is set
 * when the file lands, not before. Setting it early defeated it silently,
 * because nothing checked that the slug corresponded to anything real.
 *
 * A rule enforced by remembering is not enforced.
 */
const root = fileURLToPath(new URL("..", import.meta.url));

describe("every case-study link points at a file that exists", () => {
  const linked = projects.filter((p) => p.caseStudy);

  it("at least one project links a case study", () => {
    expect(linked.length).toBeGreaterThan(0);
  });

  it.each(linked.map((p) => [p.slug, p.caseStudy as string]))(
    "%s links /work/%s, and the MDX exists",
    (_slug, caseStudy) => {
      expect(existsSync(`${root}content/case-studies/${caseStudy}.mdx`)).toBe(true);
    },
  );
});
