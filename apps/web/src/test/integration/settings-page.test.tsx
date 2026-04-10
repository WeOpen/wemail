import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { App } from "../../app/App";
import { jsonResponse } from "../helpers/mock-api";

describe("settings integration", () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it(
    "renders api key and telegram settings for an authenticated member",
    async () => {
      window.history.pushState({}, "", "/settings");
      vi.spyOn(globalThis, "fetch").mockImplementation((input) => {
        const url = typeof input === "string" ? input : input instanceof Request ? input.url : String(input);

        if (url.endsWith("/auth/session")) {
          return jsonResponse({
            user: {
              id: "member-1",
              email: "member@example.com",
              role: "member",
              createdAt: "2026-04-08T00:00:00.000Z"
            },
            featureToggles: {
              aiEnabled: true,
              telegramEnabled: true,
              outboundEnabled: true,
              mailboxCreationEnabled: true
            }
          });
        }

        if (url.endsWith("/api/mailboxes")) return jsonResponse({ mailboxes: [] });
        if (url.endsWith("/api/messages?mailboxId=null")) return jsonResponse({ messages: [] });
        if (url.endsWith("/api/outbound?mailboxId=null")) return jsonResponse({ messages: [] });
        if (url.endsWith("/api/keys")) return jsonResponse({ keys: [] });
        if (url.endsWith("/api/telegram")) return jsonResponse({ subscription: null });

        return jsonResponse({});
      });

      render(<App />);

      expect(await screen.findByRole("heading", { name: /api keys/i })).toBeInTheDocument();
      expect(screen.getByRole("heading", { name: /telegram/i })).toBeInTheDocument();
    },
    10000
  );
});
