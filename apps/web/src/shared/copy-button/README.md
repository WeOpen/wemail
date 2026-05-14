# 📋 shared/copy-button

共享复制按钮原语层。

## ✅ 放什么
- `CopyButton`
- 剪贴板复制、复制成功态和失败兜底
- 统一图标、状态和按钮语义

## 🚫 不放什么
- 业务 toast
- token 遮罩 / 展示逻辑
- 页面级权限判断

## 状态约定
- `data-state="idle" | "copied" | "error"`
- 通过 `resetAfterMs` 控制回落时间
