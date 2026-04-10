import type { AppStore } from "../../core/bindings";

export async function getOwnedMailbox(store: AppStore, userId: string, mailboxId: string) {
  const mailbox = await store.mailboxes.findById(mailboxId);
  if (!mailbox || mailbox.userId !== userId) return null;
  return mailbox;
}
