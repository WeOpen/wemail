import { describe, expect, it } from "vitest";

import { createApp } from "../src/app/create-app";
import { createInMemoryStore } from "../src/infrastructure/persistence/in-memory";

const env = {
  APP_NAME: "wemail",
  COOKIE_NAME: "wemail_session",
  DEFAULT_MAIL_DOMAIN: "example.com",
  MAILBOX_LIMIT: "5",
  MESSAGE_RETENTION_DAYS: "7",
  OUTBOUND_DAILY_LIMIT: "20",
  AI_FALLBACK_LIMIT: "20",
  MAX_ATTACHMENT_BYTES: "10485760",
  MAX_TOTAL_ATTACHMENT_BYTES: "15728640",
  ENABLE_AI: "true",
  ENABLE_TELEGRAM: "true",
  ENABLE_OUTBOUND: "true",
  ENABLE_MAILBOX_CREATION: "true",
  ADMIN_EMAILS: "admin@example.com",
  COOKIE_SECURE: "false"
} as const;

describe("worker app", () => {
  it("requires a valid invite for registration and sets a session cookie", async () => {
    const store = createInMemoryStore();
    const app = createApp({ store });

    const invite = await store.invites.create({
      code: "INVITE-1",
      createdByUserId: "system"
    });

    const response = await app.request(
      "/auth/register",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email: "admin@example.com",
          password: "password123",
          inviteCode: invite.code
        })
      },
      env
    );

    expect(response.status).toBe(201);
    expect(response.headers.get("set-cookie")).toContain("wemail_session=");
  });

  it("marks session cookies as secure when COOKIE_SECURE is enabled", async () => {
    const store = createInMemoryStore();
    const app = createApp({ store });

    const invite = await store.invites.create({
      code: "INVITE-SECURE",
      createdByUserId: "system"
    });

    const response = await app.request(
      "/auth/register",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email: "secure@example.com",
          password: "password123",
          inviteCode: invite.code
        })
      },
      {
        ...env,
        COOKIE_SECURE: "true"
      }
    );

    expect(response.headers.get("set-cookie")).toContain("Secure");
  });

  it("prevents anonymous mailbox creation", async () => {
    const app = createApp({ store: createInMemoryStore() });

    const response = await app.request(
      "/api/mailboxes",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ label: "temp" })
      },
      env
    );

    expect(response.status).toBe(401);
  });

  it("allows a signed-in user to create a mailbox and lists it back", async () => {
    const store = createInMemoryStore();
    const app = createApp({ store });

    const invite = await store.invites.create({
      code: "INVITE-2",
      createdByUserId: "system"
    });

    const registerResponse = await app.request(
      "/auth/register",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email: "member@example.com",
          password: "password123",
          inviteCode: invite.code
        })
      },
      env
    );

    const cookie = registerResponse.headers.get("set-cookie") ?? "";

    const createResponse = await app.request(
      "/api/mailboxes",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          cookie
        },
        body: JSON.stringify({ label: "Primary inbox" })
      },
      env
    );

    expect(createResponse.status).toBe(201);

    const listResponse = await app.request(
      "/api/mailboxes",
      {
        headers: { cookie }
      },
      env
    );

    const payload = (await listResponse.json()) as { mailboxes: Array<{ address: string }> };
    expect(payload.mailboxes).toHaveLength(1);
    expect(payload.mailboxes[0].address).toContain("@example.com");
  });
});
