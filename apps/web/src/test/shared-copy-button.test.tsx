import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { CopyButton } from "../shared/copy-button";

describe("shared copy button primitive", () => {
  const writeText = vi.fn();

  beforeEach(() => {
    vi.stubGlobal("navigator", {
      ...window.navigator,
      clipboard: { writeText }
    });
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
    writeText.mockReset();
  });

  it("copies the provided value and announces copied state", async () => {
    const user = userEvent.setup();
    const handleCopy = vi.fn();
    writeText.mockResolvedValue(undefined);

    render(
      <CopyButton copiedLabel="已复制" onCopy={handleCopy} value="wemail_live_secret">
        复制密钥
      </CopyButton>
    );

    const button = screen.getByRole("button", { name: "复制密钥" });
    await user.click(button);

    expect(handleCopy).toHaveBeenCalledWith("wemail_live_secret");
    expect(screen.getByRole("button", { name: "已复制" })).toHaveAttribute("data-state", "copied");
  });

  it("honors the disabled state and does not attempt clipboard writes", async () => {
    const user = userEvent.setup();

    render(
      <CopyButton disabled value="wemail_live_secret">
        复制密钥
      </CopyButton>
    );

    await user.click(screen.getByRole("button", { name: "复制密钥" }));
    expect(writeText).not.toHaveBeenCalled();
  });
});
