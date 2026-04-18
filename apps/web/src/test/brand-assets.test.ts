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

    expect(markup).toContain('x="4" y="12" width="56" height="40" rx="14"');
    expect(markup).toContain('stroke-linecap="round"');
    expect(markup).toContain('cx="32" cy="42.5" fill="var(--accent, currentColor)" r="9.5"');
    expect(markup).toContain('d="M26.4 45.6V35.2L32 42L37.6 35.2V45.6"');
  });

  it("uses a tighter favicon composition with a centered wax seal for better small-size legibility", () => {
    const faviconPath = resolve(process.cwd(), "public", "brand", "favicon.svg");
    const svg = readFileSync(faviconPath, "utf8");

    expect(svg).toContain('rect x="4" y="12" width="56" height="40" rx="14"');
    expect(svg).toContain('stroke-linecap="round"');
    expect(svg).toContain('circle cx="32" cy="42.5" r="9.5"');
  });

  it("scales the auth, landing, and workspace brand lockups up with restrained larger sizing", () => {
    const css = readFileSync(resolve(process.cwd(), "src", "shared", "styles", "index.css"), "utf8");

    expect(css).toMatch(/\.auth-brand-logo\s*\{\s*width: 56px;\s*height: 56px;/m);
    expect(css).toMatch(/\.auth-brand-wordmark\s*\{\s*font-size: 2rem;/m);
    expect(css).toMatch(/\.auth-brand-mark\s*\{[\s\S]*?width: 96px;[\s\S]*?height: 96px;/m);
    expect(css).toMatch(
      /\.landing-nav-bar \.landing-brand-lockup\.compact \.wemail-brand-lockup-logo,[\s\S]*?width: 38px;[\s\S]*?height: 38px;/m
    );
    expect(css).toMatch(/\.landing-nav-bar \.landing-brand-lockup \.wemail-wordmark,[\s\S]*?font-size: 1\.44rem;/m);
    expect(css).toMatch(/\.workspace-brand \.workspace-brand-lockup\.compact \.wemail-brand-lockup-logo\s*\{\s*width: 38px;\s*height: 38px;/m);
    expect(css).toMatch(/\.workspace-brand \.workspace-brand-lockup \.wemail-wordmark\s*\{\s*font-size: 1\.44rem;/m);
    expect(css).toMatch(/\.landing-brand-lockup\.footer \.wemail-brand-lockup-logo\s*\{\s*width: 52px;\s*height: 52px;/m);
    expect(css).toMatch(/\.landing-brand-lockup\.footer \.wemail-wordmark\s*\{\s*font-size: 1\.86rem;/m);
  });

  it("centers the lockup detail under the wordmark and keeps the OG image brand block centered", () => {
    const wordmarkSvg = readFileSync(resolve(process.cwd(), "public", "brand", "wordmark.svg"), "utf8");
    const lockupSvg = readFileSync(resolve(process.cwd(), "public", "brand", "lockup.svg"), "utf8");
    const ogSvg = readFileSync(resolve(process.cwd(), "public", "brand", "og-image.svg"), "utf8");

    expect(wordmarkSvg).toContain('text-anchor="middle"><tspan fill="#111111">We</tspan><tspan fill="#ff7a00">Mail</tspan></text>');
    expect(wordmarkSvg).toContain('text x="130" y="56"');

    expect(lockupSvg).toContain('text-anchor="middle"><tspan fill="#111111">We</tspan><tspan fill="#ff7a00">Mail</tspan></text>');
    expect(lockupSvg).toContain('text-anchor="middle">EDGE MAIL OPERATIONS</text>');
    expect(lockupSvg).not.toContain('text-anchor="end">We</text>');
    expect(lockupSvg).not.toContain('text-anchor="start">Mail</text>');

    expect(ogSvg).toContain('text-anchor="middle"><tspan fill="#111111">We</tspan><tspan fill="#ff7a00">Mail</tspan></text>');
    expect(ogSvg).toContain('text-anchor="middle">EDGE MAIL OPERATIONS</text>');
    expect(ogSvg).not.toContain("Temporary inboxes, outbound control, and admin oversight");
  });

  it("keeps the shared icon asset in sync with the sealed-envelope mark", () => {
    const iconPath = resolve(process.cwd(), "public", "brand", "icon.svg");
    const svg = readFileSync(iconPath, "utf8");

    expect(svg).toContain('rect x="10" y="26" width="108" height="76" rx="27"');
    expect(svg).toContain('stroke-linecap="round"');
    expect(svg).toContain('circle cx="64" cy="82" r="18"');
    expect(svg).toContain('d="M53.4 89.8V70.6L64 83.2L74.6 70.6V89.8"');
  });

  it("keeps the mono icon seal as a line-drawn M", () => {
    const iconPath = resolve(process.cwd(), "public", "brand", "icon-mono.svg");
    const svg = readFileSync(iconPath, "utf8");

    expect(svg).toContain('rect x="4" y="12" width="56" height="40" rx="14"');
    expect(svg).toContain('circle cx="32" cy="42.5" r="9.5" fill="none"');
    expect(svg).toContain('d="M26.4 45.6V35.2L32 42L37.6 35.2V45.6"');
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
