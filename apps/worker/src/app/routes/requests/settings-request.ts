import { parseTelegramPayload } from "@wemail/shared";

export async function parseTelegramUpdateRequest(request: Request) {
  return parseTelegramPayload(await request.json());
}

export async function parseApiKeyCreateRequest(request: Request) {
  const payload = (await request.json().catch(() => ({ label: "Default key" }))) as { label?: string };
  return {
    label: String(payload.label ?? "Default key")
  };
}
