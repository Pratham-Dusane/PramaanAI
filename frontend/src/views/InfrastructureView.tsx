import React, { useState } from 'react';
import { Building2, AlertTriangle, CheckCircle, FileText, Camera, Plus, Check } from 'lucide-react';

export const InfrastructureView: React.FC = () => {
  const [inspectorNotes, setInspectorNotes] = useState('');
  const [submittedNotes, setSubmittedNotes] = useState<string[]>([
    'Physical visit required for Classroom C-204 to reconcile blueprint 54 sq.m. label with declared 66 sq.m. carpet area.'
  ]);

  const handleAddNote = () => {
    if (!inspectorNotes.trim()) return;
    setSubmittedNotes((prev) => [...prev, inspectorNotes]);
    setInspectorNotes('');
  };

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div className="glass-panel" style={{ padding: '20px' }}>
        <div className="panel-header" style={{ marginBottom: '8px' }}>
          <div className="panel-title">
            <Building2 size={20} color="var(--primary-500)" />
            <span>Infrastructure Evidence Compliance Checker (FR-11)</span>
          </div>
          <span className="badge badge-info">Visual Signal Assistant</span>
        </div>
        <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
          Assists scrutiny officers and Expert Visit Committee (EVC) inspectors with visual evidence analysis. Cues like image duplicates, date discrepancies, or OCR dimension mismatches are prioritized for human verification.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Signal 1: Cross-Campus Duplicate Photograph */}
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Camera size={16} color="var(--accent-amber)" />
              <span>Visual Similarity & Re-Use Detector</span>
            </h3>
            <span className="badge badge-review">98.4% Match</span>
          </div>

          <div style={{
            background: 'var(--bg-surface-elevated)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}>
            <div style={{ display: 'flex', gap: '12px' }}>
              <div style={{
                width: '120px',
                height: '90px',
                background: '#1e293b',
                borderRadius: 'var(--radius-sm)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '11px',
                color: 'var(--text-muted)',
                border: '1px solid var(--border-subtle)'
              }}>
                [Photo Asset A]
              </div>
              <div style={{ flex: 1, fontSize: '12px' }}>
                <strong>Campus_Computer_Center_Geo.jpg</strong>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                  Submitted by: A.P.J. Abdul Kalam Institute (DEMO-INST-001)
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                  Perceptual Hash: <code>pHash-9a4f21b7</code>
                </div>
              </div>
            </div>

            <div style={{
              background: 'rgba(245, 158, 11, 0.1)',
              borderLeft: '3px solid var(--accent-amber)',
              padding: '8px 12px',
              fontSize: '11px',
              color: '#fde68a'
            }}>
              ⚠ Similar visual layout matches photo uploaded in application <strong>DEMO-EOA-2026-002</strong> by Sardar Patel Institute. OCR detected background signage reading "SP Applied Lab 2".
            </div>
          </div>

          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
            Policy Guardrail: Image analysis cannot conclusively prove fraud. Physical inspection remains authoritative.
          </div>
        </div>

        {/* Signal 2: Blueprint Label & Floor Plan OCR */}
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FileText size={16} color="var(--accent-rose)" />
              <span>Architectural Drawing OCR Discrepancy</span>
            </h3>
            <span className="badge badge-insufficient">Mismatch: -12 sq.m.</span>
          </div>

          <div style={{
            background: 'var(--bg-surface-elevated)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}>
            <div style={{ fontSize: '12px', color: 'var(--text-main)' }}>
              <strong>Approved_Master_Floor_Plan_Bldg_A.pdf (Page 2)</strong>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '10px',
              fontSize: '12px'
            }}>
              <div style={{ background: 'rgba(0,0,0,0.2)', padding: '10px', borderRadius: 'var(--radius-sm)' }}>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)', display: 'block' }}>FORM DECLARATION:</span>
                <strong>Classroom C-204 = 66 sq.m.</strong>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.2)', padding: '10px', borderRadius: 'var(--radius-sm)' }}>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)', display: 'block' }}>BLUEPRINT OCR LABEL:</span>
                <strong style={{ color: 'var(--accent-rose)' }}>Classroom C-204 = 54 sq.m.</strong>
              </div>
            </div>

            <div style={{
              background: 'rgba(244, 63, 94, 0.1)',
              borderLeft: '3px solid var(--accent-rose)',
              padding: '8px 12px',
              fontSize: '11px',
              color: '#fecdd3'
            }}>
              Discrepancy: Blueprint dimension shows 54 sq.m. which does not meet the minimum 66 sq.m. norm for 60-student batch division.
            </div>
          </div>
        </div>
      </div>

      {/* Domain Expert / Inspector Observation Logging Form */}
      <div className="glass-panel">
        <div className="panel-header">
          <div className="panel-title">
            <span>Inspector Observations & Physical EVC Notes</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input 
              type="text"
              className="input-control"
              placeholder="Enter field observation note (e.g. Conducted physical inspection on 24-Oct; verified server room racks)..."
              value={inspectorNotes}
              onChange={(e) => setInspectorNotes(e.target.value)}
            />
            <button className="btn btn-primary" onClick={handleAddNote}>
              <Plus size={14} /> Add Observation
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '6px' }}>
            {submittedNotes.map((note, idx) => (
              <div 
                key={idx}
                style={{
                  background: 'var(--bg-surface-elevated)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '10px 14px',
                  fontSize: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <CheckCircle size={14} color="var(--accent-emerald)" />
                <span>{note}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
