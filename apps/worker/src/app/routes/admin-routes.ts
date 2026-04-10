import type { Hono } from "hono";

import type { AppContext } from "../context";
import { getAppServices, requireSessionAuth, requireUser } from "../context";
import { jsonError } from "../services/audit-service";
import { toInviteListItem } from "./dto/admin-dto";
import { parseQuotaUpdateRequest } from "./requests/admin-request";
import {
  createInviteUseCase,
  disableInviteUseCase,
  getQuotaUseCase,
  listAdminInvites,
  listAdminMailboxes,
  listAdminUsers,
  updateQuotaUseCase
} from "../use-cases/admin-use-cases";

export function registerAdminRoutes(app: Hono<AppContext>) {
  app.use("/admin/*", async (c, next) => {
    const user = requireUser(c);
    if (!user || user.role !== "admin" || !requireSessionAuth(c)) {
      return jsonError("Admin session required", 403);
    }
    return next();
  });

  app.get("/admin/users", async (c) =>
    c.json({ users: await listAdminUsers(getAppServices(c)) })
  );
  app.get("/admin/invites", async (c) =>
    c.json({
      invites: (await listAdminInvites(getAppServices(c))).map(toInviteListItem)
    })
  );
  app.get("/admin/mailboxes", async (c) =>
    c.json({ mailboxes: await listAdminMailboxes(getAppServices(c)) })
  );

  app.post("/admin/invites", async (c) => {
    const user = requireUser(c)!;
    const invite = await createInviteUseCase(getAppServices(c), user.id);
    return c.json({ invite }, 201);
  });

  app.delete("/admin/invites/:id", async (c) => {
    const user = requireUser(c)!;
    return c.json(
      await disableInviteUseCase(getAppServices(c), { actorUserId: user.id, inviteId: c.req.param("id") })
    );
  });

  app.get("/admin/quotas/:userId", async (c) =>
    c.json({ quota: await getQuotaUseCase(getAppServices(c), c.req.param("userId")) })
  );

  app.patch("/admin/quotas/:userId", async (c) => {
    const existing = await getQuotaUseCase(getAppServices(c), c.req.param("userId"));
    const payload = await parseQuotaUpdateRequest(c.req.raw, {
      dailyLimit: existing.dailyLimit,
      disabled: existing.disabled
    });
    return c.json({
      quota: await updateQuotaUseCase(
        getAppServices(c),
        {
          actorUserId: requireUser(c)!.id,
          userId: existing.userId,
          dailyLimit: payload.dailyLimit,
          disabled: payload.disabled
        }
      )
    });
  });
}
