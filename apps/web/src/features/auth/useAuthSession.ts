import { FormEvent, useCallback, useState } from "react";

import type { SessionSummary } from "@wemail/shared";

import {
  loginWithPasswordAction,
  logoutSessionAction,
  registerWithInviteAction
} from "./actions";
import { queryCurrentSession } from "./queries";

type UseAuthSessionOptions = {
  onSignedIn: (session: SessionSummary) => void;
  onSignedOut: () => void;
  onNotice: (message: string | null) => void;
};

export function useAuthSession({ onSignedIn, onSignedOut, onNotice }: UseAuthSessionOptions) {
  const [authError, setAuthError] = useState<string | null>(null);
  const [loadingSession, setLoadingSession] = useState(true);

  const refreshSession = useCallback(async () => {
    setLoadingSession(true);
    try {
      const nextSession = await queryCurrentSession();
      onSignedIn(nextSession);
      setAuthError(null);
    } catch {
      onSignedOut();
    } finally {
      setLoadingSession(false);
    }
  }, [onSignedIn, onSignedOut]);

  const handleRegister = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const form = new FormData(event.currentTarget);
      try {
        const nextSession = await registerWithInviteAction({
          email: form.get("email"),
          password: form.get("password"),
          inviteCode: form.get("inviteCode")
        });
        onSignedIn(nextSession);
        onNotice("Account created. Welcome to your private mail control tower.");
        setAuthError(null);
      } catch (error) {
        setAuthError((error as Error).message);
      }
    },
    [onNotice, onSignedIn]
  );

  const handleLogin = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const form = new FormData(event.currentTarget);
      try {
        const nextSession = await loginWithPasswordAction({
          email: form.get("email"),
          password: form.get("password")
        });
        onSignedIn(nextSession);
        onNotice("Signed in.");
        setAuthError(null);
      } catch (error) {
        setAuthError((error as Error).message);
      }
    },
    [onNotice, onSignedIn]
  );

  const handleLogout = useCallback(async () => {
    await logoutSessionAction();
    onSignedOut();
    onNotice("Signed out.");
  }, [onNotice, onSignedOut]);

  return {
    authError,
    loadingSession,
    refreshSession,
    handleRegister,
    handleLogin,
    handleLogout
  };
}
