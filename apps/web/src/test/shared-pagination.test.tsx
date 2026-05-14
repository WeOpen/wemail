import userEvent from "@testing-library/user-event";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Pagination } from "../shared/pagination";

describe("shared pagination primitive", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders pagination landmarks, current page state, and collapsed ranges", () => {
    render(<Pagination page={10} pageSize={10} total={200} />);

    expect(screen.getByRole("navigation", { name: "分页导航" })).toHaveClass("ui-pagination");
    expect(screen.getByRole("button", { name: "第 10 页" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("button", { name: "第 10 页" })).toHaveAttribute("data-state", "current");
    expect(screen.getAllByText("…")).toHaveLength(2);
    expect(screen.getByRole("button", { name: "上一页" })).toBeEnabled();
    expect(screen.getByRole("button", { name: "下一页" })).toBeEnabled();
  });

  it("updates controlled page state and calls onChange with the next page", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    function Host() {
      const [page, setPage] = useState(2);

      return (
        <Pagination
          onChange={(nextPage) => {
            handleChange(nextPage);
            setPage(nextPage);
          }}
          page={page}
          pageSize={20}
          total={240}
        />
      );
    }

    render(<Host />);
    await user.click(screen.getByRole("button", { name: "第 3 页" }));

    expect(handleChange).toHaveBeenCalledWith(3);
    expect(screen.getByRole("button", { name: "第 3 页" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("button", { name: "第 2 页" })).toHaveAttribute("data-state", "inactive");
  });

  it("supports arrow key focus movement across pagination controls", () => {
    render(<Pagination page={3} pageSize={10} total={120} />);

    const currentPage = screen.getByRole("button", { name: "第 3 页" });
    currentPage.focus();
    fireEvent.keyDown(screen.getByRole("list"), { key: "ArrowRight" });

    expect(screen.getByRole("button", { name: "第 4 页" })).toHaveFocus();
  });
});
