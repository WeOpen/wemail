import { readFileSync } from "node:fs";

import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { OverlayDialog, OverlayDrawer } from "../shared/overlay";

const sharedStyles = readFileSync("src/shared/styles/index.css", "utf8");

describe("shared overlay primitives", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders a right drawer with unified shell classes and backdrop close behavior", () => {
    const onClose = vi.fn();

    render(
      <OverlayDrawer
        closeLabel="关闭用户设置"
        closeOnBackdrop
        description="willxue@msn.com"
        eyebrow="用户设置"
        onClose={onClose}
        title="willxue"
      >
        <p>抽屉内容</p>
      </OverlayDrawer>
    );

    const drawer = screen.getByRole("dialog", { name: "willxue" });
    expect(drawer).toHaveClass("ui-overlay-panel", "ui-overlay-drawer", "panel");
    expect(drawer).toHaveAttribute("aria-modal", "true");
    expect(screen.getByText("用户设置")).toHaveClass("ui-overlay-eyebrow");
    expect(screen.getByText("willxue@msn.com")).toHaveClass("ui-overlay-description");
    expect(drawer).toHaveAttribute("aria-describedby", screen.getByText("willxue@msn.com").id);

    fireEvent.click(screen.getByTestId("overlay-backdrop"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("renders a centered dialog with shared footer actions", () => {
    render(
      <OverlayDialog
        closeLabel="关闭确认弹窗"
        footer={<button type="button">确认</button>}
        onClose={() => undefined}
        title="确认彻底删除"
      >
        <p>此操作不可恢复。</p>
      </OverlayDialog>
    );

    const dialog = screen.getByRole("dialog", { name: "确认彻底删除" });
    expect(dialog).toHaveClass("ui-overlay-panel", "ui-overlay-dialog", "panel");
    expect(sharedStyles).toMatch(/\.ui-overlay-dialog\s*\{[^}]*border-radius:\s*32px;/);
    expect(screen.getByText("确认")).toBeInTheDocument();
    expect(screen.getByLabelText("关闭确认弹窗")).toHaveClass("ui-button-icon");
  });

  it("closes on escape for keyboard users", () => {
    const onClose = vi.fn();

    render(
      <OverlayDialog description="此操作不可恢复。" onClose={onClose} title="确认删除">
        <p>确认后立即生效。</p>
      </OverlayDialog>
    );

    fireEvent.keyDown(screen.getByRole("dialog", { name: "确认删除" }), { key: "Escape" });

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("traps focus inside the dialog and marks the background inert", () => {
    render(
      <div data-testid="page-shell">
        <button type="button">外部操作</button>
        <OverlayDialog footer={<button type="button">确认</button>} onClose={() => undefined} title="聚焦测试">
          <button type="button">更多信息</button>
        </OverlayDialog>
      </div>
    );

    const dialog = screen.getByRole("dialog", { name: "聚焦测试" });
    const pageShellContainer = screen.getByTestId("page-shell").parentElement;
    const closeButton = screen.getByLabelText("关闭弹层");
    const confirmButton = screen.getByRole("button", { name: "确认" });

    expect(closeButton).toHaveFocus();
    expect(pageShellContainer).toHaveAttribute("aria-hidden", "true");

    fireEvent.keyDown(dialog, { key: "Tab", shiftKey: true });
    expect(confirmButton).toHaveFocus();

    fireEvent.keyDown(dialog, { key: "Tab" });
    expect(closeButton).toHaveFocus();
  });
});
