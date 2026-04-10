import type { FeatureToggles, MailboxSummary, QuotaSummary, UserSummary } from "@wemail/shared";

import {
  fetchAdminFeatures,
  fetchAdminInvites,
  fetchAdminMailboxes,
  fetchAdminQuota,
  fetchAdminUsers
} from "./api";
import { selectInitialQuotaUserId } from "./selectors";
import type { InviteSummary } from "./types";

export async function queryAdminDashboard() {
  const [usersPayload, invitesPayload, featuresPayload, mailboxesPayload] = await Promise.all([
    fetchAdminUsers(),
    fetchAdminInvites(),
    fetchAdminFeatures(),
    fetchAdminMailboxes()
  ]);

  const initialQuotaUserId = selectInitialQuotaUserId(usersPayload.users);
  const quotaPayload = initialQuotaUserId ? await fetchAdminQuota(initialQuotaUserId) : null;

  return {
    users: usersPayload.users as UserSummary[],
    invites: invitesPayload.invites as InviteSummary[],
    features: featuresPayload.featureToggles as FeatureToggles,
    mailboxes: mailboxesPayload.mailboxes as MailboxSummary[],
    quota: (quotaPayload?.quota ?? null) as QuotaSummary | null
  };
}

export async function queryQuota(userId: string) {
  const payload = await fetchAdminQuota(userId);
  return payload.quota as QuotaSummary;
}
