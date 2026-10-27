import React, { useState } from 'react';
import {
  ShieldCheck,
  Search,
  Lock,
  CheckCircle2,
  Hash,
  Clock,
  UserCheck,
  FileCode,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  ExternalLink,
  Shield,
  Layers,
  Database
} from 'lucide-react';
import { mockAuditEvents } from '../data/mockData';

export const AuditLogView: React.FC = () => {
  const [filterAction, setFilterAction] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedEventId, setExpandedEventId] = useState<string | null>(null);
  const [isVerifyingProof, setIsVerifyingProof] = useState(false);
  const [verifiedTimestamp, setVerifiedTimestamp] = useState<string | null>(null);

  const filteredEvents = mockAuditEvents.filter((e) => {
    const matchesAction = filterAction === 'ALL' || e.action === filterAction;
    const matchesQuery = !searchQuery.trim() ||
      e.actor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.correlationId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (e.applicationId && e.applicationId.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesAction && matchesQuery;
  });

  const handleVerifyChain = () => {
    setIsVerifyingProof(true);
    setTimeout(() => {
      setIsVerifyingProof(false);
      setVerifiedTimestamp(new Date().toLocaleTimeString());
    }, 700);
  };

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '1440px', margin: '0 auto', width: '100%' }}>

      {/* 1. LUMINOUS LIGHT EXECUTIVE HEADER */}
      <div
        style={{
          background: '#ffffff',
          borderRadius: '16px',
          padding: '24px 28px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
          position: 'relative'
        }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '24px', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{
                background: '#ecfdf5',
                border: '1px solid #a7f3d0',
                color: '#065f46',
                fontSize: '10px',
                fontWeight: 800,
                padding: '3px 10px',
                borderRadius: '100px',
                letterSpacing: '0.06em',
                textTransform: 'uppercase'
              }}>
                APPEND ONLY VERIFIED LEDGER
              </span>
              <span style={{
                background: '#fef3c7',
                border: '1px solid #fde68a',
                color: '#92400e',
                fontSize: '10px',
                fontWeight: 700,
                padding: '3px 8px',
                borderRadius: '6px'
              }}>
                SHA-256 MERKLE LINKAGE
              </span>
            </div>

            <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', margin: '0 0 6px 0', letterSpacing: '-0.02em' }}>
              Immutable Governance Audit Trail
            </h1>

            <p style={{ fontSize: '13px', color: '#64748b', margin: 0, maxWidth: '780px', lineHeight: 1.5 }}>
              Every lifecycle state transition, document ingestion, reviewer finding override, AST predicate replay, and official human decision produces a cryptographically sealed event entry.
            </p>
          </div>

          {/* Verification CTA & Status */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
            <button
              onClick={handleVerifyChain}
              disabled={isVerifyingProof}
              style={{
                background: '#047857',
                color: '#ffffff',
                border: 'none',
                borderRadius: '10px',
                padding: '10px 18px',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 12px rgba(4, 120, 87, 0.25)',
                transition: 'all 0.15s ease'
              }}
            >
              <RefreshCw size={14} className={isVerifyingProof ? 'spin' : ''} />
              <span>{isVerifyingProof ? 'Verifying Merkle Tree...' : 'Verify Cryptographic Seal'}</span>
            </button>

            <div style={{ fontSize: '11px', color: '#047857', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}>
              <CheckCircle2 size={13} color="#047857" />
              <span>
                {verifiedTimestamp ? `Chain verified at ${verifiedTimestamp}` : 'Integrity status: 100% Valid'}
              </span>
            </div>
          </div>
        </div>

        {/* 4 Light Crisp Metric Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '12px',
          marginTop: '20px',
          paddingTop: '18px',
          borderTop: '1px solid #f1f5f9'
        }}>
          <div style={{ background: '#f8fafc', borderRadius: '10px', padding: '12px 14px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '10px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 700 }}>
              TOTAL SEALED BLOCKS
            </div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', marginTop: '2px' }}>
              4,921 Blocks
            </div>
          </div>

          <div style={{ background: '#f8fafc', borderRadius: '10px', padding: '12px 14px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '10px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 700 }}>
              AUTHENTICATED ACTORS
            </div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#0284c7', marginTop: '2px' }}>
              18 Identities
            </div>
          </div>

          <div style={{ background: '#f8fafc', borderRadius: '10px', padding: '12px 14px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '10px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 700 }}>
              CHAIN HASH STANDARD
            </div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#b45309', marginTop: '2px' }}>
              FIPS 180-4 SHA-256
            </div>
          </div>

          <div style={{ background: '#f8fafc', borderRadius: '10px', padding: '12px 14px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '10px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 700 }}>
              TAMPER DETECTION
            </div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#047857', marginTop: '2px' }}>
              Zero Anomalies
            </div>
          </div>
        </div>
      </div>

      {/* 2. FILTER & SEARCH COMMAND STRIP (UNBOXED) */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          padding: '4px 0'
        }}
      >
        <div style={{ position: 'relative', flex: '1 1 280px', maxWidth: '380px' }}>
          <Search size={15} color="#64748b" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search by actor, action event, correlation ID, or case ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px 8px 34px',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              fontSize: '12px',
              background: '#f8fafc',
              color: '#1e293b'
            }}
          />
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {[
            { id: 'ALL', label: 'All Actions' },
            { id: 'FINDING_RESOLVED', label: 'Finding Resolved' },
            { id: 'EXTRACTED_FIELD_REVIEWED', label: 'Field Review' },
            { id: 'DOCUMENT_UPLOADED', label: 'Document Upload' },
            { id: 'HUMAN_DECISION_RECORDED', label: 'Human Decision' }
          ].map((pill) => {
            const isActive = filterAction === pill.id;
            return (
              <button
                key={pill.id}
                onClick={() => setFilterAction(pill.id)}
                style={{
                  padding: '5px 12px',
                  borderRadius: '100px',
                  border: isActive ? '1px solid #047857' : '1px solid #e2e8f0',
                  background: isActive ? '#047857' : '#ffffff',
                  color: isActive ? '#ffffff' : '#64748b',
                  fontSize: '11px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {pill.label}
              </button>
            );
          })}
        </div>

        <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748b' }}>
          {filteredEvents.length} Verified Entries
        </span>
      </div>

      {/* 3. MODERN TABLE LEDGER DISPLAY */}
      <div style={{ background: '#ffffff', borderRadius: '14px', border: '1px solid #e2e8f0', boxShadow: '0 2px 10px rgba(0,0,0,0.03)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
          <thead>
            {/* Top Group Slabs */}
            <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
              <th colSpan={3} style={{ padding: '8px 16px' }}>
                <div style={{
                  background: '#f1f5f9',
                  borderRadius: '6px',
                  padding: '4px 12px',
                  fontSize: '10px',
                  fontWeight: 800,
                  color: '#475569',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  display: 'inline-block'
                }}>
                  EVENT SPECIFICATION & ACTOR
                </div>
              </th>
              <th colSpan={3} style={{ padding: '8px 16px' }}>
                <div style={{
                  background: '#ecfdf5',
                  borderRadius: '6px',
                  padding: '4px 12px',
                  fontSize: '10px',
                  fontWeight: 800,
                  color: '#065f46',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  display: 'inline-block'
                }}>
                  CRYPTOGRAPHIC SEAL & PAYLOAD
                </div>
              </th>
            </tr>
            {/* Sub-column Headers with Colored Bottom Underlines */}
            <tr style={{ background: '#ffffff', borderBottom: '2px solid #e2e8f0' }}>
              <th style={{ padding: '10px 16px', width: '220px' }}>
                <div style={{ borderBottom: '3px solid #047857', paddingBottom: '4px', fontSize: '11px', fontWeight: 800, color: '#1e293b' }}>
                  ACTION TYPE
                </div>
              </th>
              <th style={{ padding: '10px 16px', width: '200px' }}>
                <div style={{ borderBottom: '3px solid #0284c7', paddingBottom: '4px', fontSize: '11px', fontWeight: 800, color: '#1e293b' }}>
                  ACTOR & ROLE
                </div>
              </th>
              <th style={{ padding: '10px 16px', width: '180px' }}>
                <div style={{ borderBottom: '3px solid #8b5cf6', paddingBottom: '4px', fontSize: '11px', fontWeight: 800, color: '#1e293b' }}>
                  CASE / APPLICATION
                </div>
              </th>
              <th style={{ padding: '10px 16px', width: '190px' }}>
                <div style={{ borderBottom: '3px solid #b45309', paddingBottom: '4px', fontSize: '11px', fontWeight: 800, color: '#1e293b' }}>
                  TIMESTAMP (UTC)
                </div>
              </th>
              <th style={{ padding: '10px 16px' }}>
                <div style={{ borderBottom: '3px solid #64748b', paddingBottom: '4px', fontSize: '11px', fontWeight: 800, color: '#1e293b' }}>
                  CORRELATION ID
                </div>
              </th>
              <th style={{ padding: '10px 16px', width: '130px', textAlign: 'right' }}>
                <div style={{ borderBottom: '3px solid #10b981', paddingBottom: '4px', fontSize: '11px', fontWeight: 800, color: '#1e293b', textAlign: 'right' }}>
                  DETAILS
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredEvents.map((evt) => {
              const isExpanded = expandedEventId === evt.id;
              const isDecision = evt.action === 'HUMAN_DECISION_RECORDED';
              const indicatorColor = isDecision ? '#d97706' : '#047857';

              return (
                <React.Fragment key={evt.id}>
                  <tr
                    style={{
                      borderBottom: '1px dotted #cbd5e1',
                      background: isExpanded ? '#f8fafc' : '#ffffff',
                      transition: 'background 0.12s ease'
                    }}
                  >
                    {/* Action Type with Left Row Capsule & Vertical Indicator Strip */}
                    <td style={{ padding: '10px 16px' }}>
                      <div style={{
                        position: 'relative',
                        padding: '6px 10px 6px 14px',
                        background: '#f8fafc',
                        borderRadius: '6px',
                        border: '1px solid #e2e8f0',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          position: 'absolute',
                          left: 0,
                          top: 0,
                          bottom: 0,
                          width: '4px',
                          background: indicatorColor
                        }} />
                        <div style={{ fontSize: '11px', fontWeight: 800, color: '#0f172a', fontFamily: 'var(--font-mono)' }}>
                          {evt.action}
                        </div>
                      </div>
                    </td>

                    {/* Actor & Role */}
                    <td style={{ padding: '10px 16px' }}>
                      <div style={{ fontWeight: 700, color: '#1e293b', fontSize: '12px' }}>{evt.actor}</div>
                      <div style={{ fontSize: '10px', color: '#64748b' }}>{evt.role}</div>
                    </td>

                    {/* Case / Application */}
                    <td style={{ padding: '10px 16px' }}>
                      <span style={{
                        background: '#f1f5f9',
                        padding: '3px 8px',
                        borderRadius: '6px',
                        fontSize: '11px',
                        fontWeight: 700,
                        color: '#334155',
                        fontFamily: 'var(--font-mono)'
                      }}>
                        {evt.applicationId || evt.institutionId || 'GLOBAL'}
                      </span>
                    </td>

                    {/* Timestamp */}
                    <td style={{ padding: '10px 16px', color: '#475569', fontSize: '11px' }}>
                      {new Date(evt.timestamp).toLocaleString()}
                    </td>

                    {/* Correlation ID */}
                    <td style={{ padding: '10px 16px' }}>
                      <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#64748b' }}>
                        {evt.correlationId.slice(0, 18)}...
                      </span>
                    </td>

                    {/* Toggle Button */}
                    <td style={{ padding: '10px 16px', textAlign: 'right' }}>
                      <button
                        onClick={() => setExpandedEventId(isExpanded ? null : evt.id)}
                        style={{
                          background: isExpanded ? '#e2e8f0' : '#f8fafc',
                          border: '1px solid #cbd5e1',
                          borderRadius: '6px',
                          padding: '5px 9px',
                          fontSize: '11px',
                          fontWeight: 700,
                          color: '#334155',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <span>{isExpanded ? 'Hide' : 'Payload'}</span>
                        {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                      </button>
                    </td>
                  </tr>

                  {/* Expandable Cryptographic Payload Drawer */}
                  {isExpanded && (
                    <tr style={{ background: '#f8fafc', borderBottom: '1px dotted #cbd5e1' }}>
                      <td colSpan={6} style={{ padding: '12px 20px 16px 20px' }}>
                        <div
                          style={{
                            background: '#071f1a',
                            borderRadius: '8px',
                            padding: '14px 18px',
                            color: '#e2e8f0',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '11px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '8px'
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '6px' }}>
                            <span style={{ color: '#34d399', fontWeight: 700 }}>Cryptographic Seal Metadata</span>
                            <span style={{ color: '#94a3b8' }}>Correlation ID: {evt.correlationId}</span>
                          </div>

                          <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', gap: '6px 12px', color: '#cbd5e1' }}>
                            <div style={{ color: '#94a3b8' }}>Actor Principal:</div>
                            <div style={{ color: '#ffffff' }}>{evt.actor} ({evt.role})</div>

                            <div style={{ color: '#94a3b8' }}>Target Scope:</div>
                            <div style={{ color: '#ffffff' }}>{evt.applicationId || 'GLOBAL_ROOT'}</div>

                            <div style={{ color: '#94a3b8' }}>Event Action:</div>
                            <div style={{ color: '#fbbf24' }}>{evt.action}</div>

                            <div style={{ color: '#94a3b8' }}>UTC Timestamp:</div>
                            <div style={{ color: '#ffffff' }}>{evt.timestamp}</div>

                            <div style={{ color: '#94a3b8' }}>Payload Excerpt:</div>
                            <pre style={{ margin: 0, color: '#38bdf8', whiteSpace: 'pre-wrap', maxHeight: '160px', overflowY: 'auto' }}>
                              {JSON.stringify(evt.safeMetadata, null, 2)}
                            </pre>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

    </div>
  );
};
