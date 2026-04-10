# Repository Governance

## 目标

让仓库在“代码结构清晰”之外，也具备稳定协作、受控发布、文档可追踪的治理能力。

## 当前治理文件

- `CONTRIBUTING.md`
- `SECURITY.md`
- `CODE_OF_CONDUCT.md`
- `SUPPORT.md`
- `.github/CODEOWNERS`
- `.github/PULL_REQUEST_TEMPLATE.md`
- `.github/ISSUE_TEMPLATE/*`
- `.github/workflows/*.yml`
- `.github/dependabot.yml`
- `.github/release-drafter.yml`
- `docs/*.md`

## 治理原则

1. 新增治理文件必须和真实流程一致，不能只写不执行
2. 自动化必须满足“可解释、可回滚、可验证”
3. 流程变更必须同时更新 workflow、模板、runbook 与目录 README
4. 生产相关变更必须保留 staging 验证与回滚路径
5. 敏感信息不进入仓库，运行时 secrets 与 deploy secrets 分开管理

## 代码与文档的联动规则

以下变更，必须同步更新文档：

| 变更类型 | 至少同步更新 |
| --- | --- |
| 目录结构变化 | 相关目录 README、`docs/code-standard.md`、`docs/architecture/layered-architecture.md` |
| 测试 / CI 变化 | `docs/ci-strategy.md`、`docs/testing-strategy.md` |
| 部署 / secrets / Cloudflare 变化 | `docs/deploy-runbook.md`、`docs/cloudflare-secrets.md`、`docs/release-checklist.md` |
| 发布策略变化 | `docs/release-notes-process.md`、`docs/release-checklist.md` |

## Review 期望

- 结构性修改优先看边界是否更清晰，而不是代码行数是否更少
- 发布与运维改动必须有人检查 runbook 是否还能照着执行
- 引入新的 Cloudflare 绑定或 workflow 输入时，必须验证 staging / production 是否都覆盖到

## 分支与发布约束

- `main` 是稳定主线
- production deploy 只能从 `main` 触发
- release draft 在 production 发布前必须可读、可审查
- 没有回滚路径的部署改动不得直接合入主线

## 最低维护要求

- 保持 `.github/` 与 `docs/` 互相印证
- 目录 README 不允许长期失真
- 文档统一 UTF-8、LF，避免跨平台乱码问题
