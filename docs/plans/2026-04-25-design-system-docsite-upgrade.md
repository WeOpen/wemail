# Design System Docsite Upgrade Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 把 `/design-system` 从组件预览页升级为真正可读、可维护的组件文档站，支持完整组件详情与更正式的文档化阅读体验。

**Architecture:** 保留现有左侧混合导航（分组概览 + 组件项），但把右侧内容区统一收敛为文档模板。页面层只负责导航状态与模板编排，组件文档内容从独立配置对象读取；overview 与 component detail 共享同一阅读节奏，但字段不同。

**Tech Stack:** React 19, TypeScript, Vitest, Testing Library, 现有 shared primitives（Button / Card / Typography / Tabs / Code-style blocks）

---

### Task 1: 抽离设计系统文档数据模型

**Files:**
- Create: `apps/web/src/pages/design-system/designSystemContent.ts`
- Modify: `apps/web/src/pages/DesignSystemPage.tsx`
- Test: `apps/web/src/test/app.test.tsx`

**Step 1: Write the failing test**

在 `apps/web/src/test/app.test.tsx` 增加一个最小断言：点击某个组件后，右侧详情区必须出现统一文档段落标题，例如“适用场景”或“设计规范”。

```tsx
it("renders structured documentation sections for a selected component", async () => {
  window.history.pushState({}, "", "/design-system");
  vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("not authenticated"));
  render(<App />);

  const sidebar = await screen.findByRole("navigation", { name: "Design system sidebar" });
  fireEvent.click(within(sidebar).getByRole("button", { name: "Button" }));

  expect(screen.getByText("适用场景")).toBeInTheDocument();
});
```

**Step 2: Run test to verify it fails**

Run:
```bash
pnpm --dir apps/web exec vitest run src/test/app.test.tsx -t "renders structured documentation sections for a selected component"
```
Expected: FAIL，因为当前组件详情没有统一文档段落。

**Step 3: Write minimal implementation**

在 `apps/web/src/pages/design-system/designSystemContent.ts` 定义：
- `DesignSystemDocSection`
- `DesignSystemComponentDoc`
- `DesignSystemGroupDoc`
- Button / Card / SearchInput / Navigation / Feedback 等首批完整文档数据

`DesignSystemPage.tsx` 改成从这些对象读取内容，而不是把所有说明散在页面 JSX 里。

**Step 4: Run test to verify it passes**

Run:
```bash
pnpm --dir apps/web exec vitest run src/test/app.test.tsx -t "renders structured documentation sections for a selected component"
```
Expected: PASS

**Step 5: Commit**

```bash
git add apps/web/src/pages/design-system/designSystemContent.ts apps/web/src/pages/DesignSystemPage.tsx apps/web/src/test/app.test.tsx
git commit -m "feat: structure design system doc content"
```

---

### Task 2: 统一右侧组件详情模板

**Files:**
- Create: `apps/web/src/pages/design-system/DesignSystemDocContent.tsx`
- Modify: `apps/web/src/pages/DesignSystemPage.tsx`
- Test: `apps/web/src/test/app.test.tsx`

**Step 1: Write the failing test**

增加断言，要求组件详情按固定顺序出现这些标题：
- 组件介绍
- 适用场景
- 状态与变体
- 交互示例
- 代码片段
- 设计规范

```tsx
it("renders component docs in the expected reading order", async () => {
  window.history.pushState({}, "", "/design-system");
  vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("not authenticated"));
  render(<App />);

  const sidebar = await screen.findByRole("navigation", { name: "Design system sidebar" });
  fireEvent.click(within(sidebar).getByRole("button", { name: "Button" }));

  const headings = screen.getAllByRole("heading").map((node) => node.textContent);
  expect(headings).toContain("适用场景");
  expect(headings).toContain("状态与变体");
  expect(headings).toContain("交互示例");
  expect(headings).toContain("代码片段");
  expect(headings).toContain("设计规范");
});
```

**Step 2: Run test to verify it fails**

Run:
```bash
pnpm --dir apps/web exec vitest run src/test/app.test.tsx -t "renders component docs in the expected reading order"
```
Expected: FAIL

**Step 3: Write minimal implementation**

创建 `DesignSystemDocContent.tsx`：
- 接收一个 `componentDoc`
- 用固定 section 顺序渲染文档
- overview 模式与 component mode 共用节奏，但允许字段不同

