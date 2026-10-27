import React from 'react';
import { 
  FileText, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowLeft, 
  GitFork, 
  Copy, 
  Layers, 
  ShieldAlert, 
  Building2,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { GraphNode } from '../data/graphData';

interface SplitPaneDocumentReviewProps {
  findingData?: NonNullable<GraphNode['finding']>;
  onClose: () => void;
  onBackToGraph?: () => void;
}

export const SplitPaneDocumentReview: React.FC<SplitPaneDocumentReviewProps> = ({
  findingData,
  onClose,
  onBackToGraph
}) => {
  const comparison = findingData?.docComparison || {
    docATitle: 'APJ_Tech_Registered_Land_Deed_Parcel44.pdf',
    docAInstitution: 'A.P.J. Abdul Kalam Institute (DEMO-EOA-2026-001)',
    docBTitle: 'Sardar_Patel_Campus_Land_Title_Survey44.pdf',
    docBInstitution: 'Sardar Patel Institute (DEMO-EOA-2026-002)',
    overlapType: 'Survey Parcel 44/2 (14.50 Acres)',
    highlightedRegionText: 'Survey Cadastre No. 44, Hissa No. 2, Mauje Wagholi, Taluka Haveli, District Pune. Area: 14 Acres 20 Gunthas (58,680 sq. meters). Reg No: HAV/11422/2019.',
    cadastreId: 'MH-PUN-HAV-0044-0002',
    sha256A: 'a1f8c49e8301d4b299e5f7a1b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2',
    sha256B: 'a1f8c49e8301d4b299e5f7a1b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2'
  };

  const title = findingData?.title || '3 Institutions Sharing Single Revenue Land Deed (Cadastre 44/2)';
  const severity = findingData?.severity || 'CRITICAL';

  return (
    <div className="glass-panel fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '20px' }}>
      {/* Top Navigation & Status Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', borderBottom: '1px solid rgba(22, 101, 74, 0.25)', paddingBottom: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button 
            className="btn btn-outline btn-sm"
            onClick={onClose}
            style={{ borderRadius: 'var(--radius-full)', padding: '6px 12px' }}
          >
            <ArrowLeft size={14} /> Back to Dossier
          </button>
          {onBackToGraph && (
            <button 
              className="btn btn-outline btn-sm"
              onClick={onBackToGraph}
              style={{ borderRadius: 'var(--radius-full)', padding: '6px 12px' }}
            >
              <GitFork size={14} color="var(--accent-gold)" /> View in Evidence Graph
            </button>
          )}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{
                background: severity === 'CRITICAL' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(245, 158, 11, 0.2)',
                color: severity === 'CRITICAL' ? '#fca5a5' : '#fde68a',
                border: severity === 'CRITICAL' ? '1px solid #ef4444' : '1px solid #f59e0b',
                borderRadius: '6px',
                fontSize: '10px',
                fontWeight: 800,
                padding: '2px 8px'
              }}>
                {severity} SEVERITY FINDING
              </span>
              <span className="badge badge-info">Split-Pane Evidence Review</span>
            </div>
            <h2 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-main)', marginTop: '4px', margin: 0 }}>
              {title}
            </h2>
          </div>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{
            background: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid #10b981',
            borderRadius: '8px',
            color: '#10b981',
            fontSize: '11px',
            fontWeight: 700,
            padding: '5px 10px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <CheckCircle2 size={13} />
            <span>Dual Document Anchors Synchronized</span>
          </span>
        </div>
      </div>

      {/* Comparison Telemetry Strip */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '12px',
        background: 'rgba(7, 31, 26, 0.65)',
        border: '1px solid rgba(52, 211, 153, 0.25)',
        borderRadius: '12px',
        padding: '12px 16px'
      }}>
        <div>
          <span style={{ fontSize: '10px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Detected Overlap Target:
          </span>
          <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--accent-gold)', marginTop: '2px' }}>
            {comparison.overlapType}
          </div>
        </div>
        <div>
          <span style={{ fontSize: '10px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Deterministic SHA-256 Match:
          </span>
          <div style={{ fontSize: '12px', fontWeight: 700, color: comparison.sha256A === comparison.sha256B ? '#34d399' : '#f59e0b', marginTop: '2px' }}>
            {comparison.sha256A === comparison.sha256B ? '100% Byte-Identical File Uploaded' : 'Near-Duplicate Content Overlap'}
          </div>
        </div>
        <div>
          <span style={{ fontSize: '10px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Cadastral / State Registry ID:
          </span>
          <div style={{ fontSize: '12px', fontWeight: 700, color: '#f8fafc', fontFamily: 'var(--font-mono)', marginTop: '2px' }}>
            {comparison.cadastreId || 'REG-MH-2024-9910'}
          </div>
        </div>
      </div>

      {/* Side-by-Side Dual Document Split-Pane with Overlapping Region Highlighted */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', minHeight: '480px' }}>
        {/* PANE 1: Institution A Document */}
        <div style={{
          background: '#ffffff',
          border: '2px solid rgba(239, 68, 68, 0.5)',
          borderRadius: '14px',
          boxShadow: '0 12px 30px rgba(0, 0, 0, 0.08)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}>
          {/* Pane Header */}
          <div style={{
            background: '#f8fafc',
            borderBottom: '1px solid #e2e8f0',
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Building2 size={13} color="#0f766e" />
                <span style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a' }}>
                  {comparison.docAInstitution}
                </span>
              </div>
              <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
                {comparison.docATitle}
              </div>
            </div>
            <span style={{
              background: '#fee2e2',
              color: '#b91c1c',
              fontSize: '10px',
              fontWeight: 800,
              padding: '2px 8px',
              borderRadius: '6px',
              border: '1px solid #fca5a5'
            }}>
              Primary Case Filing
            </span>
          </div>

          {/* Document Content Simulation */}
          <div style={{
            padding: '24px',
            fontSize: '12px',
            lineHeight: 1.8,
            color: '#1e293b',
            fontFamily: 'serif',
            overflowY: 'auto',
            flexGrow: 1,
            background: '#fafafa'
          }}>
            <div style={{ textAlign: 'center', borderBottom: '1px solid #cbd5e1', paddingBottom: '12px', marginBottom: '16px' }}>
              <strong style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Government of Maharashtra • Department of Revenue
              </strong>
              <div style={{ fontSize: '11px', color: '#64748b' }}>
                Form 7/12 Rights Record & Registered Indenture of Title
              </div>
            </div>

            <p>
              This Deed of Conveyance is recorded in the office of the Sub-Registrar Haveli, Book 1, Document No. 11422. The property particulars are certified by the Collector of Land Revenue.
            </p>

            {/* Pulsating Glowing Overlap Highlight Box */}
            <div style={{
              margin: '18px 0',
              padding: '14px 16px',
              background: 'rgba(239, 68, 68, 0.08)',
              border: '2px dashed #ef4444',
              borderRadius: '8px',
              boxShadow: '0 0 16px rgba(239, 68, 68, 0.25)',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: '-10px',
                left: '12px',
                background: '#ef4444',
                color: '#ffffff',
                fontSize: '9px',
                fontWeight: 800,
                padding: '2px 8px',
                borderRadius: '4px',
                letterSpacing: '0.04em'
              }}>
                DETECTED OVERLAPPING REGION (MATCH 98%)
              </div>
              <p style={{ margin: 0, fontWeight: 700, color: '#991b1b', fontStyle: 'italic' }}>
                "{comparison.highlightedRegionText}"
              </p>
              <div style={{ marginTop: '8px', fontSize: '10px', color: '#b91c1c', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <AlertTriangle size={12} />
                <span>Identical boundary survey coordinates claimed in separate institutional filing</span>
              </div>
            </div>

            <p>
              The transferee covenants that the aforesaid parcel shall remain dedicated strictly to institutional higher education and cannot be mortgaged or partitioned without prior statutory sanction.
            </p>

            <div style={{ marginTop: '20px', paddingTop: '10px', borderTop: '1px dashed #cbd5e1', fontSize: '10px', color: '#64748b' }}>
              SHA-256 Digest: {comparison.sha256A}
            </div>
          </div>
        </div>

        {/* PANE 2: Institution B Document */}
        <div style={{
          background: '#ffffff',
          border: '2px solid rgba(245, 158, 11, 0.5)',
          borderRadius: '14px',
          boxShadow: '0 12px 30px rgba(0, 0, 0, 0.08)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}>
          {/* Pane Header */}
          <div style={{
            background: '#f8fafc',
            borderBottom: '1px solid #e2e8f0',
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Building2 size={13} color="#b45309" />
                <span style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a' }}>
                  {comparison.docBInstitution}
                </span>
              </div>
              <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
                {comparison.docBTitle}
              </div>
            </div>
            <span style={{
              background: '#fef3c7',
              color: '#92400e',
              fontSize: '10px',
              fontWeight: 800,
              padding: '2px 8px',
              borderRadius: '6px',
              border: '1px solid #fde68a'
            }}>
              Concurrent Filing Match
            </span>
          </div>

          {/* Document Content Simulation */}
          <div style={{
            padding: '24px',
            fontSize: '12px',
            lineHeight: 1.8,
            color: '#1e293b',
            fontFamily: 'serif',
            overflowY: 'auto',
            flexGrow: 1,
            background: '#fafafa'
          }}>
            <div style={{ textAlign: 'center', borderBottom: '1px solid #cbd5e1', paddingBottom: '12px', marginBottom: '16px' }}>
              <strong style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Government of Maharashtra • Department of Revenue
              </strong>
              <div style={{ fontSize: '11px', color: '#64748b' }}>
                Form 7/12 Rights Record & Registered Indenture of Title
              </div>
            </div>

            <p>
              This Indenture entered into between original titleholders and the Governing Body of Sardar Patel Institute, executed and registered at Sub-Registrar Haveli.
            </p>

            {/* Pulsating Glowing Overlap Highlight Box */}
            <div style={{
              margin: '18px 0',
              padding: '14px 16px',
              background: 'rgba(245, 158, 11, 0.08)',
              border: '2px dashed #f59e0b',
              borderRadius: '8px',
              boxShadow: '0 0 16px rgba(245, 158, 11, 0.25)',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: '-10px',
                left: '12px',
                background: '#f59e0b',
                color: '#071f1a',
                fontSize: '9px',
                fontWeight: 800,
                padding: '2px 8px',
                borderRadius: '4px',
                letterSpacing: '0.04em'
              }}>
                COINCIDENT EVIDENCE FRAGMENT (MATCH 98%)
              </div>
              <p style={{ margin: 0, fontWeight: 700, color: '#92400e', fontStyle: 'italic' }}>
                "{comparison.highlightedRegionText}"
              </p>
              <div style={{ marginTop: '8px', fontSize: '10px', color: '#b45309', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <AlertTriangle size={12} />
                <span>Exact parcel acreage and registration reference match Institution A</span>
              </div>
            </div>

            <p>
              In witness whereof the parties hereunto have signed their hands in token of agreement of continuous demarcated ownership for statutory campus inspection.
            </p>

            <div style={{ marginTop: '20px', paddingTop: '10px', borderTop: '1px dashed #cbd5e1', fontSize: '10px', color: '#64748b' }}>
              SHA-256 Digest: {comparison.sha256B}
            </div>
          </div>
        </div>
      </div>

      {/* Reviewer Action Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
        background: 'rgba(7, 31, 26, 0.85)',
        border: '1px solid rgba(22, 101, 74, 0.35)',
        borderRadius: '12px',
        padding: '14px 18px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <ShieldAlert size={18} color="var(--accent-gold)" />
          <div>
            <div style={{ fontSize: '12px', fontWeight: 800, color: '#f8fafc' }}>
              Advisory Scrutiny Action Required
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
              AI findings are strictly advisory. Competent Scrutiny Officer retains sole human authority.
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button 
            className="btn btn-outline btn-sm"
            onClick={onClose}
          >
            Close Split-Pane View
          </button>
          <button 
            className="btn btn-primary btn-sm"
            onClick={() => {
              alert('Notice for physical Expert Visit Committee (EVC) cadastre boundary verification drafted.');
            }}
            style={{
              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              color: '#071f1a',
              fontWeight: 800
            }}
          >
            <Sparkles size={14} /> Flag for Physical EVC Site Inspection
          </button>
        </div>
      </div>
    </div>
  );
};

export default SplitPaneDocumentReview;
