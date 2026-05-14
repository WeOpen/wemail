# 🧭 shared/page-layout

共享页面级布局原语。

## ✅ 放什么
- `Page`
- `PageHeader`
- `PageToolbar`
- `PageBody`
- `PageMain`
- `PageSidebar`
- 统一页面头部、操作区、主内容与侧栏排布

## 🚫 不放什么
- 具体业务页面的数据请求
- 某一个页面专属的过滤逻辑
- 卡片内部的业务排版

## 使用约定
- `PageHeader` 负责 kicker / title / description / actions 的基础布局
- `PageToolbar` 用于搜索、筛选、批量动作等顶层操作排布
- 有侧栏时用 `PageBody + PageMain + PageSidebar`
- 无侧栏时可只用 `Page + PageHeader + PageMain`
