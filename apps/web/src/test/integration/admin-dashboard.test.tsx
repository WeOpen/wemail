import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { App } from "../../app/App";
import { jsonResponse } from "../helpers/mock-api";

describe("admin dashboard integration", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.spyOn(globalThis, "fetch").mockImplementation(() => jsonResponse({}));
  });

  afterEach(() => {
    cleanup();
  });

  it(
    "renders invite and quota controls for an authenticated admin",
    async () => {
      window.history.pushState({}, "", "/admin");
      vi.spyOn(globalThis, "fetch").mockImplementation((input) => {
        const url = typeof input === "string" ? input : input instanceof Request ? input.url : String(input);

        if (url.endsWith("/auth/session")) {
          return jsonResponse({
            user: {
              id: "admin-1",
              email: "admin@example.com",
              role: "admin",
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
        if (url.endsWith("/api/keys")) return jsonResponse({ keys: [] });
        if (url.endsWith("/api/telegram")) return jsonResponse({ subscription: null });
        if (url.endsWith("/admin/users")) {
          return jsonResponse({
            users: [{ id: "admin-1", email: "admin@example.com", role: "admin", createdAt: "2026-04-08T00:00:00.000Z" }]
          });
        }
        if (url.endsWith("/admin/invites")) return jsonResponse({ invites: [] });
        if (url.endsWith("/admin/features")) {
          return jsonResponse({
            featureToggles: {
              aiEnabled: true,
              telegramEnabled: true,
              outboundEnabled: true,
              mailboxCreationEnabled: true
            }
          });
        }
        if (url.includes("/admin/quotas/")) {
          return jsonResponse({
            quota: {
              userId: "admin-1",
              dailyLimit: 20,
              sendsToday: 0,
              disabled: false,
              updatedAt: "2026-04-08T00:00:00.000Z"
            }
          });
        }
        if (url.endsWith("/admin/mailboxes")) return jsonResponse({ mailboxes: [] });
        return jsonResponse({});
      });

      render(<App />);

      expect(await screen.findByRole("heading", { name: /invite control/i })).toBeInTheDocument();
      expect(screen.getByRole("heading", { name: /operator controls/i })).toBeInTheDocument();
      expect(await screen.findByDisplayValue("20")).toBeInTheDocument();
    },
    10000
  );
});
