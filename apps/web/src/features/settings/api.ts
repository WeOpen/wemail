import type { ApiKeySummary, TelegramSubscriptionSummary } from "@wemail/shared";

import { apiFetch } from "../../shared/api/client";

export function fetchApiKeys() {
  return apiFetch<{ keys: ApiKeySummary[] }>("/api/keys");
}

export function createApiKey(label: string) {
  return apiFetch<{ key: { secret: string; prefix: string } }>("/api/keys", {
    method: "POST",
    body: JSON.stringify({ label })
  });
}

export function revokeApiKey(keyId: string) {
  return apiFetch(`/api/keys/${keyId}`, { method: "DELETE" });
}

export function fetchTelegramSubscription() {
  return apiFetch<{ subscription: TelegramSubscriptionSummary | null }>("/api/telegram");
}

export function saveTelegramSubscription(payload: { chatId: string; enabled: boolean }) {
  return apiFetch("/api/telegram", {
    method: "PUT",
    body: JSON.stringify(payload)
  });
}
