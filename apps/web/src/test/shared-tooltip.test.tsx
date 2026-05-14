import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { Tooltip, TooltipContent, TooltipTrigger } from "../shared/tooltip";

describe("shared tooltip primitives", () => {
  afterEach(() => {
    cleanup();
  });

  it("opens on focus and links the trigger to the tooltip content", () => {
    render(
      <Tooltip>
        <TooltipTrigger>邮箱地址</TooltipTrigger>
        <TooltipContent>复制后可分享给同事</TooltipContent>
      </Tooltip>
    );

    const trigger = screen.getByRole("button", { name: "邮箱地址" });
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();

    fireEvent.focus(trigger);

    const tooltip = screen.getByRole("tooltip");
    expect(trigger).toHaveAttribute("aria-describedby", tooltip.id);
    expect(trigger).toHaveAttribute("data-state", "open");
    expect(tooltip).toHaveAttribute("data-state", "open");
  });

  it("closes on escape and blur", () => {
    render(
      <Tooltip>
        <TooltipTrigger>查看说明</TooltipTrigger>
        <TooltipContent>最多保留 7 天</TooltipContent>
      </Tooltip>
    );

    const trigger = screen.getByRole("button", { name: "查看说明" });

    fireEvent.focus(trigger);
    expect(screen.getByRole("tooltip")).toBeInTheDocument();

    fireEvent.keyDown(trigger, { key: "Escape" });
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    expect(trigger).toHaveAttribute("data-state", "closed");

    fireEvent.focus(trigger);
    expect(screen.getByRole("tooltip")).toBeInTheDocument();

    fireEvent.blur(trigger);
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    expect(trigger).not.toHaveAttribute("aria-describedby");
  });

  it("renders tooltip content inside the shared layer portal", () => {
    render(
      <Tooltip defaultOpen>
        <TooltipTrigger>查看说明</TooltipTrigger>
        <TooltipContent>最多保留 7 天</TooltipContent>
      </Tooltip>
    );

    const portalRoot = document.getElementById("wemail-layer-root");
    const tooltip = screen.getByRole("tooltip");

    expect(portalRoot).not.toBeNull();
    expect(portalRoot?.contains(tooltip)).toBe(true);
  });
});
