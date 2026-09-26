import type { Metric } from "@/content/types";
import { cn } from "@/lib/cn";

/**
 * The numbers are the fastest credibility signal on the page, so they get
 * their own type treatment and a `dl` — a metric is a term and its value, and
 * marking it up as one means a screen reader reads "914, unit tests" as a pair
 * instead of two loose fragments.
 */
export function MetricList({
  metrics,
  size = "sm",
  columns = 4,
  className,
}: {
  metrics: Metric[];
  size?: "sm" | "lg";
  /**
   * 3 for half-width cards, where four columns squeeze every label onto two
   * lines. "split" for a column that is full width on phones but halves on
   * tablets, where four columns broke "46 / 46" across two lines at 768px.
   */
  columns?: 3 | 4 | "split";
  className?: string;
}) {
  if (metrics.length === 0) return null;

  return (
    <dl
      className={cn(
        "grid gap-x-6 gap-y-5",
        columns === 3 && "grid-cols-3",
        columns === 4 && "grid-cols-2 sm:grid-cols-4",
        columns === "split" && "grid-cols-2 sm:grid-cols-4 md:grid-cols-2 lg:grid-cols-4",
        className,
      )}
    >
      {metrics.map((metric) => (
        <div key={metric.label}>
          <dd
            className={cn(
              "font-semibold tracking-tight text-text-1 tabular-nums",
              size === "lg" ? "text-2xl" : "text-xl",
            )}
          >
            {metric.value}
          </dd>
          <dt className="mt-1 text-xs leading-snug text-balance text-text-3">{metric.label}</dt>
        </div>
      ))}
    </dl>
  );
}
