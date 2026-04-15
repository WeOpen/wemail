import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { WemailLogo } from "../shared/WemailLogo";

describe("brand assets", () => {
  it("adds a centered wax seal to the React logo mark", () => {
    const markup = renderToStaticMarkup(createElement(WemailLogo));

    expect(markup).toContain('d="M7 14H57V50H7V14Z"');
    expect(markup).toContain('cx="32" cy="40" fill="var(--accent, currentColor)" r="8.75"');
    expect(markup).toContain('d="M26.75 43.5V35.5L32 42L37.25 35.5V43.5"');
  });

  it("uses a tighter favicon composition with a centered wax seal for better small-size legibility", () => {
    const faviconPath = resolve(process.cwd(), "public", "brand", "favicon.svg");
    const svg = readFileSync(faviconPath, "utf8");

    expect(svg).toContain('rect x="6" y="14" width="52" height="36"');
    expect(svg).toContain('path d="M10 19L23.5 31.5L32 24.5L40.5 31.5L54 19"');
    expect(svg).toContain('circle cx="32" cy="40" r="8.75"');
  });

  it("keeps the shared icon asset in sync with the sealed-envelope mark", () => {
    const iconPath = resolve(process.cwd(), "public", "brand", "icon.svg");
    const svg = readFileSync(iconPath, "utf8");

    expect(svg).toContain('path d="M18 38L45 63L64 49L83 63L110 38"');
    expect(svg).toContain('circle cx="64" cy="80" r="17.5"');
    expect(svg).toContain('d="M53.5 87V71L64 84L74.5 71V87"');
  });

  it("keeps the mono icon seal as a line-drawn M", () => {
    const iconPath = resolve(process.cwd(), "public", "brand", "icon-mono.svg");
    const svg = readFileSync(iconPath, "utf8");

    expect(svg).toContain('circle cx="32" cy="40" r="8.75" fill="none"');
    expect(svg).toContain('d="M26.75 43.5V35.5L32 42L37.25 35.5V43.5"');
  });
});
