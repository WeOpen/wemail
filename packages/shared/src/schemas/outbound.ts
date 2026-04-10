import { requireString, toRecordLike } from "../validators";

export function parseOutboundPayload(input: unknown) {
  const payload = toRecordLike(input);
  return {
    mailboxId: requireString(payload.mailboxId, "mailboxId"),
    toAddress: requireString(payload.toAddress, "toAddress"),
    subject: requireString(payload.subject, "subject"),
    bodyText: requireString(payload.bodyText, "bodyText")
  };
}
