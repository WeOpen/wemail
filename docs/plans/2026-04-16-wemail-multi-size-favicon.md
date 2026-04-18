# WeMail Multi-Size Favicon and App Icon Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 为 WeMail 增补完整的多尺寸 favicon 与 app icon 资源，并接入 HTML 与 manifest 以覆盖浏览器、Apple touch icon、Android / PWA 场景。

**Architecture:** 在 `apps/web/public/brand` 下新增光栅 PNG / ICO 资产，同时保留现有 SVG 主图标。测试层先锁定文件存在、关键尺寸和 HTML/manifest 引用，再生成最终资源并更新入口文件。

**Tech Stack:** static SVG + PNG/ICO assets, Vitest, TypeScript

---

### Task 1: Lock multi-size icon support with tests

**Files:**
- Modify: `apps/web/src/test/brand-assets.test.ts`

**Step 1: Write the failing test**
- 断言 `index.html` 引用了 SVG favicon、PNG favicon、Apple touch icon 和 manifest。
- 断言 `site.webmanifest` 声明 192 / 512 PNG icons。
- 断言新增 PNG 文件存在且尺寸正确。

**Step 2: Run test to verify it fails**
Run: `pnpm --dir apps/web exec vitest run src/test/brand-assets.test.ts`
Expected: 因新增 PNG / ICO 资源和引用尚未存在而失败。

**Step 3: Write minimal implementation target**
- 固化文件名、目标尺寸和引用路径。

**Step 4: Run test to verify it passes**
Run: `pnpm --dir apps/web exec vitest run src/test/brand-assets.test.ts`
Expected: 待资源和入口接入后通过。

**Step 5: Commit**
- 本轮不提交，由当前会话统一交付。

### Task 2: Add raster icon assets and wire them in

**Files:**
- Modify/Create: `apps/web/public/brand/*`
- Modify: `apps/web/index.html`
- Modify: `apps/web/public/brand/site.webmanifest`

**Step 1: Write the failing test**
- 复用 Task 1 的 brand asset tests。

**Step 2: Run test to verify it fails**
Run: `pnpm --dir apps/web exec vitest run src/test/brand-assets.test.ts`
Expected: 文件或引用缺失。

**Step 3: Write minimal implementation**
- 生成 PNG / ICO 资源。
- 更新 `index.html` 的 favicon / apple-touch-icon / shortcut icon。
- 更新 `site.webmanifest` 的 PNG icons 列表。

**Step 4: Run test to verify it passes**
Run:
- `pnpm --dir apps/web exec vitest run src/test/brand-assets.test.ts`
- `pnpm --dir apps/web exec tsc -p tsconfig.json --noEmit`
- `git diff --check -- apps/web/index.html apps/web/public/brand/site.webmanifest apps/web/public/brand/favicon.svg apps/web/public/brand/favicon-16x16.png apps/web/public/brand/favicon-32x32.png apps/web/public/brand/favicon-48x48.png apps/web/public/brand/favicon.ico apps/web/public/brand/apple-touch-icon.png apps/web/public/brand/android-chrome-192x192.png apps/web/public/brand/android-chrome-512x512.png apps/web/src/test/brand-assets.test.ts`
Expected: brand asset tests pass, TS passes, diff clean.

**Step 5: Commit**
- 本轮不提交，由当前会话统一交付。