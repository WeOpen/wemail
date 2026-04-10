import type { FeatureToggles, MailboxSummary, QuotaSummary, UserSummary } from "@wemail/shared";

import { apiFetch } from "../../shared/api/client";
import type { InviteSummary } from "./types";

export function fetchAdminUsers() {
  return apiFetch<{ users: UserSummary[] }>("/admin/users");
}

export function fetchAdminInvites() {
  return apiFetch<{ invites: InviteSummary[] }>("/admin/invites");
}

export function fetchAdminFeatures() {
  return apiFetch<{ featureToggles: FeatureToggles }>("/admin/features");
}

export function fetchAdminMailboxes() {
  return apiFetch<{ mailboxes: MailboxSummary[] }>("/admin/mailboxes");
}

export function fetchAdminQuota(userId: string) {
  return apiFetch<{ quota: QuotaSummary }>(`/admin/quotas/${userId}`);
}

export function createInvite() {
  return apiFetch("/admin/invites", { method: "POST" });
}

export function disableInvite(inviteId: string) {
  return apiFetch(`/admin/invites/${inviteId}`, { method: "DELETE" });
}

export function updateQuota(userId: string, payload: { dailyLimit: number; disabled: boolean }) {
  return apiFetch(`/admin/quotas/${userId}`, {
    method: "PATCH",
    body: JSON.stringify(payload)
  });
}

export function updateAdminFeatures(nextFeatureToggles: FeatureToggles) {
  return apiFetch("/admin/features", {
    method: "PATCH",
    body: JSON.stringify(nextFeatureToggles)
  });
}
