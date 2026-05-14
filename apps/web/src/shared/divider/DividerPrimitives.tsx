import { forwardRef, type HTMLAttributes } from "react";

type DividerOrientation = "horizontal" | "vertical";
type DividerInset = "none" | "sm" | "md" | "lg";

type DividerProps = HTMLAttributes<HTMLDivElement> & {
  dashed?: boolean;
  decorative?: boolean;
  inset?: DividerInset;
  orientation?: DividerOrientation;
};

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export const Divider = forwardRef<HTMLDivElement, DividerProps>(function Divider(
  {
    className,
    dashed = false,
    decorative = false,
    inset = "none",
    orientation = "horizontal",
    ...props
  },
  ref
) {
  const isVertical = orientation === "vertical";

  return (
    <div
      {...props}
      aria-hidden={decorative ? true : undefined}
      aria-orientation={!decorative && isVertical ? "vertical" : undefined}
      className={cx(
        "ui-divider",
        `ui-divider-${orientation}`,
        inset !== "none" && `ui-divider-inset-${inset}`,
        dashed && "ui-divider-dashed",
        className
      )}
      data-orientation={orientation}
      ref={ref}
      role={decorative ? "presentation" : "separator"}
    />
  );
});
