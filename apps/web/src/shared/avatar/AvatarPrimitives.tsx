import { forwardRef, useState, type HTMLAttributes, type ReactNode } from "react";

type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";
type AvatarShape = "circle" | "square";

type AvatarProps = HTMLAttributes<HTMLSpanElement> & {
  alt?: string;
  fallback?: ReactNode;
  name?: string;
  shape?: AvatarShape;
  size?: AvatarSize;
  src?: string;
};

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function getInitials(name?: string, alt?: string) {
  const source = name ?? alt ?? "";
  const parts = source
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2);

  if (parts.length === 0) return "?";
  return parts.map((part) => part.charAt(0).toUpperCase()).join("");
}

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(
  {
    alt,
    className,
    fallback,
    name,
    shape = "circle",
    size = "md",
    src,
    ...props
  },
  ref
) {
    const [hasImageError, setHasImageError] = useState(false);
    const initials = fallback ?? getInitials(name, alt);
    const canRenderImage = Boolean(src && !hasImageError);

    return (
      <span
        {...props}
        className={cx("ui-avatar", `ui-avatar-${size}`, `ui-avatar-${shape}`, className)}
        data-state={canRenderImage ? "image" : "fallback"}
        ref={ref}
      >
        {canRenderImage ? (
          <img alt={alt} className="ui-avatar-image" onError={() => setHasImageError(true)} src={src} />
        ) : (
          <span aria-hidden="true" className="ui-avatar-fallback" data-testid="avatar-fallback">
            {initials}
          </span>
        )}
      </span>
    );
  }
);
