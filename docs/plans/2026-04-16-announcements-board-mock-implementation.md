# Announcements Board Mock Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 把 `/announcements` 从占位页替换成一个正式后台型 mock 公告看板。

**Architecture:** 新增独立 `AnnouncementsPage` 和 `announcementsMockData`，用静态数据拼出控制条、置顶公告、时间线、状态概览和维护窗口。保持现有 workspace 壳层、左侧菜单、顶部标题逻辑不变，不引入新依赖。

**Tech Stack:** React 19, TypeScript, Vitest, Playwright, CSS

---

### Task 1: 锁定公告看板页面目标

**Files:**
- Create: `apps/web/src/test/integration/announcements-page.test.tsx`
- Modify: `apps/web/e2e/smoke.spec.ts`

**Step 1: Write the failing test**

- 集成测试断言 `/announcements` 渲染：
  - 控制条
  - 置顶公告主卡
  - 最近公告
  - 状态概览
  - 近期维护窗口
- e2e smoke 补 `/announcements` 的已登录访问断言

**Step 2: Run test to verify it fails**

Run: `pnpm test:web`
Expected: FAIL，因为当前 `/announcements` 仍是占位页

**Step 3: Write minimal implementation**

- 暂不实现页面，只让测试锁定目标文案和区域

**Step 4: Run test to verify it passes**

Run: `pnpm test:web`
Expected: 仍失败，等待后续实现

**Step 5: Commit**

- 本轮不单独提交，由当前会话统一交付

### Task 2: 搭建公告页 mock 数据与页面骨架

**Files:**
- Create: `apps/web/src/features/announcements/announcementsMockData.ts`
- Create: `apps/web/src/pages/AnnouncementsPage.tsx`
- Modify: `apps/web/src/app/AppRoutes.tsx`

**Step 1: Write the failing test**

- 复用 Task 1 的失败测试

**Step 2: Run test to verify it fails**

Run: `pnpm test:web`
Expected: FAIL，公告页核心区域仍不存在

**Step 3: Write minimal implementation**

- 新建 mock 数据文件，包含：
  - 置顶公告
  - 公告列表
  - 状态概览
  - 维护窗口
  - 筛选项
- 新建 `AnnouncementsPage.tsx`
- 在 `AppRoutes.tsx` 中用新页面替换公告占位页

**Step 4: Run test to verify it passes**

Run: `pnpm test:web`
Expected: PASS，公告页集成测试通过

**Step 5: Commit**

- 本轮不单独提交，由当前会话统一交付

### Task 3: 完成正式后台型看板布局与样式

**Files:**
- Modify: `apps/web/src/shared/styles/index.css`
- Modify: `apps/web/src/pages/AnnouncementsPage.tsx`
- Modify if needed: `apps/web/src/app/workspaceShell.ts`

**Step 1: Write the failing test**

- 在现有公告页测试基础上补更具体的结构断言：
  - 置顶公告卡
  - 左侧时间线
  - 右侧状态概览与维护窗口

**Step 2: Run test to verify it fails**

Run: `pnpm test:web`
Expected: FAIL，结构或文案未完全匹配

**Step 3: Write minimal implementation**

- 完成正式后台型布局：
  - 顶部控制条
  - 置顶公告主卡
  - 左主右辅双栏结构
- 控制条先只做静态 UI，不实现真实筛选
- 保持主题兼容与后台统一样式语言

**Step 4: Run test to verify it passes**

Run: `pnpm test:web`
Expected: PASS

**Step 5: Commit**

- 本轮不单独提交，由当前会话统一交付

### Task 4: 完整验证

**Files:**
- Modify if needed: `apps/web/e2e/smoke.spec.ts`

**Step 1: Run targeted verification**

Run: `pnpm test:web`
Expected: PASS

**Step 2: Run e2e verification**

Run: `pnpm test:e2e`
Expected: PASS

**Step 3: Run project verification**

Run: `pnpm lint && pnpm typecheck && pnpm build`
Expected: PASS

**Step 4: Final review**

- 检查没有残留公告占位文案
- 检查控制条、置顶主卡、列表、辅助区结构清晰
- 检查 mock 数据字段命名清晰且彼此一致

**Step 5: Commit**

- 使用 Lore protocol 统一提交
