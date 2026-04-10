import { requireString, toRecordLike } from "../validators";

export function parseMailboxCreatePayload(input: unknown) {
  const payload = toRecordLike(input);
  return {
    label: requireString(payload.label ?? "Temporary inbox", "label")
  };
}
