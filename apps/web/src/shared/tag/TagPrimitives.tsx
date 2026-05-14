import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

type TagVariant = "neutral" | "brand" | "info" | "success" | "warning" | "danger";
type TagShape = "rounded" | "pill";
type TagSize = "sm" | "md";

type TagProps = HTMLAttributes<HTMLSpanElement> & {
  dot?: boolean;
  icon?: ReactNode;
  shape?: TagShape;
  size?: TagSize;
  variant?: TagVariant;
};

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export const Tag = forwardRef<HTMLSpanElement, TagProps>(function Tag(
  {
    children,
    className,
    dot,
    icon,
    shape = "pill",
    size = "sm",
    variant = "neutral",
    ...props
  },
  ref
) {
  return (
    <span
      {...props}
      className={cx("ui-tag", `ui-tag-${variant}`, `ui-tag-size-${size}`, `ui-tag-shape-${shape}`, className)}
      data-shape={shape}
      data-size={size}
      data-usage="category"
      data-variant={variant}
      ref={ref}
    >
      {dot ? <span aria-hidden="true" className="ui-tag-dot" /> : null}
      {icon ? (
        <span aria-hidden="true" className="ui-tag-icon">
          {icon}
        </span>
      ) : null}
      {children ? <span className="ui-tag-label">{children}</span> : null}
    </span>
  );
});
