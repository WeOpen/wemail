import type { Hono } from "hono";

import type { AppContext } from "../context";
import { getAppServices, requireUser } from "../context";
import { jsonError } from "../services/audit-service";
import {
  toMailboxCreateResponse,
  toMailboxListResponse
} from "./dto/mailbox-dto";
import { parseMailboxCreateRequest } from "./requests/mailbox-request";
import {
  createUserMailbox,
  deleteUserMailbox,
  listUserMailboxes
} from "../use-cases/mailbox-use-cases";

export function registerMailboxRoutes(app: Hono<AppContext>) {
  app.get("/api/mailboxes", async (c) => {
    const user = requireUser(c);
    if (!user) return jsonError("Authentication required", 401);
    return c.json(toMailboxListResponse(await listUserMailboxes(getAppServices(c), user.id)));
  });

  app.post("/api/mailboxes", async (c) => {
    const user = requireUser(c);
    if (!user) return jsonError("Authentication required", 401);
    const { label: safeLabel } = await parseMailboxCreateRequest(c.req.raw);
    const mailbox = await createUserMailbox(getAppServices(c), { userId: user.id, label: safeLabel });
    if (mailbox instanceof Response) return mailbox;
    return c.json(toMailboxCreateResponse(mailbox), 201);
  });

  app.delete("/api/mailboxes/:id", async (c) => {
    const user = requireUser(c);
    if (!user) return jsonError("Authentication required", 401);
    const result = await deleteUserMailbox(getAppServices(c), { userId: user.id, mailboxId: c.req.param("id") });
    if (result instanceof Response) return result;
    return c.json(result);
  });
}
