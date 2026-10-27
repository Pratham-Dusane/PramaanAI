import React, { useState, useEffect } from 'react';
import {
  FileText,
  CheckCircle,
  CheckCircle2,
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
import { SplitPaneDocumentReview } from '../components/SplitPaneDocumentReview';
import { mockDigitalTwinAttributes, mockEvidenceNodes, mockEvidenceEdges } from '../data/mockData';

interface ApplicationDetailViewProps {
  application: Application;
  initialSplitPaneFinding?: any;
  onClearSplitPaneFinding?: () => void;
  onNavigateToGraph?: () => void;
  onBackToQueue: () => void;
  onOpenDecisionModal: (app: Application) => void;
  onResolveFinding: (findingId: string, reason: string) => void;
  currentRole: UserRole;
  currentLang: SupportedLanguage;
}

export const ApplicationDetailView: React.FC<ApplicationDetailViewProps> = ({
  application,
  initialSplitPaneFinding,
  onClearSplitPaneFinding,
  onNavigateToGraph,
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

  const [isSplitPaneOpen, setIsSplitPaneOpen] = useState(!!initialSplitPaneFinding);
  const [splitPaneFinding, setSplitPaneFinding] = useState(initialSplitPaneFinding);

  useEffect(() => {
    if (initialSplitPaneFinding) {
      setSplitPaneFinding(initialSplitPaneFinding);
      setIsSplitPaneOpen(true);
      setActiveTab('DOCUMENTS');
    }
  }, [initialSplitPaneFinding]);

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
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '28px', maxWidth: '1680px', margin: '0 auto', width: '100%', paddingTop: '16px' }}>
      
      {/* 1. LEAN EXECUTIVE WORKSPACE TOOLBAR (WITH GENEROUS BLANK SPACE) */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        padding: '10px 4px',
        marginBottom: '6px'
      }}>
        {/* Left: Queue Back Button + Case Identification */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <button
            onClick={onBackToQueue}
            style={{
              background: '#ffffff',
              border: '1.5px solid #cbd5e1',
              color: '#0f172a',
              borderRadius: '10px',
              padding: '8px 14px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12px',
              fontWeight: 800,
              cursor: 'pointer',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.04)',
              transition: 'all 0.16s ease'
            }}
          >
            <ArrowLeft size={14} color="#15803d" />
            <span>Review Queue</span>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <h1 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', margin: 0, letterSpacing: '-0.02em' }}>
              {application.institutionName}
            </h1>
            
            <span style={{
              background: '#f1f5f9',
              color: '#334155',
              border: '1px solid #cbd5e1',
              borderRadius: '6px',
              fontSize: '11px',
              fontWeight: 800,
              padding: '2px 8px'
            }}>
              {application.id}
            </span>

            <span style={{
              background: '#e0f2fe',
              color: '#0369a1',
              border: '1px solid #bae6fd',
              borderRadius: '6px',
              fontSize: '11px',
              fontWeight: 800,
              padding: '2px 8px'
            }}>
              {application.applicationCategory}
            </span>

            <span style={{
              background: '#fef3c7',
              color: '#92400e',
              border: '1px solid #fde68a',
              borderRadius: '6px',
              fontSize: '11px',
              fontWeight: 800,
              padding: '2px 8px'
            }}>
              AY {application.academicYear}
            </span>

            <span style={{
              background: application.status === 'DECISION_RECORDED' ? '#dcfce7' : '#fee2e2',
              color: application.status === 'DECISION_RECORDED' ? '#15803d' : '#b91c1c',
              border: application.status === 'DECISION_RECORDED' ? '1px solid #86efac' : '1px solid #fca5a5',
              borderRadius: '6px',
              fontSize: '11px',
              fontWeight: 800,
              padding: '2px 8px'
            }}>
              {application.status}
            </span>
          </div>
        </div>

        {/* Right: Decision CTA or Signed Badge */}
        <div>
          {application.decision ? (
            <div style={{
              background: '#f0fdf4',
              border: '1.5px solid #86efac',
              borderRadius: '10px',
              padding: '8px 16px',
              fontSize: '12px',
              color: '#15803d',
              fontWeight: 800,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 2px 8px rgba(22, 101, 52, 0.08)'
            }}>
              <ShieldCheck size={16} color="#16a34a" />
              <span>
                DECISION RECORDED: {application.decision.decisionType} (by {application.decision.recordedBy})
              </span>
            </div>
          ) : (
            <button
              onClick={() => onOpenDecisionModal(application)}
              style={{
                background: currentRole === 'SENIOR_APPROVER'
                  ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
                  : 'linear-gradient(135deg, #15803d 0%, #166534 100%)',
                color: currentRole === 'SENIOR_APPROVER' ? '#071f1a' : '#ffffff',
                border: 'none',
                borderRadius: '10px',
                fontWeight: 800,
                padding: '9px 18px',
                fontSize: '12px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.16s ease'
              }}
            >
              <ShieldCheck size={15} /> {t.actionDecide}
            </button>
          )}
        </div>
      </div>

      {/* 2. FLOATING SUB-TAB NAVIGATION BAR (DETACHED WITH BLANK SPACE) */}
      <div style={{
        display: 'flex',
        gap: '10px',
        background: '#ffffff',
        padding: '10px 14px',
        borderRadius: '14px',
        border: '1px solid #dbe5e2',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.04)',
        overflowX: 'auto',
        marginBottom: '12px'
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
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                whiteSpace: 'nowrap',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: '10px',
                border: isActive ? '1px solid #166534' : '1px solid transparent',
                background: isActive ? '#14532d' : 'transparent',
                color: isActive ? '#ffffff' : '#475569',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.16s ease',
                boxShadow: isActive ? '0 4px 12px rgba(20, 83, 45, 0.25)' : 'none'
              }}
            >
              <Icon size={14} color={isActive ? '#fbbf24' : '#64748b'} />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span style={{
                  background: isActive ? 'rgba(251, 191, 36, 0.25)' : '#f1f5f9',
                  color: isActive ? '#fbbf24' : '#475569',
                  padding: '1px 6px',
                  borderRadius: '100px',
                  fontSize: '10px',
                  fontWeight: 800
                }}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab 1: Documents & OCR Extraction */}
      {activeTab === 'DOCUMENTS' && (
        isSplitPaneOpen ? (
          <SplitPaneDocumentReview 
            findingData={splitPaneFinding}
            onClose={() => {
              setIsSplitPaneOpen(false);
              if (onClearSplitPaneFinding) onClearSplitPaneFinding();
            }}
            onBackToGraph={() => {
              if (onNavigateToGraph) onNavigateToGraph();
              else setActiveTab('GRAPH');
            }}
          />
        ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '20px' }}>
          {/* Document File Selector (Outer Card Removed, Floating Items) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', padding: '2px 4px' }}>
              <div>
                <h3 style={{ fontSize: '12px', fontWeight: 800, color: '#475569', letterSpacing: '0.04em', textTransform: 'uppercase', margin: 0 }}>
                  Submitted Evidence Dossier ({application.documents.length})
                </h3>
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>Cryptographically signed records</span>
              </div>
              <button 
                onClick={() => setIsSplitPaneOpen(true)}
                style={{
                  background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                  border: '1.5px solid #fcd34d',
                  borderRadius: '100px',
                  color: '#92400e',
                  fontSize: '11px',
                  fontWeight: 800,
                  padding: '5px 12px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(245, 158, 11, 0.15)',
                  transition: 'all 0.18s ease'
                }}
                title="Open side-by-side split-pane comparison with overlapping documents"
              >
                <GitFork size={13} color="#b45309" /> Split-Pane Compare
              </button>
            </div>

            {/* Floating Document Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {application.documents.map((doc) => {
                const isSelected = doc.id === selectedDoc?.id;
                return (
                  <div
                    key={doc.id}
                    onClick={() => setSelectedDocId(doc.id)}
                    style={{
                      background: isSelected ? '#ffffff' : '#ffffff',
                      border: isSelected ? '2px solid #166534' : '1px solid #dbe5e2',
                      borderRadius: '14px',
                      padding: '14px 16px',
                      cursor: 'pointer',
                      transition: 'all 0.18s ease',
                      boxShadow: isSelected 
                        ? '0 6px 20px rgba(22, 101, 52, 0.12)' 
                        : '0 2px 8px rgba(0, 0, 0, 0.03)',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    {isSelected && (
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        bottom: 0,
                        width: '4px',
                        background: 'linear-gradient(180deg, #166534 0%, #d4a034 100%)'
                      }} />
                    )}

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{
                        fontSize: '9px',
                        fontWeight: 800,
                        padding: '2px 8px',
                        borderRadius: '4px',
                        background: '#e0f2fe',
                        color: '#0369a1'
                      }}>
                        {doc.documentType}
                      </span>
                      <span style={{
                        fontSize: '9px',
                        fontWeight: 800,
                        padding: '2px 8px',
                        borderRadius: '4px',
                        background: doc.status === 'EXTRACTED' ? '#dcfce7' : '#fee2e2',
                        color: doc.status === 'EXTRACTED' ? '#15803d' : '#b91c1c'
                      }}>
                        {doc.status}
                      </span>
                    </div>

                    <h4 style={{ fontSize: '13px', fontWeight: 800, color: isSelected ? '#166534' : '#0f172a', margin: '8px 0 0 0', lineHeight: 1.3 }}>
                      {doc.title}
                    </h4>

                    <div style={{ fontSize: '11px', color: '#64748b', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <FileText size={12} color="#94a3b8" />
                      <span>{doc.filename}</span>
                      <span>•</span>
                      <span>{(doc.sizeBytes / (1024 * 1024)).toFixed(2)} MB</span>
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
              <div style={{
                background: '#ffffff',
                border: '1.5px solid #dbe5e2',
                borderRadius: '16px',
                padding: '16px 20px',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                  <div>
                    <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', margin: 0 }}>{selectedDoc.title}</h3>
                    <div style={{ fontSize: '11px', color: '#64748b', fontFamily: 'monospace', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <ShieldCheck size={13} color="#16a34a" />
                      <span>Server SHA-256 Digest:</span>
                      <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', color: '#334155' }}>{selectedDoc.sha256}</code>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {selectedDoc.originalLanguage !== 'en' && (
                      <button
                        className={`btn btn-sm ${showTranslated ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => setShowTranslated(!showTranslated)}
                        title="Toggle BHASHINI translation"
                        style={{ borderRadius: '100px', fontSize: '11px', padding: '6px 14px' }}
                      >
                        <Globe size={13} />
                        {showTranslated ? 'Viewing English Translation' : `Original Language (${selectedDoc.originalLanguage.toUpperCase()})`}
                      </button>
                    )}
                    <span style={{
                      background: '#dcfce7',
                      color: '#15803d',
                      border: '1px solid #86efac',
                      borderRadius: '100px',
                      fontSize: '10px',
                      fontWeight: 800,
                      padding: '4px 10px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <CheckCircle2 size={12} color="#16a34a" /> Verified Immutable Storage
                    </span>
                  </div>
                </div>
              </div>

              {/* Split View: Visual Document Simulator & Extracted Fields */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {/* Visual Document & Bounding Box Viewer */}
                <div style={{
                  background: '#ffffff',
                  border: '1.5px solid #dbe5e2',
                  borderRadius: '16px',
                  padding: '18px',
                  minHeight: '380px',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a' }}>
                      Page Viewer (Page 1 of {selectedDoc.pageCount})
                    </span>
                    <span style={{ fontSize: '11px', color: '#64748b' }}>
                      Native Text Layer + OCR Box Overlays
                    </span>
                  </div>

                  <div style={{
                    background: '#fafbf9',
                    border: '1.5px solid #d8e4e0',
                    borderRadius: '12px',
                    padding: '24px',
                    minHeight: '340px',
                    position: 'relative',
                    color: '#1e293b',
                    fontSize: '12px',
                    lineHeight: 1.8,
                    fontFamily: 'serif',
                    boxShadow: 'inset 0 0 20px rgba(38, 61, 57, 0.03)'
                  }}>
                    <div style={{ textAlign: 'center', marginBottom: '16px', borderBottom: '1px solid rgba(38, 61, 57, 0.1)', paddingBottom: '8px' }}>
                      <strong style={{ fontSize: '13px', color: '#0f172a', textTransform: 'uppercase' }}>
                        {selectedDoc.title}
                      </strong>
                      <div style={{ fontSize: '10px', color: '#64748b' }}>
                        Official Filing Annexure • Academic Year 2026-27
                      </div>
                    </div>

                    {showTranslated && selectedDoc.originalLanguage === 'mr' ? (
                      <div style={{ background: 'rgba(99, 102, 241, 0.08)', padding: '12px', borderRadius: '8px' }}>
                        <div style={{ fontSize: '11px', color: '#4f46e5', fontWeight: 700, marginBottom: '6px' }}>
                          [BHASHINI MOCK TRANSLATION - ENGLISH]
                        </div>
                        <p>This is to certify that the institutional premises have undergone full municipal fire safety inspection.</p>
                        <p style={{ marginTop: '8px', border: '1px dashed #d97706', padding: '4px 8px', borderRadius: '4px' }}>
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
                              border: '1px solid #06b6d4',
                              background: 'rgba(6, 182, 212, 0.08)',
                              padding: '8px 12px',
                              borderRadius: '6px'
                            }}
                          >
                            <span style={{ fontSize: '10px', color: '#0891b2', fontWeight: 800, display: 'block' }}>
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
                <div style={{
                  background: '#ffffff',
                  border: '1.5px solid #dbe5e2',
                  borderRadius: '16px',
                  padding: '18px',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a' }}>
                      Extracted Fields ({selectedDoc.extractedFields.length})
                    </span>
                    <span style={{ fontSize: '11px', color: '#64748b' }}>
                      Raw vs Normalized Provenance
                    </span>
                  </div>

                  {selectedDoc.extractedFields.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {selectedDoc.extractedFields.map((field) => (
                        <div
                          key={field.id}
                          style={{
                            background: '#f8fafc',
                            border: '1px solid #e2e8f0',
                            borderRadius: '10px',
                            padding: '12px 14px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '6px'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a' }}>
                              {field.label}
                            </span>
                            <span
                              style={{
                                fontSize: '10px',
                                fontWeight: 800,
                                padding: '2px 8px',
                                borderRadius: '4px',
                                background: (field.confidence || 0) >= 0.95 ? '#dcfce7' : '#fef3c7',
                                color: (field.confidence || 0) >= 0.95 ? '#15803d' : '#92400e'
                              }}
                            >
                              Conf: {((field.confidence || 0) * 100).toFixed(0)}%
                            </span>
                          </div>

                          <div style={{ fontSize: '12px', color: '#475569' }}>
                            <strong>Raw OCR:</strong> <code style={{ color: '#0f172a', background: '#e2e8f0', padding: '2px 6px', borderRadius: '4px' }}>"{field.rawValue}"</code>
                          </div>
                          <div style={{ fontSize: '12px', color: '#475569' }}>
                            <strong>Normalized:</strong> <code style={{ color: '#0369a1', background: '#e0f2fe', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>{field.normalizedValue}</code>
                          </div>

                          {field.reviewedValue && (
                            <div style={{
                              fontSize: '11px',
                              background: '#f0fdf4',
                              border: '1px solid #86efac',
                              padding: '5px 10px',
                              borderRadius: '6px',
                              color: '#15803d'
                            }}>
                              ✓ Reviewed Value: <strong>{field.reviewedValue}</strong> (by {field.reviewedBy})
                            </div>
                          )}

                          <div style={{ fontSize: '10px', color: '#94a3b8', marginTop: '2px' }}>
                            Source Page: {field.pageNumber} • Status: {field.status}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div style={{ textAlign: 'center', padding: '30px', color: '#94a3b8' }}>
                      No discrete tabular fields mapped for this photograph/plan.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
        )
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
                      <span className={`badge ${item.result === 'PASS'
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div style={{
            background: '#ffffff',
            border: '1.5px solid #dbe5e2',
            borderRadius: '16px',
            padding: '20px 24px',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                Explainable Findings & Resolution Center ({application.findings.length})
              </h3>
              <p style={{ fontSize: '12px', color: '#64748b', marginTop: '4px', margin: 0 }}>
                Every finding explicitly links to exact rule versions, cited evidence anchors, and uncertainty notes. Findings are cues for review, not fraud allegations.
              </p>
            </div>
            <span style={{
              background: '#fef3c7',
              color: '#92400e',
              border: '1px solid #fde68a',
              borderRadius: '100px',
              fontSize: '11px',
              fontWeight: 800,
              padding: '4px 14px'
            }}>
              {application.findings.filter(f => f.status !== 'RESOLVED').length} Unresolved
            </span>
          </div>

          {application.findings.map((f) => (
            <div
              key={f.id}
              style={{
                background: '#ffffff',
                border: '1.5px solid #dbe5e2',
                borderLeft: f.severity === 'HIGH'
                  ? '5px solid #e11d48'
                  : '5px solid #f59e0b',
                borderRadius: '16px',
                padding: '22px',
                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.04)',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                    <span style={{
                      background: '#f1f5f9',
                      color: '#0f172a',
                      fontSize: '10px',
                      fontWeight: 800,
                      padding: '2px 8px',
                      borderRadius: '6px'
                    }}>
                      {f.findingKey}
                    </span>
                    <span style={{
                      background: f.severity === 'HIGH' ? '#ffe4e6' : '#fef3c7',
                      color: f.severity === 'HIGH' ? '#be123c' : '#92400e',
                      border: f.severity === 'HIGH' ? '1px solid #fecdd3' : '1px solid #fde68a',
                      fontSize: '10px',
                      fontWeight: 800,
                      padding: '2px 8px',
                      borderRadius: '6px'
                    }}>
                      Severity: {f.severity}
                    </span>
                    <span style={{
                      background: f.status === 'RESOLVED' ? '#dcfce7' : '#e0f2fe',
                      color: f.status === 'RESOLVED' ? '#15803d' : '#0369a1',
                      fontSize: '10px',
                      fontWeight: 800,
                      padding: '2px 8px',
                      borderRadius: '6px'
                    }}>
                      Status: {f.status}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '16px', fontWeight: 800, marginTop: '8px', color: '#0f172a', margin: '8px 0 0 0' }}>
                    {f.title}
                  </h3>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  {f.status === 'RESOLVED' ? (
                    <span style={{
                      background: '#dcfce7',
                      color: '#15803d',
                      border: '1px solid #86efac',
                      borderRadius: '100px',
                      fontSize: '11px',
                      fontWeight: 800,
                      padding: '6px 14px'
                    }}>
                      ✓ Resolved: {f.resolutionReason}
                    </span>
                  ) : (
                    resolvingFindingId !== f.id && (
                      <button
                        onClick={() => setResolvingFindingId(f.id)}
                        style={{
                          background: '#f1f5f9',
                          border: '1px solid #cbd5e1',
                          color: '#0f172a',
                          borderRadius: '10px',
                          padding: '6px 14px',
                          fontSize: '12px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <Check size={13} color="#15803d" /> {t.actionResolve}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Finding Narrative Details 4-Card Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '12px',
                marginTop: '4px'
              }}>
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '14px' }}>
                  <strong style={{ fontSize: '10px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    What Was Observed:
                  </strong>
                  <p style={{ fontSize: '12px', color: '#0f172a', marginTop: '4px', margin: 0, lineHeight: 1.5 }}>
                    {f.whatObserved}
                  </p>
                </div>

                <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '12px', padding: '14px' }}>
                  <strong style={{ fontSize: '10px', color: '#1d4ed8', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Why It Matters:
                  </strong>
                  <p style={{ fontSize: '12px', color: '#1e3a8a', marginTop: '4px', margin: 0, lineHeight: 1.5 }}>
                    {f.whyItMatters}
                  </p>
                </div>

                <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '12px', padding: '14px' }}>
                  <strong style={{ fontSize: '10px', color: '#b45309', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Uncertainty / Caveat:
                  </strong>
                  <p style={{ fontSize: '12px', color: '#92400e', marginTop: '4px', margin: 0, lineHeight: 1.5 }}>
                    {f.uncertaintyNote}
                  </p>
                </div>

                <div style={{ background: '#ecfeff', border: '1px solid #a5f3fc', borderRadius: '12px', padding: '14px' }}>
                  <strong style={{ fontSize: '10px', color: '#0e7490', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Recommended Next Action:
                  </strong>
                  <p style={{ fontSize: '12px', color: '#155e75', marginTop: '4px', margin: 0, lineHeight: 1.5, fontWeight: 600 }}>
                    {f.recommendedNextStep}
                  </p>
                </div>
              </div>

              {/* Cited Rule & Evidence Anchors */}
              <div style={{
                marginTop: '4px',
                paddingTop: '10px',
                borderTop: '1px solid #f1f5f9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '8px',
                fontSize: '11px',
                color: '#64748b'
              }}>
                <div>
                  <strong>Cited Regulatory Clause:</strong> <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', color: '#0f172a' }}>{f.ruleCitation.sourceClause}</code> ({f.ruleCitation.sourceLabel})
                </div>
                <div style={{ background: '#f1f5f9', padding: '3px 10px', borderRadius: '100px', fontWeight: 600 }}>
                  Anchored Evidence Items: <strong>{f.evidence.length} sources linked</strong>
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
        <AccessibleGraph 
          initialFocusedCluster="cluster-pune-land"
          onOpenCaseReview={(finding) => {
            setSplitPaneFinding(finding);
            setIsSplitPaneOpen(true);
            setActiveTab('DOCUMENTS');
          }}
        />
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
                        <span className={`badge ${attr.reviewStatus === 'CONFIRMED'
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
                <AlertTriangle size={16} color="var(--accent-gold-dark)" />
                <strong style={{ color: 'var(--status-review-text)', fontSize: '13px' }}>
                  Visual Duplicate Candidate Detected (98.4% Similarity)
                </strong>
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-main)' }}>
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
              background: 'rgba(217, 72, 60, 0.08)',
              border: '1px solid var(--status-insufficient-border)',
              borderRadius: 'var(--radius-md)',
              padding: '14px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <AlertTriangle size={16} color="var(--status-insufficient-text)" />
                <strong style={{ color: 'var(--status-insufficient-text)', fontSize: '13px' }}>
                  Floor Plan Dimension Discrepancy
                </strong>
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-main)' }}>
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
