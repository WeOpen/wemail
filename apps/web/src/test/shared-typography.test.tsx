import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Code, Heading, Kbd, Label, Muted, Text } from "../shared/typography";

describe("shared typography primitives", () => {
  it("renders semantic heading tags with size and tone variants", () => {
    render(
      <Heading as="h1" size="display-md" tone="accent">
        收件箱总览
      </Heading>
    );

    const heading = screen.getByRole("heading", { level: 1, name: "收件箱总览" });
    expect(heading.tagName).toBe("H1");
    expect(heading).toHaveClass("ui-heading", "ui-heading-display-md", "ui-tone-accent");
  });

  it("renders text and muted copy with shared typography classes", () => {
    render(
      <>
        <Text as="span" size="lg">
          共 12 封邮件
        </Text>
        <Muted>最近 24 小时自动刷新</Muted>
      </>
    );

    expect(screen.getByText("共 12 封邮件")).toHaveClass("ui-text", "ui-text-lg");
    expect(screen.getByText("最近 24 小时自动刷新")).toHaveClass("ui-text", "ui-text-muted");
  });

  it("renders label, code, and kbd with their native semantics", () => {
    render(
      <div>
        <Label htmlFor="mailbox-search">搜索邮箱</Label>
        <input id="mailbox-search" />
        <Code tone="success">mailbox_id</Code>
        <Kbd keys={["Cmd", "K"]} />
      </div>
    );

    expect(screen.getByText("搜索邮箱").tagName).toBe("LABEL");
    expect(screen.getByLabelText("搜索邮箱")).toHaveAttribute("id", "mailbox-search");
    expect(screen.getByText("mailbox_id")).toHaveClass("ui-code", "ui-tone-success");
    expect(screen.getByText("Cmd")).toHaveClass("ui-kbd-key");
    expect(screen.getByText("K")).toHaveClass("ui-kbd-key");
  });
});
