# Design System Changelog

约定：格式参考 [Keep a Changelog](https://keepachangelog.com/)。日期使用 ISO 8601。版本号与设计系统独立演进。

## [Unreleased]

### Added — Public Preview & Layer Hardening (2026-04-23)

- `apps/web/src/shared/overlay/layer-utils.ts` — 抽出 shared layer 能力：portal root、focusable 查询、overlay inert 管理、基础 floating 定位
- `apps/web/src/test/shared-overlay.test.tsx` — 新增 focus trap / 背景 inert 回归
- `apps/web/src/test/shared-popover.test.tsx` — 新增 portal 渲染回归
- `apps/web/src/test/shared-tooltip.test.tsx` — 新增 portal 渲染回归
- `apps/web/src/test/app.test.tsx` — 新增公开 `/design-system` 路由与首页入口回归

### Changed

- `apps/web/src/app/App.tsx` — `/design-system` 提前从应用壳层分流，变为公开独立页面
- `apps/web/src/app/AppRoutes.tsx` — 移除后台工作台中的 `/design-system` 路由注册
- `apps/web/src/features/landing/WemailLandingPage.tsx` — 首页顶部与移动菜单新增 `设计系统` 链接
- `apps/web/src/pages/DesignSystemPage.tsx` — 补齐公开页头、主题切换、真实预览卡片与 live overlay demo，逐步替换 placeholder 区块
- `apps/web/src/features/accounts/AccountsListPage.tsx`、`apps/web/src/pages/UsersListPage.tsx` — 接入 `PageLayout` 与 `FilterBar`，开始把重复页面结构收敛进 shared 原语
- `apps/web/src/shared/overlay/OverlayPrimitives.tsx` — Overlay 改为 portal 渲染，支持 focus trap、背景 inert、body scroll lock、焦点归还
- `apps/web/src/shared/popover/PopoverPrimitives.tsx` — Popover 改为 shared layer portal，并加入基础定位与碰撞回退
- `apps/web/src/shared/tooltip/TooltipPrimitives.tsx` — Tooltip 改为 shared layer portal，并加入基础定位与 side 回退

### Added — Page Layout & Filter Bar (2026-04-23)

- `apps/web/src/shared/page-layout/*` — 新增页面级布局原语：`Page`、`PageHeader`、`PageToolbar`、`PageBody`、`PageMain`、`PageSidebar`
- `apps/web/src/shared/filter-bar/*` — 新增筛选条原语：`FilterBar`、`FilterBarActions`、`FilterBarSummary`
- `apps/web/src/shared/metric-card/*` — 新增统计卡原语：`MetricCard`
- `apps/web/src/test/shared-page-layout.test.tsx` — 锁定页面级布局结构
- `apps/web/src/test/shared-filter-bar.test.tsx` — 锁定筛选条布局与摘要区域
- `apps/web/src/test/shared-metric-card.test.tsx` — 锁定统计卡结构

### Added — Sprint 7 Preview & Docs (2026-04-23)

- `apps/web/src/pages/DesignSystemPage.tsx` — 重构为 13 分区预览工作面，固定 section id、页内导航、回归检查点与“等待注入真实示例”槽位
- `apps/web/src/test/design-system-page.test.tsx` — 锁定 13 分区结构、导航锚点和占位契约
- `apps/web/e2e/design-system.spec.ts` — 新增 `/design-system` 专用 Playwright 用例，覆盖结构断言与 light/dark 视觉回归脚手架
- `docs/design-system/README.md` — 新增 13 类分区映射、后续注入约定与视觉回归说明

### Changed

- `docs/design-system/CHANGELOG.md` — 开始记录 S7 预览与文档工作面变更
- `apps/web/e2e/README.md` — 补充 design-system 专用 e2e/视觉回归说明

### Fixed

- 统一 `/design-system` 作为 design system 预览页路径，不再为后续文档和回归流程保留 `/_design` 旧命名

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
- `apps/web/src/shared/styles/primitives.css` — 空 barrel，供 S2-S6 component 追加自己的 `@import`
- `apps/web/src/shared/styles/index.css` — 顶部新增 `@import "./tokens.css"; @import "./primitives.css";`；旧内容全部保留
- `apps/web/src/test/utils/renderWithTheme.ts` — 基于 `@testing-library/react` 的 `render` 包装，挂 `data-theme`，支持运行时切换
- `apps/web/src/test/utils/pressKey.ts` — 键盘按键测试辅助，封装 `keyDown + keyUp`
- `apps/web/src/test/utils/index.ts` — 桶式导出
- `apps/web/src/pages/DesignSystemPage.tsx` — 路由 `/design-system`，展示 token 与原语的可视预览骨架
- `apps/web/src/app/AppRoutes.tsx` — 注册 `/design-system` 路由（后续已提升为公开独立页面）
- `docs/design-system/README.md` — 索引与 token 速查表

### Changed

- (无 — S1 为 additive 落地，不破坏既有样式)

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
