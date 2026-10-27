import React, { useState } from 'react';
import { 
  Sliders, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  Table, 
  LayoutGrid, 
  ExternalLink, 
  ArrowRight,
  ShieldCheck,
  Search,
  Filter
} from 'lucide-react';
import { mockContextSnapshots } from '../data/mockMethodologyData';
import { Application, UserRole, ContextFamily, ContextFeatureValue } from '../types';
import { ActiveView } from '../components/Navbar';

interface ContextIntelligenceViewProps {
  application: Application;
  currentRole: UserRole;
  onNavigate: (view: ActiveView) => void;
}

export const ContextIntelligenceView: React.FC<ContextIntelligenceViewProps> = ({
  application,
  currentRole,
  onNavigate,
}) => {
  const [selectedSnapshotId, setSelectedSnapshotId] = useState<string>('CTX-SNAP-001');
  const [activeTab, setActiveTab] = useState<'SUMMARY' | 'FEATURES'>('SUMMARY');
  const [selectedFamilyFilter, setSelectedFamilyFilter] = useState<ContextFamily | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const currentSnapshot = mockContextSnapshots.find(s => s.id === selectedSnapshotId) || mockContextSnapshots[0];

  // 6 Families definitions
  const families: { id: ContextFamily; name: string; code: string; color: string; desc: string }[] = [
    { id: 'C1', name: 'Scrutiny Completeness', code: 'C1', color: 'var(--fam-c1)', desc: 'Checklist completion, missing mandatory documents, critical findings' },
    { id: 'C2', name: 'External Verifiability', code: 'C2', color: 'var(--fam-c2)', desc: 'DigiLocker, NAD, AISHE source verification and connector status' },
    { id: 'C3', name: 'Document Integrity', code: 'C3', color: 'var(--fam-c3)', desc: 'Near-duplicate images, hash re-use across institutions, metadata' },
    { id: 'C4', name: 'Spatial Adequacy', code: 'C4', color: 'var(--fam-c4)', desc: 'Infrastructure photo coverage, floor plan consistency, video duration' },
    { id: 'C5', name: 'Historical Compliance', code: 'C5', color: 'var(--fam-c5)', desc: 'Prior approval deficiencies and elapsed years since last verified inspection' },
    { id: 'C6', name: 'Application Dynamics', code: 'C6', color: 'var(--fam-c6)', desc: 'Intake increase magnitude, new program additions, category stakes' },
  ];

  // Filter features
  const filteredFeatures = currentSnapshot.features.filter(f => {
    const matchesFamily = selectedFamilyFilter === 'ALL' || f.family === selectedFamilyFilter;
    const matchesSearch = searchQuery === '' || 
      f.featureLabel.toLowerCase().includes(searchQuery.toLowerCase()) || 
      f.featureId.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFamily && matchesSearch;
  });

  // Calculate overall observed rate
  const totalObserved = currentSnapshot.features.filter(f => f.coverageState === 'OBSERVED').length;
  const coverageRatePct = Math.round((totalObserved / currentSnapshot.features.length) * 100);

  return (
    <div className="context-container" style={{ padding: '24px 32px 80px', maxWidth: '1380px', margin: '0 auto' }}>
      
      {/* 1. Slim Header Bar and Snapshot Switcher */}
      <div 
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          marginBottom: '20px'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span 
              style={{
                background: 'rgba(212, 160, 52, 0.16)',
                color: 'var(--accent-gold-dark)',
                fontSize: '11px',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                padding: '3px 10px',
                borderRadius: '6px'
              }}
            >
              Context Intelligence
            </span>
            <span style={{ color: 'var(--text-muted)', fontSize: '13px' }}>/</span>
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
              Pipeline v{currentSnapshot.pipelineVersion}
            </span>
            <span style={{ color: 'var(--text-muted)', fontSize: '13px' }}>/</span>
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
              Feature Spec v{currentSnapshot.featureSetVersion}
            </span>
          </div>
          <h1 style={{ fontSize: '26px', fontWeight: 800, color: 'var(--text-main)', margin: 0, letterSpacing: '-0.02em' }}>
            Frozen Context Vector and Signals
          </h1>
        </div>

        {/* Snapshot Navigator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#ffffff', padding: '6px 12px', borderRadius: '10px', border: '1px solid rgba(38, 61, 57, 0.1)' }}>
          <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)' }}>
            Snapshot:
          </span>
          <select
            value={selectedSnapshotId}
            onChange={(e) => setSelectedSnapshotId(e.target.value)}
            style={{
              border: 'none',
              background: 'transparent',
              fontSize: '13px',
              fontWeight: 800,
              color: 'var(--text-main)',
              cursor: 'pointer'
            }}
          >
            {mockContextSnapshots.map(s => (
              <option key={s.id} value={s.id}>
                {s.id} ({s.id === 'CTX-SNAP-001' ? 'Current v2' : 'Baseline v1'})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Advisory Banner */}
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '10px 16px',
          borderRadius: '8px',
          background: 'rgba(212, 160, 52, 0.08)',
          border: '1px solid rgba(212, 160, 52, 0.3)',
          marginBottom: '28px',
          fontSize: '13px',
          color: '#85590a'
        }}
      >
        <ShieldCheck size={16} color="#d4a034" style={{ flexShrink: 0 }} />
        <span>
          <strong>Frozen Context Vector:</strong> The 16 feature signals are extracted and cryptographically fingerprinted before scoring execution. Features marked OBSERVED have direct document or verification evidence.
        </span>
      </div>

      {/* 2. HERO: Animated Coverage Orbit and Metrics */}
      <div 
        style={{
          background: 'linear-gradient(135deg, #1b2f2b 0%, #263d39 60%, #1e3531 100%)',
          borderRadius: '24px',
          padding: '36px 40px',
          color: '#ffffff',
          boxShadow: '0 16px 36px -10px rgba(26, 44, 41, 0.45), 0 0 0 1px rgba(255, 255, 255, 0.08)',
          marginBottom: '32px',
          display: 'grid',
          gridTemplateColumns: '320px 1fr',
          gap: '40px',
          alignItems: 'center'
        }}
      >
        {/* Animated Orbit Visualizer */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
          <div style={{ position: 'relative', width: '220px', height: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            
            {/* Outer Rotating Ring */}
            <div 
              style={{
                position: 'absolute',
                width: '210px',
                height: '210px',
                borderRadius: '50%',
                border: '1.5px dashed rgba(212, 160, 52, 0.3)',
                animation: 'orbit-spin 40s linear infinite'
              }}
            />

            {/* Middle Rotating Ring */}
            <div 
              style={{
                position: 'absolute',
                width: '160px',
                height: '160px',
                borderRadius: '50%',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                animation: 'orbit-reverse 25s linear infinite'
              }}
            />

            {/* Inner Ring */}
            <div 
              style={{
                position: 'absolute',
                width: '110px',
                height: '110px',
                borderRadius: '50%',
                border: '1.5px solid rgba(16, 185, 129, 0.4)',
              }}
            />

            {/* Center Nucleus */}
            <div 
              style={{
                width: '74px',
                height: '74px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #d4a034 0%, #a9791c 100%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 25px rgba(212, 160, 52, 0.4)',
                zIndex: 2
              }}
            >
              <span style={{ fontSize: '18px', fontWeight: 900, color: '#1a2c29', lineHeight: 1 }}>
                {coverageRatePct}%
              </span>
              <span style={{ fontSize: '9px', fontWeight: 800, color: '#1a2c29', textTransform: 'uppercase', marginTop: '2px' }}>
                Observed
              </span>
            </div>

            {/* Family satellites on orbit */}
            {families.map((fam, i) => {
              const angle = (i / 6) * 2 * Math.PI;
              const radius = 95;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;

              const isSelected = selectedFamilyFilter === fam.id;

              return (
                <div 
                  key={fam.id}
                  onClick={() => setSelectedFamilyFilter(selectedFamilyFilter === fam.id ? 'ALL' : fam.id)}
                  title={`${fam.code}: ${fam.name}`}
                  style={{
                    position: 'absolute',
                    transform: `translate(${x}px, ${y}px)`,
                    width: isSelected ? '34px' : '26px',
                    height: isSelected ? '34px' : '26px',
                    borderRadius: '50%',
                    background: fam.color,
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: isSelected ? '12px' : '10px',
                    fontWeight: 800,
                    cursor: 'pointer',
                    boxShadow: isSelected ? '0 0 15px rgba(255,255,255,0.8)' : '0 2px 8px rgba(0,0,0,0.3)',
                    transition: 'all 0.2s ease',
                    zIndex: 3
                  }}
                >
                  {fam.code}
                </div>
              );
            })}
          </div>

          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', marginTop: '12px' }}>
            Click any satellite node to filter features
          </div>
        </div>

        {/* Orbit Info and Summary Numbers */}
        <div>
          <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.04em', marginBottom: '6px' }}>
            Context Coverage Synthesis
          </div>

          <div style={{ fontSize: '26px', fontWeight: 800, color: '#ffffff', margin: '0 0 10px', letterSpacing: '-0.02em' }}>
            16 Evaluated Features Across 6 Families
          </div>

          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.5, margin: '0 0 24px', maxWidth: '640px' }}>
            Context vectors capture institutional capacity, spatial declarations, integrity anomalies, and baseline changes. Currently <strong>{totalObserved} of {currentSnapshot.features.length} features</strong> are supported by direct observational evidence.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
            <div style={{ background: 'rgba(0,0,0,0.25)', borderRadius: '10px', padding: '12px 16px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: '10px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>Observed Signals</div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#10b981', marginTop: '2px' }}>
                {totalObserved}
              </div>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.25)', borderRadius: '10px', padding: '12px 16px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: '10px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>Unavailable Signals</div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#fbbf24', marginTop: '2px' }}>
                {currentSnapshot.features.length - totalObserved}
              </div>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.25)', borderRadius: '10px', padding: '12px 16px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: '10px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>Scoring Spec Readiness</div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#93c5fd', marginTop: '2px' }}>
                High (Concordant)
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* 3. TABS: Summary (2x3 Family Grid) vs Features (Table) */}
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '2px solid rgba(38, 61, 57, 0.1)',
          marginBottom: '24px'
        }}
      >
        <div style={{ display: 'flex', gap: '8px' }}>
          {[
            { key: 'SUMMARY', label: '6 Families Overview', icon: LayoutGrid },
            { key: 'FEATURES', label: '16 Feature Data Matrix', icon: Table }
          ].map(tab => {
            const isActive = activeTab === tab.key;
            const TabIcon = tab.icon;

            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 20px',
                  fontSize: '14px',
                  fontWeight: isActive ? 800 : 600,
                  color: isActive ? 'var(--text-main)' : 'var(--text-secondary)',
                  border: 'none',
                  background: 'transparent',
                  borderBottom: isActive ? '3px solid var(--accent-gold)' : '3px solid transparent',
                  marginBottom: '-2px',
                  cursor: 'pointer'
                }}
              >
                <TabIcon size={16} color={isActive ? 'var(--accent-gold-dark)' : 'var(--text-secondary)'} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {selectedFamilyFilter !== 'ALL' && (
          <button
            onClick={() => setSelectedFamilyFilter('ALL')}
            style={{
              background: 'rgba(38, 61, 57, 0.08)',
              border: 'none',
              borderRadius: '6px',
              padding: '4px 10px',
              fontSize: '12px',
              fontWeight: 700,
              color: 'var(--text-secondary)',
              cursor: 'pointer'
            }}
          >
            Clear Family Filter ({selectedFamilyFilter})
          </button>
        )}
      </div>

      {/* TAB 1: 6 Family Cards (2x3 Grid) */}
      {activeTab === 'SUMMARY' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '20px' }}>
          {families.map(fam => {
            const famFeatures = currentSnapshot.features.filter(f => f.family === fam.id);
            const famObserved = famFeatures.filter(f => f.coverageState === 'OBSERVED').length;

            return (
              <div
                key={fam.id}
                onClick={() => { setSelectedFamilyFilter(fam.id); setActiveTab('FEATURES'); }}
                style={{
                  background: '#ffffff',
                  borderRadius: '16px',
                  padding: '22px 24px',
                  border: '1px solid rgba(38, 61, 57, 0.1)',
                  boxShadow: '0 4px 14px rgba(38, 61, 57, 0.04)',
                  cursor: 'pointer',
                  borderTop: `4px solid ${fam.color}`,
                  transition: 'transform 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span 
                      style={{
                        background: fam.color,
                        color: '#ffffff',
                        fontSize: '11px',
                        fontWeight: 800,
                        padding: '2px 8px',
                        borderRadius: '4px'
                      }}
                    >
                      {fam.code}
                    </span>
                    <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                      {fam.name}
                    </h3>
                  </div>

                  <span 
                    style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      color: famObserved === famFeatures.length ? '#047857' : '#b45309',
                      background: famObserved === famFeatures.length ? 'rgba(16, 185, 129, 0.1)' : 'rgba(217, 119, 6, 0.1)',
                      padding: '2px 8px',
                      borderRadius: '10px'
                    }}
                  >
                    {famObserved}/{famFeatures.length} Observed
                  </span>
                </div>

                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '0 0 16px', lineHeight: 1.4 }}>
                  {fam.desc}
                </p>

                {/* Micro Features chips */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {famFeatures.map(feat => (
                    <div 
                      key={feat.featureId}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        fontSize: '12px',
                        padding: '6px 10px',
                        borderRadius: '6px',
                        background: 'var(--bg-main)'
                      }}
                    >
                      <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>{feat.featureLabel}</span>
                      <span style={{ fontWeight: 800, color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
                        {typeof feat.value === 'number' ? (feat.value <= 1 && feat.value > 0 ? `${Math.round(feat.value * 100)}%` : feat.value) : feat.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 2: 16 Feature Data Matrix (Table) */}
      {activeTab === 'FEATURES' && (
        <div style={{ background: '#ffffff', borderRadius: '16px', padding: '24px', border: '1px solid rgba(38, 61, 57, 0.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-main)' }}>
              Showing {filteredFeatures.length} of {currentSnapshot.features.length} Features
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <input
                type="text"
                placeholder="Search features..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  border: '1px solid rgba(38, 61, 57, 0.15)',
                  fontSize: '12px',
                  width: '200px'
                }}
              />
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid rgba(38, 61, 57, 0.1)', fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '10px 12px' }}>Feature ID</th>
                  <th style={{ padding: '10px 12px' }}>Label</th>
                  <th style={{ padding: '10px 12px' }}>Family</th>
                  <th style={{ padding: '10px 12px' }}>Observed Value</th>
                  <th style={{ padding: '10px 12px' }}>Coverage State</th>
                  <th style={{ padding: '10px 12px' }}>Confidence</th>
                  <th style={{ padding: '10px 12px' }}>Linked Evidence</th>
                </tr>
              </thead>
              <tbody>
                {filteredFeatures.map(feat => (
                  <tr key={feat.featureId} style={{ borderBottom: '1px solid rgba(38, 61, 57, 0.06)' }}>
                    <td style={{ padding: '10px 12px', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)' }}>
                      {feat.featureId}
                    </td>
                    <td style={{ padding: '10px 12px', fontWeight: 600, color: 'var(--text-main)' }}>
                      {feat.featureLabel}
                    </td>
                    <td style={{ padding: '10px 12px' }}>
                      <span style={{ background: 'var(--bg-main)', padding: '2px 6px', borderRadius: '4px', fontSize: '11px', fontWeight: 700 }}>
                        {feat.family}
                      </span>
                    </td>
                    <td style={{ padding: '10px 12px', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                      {typeof feat.value === 'number' ? (feat.value <= 1 && feat.value > 0 ? `${Math.round(feat.value * 100)}%` : feat.value) : feat.value}
                    </td>
                    <td style={{ padding: '10px 12px' }}>
                      <span 
                        style={{
                          padding: '2px 8px',
                          borderRadius: '4px',
                          fontSize: '11px',
                          fontWeight: 800,
                          background: feat.coverageState === 'OBSERVED' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(217, 119, 6, 0.1)',
                          color: feat.coverageState === 'OBSERVED' ? '#047857' : '#b45309'
                        }}
                      >
                        {feat.coverageState}
                      </span>
                    </td>
                    <td style={{ padding: '10px 12px' }}>
                      {feat.confidence !== null ? `${Math.round(feat.confidence * 100)}%` : '-'}
                    </td>
                    <td style={{ padding: '10px 12px' }}>
                      <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                        {feat.evidenceNodeIds.map(eid => (
                          <span key={eid} style={{ fontSize: '10px', background: 'var(--bg-main)', padding: '1px 5px', borderRadius: '3px', fontFamily: 'var(--font-mono)' }}>
                            {eid}
                          </span>
                        ))}
                      </div>
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
export default ContextIntelligenceView;
