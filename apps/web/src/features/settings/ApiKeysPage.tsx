import { useMemo, useState } from "react";

import type { ApiKeySummary } from "@wemail/shared";

import { IntegrationChoiceCard, SettingsSupportCard } from "./SettingsSupport";

type CreateApiKeyResult = {
  key: {
    secret: string;
    prefix: string;
  };
};

type ApiKeysPageProps = {
  apiKeys: ApiKeySummary[];
  onCreateApiKey: (label: string) => Promise<CreateApiKeyResult>;
  onRevokeApiKey: (keyId: string) => Promise<void>;
};

type RevealState = {
  label: string;
  prefix: string;
  secret: string;
};

function formatDate(value: string | null) {
  if (!value) return "尚未使用";
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(value));
}

function getStatusLabel(key: ApiKeySummary) {
  if (key.revokedAt) return "已吊销";
  if (!key.lastUsedAt) return "从未使用";
  return "正常";
}

async function copyText(text: string) {
  if (typeof navigator === "undefined" || !navigator.clipboard) return;
  await navigator.clipboard.writeText(text);
}

export function ApiKeysPage({ apiKeys, onCreateApiKey, onRevokeApiKey }: ApiKeysPageProps) {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [label, setLabel] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [pendingRevokeId, setPendingRevokeId] = useState<string | null>(null);
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [revealState, setRevealState] = useState<RevealState | null>(null);

  const summary = useMemo(() => {
    const activeKeys = apiKeys.filter((key) => !key.revokedAt);
    const unusedKeys = activeKeys.filter((key) => !key.lastUsedAt).length;
    const revokedKeys = apiKeys.length - activeKeys.length;
    return {
      activeKeys: activeKeys.length,
      unusedKeys,
      revokedKeys
    };
  }, [apiKeys]);

  const quickstartSecret = revealState?.secret ?? "<your-api-key>";
  const curlExample = `curl https://api.example.com/messages \\\n  -H "Authorization: Bearer ${quickstartSecret}"`;

  const handleCreate = async () => {
    const nextLabel = label.trim();
    if (!nextLabel) return;
    setIsCreating(true);
    try {
      const payload = await onCreateApiKey(nextLabel);
      setRevealState({
        label: nextLabel,
        prefix: payload.key.prefix,
        secret: payload.key.secret
      });
      setLabel("");
      setIsCreateOpen(false);
    } finally {
      setIsCreating(false);
    }
  };

  const handleRevoke = async (keyId: string) => {
    if (typeof window !== "undefined" && !window.confirm("吊销后，所有依赖该密钥的脚本都会立即失效。确认继续吗？")) {
      return;
    }
    setPendingRevokeId(keyId);
    try {
      await onRevokeApiKey(keyId);
    } finally {
      setPendingRevokeId(null);
    }
  };

  const handleCopy = async (token: string, text: string) => {
    await copyText(text);
    setCopiedToken(token);
    window.setTimeout(() => setCopiedToken((current) => (current === token ? null : current)), 1500);
  };

  return (
    <main className="workspace-grid integration-page-grid">
      <div className="integration-primary-column">
        <section className="panel workspace-card page-panel integration-surface-card">
          <div className="workspace-card-header">
            <div className="integration-card-copy">
              <p className="panel-kicker">个人凭证</p>
              <h2>API 密钥</h2>
              <p className="section-copy">
                创建并管理用于访问 WeMail API 的个人凭证。适用于脚本、CLI、自动化任务和外部系统接入。
              </p>
            </div>
            <button className="workspace-action-button primary" onClick={() => setIsCreateOpen(true)} type="button">
              创建密钥
            </button>
          </div>

          {isCreateOpen ? (
            <section className="integration-inline-composer" aria-label="创建 API 密钥">
              <div className="integration-card-copy compact">
                <p className="panel-kicker">创建流程</p>
                <h3>创建新的 API 密钥</h3>
                <p className="section-copy">为不同用途命名不同密钥，后续排查与吊销时会更清晰。</p>
              </div>
              <div className="integration-form-grid">
                <label htmlFor="api-key-label">密钥名称</label>
                <input
                  id="api-key-label"
                  name="label"
                  onChange={(event) => setLabel(event.target.value)}
                  placeholder="例如：个人 CLI / 本地脚本 / 自动化工作流"
                  value={label}
                />
              </div>
              <div className="workspace-dialog-actions integration-inline-actions">
                <button className="workspace-action-button ghost" onClick={() => setIsCreateOpen(false)} type="button">
                  取消
                </button>
                <button className="workspace-action-button primary" disabled={isCreating || label.trim().length === 0} onClick={() => void handleCreate()} type="button">
                  {isCreating ? "创建中..." : "确认创建"}
                </button>
              </div>
            </section>
          ) : null}

          {revealState ? (
            <section className="integration-highlight-card" aria-live="polite">
              <div className="integration-card-copy compact">
                <p className="panel-kicker">已创建</p>
                <h3>新密钥已生成</h3>
                <p className="section-copy">出于安全原因，这个密钥只会显示一次，请立即复制并安全保存。</p>
              </div>
              <div className="integration-secret-block">
                <strong>{revealState.label}</strong>
                <code>{revealState.secret}</code>
                <small>前缀：{revealState.prefix}</small>
              </div>
              <div className="integration-inline-actions">
                <button
                  className="workspace-action-button secondary"
                  onClick={() => void handleCopy("secret", revealState.secret)}
                  type="button"
                >
                  {copiedToken === "secret" ? "已复制密钥" : "复制密钥"}
                </button>
                <button className="workspace-action-button ghost" onClick={() => setRevealState(null)} type="button">
                  我已安全保存
                </button>
              </div>
            </section>
          ) : null}

          {apiKeys.length > 0 ? (
            <div className="integration-record-list" role="list">
              {apiKeys.map((key) => {
                const headerSnippet = `Authorization: Bearer ${key.prefix}...`;
                return (
                  <article className="integration-record-row" key={key.id} role="listitem">
                    <div className="integration-record-copy">
                      <strong>{key.label}</strong>
                      <span>{key.prefix}</span>
                    </div>
                    <div className="integration-record-meta">
                      <small>创建于 {formatDate(key.createdAt)}</small>
                      <small>最近使用：{formatDate(key.lastUsedAt)}</small>
                    </div>
                    <span className="integration-status-pill">{getStatusLabel(key)}</span>
                    <div className="integration-inline-actions">
                      <button
                        className="workspace-action-button ghost"
                        onClick={() => void handleCopy(`header-${key.id}`, headerSnippet)}
                        type="button"
                      >
                        {copiedToken === `header-${key.id}` ? "已复制示例" : "复制示例"}
                      </button>
                      <button
                        className="workspace-action-button secondary"
                        disabled={Boolean(key.revokedAt) || pendingRevokeId === key.id}
                        onClick={() => void handleRevoke(key.id)}
                        type="button"
                      >
                        {key.revokedAt ? "已吊销" : pendingRevokeId === key.id ? "吊销中..." : "吊销"}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="integration-empty-state">
              <strong>创建你的第一个 API 密钥</strong>
              <p className="section-copy">创建后，你可以通过脚本、CLI 或外部系统安全地访问 WeMail API。</p>
            </div>
          )}
        </section>

        <section className="panel workspace-card page-panel integration-surface-card">
          <div className="integration-card-copy">
            <p className="panel-kicker">快速开始</p>
            <h3>快速开始</h3>
            <p className="section-copy">把 API 密钥放到 Authorization Header 中，即可用最熟悉的 HTTP 方式访问受保护接口。</p>
          </div>
          <div className="integration-code-block">
            <span>Authorization Header</span>
            <pre>{`Authorization: Bearer ${quickstartSecret}`}</pre>
          </div>
          <div className="integration-code-block">
            <span>curl 示例</span>
            <pre>{curlExample}</pre>
          </div>
          <div className="integration-inline-actions">
            <button className="workspace-action-button secondary" onClick={() => void handleCopy("curl", curlExample)} type="button">
              {copiedToken === "curl" ? "已复制代码" : "复制代码"}
            </button>
          </div>
        </section>
      </div>

      <aside className="integration-secondary-column">
        <SettingsSupportCard kicker="当前状态" title="接入状态概览" description="让你快速判断当前有哪些可用密钥、哪些仍未接入实际调用。">
          <div className="integration-stat-list">
            <article className="integration-stat-row">
              <strong>活跃密钥</strong>
              <span>{summary.activeKeys}</span>
            </article>
            <article className="integration-stat-row">
              <strong>从未使用</strong>
              <span>{summary.unusedKeys}</span>
            </article>
            <article className="integration-stat-row">
              <strong>已吊销</strong>
              <span>{summary.revokedKeys}</span>
            </article>
          </div>
        </SettingsSupportCard>

        <SettingsSupportCard kicker="安全建议" title="安全建议" description="这类凭证几乎等同于你的自动化身份，建议把风险提示直接放在页面里，而不是只写在文档里。">
          <ul className="integration-bullet-list">
            <li>不要把密钥写死在前端代码或公开仓库里。</li>
            <li>优先放进环境变量，不同用途使用不同密钥。</li>
            <li>发现泄露风险时，先吊销再创建新密钥。</li>
          </ul>
        </SettingsSupportCard>

        <IntegrationChoiceCard current="api-keys" />
      </aside>
    </main>
  );
}
