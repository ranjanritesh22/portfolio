import type { Domain } from "@/content/types";
import { cn } from "@/lib/cn";

const LABELS: Record<Domain, string> = {
  frontend: "Frontend",
  "design-systems": "Design systems",
  "state-data": "Client state",
  backend: "Backend",
  "data-model": "Data model",
  infra: "Infra",
  ai: "AI",
};

/**
 * The breadth signal, rendered as data rather than argued in prose.
 *
 * Scanning eight cards, a reader sees Backend, Data model and Infra recur
 * across unrelated codebases. Repetition across independent projects reads as
 * a pattern rather than a one-off, and it costs no words — which leaves the
 * written copy free to talk about frontend craft. See CLAUDE.md §A3.
 */
export function DomainStrip({
  domains,
  className,
}: {
  domains: Domain[];
  className?: string;
}) {
  return (
    <ul className={cn("flex flex-wrap items-center gap-x-3 gap-y-1", className)}>
      {domains.map((domain) => (
        <li
          key={domain}
          className="font-mono text-[11px] tracking-[0.1em] text-text-3 uppercase"
        >
          {LABELS[domain]}
        </li>
      ))}
    </ul>
  );
}
