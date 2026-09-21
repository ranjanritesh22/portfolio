import Image from "next/image";

import type { ProjectImage as ProjectImageData } from "@/content/types";
import { cn } from "@/lib/cn";

type ProjectImageProps = {
  image: ProjectImageData;
  /** Shown in the placeholder so an empty slot still says what belongs there. */
  label: string;
  priority?: boolean;
  className?: string;
};

/**
 * One component for both states, so the page never has to branch on whether a
 * screenshot exists yet.
 *
 * The placeholder is composed rather than blank. A visitor who arrives before
 * the screenshots do should read the panel as a design choice, not as a site
 * that failed to load — which is the difference between "in progress" and
 * "broken", and only one of those is survivable in a cold link.
 */
export function ProjectImage({
  image,
  label,
  priority = false,
  className,
}: ProjectImageProps) {
  const shared = "relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-border-default";

  if (image.src) {
    return (
      <figure className={cn(shared, "bg-bg-subtle", className)}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority={priority}
          // Cards sit one-up on mobile and two-up from `sm`, capped by the
          // 1024px container — so the browser never fetches a 2x asset for a
          // slot that is 480px wide.
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 512px"
          className="object-cover object-top"
        />
      </figure>
    );
  }

  return (
    <div
      className={cn(shared, "bg-bg-subtle", className)}
      // Decorative: the surrounding card already names the project, so
      // announcing the placeholder would only add noise.
      role="presentation"
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.55] [background-image:linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [background-size:28px_28px]"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="rounded border border-border-default bg-bg px-2.5 py-1 font-mono text-xs text-text-3">
          {label}
        </span>
      </div>
    </div>
  );
}
