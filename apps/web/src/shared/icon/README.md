# 🧩 shared/icon

共享图标原语层。

## ✅ 放什么
- `Icon`
- lucide-react 的统一包装
- 统一 size、tone、`currentColor` 与可访问性约定

## 🚫 不放什么
- 业务图标映射表
- 多色 SVG 插画
- 图标按钮（用 `shared/button` 组合）

## 使用约定
- 纯装饰图标默认读屏隐藏
- 需要读屏器识别时显式传 `label`
- size 优先用语义档位 `xs/sm/md/lg`；只有局部对齐场景才传数字像素
