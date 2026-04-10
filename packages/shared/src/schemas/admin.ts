import { requireBoolean, requireNumber, toRecordLike } from "../validators";

export function parseQuotaPayload(input: unknown, fallback: { dailyLimit: number; disabled: boolean }) {
  const payload = toRecordLike(input);
  return {
    dailyLimit:
      typeof payload.dailyLimit === "undefined"
        ? fallback.dailyLimit
        : requireNumber(payload.dailyLimit, "dailyLimit"),
    disabled:
      typeof payload.disabled === "undefined"
        ? fallback.disabled
        : requireBoolean(payload.disabled)
  };
}
