import React from 'react';
import { Clock, Layers, ShieldCheck, CheckCircle2, History } from 'lucide-react';
import { mockDigitalTwinAttributes } from '../data/mockData';

export const DigitalTwinView: React.FC = () => {
  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div className="glass-panel" style={{ padding: '20px' }}>
        <div className="panel-header" style={{ marginBottom: '8px' }}>
          <div className="panel-title">
            <Clock size={20} color="var(--primary-500)" />
            <span>Institutional Digital Twin & Historical Provenance (FR-07)</span>
          </div>
          <span className="badge badge-info">Time-Aware Snapshot Model</span>
        </div>
        <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
          The digital twin compiles time-attributed factual records from applicant declarations, OCR extractions, reviewer-confirmed values, and authorized external registries. Every attribute maintains provenance and supersession history across academic years.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
        <div className="glass-panel">
          <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)' }}>ATTRIBUTE BREAKDOWN BY PROVENANCE</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
              <span>APPLICANT_DECLARED</span>
              <strong>1 Attribute</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
              <span>AI_EXTRACTED (OCR)</span>
              <strong>1 Attribute</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
              <span>REVIEWER_CONFIRMED</span>
              <strong style={{ color: 'var(--accent-emerald)' }}>3 Attributes</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
              <span>AUTHORIZED_EXTERNAL</span>
              <strong style={{ color: 'var(--accent-cyan)' }}>1 Attribute</strong>
            </div>
          </div>
        </div>

        <div className="glass-panel">
          <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)' }}>COMPLIANCE DRIFT ANALYSIS</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px', fontSize: '12px' }}>
            <div style={{ color: 'var(--accent-emerald)' }}>
              ✓ Land ownership continuous since 2012
            </div>
            <div style={{ color: 'var(--accent-emerald)' }}>
              ✓ Instructional built-up area expanded from 13,200 to 14,850 sq.m.
            </div>
            <div style={{ color: 'var(--accent-rose)' }}>
              ⚠ Fire safety NOC status moved from CONFIRMED to EXPIRED (31-03-2026)
            </div>
          </div>
        </div>
      </div>

      <div className="glass-panel">
        <div className="panel-header">
          <div className="panel-title">
            <History size={18} color="var(--primary-500)" />
            <span>Digital Twin Attribute Ledger (All Academic Years)</span>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="data-table" aria-label="Digital Twin Complete Ledger">
            <thead>
              <tr>
                <th scope="col">Academic Year</th>
                <th scope="col">Attribute Name</th>
                <th scope="col">Value</th>
                <th scope="col">Provenance Kind</th>
                <th scope="col">Review Status</th>
                <th scope="col">Extraction Confidence</th>
                <th scope="col">Last Verified Date</th>
              </tr>
            </thead>
            <tbody>
              {mockDigitalTwinAttributes.map((attr) => (
                <tr key={attr.id} style={{ opacity: attr.superseded ? 0.5 : 1 }}>
                  <td><strong>{attr.academicYear}</strong></td>
                  <td>
                    {attr.attributeLabel}
                    {attr.superseded && (
                      <span className="badge badge-info" style={{ marginLeft: '6px', fontSize: '9px' }}>
                        Superseded
                      </span>
                    )}
                  </td>
                  <td><code>{String(attr.value)}</code></td>
                  <td>
                    <span className="badge badge-info" style={{ fontSize: '10px' }}>
                      {attr.sourceKind}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${
                      attr.reviewStatus === 'CONFIRMED' 
                        ? 'badge-pass' 
                        : attr.reviewStatus === 'DISPUTED' 
                        ? 'badge-insufficient' 
                        : 'badge-review'
                    }`} style={{ fontSize: '10px' }}>
                      {attr.reviewStatus}
                    </span>
                  </td>
                  <td>
                    {attr.confidence !== null ? `${(attr.confidence * 100).toFixed(0)}%` : 'Authoritative'}
                  </td>
                  <td style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    {new Date(attr.lastVerifiedAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
