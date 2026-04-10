# Cloudflare / GitHub Secrets 约定

本文档区分三类配置：
1. **GitHub Actions deploy secrets**：给 CI / Deploy workflow 用
2. **Wrangler Worker secrets**：给 Worker 运行时用
3. **Cloudflare 资源绑定**：D1 / R2 / 路由等声明在 `wrangler.toml`

## GitHub Environments

仓库应至少创建两个 GitHub Environments：
- `staging`
- `production`

`.github/workflows/deploy-cloudflare.yml` 会按环境读取对应 secrets，并可利用 GitHub Environment protection rules 对 production 加人工审批。

## GitHub Secrets：部署所需

以下 secrets 建议分别配置在 `staging` 与 `production` 环境中：

| Secret | 是否必需 | 用途 |
| --- | --- | --- |
| `CLOUDFLARE_API_TOKEN` | 必需 | 调用 Wrangler Action 部署 Worker / Pages |
| `CLOUDFLARE_ACCOUNT_ID` | 必需 | Cloudflare Account ID |
| `CLOUDFLARE_PAGES_PROJECT_NAME` | 必需 | Pages 目标项目名 |
| `GITHUB_TOKEN` | 内建 | 同步 GitHub Deployments 状态 |

## Cloudflare API Token 最小权限建议

如果 staging / production 共用同一个 token，至少需要：
- Account / Workers Scripts: Edit
- Account / D1: Edit，如果 workflow 会配合迁移
- Account / Pages: Edit
- Account / Workers Tail: Read，可选

若能分环境分 token，更推荐分开配置，避免 production 被 staging 凭证误用。

## Worker 运行时 secrets：不要放进 GitHub

这些是应用运行时真正读取的 secrets，应该通过 Wrangler 写入 Cloudflare Worker 环境，而不是作为 GitHub Actions secrets 注入代码：

- `RESEND_API_KEY`
- `RESEND_FROM`，如果不想使用默认发件地址
- `TELEGRAM_BOT_TOKEN`
- 未来新增的第三方服务密钥

示例：

```bash
cd apps/worker
pnpm exec wrangler secret put RESEND_API_KEY --env staging
pnpm exec wrangler secret put RESEND_API_KEY --env production
pnpm exec wrangler secret put TELEGRAM_BOT_TOKEN --env staging
pnpm exec wrangler secret put TELEGRAM_BOT_TOKEN --env production
```

## Wrangler 配置里的非 secret 变量

`apps/worker/wrangler.toml` 里保存的是非敏感默认值和绑定声明，例如：
- `DEFAULT_MAIL_DOMAIN`
- `MAILBOX_LIMIT`
- `OUTBOUND_DAILY_LIMIT`
- `ENABLE_AI`
- `ENABLE_TELEGRAM`

当前仓库已经拆出：
- `env.staging`
- `env.production`

注意：Wrangler 环境里的 `vars` 和大多数 bindings 是非继承型的，新增一个环境时要把需要的字段完整写进去，而不是假设会自动继承。

## Cloudflare 绑定项

以下绑定必须在 `wrangler.toml` 中按环境声明：

### D1
- `[[env.staging.d1_databases]]`
- `[[env.production.d1_databases]]`

### R2，如果启用附件对象存储
需要手动补充：
- `[[env.staging.r2_buckets]]`
- `[[env.production.r2_buckets]]`

### 其他绑定
- AI、Rate Limiter、Queues 等如果启用，也要按环境分别声明

## 轮换与审计规则

- token 或 secret 轮换后，staging 与 production 都要检查
- 轮换后至少执行一次 staging deploy 验证
- 不要把 token、database ID、chat ID、发件密钥提交进仓库
- deploy 相关变更必须同步更新 `docs/deploy-runbook.md`
