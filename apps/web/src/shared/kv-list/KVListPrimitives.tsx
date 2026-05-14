import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

type KVListDensity = "compact" | "comfortable";

type KVListItem = {
  action?: ReactNode;
  hint?: ReactNode;
  key: ReactNode;
  value: ReactNode;
};

type KVListProps = HTMLAttributes<HTMLDListElement> & {
  density?: KVListDensity;
  items: KVListItem[];
};

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export const KVList = forwardRef<HTMLDListElement, KVListProps>(function KVList(
  { className, density = "comfortable", items, ...props },
  ref
) {
  return (
    <dl
      {...props}
      className={cx("ui-kv-list", `ui-kv-list-${density}`, className)}
      ref={ref}
      role="list"
    >
      {items.map((item, index) => (
        <div className="ui-kv-list-row" key={`${String(item.key)}-${index}`}>
          <dt className="ui-kv-list-key">
            {item.key}
            {item.hint ? <span className="ui-kv-list-hint">{item.hint}</span> : null}
          </dt>
          <dd className="ui-kv-list-value">
            <span>{item.value}</span>
            {item.action ? <span className="ui-kv-list-action">{item.action}</span> : null}
          </dd>
        </div>
      ))}
    </dl>
  );
});
