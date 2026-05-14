import {
  createContext,
  forwardRef,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
  useContext,
  useId
} from "react";

type StepsOrientation = "horizontal" | "vertical";

type StepsProps = HTMLAttributes<HTMLElement> & {
  currentStep: number;
  onStepChange?: (step: number) => void;
  orientation?: StepsOrientation;
};

type StepsContextValue = {
  baseId: string;
  currentStep: number;
  onStepChange?: (step: number) => void;
  orientation: StepsOrientation;
};

type StepItemProps = Omit<HTMLAttributes<HTMLLIElement>, "title"> & {
  description?: ReactNode;
  disabled?: boolean;
  onSelect?: (step: number) => void;
  step: number;
  title: ReactNode;
  triggerProps?: Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "type">;
};

const StepsContext = createContext<StepsContextValue | null>(null);

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function clamp(value: number, minimum: number) {
  return Math.max(value, minimum);
}

function useStepsContext(componentName: string) {
  const context = useContext(StepsContext);

  if (!context) {
    throw new Error(`${componentName} must be used within Steps.`);
  }

  return context;
}

function resolveStepState(step: number, currentStep: number) {
  if (step < currentStep) return "complete";
  if (step === currentStep) return "current";
  return "upcoming";
}

export const Steps = forwardRef<HTMLElement, StepsProps>(function Steps(
  { className, currentStep, onStepChange, orientation = "horizontal", ...props },
  ref
) {
  const generatedId = useId();

  return (
    <StepsContext.Provider
      value={{
        baseId: generatedId,
        currentStep: clamp(currentStep, 1),
        onStepChange,
        orientation
      }}
    >
      <nav
        {...props}
        className={cx("ui-steps", className)}
        data-orientation={orientation}
        data-state={onStepChange ? "interactive" : "static"}
        ref={ref}
      />
    </StepsContext.Provider>
  );
});

export const StepsList = forwardRef<HTMLOListElement, HTMLAttributes<HTMLOListElement>>(function StepsList(
  { className, onKeyDown, ...props },
  ref
) {
  const context = useStepsContext("StepsList");

  function handleKeyDown(event: KeyboardEvent<HTMLOListElement>) {
    onKeyDown?.(event);
    if (event.defaultPrevented) return;

    if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"].includes(event.key)) return;

    event.preventDefault();

    const buttons = Array.from(
      event.currentTarget.querySelectorAll<HTMLButtonElement>("[data-step-trigger=\"true\"]")
    ).filter((button) => !button.disabled);
    const activeElement = event.target instanceof HTMLElement ? event.target : null;
    const currentIndex = activeElement ? buttons.indexOf(activeElement as HTMLButtonElement) : -1;

    if (buttons.length === 0) return;

    if (event.key === "Home") {
      buttons[0]?.focus();
      return;
    }

    if (event.key === "End") {
      buttons[buttons.length - 1]?.focus();
      return;
    }

    const isHorizontal = context.orientation === "horizontal";
    const isHorizontalKey = event.key === "ArrowLeft" || event.key === "ArrowRight";
    const isVerticalKey = event.key === "ArrowUp" || event.key === "ArrowDown";

    if ((isHorizontal && isVerticalKey) || (!isHorizontal && isHorizontalKey)) {
      return;
    }

    const direction = event.key === "ArrowLeft" || event.key === "ArrowUp" ? -1 : 1;
    const nextIndex = currentIndex === -1 ? 0 : (currentIndex + direction + buttons.length) % buttons.length;
    buttons[nextIndex]?.focus();
  }

  return (
    <ol
      {...props}
      className={cx("ui-steps-list", className)}
      data-orientation={context.orientation}
      onKeyDown={handleKeyDown}
      ref={ref}
    />
  );
});

export const StepItem = forwardRef<HTMLLIElement, StepItemProps>(function StepItem(
  { className, description, disabled, onSelect, step, title, triggerProps, ...props },
  ref
) {
  const context = useStepsContext("StepItem");
  const stepState = resolveStepState(step, context.currentStep);
  const triggerId = `${context.baseId}-step-${step}`;

  return (
    <li
      {...props}
      className={cx("ui-step-item", className)}
      data-state={stepState}
      ref={ref}
    >
      <button
        {...triggerProps}
        aria-current={stepState === "current" ? "step" : undefined}
        className={cx(
          "ui-step-trigger",
          stepState === "current" && "is-current",
          disabled && "is-disabled",
          triggerProps?.className
        )}
        data-state={stepState}
        data-step-trigger="true"
        disabled={disabled}
        id={triggerId}
        onClick={(event) => {
          triggerProps?.onClick?.(event);
          if (event.defaultPrevented || disabled) return;
          onSelect?.(step);
          context.onStepChange?.(step);
        }}
        tabIndex={stepState === "current" ? 0 : -1}
        type="button"
      >
        <span aria-hidden="true" className="ui-step-indicator">
          {step}
        </span>
        <span className="ui-step-copy">
          <span className="ui-step-title">{title}</span>
          {description ? <span className="ui-step-description">{description}</span> : null}
        </span>
      </button>
    </li>
  );
});
