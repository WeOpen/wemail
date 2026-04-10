import type { FormEvent } from "react";

type AuthFormsProps = {
  authError: string | null;
  onRegister: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  onLogin: (event: FormEvent<HTMLFormElement>) => Promise<void>;
};

export function AuthForms({ authError, onRegister, onLogin }: AuthFormsProps) {
  return (
    <>
      {authError ? <p className="error-banner">{authError}</p> : null}
      <div className="auth-grid">
        <form className="panel auth-card" onSubmit={onRegister}>
          <p className="panel-kicker">Create account</p>
          <h2>Redeem an invite</h2>
          <label>Email<input name="email" type="email" required /></label>
          <label>Password<input name="password" type="password" minLength={8} required /></label>
          <label>Invite code<input name="inviteCode" required /></label>
          <button type="submit">Create account</button>
        </form>
        <form className="panel auth-card" onSubmit={onLogin}>
          <p className="panel-kicker">Sign in</p>
          <h2>Return to your inboxes</h2>
          <label>Email<input name="email" type="email" required /></label>
          <label>Password<input name="password" type="password" minLength={8} required /></label>
          <button type="submit">Log in</button>
        </form>
      </div>
    </>
  );
}
