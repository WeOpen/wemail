import { expect, test } from "@playwright/test";

test("shows the landing page headline", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: /self-hosted temporary email with a control-room aesthetic/i })
  ).toBeVisible();
});

test.skip("shows settings sections for an authenticated member", async ({ page }) => {
  await page.route("**/auth/session", async (route) => {
    await route.fulfill({
      json: {
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
      }
    });
  });

  await page.route("**/api/mailboxes", async (route) => route.fulfill({ json: { mailboxes: [] } }));
  await page.route("**/api/keys", async (route) => route.fulfill({ json: { keys: [] } }));
  await page.route("**/api/telegram", async (route) =>
    route.fulfill({ json: { subscription: null } })
  );

  await page.goto("/settings");
  await expect(page.getByRole("heading", { name: /member@example.com/i })).toBeVisible({ timeout: 15000 });
  await expect(page.getByRole("heading", { name: /api keys/i })).toBeVisible({ timeout: 15000 });
  await expect(page.getByRole("heading", { name: /telegram/i })).toBeVisible({ timeout: 15000 });
});

test.skip("registers with an invite and enters the signed-in shell", async ({ page }) => {
  await page.route("**/auth/register", async (route) => {
    await route.fulfill({
      json: {
        user: {
          id: "member-1",
          email: "new@example.com",
          role: "member",
          createdAt: "2026-04-08T00:00:00.000Z"
        },
        featureToggles: {
          aiEnabled: true,
          telegramEnabled: true,
          outboundEnabled: true,
          mailboxCreationEnabled: true
        }
      }
    });
  });

  await page.route("**/auth/session", async (route) => {
    await route.fulfill({ status: 401, json: { error: "Not authenticated" } });
  });

  await page.route("**/api/mailboxes", async (route) => route.fulfill({ json: { mailboxes: [] } }));
  await page.route("**/api/keys", async (route) => route.fulfill({ json: { keys: [] } }));
  await page.route("**/api/telegram", async (route) => route.fulfill({ json: { subscription: null } }));

  await page.goto("/");
  await page.getByLabel("Email").first().fill("new@example.com");
  await page.getByLabel("Password").first().fill("password123");
  await page.getByLabel("Invite code").fill("INV-001");
  await page.getByRole("button", { name: /create account/i }).click();
  await expect(page.getByRole("heading", { name: /new@example.com/i })).toBeVisible({ timeout: 15000 });
});

test.skip("creates an API key from settings and shows the success notice", async ({ page }) => {
  let apiKeys: Array<{ id: string; label: string; prefix: string; createdAt: string; lastUsedAt: null; revokedAt: null }> = [];

  await page.route("**/auth/session", async (route) => {
    await route.fulfill({
      json: {
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
      }
    });
  });

  await page.route("**/api/mailboxes", async (route) => route.fulfill({ json: { mailboxes: [] } }));
  await page.route("**/api/telegram", async (route) => route.fulfill({ json: { subscription: null } }));
  await page.route("**/api/keys", async (route, request) => {
    if (request.method() === "POST") {
      apiKeys = [
        {
          id: "key-1",
          label: "CLI key 1",
          prefix: "wk_1234567890",
          createdAt: "2026-04-08T00:00:00.000Z",
          lastUsedAt: null,
          revokedAt: null
        }
      ];
      await route.fulfill({
        json: {
          key: {
            secret: "wk_1234567890abcdef",
            prefix: "wk_1234567890"
          }
        }
      });
      return;
    }

    await route.fulfill({ json: { keys: apiKeys } });
  });

  await page.goto("/");
  await expect(page.getByRole("heading", { name: /member@example.com/i })).toBeVisible({ timeout: 15000 });
  await page.evaluate(() => {
    window.history.pushState({}, "", "/settings");
    window.dispatchEvent(new PopStateEvent("popstate"));
  });
  await expect(page.getByRole("heading", { name: /api keys/i })).toBeVisible({ timeout: 15000 });
  await page.evaluate(() => {
    const button = Array.from(document.querySelectorAll("button")).find((item) =>
      item.textContent?.match(/create api key/i)
    );
    if (!(button instanceof HTMLButtonElement)) {
      throw new Error("Create API key button not found");
    }
    button.click();
  });
  await expect(page.getByText(/api key created/i)).toBeVisible({ timeout: 15000 });
  await expect(page.getByText(/wk_1234567890/i)).toBeVisible({ timeout: 15000 });
});

test.skip("shows admin panels for an authenticated admin", async ({ page }) => {
  await page.route("**/auth/session", async (route) => {
    await route.fulfill({
      json: {
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
      }
    });
  });

  await page.route("**/api/mailboxes", async (route) => route.fulfill({ json: { mailboxes: [] } }));
  await page.route("**/api/keys", async (route) => route.fulfill({ json: { keys: [] } }));
  await page.route("**/api/telegram", async (route) =>
    route.fulfill({ json: { subscription: null } })
  );
  await page.route("**/admin/users", async (route) =>
    route.fulfill({
      json: {
        users: [
          {
            id: "admin-1",
            email: "admin@example.com",
            role: "admin",
            createdAt: "2026-04-08T00:00:00.000Z"
          }
        ]
      }
    })
  );
  await page.route("**/admin/invites", async (route) => route.fulfill({ json: { invites: [] } }));
  await page.route("**/admin/features", async (route) =>
    route.fulfill({
      json: {
        featureToggles: {
          aiEnabled: true,
          telegramEnabled: true,
          outboundEnabled: true,
          mailboxCreationEnabled: true
        }
      }
    })
  );
  await page.route("**/admin/mailboxes", async (route) =>
    route.fulfill({ json: { mailboxes: [{ id: "box-1", address: "ops@example.com", label: "Ops", createdAt: "2026-04-08T00:00:00.000Z" }] } })
  );
  await page.route("**/admin/quotas/**", async (route) =>
    route.fulfill({
      json: {
        quota: {
          userId: "admin-1",
          dailyLimit: 20,
          sendsToday: 0,
          disabled: false,
          updatedAt: "2026-04-08T00:00:00.000Z"
        }
      }
    })
  );

  await page.goto("/");
  await expect(page.getByRole("heading", { name: /admin@example.com/i })).toBeVisible({ timeout: 15000 });
  await page.evaluate(() => {
    window.history.pushState({}, "", "/admin");
    window.dispatchEvent(new PopStateEvent("popstate"));
  });
  await expect(page.getByRole("heading", { name: /invite control/i })).toBeVisible({ timeout: 15000 });
  await expect(page.getByText(/ops@example.com/i)).toBeVisible({ timeout: 15000 });
});
