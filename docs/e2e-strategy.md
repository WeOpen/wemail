# E2E Strategy

## 目标

为关键用户路径建立最小可运行的端到端测试骨架。

## 当前覆盖策略

优先覆盖以下路径：

1. Landing / auth 可见性
2. invite 注册
3. mailbox 创建
4. inbox 读取
5. admin 基础操作

## 工具

- Playwright

## 约束

- 当前仓库先以 smoke 级别骨架为主
- 真正的注册 / admin / mailbox e2e 需要结合本地或测试环境 API 数据准备
