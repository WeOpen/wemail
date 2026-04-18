# WeMail Integration Settings Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 将 API 密钥、Webhook、Telegram 三个设置页面升级成统一的开发者自助接入界面。

**Architecture:** 在保留现有路由和 `useSettingsData` 汇总能力的前提下，把页面内容替换为独立设置页组件。API 密钥与 Telegram 继续连接现有接口，Webhook 先实现真实可浏览的界面骨架和说明卡。通过一组共享的设置页卡片样式保持视觉一致性。

**Tech Stack:** React 19, TypeScript, React Router, Vitest, CSS

---

### Task 1: Lock the new settings-page expectations with tests

**Files:**
- Modify: `apps/web/src/test/integration/settings-page.test.tsx`

**Step 1: Write the failing test**
- 为 `/api-keys` 断言新的快速开始/安全提示/reveal 文案。
- 为 `/webhook` 断言不再是旧 placeholder，而是包含事件订阅、签名说明、payload 示例。
- 为 `/telegram` 断言新的绑定说明、通知偏好、测试通知区块。

**Step 2: Run test to verify it fails**
Run: `pnpm --dir apps/web exec vitest run src/test/integration/settings-page.test.tsx`
Expected: 旧页面结构不满足新断言。

**Step 3: Write minimal implementation target**
- 明确三个页面必须出现的 heading / section / CTA。

**Step 4: Run test to verify it passes**
Run: `pnpm --dir apps/web exec vitest run src/test/integration/settings-page.test.tsx`
Expected: 新页面接入后通过。

**Step 5: Commit**
- 本轮不提交，由当前会话统一交付。

### Task 2: Build the API keys self-serve page

**Files:**
- Create: `apps/web/src/features/settings/ApiKeysPage.tsx`
- Modify: `apps/web/src/features/settings/useSettingsData.ts`
- Modify: `apps/web/src/app/AppRoutes.tsx`
- Modify: `apps/web/src/shared/styles/index.css`

**Step 1: Write the failing test**
- 复用 Task 1 中的 API 密钥断言。

**Step 2: Run test to verify it fails**
Run: `pnpm --dir apps/web exec vitest run src/test/integration/settings-page.test.tsx`
Expected: 找不到 reveal / quickstart / safety 区块。

**Step 3: Write minimal implementation**
- 创建独立 API 密钥页面组件。
- 让 `createApiKey` 返回 payload，页面内展示只显示一次的密钥 reveal 卡。
- 加入快速开始和安全说明侧栏。

**Step 4: Run test to verify it passes**
Run: `pnpm --dir apps/web exec vitest run src/test/integration/settings-page.test.tsx`
Expected: API 密钥页相关断言通过。

**Step 5: Commit**
- 本轮不提交，由当前会话统一交付。

### Task 3: Build the webhook and telegram interface pages

**Files:**
- Create: `apps/web/src/features/settings/WebhookPage.tsx`
- Create: `apps/web/src/features/settings/TelegramSettingsPage.tsx`
- Modify: `apps/web/src/app/AppRoutes.tsx`
- Modify: `apps/web/src/app/workspaceShell.ts`
- Modify: `apps/web/src/shared/styles/index.css`

**Step 1: Write the failing test**
- 复用 Task 1 中的 Webhook / Telegram 断言。

**Step 2: Run test to verify it fails**
Run: `pnpm --dir apps/web exec vitest run src/test/integration/settings-page.test.tsx`
Expected: 旧 Telegram panel 与 webhook placeholder 不能满足新结构。

**Step 3: Write minimal implementation**
- Webhook：实现信息架构、签名说明、事件订阅、payload 示例与日志空态。
- Telegram：实现绑定状态、Chat ID 表单、通知偏好、测试区与最近活动结构。
- 更新 workspace hero copy，让三个页面文案与新界面一致。

**Step 4: Run test to verify it passes**
Run: `pnpm --dir apps/web exec vitest run src/test/integration/settings-page.test.tsx`
Expected: 三页断言全部通过。

**Step 5: Commit**
- 本轮不提交，由当前会话统一交付。

### Task 4: Verify typing and integration hygiene

**Files:**
- Modify only if needed after implementation

**Step 1: Write the failing test**
- 若 workspace shell hero 或 route wiring 有问题，补一个 shell/unit 断言。

**Step 2: Run test to verify it fails**
Run: `pnpm --dir apps/web exec vitest run src/test/workspace-shell.test.ts src/test/integration/settings-page.test.tsx`

**Step 3: Write minimal implementation**
- 根据失败补齐 route labels、aria、文案或类型。

**Step 4: Run test to verify it passes**
Run:
- `pnpm --dir apps/web exec vitest run src/test/integration/settings-page.test.tsx src/test/workspace-shell.test.ts`
- `pnpm --dir apps/web exec tsc -p tsconfig.json --noEmit`
- `pnpm lint -- --filter web`
- `git diff --check -- apps/web/src/app/AppRoutes.tsx apps/web/src/app/workspaceShell.ts apps/web/src/features/settings apps/web/src/shared/styles/index.css docs/plans/2026-04-17-wemail-integration-settings-redesign-design.md docs/plans/2026-04-17-wemail-integration-settings-redesign.md`
Expected: 测试通过、类型通过、diff clean。

**Step 5: Commit**
- 本轮不提交，由当前会话统一交付。
