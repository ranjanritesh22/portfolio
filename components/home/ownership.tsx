import { ownership } from "@/content/capabilities";

/**
 * The full-stack argument, made entirely out of artefacts.
 *
 * It is placed after the featured projects on purpose: by the time a reader
 * reaches it they have already seen the evidence, so this reads as a summary
 * rather than a claim. Never a skills matrix, never a percentage bar — a
 * self-assessed rating is worth nothing to a reader and invites an argument.
 */
export function OwnershipTable() {
  return (
    <div className="divide-y divide-border-default border-y border-border-default">
      {ownership.map((row, i) => (
        <div
          key={row.layer}
          className="grid gap-4 py-8 md:grid-cols-[minmax(0,16rem)_1fr] md:gap-10"
        >
          <div>
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-xs text-text-3">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-lg text-text-1">{row.layer}</h3>
            </div>
            <p className="mt-2 text-sm text-text-3">{row.scope}</p>
          </div>

          <ul className="space-y-2.5">
            {row.evidence.map((item) => (
              <li key={item} className="flex gap-3 text-text-2">
                <span
                  aria-hidden
                  className="mt-[0.6em] size-1 shrink-0 rounded-full bg-border-strong"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
