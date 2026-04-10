import type { AppBindings, AppStore } from "../../core/bindings";
import { recordAudit } from "../services/audit-service";
import { getOutboundLimit } from "../services/config-service";

type AdminUseCaseContext = {
  store: AppStore;
  env: AppBindings;
};

export async function listAdminUsers(context: AdminUseCaseContext) {
  return context.store.users.list();
}

export async function listAdminInvites(context: AdminUseCaseContext) {
  return context.store.invites.list();
}

export async function listAdminMailboxes(context: AdminUseCaseContext) {
  return context.store.mailboxes.listAll();
}

export async function createInviteUseCase(context: AdminUseCaseContext, actorUserId: string) {
  const code = `INVITE-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
  const invite = await context.store.invites.create({ code, createdByUserId: actorUserId });
  await recordAudit(context.store, "user", actorUserId, "invite-create", { code });
  return invite;
}

export async function disableInviteUseCase(
  context: AdminUseCaseContext,
  payload: { actorUserId: string; inviteId: string }
) {
  await context.store.invites.disable(payload.inviteId);
  await recordAudit(context.store, "user", payload.actorUserId, "invite-disable", {
    inviteId: payload.inviteId
  });
  return { ok: true };
}

export async function getQuotaUseCase(context: AdminUseCaseContext, userId: string) {
  return context.store.quotas.getByUserId(userId, getOutboundLimit(context.env));
}

export async function updateQuotaUseCase(
  context: AdminUseCaseContext,
  payload: { actorUserId: string; userId: string; dailyLimit: number; disabled: boolean }
) {
  const existing = await context.store.quotas.getByUserId(payload.userId, getOutboundLimit(context.env));
  existing.dailyLimit = payload.dailyLimit;
  existing.disabled = payload.disabled;
  existing.updatedAt = new Date().toISOString();
  await context.store.quotas.save(existing);
  await recordAudit(context.store, "user", payload.actorUserId, "quota-update", { userId: existing.userId });
  return existing;
}
