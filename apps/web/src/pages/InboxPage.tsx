import type { FormEvent } from "react";

import type { MailboxSummary, MessageSummary } from "@wemail/shared";

import { MailboxPanel } from "../features/inbox/MailboxPanel";
import { MessageDetailPanel } from "../features/inbox/MessageDetailPanel";
import { MessageStreamPanel } from "../features/inbox/MessageStreamPanel";
import { OutboundPanel } from "../features/inbox/OutboundPanel";

type OutboundHistoryItem = {
  id: string;
  toAddress: string;
  subject: string;
  status: string;
  errorText: string | null;
  createdAt: string;
};

type InboxPageProps = {
  mailboxes: MailboxSummary[];
  selectedMailboxId: string | null;
  messages: MessageSummary[];
  selectedMessageId: string | null;
  selectedMessage: MessageSummary | null;
  outboundHistory: OutboundHistoryItem[];
  onSelectMailbox: (mailboxId: string) => void;
  onSelectMessage: (messageId: string) => void;
  onRefreshMessages: () => void;
  onRequestCreateMailbox: () => void;
  onSendMail: (event: FormEvent<HTMLFormElement>) => Promise<void>;
};

export function InboxPage({
  mailboxes,
  selectedMailboxId,
  messages,
  selectedMessageId,
  selectedMessage,
  outboundHistory,
  onSelectMailbox,
  onSelectMessage,
  onRefreshMessages,
  onRequestCreateMailbox,
  onSendMail
}: InboxPageProps) {
  return (
    <main className="dashboard-grid">
      <MailboxPanel
        mailboxes={mailboxes}
        selectedMailboxId={selectedMailboxId}
        onSelectMailbox={onSelectMailbox}
        onRequestCreateMailbox={onRequestCreateMailbox}
      />
      <MessageStreamPanel
        messages={messages}
        selectedMessageId={selectedMessageId}
        onSelectMessage={onSelectMessage}
        onRefreshMessages={onRefreshMessages}
      />
      <MessageDetailPanel selectedMessage={selectedMessage} />
      <OutboundPanel
        selectedMailboxId={selectedMailboxId}
        outboundHistory={outboundHistory}
        onSendMail={onSendMail}
      />
    </main>
  );
}
