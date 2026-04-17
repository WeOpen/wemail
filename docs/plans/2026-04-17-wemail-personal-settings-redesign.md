# WeMail Personal Settings Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 将 `/system/profile` 重做为苹果式单列个人设置页，并提供第一版可直接编辑的资料与偏好控件。

**Architecture:** 新增 `SystemProfilePage` 页面组件替换旧 `WorkspacePlaceholderPage` 路由内容。页面内部使用本地受控表单组织三组卡片：资料、偏好、安全。第一版重点完成交互结构和状态管理，不伪造尚无后端支持的持久化动作。

**Tech Stack:** React 19, TypeScript, React Router, Vitest, CSS

---

### Task 1: Lock the personal settings route behavior with tests

**Files:**
- Create: `apps/web/src/test/system-profile-page.test.tsx`

**Step 1: Write the failing test**
- 断言 `/system/profile` 不再显示旧占位标题。
- 断言存在三组卡片：账号资料、使用偏好、安全与会话。
- 断言显示名输入、语言/时区控件、修改密码按钮存在。

**Step 2: Run test to verify it fails**
Run: `pnpm --dir apps/web exec vitest run src/test/system-profile-page.test.tsx`
Expected: 当前还是 placeholder，断言失败。

**Step 3: Write minimal implementation target**
- 明确主要标题与关键控件的测试目标。

**Step 4: Run test to verify it passes**
Run: `pnpm --dir apps/web exec vitest run src/test/system-profile-page.test.tsx`
Expected: 待新页面接入后通过。

**Step 5: Commit**
- 本轮不提交，由当前会话统一交付。

### Task 2: Build the single-column editable profile page

**Files:**
- Create: `apps/web/src/pages/SystemProfilePage.tsx`
- Modify: `apps/web/src/app/AppRoutes.tsx`
- Modify: `apps/web/src/shared/styles/index.css`

**Step 1: Write the failing test**
- 复用 Task 1 的页面测试。

**Step 2: Run test to verify it fails**
Run: `pnpm --dir apps/web exec vitest run src/test/system-profile-page.test.tsx`
Expected: placeholder 路由不满足新页面结构。

**Step 3: Write minimal implementation**
- 新增单列个人设置页，包含资料卡、偏好卡、安全卡。
- 资料卡使用受控输入；偏好卡使用简单下拉/切换；安全卡使用语义按钮。
- 将 `/system/profile` 路由替换为新页面。

**Step 4: Run test to verify it passes**
Run: `pnpm --dir apps/web exec vitest run src/test/system-profile-page.test.tsx`
Expected: 页面结构和控件全部满足。

**Step 5: Commit**
- 本轮不提交，由当前会话统一交付。

### Task 3: Verify integration and typing

**Files:**
- Modify only if needed after implementation

**Step 1: Write the failing test**
- 若需要，再补一个 settings route 级别集成测试，验证顶部二级菜单切换到个人设置后进入新页面。

**Step 2: Run test to verify it fails**
Run: `pnpm --dir apps/web exec vitest run src/test/system-profile-page.test.tsx`

**Step 3: Write minimal implementation**
- 根据失败补齐路由或 aria 标记。

**Step 4: Run test to verify it passes**
Run:
- `pnpm --dir apps/web exec vitest run src/test/system-profile-page.test.tsx`
- `pnpm --dir apps/web exec tsc -p tsconfig.json --noEmit`
- `git diff --check -- apps/web/src/pages/SystemProfilePage.tsx apps/web/src/app/AppRoutes.tsx apps/web/src/shared/styles/index.css apps/web/src/test/system-profile-page.test.tsx`
Expected: 测试通过、类型通过、diff clean。

**Step 5: Commit**
- 本轮不提交，由当前会话统一交付。