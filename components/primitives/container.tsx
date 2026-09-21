import { cn } from "@/lib/cn";

type ContainerProps = {
  /**
   * `prose` caps at ~68ch because long-form reading breaks down past that.
   * `wide` is for card grids, which need the horizontal room.
   */
  width?: "prose" | "wide";
  className?: string;
  children: React.ReactNode;
};

export function Container({
  width = "wide",
  className,
  children,
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-6 sm:px-8",
        width === "prose" ? "max-w-[68ch]" : "max-w-5xl",
        className,
      )}
    >
      {children}
    </div>
  );
}
