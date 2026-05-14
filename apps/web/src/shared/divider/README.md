# 〰️ shared/divider

共享分隔线原语层。

## ✅ 放什么
- `Divider`
- 横向 / 纵向分隔
- inset、dashed、decorative 视觉约定

## 🚫 不放什么
- 带标题的 section header
- 业务专属时间线或步骤线
- 复杂布局边框系统

## 使用约定
- 结构分组默认用横向 `Divider`
- 紧凑工具栏或双栏布局需要竖线时用 `orientation="vertical"`
- 纯视觉装饰且不需要读屏器感知时传 `decorative`
