# WeMail Brand System Design

**Date:** 2026-04-15

## Goal

把现有单个 `WemailLogo` 扩展为一整套可在产品与静态入口复用的 WeMail 品牌系统，包括 icon、wordmark、lockup、favicon 和 OG 资产。

## Decisions

- 正式命名统一为 `WeMail`。
- 视觉风格保持极简科技感，主骨架黑白，橙色仅做强调。
- 产品内复用 React 组件，静态入口通过 `public/brand` 下的 SVG 资产接入。
- landing、auth、workspace 三处品牌位统一使用同一套 lockup 语言，不再出现大小写和结构不一致。

## Asset Set

- `icon mark`: 信封 + `W` 折痕融合图形
- `wordmark`: `WeMail` 字标
- `lockup`: 图标 + 字标横版组合
- `favicon`: 适配浏览器标签的小尺寸图形
- `app icon`: 与 favicon 同源的独立入口图形
- `og-image`: 适配分享卡片的大尺寸 SVG

## Product Touchpoints

- `AppLayout` 顶栏品牌位
- `WemailLandingPage` 导航和页脚品牌位
- `AuthPage` 认证卡片顶部品牌位
- `apps/web/index.html` 的 favicon 与 social meta

## Verification

- 为 landing 与 auth 品牌位补回归断言。
- 运行 web `vitest / typecheck / eslint / build`。
