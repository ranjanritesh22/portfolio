import { cn } from "@/lib/cn";

/** A tech token. Rendered in mono so a stack list scans as a list, not prose. */
export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded border border-border-default bg-bg-subtle px-2 py-[3px] font-mono text-xs text-text-2">
      {children}
    </span>
  );
}

export function TagList({
  items,
  className,
}: {
  items: string[];
  className?: string;
}) {
  return (
    <ul className={cn("flex flex-wrap gap-1.5", className)}>
      {items.map((item) => (
        <li key={item}>
          <Tag>{item}</Tag>
        </li>
      ))}
    </ul>
  );
}
