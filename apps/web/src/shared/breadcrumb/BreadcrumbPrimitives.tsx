import {
  forwardRef,
  type AnchorHTMLAttributes,
  type HTMLAttributes,
  type LiHTMLAttributes,
  type OlHTMLAttributes,
  type ReactNode
} from "react";

type BreadcrumbSeparatorProps = LiHTMLAttributes<HTMLLIElement> & {
  children?: ReactNode;
};

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export const Breadcrumb = forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>(function Breadcrumb(
  { "aria-label": ariaLabel = "面包屑导航", className, ...props },
  ref
) {
  return <nav {...props} aria-label={ariaLabel} className={cx("ui-breadcrumb", className)} ref={ref} />;
});

export const BreadcrumbList = forwardRef<HTMLOListElement, OlHTMLAttributes<HTMLOListElement>>(function BreadcrumbList(
  { className, ...props },
  ref
) {
  return <ol {...props} className={cx("ui-breadcrumb-list", className)} ref={ref} />;
});

export const BreadcrumbItem = forwardRef<HTMLLIElement, LiHTMLAttributes<HTMLLIElement>>(function BreadcrumbItem(
  { className, ...props },
  ref
) {
  return <li {...props} className={cx("ui-breadcrumb-item", className)} ref={ref} />;
});

export const BreadcrumbLink = forwardRef<HTMLAnchorElement, AnchorHTMLAttributes<HTMLAnchorElement>>(function BreadcrumbLink(
  { "aria-current": ariaCurrent, className, ...props },
  ref
) {
  const dataState = ariaCurrent === "page" ? "current" : "inactive";

  return (
    <a
      {...props}
      aria-current={ariaCurrent}
      className={cx("ui-breadcrumb-link", className)}
      data-state={dataState}
      ref={ref}
    />
  );
});

export const BreadcrumbCurrent = forwardRef<HTMLSpanElement, HTMLAttributes<HTMLSpanElement>>(function BreadcrumbCurrent(
  { className, ...props },
  ref
) {
  return (
    <span
      {...props}
      aria-current="page"
      className={cx("ui-breadcrumb-current", className)}
      data-state="current"
      ref={ref}
    />
  );
});

export const BreadcrumbSeparator = forwardRef<HTMLLIElement, BreadcrumbSeparatorProps>(function BreadcrumbSeparator(
  { children = "/", className, ...props },
  ref
) {
  return (
    <li
      {...props}
      aria-hidden="true"
      className={cx("ui-breadcrumb-separator", className)}
      data-state="separator"
      ref={ref}
      role="presentation"
    >
      {children}
    </li>
  );
});
