import { useCallback, useState } from "react";

import type { ApiKeySummary, SessionSummary, TelegramSubscriptionSummary } from "@wemail/shared";

import type { WemailToastInput } from "../../shared/toast";
import { createApiKeyAction, revokeApiKeyAction, saveTelegramAction } from "./actions";
import { querySettingsData } from "./queries";

type UseSettingsDataOptions = {
  session: SessionSummary | null;
  onToast: (toast: WemailToastInput) => void;
};

export function useSettingsData({ session, onToast }: UseSettingsDataOptions) {
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
      onToast({ message: "API Key 已创建，请在页面中立即复制并保存。", tone: "success" });
      await refreshSettingsData();
      return payload;
    },
    [onToast, refreshSettingsData]
  );

  const revokeApiKey = useCallback(
    async (keyId: string) => {
      await revokeApiKeyAction(keyId);
      onToast({ message: "API Key 已吊销。", tone: "success" });
      await refreshSettingsData();
    },
    [onToast, refreshSettingsData]
  );

  const saveTelegram = useCallback(
    async (payload: { chatId: string; enabled: boolean }) => {
      await saveTelegramAction(payload);
      onToast({ message: "Telegram 设置已保存。", tone: "success" });
      await refreshSettingsData();
    },
    [onToast, refreshSettingsData]
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
