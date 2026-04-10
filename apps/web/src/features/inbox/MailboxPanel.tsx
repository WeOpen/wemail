import type { MailboxSummary } from "@wemail/shared";

type MailboxPanelProps = {
  mailboxes: MailboxSummary[];
  selectedMailboxId: string | null;
  onSelectMailbox: (mailboxId: string) => void;
  onRequestCreateMailbox: () => void;
};

export function MailboxPanel({
  mailboxes,
  selectedMailboxId,
  onSelectMailbox,
  onRequestCreateMailbox
}: MailboxPanelProps) {
  return (
    <section className="panel mailbox-panel">
      <div className="panel-header">
        <div>
          <p className="panel-kicker">Mailbox fleet</p>
          <h2>Your inboxes</h2>
        </div>
        <button onClick={onRequestCreateMailbox}>New mailbox</button>
      </div>
      <div className="mailbox-list">
        {mailboxes.map((mailbox) => (
          <button
            key={mailbox.id}
            className={mailbox.id === selectedMailboxId ? "mailbox-item active" : "mailbox-item"}
            onClick={() => onSelectMailbox(mailbox.id)}
          >
            <strong>{mailbox.label}</strong>
            <span>{mailbox.address}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
