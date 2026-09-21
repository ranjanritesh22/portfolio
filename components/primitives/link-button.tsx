import Link from "next/link";

import type { ProjectLink } from "@/content/types";
import { cn } from "@/lib/cn";
import { BookIcon, ExternalIcon, GitHubIcon, LockIcon } from "./icons";

const LABELS: Record<ProjectLink["kind"], string> = {
  code: "Source",
  live: "Live site",
  storybook: "Storybook",
  demo: "Demo",
  writeup: "Write-up",
};

const ICONS: Record<ProjectLink["kind"], typeof GitHubIcon> = {
  code: GitHubIcon,
  live: ExternalIcon,
  storybook: BookIcon,
  demo: ExternalIcon,
  writeup: BookIcon,
};

type LinkButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "outline" | "ghost";
  external?: boolean;
  className?: string;
};

export function LinkButton({
  href,
  children,
  variant = "outline",
  external = false,
  className,
}: LinkButtonProps) {
  const classes = cn(
    "inline-flex items-center gap-2 rounded-md px-3.5 py-2 text-sm font-medium transition-colors",
    variant === "solid" &&
      "bg-accent text-accent-fg hover:opacity-90",
    variant === "outline" &&
      "border border-border-strong text-text-1 hover:bg-bg-subtle",
    variant === "ghost" && "text-text-2 hover:text-text-1",
    className,
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        // noreferrer alongside noopener: older browsers ignore the latter, and
        // an outbound link from a portfolio has no reason to leak the referrer.
        rel="noopener noreferrer"
        className={classes}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}

/**
 * Renders a project's links according to what each one actually is.
 *
 * An `available` link is a real anchor. A `private` one renders as a muted,
 * non-interactive chip carrying its reason — silence there would leave a
 * reviewer wondering why the flagship project has no source link, and
 * "private repository" is a complete and unremarkable answer. A `planned`
 * link renders nothing at all: this site never promises a page that does not
 * exist yet.
 */
export function ProjectLinks({
  links,
  className,
}: {
  links: ProjectLink[];
  className?: string;
}) {
  const visible = links.filter((link) => link.status !== "planned");
  if (visible.length === 0) return null;

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {visible.map((link) => {
        const Icon = ICONS[link.kind];

        if (link.status === "available") {
          return (
            <LinkButton key={link.kind} href={link.href} external>
              <Icon className="size-4" />
              {LABELS[link.kind]}
            </LinkButton>
          );
        }

        return (
          <span
            key={link.kind}
            // The reason is the accessible name as well as the tooltip, so it
            // is available to a screen reader and not only to a mouse.
            title={link.reason}
            aria-label={link.reason}
            className="inline-flex items-center gap-2 rounded-md border border-dashed border-border-default px-3.5 py-2 text-sm text-text-3"
          >
            <LockIcon className="size-4" />
            Private repository
          </span>
        );
      })}
    </div>
  );
}
