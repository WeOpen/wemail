# 文档总览

本目录存放项目级规范、架构说明、开发约束、发布流程与运维文档。

## 文档分组

### 规范与架构
- `code-standard.md`：前后端统一代码规范
- `architecture/layered-architecture.md`：分层架构与依赖方向说明
- `adr-template.md` / `adr/`：架构决策记录模板与示例

### 开发与验证
- `development-workflow.md`：开发分支、提交、验证流程
- `testing-strategy.md`：测试分层与回归要求
- `e2e-strategy.md`：端到端测试目标与当前范围
- `ci-strategy.md`：CI / Preview / Release / Deploy 的分工
- `code-review-checklist.md`：代码审查检查清单

### 发布与运维
- `release-checklist.md`：发布前后检查清单
- `deploy-runbook.md`：staging / production 部署手册
- `cloudflare-secrets.md`：GitHub Secrets、Wrangler Secrets 与 Cloudflare 绑定说明
- `release-notes-process.md`：发布说明与草稿维护流程
- `incident-playbook.md`：线上问题处理与回滚流程
- `repository-governance.md`：仓库治理与文档同步规则

## 放什么
- 稳定的项目级规范
- 需要跨目录共享的流程和约束
- 运维与发布的长期手册
- 会影响后续维护者判断的架构决策

## 不放什么
- 临时会议纪要
- 一次性调试日志
- 构建产物截图
- 和实现目录 README 重复的低层级细节

## 维护要求
- 改代码结构时同步更新目录 README 与相关 docs
- 改 workflow / deploy / secrets 时同步更新对应 runbook
- 文档统一使用 UTF-8、LF，并保持标题、术语、目录名与仓库一致