在 `DesignSystemPage.tsx` 中右侧区域只做：
- 选中 overview → 传 groupDoc
- 选中 component → 传 componentDoc

**Step 4: Run test to verify it passes**

Run:
```bash
pnpm --dir apps/web exec vitest run src/test/app.test.tsx -t "renders component docs in the expected reading order"
```
Expected: PASS

**Step 5: Commit**

```bash
git add apps/web/src/pages/design-system/DesignSystemDocContent.tsx apps/web/src/pages/DesignSystemPage.tsx apps/web/src/test/app.test.tsx
git commit -m "feat: add structured doc template for components"
```

---

### Task 3: 升级视觉层级，让右侧更像文档站

**Files:**
- Create: `apps/web/src/pages/design-system/designSystemStyles.ts`
- Modify: `apps/web/src/pages/DesignSystemPage.tsx`
- Test: `apps/web/src/test/app.test.tsx`

**Step 1: Write the failing test**

补一个结构性测试，要求右侧详情区存在独立的文档块，而不是全部混在一个大说明里。可用文本断言验证存在“代码片段”和“设计规范”区域。

```tsx
it("renders separate doc sections instead of a single summary block", async () => {
  window.history.pushState({}, "", "/design-system");
  vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("not authenticated"));
  render(<App />);

  const sidebar = await screen.findByRole("navigation", { name: "Design system sidebar" });
  fireEvent.click(within(sidebar).getByRole("button", { name: "Button" }));

  expect(screen.getByText("代码片段")).toBeInTheDocument();
  expect(screen.getByText("设计规范")).toBeInTheDocument();
});
```

**Step 2: Run test to verify it fails**

Run:
```bash
pnpm --dir apps/web exec vitest run src/test/app.test.tsx -t "renders separate doc sections instead of a single summary block"
```
Expected: FAIL

**Step 3: Write minimal implementation**

把目前散在 `DesignSystemPage.tsx` 的样式常量收敛一部分到 `designSystemStyles.ts`，至少拆出：
- 页面级布局 style
- 文档 section style
- 示例区 style
- 代码区 style
- 规范信息块 style

同时让右侧详情区减少 dashboard 感，强化文档阅读感：
- 标题更明确
- 分段更稳定
- 卡片数量更少但层级更清晰

**Step 4: Run test to verify it passes**

Run:
```bash
pnpm --dir apps/web exec vitest run src/test/app.test.tsx -t "renders separate doc sections instead of a single summary block"
```
Expected: PASS

**Step 5: Commit**

```bash
git add apps/web/src/pages/design-system/designSystemStyles.ts apps/web/src/pages/DesignSystemPage.tsx apps/web/src/test/app.test.tsx
git commit -m "feat: refine design system docsite layout"
```

---

### Task 4: 首批组件详情补全到“可用文档”级别

**Files:**
- Modify: `apps/web/src/pages/design-system/designSystemContent.ts`
- Modify: `apps/web/src/pages/DesignSystemPage.tsx`
- Test: `apps/web/src/test/app.test.tsx`

**Step 1: Write the failing test**

至少为 Button 增加完整文档内容断言：
- 有适用场景
- 有至少一个不要使用场景
- 有状态与变体项
- 有代码片段标题
- 有设计规范标题

```tsx
it("documents button with usage, variants, code, and design guidance", async () => {
  window.history.pushState({}, "", "/design-system");
  vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("not authenticated"));
  render(<App />);

  const sidebar = await screen.findByRole("navigation", { name: "Design system sidebar" });
  fireEvent.click(within(sidebar).getByRole("button", { name: "Button" }));

  expect(screen.getByText("适用场景")).toBeInTheDocument();
  expect(screen.getByText("不适用场景")).toBeInTheDocument();
  expect(screen.getByText("状态与变体")).toBeInTheDocument();
  expect(screen.getByText("代码片段")).toBeInTheDocument();
  expect(screen.getByText("设计规范")).toBeInTheDocument();
});
```

**Step 2: Run test to verify it fails**

Run:
```bash
pnpm --dir apps/web exec vitest run src/test/app.test.tsx -t "documents button with usage, variants, code, and design guidance"
```
Expected: FAIL

**Step 3: Write minimal implementation**

先补齐以下组件或分组：
- `Foundations` overview
- `Button`
- `Card`
- `SearchInput`
- `Navigation`
- `Feedback`

每个组件至少包含：
- summary
- use cases
- donts
- variants
- examples
- one static code sample
- design notes

