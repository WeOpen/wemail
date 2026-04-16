import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { WemailLogo } from "../shared/WemailLogo";

function readPngSize(path: string) {
  const buffer = readFileSync(path);
  const signature = buffer.subarray(0, 8).toString("hex");
  if (signature !== "89504e470d0a1a0a") {
    throw new Error(`Expected PNG signature for ${path}`);
  }

  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20)
  };
}

describe("brand assets", () => {
  it("adds a centered wax seal to the React logo mark", () => {
    const markup = renderToStaticMarkup(createElement(WemailLogo));

    expect(markup).toContain('x="3.5" y="10.5" width="57" height="41" rx="14.5"');
    expect(markup).toContain('stroke-linecap="round"');
    expect(markup).toContain('cx="32" cy="40.5" fill="var(--accent, currentColor)" r="9"');
    expect(markup).toContain('d="M26.6 43.6V34.4L32 41L37.4 34.4V43.6"');
  });

  it("uses a tighter favicon composition with a centered wax seal for better small-size legibility", () => {
    const faviconPath = resolve(process.cwd(), "public", "brand", "favicon.svg");
    const svg = readFileSync(faviconPath, "utf8");

    expect(svg).toContain('rect x="2" y="10" width="60" height="44" rx="16"');
    expect(svg).toContain('stroke-linecap="round"');
    expect(svg).toContain('circle cx="32" cy="42.5" r="10"');
  });

  it("keeps the shared icon asset in sync with the sealed-envelope mark", () => {
    const iconPath = resolve(process.cwd(), "public", "brand", "icon.svg");
    const svg = readFileSync(iconPath, "utf8");

    expect(svg).toContain('rect x="8" y="24" width="112" height="80" rx="28"');
    expect(svg).toContain('stroke-linecap="round"');
    expect(svg).toContain('circle cx="64" cy="82.5" r="18"');
    expect(svg).toContain('d="M53.2 90V71L64 84.5L74.8 71V90"');
  });

  it("keeps the mono icon seal as a line-drawn M", () => {
    const iconPath = resolve(process.cwd(), "public", "brand", "icon-mono.svg");
    const svg = readFileSync(iconPath, "utf8");

    expect(svg).toContain('rect x="3.5" y="12" width="57" height="41" rx="14.5"');
    expect(svg).toContain('circle cx="32" cy="41.5" r="9" fill="none"');
    expect(svg).toContain('d="M26.6 44.6V35.4L32 42L37.4 35.4V44.6"');
  });

  it("ships raster icon sizes for browsers, Apple touch, and Android/PWA", () => {
    const brandDir = resolve(process.cwd(), "public", "brand");
    const icon16 = readPngSize(resolve(brandDir, "favicon-16x16.png"));
    const icon32 = readPngSize(resolve(brandDir, "favicon-32x32.png"));
    const icon48 = readPngSize(resolve(brandDir, "favicon-48x48.png"));
    const apple = readPngSize(resolve(brandDir, "apple-touch-icon.png"));
    const chrome192 = readPngSize(resolve(brandDir, "android-chrome-192x192.png"));
    const chrome512 = readPngSize(resolve(brandDir, "android-chrome-512x512.png"));
    const ico = readFileSync(resolve(brandDir, "favicon.ico"));

    expect(icon16).toEqual({ width: 16, height: 16 });
    expect(icon32).toEqual({ width: 32, height: 32 });
    expect(icon48).toEqual({ width: 48, height: 48 });
    expect(apple).toEqual({ width: 180, height: 180 });
    expect(chrome192).toEqual({ width: 192, height: 192 });
    expect(chrome512).toEqual({ width: 512, height: 512 });
    expect(ico.length).toBeGreaterThan(0);
  });

  it("wires multi-size favicon and app icons into HTML and manifest", () => {
    const indexHtml = readFileSync(resolve(process.cwd(), "index.html"), "utf8");
    const manifest = readFileSync(resolve(process.cwd(), "public", "brand", "site.webmanifest"), "utf8");

    expect(indexHtml).toContain('rel="icon" type="image/svg+xml" href="/brand/favicon.svg"');
    expect(indexHtml).toContain('rel="icon" type="image/png" sizes="32x32" href="/brand/favicon-32x32.png"');
    expect(indexHtml).toContain('rel="icon" type="image/png" sizes="16x16" href="/brand/favicon-16x16.png"');
    expect(indexHtml).toContain('rel="shortcut icon" href="/brand/favicon.ico"');
    expect(indexHtml).toContain('rel="apple-touch-icon" sizes="180x180" href="/brand/apple-touch-icon.png"');

    expect(manifest).toContain('/brand/android-chrome-192x192.png');
    expect(manifest).toContain('/brand/android-chrome-512x512.png');
    expect(manifest).toContain('"sizes": "192x192"');
    expect(manifest).toContain('"sizes": "512x512"');
  });
});
