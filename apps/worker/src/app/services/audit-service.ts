import type { AppStore } from "../../core/bindings";

export function jsonError(message: string, status = 400) {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { "content-type": "application/json" }
  });
}

export async function recordAudit(
  store: AppStore,
  actorType: string,
  actorId: string,
  eventType: string,
  payload: unknown
) {
  await store.audit.record({
    actorType,
    actorId,
    eventType,
    payloadJson: JSON.stringify(payload)
  });
}
