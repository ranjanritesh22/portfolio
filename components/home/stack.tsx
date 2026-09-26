import { BrandIcon, Monogram } from "@/components/primitives/brand-icon";
import { capabilities } from "@/content/capabilities";

/**
 * The stack, as a ruled table: group on the left, tools on the right.
 *
 * Rows rather than cards because the groups differ a lot in size — ten tools
 * in one, three in another — and a card grid would turn that difference into
 * ragged boxes. Practices sit under the tools as a quieter line, because they
 * are things he does rather than things he installs.
 */
export function Stack() {
  return (
    <dl className="border-b border-border-default">
      {capabilities.map((group) => (
        <div
          key={group.title}
          className="border-t border-border-default py-6 md:grid md:grid-cols-[13rem_1fr] md:gap-10"
        >
          <dt className="font-serif text-lg text-text-1">{group.title}</dt>
          <dd className="mt-4 md:mt-0">
            <ul className="flex flex-wrap gap-2">
              {group.tools.map((tool) => (
                <li
                  key={tool.name}
                  className="inline-flex items-center gap-2 rounded-md border border-border-default bg-bg-elevated px-2.5 py-1.5 text-sm text-text-1"
                >
                  {tool.icon ? <BrandIcon name={tool.icon} /> : <Monogram name={tool.name} />}
                  {tool.name}
                </li>
              ))}
            </ul>
            {group.practices ? (
              <p className="mt-3 text-sm text-text-3">{group.practices.join(" · ")}</p>
            ) : null}
          </dd>
        </div>
      ))}
    </dl>
  );
}
