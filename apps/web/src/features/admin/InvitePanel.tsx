import { formatInviteStatus } from "./formatters";
import type { InviteSummary } from "./types";

type InvitePanelProps = {
  adminInvites: InviteSummary[];
  onCreateInvite: () => Promise<void>;
  onDisableInvite: (inviteId: string) => Promise<void>;
};

export function InvitePanel({ adminInvites, onCreateInvite, onDisableInvite }: InvitePanelProps) {
  return (
    <section className="panel">
      <p className="panel-kicker">Invites</p>
      <h2>Invite control</h2>
      <button onClick={() => void onCreateInvite()}>Create invite</button>
      <div className="stack-list">
        {adminInvites.map((invite) => (
          <div key={invite.id} className="stack-item">
            <strong>{invite.code}</strong>
            <span>{formatInviteStatus(invite)}</span>
            <button onClick={() => void onDisableInvite(invite.id)}>Disable</button>
          </div>
        ))}
      </div>
    </section>
  );
}
