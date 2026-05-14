# 🔢 shared/pagination

共享分页导航原语层。

## ✅ 放什么
- `Pagination`
- `total / pageSize / page / onChange / siblings` 的受控分页语义
- 上一页 / 下一页 / 当前页的 `aria-current`、禁用态与键盘焦点移动
- 折叠页码的省略号输出

## 🚫 不放什么
- 数据请求和 URL 同步
- page size selector
- 无限滚动或游标分页协议

## 状态约定
- `page`：受控当前页，从 `1` 开始
- `onChange(nextPage)`：仅在页码真正变化时触发
- `siblings`：控制当前页两侧保留的页码数量
- 当前页按钮输出 `aria-current="page"` 与 `data-state="current"`
- 根节点在单页场景输出 `data-state="single"`，多页输出 `ready`

## 可访问性
- 根节点渲染 `<nav aria-label="分页导航">`
- 页码与上一页 / 下一页使用原生 `<button>`
- 支持 `ArrowLeft` / `ArrowRight` / `Home` / `End` 焦点移动
