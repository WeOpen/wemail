import type { Hono } from "hono";

import { toMessageJson } from "../../shared/mail";
import type { AppContext } from "../context";
import { requireUser } from "../context";
import { jsonError } from "../services/audit-service";
import { getOwnedMailbox } from "../services/mailbox-access-service";
import {
  toMessageDetailResponse,
  toMessageListResponse
} from "./dto/mailbox-dto";

export function registerMessageRoutes(app: Hono<AppContext>) {
  app.get("/api/messages", async (c) => {
    const user = requireUser(c);
    if (!user) return jsonError("Authentication required", 401);
    const mailboxId = c.req.query("mailboxId");
    if (!mailboxId) return jsonError("mailboxId is required");
    const mailbox = await getOwnedMailbox(c.get("store"), user.id, mailboxId);
    if (!mailbox) return jsonError("Mailbox not found", 404);
    const messages = await c.get("store").messages.listByMailbox(mailbox.id);
    return c.json(
      toMessageListResponse(
        await Promise.all(
          messages.map(async (message) =>
            toMessageJson(message, await c.get("store").attachments.listByMessage(message.id))
          )
        )
      )
    );
  });

  app.get("/api/messages/:id", async (c) => {
    const user = requireUser(c);
    if (!user) return jsonError("Authentication required", 401);
    const message = await c.get("store").messages.findById(c.req.param("id"));
    if (!message) return jsonError("Message not found", 404);
    const mailbox = await c.get("store").mailboxes.findById(message.mailboxId);
    if (!mailbox || mailbox.userId !== user.id) return jsonError("Message not found", 404);
    return c.json(
      toMessageDetailResponse(
        toMessageJson(message, await c.get("store").attachments.listByMessage(message.id))
      )
    );
  });

  app.get("/api/messages/:messageId/attachments/:attachmentId", async (c) => {
    const user = requireUser(c);
    if (!user) return jsonError("Authentication required", 401);
    const message = await c.get("store").messages.findById(c.req.param("messageId"));
    if (!message) return jsonError("Message not found", 404);
    const mailbox = await c.get("store").mailboxes.findById(message.mailboxId);
    if (!mailbox || mailbox.userId !== user.id) return jsonError("Message not found", 404);
    const attachment = (await c.get("store").attachments.listByMessage(message.id)).find(
      (entry) => entry.id === c.req.param("attachmentId")
    );
    if (!attachment) return jsonError("Attachment not found", 404);
    if (!c.env.ATTACHMENTS) return c.json({ attachment });
    const object = await c.env.ATTACHMENTS.get(attachment.key);
    if (!object) return jsonError("Attachment missing", 404);
    return new Response(object.body, {
      headers: {
        "content-type": attachment.contentType,
        "content-disposition": `attachment; filename="${attachment.filename}"`
      }
    });
  });
}
