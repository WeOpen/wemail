import { useMemo } from "react";
import { BrowserRouter } from "react-router-dom";

import { AppLayout } from "./AppLayout";
import { AppRoutes } from "./AppRoutes";
import { AuthPage } from "../pages/AuthPage";
import { useAppShell } from "./useAppShell";

function AppShell() {
  const { session, notice, auth, inbox, settings, admin } = useAppShell();

  const selectedMessage = useMemo(
    () => inbox.selectedMessage,
    [inbox.selectedMessage]
  );

  if (auth.loadingSession) {
    return (
      <div className="shell">
        <div className="panel shimmer">Loading wemail…</div>
      </div>
    );
  }

  if (!session) {
    return (
      <AuthPage
        authError={auth.authError}
        onRegister={auth.handleRegister}
        onLogin={auth.handleLogin}
      />
    );
  }

  return (
    <BrowserRouter>
      <AppLayout session={session} notice={notice} onLogout={() => void auth.handleLogout()}>
        <AppRoutes
          session={session}
          inbox={inbox}
          selectedMessage={selectedMessage}
          settings={settings}
          admin={admin}
        />
      </AppLayout>
    </BrowserRouter>
  );
}

export function App() {
  return <AppShell />;
}
