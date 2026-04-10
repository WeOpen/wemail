import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { App } from "../app/App";
import { jsonResponse } from "./helpers/mock-api";

describe("App", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.spyOn(globalThis, "fetch").mockImplementation(() => jsonResponse({}));
  });

  afterEach(() => {
    cleanup();
  });

  it(
    "renders the hero copy for signed-out users",
    async () => {
      vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("not authenticated"));
      render(<App />);

      expect(
        await screen.findByRole("heading", {
          name: /self-hosted temporary email with a control-room aesthetic/i
        })
      ).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /create account/i })).toBeInTheDocument();
    },
    10000
  );

  it(
    "shows mailbox oversight on the admin route for admins",
    async () => {
      window.history.pushState({}, "", "/admin");
      vi.restoreAllMocks();
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

        if (url.endsWith("/api/mailboxes")) {
          return jsonResponse({ mailboxes: [] });
        }

        if (url.endsWith("/api/keys")) {
          return jsonResponse({ keys: [] });
        }

        if (url.endsWith("/api/telegram")) {
          return jsonResponse({ subscription: null });
        }

        if (url.endsWith("/admin/users")) {
          return jsonResponse({
            users: [
              {
                id: "admin-1",
                email: "admin@example.com",
                role: "admin",
                createdAt: "2026-04-08T00:00:00.000Z"
              }
            ]
          });
        }

        if (url.endsWith("/admin/invites")) {
          return jsonResponse({ invites: [] });
        }

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

        if (url.endsWith("/admin/mailboxes")) {
          return jsonResponse({
            mailboxes: [
              {
                id: "box-1",
                userId: "admin-1",
                address: "ops@example.com",
                label: "Ops",
                createdAt: "2026-04-08T00:00:00.000Z"
              }
            ]
          });
        }

        return jsonResponse({});
      });

      render(<App />);

      expect(await screen.findByRole("heading", { name: /mailbox oversight/i })).toBeInTheDocument();
      expect(await screen.findByText(/ops@example.com/i)).toBeInTheDocument();
      expect(await screen.findByDisplayValue("20")).toBeInTheDocument();
    },
    10000
  );
});
