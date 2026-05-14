import { fireEvent } from "@testing-library/react";

export type PressKeyOptions = {
  code?: string;
  shiftKey?: boolean;
  ctrlKey?: boolean;
  altKey?: boolean;
  metaKey?: boolean;
};

export function pressKey(element: Element, key: string, options: PressKeyOptions = {}) {
  const init: KeyboardEventInit = {
    key,
    code: options.code ?? key,
    shiftKey: options.shiftKey,
    ctrlKey: options.ctrlKey,
    altKey: options.altKey,
    metaKey: options.metaKey,
    bubbles: true,
    cancelable: true
  };

  fireEvent.keyDown(element, init);
  fireEvent.keyUp(element, init);
}
