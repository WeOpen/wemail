# CI Strategy

## 目标

把验证与发布流程分成“快速反馈”“预览验证”“手动部署”“发布草稿”四层，避免所有事情挤进一个 workflow。

## 当前工作流分工

| Workflow | 触发方式 | 目标 | 说明 |
| --- | --- | --- | --- |
| `.github/workflows/ci.yml` | `push main` / `pull_request` | 基础质量门禁 | 执行 `pnpm test`、`pnpm typecheck`、`pnpm lint`、`pnpm build` |
| `.github/workflows/e2e.yml` | `pull_request` / `workflow_dispatch` | 浏览器级回归 | 当前以 smoke 骨架为主，失败时上传 Playwright artifacts |
| `.github/workflows/deploy-preview.yml` | `pull_request` | PR 预览构建 | 总是上传前端产物；配置好 Cloudflare 后可额外发 Pages preview |
| `.github/workflows/release.yml` | `workflow_dispatch` / `tag v*` | 发布前总验证 + GitHub draft release | 面向 release cut，不直接替代生产部署 |
| `.github/workflows/release-drafter.yml` | `push main` | 维护 GitHub release 草稿 | 依赖 PR label 自动聚合变更 |
| `.github/workflows/deploy-cloudflare.yml` | `workflow_dispatch` | 手动部署到 staging / production | 使用 GitHub Environments 区分环境并触发 Cloudflare deploy |

## 验证层级

### 1. CI：快速基础验证
用于保证每次提交至少通过以下检查：
- `pnpm test`
- `pnpm typecheck`
- `pnpm lint`
- `pnpm build`

### 2. E2E：关键路径浏览器验证
当前优先覆盖：
- landing / 基础可见性
- settings page
- admin dashboard smoke

后续再扩展 invite 注册、mailbox 创建、收件、发信等完整业务流。

### 3. Preview：PR 可视化预览
- 所有 PR 都保留前端构建产物
- 配置好 Cloudflare 后，预览部署使用 `pages deploy --branch=pr-<number>`
- Preview 失败不应阻塞基础 CI，但必须有可读的 artifacts 或错误信息

### 4. Release / Deploy：人为确认后的受控动作
- `release.yml` 负责发布前总验证和生成 draft release
- `deploy-cloudflare.yml` 负责真正部署到 Cloudflare
- production deploy 必须在 staging 验证通过后执行

## 当前约束
- E2E 仍然是“最小可运行骨架”，不是全量回归
- staging / production 部署依赖 GitHub Environments 中配置好的 Cloudflare secrets
- Worker 运行时 secrets，例如 Resend、Telegram，不通过 GitHub Actions 注入，而是通过 Wrangler secrets 管理

## 文档联动要求
以下文件变更时，必须同步检查本文件：
- `.github/workflows/ci.yml`
- `.github/workflows/e2e.yml`
- `.github/workflows/deploy-preview.yml`
- `.github/workflows/deploy-cloudflare.yml`
- `.github/workflows/release.yml`
- `.github/workflows/release-drafter.yml`
