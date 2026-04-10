import { ReactNode } from "react";
import { NavLink } from "react-router-dom";

import type { SessionSummary } from "@wemail/shared";

type AppLayoutProps = {
  session: SessionSummary;
  notice: string | null;
  onLogout: () => void;
  children: ReactNode;
};

export function AppLayout({ session, notice, onLogout, children }: AppLayoutProps) {
  return (
    <div className="app-layout">
      <header className="topbar">
        <div>
          <p className="eyebrow">wemail</p>
          <h1>{session.user.email}</h1>
        </div>
        <nav className="nav-links">
          <NavLink to="/">Inbox</NavLink>
          <NavLink to="/settings">Settings</NavLink>
          {session.user.role === "admin" ? <NavLink to="/admin">Admin</NavLink> : null}
        </nav>
        <button className="ghost-button" onClick={onLogout}>
          Sign out
        </button>
      </header>
      {notice ? <div className="notice-banner">{notice}</div> : null}
      {children}
    </div>
  );
}
