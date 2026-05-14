import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import {
  Breadcrumb,
  BreadcrumbCurrent,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from "../shared/breadcrumb";

describe("shared breadcrumb primitives", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders breadcrumb navigation with list semantics and current page state", () => {
    render(
      <Breadcrumb aria-label="当前路径">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/workspace">工作台</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/workspace/inbox">收件箱</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbCurrent>邮件详情</BreadcrumbCurrent>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );

    expect(screen.getByRole("navigation", { name: "当前路径" })).toHaveClass("ui-breadcrumb");
    expect(screen.getByRole("list")).toHaveClass("ui-breadcrumb-list");
    expect(screen.getByRole("link", { name: "工作台" })).toHaveAttribute("data-state", "inactive");
    expect(screen.getByRole("link", { name: "收件箱" })).toHaveAttribute("data-state", "inactive");
    expect(screen.getByText("邮件详情")).toHaveAttribute("aria-current", "page");
    expect(screen.getByText("邮件详情")).toHaveAttribute("data-state", "current");
    expect(screen.getAllByText("/")).toHaveLength(2);
  });
});
