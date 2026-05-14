import {
  createContext,
  forwardRef,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type MutableRefObject,
  type ReactNode,
  useContext,
  useEffect,
  useId,
  useRef,
  useState
} from "react";
import { createPortal } from "react-dom";

import { assignRef, useFloatingPosition, usePortalRoot } from "../overlay/layer-utils";

type TooltipProps = {
  children: ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  openDelay?: number;
};

type TooltipTriggerProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type">;

type TooltipContentProps = HTMLAttributes<HTMLDivElement> & {
  side?: "top" | "bottom";
};

type TooltipContextValue = {
  contentRef: MutableRefObject<HTMLDivElement | null>;
  contentId: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  startOpenTimer: () => void;
  stopOpenTimer: () => void;
  triggerRef: MutableRefObject<HTMLButtonElement | null>;
};

const TooltipContext = createContext<TooltipContextValue | null>(null);

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function useTooltipContext() {
  const context = useContext(TooltipContext);

  if (!context) {
    throw new Error("Tooltip primitives must be used within <Tooltip>.");
  }

  return context;
}

function useControllableOpenState({
  defaultOpen = false,
  onOpenChange,
  open
}: Pick<TooltipProps, "defaultOpen" | "onOpenChange" | "open">) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = open !== undefined;
  const currentOpen = isControlled ? open : internalOpen;

  function setOpen(nextOpen: boolean) {
    if (!isControlled) {
      setInternalOpen(nextOpen);
    }

    onOpenChange?.(nextOpen);
  }

  return [currentOpen, setOpen] as const;
}

export function Tooltip({ children, defaultOpen, onOpenChange, open, openDelay = 120 }: TooltipProps) {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const contentId = useId();
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const openTimerRef = useRef<number | null>(null);
  const [isOpen, setOpen] = useControllableOpenState({ defaultOpen, onOpenChange, open });

  function stopOpenTimer() {
    if (openTimerRef.current) {
      window.clearTimeout(openTimerRef.current);
      openTimerRef.current = null;
    }
  }

  function startOpenTimer() {
    stopOpenTimer();

    if (openDelay <= 0) {
      setOpen(true);
      return;
    }

    openTimerRef.current = window.setTimeout(() => {
      setOpen(true);
      openTimerRef.current = null;
    }, openDelay);
  }

  useEffect(() => stopOpenTimer, []);

  return (
    <TooltipContext.Provider
      value={{
        contentRef,
        contentId,
        open: isOpen,
        setOpen,
        startOpenTimer,
        stopOpenTimer,
        triggerRef
      }}
    >
      <span className="ui-tooltip-root" data-state={isOpen ? "open" : "closed"}>
        {children}
      </span>
    </TooltipContext.Provider>
  );
}

export const TooltipTrigger = forwardRef<HTMLButtonElement, TooltipTriggerProps>(function TooltipTrigger(
  { className, onBlur, onFocus, onKeyDown, onMouseEnter, onMouseLeave, ...props },
  ref
) {
  const { contentId, contentRef, open, setOpen, startOpenTimer, stopOpenTimer, triggerRef } = useTooltipContext();

  return (
    <button
      {...props}
      aria-describedby={open ? contentId : undefined}
      className={cx("ui-tooltip-trigger", className)}
      data-state={open ? "open" : "closed"}
      onBlur={(event) => {
        onBlur?.(event);
        if (event.defaultPrevented) return;
        stopOpenTimer();
        setOpen(false);
      }}
      onFocus={(event) => {
        onFocus?.(event);
        if (event.defaultPrevented) return;
        stopOpenTimer();
        setOpen(true);
      }}
      onKeyDown={(event) => {
        onKeyDown?.(event);
        if (event.defaultPrevented) return;
        if (event.key === "Escape") {
          stopOpenTimer();
          setOpen(false);
        }
      }}
      onMouseEnter={(event) => {
        onMouseEnter?.(event);
        if (event.defaultPrevented) return;
        startOpenTimer();
      }}
      onMouseLeave={(event) => {
        onMouseLeave?.(event);
        if (event.defaultPrevented) return;
        if (event.relatedTarget instanceof Node && contentRef.current?.contains(event.relatedTarget)) {
          return;
        }
        stopOpenTimer();
        setOpen(false);
      }}
      ref={(node) => {
        triggerRef.current = node;
        assignRef(ref, node);
      }}
      type="button"
    />
  );
});

export const TooltipContent = forwardRef<HTMLDivElement, TooltipContentProps>(function TooltipContent(
  { children, className, onKeyDown, onMouseEnter, onMouseLeave, side = "top", ...props },
  ref
) {
    const { contentId, contentRef, open, setOpen, startOpenTimer, stopOpenTimer, triggerRef } = useTooltipContext();
    const portalRoot = usePortalRoot();
    const { resolvedSide, style } = useFloatingPosition({
      align: "center",
      anchorRef: triggerRef as MutableRefObject<HTMLElement | null>,
      contentRef: contentRef as MutableRefObject<HTMLElement | null>,
      matchAnchorWidth: false,
      offset: 8,
      open,
      preferredSide: side
    });

    if (!open || !portalRoot) {
      return null;
    }

    return createPortal(
      <div
        {...props}
        className={cx("ui-tooltip-content", `ui-tooltip-side-${resolvedSide}`, className)}
        data-side={resolvedSide}
        data-state="open"
        id={contentId}
        onKeyDown={(event) => {
          onKeyDown?.(event);
          if (event.defaultPrevented) return;
          if (event.key === "Escape") {
            setOpen(false);
            triggerRef.current?.focus();
          }
        }}
        onMouseEnter={(event) => {
          onMouseEnter?.(event);
          if (event.defaultPrevented) return;
          startOpenTimer();
        }}
        onMouseLeave={(event) => {
          onMouseLeave?.(event);
          if (event.defaultPrevented) return;
          if (event.relatedTarget instanceof Node && triggerRef.current?.contains(event.relatedTarget)) {
            return;
          }
          stopOpenTimer();
          setOpen(false);
        }}
        ref={(node) => {
          contentRef.current = node;
          assignRef(ref, node);
        }}
        role="tooltip"
        style={style}
      >
        {children}
      </div>,
      portalRoot
    );
  }
);
