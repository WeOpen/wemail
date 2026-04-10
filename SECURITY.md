# Security Policy

## Supported versions

当前以 `main` 分支最新代码为准。

## Reporting a vulnerability

如果发现安全问题，请不要直接公开提交 issue 细节。

建议流程：
1. 先通过私密渠道联系维护者
2. 提供复现步骤、影响范围、建议修复方式
3. 等待修复版本发布后再公开披露

## Scope

特别关注以下区域：
- session / cookie
- API key
- admin 权限边界
- 输入校验
- Cloudflare / Resend / Telegram 集成
