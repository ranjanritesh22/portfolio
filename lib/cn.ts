/**
 * Joins class names, dropping anything falsy.
 *
 * Deliberately not clsx + tailwind-merge. Every component here owns its own
 * classes and none of them accept a `className` that needs to override a
 * conflicting utility, so a merge pass would cost two dependencies and a
 * runtime parse to solve a problem this site does not have.
 */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
