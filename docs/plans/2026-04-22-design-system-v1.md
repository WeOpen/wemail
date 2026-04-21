# WeMail Web 端 UI 设计系统 v1.0 落地方案

- 日期：2026-04-22
- 分支：`feature/design-system-v1`
- 范围：仅 Web 端（`apps/web`），不含移动端与邮件模板
- 目标：把分散在各 feature 的视觉/交互规范收敛为一套可复用、可测试、可演进的 design token + 原语组件库，并提供一个可导航的预览页

---

## 1. 背景与目标

- 参考图列出了 13 个模块（色彩、布局、卡片、按钮、输入、标签、导航、开关、复选框、单选、进度、提示、阴影、圆角、间距）
- 现有仓库已有 `shared/{button,form,table,switch,chart,overlay}` 原语与一套 CSS 变量，但缺 Tag、Badge、Breadcrumb、Pagination、Tabs、Steps、Progress、Alert、Card、Typography 等常用原语
- 新功能 / 重构页面时，团队频繁复制粘贴样式片段，偏差累积
- **本方案目标**：一次性补齐缺口，保持对现有代码的零破坏（通过别名 / 渐进迁移），并让后续页面"只用原语、不写业务 CSS"

### 非目标（本期不做）
- 移动端适配、邮件 HTML 模板、打印样式
- 从 lucide-react 迁移到自有图标库
- Storybook / Ladle 预览工具（用自建 `/_design` 路由替代）
- i18n 接入（只做"提供可覆盖 prop"，不拉 i18n 库）

---

## 2. 现状盘点

| 参考图模块 | 现有 | 缺口 |
|---|---|---|
| 色彩 | `--accent`、`--success-soft`、`--warning-soft`、中性 `--text/--text-muted/--text-soft` | 缺 `--success/--warning/--danger/--info` 主色梯度；缺中性灰 9 阶；缺品牌 9 阶 |
| 圆角 | `--radius-shell/card/pill/field` | 缺系统化的 xs/sm/md/lg/xl 命名 |
| 阴影 | `--shadow-soft/card/border` | 缺 xs/sm/md/lg/xl 梯度 |
| 间距 | 无 token，散在各 css | 缺 4px 网格完整 `--space-*` |
| 字号 | 浏览器默认 + 局部 clamp | 缺 display/title/body/caption 语义 token |
| Button | `Button / ButtonLink / ButtonAnchor`（7 变体） | 需新增 xs icon-only 变体；可选新增 subtle 变体 |
| 输入 | `TextInput / SelectInput / TextareaInput / FormField / CheckboxField / RadioGroupField` | 缺 `SearchInput`、独立 `Checkbox`/`Radio`、`MultiSelect` |
| 表格 | 已有 `TableContainer / Table / ...` | OK |
| Switch | 已有 | OK |
| 卡片 | 只有 `.panel` 全局类 + 业务 css | 需 `Card / CardHeader / CardBody / CardFooter` |
| 标签与状态 | 各页 inline chip | 需 `Tag`（分类）+ `Badge`（状态）两原语 |
| 导航 | 局部 `workspace-pill-nav`、面包屑散落 | 需 `Breadcrumb / Pagination / Tabs / Steps` |
| 进度 | 无 | `Progress` |
| 提示 | `WemailToast`（飞出）/ 无静态 | `Alert`（页内静态） |
| Overlay | `shared/overlay` 已有 | 需核对 Modal/Drawer/Dialog 一致 |
| 排版 | `<h1><h2><p>`+ className | 需 `Heading / Text / Label / Muted` 排版原语 |

---

## 3. Design Tokens（新建 `apps/web/src/shared/styles/tokens.css`）

### 3.1 颜色

