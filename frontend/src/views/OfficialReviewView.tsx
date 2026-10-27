import React, { useState } from 'react';
import {
  ShieldCheck,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  FileText,
  Clock,
  UserCheck,
  ArrowRight,
  ExternalLink,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { mockRecommendation, mockReviews, mockScoreRuns } from '../data/mockMethodologyData';
import { Application, UserRole, ReviewAction, MethodologyMode } from '../types';
import { ActiveView } from '../components/Navbar';

interface OfficialReviewViewProps {
  application: Application;
  currentRole: UserRole;
  onNavigate: (view: ActiveView) => void;
}

export const OfficialReviewView: React.FC<OfficialReviewViewProps> = ({
  application,
  currentRole,
  onNavigate,
}) => {
  const rec = mockRecommendation;
  const scoreRun = mockScoreRuns[0];

  const [reviewAction, setReviewAction] = useState<ReviewAction>('ACCEPT');
  const [selectedMode, setSelectedMode] = useState<MethodologyMode>('PHYSICAL_EVC');
  const [reasonCode, setReasonCode] = useState<string>('AGREE_WITH_RECOMMENDATION');
  const [reasonText, setReasonText] = useState<string>('');
  const [secondApprover, setSecondApprover] = useState<string>('Shri A. P. Mehta (Senior Approver)');
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);

  // Floor gate mode rank
  const modeRank: Record<MethodologyMode, number> = {
    DESK_ONLY: 1,
    ONLINE_EVC: 2,
    HYBRID_EVC: 3,
    PHYSICAL_EVC: 4,
    DEFER_INSUFFICIENT_CONTEXT: 0
  };

  const isBelowFloor = modeRank[selectedMode] < modeRank[rec.floorMode as MethodologyMode];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConfirmed) return;
    setIsSubmitted(true);
  };

  return (
    <div className="review-container" style={{ padding: '24px 32px 80px', maxWidth: '1380px', margin: '0 auto' }}>

      {/* 1. Header */}
      <div style={{ marginBottom: '20px' }}>
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
            Official Review and Sign-Off
          </span>
          <span style={{ color: 'var(--text-muted)', fontSize: '13px' }}>/</span>
          <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
            EVC Authority Workflow
          </span>
        </div>
        <h1 style={{ fontSize: '26px', fontWeight: 800, color: 'var(--text-main)', margin: 0, letterSpacing: '-0.02em' }}>
          Official Methodology Review
        </h1>
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
          <strong>Authority Sign-Off Protocol:</strong> Under Section 4 of the Approval Process Handbook, the competent official records the final methodology decision. Any deviation below policy gate floor requires two-approver concurrence.
        </span>
      </div>

      {/* Submission Success State */}
      {isSubmitted ? (
        <div
          style={{
            background: 'rgba(16, 185, 129, 0.08)',
            border: '1.5px solid rgba(16, 185, 129, 0.35)',
            borderRadius: '16px',
            padding: '36px 40px',
            textAlign: 'center',
            marginBottom: '32px'
          }}
        >
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: '#10b981',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px'
            }}
          >
            <CheckCircle2 size={32} />
          </div>

          <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#047857', margin: '0 0 8px' }}>
            Methodology Decision Recorded
          </h2>

          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', maxWidth: '540px', margin: '0 auto 20px', lineHeight: 1.5 }}>
            Decision action <strong>{reviewAction}</strong> for application <strong>{application.id}</strong> has been logged into the immutable audit trail.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
            <button
              onClick={() => onNavigate('BRIEF')}
              style={{
                background: 'var(--bg-pine)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                padding: '10px 20px',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Open Pre-Visit Brief
            </button>
            <button
              onClick={() => setIsSubmitted(false)}
              style={{
                background: '#ffffff',
                color: 'var(--text-main)',
                border: '1px solid rgba(38, 61, 57, 0.15)',
                borderRadius: '8px',
                padding: '10px 20px',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Modify Decision
            </button>
          </div>
        </div>
      ) : (
        /* 2. HERO: 2-Column Split (AI Card vs Official Form) */
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(340px, 420px) 1fr',
            gap: '28px',
            marginBottom: '32px',
            alignItems: 'start'
          }}
        >

          {/* Left Column: AI Recommendation Summary (Read-Only Dark Card) */}
          <div
            style={{
              background: 'linear-gradient(135deg, #1b2f2b 0%, #263d39 60%, #1e3531 100%)',
              borderRadius: '20px',
              padding: '28px',
              color: '#ffffff',
              boxShadow: '0 16px 36px -10px rgba(26, 44, 41, 0.45), 0 0 0 1px rgba(255, 255, 255, 0.08)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span
                style={{
                  background: 'rgba(212, 160, 52, 0.2)',
                  color: '#fbbf24',
                  fontSize: '11px',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  padding: '3px 8px',
                  borderRadius: '6px'
                }}
              >
                AI Recommendation
              </span>
              <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-mono)' }}>
                REC-001
              </span>
            </div>

            <div style={{ fontSize: '24px', fontWeight: 800, color: '#ffffff', margin: '4px 0 6px' }}>
              Physical EVC
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '16px' }}>
              <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}>Statistical Confidence:</span>
              <span style={{ fontSize: '18px', fontWeight: 900, color: '#fbbf24' }}>
                {Math.round(rec.confidence * 100)}%
              </span>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.25)', borderRadius: '10px', padding: '14px', border: '1px solid rgba(255,255,255,0.08)', marginBottom: '18px' }}>
              <div style={{ fontSize: '10px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', fontWeight: 700, marginBottom: '2px' }}>
                Policy Floor Constraint
              </div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#fbbf24' }}>
                PHYSICAL_EVC (GATE-001)
              </div>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', marginTop: '4px' }}>
                Triggered by intake expansion exceeding 30% threshold
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', fontWeight: 700, marginBottom: '8px' }}>
                Primary Signal Drivers:
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px', color: 'rgba(255,255,255,0.85)' }}>
                <div>- Intake increase of +50% from verified baseline</div>
                <div>- 3 years since last verified physical inspection</div>
                <div>- Spatial discrepancy detected in floor plan check</div>
                <div>- Absence of required facility video stream</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', paddingTop: '14px', borderTop: '1px solid rgba(255,255,255,0.1)', fontSize: '12px' }}>
              <button
                onClick={() => onNavigate('BRIEF')}
                style={{ background: 'none', border: 'none', color: '#93c5fd', cursor: 'pointer', padding: 0, textDecoration: 'underline' }}
              >
                Inspect Brief
              </button>
              <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>
              <button
                onClick={() => onNavigate('MODE_COMPARE')}
                style={{ background: 'none', border: 'none', color: '#93c5fd', cursor: 'pointer', padding: 0, textDecoration: 'underline' }}
              >
                Compare 4 Modes
              </button>
            </div>
          </div>

          {/* Right Column: Official Decision Form (Clean Purposeful Card) */}
          <div
            style={{
              background: '#ffffff',
              borderRadius: '20px',
              padding: '32px',
              border: '1px solid rgba(38, 61, 57, 0.1)',
              boxShadow: '0 8px 24px rgba(38, 61, 57, 0.05)'
            }}
          >
            <h2 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-main)', margin: '0 0 4px' }}>
              Review Decision Form
            </h2>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '0 0 24px' }}>
              Select an action to adopt, modify, or reject the AI-computed evaluation methodology.
            </p>

            <form onSubmit={handleSubmit}>

              {/* Action Radio Group */}
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '10px' }}>
                  Official Review Action
                </label>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                  {[
                    { action: 'ACCEPT' as ReviewAction, label: 'Accept AI Mode', sub: 'Adopt Physical EVC', color: '#047857', bg: 'rgba(16, 185, 129, 0.08)' },
                    { action: 'MODIFY' as ReviewAction, label: 'Modify Mode', sub: 'Select Alternative', color: '#b45309', bg: 'rgba(217, 119, 6, 0.08)' },
                    { action: 'REJECT' as ReviewAction, label: 'Reject / Defer', sub: 'Return for Context', color: '#b91c1c', bg: 'rgba(220, 38, 38, 0.08)' },
                  ].map(item => {
                    const isSelected = reviewAction === item.action;

                    return (
                      <div
                        key={item.action}
                        onClick={() => {
                          setReviewAction(item.action);
                          if (item.action === 'ACCEPT') setSelectedMode('PHYSICAL_EVC');
                        }}
                        style={{
                          borderRadius: '12px',
                          padding: '14px',
                          border: isSelected ? `2px solid ${item.color}` : '1px solid rgba(38, 61, 57, 0.12)',
                          background: isSelected ? item.bg : '#ffffff',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <div style={{ fontSize: '14px', fontWeight: 800, color: isSelected ? item.color : 'var(--text-main)', marginBottom: '2px' }}>
                          {item.label}
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                          {item.sub}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Conditional Fields: When MODIFY is selected */}
              {reviewAction === 'MODIFY' && (
                <div style={{ background: 'var(--bg-main)', borderRadius: '12px', padding: '20px', marginBottom: '24px' }}>

                  {/* Target Mode Dropdown */}
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '6px' }}>
                      Selected Evaluation Mode:
                    </label>
                    <select
                      value={selectedMode}
                      onChange={(e) => setSelectedMode(e.target.value as MethodologyMode)}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: '8px',
                        border: '1px solid rgba(38, 61, 57, 0.2)',
                        background: '#ffffff',
                        fontSize: '13px',
                        fontWeight: 600,
                        color: 'var(--text-main)'
                      }}
                    >
                      <option value="PHYSICAL_EVC">Physical EVC (Standard On-Site Visit)</option>
                      <option value="HYBRID_EVC">Hybrid EVC (Video stream + Targeted Spot Visit)</option>
                      <option value="ONLINE_EVC">Online EVC (Live Interactive Video Only)</option>
                      <option value="DESK_ONLY">Desk Review Only (No Committee Visit)</option>
                      <option value="DEFER_INSUFFICIENT_CONTEXT">Defer: Insufficient Context</option>
                    </select>
                  </div>

                  {/* Below-Floor Warning Banner */}
                  {isBelowFloor && (
                    <div
                      style={{
                        background: 'rgba(239, 68, 68, 0.08)',
                        border: '1.5px solid rgba(239, 68, 68, 0.35)',
                        borderRadius: '8px',
                        padding: '12px 14px',
                        marginBottom: '16px',
                        fontSize: '12px',
                        color: '#b91c1c',
                        lineHeight: 1.4
                      }}
                    >
                      <strong>Policy Gate Floor Deviation Alert:</strong> Selected mode ({selectedMode}) is below the regulatory floor ({rec.floorMode}). Approval Process Handbook requires formal regulatory justification and secondary approver sign-off.
                    </div>
                  )}

                  {/* Reason Code Dropdown */}
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '6px' }}>
                      Reason Code:
                    </label>
                    <select
                      value={reasonCode}
                      onChange={(e) => setReasonCode(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: '8px',
                        border: '1px solid rgba(38, 61, 57, 0.2)',
                        background: '#ffffff',
                        fontSize: '13px',
                        color: 'var(--text-main)'
                      }}
                    >
                      <option value="INFRASTRUCTURE_ALREADY_VERIFIED_RECENTLY">Infrastructure already verified by competent authority recently</option>
                      <option value="CATEGORY_EXEMPTION_APPLIES">Category exemption applies under current circular</option>
                      <option value="INSPECTOR_UNAVAILABILITY_FORCE_MAJEURE">Inspector unavailability / force majeure constraints</option>
                      <option value="EVIDENCE_SUFFICIENT_ON_DESK_RECHECK">Evidence determined sufficient on physical document recheck</option>
                      <option value="POLICY_GATE_OVERRIDE_APPROVED">Policy gate override approved by regional officer</option>
                      <option value="OTHER">Other regulatory consideration</option>
                    </select>
                  </div>

                  {/* Secondary Approver (if below floor) */}
                  {isBelowFloor && (
                    <div style={{ marginBottom: '16px' }}>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '6px' }}>
                        Secondary Authorizing Official (Mandatory):
                      </label>
                      <select
                        value={secondApprover}
                        onChange={(e) => setSecondApprover(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          borderRadius: '8px',
                          border: '1px solid rgba(38, 61, 57, 0.2)',
                          background: '#ffffff',
                          fontSize: '13px',
                          color: 'var(--text-main)'
                        }}
                      >
                        <option value="Shri A. P. Mehta (Senior Approver)">Shri A. P. Mehta (Senior Approver - Decision Authority)</option>
                        <option value="Dr. S. K. Raman (Scrutiny Officer)">Dr. S. K. Raman (Scrutiny Officer - Reviewer)</option>
                      </select>
                    </div>
                  )}

                  {/* Written Justification Textarea */}
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '6px' }}>
                      Detailed Written Justification (Minimum 30 characters):
                    </label>
                    <textarea
                      rows={3}
                      value={reasonText}
                      onChange={(e) => setReasonText(e.target.value)}
                      placeholder="Provide specific regulatory rationale citing handbook clause and on-file evidence..."
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: '8px',
                        border: '1px solid rgba(38, 61, 57, 0.2)',
                        fontSize: '13px',
                        fontFamily: 'inherit',
                        resize: 'vertical'
                      }}
                    />
                  </div>

                </div>
              )}

              {/* Confirmation Checkbox */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '24px' }}>
                <input
                  type="checkbox"
                  id="confirmReview"
                  checked={isConfirmed}
                  onChange={(e) => setIsConfirmed(e.target.checked)}
                  style={{ marginTop: '3px', accentColor: 'var(--accent-gold)' }}
                />
                <label htmlFor="confirmReview" style={{ fontSize: '13px', color: 'var(--text-main)', lineHeight: 1.4, cursor: 'pointer' }}>
                  I confirm that I have evaluated the verification scores, gate floors, and case dossier. This decision represents an official methodology determination under AICTE guidelines.
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!isConfirmed || (reviewAction === 'MODIFY' && reasonText.trim().length < 10)}
                style={{
                  background: isConfirmed ? 'var(--bg-pine)' : 'rgba(38, 61, 57, 0.2)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '12px 24px',
                  fontSize: '14px',
                  fontWeight: 800,
                  cursor: isConfirmed ? 'pointer' : 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <span>Record Official Decision</span>
                <ArrowRight size={15} />
              </button>

            </form>
          </div>

        </div>
      )}

      {/* 3. Review History Timeline (Collapsed Accordion) */}
      <div
        style={{
          background: '#ffffff',
          borderRadius: '14px',
          border: '1px solid rgba(38, 61, 57, 0.1)',
          overflow: 'hidden'
        }}
      >
        <button
          onClick={() => setIsHistoryOpen(!isHistoryOpen)}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 24px',
            background: '#ffffff',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Clock size={16} color="var(--text-muted)" />
            <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-main)' }}>
              Prior Methodology Review Trail ({mockReviews.length} record)
            </span>
          </div>
          {isHistoryOpen ? <ChevronUp size={16} color="var(--text-muted)" /> : <ChevronDown size={16} color="var(--text-muted)" />}
        </button>

        {isHistoryOpen && (
          <div style={{ padding: '0 24px 20px', borderTop: '1px solid rgba(38, 61, 57, 0.08)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
              {mockReviews.map((rev, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '14px 18px',
                    borderRadius: '8px',
                    background: 'var(--bg-main)',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    gap: '12px',
                    alignItems: 'flex-start'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-main)' }}>
                        {rev.actor}
                      </span>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                        ({rev.actorRole})
                      </span>
                      <span
                        style={{
                          background: rev.action === 'ACCEPT' ? 'rgba(16, 185, 129, 0.12)' : 'rgba(217, 119, 6, 0.12)',
                          color: rev.action === 'ACCEPT' ? '#047857' : '#b45309',
                          fontSize: '10px',
                          fontWeight: 800,
                          padding: '2px 6px',
                          borderRadius: '4px'
                        }}
                      >
                        {rev.action}
                      </span>
                    </div>

                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '0 0 6px' }}>
                      {rev.reasonText}
                    </p>

                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                      Final Methodology Adopted: <strong>{rev.finalMode}</strong>
                    </div>
                  </div>

                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    {rev.timestamp}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
export default OfficialReviewView;
