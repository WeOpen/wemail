import type { MailboxSummary } from "@wemail/shared";

type MailboxOversightPanelProps = {
  adminMailboxes: MailboxSummary[];
};

export function MailboxOversightPanel({ adminMailboxes }: MailboxOversightPanelProps) {
  return (
    <section className="panel">
      <p className="panel-kicker">Mailbox oversight</p>
      <h2>Mailbox oversight</h2>
      <div className="stack-list">
        {adminMailboxes.map((mailbox) => (
          <div key={mailbox.id} className="stack-item">
            <strong>{mailbox.label}</strong>
            <span>{mailbox.address}</span>
          </div>
        ))}
        {adminMailboxes.length === 0 ? <p className="empty-state">No mailboxes created yet.</p> : null}
      </div>
    </section>
  );
}
