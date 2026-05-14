import {
  cloneElement,
  forwardRef,
  isValidElement,
  useEffect,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type ChangeEventHandler,
  type ComponentPropsWithoutRef,
  type InputHTMLAttributes,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
  type Ref,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes
} from "react";
import { ChevronDown, Search, X } from "lucide-react";

type FormTone = "default" | "error" | "success";
type FormCheckVariant = "inline" | "card";

type FormFieldProps = {
  children: ReactNode;
  className?: string;
  description?: ReactNode;
  htmlFor?: string;
  label: ReactNode;
  message?: ReactNode;
  required?: boolean;
  tone?: FormTone;
};

type FormCheckProps = Omit<InputHTMLAttributes<HTMLInputElement>, "children" | "type"> & {
  className?: string;
  description?: ReactNode;
  inputClassName?: string;
  label: ReactNode;
  variant?: FormCheckVariant;
};

type CheckboxFieldProps = FormCheckProps;
type CheckboxProps = FormCheckProps;
type RadioProps = FormCheckProps;

type RadioGroupOption = {
  description?: ReactNode;
  disabled?: boolean;
  label: ReactNode;
  value: string;
};

type RadioGroupFieldProps = {
  className?: string;
  defaultValue?: string;
  description?: ReactNode;
  disabled?: boolean;
  legend: ReactNode;
  message?: ReactNode;
  name: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  options: RadioGroupOption[];
  required?: boolean;
  tone?: FormTone;
  value?: string;
  variant?: FormCheckVariant;
};

type SearchInputProps = Omit<ComponentPropsWithoutRef<"input">, "type"> & {
  clearLabel?: string;
  onClear?: () => void;
};

export type MultiSelectOption = {
  description?: ReactNode;
  disabled?: boolean;
  label: ReactNode;
  value: string;
};

type MultiSelectProps = Omit<ComponentPropsWithoutRef<"div">, "defaultValue" | "onChange"> & {
  clearLabel?: string;
  defaultValue?: string[];
  disabled?: boolean;
  emptyText?: ReactNode;
  name?: string;
  onValueChange?: (nextValue: string[]) => void;
  options: MultiSelectOption[];
  placeholder?: ReactNode;
  value?: string[];
};

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function mergeIds(...values: Array<string | undefined>) {
  return values.filter(Boolean).join(" ") || undefined;
}

function assignRef<T>(ref: Ref<T> | undefined, value: T) {
  if (!ref) return;
  if (typeof ref === "function") {
    ref(value);
    return;
  }
  ref.current = value;
}

function mergeRefs<T>(...refs: Array<Ref<T> | undefined>) {
  return (value: T) => {
    refs.forEach((ref) => assignRef(ref, value));
  };
}

function setNativeInputValue(input: HTMLInputElement, nextValue: string) {
  const descriptor = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value");
  descriptor?.set?.call(input, nextValue);
  input.dispatchEvent(new Event("input", { bubbles: true }));
}

function renderFieldMeta(
  description?: ReactNode,
  descriptionId?: string,
  message?: ReactNode,
  messageId?: string,
  tone: FormTone = "default"
) {
  return (
    <>
      {description ? (
        <span className="form-description" id={descriptionId}>
          {description}
        </span>
      ) : null}
      {message ? (
        <span className="form-message" data-tone={tone} id={messageId}>
          {message}
        </span>
      ) : null}
    </>
  );
}

function renderFieldLabel(label: ReactNode, required?: boolean) {
  return (
    <span className="form-label">
      <span>{label}</span>
      {required ? (
        <span aria-hidden="true" className="form-label-required">
          *
        </span>
      ) : null}
    </span>
  );
}

function renderFormCheck(
  type: "checkbox" | "radio",
  inputId: string,
  {
    className,
    description,
    inputClassName,
    label,
    variant = "inline",
    ...props
  }: FormCheckProps,
  ref: Ref<HTMLInputElement>
) {
  const descriptionId = description ? `${inputId}-description` : undefined;
  const isChecked = props.checked ?? props.defaultChecked;

  return (
    <div
      className={cx(
        "form-check",
        `form-check-${variant}`,
        props.disabled && "is-disabled",
        className
      )}
      data-disabled={props.disabled ? "true" : undefined}
      data-state={isChecked ? "checked" : "unchecked"}
    >
      <input
        {...props}
        aria-describedby={mergeIds(props["aria-describedby"], descriptionId)}
        className={cx("form-check-input", inputClassName)}
        id={inputId}
        ref={ref}
        type={type}
      />
      <span className="form-check-copy">
        <label className="form-check-label" htmlFor={inputId}>
          {label}
        </label>
        {description ? (
          <span className="form-check-description" id={descriptionId}>
            {description}
          </span>
        ) : null}
      </span>
    </div>
  );
}

