import type { FeatureToggles } from "@wemail/shared";

import { createInvite, disableInvite, updateAdminFeatures, updateQuota } from "./api";

export async function createInviteAction() {
  return createInvite();
}

export async function disableInviteAction(inviteId: string) {
  return disableInvite(inviteId);
}

export async function updateQuotaAction(userId: string, payload: { dailyLimit: number; disabled: boolean }) {
  return updateQuota(userId, payload);
}

export async function updateFeatureTogglesAction(nextFeatureToggles: FeatureToggles) {
  return updateAdminFeatures(nextFeatureToggles);
}
