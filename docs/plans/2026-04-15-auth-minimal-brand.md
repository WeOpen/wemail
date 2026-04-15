# Auth Minimal Brand Header Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 将登录/注册页改为仅保留居中品牌头、tabs 和表单字段的极简认证卡片。

**Architecture:** 认证页顶部改用单独的垂直品牌头，复用现有 logo/wordmark 组件但不再使用横向 lockup。表单层移除所有标题型文本，只保留错误条、输入项和提交按钮，确保 mode 切换只体现在 tab 和字段集合上。

**Tech Stack:** React 19, TypeScript, Vitest, CSS

---

### Task 1: 锁定极简认证结果

**Files:**
- Modify: `apps/web/src/test/app.test.tsx`

**Step 1: Write the failing test**

- 断言 auth 页渲染 `WeMail auth brand`
- 断言 `登录到 WeMail`、`创建你的工作台账号`、`账号登录`、说明文案不再出现

**Step 2: Run test to verify it fails**

Run: `..\..\node_modules\.bin\vitest.cmd run src/test/app.test.tsx`

**Step 3: Write minimal implementation**

- 修改 `AuthPage.tsx` 与 `AuthForms.tsx`
- 调整认证页 CSS

**Step 4: Run test to verify it passes**

Run: `..\..\node_modules\.bin\vitest.cmd run src/test/app.test.tsx`

**Step 5: Commit**

- 本轮不提交，由当前会话统一交付。