**Step 4: Run test to verify it passes**

Run:
```bash
pnpm --dir apps/web exec vitest run src/test/app.test.tsx -t "documents button with usage, variants, code, and design guidance"
```
Expected: PASS

**Step 5: Commit**

```bash
git add apps/web/src/pages/design-system/designSystemContent.ts apps/web/src/pages/DesignSystemPage.tsx apps/web/src/test/app.test.tsx
git commit -m "feat: fill first design system component docs"
```

---

### Task 5: 增加代码片段与示例区的稳定回归

**Files:**
- Modify: `apps/web/src/pages/design-system/DesignSystemDocContent.tsx`
- Modify: `apps/web/src/test/app.test.tsx`
- Optional Test: `apps/web/e2e/design-system.spec.ts`

**Step 1: Write the failing test**

增加断言，要求选中 Button 后：
- 有一段代码片段文本
- 示例区里的真实按钮仍然可见

```tsx
it("shows both live examples and static code snippets for a component", async () => {
  window.history.pushState({}, "", "/design-system");
  vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("not authenticated"));
  render(<App />);

  const sidebar = await screen.findByRole("navigation", { name: "Design system sidebar" });
  fireEvent.click(within(sidebar).getByRole("button", { name: "Button" }));

  expect(screen.getByText(/<Button variant=/i)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "保存变更" })).toBeInTheDocument();
});
```

**Step 2: Run test to verify it fails**

Run:
```bash
pnpm --dir apps/web exec vitest run src/test/app.test.tsx -t "shows both live examples and static code snippets for a component"
```
Expected: FAIL

**Step 3: Write minimal implementation**

- 在文档 schema 中加入 `codeSamples`
- 在 `DesignSystemDocContent.tsx` 渲染 `<pre><code>` 或现有 typography/code 原语
- 代码片段先静态维护，不做自动生成
- 如果已有 `apps/web/e2e/design-system.spec.ts`，补一条轻量 smoke：默认 overview、切 Button、看到代码片段和示例按钮

**Step 4: Run test to verify it passes**

Run:
```bash
pnpm --dir apps/web exec vitest run src/test/app.test.tsx -t "shows both live examples and static code snippets for a component"
```
Expected: PASS

Optional:
```bash
pnpm test:e2e -- --grep "design system"
```
Expected: PASS 或至少 smoke path 通过

**Step 5: Commit**

```bash
git add apps/web/src/pages/design-system/DesignSystemDocContent.tsx apps/web/src/test/app.test.tsx apps/web/e2e/design-system.spec.ts
git commit -m "test: cover design system docs and examples"
```

---

### Task 6: 最终验证与整理

**Files:**
- Review only: `apps/web/src/pages/DesignSystemPage.tsx`
- Review only: `apps/web/src/pages/design-system/designSystemContent.ts`
- Review only: `apps/web/src/pages/design-system/DesignSystemDocContent.tsx`
- Review only: `apps/web/src/pages/design-system/designSystemStyles.ts`
- Test: `apps/web/src/test/app.test.tsx`

**Step 1: Run targeted unit tests**

Run:
```bash
pnpm --dir apps/web exec vitest run src/test/app.test.tsx
```
Expected: PASS

**Step 2: Run preview verification**

Use preview tools to verify:
- 默认进入 group overview
- 点击 Button 进入完整长文档详情
- 页面有“介绍 → 场景 → 变体 → 示例 → 代码 → 规范”的阅读流
- 桌面/移动端布局不塌

Expected: 页面结构稳定，无 console / server error

**Step 3: Run code review**

Use required review flow:
- `code-reviewer`
- 必要时补 `typescript-reviewer`

Expected: 无 CRITICAL/HIGH 问题

**Step 4: Final cleanup**

确认：
- 无重复文案块
- 无多余按钮
- 无旧的“预览集合页”残留逻辑
- 新文件命名与分层符合项目约定

**Step 5: Commit**

```bash
git add apps/web/src/pages/DesignSystemPage.tsx \
  apps/web/src/pages/design-system/designSystemContent.ts \
  apps/web/src/pages/design-system/DesignSystemDocContent.tsx \
  apps/web/src/pages/design-system/designSystemStyles.ts \
  apps/web/src/test/app.test.tsx \
  apps/web/e2e/design-system.spec.ts
git commit -m "feat: turn design system preview into component docsite"
```
