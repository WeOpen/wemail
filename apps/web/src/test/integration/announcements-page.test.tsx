import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { App } from "../../app/App";
import { jsonResponse } from "../helpers/mock-api";

describe("announcements integration", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    window.localStorage.clear();
    vi.spyOn(globalThis, "fetch").mockImplementation(() => jsonResponse({}));
  });

  afterEach(() => {
    cleanup();
    window.history.pushState({}, "", "/");
  });

  it(
    "renders the announcements board instead of the placeholder page",
    async () => {
      window.history.pushState({}, "", "/announcements");
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

        if (url.endsWith("/api/mailboxes")) {
          return jsonResponse({
            mailboxes: [{ id: "box-1", address: "ops@example.com", label: "Ops", createdAt: "2026-04-08T00:00:00.000Z" }]
          });
        }
        if (url.endsWith("/api/messages?mailboxId=box-1")) return jsonResponse({ messages: [] });
        if (url.endsWith("/api/outbound?mailboxId=box-1")) return jsonResponse({ messages: [] });
        if (url.endsWith("/api/keys")) return jsonResponse({ keys: [] });
        if (url.endsWith("/api/telegram")) return jsonResponse({ subscription: null });

        return jsonResponse({});
      });

      render(<App />);

      expect(await screen.findByRole("searchbox", { name: /公告搜索/i })).toBeInTheDocument();
      expect(screen.getByRole("heading", { name: /4 月核心平台升级将于本周六凌晨执行/i })).toBeInTheDocument();
      expect(screen.getByRole("heading", { name: /最近公告/i })).toBeInTheDocument();
      expect(screen.getByRole("heading", { name: /状态概览/i })).toBeInTheDocument();
      expect(screen.getByRole("heading", { name: /近期维护窗口/i })).toBeInTheDocument();
      expect(screen.queryByText(/公告页面已预留/i)).not.toBeInTheDocument();
    },
    10000
  );
});
