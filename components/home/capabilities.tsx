import { principles } from "@/content/capabilities";

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
