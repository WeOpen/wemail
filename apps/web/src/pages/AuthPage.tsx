import type { FormEvent, KeyboardEvent } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

import { AuthForms } from "../features/auth/AuthForms";
import { WemailLandingPage } from "../features/landing/WemailLandingPage";

type AuthPageProps = {
  authError: string | null;
  onRegister: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  onLogin: (event: FormEvent<HTMLFormElement>) => Promise<void>;
};

const AUTH_MODES = ["login", "register"] as const;

export function AuthPage({ authError, onRegister, onLogin }: AuthPageProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const mode = location.pathname === "/register" ? "register" : "login";

  function switchMode(nextMode: (typeof AUTH_MODES)[number]) {
    if (nextMode === mode) return;
    const nextPath = nextMode === "login" ? "/login" : "/register";
    void navigate(`${nextPath}${location.search}`);
  }

  function handleTabsKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"].includes(event.key)) return;

    event.preventDefault();
    const currentIndex = AUTH_MODES.indexOf(mode);

    if (event.key === "Home") {
      switchMode(AUTH_MODES[0]);
      return;
    }

    if (event.key === "End") {
      switchMode(AUTH_MODES[AUTH_MODES.length - 1]);
      return;
    }

    const direction = event.key === "ArrowLeft" || event.key === "ArrowUp" ? -1 : 1;
    const nextIndex = (currentIndex + direction + AUTH_MODES.length) % AUTH_MODES.length;
    switchMode(AUTH_MODES[nextIndex]);
  }

  if (location.pathname === "/") {
    return <WemailLandingPage />;
  }

  if (location.pathname !== "/login" && location.pathname !== "/register") {
    const next = `${location.pathname}${location.search}${location.hash}`;
    return <Navigate replace to={`/login?next=${encodeURIComponent(next)}`} />;
  }

  return (
    <div className="auth-shell">
      <section className="auth-card">
        <div className="auth-card-header">
          <p className="eyebrow">{mode === "login" ? "账号登录" : "邀请码注册"}</p>
          <h1>{mode === "login" ? "登录到 wemail" : "创建你的 wemail 账号"}</h1>
          <p className="hero-copy">
            {mode === "login"
              ? "在同一个认证入口里切换登录与注册，进入你的邮箱工作台与后台。"
              : "通过邀请码完成注册，认证成功后直接进入你的团队邮箱工作区。"}
          </p>
        </div>
        <div className="auth-tabs" role="tablist" aria-label="认证方式切换" onKeyDown={handleTabsKeyDown}>
          <button
            aria-controls="auth-panel-login"
            aria-selected={mode === "login"}
            className={mode === "login" ? "auth-tab active" : "auth-tab"}
            id="auth-tab-login"
            onClick={() => switchMode("login")}
            role="tab"
            tabIndex={mode === "login" ? 0 : -1}
            type="button"
          >
            登录
          </button>
          <button
            aria-controls="auth-panel-register"
            aria-selected={mode === "register"}
            className={mode === "register" ? "auth-tab active" : "auth-tab"}
            id="auth-tab-register"
            onClick={() => switchMode("register")}
            role="tab"
            tabIndex={mode === "register" ? 0 : -1}
            type="button"
          >
            注册
          </button>
        </div>
        <AuthForms authError={authError} onRegister={onRegister} onLogin={onLogin} mode={mode} />
      </section>
    </div>
  );
}
