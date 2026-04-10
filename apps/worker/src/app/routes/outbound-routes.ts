import type { Hono } from "hono";
import type { QuotaSummary } from "@wemail/shared";

import type { AppContext } from "../context";
import { getAppServices, requireUser } from "../context";
import { jsonError } from "../services/audit-service";
import { toOutboundListResponse, toQuotaResponse } from "./dto/outbound-dto";
import { parseOutboundSendRequest } from "./requests/outbound-request";
import {
  listOutboundMessages,
  sendOutboundMessageUseCase
} from "../use-cases/outbound-use-cases";

export function registerOutboundRoutes(app: Hono<AppContext>) {
  app.get("/api/outbound", async (c) => {
    const user = requireUser(c);
    if (!user) return jsonError("Authentication required", 401);
    const mailboxId = c.req.query("mailboxId");
    if (!mailboxId) return jsonError("mailboxId is required");
    const messages = await listOutboundMessages(getAppServices(c), { userId: user.id, mailboxId });
    if (messages instanceof Response) return messages;
    return c.json(toOutboundListResponse(messages));
  });

  app.post("/api/outbound/send", async (c) => {
    const user = requireUser(c);
    if (!user) return jsonError("Authentication required", 401);
    if (!c.get("featureToggles").outboundEnabled) return jsonError("Outbound sending disabled", 403);
    const { mailboxId, toAddress, subject, bodyText } = await parseOutboundSendRequest(c.req.raw);

    const quota = await sendOutboundMessageUseCase(getAppServices(c), {
      userId: user.id,
      mailboxId,
      toAddress,
      subject,
      bodyText
    });
    if (quota instanceof Response) return quota;
    return c.json(
      toQuotaResponse(quota satisfies Pick<QuotaSummary, "dailyLimit" | "sendsToday" | "disabled">)
    );
  });
}
