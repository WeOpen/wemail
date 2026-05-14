import {
  createContext,
  forwardRef,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type KeyboardEvent,
  useContext,
  useId,
  useState
} from "react";

type TabsVariant = "segmented" | "underline";
type TabsOrientation = "horizontal" | "vertical";
type TabsActivationMode = "automatic" | "manual";

type TabsProps = HTMLAttributes<HTMLDivElement> & {
  activationMode?: TabsActivationMode;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  orientation?: TabsOrientation;
  value?: string;
  variant?: TabsVariant;
};

type TabsContextValue = {
  activationMode: TabsActivationMode;
  baseId: string;
  orientation: TabsOrientation;
  setValue: (value: string) => void;
  value: string;
  variant: TabsVariant;
};

type TabsTriggerProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "value"> & {
  value: string;
};

type TabsPanelProps = HTMLAttributes<HTMLDivElement> & {
  forceMount?: boolean;
  value: string;
};

const TabsContext = createContext<TabsContextValue | null>(null);

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function sanitizeValue(value: string) {
  const normalized = value.trim().replace(/[^a-zA-Z0-9_-]+/g, "-");
  return normalized || "tab";
}

function getElementId(baseId: string, value: string, suffix: "panel" | "tab") {
  return `${baseId}-${sanitizeValue(value)}-${suffix}`;
}

function useTabsContext(componentName: string) {
  const context = useContext(TabsContext);

  if (!context) {
    throw new Error(`${componentName} must be used within Tabs.`);
  }

  return context;
}

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(function Tabs(
  {
    activationMode = "automatic",
    className,
    defaultValue,
    onValueChange,
    orientation = "horizontal",
    value,
    variant = "segmented",
    ...props
  },
  ref
) {
  const generatedId = useId();
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue ?? "");
  const resolvedValue = value ?? uncontrolledValue;

  function handleValueChange(nextValue: string) {
    if (nextValue === resolvedValue) return;
    if (value === undefined) {
      setUncontrolledValue(nextValue);
    }
    onValueChange?.(nextValue);
  }

  return (
    <TabsContext.Provider
      value={{
        activationMode,
        baseId: generatedId,
        orientation,
        setValue: handleValueChange,
        value: resolvedValue,
        variant
      }}
    >
      <div
        {...props}
        className={cx("ui-tabs", className)}
        data-orientation={orientation}
        data-state={resolvedValue ? "ready" : "empty"}
        data-variant={variant}
        ref={ref}
      />
    </TabsContext.Provider>
  );
});

export const TabsList = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function TabsList(
  { className, onKeyDown, ...props },
  ref
) {
  const context = useTabsContext("TabsList");

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    onKeyDown?.(event);
    if (event.defaultPrevented) return;

    if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"].includes(event.key)) return;

    const isHorizontal = context.orientation === "horizontal";
    const isHorizontalKey = event.key === "ArrowLeft" || event.key === "ArrowRight";
    const isVerticalKey = event.key === "ArrowUp" || event.key === "ArrowDown";

    if ((isHorizontal && isVerticalKey) || (!isHorizontal && isHorizontalKey)) {
      return;
    }

    event.preventDefault();

    const tabs = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>("[role=\"tab\"]")).filter(
      (tab) => !tab.disabled
    );
    const activeElement = event.target instanceof HTMLElement ? event.target : null;
    const currentIndex = activeElement ? tabs.indexOf(activeElement as HTMLButtonElement) : -1;

    if (tabs.length === 0) return;

    let nextIndex = currentIndex === -1 ? 0 : currentIndex;

    if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = tabs.length - 1;
    } else {
      const direction = event.key === "ArrowLeft" || event.key === "ArrowUp" ? -1 : 1;
      nextIndex = (currentIndex + direction + tabs.length) % tabs.length;
    }

    const nextTab = tabs[nextIndex];
    if (!nextTab) return;

    nextTab.focus();

    if (context.activationMode === "automatic") {
      context.setValue(nextTab.dataset.value ?? "");
    }
  }

  return (
    <div
      {...props}
      aria-orientation={context.orientation}
      className={cx("ui-tabs-list", className)}
      data-orientation={context.orientation}
      data-variant={context.variant}
      onKeyDown={handleKeyDown}
      ref={ref}
      role="tablist"
    />
  );
});

export const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(function TabsTrigger(
  { className, disabled, onClick, type = "button", value, ...props },
  ref
) {
  const context = useTabsContext("TabsTrigger");
  const isActive = context.value === value;
  const triggerId = getElementId(context.baseId, value, "tab");
  const panelId = getElementId(context.baseId, value, "panel");

  return (
    <button
      {...props}
      aria-controls={panelId}
      aria-selected={isActive}
      className={cx("ui-tabs-trigger", isActive && "is-active", disabled && "is-disabled", className)}
      data-orientation={context.orientation}
      data-state={isActive ? "active" : "inactive"}
      data-value={value}
      data-variant={context.variant}
      disabled={disabled}
      id={triggerId}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented || disabled) return;
        context.setValue(value);
      }}
      ref={ref}
      role="tab"
      tabIndex={isActive ? 0 : -1}
      type={type}
    />
  );
});

export const TabsPanel = forwardRef<HTMLDivElement, TabsPanelProps>(function TabsPanel(
  { className, forceMount = true, value, ...props },
  ref
) {
  const context = useTabsContext("TabsPanel");
  const isActive = context.value === value;
  const panelId = getElementId(context.baseId, value, "panel");
  const triggerId = getElementId(context.baseId, value, "tab");

  if (!forceMount && !isActive) {
    return null;
  }

  return (
    <div
      {...props}
      aria-labelledby={triggerId}
      className={cx("ui-tabs-panel", className)}
      data-orientation={context.orientation}
      data-state={isActive ? "active" : "inactive"}
      data-variant={context.variant}
      hidden={!isActive}
      id={panelId}
      ref={ref}
      role="tabpanel"
      tabIndex={isActive ? 0 : -1}
    />
  );
});
