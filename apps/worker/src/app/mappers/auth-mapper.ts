import type { SessionSummary } from "@wemail/shared";

import type { AppContext } from "../context";

export function toSessionSummary(
  user: { id: string; email: string; role: "admin" | "member"; createdAt: string },
  c: Pick<AppContext["Variables"], "featureToggles">
): SessionSummary {
  return {
    user,
    featureToggles: c.featureToggles
  };
}
