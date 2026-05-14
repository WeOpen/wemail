# Design System Component Docsite Sidebar Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 把 `/design-system` 改造成后台风格左侧组件目录 + 右侧组件详情文档站，去掉所有分组概览入口，并为当前目录中的所有组件补齐“真实示例 + API 表 + 使用说明”。

**Architecture:** 左侧仅保留分组标题和组件项，视觉风格对齐管理后台左侧栏，但不复用业务导航语义。右侧统一使用组件文档模板，按“标题区 → 真实示例 → API 表 → 使用说明 → 规范说明”渲染；所有组件内容从独立 schema 文件读取，页面层只负责目录状态与路由编排。

**Tech Stack:** React 19, TypeScript, Vitest, Testing Library, Playwright, 现有 shared primitives（Button / Card / Form / Tabs / Tooltip / Overlay 等）

---

### Task 1: 重构左侧目录为后台风格组件目录

**Files:**
- Modify: `apps/web/src/pages/DesignSystemPage.tsx`
- Modify: `apps/web/src/pages/design-system/designSystemStyles.ts`
- Test: `apps/web/src/test/design-system-page.test.tsx`

**Step 1: Write the failing test**

在 `apps/web/src/test/design-system-page.test.tsx` 增加断言：
- 左侧仍按分组展示
- 但不存在任何“概览”按钮
- 左侧每组下直接显示组件项，例如 `Button`、`Card`、`SearchInput`

```tsx
it("renders sidebar groups with component items only and no overview entries", () => {
  render(
    <MemoryRouter>
      <DesignSystemPage />
    </MemoryRouter>
  );

  const sidebar = screen.getByRole("navigation", { name: "Design system sidebar" });
  expect(within(sidebar).queryByRole("button", { name: /概览/i })).not.toBeInTheDocument();
  expect(within(sidebar).getByRole("button", { name: "Button" })).toBeInTheDocument();
  expect(within(sidebar).getByRole("button", { name: "Card" })).toBeInTheDocument();
  expect(within(sidebar).getByRole("button", { name: "SearchInput" })).toBeInTheDocument();
});
```

**Step 2: Run test to verify it fails**

Run:
```bash
pnpm --dir apps/web exec vitest run src/test/design-system-page.test.tsx -t "renders sidebar groups with component items only and no overview entries"
```
Expected: FAIL，因为当前侧栏仍有 overview 入口。

**Step 3: Write minimal implementation**

- `DesignSystemPage.tsx`
  - 去掉 group overview 入口
  - 左侧改成“分组标题 + 组件项”目录
  - 默认选中第一个组件而不是分组概览
- `designSystemStyles.ts`
  - 调整左侧样式，使其更接近后台左栏：
    - 分组标题
    - 当前项高亮
    - 紧凑目录节奏
    - sticky 行为保留

**Step 4: Run test to verify it passes**

Run:
```bash
pnpm --dir apps/web exec vitest run src/test/design-system-page.test.tsx -t "renders sidebar groups with component items only and no overview entries"
```
Expected: PASS

**Step 5: Commit**

```bash
git add apps/web/src/pages/DesignSystemPage.tsx apps/web/src/pages/design-system/designSystemStyles.ts apps/web/src/test/design-system-page.test.tsx
git commit -m "feat: switch design system sidebar to component-only navigation"
```

---

### Task 2: 统一组件详情模板为“示例优先”阅读流

**Files:**
- Modify: `apps/web/src/pages/design-system/DesignSystemDocContent.tsx`
- Modify: `apps/web/src/pages/design-system/designSystemStyles.ts`
- Test: `apps/web/src/test/design-system-page.test.tsx`

**Step 1: Write the failing test**

增加断言：点击 `Button` 后，右侧文档必须先出现“真实示例”，再出现 “API 接口”，再出现“使用说明”。

```tsx
it("renders component docs with examples first, then API, then usage guidance", () => {
  render(
    <MemoryRouter>
      <DesignSystemPage />
    </MemoryRouter>
  );

  fireEvent.click(screen.getByRole("button", { name: "Button" }));

  const headings = screen.getAllByRole("heading").map((node) => node.textContent);
  const expected = ["真实示例", "API 接口", "使用说明"];
  const indexes = expected.map((heading) => headings.indexOf(heading));

  expect(indexes.every((index) => index >= 0)).toBe(true);
  expect(indexes).toEqual([...indexes].sort((a, b) => a - b));
});
```

**Step 2: Run test to verify it fails**

Run:
```bash
pnpm --dir apps/web exec vitest run src/test/design-system-page.test.tsx -t "renders component docs with examples first, then API, then usage guidance"
```
Expected: FAIL

