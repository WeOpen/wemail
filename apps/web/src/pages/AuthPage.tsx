import type { FormEvent } from "react";

import { AuthForms } from "../features/auth/AuthForms";

type AuthPageProps = {
  authError: string | null;
  onRegister: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  onLogin: (event: FormEvent<HTMLFormElement>) => Promise<void>;
};

export function AuthPage({ authError, onRegister, onLogin }: AuthPageProps) {
  return (
    <div className="shell hero-shell">
      <section className="hero">
        <p className="eyebrow">PRIVATE INFRASTRUCTURE • PUBLIC INVITE GATE</p>
        <h1>Self-hosted temporary email with a control-room aesthetic.</h1>
        <p className="hero-copy">
          wemail gives you a self-hosted temporary email surface on Cloudflare: invite-only accounts, owned inboxes,
          attachments, AI-assisted code extraction, Telegram notifications, and programmable API keys.
        </p>
        <div className="hero-badges">
          <span>Cloudflare-first</span>
          <span>Invite-only</span>
          <span>AI extraction fallback</span>
          <span>Telegram-ready</span>
        </div>
        <AuthForms authError={authError} onRegister={onRegister} onLogin={onLogin} />
      </section>
    </div>
  );
}
