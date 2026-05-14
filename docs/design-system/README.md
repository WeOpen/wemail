# WeMail 设计系统

参考 [`docs/plans/2026-04-22-design-system-v1.md`](../plans/2026-04-22-design-system-v1.md) 了解整体方案、实施节奏与验收清单。

## 当前状态

- 预览路由固定为 `/design-system`，不再使用 `/_design`
- `/design-system` 为公开独立页面，不依赖登录，也不挂在后台工作台壳层里
- 未登录首页顶部提供 `设计系统` 入口，方便直接预览与对照
- 13 个分区已具备真实原语示例、公共页头、主题切换和 live overlay demo
- Playwright 已锁定公开 `/design-system` 的结构性回归，light/dark 截图仍按环境变量开关保护

## 范围

- 仅 Web 端（`apps/web`），暂不覆盖移动端与邮件模板
- 附加式（additive）落地：保留既有 CSS 变量兼容层，并把新增 token、原语和 page-level showcase 统一收敛到 shared 层
- 现阶段重点是把 Web 端原语、公共预览和基础交互能力补齐；移动端、邮件模板和更高级的浮层定位仍在后续演进范围

## 13 类预览分区

`apps/web/src/pages/DesignSystemPage.tsx` 现在以稳定英文 section id 组织公开预览页。后续新增真实示例时，优先在现有分区内扩展示例，不要重排结构或另起平行入口。

| Section id | 页面标题 | 承接内容 | 主要来源 Sprint |
|---|---|---|---|
| `foundations` | `Foundations` | 设计原则、发布节奏、锚点契约、回归入口 | S1 / S7 |
| `color-theme` | `Color & Theme` | 品牌色、语义色、主题差异 | S1 |
| `layout-spacing` | `Layout & Spacing` | 页面布局、容器节奏、间距尺度 | S1 |
| `elevation-radius` | `Elevation & Radius` | 阴影、圆角、表面层级 | S1 |
| `typography-content` | `Typography & Content` | Typography、Divider、Icon、Spinner、Skeleton | S2 |
| `buttons-actions` | `Buttons & Actions` | Button 体系、动作矩阵、CopyButton | S2 / S5 |
| `form-inputs` | `Form Inputs` | TextInput、Select、Textarea、SearchInput、MultiSelect | S5 |
| `selection-controls` | `Selection Controls` | Switch、Checkbox、Radio、字段组选项 | S5 |
| `navigation-wayfinding` | `Navigation & Wayfinding` | Breadcrumb、Pagination、Tabs、Steps | S4 |
| `surfaces-cards` | `Surfaces & Cards` | Card、容器组合、EmptyState | S3 |
| `data-display` | `Data Display & Charts` | Table、Chart、KVList、Avatar | S1 / S5 |
| `feedback-status` | `Feedback & Status` | Tag、Badge、Progress、Alert、Spinner、Skeleton | S3 / S5 / S6 |
| `overlays-utilities` | `Overlays & Utilities` | Overlay、Tooltip、Popover、ScrollArea、工具型原语 | S6 |

## 预览页维护约定

后续继续扩 `/design-system` 时遵守下面几条：

1. 保持 13 个 section id 不变，Playwright 和文档都会引用这些锚点。
2. 优先在现有 section 的 preview 区内扩真实示例，不要新增一整套平行布局。
3. 每个分区都至少保留三类信息：覆盖范围、回归检查点、真实示例或占位。
4. 新增原语示例后，同步更新本 README 的对应分区说明和 [`CHANGELOG.md`](./CHANGELOG.md)。

## Token 快速索引

所有 token 定义在 [`apps/web/src/shared/styles/tokens.css`](../../apps/web/src/shared/styles/tokens.css)，按类别分组：

