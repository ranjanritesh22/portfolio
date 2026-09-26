import {
  siAngular, siClaude, siCloudflareworkers, siCss, siCypress, siDrizzle,
  siGitlab, siGraphql, siHtml5, siJavascript, siJenkins, siJest,
  siModelcontextprotocol, siMysql, siNextdotjs, siNgrx, siNodedotjs, siOllama,
  siPostgresql, siReact, siReactivex, siReactquery, siSass, siShadcnui,
  siStorybook, siSupabase, siTailwindcss, siTestinglibrary, siTurborepo,
  siTypescript, siVercel, siVite, siVitest, siWebpack,
  type SimpleIcon,
} from "simple-icons";

import type { BrandIconName } from "@/content/types";
import { brandColor } from "@/lib/brand-color";

/**
 * Official product marks, from Simple Icons.
 *
 * Imported only by Server Components, so the package never reaches a client
 * chunk: each logo is serialised into the HTML as a single inline `<path>` and
 * the page ships no icon runtime at all.
 */
const ICONS: Record<BrandIconName, SimpleIcon> = {
  typescript: siTypescript,
  javascript: siJavascript,
  html5: siHtml5,
  css: siCss,
  sass: siSass,
  react: siReact,
  nextjs: siNextdotjs,
  angular: siAngular,
  reactquery: siReactquery,
  ngrx: siNgrx,
  rxjs: siReactivex,
  tailwindcss: siTailwindcss,
  shadcnui: siShadcnui,
  storybook: siStorybook,
  nodejs: siNodedotjs,
  postgresql: siPostgresql,
  supabase: siSupabase,
  drizzle: siDrizzle,
  graphql: siGraphql,
  mysql: siMysql,
  claude: siClaude,
  mcp: siModelcontextprotocol,
  ollama: siOllama,
  vite: siVite,
  webpack: siWebpack,
  turborepo: siTurborepo,
  vitest: siVitest,
  jest: siJest,
  testinglibrary: siTestinglibrary,
  cypress: siCypress,
  gitlab: siGitlab,
  jenkins: siJenkins,
  cloudflareworkers: siCloudflareworkers,
  vercel: siVercel,
};

/**
 * A logo in its brand colour where that colour reads on the current theme,
 * and in the heading colour where it does not (see `lib/brand-color.ts`).
 * Decorative: the tool's name always sits beside it as text.
 */
export function BrandIcon({ name }: { name: BrandIconName }) {
  const icon = ICONS[name];
  const colour = brandColor(icon.hex);

  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      focusable={false}
      className="size-4 shrink-0 text-(--brand-light) dark:text-(--brand-dark)"
      style={
        {
          "--brand-light": colour.light ?? "var(--text-1)",
          "--brand-dark": colour.dark ?? "var(--text-1)",
        } as React.CSSProperties
      }
    >
      <path d={icon.path} fill="currentColor" />
    </svg>
  );
}

/** Stands in where a tool has no official mark, so every chip keeps its rhythm. */
export function Monogram({ name }: { name: string }) {
  return (
    <span
      aria-hidden
      className="flex size-4 shrink-0 items-center justify-center rounded-[3px] bg-text-3 font-mono text-[9px] font-semibold leading-none text-bg"
    >
      {name.charAt(0)}
    </span>
  );
}
