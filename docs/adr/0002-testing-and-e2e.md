# 0002 — Layer testing into unit, integration, and e2e

## 背景

随着仓库结构变复杂，仅靠单元测试不足以证明主要业务流稳定。

## 决策

采用三层测试结构：

- unit/shared tests
- worker/web integration tests
- Playwright e2e smoke tests

## 备选方案

### 方案 A：只保留单元测试
- 优点：快
- 缺点：对真实业务流证明不足

### 方案 B：分层测试（最终选择）
- 优点：验证更完整
- 缺点：维护成本更高

## 结果与影响

- 测试更贴近真实用户路径
- CI 可以按层拆分执行
- 文档和治理模板必须同步更新

## 后续动作

- 补更完整的业务流 e2e
- 为不稳定场景设计更稳的 mock harness
