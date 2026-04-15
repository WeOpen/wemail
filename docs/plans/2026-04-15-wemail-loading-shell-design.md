# WeMail Loading Shell Design

**Date:** 2026-04-15

## Goal

为 WeMail 设计一个统一的品牌化全页 loading shell，用动画版信封图标替换当前文案式加载占位，并为后续所有系统级 loading 复用同一套视觉语言。

## Decisions

- 动效方向采用方案 A：`印章呼吸 + M 章纹轻微脉冲`。
- 不引入新依赖；动画全部使用 React + CSS keyframes + 现有主题变量实现。
- loading shell 作为共享组件放在 `apps/web/src/shared/`，先接入 `App.tsx` 的 `auth.loadingSession` 分支，作为系统级全页 loading 的统一入口。
- 默认保持克制：信封主体稳定、圆章轻微缩放、章纹与光晕只做低强度呼吸，不旋转、不跳动。
- 必须支持 `prefers-reduced-motion: reduce`，在减弱动态偏好下自动降级为静态品牌图标。

## Visual System

- 图标核心：现有 WeMail 信封 + 橙色折痕 + 圆形印章 + 线性 M 章纹。
- 动效层次：
  - 印章做 1.00 → 1.06 → 1.00 的缓慢呼吸。
  - M 章纹做轻微 opacity / stroke-emphasis 脉冲。
  - 外围光晕使用低强度橙色 radial glow，与印章呼吸同步。
- 文案层：图标下方保留简洁系统文案，例如 `Preparing WeMail`，避免嘈杂提示语。
- 容器层：延续当前 `--page-gradient`，卡片式承载，视觉上与 auth/workspace 品牌系统统一。

## Component Shape

- `WemailLoadingGlyph`: 动态品牌图标，只负责 SVG 与动效钩子类名。
- `WemailLoadingShell`: 全页 loading 容器，负责布局、文案、辅助无障碍属性。
- `App.tsx`: 用 `WemailLoadingShell` 替换当前 `.panel.shimmer` 文案块。

## Accessibility

- 容器使用 `role="status"` + `aria-busy="true"`。
- 屏幕阅读器可读文案固定输出，不依赖纯视觉动画。
- `prefers-reduced-motion: reduce` 时关闭缩放/脉冲/光晕动画。

## Verification

- 在 `apps/web/src/test/app.test.tsx` 增加全页 loading 分支回归测试。
- 若单独抽出组件，则为 loading shell 增加结构测试（品牌图标、文案、busy 状态）。
- 运行 web TypeScript diagnostics，并做一次本地 gallery / 浏览器预览确认视觉节奏。
