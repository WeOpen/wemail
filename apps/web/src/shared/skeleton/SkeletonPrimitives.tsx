import { forwardRef, type CSSProperties, type HTMLAttributes } from "react";

type SkeletonShape = "rect" | "text" | "circle";
type SkeletonRounded = boolean | "sm" | "md" | "lg" | "full";

type SkeletonProps = HTMLAttributes<HTMLDivElement> & {
  animated?: boolean;
  announce?: boolean;
  height?: CSSProperties["height"];
  label?: string;
  rounded?: SkeletonRounded;
  shape?: SkeletonShape;
  width?: CSSProperties["width"];
};

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function roundedClassName(rounded: SkeletonRounded | undefined) {
  if (!rounded) return undefined;
  if (rounded === true) return "ui-skeleton-rounded-md";
  return `ui-skeleton-rounded-${rounded}`;
}

function mergeStyle(width: SkeletonProps["width"], height: SkeletonProps["height"], style?: CSSProperties) {
  const nextStyle: CSSProperties = {};

  if (width !== undefined) nextStyle.width = width;
  if (height !== undefined) nextStyle.height = height;

  return Object.keys(nextStyle).length ? { ...style, ...nextStyle } : style;
}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(function Skeleton(
  {
    animated = false,
    announce = false,
    className,
    height,
    label = "内容加载中",
    rounded,
    shape = "rect",
    style,
    width,
    ...props
  },
  ref
) {
  return (
    <div
      {...props}
      aria-hidden={!announce ? true : undefined}
      aria-label={announce ? label : undefined}
      aria-live={announce ? "polite" : undefined}
      className={cx(
        "ui-skeleton",
        `ui-skeleton-${shape}`,
        animated && "ui-skeleton-animated",
        roundedClassName(rounded),
        className
      )}
      data-shape={shape}
      data-state={animated ? "loading" : "idle"}
      ref={ref}
      role={announce ? "status" : undefined}
      style={mergeStyle(width, height, style)}
    />
  );
});
