import { forwardRef, type HTMLAttributes } from "react";

type BadgeVariant = "neutral" | "brand" | "info" | "success" | "warning" | "danger";
type BadgeAppearance = "soft" | "solid";
type BadgeSize = "sm" | "md";
type BadgeStatusRole = "none" | "status";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  appearance?: BadgeAppearance;
  size?: BadgeSize;
  statusRole?: BadgeStatusRole;
  variant?: BadgeVariant;
};

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  {
    className,
    appearance = "soft",
    size = "sm",
    statusRole = "none",
    variant = "neutral",
    ...props
  },
  ref
) {
  return (
    <span
      {...props}
      aria-live={statusRole === "status" ? "polite" : props["aria-live"]}
      className={cx("ui-badge", `ui-badge-${variant}`, `ui-badge-${appearance}`, `ui-badge-size-${size}`, className)}
      data-appearance={appearance}
      data-size={size}
      data-usage="status"
      data-variant={variant}
      ref={ref}
      role={statusRole === "status" ? "status" : props.role}
    />
  );
});
