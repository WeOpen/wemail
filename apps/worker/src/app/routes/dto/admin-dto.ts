type InviteLike = {
  id: string;
  code: string;
  createdAt: string;
  redeemedAt: string | null;
  disabledAt: string | null;
};

export function toInviteListItem(invite: InviteLike) {
  return {
    ...invite,
    status: invite.redeemedAt ? "redeemed" : invite.disabledAt ? "disabled" : "ready"
  };
}
