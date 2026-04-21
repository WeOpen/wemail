# Design System Changelog

约定：格式参考 [Keep a Changelog](https://keepachangelog.com/)。日期使用 ISO 8601。版本号与设计系统独立演进。

## [Unreleased]

### Added — Sprint 1 Foundation (2026-04-22)

- `apps/web/src/shared/styles/tokens.css` — 新增 token 层
  - 品牌色 9 阶（`--brand-50 … 700`）+ 辅助橙（`--brand-soft-500`）
  - 语义色（success / warning / danger / info）各含 500 / 100 / 600 + `-bg` soft 变体
  - 中性色 9 阶（`--neutral-0 … 900`），dark 主题反转
  - 间距 `--space-1 … --space-32`（4px 网格）
  - 圆角 `--radius-xs/sm/md/lg/xl/full`（与旧 `--radius-shell/card/pill/field` 并存）
  - 阴影 `--elevation-xs … xl`（与旧 `--shadow-*` 并存）
  - 字号 `--font-display-lg/md`、`--font-title-lg/md`、`--font-body-lg/md`、`--font-caption`、`--font-mono-size` + 对应行高
  - 动效 `--duration-instant/fast/base/slow/slower` + 三条 ease 曲线
  - 层级 `--z-base … --z-tooltip` 共 10 档
  - 焦点环 `--focus-ring-width/offset/color/ring`
  - 图表色板 `--chart-series-1 … 8`
- `apps/web/src/shared/styles/primitives.css` — 空 barrel,供 S2-S6 component 追加自己的 `@import`
- `apps/web/src/shared/styles/index.css` — 顶部新增 `@import "./tokens.css"; @import "./primitives.css";`;旧内容全部保留
- `apps/web/src/test/utils/renderWithTheme.ts` — 基于 `@testing-library/react` 的 `render` 包装,挂 `data-theme`,支持运行时切换
- `apps/web/src/test/utils/pressKey.ts` — 键盘按键测试辅助,封装 `keyDown + keyUp`
- `apps/web/src/test/utils/index.ts` — 桶式导出
- `apps/web/src/pages/DesignSystemPage.tsx` — 路由 `/design-system`,展示 token 与原语的可视预览骨架
- `apps/web/src/app/AppRoutes.tsx` — 注册 `/design-system` 路由
- `docs/design-system/README.md` — 索引与 token 速查表

### Changed
- (无 — S1 为 additive 落地,不破坏既有样式)

### Removed
- (无)

---

## 模板（后续 Sprint 填写）

```md
### Added — Sprint N Name (YYYY-MM-DD)
- ...

### Changed
- ...

### Deprecated
- ...

### Removed
- ...

### Fixed
- ...
```
