import { APP_LIMITS, type FeatureToggles } from "@wemail/shared";

import type { AppBindings } from "../../core/bindings";

function parseBoolean(value: string | undefined, fallback: boolean) {
  if (value === undefined) return fallback;
  return value === "true" || value === "1";
}

function parseNumber(value: string | undefined, fallback: number) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export function defaultFeatureToggles(env: AppBindings): FeatureToggles {
  return {
    aiEnabled: parseBoolean(env.ENABLE_AI, true),
    telegramEnabled: parseBoolean(env.ENABLE_TELEGRAM, true),
    outboundEnabled: parseBoolean(env.ENABLE_OUTBOUND, true),
    mailboxCreationEnabled: parseBoolean(env.ENABLE_MAILBOX_CREATION, true)
  };
}

export function getMailboxLimit(env: Pick<AppBindings, "MAILBOX_LIMIT">) {
  return parseNumber(env.MAILBOX_LIMIT, APP_LIMITS.mailboxLimit);
}

export function getOutboundLimit(env: Pick<AppBindings, "OUTBOUND_DAILY_LIMIT">) {
  return parseNumber(env.OUTBOUND_DAILY_LIMIT, APP_LIMITS.outboundDailyLimit);
}
