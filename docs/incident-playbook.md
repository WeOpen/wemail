# Incident Playbook

## 目标

在出现线上问题时，提供最小可执行的排查与回滚流程。

## 分级

### P0
- 登录不可用
- inbox 主流程不可用
- 后端全部不可用

### P1
- admin 不可用
- outbound 发送异常
- API key 失效

### P2
- UI 局部错误
- 文案 / 样式 / 非核心页面问题

## 处理流程

1. 确认影响范围
2. 固定证据（日志 / 配置 / 最近变更）
3. 判断是否需要立即回滚
4. 使用 `docs/deploy-runbook.md` 做回滚或修复部署
5. 记录 incident 和后续改进项

## 事后复盘

- 根因
- 为什么现有测试没有发现
- 是否需要补 unit / integration / e2e
- 是否需要补 README / docs / runbook
