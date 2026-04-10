import { requireString, toRecordLike } from "../validators";

export function parseRegisterPayload(input: unknown) {
  const payload = toRecordLike(input);
  return {
    email: requireString(payload.email, "email"),
    password: requireString(payload.password, "password"),
    inviteCode: requireString(payload.inviteCode, "inviteCode")
  };
}

export function parseLoginPayload(input: unknown) {
  const payload = toRecordLike(input);
  return {
    email: requireString(payload.email, "email"),
    password: requireString(payload.password, "password")
  };
}
