import type { CSSProperties, ReactNode } from "react";

type SwatchProps = {
  name: string;
  hex: string;
  varName?: string;
};

function Swatch({ name, hex, varName }: SwatchProps) {
  const style: CSSProperties = { background: hex };
  return (
    <div className="design-swatch">
      <span aria-hidden="true" className="design-swatch-fill" style={style} />
      <div className="design-swatch-meta">
        <strong>{name}</strong>
        <code>{hex.toUpperCase()}</code>
        {varName ? <small>{varName}</small> : null}
      </div>
    </div>
  );
}

type TokenRowProps = {
  label: string;
  value: ReactNode;
  hint?: string;
};

function TokenRow({ label, value, hint }: TokenRowProps) {
  return (
    <div className="design-token-row">
      <div className="design-token-sample">{value}</div>
      <div className="design-token-meta">
        <strong>{label}</strong>
        {hint ? <small>{hint}</small> : null}
      </div>
    </div>
  );
}

export function DesignSystemPage() {
  return (
    <main className="workspace-grid design-system-grid">
      <section className="panel workspace-card page-panel design-system-panel">
        <p className="panel-kicker">WeMail UI 系统 · v1.0</p>
        <h2>WeMail 设计系统</h2>
        <p className="section-copy">
          一套简洁、现代、易用的界面规范。所有组件与样式均基于此页展示的设计原则、色彩、字号、间距、圆角与阴影
          token 构建；新功能应优先从这里取用原语与变量,避免在业务层重造样式。
        </p>
      </section>

      <section className="panel workspace-card page-panel design-system-panel">
        <p className="panel-kicker">设计原则</p>
        <h2>四个不变量</h2>
        <div className="design-principle-grid">
          <article>
            <strong>简洁清晰</strong>
            <span>减少视觉干扰,一屏只解决一件事。</span>
          </article>
          <article>
            <strong>一致性</strong>
            <span>相同操作使用相同组件与状态表达。</span>
          </article>
          <article>
            <strong>易用性</strong>
            <span>优先键盘可达与屏幕阅读器语义。</span>
          </article>
          <article>
            <strong>可扩展</strong>
            <span>原语遵守 forwardRef + className + state 约定,便于组合。</span>
          </article>
        </div>
      </section>

      <section className="panel workspace-card page-panel design-system-panel">
        <p className="panel-kicker">色彩系统</p>
        <h2>品牌与语义色</h2>
        <div className="design-swatch-grid">
          <Swatch name="主色" hex="#ff7a00" varName="--brand-500" />
          <Swatch name="辅助色" hex="#ffb366" varName="--brand-soft-500" />
          <Swatch name="成功色" hex="#22c55e" varName="--success-500" />
          <Swatch name="警告色" hex="#f59e0b" varName="--warning-500" />
          <Swatch name="错误色" hex="#ef4444" varName="--danger-500" />
          <Swatch name="中性色" hex="#6b7280" varName="--neutral-500" />
        </div>
      </section>

      <section className="panel workspace-card page-panel design-system-panel">
        <p className="panel-kicker">间距系统</p>
        <h2>4px 网格</h2>
        <div className="design-spacing-row">
          {[4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64, 72, 80, 96, 112, 128].map((value) => (
            <div className="design-spacing-item" key={value}>
              <span aria-hidden="true" className="design-spacing-bar" style={{ width: value }} />
              <code>{value}</code>
            </div>
          ))}
        </div>
      </section>

      <section className="panel workspace-card page-panel design-system-panel">
        <p className="panel-kicker">圆角系统</p>
        <h2>6 档梯度</h2>
        <div className="design-radius-grid">
          <TokenRow
            label="xs · 4px"
            value={<span className="design-radius-demo" style={{ borderRadius: 4 }} />}
            hint="--radius-xs · 内嵌边框、标签边缘"
          />
          <TokenRow
            label="sm · 8px"
            value={<span className="design-radius-demo" style={{ borderRadius: 8 }} />}
            hint="--radius-sm · 小按钮、输入内部"
          />
          <TokenRow
            label="md · 12px"
            value={<span className="design-radius-demo" style={{ borderRadius: 12 }} />}
            hint="--radius-md · 一般按钮、标签页头部"
          />
          <TokenRow
            label="lg · 16px"
            value={<span className="design-radius-demo" style={{ borderRadius: 16 }} />}
            hint="--radius-lg · 输入框、卡片内嵌"
          />
          <TokenRow
            label="xl · 24px"
            value={<span className="design-radius-demo" style={{ borderRadius: 24 }} />}
            hint="--radius-xl · 卡片外壳"
          />
          <TokenRow
            label="full · 9999px"
            value={<span className="design-radius-demo" style={{ borderRadius: 9999 }} />}
            hint="--radius-full · 头像、pill、switch 轨道"
          />
        </div>
      </section>

      <section className="panel workspace-card page-panel design-system-panel">
        <p className="panel-kicker">阴影系统</p>
        <h2>5 档层级</h2>
        <div className="design-shadow-grid">
          {[
            { name: "xs", varName: "--elevation-xs" },
            { name: "sm", varName: "--elevation-sm" },
            { name: "md", varName: "--elevation-md" },
            { name: "lg", varName: "--elevation-lg" },
            { name: "xl", varName: "--elevation-xl" }
          ].map(({ name, varName }) => (
            <div className="design-shadow-card" key={name} style={{ boxShadow: `var(${varName})` }}>
              <strong>{name}</strong>
              <code>{varName}</code>
            </div>
          ))}
        </div>
      </section>

      <section className="panel workspace-card page-panel design-system-panel">
        <p className="panel-kicker">字号系统</p>
        <h2>7 档语义字号</h2>
        <div className="design-typography-grid">
          <div style={{ fontSize: 48, lineHeight: 1.1 }}>显示大号 · 48/1.1</div>
          <div style={{ fontSize: 32, lineHeight: 1.2 }}>显示中号 · 32/1.2</div>
          <div style={{ fontSize: 24, lineHeight: 1.3 }}>标题大号 · 24/1.3</div>
          <div style={{ fontSize: 20, lineHeight: 1.35 }}>标题中号 · 20/1.35</div>
          <div style={{ fontSize: 16, lineHeight: 1.55 }}>正文大号 · 16/1.55</div>
          <div style={{ fontSize: 14, lineHeight: 1.55 }}>正文中号 · 14/1.55</div>
          <div style={{ fontSize: 12, lineHeight: 1.45 }}>辅助说明 · 12/1.45</div>
        </div>
      </section>

      <section className="panel workspace-card page-panel design-system-panel">
        <p className="panel-kicker">组件库</p>
        <h2>原语预览</h2>
        <p className="section-copy">
          所有原语（Button / Form / Table / Switch / Tabs 等）将在后续 Sprint 陆续接入本页。目前可以查看各自仓库目录下的
          README：<code>apps/web/src/shared/</code>。
        </p>
      </section>
    </main>
  );
}
