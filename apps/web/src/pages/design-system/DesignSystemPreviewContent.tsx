import { Alert } from "../../shared/alert";
import { Button } from "../../shared/button";
import { SearchInput } from "../../shared/form";
import { KVList } from "../../shared/kv-list";
import { OverlayDialog, OverlayDrawer } from "../../shared/overlay";
import { Text } from "../../shared/typography";
import type { DesignSystemSectionId } from "./designSystemContent";
import { findDesignSystemSection } from "./designSystemSections";
import { designSystemExampleStyles, designSystemPageStyles, designSystemSharedStyles } from "./designSystemStyles";

interface DesignSystemSectionListProps {
  sectionIds: DesignSystemSectionId[];
}

interface DesignSystemPreviewOverlaysProps {
  isDialogOpen: boolean;
  isDrawerOpen: boolean;
  onCloseDialog: () => void;
  onCloseDrawer: () => void;
}

export function DesignSystemSectionList({ sectionIds }: DesignSystemSectionListProps) {
  return sectionIds.map((sectionId) => {
    const section = findDesignSystemSection(sectionId);

    return (
      <section
        className="panel workspace-card page-panel design-system-panel"
        key={section.id}
        style={{
          ...designSystemPageStyles.sectionLayout,
          background: "var(--surface-muted)",
          boxShadow: "0 18px 42px rgba(15, 23, 42, 0.08)"
        }}
      >
        <div style={designSystemPageStyles.metaGrid}>
          <p className="panel-kicker">{section.sprint}</p>
          <div style={designSystemSharedStyles.stack}>
            <h2 style={{ margin: 0 }}>{section.title}</h2>
            <strong style={{ color: "var(--text, #111827)" }}>{section.chineseTitle}</strong>
            <p className="section-copy" style={{ margin: 0 }}>
              {section.summary}
            </p>
          </div>
          <div style={designSystemSharedStyles.chipRow}>
            {section.primitives.slice(0, 4).map((item) => (
              <span key={item} style={designSystemSharedStyles.chip}>
                {item}
              </span>
            ))}
          </div>
          <div style={designSystemSharedStyles.stack}>
            <div>
              <p style={designSystemPageStyles.subheading}>Coverage</p>
              <ul style={designSystemPageStyles.denseList}>
                {section.coverage.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <p style={designSystemPageStyles.subheading}>Regression checklist</p>
              <ul style={designSystemPageStyles.denseList}>
                {section.checklist.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div data-testid="design-system-preview-pane" style={designSystemExampleStyles.previewPane}>
          {section.preview}
        </div>
      </section>
    );
  });
}

export function DesignSystemPreviewOverlays({
  isDialogOpen,
  isDrawerOpen,
  onCloseDialog,
  onCloseDrawer
}: DesignSystemPreviewOverlaysProps) {
  return (
    <>
      {isDialogOpen ? (
        <OverlayDialog
          closeLabel="关闭 design system 对话框示例"
          closeOnBackdrop
          description="这个示例用来验证 focus trap、背景 inert 和统一弹层语言。"
          footer={
            <div style={designSystemSharedStyles.chipRow}>
              <Button onClick={onCloseDialog} size="sm" variant="secondary">
                关闭
              </Button>
              <Button size="sm" variant="primary">
                主操作
              </Button>
            </div>
          }
          onClose={onCloseDialog}
          title="Dialog live preview"
        >
          <div style={{ display: "grid", gap: "12px" }}>
            <Text size="md">按 `Tab` 循环焦点，按 `Esc` 或点击遮罩关闭。</Text>
            <SearchInput aria-label="弹层内搜索" placeholder="在弹层里验证 focus trap" />
            <Alert title="Modal shell ready" variant="info">
              当前弹层已通过 shared layer portal 挂载到 body。
            </Alert>
          </div>
        </OverlayDialog>
      ) : null}

      {isDrawerOpen ? (
        <OverlayDrawer
          closeLabel="关闭 design system 抽屉示例"
          closeOnBackdrop
          description="抽屉适合更长的补充配置和多段内容。"
          onClose={onCloseDrawer}
          title="Drawer live preview"
          width="lg"
        >
          <div style={{ display: "grid", gap: "16px" }}>
            <Text size="md">这里展示的是统一抽屉壳层，而不是业务页面专属样式。</Text>
            <KVList
              items={[
                { key: "Portal", value: "Enabled" },
                { key: "Focus trap", value: "Enabled" },
                { key: "Scroll lock", value: "Enabled" }
              ]}
            />
            <div style={{ alignItems: "center", display: "flex", justifyContent: "flex-end" }}>
              <Button onClick={onCloseDrawer} size="xs" variant="primary">
                完成预览
              </Button>
            </div>
          </div>
        </OverlayDrawer>
      ) : null}
    </>
  );
}
