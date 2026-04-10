import { parseOutboundPayload } from "@wemail/shared";

export async function parseOutboundSendRequest(request: Request) {
  return parseOutboundPayload(await request.json());
}
