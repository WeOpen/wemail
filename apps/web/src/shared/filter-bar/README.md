# 🧪 shared/filter-bar

共享筛选条原语。

## ✅ 放什么
- `FilterBar`
- `FilterBarActions`
- `FilterBarSummary`
- 搜索、筛选、轻量批量动作的统一排布

## 🚫 不放什么
- 某个页面专属字段 schema
- 查询参数同步逻辑
- 数据请求和防抖策略

## 使用约定
- `FilterBar` 只负责布局，不负责字段行为
- `columns` 用来声明主筛选区的目标列数
- 批量动作、快捷筛选等放到 `FilterBarActions`
- 可选的结果摘要、已选数量提示可放到 `FilterBarSummary`
