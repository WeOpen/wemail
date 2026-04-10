# 开发流程规范

## 1. 分支规范

推荐分支模型：

- `main`：稳定主线
- `feature/<topic>`：功能开发
- `fix/<topic>`：缺陷修复
- `refactor/<topic>`：重构与目录治理
- `docs/<topic>`：文档更新

## 2. 开发流程

1. 先读 `docs/code-standard.md`
2. 明确需求与边界
3. 若涉及结构调整，先补 README / 架构说明
4. 优先补测试或锁定既有行为
5. 小步提交，保持 diff 可审查
6. 提交前必须运行验证命令

## 3. 提交流程

提交信息遵循仓库 Lore Commit Protocol：

- 第一行写“为什么”
- 正文写约束与方案
- trailers 记录风险、验证与拒绝方案

## 4. 最低验证要求

提交前至少执行：

```bash
pnpm test
pnpm typecheck
pnpm lint
pnpm build
```

## 5. 重构约束

- 不允许无测试保护的大范围重写
- 不允许为了“更优雅”破坏既有边界
- 先删除坏结构，再考虑新增抽象

## 6. 文档更新规则

以下变更必须同步更新文档：

- 新增关键目录
- 目录职责变化
- 分层边界变化
- 代码规范变化
- 开发流程变化

## 7. 发布前检查

- 配置是否齐全（D1 / R2 / Resend / Telegram / RATE_LIMITER）
- 环境变量是否与文档一致
- `.gitignore` 是否忽略产物与缓存
- README 是否仍与目录一致
