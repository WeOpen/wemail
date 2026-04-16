export type AnnouncementFilterOption = {
  label: string;
  value: string;
};

export type AnnouncementItem = {
  id: string;
  title: string;
  summary: string;
  type: "维护通知" | "产品更新" | "运营通知";
  status: "进行中" | "即将开始" | "已结束" | "已归档" | "已发布";
  audience: "全部成员" | "管理员" | "运营成员";
  priority: "高" | "中" | "低";
  publishedAt: string;
  updatedAt: string;
  author: string;
  tags: string[];
  pinned?: boolean;
  startAt?: string;
  endAt?: string;
};

export type AnnouncementStatusSummary = {
  label: string;
  value: string;
};

export type MaintenanceWindow = {
  id: string;
  time: string;
  title: string;
  impact: string;
};

export const announcementFilters = {
  type: [
    { label: "全部类型", value: "all" },
    { label: "维护通知", value: "maintenance" },
    { label: "产品更新", value: "product" },
    { label: "运营通知", value: "operations" }
  ] satisfies AnnouncementFilterOption[],
  status: [
    { label: "全部状态", value: "all" },
    { label: "进行中", value: "live" },
    { label: "即将开始", value: "soon" },
    { label: "已结束", value: "ended" },
    { label: "已归档", value: "archived" }
  ] satisfies AnnouncementFilterOption[],
  time: [
    { label: "全部时间", value: "all" },
    { label: "最近 24 小时", value: "24h" },
    { label: "最近 7 天", value: "7d" },
    { label: "最近 30 天", value: "30d" }
  ] satisfies AnnouncementFilterOption[]
};

export const featuredAnnouncement: AnnouncementItem = {
  id: "announcement-hero-1",
  title: "4 月核心平台升级将于本周六凌晨执行",
  summary:
    "本次升级将覆盖外发队列、账号分配策略与公告系统本身。预计维护窗口 00:30 - 02:00，期间部分后台写操作将进入只读保护。",
  type: "维护通知",
  status: "进行中",
  audience: "全部成员",
  priority: "高",
  publishedAt: "2026-04-16 18:30",
  updatedAt: "2026-04-16 18:42",
  author: "平台管理员",
  tags: ["数据库", "配额", "外发链路"],
  pinned: true,
  startAt: "04-19 00:30",
  endAt: "04-19 02:00"
};

export const announcementsTimeline: AnnouncementItem[] = [
  {
    id: "announcement-1",
    title: "系统设置新增主题偏好同步",
    summary: "主题选择会自动同步到工作台各模块，减少跨页面不一致体验。",
    type: "产品更新",
    status: "已发布",
    audience: "全部成员",
    priority: "中",
    publishedAt: "今天 14:20",
    updatedAt: "今天 14:20",
    author: "产品团队",
    tags: ["体验", "设置"]
  },
  {
    id: "announcement-2",
    title: "周六凌晨数据库维护窗口提醒",
    summary: "维护窗口内收件不受影响，部分账号管理操作可能延迟生效。",
    type: "维护通知",
    status: "即将开始",
    audience: "管理员",
    priority: "高",
    publishedAt: "昨天 21:00",
    updatedAt: "昨天 21:18",
    author: "平台管理员",
    tags: ["数据库", "运维"],
    startAt: "04-19 00:30",
    endAt: "04-19 02:00"
  },
  {
    id: "announcement-3",
    title: "邀请码投放规则调整已完成",
    summary: "从本周开始，新邀请码默认有效期调整为 14 天，停用逻辑保持不变。",
    type: "运营通知",
    status: "已结束",
    audience: "运营成员",
    priority: "低",
    publishedAt: "04-13 10:12",
    updatedAt: "04-13 10:12",
    author: "运营团队",
    tags: ["邀请码", "规则"]
  },
  {
    id: "announcement-4",
    title: "账号分配策略进入灰度验证",
    summary: "新策略会优先把高活跃邮箱分配给最近 7 天有登录记录的成员账号。",
    type: "产品更新",
    status: "进行中",
    audience: "管理员",
    priority: "中",
    publishedAt: "04-12 16:00",
    updatedAt: "04-15 09:40",
    author: "平台管理员",
    tags: ["账号", "分配", "灰度"]
  }
];

export const announcementStatusSummary: AnnouncementStatusSummary[] = [
  { label: "进行中", value: "4 条" },
  { label: "即将开始", value: "3 条" },
  { label: "本周已结束", value: "5 条" },
  { label: "已归档", value: "28 条" }
];

export const maintenanceWindows: MaintenanceWindow[] = [
  {
    id: "maintenance-1",
    time: "04-19 00:30 - 02:00",
    title: "数据库升级与配额策略重算",
    impact: "期间部分账号管理操作将进入只读保护"
  },
  {
    id: "maintenance-2",
    time: "04-21 23:00 - 23:30",
    title: "Webhook 回调链路切换",
    impact: "历史回调不受影响，新回调地址将逐步生效"
  },
  {
    id: "maintenance-3",
    time: "04-24 01:00 - 01:20",
    title: "邮件外发队列例行维护",
    impact: "外发请求可能短时排队，但不会丢失"
  }
];
