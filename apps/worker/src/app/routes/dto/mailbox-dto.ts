import type { MailboxSummary, MessageSummary } from "@wemail/shared";

type MailboxRecordLike = {
  id: string;
  address: string;
  label: string;
  createdAt: string;
};

type MessageRecordLike = MessageSummary;

export function toMailboxSummary(record: MailboxRecordLike): MailboxSummary {
  return {
    id: record.id,
    address: record.address,
    label: record.label,
    createdAt: record.createdAt
  };
}

export function toMailboxListResponse(records: MailboxRecordLike[]) {
  return {
    mailboxes: records.map(toMailboxSummary)
  };
}

export function toMailboxCreateResponse(record: MailboxRecordLike) {
  return {
    mailbox: toMailboxSummary(record)
  };
}

export function toMessageListResponse(messages: MessageRecordLike[]) {
  return { messages };
}

export function toMessageDetailResponse(message: MessageRecordLike) {
  return { message };
}
