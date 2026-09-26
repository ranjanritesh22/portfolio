import { cn } from "@/lib/cn";
import { Container } from "./container";

type SectionProps = {
  id: string;
  /** Rendered as a small uppercase eyebrow, not a heading — see the note below. */
  label?: string;
  width?: "prose" | "wide";
  className?: string;
  children: React.ReactNode;
};

/**
 * One section rhythm for the whole page: padding is applied on both sides, so
 * the gap between two sections is twice the token (112px desktop, 80px mobile).
 *
 * The label is a visually-small `h2` rather than a styled `div`: screen-reader
 * users navigate by heading, so the document outline has to stay real even
 * where the visual design plays the heading down to an eyebrow.
 */
export function Section({
  id,
  label,
  width = "wide",
  className,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={label ? `${id}-label` : undefined}
      className={cn("py-section-sm sm:py-section", className)}
    >
      <Container width={width}>
        {label ? (
          <h2
            id={`${id}-label`}
            className="mb-10 font-mono text-xs font-medium tracking-[0.14em] text-text-3 uppercase"
          >
            {label}
          </h2>
        ) : null}
        {children}
      </Container>
    </section>
  );
}
