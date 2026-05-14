import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { Tag } from "../shared/tag";

describe("shared tag primitives", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders category tags with tone, size, shape, and optional dot/icon affordances", () => {
    render(
      <>
        <Tag data-testid="brand-tag" dot shape="pill" size="md" variant="brand">
          品牌模板
        </Tag>
        <Tag data-testid="info-tag" icon={<span data-testid="tag-icon">#</span>} shape="rounded" size="sm" variant="info">
          API
        </Tag>
      </>
    );

    const brandTag = screen.getByTestId("brand-tag");
    expect(brandTag).toHaveClass("ui-tag", "ui-tag-brand", "ui-tag-size-md", "ui-tag-shape-pill");
    expect(brandTag).toHaveAttribute("data-usage", "category");
    expect(brandTag.querySelector(".ui-tag-dot")).toBeInTheDocument();

    const infoTag = screen.getByTestId("info-tag");
    expect(infoTag).toHaveClass("ui-tag", "ui-tag-info", "ui-tag-size-sm", "ui-tag-shape-rounded");
    expect(screen.getByTestId("tag-icon")).toBeInTheDocument();
  });
});
