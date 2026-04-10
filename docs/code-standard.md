# 代码规范（前后端统一）

> 本规范结合 TypeScript / React / Node & Cloudflare Worker 社区主流实践整理，重点参考 Google TypeScript Style Guide、Airbnb JavaScript Style Guide、React 官方文档与主流开源项目的目录治理方式。

参考来源：
- Google TypeScript Style Guide: https://google.github.io/styleguide/tsguide.html
- Airbnb JavaScript Style Guide: https://github.com/airbnb/javascript
- React Docs（组件、Hooks、组合）: https://react.dev/
- Google Developer Documentation Style Guide: https://developers.google.com/style

---

## 1. 总原则

1. **可读性优先于炫技**
2. **一致性优先于个人偏好**
3. **分层边界优先于临时方便**
4. **组合优先于复制，复制优先于错误抽象**
5. **文档与目录职责必须和真实代码同步**

---

## 2. 命名规范

## 2.1 通用命名

### 变量 / 函数
- 使用 `camelCase`
- 名称必须是“业务词 + 语义词”，避免泛化命名
- 示例：
  - `refreshSession`
  - `buildMailboxAddress`
  - `handleCreateInvite`
- 禁止：
  - `data`
  - `temp`
  - `obj`
  - `doStuff`
  - `handle`（没有宾语）

### 类型 / 接口 / 枚举
- 使用 `PascalCase`
- 类型名要体现边界与角色
- 示例：
  - `SessionSummary`
  - `ApiKeySummary`
  - `AppBindings`

### React 组件
- 文件名与导出名都使用 `PascalCase`
- 组件名必须体现 UI 角色
- 示例：
  - `InboxPage.tsx`
  - `AdminPage.tsx`
  - `AuthPage.tsx`

### Hook
- 统一 `useXxx`
- 只给真正的 Hook 使用 `use` 前缀
- 禁止把普通函数命名成 Hook 风格

### 布尔值
- 优先使用可判读前缀：
  - `is`
  - `has`
  - `can`
  - `should`
  - `enable/disabled` 成对使用时保持统一
- 示例：
  - `isAdmin`
  - `hasInvite`
  - `canCreateMailbox`

### 异步函数
- 使用动词开头，避免 `doXxx`
- 若函数本身就是异步流程，不强制加 `async` 前缀
- 示例：
  - `refreshMessages`
  - `saveFeatureToggles`
  - `processInboundEmail`

---

## 2.2 文件命名

### TypeScript / Worker / 通用逻辑文件
- 使用 `kebab-case.ts` 或具有明确语义的目录命名
- 当前已存在的 `camelCase.ts` 文件可逐步迁移，但新增文件优先 `kebab-case`

### React 组件文件
- 使用 `PascalCase.tsx`

### 测试文件
- 使用 `*.test.ts` / `*.test.tsx`
- 与被测对象就近或放入统一 `test/` 目录

### README 文件
- 统一使用 `README.md`
- 每个关键目录一个

---

## 2.3 目录命名

- 目录统一使用 `kebab-case`
- 层级目录优先语义化，不要出现：
  - `misc`
  - `common2`
  - `temp`
  - `new`
  - `others`

推荐目录名：
- `app`
- `pages`
- `features`
- `shared`
- `infrastructure`
- `persistence`
- `core`
- `test`

---

## 3. 格式化规范

## 3.1 基础格式
- 使用 **UTF-8** 编码
- 统一使用 **LF** 行尾（Windows 开发时通过工具链保持一致）
- 缩进统一 **2 spaces**
- 多行对象 / 数组 / 参数列表允许尾随逗号
- 统一使用 **double quotes**（与当前项目实现一致）
- 保持 import 分组清晰：
  1. 第三方
  2. workspace 包
  3. 相对路径

## 3.2 行宽
- 软限制 `100` 左右
- 超过时优先换行，不要横向拥挤

## 3.3 空行
- 逻辑块之间保留空行
- import 与正文之间保留一个空行
- 不要为了“好看”加入过多空行

## 3.4 JSX / TSX
- 属性较多时换行
- 单个组件不要塞进过多业务逻辑
- 页面 JSX 过长时拆分页面区块组件

---

## 4. 注释规范

## 4.1 注释原则
- **注释解释“为什么”，不是重复“做了什么”**
- 代码能自解释时，优先改好命名，而不是补废话注释

### 好注释
- 解释设计约束
- 解释边界条件
- 解释业务规则
- 解释平台限制

### 坏注释
- `// set value`
- `// loop through array`
- `// call api`

## 4.2 何时必须写注释
- 平台限制（如 Cloudflare / D1 / R2 / Workers AI）
- 安全敏感逻辑
- 看起来“反直觉”的实现
- 临时兼容逻辑（并注明未来移除条件）

## 4.3 导出函数 / 类型注释
- 不是所有函数都必须 JSDoc
- 以下场景建议写 JSDoc：
  - 导出的公共函数
  - 复杂转换逻辑
  - 业务规则函数
  - 复用率高的工具函数

---

## 5. 前端规范

