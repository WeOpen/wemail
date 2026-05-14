# 🪟 shared/tabs

共享 tabs / segmented 原语层。

## ✅ 放什么
- `Tabs`
- `TabsList`
- `TabsTrigger`
- `TabsPanel`
- segmented 优先的 tablist / tab / tabpanel 语义与 roving keyboard
- `variant="segmented"` 与预留的 `variant="underline"` API

## 🚫 不放什么
- 页面路由同步
- 业务专属 tab 文案或布局
- 复杂动画与溢出滚动策略

## 状态约定
- `value` / `onValueChange`：受控模式
- `defaultValue`：非受控初始值
- `variant`: 默认 `segmented`，保留 `underline` 以避免后续 API 锁死
- `activationMode`: `automatic` / `manual`，默认 `automatic`
- trigger 输出 `data-state="active" | "inactive"`
- panel 输出 `hidden` 与 `data-state`

## 可访问性
- `TabsList` 渲染 `role="tablist"`
- `TabsTrigger` 渲染 `role="tab"`，自动关联 `aria-controls`
- `TabsPanel` 渲染 `role="tabpanel"`，自动关联 `aria-labelledby`
- 支持 `Arrow*`、`Home`、`End` 键盘导航
