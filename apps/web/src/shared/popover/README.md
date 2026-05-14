# 🗂 shared/popover

共享 Popover 原语层。

## ✅ 放什么
- `Popover`
- `PopoverTrigger`
- `PopoverContent`
- trigger 切换、outside click dismiss、`Esc` dismiss
- `aria-expanded`、`aria-controls`、`role="dialog"` 等基础弹层语义

## 🚫 不放什么
- 命令面板、下拉菜单、选择器
- 全局层级管理和复杂定位引擎
- 业务专属表单状态

## 使用约定
- 适合承载轻量筛选、快捷动作、补充配置
- 内容应保持短流程；长表单或强打断场景改用 `OverlayDialog` / `OverlayDrawer`
- 关闭后默认把焦点还给 trigger，保证键盘回退路径稳定
- 内容通过 shared layer portal 渲染，并带基础 side 回退与视口边界约束