```css
:root,
:root[data-theme="light"] {
  /* 品牌 — 保留 --accent=#ff7a00 作为 --brand-500 */
  --brand-50:  #fff2e6;
  --brand-100: #ffe0c2;
  --brand-200: #ffc78a;
  --brand-300: #ffa74d;
  --brand-400: #ff8b26;
  --brand-500: #ff7a00;
  --brand-600: #e66d00;
  --brand-700: #b35400;

  /* 辅助橙 */
  --brand-soft-500: #ffb366;

  /* 语义色 */
  --success-500: #22c55e;  --success-100: #d1fadf;  --success-600: #16a34a;  --success-soft: rgba(34,197,94,.14);
  --warning-500: #f59e0b;  --warning-100: #fef0c7;  --warning-600: #d97706;  --warning-soft: rgba(245,158,11,.14);
  --danger-500:  #ef4444;  --danger-100:  #fee2e2;  --danger-600:  #dc2626;  --danger-soft: rgba(239,68,68,.14);
  --info-500:    #3b82f6;  --info-100:    #dbeafe;  --info-600:    #2563eb;  --info-soft:   rgba(59,130,246,.14);

  /* 中性 9 阶 */
  --neutral-0:  #ffffff;
  --neutral-50: #f9fafb;
  --neutral-100:#f3f4f6;
  --neutral-200:#e5e7eb;
  --neutral-300:#d1d5db;
  --neutral-400:#9ca3af;
  --neutral-500:#6b7280;   /* 图中"中性色" */
  --neutral-700:#374151;
  --neutral-900:#111827;

  /* 兼容别名 — 保证现有 CSS 零回归 */
  --accent: var(--brand-500);
  --accent-strong: var(--brand-400);
  --accent-soft: color-mix(in srgb, var(--brand-500) 14%, transparent);
}

:root[data-theme="dark"] { /* 同名重定义，保持语义色跨主题稳定 */ }
```

### 3.2 间距（4px 网格）
```css
--space-1:4;  --space-2:8;  --space-3:12; --space-4:16;
--space-5:20; --space-6:24; --space-8:32; --space-10:40;
--space-12:48;--space-14:56;--space-16:64;--space-18:72;
--space-20:80;--space-24:96;--space-28:112;--space-32:128;
```

### 3.3 圆角
```css
--radius-xs:4px; --radius-sm:8px; --radius-md:12px;
--radius-lg:16px; --radius-xl:24px; --radius-full:9999px;
/* 现有别名重定向 */
--radius-field: var(--radius-lg);
--radius-card:  var(--radius-xl);
--radius-pill:  var(--radius-full);
```

### 3.4 阴影
```css
--elevation-xs: 0 1px 2px rgba(17,17,17,.04);
--elevation-sm: 0 2px 6px rgba(17,17,17,.06), 0 1px 2px rgba(17,17,17,.04);
--elevation-md: 0 6px 16px rgba(17,17,17,.08), 0 2px 4px rgba(17,17,17,.04);
--elevation-lg: 0 14px 32px rgba(17,17,17,.10), 0 4px 8px rgba(17,17,17,.04);
--elevation-xl: 0 24px 64px rgba(17,17,17,.14), 0 8px 16px rgba(17,17,17,.06);
```

### 3.5 字号 / 行高语义
```css
--font-display-lg: 48px/1.1;
--font-display-md: 32px/1.2;
--font-title-lg:   24px/1.3;
--font-title-md:   20px/1.35;
--font-body-lg:    16px/1.55;
--font-body-md:    14px/1.55;
--font-caption:    12px/1.45;
--font-mono:       13px/1.6;
```

### 3.6 Motion tokens（新增）
```css
--duration-instant: 80ms;
--duration-fast:    150ms;
--duration-base:    200ms;
--duration-slow:    320ms;
--duration-slower:  480ms;
--ease-standard: cubic-bezier(0.25, 1, 0.5, 1);
--ease-emphasized: cubic-bezier(0.2, 1, 0.3, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
```

### 3.7 Z-index 分层（新增，收敛各处散落的 z 值）
```css
--z-base: 0;
--z-raised: 1;
--z-dropdown: 10;
--z-sticky: 20;
--z-fixed: 30;
--z-overlay: 40;
--z-modal: 50;
--z-popover: 60;
--z-toast: 70;
--z-tooltip: 80;
```

### 3.8 Focus ring（新增）
```css
--focus-ring-width: 3px;
--focus-ring-offset: 2px;
--focus-ring-color: color-mix(in srgb, var(--brand-500) 30%, transparent);
--focus-ring: 0 0 0 var(--focus-ring-width) var(--focus-ring-color);
```

### 3.9 Data viz 色板（供 `shared/chart/nivoTheme` 消费）
```css
--chart-series-1: var(--brand-500);
--chart-series-2: var(--info-500);
--chart-series-3: var(--success-500);
--chart-series-4: var(--warning-500);
--chart-series-5: var(--danger-500);
--chart-series-6: #8b5cf6;
--chart-series-7: #06b6d4;
--chart-series-8: #ec4899;
```

---

## 4. 横向基础设施

### 4.1 Icon 规范（`shared/icon/README.md` + lint 约定）
- 继续用 `lucide-react`，不引入自有图标库
- 尺寸 token：14（caption）、16（inline body）、20（button）、24（section）
- 颜色默认 `currentColor`，stroke-width 1.5
- 规则：所有图标必须 `aria-hidden="true"` 或带 `aria-label`
- 在 `shared/icon/Icon.tsx` 导出 `Icon`（统一 size + aria 包装），而非到处裸用 lucide

