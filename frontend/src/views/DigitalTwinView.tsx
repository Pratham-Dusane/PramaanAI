import React, { useState } from 'react';
import {
  Clock,
  Layers,
  ShieldCheck,
  CheckCircle2,
  History,
  Calendar,
  Building2,
  FileCheck,
  AlertTriangle,
  ArrowRight,
  Compass,
  TrendingUp,
  Search,
  ExternalLink,
  Sliders,
  Sparkles
} from 'lucide-react';
import { mockDigitalTwinAttributes } from '../data/mockData';

export const DigitalTwinView: React.FC = () => {
  const [selectedAY, setSelectedAY] = useState('2026-27');
  const [activeTab, setActiveTab] = useState<'DRIFT' | 'BASELINE' | 'LEDGER'>('DRIFT');
  const [provenanceFilter, setProvenanceFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAttributes = mockDigitalTwinAttributes.filter((attr) => {
    const matchesAY = selectedAY === 'ALL' || attr.academicYear === selectedAY;
    const matchesProv = provenanceFilter === 'ALL' || attr.sourceKind === provenanceFilter;
    const matchesSearch = !searchQuery.trim() ||
      attr.attributeKey.toLowerCase().includes(searchQuery.toLowerCase()) ||
      attr.attributeLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      String(attr.value).toLowerCase().includes(searchQuery.toLowerCase());
    return matchesAY && matchesProv && matchesSearch;
  });

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '1440px', margin: '0 auto', width: '100%' }}>

      {/* 1. LUMINOUS LIGHT HERO HEADER (No heavy dark container) */}
      <div
        style={{
          background: '#ffffff',
          borderRadius: '20px',
          padding: '28px 32px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 24px rgba(0, 0, 0, 0.04)',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '28px', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{
                background: '#f0fdf4',
                border: '1px solid #bbf7d0',
                color: '#15803d',
                fontSize: '11px',
                fontWeight: 800,
                padding: '3px 10px',
                borderRadius: '100px',
                letterSpacing: '0.04em',
                textTransform: 'uppercase'
              }}>
                TEMPORAL PROVENANCE MODEL
              </span>
              <span style={{
                background: '#f1f5f9',
                color: '#475569',
                fontSize: '11px',
                fontWeight: 700,
                padding: '3px 8px',
                borderRadius: '6px'
              }}>
                INSTITUTIONAL MEMORY
              </span>
            </div>

            <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', margin: '0 0 6px 0', letterSpacing: '-0.02em' }}>
              Institutional Living Digital Twin & Historical Provenance
            </h1>

            <p style={{ fontSize: '13px', color: '#64748b', margin: 0, maxWidth: '760px', lineHeight: 1.5 }}>
              Maintains time-attributed ground truth across academic years. Distinguishes applicant declarations, OCR extractions, and reviewer-confirmed values with verifiable supersession tracking.
            </p>
          </div>

          {/* Academic Year Window Picker */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
            <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Evaluation Horizon
            </span>
            <div style={{ display: 'flex', gap: '4px', background: '#f8fafc', padding: '4px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              {['2023-24', '2024-25', '2025-26', '2026-27', 'ALL'].map((ay) => {
                const isSelected = selectedAY === ay;
                return (
                  <button
                    key={ay}
                    onClick={() => setSelectedAY(ay)}
                    style={{
                      background: isSelected ? '#059669' : 'transparent',
                      color: isSelected ? '#ffffff' : '#64748b',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '6px 12px',
                      fontSize: '11px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    AY {ay}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 4 Light Metric Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '12px',
          paddingTop: '16px',
          borderTop: '1px solid #f1f5f9'
        }}>
          <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '14px 16px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '10px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 700 }}>
              CONTINUOUS LAND TITLE
            </div>
            <div style={{ fontSize: '16px', fontWeight: 800, color: '#059669', marginTop: '2px' }}>
              14.50 Acres (Cadastre 44/2)
            </div>
            <div style={{ fontSize: '10px', color: '#64748b', marginTop: '2px' }}>
              Confirmed since AY 2012-13
            </div>
          </div>

          <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '14px 16px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '10px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 700 }}>
              LAST ON-SITE VISIT GAP
            </div>
            <div style={{ fontSize: '16px', fontWeight: 800, color: '#d97706', marginTop: '2px' }}>
              15-Nov-2023 (3 Yr Gap)
            </div>
            <div style={{ fontSize: '10px', color: '#64748b', marginTop: '2px' }}>
              Committee: Direct Inspection
            </div>
          </div>

          <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '14px 16px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '10px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 700 }}>
              STRUCTURAL STABILITY
            </div>
            <div style={{ fontSize: '16px', fontWeight: 800, color: '#0284c7', marginTop: '2px' }}>
              Valid to May 2028
            </div>
            <div style={{ fontSize: '10px', color: '#64748b', marginTop: '2px' }}>
              Municipal Architect Seal
            </div>
          </div>

          <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '14px 16px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '10px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 700 }}>
              MUNICIPAL FIRE NOC
            </div>
            <div style={{ fontSize: '16px', fontWeight: 800, color: '#e11d48', marginTop: '2px' }}>
              Expired 31-03-2026
            </div>
            <div style={{ fontSize: '10px', color: '#64748b', marginTop: '2px' }}>
              Requires Renewal Challan
            </div>
          </div>
        </div>
      </div>

      {/* 2. PERSPECTIVE TABS STRIP (CENTERED & COMPACT WITH PADDING) */}
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%', margin: '4px 0' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: '#ffffff',
          padding: '6px 10px',
          borderRadius: '14px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.03)',
          width: 'fit-content'
        }}>
          {[
            { id: 'DRIFT', label: 'Multi-Year Baseline & Drift Analysis', icon: TrendingUp },
            { id: 'BASELINE', label: 'Historical Inspection Baseline', icon: Clock },
            { id: 'LEDGER', label: 'Time-Aware Attribute Ledger', icon: History }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 16px',
                  borderRadius: '10px',
                  border: 'none',
                  background: isActive ? '#059669' : 'transparent',
                  color: isActive ? '#ffffff' : '#64748b',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.16s ease'
                }}
              >
                <Icon size={14} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. TAB 1: DRIFT ANALYSIS (Modern Table Inspo Layout - Fitted Width) */}
      {activeTab === 'DRIFT' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center', width: '100%' }}>

          {/* Modern Table Layout Card - Fitted Width with No Excess Whitespace */}
          <div style={{
            background: '#ffffff',
            borderRadius: '18px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
            padding: '22px 26px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            width: '100%',
            maxWidth: '1080px',
            boxSizing: 'border-box'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
              <div>
                <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                  Baseline vs Current Year Reconciliation Matrix
                </h3>
                <span style={{ fontSize: '11px', color: '#64748b' }}>
                  Comparing certified AY 2025-26 ground truth with AY 2026-27 filing
                </span>
              </div>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#059669', background: '#ecfdf5', padding: '3px 10px', borderRadius: '100px' }}>
                Automated Provenance Diff
              </span>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 6px' }}>
                <thead>
                  {/* Top Group Slabs */}
                  <tr>
                    <th style={{ width: '28%' }}></th>
                    <th colSpan={1} style={{ padding: '0 8px 6px 8px', textAlign: 'center' }}>
                      <div style={{
                        background: '#f1f5f9',
                        color: '#334155',
                        borderRadius: '8px',
                        padding: '6px 12px',
                        fontSize: '11px',
                        fontWeight: 800,
                        border: '1px solid #e2e8f0'
                      }}>
                        AY 2025-26 BASELINE
                      </div>
                    </th>
                    <th colSpan={3} style={{ padding: '0 8px 6px 8px', textAlign: 'center' }}>
                      <div style={{
                        background: '#ecfdf5',
                        color: '#065f46',
                        borderRadius: '8px',
                        padding: '6px 12px',
                        fontSize: '11px',
                        fontWeight: 800,
                        border: '1px solid #a7f3d0'
                      }}>
                        AY 2026-27 SUBMISSION
                      </div>
                    </th>
                  </tr>

                  {/* Sub-column Headers with Accent Underlines */}
                  <tr>
                    <th style={{ textAlign: 'left', padding: '0 12px 10px 0' }}>
                      <div style={{ fontSize: '10px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', paddingBottom: '6px', borderBottom: '3px solid #38bdf8' }}>
                        Evaluated Attribute
                      </div>
                    </th>
                    <th style={{ textAlign: 'left', padding: '0 12px 10px 12px', width: '20%' }}>
                      <div style={{ fontSize: '10px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', paddingBottom: '6px', borderBottom: '3px solid #06b6d4' }}>
                        Prior Confirmed
                      </div>
                    </th>
                    <th style={{ textAlign: 'left', padding: '0 12px 10px 12px', width: '22%' }}>
                      <div style={{ fontSize: '10px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', paddingBottom: '6px', borderBottom: '3px solid #10b981' }}>
                        Current Declared Value
                      </div>
                    </th>
                    <th style={{ textAlign: 'left', padding: '0 12px 10px 12px', width: '15%' }}>
                      <div style={{ fontSize: '10px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', paddingBottom: '6px', borderBottom: '3px solid #f59e0b' }}>
                        Observed Delta
                      </div>
                    </th>
                    <th style={{ textAlign: 'left', padding: '0 12px 10px 12px', width: '15%' }}>
                      <div style={{ fontSize: '10px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', paddingBottom: '6px', borderBottom: '3px solid #8b5cf6' }}>
                        Drift State
                      </div>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {[
                    {
                      label: 'Campus Land Title',
                      sub: 'Cadastre Survey No. 44/2',
                      strip: '#10b981',
                      prior: '14.50 Acres (Continuous)',
                      curr: '14.50 Acres (Continuous)',
                      delta: '0% (Stable)',
                      deltaColor: '#059669',
                      badge: 'Continuous Title',
                      badgeClass: 'badge-pass'
                    },
                    {
                      label: 'Instructional Floor Area',
                      sub: 'Classrooms, labs, libraries',
                      strip: '#38bdf8',
                      prior: '13,200 sq.m.',
                      curr: '14,850 sq.m.',
                      delta: '+1,650 sq.m. (+12.5%)',
                      deltaColor: '#0369a1',
                      badge: 'Planned Expansion',
                      badgeClass: 'badge-pass'
                    },
                    {
                      label: 'Municipal Fire NOC',
                      sub: 'Pune Municipal Corporation',
                      strip: '#e11d48',
                      prior: 'Active (To 31-03-2025)',
                      curr: 'Expired 31-03-2026',
                      delta: 'Expired / Lapsed',
                      deltaColor: '#e11d48',
                      badge: 'Requires Renewal',
                      badgeClass: 'badge-insufficient'
                    },
                    {
                      label: 'Approved Principal Cadre',
                      sub: 'Bio-ID AICTE-FAC-19283',
                      strip: '#0d9488',
                      prior: 'Dr. Ramesh Joshi',
                      curr: 'Dr. Ramesh Joshi',
                      delta: 'No Change (0%)',
                      deltaColor: '#64748b',
                      badge: 'Verified Identity',
                      badgeClass: 'badge-pass'
                    }
                  ].map((row, i) => (
                    <tr key={i} style={{ borderBottom: '1px dotted #cbd5e1' }}>
                      <td style={{ padding: '4px 8px 4px 0' }}>
                        <div style={{
                          background: '#f8fafc',
                          border: '1px solid #e2e8f0',
                          borderRadius: '8px',
                          padding: '7px 12px 7px 14px',
                          position: 'relative'
                        }}>
                          <div style={{
                            position: 'absolute',
                            left: 0,
                            top: '5px',
                            bottom: '5px',
                            width: '4px',
                            borderRadius: '0 4px 4px 0',
                            background: row.strip
                          }} />
                          <div style={{ fontSize: '12px', fontWeight: 700, color: '#0f172a' }}>
                            {row.label}
                          </div>
                          <div style={{ fontSize: '10px', color: '#64748b' }}>
                            {row.sub}
                          </div>
                        </div>
                      </td>

                      <td style={{ padding: '6px 12px', fontSize: '12px', color: '#334155', verticalAlign: 'middle' }}>
                        {row.prior}
                      </td>

                      <td style={{ padding: '6px 12px', fontSize: '12px', fontWeight: 600, color: '#0f172a', verticalAlign: 'middle' }}>
                        {row.curr}
                      </td>

                      <td style={{ padding: '6px 12px', fontSize: '12px', fontWeight: 700, color: row.deltaColor, verticalAlign: 'middle' }}>
                        {row.delta}
                      </td>

                      <td style={{ padding: '6px 12px', verticalAlign: 'middle' }}>
                        <span className={`badge ${row.badgeClass}`} style={{ fontSize: '10px' }}>
                          {row.badge}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 4. TAB 2: HISTORICAL BASELINE */}
      {activeTab === 'BASELINE' && (
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', width: '100%', maxWidth: '1080px' }}>
            <div style={{
              background: '#ffffff',
              borderRadius: '16px',
              padding: '24px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                  Last On-Site Inspection Report
                </h3>
                <span style={{ fontSize: '10px', fontWeight: 800, color: '#059669', background: '#ecfdf5', padding: '3px 8px', borderRadius: '4px' }}>
                  DIRECT AUDIT
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <span style={{ fontSize: '10px', color: '#64748b' }}>VISIT DATE</span>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a', marginTop: '2px' }}>15-Nov-2023</div>
                </div>
                <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <span style={{ fontSize: '10px', color: '#64748b' }}>COMMITTEE CHAIR</span>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a', marginTop: '2px' }}>Prof. R. K. Shrivastava</div>
                </div>
                <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <span style={{ fontSize: '10px', color: '#64748b' }}>INSPECTION SCOPE</span>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a', marginTop: '2px' }}>Full Campus & Labs</div>
                </div>
                <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <span style={{ fontSize: '10px', color: '#64748b' }}>OUTCOME</span>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: '#059669', marginTop: '2px' }}>Approved with Minor Cues</div>
                </div>
              </div>

              <p style={{ fontSize: '12px', color: '#475569', lineHeight: 1.5, margin: 0 }}>
                The committee verified boundary demarcations, barrier-free access ramps, and laboratory equipment sets for Mechanical and Civil disciplines. Re-inspection interval threshold is 3 years per handbook norms.
              </p>
            </div>

            <div style={{
              background: '#ffffff',
              borderRadius: '16px',
              padding: '24px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                  Prior Inspection Deficiencies Tracker
                </h3>
                <span style={{ fontSize: '10px', fontWeight: 800, color: '#d97706', background: '#fef3c7', padding: '3px 8px', borderRadius: '4px' }}>
                  2 ITEMS TRACKED
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ border: '1px solid #fed7aa', background: '#fffaf5', borderRadius: '10px', padding: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <strong style={{ fontSize: '12px', color: '#9a3412' }}>DEF-2023-01: Barrier-Free Restrooms</strong>
                    <span style={{ fontSize: '10px', fontWeight: 800, color: '#059669', background: '#ecfdf5', padding: '2px 6px', borderRadius: '4px' }}>
                      RECTIFIED IN 2026
                    </span>
                  </div>
                  <div style={{ fontSize: '11px', color: '#7c2d12', marginTop: '4px' }}>
                    Floor 2 accessibility elevator and grab bars installed. Verified in architectural drawing.
                  </div>
                </div>

                <div style={{ border: '1px solid #fecdd3', background: '#fff5f5', borderRadius: '10px', padding: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <strong style={{ fontSize: '12px', color: '#9f1239' }}>DEF-2023-02: CAD Simulation Software Licenses</strong>
                    <span style={{ fontSize: '10px', fontWeight: 800, color: '#b45309', background: '#fef3c7', padding: '2px 6px', borderRadius: '4px' }}>
                      SPOT-CHECK REQUIRED
                    </span>
                  </div>
                  <div style={{ fontSize: '11px', color: '#881337', marginTop: '4px' }}>
                    Need physical spot check of 60 perpetual multi-user license keys during next visit.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. TAB 3: ATTRIBUTE LEDGER (Modern Table Inspo Layout - Fitted Width) */}
      {activeTab === 'LEDGER' && (
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '18px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
            padding: '22px 26px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            width: '100%',
            maxWidth: '1080px',
            boxSizing: 'border-box'
          }}>
          {/* Controls */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '14px',
            paddingBottom: '14px',
            borderBottom: '1px solid #f1f5f9'
          }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {[
                { id: 'ALL', label: 'All Provenance' },
                { id: 'APPLICANT_DECLARED', label: 'Applicant Declared' },
                { id: 'AI_EXTRACTED', label: 'AI Extracted (OCR)' },
                { id: 'REVIEWER_CONFIRMED', label: 'Reviewer Confirmed' },
                { id: 'AUTHORIZED_EXTERNAL', label: 'External Registry' }
              ].map((pill) => {
                const isActive = provenanceFilter === pill.id;
                return (
                  <button
                    key={pill.id}
                    onClick={() => setProvenanceFilter(pill.id)}
                    style={{
                      padding: '5px 12px',
                      borderRadius: '100px',
                      border: isActive ? '1px solid #059669' : '1px solid #e2e8f0',
                      background: isActive ? '#059669' : '#ffffff',
                      color: isActive ? '#ffffff' : '#64748b',
                      fontSize: '11px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    {pill.label}
                  </button>
                );
              })}
            </div>

            <div style={{ position: 'relative', width: '260px' }}>
              <Search size={14} color="#64748b" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                placeholder="Search attribute ledger..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '7px 10px 7px 30px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  fontSize: '11px'
                }}
              />
            </div>
          </div>

          {/* Table */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 6px' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '0 12px 10px 0', width: '32%' }}>
                    <div style={{ fontSize: '10px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', paddingBottom: '6px', borderBottom: '3px solid #38bdf8' }}>
                      Attribute Record
                    </div>
                  </th>
                  <th style={{ textAlign: 'left', padding: '0 12px 10px 12px', width: '22%' }}>
                    <div style={{ fontSize: '10px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', paddingBottom: '6px', borderBottom: '3px solid #10b981' }}>
                      Current Value
                    </div>
                  </th>
                  <th style={{ textAlign: 'left', padding: '0 12px 10px 12px', width: '18%' }}>
                    <div style={{ fontSize: '10px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', paddingBottom: '6px', borderBottom: '3px solid #f59e0b' }}>
                      Source Provenance
                    </div>
                  </th>
                  <th style={{ textAlign: 'left', padding: '0 12px 10px 12px', width: '14%' }}>
                    <div style={{ fontSize: '10px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', paddingBottom: '6px', borderBottom: '3px solid #8b5cf6' }}>
                      Review State
                    </div>
                  </th>
                  <th style={{ textAlign: 'left', padding: '0 12px 10px 12px', width: '14%' }}>
                    <div style={{ fontSize: '10px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', paddingBottom: '6px', borderBottom: '3px solid #06b6d4' }}>
                      Last Verified
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredAttributes.map((attr) => (
                  <tr key={attr.id} style={{ opacity: attr.superseded ? 0.6 : 1, borderBottom: '1px dotted #cbd5e1' }}>
                    <td style={{ padding: '4px 8px 4px 0' }}>
                      <div style={{
                        background: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        padding: '6px 12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}>
                        <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#0369a1', fontWeight: 700 }}>
                          {attr.attributeKey}
                        </span>
                        <span style={{ fontSize: '12px', fontWeight: 700, color: '#0f172a' }}>
                          {attr.attributeLabel}
                        </span>
                        {attr.superseded && (
                          <span style={{ fontSize: '9px', background: '#e2e8f0', color: '#64748b', padding: '1px 4px', borderRadius: '4px' }}>
                            Superseded
                          </span>
                        )}
                      </div>
                    </td>

                    <td style={{ padding: '6px 12px', fontSize: '12px', fontWeight: 700, color: '#0f172a', verticalAlign: 'middle' }}>
                      {String(attr.value)}
                    </td>

                    <td style={{ padding: '6px 12px', verticalAlign: 'middle' }}>
                      <span style={{ fontSize: '10px', fontWeight: 700, background: '#f1f5f9', color: '#334155', padding: '3px 8px', borderRadius: '4px' }}>
                        {attr.sourceKind}
                      </span>
                    </td>

                    <td style={{ padding: '6px 12px', verticalAlign: 'middle' }}>
                      <span className={`badge ${attr.reviewStatus === 'CONFIRMED' ? 'badge-pass' : attr.reviewStatus === 'DISPUTED' ? 'badge-insufficient' : 'badge-review'}`} style={{ fontSize: '10px' }}>
                        {attr.reviewStatus}
                      </span>
                    </td>

                    <td style={{ padding: '6px 12px', fontSize: '11px', color: '#64748b', verticalAlign: 'middle' }}>
                      {new Date(attr.lastVerifiedAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )}
  </div>
);
};
