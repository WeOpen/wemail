import type { ApiKeySummary } from "@wemail/shared";

type ApiKeysPanelProps = {
  apiKeys: ApiKeySummary[];
  onCreateApiKey: (label: string) => Promise<void>;
  onRevokeApiKey: (keyId: string) => Promise<void>;
};

export function ApiKeysPanel({ apiKeys, onCreateApiKey, onRevokeApiKey }: ApiKeysPanelProps) {
  return (
    <section className="panel">
      <p className="panel-kicker">Automation</p>
      <h2>API keys</h2>
      <button onClick={() => void onCreateApiKey(`CLI key ${apiKeys.length + 1}`)}>Create API key</button>
      <div className="stack-list">
        {apiKeys.map((key) => (
          <div key={key.id} className="stack-item">
            <strong>{key.label}</strong>
            <span>{key.prefix}</span>
            <button onClick={() => void onRevokeApiKey(key.id)}>Revoke</button>
          </div>
        ))}
      </div>
    </section>
  );
}
