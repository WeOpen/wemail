import type { ApiKeySummary, TelegramSubscriptionSummary } from "@wemail/shared";

import { fetchApiKeys, fetchTelegramSubscription } from "./api";

export async function querySettingsData() {
  const [keyPayload, telegramPayload] = await Promise.all([
    fetchApiKeys(),
    fetchTelegramSubscription()
  ]);

  return {
    apiKeys: keyPayload.keys as ApiKeySummary[],
    telegram: telegramPayload.subscription as TelegramSubscriptionSummary | null
  };
}
