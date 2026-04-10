import { parseQuotaPayload } from "@wemail/shared";

export async function parseQuotaUpdateRequest(
  request: Request,
  fallback: { dailyLimit: number; disabled: boolean }
) {
  return parseQuotaPayload(await request.json(), fallback);
}