### 4.2 A11y 契约（每个原语 README 强制字段）
- role / ARIA attrs
- 键盘导航（Tab / Enter / Space / Arrow / Esc）
- 对比度（≥ 4.5:1 正文 / 3:1 大字或图形）
- `prefers-reduced-motion` 兜底
- 关键组件（Modal/Drawer/Popover）焦点陷阱 + 归还

### 4.3 i18n 接入点
- 不引入 i18n 库；原语的 `aria-label`、`loadingLabel`、`closeLabel` 等暴露成 prop，允许页面层替换
- 默认值用中文（WeMail 默认语言）；禁止在原语内部硬编码需要翻译的动词

### 4.4 测试工具（`apps/web/src/test/utils/`）
- `renderWithTheme(ui, { theme })` — 挂载 `data-theme` 并等待样式就绪
- `pressKey(el, key)` — 封装 fireEvent.keyDown/Up 的组合
- `axeRun(container)` — 可选的 a11y 自动巡检（先留挂载点，不强求本期接）

### 4.5 Reduced-motion 统一开关
- 所有新原语的 transition 必须在 `@media (prefers-reduced-motion: reduce)` 下降级为 `none`
- `base.css` 新增一条全局兜底：`*{ transition-duration: 0 !important }` 放 reduced-motion 媒体查询里（可被个别 opt-out）

### 4.6 视觉回归（补丁，放最后一个 Sprint）
- Playwright 跑 `/_design` 路由在 light/dark 两个主题下截图
- 存到 `apps/web/tests/visual/__snapshots__/`，PR 校对

---

## 5. 组件清单

> 命名：目录 `shared/<name>/`；文件 `<Name>Primitives.tsx + index.ts + README.md + test`；CSS 类 `ui-<name>-...`；状态 `is-<state>` + `data-state`。

### A. 已有 · 零改动
Table、Switch、Chart、Overlay（需内部核对 Modal/Drawer 完整性）

### B. 已有 · 扩展

#### B1. `shared/button`
- 新增 size `xs` + `iconOnly` 组合（32×32）
- 新增 `variant="subtle"`（灰底 hover tint，对应图中"次要按钮·默认"浅色态）
- README 补 xs 尺寸、subtle 变体用法

#### B2. `shared/form`
- 新增 `SearchInput`（`leadingIcon` + 清除按钮）
- 拆出独立 `Checkbox` / `Radio` 原子（当前只有 `CheckboxField`/`RadioGroupField` 组合）
- 新增 `MultiSelect`（headless 下拉 + 内部用 Checkbox）

### C. 新增原语

| 组件 | 目录 | 核心 Props | 变体 | 状态 |
|---|---|---|---|---|
| Card | `shared/card` | variant / padding / elevation / tone | base / data / status / accent | hover / is-interactive |
| Tag | `shared/tag` | variant / shape / size / dot / icon | neutral / brand / info / success / warning / danger | — |
| Badge | `shared/badge` | variant / appearance / size | soft / solid | — |
| Breadcrumb | `shared/breadcrumb` | separator | — | is-current |
| Pagination | `shared/pagination` | total / pageSize / page / onChange / siblings | size sm/md | is-active / is-disabled |
| Tabs | `shared/tabs` | value / onChange / variant | segmented / underline | is-selected / is-disabled |
| Steps | `shared/steps` | current / items | horizontal / vertical | upcoming / active / completed / error |
| Progress | `shared/progress` | value / max / variant / size / showLabel | linear（环形延后） | indeterminate |
| Alert | `shared/alert` | variant / appearance / title / onClose | soft / outline | dismissible |
| Typography | `shared/typography` | as / size / tone | Heading / Text / Label / Muted / Code / Kbd | — |
| Divider | `shared/divider` | orientation / inset / dashed | horizontal / vertical | — |
| Avatar | `shared/avatar` | src / alt / size / fallback | circle / square | is-loading |
| EmptyState | `shared/empty-state` | icon / title / description / actions | default / error / no-access | — |
| Skeleton | `shared/skeleton` | shape / width / height / rounded | rect / text / circle | is-animating |
| Spinner | `shared/spinner` | size / tone | — | — |
| Tooltip | `shared/tooltip` | content / placement / openDelay | — | open / closed |
| Popover | `shared/popover` | trigger / content / placement | — | open / closed |
| Kbd | `shared/typography` 子组件 | — | — | — |
| CopyButton | `shared/copy-button` | value / onCopy / children | — | is-copied |
| KVList | `shared/kv-list` | items / density | — | — |
| ScrollArea | `shared/scroll-area` | maxHeight / direction | — | has-scroll |
| PageLayout | `shared/page-layout` | `<Page>` `<PageHeader>` `<PageToolbar>` `<PageContent>` `<PageSidebar>` | — | — |
| FilterBar | `shared/filter-bar` | fields 数组 | — | has-active-filters |