## 5.1 目录职责
- `app/`：入口、路由、全局装配、应用编排
- `pages/`：页面级组合
- `features/`：业务特性
- `shared/`：通用工具、api client、样式、基础 UI
- `test/`：测试工具与页面级测试

## 5.2 组件规范
- 页面组件负责“组合”，不负责底层通用能力
- 特性组件只处理单一业务主题
- 表现组件与数据逻辑尽量分离
- 单个组件过长时拆分，不允许无上限膨胀

## 5.3 状态管理
- 优先本地状态 + 清晰的 props 边界
- 不为简单场景引入重型状态管理器
- 页面编排状态放 `app/` 或页面容器层
- 通用状态工具再进入 `shared/`

## 5.4 API 调用
- 统一通过 `shared/api/` 收口
- 页面/组件不要散落重复 fetch 包装代码
- 错误处理策略统一

## 5.5 样式规范
- 全局样式放 `shared/styles/`
- 组件级样式优先靠组件命名与局部 class 约束
- 不允许魔法颜色与阴影到处复制
- 颜色、间距、圆角优先抽成变量或统一风格

## 5.6 React 规则
- Hook 只在顶层调用
- `useEffect` 只处理副作用，不处理纯计算
- 纯计算优先 `useMemo` 或直接表达式
- 事件逻辑以 `handleXxx` 命名
- 不要在渲染路径里创建不必要的副作用

---

## 6. 后端规范

## 6.1 目录职责
- `app/`：应用装配、路由注册、流程编排
- `core/`：核心契约、绑定类型、上下文定义
- `infrastructure/`：数据库、对象存储、第三方集成、持久化
- `shared/`：通用安全、邮件解析、纯辅助逻辑

## 6.2 路由层规范
- 做参数接收、权限校验、调用用例、返回响应
- 不直接写复杂业务逻辑
- 不直接拼装底层存储细节

## 6.3 业务逻辑规范
- 业务规则写在应用流程 / service / runtime 层
- 不允许在 handler 中堆积大量规则判断
- 同一规则不要复制到多个 handler

## 6.4 存储层规范
- D1 / R2 / 外部服务访问统一放 `infrastructure/`
- 不允许页面层或 shared 层反向依赖存储实现
- SQL 要保持可读，不要内联成大段不可维护字符串

## 6.5 安全规范
- Cookie、API Key、密码哈希必须集中管理
- 不允许在业务代码里散落安全细节
- API key 只能访问允许的 user-core 路由
- session 与 admin 权限校验必须明确且单点可查

## 6.6 错误处理
- 统一返回明确错误信息
- 错误文案要区分：
  - 参数错误
  - 权限错误
  - 资源不存在
  - 外部依赖失败
- 禁止吞错不报

---

## 7. 测试规范

## 7.1 基本原则
- 新功能优先补最小必要测试
- 重构前先锁定已有行为
- 测试名称要写出行为，不写实现细节

## 7.2 测试层级
- 纯函数：单元测试
- 路由 / store / service：集成测试
- 页面关键路径：组件测试或 e2e

## 7.3 测试命名
- 使用行为语义：
  - `renders the hero copy for signed-out users`
  - `requires a valid invite for registration`
- 禁止：
  - `test 1`
  - `should work`

## 7.4 测试目录
- 前端统一收敛在 `src/test/`
- Worker 测试保留在 `tests/`
- shared 测试保留在 `tests/`

---

## 8. Import 与依赖规范

## 8.1 Import 顺序
1. 平台 / 第三方依赖
2. workspace 包（如 `@wemail/shared`）
3. 相对路径模块

## 8.2 依赖方向
- `app -> pages/features/shared`
- `pages -> features/shared`
- `features -> shared`
- `shared -> 不依赖 pages/features`

后端：
- `app -> core/infrastructure/shared`
- `infrastructure -> core/shared`
- `shared -> 不依赖 infrastructure 实现`

---

## 9. README 规范

每个关键目录 `README.md` 必须写清楚：
1. 目录职责
2. 应该放什么
3. 不应该放什么
4. 与相邻层的依赖边界
5. 常见错误示例

README 不是摆设，目录调整后必须同步更新。

---

## 10. 禁止事项

- 一个文件承担多个层的职责
- 页面直接写数据库/存储逻辑
- 路由里堆积所有业务规则
- 复制粘贴同类 fetch / response / mapping 逻辑
- 用 `common`, `utils2`, `temp`, `new` 命名目录
- 为未来“也许会用”先建抽象
- 把生成产物、缓存、临时日志提交进仓库

---

## 11. 本项目落地要求

从现在开始，新增代码必须遵守：

- 前端入口与编排只放 `apps/web/src/app/`
- 前端页面只放 `apps/web/src/pages/`
- 前端共享能力只放 `apps/web/src/shared/`
- 后端装配逻辑只放 `apps/worker/src/app/`
- 后端绑定与契约只放 `apps/worker/src/core/`
- 后端持久化与外部集成只放 `apps/worker/src/infrastructure/`
- 后端通用安全/解析工具只放 `apps/worker/src/shared/`
- 共享纯逻辑只放 `packages/shared/src/`

如果一个文件不知道放哪，说明边界还没想清楚，先补 README 或补架构说明，再写代码。
