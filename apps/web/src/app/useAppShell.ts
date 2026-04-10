import { useEffect, useState } from "react";

import type { SessionSummary } from "@wemail/shared";

import { useAdminData } from "../features/admin/useAdminData";
import { useAuthSession } from "../features/auth/useAuthSession";
import { useInboxWorkspace } from "../features/inbox/useInboxWorkspace";
import { useSettingsData } from "../features/settings/useSettingsData";

export function useAppShell() {
  const [session, setSession] = useState<SessionSummary | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const auth = useAuthSession({
    onSignedIn: setSession,
    onSignedOut: () => setSession(null),
    onNotice: setNotice
  });

  const inbox = useInboxWorkspace({
    enabled: Boolean(session),
    onNotice: setNotice
  });

  const settings = useSettingsData({
    session,
    onNotice: setNotice
  });

  const admin = useAdminData({
    session,
    onNotice: setNotice
  });

  useEffect(() => {
    void auth.refreshSession();
  }, [auth]);

  useEffect(() => {
    if (!session) return;
    void inbox.refreshMailboxes();
    void settings.refreshSettingsData();
    if (session.user.role === "admin") void admin.refreshAdminData();
  }, [admin, inbox, session, settings]);

  useEffect(() => {
    if (!inbox.selectedMailboxId) return;
    void inbox.refreshMessages(inbox.selectedMailboxId);
    void inbox.refreshOutbound(inbox.selectedMailboxId);
  }, [inbox]);

  return {
    session,
    notice,
    auth,
    inbox,
    settings,
    admin
  };
}
