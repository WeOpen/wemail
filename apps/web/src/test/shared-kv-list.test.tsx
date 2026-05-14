import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { KVList } from "../shared/kv-list";

describe("shared kv-list primitive", () => {
  it("renders semantic description list content with density classes", () => {
    render(
      <KVList
        density="compact"
        items={[
          { key: "区域", value: "Asia/Shanghai" },
          { key: "保留时长", value: "24 小时" }
        ]}
      />
    );

    const list = screen.getByRole("list", { hidden: true });
    expect(list.tagName).toBe("DL");
    expect(list).toHaveClass("ui-kv-list", "ui-kv-list-compact");
    expect(screen.getByText("区域")).toBeInTheDocument();
    expect(screen.getByText("Asia/Shanghai")).toBeInTheDocument();
  });
});
