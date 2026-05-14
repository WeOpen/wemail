# 🏷️ shared/tag

共享分类标签原语层。

## ✅ 放什么
- `Tag`
- 分类、来源、主题、能力维度等 category 语义标签
- `variant / shape / size / dot / icon` 的统一视觉约定
- 适合列表筛选说明、邮件类型、资源归类等弱状态信息

## 🚫 不放什么
- 实时运行状态或告警状态展示
- 需要 live region 的异步反馈
- 可关闭 / 可编辑 tag 输入器

## 状态约定
- `variant`: `neutral` / `brand` / `info` / `success` / `warning` / `danger`
- `shape`: `rounded` / `pill`
- `size`: `sm` / `md`
- `dot`: 渲染前导色点
- `icon`: 渲染前导图标槽位

## 使用约定
- `Tag` 固定输出 `data-usage="category"`，用于强调“分类而非状态”
- 如果内容表达的是系统状态、审核状态、启用状态，优先使用 `shared/badge`
- 样式文件位于 `shared/tag/tag.css`，后续统一由样式 barrel 接入
