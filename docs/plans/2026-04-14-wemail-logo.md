# WeMail Logo Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 为 WeMail 添加一个信封与 `W` 折痕融合的极简 SVG logo，并接入当前工作台顶栏品牌位。

**Architecture:** 新 logo 作为可复用 React SVG 组件落在 `apps/web/src/shared/`，由 `AppLayout` 品牌位直接引用。先用测试锁定品牌位渲染结果，再做最小实现与样式接入，避免只停留在资产创建而没有真实使用。

**Tech Stack:** React 19, TypeScript, Vitest, inline SVG

---

### Task 1: 锁定品牌位 logo 渲染结果

**Files:**
- Modify: `apps/web/src/test/app.test.tsx`

**Step 1: Write the failing test**

- 在已登录工作台测试里新增断言，要求品牌区域渲染 `WeMail logo`。

**Step 2: Run test to verify it fails**

Run: `..\..\node_modules\.bin\vitest.cmd run src/test/app.test.tsx`

**Step 3: Write minimal implementation**

- 新增 `WemailLogo` SVG 组件。
- 在 `AppLayout.tsx` 中替换当前 `Mail` 图标。

**Step 4: Run test to verify it passes**

Run: `..\..\node_modules\.bin\vitest.cmd run src/test/app.test.tsx`

**Step 5: Commit**

- 本轮不提交，由当前会话统一交付。

### Task 2: 调整样式并完成验证

**Files:**
- Create: `apps/web/src/shared/WemailLogo.tsx`
- Modify: `apps/web/src/app/AppLayout.tsx`
- Modify: `apps/web/src/shared/styles/index.css`

**Step 1: Write the failing test**

- 复用 Task 1 的回归断言。

**Step 2: Run test to verify it fails**

Run: `..\..\node_modules\.bin\vitest.cmd run src/test/app.test.tsx`

**Step 3: Write minimal implementation**

- 调整品牌位样式，让 SVG 在现有品牌底板中清晰显示。

**Step 4: Run test to verify it passes**

Run:
- `..\..\node_modules\.bin\vitest.cmd run src/test/app.test.tsx`
- `..\..\node_modules\.bin\tsc.cmd -p tsconfig.json --noEmit`
- `..\..\node_modules\.bin\eslint.cmd src`
- `..\..\node_modules\.bin\vite.cmd build`

**Step 5: Commit**

- 本轮不提交，由当前会话统一交付。
