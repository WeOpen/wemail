import type { Hono } from "hono";

import type { AppContext } from "../context";
import { getAppServices, requireUser } from "../context";
import { jsonError } from "../services/audit-service";
import {
  toMessageDetailResponse,
  toMessageListResponse
} from "./dto/mailbox-dto";
import {
  getMessageAttachmentUseCase,
  getMessageDetailUseCase,
  listMailboxMessagesUseCase
} from "../use-cases/message-use-cases";

export function registerMessageRoutes(app: Hono<AppContext>) {
  app.get("/api/messages", async (c) => {
    const user = requireUser(c);
    if (!user) return jsonError("Authentication required", 401);
    const mailboxId = c.req.query("mailboxId");
    if (!mailboxId) return jsonError("mailboxId is required");

    const messages = await listMailboxMessagesUseCase(getAppServices(c), {
      userId: user.id,
      mailboxId
    });
    if (messages instanceof Response) return messages;

    return c.json(toMessageListResponse(messages));
  });

  app.get("/api/messages/:id", async (c) => {
    const user = requireUser(c);
    if (!user) return jsonError("Authentication required", 401);

    const message = await getMessageDetailUseCase(getAppServices(c), {
      userId: user.id,
      messageId: c.req.param("id")
    });
    if (message instanceof Response) return message;

    return c.json(toMessageDetailResponse(message));
  });

  app.get("/api/messages/:messageId/attachments/:attachmentId", async (c) => {
    const user = requireUser(c);
    if (!user) return jsonError("Authentication required", 401);

    const result = await getMessageAttachmentUseCase(getAppServices(c), {
      userId: user.id,
      messageId: c.req.param("messageId"),
      attachmentId: c.req.param("attachmentId")
    });
    if (result instanceof Response) return result;

    const { attachment } = result;
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
