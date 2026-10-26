import React, { useState } from 'react';
import { X, ShieldAlert, CheckCircle, FileCheck, AlertOctagon } from 'lucide-react';
import { Application, UserRole } from '../types';

interface DecisionModalProps {
  isOpen: boolean;
  onClose: () => void;
  application: Application;
  currentRole: UserRole;
  onRecordDecision: (decision: {
    decisionType: 'APPROVED' | 'REJECTED' | 'DEFERRED_FOR_INSPECTION';
    recordedBy: string;
    reason: string;
    citedEvidence: string[];
  }) => void;
}

export const DecisionModal: React.FC<DecisionModalProps> = ({
  isOpen,
  onClose,
  application,
  currentRole,
  onRecordDecision
}) => {
  const [decisionType, setDecisionType] = useState<'APPROVED' | 'REJECTED' | 'DEFERRED_FOR_INSPECTION'>('DEFERRED_FOR_INSPECTION');
  const [justification, setJustification] = useState('');
  const [officerName, setOfficerName] = useState('Shri A. P. Mehta (Senior Reviewer & Approving Official)');
  const [selectedFindings, setSelectedFindings] = useState<string[]>(
    application.findings.map((f) => f.id)
  );

  if (!isOpen) return null;

  const isAuthorized = currentRole === 'SENIOR_APPROVER';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthorized) return;
    if (!justification.trim()) return;

    onRecordDecision({
      decisionType,
      recordedBy: officerName,
      reason: justification,
      citedEvidence: selectedFindings
    });
    onClose();
  };

  const toggleFindingSelection = (id: string) => {
    setSelectedFindings((prev) => 
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="modal-backdrop fade-in" onClick={onClose}>
      <div 
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '640px' }}
      >
        <div className="panel-header">
          <div className="panel-title">
            <ShieldAlert size={18} color="var(--accent-amber)" />
            <span>Record Official Human Decision (Protected Action)</span>
          </div>
          <button className="btn btn-outline btn-sm" onClick={onClose} aria-label="Close modal">
            <X size={16} />
          </button>
        </div>

        {/* RBAC Warning if unauthorized */}
        {!isAuthorized ? (
          <div style={{
            background: 'rgba(244, 63, 94, 0.12)',
            border: '1px solid rgba(244, 63, 94, 0.35)',
            borderRadius: 'var(--radius-md)',
            padding: '14px',
            marginBottom: '16px',
            display: 'flex',
            gap: '10px'
          }}>
            <AlertOctagon size={20} color="var(--accent-rose)" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div style={{ fontSize: '12px' }}>
              <strong style={{ color: '#fff' }}>Access Restricted: Permission "decision.record" Required</strong>
              <p style={{ color: '#fb7185', marginTop: '2px' }}>
                Your current role (<strong>{currentRole}</strong>) is advisory only. In accordance with safety invariant ADR-005, AI agents and scrutiny reviewers cannot write official approval or rejection decisions.
              </p>
              <p style={{ color: 'var(--text-secondary)', marginTop: '6px' }}>
                💡 <em>Tip: Switch your active role in the top header to <strong>Senior Approver</strong> to simulate authorized decision recording.</em>
              </p>
            </div>
          </div>
        ) : (
          <div style={{
            background: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: 'var(--radius-md)',
            padding: '12px',
            marginBottom: '16px',
            fontSize: '12px',
            color: 'var(--status-pass-text)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <CheckCircle size={16} />
            <span>Authenticated as Authorized Approving Official with verified <code>decision.record</code> entitlement.</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
              Application Identifier & Institution
            </label>
            <div style={{
              background: 'var(--bg-surface-elevated)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '10px 14px',
              fontSize: '13px'
            }}>
              <strong>{application.id}</strong> — {application.institutionName} ({application.academicYear})
            </div>
          </div>

          <div>
            <label style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
              Official Decision Outcome
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              <button
                type="button"
                className={`btn ${decisionType === 'APPROVED' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setDecisionType('APPROVED')}
                style={{ fontSize: '12px', padding: '8px' }}
                disabled={!isAuthorized}
              >
                Approve EoA
              </button>
              <button
                type="button"
                className={`btn ${decisionType === 'DEFERRED_FOR_INSPECTION' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setDecisionType('DEFERRED_FOR_INSPECTION')}
                style={{ fontSize: '12px', padding: '8px' }}
                disabled={!isAuthorized}
              >
                Defer for Inspection
              </button>
              <button
                type="button"
                className={`btn ${decisionType === 'REJECTED' ? 'btn-danger' : 'btn-secondary'}`}
                onClick={() => setDecisionType('REJECTED')}
                style={{ fontSize: '12px', padding: '8px' }}
                disabled={!isAuthorized}
              >
                Reject EoA
              </button>
            </div>
          </div>

          <div>
            <label style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
              Approving Official Signature / Identity
            </label>
            <input 
              type="text"
              className="input-control"
              value={officerName}
              onChange={(e) => setOfficerName(e.target.value)}
              disabled={!isAuthorized}
              required
            />
          </div>

          <div>
            <label style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
              Mandatory Regulatory Justification Note
            </label>
            <textarea
              className="input-control"
              rows={4}
              placeholder="State the formal rationale, citing scrutiny committee findings, deficiency rectifications, or physical inspection requirements..."
              value={justification}
              onChange={(e) => setJustification(e.target.value)}
              disabled={!isAuthorized}
              required
              style={{ resize: 'vertical' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
              Linked Evidence & Findings Cited in Decision
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '160px', overflowY: 'auto' }}>
              {application.findings.map((f) => (
                <label 
                  key={f.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '12px',
                    background: 'var(--bg-surface-elevated)',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-subtle)',
                    cursor: isAuthorized ? 'pointer' : 'not-allowed'
                  }}
                >
                  <input 
                    type="checkbox"
                    checked={selectedFindings.includes(f.id)}
                    onChange={() => toggleFindingSelection(f.id)}
                    disabled={!isAuthorized}
                  />
                  <span>
                    <strong>[{f.findingKey}]</strong> {f.title}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <button type="button" className="btn btn-outline" onClick={onClose}>
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={!isAuthorized || !justification.trim()}
            >
              <FileCheck size={16} /> Confirm & Sign Official Decision
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
