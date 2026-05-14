# 🪪 shared/card

共享卡片原语层。

## ✅ 放什么
- `Card`
- `CardHeader` / `CardBody` / `CardFooter`
- 统一的 `variant / padding / elevation / tone` 外观约定
- 数据看板、状态摘要、强调面板等容器壳层
- 可选的 `isInteractive` hover / focus 样式钩子

## 🚫 不放什么
- 可折叠、拖拽、排序等复杂容器行为
- 业务级统计排版规则
- 卡片内部的数据请求和状态机

## 状态约定
- `variant`: `base` / `data` / `status` / `accent`
- `padding`: `none` / `sm` / `md` / `lg`
- `elevation`: `flat` / `sm` / `md` / `lg`
- `tone`: `neutral` / `brand` / `info` / `success` / `warning` / `danger`
- `isInteractive`: 输出 `data-state="interactive"` 与 `.is-interactive`

## 使用约定
- 普通信息承载用 `variant="base"`
- 指标看板优先用 `variant="data"`
- 状态汇总或告警容器用 `variant="status"`
- 品牌强调或重点入口用 `variant="accent"`
- 样式文件位于 `shared/card/card.css`，后续统一由样式 barrel 接入
