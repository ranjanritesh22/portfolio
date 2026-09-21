import { TagList } from "@/components/primitives/tag";
import { education, experience } from "@/content/experience";

export function ExperienceList() {
  return (
    <div className="space-y-12">
      {experience.map((role) => (
        <article
          key={role.company}
          className="grid gap-4 border-t border-border-default pt-8 md:grid-cols-[minmax(0,14rem)_1fr] md:gap-10"
        >
          <div>
            <h3 className="text-lg text-text-1">{role.company}</h3>
            <p className="mt-1 text-sm text-text-2">{role.title}</p>
            <p className="mt-2 font-mono text-xs text-text-3">
              {role.start} — {role.end ?? "Present"}
            </p>
            <p className="font-mono text-xs text-text-3">{role.location}</p>
          </div>

          <div>
            <ul className="space-y-3">
              {role.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-3 text-text-2">
                  <span
                    aria-hidden
                    className="mt-[0.6em] size-1 shrink-0 rounded-full bg-border-strong"
                  />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
            <TagList items={role.tech} className="mt-5" />
          </div>
        </article>
      ))}

      <div className="grid gap-4 border-t border-border-default pt-8 md:grid-cols-[minmax(0,14rem)_1fr] md:gap-10">
        <h3 className="text-lg text-text-1">Education</h3>
        <div>
          <p className="text-text-2">{education.degree}</p>
          <p className="mt-1 text-sm text-text-3">
            {education.school} · {education.period}
          </p>
        </div>
      </div>
    </div>
  );
}