**Step 3: Write minimal implementation**

- `DesignSystemDocContent.tsx`
  - 去掉 group overview 模式
  - 统一所有组件页的顺序：
    1. 标题区
    2. 真实示例
    3. API 接口
    4. 使用说明
    5. 设计规范 / 补充说明
- `designSystemStyles.ts`
  - 强化文档段落和 API 表块的层级

**Step 4: Run test to verify it passes**

Run:
```bash
pnpm --dir apps/web exec vitest run src/test/design-system-page.test.tsx -t "renders component docs with examples first, then API, then usage guidance"
```
Expected: PASS

**Step 5: Commit**

```bash
git add apps/web/src/pages/design-system/DesignSystemDocContent.tsx apps/web/src/pages/design-system/designSystemStyles.ts apps/web/src/test/design-system-page.test.tsx
git commit -m "feat: align component docs to example-first reading flow"
```

---

### Task 3: 扩展文档 schema 支持 API 表

**Files:**
- Modify: `apps/web/src/pages/design-system/designSystemContent.tsx`
- Modify: `apps/web/src/pages/design-system/DesignSystemDocContent.tsx`
- Test: `apps/web/src/test/design-system-page.test.tsx`

**Step 1: Write the failing test**

增加断言：选中 `Button` 后，页面出现 API 表头 `prop / type / default / description`。

```tsx
it("renders a structured API table for a component", () => {
  render(
    <MemoryRouter>
      <DesignSystemPage />
    </MemoryRouter>
  );

  fireEvent.click(screen.getByRole("button", { name: "Button" }));

  expect(screen.getByText("prop")).toBeInTheDocument();
  expect(screen.getByText("type")).toBeInTheDocument();
  expect(screen.getByText("default")).toBeInTheDocument();
  expect(screen.getByText("description")).toBeInTheDocument();
});
```

**Step 2: Run test to verify it fails**

Run:
```bash
pnpm --dir apps/web exec vitest run src/test/design-system-page.test.tsx -t "renders a structured API table for a component"
```
Expected: FAIL

**Step 3: Write minimal implementation**

在 `designSystemContent.tsx` 扩展 schema：
- `DesignSystemApiField`
- `api` 字段

```ts
interface DesignSystemApiField {
  prop: string;
  type: string;
  defaultValue: string;
  description: string;
}
```

然后在 `DesignSystemDocContent.tsx` 中渲染 API 表。

**Step 4: Run test to verify it passes**

Run:
```bash
pnpm --dir apps/web exec vitest run src/test/design-system-page.test.tsx -t "renders a structured API table for a component"
```
Expected: PASS

**Step 5: Commit**

```bash
git add apps/web/src/pages/design-system/designSystemContent.tsx apps/web/src/pages/design-system/DesignSystemDocContent.tsx apps/web/src/test/design-system-page.test.tsx
git commit -m "feat: add API tables to design system docs"
```

---

### Task 4: 为当前目录中的所有组件补齐完整页内容

**Files:**
- Modify: `apps/web/src/pages/design-system/designSystemContent.tsx`
- Test: `apps/web/src/test/app.test.tsx`
- Test: `apps/web/src/test/design-system-page.test.tsx`

**Step 1: Write the failing test**

增加断言：当前目录中的所有组件都必须能进入详情页，并显示至少 3 个块：
- 真实示例
- API 接口
- 使用说明

```tsx
it("renders complete docs for every component listed in the sidebar", () => {
  render(
    <MemoryRouter>
      <DesignSystemPage />
    </MemoryRouter>
  );

  const componentNames = [
    "Design tokens",
    "PageLayout",
    "Typography",
    "Button",
    "Card",
    "Data display",
    "SearchInput",
    "MultiSelect",
    "Selection controls",
    "Navigation",
    "Feedback",
    "Overlay",
    "Tooltip & Popover",
    "Copy utility"
  ];

  for (const name of componentNames) {
    fireEvent.click(screen.getByRole("button", { name }));
    expect(screen.getByRole("heading", { name: "真实示例" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "API 接口" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "使用说明" })).toBeInTheDocument();
  }
});
```

**Step 2: Run test to verify it fails**

Run:
```bash
pnpm --dir apps/web exec vitest run src/test/design-system-page.test.tsx -t "renders complete docs for every component listed in the sidebar"
```
Expected: FAIL

**Step 3: Write minimal implementation**

