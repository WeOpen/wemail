# WeMail Integration Settings Redesign

**Date:** 2026-04-17

## Goal

把 `/api-keys`、`/webhook`、`/telegram` 从简单面板/占位页升级成统一的开发者自助接入中心，优先完善个人 API 密钥管理、Webhook 信息架构承载，以及 Telegram 个人通知配置体验。

## Decisions

- 三个入口继续保留独立路由，不新增总览页，沿用现有左侧“设置”导航结构。
- 页面主体统一为“两栏设置页”：左侧承载核心操作与记录，右侧承载状态摘要、最佳实践和接入方式说明。
- API 密钥页接入真实现有能力：创建、一次性展示、吊销、快速开始示例。
- Telegram 页接入真实现有能力：Chat ID 绑定、启停通知，并新增通知偏好/测试/活动等未来扩展承载卡片，不伪造尚未落地的服务端能力。
- Webhook 页先实现完整的信息架构与视觉界面，但明确标注“接口即将开放”，避免假装已经具备真实端点管理和投递日志后端。
- 页面风格延续 WeMail 现有玻璃感工作台，信息密度比 placeholder 更高，但仍保持开发者自助可读性。

## Page Structure

### 1. API 密钥
- 主卡片：密钥列表、创建按钮、吊销确认、空态说明
- 创建结果卡：新密钥只显示一次，可复制密钥 / Header / curl 示例
- 辅助卡：状态摘要、安全最佳实践、接入方式选择

### 2. Webhook
- 主卡片：端点空态 / 预览配置区 / 事件订阅 / Signing Secret 说明
- 验证卡：测试投递入口占位、返回码与重试说明
- 辅助卡：当前状态、签名校验建议、示例 payload、投递日志空态

### 3. Telegram
- 主卡片：绑定状态、Chat ID 表单、启停通知、绑定步骤
- 扩展卡：通知偏好、打扰控制、测试通知、最近活动
- 辅助卡：状态摘要、绑定说明、最佳实践、接入方式选择

## Interaction Notes

- API 密钥创建改为页面内 reveal 卡，而不是只依赖 toast 明文展示。
- 所有尚未接好后端的操作必须用禁用态或说明态表达，不返回虚假的“保存成功”。
- Webhook 和 Telegram 页面要把“个人提醒 / 系统推送 / 主动调 API”的分工讲清楚，减少误用。

## Verification

- 增加 settings 集成测试，覆盖 `/api-keys`、`/webhook`、`/telegram` 三个页面的新结构。
- 覆盖 API 密钥创建后 reveal 区块的展示与 Telegram 绑定表单的新文案。
- 运行 web integration tests、web typecheck、以及相关 lint/build 验证。
