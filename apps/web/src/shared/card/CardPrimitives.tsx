import { forwardRef, type HTMLAttributes } from "react";

type CardVariant = "base" | "data" | "status" | "accent";
type CardPadding = "none" | "sm" | "md" | "lg";
type CardElevation = "flat" | "sm" | "md" | "lg";
type CardTone = "neutral" | "brand" | "info" | "success" | "warning" | "danger";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  elevation?: CardElevation;
  isInteractive?: boolean;
  padding?: CardPadding;
  tone?: CardTone;
  variant?: CardVariant;
};

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  {
    className,
    elevation = "sm",
    isInteractive,
    padding = "md",
    tone = "neutral",
    variant = "base",
    ...props
  },
  ref
) {
  return (
    <div
      {...props}
      className={cx(
        "ui-card",
        `ui-card-${variant}`,
        `ui-card-padding-${padding}`,
        `ui-card-elevation-${elevation}`,
        `ui-card-tone-${tone}`,
        isInteractive && "is-interactive",
        className
      )}
      data-elevation={elevation}
      data-padding={padding}
      data-state={isInteractive ? "interactive" : undefined}
      data-tone={tone}
      data-variant={variant}
      ref={ref}
    />
  );
});

export const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function CardHeader(
  { className, ...props },
  ref
) {
  return <div {...props} className={cx("ui-card-header", className)} ref={ref} />;
});

export const CardBody = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function CardBody(
  { className, ...props },
  ref
) {
  return <div {...props} className={cx("ui-card-body", className)} ref={ref} />;
});

export const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function CardFooter(
  { className, ...props },
  ref
) {
  return <div {...props} className={cx("ui-card-footer", className)} ref={ref} />;
});
