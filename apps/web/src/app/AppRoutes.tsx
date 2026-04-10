import type { FormEvent } from "react";
import { Route, Routes } from "react-router-dom";

import type {
  ApiKeySummary,
  FeatureToggles,
  MailboxSummary,
  MessageSummary,
  QuotaSummary,
  SessionSummary,
  TelegramSubscriptionSummary,
  UserSummary
} from "@wemail/shared";

import type { InviteSummary } from "../features/admin/types";
import type { OutboundHistoryItem } from "../features/inbox/types";
import { AdminPage } from "../pages/AdminPage";
import { InboxPage } from "../pages/InboxPage";
import { SettingsPage } from "../pages/SettingsPage";

type AppRoutesProps = {
  session: SessionSummary;
  inbox: {
    mailboxes: MailboxSummary[];
    selectedMailboxId: string | null;
    messages: MessageSummary[];
    selectedMessageId: string | null;
    outboundHistory: OutboundHistoryItem[];
    setSelectedMailboxId: (mailboxId: string) => void;
    setSelectedMessageId: (messageId: string) => void;
    refreshMessages: (mailboxId?: string | null) => Promise<void>;
    createMailbox: (label: string) => Promise<void>;
    sendMail: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  };
  selectedMessage: MessageSummary | null;
  settings: {
    apiKeys: ApiKeySummary[];
    telegram: TelegramSubscriptionSummary | null;
    createApiKey: (label: string) => Promise<void>;
    revokeApiKey: (keyId: string) => Promise<void>;
    saveTelegram: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  };
  admin: {
    adminUsers: UserSummary[];
    adminInvites: InviteSummary[];
    adminQuota: QuotaSummary | null;
    adminFeatures: FeatureToggles | null;
    adminMailboxes: MailboxSummary[];
    createInvite: () => Promise<void>;
    disableInvite: (inviteId: string) => Promise<void>;
    selectQuotaUser: (userId: string) => Promise<void>;
    submitQuota: (event: FormEvent<HTMLFormElement>, userId: string) => Promise<void>;
    toggleFeatures: (nextFeatureToggles: FeatureToggles) => Promise<void>;
  };
};

export function AppRoutes({ session, inbox, selectedMessage, settings, admin }: AppRoutesProps) {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <InboxPage
            mailboxes={inbox.mailboxes}
            selectedMailboxId={inbox.selectedMailboxId}
            messages={inbox.messages}
            selectedMessageId={inbox.selectedMessageId}
            selectedMessage={selectedMessage}
            outboundHistory={inbox.outboundHistory}
            onSelectMailbox={inbox.setSelectedMailboxId}
            onSelectMessage={inbox.setSelectedMessageId}
            onRefreshMessages={() => void inbox.refreshMessages()}
            onRequestCreateMailbox={() => {
              const label = prompt("Mailbox label", `Mailbox ${inbox.mailboxes.length + 1}`);
              if (label) void inbox.createMailbox(label);
            }}
            onSendMail={inbox.sendMail}
          />
        }
      />
      <Route
        path="/settings"
        element={
          <SettingsPage
            apiKeys={settings.apiKeys}
            telegram={settings.telegram}
            onCreateApiKey={settings.createApiKey}
            onRevokeApiKey={settings.revokeApiKey}
            onSaveTelegram={settings.saveTelegram}
          />
        }
      />
      <Route
        path="/admin"
        element={
          session.user.role !== "admin" ? (
            <main className="panel">
              <p>Admin access only.</p>
            </main>
          ) : (
            <AdminPage
              adminUsers={admin.adminUsers}
              adminInvites={admin.adminInvites}
              adminQuota={admin.adminQuota}
              adminFeatures={admin.adminFeatures}
              adminMailboxes={admin.adminMailboxes}
              onCreateInvite={admin.createInvite}
              onDisableInvite={admin.disableInvite}
              onSelectQuotaUser={admin.selectQuotaUser}
              onSubmitQuota={admin.submitQuota}
              onToggleFeatures={admin.toggleFeatures}
            />
          )
        }
      />
    </Routes>
  );
}
