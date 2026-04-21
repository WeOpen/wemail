# WeMail 设计系统

参考 [`docs/plans/2026-04-22-design-system-v1.md`](../plans/2026-04-22-design-system-v1.md) 了解整体方案、实施节奏与验收清单。

## 范围

- 仅 Web 端（`apps/web`），暂不覆盖移动端与邮件模板
- 附加式（additive）落地：不改动既有 CSS 变量与选择器,新 token 与原语独立存在；业务页在各自节奏下迁移

## Token 快速索引

所有 token 定义在 [`apps/web/src/shared/styles/tokens.css`](../../apps/web/src/shared/styles/tokens.css)，按类别分组：

| 类别 | 变量前缀 | 说明 |
|---|---|---|
| 品牌 | `--brand-50 … --brand-700`、`--brand-soft-500` | 主色梯度,`--brand-500` 与旧 `--accent` 等值 |
| 语义 | `--success-*`、`--warning-*`、`--danger-*`、`--info-*` | 各自 500 / 100 / 600 + soft 变体 |
| 中性 | `--neutral-0 … --neutral-900` | 9 阶灰度;dark 模式镜像反转 |
| 间距 | `--space-1 … --space-32` | 4px 网格 |
| 圆角 | `--radius-xs/sm/md/lg/xl/full` | 6 档 |
| 阴影 | `--elevation-xs/sm/md/lg/xl` | 5 档 |
| 字号 | `--font-display-lg/md`、`--font-title-lg/md`、`--font-body-lg/md`、`--font-caption`、`--font-mono-size` | 语义字号 |
| 行高 | `--line-display/title/body/caption/mono` | 与字号配套 |
| 动效 | `--duration-instant/fast/base/slow/slower`、`--ease-standard/emphasized/in-out` | 统一过渡时长与曲线 |
| 层级 | `--z-base/raised/dropdown/sticky/fixed/overlay/modal/popover/toast/tooltip` | z-index 语义层 |
| 焦点 | `--focus-ring-width/offset/color/ring` | 统一键盘焦点环 |
| 图表 | `--chart-series-1 … --chart-series-8` | Nivo 主题消费 |

**兼容性**：旧变量 (`--accent` / `--border` / `--surface-*` / `--shadow-*` / `--radius-shell|card|pill|field`) 仍保留原值在 `index.css`，新旧并行、零回归。

## 组件清单

| 名称 | 目录 | 状态 |
|---|---|---|
| Button / ButtonLink / ButtonAnchor | `shared/button` | ✅ 已有 |
| TextInput / SelectInput / TextareaInput / CheckboxField / RadioGroupField / FormField | `shared/form` | ✅ 已有 |
| Table 全家桶 | `shared/table` | ✅ 已有 |
| Switch | `shared/switch` | ✅ 已有 |
| Chart（Nivo 主题） | `shared/chart` | ✅ 已有 |
| Overlay（Modal/Drawer） | `shared/overlay` | ✅ 已有（S6 复核） |
| Typography / Divider / Icon / Spinner / Skeleton | `shared/{typography,divider,icon,spinner,skeleton}` | 🕐 S2 |
| Card / Tag / Badge / EmptyState | `shared/{card,tag,badge,empty-state}` | 🕐 S3 |
| Breadcrumb / Pagination / Tabs / Steps | `shared/{breadcrumb,pagination,tabs,steps}` | 🕐 S4 |
| SearchInput / Checkbox / Radio / MultiSelect / Progress / Alert / CopyButton / KVList / Avatar | `shared/…` | 🕐 S5 |
| Tooltip / Popover / ScrollArea | `shared/{tooltip,popover,scroll-area}` | 🕐 S6 |

## A11y 契约（所有原语必须满足）

- role / ARIA attrs 明确
- 键盘可达 (Tab / Enter / Space / Arrow / Esc)
- 对比度 ≥ 4.5:1 (正文) / 3:1 (大字或图形)
- `prefers-reduced-motion` 下降级动画
- Modal / Drawer / Popover 焦点陷阱 + 归还

## 预览

开发服务器启动后访问 `/design-system` 查看当前 token 与原语的可视预览。

## 变更记录

每次 token / 原语变更写入 [`CHANGELOG.md`](./CHANGELOG.md)。
