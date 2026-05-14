import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import {
  ScrollArea,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport
} from "../shared/scroll-area";

describe("shared scroll area primitives", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders a labeled scroll region with viewport and scrollbar parts", () => {
    render(
      <ScrollArea aria-label="邮件列表">
        <ScrollAreaViewport>
          <div style={{ height: 400 }}>很多邮件</div>
        </ScrollAreaViewport>
        <ScrollAreaScrollbar orientation="vertical">
          <ScrollAreaThumb />
        </ScrollAreaScrollbar>
      </ScrollArea>
    );

    const region = screen.getByRole("region", { name: "邮件列表" });
    expect(region).toHaveClass("ui-scroll-area");
    expect(region).toHaveAttribute("data-orientation", "vertical");
    expect(region.querySelector(".ui-scroll-area-viewport")).toBeInTheDocument();

    const scrollbar = region.querySelector(".ui-scroll-area-scrollbar");
    expect(scrollbar).toHaveAttribute("data-orientation", "vertical");
    expect(scrollbar?.querySelector(".ui-scroll-area-thumb")).toBeInTheDocument();
  });
});
