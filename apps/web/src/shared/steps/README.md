# 🪜 shared/steps

共享步骤导航原语层。

## ✅ 放什么
- `Steps`
- `StepsList`
- `StepItem`
- 当前步、已完成、未开始三态映射
- 可选的 `onStepChange(step)` 受控切换语义
- 水平 / 垂直方向与键盘焦点移动

## 🚫 不放什么
- 表单校验结果聚合
- 业务流程编排
- 页面级进度存储或路由同步

## 状态约定
- `currentStep`: 受控当前步骤，从 `1` 开始
- `onStepChange(step)`: 点击步骤时回调，用于外层受控切换
- `StepItem` 根据 `step` 与 `currentStep` 自动计算 `complete / current / upcoming`
- 当前步按钮输出 `aria-current="step"` 与 `data-state="current"`
- 根节点根据是否可切换输出 `data-state="interactive" | "static"`

## 可访问性
- 根节点渲染 `<nav aria-label>`
- 列表使用 `<ol>` 保持流程顺序
- 步骤按钮支持 `Arrow*`、`Home`、`End` 焦点移动
