import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { Badge } from "../shared/badge";

describe("shared badge primitives", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders status badges with variant, appearance, and size hooks", () => {
    render(
      <>
        <Badge data-testid="success-badge" appearance="soft" size="md" variant="success">
          运行中
        </Badge>
        <Badge data-testid="warning-badge" appearance="solid" size="sm" statusRole="status" variant="warning">
          待审核
        </Badge>
      </>
    );

    const successBadge = screen.getByTestId("success-badge");
    expect(successBadge).toHaveClass("ui-badge", "ui-badge-success", "ui-badge-soft", "ui-badge-size-md");
    expect(successBadge).toHaveAttribute("data-usage", "status");

    const warningBadge = screen.getByTestId("warning-badge");
    expect(warningBadge).toHaveClass("ui-badge", "ui-badge-warning", "ui-badge-solid", "ui-badge-size-sm");
    expect(warningBadge).toHaveAttribute("role", "status");
    expect(warningBadge).toHaveAttribute("aria-live", "polite");
  });
});
