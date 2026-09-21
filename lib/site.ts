/**
 * The one place the production URL is written down.
 *
 * Canonical links, OG image URLs, the sitemap and the JSON-LD all derive from
 * this. Changing the domain is therefore a single edit here, or a single
 * environment variable on the host — which matters because LinkedIn caches a
 * scraped card aggressively, so the first scrape against the real domain
 * should be the correct one.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://riteshranjan.dev"
).replace(/\/$/, "");

export function absoluteUrl(path = "/"): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
