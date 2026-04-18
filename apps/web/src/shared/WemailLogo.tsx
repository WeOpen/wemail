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
      <rect
        className="wemail-logo-envelope"
        x="4"
        y="12"
        width="56"
        height="40"
        rx="14"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="wemail-logo-envelope"
        d="M10 20.5L23.25 31.75L32 25.25L40.75 31.75L54 20.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
      />
      <path
        className="wemail-logo-fold"
        d="M23.25 31.75L32 25.25L40.75 31.75"
        stroke="var(--accent, currentColor)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
      />
      <path
        className="wemail-logo-envelope"
        d="M10.5 47L24.5 34"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
      />
      <path
        className="wemail-logo-envelope"
        d="M53.5 47L39.5 34"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
      />
      <g className="wemail-logo-seal-group">
        <circle
          className="wemail-logo-seal"
          cx="32"
          cy="42.5"
          fill="var(--accent, currentColor)"
          r="9.5"
          stroke="currentColor"
          strokeWidth="3"
        />
        <path
          className="wemail-logo-monogram"
          d="M26.4 45.6V35.2L32 42L37.6 35.2V45.6"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.35"
        />
      </g>
    </svg>
  );
}
