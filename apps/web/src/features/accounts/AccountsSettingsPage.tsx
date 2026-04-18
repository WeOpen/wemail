import { useState } from "react";

import { mailboxAccountPolicyMock } from "./accountsMockData";

export function AccountsSettingsPage() {
  const [defaultTagsEnabled, setDefaultTagsEnabled] = useState(mailboxAccountPolicyMock.creation.defaultTagsEnabled);
  const [defaultTags, setDefaultTags] = useState(mailboxAccountPolicyMock.creation.defaultTags);
  const [allowCreationOverride, setAllowCreationOverride] = useState(mailboxAccountPolicyMock.creation.allowCreationOverride);
  const [defaultStatus, setDefaultStatus] = useState(mailboxAccountPolicyMock.creation.defaultStatus);
  const [requireCreatorNote, setRequireCreatorNote] = useState(mailboxAccountPolicyMock.creation.requireCreatorNote);
  const [creationSaved, setCreationSaved] = useState(false);

  const [inactiveDays, setInactiveDays] = useState(mailboxAccountPolicyMock.lifecycle.inactiveDays);
  const [inactiveAction, setInactiveAction] = useState(mailboxAccountPolicyMock.lifecycle.inactiveAction);
  const [softDeleteRetentionDays, setSoftDeleteRetentionDays] = useState(mailboxAccountPolicyMock.lifecycle.softDeleteRetentionDays);
  const [allowHardDelete, setAllowHardDelete] = useState(mailboxAccountPolicyMock.lifecycle.allowHardDelete);
  const [requireSoftDeleteBeforeHardDelete, setRequireSoftDeleteBeforeHardDelete] = useState(
    mailboxAccountPolicyMock.lifecycle.requireSoftDeleteBeforeHardDelete
  );
  const [savedAllowHardDelete, setSavedAllowHardDelete] = useState(mailboxAccountPolicyMock.lifecycle.allowHardDelete);
  const [lifecycleSaved, setLifecycleSaved] = useState(false);
  const [showDangerConfirm, setShowDangerConfirm] = useState(false);

  const [confirmStandardBulkActions, setConfirmStandardBulkActions] = useState(
    mailboxAccountPolicyMock.protection.confirmStandardBulkActions
  );
  const [standardBulkLimit, setStandardBulkLimit] = useState(mailboxAccountPolicyMock.protection.standardBulkLimit);
  const [requireDangerPhrase, setRequireDangerPhrase] = useState(mailboxAccountPolicyMock.protection.requireDangerPhrase);
  const [hardDeleteLimit, setHardDeleteLimit] = useState(mailboxAccountPolicyMock.protection.hardDeleteLimit);
  const [auditLoggingEnabled, setAuditLoggingEnabled] = useState(mailboxAccountPolicyMock.protection.auditLoggingEnabled);
  const [protectionSaved, setProtectionSaved] = useState(false);

  const [lastUpdatedLabel, setLastUpdatedLabel] = useState(mailboxAccountPolicyMock.lastUpdatedLabel);

  function markUpdated() {
    setLastUpdatedLabel("刚刚更新");
  }

  function saveCreationRules() {
    setCreationSaved(true);
    markUpdated();
  }

  function saveLifecycleRules() {
    if (allowHardDelete && !savedAllowHardDelete) {
      setShowDangerConfirm(true);
      return;
    }

    setSavedAllowHardDelete(allowHardDelete);
    setLifecycleSaved(true);
    markUpdated();
  }

  function confirmDangerousLifecycleChange() {
    setSavedAllowHardDelete(allowHardDelete);
    setLifecycleSaved(true);
    setShowDangerConfirm(false);
    markUpdated();
  }

  function cancelDangerousLifecycleChange() {
    setAllowHardDelete(savedAllowHardDelete);
    setShowDangerConfirm(false);
  }

  function saveProtectionRules() {
    setProtectionSaved(true);
    markUpdated();
  }

  return (
    <>
      <main className="workspace-grid integration-page-grid accounts-settings-page">
        <div className="integration-primary-column">
          <section className="panel workspace-card page-panel integration-surface-card accounts-settings-intro-card">
            <div className="workspace-card-header">
              <div className="integration-card-copy">
                <p className="panel-kicker">账号中心</p>
                <h2>账号设置</h2>
                <p className="section-copy">为所有邮箱账号定义默认创建规则、生命周期规则与批量操作保护，先以 mock-first 方式固化全局策略中心结构。</p>
              </div>
            </div>
          </section>

          <section className="panel workspace-card page-panel integration-surface-card accounts-settings-section">
            <p className="panel-kicker">创建规则</p>
            <h3>默认创建规则</h3>

            <label>
              <input
                checked={defaultTagsEnabled}
                onChange={(event) => {
                  setDefaultTagsEnabled(event.target.checked);
                  setCreationSaved(false);
                }}
                type="checkbox"
              />
              自动附加默认标签
            </label>

            <label>
              默认标签
              <input
                onChange={(event) => {
                  setDefaultTags(event.target.value);
                  setCreationSaved(false);
                }}
                type="text"
                value={defaultTags}
              />
            </label>

            <label>
              默认状态
              <select
                onChange={(event) => {
                  setDefaultStatus(event.target.value as typeof defaultStatus);
                  setCreationSaved(false);
                }}
                value={defaultStatus}
              >
                <option value="启用">启用</option>
                <option value="停用">停用</option>
                <option value="待审核">待审核</option>
              </select>
            </label>

            <label>
              <input
                checked={allowCreationOverride}
                onChange={(event) => {
                  setAllowCreationOverride(event.target.checked);
                  setCreationSaved(false);
                }}
                type="checkbox"
              />
              允许创建时覆盖默认标签
            </label>

            <label>
              <input
                checked={requireCreatorNote}
                onChange={(event) => {
                  setRequireCreatorNote(event.target.checked);
                  setCreationSaved(false);
                }}
                type="checkbox"
              />
              创建账号时要求备注
            </label>

            <button className="workspace-action-button primary" onClick={saveCreationRules} type="button">
              保存默认创建规则
            </button>
            {creationSaved ? <p role="status">默认创建规则已保存</p> : null}
          </section>

          <section className="panel workspace-card page-panel integration-surface-card accounts-settings-section">
            <p className="panel-kicker">生命周期</p>
            <h3>生命周期规则</h3>

            <label>
              不活跃阈值（天）
              <input
                min={1}
                onChange={(event) => {
                  setInactiveDays(Number(event.target.value));
                  setLifecycleSaved(false);
                }}
                type="number"
                value={inactiveDays}
              />
            </label>

            <label>
              不活跃后动作
              <select
                onChange={(event) => {
                  setInactiveAction(event.target.value as typeof inactiveAction);
                  setLifecycleSaved(false);
                }}
                value={inactiveAction}
              >
                <option value="仅标记">仅标记</option>
                <option value="自动停用">自动停用</option>
                <option value="自动归档">自动归档</option>
              </select>
            </label>

            <label>
              软删除保留期（天）
              <input
                min={1}
                onChange={(event) => {
                  setSoftDeleteRetentionDays(Number(event.target.value));
                  setLifecycleSaved(false);
                }}
                type="number"
                value={softDeleteRetentionDays}
              />
            </label>

            <label>
              <input
                aria-label="允许彻底删除"
                checked={allowHardDelete}
                onChange={(event) => {
                  setAllowHardDelete(event.target.checked);
                  setLifecycleSaved(false);
                }}
                type="checkbox"
              />
              允许彻底删除
            </label>

            <label>
              <input
                checked={requireSoftDeleteBeforeHardDelete}
                onChange={(event) => {
                  setRequireSoftDeleteBeforeHardDelete(event.target.checked);
                  setLifecycleSaved(false);
                }}
                type="checkbox"
              />
              彻底删除前必须先软删除
            </label>

            <button className="workspace-action-button primary" onClick={saveLifecycleRules} type="button">
              保存生命周期规则
            </button>
            {lifecycleSaved ? <p role="status">生命周期规则已保存</p> : null}
          </section>

          <section className="panel workspace-card page-panel integration-surface-card accounts-settings-section">
            <p className="panel-kicker">操作保护</p>
            <h3>批量操作保护</h3>

            <label>
              <input
                checked={confirmStandardBulkActions}
                onChange={(event) => {
                  setConfirmStandardBulkActions(event.target.checked);
                  setProtectionSaved(false);
                }}
                type="checkbox"
              />
              普通批量操作显示确认弹窗
            </label>

            <label>
              单次普通批量操作上限
              <input
                min={1}
                onChange={(event) => {
                  setStandardBulkLimit(Number(event.target.value));
                  setProtectionSaved(false);
                }}
                type="number"
                value={standardBulkLimit}
              />
            </label>

            <label>
              <input
                checked={requireDangerPhrase}
                onChange={(event) => {
                  setRequireDangerPhrase(event.target.checked);
                  setProtectionSaved(false);
                }}
                type="checkbox"
              />
              危险操作要求确认词
            </label>

            <label>
              单次彻底删除上限
              <input
                min={1}
                onChange={(event) => {
                  setHardDeleteLimit(Number(event.target.value));
                  setProtectionSaved(false);
                }}
                type="number"
                value={hardDeleteLimit}
              />
            </label>

            <label>
              <input
                checked={auditLoggingEnabled}
                onChange={(event) => {
                  setAuditLoggingEnabled(event.target.checked);
                  setProtectionSaved(false);
                }}
                type="checkbox"
              />
              记录批量操作日志
            </label>

            <button className="workspace-action-button primary" onClick={saveProtectionRules} type="button">
              保存批量操作保护
            </button>
            {protectionSaved ? <p role="status">批量操作保护已保存</p> : null}
          </section>
        </div>

        <aside className="integration-secondary-column">
          <section className="panel workspace-card page-panel integration-side-card accounts-settings-summary-card">
          <p className="panel-kicker">策略摘要</p>
          <h3>当前策略摘要</h3>
          <dl className="accounts-settings-summary-list">
            <div className="accounts-settings-summary-row">
              <dt>默认状态</dt>
              <dd>{defaultStatus}</dd>
            </div>
            <div className="accounts-settings-summary-row">
              <dt>默认标签</dt>
              <dd>{defaultTagsEnabled ? defaultTags : "未启用默认标签"}</dd>
            </div>
            <div className="accounts-settings-summary-row">
              <dt>不活跃处理</dt>
              <dd>{`${inactiveDays} 天后${inactiveAction}`}</dd>
            </div>
            <div className="accounts-settings-summary-row">
              <dt>软删除保留期</dt>
              <dd>{`${softDeleteRetentionDays} 天`}</dd>
            </div>
            <div className="accounts-settings-summary-row">
              <dt>危险操作保护</dt>
              <dd>{requireDangerPhrase ? "确认词 + 二次确认" : "仅确认弹窗"}</dd>
            </div>
            <div className="accounts-settings-summary-row">
              <dt>最近更新时间</dt>
              <dd>{lastUpdatedLabel}</dd>
            </div>
          </dl>
          </section>
        </aside>
      </main>

      {showDangerConfirm ? (
        <div className="workspace-dialog-backdrop" role="presentation">
          <section aria-labelledby="accounts-danger-policy-title" aria-modal="true" className="panel workspace-dialog" role="dialog">
            <div className="workspace-card-header">
              <div>
                <p className="panel-kicker">危险策略</p>
                <h3 id="accounts-danger-policy-title">确认危险策略变更</h3>
              </div>
            </div>
            <p className="section-copy">开启“允许彻底删除”会让高风险批量动作可用，请确认这是你要对全局邮箱账号策略做出的调整。</p>
            <div className="workspace-dialog-actions">
              <button className="workspace-action-button secondary" onClick={cancelDangerousLifecycleChange} type="button">
                取消
              </button>
              <button className="workspace-action-button danger" onClick={confirmDangerousLifecycleChange} type="button">
                确认危险策略变更
              </button>
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
}