把当前目录里的所有组件文档补到同一标准：
- Design tokens
- PageLayout
- Typography
- Button
- Card
- Data display
- SearchInput
- MultiSelect
- Selection controls
- Navigation
- Feedback
- Overlay
- Tooltip & Popover
- Copy utility

每个都至少补齐：
- `summary`
- `examples`
- `api`
- `usage`
- `notes`

优先复用当前已有 preview 与文案，避免重写 demo。

**Step 4: Run test to verify it passes**

Run:
```bash
pnpm --dir apps/web exec vitest run src/test/design-system-page.test.tsx -t "renders complete docs for every component listed in the sidebar"
```
Expected: PASS

**Step 5: Commit**

```bash
git add apps/web/src/pages/design-system/designSystemContent.tsx apps/web/src/test/design-system-page.test.tsx apps/web/src/test/app.test.tsx
git commit -m "feat: complete doc pages for all design system components"
```

---

### Task 5: 调整桌面与移动端的目录/详情体验

**Files:**
- Modify: `apps/web/src/pages/DesignSystemPage.tsx`
- Modify: `apps/web/src/pages/design-system/designSystemStyles.ts`
- Test: `apps/web/src/test/design-system-page.test.tsx`

**Step 1: Write the failing test**

增加断言：
- 默认进入第一个组件详情，而不是 overview
- 移动端仍保持单列，不溢出

```tsx
it("defaults to the first component detail instead of a group overview", () => {
  render(
    <MemoryRouter>
      <DesignSystemPage />
    </MemoryRouter>
  );

  expect(screen.getByRole("heading", { name: "Design tokens" })).toBeInTheDocument();
  expect(screen.queryByRole("button", { name: /概览/i })).not.toBeInTheDocument();
});
```

**Step 2: Run test to verify it fails**

Run:
```bash
pnpm --dir apps/web exec vitest run src/test/design-system-page.test.tsx -t "defaults to the first component detail instead of a group overview"
```
Expected: FAIL

**Step 3: Write minimal implementation**

- 默认选中第一个组件详情
- 左侧保持后台风格目录
- 桌面端目录宽度、sticky 行为、当前项高亮稳定
- 移动端继续保持单列 layout

**Step 4: Run test to verify it passes**

Run:
```bash
pnpm --dir apps/web exec vitest run src/test/design-system-page.test.tsx -t "defaults to the first component detail instead of a group overview"
```
Expected: PASS

**Step 5: Commit**

```bash
git add apps/web/src/pages/DesignSystemPage.tsx apps/web/src/pages/design-system/designSystemStyles.ts apps/web/src/test/design-system-page.test.tsx
git commit -m "feat: polish component-doc navigation experience"
```

---

### Task 6: 最终验证与代码审查

**Files:**
- Review only: `apps/web/src/pages/DesignSystemPage.tsx`
- Review only: `apps/web/src/pages/design-system/designSystemContent.tsx`
- Review only: `apps/web/src/pages/design-system/DesignSystemDocContent.tsx`
- Review only: `apps/web/src/pages/design-system/designSystemStyles.ts`
- Test: `apps/web/src/test/app.test.tsx`
- Test: `apps/web/src/test/design-system-page.test.tsx`
- Test: `apps/web/e2e/design-system.spec.ts`

**Step 1: Run targeted unit tests**

Run:
```bash
pnpm --dir apps/web exec vitest run src/test/app.test.tsx src/test/design-system-page.test.tsx src/test/shared-form.test.tsx src/test/shared-overlay.test.tsx
```
Expected: PASS

**Step 2: Run E2E smoke**

Run:
```bash
pnpm exec playwright test -c apps/web/playwright.config.ts apps/web/e2e/design-system.spec.ts
```
Expected: PASS

**Step 3: Preview verification**

手动确认：
- 首页进入设计系统
- 左侧为后台风格组件目录
- 没有 overview
- 默认进入组件详情
- Button 页能看到真实示例 + API 表 + 使用说明
- Overlay live demo 正常
- 移动端单列正常

**Step 4: Final code review**

Use:
- `code-reviewer`
- 必要时补 `typescript-reviewer`

Expected: 无 CRITICAL/HIGH 问题

**Step 5: Commit**

```bash
git add apps/web/src/pages/DesignSystemPage.tsx \
  apps/web/src/pages/design-system/designSystemContent.tsx \
  apps/web/src/pages/design-system/DesignSystemDocContent.tsx \
  apps/web/src/pages/design-system/designSystemStyles.ts \
  apps/web/src/test/app.test.tsx \
  apps/web/src/test/design-system-page.test.tsx \
  apps/web/e2e/design-system.spec.ts
git commit -m "feat: turn design system into component-first docsite"
```
