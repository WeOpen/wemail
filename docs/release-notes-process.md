# Release Notes Process

## 目标

让发布说明生成过程保持一致、可审查、可追溯，并能覆盖部署与配置层面的重要变化。

## 当前自动化

- `.github/release-drafter.yml`：定义分类、版本推断与草稿模板
- `.github/workflows/release-drafter.yml`：在 `main` 更新 GitHub draft release
- `.github/workflows/release.yml`：在手动触发或打 `v*` tag 时执行总验证，并创建 draft release

## Release notes 的输入来源

1. PR 标题
2. PR labels，目前至少使用：
   - `enhancement`
   - `bug`
   - `documentation`
3. 人工补充的运维说明：
   - Cloudflare 绑定变化
   - 环境变量或 secrets 变化
   - 迁移或回滚注意事项

## 建议流程

1. PR 合并前打正确 label
2. `release-drafter` 自动更新草稿
3. 准备发版时运行 `release.yml`
4. 人工检查 draft release，至少确认：
   - 是否覆盖主要功能变更
   - 是否遗漏 breaking change
   - 是否遗漏 Cloudflare 配置变化
   - 是否需要提醒管理员执行额外动作
5. staging 验证通过后，再执行 production deploy
6. production 成功后再把草稿发布为正式 release

## 发布说明建议结构

### 1. Highlights
- 面向用户的能力变化
- UI / 交互改进
- 核心邮件能力变化

### 2. Fixes
- 缺陷修复
- 权限边界修正
- 性能 / 稳定性改进

### 3. Operations
- 新增或调整的 Cloudflare 资源
- 新增或调整的 Worker secrets
- staging / production 部署注意事项

### 4. Risks / Compatibility
- 对现有 API、管理员操作、邀请码流程的影响
- 是否需要手动迁移、重新配置、数据修复

## 什么时候必须人工补充说明

以下情况不能只依赖自动生成草稿：
- 改了 `wrangler.toml`
- 改了 `.github/workflows/deploy-cloudflare.yml`
- 改了 D1 / R2 / Email Routing / Resend / Telegram 配置方式
- 改了 API key、鉴权、额度、管理员能力

## 文档联动

如果 release note 中提到新的部署步骤或配置要求，必须同步更新：
- `docs/release-checklist.md`
- `docs/deploy-runbook.md`
- `docs/cloudflare-secrets.md`
