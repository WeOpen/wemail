import { createMailbox as createMailboxRequest, sendOutboundMessage } from "./api";

export async function createMailboxAction(label: string) {
  return createMailboxRequest(label);
}

export async function sendOutboundAction(payload: {
  mailboxId: string;
  toAddress: FormDataEntryValue | null;
  subject: FormDataEntryValue | null;
  bodyText: FormDataEntryValue | null;
}) {
  return sendOutboundMessage(payload);
}