function getMultiSelectSummary(selectedValues: string[], options: MultiSelectOption[], placeholder: ReactNode) {
  if (selectedValues.length === 0) return placeholder;

  const labels = selectedValues
    .map((selectedValue) => options.find((option) => option.value === selectedValue)?.label)
    .filter((label): label is ReactNode => label !== undefined);

  return labels.map((label, index) => (
    <span key={selectedValues[index]}>
      {index > 0 ? ", " : null}
      {label}
    </span>
  ));
}

function moveFocus(optionRefs: Array<HTMLInputElement | null>, startIndex: number, step: 1 | -1) {
  const total = optionRefs.length;
  let cursor = startIndex;

  for (let attempts = 0; attempts < total; attempts += 1) {
    cursor = (cursor + step + total) % total;
    const next = optionRefs[cursor];

    if (next && !next.disabled) {
      next.focus();
      return;
    }
  }
}

export function FormField({ children, className, description, htmlFor, label, message, required, tone = "default" }: FormFieldProps) {
  const generatedId = useId();
  const resolvedId = htmlFor ?? generatedId;
  const descriptionId = description ? `${resolvedId}-description` : undefined;
  const messageId = message ? `${resolvedId}-message` : undefined;
  const control = isValidElement<{ id?: string; "aria-describedby"?: string }>(children)
    ? cloneElement(children, {
        "aria-describedby": mergeIds(children.props["aria-describedby"], descriptionId, messageId),
        id: htmlFor ? children.props.id : children.props.id ?? resolvedId
      })
    : children;

  return (
    <div className={cx("form-field", className)}>
      <div className="form-field-copy">
        <label className="form-label" htmlFor={resolvedId}>
          {renderFieldLabel(label, required)}
        </label>
        {renderFieldMeta(description, descriptionId, message, messageId, tone)}
      </div>
      {control}
    </div>
  );
}

export const TextInput = forwardRef<HTMLInputElement, ComponentPropsWithoutRef<"input">>(function TextInput(
  { className, ...props },
  ref
) {
  return <input {...props} className={cx("form-control", className)} ref={ref} />;
});

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(function SearchInput(
  {
    "aria-label": ariaLabel,
    className,
    clearLabel = "清除搜索",
    defaultValue,
    disabled,
    onChange,
    onClear,
    readOnly,
    value,
    ...props
  },
  ref
) {
    const internalRef = useRef<HTMLInputElement>(null);
    const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue?.toString() ?? "");
    const isControlled = value !== undefined;
    const currentValue = isControlled ? value?.toString() ?? "" : uncontrolledValue;

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
      if (!isControlled) {
        setUncontrolledValue(event.target.value);
      }
      onChange?.(event);
    }

    function handleClear() {
      const nextTarget = internalRef.current;

      if (!nextTarget) return;
      setNativeInputValue(nextTarget, "");
      if (!isControlled) {
        setUncontrolledValue("");
      }
      nextTarget.focus();
      onClear?.();
    }

    return (
      <div
        className={cx("ui-search-input", disabled && "is-disabled", className)}
        data-disabled={disabled ? "true" : undefined}
        data-state={currentValue ? "has-value" : "empty"}
      >
        <span aria-hidden="true" className="ui-search-input-icon">
          <Search size={16} strokeWidth={1.8} />
        </span>
        <input
          {...props}
          aria-label={ariaLabel}
          className="form-control ui-search-input-control"
          defaultValue={defaultValue}
          disabled={disabled}
          onChange={handleChange}
          readOnly={readOnly}
          ref={mergeRefs(ref, internalRef)}
          type="search"
          value={value}
        />
        {currentValue && !disabled && !readOnly ? (
          <button
            aria-label={clearLabel}
            className="ui-search-input-clear"
            onClick={handleClear}
            type="button"
          >
            <X aria-hidden="true" size={14} strokeWidth={2} />
          </button>
        ) : null}
      </div>
    );
  }
);

export const SelectInput = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(function SelectInput(
  { className, ...props },
  ref
) {
  return <select {...props} className={cx("form-control", "form-select", className)} ref={ref} />;
});

export const TextareaInput = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(function TextareaInput(
  { className, ...props },
  ref
) {
  return <textarea {...props} className={cx("form-control", "form-textarea", className)} ref={ref} />;
});

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(props, ref) {
  const generatedId = useId();
  return renderFormCheck("checkbox", props.id ?? generatedId, props, ref);
});

export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(props, ref) {
  const generatedId = useId();
  return renderFormCheck("radio", props.id ?? generatedId, props, ref);
});

export function CheckboxField(props: CheckboxFieldProps) {
  return <Checkbox {...props} />;
}

