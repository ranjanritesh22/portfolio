import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

import { projects } from "@/content/projects";

/**
 * `src` is the only field that can point at nothing. A typo there renders a
 * broken image on the flagship card, and nothing else would catch it before a
 * reviewer does — the same failure D11 recorded for case-study slugs.
 */
const root = fileURLToPath(new URL("..", import.meta.url));
const withImage = projects.filter((p) => p.cover.src);

describe("every project cover image resolves to a file", () => {
  it("each src lives under /projects/ and exists in public/", () => {
    for (const p of withImage) {
      const src = p.cover.src as string;
      expect(src.startsWith("/projects/"), `${p.slug}: ${src}`).toBe(true);
      expect(existsSync(`${root}public${src}`), `${p.slug}: ${src}`).toBe(true);
    }
  });

  // Without a poster the card is a black box until someone presses play.
  it("each video exists and has a poster", () => {
    for (const p of projects.filter((p) => p.cover.video)) {
      const video = p.cover.video as string;
      expect(video.startsWith("/projects/"), `${p.slug}: ${video}`).toBe(true);
      expect(existsSync(`${root}public${video}`), `${p.slug}: ${video}`).toBe(true);
      expect(p.cover.src, `${p.slug}: video needs a poster in src`).toBeTruthy();
    }
  });
});