| 类别 | 变量前缀 | 说明 |
|---|---|---|
| 品牌 | `--brand-50 … --brand-700`、`--brand-soft-500` | 主色梯度，`--brand-500` 与旧 `--accent` 等值 |
| 语义 | `--success-*`、`--warning-*`、`--danger-*`、`--info-*` | 各自 500 / 100 / 600 + soft 变体 |
| 中性 | `--neutral-0 … --neutral-900` | 9 阶灰度；dark 模式镜像反转 |
| 间距 | `--space-1 … --space-32` | 4px 网格 |
| 圆角 | `--radius-xs/sm/md/lg/xl/full` | 6 档 |
| 阴影 | `--elevation-xs/sm/md/lg/xl` | 5 档 |
| 字号 | `--font-display-lg/md`、`--font-title-lg/md`、`--font-body-lg/md`、`--font-caption`、`--font-mono-size` | 语义字号 |
| 行高 | `--line-display/title/body/caption/mono` | 与字号配套 |
| 动效 | `--duration-instant/fast/base/slow/slower`、`--ease-standard/emphasized/in-out` | 统一过渡时长与曲线 |
| 层级 | `--z-base/raised/dropdown/sticky/fixed/overlay/modal/popover/toast/tooltip` | z-index 语义层 |
| 焦点 | `--focus-ring-width/offset/color/ring` | 统一键盘焦点环 |
| 图表 | `--chart-series-1 … --chart-series-8` | Nivo 主题消费 |

## 组件清单

| 名称 | 目录 | 状态 |
|---|---|---|
| Button / ButtonLink / ButtonAnchor | `shared/button` | ✅ 已补齐；含 `subtle`、`xs`、icon-only 等变体 |
| TextInput / SelectInput / TextareaInput / CheckboxField / RadioGroupField / FormField / SearchInput / MultiSelect / Checkbox / Radio | `shared/form` | ✅ 已补齐 |
| Table 全家桶 | `shared/table` | ✅ 已有 |
| Switch | `shared/switch` | ✅ 已有 |
| Chart（Nivo 主题） | `shared/chart` | ✅ 已有 |
| Overlay（Modal/Drawer） | `shared/overlay` | ✅ 已有；现支持 portal、focus trap、背景 inert 和焦点归还 |
| Typography / Divider / Icon / Spinner / Skeleton | `shared/{typography,divider,icon,spinner,skeleton}` | ✅ 已补齐 |
| Card / Tag / Badge / EmptyState | `shared/{card,tag,badge,empty-state}` | ✅ 已补齐 |
| Breadcrumb / Pagination / Tabs / Steps | `shared/{breadcrumb,pagination,tabs,steps}` | ✅ 已补齐 |
| Progress / Alert / CopyButton / KVList / Avatar | `shared/...` | ✅ 已补齐 |
| Tooltip / Popover / ScrollArea | `shared/{tooltip,popover,scroll-area}` | ✅ 已补齐；Tooltip / Popover 使用 shared layer portal 和基础碰撞处理 |
| Page / PageHeader / PageToolbar / PageBody / PageMain / PageSidebar | `shared/page-layout` | ✅ 已补齐；用于统一页面级结构 |
| FilterBar / FilterBarActions / FilterBarSummary | `shared/filter-bar` | ✅ 已补齐；用于搜索、筛选与结果摘要排布 |
| MetricCard | `shared/metric-card` | ✅ 已补齐；用于 KPI / 摘要统计卡 |

## 视觉回归脚手架

- 专用 spec：[`apps/web/e2e/design-system.spec.ts`](../../apps/web/e2e/design-system.spec.ts)
- 默认会跑结构性断言，确认 `/design-system` 能作为公开页面展示 13 个 section
- light/dark 截图测试先以环境变量开关保护：`PW_UPDATE_DESIGN_SYSTEM_SNAPSHOTS=1`
- 未来在示例稳定后使用 `pnpm test:e2e -- --update-snapshots apps/web/e2e/design-system.spec.ts` 生成或更新基线

## A11y 契约（所有原语必须满足）

- role / ARIA attrs 明确
- 键盘可达（Tab / Enter / Space / Arrow / Esc）
- 对比度 ≥ 4.5:1（正文）/ 3:1（大字或图形）
- `prefers-reduced-motion` 下降级动画
- Modal / Drawer / Popover 焦点陷阱 + 归还

## 变更记录

每次 token / 原语 / 预览工作面变更都写入 [`CHANGELOG.md`](./CHANGELOG.md)。
