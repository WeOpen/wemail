import {
  Fragment,
  forwardRef,
  type CSSProperties,
  type HTMLAttributes,
  type LabelHTMLAttributes,
  type ReactNode
} from "react";

type TypographyTone = "default" | "muted" | "accent" | "success" | "warning" | "danger";
type HeadingSize = "display-lg" | "display-md" | "title-lg" | "title-md";
type TextSize = "lg" | "md" | "caption";
type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
type TextTag = "p" | "span" | "div";
type CodeTag = "code" | "pre" | "span";

type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  as?: HeadingTag;
  size?: HeadingSize;
  tone?: TypographyTone;
};

type TextProps = HTMLAttributes<HTMLElement> & {
  as?: TextTag;
  size?: TextSize;
  tone?: TypographyTone;
};

type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  size?: Extract<TextSize, "md" | "caption">;
  tone?: TypographyTone;
};

type CodeProps = HTMLAttributes<HTMLElement> & {
  as?: CodeTag;
  block?: boolean;
  tone?: TypographyTone;
};

type KbdProps = HTMLAttributes<HTMLElement> & {
  keys?: ReactNode[];
  separator?: ReactNode;
};

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function toneClassName(tone: TypographyTone) {
  return tone === "default" ? undefined : `ui-tone-${tone}`;
}

function mergeStyle(style?: CSSProperties, nextStyle?: CSSProperties) {
  if (!style) return nextStyle;
  if (!nextStyle) return style;
  return { ...nextStyle, ...style };
}

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(function Heading(
  { as = "h2", className, size = "title-lg", tone = "default", ...props },
  ref
) {
  const Comp = as;

  return <Comp {...props} className={cx("ui-heading", `ui-heading-${size}`, toneClassName(tone), className)} ref={ref} />;
});

export const Text = forwardRef<HTMLElement, TextProps>(function Text(
  { as = "p", className, size = "md", tone = "default", ...props },
  ref
) {
  const Comp = as;

  return <Comp {...props} className={cx("ui-text", `ui-text-${size}`, toneClassName(tone), className)} ref={ref as never} />;
});

export const Muted = forwardRef<HTMLElement, Omit<TextProps, "tone">>(function Muted(
  { className, size = "md", ...props },
  ref
) {
  return <Text {...props} className={cx("ui-text-muted", className)} ref={ref as never} size={size} tone="muted" />;
});

export const Label = forwardRef<HTMLLabelElement, LabelProps>(function Label(
  { className, size = "md", tone = "default", ...props },
  ref
) {
  return <label {...props} className={cx("ui-label", `ui-label-${size}`, toneClassName(tone), className)} ref={ref} />;
});

export const Code = forwardRef<HTMLElement, CodeProps>(function Code(
  { as = "code", block = false, className, style, tone = "default", ...props },
  ref
) {
  const Comp = as;
  const nextStyle = mergeStyle(style, block || as === "pre" ? { display: "block" } : undefined);

  return (
    <Comp
      {...props}
      className={cx("ui-code", (block || as === "pre") && "ui-code-block", toneClassName(tone), className)}
      ref={ref as never}
      style={nextStyle}
    />
  );
});

export const Kbd = forwardRef<HTMLElement, KbdProps>(function Kbd(
  { children, className, keys, separator = "+", ...props },
  ref
) {
  const segments = keys?.length ? keys : undefined;

  return (
    <kbd {...props} className={cx("ui-kbd", className)} ref={ref}>
      {segments
        ? segments.map((segment, index) => (
            <Fragment key={`${String(segment)}-${index}`}>
              {index > 0 ? <span className="ui-kbd-separator">{separator}</span> : null}
              <span className="ui-kbd-key">{segment}</span>
            </Fragment>
          ))
        : children}
    </kbd>
  );
});
