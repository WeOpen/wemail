import type { AppStore, AttachmentRecord, QuotaRecord } from "../../core/bindings";

function nowIso() {
  return new Date().toISOString();
}

function toBool(value: unknown) {
  return value === 1 || value === "1" || value === true;
}

function parseJson<T>(value: string | null | undefined, fallback: T) {
  if (!value) return fallback;
  return JSON.parse(value) as T;
}

export function createD1Store(db: D1Database): AppStore {
  return {
    users: {
      async count() {
        const result = await db.prepare("SELECT count(*) AS count FROM users").first<{ count: number }>();
        return result?.count ?? 0;
      },
      async findByEmail(email) {
        const row = await db.prepare("SELECT * FROM users WHERE email = ?").bind(email).first<any>();
        return row
          ? { id: row.id, email: row.email, passwordHash: row.password_hash, role: row.role, createdAt: row.created_at }
          : null;
      },
      async findById(id) {
        const row = await db.prepare("SELECT * FROM users WHERE id = ?").bind(id).first<any>();
        return row
          ? { id: row.id, email: row.email, passwordHash: row.password_hash, role: row.role, createdAt: row.created_at }
          : null;
      },
      async create(input) {
        const id = crypto.randomUUID();
        const createdAt = nowIso();
        await db
          .prepare("INSERT INTO users (id, email, password_hash, role, created_at) VALUES (?, ?, ?, ?, ?)")
          .bind(id, input.email, input.passwordHash, input.role, createdAt)
          .run();
        return { id, email: input.email, passwordHash: input.passwordHash, role: input.role, createdAt };
      },
      async list() {
        const result = await db.prepare("SELECT * FROM users ORDER BY email ASC").all();
        return (result.results ?? []).map((row: any) => ({
          id: row.id,
          email: row.email,
          passwordHash: row.password_hash,
          role: row.role,
          createdAt: row.created_at
        }));
      }
    },
    sessions: {
      async create(input) {
        const id = `${crypto.randomUUID()}-${Math.random().toString(36).slice(2, 10)}`;
        const createdAt = nowIso();
        await db
          .prepare("INSERT INTO sessions (id, user_id, expires_at, created_at) VALUES (?, ?, ?, ?)")
          .bind(id, input.userId, input.expiresAt, createdAt)
          .run();
        return { id, userId: input.userId, expiresAt: input.expiresAt, createdAt };
      },
      async findById(id) {
        const row = await db.prepare("SELECT * FROM sessions WHERE id = ?").bind(id).first<any>();
        return row ? { id: row.id, userId: row.user_id, expiresAt: row.expires_at, createdAt: row.created_at } : null;
      },
      async delete(id) {
        await db.prepare("DELETE FROM sessions WHERE id = ?").bind(id).run();
      }
    },
    invites: {
      async create(input) {
        const id = crypto.randomUUID();
        const createdAt = nowIso();
        await db
          .prepare(
            "INSERT INTO invites (id, code, created_by_user_id, redeemed_by_user_id, redeemed_at, disabled_at, created_at) VALUES (?, ?, ?, NULL, NULL, NULL, ?)"
          )
          .bind(id, input.code, input.createdByUserId, createdAt)
          .run();
        return {
          id,
          code: input.code,
          createdByUserId: input.createdByUserId,
          redeemedByUserId: null,
          redeemedAt: null,
          disabledAt: null,
          createdAt
        };
      },
      async findByCode(code) {
        const row = await db.prepare("SELECT * FROM invites WHERE code = ?").bind(code).first<any>();
        return row
          ? {
              id: row.id,
              code: row.code,
              createdByUserId: row.created_by_user_id,
              redeemedByUserId: row.redeemed_by_user_id,
              redeemedAt: row.redeemed_at,
              disabledAt: row.disabled_at,
              createdAt: row.created_at
            }
          : null;
      },
      async redeem(code, userId) {
        const redeemedAt = nowIso();
        await db
          .prepare("UPDATE invites SET redeemed_by_user_id = ?, redeemed_at = ? WHERE code = ?")
          .bind(userId, redeemedAt, code)
          .run();
        return (await this.findByCode(code))!;
      },
      async list() {
        const result = await db.prepare("SELECT * FROM invites ORDER BY created_at DESC").all();
        return (result.results ?? []).map((row: any) => ({
          id: row.id,
          code: row.code,
          createdByUserId: row.created_by_user_id,
          redeemedByUserId: row.redeemed_by_user_id,
          redeemedAt: row.redeemed_at,
          disabledAt: row.disabled_at,
          createdAt: row.created_at
        }));
      },
      async disable(id) {
        await db.prepare("UPDATE invites SET disabled_at = ? WHERE id = ?").bind(nowIso(), id).run();
      }
    },
    mailboxes: {
      async countByUser(userId) {
        const result = await db
          .prepare("SELECT count(*) AS count FROM mailboxes WHERE user_id = ?")
          .bind(userId)
          .first<{ count: number }>();
        return result?.count ?? 0;
      },
      async create(input) {
        const id = crypto.randomUUID();
        const createdAt = nowIso();
        await db
          .prepare("INSERT INTO mailboxes (id, user_id, address, label, created_at) VALUES (?, ?, ?, ?, ?)")
          .bind(id, input.userId, input.address, input.label, createdAt)
          .run();
        return { id, userId: input.userId, address: input.address, label: input.label, createdAt };
      },
      async listByUser(userId) {
        const result = await db.prepare("SELECT * FROM mailboxes WHERE user_id = ? ORDER BY created_at DESC").bind(userId).all();
        return (result.results ?? []).map((row: any) => ({
          id: row.id,
          userId: row.user_id,
          address: row.address,
          label: row.label,
          createdAt: row.created_at
        }));
      },
      async listAll() {
        const result = await db.prepare("SELECT * FROM mailboxes ORDER BY created_at DESC").all();
        return (result.results ?? []).map((row: any) => ({
          id: row.id,
          userId: row.user_id,
          address: row.address,
          label: row.label,
          createdAt: row.created_at
        }));
      },
      async findById(id) {
        const row = await db.prepare("SELECT * FROM mailboxes WHERE id = ?").bind(id).first<any>();
        return row
          ? { id: row.id, userId: row.user_id, address: row.address, label: row.label, createdAt: row.created_at }
          : null;
      },
      async findByAddress(address) {
        const row = await db.prepare("SELECT * FROM mailboxes WHERE address = ?").bind(address).first<any>();
        return row
          ? { id: row.id, userId: row.user_id, address: row.address, label: row.label, createdAt: row.created_at }
          : null;
      },
      async delete(id) {
        await db.prepare("DELETE FROM mailboxes WHERE id = ?").bind(id).run();
      }
    },
    messages: {
      async create(input) {
        const id = crypto.randomUUID();
        await db
          .prepare(
            "INSERT INTO messages (id, mailbox_id, from_address, subject, preview_text, body_text, extraction_json, oversize_status, attachment_count, received_at, expires_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
          )
          .bind(
            id,
            input.mailboxId,
            input.fromAddress,
            input.subject,
            input.previewText,
            input.bodyText,
            input.extractionJson,
            input.oversizeStatus,
            input.attachmentCount,
            input.receivedAt,
            input.expiresAt
          )
          .run();
        return { id, ...input };
      },
      async listByMailbox(mailboxId) {
        const result = await db
          .prepare("SELECT * FROM messages WHERE mailbox_id = ? ORDER BY received_at DESC")
          .bind(mailboxId)
          .all();
        return (result.results ?? []).map((row: any) => ({
          id: row.id,
          mailboxId: row.mailbox_id,
          fromAddress: row.from_address,
          subject: row.subject,
          previewText: row.preview_text,
          bodyText: row.body_text,
          extractionJson: row.extraction_json,
          oversizeStatus: row.oversize_status,
          attachmentCount: Number(row.attachment_count),
          receivedAt: row.received_at,
          expiresAt: row.expires_at
        }));
      },
      async findById(id) {
        const row = await db.prepare("SELECT * FROM messages WHERE id = ?").bind(id).first<any>();
        return row
          ? {
              id: row.id,
              mailboxId: row.mailbox_id,
              fromAddress: row.from_address,
              subject: row.subject,
              previewText: row.preview_text,
              bodyText: row.body_text,
              extractionJson: row.extraction_json,
              oversizeStatus: row.oversize_status,
              attachmentCount: Number(row.attachment_count),
              receivedAt: row.received_at,
              expiresAt: row.expires_at
            }
          : null;
      },
      async listExpired(beforeIso) {
        const result = await db.prepare("SELECT * FROM messages WHERE expires_at <= ?").bind(beforeIso).all();
        return (result.results ?? []).map((row: any) => ({
          id: row.id,
          mailboxId: row.mailbox_id,
          fromAddress: row.from_address,
          subject: row.subject,
          previewText: row.preview_text,
          bodyText: row.body_text,
          extractionJson: row.extraction_json,
          oversizeStatus: row.oversize_status,
          attachmentCount: Number(row.attachment_count),
          receivedAt: row.received_at,
          expiresAt: row.expires_at
        }));
      },
      async deleteMany(ids) {
        if (ids.length === 0) return;
        const placeholders = ids.map(() => "?").join(", ");
        await db.prepare(`DELETE FROM messages WHERE id IN (${placeholders})`).bind(...ids).run();
      }
    },
    attachments: {
      async createMany(messageId, nextAttachments) {
        for (const attachment of nextAttachments) {
          await db
            .prepare(
              "INSERT INTO attachments (id, message_id, filename, content_type, size, storage_key, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)"
            )
            .bind(
              attachment.id,
              messageId,
              attachment.filename,
              attachment.contentType,
              attachment.size,
              attachment.key,
              nowIso()
            )
            .run();
        }
      },
      async listByMessage(messageId) {
        const result = await db
          .prepare("SELECT id, filename, content_type, size, storage_key FROM attachments WHERE message_id = ?")
          .bind(messageId)
          .all();
        return (result.results ?? []).map((row: any) => ({
          id: row.id,
          filename: row.filename,
          contentType: row.content_type,
          size: Number(row.size),
          key: row.storage_key
        })) as AttachmentRecord[];
      },
      async listByMessageIds(messageIds) {
        if (messageIds.length === 0) return [];
        const placeholders = messageIds.map(() => "?").join(", ");
        const result = await db
          .prepare(`SELECT id, filename, content_type, size, storage_key FROM attachments WHERE message_id IN (${placeholders})`)
          .bind(...messageIds)
          .all();
        return (result.results ?? []).map((row: any) => ({
          id: row.id,
          filename: row.filename,
          contentType: row.content_type,
          size: Number(row.size),
          key: row.storage_key
        })) as AttachmentRecord[];
      },
      async deleteByMessageIds(messageIds) {
        if (messageIds.length === 0) return;
        const placeholders = messageIds.map(() => "?").join(", ");
        await db.prepare(`DELETE FROM attachments WHERE message_id IN (${placeholders})`).bind(...messageIds).run();
      }
    },
    outboundMessages: {
      async create(input) {
        await db
          .prepare(
            "INSERT INTO outbound_messages (id, mailbox_id, to_address, subject, status, error_text, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)"
          )
          .bind(
            crypto.randomUUID(),
            input.mailboxId,
            input.toAddress,
            input.subject,
            input.status,
            input.errorText,
            nowIso()
          )
          .run();
      },
      async listByMailbox(mailboxId) {
        const result = await db
          .prepare("SELECT * FROM outbound_messages WHERE mailbox_id = ? ORDER BY created_at DESC")
          .bind(mailboxId)
          .all();
        return (result.results ?? []).map((row: any) => ({
          id: row.id,
          mailboxId: row.mailbox_id,
          toAddress: row.to_address,
          subject: row.subject,
          status: row.status,
          errorText: row.error_text,
          createdAt: row.created_at
        }));
      }
    },
    apiKeys: {
      async create(input) {
        const record = {
          id: crypto.randomUUID(),
          userId: input.userId,
          label: input.label,
          prefix: input.prefix,
          keyHash: input.keyHash,
          createdAt: nowIso(),
          lastUsedAt: null,
          revokedAt: null
        };
        await db
          .prepare(
            "INSERT INTO api_keys (id, user_id, label, prefix, key_hash, created_at, last_used_at, revoked_at) VALUES (?, ?, ?, ?, ?, ?, NULL, NULL)"
          )
          .bind(record.id, record.userId, record.label, record.prefix, record.keyHash, record.createdAt)
          .run();
        return record;
      },
      async listByUser(userId) {
        const result = await db.prepare("SELECT * FROM api_keys WHERE user_id = ? ORDER BY created_at DESC").bind(userId).all();
        return (result.results ?? []).map((row: any) => ({
          id: row.id,
          userId: row.user_id,
          label: row.label,
          prefix: row.prefix,
          keyHash: row.key_hash,
          createdAt: row.created_at,
          lastUsedAt: row.last_used_at,
          revokedAt: row.revoked_at
        }));
      },
      async findActiveByHash(hash) {
        const row = await db
          .prepare("SELECT * FROM api_keys WHERE key_hash = ? AND revoked_at IS NULL")
          .bind(hash)
          .first<any>();
        return row
          ? {
              id: row.id,
              userId: row.user_id,
              label: row.label,
              prefix: row.prefix,
              keyHash: row.key_hash,
              createdAt: row.created_at,
              lastUsedAt: row.last_used_at,
              revokedAt: row.revoked_at
            }
          : null;
      },
      async touch(id) {
        await db.prepare("UPDATE api_keys SET last_used_at = ? WHERE id = ?").bind(nowIso(), id).run();
      },
      async revoke(id, userId) {
        await db.prepare("UPDATE api_keys SET revoked_at = ? WHERE id = ? AND user_id = ?").bind(nowIso(), id, userId).run();
      }
    },
    telegram: {
      async upsert(input) {
        const existing = await db
          .prepare("SELECT * FROM telegram_subscriptions WHERE user_id = ?")
          .bind(input.userId)
          .first<any>();
        const createdAt = existing?.created_at ?? nowIso();
        const id = existing?.id ?? crypto.randomUUID();
        const updatedAt = nowIso();
        await db
          .prepare(
            "INSERT OR REPLACE INTO telegram_subscriptions (id, user_id, chat_id, enabled, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)"
          )
          .bind(id, input.userId, input.chatId, input.enabled ? 1 : 0, createdAt, updatedAt)
          .run();
        return { id, userId: input.userId, chatId: input.chatId, enabled: input.enabled, createdAt, updatedAt };
      },
      async findByUserId(userId) {
        const row = await db
          .prepare("SELECT * FROM telegram_subscriptions WHERE user_id = ?")
          .bind(userId)
          .first<any>();
        return row
          ? {
              id: row.id,
              userId: row.user_id,
              chatId: row.chat_id,
              enabled: toBool(row.enabled),
              createdAt: row.created_at,
              updatedAt: row.updated_at
            }
          : null;
      }
    },
    quotas: {
      async getByUserId(userId, fallbackLimit) {
        const row = await db.prepare("SELECT * FROM send_quotas WHERE user_id = ?").bind(userId).first<any>();
        if (!row) {
          const next: QuotaRecord = {
            userId,
            dailyLimit: fallbackLimit,
            sendsToday: 0,
            disabled: false,
            updatedAt: nowIso()
          };
          await db
            .prepare("INSERT INTO send_quotas (user_id, daily_limit, sends_today, disabled, updated_at) VALUES (?, ?, ?, ?, ?)")
            .bind(userId, next.dailyLimit, next.sendsToday, 0, next.updatedAt)
            .run();
          return next;
        }
        return {
          userId: row.user_id,
          dailyLimit: Number(row.daily_limit),
          sendsToday: Number(row.sends_today),
          disabled: toBool(row.disabled),
          updatedAt: row.updated_at
        };
      },
      async save(quota) {
        await db
          .prepare(
            "INSERT OR REPLACE INTO send_quotas (user_id, daily_limit, sends_today, disabled, updated_at) VALUES (?, ?, ?, ?, ?)"
          )
          .bind(quota.userId, quota.dailyLimit, quota.sendsToday, quota.disabled ? 1 : 0, quota.updatedAt)
          .run();
      }
    },
    settings: {
      async getFeatureToggles(defaults) {
        const result = await db
          .prepare("SELECT key, value FROM settings WHERE key IN (?, ?, ?, ?)")
          .bind("aiEnabled", "telegramEnabled", "outboundEnabled", "mailboxCreationEnabled")
          .all();
        const map = new Map((result.results ?? []).map((row: any) => [row.key, parseJson<boolean>(row.value, false)]));
        return {
          aiEnabled: map.get("aiEnabled") ?? defaults.aiEnabled,
          telegramEnabled: map.get("telegramEnabled") ?? defaults.telegramEnabled,
          outboundEnabled: map.get("outboundEnabled") ?? defaults.outboundEnabled,
          mailboxCreationEnabled: map.get("mailboxCreationEnabled") ?? defaults.mailboxCreationEnabled
        };
      },
      async saveFeatureToggles(toggles) {
        for (const [key, value] of Object.entries(toggles)) {
          await db
            .prepare("INSERT OR REPLACE INTO settings (key, value, updated_at) VALUES (?, ?, ?)")
            .bind(key, JSON.stringify(value), nowIso())
            .run();
        }
        return toggles;
      }
    },
    audit: {
      async record(event) {
        await db
          .prepare(
            "INSERT INTO audit_events (id, actor_type, actor_id, event_type, payload_json, created_at) VALUES (?, ?, ?, ?, ?, ?)"
          )
          .bind(crypto.randomUUID(), event.actorType, event.actorId, event.eventType, event.payloadJson, nowIso())
          .run();
      },
      async countByActorSince(actorId, eventType, sinceIso) {
        const result = await db
          .prepare(
            "SELECT count(*) AS count FROM audit_events WHERE actor_id = ? AND event_type = ? AND created_at >= ?"
          )
          .bind(actorId, eventType, sinceIso)
          .first<{ count: number }>();
        return result?.count ?? 0;
      }
    }
  };
}
