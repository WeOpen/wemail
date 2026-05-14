# ↕️ shared/scroll-area

共享 Scroll Area 原语层。

## ✅ 放什么
- `ScrollArea`
- `ScrollAreaViewport`
- `ScrollAreaScrollbar`
- `ScrollAreaThumb`
- 统一滚动容器、viewport、滚动条槽位与方向状态

## 🚫 不放什么
- 虚拟列表
- 惰性加载或无限滚动状态机
- 业务专属列表项布局

## 使用约定
- `ScrollArea` 负责区域语义和方向
- `ScrollAreaViewport` 承载真实内容
- `ScrollAreaScrollbar` / `ScrollAreaThumb` 负责样式槽位，不内置复杂拖拽逻辑
