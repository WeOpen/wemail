import type { AppBindings } from "../../core/bindings";

export function sanitizeLocalPart(input: string) {
  return input.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 24);
}

export function buildMailboxAddress(env: Pick<AppBindings, "DEFAULT_MAIL_DOMAIN">, label: string) {
  const local = sanitizeLocalPart(label) || "box";
  return `${local}-${crypto.randomUUID().slice(0, 8)}@${env.DEFAULT_MAIL_DOMAIN}`;
}
