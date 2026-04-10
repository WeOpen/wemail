export type InviteStatus = "ready" | "redeemed" | "disabled";

export type InviteSummary = {
  id: string;
  code: string;
  createdAt: string;
  redeemedAt: string | null;
  disabledAt: string | null;
  status?: InviteStatus;
};
