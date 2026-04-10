import type { MessageSummary } from "@wemail/shared";

import { formatAttachmentSize, formatReceivedAt } from "./formatters";

export function toMessageDetailViewModel(message: MessageSummary | null) {
  if (!message) return null;
  return {
    ...message,
    receivedAtLabel: formatReceivedAt(message.receivedAt),
    attachments: message.attachments.map((attachment) => ({
      ...attachment,
      sizeLabel: formatAttachmentSize(attachment.size)
    }))
  };
}
