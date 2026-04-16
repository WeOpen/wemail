import {
  announcementFilters,
  announcementsTimeline,
  announcementStatusSummary,
  featuredAnnouncement,
  maintenanceWindows,
  type AnnouncementItem
} from "../features/announcements/announcementsMockData";

function typeClassName(type: AnnouncementItem["type"]) {
  switch (type) {
    case "维护通知":
      return "maintenance";
    case "产品更新":
      return "product";
    case "运营通知":
      return "operations";
    default:
      return "default";
  }
}

function statusClassName(status: AnnouncementItem["status"]) {
  switch (status) {
    case "进行中":
      return "live";
    case "即将开始":
      return "soon";
    case "已结束":
      return "ended";
    case "已归档":
      return "archived";
    case "已发布":
      return "published";
    default:
      return "default";
  }
}

export function AnnouncementsPage() {
  return (
    <main className="workspace-grid announcements-grid">
      <section className="panel workspace-card announcements-control-bar" aria-label="公告控制条">
        <label className="announcements-search-field">
          <span className="sr-only">公告搜索</span>
          <input aria-label="公告搜索" placeholder="搜索标题 / 内容 / 标签" readOnly type="search" />
        </label>

        <label className="announcements-filter-field">
          <span className="sr-only">按类型筛选公告</span>
          <select aria-label="按类型筛选公告" defaultValue="all">
            {announcementFilters.type.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="announcements-filter-field">
          <span className="sr-only">按状态筛选公告</span>
          <select aria-label="按状态筛选公告" defaultValue="all">
            {announcementFilters.status.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="announcements-filter-field">
          <span className="sr-only">按时间筛选公告</span>
          <select aria-label="按时间筛选公告" defaultValue="all">
            {announcementFilters.time.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </section>

      <section className="panel workspace-card announcements-hero-card">
        <div className="announcements-hero-copy">
          <p className="panel-kicker">置顶公告</p>
          <h1>{featuredAnnouncement.title}</h1>
          <p className="section-copy announcements-hero-description">{featuredAnnouncement.summary}</p>
          <div className="announcements-chip-row">
            <span className={`announcements-chip ${typeClassName(featuredAnnouncement.type)}`}>{featuredAnnouncement.type}</span>
            <span className={`announcements-chip ${statusClassName(featuredAnnouncement.status)}`}>{featuredAnnouncement.status}</span>
            <span className="announcements-chip neutral">发布者：{featuredAnnouncement.author}</span>
            <span className="announcements-chip neutral">发布时间：{featuredAnnouncement.publishedAt}</span>
          </div>
        </div>

        <div className="announcements-hero-meta">
          <article className="announcements-meta-card">
            <span>生效公告</span>
            <strong>8</strong>
            <small>当前对全员可见</small>
          </article>
          <article className="announcements-meta-card">
            <span>即将开始</span>
            <strong>3</strong>
            <small>24h 内计划公告</small>
          </article>
          <article className="announcements-meta-card">
            <span>本周更新</span>
            <strong>12</strong>
            <small>产品 + 运维混合</small>
          </article>
        </div>
      </section>

      <div className="announcements-main-grid">
        <section className="panel workspace-card announcements-panel">
          <div className="announcements-panel-head">
            <div>
              <p className="panel-kicker">时间线</p>
              <h2>最近公告</h2>
            </div>
            <p className="section-copy">左侧主列表按最近更新时间排序，管理员和成员都从这里继续往下读。</p>
          </div>

          <div className="announcements-timeline">
            {announcementsTimeline.map((announcement) => (
              <article className="announcements-item" key={announcement.id}>
                <div className="announcements-item-head">
                  <div className="announcements-item-title">
                    <div className="announcements-chip-row">
                      <span className={`announcements-chip ${typeClassName(announcement.type)}`}>{announcement.type}</span>
                      <span className={`announcements-chip ${statusClassName(announcement.status)}`}>{announcement.status}</span>
                    </div>
                    <h3>{announcement.title}</h3>
                  </div>
                  <span className="announcements-item-time">{announcement.publishedAt}</span>
                </div>

                <p className="section-copy announcements-item-summary">{announcement.summary}</p>

                <div className="announcements-item-footer">
                  <span>范围：{announcement.audience}</span>
                  <span>优先级：{announcement.priority}</span>
                  <span>标签：{announcement.tags.join(" / ")}</span>
                  <span>更新：{announcement.updatedAt}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <div className="announcements-side-stack">
          <section className="panel workspace-card announcements-panel">
            <div className="announcements-panel-head">
              <div>
                <p className="panel-kicker">概览</p>
                <h2>状态概览</h2>
              </div>
              <p className="section-copy">帮助管理员快速判断当前有哪些公告正在生效、计划中或已归档。</p>
            </div>

            <div className="announcements-summary-list">
              {announcementStatusSummary.map((item) => (
                <article className="announcements-summary-row" key={item.label}>
                  <strong>{item.label}</strong>
                  <span>{item.value}</span>
                </article>
              ))}
            </div>
          </section>

          <section className="panel workspace-card announcements-panel">
            <div className="announcements-panel-head">
              <div>
                <p className="panel-kicker">窗口</p>
                <h2>近期维护窗口</h2>
              </div>
              <p className="section-copy">强化系统维护场景，帮助管理员从公告页直接理解接下来的影响窗口。</p>
            </div>

            <div className="announcements-maintenance-list">
              {maintenanceWindows.map((window) => (
                <article className="announcements-maintenance-card" key={window.id}>
                  <strong>{window.time}</strong>
                  <span>{window.title}</span>
                  <small>{window.impact}</small>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
