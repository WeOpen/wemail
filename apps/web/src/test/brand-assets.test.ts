import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { WemailLogo } from "../shared/WemailLogo";

describe("brand assets", () => {
  it("adds a centered wax seal to the React logo mark", () => {
    const markup = renderToStaticMarkup(createElement(WemailLogo));

    expect(markup).toContain('circle cx="32" cy="38.5" r="7.5"');
    expect(markup).toContain('d="M27.5 41.5V35L32 40.75L36.5 35V41.5"');
  });

  it("uses a tighter favicon composition with a centered wax seal for better small-size legibility", () => {
    const faviconPath = resolve(process.cwd(), "public", "brand", "favicon.svg");
    const svg = readFileSync(faviconPath, "utf8");

    expect(svg).toContain('rect x="8" y="16" width="48" height="32"');
    expect(svg).toContain('path d="M10 20L22 31.5L32 24L42 31.5L54 20"');
    expect(svg).toContain('circle cx="32" cy="38.5" r="7.5"');
  });

  it("keeps the shared icon asset in sync with the sealed-envelope mark", () => {
    const iconPath = resolve(process.cwd(), "public", "brand", "icon.svg");
    const svg = readFileSync(iconPath, "utf8");

    expect(svg).toContain('path d="M22 40L44 61L64 47L84 61L106 40"');
    expect(svg).toContain('circle cx="64" cy="77" r="15"');
    expect(svg).toContain('d="M55 85V72L64 83.5L73 72V85"');
  });

  it("keeps the mono icon seal as a line-drawn M", () => {
    const iconPath = resolve(process.cwd(), "public", "brand", "icon-mono.svg");
    const svg = readFileSync(iconPath, "utf8");

    expect(svg).toContain('circle cx="32" cy="38.5" r="7.5" fill="none"');
    expect(svg).toContain('d="M27.5 41.5V35L32 40.75L36.5 35V41.5"');
  });
});
