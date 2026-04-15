import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

describe("brand assets", () => {
  it("uses a tighter favicon composition for better small-size legibility", () => {
    const faviconPath = resolve(process.cwd(), "public", "brand", "favicon.svg");
    const svg = readFileSync(faviconPath, "utf8");

    expect(svg).toContain('rect x="8" y="16" width="48" height="32"');
    expect(svg).toContain('path d="M10 20L22 31.5L32 24L42 31.5L54 20"');
  });
});
