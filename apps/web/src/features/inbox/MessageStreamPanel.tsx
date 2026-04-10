import type { MessageSummary } from "@wemail/shared";

type MessageStreamPanelProps = {
  messages: MessageSummary[];
  selectedMessageId: string | null;
  onSelectMessage: (messageId: string) => void;
  onRefreshMessages: () => void;
};

export function MessageStreamPanel({
  messages,
  selectedMessageId,
  onSelectMessage,
  onRefreshMessages
}: MessageStreamPanelProps) {
  return (
    <section className="panel inbox-panel">
      <div className="panel-header">
        <div>
          <p className="panel-kicker">Received mail</p>
          <h2>Message stream</h2>
        </div>
        <button onClick={onRefreshMessages}>Refresh</button>
      </div>
      <div className="message-list">
        {messages.map((message) => (
          <button
            key={message.id}
            className={message.id === selectedMessageId ? "message-item active" : "message-item"}
            onClick={() => onSelectMessage(message.id)}
          >
            <span>{message.subject}</span>
            <small>{message.previewText}</small>
          </button>
        ))}
      </div>
    </section>
  );
}
