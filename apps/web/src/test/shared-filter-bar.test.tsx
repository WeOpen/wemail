import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { FilterBar, FilterBarActions, FilterBarSummary } from "../shared/filter-bar";

describe("shared filter bar primitives", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders the grid with the requested column count", () => {
    render(
      <FilterBar columns={3}>
        <label>
          <span>搜索</span>
          <input aria-label="搜索" />
        </label>
      </FilterBar>
    );

    expect(screen.getByLabelText("搜索").parentElement?.parentElement).toHaveClass(
      "ui-filter-bar",
      "ui-filter-bar-columns-3"
    );
  });

  it("renders actions and summary wrappers", () => {
    render(
      <>
        <FilterBarActions>
          <button type="button">仅看异常</button>
        </FilterBarActions>
        <FilterBarSummary>共 12 条结果</FilterBarSummary>
      </>
    );

    expect(screen.getByRole("button", { name: "仅看异常" }).parentElement).toHaveClass("ui-filter-bar-actions");
    expect(screen.getByText("共 12 条结果")).toHaveClass("ui-filter-bar-summary");
  });
});
