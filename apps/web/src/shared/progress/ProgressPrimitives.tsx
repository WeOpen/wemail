import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

type ProgressSize = "sm" | "md" | "lg";
type ProgressVariant = "neutral" | "brand" | "success" | "warning" | "danger";

type ProgressProps = Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
  formatValue?: (percentage: number, value: number, max: number) => ReactNode;
  indeterminate?: boolean;
  max?: number;
  showValueLabel?: boolean;
  size?: ProgressSize;
  value?: number;
  variant?: ProgressVariant;
};

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(function Progress(
  {
    className,
    formatValue,
    indeterminate = false,
    max = 100,
    showValueLabel = false,
    size = "md",
    value = 0,
    variant = "brand",
    ...props
  },
  ref
) {
  const boundedMax = Math.max(max, 1);
  const boundedValue = clamp(value, 0, boundedMax);
  const percentage = Math.round((boundedValue / boundedMax) * 100);
  const valueLabel = formatValue?.(percentage, boundedValue, boundedMax) ?? `${percentage}%`;

  return (
    <div
      {...props}
      aria-valuemax={indeterminate ? undefined : boundedMax}
      aria-valuemin={indeterminate ? undefined : 0}
      aria-valuenow={indeterminate ? undefined : boundedValue}
      className={cx("ui-progress", `ui-progress-${variant}`, `ui-progress-${size}`, className)}
      data-state={indeterminate ? "indeterminate" : "determinate"}
      ref={ref}
      role="progressbar"
    >
      <span className="ui-progress-track">
        <span
          className="ui-progress-indicator"
          style={indeterminate ? undefined : { width: `${percentage}%` }}
        />
      </span>
      {showValueLabel ? <span className="ui-progress-label">{valueLabel}</span> : null}
    </div>
  );
});
