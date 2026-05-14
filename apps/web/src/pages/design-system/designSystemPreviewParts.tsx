import type { ReactNode } from "react";

import type { WorkspaceTheme } from "../../app/appStore";
import { Button } from "../../shared/button";
import { CopyButton } from "../../shared/copy-button";
import { designSystemSharedStyles } from "./designSystemStyles";

interface SwatchProps {
  name: string;
  hex: string;
  varName: string;
}

interface TokenRowProps {
  label: string;
  value: ReactNode;
  hint: string;
}

interface ThemeShowcaseCardProps {
  description: string;
  theme: WorkspaceTheme;
  title: string;
}

export function Swatch({ name, hex, varName }: SwatchProps) {
  return (
    <div style={designSystemSharedStyles.previewCard}>
      <span
        aria-hidden="true"
        style={{
          height: "56px",
          borderRadius: "12px",
          background: hex,
          border: "1px solid rgba(15, 23, 42, 0.08)"
        }}
      />
      <div style={{ display: "grid", gap: "6px" }}>
        <strong>{name}</strong>
        <code>{hex.toUpperCase()}</code>
        <small>{varName}</small>
      </div>
    </div>
  );
}

export function TokenRow({ label, value, hint }: TokenRowProps) {
  return (
    <div style={{ ...designSystemSharedStyles.previewCard, gridTemplateColumns: "88px minmax(0, 1fr)", alignItems: "center" }}>
      <div>{value}</div>
      <div style={{ display: "grid", gap: "6px" }}>
        <strong>{label}</strong>
        <small>{hint}</small>
      </div>
    </div>
  );
}

export function ThemeShowcaseCard({ description, theme, title }: ThemeShowcaseCardProps) {
  const isDark = theme === "dark";

  return (
    <div
      style={{
        ...designSystemSharedStyles.previewCard,
        background: isDark ? "#0f1115" : "#ffffff",
        borderColor: isDark ? "rgba(255,255,255,.1)" : "rgba(15,23,42,.08)",
        color: isDark ? "#f3f4f6" : "#111827"
      }}
    >
      <small>{title}</small>
      <div style={{ display: "grid", gap: "10px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "12px",
            padding: "14px 16px",
            borderRadius: "14px",
            background: isDark ? "rgba(255,255,255,.06)" : "rgba(15,23,42,.04)"
          }}
        >
          <strong>{isDark ? "Dark surface" : "Light surface"}</strong>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "6px 10px",
              borderRadius: "999px",
              background: isDark ? "#ff7a00" : "rgba(255,122,0,.12)",
              color: isDark ? "#0f1115" : "#b35400",
              fontSize: "12px",
              fontWeight: 700
            }}
          >
            Accent
          </span>
        </div>
        <small style={{ color: isDark ? "rgba(243,244,246,.72)" : "rgba(17,24,39,.62)" }}>{description}</small>
      </div>
    </div>
  );
}

export function DesignSystemQuickActions() {
  return (
    <div style={designSystemSharedStyles.previewCard}>
      <small>Quick actions</small>
      <div style={designSystemSharedStyles.chipRow}>
        <CopyButton value="pnpm test:web">复制测试命令</CopyButton>
        <CopyButton value="pnpm exec playwright test -c apps/web/playwright.config.ts apps/web/e2e/design-system.spec.ts">
          复制 e2e 命令
        </CopyButton>
      </div>
    </div>
  );
}

export function PreviewActionButtons({ onOpenDialog, onOpenDrawer }: { onOpenDialog: () => void; onOpenDrawer: () => void }) {
  return (
    <div style={designSystemSharedStyles.chipRow}>
      <Button onClick={onOpenDialog} size="sm" variant="secondary">
        打开对话框
      </Button>
      <Button onClick={onOpenDrawer} size="sm" variant="secondary">
        打开抽屉
      </Button>
    </div>
  );
}
