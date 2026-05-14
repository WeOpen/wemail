import { Check, Copy } from "lucide-react";
import { forwardRef, useEffect, useRef, useState, type ButtonHTMLAttributes, type MouseEvent, type ReactNode } from "react";

type CopyState = "idle" | "copied" | "error";

type CopyButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "onCopy"> & {
  children?: ReactNode;
  copiedLabel?: ReactNode;
  onCopy?: (value: string) => void | Promise<void>;
  onCopyError?: (error: unknown) => void;
  resetAfterMs?: number;
  value: string;
};

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export const CopyButton = forwardRef<HTMLButtonElement, CopyButtonProps>(function CopyButton(
  {
    children,
    className,
    copiedLabel = "已复制",
    disabled,
    onClick,
    onCopy,
    onCopyError,
    resetAfterMs = 2000,
    type = "button",
    value,
    ...props
  },
  ref
) {
    const [state, setState] = useState<CopyState>("idle");
    const timeoutRef = useRef<number | null>(null);

    useEffect(() => {
      return () => {
        if (timeoutRef.current) {
          window.clearTimeout(timeoutRef.current);
        }
      };
    }, []);

    async function handleClick(event: MouseEvent<HTMLButtonElement>) {
      onClick?.(event);
      if (event.defaultPrevented || disabled) return;

      try {
        const clipboard = globalThis.navigator?.clipboard;
        const writeText = clipboard && typeof clipboard.writeText === "function" ? clipboard.writeText.bind(clipboard) : null;

        if (!writeText) {
          throw new Error("Clipboard API unavailable");
        }

        await writeText(value);
        await onCopy?.(value);
        setState("copied");

        if (timeoutRef.current) {
          window.clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = window.setTimeout(() => {
          setState("idle");
        }, resetAfterMs);
      } catch (error) {
        setState("error");
        onCopyError?.(error);
      }
    }

    const label = state === "copied" ? copiedLabel : children;

    return (
      <button
        {...props}
        aria-live="polite"
        className={cx("ui-copy-button", state === "copied" && "is-copied", state === "error" && "is-error", className)}
        data-state={state}
        disabled={disabled}
        onClick={handleClick}
        ref={ref}
        type={type}
      >
        <span aria-hidden="true" className="ui-copy-button-icon">
          {state === "copied" ? <Check size={16} strokeWidth={2} /> : <Copy size={16} strokeWidth={1.8} />}
        </span>
        <span className="ui-copy-button-label">{label}</span>
      </button>
    );
  }
);
