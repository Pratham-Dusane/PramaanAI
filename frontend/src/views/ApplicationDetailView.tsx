import React, { useState } from 'react';
import { 
  FileText, 
  CheckCircle, 
  AlertTriangle, 
  GitFork, 
  Clock, 
  Building2, 
  ExternalLink, 
  ShieldCheck, 
  Globe, 
  Edit3, 
  Check, 
  X, 
  HelpCircle,
  Eye,
  Layers,
  ArrowLeft
} from 'lucide-react';
import { Application, ApplicationDocument, ExtractedField, UserRole } from '../types';
import { SupportedLanguage, translations } from '../data/translations';
import { AccessibleGraph } from '../components/AccessibleGraph';
import { mockDigitalTwinAttributes, mockEvidenceNodes, mockEvidenceEdges } from '../data/mockData';

interface ApplicationDetailViewProps {
  application: Application;
  onBackToQueue: () => void;
  onOpenDecisionModal: (app: Application) => void;
  onResolveFinding: (findingId: string, reason: string) => void;
  currentRole: UserRole;
  currentLang: SupportedLanguage;
}

export const ApplicationDetailView: React.FC<ApplicationDetailViewProps> = ({
  application,
  onBackToQueue,
  onOpenDecisionModal,
  onResolveFinding,
  currentRole,
  currentLang
}) => {
  const t = translations[currentLang];
  const [activeTab, setActiveTab] = useState<
    'DOCUMENTS' | 'CHECKLIST' | 'FINDINGS' | 'GRAPH' | 'TWIN_DIFF' | 'INFRA' | 'VERIFICATION'
  >('DOCUMENTS');

  const [selectedDocId, setSelectedDocId] = useState<string>(
    application.documents[0]?.id || ''
  );
  const [showTranslated, setShowTranslated] = useState(false);
  const [resolutionNote, setResolutionNote] = useState('');
  const [resolvingFindingId, setResolvingFindingId] = useState<string | null>(null);

  const selectedDoc = application.documents.find((d) => d.id === selectedDocId) || application.documents[0];

  const handleConfirmResolve = (findingId: string) => {
    if (!resolutionNote.trim()) return;
    onResolveFinding(findingId, resolutionNote);
    setResolvingFindingId(null);
    setResolutionNote('');
  };

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Top Breadcrumb & Metadata Bar */}
      <div className="glass-panel" style={{ padding: '16px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button 
              className="btn btn-outline btn-sm"
              onClick={onBackToQueue}
              style={{ padding: '6px 10px' }}
            >
              <ArrowLeft size={14} /> Back to Queue
            </button>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h2 style={{ fontSize: '16px', fontWeight: 800 }}>{application.id}</h2>
                <span className="badge badge-info">{application.applicationCategory}</span>
                <span className="badge badge-simulated">AY {application.academicYear}</span>
                <span className="badge badge-review">{application.status}</span>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                {application.institutionName} ({application.institutionId})
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {application.decision ? (
              <div style={{
                background: 'rgba(16, 185, 129, 0.15)',
                border: '1px solid var(--accent-emerald)',
                borderRadius: 'var(--radius-md)',
                padding: '6px 14px',
                fontSize: '12px',
                color: 'var(--status-pass-text)'
              }}>
                <strong>OFFICIAL DECISION:</strong> {application.decision.decisionType} (Signed by {application.decision.recordedBy})
              </div>
            ) : (
              <button 
                className="btn btn-primary"
                onClick={() => onOpenDecisionModal(application)}
                style={{ 
                  background: currentRole === 'SENIOR_APPROVER' 
                    ? 'linear-gradient(135deg, var(--accent-amber), #d97706)' 
                    : undefined
                }}
              >
                <ShieldCheck size={16} /> {t.actionDecide}
              </button>
            )}
          </div>
        </div>

        {/* Workspace Tab Bar */}
        <div style={{ 
          display: 'flex', 
          gap: '6px', 
          marginTop: '16px', 
          borderTop: '1px solid var(--border-subtle)', 
          paddingTop: '12px',
          overflowX: 'auto'
        }}>
          {[
            { id: 'DOCUMENTS', label: 'Documents & OCR Extraction', icon: FileText, count: application.documents.length },
            { id: 'CHECKLIST', label: 'Category Checklist', icon: CheckCircle, count: application.checklist.length },
            { id: 'FINDINGS', label: 'Explainable Findings', icon: AlertTriangle, count: application.findings.length },
            { id: 'GRAPH', label: 'Evidence Graph (FR-08)', icon: GitFork },
            { id: 'TWIN_DIFF', label: 'Digital Twin & History', icon: Clock },
            { id: 'INFRA', label: 'Infrastructure Signals', icon: Building2 },
            { id: 'VERIFICATION', label: 'Authorized Source Connectors', icon: ExternalLink }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                className={`btn btn-sm ${isActive ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setActiveTab(tab.id as any)}
                style={{ whiteSpace: 'nowrap', gap: '6px' }}
              >
                <Icon size={13} />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span style={{ 
                    background: isActive ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.06)',
                    padding: '1px 6px',
                    borderRadius: '10px',
                    fontSize: '10px'
                  }}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab 1: Documents & OCR Extraction */}
      {activeTab === 'DOCUMENTS' && (
        <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '16px' }}>
          {/* Document File Selector */}
          <div className="glass-panel" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h3 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-secondary)' }}>
              SUBMITTED EVIDENCE DOSSIER ({application.documents.length})
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {application.documents.map((doc) => {
                const isSelected = doc.id === selectedDoc?.id;
                return (
                  <div
                    key={doc.id}
                    onClick={() => setSelectedDocId(doc.id)}
                    style={{
                      background: isSelected ? 'var(--bg-surface-elevated)' : 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid',
                      borderColor: isSelected ? 'var(--primary-500)' : 'var(--border-subtle)',
                      borderRadius: 'var(--radius-md)',
                      padding: '12px',
                      cursor: 'pointer',
                      transition: 'all var(--transition-fast)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span className="badge badge-info" style={{ fontSize: '9px', padding: '2px 6px' }}>
                        {doc.documentType}
                      </span>
                      <span className={`badge ${doc.status === 'EXTRACTED' ? 'badge-pass' : 'badge-review'}`} style={{ fontSize: '9px', padding: '2px 6px' }}>
                        {doc.status}
                      </span>
                    </div>

                    <h4 style={{ fontSize: '13px', fontWeight: 600, color: '#fff', marginTop: '6px' }}>
                      {doc.title}
                    </h4>

                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
                      {doc.filename} • {(doc.sizeBytes / (1024 * 1024)).toFixed(2)} MB
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Document Content & Extracted Fields Pane */}
          {selectedDoc && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Document Metadata Bar */}
              <div className="glass-panel" style={{ padding: '14px 18px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
                  <div>
                    <h3 style={{ fontSize: '14px', fontWeight: 700 }}>{selectedDoc.title}</h3>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginTop: '2px' }}>
                      Server SHA-256 Digest: {selectedDoc.sha256}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {selectedDoc.originalLanguage !== 'en' && (
                      <button 
                        className={`btn btn-sm ${showTranslated ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => setShowTranslated(!showTranslated)}
                        title="Toggle BHASHINI translation"
                      >
                        <Globe size={13} />
                        {showTranslated ? 'Viewing English Translation' : `Original Language (${selectedDoc.originalLanguage.toUpperCase()})`}
                      </button>
                    )}
                    <span className="badge badge-pass" style={{ fontSize: '10px' }}>
                      Verified Immutable Storage Key
                    </span>
                  </div>
                </div>
              </div>

              {/* Split View: Visual Document Simulator & Extracted Fields */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {/* Visual Document & Bounding Box Viewer */}
                <div className="glass-panel" style={{ padding: '16px', minHeight: '380px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                      Page Viewer (Page 1 of {selectedDoc.pageCount})
                    </span>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                      Native Text Layer + OCR Box Overlays
                    </span>
                  </div>

                  <div style={{
                    background: '#0b1120',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-md)',
                    padding: '24px',
                    minHeight: '340px',
                    position: 'relative',
                    color: '#cbd5e1',
                    fontSize: '12px',
                    lineHeight: 1.8,
                    fontFamily: 'serif'
                  }}>
                    <div style={{ textAlign: 'center', marginBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '8px' }}>
                      <strong style={{ fontSize: '13px', color: '#fff', textTransform: 'uppercase' }}>
                        {selectedDoc.title}
                      </strong>
                      <div style={{ fontSize: '10px', color: '#94a3b8' }}>
                        Official Filing Annexure • Academic Year 2026-27
                      </div>
                    </div>

                    {showTranslated && selectedDoc.originalLanguage === 'mr' ? (
                      <div style={{ background: 'rgba(99, 102, 241, 0.08)', padding: '12px', borderRadius: 'var(--radius-sm)' }}>
                        <div style={{ fontSize: '11px', color: 'var(--accent-cyan)', fontWeight: 600, marginBottom: '6px' }}>
                          [BHASHINI MOCK TRANSLATION — ENGLISH]
                        </div>
                        <p>This is to certify that the institutional premises have undergone full municipal fire safety inspection.</p>
                        <p style={{ marginTop: '8px', border: '1px dashed var(--accent-amber)', padding: '4px 8px', borderRadius: '4px' }}>
                          <strong>Expiration Clause:</strong> This certificate remains valid strictly until <strong>31st March 2026</strong>.
                        </p>
                      </div>
                    ) : (
                      <div>
                        <p>To Whomsoever It May Concern,</p>
                        <p style={{ marginTop: '8px' }}>
                          The verified administrative and instructional schedule for <strong>{application.institutionName}</strong> is certified as recorded in statutory inspection registers.
                        </p>
                        {selectedDoc.extractedFields.map((f) => (
                          <div 
                            key={f.id}
                            style={{
                              marginTop: '10px',
                              border: '1px solid var(--accent-cyan)',
                              background: 'rgba(6, 182, 212, 0.08)',
                              padding: '6px 10px',
                              borderRadius: 'var(--radius-sm)'
                            }}
                          >
                            <span style={{ fontSize: '10px', color: 'var(--accent-cyan)', fontWeight: 700, display: 'block' }}>
                              OCR BOUNDING ANCHOR (Conf: {(f.confidence! * 100).toFixed(0)}%)
                            </span>
                            "{f.sourceExcerpt}"
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Extracted Fields Table */}
                <div className="glass-panel" style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                      Extracted Fields ({selectedDoc.extractedFields.length})
                    </span>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                      Raw vs Normalized Provenance
                    </span>
                  </div>

                  {selectedDoc.extractedFields.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {selectedDoc.extractedFields.map((field) => (
                        <div 
                          key={field.id}
                          style={{
                            background: 'var(--bg-surface-elevated)',
                            border: '1px solid var(--border-subtle)',
                            borderRadius: 'var(--radius-md)',
                            padding: '12px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '6px'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span style={{ fontSize: '12px', fontWeight: 700, color: '#fff' }}>
                              {field.label}
                            </span>
                            <span 
                              className={`badge ${
                                (field.confidence || 0) >= 0.95 ? 'badge-pass' : 'badge-review'
                              }`}
                              style={{ fontSize: '9px', padding: '1px 6px' }}
                            >
                              Conf: {((field.confidence || 0) * 100).toFixed(0)}%
                            </span>
                          </div>

                          <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                            <strong>Raw OCR:</strong> <code style={{ color: '#e2e8f0' }}>"{field.rawValue}"</code>
                          </div>
                          <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                            <strong>Normalized:</strong> <code style={{ color: 'var(--accent-cyan)' }}>{field.normalizedValue}</code>
                          </div>

                          {field.reviewedValue && (
                            <div style={{ 
                              fontSize: '11px', 
                              background: 'rgba(16, 185, 129, 0.1)', 
                              border: '1px solid rgba(16, 185, 129, 0.3)',
                              padding: '4px 8px',
                              borderRadius: '4px',
                              color: 'var(--status-pass-text)'
                            }}>
                              ✓ Reviewed Value: <strong>{field.reviewedValue}</strong> (by {field.reviewedBy})
                            </div>
                          )}

                          <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '2px' }}>
                            Source Page: {field.pageNumber} • Status: {field.status}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div style={{ textAlign: 'center', padding: '30px', color: 'var(--text-muted)' }}>
                      No discrete tabular fields mapped for this photograph/plan.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Category Checklist */}
      {activeTab === 'CHECKLIST' && (
        <div className="glass-panel">
          <div className="panel-header">
            <div className="panel-title">
              <CheckCircle size={18} color="var(--primary-500)" />
              <span>Category Requirements Checklist ({application.applicationCategory})</span>
            </div>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              Deterministic Evaluation against Published Rules (ADR-004)
            </span>
          </div>

          <div className="table-wrapper">
            <table className="data-table" aria-label="Category Checklist">
              <thead>
                <tr>
                  <th scope="col">Code</th>
                  <th scope="col">Requirement Title</th>
                  <th scope="col">Category</th>
                  <th scope="col">Result Status</th>
                  <th scope="col">Mandatory Evidence</th>
                  <th scope="col">Regulatory Clause</th>
                </tr>
              </thead>
              <tbody>
                {application.checklist.map((item) => (
                  <tr key={item.id}>
                    <td><code>{item.code}</code></td>
                    <td>
                      <strong>{item.title}</strong>
                    </td>
                    <td><span className="badge badge-info">{item.category}</span></td>
                    <td>
                      <span className={`badge ${
                        item.result === 'PASS' 
                          ? 'badge-pass' 
                          : item.result === 'REVIEW' 
                          ? 'badge-review' 
                          : 'badge-insufficient'
                      }`}>
                        {item.result}
                      </span>
                    </td>
                    <td style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                      {item.requiredEvidence}
                    </td>
                    <td style={{ fontSize: '12px' }}>
                      <code>{item.applicableClause}</code>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Findings & Actions */}
      {activeTab === 'FINDINGS' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div className="glass-panel" style={{ padding: '14px 18px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700 }}>
              Explainable Findings & Resolution Center ({application.findings.length})
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
              Every finding explicitly links to exact rule versions, cited evidence anchors, and uncertainty notes. Findings are cues for review, not fraud allegations.
            </p>
          </div>

          {application.findings.map((f) => (
            <div 
              key={f.id}
              className="glass-panel"
              style={{
                borderLeft: f.severity === 'HIGH' 
                  ? '4px solid var(--accent-rose)' 
                  : '4px solid var(--accent-amber)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="badge badge-review">{f.findingKey}</span>
                    <span className={`badge ${f.severity === 'HIGH' ? 'badge-insufficient' : 'badge-review'}`}>
                      Severity: {f.severity}
                    </span>
                    <span className="badge badge-info">Status: {f.status}</span>
                  </div>
                  <h3 style={{ fontSize: '15px', fontWeight: 700, marginTop: '8px', color: '#fff' }}>
                    {f.title}
                  </h3>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  {f.status === 'RESOLVED' ? (
                    <span className="badge badge-pass" style={{ padding: '6px 12px' }}>
                      ✓ Resolved: {f.resolutionReason}
                    </span>
                  ) : (
                    resolvingFindingId !== f.id && (
                      <button 
                        className="btn btn-secondary btn-sm"
                        onClick={() => setResolvingFindingId(f.id)}
                      >
                        <Check size={13} /> {t.actionResolve}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Finding Narrative Details */}
              <div style={{
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
                gap: '12px',
                marginTop: '14px',
                background: 'rgba(0,0,0,0.2)',
                padding: '14px',
                borderRadius: 'var(--radius-md)'
              }}>
                <div>
                  <strong style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    What Was Observed:
                  </strong>
                  <p style={{ fontSize: '12px', color: '#e2e8f0', marginTop: '2px' }}>
                    {f.whatObserved}
                  </p>
                </div>

                <div>
                  <strong style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    Why It Matters:
                  </strong>
                  <p style={{ fontSize: '12px', color: '#e2e8f0', marginTop: '2px' }}>
                    {f.whyItMatters}
                  </p>
                </div>

                <div>
                  <strong style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    Uncertainty / Caveat:
                  </strong>
                  <p style={{ fontSize: '12px', color: 'var(--accent-amber)', marginTop: '2px' }}>
                    {f.uncertaintyNote}
                  </p>
                </div>

                <div>
                  <strong style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    Recommended Next Action:
                  </strong>
                  <p style={{ fontSize: '12px', color: 'var(--accent-cyan)', marginTop: '2px' }}>
                    {f.recommendedNextStep}
                  </p>
                </div>
              </div>

              {/* Cited Rule & Evidence Anchors */}
              <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-secondary)' }}>
                <div>
                  <strong>Cited Regulatory Clause:</strong> <code>{f.ruleCitation.sourceClause}</code> ({f.ruleCitation.sourceLabel})
                </div>
                <div>
                  <strong>Anchored Evidence Items:</strong> {f.evidence.length} sources linked
                </div>
              </div>

              {/* Inline Finding Resolution Form */}
              {resolvingFindingId === f.id && (
                <div style={{ 
                  marginTop: '14px', 
                  padding: '12px', 
                  background: 'var(--bg-surface-elevated)', 
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--primary-500)'
                }}>
                  <label style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                    Scrutiny Officer Resolution Rationale (Required):
                  </label>
                  <input 
                    type="text"
                    className="input-control"
                    placeholder="E.g., Verified adjunct roster; confirmed valid fire undertaking received..."
                    value={resolutionNote}
                    onChange={(e) => setResolutionNote(e.target.value)}
                  />
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '8px' }}>
                    <button className="btn btn-outline btn-sm" onClick={() => setResolvingFindingId(null)}>
                      Cancel
                    </button>
                    <button 
                      className="btn btn-primary btn-sm"
                      onClick={() => handleConfirmResolve(f.id)}
                      disabled={!resolutionNote.trim()}
                    >
                      Confirm Resolution
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Tab 4: Evidence Graph */}
      {activeTab === 'GRAPH' && (
        <AccessibleGraph nodes={mockEvidenceNodes} edges={mockEvidenceEdges} />
      )}

      {/* Tab 5: Digital Twin & Cross-Year Diff */}
      {activeTab === 'TWIN_DIFF' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Cross-Year Diff Table */}
          <div className="glass-panel">
            <div className="panel-header">
              <div className="panel-title">
                <Clock size={18} color="var(--primary-500)" />
                <span>Cross-Year Intelligence: AY 2025-26 vs AY 2026-27 (FR-09)</span>
              </div>
              <span className="badge badge-info">Change Signal Classifier</span>
            </div>

            <div className="table-wrapper">
              <table className="data-table" aria-label="Cross Year Change Comparison">
                <thead>
                  <tr>
                    <th scope="col">Institutional Metric</th>
                    <th scope="col">Prior Year (2025-26)</th>
                    <th scope="col">Current Filing (2026-27)</th>
                    <th scope="col">Delta Observed</th>
                    <th scope="col">Signal Classification</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Teaching Faculty Count</strong></td>
                    <td>38 Full-Time</td>
                    <td>42 Declared (39 Parsed)</td>
                    <td>+4 (+10.5%)</td>
                    <td>
                      <span className="badge badge-review">Review Cue: Form / Roster Mismatch</span>
                    </td>
                  </tr>
                  <tr>
                    <td><strong>Instructional Carpet Area</strong></td>
                    <td>13,200 sq.m.</td>
                    <td>14,850 sq.m.</td>
                    <td>+1,650 sq.m. (+12.5%)</td>
                    <td>
                      <span className="badge badge-pass">Expected Change: New Wing Added</span>
                    </td>
                  </tr>
                  <tr>
                    <td><strong>Municipal Fire Safety NOC</strong></td>
                    <td>Valid until 31-03-2025</td>
                    <td>Valid until 31-03-2026</td>
                    <td>Expired Prior to 2026 Term</td>
                    <td>
                      <span className="badge badge-insufficient">Expired / Stale Document</span>
                    </td>
                  </tr>
                  <tr>
                    <td><strong>Head of Institution (Principal)</strong></td>
                    <td>Dr. Anand M. Deshmukh</td>
                    <td>Dr. Anand M. Deshmukh</td>
                    <td>Unchanged (0%)</td>
                    <td>
                      <span className="badge badge-pass">Verified Continuity</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Institutional Digital Twin Snapshot Attributes */}
          <div className="glass-panel">
            <div className="panel-header">
              <div className="panel-title">
                <Layers size={18} color="var(--primary-500)" />
                <span>Institutional Digital Twin Attributes with Source Provenance (FR-07)</span>
              </div>
            </div>

            <div className="table-wrapper">
              <table className="data-table" aria-label="Digital Twin Attributes">
                <thead>
                  <tr>
                    <th scope="col">Attribute Key</th>
                    <th scope="col">Attribute Label</th>
                    <th scope="col">Recorded Value</th>
                    <th scope="col">Source Provenance</th>
                    <th scope="col">Review State</th>
                    <th scope="col">Last Verified</th>
                  </tr>
                </thead>
                <tbody>
                  {mockDigitalTwinAttributes.map((attr) => (
                    <tr key={attr.id} style={{ opacity: attr.superseded ? 0.5 : 1 }}>
                      <td><code>{attr.attributeKey}</code></td>
                      <td>
                        <strong>{attr.attributeLabel}</strong>
                        {attr.superseded && <span style={{ marginLeft: '6px', fontSize: '10px', color: 'var(--text-muted)' }}>(Superseded)</span>}
                      </td>
                      <td>{String(attr.value)}</td>
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
      )}

      {/* Tab 6: Infrastructure Evidence Signals */}
      {activeTab === 'INFRA' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div className="glass-panel">
            <h3 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '8px' }}>
              Photograph Perceptual Fingerprint & Similarity
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '14px' }}>
              Perceptual pHash comparisons detect near-duplicate visual assets submitted across separate college campuses.
            </p>

            <div style={{
              background: 'rgba(245, 158, 11, 0.1)',
              border: '1px solid var(--accent-amber)',
              borderRadius: 'var(--radius-md)',
              padding: '14px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <AlertTriangle size={16} color="var(--accent-amber)" />
                <strong style={{ color: '#fff', fontSize: '13px' }}>
                  Visual Duplicate Candidate Detected (98.4% Similarity)
                </strong>
              </div>
              <p style={{ fontSize: '12px', color: '#fde68a' }}>
                The uploaded photograph of "Central Computer Center" has a pHash Hamming distance of 2 compared to an image submitted by <strong>Sardar Patel Institute (DEMO-INST-002)</strong>.
              </p>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                <strong>Integrity Policy:</strong> Image matches do not prove intentional reuse. Forwarded to Domain Expert for physical campus inspection.
              </div>
            </div>
          </div>

          <div className="glass-panel">
            <h3 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '8px' }}>
              Architectural Blueprint Label Consistency Check
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '14px' }}>
              OCR scanning of floor plan room dimensions cross-checked against schedule declarations.
            </p>

            <div style={{
              background: 'rgba(244, 63, 94, 0.1)',
              border: '1px solid var(--accent-rose)',
              borderRadius: 'var(--radius-md)',
              padding: '14px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <AlertTriangle size={16} color="var(--accent-rose)" />
                <strong style={{ color: '#fff', fontSize: '13px' }}>
                  Floor Plan Dimension Discrepancy
                </strong>
              </div>
              <p style={{ fontSize: '12px', color: '#fecdd3' }}>
                Classroom C-204 is labeled as <strong>54 sq.m.</strong> on the architectural drawing, whereas Application Form Schedule B declares it as <strong>66 sq.m.</strong>
              </p>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                Net shortfall: 12 sq.m. Requires scrutiny committee verification before seating capacity approval.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 7: Authorized Source Connectors */}
      {activeTab === 'VERIFICATION' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div className="glass-panel">
            <h3 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '4px' }}>
              Authorized Reference & External Issuing Authority Connectors (FR-05)
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
              Integrations use typed adapters with strict truthfulness invariants: Simulated fixtures return <code>SIMULATED_MATCH</code>; downtime or unconfigured credentials produce <code>UNAVAILABLE</code>, never an adverse mismatch verdict.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '14px' }}>
            {/* DigiLocker Connector */}
            <div className="glass-panel">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '13px', fontWeight: 700 }}>DigiLocker / API Setu Connector</span>
                <span className="badge badge-simulated">SIMULATED_MATCH</span>
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                Synthetic record check for Principal's Ph.D. certificate from IIT Bombay.
              </p>
              <div style={{ marginTop: '10px', fontSize: '11px', color: 'var(--text-muted)' }}>
                Provider: Mock DigiLocker Adapter • Latency: 42ms • Fingerprint: <code>sha256-d41d8cd9</code>
              </div>
            </div>

            {/* National Academic Depository (NAD) */}
            <div className="glass-panel">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '13px', fontWeight: 700 }}>National Academic Depository (NAD)</span>
                <span className="badge badge-review">UNAVAILABLE</span>
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                External credentials not configured in current demo environment.
              </p>
              <div style={{ marginTop: '10px', fontSize: '11px', color: 'var(--text-muted)' }}>
                Safe Invariant: Provider downtime or missing keys does not produce a mismatch finding.
              </div>
            </div>

            {/* State Land Revenue Registry */}
            <div className="glass-panel">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '13px', fontWeight: 700 }}>State Land Registry (7/12 Extract)</span>
                <span className="badge badge-simulated">SIMULATED_MATCH</span>
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                Survey numbers 42/1 and 42/2 match registered educational zoning records.
              </p>
              <div style={{ marginTop: '10px', fontSize: '11px', color: 'var(--text-muted)' }}>
                Checked at: 2026-10-22T11:40:00Z • Simulated: true
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
