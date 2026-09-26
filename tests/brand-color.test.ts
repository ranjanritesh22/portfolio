import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

import { capabilities } from "@/content/capabilities";
import { CHIP_SURFACE, brandColor } from "@/lib/brand-color";
import * as simpleIcons from "simple-icons";

const css = readFileSync(
  fileURLToPath(new URL("../app/globals.css", import.meta.url)),
  "utf8",
);

function token(theme: "light" | "dark", name: string): string {
  const block =
    theme === "light"
      ? css.slice(css.indexOf(":root {"), css.indexOf(':root[data-theme="dark"]'))
      : css.slice(css.indexOf(':root[data-theme="dark"]'), css.indexOf("@theme inline"));
  const match = block.match(new RegExp(`--${name}:\\s*(#[0-9a-fA-F]{6})`));
  if (!match) throw new Error(`token --${name} not found in ${theme} theme`);
  return match[1].toLowerCase();
}

describe("stack logos", () => {
  it("test their colour against the surface the chips actually sit on", () => {
    expect(CHIP_SURFACE.light).toBe(token("light", "bg-elevated"));
    expect(CHIP_SURFACE.dark).toBe(token("dark", "bg-elevated"));
  });

  it("fall back where a brand colour would vanish", () => {
    // Pure-black marks disappear on the dark theme; JavaScript's yellow on white.
    expect(brandColor(simpleIcons.siVercel.hex).dark).toBeNull();
    expect(brandColor(simpleIcons.siJavascript.hex).light).toBeNull();
  });

  it("keep colours that are merely light, not invisible", () => {
    expect(brandColor(simpleIcons.siGitlab.hex).light).not.toBeNull();
    expect(brandColor(simpleIcons.siTailwindcss.hex).light).not.toBeNull();
  });

  it("list every tool once", () => {
    const names = capabilities.flatMap((group) => group.tools.map((tool) => tool.name));
    expect(new Set(names).size).toBe(names.length);
  });
});
