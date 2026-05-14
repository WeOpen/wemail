# 🧪 e2e

前端端到端测试目录。

## ✅ 放什么
- Playwright 场景测试
- 关键用户旅程 smoke 测试

## 🚫 不放什么
- 单元测试
- 仅依赖组件内部实现细节的测试

## 📍 当前状态

当前目录先提供骨架，后续可逐步补充：
- 登录 / 注册流程
- mailbox 创建
- inbox 读取
- admin 基本操作
- `/design-system` 结构与视觉回归脚手架

## 📏 约定

- 端到端测试优先验证“用户路径”，不是内部实现细节
- 当前阶段允许通过 `page.route()` 做 API mock，先保证前端壳层和交互路径稳定
- 更接近真实后端联调的 e2e 可在后续独立 staging 环境中补充
- `design-system.spec.ts` 默认只跑结构断言；截图基线需在预览页示例稳定后，通过 `PW_UPDATE_DESIGN_SYSTEM_SNAPSHOTS=1` 显式开启
- `/design-system` 现在是公开页面；相关 e2e 不要求先登录或挂后台壳层
