import { forwardRef, type CSSProperties, type HTMLAttributes } from "react";
import { type LucideIcon } from "lucide-react";

type IconSize = "xs" | "sm" | "md" | "lg" | number;
type IconTone = "current" | "muted" | "accent" | "success" | "warning" | "danger";

type IconProps = Omit<HTMLAttributes<HTMLSpanElement>, "children"> & {
  decorative?: boolean;
  icon: LucideIcon;
  label?: string;
  size?: IconSize;
  strokeWidth?: number;
  tone?: IconTone;
};

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function resolveSizeClass(size: IconSize) {
  return typeof size === "number" ? undefined : `ui-icon-${size}`;
}

function resolveStyle(size: IconSize, style?: CSSProperties) {
  if (typeof size !== "number") return style;
  return { ...style, "--icon-size": `${size}px` } as CSSProperties;
}

export const Icon = forwardRef<HTMLSpanElement, IconProps>(function Icon(
  {
    className,
    decorative,
    icon: Glyph,
    label,
    size = "md",
    strokeWidth = 1.8,
    style,
    tone = "current",
    ...props
  },
  ref
) {
  const isDecorative = decorative ?? !label;

  return (
    <span
      {...props}
      aria-hidden={isDecorative ? true : undefined}
      aria-label={!isDecorative ? label : undefined}
      className={cx("ui-icon", resolveSizeClass(size), tone !== "current" && `ui-tone-${tone}`, className)}
      ref={ref}
      role={!isDecorative ? "img" : undefined}
      style={resolveStyle(size, style)}
    >
      <Glyph absoluteStrokeWidth aria-hidden="true" className="ui-icon-svg" strokeWidth={strokeWidth} />
    </span>
  );
});
