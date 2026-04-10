import type { FormEvent } from "react";

type OutboundHistoryItem = {
  id: string;
  toAddress: string;
  subject: string;
  status: string;
  errorText: string | null;
  createdAt: string;
};

type OutboundPanelProps = {
  selectedMailboxId: string | null;
  outboundHistory: OutboundHistoryItem[];
  onSendMail: (event: FormEvent<HTMLFormElement>) => Promise<void>;
};

export function OutboundPanel({
  selectedMailboxId,
  outboundHistory,
  onSendMail
}: OutboundPanelProps) {
  return (
    <section className="panel composer-panel">
      <div className="panel-header">
        <div>
          <p className="panel-kicker">Outbound</p>
          <h2>Send a message</h2>
        </div>
      </div>
      <form className="composer-form" onSubmit={onSendMail}>
        <label>To<input name="toAddress" type="email" required /></label>
        <label>Subject<input name="subject" required /></label>
        <label>Body<textarea name="bodyText" rows={6} required /></label>
        <button type="submit" disabled={!selectedMailboxId}>
          Send
        </button>
      </form>
      <div className="history-list">
        {outboundHistory.map((item) => (
          <div key={item.id} className="history-item">
            <strong>{item.subject}</strong>
            <span>{item.toAddress}</span>
            <small>{item.status}</small>
          </div>
        ))}
      </div>
    </section>
  );
}
