# WeMail Multi-Size Favicon and App Icon Design

**Date:** 2026-04-16

## Goal

为 WeMail 提供完整的多尺寸 favicon / app icon 资源，使桌面浏览器标签、Apple touch icon、Android / PWA 等不同设备入口都能加载到合适尺寸的品牌图标。

## Decisions

- 保留现有 `favicon.svg` 作为现代浏览器的矢量主入口。
- 补充光栅资源：`favicon-16x16.png`、`favicon-32x32.png`、`favicon-48x48.png`、`apple-touch-icon.png`、`android-chrome-192x192.png`、`android-chrome-512x512.png`、`favicon.ico`。
- `index.html` 同时声明 SVG favicon、PNG favicon、shortcut icon 和 Apple touch icon。
- `site.webmanifest` 使用 192 / 512 PNG，优先服务 Android / PWA 安装场景。
- 资源生成不引入新的项目依赖；使用本地可用工具生成并将成品提交到仓库。

## Asset Set

- `favicon.svg`：现代浏览器主图标
- `favicon-16x16.png`：最小标签页回退
- `favicon-32x32.png`：常见桌面浏览器标签页
- `favicon-48x48.png`：较高 DPI / 某些平台回退
- `favicon.ico`：传统浏览器 / Windows 兼容入口
- `apple-touch-icon.png`：180x180，iOS / iPadOS 主屏图标
- `android-chrome-192x192.png`：PWA / Android 中等尺寸
- `android-chrome-512x512.png`：PWA / Android 大尺寸

## Verification

- 为 brand assets 测试增加对 PNG 文件存在、PNG 维度和 HTML/manifest 引用的断言。
- 跑 web `tsc --noEmit`。
- 保持现有 `brand-assets.test.ts` 继续通过，避免打破 logo 主资产。