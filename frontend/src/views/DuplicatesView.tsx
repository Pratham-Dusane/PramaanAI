import React from 'react';
import { Copy, ShieldCheck, AlertCircle, GitMerge, FileCheck } from 'lucide-react';

export const DuplicatesView: React.FC = () => {
  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div className="glass-panel" style={{ padding: '20px' }}>
        <div className="panel-header" style={{ marginBottom: '8px' }}>
          <div className="panel-title">
            <Copy size={20} color="var(--primary-500)" />
            <span>Duplicate Evidence & Cross-Institution Relationship Intelligence (FR-17, FR-20)</span>
          </div>
          <span className="badge badge-info">Candidate Relationship Discovery</span>
        </div>
        <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
          Surfaces candidate shared attributes across institutions (reused digests, overlapping faculty declarations, or common contact coordinates). Uses neutral phrasing such as "Potential shared attribute for review" per FR-20 safety invariants.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Module 1: Exact Byte-Level File Duplicates (SHA-256) */}
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700 }}>
              Exact Byte-Level File Duplicates (SHA-256)
            </h3>
            <span className="badge badge-pass">Deterministic Hash Index</span>
          </div>

          <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
            SHA-256 proves byte identity against a prior digest, not that a document was genuinely issued by an authority.
          </p>

          <div style={{
            background: 'var(--bg-surface-elevated)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '14px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <strong style={{ fontSize: '12px', color: '#fff' }}>
                Pune_PMC_Fire_NOC_2025_26.pdf
              </strong>
              <span className="badge badge-info" style={{ fontSize: '10px' }}>
                1 Match Found
              </span>
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              Digest: c3d4e5f60718293a4b5c6d7e8f90123456789abcdef0123456789abcdef012
            </div>
            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              padding: '8px 10px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '11px',
              color: 'var(--text-secondary)'
            }}>
              Matched prior filing in <strong>DEMO-EOA-2025-001</strong> by the same institution. Represents a legitimate re-submission of the un-renewed document.
            </div>
          </div>
        </div>

        {/* Module 2: Near-Duplicate Perceptual Similarity */}
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700 }}>
              Near-Duplicate Visual Candidate
            </h3>
            <span className="badge badge-review">pHash Distance = 2</span>
          </div>

          <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
            Perceptual hashing identifies visually similar or re-compressed image files submitted across separate applications.
          </p>

          <div style={{
            background: 'var(--bg-surface-elevated)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '14px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <strong style={{ fontSize: '12px', color: '#fff' }}>
                Campus_Computer_Center_Geo.jpg
              </strong>
              <span className="badge badge-review" style={{ fontSize: '10px' }}>
                Candidate Similarity
              </span>
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              Compared with photo submitted in DEMO-EOA-2026-002 (Sardar Patel Institute).
            </div>
            <div style={{
              background: 'rgba(245, 158, 11, 0.08)',
              borderLeft: '3px solid var(--accent-amber)',
              padding: '8px 10px',
              fontSize: '11px',
              color: '#fde68a'
            }}>
              Status: <code>LIKELY_DUPLICATE_CANDIDATE</code>. Never auto-rejected. Reviewer or inspector must confirm whether facilities are distinct.
            </div>
          </div>
        </div>
      </div>

      {/* Cross-Institution Relationship Intelligence Table */}
      <div className="glass-panel">
        <div className="panel-header">
          <div className="panel-title">
            <GitMerge size={18} color="var(--primary-500)" />
            <span>Cross-Institution Shared Attribute Graph Analysis (FR-20)</span>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="data-table" aria-label="Cross Institution Relationships">
            <thead>
              <tr>
                <th scope="col">Institution A</th>
                <th scope="col">Institution B</th>
                <th scope="col">Shared Attribute Candidate</th>
                <th scope="col">Match Method</th>
                <th scope="col">Review Status</th>
                <th scope="col">Limitations & Context</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>A.P.J. Abdul Kalam Institute (DEMO-INST-001)</strong></td>
                <td><strong>Sardar Patel Institute (DEMO-INST-002)</strong></td>
                <td>Computer Center Photograph Asset</td>
                <td><span className="badge badge-info">pHash Image Comparison</span></td>
                <td><span className="badge badge-review">Under Inspection</span></td>
                <td style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                  Potential shared photography contractor or stock imagery.
                </td>
              </tr>
              <tr>
                <td><strong>A.P.J. Abdul Kalam Institute (DEMO-INST-001)</strong></td>
                <td><strong>Vidya Vikas College (DEMO-INST-003)</strong></td>
                <td>Faculty Member Name & PAN Number Overlap</td>
                <td><span className="badge badge-pass">Exact PAN String Match</span></td>
                <td><span className="badge badge-review">Clarification Requested</span></td>
                <td style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                  Candidate adjunct professor cross-appointment. Candidate must produce NOC from primary institution.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
