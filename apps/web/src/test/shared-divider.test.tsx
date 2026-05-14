import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { Divider } from "../shared/divider";

describe("shared divider primitive", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders a horizontal separator by default", () => {
    render(<Divider data-testid="divider" />);

    const divider = screen.getByRole("separator");
    expect(divider).toHaveClass("ui-divider", "ui-divider-horizontal");
    expect(divider).toHaveAttribute("data-orientation", "horizontal");
    expect(screen.getByTestId("divider")).toBe(divider);
  });

  it("renders vertical, inset, and dashed variants with the right semantics", () => {
    render(<Divider dashed inset="lg" orientation="vertical" />);

    const divider = screen.getByRole("separator");
    expect(divider).toHaveClass("ui-divider-vertical", "ui-divider-dashed", "ui-divider-inset-lg");
    expect(divider).toHaveAttribute("aria-orientation", "vertical");
    expect(divider).toHaveAttribute("data-orientation", "vertical");
  });

  it("supports decorative separators without exposing an accessibility role", () => {
    render(<Divider decorative data-testid="decorative-divider" />);

    expect(screen.queryByRole("separator")).not.toBeInTheDocument();
    expect(screen.getByTestId("decorative-divider")).toHaveAttribute("aria-hidden", "true");
  });
});
