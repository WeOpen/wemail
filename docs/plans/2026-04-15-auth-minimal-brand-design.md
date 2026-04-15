# Auth Minimal Brand Header Design

**Date:** 2026-04-15

## Goal

把登录/注册页进一步收敛成极简认证卡片：去掉模式标题和表单小标题，只保留顶部居中的 `logo + WeMail` 品牌头。

## Decisions

- auth 页顶部不再显示模式相关的 eyebrow、h1、说明文案。
- auth 页品牌头单独做成垂直布局：logo 在上，`WeMail` 在下，居中。
- tabs 继续保留并负责 `/login` 和 `/register` URL 同步。
- 表单区从输入字段直接开始，不再显示 `账号登录`、`登录到 WeMail`、`邀请码注册` 等文本标题。

## Verification

- 更新 auth 相关回归测试，确认品牌头存在且旧标题文案消失。
- 运行 web 测试、typecheck、lint、build。
