import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { Avatar } from "../shared/avatar";

describe("shared avatar primitive", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders an image avatar when src is available", () => {
    render(<Avatar alt="Will Xue" size="lg" src="https://example.com/avatar.png" />);

    const image = screen.getByRole("img", { name: "Will Xue" });
    expect(image).toHaveAttribute("src", "https://example.com/avatar.png");
    expect(image.closest(".ui-avatar")).toHaveClass("ui-avatar", "ui-avatar-lg");
  });

  it("falls back to initials when the image is missing or fails to load", () => {
    render(<Avatar alt="Will Xue" name="Will Xue" src="https://example.com/avatar.png" />);

    const image = screen.getByRole("img", { name: "Will Xue" });
    fireEvent.error(image);

    expect(screen.getByText("WX")).toBeInTheDocument();
    expect(screen.getByTestId("avatar-fallback")).toHaveAttribute("aria-hidden", "true");
  });
});
