import type { AppBindings, AppStore } from "../../core/bindings";
import { getOutboundLimit } from "./config-service";

export async function refreshQuota(store: AppStore, env: AppBindings, userId: string) {
  const quota = await store.quotas.getByUserId(userId, getOutboundLimit(env));
  const today = new Date().toISOString().slice(0, 10);
  if (quota.updatedAt.slice(0, 10) !== today) {
    quota.sendsToday = 0;
    quota.updatedAt = new Date().toISOString();
    await store.quotas.save(quota);
  }
  return quota;
}
