import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Sparkles, 
  Info, 
  Activity, 
  ExternalLink, 
  ChevronUp, 
  ChevronDown, 
  ArrowUpRight, 
  TrendingUp, 
  TrendingDown, 
  Layers,
  X
} from 'lucide-react';
import { mockScoreRuns } from '../data/mockMethodologyData';
import { Application, UserRole, DimensionScore } from '../types';
import { ActiveView } from '../components/Navbar';

interface VerificationScoringViewProps {
  application: Application;
  currentRole: UserRole;
  onNavigate: (view: ActiveView) => void;
}

export const VerificationScoringView: React.FC<VerificationScoringViewProps> = ({
  application,
  currentRole,
  onNavigate,
}) => {
  const scoreRun = mockScoreRuns[0];
  const dimensions = scoreRun.dimensions;
  
  // Selected dimension for drill-down (default: D5 which has highest need 82)
  const [selectedDimension, setSelectedDimension] = useState<DimensionScore>(
    dimensions.find(d => d.dimension === 'D5') || dimensions[0]
  );
  const [isDrilldownOpen, setIsDrilldownOpen] = useState(true);

  // SVG Radar Chart Math for 7 axes
  const size = 380;
  const center = size / 2;
  const radius = 135;
  const totalAxes = dimensions.length; // 7

  // Calculate coordinates for an axis at a given value (0-100)
  const getCoordinates = (index: number, value: number) => {
    // Angle in radians, rotated so D1 starts at the top (-PI/2)
    const angle = (Math.PI * 2 / totalAxes) * index - Math.PI / 2;
    const r = (value / 100) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y, angle };
  };

  // Generate radar polygon path
  const polygonPoints = dimensions.map((dim, idx) => {
    const coords = getCoordinates(idx, dim.score);
    return `${coords.x},${coords.y}`;
  }).join(' ');

  // Get score color
  const getScoreColor = (score: number) => {
    if (score >= 75) return 'var(--dim-d5)'; // High / Red
    if (score >= 60) return 'var(--accent-gold-dark)'; // Amber
    if (score >= 45) return 'var(--dim-d1)'; // Blue
    return '#10b981'; // Green
  };

  return (
    <div className="scoring-container" style={{ padding: '24px 32px 80px', maxWidth: '1380px', margin: '0 auto' }}>
      
      {/* ── 1. Advisory Banner (1 slim line) ── */}
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
        <ShieldAlert size={16} color="#d4a034" style={{ flexShrink: 0 }} />
        <span>
          <strong>Operational Prioritisation Signal:</strong> Verification Need Index (VNI) and dimension scores guide inspection depth and channel allocation. They do not constitute an evaluation of institutional merit or compliance.
        </span>
        <span 
          style={{
            marginLeft: 'auto',
            background: 'rgba(212, 160, 52, 0.16)',
            padding: '2px 8px',
            borderRadius: '4px',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.04em'
          }}
        >
          SPEC v1.0-DEMO
        </span>
      </div>

      {/* ── 2. HERO ELEMENT: Radar Visualizer & VNI Pulse Card ── */}
      <div 
        style={{
          background: 'linear-gradient(135deg, #1b2f2b 0%, #263d39 60%, #1e3531 100%)',
          borderRadius: '24px',
          padding: '36px 40px',
          color: '#ffffff',
          boxShadow: '0 20px 45px -15px rgba(26, 44, 41, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.08)',
          marginBottom: '28px',
          display: 'grid',
          gridTemplateColumns: 'minmax(380px, 460px) 1fr',
          gap: '40px',
          alignItems: 'center'
        }}
      >
        {/* Left Column: Interactive 7-Axis SVG Radar */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
          
          <svg width={size} height={size} style={{ overflow: 'visible' }}>
            <defs>
              <radialGradient id="radarFill" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#d4a034" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#d4a034" stopOpacity="0.12" />
              </radialGradient>
              <filter id="radarGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Concentric Reference Rings (20, 40, 60, 80, 100) */}
            {[20, 40, 60, 80, 100].map(level => {
              const ringPoints = Array.from({ length: totalAxes }).map((_, i) => {
                const c = getCoordinates(i, level);
                return `${c.x},${c.y}`;
              }).join(' ');

              return (
                <polygon
                  key={level}
                  points={ringPoints}
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.1)"
                  strokeWidth="1"
                  strokeDasharray={level === 100 ? 'none' : '3 3'}
                />
              );
            })}

            {/* Axis Lines from center */}
            {dimensions.map((dim, idx) => {
              const edge = getCoordinates(idx, 100);
              const isSelected = selectedDimension.dimension === dim.dimension;

              return (
                <line
                  key={dim.dimension}
                  x1={center}
                  y1={center}
                  x2={edge.x}
                  y2={edge.y}
                  stroke={isSelected ? 'rgba(212, 160, 52, 0.8)' : 'rgba(255, 255, 255, 0.15)'}
                  strokeWidth={isSelected ? '2' : '1'}
                />
              );
            })}

            {/* Polygon Area Fill */}
            <polygon
              points={polygonPoints}
              fill="url(#radarFill)"
              stroke="#fbbf24"
              strokeWidth="2.5"
              filter="url(#radarGlow)"
              className="radar-polygon-anim"
            />

            {/* Interactive Vertex Nodes and Labels */}
            {dimensions.map((dim, idx) => {
              const coords = getCoordinates(idx, dim.score);
              const labelCoords = getCoordinates(idx, 122);
              const isSelected = selectedDimension.dimension === dim.dimension;

              return (
                <g key={dim.dimension} style={{ cursor: 'pointer' }} onClick={() => { setSelectedDimension(dim); setIsDrilldownOpen(true); }}>
                  {/* Vertex Dot */}
                  <circle
                    cx={coords.x}
                    cy={coords.y}
                    r={isSelected ? 6.5 : 4.5}
                    fill={isSelected ? '#ffffff' : '#fbbf24'}
                    stroke={isSelected ? '#d4a034' : 'rgba(26, 44, 41, 0.8)'}
                    strokeWidth="2"
                    style={{ transition: 'all 0.2s ease' }}
                  />

                  {/* Axis Label (D1..D7) */}
                  <text
                    x={labelCoords.x}
                    y={labelCoords.y}
                    fill={isSelected ? '#fbbf24' : 'rgba(255, 255, 255, 0.8)'}
                    fontSize={isSelected ? '12px' : '11px'}
                    fontWeight={isSelected ? '800' : '600'}
                    textAnchor="middle"
                    dominantBaseline="central"
                  >
                    {dim.dimension}
                  </text>
                </g>
              );
            })}
          </svg>

          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)', marginTop: '8px' }}>
            Click any axis vertex or pill below to drill down
          </div>
        </div>

        {/* Right Column: VNI Compound Need Hero Metric & Spec Info */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span 
              style={{
                background: 'rgba(212, 160, 52, 0.18)',
                color: '#fbbf24',
                fontSize: '11px',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                padding: '3px 10px',
                borderRadius: '16px'
              }}
            >
              Verification Need Index (VNI)
            </span>
            <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px' }}>•</span>
            <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: '12px', fontFamily: 'var(--font-mono)' }}>
              SR-001
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', marginBottom: '14px' }}>
            <span style={{ fontSize: '64px', fontWeight: 900, color: '#fbbf24', lineHeight: 1, letterSpacing: '-0.03em' }}>
              {scoreRun.vni}
            </span>
            <span style={{ fontSize: '20px', color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>
              / 100
            </span>
            <span 
              style={{
                background: 'rgba(239, 68, 68, 0.2)',
                color: '#fca5a5',
                border: '1px solid rgba(239, 68, 68, 0.4)',
                padding: '4px 12px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.04em'
              }}
            >
              High Need Band
            </span>
          </div>

          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '14px', lineHeight: 1.5, margin: '0 0 20px 0' }}>
            Compound verification index computed from 7 orthogonal risk dimensions. Application demonstrates significant changes from baseline (+50% intake) and spatial inconsistencies requiring focused verification.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
            <div style={{ background: 'rgba(0,0,0,0.25)', borderRadius: '10px', padding: '12px 14px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: '10px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', fontWeight: 700 }}>
                Statistical Confidence
              </div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff', marginTop: '2px' }}>
                {Math.round(scoreRun.vniConfidence * 100)}%
              </div>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.25)', borderRadius: '10px', padding: '12px 14px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: '10px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', fontWeight: 700 }}>
                Highest Need Dimension
              </div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#f87171', marginTop: '2px' }}>
                D5: Change Magnitude (82)
              </div>
            </div>
          </div>

          {/* Quick Nav Button */}
          <button
            onClick={() => onNavigate('METHODOLOGY')}
            style={{
              background: 'rgba(255,255,255,0.1)',
              color: '#ffffff',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '8px',
              padding: '10px 18px',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'background 0.15s ease'
            }}
          >
            <span>Proceed to Methodology Decision</span>
            <ArrowUpRight size={14} />
          </button>
        </div>
      </div>

      {/* 3. FLOATING DIMENSION CHIPS (D1 to D7) */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.05em', marginBottom: '10px' }}>
          Explore Verification Dimensions
        </div>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {dimensions.map((dim) => {
            const isSelected = selectedDimension.dimension === dim.dimension;
            const scoreColor = getScoreColor(dim.score);

            return (
              <button
                key={dim.dimension}
                onClick={() => { setSelectedDimension(dim); setIsDrilldownOpen(true); }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px 16px',
                  borderRadius: '12px',
                  background: isSelected ? 'var(--bg-pine)' : '#ffffff',
                  color: isSelected ? '#ffffff' : 'var(--text-main)',
                  border: isSelected ? '2px solid var(--accent-gold)' : '1px solid rgba(38, 61, 57, 0.12)',
                  boxShadow: isSelected 
                    ? '0 6px 18px rgba(38, 61, 57, 0.18)' 
                    : '0 2px 6px rgba(38, 61, 57, 0.04)',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <span 
                  style={{
                    fontWeight: 800,
                    fontSize: '13px',
                    color: isSelected ? 'var(--accent-gold)' : 'var(--text-secondary)'
                  }}
                >
                  {dim.dimension}
                </span>

                <span style={{ fontSize: '13px', fontWeight: isSelected ? 700 : 500 }}>
                  {dim.label}
                </span>

                <span 
                  style={{
                    background: isSelected ? 'rgba(255,255,255,0.15)' : 'rgba(38, 61, 57, 0.06)',
                    color: isSelected ? '#fbbf24' : scoreColor,
                    padding: '2px 8px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: 800
                  }}
                >
                  {dim.score}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── 4. DRILL-DOWN PANEL: Feature Contribution Waterfall ── */}
      {isDrilldownOpen && selectedDimension && (
        <div 
          style={{
            background: '#ffffff',
            borderRadius: '18px',
            padding: '28px 32px',
            border: '1.5px solid rgba(212, 160, 52, 0.35)',
            boxShadow: '0 12px 30px rgba(38, 61, 57, 0.08)',
            position: 'relative'
          }}
        >
          {/* Header Row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span 
                  style={{
                    background: 'var(--bg-pine)',
                    color: '#fbbf24',
                    fontSize: '11px',
                    fontWeight: 800,
                    padding: '3px 8px',
                    borderRadius: '6px'
                  }}
                >
                  {selectedDimension.dimension}
                </span>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                  {selectedDimension.label}
                </h3>
              </div>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: 0, fontStyle: 'italic' }}>
                "{selectedDimension.question}"
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Dimension Score</div>
                <div style={{ fontSize: '24px', fontWeight: 900, color: getScoreColor(selectedDimension.score) }}>
                  {selectedDimension.score} / 100
                </div>
              </div>
              <button 
                onClick={() => setIsDrilldownOpen(false)}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px' }}
                title="Collapse drill-down"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Feature Contributions Diverging Bar Waterfall */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.04em', marginBottom: '12px' }}>
              Feature Contribution Waterfall (Points to Score)
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {selectedDimension.topFeatures.map((feat) => {
                const isRaising = feat.direction === 'raises';
                const absContrib = Math.abs(feat.contribution);
                const widthPct = Math.min(absContrib * 2.5, 100);

                return (
                  <div 
                    key={feat.featureId}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '220px 1fr 60px',
                      alignItems: 'center',
                      gap: '16px',
                      background: 'var(--bg-main)',
                      padding: '10px 16px',
                      borderRadius: '8px'
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-main)' }}>
                        {feat.featureLabel}
                      </div>
                      <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                        {feat.featureId}
                      </div>
                    </div>

                    {/* Bar visualization */}
                    <div style={{ width: '100%', height: '8px', background: 'rgba(38, 61, 57, 0.08)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div 
                        style={{
                          width: `${widthPct}%`,
                          height: '100%',
                          background: isRaising ? '#ef4444' : '#10b981',
                          borderRadius: '4px'
                        }}
                      />
                    </div>

                    <div style={{ textAlign: 'right', fontWeight: 800, fontSize: '13px', color: isRaising ? '#dc2626' : '#059669' }}>
                      {isRaising ? `+${feat.contribution}` : feat.contribution}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Linked Evidence Chips */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingTop: '12px', borderTop: '1px solid rgba(38, 61, 57, 0.08)' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)' }}>
              Linked Evidence Artefacts:
            </span>
            <div style={{ display: 'flex', gap: '8px' }}>
              {selectedDimension.evidenceLinks.map(evId => (
                <button
                  key={evId}
                  onClick={() => onNavigate('GRAPH')}
                  style={{
                    background: 'rgba(37, 99, 235, 0.08)',
                    color: '#2563eb',
                    border: '1px solid rgba(37, 99, 235, 0.25)',
                    borderRadius: '6px',
                    padding: '3px 10px',
                    fontSize: '11px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <span>{evId}</span>
                  <ExternalLink size={10} />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
export default VerificationScoringView;
