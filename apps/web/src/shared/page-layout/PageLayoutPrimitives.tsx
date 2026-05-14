import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

type PageProps = HTMLAttributes<HTMLElement> & {
  as?: "div" | "main" | "section";
};

type PageHeaderProps = HTMLAttributes<HTMLElement> & {
  actions?: ReactNode;
  description?: ReactNode;
  kicker?: ReactNode;
  title?: ReactNode;
};

type PageBodyProps = HTMLAttributes<HTMLDivElement> & {
  hasSidebar?: boolean;
};

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export const Page = forwardRef<HTMLElement, PageProps>(function Page(
  { as = "main", className, ...props },
  ref
) {
  const Comp = as;

  return <Comp {...props} className={cx("ui-page", className)} ref={ref as never} />;
});

export const PageHeader = forwardRef<HTMLElement, PageHeaderProps>(function PageHeader(
  { actions, children, className, description, kicker, title, ...props },
  ref
) {
  return (
    <section {...props} className={cx("ui-page-header", className)} ref={ref}>
      <div className="ui-page-header-main">
        {kicker ? <p className="panel-kicker ui-page-header-kicker">{kicker}</p> : null}
        {title ? <h1 className="ui-page-header-title">{title}</h1> : null}
        {description ? <p className="section-copy ui-page-header-description">{description}</p> : null}
        {children}
      </div>
      {actions ? <div className="ui-page-header-actions">{actions}</div> : null}
    </section>
  );
});

export const PageToolbar = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function PageToolbar(
  { className, ...props },
  ref
) {
  return <div {...props} className={cx("ui-page-toolbar", className)} ref={ref} />;
});

export const PageBody = forwardRef<HTMLDivElement, PageBodyProps>(function PageBody(
  { className, hasSidebar = false, ...props },
  ref
) {
  return (
    <div
      {...props}
      className={cx("ui-page-body", hasSidebar && "ui-page-body-with-sidebar", className)}
      ref={ref}
    />
  );
});

export const PageMain = forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>(function PageMain(
  { className, ...props },
  ref
) {
  return <section {...props} className={cx("ui-page-main", className)} ref={ref} />;
});

export const PageSidebar = forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>(function PageSidebar(
  { className, ...props },
  ref
) {
  return <aside {...props} className={cx("ui-page-sidebar", className)} ref={ref} />;
});
