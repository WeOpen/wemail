# Contributing Guide

感谢参与 `wemail` 的开发。

## 1. 开始前先阅读

- `docs/code-standard.md`
- `docs/development-workflow.md`
- `docs/testing-strategy.md`
- `docs/release-checklist.md`
- `docs/code-review-checklist.md`

## 2. 分支规范

- `feature/<topic>`：功能开发
- `fix/<topic>`：缺陷修复
- `refactor/<topic>`：结构重构
- `docs/<topic>`：文档更新

不要直接在 `main` 上进行长期开发。

## 3. 提交流程

提交信息必须遵守仓库的 Lore Commit Protocol：

- 第一行写“为什么”
- 正文说明约束、方案、取舍
- trailers 记录验证、风险和 rejected alternatives

## 4. 开发约束

- 先确认目录职责，再写代码
- 结构变更必须同步更新 README / docs
- 优先小步修改，保持 diff 可审查
- 不要把生成产物、缓存目录、临时日志提交进仓库

## 5. 验证要求

提交前至少运行：

```bash
pnpm test
pnpm typecheck
pnpm lint
pnpm build
```

## 6. 代码评审关注点

- 是否遵守分层边界
- 是否引入重复逻辑
- 是否补了必要测试
- 是否同步更新文档
- 是否维持目录 README 的正确性

## 7. Pull Request 要求

- 说明变更目的
- 说明影响范围
- 提供验证结果
- 说明剩余风险和后续工作