### D. 合计
- 新增 15 类（C1–C15），扩展 2 类（B1–B2），零动 3 类，总计 20 个原语
- 所有原语统一：forwardRef + `cx()` + `data-state` + test 文件

---

## 6. 页面级抽象

### 6.1 `PageLayout` 脚手架
```tsx
<Page>
  <PageHeader
    breadcrumb={<Breadcrumb>...</Breadcrumb>}
    title="账号列表"
    description="..."
    actions={<Button>新建</Button>}
  />
  <PageToolbar>
    <SearchInput />
    <MultiSelect />
    <Button variant="ghost">导出</Button>
  </PageToolbar>
  <PageContent>
    <Card>...</Card>
  </PageContent>
</Page>
```
- 落地在 v1.1（本期只登记，不实施），避免一次性动太多页面

### 6.2 FilterBar 抽象
- 账号列表、邮件列表、发件箱、公告都有"搜索 + 状态 + 创建人 + 时间"的组合，抽出 `FilterBar`
- props：`fields: Array<{ type: "search" | "select" | "date" | "toggle", label, ... }>`
- 实现放 v1.1

---

## 7. 文件结构

```
apps/web/src/shared/
  styles/
    tokens.css             ← 新建（所有 token）
    base.css               ← 抽出 reset / 全局排版（可选，为减轻 index.css）
    index.css              ← 顶部 @import "./tokens.css" + "./base.css"
  button/                  ← 扩展
  form/                    ← 扩展
  icon/                    ← 新增
  typography/              ← 新增
  card/                    ← 新增
  tag/                     ← 新增
  badge/                   ← 新增
  breadcrumb/              ← 新增
  pagination/              ← 新增
  tabs/                    ← 新增
  steps/                   ← 新增
  progress/                ← 新增
  alert/                   ← 新增
  divider/                 ← 新增
  avatar/                  ← 新增
  empty-state/             ← 新增
  skeleton/                ← 新增
  spinner/                 ← 新增
  tooltip/                 ← 新增
  popover/                 ← 新增
  copy-button/             ← 新增
  kv-list/                 ← 新增
  scroll-area/             ← 新增
  table/ switch/ chart/ overlay/  ← 保持

apps/web/src/pages/
  DesignSystemPage.tsx     ← 新增，路由 /_design

apps/web/src/test/utils/
  renderWithTheme.ts       ← 新增
  pressKey.ts              ← 新增

apps/web/tests/visual/
  design-system.spec.ts    ← 新增 Playwright 快照
  __snapshots__/           ← 基线截图

docs/
  design-system/
    README.md              ← 设计原则 + token 清单 + 组件索引
    CHANGELOG.md           ← token / 原语变更日志
  plans/
    2026-04-22-design-system-v1.md   ← 本文档
```

---

## 8. 实施顺序（7 个 Sprint）

每个 Sprint 结束：`pnpm test:web && pnpm lint && pnpm typecheck && pnpm build` 必须全绿，已有页面视觉零回归。

| # | Sprint | 内容 | 预估 |
|---|---|---|---|
| S1 | Token foundation | `tokens.css` + 兼容别名 + `base.css` 抽出 + `DesignSystemPage` 骨架路由（/_design）+ 测试 utils + `CHANGELOG.md` | 1 天 |
| S2 | 排版与原子 | `typography / divider / spinner / skeleton / icon` + 单测 + 在预览页展示 | 1 天 |
| S3 | 卡片与状态 | `card / tag / badge / empty-state` + 单测 + 账号列表接入 Badge | 1 天 |
| S4 | 导航四件套 | `breadcrumb / pagination / tabs / steps` + 把 `.workspace-pill-nav` 与 `.landing-code-tab-switch` 迁入 `Tabs` | 1 天 |
| S5 | 输入扩展 + 开关类 | `SearchInput / Checkbox / Radio / MultiSelect` + `progress / alert / copy-button / kv-list / avatar` | 1 天 |
| S6 | 浮层补齐 | `tooltip / popover / scroll-area`；核对 `overlay/` 目录的 Modal/Drawer | 1 天 |
| S7 | 文档 + 视觉回归 | 每原语 README 完整；`/_design` 预览完整化；Playwright 快照；`docs/design-system/README.md` 索引 | 1 天 |

