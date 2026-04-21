import { type ReactElement, type ReactNode } from "react";
import { act, render, type RenderOptions, type RenderResult } from "@testing-library/react";

export type SupportedTheme = "light" | "dark";

type RenderWithThemeOptions = RenderOptions & {
  theme?: SupportedTheme;
};

export type RenderWithThemeResult = RenderResult & {
  setTheme: (next: SupportedTheme) => void;
};

export function renderWithTheme(
  ui: ReactElement | ReactNode,
  { theme = "light", ...rest }: RenderWithThemeOptions = {}
): RenderWithThemeResult {
  document.documentElement.dataset.theme = theme;

  const result = render(ui as ReactElement, rest);

  function setTheme(next: SupportedTheme) {
    act(() => {
      document.documentElement.dataset.theme = next;
    });
  }

  return { ...result, setTheme };
}
