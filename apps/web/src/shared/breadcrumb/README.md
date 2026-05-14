# 🧭 shared/breadcrumb

共享面包屑导航原语层。

## ✅ 放什么
- `Breadcrumb`
- `BreadcrumbList`
- `BreadcrumbItem`
- `BreadcrumbLink`
- `BreadcrumbCurrent`
- `BreadcrumbSeparator`
- 当前页 `aria-current="page"` 与 `data-state` 约定

## 🚫 不放什么
- 路由推导逻辑
- 自动截断 / 折叠策略
- 页面级返回按钮或业务操作

## 状态约定
- `BreadcrumbLink`: 默认 `data-state="inactive"`；传入 `aria-current="page"` 时切为 `current`
- `BreadcrumbCurrent`: 固定输出 `aria-current="page"` 和 `data-state="current"`
- `BreadcrumbSeparator`: 固定 `data-state="separator"`，默认内容为 `/`

## 可访问性
- 根节点渲染 `<nav aria-label>`
- 列表使用 `<ol>`，顺序与用户路径一致
- 当前页应使用 `BreadcrumbCurrent`，避免将当前节点误渲染为可点击链接
