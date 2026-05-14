# 🎖️ shared/badge

共享状态徽标原语层。

## ✅ 放什么
- `Badge`
- 启用/停用、审核、风险、运行状态等 status 语义展示
- `variant / appearance / size` 的统一视觉分层
- 可选 `statusRole="status"`，用于需要被屏幕阅读器感知的即时状态

## 🚫 不放什么
- 分类归档、主题标签、来源标记
- 可选择 chip 或筛选器按钮
- 包含复杂图标布局的业务状态卡

## 状态约定
- `variant`: `neutral` / `brand` / `info` / `success` / `warning` / `danger`
- `appearance`: `soft` / `solid`
- `size`: `sm` / `md`
- `statusRole`: `none` / `status`

## 使用约定
- `Badge` 固定输出 `data-usage="status"`，明确其状态用途
- 默认不启用 live region，只有动态状态反馈场景才传 `statusRole="status"`
- 如果内容表达的是分类或归属，不要用 `Badge`，改用 `shared/tag`
- 样式文件位于 `shared/badge/badge.css`，后续统一由样式 barrel 接入
