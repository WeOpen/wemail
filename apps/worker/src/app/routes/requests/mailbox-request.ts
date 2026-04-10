import { parseMailboxCreatePayload } from "@wemail/shared";

export async function parseMailboxCreateRequest(request: Request) {
  return parseMailboxCreatePayload(await request.json().catch(() => ({ label: "Temporary inbox" })));
}
