CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS invites (
  id TEXT PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  created_by_user_id TEXT,
  redeemed_by_user_id TEXT,
  redeemed_at TEXT,
  disabled_at TEXT,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS mailboxes (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  address TEXT NOT NULL UNIQUE,
  label TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS messages (
  id TEXT PRIMARY KEY,
  mailbox_id TEXT NOT NULL,
  from_address TEXT NOT NULL,
  subject TEXT NOT NULL,
  preview_text TEXT NOT NULL,
  body_text TEXT NOT NULL,
  extraction_json TEXT NOT NULL,
  oversize_status TEXT,
  attachment_count INTEGER NOT NULL,
  received_at TEXT NOT NULL,
  expires_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS attachments (
  id TEXT PRIMARY KEY,
  message_id TEXT NOT NULL,
  filename TEXT NOT NULL,
  content_type TEXT NOT NULL,
  size INTEGER NOT NULL,
  storage_key TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS outbound_messages (
  id TEXT PRIMARY KEY,
  mailbox_id TEXT NOT NULL,
  to_address TEXT NOT NULL,
  subject TEXT NOT NULL,
  status TEXT NOT NULL,
  error_text TEXT,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS api_keys (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  label TEXT NOT NULL,
  prefix TEXT NOT NULL,
  key_hash TEXT NOT NULL,
  created_at TEXT NOT NULL,
  last_used_at TEXT,
  revoked_at TEXT
);

CREATE TABLE IF NOT EXISTS telegram_subscriptions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL UNIQUE,
  chat_id TEXT NOT NULL,
  enabled INTEGER NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS send_quotas (
  user_id TEXT PRIMARY KEY,
  daily_limit INTEGER NOT NULL,
  sends_today INTEGER NOT NULL,
  disabled INTEGER NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS audit_events (
  id TEXT PRIMARY KEY,
  actor_type TEXT NOT NULL,
  actor_id TEXT NOT NULL,
  event_type TEXT NOT NULL,
  payload_json TEXT NOT NULL,
  created_at TEXT NOT NULL
);
