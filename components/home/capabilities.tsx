import { capabilities, principles } from "@/content/capabilities";

export function Capabilities() {
  return (
    <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
      {capabilities.map((group) => (
        <div key={group.title}>
          <h3 className="text-base text-text-1">{group.title}</h3>
          <ul className="mt-4 space-y-1.5">
            {group.items.map((item) => (
              <li key={item} className="text-sm text-text-2">
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/**
 * Values, each one attached to something that can be checked. The final line
 * is a self-critique on purpose — naming your own weak spot before an
 * interviewer finds it is the cheapest credibility on the page.
 */
export function Principles() {
  return (
    <ul className="space-y-8">
      {principles.map((principle) => (
        <li
          key={principle.text}
          className="border-t border-border-default pt-6 md:grid md:grid-cols-[1fr_1fr] md:gap-10"
        >
          <p className="text-text-1">{principle.text}</p>
          <p className="mt-2 text-sm text-text-3 md:mt-0">{principle.proof}</p>
        </li>
      ))}
    </ul>
  );
}
