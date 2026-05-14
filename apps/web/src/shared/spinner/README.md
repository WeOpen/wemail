# 🌀 shared/spinner

共享加载指示器原语层。

## ✅ 放什么
- `Spinner`
- 统一尺寸、tone、默认中文加载文案
- decorative / status 两种语义模式
- reduced-motion 下的动画降级

## 🚫 不放什么
- 页面级 loading shell
- 复杂骨架屏布局
- 业务专属的“重试中 / 同步中 / 部署中”状态机

## 使用约定
- 默认 `Spinner` 带 `role="status"`，适合单点加载操作
- 仅作为按钮/图标内视觉反馈时传 `decorative`
- 需要显式展示文案时传 `showLabel`
