import { ProjectImage } from "@/components/primitives/project-image";
import type { ProjectImage as ProjectImageData } from "@/content/types";

/**
 * The unit a case study is actually made of.
 *
 * A decision is only interesting with its alternatives attached — "I used
 * fractional ranks" says nothing, "integers meant N writes and a race with a
 * background worker, so position became a sortable string" is the whole point.
 * The component forces the shape so no section can quietly become a feature
 * list.
 */
export function Decision({
  title,
  constraint,
  children,
}: {
  title: string;
  constraint: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-14 border-t border-border-default pt-8">
      <h2 className="text-xl">{title}</h2>
      <p className="mt-3 border-l-2 border-accent pl-4 text-text-2 italic">
        {constraint}
      </p>
      <div className="mt-5 space-y-4">{children}</div>
    </section>
  );
}

/** Two columns: what the choice bought, and what it cost. Both are required. */
export function TradeOff({
  gained,
  cost,
}: {
  gained: string[];
  cost: string[];
}) {
  return (
    <div className="my-7 grid gap-6 rounded-lg border border-border-default bg-bg-subtle p-6 sm:grid-cols-2">
      <div>
        <h3 className="font-mono text-xs tracking-[0.12em] text-text-3 uppercase">
          What it bought
        </h3>
        <ul className="mt-3 space-y-2">
          {gained.map((item) => (
            <li key={item} className="text-sm text-text-2">
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="font-mono text-xs tracking-[0.12em] text-text-3 uppercase">
          What it cost
        </h3>
        <ul className="mt-3 space-y-2">
          {cost.map((item) => (
            <li key={item} className="text-sm text-text-2">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function Figure({
  image,
  label,
}: {
  image: ProjectImageData;
  label: string;
}) {
  return (
    <figure className="my-8">
      <ProjectImage image={image} label={label} />
      {image.caption ? (
        <figcaption className="mt-3 text-sm text-text-3">
          {image.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

/**
 * Required in every case study by tests/honesty.test.ts.
 *
 * An engineer who names his own weak spots reads as senior, and it costs
 * nothing with a recruiter, who will not read this far. It also means an
 * interviewer cannot find the flaw before I have named it.
 */
export function KnownLimits({ children }: { children: React.ReactNode }) {
  return (
    <section className="mt-14 rounded-lg border border-dashed border-border-strong p-6">
      <h2 className="text-xl">What I&rsquo;d do differently</h2>
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}
