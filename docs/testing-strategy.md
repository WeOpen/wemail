# 测试策略

## 分层测试要求

- `packages/shared`：纯函数与规则测试
- `apps/worker`：路由、权限、store、runtime 集成测试
- `apps/web`：页面与关键交互测试

## 最低覆盖原则

1. 新增共享纯函数必须有单元测试
2. 新增后端路由必须至少覆盖成功路径与权限失败路径
3. 新增前端关键页面行为必须至少覆盖可见性与主流程交互

## 回归要求

以下场景变更后必须回归：
- 登录 / 注册
- mailbox 创建
- 消息读取
- outbound 发送
- API key 生命周期
- admin invite / quota / feature toggle
