import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { Page, PageBody, PageHeader, PageMain, PageSidebar, PageToolbar } from "../shared/page-layout";

describe("shared page layout primitives", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders page header content and actions", () => {
    render(
      <Page>
        <PageHeader actions={<button type="button">新建</button>} description="统一页面头部" kicker="用户中心" title="用户目录" />
      </Page>
    );

    expect(screen.getByText("用户中心")).toHaveClass("panel-kicker");
    expect(screen.getByRole("heading", { name: "用户目录" })).toHaveClass("ui-page-header-title");
    expect(screen.getByText("统一页面头部")).toHaveClass("ui-page-header-description");
    expect(screen.getByRole("button", { name: "新建" })).toBeInTheDocument();
  });

  it("supports body layouts with main and sidebar regions", () => {
    render(
      <Page>
        <PageBody hasSidebar>
          <PageMain>主区域</PageMain>
          <PageSidebar>侧栏</PageSidebar>
        </PageBody>
      </Page>
    );

    expect(screen.getByText("主区域")).toHaveClass("ui-page-main");
    expect(screen.getByText("侧栏")).toHaveClass("ui-page-sidebar");
  });

  it("renders a toolbar wrapper for page-level actions", () => {
    render(
      <PageToolbar>
        <button type="button">刷新</button>
      </PageToolbar>
    );

    expect(screen.getByRole("button", { name: "刷新" }).parentElement).toHaveClass("ui-page-toolbar");
  });
});
