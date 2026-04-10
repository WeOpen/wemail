import type { UserSummary } from "@wemail/shared";

export function selectInitialQuotaUserId(users: UserSummary[]) {
  return users[0]?.id ?? null;
}
