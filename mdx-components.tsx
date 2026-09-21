import type { MDXComponents } from "mdx/types";

import { Decision, Figure, KnownLimits, TradeOff } from "@/components/case-study/blocks";

/**
 * Case-study prose styling lives here rather than in a `.prose` class, because
 * the set of elements MDX can emit is small and known — and a typography
 * plugin would be a dependency to style eight tags.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: (props) => <h2 className="mt-14 text-xl" {...props} />,
    h3: (props) => <h3 className="mt-10 text-lg" {...props} />,
    p: (props) => <p className="mt-4 text-text-2" {...props} />,
    ul: (props) => <ul className="mt-4 space-y-2 text-text-2" {...props} />,
    ol: (props) => <ol className="mt-4 list-decimal space-y-2 pl-5 text-text-2" {...props} />,
    li: (props) => <li {...props} />,
    strong: (props) => <strong className="font-medium text-text-1" {...props} />,
    code: (props) => (
      <code
        className="rounded border border-border-default bg-bg-subtle px-1.5 py-0.5 font-mono text-[0.85em] text-text-1"
        {...props}
      />
    ),
    a: (props) => (
      <a
        className="text-accent underline decoration-border-strong underline-offset-4"
        {...props}
      />
    ),
    blockquote: (props) => (
      <blockquote
        className="mt-6 border-l-2 border-border-strong pl-5 text-text-2 italic"
        {...props}
      />
    ),
    Decision,
    TradeOff,
    Figure,
    KnownLimits,
    ...components,
  };
}
