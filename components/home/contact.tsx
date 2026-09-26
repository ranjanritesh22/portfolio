import { LinkButton } from "@/components/primitives/link-button";
import {
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
} from "@/components/primitives/icons";
import { profile } from "@/content/profile";

/**
 * The only place on the site where intent is stated outright, and it comes
 * after all the evidence. In the hero the same sentence would read as a
 * demand; here it reads as a preference.
 *
 * No contact form. A form is a failure point, it needs a backend and a spam
 * strategy, and nobody trusts one on a portfolio. An email address they can
 * select and paste is strictly better.
 */
export function Contact() {
  return (
    <div className="max-w-[60ch]">
      <h2 className="text-2xl">What I&rsquo;m looking for</h2>

      <p className="mt-5 text-lg text-text-2">
        A senior frontend role where I own features end to end. I&rsquo;m glad
        to carry full-stack scope — schema, API and deploy — on the products I
        work on, and the work above is the evidence that I already do.
      </p>

      <p className="mt-4 text-text-2">
        {profile.availability}. If you&rsquo;re hiring, or just want to talk
        about something here, email is the fastest way to reach me.
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        <LinkButton href={`mailto:${profile.email}`} variant="solid" external>
          <MailIcon className="size-4" />
          {profile.email}
        </LinkButton>
        <LinkButton href={profile.links.linkedin} external>
          <LinkedInIcon className="size-4" />
          LinkedIn
        </LinkButton>
        <LinkButton href={profile.links.github} external>
          <GitHubIcon className="size-4" />
          GitHub
        </LinkButton>
      </div>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border-default py-10">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-6 text-sm text-text-3 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
      </div>
    </footer>
  );
}
