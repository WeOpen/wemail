import { Mail, ShieldCheck } from "lucide-react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Icon } from "../shared/icon";

describe("shared icon primitive", () => {
  it("renders decorative icons hidden from assistive technology by default", () => {
    render(<Icon data-testid="mail-icon" icon={Mail} size="sm" />);

    const icon = screen.getByTestId("mail-icon");
    expect(icon).toHaveClass("ui-icon", "ui-icon-sm");
    expect(icon).toHaveAttribute("aria-hidden", "true");
    expect(icon.querySelector("svg")).toBeInTheDocument();
  });

  it("renders accessible icons with a label and tone variant", () => {
    render(<Icon icon={ShieldCheck} label="安全校验通过" size="lg" tone="success" />);

    const icon = screen.getByRole("img", { name: "安全校验通过" });
    expect(icon).toHaveClass("ui-icon", "ui-icon-lg", "ui-tone-success");
    expect(icon).not.toHaveAttribute("aria-hidden");
  });

  it("supports numeric sizing while preserving the wrapper contract", () => {
    render(<Icon data-testid="custom-size-icon" icon={Mail} size={18} />);

    expect(screen.getByTestId("custom-size-icon")).toHaveStyle({ "--icon-size": "18px" });
  });
});
