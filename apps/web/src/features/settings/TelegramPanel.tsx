import type { FormEvent } from "react";

import type { TelegramSubscriptionSummary } from "@wemail/shared";

type TelegramPanelProps = {
  telegram: TelegramSubscriptionSummary | null;
  onSaveTelegram: (event: FormEvent<HTMLFormElement>) => Promise<void>;
};

export function TelegramPanel({ telegram, onSaveTelegram }: TelegramPanelProps) {
  return (
    <section className="panel">
      <p className="panel-kicker">Notifications</p>
      <h2>Telegram</h2>
      <form className="composer-form" onSubmit={onSaveTelegram}>
        <label>Chat ID<input name="chatId" defaultValue={telegram?.chatId ?? ""} /></label>
        <label className="checkbox-row">
          <input name="enabled" type="checkbox" defaultChecked={telegram?.enabled ?? false} />
          Enable notifications
        </label>
        <button type="submit">Save Telegram settings</button>
      </form>
    </section>
  );
}
