import userEvent from "@testing-library/user-event";
import { cleanup, render, screen } from "@testing-library/react";
import { useState } from "react";
import { afterEach, describe, expect, it } from "vitest";

import { StepItem, Steps, StepsList } from "../shared/steps";

describe("shared steps primitives", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders current, complete, and upcoming step states with accessible navigation semantics", () => {
    render(
      <Steps aria-label="集成流程" currentStep={2}>
        <StepsList>
          <StepItem step={1} title="绑定域名" />
          <StepItem step={2} title="验证 DNS" />
          <StepItem step={3} title="接收邮件" />
        </StepsList>
      </Steps>
    );

    expect(screen.getByRole("navigation", { name: "集成流程" })).toHaveClass("ui-steps");
    expect(screen.getByRole("list")).toHaveClass("ui-steps-list");
    expect(screen.getByText("绑定域名").closest("li")).toHaveAttribute("data-state", "complete");
    expect(screen.getByRole("button", { name: "验证 DNS" })).toHaveAttribute("aria-current", "step");
    expect(screen.getByRole("button", { name: "验证 DNS" })).toHaveAttribute("data-state", "current");
    expect(screen.getByText("接收邮件").closest("li")).toHaveAttribute("data-state", "upcoming");
  });

  it("updates controlled currentStep when a new step is activated", async () => {
    const user = userEvent.setup();

    function Host() {
      const [currentStep, setCurrentStep] = useState(1);

      return (
        <Steps aria-label="注册流程" currentStep={currentStep} onStepChange={setCurrentStep}>
          <StepsList>
            <StepItem step={1} title="填写账号" />
            <StepItem step={2} title="验证邮箱" />
            <StepItem step={3} title="完成注册" />
          </StepsList>
        </Steps>
      );
    }

    render(<Host />);
    await user.click(screen.getByRole("button", { name: "验证邮箱" }));

    expect(screen.getByRole("button", { name: "验证邮箱" })).toHaveAttribute("aria-current", "step");
    expect(screen.getByRole("button", { name: "填写账号" })).toHaveAttribute("data-state", "complete");
  });

  it("supports keyboard focus movement and activation across interactive steps", async () => {
    const user = userEvent.setup();

    function Host() {
      const [currentStep, setCurrentStep] = useState(1);

      return (
        <Steps aria-label="发布流程" currentStep={currentStep} onStepChange={setCurrentStep}>
          <StepsList>
            <StepItem step={1} title="编写内容" />
            <StepItem step={2} title="审核" />
            <StepItem step={3} title="发布" />
          </StepsList>
        </Steps>
      );
    }

    render(<Host />);
    screen.getByRole("button", { name: "编写内容" }).focus();

    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("button", { name: "审核" })).toHaveFocus();

    await user.keyboard("{Enter}");
    expect(screen.getByRole("button", { name: "审核" })).toHaveAttribute("aria-current", "step");
  });
});
