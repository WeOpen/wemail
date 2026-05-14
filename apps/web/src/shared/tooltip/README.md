# 💬 shared/tooltip

共享 Tooltip 原语层。

## ✅ 放什么
- `Tooltip`
- `TooltipTrigger`
- `TooltipContent`
- hover / focus 打开，blur / `Esc` 关闭
- `aria-describedby` 与 `role="tooltip"` 语义联动

## 🚫 不放什么
- 全局 tooltip manager
- 复杂碰撞检测或智能翻转
- 业务专属富文本提示卡

## 使用约定
- 触发器默认是按钮语义，适合图标按钮、帮助入口、字段说明
- Tooltip 仅承载短说明，不承载表单、菜单或可交互流程
- 长内容或带操作的浮层应改用 `Popover`
- 内容通过 shared layer portal 渲染，并带基础 top/bottom 回退定位
