import type { InviteSummary } from "./types";

export function formatInviteStatus(invite: InviteSummary) {
  if (invite.status) return invite.status;
  if (invite.redeemedAt) return "Redeemed";
  if (invite.disabledAt) return "Disabled";
  return "Ready";
}
