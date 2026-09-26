import Image from "next/image";

import { ThemeToggle } from "@/components/primitives/theme-toggle";
import { LinkButton } from "@/components/primitives/link-button";
import { Container } from "@/components/primitives/container";
import {
  ExternalIcon,
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
} from "@/components/primitives/icons";
import { profile } from "@/content/profile";

/**
 * Everything a recruiter needs in five seconds: who, what level, where, and
 * how to make contact. A photo puts a face to a cold link (D21). No animation,
 * no scroll reveal — the content must exist at first paint for crawlers and
 * link previews, and a hero that animates in is a hero that is blank when a
 * screenshot is taken.
 */
export function Hero() {
  return (
    <header className="pt-10 pb-4 sm:pt-16">
      <Container>
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs tracking-[0.14em] text-text-3 uppercase">
            {profile.name}
          </span>
          <ThemeToggle />
        </div>

        <div className="mt-16 sm:mt-24">
          <Image
            src={profile.photo.src}
            alt={profile.photo.alt}
            width={112}
            height={112}
            priority
            className="mb-8 size-24 rounded-full border border-border-default object-cover sm:size-28"
          />
          <h1 className="text-3xl sm:text-4xl">{profile.role}</h1>

          <p className="mt-6 max-w-[54ch] text-lg text-text-2">
            {profile.positioning}
          </p>

          <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-2 text-sm">
            <div className="flex gap-2">
              <dt className="text-text-3">Experience</dt>
              <dd className="text-text-1">4+ years</dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-text-3">Based in</dt>
              <dd className="text-text-1">{profile.location}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-text-3">Open to</dt>
              <dd className="text-text-1">Remote, hybrid & on-site</dd>
            </div>
          </dl>

          <div className="mt-10 flex flex-wrap gap-2">
            <LinkButton href={`mailto:${profile.email}`} variant="solid" external>
              <MailIcon className="size-4" />
              Get in touch
            </LinkButton>
            <LinkButton href={profile.resumePath} external>
              <ExternalIcon className="size-4" />
              Résumé
            </LinkButton>
            <LinkButton href={profile.links.github} external>
              <GitHubIcon className="size-4" />
              GitHub
            </LinkButton>
            <LinkButton href={profile.links.linkedin} external>
              <LinkedInIcon className="size-4" />
              LinkedIn
            </LinkButton>
          </div>
        </div>
      </Container>
    </header>
  );
}
