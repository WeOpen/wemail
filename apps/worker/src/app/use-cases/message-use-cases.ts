import type { AttachmentRecord, AppStore, PersistedMessageRecord } from "../../core/bindings";
import { toMessageJson } from "../../shared/mail";
import { jsonError } from "../services/audit-service";
import { getOwnedMailbox } from "../services/mailbox-access-service";

type MessageUseCaseContext = {
  store: AppStore;
};

async function getOwnedMessage(context: MessageUseCaseContext, userId: string, messageId: string) {
  const message = await context.store.messages.findById(messageId);
  if (!message) return null;

  const mailbox = await context.store.mailboxes.findById(message.mailboxId);
  if (!mailbox || mailbox.userId !== userId) return null;

  return { mailbox, message };
}

async function buildMessageSummary(
  context: MessageUseCaseContext,
  message: PersistedMessageRecord
) {
  return toMessageJson(message, await context.store.attachments.listByMessage(message.id));
}

export async function listMailboxMessagesUseCase(
  context: MessageUseCaseContext,
  payload: { userId: string; mailboxId: string }
) {
  const mailbox = await getOwnedMailbox(context.store, payload.userId, payload.mailboxId);
  if (!mailbox) return jsonError("Mailbox not found", 404);

  const messages = await context.store.messages.listByMailbox(mailbox.id);
  return Promise.all(messages.map((message) => buildMessageSummary(context, message)));
}

export async function getMessageDetailUseCase(
  context: MessageUseCaseContext,
  payload: { userId: string; messageId: string }
) {
  const owned = await getOwnedMessage(context, payload.userId, payload.messageId);
  if (!owned) return jsonError("Message not found", 404);

  return buildMessageSummary(context, owned.message);
}

export async function getMessageAttachmentUseCase(
  context: MessageUseCaseContext,
  payload: { userId: string; messageId: string; attachmentId: string }
) {
  const owned = await getOwnedMessage(context, payload.userId, payload.messageId);
  if (!owned) return jsonError("Message not found", 404);

  const attachment = (await context.store.attachments.listByMessage(owned.message.id)).find(
    (entry) => entry.id === payload.attachmentId
  );
  if (!attachment) return jsonError("Attachment not found", 404);

  return { message: owned.message, attachment } satisfies {
    message: PersistedMessageRecord;
    attachment: AttachmentRecord;
  };
}
