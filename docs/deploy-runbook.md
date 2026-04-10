# Deploy Runbook

## 目标

为 staging / production 提供统一的部署前检查、执行步骤、发布后验证与回滚流程。

## 环境定义

| 环境 | Worker 命令 | Pages 行为 | 用途 |
| --- | --- | --- | --- |
| `staging` | `wrangler deploy --env staging` | `pages deploy --branch=staging` | 预发布验证、配置联调、回归冒烟 |
| `production` | `wrangler deploy --env production` | `pages deploy`（使用项目生产分支） | 正式发布 |

> 当前仓库约定：production 只能从 `main` 分支触发手动部署。

## 部署前准备

1. 先完成基础验证：
   - `pnpm test`
   - `pnpm typecheck`
   - `pnpm lint`
   - `pnpm build`
2. 若本次改动触达关键用户流，再补跑：
   - `pnpm test:e2e`
3. 确认 `apps/worker/wrangler.toml` 已配置好：
   - `env.staging`
   - `env.production`
   - 对应 D1 数据库 ID
   - 对应邮件域名
4. 确认 Cloudflare 资源可用：
   - D1
   - Email Routing
   - Pages 项目
   - 可选的 R2 附件桶
   - 可选的 Rate Limiter 绑定
5. 确认 Worker 运行时 secrets 已写入 Cloudflare：
   - `RESEND_API_KEY`
   - `TELEGRAM_BOT_TOKEN`
   - 其他新增运行时 secrets
6. 检查以下文档是否与实现一致：
   - `docs/cloudflare-secrets.md`
   - `docs/release-checklist.md`
   - `docs/release-notes-process.md`

## 通过 GitHub Actions 部署

1. 打开 `.github/workflows/deploy-cloudflare.yml`
2. 选择目标环境：`staging` 或 `production`
3. 观察 workflow 三个关键阶段：
   - `prepare`：分支保护 + secrets 校验 + 目标解析
   - `verify`：测试 / typecheck / lint / build
   - `deploy-worker` 与 `deploy-pages`
4. 查看 Job Summary：
   - Worker deployment URL
   - Pages deployment URL
   - staging / production 模式说明

## 本地手动部署（必要时）

仅在 GitHub Actions 不可用、但又需要紧急操作时使用：

```bash
pnpm install --frozen-lockfile
pnpm test
pnpm typecheck
pnpm lint
pnpm build
cd apps/worker && pnpm exec wrangler deploy --env staging
```

若部署 production，把 `staging` 改成 `production`，并先确认你当前位于 `main` 对应提交。

## 发布后验证

staging 与 production 都至少做以下冒烟：

1. `GET /health` 返回：
   - `ok: true`
   - 正确的 `environment`
2. 邀请码注册可用
3. 能创建临时邮箱
4. 能正常收件并查看附件
5. 能正常发信，基于 Resend
6. AI 能提取验证码或确认链接
7. Telegram 能收到新邮件通知
8. 管理员后台能查看用户、邀请码、额度
9. API key 能访问核心接口

## staging 升 production 的门槛

只有当以下条件都满足时，才允许发 production：
- CI 为绿色
- staging 已完成部署后冒烟
- release draft 已更新并人工检查
- 运行时 secrets / 绑定没有环境漂移
- 回滚方案已经明确

## 回滚策略

当前仓库没有独立的自动回滚 workflow，默认采用“重新部署上一版稳定提交”的方式：

1. 找到上一版稳定 commit 或 tag
2. 用同一套 deploy workflow 重新部署该版本
3. 若问题来自配置而不是代码，同时回退对应：
   - Wrangler env 配置
   - Worker secrets
   - Pages 生产分支内容
4. 在 `docs/incident-playbook.md` 记录事故、影响范围与后续动作

## 常见失败点

- GitHub Environment 没有配置 Cloudflare deploy secrets
- `wrangler.toml` 的 D1 database ID 仍是占位值
- production 从非 `main` 分支触发
- Worker secrets 已更新，但 staging / production 只更新了其中一个环境
- Pages 项目生产分支设置与仓库 workflow 约定不一致
