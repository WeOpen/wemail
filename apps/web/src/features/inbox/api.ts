import type { MailboxSummary, MessageSummary } from "@wemail/shared";

import { apiFetch } from "../../shared/api/client";
import type { OutboundHistoryItem } from "./types";

export function fetchMailboxes() {
  return apiFetch<{ mailboxes: MailboxSummary[] }>("/api/mailboxes");
}

export function createMailbox(label: string) {
  return apiFetch<{ mailbox: MailboxSummary }>("/api/mailboxes", {
    method: "POST",
    body: JSON.stringify({ label })
  });
}

export function fetchMessages(mailboxId: string) {
  return apiFetch<{ messages: MessageSummary[] }>(`/api/messages?mailboxId=${mailboxId}`);
}

export function fetchOutboundHistory(mailboxId: string) {
  return apiFetch<{ messages: OutboundHistoryItem[] }>(`/api/outbound?mailboxId=${mailboxId}`);
}

export function sendOutboundMessage(payload: {
  mailboxId: string;
  toAddress: FormDataEntryValue | null;
  subject: FormDataEntryValue | null;
  bodyText: FormDataEntryValue | null;
}) {
  return apiFetch("/api/outbound/send", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}
