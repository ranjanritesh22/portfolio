import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

/**
 * Contrast is verified against the stylesheet, not against a screenshot.
 *
 * The tokens were originally picked by eye and three of the six pairs failed
 * AA — the muted text was unreadable on the subtle background, and neither
 * theme's control borders reached the 3:1 that WCAG 1.4.11 asks of an
 * interactive boundary. Eye-picked neutrals fail quietly, which is exactly the
 * kind of thing that should be a test rather than a good intention.
 */
const css = readFileSync(
  fileURLToPath(new URL("../app/globals.css", import.meta.url)),
  "utf8",
);

/** Reads a token's value from a given theme block. */
function token(theme: "light" | "dark", name: string): string {
  const block =
    theme === "light"
      ? css.slice(css.indexOf(":root {"), css.indexOf(':root[data-theme="dark"]'))
      : css.slice(css.indexOf(':root[data-theme="dark"]'), css.indexOf("@theme inline"));
  const match = block.match(new RegExp(`--${name}:\\s*(#[0-9a-fA-F]{6})`));
  if (!match) throw new Error(`token --${name} not found in ${theme} theme`);
  return match[1];
}

function luminance(hex: string): number {
  const channels = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const linear = channels.map((c) =>
    c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4,
  );
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
}

function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

describe.each(["light", "dark"] as const)("%s theme meets WCAG AA", (theme) => {
  const bg = () => token(theme, "bg");
  const subtle = () => token(theme, "bg-subtle");

  const cases: [string, () => string, () => string, number][] = [
    ["headings on background", () => token(theme, "text-1"), bg, 4.5],
    ["body on background", () => token(theme, "text-2"), bg, 4.5],
    ["meta on background", () => token(theme, "text-3"), bg, 4.5],
    // Tags and placeholders sit on the subtle surface, which is the harder test.
    ["meta on subtle surface", () => token(theme, "text-3"), subtle, 4.5],
    ["links on background", () => token(theme, "accent"), bg, 4.5],
    // 1.4.11: the boundary of an interactive control, not a decorative rule.
    ["control borders", () => token(theme, "border-strong"), bg, 3],
  ];

  it.each(cases)("%s", (_label, fg, back, required) => {
    expect(contrast(fg(), back())).toBeGreaterThanOrEqual(required);
  });
});
