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

import { assignRef, focusableSelector, useFloatingPosition, usePortalRoot } from "../overlay/layer-utils";

type PopoverProps = {
  children: ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

type PopoverTriggerProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type">;

type PopoverContentProps = HTMLAttributes<HTMLDivElement> & {
  align?: "start" | "center" | "end";
  side?: "top" | "bottom";
};

type PopoverContextValue = {
  contentId: string;
  contentRef: MutableRefObject<HTMLDivElement | null>;
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: MutableRefObject<HTMLButtonElement | null>;
};

const PopoverContext = createContext<PopoverContextValue | null>(null);

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function usePopoverContext() {
  const context = useContext(PopoverContext);

  if (!context) {
    throw new Error("Popover primitives must be used within <Popover>.");
  }

  return context;
}

function useControllableOpenState({
  defaultOpen = false,
  onOpenChange,
  open
}: Pick<PopoverProps, "defaultOpen" | "onOpenChange" | "open">) {
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

export function Popover({ children, defaultOpen, onOpenChange, open }: PopoverProps) {
  const contentId = useId();
  const contentRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const [isOpen, setOpen] = useControllableOpenState({ defaultOpen, onOpenChange, open });

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handlePointerDown(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Node)) {
        return;
      }

      if (triggerRef.current?.contains(target) || contentRef.current?.contains(target)) {
        return;
      }

      setOpen(false);
      triggerRef.current?.focus();
    }

    document.addEventListener("mousedown", handlePointerDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
    };
  }, [isOpen, setOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const content = contentRef.current;
    if (!content) {
      return;
    }

    const firstFocusable = content.querySelector<HTMLElement>(focusableSelector);
    (firstFocusable ?? content).focus();
  }, [isOpen]);

  return (
    <PopoverContext.Provider
      value={{
        contentId,
        contentRef,
        open: isOpen,
        setOpen,
        triggerRef
      }}
    >
      <div className="ui-popover-root" data-state={isOpen ? "open" : "closed"}>
        {children}
      </div>
    </PopoverContext.Provider>
  );
}

export const PopoverTrigger = forwardRef<HTMLButtonElement, PopoverTriggerProps>(function PopoverTrigger(
  { className, onClick, ...props },
  ref
) {
  const { contentId, open, setOpen, triggerRef } = usePopoverContext();

  return (
    <button
      {...props}
      aria-controls={contentId}
      aria-expanded={open}
      aria-haspopup="dialog"
      className={cx("ui-popover-trigger", className)}
      data-state={open ? "open" : "closed"}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented) return;
        setOpen(!open);
      }}
      ref={(node) => {
        triggerRef.current = node;
        assignRef(ref, node);
      }}
      type="button"
    />
  );
});

export const PopoverContent = forwardRef<HTMLDivElement, PopoverContentProps>(function PopoverContent(
  { align = "start", children, className, onKeyDown, side = "bottom", ...props },
  ref
) {
  const { contentId, contentRef, open, setOpen, triggerRef } = usePopoverContext();
  const portalRoot = usePortalRoot();
  const { resolvedSide, style } = useFloatingPosition({
    align,
    anchorRef: triggerRef as MutableRefObject<HTMLElement | null>,
    contentRef: contentRef as MutableRefObject<HTMLElement | null>,
    matchAnchorWidth: true,
    open,
    preferredSide: side
  });

  if (!open || !portalRoot) {
    return null;
  }

  return createPortal(
    <div
      {...props}
      aria-modal="false"
      className={cx(
        "ui-popover-content",
        `ui-popover-side-${resolvedSide}`,
        `ui-popover-align-${align}`,
        className
      )}
      data-align={align}
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
      ref={(node) => {
        contentRef.current = node;
        assignRef(ref, node);
      }}
      role="dialog"
      style={style}
      tabIndex={-1}
    >
      {children}
    </div>,
    portalRoot
  );
});
