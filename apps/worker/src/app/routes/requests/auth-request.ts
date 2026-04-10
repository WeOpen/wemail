import { parseLoginPayload, parseRegisterPayload } from "@wemail/shared";

export async function parseRegisterRequest(request: Request) {
  return parseRegisterPayload(await request.json());
}

export async function parseLoginRequest(request: Request) {
  return parseLoginPayload(await request.json());
}
