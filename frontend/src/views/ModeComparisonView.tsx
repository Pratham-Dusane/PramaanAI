import React, { useState } from 'react';
import { 
  Scale, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight, 
  Table, 
  LayoutGrid,
  Info,
  Clock,
  Coins
} from 'lucide-react';
import { mockModeComparisons, mockChannelMatrix } from '../data/mockMethodologyData';
import { Application, UserRole, MethodologyMode } from '../types';
import { ActiveView } from '../components/Navbar';

interface ModeComparisonViewProps {
  application: Application;
  currentRole: UserRole;
  onNavigate: (view: ActiveView) => void;
}

export const ModeComparisonView: React.FC<ModeComparisonViewProps> = ({
  application,
  currentRole,
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<'SCORECARD' | 'CHANNEL_MATRIX'>('SCORECARD');
  const [expandedResidualMode, setExpandedResidualMode] = useState<MethodologyMode | null>('DESK_ONLY');
  const [channelFilter, setChannelFilter] = useState<string>('ALL');

  const filteredChannels = channelFilter === 'ALL' 
    ? mockChannelMatrix 
    : mockChannelMatrix.filter(c => c.category.toUpperCase() === channelFilter);

  const categories = ['ALL', 'LABORATORY', 'FACULTY', 'INSTRUCTIONAL', 'AMENITIES', 'ADMINISTRATIVE'];

  return (
    <div className="mode-comparison-container" style={{ padding: '24px 32px 80px', maxWidth: '1380px', margin: '0 auto' }}>
      
      {/* ── 1. Advisory & Configuration Disclaimer ── */}
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '10px 16px',
          borderRadius: '8px',
          background: 'rgba(212, 160, 52, 0.08)',
          border: '1px solid rgba(212, 160, 52, 0.3)',
          marginBottom: '24px',
          fontSize: '13px',
          color: '#85590a'
        }}
      >
        <AlertTriangle size={16} color="#d4a034" style={{ flexShrink: 0 }} />
        <span>
          <strong>Comparative Bounds:</strong> Cost estimates and duration windows are parameterized indicators derived from historical regional averages. Gate constraints strictly govern permissible modes.
        </span>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setActiveTab(activeTab === 'SCORECARD' ? 'CHANNEL_MATRIX' : 'SCORECARD')}
            style={{
              background: '#ffffff',
              border: '1px solid rgba(38, 61, 57, 0.15)',
              borderRadius: '6px',
              padding: '4px 10px',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: 'var(--text-main)'
            }}
          >
            {activeTab === 'SCORECARD' ? <Table size={13} /> : <LayoutGrid size={13} />}
            <span>{activeTab === 'SCORECARD' ? 'Channel Matrix (20 Items)' : '4-Mode Scorecard'}</span>
          </button>
        </div>
      </div>

      {/* ── 2. HERO: 4-Column Visual Scorecard ── */}
      {activeTab === 'SCORECARD' && (
        <>
          <div style={{ marginBottom: '16px' }}>
            <h1 style={{ fontSize: '26px', fontWeight: 800, color: 'var(--text-main)', margin: '0 0 6px 0', letterSpacing: '-0.02em' }}>
              Evaluation Methodology Comparative Scorecard
            </h1>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: 0 }}>
              Direct comparison of verification coverage, logistical commitments, and residual audit risk across all four inspection pathways.
            </p>
          </div>

          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '18px',
              marginBottom: '36px'
            }}
          >
            {mockModeComparisons.map((col) => {
              const isRecommended = col.mode === 'PHYSICAL_EVC';
              const isBlocked = col.gateStatus === 'BLOCKED';
              const totalItems = col.itemsFull + col.itemsPartial + col.itemsNone;
              const coveragePct = Math.round((col.itemsFull / totalItems) * 100);

              return (
                <div 
                  key={col.mode}
                  style={{
                    background: isRecommended ? '#ffffff' : '#ffffff',
                    borderRadius: '18px',
                    padding: '24px 20px',
                    border: isRecommended ? '2.5px solid var(--accent-gold)' : '1px solid rgba(38, 61, 57, 0.12)',
                    boxShadow: isRecommended 
                      ? '0 16px 36px -10px rgba(212, 160, 52, 0.28), 0 0 0 1px rgba(212, 160, 52, 0.4)' 
                      : '0 4px 14px rgba(38, 61, 57, 0.04)',
                    opacity: isBlocked ? 0.78 : 1,
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.15s ease'
                  }}
                >
                  {/* Top Badge */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    {isRecommended ? (
                      <span 
                        style={{
                          background: 'linear-gradient(135deg, #d4a034, #b8861d)',
                          color: '#ffffff',
                          fontSize: '11px',
                          fontWeight: 800,
                          padding: '3px 10px',
                          borderRadius: '12px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          boxShadow: '0 2px 8px rgba(212, 160, 52, 0.35)'
                        }}
                      >
                        <Sparkles size={11} /> RECOMMENDED
                      </span>
                    ) : (
                      <span 
                        style={{
                          background: 'rgba(239, 68, 68, 0.1)',
                          color: '#dc2626',
                          fontSize: '11px',
                          fontWeight: 800,
                          padding: '3px 8px',
                          borderRadius: '12px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        GATE BLOCKED
                      </span>
                    )}

                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                      {col.mode}
                    </span>
                  </div>

                  {/* Mode Title */}
                  <h3 style={{ fontSize: '18px', fontWeight: 800, margin: '0 0 6px 0', color: 'var(--text-main)' }}>
                    {col.modeLabel}
                  </h3>

                  {/* Gate Block Reason (if blocked) */}
                  {isBlocked && (
                    <div 
                      style={{
                        background: 'rgba(239, 68, 68, 0.06)',
                        border: '1px solid rgba(239, 68, 68, 0.2)',
                        borderRadius: '6px',
                        padding: '6px 8px',
                        fontSize: '11px',
                        color: '#b91c1c',
                        marginBottom: '16px',
                        lineHeight: 1.3
                      }}
                    >
                      {col.gateBlockReason}
                    </div>
                  )}

                  {!isBlocked && (
                    <div 
                      style={{
                        background: 'rgba(16, 185, 129, 0.08)',
                        border: '1px solid rgba(16, 185, 129, 0.25)',
                        borderRadius: '6px',
                        padding: '6px 8px',
                        fontSize: '11px',
                        color: '#047857',
                        fontWeight: 700,
                        marginBottom: '16px'
                      }}
                    >
                      Permitted by all 5 policy gates
                    </div>
                  )}

                  {/* Verification Coverage Stacked Metric */}
                  <div style={{ marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid rgba(38, 61, 57, 0.08)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Item Coverage:</span>
                      <span style={{ fontWeight: 800, color: 'var(--text-main)' }}>{coveragePct}% ({col.itemsFull} / {totalItems})</span>
                    </div>

                    {/* Stacked Progress Bar */}
                    <div style={{ width: '100%', height: '8px', background: 'rgba(38, 61, 57, 0.08)', borderRadius: '4px', display: 'flex', overflow: 'hidden' }}>
                      <div style={{ width: `${(col.itemsFull / totalItems) * 100}%`, background: '#10b981' }} title="Full Adequacy" />
                      <div style={{ width: `${(col.itemsPartial / totalItems) * 100}%`, background: '#f59e0b' }} title="Partial Adequacy" />
                      <div style={{ width: `${(col.itemsNone / totalItems) * 100}%`, background: '#ef4444' }} title="No Adequacy" />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--text-muted)', marginTop: '4px' }}>
                      <span style={{ color: '#047857', fontWeight: 700 }}>● {col.itemsFull} Full</span>
                      <span style={{ color: '#b45309', fontWeight: 700 }}>● {col.itemsPartial} Part</span>
                      <span style={{ color: '#b91c1c', fontWeight: 700 }}>● {col.itemsNone} None</span>
                    </div>
                  </div>

                  {/* Cost & Elapsed Time Row */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid rgba(38, 61, 57, 0.08)' }}>
                    <div>
                      <div style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Estimated Cost</div>
                      <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-main)', marginTop: '2px' }}>
                        {col.cost}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Duration Window</div>
                      <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-main)', marginTop: '2px' }}>
                        {col.elapsedTime}
                      </div>
                    </div>
                  </div>

                  {/* Evidence Artefacts */}
                  <div style={{ marginBottom: '20px', flex: 1 }}>
                    <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px' }}>
                      Mandatory Artefacts
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {col.evidenceArtefacts.map((art, i) => (
                        <span 
                          key={i}
                          style={{
                            background: 'var(--bg-main)',
                            color: 'var(--text-secondary)',
                            fontSize: '11px',
                            padding: '3px 8px',
                            borderRadius: '4px',
                            border: '1px solid rgba(38, 61, 57, 0.08)'
                          }}
                        >
                          {art}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Residual Uncertainties Toggle */}
                  <div style={{ paddingTop: '12px', borderTop: '1px solid rgba(38, 61, 57, 0.08)' }}>
                    <button
                      onClick={() => setExpandedResidualMode(expandedResidualMode === col.mode ? null : col.mode)}
                      style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        background: 'none',
                        border: 'none',
                        fontSize: '12px',
                        fontWeight: 700,
                        color: col.residualUncertainties.length > 0 ? '#b91c1c' : '#047857',
                        cursor: 'pointer',
                        padding: 0
                      }}
                    >
                      <span>
                        {col.residualUncertainties.length > 0 
                          ? `${col.residualUncertainties.length} Residual Blindspots` 
                          : 'Zero Blindspots'}
                      </span>
                      {col.residualUncertainties.length > 0 && (
                        expandedResidualMode === col.mode ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                      )}
                    </button>

                    {/* Expanded list */}
                    {expandedResidualMode === col.mode && col.residualUncertainties.length > 0 && (
                      <div style={{ marginTop: '10px', fontSize: '11px', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        {col.residualUncertainties.map((u, i) => (
                          <div key={i} style={{ display: 'flex', gap: '6px' }}>
                            <span style={{ color: '#dc2626' }}>•</span>
                            <span>{u}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Action at Bottom */}
                  {isRecommended && (
                    <button
                      onClick={() => onNavigate('OFFICIAL_REVIEW')}
                      style={{
                        marginTop: '16px',
                        width: '100%',
                        background: 'var(--bg-pine)',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '10px 12px',
                        fontSize: '12px',
                        fontWeight: 800,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px'
                      }}
                    >
                      <span>Select & Proceed</span>
                      <ArrowRight size={13} />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* 3. CHANNEL ADEQUACY MATRIX (20-item deep dive) */}
      {activeTab === 'CHANNEL_MATRIX' && (
        <div style={{ background: '#ffffff', borderRadius: '18px', padding: '28px 32px', border: '1px solid rgba(38, 61, 57, 0.1)', boxShadow: '0 6px 20px rgba(38, 61, 57, 0.04)' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-main)', margin: '0 0 4px 0' }}>
                Channel Adequacy Matrix
              </h2>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0 }}>
                Requirement-level auditability across Desk, Remote Video, and Physical inspection channels.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setChannelFilter(cat)}
                  style={{
                    background: channelFilter === cat ? 'var(--bg-pine)' : 'var(--bg-main)',
                    color: channelFilter === cat ? '#ffffff' : 'var(--text-secondary)',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '6px 12px',
                    fontSize: '11px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    textTransform: 'uppercase'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Matrix Table */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid rgba(38, 61, 57, 0.1)', color: 'var(--text-muted)', fontSize: '11px', textTransform: 'uppercase' }}>
                  <th style={{ padding: '12px 14px' }}>Item ID</th>
                  <th style={{ padding: '12px 14px' }}>Requirement Description</th>
                  <th style={{ padding: '12px 14px' }}>Category</th>
                  <th style={{ padding: '12px 14px', textAlign: 'center' }}>Desk Adequacy</th>
                  <th style={{ padding: '12px 14px', textAlign: 'center' }}>Remote Video Adequacy</th>
                  <th style={{ padding: '12px 14px', textAlign: 'center' }}>Physical Visit Adequacy</th>
                </tr>
              </thead>
              <tbody>
                {filteredChannels.map(item => (
                  <tr key={item.itemId} style={{ borderBottom: '1px solid rgba(38, 61, 57, 0.06)' }}>
                    <td style={{ padding: '12px 14px', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)' }}>
                      {item.itemId}
                    </td>
                    <td style={{ padding: '12px 14px', fontWeight: 600, color: 'var(--text-main)' }}>
                      {item.itemLabel}
                    </td>
                    <td style={{ padding: '12px 14px' }}>
                      <span style={{ background: 'var(--bg-main)', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                        {item.category}
                      </span>
                    </td>
                    
                    {/* Desk */}
                    <td style={{ padding: '12px 14px', textAlign: 'center' }}>
                      <span 
                        style={{
                          display: 'inline-block',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          fontSize: '11px',
                          fontWeight: 800,
                          background: item.deskAdequacy === 'FULL' ? 'rgba(16, 185, 129, 0.1)' : item.deskAdequacy === 'PARTIAL' ? 'rgba(217, 119, 6, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                          color: item.deskAdequacy === 'FULL' ? '#047857' : item.deskAdequacy === 'PARTIAL' ? '#b45309' : '#b91c1c'
                        }}
                      >
                        {item.deskAdequacy}
                      </span>
                    </td>

                    {/* Remote */}
                    <td style={{ padding: '12px 14px', textAlign: 'center' }}>
                      <span 
                        style={{
                          display: 'inline-block',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          fontSize: '11px',
                          fontWeight: 800,
                          background: item.remoteVideoAdequacy === 'FULL' ? 'rgba(16, 185, 129, 0.1)' : item.remoteVideoAdequacy === 'PARTIAL' ? 'rgba(217, 119, 6, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                          color: item.remoteVideoAdequacy === 'FULL' ? '#047857' : item.remoteVideoAdequacy === 'PARTIAL' ? '#b45309' : '#b91c1c'
                        }}
                      >
                        {item.remoteVideoAdequacy}
                      </span>
                    </td>

                    {/* Physical */}
                    <td style={{ padding: '12px 14px', textAlign: 'center' }}>
                      <span 
                        style={{
                          display: 'inline-block',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          fontSize: '11px',
                          fontWeight: 800,
                          background: 'rgba(16, 185, 129, 0.15)',
                          color: '#047857'
                        }}
                      >
                        {item.physicalAdequacy}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};
export default ModeComparisonView;
