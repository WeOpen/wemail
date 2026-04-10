import { describe, expect, it } from "vitest";

import { createWorkerTestHarness, registerUserAndGetCookie } from "../helpers/test-env";

describe("worker admin integration", () => {
  it("allows an admin session to create and list invites", async () => {
    const { app, env, cookie } = await registerUserAndGetCookie({
      email: "admin@example.com",
      inviteCode: "INVITE-ADMIN-1"
    });

    const createResponse = await app.request(
      "/admin/invites",
      {
        method: "POST",
        headers: { cookie }
      },
      env
    );

    expect(createResponse.status).toBe(201);

    const listResponse = await app.request(
      "/admin/invites",
      {
        headers: { cookie }
      },
      env
    );

    const payload = (await listResponse.json()) as {
      invites: Array<{ code: string; status: string }>;
    };

    expect(payload.invites.length).toBeGreaterThan(0);
    expect(payload.invites[0].code).toContain("INVITE-");
  });

  it("rejects admin routes without an admin session", async () => {
    const { app, env } = createWorkerTestHarness();
    const response = await app.request("/admin/users", {}, env);
    expect(response.status).toBe(403);
  });
});
