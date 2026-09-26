/**
 * Decides, per theme, whether a logo can wear its brand colour.
 *
 * Brand colours are chosen for brand reasons, not for our backgrounds:
 * JavaScript's yellow vanishes on white, and Next.js and Vercel are pure black,
 * which vanishes on the dark theme. Rather than hand-pick exceptions that drift
 * the next time a logo is added, each colour is tested against the surface it
 * will sit on and replaced with the heading colour when it would disappear.
 *
 * The bar is 1.5:1, not WCAG's 3:1. Every logo is decorative and labelled by
 * the tool's name in text, so 1.4.11 does not bind — and at 3:1 GitLab's
 * orange and Tailwind's cyan turned black, which defeats the point of colour.
 *
 * These two values mirror `--bg-elevated` in globals.css;
 * `tests/brand-color.test.ts` fails if they drift apart.
 */
export const CHIP_SURFACE = { light: "#ffffff", dark: "#17181c" } as const;

const MIN_CONTRAST = 1.5;

function luminance(hex: string): number {
  const channels = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const linear = channels.map((c) =>
    c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4,
  );
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
}

export function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a.replace("#", "")), luminance(b.replace("#", ""))].sort(
    (x, y) => y - x,
  );
  return (hi + 0.05) / (lo + 0.05);
}

/** The brand colour for each theme, or `null` where it would not read. */
export function brandColor(hex: string): { light: string | null; dark: string | null } {
  const colour = `#${hex}`;
  return {
    light: contrast(colour, CHIP_SURFACE.light) >= MIN_CONTRAST ? colour : null,
    dark: contrast(colour, CHIP_SURFACE.dark) >= MIN_CONTRAST ? colour : null,
  };
}
