import type { HTMLAttributes } from "react";

import { WemailLogo } from "./WemailLogo";

type WemailLoadingShellProps = HTMLAttributes<HTMLElement> & {
  title?: string;
  detail?: string;
};

export function WemailLoadingShell({
  className,
  title = "Preparing WeMail",
  detail = "Loading session, workspace, and mailbox context.",
  ...props
}: WemailLoadingShellProps) {
  const nextClassName = ["shell", "wemail-loading-shell", className].filter(Boolean).join(" ");

  return (
    <main {...props} aria-busy="true" aria-live="polite" className={nextClassName} role="status">
      <section className="wemail-loading-panel">
        <span className="sr-only">
          {title}. {detail}
        </span>
        <div aria-label="WeMail loading mark" className="wemail-loading-mark" role="img">
          <span aria-hidden="true" className="wemail-loading-glow" />
          <span aria-hidden="true" className="wemail-loading-echo" />
          <WemailLogo className="wemail-loading-logo" title="" />
        </div>

        <div className="wemail-loading-copy">
          <span className="eyebrow wemail-loading-kicker">Loading workspace</span>
        </div>
      </section>
    </main>
  );
}
