import type { SessionSummary } from "@wemail/shared";

type SessionUserDto = {
  id: string;
  email: string;
  role: "admin" | "member";
  createdAt: string;
};

export function toSessionResponse(
  user: SessionUserDto,
  featureToggles: SessionSummary["featureToggles"]
): SessionSummary {
  return {
    user,
    featureToggles
  };
}
