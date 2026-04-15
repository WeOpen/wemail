import type { SVGProps } from "react";

type WemailLogoProps = SVGProps<SVGSVGElement> & {
  title?: string;
};

export function WemailLogo({ title = "WeMail logo", ...props }: WemailLogoProps) {
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
        d="M7 14H57V50H7V14Z"
        stroke="currentColor"
        strokeLinejoin="miter"
        strokeWidth="4"
      />
      <path
        className="wemail-logo-envelope"
        d="M10 19L23.5 31.5L32 24.5L40.5 31.5L54 19"
        stroke="currentColor"
        strokeLinecap="square"
        strokeLinejoin="miter"
        strokeWidth="4"
      />
      <path
        className="wemail-logo-fold"
        d="M23.5 31.5L32 24.5L40.5 31.5"
        stroke="var(--accent, currentColor)"
        strokeLinecap="square"
        strokeLinejoin="miter"
        strokeWidth="4"
      />
      <path
        className="wemail-logo-envelope"
        d="M10 45L25 32"
        stroke="currentColor"
        strokeLinecap="square"
        strokeLinejoin="miter"
        strokeWidth="4"
      />
      <path
        className="wemail-logo-envelope"
        d="M54 45L39 32"
        stroke="currentColor"
        strokeLinecap="square"
        strokeLinejoin="miter"
        strokeWidth="4"
      />
      <g className="wemail-logo-seal-group">
        <circle
          className="wemail-logo-seal"
          cx="32"
          cy="40"
          fill="var(--accent, currentColor)"
          r="8.75"
          stroke="currentColor"
          strokeWidth="3"
        />
        <path
          className="wemail-logo-monogram"
          d="M26.75 43.5V35.5L32 42L37.25 35.5V43.5"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.35"
        />
      </g>
    </svg>
  );
}
