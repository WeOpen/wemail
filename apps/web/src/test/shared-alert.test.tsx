import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Alert } from "../shared/alert";

describe("shared alert primitive", () => {
  it("renders semantic tone, title, and body content", () => {
    render(
      <Alert title="邮件路由异常" variant="warning">
        请检查上游 MX 记录是否仍然指向当前 worker。
      </Alert>
    );

    const alert = screen.getByRole("alert");
    expect(alert).toHaveClass("ui-alert", "ui-alert-warning");
    expect(screen.getByText("邮件路由异常")).toBeInTheDocument();
    expect(screen.getByText(/请检查上游 MX/i)).toBeInTheDocument();
  });

  it("supports dismiss actions without changing content semantics", () => {
    const handleClose = vi.fn();

    render(
      <Alert dismissLabel="关闭提示" onClose={handleClose} title="已复制">
        现在可以把 token 保存到密码管理器里。
      </Alert>
    );

    fireEvent.click(screen.getByRole("button", { name: "关闭提示" }));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
