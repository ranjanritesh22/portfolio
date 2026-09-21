import { describe, expect, it } from "vitest";

import { capabilities, ownership, principles } from "@/content/capabilities";
import { experience } from "@/content/experience";
import { projects } from "@/content/projects";

/**
 * The single most important test in this repo.
 *
 * Three separate bodies of work keep getting collapsed into one because they
 * all involve commerce frontends and design systems:
 *
 *   1. The Knack Systems internal storefront platform — employer work. The
 *      slot/outlet framework, 72 primitives, 74 Storybook stories, 7 gateway
 *      adapters, a 706-case suite, Smart Quick Order. Private, unlinkable.
 *   2. storefront-ui — a personal open-source package. 72 primitives, 72
 *      stories, 440 tests, and deliberately NO data layer at all.
 *   3. Hermes — a personal B2B commerce app.
 *
 * Attaching Knack's figures to a public repo is the failure that matters:
 * storefront-ui is public, so a reviewer who greps it for "adapter" finds
 * nothing, and at that moment every other number on the site becomes suspect.
 *
 * These assertions make that mistake a red build rather than a bad interview.
 */

const projectsText = JSON.stringify(projects);
const experienceText = JSON.stringify(experience);

describe("Knack Systems employer work stays in the experience section", () => {
  /** Claims that belong to the Knack platform and to nothing else on this site. */
  const knackOnly = [
    "gateway adapter",
    "706",
    "Smart Quick Order",
    "normalizer chain",
    "slot and outlet",
    "74 Storybook",
  ];

  it.each(knackOnly)("%s does not appear in any project entry", (claim) => {
    expect(projectsText.toLowerCase()).not.toContain(claim.toLowerCase());
  });

  it("the Knack role is the only place these claims live", () => {
    const knack = experience.find((r) => r.company === "Knack Systems");
    expect(knack).toBeDefined();
    const text = JSON.stringify(knack).toLowerCase();
    for (const claim of knackOnly) {
      expect(text).toContain(claim.toLowerCase());
    }
  });

  it("Knack's work is never presented as a linkable repository", () => {
    const knack = experience.find((r) => r.company === "Knack Systems");
    expect(JSON.stringify(knack)).not.toMatch(/github\.com/i);
  });
});

describe("storefront-ui keeps its own, smaller numbers", () => {
  const storefront = projects.find((p) => p.slug === "storefront-ui");

  it("exists and is public", () => {
    expect(storefront?.status).toBe("public");
  });

  it("claims 72 primitives and 440 tests, not 706", () => {
    const text = JSON.stringify(storefront);
    expect(text).toContain("440");
    expect(text).not.toContain("706");
  });

  it("never claims a data layer, which it explicitly does not have", () => {
    const text = JSON.stringify(storefront).toLowerCase();
    for (const claim of ["adapter", "gateway", "data layer", "normalizer"]) {
      expect(text).not.toContain(claim);
    }
  });
});

describe("no project's numbers are borrowed by the experience section", () => {
  it("experience does not cite Aura's or Job Switch Agent's figures", () => {
    for (const figure of ["914", "638", "425", "46 / 46"]) {
      expect(experienceText).not.toContain(figure);
    }
  });
});

describe("nothing promises what does not exist", () => {
  it("renders no 'coming soon' anywhere in the content", () => {
    const all = [projectsText, experienceText, JSON.stringify(capabilities), JSON.stringify(ownership), JSON.stringify(principles)].join(" ");
    expect(all.toLowerCase()).not.toContain("coming soon");
  });

  it("every available link has a real URL, and no private one leaks an href", () => {
    for (const project of projects) {
      for (const link of project.links) {
        if (link.status === "available") {
          expect(link.href).toMatch(/^https:\/\//);
        } else {
          expect(link).not.toHaveProperty("href");
        }
      }
    }
  });

  it("a featured project always has a case study to link to", () => {
    for (const project of projects.filter((p) => p.featured)) {
      expect(project.caseStudy, `${project.slug} is featured`).toBeTruthy();
    }
  });
});
