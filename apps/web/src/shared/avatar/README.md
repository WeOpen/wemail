# 👤 shared/avatar

共享头像原语层。

## ✅ 放什么
- `Avatar`
- 图片 / fallback initials 展示
- 尺寸、形状和加载失败兜底

## 🚫 不放什么
- 在线状态气泡
- 业务级头像上传流程
- 组织 / 成员权限逻辑

## 状态约定
- `data-state="image" | "fallback"`
- `size`: `xs` / `sm` / `md` / `lg` / `xl`
- `shape`: `circle` / `square`
