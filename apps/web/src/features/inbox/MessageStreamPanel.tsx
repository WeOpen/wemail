import type { MessageSummary } from "@wemail/shared";

import { toMessageListItemViewModel } from "./view-models";

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
    <section className="panel workspace-card inbox-panel">
      <div className="panel-header workspace-card-header">
        <div>
          <p className="panel-kicker">消息流</p>
          <h2>消息列表</h2>
        </div>
        <button className="workspace-action-button ghost" onClick={onRefreshMessages} type="button">
          刷新
        </button>
      </div>
      <div className="message-list workspace-stack-list">
        {messages.map((message) => {
          const viewModel = toMessageListItemViewModel(message);

          return (
            <button
              key={message.id}
              className={message.id === selectedMessageId ? "message-item active" : "message-item"}
              onClick={() => onSelectMessage(message.id)}
              type="button"
            >
              <div className="message-item-top">
                <span className={`message-extraction-chip ${viewModel.extractionChip.tone}`}>{viewModel.extractionChip.primary}</span>
                <small>{viewModel.receivedAtLabel}</small>
              </div>
              <strong>{viewModel.fromAddress}</strong>
              <span>{viewModel.subject}</span>
              <div className="message-item-meta">
                <small>{viewModel.extractionChip.secondary}</small>
                {viewModel.attachmentCount > 0 ? <small>附件 {viewModel.attachmentCount}</small> : null}
              </div>
            </button>
          );
        })}
        {messages.length === 0 ? <p className="empty-state">当前消息流为空，新邮件到达后会显示在这里。</p> : null}
      </div>
    </section>
  );
}
