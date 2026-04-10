import type { FormEvent } from "react";

import type { QuotaSummary, UserSummary } from "@wemail/shared";

type QuotaPanelProps = {
  adminUsers: UserSummary[];
  adminQuota: QuotaSummary | null;
  onSelectQuotaUser: (userId: string) => Promise<void>;
  onSubmitQuota: (event: FormEvent<HTMLFormElement>, userId: string) => Promise<void>;
};

export function QuotaPanel({
  adminUsers,
  adminQuota,
  onSelectQuotaUser,
  onSubmitQuota
}: QuotaPanelProps) {
  return (
    <section className="panel">
      <p className="panel-kicker">Users & quotas</p>
      <h2>Operator controls</h2>
      <div className="stack-list">
        {adminUsers.map((user) => (
          <button key={user.id} className="stack-item selectable" onClick={() => void onSelectQuotaUser(user.id)}>
            <strong>{user.email}</strong>
            <span>{user.role}</span>
          </button>
        ))}
      </div>
      {adminQuota ? (
        <form className="composer-form" onSubmit={(event) => void onSubmitQuota(event, adminQuota.userId)}>
          <label>Daily limit<input name="dailyLimit" type="number" defaultValue={adminQuota.dailyLimit} /></label>
          <label className="checkbox-row">
            <input name="disabled" type="checkbox" defaultChecked={adminQuota.disabled} />
            Disable outbound
          </label>
          <button type="submit">Update quota</button>
        </form>
      ) : null}
    </section>
  );
}
