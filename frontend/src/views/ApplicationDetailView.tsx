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
  ArrowLeft,
  Compass,
  Sparkles
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
    'DOCUMENTS' | 'CHECKLIST' | 'FINDINGS' | 'METHODOLOGY' | 'GRAPH' | 'TWIN_DIFF' | 'INFRA' | 'VERIFICATION'
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
  const [selectedFindingId, setSelectedFindingId] = useState<string>(
    application.findings[0]?.id || ''
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

          <div>
            <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', margin: '0 0 4px 0', letterSpacing: '-0.02em' }}>
              {application.institutionName}
            </h1>
            <div style={{ fontSize: '12px', color: '#64748b', display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
              <span>Case Reference: <strong style={{ color: '#0f172a' }}>{application.id}</strong></span>
              <span>•</span>
              <span>Category: <strong style={{ color: '#0f172a' }}>{application.applicationCategory}</strong></span>
              <span>•</span>
              <span>Academic Year: <strong style={{ color: '#0f172a' }}>AY {application.academicYear}</strong></span>
              <span>•</span>
              <span style={{
                color: application.status === 'DECISION_RECORDED' ? '#059669' : '#d97706',
                fontWeight: 700
              }}>
                {application.status}
              </span>
            </div>
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
          { id: 'METHODOLOGY', label: 'Evaluation Methodology (v2.0)', icon: Compass },
          { id: 'GRAPH', label: 'Evidence Graph & Lineage', icon: GitFork },
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
                              Reviewed Value: <strong>{field.reviewedValue}</strong> (by {field.reviewedBy})
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


      {/* Tab 2: Category Requirements Checklist */}
      {activeTab === 'CHECKLIST' && (
        <div style={{
          background: '#ffffff',
          borderRadius: '18px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '18px'
        }}>
          {/* Header Strip */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'rgba(5, 150, 105, 0.1)',
                color: '#059669',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <CheckCircle size={18} />
              </div>
              <div>
                <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                  Category Requirements Checklist ({application.applicationCategory})
                </h3>
                <span style={{ fontSize: '11px', color: '#64748b' }}>
                  Deterministic verification against published handbook criteria
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <span style={{
                fontSize: '11px',
                fontWeight: 700,
                color: '#065f46',
                background: '#ecfdf5',
                padding: '4px 10px',
                borderRadius: '100px',
                border: '1px solid #a7f3d0'
              }}>
                {application.checklist.filter(c => c.result === 'PASS').length} Passed
              </span>
              <span style={{
                fontSize: '11px',
                fontWeight: 700,
                color: '#92400e',
                background: '#fef3c7',
                padding: '4px 10px',
                borderRadius: '100px',
                border: '1px solid #fde68a'
              }}>
                {application.checklist.filter(c => c.result !== 'PASS').length} Review Cues
              </span>
            </div>
          </div>

          {/* Modern Table Layout */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 8px' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '0 14px 10px 14px', width: '38%' }}>
                    <div style={{ fontSize: '11px', fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.04em', paddingBottom: '6px', borderBottom: '3px solid #38bdf8' }}>
                      Requirement & Category
                    </div>
                  </th>
                  <th style={{ textAlign: 'left', padding: '0 14px 10px 14px', width: '16%' }}>
                    <div style={{ fontSize: '11px', fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.04em', paddingBottom: '6px', borderBottom: '3px solid #10b981' }}>
                      Result Status
                    </div>
                  </th>
                  <th style={{ textAlign: 'left', padding: '0 14px 10px 14px', width: '28%' }}>
                    <div style={{ fontSize: '11px', fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.04em', paddingBottom: '6px', borderBottom: '3px solid #f59e0b' }}>
                      Mandatory Evidence
                    </div>
                  </th>
                  <th style={{ textAlign: 'left', padding: '0 14px 10px 14px', width: '18%' }}>
                    <div style={{ fontSize: '11px', fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.04em', paddingBottom: '6px', borderBottom: '3px solid #8b5cf6' }}>
                      Clause Citation
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {application.checklist.map((item) => {
                  const isPass = item.result === 'PASS';
                  const isReview = item.result === 'REVIEW';
                  const statusColor = isPass ? '#059669' : isReview ? '#d97706' : '#e11d48';
                  return (
                    <tr key={item.id} style={{ borderBottom: '1px dotted #cbd5e1' }}>
                      <td style={{ padding: '6px 10px 6px 0' }}>
                        <div style={{
                          background: '#f8fafc',
                          border: '1px solid #e2e8f0',
                          borderRadius: '10px',
                          padding: '8px 12px 8px 14px',
                          position: 'relative',
                          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.02)'
                        }}>
                          <div style={{
                            position: 'absolute',
                            left: 0,
                            top: '6px',
                            bottom: '6px',
                            width: '4px',
                            borderRadius: '0 4px 4px 0',
                            background: statusColor
                          }} />
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#0369a1', fontWeight: 700 }}>
                              {item.code}
                            </span>
                            <span style={{ fontSize: '12px', fontWeight: 700, color: '#0f172a' }}>
                              {item.title}
                            </span>
                          </div>
                          <div style={{ fontSize: '10px', color: '#64748b', marginTop: '2px' }}>
                            Category: {item.category}
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '6px 14px', verticalAlign: 'middle' }}>
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          padding: '3px 8px',
                          borderRadius: '6px',
                          fontSize: '11px',
                          fontWeight: 800,
                          background: isPass ? '#ecfdf5' : isReview ? '#fef3c7' : '#fff1f2',
                          color: statusColor,
                          border: `1px solid ${isPass ? '#a7f3d0' : isReview ? '#fde68a' : '#fecdd3'}`
                        }}>
                          {item.result}
                        </span>
                      </td>
                      <td style={{ padding: '6px 14px', fontSize: '11px', color: '#475569', verticalAlign: 'middle' }}>
                        {item.requiredEvidence}
                      </td>
                      <td style={{ padding: '6px 14px', verticalAlign: 'middle' }}>
                        <code style={{ fontSize: '11px', color: '#4338ca', background: '#eef2ff', padding: '2px 6px', borderRadius: '4px' }}>
                          {item.applicableClause}
                        </code>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Findings & Actions (Interactive Master-Detail) */}
      {activeTab === 'FINDINGS' && (() => {
        const activeFinding = application.findings.find(f => f.id === selectedFindingId) || application.findings[0];
        const isResolved = activeFinding?.status === 'RESOLVED';
        const isHigh = activeFinding?.severity === 'HIGH';

        return (
          <div style={{ display: 'grid', gridTemplateColumns: '350px 1fr', gap: '20px', alignItems: 'start' }}>
            
            {/* Left Column: Finding Selector List */}
            <div style={{
              background: '#ffffff',
              borderRadius: '16px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '10px', borderBottom: '1px solid #f1f5f9' }}>
                <span style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a' }}>
                  Findings Queue ({application.findings.length})
                </span>
                <span style={{
                  fontSize: '10px',
                  fontWeight: 800,
                  color: '#92400e',
                  background: '#fef3c7',
                  padding: '2px 8px',
                  borderRadius: '100px'
                }}>
                  {application.findings.filter(f => f.status !== 'RESOLVED').length} Unresolved
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {application.findings.map((f) => {
                  const isSelected = f.id === activeFinding?.id;
                  const fHigh = f.severity === 'HIGH';
                  const fResolved = f.status === 'RESOLVED';
                  return (
                    <div
                      key={f.id}
                      onClick={() => {
                        setSelectedFindingId(f.id);
                        setResolvingFindingId(null);
                      }}
                      style={{
                        padding: '12px 14px',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        border: isSelected ? '2px solid #059669' : '1px solid #e2e8f0',
                        background: isSelected ? 'rgba(5, 150, 105, 0.04)' : '#f8fafc',
                        transition: 'all 0.16s ease',
                        position: 'relative',
                        boxShadow: isSelected ? '0 4px 12px rgba(5, 150, 105, 0.1)' : 'none'
                      }}
                    >
                      <div style={{
                        position: 'absolute',
                        left: 0,
                        top: '10px',
                        bottom: '10px',
                        width: '4px',
                        borderRadius: '0 4px 4px 0',
                        background: fResolved ? '#059669' : fHigh ? '#e11d48' : '#d97706'
                      }} />

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#0369a1' }}>
                          {f.findingKey}
                        </span>
                        <span style={{
                          fontSize: '9px',
                          fontWeight: 800,
                          padding: '1px 6px',
                          borderRadius: '4px',
                          background: fResolved ? '#ecfdf5' : fHigh ? '#fff1f2' : '#fef3c7',
                          color: fResolved ? '#059669' : fHigh ? '#e11d48' : '#d97706'
                        }}>
                          {f.status}
                        </span>
                      </div>

                      <div style={{ fontSize: '12px', fontWeight: 700, color: '#0f172a', lineHeight: 1.3 }}>
                        {f.title}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Active Finding Detail Canvas */}
            {activeFinding ? (
              <div style={{
                background: '#ffffff',
                borderRadius: '18px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
                padding: '26px',
                display: 'flex',
                flexDirection: 'column',
                gap: '18px'
              }}>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '14px', flexWrap: 'wrap' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#0284c7', background: '#f0f9ff', padding: '2px 8px', borderRadius: '4px' }}>
                        {activeFinding.findingKey}
                      </span>
                      <span style={{
                        fontSize: '10px',
                        fontWeight: 800,
                        padding: '2px 8px',
                        borderRadius: '4px',
                        background: isHigh ? '#ffe4e6' : '#fef3c7',
                        color: isHigh ? '#be123c' : '#92400e'
                      }}>
                        Severity: {activeFinding.severity}
                      </span>
                      <span style={{
                        fontSize: '10px',
                        fontWeight: 800,
                        padding: '2px 8px',
                        borderRadius: '4px',
                        background: isResolved ? '#dcfce7' : '#e0f2fe',
                        color: isResolved ? '#15803d' : '#0369a1'
                      }}>
                        Status: {activeFinding.status}
                      </span>
                    </div>

                    <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: '0 0 4px 0' }}>
                      {activeFinding.title}
                    </h2>
                    <span style={{ fontSize: '11px', color: '#64748b' }}>
                      Cited Regulatory Rule: <strong>{activeFinding.ruleCitation.sourceClause}</strong> ({activeFinding.ruleCitation.sourceLabel})
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => {
                        setSplitPaneFinding(activeFinding);
                        setIsSplitPaneOpen(true);
                        setActiveTab('DOCUMENTS');
                      }}
                      style={{
                        background: '#f8fafc',
                        border: '1px solid #cbd5e1',
                        borderRadius: '8px',
                        padding: '6px 12px',
                        fontSize: '11px',
                        fontWeight: 700,
                        color: '#334155',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <FileText size={13} />
                      <span>Review in Dossier</span>
                    </button>

                    <button
                      onClick={() => setActiveTab('GRAPH')}
                      style={{
                        background: '#f8fafc',
                        border: '1px solid #cbd5e1',
                        borderRadius: '8px',
                        padding: '6px 12px',
                        fontSize: '11px',
                        fontWeight: 700,
                        color: '#334155',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <GitFork size={13} />
                      <span>View in Graph</span>
                    </button>
                  </div>
                </div>

                {/* 4-Card Narrative Inspection Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px' }}>
                  <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '14px' }}>
                    <strong style={{ fontSize: '10px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      What Was Observed:
                    </strong>
                    <p style={{ fontSize: '12px', color: '#0f172a', marginTop: '4px', margin: 0, lineHeight: 1.5 }}>
                      {activeFinding.whatObserved}
                    </p>
                  </div>

                  <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '12px', padding: '14px' }}>
                    <strong style={{ fontSize: '10px', color: '#1d4ed8', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      Why It Matters:
                    </strong>
                    <p style={{ fontSize: '12px', color: '#1e3a8a', marginTop: '4px', margin: 0, lineHeight: 1.5 }}>
                      {activeFinding.whyItMatters}
                    </p>
                  </div>

                  <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '12px', padding: '14px' }}>
                    <strong style={{ fontSize: '10px', color: '#b45309', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      Uncertainty / Caveat:
                    </strong>
                    <p style={{ fontSize: '12px', color: '#92400e', marginTop: '4px', margin: 0, lineHeight: 1.5 }}>
                      {activeFinding.uncertaintyNote}
                    </p>
                  </div>

                  <div style={{ background: '#ecfeff', border: '1px solid #a5f3fc', borderRadius: '12px', padding: '14px' }}>
                    <strong style={{ fontSize: '10px', color: '#0e7490', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      Recommended Action:
                    </strong>
                    <p style={{ fontSize: '12px', color: '#155e75', marginTop: '4px', margin: 0, lineHeight: 1.5, fontWeight: 600 }}>
                      {activeFinding.recommendedNextStep}
                    </p>
                  </div>
                </div>

                {/* Evidence Anchor Counter Strip */}
                <div style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '10px',
                  padding: '10px 14px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '11px',
                  color: '#64748b'
                }}>
                  <span>Anchored Evidence Items: <strong>{activeFinding.evidence.length} sources linked</strong></span>
                  <span>Rule Version: <code>v1.0.0 (Immutable AST)</code></span>
                </div>

                {/* Resolution Workspace */}
                {isResolved ? (
                  <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '12px', padding: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#065f46', fontWeight: 700, fontSize: '13px' }}>
                      <CheckCircle2 size={16} />
                      <span>This finding was verified and resolved by Scrutiny Official.</span>
                    </div>
                    {activeFinding.resolutionReason && (
                      <p style={{ margin: '6px 0 0 0', fontSize: '12px', color: '#047857' }}>
                        Rationale: {activeFinding.resolutionReason}
                      </p>
                    )}
                  </div>
                ) : (
                  <div style={{
                    background: '#f8fafc',
                    borderRadius: '12px',
                    padding: '18px',
                    border: '1px solid #e2e8f0',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                  }}>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: '#0f172a' }}>
                      Scrutiny Resolution Rationale (Required to resolve finding):
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Enter verification notes (e.g. verified municipal challan received, adjunct roster verified)..."
                      value={resolutionNote}
                      onChange={(e) => setResolutionNote(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: '8px',
                        border: '1px solid #cbd5e1',
                        fontSize: '12px',
                        fontFamily: 'inherit',
                        resize: 'none'
                      }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                      <button
                        onClick={() => handleConfirmResolve(activeFinding.id)}
                        disabled={!resolutionNote.trim()}
                        style={{
                          background: resolutionNote.trim() ? '#059669' : '#94a3b8',
                          color: '#ffffff',
                          border: 'none',
                          borderRadius: '8px',
                          padding: '9px 18px',
                          fontSize: '12px',
                          fontWeight: 700,
                          cursor: resolutionNote.trim() ? 'pointer' : 'not-allowed',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <Check size={14} />
                        <span>Confirm Finding Resolution</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : null}
          </div>
        );
      })()}

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

      {/* Tab 5: Cross-Year Intelligence & Digital Twin History */}
      {activeTab === 'TWIN_DIFF' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Cross-Year Intelligence Table (Modern Table Inspo Layout) */}
          <div style={{
            background: '#ffffff',
            borderRadius: '18px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: 'rgba(2, 132, 199, 0.1)',
                  color: '#0284c7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Clock size={18} />
                </div>
                <div>
                  <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                    Cross-Year Multi-Horizon Intelligence
                  </h3>
                  <span style={{ fontSize: '11px', color: '#64748b' }}>
                    Reconciles current submission against verified prior year baseline
                  </span>
                </div>
              </div>

              <span style={{
                fontSize: '11px',
                fontWeight: 700,
                color: '#0369a1',
                background: '#e0f2fe',
                padding: '4px 10px',
                borderRadius: '100px',
                border: '1px solid #bae6fd'
              }}>
                Signal Classifier Active
              </span>
            </div>

            {/* Modern Table Layout with Dual Year Slabs */}
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 6px' }}>
                <thead>
                  {/* Top Slabs Row */}
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
                        border: '1px solid #e2e8f0',
                        letterSpacing: '0.04em'
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
                        border: '1px solid #a7f3d0',
                        letterSpacing: '0.04em'
                      }}>
                        AY 2026-27 CURRENT FILING
                      </div>
                    </th>
                  </tr>

                  {/* Sub-column Header Row with Vibrant Accent Underlines */}
                  <tr>
                    <th style={{ textAlign: 'left', padding: '0 12px 10px 0' }}>
                      <div style={{ fontSize: '10px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', paddingBottom: '6px', borderBottom: '3px solid #38bdf8' }}>
                        Institutional Dimension
                      </div>
                    </th>
                    <th style={{ textAlign: 'left', padding: '0 12px 10px 12px', width: '20%' }}>
                      <div style={{ fontSize: '10px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', paddingBottom: '6px', borderBottom: '3px solid #06b6d4' }}>
                        Prior Approved
                      </div>
                    </th>
                    <th style={{ textAlign: 'left', padding: '0 12px 10px 12px', width: '22%' }}>
                      <div style={{ fontSize: '10px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', paddingBottom: '6px', borderBottom: '3px solid #10b981' }}>
                        Current Declared (Extracted)
                      </div>
                    </th>
                    <th style={{ textAlign: 'left', padding: '0 12px 10px 12px', width: '15%' }}>
                      <div style={{ fontSize: '10px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', paddingBottom: '6px', borderBottom: '3px solid #f59e0b' }}>
                        Delta Observed
                      </div>
                    </th>
                    <th style={{ textAlign: 'left', padding: '0 12px 10px 12px', width: '15%' }}>
                      <div style={{ fontSize: '10px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', paddingBottom: '6px', borderBottom: '3px solid #8b5cf6' }}>
                        Compliance Signal
                      </div>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {[
                    {
                      label: 'Teaching Faculty Count',
                      sub: 'Regular full-time cadre',
                      stripColor: '#38bdf8',
                      prior: '38 Full-Time',
                      curr: '42 Declared (39 Parsed)',
                      delta: '+4 (+10.5%)',
                      deltaColor: '#0369a1',
                      badge: 'Review Cue',
                      badgeClass: 'badge-review'
                    },
                    {
                      label: 'Instructional Carpet Area',
                      sub: 'Classroom & laboratory floor space',
                      stripColor: '#10b981',
                      prior: '13,200 sq.m.',
                      curr: '14,850 sq.m.',
                      delta: '+1,650 sq.m. (+12.5%)',
                      deltaColor: '#059669',
                      badge: 'Expected Expansion',
                      badgeClass: 'badge-pass'
                    },
                    {
                      label: 'Municipal Fire Safety NOC',
                      sub: 'Statutory safety certification',
                      stripColor: '#e11d48',
                      prior: 'Valid until 31-03-2025',
                      curr: 'Valid until 31-03-2026',
                      delta: 'Expired for 2026-27',
                      deltaColor: '#e11d48',
                      badge: 'Expired / Stale',
                      badgeClass: 'badge-insufficient'
                    },
                    {
                      label: 'Head of Institution (Principal)',
                      sub: 'Approved administrative director',
                      stripColor: '#0d9488',
                      prior: 'Dr. Anand M. Deshmukh',
                      curr: 'Dr. Anand M. Deshmukh',
                      delta: 'Unchanged (0%)',
                      deltaColor: '#64748b',
                      badge: 'Verified Continuity',
                      badgeClass: 'badge-pass'
                    }
                  ].map((row, i) => (
                    <tr key={i} style={{ borderBottom: '1px dotted #cbd5e1' }}>
                      {/* Left Row Label Capsule */}
                      <td style={{ padding: '4px 8px 4px 0' }}>
                        <div style={{
                          background: '#f8fafc',
                          border: '1px solid #e2e8f0',
                          borderRadius: '8px',
                          padding: '7px 12px 7px 14px',
                          position: 'relative',
                          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.02)'
                        }}>
                          <div style={{
                            position: 'absolute',
                            left: 0,
                            top: '5px',
                            bottom: '5px',
                            width: '4px',
                            borderRadius: '0 4px 4px 0',
                            background: row.stripColor
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

          {/* Institutional Memory Attributes (Modern Table Inspo Layout) */}
          <div style={{
            background: '#ffffff',
            borderRadius: '18px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: 'rgba(139, 92, 246, 0.1)',
                  color: '#7c3aed',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Layers size={18} />
                </div>
                <div>
                  <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                    Institutional Memory Attributes & Source Provenance
                  </h3>
                  <span style={{ fontSize: '11px', color: '#64748b' }}>
                    Immutable factual values compiled across multi-year evaluation cycles
                  </span>
                </div>
              </div>

              <span style={{ fontSize: '11px', color: '#64748b' }}>
                {mockDigitalTwinAttributes.length} Attributes Recorded
              </span>
            </div>

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
                  {mockDigitalTwinAttributes.map((attr) => (
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
              Authorized Reference & External Issuing Authority Connectors
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

      {/* Tab: Methodology Intelligence Summary Widget (PRD v2.0) */}
      {activeTab === 'METHODOLOGY' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Hero Methodology Summary Card */}
          <div 
            style={{
              background: 'linear-gradient(135deg, #1b2f2b 0%, #263d39 60%, #1e3531 100%)',
              borderRadius: '20px',
              padding: '32px 36px',
              color: '#ffffff',
              boxShadow: '0 16px 36px -10px rgba(26, 44, 41, 0.45)',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '28px'
            }}
          >
            <div style={{ flex: '1 1 480px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span 
                  style={{
                    background: 'rgba(212, 160, 52, 0.2)',
                    color: '#fbbf24',
                    fontSize: '11px',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    padding: '3px 8px',
                    borderRadius: '6px'
                  }}
                >
                  Lane 2 Methodology Engine
                </span>
                <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-mono)' }}>
                  REC-001
                </span>
              </div>

              <h2 style={{ fontSize: '28px', fontWeight: 800, margin: '0 0 10px', color: '#ffffff' }}>
                Physical Expert Visit Committee (EVC)
              </h2>

              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.5, margin: '0 0 20px', maxWidth: '600px' }}>
                Full physical verification is recommended due to 50% intake expansion, 3 years elapsed since last verified visit, and unresolved spatial plan discrepancy.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                <div style={{ background: 'rgba(0,0,0,0.25)', borderRadius: '8px', padding: '6px 12px', border: '1px solid rgba(255,255,255,0.1)', fontSize: '12px' }}>
                  <span style={{ color: 'rgba(255,255,255,0.5)' }}>Policy Floor:</span>{' '}
                  <span style={{ fontWeight: 700, color: '#fbbf24' }}>PHYSICAL_EVC (GATE-001)</span>
                </div>
                <div style={{ background: 'rgba(0,0,0,0.25)', borderRadius: '8px', padding: '6px 12px', border: '1px solid rgba(255,255,255,0.1)', fontSize: '12px' }}>
                  <span style={{ color: 'rgba(255,255,255,0.5)' }}>State:</span>{' '}
                  <span style={{ fontWeight: 700, color: '#6ee7b7' }}>COMPUTED</span>
                </div>
              </div>
            </div>

            {/* Right Metric Card */}
            <div 
              style={{
                background: 'rgba(0, 0, 0, 0.25)',
                borderRadius: '16px',
                padding: '24px 28px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                textAlign: 'center',
                minWidth: '220px'
              }}
            >
              <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: '4px' }}>
                Verification Need Index
              </div>
              <div style={{ fontSize: '48px', fontWeight: 900, color: '#fbbf24', lineHeight: 1, marginBottom: '6px' }}>
                72 <span style={{ fontSize: '18px', color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>/ 100</span>
              </div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', marginBottom: '14px' }}>
                Statistical Confidence: <strong>87%</strong>
              </div>
              <div style={{ background: 'rgba(220, 38, 38, 0.2)', color: '#fca5a5', padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 800 }}>
                High Verification Need
              </div>
            </div>
          </div>

          {/* Three Feature Highlight Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            <div className="glass-panel" style={{ padding: '20px' }}>
              <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '4px' }}>
                Policy Gate Status
              </div>
              <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-main)', marginBottom: '6px' }}>
                Gate 001 Fired (Mandatory)
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.4 }}>
                Intake increase of 50% exceeds the 30% handbook threshold. Enforces a non-negotiable physical floor.
              </p>
            </div>

            <div className="glass-panel" style={{ padding: '20px' }}>
              <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '4px' }}>
                Dominant Dimension
              </div>
              <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-main)', marginBottom: '6px' }}>
                D5: Change Magnitude (82)
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.4 }}>
                Major expansion in seat count combined with 3-year elapsed inspection baseline drives high verification requirement.
              </p>
            </div>

            <div className="glass-panel" style={{ padding: '20px' }}>
              <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '4px' }}>
                Channel Capability
              </div>
              <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-main)', marginBottom: '6px' }}>
                Desk Mode Inadequate (8 Blindspots)
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.4 }}>
                Laboratory equipment presence and building blueprint match cannot be verified without on-site visit.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
