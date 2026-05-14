import userEvent from "@testing-library/user-event";
import { cleanup, render, screen } from "@testing-library/react";
import { useState } from "react";
import { afterEach, describe, expect, it } from "vitest";

import { Tabs, TabsList, TabsPanel, TabsTrigger } from "../shared/tabs";

describe("shared tabs primitives", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders segmented tabs with correct tab and tabpanel relationships", () => {
    render(
      <Tabs defaultValue="overview">
        <TabsList aria-label="邮箱详情">
          <TabsTrigger value="overview">概览</TabsTrigger>
          <TabsTrigger value="activity">活动</TabsTrigger>
        </TabsList>
        <TabsPanel value="overview">概览内容</TabsPanel>
        <TabsPanel value="activity">活动内容</TabsPanel>
      </Tabs>
    );

    const overviewTab = screen.getByRole("tab", { name: "概览" });
    const activityTab = screen.getByRole("tab", { name: "活动" });
    const overviewPanel = screen.getByRole("tabpanel", { name: "概览" });

    expect(screen.getByRole("tablist", { name: "邮箱详情" })).toHaveAttribute("data-variant", "segmented");
    expect(overviewTab).toHaveAttribute("aria-selected", "true");
    expect(overviewTab).toHaveAttribute("data-state", "active");
    expect(activityTab).toHaveAttribute("aria-selected", "false");
    expect(activityTab).toHaveAttribute("tabindex", "-1");
    expect(overviewPanel).toBeVisible();
    expect(screen.getByText("活动内容")).toHaveAttribute("hidden");
  });

  it("updates controlled state when a trigger is activated", async () => {
    const user = userEvent.setup();

    function Host() {
      const [value, setValue] = useState("overview");

      return (
        <Tabs onValueChange={setValue} value={value}>
          <TabsList aria-label="消息分组">
            <TabsTrigger value="overview">概览</TabsTrigger>
            <TabsTrigger value="activity">活动</TabsTrigger>
          </TabsList>
          <TabsPanel value="overview">概览内容</TabsPanel>
          <TabsPanel value="activity">活动内容</TabsPanel>
        </Tabs>
      );
    }

    render(<Host />);
    await user.click(screen.getByRole("tab", { name: "活动" }));

    expect(screen.getByRole("tab", { name: "活动" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tabpanel", { name: "活动" })).toBeVisible();
  });

  it("supports roving keyboard navigation in automatic activation mode", async () => {
    const user = userEvent.setup();

    render(
      <Tabs defaultValue="overview">
        <TabsList aria-label="消息分组">
          <TabsTrigger value="overview">概览</TabsTrigger>
          <TabsTrigger value="activity">活动</TabsTrigger>
          <TabsTrigger value="settings">设置</TabsTrigger>
        </TabsList>
        <TabsPanel value="overview">概览内容</TabsPanel>
        <TabsPanel value="activity">活动内容</TabsPanel>
        <TabsPanel value="settings">设置内容</TabsPanel>
      </Tabs>
    );

    screen.getByRole("tab", { name: "概览" }).focus();
    await user.keyboard("{ArrowRight}");

    expect(screen.getByRole("tab", { name: "活动" })).toHaveFocus();
    expect(screen.getByRole("tab", { name: "活动" })).toHaveAttribute("aria-selected", "true");

    await user.keyboard("{End}");

    expect(screen.getByRole("tab", { name: "设置" })).toHaveFocus();
    expect(screen.getByRole("tabpanel", { name: "设置" })).toBeVisible();
  });
});
