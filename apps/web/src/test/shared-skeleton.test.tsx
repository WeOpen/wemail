import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Skeleton } from "../shared/skeleton";

describe("shared skeleton primitive", () => {
  it("renders a decorative rectangular skeleton by default", () => {
    render(<Skeleton data-testid="skeleton" />);

    const skeleton = screen.getByTestId("skeleton");
    expect(skeleton).toHaveClass("ui-skeleton", "ui-skeleton-rect");
    expect(skeleton).toHaveAttribute("aria-hidden", "true");
    expect(skeleton).toHaveAttribute("data-state", "idle");
  });

  it("supports animated text skeletons with custom sizing", () => {
    render(<Skeleton animated data-testid="text-skeleton" height={12} shape="text" width="72%" />);

    const skeleton = screen.getByTestId("text-skeleton");
    expect(skeleton).toHaveClass("ui-skeleton-text", "ui-skeleton-animated");
    expect(skeleton).toHaveAttribute("data-state", "loading");
    expect(skeleton).toHaveStyle({ height: "12px", width: "72%" });
  });

  it("can expose loading status semantics with Chinese default copy", () => {
    render(<Skeleton announce shape="circle" />);

    const skeleton = screen.getByRole("status", { name: "内容加载中" });
    expect(skeleton).toHaveClass("ui-skeleton", "ui-skeleton-circle");
    expect(skeleton).toHaveAttribute("data-shape", "circle");
  });
});
