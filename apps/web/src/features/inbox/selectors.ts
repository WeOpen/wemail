import type { MessageSummary } from "@wemail/shared";

export function selectMessage(messages: MessageSummary[], selectedMessageId: string | null) {
  return messages.find((message) => message.id === selectedMessageId) ?? null;
}
