import { forwardRef, type HTMLAttributes } from "react";

type FilterBarColumns = 2 | 3 | 4;

type FilterBarProps = HTMLAttributes<HTMLDivElement> & {
  columns?: FilterBarColumns;
};

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export const FilterBar = forwardRef<HTMLDivElement, FilterBarProps>(function FilterBar(
  { className, columns = 4, ...props },
  ref
) {
  return (
    <div
      {...props}
      className={cx("ui-filter-bar", `ui-filter-bar-columns-${columns}`, className)}
      ref={ref}
    />
  );
});

export const FilterBarActions = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function FilterBarActions(
  { className, ...props },
  ref
) {
  return <div {...props} className={cx("ui-filter-bar-actions", className)} ref={ref} />;
});

export const FilterBarSummary = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function FilterBarSummary(
  { className, ...props },
  ref
) {
  return <div {...props} className={cx("ui-filter-bar-summary", className)} ref={ref} />;
});
