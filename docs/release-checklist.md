# 发布检查清单

## 代码与文档
- `README` 与目录结构一致
- `docs/code-standard.md` 已同步
- `docs/development-workflow.md` 已同步
- `docs/ci-strategy.md` 已同步
- `docs/deploy-runbook.md` / `docs/cloudflare-secrets.md` 已同步

## 基础验证
- `pnpm test`
- `pnpm typecheck`
- `pnpm lint`
- `pnpm build`
- 关键改动已按需补跑 `pnpm test:e2e`

## Cloudflare 资源
- staging / production 的 D1 绑定都已配置
- Pages 项目存在且项目名正确
- Email Routing 已配置
- 若启用附件持久化，R2 附件桶已绑定
- 若启用限流，Rate Limiter 绑定已配置

## 运行时 secrets
- `RESEND_API_KEY` 已写入 staging
- `RESEND_API_KEY` 已写入 production
- `TELEGRAM_BOT_TOKEN` 已按需写入 staging / production
- 其他新增 secrets 已完成双环境同步

## staging 验收
- staging deploy 成功
- `/health` 返回环境正确
- 邀请注册正常
- 临时邮箱创建正常
- 收件 / 附件查看正常
- 发信正常
- AI 提取验证码正常
- Telegram 通知正常
- 管理员后台与 API key 正常

## production 放行条件
- staging 已完成冒烟验证
- release draft 已人工检查
- production deploy 将从 `main` 触发
- 已确认回滚目标 commit 或 tag

## 发布后
- 检查 GitHub release 草稿内容是否完整
- 检查 Worker / Pages deployment URL 是否正确
- 若需要，对外更新 changelog 或 release announcement
- 若发生异常，按 `docs/incident-playbook.md` 处理
