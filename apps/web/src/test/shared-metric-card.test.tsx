import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { MetricCard } from "../shared/metric-card";

describe("shared metric card primitive", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders kicker, title, value, detail, and caption in a unified card", () => {
    render(
      <MetricCard caption="+12%" detail="较上周提升" kicker="KPI" title="活跃账号" tone="hero" value="128" />
    );

    expect(screen.getByText("KPI")).toHaveClass("panel-kicker");
    expect(screen.getByRole("heading", { name: "活跃账号" })).toHaveClass("ui-metric-card-title");
    expect(screen.getByText("128")).toHaveClass("ui-metric-card-value");
    expect(screen.getByText("较上周提升")).toHaveClass("ui-metric-card-detail");
    expect(screen.getByText("+12%")).toHaveClass("ui-metric-card-caption");
  });
});
