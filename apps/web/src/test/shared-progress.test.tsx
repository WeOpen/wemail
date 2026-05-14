import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Progress } from "../shared/progress";

describe("shared progress primitive", () => {
  it("renders determinate progress with aria values and unified classes", () => {
    render(<Progress aria-label="上传进度" showValueLabel value={32} variant="success" />);

    const progress = screen.getByRole("progressbar", { name: "上传进度" });
    expect(progress).toHaveClass("ui-progress", "ui-progress-success");
    expect(progress).toHaveAttribute("aria-valuenow", "32");
    expect(progress).toHaveTextContent("32%");
  });

  it("renders indeterminate progress without aria-valuenow", () => {
    render(<Progress aria-label="同步中" indeterminate size="sm" />);

    const progress = screen.getByRole("progressbar", { name: "同步中" });
    expect(progress).toHaveAttribute("data-state", "indeterminate");
    expect(progress).not.toHaveAttribute("aria-valuenow");
  });
});
