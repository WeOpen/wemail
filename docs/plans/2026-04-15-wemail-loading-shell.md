# WeMail Loading Shell Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 用统一的 WeMail 品牌动效 loading shell 替换当前全页文字加载占位，并让后续系统级 loading 复用同一组件。

**Architecture:** 在 `apps/web/src/shared/` 中新增一个共享 loading shell，内部复用现有品牌图标语言并通过 CSS keyframes 实现印章呼吸、M 章纹脉冲与弱光晕。先用测试锁定 `App.tsx` 的 loading 分支，再做最小实现与样式接入，最后做类型/结构/浏览器验证。

**Tech Stack:** React 19, TypeScript, Vite, Vitest, CSS keyframes

---

### Task 1: Lock the full-page loading branch

**Files:**
- Modify: `apps/web/src/test/app.test.tsx`

**Step 1: Write the failing test**
- 新增一个测试，让 `/auth/session` 请求保持 pending。
- 断言 App 渲染统一 loading shell，而不是旧的 `panel shimmer` 文案块。
- 断言存在品牌 loading 文案、`aria-busy="true"`、品牌图标容器。

**Step 2: Run test to verify it fails**
Run: `npx tsc --noEmit --project apps/web/tsconfig.json`
Expected: 类型仍通过；行为测试在当前实现下无法满足新断言。

**Step 3: Write minimal implementation**
- 暂不写业务逻辑；先明确测试目标文案和语义属性。

**Step 4: Run test to verify it passes**
Run: `npx tsc --noEmit --project apps/web/tsconfig.json`
Expected: 测试文件无类型错误，等待后续实现通过完整断言。

**Step 5: Commit**
- 本轮不提交，由当前会话统一交付。

### Task 2: Build the shared animated loading shell

**Files:**
- Create: `apps/web/src/shared/WemailLoadingShell.tsx`
- Modify: `apps/web/src/shared/styles/index.css`

**Step 1: Write the failing test**
- 复用 Task 1 的新 loading 断言，要求出现新的品牌化容器与图标类名。

**Step 2: Run test to verify it fails**
Run: `npx tsc --noEmit --project apps/web/tsconfig.json`
Expected: 新组件尚未实现时断言目标不存在。

**Step 3: Write minimal implementation**
- 新增 `WemailLoadingShell`，输出全页容器、品牌图标、标题文案和辅助状态属性。
- 使用现有 `WemailLogo` 作为图形基础。
- 在样式中加入 loading shell 布局、印章呼吸、M 章纹脉冲、光晕、reduced-motion 降级。

**Step 4: Run test to verify it passes**
Run: `npx tsc --noEmit --project apps/web/tsconfig.json`
Expected: 组件和样式接入后类型通过。

**Step 5: Commit**
- 本轮不提交，由当前会话统一交付。

### Task 3: Wire the shell into the app entrypoint

**Files:**
- Modify: `apps/web/src/app/App.tsx`

**Step 1: Write the failing test**
- 继续使用 Task 1 的 loading 分支测试，要求 `App.tsx` 在 `auth.loadingSession` 时渲染共享 loading shell。

**Step 2: Run test to verify it fails**
Run: `npx tsc --noEmit --project apps/web/tsconfig.json`
Expected: 旧 `panel shimmer` 尚未替换时，目标 loading shell 不存在。

**Step 3: Write minimal implementation**
- 用 `WemailLoadingShell` 替换 `auth.loadingSession` 分支里的旧占位。
- 删除无用的 `.shimmer` 依赖，保留样式表整洁。

**Step 4: Run test to verify it passes**
Run:
- `npx tsc --noEmit --project apps/web/tsconfig.json`
- `git diff --check -- apps/web/src/app/App.tsx apps/web/src/shared/WemailLoadingShell.tsx apps/web/src/shared/styles/index.css apps/web/src/test/app.test.tsx`
Expected: 类型通过，diff 无格式错误。

**Step 5: Commit**
- 本轮不提交，由当前会话统一交付。
