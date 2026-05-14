import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { Card, CardBody, CardFooter, CardHeader } from "../shared/card";

describe("shared card primitives", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders card sections with shared variant, padding, elevation, and tone attributes", () => {
    render(
      <Card data-testid="card" elevation="md" padding="lg" tone="brand" variant="data">
        <CardHeader>
          <h2>今日收件</h2>
        </CardHeader>
        <CardBody>
          <strong>1,284</strong>
        </CardBody>
        <CardFooter>较昨日 +12%</CardFooter>
      </Card>
    );

    const card = screen.getByTestId("card");
    expect(card).toHaveClass("ui-card", "ui-card-data", "ui-card-padding-lg", "ui-card-elevation-md", "ui-card-tone-brand");
    expect(card).toHaveAttribute("data-variant", "data");
    expect(card).toHaveAttribute("data-padding", "lg");
    expect(card).toHaveAttribute("data-elevation", "md");
    expect(card).toHaveAttribute("data-tone", "brand");
    expect(screen.getByText("今日收件").closest(".ui-card-header")).toBeInTheDocument();
    expect(screen.getByText("1,284").closest(".ui-card-body")).toBeInTheDocument();
    expect(screen.getByText("较昨日 +12%").closest(".ui-card-footer")).toBeInTheDocument();
  });

  it("marks interactive cards with a dedicated state hook", () => {
    render(
      <Card data-testid="interactive-card" isInteractive variant="status">
        账号状态
      </Card>
    );

    const card = screen.getByTestId("interactive-card");
    expect(card).toHaveClass("ui-card", "ui-card-status", "is-interactive");
    expect(card).toHaveAttribute("data-state", "interactive");
  });
});
