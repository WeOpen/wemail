import { CircleAlert, Info, TriangleAlert, X, type LucideIcon } from "lucide-react";
import { forwardRef, type ButtonHTMLAttributes, type HTMLAttributes, type ReactNode } from "react";

type AlertVariant = "info" | "success" | "warning" | "error";
type AlertAppearance = "soft" | "outline";

type AlertProps = HTMLAttributes<HTMLDivElement> & {
  actions?: ReactNode;
  appearance?: AlertAppearance;
  dismissLabel?: string;
  icon?: ReactNode;
  onClose?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
  title?: ReactNode;
  variant?: AlertVariant;
};

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

const iconMap: Record<AlertVariant, LucideIcon> = {
  error: CircleAlert,
  info: Info,
  success: Info,
  warning: TriangleAlert
};

export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  {
    actions,
    appearance = "soft",
    children,
    className,
    dismissLabel = "关闭提示",
    icon,
    onClose,
    role = "alert",
    title,
    variant = "info",
    ...props
  },
  ref
) {
    const Icon = iconMap[variant];

    return (
      <div
        {...props}
        className={cx("ui-alert", `ui-alert-${variant}`, `ui-alert-${appearance}`, className)}
        data-state="visible"
        ref={ref}
        role={role}
      >
        <div className="ui-alert-icon" aria-hidden="true">
          {icon ?? <Icon size={18} strokeWidth={1.8} />}
        </div>
        <div className="ui-alert-copy">
          {title ? <div className="ui-alert-title">{title}</div> : null}
          {children ? <div className="ui-alert-body">{children}</div> : null}
          {actions ? <div className="ui-alert-actions">{actions}</div> : null}
        </div>
        {onClose ? (
          <button aria-label={dismissLabel} className="ui-alert-close" onClick={onClose} type="button">
            <X aria-hidden="true" size={16} strokeWidth={2} />
          </button>
        ) : null}
      </div>
    );
  }
);
