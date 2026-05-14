# 🗂️ shared/empty-state

共享空状态原语层。

## ✅ 放什么
- `EmptyState`
- `icon / title / description / actions` 的标准组合
- 默认、错误、无权限等占位反馈
- 无数据页、空列表、空详情、权限拦截等场景的统一布局

## 🚫 不放什么
- 页面级导航或营销文案布局
- 带表单输入的复杂 onboarding
- 业务专属插图选择逻辑

## 状态约定
- `variant`: `default` / `error` / `no-access`
- `title`: 必填，作为区域主标题并驱动 `aria-labelledby`
- `description`: 可选，映射到 `aria-describedby`
- `actions`: 可选，放置主次 CTA
- `icon`: 可选，承载图标或轻量插图

## 使用约定
- `EmptyState` 默认输出 `role="region"`，便于空状态区块被辅助技术识别
- `variant="error"` 用于失败反馈，`variant="no-access"` 用于权限不足，不要混用
- 操作按钮由页面层传入，原语只负责布局和语义挂接
- 样式文件位于 `shared/empty-state/empty-state.css`，后续统一由样式 barrel 接入
