import type { SVGProps } from "react";

type WemailLogoProps = SVGProps<SVGSVGElement> & {
  title?: string;
};

export function WemailLogo({ title = "Wemail logo", ...props }: WemailLogoProps) {
  return (
    <svg
      aria-hidden={title ? undefined : true}
      aria-label={title || undefined}
      fill="none"
      role="img"
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        className="wemail-logo-envelope"
        d="M10 18H54V46H10V18Z"
        stroke="currentColor"
        strokeLinejoin="miter"
        strokeWidth="4"
      />
      <path
        className="wemail-logo-envelope"
        d="M10 20L22 32L32 24L42 32L54 20"
        stroke="currentColor"
        strokeLinecap="square"
        strokeLinejoin="miter"
        strokeWidth="4"
      />
      <path
        className="wemail-logo-fold"
        d="M22 32L32 24L42 32"
        stroke="var(--accent, currentColor)"
        strokeLinecap="square"
        strokeLinejoin="miter"
        strokeWidth="4"
      />
      <path
        className="wemail-logo-envelope"
        d="M10 42L24 30"
        stroke="currentColor"
        strokeLinecap="square"
        strokeLinejoin="miter"
        strokeWidth="4"
      />
      <path
        className="wemail-logo-envelope"
        d="M54 42L40 30"
        stroke="currentColor"
        strokeLinecap="square"
        strokeLinejoin="miter"
        strokeWidth="4"
      />
      <g className="wemail-logo-seal-group">
        <circle
          className="wemail-logo-seal"
          cx="32"
          cy="38.5"
          fill="var(--accent, currentColor)"
          r="7.5"
          stroke="currentColor"
          strokeWidth="3"
        />
        <path
          className="wemail-logo-monogram"
          d="M27.5 41.5V35L32 40.75L36.5 35V41.5"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.25"
        />
      </g>
    </svg>
  );
}