**每 Sprint 的提交约定**：
- 每个原语独立 commit（feat: add shared/<name>…）
- PR 合并前跑 `pnpm --filter web test` + 预览页截图对比

---

## 9. 验收清单

- [ ] `tokens.css` 落地，现有 `--accent/--border/...` 继续可用（via 兼容别名），历史页面零视觉回归
- [ ] 20 个原语全部就位（第 5 节表格）
- [ ] 每原语 3 件套齐全：`*Primitives.tsx + index.ts + README.md`
- [ ] 每原语单测覆盖：渲染 / 受控 / disabled / 变体 class / a11y role；≥80% 行覆盖
- [ ] `/_design` 预览页展示所有变体与状态，按图中 13 分区对齐排版
- [ ] `docs/design-system/README.md` 索引 + `CHANGELOG.md` 记录 token 变更
- [ ] `pnpm test:web && lint && typecheck && build` 全绿
- [ ] Playwright `/design-system` light + dark 快照基线提交
- [ ] 至少 2 个既有页面接入新原语（账号列表 → Badge + Pagination，Landing 开发者段 → Tabs），前后截图对比入 PR
- [ ] Reduced-motion 媒体查询在所有动画组件生效
- [ ] 焦点环可见，Tab 键顺序合理

---

## 10. 风险与降级

| 风险 | 影响 | 降级 |
|---|---|---|
| tokens 重定向导致旧 CSS 色偏 | 高 | 只新增变量 + 别名指回，不改旧变量；S1 结束做 diff 截图对比 |
| Tabs 原语迁移改到 `workspace-pill-nav` 破坏现有 topbar | 中 | 保留旧类名作"外观 shim"，先让 Tabs 内部渲染相同 className；两周后废弃 |
| `focus-visible` 样式与现有按钮冲突 | 低 | 新 focus-ring 变量只给新增组件使用；Button 等已有组件保留自身 focus 样式 |
| 一次性新增 20 目录体量大，review 吃力 | 中 | 按 Sprint 拆 commit + PR；每组件独立评审单元 |
| 视觉回归误报（字体/浏览器抗锯齿） | 中 | 截图生成设定 deviceScaleFactor=2 + 禁用动画；阈值允许 ≤1% 像素偏差 |
| lucide-react 图标 tree-shaking 失败 | 低 | 通过 `Icon` 组件统一导入，便于将来替换 |

---

## 11. 待决策开放问题

1. 预览页路径：`/_design` vs `/design-system` vs 仅 dev 环境可见？
2. Dark 主题的阴影是否要独立一套（现 dark 只改 `--shadow-soft/card`）？建议 S1 统一重算
3. `Card variant="data"` 的数值排版要不要用 `--font-mono`？参考图是等宽
4. `Tabs.underline` 本期是否实现？现在只用到 segmented，建议延后
5. `Skeleton` 要不要含 shimmer 动画？建议默认无动画，prop 开启
6. `Tooltip` 用原生 `title` 属性 fallback 还是完全 JS 实现？建议完全 JS，title 仅作 SSR 兜底
7. 是否顺带引入 `@radix-ui/react-*` 做 headless 基座（Popover/Tabs/Tooltip）？当前无第三方 UI 依赖，引入需 ADR。建议暂不，先自写；若 S6 成本高再换
8. Visual regression 要不要在 CI 上强制？建议先跑但仅 warn，观察一周后转 block

---

## 12. 与现有规范的衔接

- 架构约束：原语属 `apps/web/src/shared`，不跨依赖到 `features/*` 或 `pages/*`（见 `docs/code-standard.md`）
- 测试策略：单测 + 预览页 + 视觉回归；E2E 由现有 Playwright 关键流程兜底（见 `docs/testing-strategy.md`）
- 提交规范：feat/refactor/docs 前缀；每原语独立 commit；PR 体记录 before/after 截图
- 一旦本方案 merge，后续页面若重复造轮子将在 code review 被拒

---

## 13. 下一步行动

1. 本文档合并到 main 后（或批准后直接在分支内）开始 **S1 Token foundation**
2. 每完成 Sprint，在 PR 描述附预览页截图 + 影响页清单
3. 全部合并后，追写 ADR：`docs/adr/0003-design-system-v1.md` 记录本期决策
