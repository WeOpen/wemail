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
        d="M10 18H54V46H10V18Z"
        stroke="currentColor"
        strokeLinejoin="miter"
        strokeWidth="4"
      />
      <path
        d="M10 20L22 32L32 24L42 32L54 20"
        stroke="currentColor"
        strokeLinecap="square"
        strokeLinejoin="miter"
        strokeWidth="4"
      />
      <path
        d="M10 42L24 30"
        stroke="currentColor"
        strokeLinecap="square"
        strokeLinejoin="miter"
        strokeWidth="4"
      />
      <path
        d="M54 42L40 30"
        stroke="currentColor"
        strokeLinecap="square"
        strokeLinejoin="miter"
        strokeWidth="4"
      />
    </svg>
  );
}
