import {
  forwardRef,
  type HTMLAttributes,
  type ReactNode
} from "react";

type ScrollAreaOrientation = "horizontal" | "vertical";

type ScrollAreaProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  orientation?: ScrollAreaOrientation;
};

type ScrollAreaViewportProps = HTMLAttributes<HTMLDivElement>;

type ScrollAreaScrollbarProps = HTMLAttributes<HTMLDivElement> & {
  orientation?: ScrollAreaOrientation;
};

type ScrollAreaThumbProps = HTMLAttributes<HTMLDivElement>;

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export const ScrollArea = forwardRef<HTMLDivElement, ScrollAreaProps>(function ScrollArea(
  { children, className, orientation = "vertical", role = "region", ...props },
  ref
) {
  return (
    <div
      {...props}
      className={cx("ui-scroll-area", className)}
      data-orientation={orientation}
      ref={ref}
      role={role}
    >
      {children}
    </div>
  );
});

export const ScrollAreaViewport = forwardRef<HTMLDivElement, ScrollAreaViewportProps>(function ScrollAreaViewport(
  { className, ...props },
  ref
) {
  return <div {...props} className={cx("ui-scroll-area-viewport", className)} ref={ref} />;
});

export const ScrollAreaScrollbar = forwardRef<HTMLDivElement, ScrollAreaScrollbarProps>(function ScrollAreaScrollbar(
  { className, orientation = "vertical", ...props },
  ref
) {
  return (
    <div
      {...props}
      className={cx("ui-scroll-area-scrollbar", `ui-scroll-area-scrollbar-${orientation}`, className)}
      data-orientation={orientation}
      data-state="visible"
      ref={ref}
    />
  );
});

export const ScrollAreaThumb = forwardRef<HTMLDivElement, ScrollAreaThumbProps>(function ScrollAreaThumb(
  { className, ...props },
  ref
) {
  return <div {...props} className={cx("ui-scroll-area-thumb", className)} data-state="visible" ref={ref} />;
});
