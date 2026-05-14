import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { Popover, PopoverContent, PopoverTrigger } from "../shared/popover";

describe("shared popover primitives", () => {
  afterEach(() => {
    cleanup();
  });

  it("opens from the trigger and wires expanded/controls semantics", () => {
    render(
      <Popover>
        <PopoverTrigger>打开筛选器</PopoverTrigger>
        <PopoverContent aria-label="筛选器">
          <button type="button">保存筛选</button>
        </PopoverContent>
      </Popover>
    );

    const trigger = screen.getByRole("button", { name: "打开筛选器" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(trigger);

    const popover = screen.getByRole("dialog", { name: "筛选器" });
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(trigger).toHaveAttribute("aria-controls", popover.id);
    expect(trigger).toHaveAttribute("data-state", "open");
    expect(popover).toHaveAttribute("data-state", "open");
    expect(screen.getByRole("button", { name: "保存筛选" })).toHaveFocus();
  });

  it("dismisses on escape and restores focus to the trigger", () => {
    render(
      <Popover>
        <PopoverTrigger>打开快捷操作</PopoverTrigger>
        <PopoverContent aria-label="快捷操作">
          <button type="button">归档邮件</button>
        </PopoverContent>
      </Popover>
    );

    const trigger = screen.getByRole("button", { name: "打开快捷操作" });
    fireEvent.click(trigger);

    fireEvent.keyDown(screen.getByRole("dialog", { name: "快捷操作" }), { key: "Escape" });

    expect(screen.queryByRole("dialog", { name: "快捷操作" })).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("dismisses when clicking outside the content", () => {
    render(
      <div>
        <button type="button">外部元素</button>
        <Popover>
          <PopoverTrigger>打开邮箱动作</PopoverTrigger>
          <PopoverContent aria-label="邮箱动作">
            <button type="button">复制地址</button>
          </PopoverContent>
        </Popover>
      </div>
    );

    const trigger = screen.getByRole("button", { name: "打开邮箱动作" });
    fireEvent.click(trigger);
    expect(screen.getByRole("dialog", { name: "邮箱动作" })).toBeInTheDocument();

    fireEvent.mouseDown(screen.getByRole("button", { name: "外部元素" }));
    fireEvent.click(screen.getByRole("button", { name: "外部元素" }));

    expect(screen.queryByRole("dialog", { name: "邮箱动作" })).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it("renders the popover content inside the shared layer portal", () => {
    render(
      <Popover defaultOpen>
        <PopoverTrigger>打开筛选器</PopoverTrigger>
        <PopoverContent aria-label="筛选器">
          <button type="button">保存筛选</button>
        </PopoverContent>
      </Popover>
    );

    const portalRoot = document.getElementById("wemail-layer-root");
    const popover = screen.getByRole("dialog", { name: "筛选器" });

    expect(portalRoot).not.toBeNull();
    expect(portalRoot?.contains(popover)).toBe(true);
  });
});