export const MultiSelect = forwardRef<HTMLDivElement, MultiSelectProps>(function MultiSelect(
  {
    "aria-label": ariaLabel,
    className,
    clearLabel = "清空选择",
    defaultValue = [],
    disabled = false,
    emptyText = "暂无可选项",
    name,
    onValueChange,
    options,
    placeholder = "请选择",
    value,
    ...props
  },
  ref
) {
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const isControlled = value !== undefined;
  const selectedValues = isControlled ? value : internalValue;

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      const currentRoot = rootRef.current;
      if (!currentRoot || currentRoot.contains(event.target as Node)) return;
      setIsOpen(false);
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const firstSelectedIndex = options.findIndex((option) => selectedValues.includes(option.value) && !option.disabled);
    const focusIndex = firstSelectedIndex >= 0 ? firstSelectedIndex : options.findIndex((option) => !option.disabled);
    optionRefs.current[focusIndex]?.focus();
  }, [isOpen, options, selectedValues]);

  function commitValue(nextValue: string[]) {
    if (!isControlled) {
      setInternalValue(nextValue);
    }
    onValueChange?.(nextValue);
  }

  function toggleValue(nextOptionValue: string) {
    const nextValue = selectedValues.includes(nextOptionValue)
      ? selectedValues.filter((selectedValue) => selectedValue !== nextOptionValue)
      : [...selectedValues, nextOptionValue];

    commitValue(nextValue);
  }

  function closePanel() {
    setIsOpen(false);
    triggerRef.current?.focus();
  }

  function handleTriggerKeyDown(event: ReactKeyboardEvent<HTMLButtonElement>) {
    if (disabled) return;

    if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setIsOpen(true);
    }
  }

  function handleOptionKeyDown(index: number) {
    return (event: ReactKeyboardEvent<HTMLInputElement>) => {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        moveFocus(optionRefs.current, index, 1);
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        moveFocus(optionRefs.current, index, -1);
      }

      if (event.key === "Escape") {
        event.preventDefault();
        closePanel();
      }
    };
  }

  function handleClear() {
    commitValue([]);
  }

  const summary = getMultiSelectSummary(selectedValues, options, placeholder);
  const hasSelection = selectedValues.length > 0;
  const labelText = typeof ariaLabel === "string" ? ariaLabel : "多选";

  return (
    <div
      {...props}
      className={cx("ui-multi-select", disabled && "is-disabled", className)}
      data-state={isOpen ? "open" : "closed"}
      ref={mergeRefs(ref, rootRef)}
    >
      <div className="ui-multi-select-trigger-shell">
        <button
          aria-controls={panelId}
          aria-expanded={isOpen}
          aria-haspopup="dialog"
          aria-label={ariaLabel}
          className="ui-multi-select-trigger"
          disabled={disabled}
          onClick={() => setIsOpen((current) => !current)}
          onKeyDown={handleTriggerKeyDown}
          ref={triggerRef}
          type="button"
        >
          <span className={cx("ui-multi-select-value", !hasSelection && "is-placeholder")}>{summary}</span>
          <span aria-hidden="true" className="ui-multi-select-actions">
            <ChevronDown className="ui-multi-select-chevron" size={16} strokeWidth={1.8} />
          </span>
        </button>
        {hasSelection && !disabled ? (
          <button
            aria-label={clearLabel}
            className="ui-multi-select-clear"
            onClick={handleClear}
            type="button"
          >
            <X size={14} strokeWidth={2} />
          </button>
        ) : null}
      </div>

      {name
        ? selectedValues.map((selectedValue) => <input key={selectedValue} name={name} type="hidden" value={selectedValue} />)
        : null}

      {isOpen ? (
        <div aria-label={labelText} className="ui-multi-select-panel" id={panelId} role="dialog">
          {options.length === 0 ? <div className="ui-multi-select-empty">{emptyText}</div> : null}
          {options.map((option, index) => {
            const isSelected = selectedValues.includes(option.value);

            return (
              <Checkbox
                checked={isSelected}
                className="ui-multi-select-option"
                description={option.description}
                disabled={option.disabled}
                inputClassName="ui-multi-select-option-input"
                key={option.value}
                label={option.label}
                onChange={() => {
                  if (option.disabled) return;
                  toggleValue(option.value);
                }}
                onKeyDown={handleOptionKeyDown(index)}
                ref={(node) => {
                  optionRefs.current[index] = node;
                }}
                variant="card"
              />
            );
          })}
        </div>
      ) : null}
    </div>
  );
});

export function RadioGroupField({
  className,
  defaultValue,
  description,
  disabled = false,
  legend,
  message,
  name,
  onChange,
  options,
  required = false,
  tone = "default",
  value,
  variant = "inline"
}: RadioGroupFieldProps) {
  const groupId = useId();

  return (
    <fieldset className={cx("form-radio-group", className)}>
      <legend className="form-label">{legend}</legend>
      {renderFieldMeta(description, `${groupId}-description`, message, `${groupId}-message`, tone)}
      <div className="form-radio-group-options">
        {options.map((option) => {
          const isControlled = typeof value === "string";
          const checkedProps = isControlled ? { checked: value === option.value } : { defaultChecked: defaultValue === option.value };

          return (
            <Radio
              {...checkedProps}
              description={option.description}
              disabled={disabled || option.disabled}
              key={option.value}
              label={option.label}
              name={name}
              onChange={onChange}
              required={required}
              value={option.value}
              variant={variant}
            />
          );
        })}
      </div>
    </fieldset>
  );
}
