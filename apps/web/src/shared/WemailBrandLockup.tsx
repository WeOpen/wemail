import type { HTMLAttributes } from "react";

import { WemailLogo } from "./WemailLogo";
import { WemailWordmark } from "./WemailWordmark";

type WemailBrandLockupProps = HTMLAttributes<HTMLSpanElement> & {
  label: string;
  compact?: boolean;
  detail?: string | null;
};

export function WemailBrandLockup({
  className,
  compact = false,
  detail = compact ? null : "edge mail operations",
  label,
  ...props
}: WemailBrandLockupProps) {
  const nextClassName = ["wemail-brand-lockup", compact ? "compact" : "", className].filter(Boolean).join(" ");

  return (
    <span {...props} aria-label={label} className={nextClassName} role="img">
      <span aria-hidden="true" className="wemail-brand-lockup-mark">
        <WemailLogo className="wemail-brand-lockup-logo" title="" />
      </span>
      <span aria-hidden="true" className="wemail-brand-lockup-copy">
        <WemailWordmark compact={compact} />
        {detail ? <small className="wemail-brand-lockup-detail">{detail}</small> : null}
      </span>
    </span>
  );
}
