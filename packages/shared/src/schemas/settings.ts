import { requireBoolean, requireString, toRecordLike } from "../validators";

export function parseTelegramPayload(input: unknown) {
  const payload = toRecordLike(input);
  return {
    chatId: requireString(payload.chatId, "chatId"),
    enabled: requireBoolean(payload.enabled)
  };
}
