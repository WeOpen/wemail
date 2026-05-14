import type { FormEvent } from "react";

import type { FeatureToggles, MailboxSummary, QuotaSummary, UserSummary } from "@wemail/shared";

import { FeatureTogglesPanel } from "../features/admin/FeatureTogglesPanel";
import { InvitePanel } from "../features/admin/InvitePanel";
import { MailboxOversightPanel } from "../features/admin/MailboxOversightPanel";
import { QuotaPanel } from "../features/admin/QuotaPanel";
import type { InviteSummary } from "../features/admin/types";
import { Page, PageHeader, PageMain } from "../shared/page-layout";

type UsersGlobalSettingsPageProps = {
  adminUsers: UserSummary[];
  adminInvites: InviteSummary[];
  adminQuota: QuotaSummary | null;
  adminFeatures: FeatureToggles | null;
  adminMailboxes: MailboxSummary[];
  onCreateInvite: () => Promise<void>;
  onDisableInvite: (inviteId: string) => Promise<void>;
  onSelectQuotaUser: (userId: string) => Promise<void>;
  onSubmitQuota: (event: FormEvent<HTMLFormElement>, userId: string) => Promise<void>;
  onToggleFeatures: (nextFeatureToggles: FeatureToggles) => Promise<void>;
};

export function UsersGlobalSettingsPage({
  adminUsers,
  adminInvites,
  adminQuota,
  adminFeatures,
  adminMailboxes,
  onCreateInvite,
  onDisableInvite,
  onSelectQuotaUser,
  onSubmitQuota,
  onToggleFeatures
}: UsersGlobalSettingsPageProps) {
  return (
    <Page as="main" className="workspace-grid users-global-grid">
      <section className="panel workspace-card page-panel users-page-header">
        <PageHeader
          description="集中管理邀请码、系统级配额、全局功能开关和邮箱总览。"
          kicker="用户设置"
          title="全局控制"
        />
      </section>

      <PageMain className="users-global-panels">
        <InvitePanel adminInvites={adminInvites} onCreateInvite={onCreateInvite} onDisableInvite={onDisableInvite} />
        <QuotaPanel
          adminUsers={adminUsers}
          adminQuota={adminQuota}
          onSelectQuotaUser={onSelectQuotaUser}
          onSubmitQuota={onSubmitQuota}
        />
        <FeatureTogglesPanel adminFeatures={adminFeatures} onToggleFeatures={onToggleFeatures} />
        <MailboxOversightPanel adminMailboxes={adminMailboxes} />
      </PageMain>
    </Page>
  );
}
