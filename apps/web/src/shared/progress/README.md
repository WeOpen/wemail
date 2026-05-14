# 📈 shared/progress

共享进度原语层。

## ✅ 放什么
- `Progress`
- 线性进度条尺寸、语义色和确定 / 不确定状态
- `aria-valuenow` / `aria-valuemax` / `role="progressbar"` 的统一语义

## 🚫 不放什么
- 任务编排逻辑
- 上传 / 同步业务文案拼接
- 环形进度或图表级动画

## 状态约定
- `data-state="determinate" | "indeterminate"`
- `variant`: `neutral` / `brand` / `success` / `warning` / `danger`
- `size`: `sm` / `md` / `lg`
