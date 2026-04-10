import { FormEvent, useCallback, useState } from "react";

import type { ApiKeySummary, SessionSummary, TelegramSubscriptionSummary } from "@wemail/shared";

import {
  createApiKeyAction,
  revokeApiKeyAction,
  saveTelegramAction
} from "./actions";
import { querySettingsData } from "./queries";

type UseSettingsDataOptions = {
  session: SessionSummary | null;
  onNotice: (message: string | null) => void;
};

export function useSettingsData({ session, onNotice }: UseSettingsDataOptions) {
  const [apiKeys, setApiKeys] = useState<ApiKeySummary[]>([]);
  const [telegram, setTelegram] = useState<TelegramSubscriptionSummary | null>(null);

  const refreshSettingsData = useCallback(async () => {
    if (!session) return;
    const data = await querySettingsData();
    setApiKeys(data.apiKeys);
    setTelegram(data.telegram);
  }, [session]);

  const createApiKey = useCallback(
    async (label: string) => {
      const payload = await createApiKeyAction(label);
      onNotice(`API key created. Copy it now: ${payload.key.secret}`);
      await refreshSettingsData();
    },
    [onNotice, refreshSettingsData]
  );

  const revokeApiKey = useCallback(
    async (keyId: string) => {
      await revokeApiKeyAction(keyId);
      onNotice("API key revoked.");
      await refreshSettingsData();
    },
    [onNotice, refreshSettingsData]
  );

  const saveTelegram = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const form = new FormData(event.currentTarget);
      await saveTelegramAction({
        chatId: form.get("chatId"),
        enabled: form.get("enabled") === "on"
      });
      onNotice("Telegram settings saved.");
      await refreshSettingsData();
    },
    [onNotice, refreshSettingsData]
  );

  return {
    apiKeys,
    telegram,
    refreshSettingsData,
    createApiKey,
    revokeApiKey,
    saveTelegram
  };
}
