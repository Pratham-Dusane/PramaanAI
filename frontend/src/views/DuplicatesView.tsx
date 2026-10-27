import React, { useState } from 'react';
import { 
  Copy, 
  ShieldCheck, 
  AlertCircle, 
  GitMerge, 
  FileCheck, 
  Camera, 
  Hash, 
  ExternalLink, 
  Eye, 
  CheckCircle2, 
  ArrowRight,
  ShieldAlert,
  Search,
  Filter
} from 'lucide-react';

export const DuplicatesView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ALL' | 'BYTE_EXACT' | 'PERCEPTUAL' | 'FACULTY'>('ALL');
  const [selectedMatch, setSelectedMatch] = useState<string>('MATCH-PHASH-01');
  const [actionNotes, setActionNotes] = useState<Record<string, string>>({});
  const [actionRecorded, setActionRecorded] = useState<Record<string, boolean>>({});

  const handleRecordAction = (id: string, note: string) => {
    setActionNotes(prev => ({ ...prev, [id]: note }));
    setActionRecorded(prev => ({ ...prev, [id]: true }));
  };

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '1440px', margin: '0 auto', width: '100%' }}>
      
      {/* 1. LUMINOUS LIGHT EXECUTIVE HEADER */}
      <div 
        style={{ 
          background: '#ffffff',
          borderRadius: '16px',
          padding: '24px 28px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
          position: 'relative'
        }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '24px', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{
                background: '#eff6ff',
                border: '1px solid #bfdbfe',
                color: '#1d4ed8',
                fontSize: '10px',
                fontWeight: 800,
                padding: '3px 10px',
                borderRadius: '100px',
                letterSpacing: '0.06em',
                textTransform: 'uppercase'
              }}>
                RELATIONSHIP INTELLIGENCE
              </span>
              <span style={{
                background: '#fef3c7',
                border: '1px solid #fde68a',
                color: '#92400e',
                fontSize: '10px',
                fontWeight: 700,
                padding: '3px 8px',
                borderRadius: '6px'
              }}>
                SAFETY INVARIANTS ACTIVE
              </span>
            </div>

            <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', margin: '0 0 6px 0', letterSpacing: '-0.02em' }}>
              Duplicate Evidence & Cross-Institution Relationship Scanner
            </h1>

            <p style={{ fontSize: '13px', color: '#64748b', margin: 0, maxWidth: '760px', lineHeight: 1.5 }}>
              Surfaces candidate shared evidence across institutions including cryptographic SHA-256 digest collisions, perceptual visual similarities, and faculty identifier overlaps. All findings use neutral advisory language for human scrutiny.
            </p>
          </div>

          {/* Safety Invariant Notice Pill */}
          <div style={{
            background: '#f8fafc',
            borderRadius: '12px',
            padding: '12px 16px',
            border: '1px solid #e2e8f0',
            maxWidth: '300px',
            fontSize: '11px',
            color: '#475569',
            lineHeight: 1.4
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#b45309', fontWeight: 700, marginBottom: '3px' }}>
              <ShieldCheck size={14} />
              <span>Safety Guardrail Policy</span>
            </div>
            Identical bytes prove byte identity, not fraud. Physical inspection and authorized official review remain authoritative.
          </div>
        </div>

        {/* 4 Light Summary Stat Badges */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '12px', 
          marginTop: '20px', 
          paddingTop: '18px', 
          borderTop: '1px solid #f1f5f9' 
        }}>
          <div style={{ background: '#f8fafc', borderRadius: '10px', padding: '12px 14px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '10px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 700 }}>
              BYTE-LEVEL COLLISIONS (SHA-256)
            </div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#0284c7', marginTop: '2px' }}>
              1 Verified Match
            </div>
            <div style={{ fontSize: '10px', color: '#64748b', marginTop: '2px' }}>
              Within-institution prior year re-filing
            </div>
          </div>

          <div style={{ background: '#f8fafc', borderRadius: '10px', padding: '12px 14px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '10px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 700 }}>
              PERCEPTUAL SIMILARITY (PHASH)
            </div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#b45309', marginTop: '2px' }}>
              1 Candidate (Distance = 2)
            </div>
            <div style={{ fontSize: '10px', color: '#64748b', marginTop: '2px' }}>
              Cross-institution computer lab photo
            </div>
          </div>

          <div style={{ background: '#f8fafc', borderRadius: '10px', padding: '12px 14px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '10px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 700 }}>
              FACULTY BIOMETRIC OVERLAP
            </div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#047857', marginTop: '2px' }}>
              0 Shared PAN/Aadhaar
            </div>
            <div style={{ fontSize: '10px', color: '#64748b', marginTop: '2px' }}>
              100% Unique faculty roster
            </div>
          </div>

          <div style={{ background: '#f8fafc', borderRadius: '10px', padding: '12px 14px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '10px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 700 }}>
              LAND CADASTRE OVERLAP
            </div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#047857', marginTop: '2px' }}>
              0 Parcel Conflicts
            </div>
            <div style={{ fontSize: '10px', color: '#64748b', marginTop: '2px' }}>
              Survey No. 44/2 bounds isolated
            </div>
          </div>
        </div>
      </div>

      {/* 2. FILTER TABS STRIP */}
      <div style={{
        display: 'flex',
        gap: '8px',
        background: '#ffffff',
        padding: '8px 12px',
        borderRadius: '14px',
        border: '1px solid #dbe5e2',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.03)'
      }}>
        {[
          { id: 'ALL', label: 'All Relationship Signals' },
          { id: 'PERCEPTUAL', label: 'Perceptual Image Similarity (pHash)' },
          { id: 'BYTE_EXACT', label: 'Exact File Byte Digest (SHA-256)' },
          { id: 'FACULTY', label: 'Faculty Roster & Identity Overlap' }
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                padding: '8px 16px',
                borderRadius: '10px',
                border: 'none',
                background: isActive ? '#1d4ed8' : 'transparent',
                color: isActive ? '#ffffff' : '#64748b',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.16s ease'
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 3. CORE INVESTIGATION PANELS */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* Module 1: Perceptual Visual Similarity Deep Dive */}
        {(activeTab === 'ALL' || activeTab === 'PERCEPTUAL') && (
          <div style={{
            background: '#ffffff',
            borderRadius: '16px',
            padding: '26px',
            border: '1px solid #fed7aa',
            boxShadow: '0 4px 20px rgba(234, 88, 12, 0.05)',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: '#ffedd5',
                  color: '#c2410c',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Camera size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', margin: '0 0 2px 0' }}>
                    Candidate Visual Similarity: Campus Computer Center Photograph
                  </h3>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>
                    Perceptual Hash Distance: <code>pHash Hamming Distance = 2</code> (High Visual Overlap)
                  </div>
                </div>
              </div>

              <span style={{ fontSize: '11px', fontWeight: 800, color: '#c2410c', background: '#ffedd5', padding: '4px 10px', borderRadius: '6px' }}>
                FOR SCRUTINY REVIEW
              </span>
            </div>

            {/* Visual Side-by-Side Comparison Box */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              {/* Image A */}
              <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '16px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
                  FILE A: CURRENT APPLICATION (DEMO-EOA-2026-001)
                </div>
                <div style={{
                  height: '140px',
                  background: '#0f2922',
                  borderRadius: '8px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#a7f3d0',
                  padding: '16px',
                  textAlign: 'center',
                  border: '1px dashed rgba(16, 185, 129, 0.4)'
                }}>
                  <Camera size={28} />
                  <span style={{ fontSize: '12px', fontWeight: 700, marginTop: '8px' }}>Campus_Computer_Center_Geo.jpg</span>
                  <span style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.6)' }}>Uploaded: 24-Oct-2026 • 2.4 MB</span>
                </div>
                <div style={{ marginTop: '10px', fontSize: '11px', color: '#475569' }}>
                  Institution: <strong>Dr. A.P.J. Abdul Kalam Technical Campus</strong>
                </div>
                <div style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: '#64748b', marginTop: '2px' }}>
                  Digest: <code>9a4f21b7e098...</code>
                </div>
              </div>

              {/* Image B */}
              <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '16px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
                  FILE B: CANDIDATE MATCH (DEMO-EOA-2026-002)
                </div>
                <div style={{
                  height: '140px',
                  background: '#1e293b',
                  borderRadius: '8px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#cbd5e1',
                  padding: '16px',
                  textAlign: 'center',
                  border: '1px dashed rgba(148, 163, 184, 0.4)'
                }}>
                  <Camera size={28} />
                  <span style={{ fontSize: '12px', fontWeight: 700, marginTop: '8px' }}>Sardar_Patel_Lab_Photo_2.jpg</span>
                  <span style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.6)' }}>Uploaded: 22-Oct-2026 • 2.3 MB</span>
                </div>
                <div style={{ marginTop: '10px', fontSize: '11px', color: '#475569' }}>
                  Institution: <strong>Sardar Patel Institute of Applied Technology</strong>
                </div>
                <div style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: '#64748b', marginTop: '2px' }}>
                  Digest: <code>9a4f21b7e09a...</code>
                </div>
              </div>
            </div>

            {/* Findings Explanation & Human Review Form */}
            <div style={{ background: '#fffaf5', border: '1px solid #fed7aa', borderRadius: '12px', padding: '16px' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#9a3412', marginBottom: '6px' }}>
                Analysis Summary:
              </div>
              <p style={{ fontSize: '12px', color: '#7c2d12', margin: '0 0 12px 0', lineHeight: 1.5 }}>
                OCR detected interior wall signage in File B reading "SP Applied Lab 2", whereas File A shows a digital blur over the identical partition wall with identical monitor arrangements and floor tiling pattern.
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => handleRecordAction('MATCH-PHASH-01', 'PHYSICAL_INSPECTION_MANDATED')}
                  style={{
                    background: '#ea580c',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '8px 16px',
                    fontSize: '11px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Flag for Expert Visit Committee (EVC) Spot Check
                </button>
                <button
                  onClick={() => handleRecordAction('MATCH-PHASH-01', 'RECONCILED')}
                  style={{
                    background: '#ffffff',
                    color: '#475569',
                    border: '1px solid #cbd5e1',
                    borderRadius: '8px',
                    padding: '8px 16px',
                    fontSize: '11px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Mark False Positive with Explanation
                </button>

                {actionRecorded['MATCH-PHASH-01'] && (
                  <span style={{ fontSize: '11px', color: '#059669', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <CheckCircle2 size={13} />
                    <span>Review action recorded into audit log.</span>
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Module 2: Exact Byte-Level File Duplicates (SHA-256) */}
        {(activeTab === 'ALL' || activeTab === 'BYTE_EXACT') && (
          <div style={{
            background: '#ffffff',
            borderRadius: '16px',
            padding: '26px',
            border: '1px solid #dbe5e2',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: '#f0fdf4',
                  color: '#16a34a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Hash size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', margin: '0 0 2px 0' }}>
                    Exact Byte-Level File Digest Collisions (SHA-256)
                  </h3>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>
                    Deterministic cryptographic matching against historic document repository
                  </div>
                </div>
              </div>

              <span style={{ fontSize: '11px', fontWeight: 800, color: '#16a34a', background: '#dcfce7', padding: '4px 10px', borderRadius: '6px' }}>
                1 LEGITIMATE MATCH
              </span>
            </div>

            <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '16px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <strong style={{ fontSize: '13px', color: '#0f172a' }}>
                  Pune_PMC_Fire_NOC_2025_26.pdf
                </strong>
                <span style={{ fontSize: '11px', color: '#64748b' }}>
                  Size: 1.4 MB
                </span>
              </div>

              <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#0284c7', background: '#f0f9ff', padding: '8px 12px', borderRadius: '6px', marginBottom: '10px' }}>
                SHA-256: c3d4e5f60718293a4b5c6d7e8f90123456789abcdef0123456789abcdef012
              </div>

              <p style={{ fontSize: '12px', color: '#475569', margin: 0, lineHeight: 1.5 }}>
                Matched prior filing in <strong>DEMO-EOA-2025-001</strong> submitted by the same institution. This represents a legitimate historic document re-submission (carrying forward the un-renewed certificate pending fresh municipal receipt).
              </p>
            </div>
          </div>
        )}

        {/* Module 3: Faculty Roster Overlap */}
        {(activeTab === 'ALL' || activeTab === 'FACULTY') && (
          <div style={{
            background: '#ffffff',
            borderRadius: '16px',
            padding: '26px',
            border: '1px solid #dbe5e2',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: '#f0fdf4',
                  color: '#16a34a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <GitMerge size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', margin: '0 0 2px 0' }}>
                    Faculty Identifier & Biometric Registry Check
                  </h3>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>
                    Cross-references faculty PAN, Aadhaar hash, and AICTE National Faculty Database
                  </div>
                </div>
              </div>

              <span style={{ fontSize: '11px', fontWeight: 800, color: '#16a34a', background: '#dcfce7', padding: '4px 10px', borderRadius: '6px' }}>
                CLEAN (0 CONFLICTS)
              </span>
            </div>

            <p style={{ fontSize: '12px', color: '#475569', margin: 0, lineHeight: 1.5 }}>
              All 48 declared regular faculty members have unique national biometric credentials and active institutional appointments. Zero concurrent appointments detected at other institutions for AY 2026-27.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
