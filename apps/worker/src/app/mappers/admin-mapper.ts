export function toInviteStatus(invite: { redeemedAt: string | null; disabledAt: string | null }) {
  if (invite.redeemedAt) return "redeemed";
  if (invite.disabledAt) return "disabled";
  return "ready";
}
