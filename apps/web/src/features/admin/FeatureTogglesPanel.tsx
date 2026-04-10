import type { FeatureToggles } from "@wemail/shared";

type FeatureTogglesPanelProps = {
  adminFeatures: FeatureToggles | null;
  onToggleFeatures: (nextFeatureToggles: FeatureToggles) => Promise<void>;
};

export function FeatureTogglesPanel({
  adminFeatures,
  onToggleFeatures
}: FeatureTogglesPanelProps) {
  return (
    <section className="panel">
      <p className="panel-kicker">Feature toggles</p>
      <h2>Launch guardrails</h2>
      {adminFeatures ? (
        <div className="toggle-grid">
          {Object.entries(adminFeatures).map(([key, value]) => (
            <label key={key} className="toggle-card">
              <input
                type="checkbox"
                checked={value}
                onChange={(event) =>
                  void onToggleFeatures({
                    ...adminFeatures,
                    [key]: event.target.checked
                  })
                }
              />
              <span>{key}</span>
            </label>
          ))}
        </div>
      ) : null}
    </section>
  );
}
