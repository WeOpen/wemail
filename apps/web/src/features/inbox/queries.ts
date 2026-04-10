import type { MailboxSummary, MessageSummary } from "@wemail/shared";

import { fetchMailboxes, fetchMessages, fetchOutboundHistory } from "./api";
import type { OutboundHistoryItem } from "./types";

export async function queryMailboxes() {
  const payload = await fetchMailboxes();
  return payload.mailboxes;
}

export async function queryMessages(mailboxId: string) {
  const payload = await fetchMessages(mailboxId);
  return payload.messages as MessageSummary[];
}

export async function queryOutboundHistory(mailboxId: string) {
  const payload = await fetchOutboundHistory(mailboxId);
  return payload.messages as OutboundHistoryItem[];
}

export function pickNextMailboxId(
  mailboxes: MailboxSummary[],
  preferredMailboxId?: string | null
) {
  return preferredMailboxId ?? mailboxes[0]?.id ?? null;
}
