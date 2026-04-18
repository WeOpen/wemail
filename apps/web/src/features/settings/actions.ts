import { createApiKey, revokeApiKey, saveTelegramSubscription } from "./api";

export async function createApiKeyAction(label: string) {
  return createApiKey(label);
}

export async function revokeApiKeyAction(keyId: string) {
  return revokeApiKey(keyId);
}

export async function saveTelegramAction(payload: { chatId: string; enabled: boolean }) {
  return saveTelegramSubscription(payload);
}
