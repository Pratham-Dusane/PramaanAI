import React, { useState } from 'react';
import { 
  Inbox, 
  Search, 
  Filter, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  ChevronRight, 
  ShieldAlert, 
  FileText 
} from 'lucide-react';
import { Application, UserRole } from '../types';
import { SupportedLanguage, translations } from '../data/translations';

interface ReviewerQueueViewProps {
  applications: Application[];
  onSelectApplication: (appId: string) => void;
  onOpenDecisionModal: (app: Application) => void;
  currentRole: UserRole;
  currentLang: SupportedLanguage;
}

export const ReviewerQueueView: React.FC<ReviewerQueueViewProps> = ({
  applications,
  onSelectApplication,
  onOpenDecisionModal,
  currentRole,
  currentLang
}) => {
  const t = translations[currentLang];
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [urgencyOnly, setUrgencyOnly] = useState(false);

  const filteredApps = applications.filter((app) => {
    const matchesSearch = 
      app.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.institutionName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'ALL' || app.status === statusFilter;
    const matchesUrgency = !urgencyOnly || app.urgencyScore >= 75;

    return matchesSearch && matchesStatus && matchesUrgency;
  });

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header & Filter Controls */}
      <div className="glass-panel" style={{ padding: '20px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 800 }}>
              {t.navQueue} — Scrutiny Cases & Prioritization
            </h2>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
              Transparent case prioritization based on deadline proximity, unresolved findings, and missing evidence. No opaque approval scoring.
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span className="badge badge-info">
              {filteredApps.length} Case{filteredApps.length === 1 ? '' : 's'} in View
            </span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 200px 220px', gap: '12px' }}>
          <div style={{ position: 'relative' }}>
            <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '11px' }} />
            <input 
              type="text"
              className="input-control"
              placeholder={t.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ paddingLeft: '36px' }}
            />
          </div>

          <select 
            className="select-control"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="ALL">All Lifecycles</option>
            <option value="READY_FOR_REVIEW">Ready for Review</option>
            <option value="UNDER_REVIEW">Under Review</option>
            <option value="DECISION_RECORDED">Decision Recorded</option>
          </select>

          <label style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '12px',
            background: 'var(--bg-surface-elevated)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '8px 12px',
            cursor: 'pointer'
          }}>
            <input 
              type="checkbox"
              checked={urgencyOnly}
              onChange={(e) => setUrgencyOnly(e.target.checked)}
            />
            <span style={{ fontWeight: 600 }}>High Urgency Only (≥75)</span>
          </label>
        </div>
      </div>

      {/* Case List Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filteredApps.map((app) => (
          <div 
            key={app.id} 
            className="glass-panel"
            style={{ 
              padding: '18px 24px', 
              transition: 'transform var(--transition-fast)',
              borderLeft: app.urgencyScore >= 75 
                ? '4px solid var(--accent-rose)' 
                : '4px solid var(--primary-500)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                  <span style={{ fontSize: '14px', fontWeight: 800, color: '#fff' }}>
                    {app.id}
                  </span>
                  <span className="badge badge-info">
                    {app.applicationCategory}
                  </span>
                  <span className="badge badge-simulated">
                    AY {app.academicYear}
                  </span>
                  <span className={`badge ${
                    app.status === 'DECISION_RECORDED' 
                      ? 'badge-pass' 
                      : app.status === 'READY_FOR_REVIEW' 
                      ? 'badge-review' 
                      : 'badge-info'
                  }`}>
                    {app.status}
                  </span>
                </div>

                <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>
                  {app.institutionName}
                </h3>

                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '18px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                  <div>
                    <strong>Required Evidence:</strong> {app.requiredDocuments.present} of {app.requiredDocuments.total} documents present
                    {app.requiredDocuments.missing > 0 && (
                      <span style={{ color: 'var(--accent-rose)', marginLeft: '4px', fontWeight: 700 }}>
                        ({app.requiredDocuments.missing} missing)
                      </span>
                    )}
                  </div>
                  <div>
                    <strong>Reviewer:</strong> {app.assignedReviewerName || 'Unassigned Queue'}
                  </div>
                  <div>
                    <strong>Deadline:</strong> {new Date(app.deadlineAt).toLocaleDateString()}
                  </div>
                </div>

                {/* Findings Breakdown Pills */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '12px' }}>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>
                    OPEN FINDINGS:
                  </span>
                  {app.openFindingsCount.high > 0 && (
                    <span className="badge badge-insufficient" style={{ fontSize: '10px', padding: '2px 8px' }}>
                      {app.openFindingsCount.high} High
                    </span>
                  )}
                  {app.openFindingsCount.medium > 0 && (
                    <span className="badge badge-review" style={{ fontSize: '10px', padding: '2px 8px' }}>
                      {app.openFindingsCount.medium} Medium
                    </span>
                  )}
                  {app.openFindingsCount.low > 0 && (
                    <span className="badge badge-pass" style={{ fontSize: '10px', padding: '2px 8px' }}>
                      {app.openFindingsCount.low} Low
                    </span>
                  )}
                  {app.openFindingsCount.high === 0 && app.openFindingsCount.medium === 0 && app.openFindingsCount.low === 0 && (
                    <span style={{ fontSize: '11px', color: 'var(--accent-emerald)' }}>
                      ✓ No active discrepancies
                    </span>
                  )}
                </div>
              </div>

              {/* Urgency Meter & Action Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px' }}>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-muted)' }}>
                    PRIORITY URGENCY
                  </div>
                  <div style={{ 
                    fontSize: '18px', 
                    fontWeight: 900, 
                    color: app.urgencyScore >= 75 ? 'var(--accent-rose)' : 'var(--accent-amber)' 
                  }}>
                    {app.urgencyScore} / 100
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button 
                    className="btn btn-primary btn-sm"
                    onClick={() => onSelectApplication(app.id)}
                  >
                    <FileText size={13} /> {t.viewDetails}
                  </button>

                  {currentRole === 'SENIOR_APPROVER' && (
                    <button 
                      className="btn btn-secondary btn-sm"
                      onClick={() => onOpenDecisionModal(app)}
                      title="Authorized Approving Official Action"
                    >
                      <ShieldAlert size={13} color="var(--accent-amber)" /> {t.actionDecide}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredApps.length === 0 && (
          <div className="glass-panel" style={{ textAlign: 'center', padding: '40px' }}>
            <Inbox size={36} color="var(--text-muted)" style={{ margin: '0 auto 12px' }} />
            <h3 style={{ fontSize: '15px', color: 'var(--text-secondary)' }}>No applications match the current filter</h3>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
              Try loosening search terms or selecting 'All Lifecycles'.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
