# WeMail Brand System Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 为 WeMail 产出并接入完整品牌套件，包括 React 品牌组件、静态 SVG 资产、favicon 和 OG 分享图。

**Architecture:** 组件层用共享 SVG 组件统一产品内品牌展示，静态层通过 `apps/web/public/brand` 提供可直接被 Vite 和 HTML 消费的品牌文件。先用 app 测试锁定 landing/auth/workspace 的品牌位，再补静态资产和入口 meta，最后统一做 web 验证。

**Tech Stack:** React 19, TypeScript, Vite, Vitest, static SVG assets

---

### Task 1: 锁定品牌位回归

**Files:**
- Modify: `apps/web/src/test/app.test.tsx`

**Step 1: Write the failing test**

- landing 导航需要渲染 `WeMail brand lockup`
- auth 卡片需要渲染 `WeMail auth brand`

**Step 2: Run test to verify it fails**

Run: `..\..\node_modules\.bin\vitest.cmd run src/test/app.test.tsx`

**Step 3: Write minimal implementation**

- 新增 lockup/wordmark 组件并在 landing、auth、workspace 接入

**Step 4: Run test to verify it passes**

Run: `..\..\node_modules\.bin\vitest.cmd run src/test/app.test.tsx`

**Step 5: Commit**

- 本轮不提交，由当前会话统一交付。

### Task 2: 补完整态品牌资产

**Files:**
- Create: `apps/web/public/brand/*`
- Modify: `apps/web/index.html`

**Step 1: Write the failing test**

- 复用 Task 1 的品牌位测试作为主回归；静态资产靠构建验证。

**Step 2: Run test to verify it fails**

Run: `..\..\node_modules\.bin\vitest.cmd run src/test/app.test.tsx`

**Step 3: Write minimal implementation**

- 创建 `icon.svg`、`wordmark.svg`、`lockup.svg`、`favicon.svg`、`app-icon.svg`、`og-image.svg`、`site.webmanifest`
- 在 `index.html` 接 favicon、theme-color、OG/Twitter meta

**Step 4: Run test to verify it passes**

Run:
- `..\..\node_modules\.bin\vitest.cmd run src/test/app.test.tsx`
- `..\..\node_modules\.bin\tsc.cmd -p tsconfig.json --noEmit`
- `..\..\node_modules\.bin\eslint.cmd src`
- `..\..\node_modules\.bin\vite.cmd build`

**Step 5: Commit**

- 本轮不提交，由当前会话统一交付。
