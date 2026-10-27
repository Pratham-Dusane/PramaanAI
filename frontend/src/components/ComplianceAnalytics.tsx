import React, { useState } from 'react';
import { TrendingUp, BarChart3, PieChart, ShieldCheck, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface DonutSlice {
  key: string;
  label: string;
  count: number;
  percentage: number;
  color: string;
  dashArray: string;
  dashOffset: number;
}

const slices: DonutSlice[] = [
  {
    key: 'CLEAN',
    label: 'Clean Pass',
    count: 527,
    percentage: 62,
    color: 'var(--accent-gold)',
    dashArray: '187 301.6',
    dashOffset: 0
  },
  {
    key: 'SCRUTINY',
    label: 'In Scrutiny',
    count: 238,
    percentage: 28,
    color: 'var(--bg-pine)',
    dashArray: '84.5 301.6',
    dashOffset: -187
  },
  {
    key: 'DEFICIENT',
    label: 'Deficiencies',
    count: 85,
    percentage: 10,
    color: '#b52f22',
    dashArray: '30.2 301.6',
    dashOffset: -271.5
  }
];

const monthlyStats = [
  { month: 'Jan', received: 48, verified: 42, rate: '87.5%' },
  { month: 'Feb', received: 72, verified: 65, rate: '90.2%' },
  { month: 'Mar', received: 54, verified: 51, rate: '94.4%' },
  { month: 'Apr', received: 85, verified: 78, rate: '91.8%' },
  { month: 'May', received: 96, verified: 92, rate: '95.8%' },
  { month: 'Jun', received: 64, verified: 61, rate: '95.3%' }
];

export const ComplianceAnalytics: React.FC = () => {
  const [hoveredSlice, setHoveredSlice] = useState<DonutSlice | null>(null);
  const [hoveredMonth, setHoveredMonth] = useState<typeof monthlyStats[0] | null>(null);
  const [hoveredSplineIdx, setHoveredSplineIdx] = useState<number | null>(null);

  const splinePoints = [
    { x: 20, y: 50, month: 'Jan', decisions: 420 },
    { x: 65, y: 35, month: 'Feb', decisions: 580 },
    { x: 110, y: 44, month: 'Mar', decisions: 510 },
    { x: 155, y: 22, month: 'Apr', decisions: 780 },
    { x: 200, y: 14, month: 'May', decisions: 920 },
    { x: 245, y: 28, month: 'Jun', decisions: 610 }
  ];

  // Mathematical Catmull-Rom spline ensuring line passes exactly through all nodes
  const splinePath = (() => {
    let d = `M ${splinePoints[0].x} ${splinePoints[0].y}`;
    for (let i = 0; i < splinePoints.length - 1; i++) {
      const p0 = splinePoints[Math.max(0, i - 1)];
      const p1 = splinePoints[i];
      const p2 = splinePoints[i + 1];
      const p3 = splinePoints[Math.min(splinePoints.length - 1, i + 2)];

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x} ${p2.y}`;
    }
    return d;
  })();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

      {/* 1. Interactive Compliance Distribution Donut Card (Bklit / Kokonut UI style) */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
          <div>
            <h3 style={{
              fontSize: '13px',
              fontWeight: 800,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'var(--text-main)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <PieChart size={15} color="var(--accent-gold-dark)" />
              <span>Compliance Distribution</span>
            </h3>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
              Hover over slices or legend to inspect scrutiny ratios
            </p>
          </div>
          <span className="badge badge-info" style={{ fontSize: '10px' }}>
            850 Total
          </span>
        </div>

        {/* Animated Interactive SVG Donut */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '24px', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', width: '130px', height: '130px' }}>
            <svg width="130" height="130" viewBox="0 0 130 130" style={{ overflow: 'visible' }}>
              {/* Outer Track (soft neutral) */}
              <circle cx="65" cy="65" r="48" stroke="#d5e2de" strokeWidth="18" fill="none" opacity="0.3" />

              {/* Slices with 100% full 360deg coverage and hover animation */}
              {slices.map((slice) => {
                const isHovered = hoveredSlice?.key === slice.key;
                return (
                  <circle
                    key={slice.key}
                    cx="65"
                    cy="65"
                    r="48"
                    stroke={slice.color}
                    strokeWidth={isHovered ? 24 : 18}
                    fill="none"
                    strokeDasharray={slice.dashArray}
                    strokeDashoffset={slice.dashOffset}
                    transform="rotate(-90 65 65)"
                    onMouseEnter={() => setHoveredSlice(slice)}
                    onMouseLeave={() => setHoveredSlice(null)}
                    style={{
                      cursor: 'pointer',
                      transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                      filter: isHovered ? 'drop-shadow(0 4px 12px rgba(38,61,57,0.3))' : 'none'
                    }}
                  />
                );
              })}
            </svg>

            {/* Dynamic Interactive Center Label */}
            <div style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
              textAlign: 'center',
              padding: '6px'
            }}>
              {hoveredSlice ? (
                <div style={{ animation: 'slideUpFade 0.2s ease-out' }}>
                  <div style={{ fontSize: '16px', fontWeight: 900, color: hoveredSlice.color }}>
                    {hoveredSlice.percentage}%
                  </div>
                  <div style={{ fontSize: '9px', fontWeight: 800, color: 'var(--text-main)', textTransform: 'uppercase' }}>
                    {hoveredSlice.label}
                  </div>
                  <div style={{ fontSize: '8px', color: 'var(--text-muted)' }}>
                    {hoveredSlice.count} Inst.
                  </div>
                </div>
              ) : (
                <div>
                  <span style={{ fontSize: '15px', fontWeight: 900, color: 'var(--text-main)' }}>850</span>
                  <span style={{ fontSize: '9px', color: 'var(--text-muted)', fontWeight: 700, display: 'block' }}>APPLICATIONS</span>
                </div>
              )}
            </div>
          </div>

          {/* Interactive Legend with Kokonut Hover Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1, minWidth: '150px' }}>
            {slices.map((slice) => {
              const isHovered = hoveredSlice?.key === slice.key;
              return (
                <div
                  key={slice.key}
                  onMouseEnter={() => setHoveredSlice(slice)}
                  onMouseLeave={() => setHoveredSlice(null)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '6px 10px',
                    borderRadius: 'var(--radius-sm)',
                    background: isHovered ? 'var(--bg-surface-elevated)' : 'transparent',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)',
                    transform: isHovered ? 'translateX(4px)' : 'none'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: slice.color, flexShrink: 0 }} />
                    <span style={{ fontSize: '11px', fontWeight: isHovered ? 800 : 600, color: 'var(--text-main)' }}>
                      {slice.label}
                    </span>
                  </div>
                  <span style={{ fontSize: '11px', fontWeight: 800, color: slice.color }}>
                    {slice.percentage}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. Monthly Scrutiny Statistics Bar Chart (Directly from Image 2 "Statistics") */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <div>
            <h3 style={{
              fontSize: '13px',
              fontWeight: 800,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'var(--text-main)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <BarChart3 size={15} color="var(--bg-pine)" />
              <span>Statistics - Monthly Volume</span>
            </h3>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
              Intake vs. Verified & Cleared Scrutinies (Jan-Jun)
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '10px', fontWeight: 700 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-secondary)' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '2px', background: 'var(--bg-pine)' }} /> Intake
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--accent-gold-dark)' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '2px', background: 'var(--accent-gold)' }} /> Verified
            </span>
          </div>
        </div>

        {/* Interactive Bar Chart Graphic */}
        <div style={{ position: 'relative', marginTop: '16px' }}>

          {/* Floating Kokonut Tooltip on Bar Hover */}
          {hoveredMonth && (
            <div
              style={{
                position: 'absolute',
                top: '-32px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'var(--bg-pine)',
                color: '#ffffff',
                padding: '6px 14px',
                borderRadius: 'var(--radius-full)',
                fontSize: '11px',
                fontWeight: 800,
                boxShadow: '0 8px 20px rgba(38,61,57,0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                whiteSpace: 'nowrap',
                zIndex: 20,
                pointerEvents: 'none',
                animation: 'slideUpFade 0.2s ease-out'
              }}
            >
              <span>{hoveredMonth.month}:</span>
              <span>{hoveredMonth.received} Intake</span> •
              <span style={{ color: 'var(--accent-gold)' }}>{hoveredMonth.verified} Cleared ({hoveredMonth.rate})</span>
            </div>
          )}

          <div style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            height: '110px',
            paddingTop: '10px',
            borderBottom: '1.5px solid #d1dedb',
            gap: '8px'
          }}>
            {monthlyStats.map((item) => {
              const isHovered = hoveredMonth?.month === item.month;
              const hReceived = Math.round((item.received / 100) * 85);
              const hVerified = Math.round((item.verified / 100) * 85);

              return (
                <div
                  key={item.month}
                  onMouseEnter={() => setHoveredMonth(item)}
                  onMouseLeave={() => setHoveredMonth(null)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '6px',
                    flex: 1,
                    cursor: 'pointer'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    gap: '4px',
                    height: '85px',
                    transform: isHovered ? 'scaleY(1.06)' : 'none',
                    transformOrigin: 'bottom',
                    transition: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)'
                  }}>
                    {/* Deep Pine Bar: Intake */}
                    <div
                      style={{
                        width: '8px',
                        height: `${hReceived}px`,
                        background: 'var(--bg-pine)',
                        borderRadius: '4px 4px 0 0',
                        transition: 'all 0.2s'
                      }}
                      title={`${item.month} Intake: ${item.received}`}
                    />
                    {/* Warm Gold Bar: Verified */}
                    <div
                      style={{
                        width: '8px',
                        height: `${hVerified}px`,
                        background: isHovered ? '#e5b842' : 'var(--accent-gold)',
                        borderRadius: '4px 4px 0 0',
                        boxShadow: isHovered ? '0 0 8px rgba(212,160,52,0.5)' : 'none',
                        transition: 'all 0.2s'
                      }}
                      title={`${item.month} Verified: ${item.verified}`}
                    />
                  </div>
                  <span style={{
                    fontSize: '10px',
                    fontWeight: isHovered ? 800 : 600,
                    color: isHovered ? 'var(--text-main)' : 'var(--text-muted)'
                  }}>
                    {item.month}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. Interactive Scrutiny Velocity Spline Curve (Bklit / Kokonut UI style) */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <div>
            <h3 style={{
              fontSize: '13px',
              fontWeight: 800,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'var(--text-main)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <TrendingUp size={15} color="var(--accent-gold-dark)" />
              <span>Scrutiny Velocity</span>
            </h3>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
              Hover along trajectory nodes for monthly throughput
            </p>
          </div>
          <span style={{
            background: 'var(--bg-pine)',
            color: '#ffffff',
            fontSize: '11px',
            fontWeight: 800,
            padding: '4px 10px',
            borderRadius: 'var(--radius-full)'
          }}>
            3,500 Decisions
          </span>
        </div>

        {/* Interactive Spline Graphic */}
        <div style={{ height: '95px', position: 'relative', marginTop: '10px' }}>
          <svg width="100%" height="95" viewBox="0 0 265 95" style={{ overflow: 'visible' }}>
            <defs>
              <linearGradient id="velocityGoldGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--accent-gold)" stopOpacity="0.4" />
                <stop offset="100%" stopColor="var(--accent-gold)" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Spline Area Fill */}
            <path
              d={`${splinePath} L 245 68 L 20 68 Z`}
              fill="url(#velocityGoldGrad)"
            />

            {/* Spline Line */}
            <path
              d={splinePath}
              stroke="var(--accent-gold)"
              strokeWidth="2.5"
              fill="none"
            />

            {/* Baseline axis */}
            <line x1="15" y1="68" x2="250" y2="68" stroke="#d5e3df" strokeWidth="1" strokeDasharray="3 3" />

            {/* Month labels along X axis */}
            {splinePoints.map((pt) => (
              <text
                key={`lbl-${pt.month}`}
                x={pt.x}
                y="84"
                textAnchor="middle"
                fill="var(--text-muted)"
                fontSize="10"
                fontWeight="700"
                style={{ userSelect: 'none' }}
              >
                {pt.month}
              </text>
            ))}

            {/* Interactive Points */}
            {splinePoints.map((pt, i) => {
              const isHovered = hoveredSplineIdx === i;
              return (
                <g key={pt.month}>
                  {/* Vertical Guideline when hovered */}
                  {isHovered && (
                    <line
                      x1={pt.x}
                      y1={pt.y}
                      x2={pt.x}
                      y2={68}
                      stroke="var(--accent-gold)"
                      strokeWidth="1.5"
                      strokeDasharray="2 2"
                    />
                  )}
                  {/* Outer breathing ring */}
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={isHovered ? 9 : 6}
                    fill="var(--accent-gold)"
                    opacity={isHovered ? 0.35 : 0.15}
                    style={{ transition: 'all 0.2s' }}
                  />
                  {/* Core Node Circle */}
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={isHovered ? 5.5 : 4}
                    fill="var(--accent-gold)"
                    stroke="#ffffff"
                    strokeWidth="2"
                    onMouseEnter={() => setHoveredSplineIdx(i)}
                    onMouseLeave={() => setHoveredSplineIdx(null)}
                    style={{ cursor: 'pointer', transition: 'all 0.2s' }}
                  />
                </g>
              );
            })}
          </svg>

          {/* Kokonut Interactive Floating Point Tooltip */}
          {hoveredSplineIdx !== null && (
            <div
              style={{
                position: 'absolute',
                top: `${splinePoints[hoveredSplineIdx].y - 36}px`,
                left: `${splinePoints[hoveredSplineIdx].x}px`,
                transform: 'translateX(-50%)',
                background: 'var(--bg-pine)',
                color: '#ffffff',
                padding: '4px 10px',
                borderRadius: 'var(--radius-full)',
                fontSize: '10px',
                fontWeight: 800,
                boxShadow: '0 6px 16px rgba(38,61,57,0.3)',
                whiteSpace: 'nowrap',
                pointerEvents: 'none',
                animation: 'slideUpFade 0.18s ease-out',
                zIndex: 25
              }}
            >
              {splinePoints[hoveredSplineIdx].month}: {splinePoints[hoveredSplineIdx].decisions} Decided
            </div>
          )}
        </div>
      </div>

    </div>
  );
};
