import { createPortal } from "react-dom";
import { type KeyboardEvent, type ReactNode, useId, useRef } from "react";
import { X } from "lucide-react";

import { Button } from "../button";
import { getFocusableElements, useOverlayAccessibility, usePortalRoot } from "./layer-utils";

type OverlayBaseProps = {
  ariaLabel?: string;
  children: ReactNode;
  className?: string;
  closeLabel?: string;
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
  description?: ReactNode;
  eyebrow?: ReactNode;
  footer?: ReactNode;
  onClose: () => void;
  title: ReactNode;
};

type OverlayDrawerProps = OverlayBaseProps & {
  width?: "sm" | "md" | "lg";
};

type OverlayDialogProps = OverlayBaseProps & {
  size?: "sm" | "md" | "lg";
};

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function stopPanelClick(event: React.MouseEvent) {
  event.stopPropagation();
}

function handleDialogKeyDown(event: KeyboardEvent<HTMLElement>, closeOnEscape: boolean, onClose: () => void) {
  if (event.key === "Tab") {
    const currentTarget = event.currentTarget;
    const focusableElements = getFocusableElements(currentTarget);

    if (focusableElements.length === 0) {
      event.preventDefault();
      currentTarget.focus();
      return;
    }

    const first = focusableElements[0];
    const last = focusableElements[focusableElements.length - 1];
    const activeElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;

    if (event.shiftKey && activeElement === first) {
      event.preventDefault();
      last.focus();
      return;
    }

    if (!event.shiftKey && activeElement === last) {
      event.preventDefault();
      first.focus();
      return;
    }
  }

  if (!closeOnEscape || event.key !== "Escape") {
    return;
  }

  event.stopPropagation();
  onClose();
}

function OverlayHeader({
  closeLabel,
  description,
  descriptionId,
  eyebrow,
  onClose,
  title,
  titleId
}: Pick<OverlayBaseProps, "closeLabel" | "description" | "eyebrow" | "onClose" | "title"> & {
  descriptionId?: string;
  titleId: string;
}) {
  return (
    <div className="ui-overlay-header">
      <div className="ui-overlay-title-block">
        {eyebrow ? <p className="ui-overlay-eyebrow">{eyebrow}</p> : null}
        <h2 id={titleId}>{title}</h2>
        {description ? (
          <p className="ui-overlay-description" id={descriptionId}>
            {description}
          </p>
        ) : null}
      </div>
      <Button aria-label={closeLabel ?? "关闭弹层"} iconOnly onClick={onClose} size="sm" variant="icon">
        <X absoluteStrokeWidth aria-hidden="true" className="workspace-icon" strokeWidth={1.9} />
      </Button>
    </div>
  );
}

export function OverlayDrawer({
  children,
  ariaLabel,
  className,
  closeLabel,
  closeOnBackdrop,
  description,
  eyebrow,
  footer,
  onClose,
  title,
  closeOnEscape = true,
  width = "md"
}: OverlayDrawerProps) {
  const titleId = useId();
  const descriptionId = useId();
  const panelRef = useRef<HTMLElement | null>(null);
  const portalRoot = usePortalRoot();

  useOverlayAccessibility({ active: true, panelRef, portalRoot });

  if (!portalRoot) {
    return null;
  }

  return createPortal(
    <div
      className="ui-overlay-backdrop ui-overlay-backdrop-drawer"
      data-testid="overlay-backdrop"
      onClick={closeOnBackdrop ? onClose : undefined}
      role="presentation"
    >
      <section
        aria-label={ariaLabel}
        aria-describedby={description ? descriptionId : undefined}
        aria-labelledby={ariaLabel ? undefined : titleId}
        aria-modal="true"
        className={cx("ui-overlay-panel ui-overlay-drawer panel", `ui-overlay-drawer-${width}`, className)}
        onClick={stopPanelClick}
        onKeyDown={(event) => handleDialogKeyDown(event, closeOnEscape, onClose)}
        ref={panelRef}
        role="dialog"
        tabIndex={-1}
      >
        <OverlayHeader
          closeLabel={closeLabel}
          description={description}
          descriptionId={description ? descriptionId : undefined}
          eyebrow={eyebrow}
          onClose={onClose}
          title={title}
          titleId={titleId}
        />
        <div className="ui-overlay-body">{children}</div>
        {footer ? <div className="ui-overlay-footer">{footer}</div> : null}
      </section>
    </div>,
    portalRoot
  );
}

export function OverlayDialog({
  children,
  ariaLabel,
  className,
  closeLabel,
  closeOnBackdrop,
  description,
  eyebrow,
  footer,
  onClose,
  size = "md",
  title,
  closeOnEscape = true
}: OverlayDialogProps) {
  const titleId = useId();
  const descriptionId = useId();
  const panelRef = useRef<HTMLElement | null>(null);
  const portalRoot = usePortalRoot();

  useOverlayAccessibility({ active: true, panelRef, portalRoot });

  if (!portalRoot) {
    return null;
  }

  return createPortal(
    <div
      className="ui-overlay-backdrop ui-overlay-backdrop-dialog"
      data-testid="overlay-backdrop"
      onClick={closeOnBackdrop ? onClose : undefined}
      role="presentation"
    >
      <section
        aria-label={ariaLabel}
        aria-describedby={description ? descriptionId : undefined}
        aria-labelledby={ariaLabel ? undefined : titleId}
        aria-modal="true"
        className={cx("ui-overlay-panel ui-overlay-dialog panel", `ui-overlay-dialog-${size}`, className)}
        onClick={stopPanelClick}
        onKeyDown={(event) => handleDialogKeyDown(event, closeOnEscape, onClose)}
        ref={panelRef}
        role="dialog"
        tabIndex={-1}
      >
        <OverlayHeader
          closeLabel={closeLabel}
          description={description}
          descriptionId={description ? descriptionId : undefined}
          eyebrow={eyebrow}
          onClose={onClose}
          title={title}
          titleId={titleId}
        />
        <div className="ui-overlay-body">{children}</div>
        {footer ? <div className="ui-overlay-footer">{footer}</div> : null}
      </section>
    </div>,
    portalRoot
  );
}
