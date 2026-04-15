import type { HTMLAttributes } from "react";

type WemailWordmarkProps = HTMLAttributes<HTMLSpanElement> & {
  compact?: boolean;
};

export function WemailWordmark({ className, compact = false, ...props }: WemailWordmarkProps) {
  const nextClassName = ["wemail-wordmark", compact ? "compact" : "", className].filter(Boolean).join(" ");

  return (
    <span {...props} aria-hidden="true" className={nextClassName}>
      <span className="wemail-wordmark-we">We</span>
      <span className="wemail-wordmark-mail">Mail</span>
    </span>
  );
}
