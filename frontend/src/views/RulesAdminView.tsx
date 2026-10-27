import React, { useState } from 'react';
import { ScrollText, Play, CheckCircle2, History, AlertTriangle, Layers, BookOpen, ShieldAlert, Sliders } from 'lucide-react';
import { mockRulePacks } from '../data/mockData';
import { mockPolicyGates } from '../data/mockMethodologyData';
import { RulePack } from '../types';

export const RulesAdminView: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'RULE_PACKS' | 'POLICY_GATES'>('RULE_PACKS');
  const [selectedPackId, setSelectedPackId] = useState<string>('DEMO_EOA_2026');
  const [isReplaying, setIsReplaying] = useState(false);
  const [replayDiff, setReplayDiff] = useState<any | null>(null);

  const selectedPack = mockRulePacks.find((p) => p.rulePackId === selectedPackId) || mockRulePacks[0];

  const handleRunReplay = () => {
    setIsReplaying(true);
    setReplayDiff(null);

    setTimeout(() => {
      setIsReplaying(false);
      setReplayDiff({
        timestamp: new Date().toISOString(),
        oldPack: 'DEMO_EOA_2026 (v1.0.0)',
        newPack: 'DEMO_EOA_2027 (v0.2.0 Draft)',
        evaluatedApplicationsCount: 3,
        totalRulesCompared: 4,
        changedFindingsCount: 1,
        diffDetails: [
          {
            applicationId: 'DEMO-EOA-2026-001',
            ruleKey: 'DRAFT.RATIO.AUTONOMOUS_12',
            oldResult: 'NOT_EVALUATED (Rule did not exist in v1.0.0)',
            newResult: 'REVIEW (Calculated ratio 1:14.2 does not satisfy strict 1:12 threshold)',
            impact: 'Would surface 1 new Review Finding for applicant upon publication.'
          }
        ]
      });
    }, 700);
  };

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Sub-tab Switcher */}
      <div style={{ display: 'flex', gap: '8px', borderBottom: '2px solid rgba(38, 61, 57, 0.1)', paddingBottom: '10px' }}>
        <button
          onClick={() => setActiveSection('RULE_PACKS')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: 'none',
            background: activeSection === 'RULE_PACKS' ? 'var(--bg-pine)' : 'transparent',
            color: activeSection === 'RULE_PACKS' ? '#ffffff' : 'var(--text-secondary)',
            fontSize: '13px',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <ScrollText size={15} />
          <span>Rule Packs & Simulation Replay</span>
        </button>

        <button
          onClick={() => setActiveSection('POLICY_GATES')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: 'none',
            background: activeSection === 'POLICY_GATES' ? 'var(--bg-pine)' : 'transparent',
            color: activeSection === 'POLICY_GATES' ? '#ffffff' : 'var(--text-secondary)',
            fontSize: '13px',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <ShieldAlert size={15} />
          <span>Deterministic Policy Gates</span>
        </button>
      </div>

      {activeSection === 'POLICY_GATES' ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="glass-panel" style={{ padding: '20px' }}>
            <div className="panel-header" style={{ marginBottom: '8px' }}>
              <div className="panel-title">
                <ShieldAlert size={20} color="var(--primary-500)" />
                <span>Deterministic Policy Gates Configuration</span>
              </div>
              <span className="badge badge-info">Tier 0 Floor Rules</span>
            </div>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
              Policy gates define hard statutory minimums under the AICTE Approval Process Handbook. When a gate condition fires, it establishes a non-negotiable floor mode that cannot be overridden without explicit two-approver regulatory authorization.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '16px' }}>
            {mockPolicyGates.map(gate => (
              <div key={gate.id} className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                      {gate.id}
                    </span>
                    <span style={{ background: 'rgba(212, 160, 52, 0.15)', color: 'var(--accent-gold-dark)', fontSize: '10px', fontWeight: 800, padding: '2px 6px', borderRadius: '4px' }}>
                      DEMO ONLY
                    </span>
                  </div>

                  <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-main)', margin: '0 0 6px 0' }}>
                    {gate.name}
                  </h3>

                  <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '0 0 12px 0', lineHeight: 1.4 }}>
                    {gate.description}
                  </p>

                  <div style={{ background: 'var(--bg-main)', borderRadius: '6px', padding: '8px 10px', fontSize: '11px', fontFamily: 'var(--font-mono)', marginBottom: '12px' }}>
                    <div style={{ color: 'var(--text-muted)', fontSize: '9px', textTransform: 'uppercase' }}>Predicate Expression</div>
                    <div style={{ fontWeight: 600, color: 'var(--text-main)', marginTop: '2px' }}>{gate.predicate}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px', borderTop: '1px solid rgba(38, 61, 57, 0.08)', fontSize: '11px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Ref: {gate.citation}</span>
                  <span style={{ fontWeight: 800, color: 'var(--mode-physical)' }}>Floor: {gate.floorMode}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className="glass-panel" style={{ padding: '20px' }}>
            <div className="panel-header" style={{ marginBottom: '8px' }}>
              <div className="panel-title">
                <ScrollText size={20} color="var(--primary-500)" />
                <span>Regulatory Rule Packs & Non-Destructive Simulation Replay</span>
              </div>
              <span className="badge badge-info">Declarative Predicate Engine</span>
            </div>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
              Rules are declarative, versioned, category-scoped, and evaluated via safe AST predicates (no arbitrary Python eval or SQL). Published packs are immutable. Replay simulates proposed changes against historical application snapshots without modifying past decisions.
            </p>
          </div>

          {/* Rule Pack Selector & Metadata */}
          <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <h3 style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-secondary)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                VERSIONED RULE PACKS ({mockRulePacks.length})
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {mockRulePacks.map((pack) => {
                  const isSelected = pack.rulePackId === selectedPack.rulePackId;
                  return (
                    <div
                      key={pack.rulePackId}
                      onClick={() => setSelectedPackId(pack.rulePackId)}
                      style={{
                        background: isSelected ? 'var(--bg-surface-elevated)' : 'rgba(255, 255, 255, 0.02)',
                        border: '1px solid',
                        borderColor: isSelected ? 'var(--primary-500)' : 'var(--border-subtle)',
                        borderRadius: 'var(--radius-md)',
                        padding: '12px',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-main)' }}>
                          {pack.rulePackId}
                        </span>
                        <span className={`badge ${pack.status === 'PUBLISHED' ? 'badge-pass' : 'badge-review'}`} style={{ fontSize: '9px', padding: '1px 6px' }}>
                          {pack.status}
                        </span>
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
                        Version {pack.version} • AY {pack.academicYear} • Category: {pack.applicationCategory}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div style={{
                marginTop: '12px',
                background: 'var(--bg-surface-elevated)',
                padding: '12px',
                borderRadius: 'var(--radius-md)',
                fontSize: '11px',
                color: 'var(--text-secondary)'
              }}>
                <strong>Source Provenance Disclaimer:</strong>
                <p style={{ marginTop: '4px' }}>{selectedPack.sourceDisclaimer}</p>
              </div>

              {/* Simulation Replay Button */}
              <button
                className="btn btn-primary"
                onClick={handleRunReplay}
                disabled={isReplaying}
                style={{ marginTop: '8px' }}
              >
                <Play size={14} /> {isReplaying ? 'Replaying Simulation...' : 'Run Simulation Replay Diff'}
              </button>
            </div>

            {/* Selected Rule Pack Predicates */}
            <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div className="panel-header" style={{ marginBottom: 0 }}>
                <div>
                  <h3 style={{ fontSize: '15px', fontWeight: 700 }}>
                    {selectedPack.rulePackId} (Version {selectedPack.version})
                  </h3>
                  <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    Effective Window: {selectedPack.effectiveFrom} to {selectedPack.effectiveTo}
                  </p>
                </div>
                <span className="badge badge-info">{selectedPack.rules.length} Rules Defined</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {selectedPack.rules.map((rule) => (
                  <div
                    key={rule.ruleId}
                    style={{
                      background: 'var(--bg-surface-elevated)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-md)',
                      padding: '14px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <code style={{ fontSize: '12px', color: 'var(--accent-cyan)' }}>{rule.ruleId}</code>
                        <span className="badge badge-info" style={{ fontSize: '9px', padding: '1px 6px' }}>
                          Severity: {rule.severity}
                        </span>
                      </div>
                      <span className="badge badge-pass" style={{ fontSize: '9px', padding: '1px 6px' }}>
                        {rule.status}
                      </span>
                    </div>

                    <h4 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-main)' }}>{rule.title}</h4>
                    <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{rule.description}</p>

                    {/* Allowlisted Predicate JSON */}
                    <div style={{
                      background: 'var(--bg-pine)',
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '11px',
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--text-on-pine-secondary)'
                    }}>
                      <span style={{ color: 'var(--accent-gold)' }}>// Declarative AST Predicate:</span>
                      <div>{JSON.stringify(rule.predicate, null, 2)}</div>
                    </div>

                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <BookOpen size={12} />
                      <span>Cites: {rule.source.title} - {rule.source.clause} (Page {rule.source.page})</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Non-Destructive Replay Diff Results */}
          {replayDiff && (
            <div className="glass-panel fade-in" style={{ borderLeft: '4px solid var(--accent-cyan)' }}>
              <div className="panel-header">
                <div className="panel-title">
                  <CheckCircle2 size={18} color="var(--accent-cyan)" />
                  <span>Simulation Replay Outcome: {replayDiff.oldPack} vs {replayDiff.newPack}</span>
                </div>
                <span className="badge badge-info">{replayDiff.diffDetails.length} Potential Discrepancy Shift</span>
              </div>

              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '14px' }}>
                Simulated historical replay executed at {new Date(replayDiff.timestamp).toLocaleTimeString()}. Historical validation runs and human decisions remain strictly untouched.
              </p>

              <div className="table-wrapper">
                <table className="data-table" aria-label="Replay Comparison Table">
                  <thead>
                    <tr>
                      <th scope="col">Application Under Simulation</th>
                      <th scope="col">Evaluated Rule Key</th>
                      <th scope="col">Old Pack Outcome</th>
                      <th scope="col">New Pack Outcome</th>
                      <th scope="col">Projected Impact</th>
                    </tr>
                  </thead>
                  <tbody>
                    {replayDiff.diffDetails.map((item: any, i: number) => (
                      <tr key={i}>
                        <td><strong>{item.applicationId}</strong></td>
                        <td><code>{item.ruleKey}</code></td>
                        <td style={{ color: 'var(--text-muted)', fontSize: '12px' }}>{item.oldResult}</td>
                        <td style={{ color: 'var(--accent-rose)', fontSize: '12px' }}>{item.newResult}</td>
                        <td style={{ fontSize: '12px' }}>{item.impact}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
