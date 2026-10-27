import React, { useState } from 'react';
import {
  Layers,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Play,
  FileDown,
  ArrowRight,
  Clock,
  Check,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  FileText,
  Sliders,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { mockBulkJobs } from '../data/mockData';
import { BulkJob } from '../types';

export const BulkProcessingView: React.FC = () => {
  const [bulkJobs, setBulkJobs] = useState<BulkJob[]>(mockBulkJobs);
  const [retryingId, setRetryingId] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [expandedJobId, setExpandedJobId] = useState<string | null>('BATCH-2026-OCT-A');

  const handleRetryFailed = (jobId: string) => {
    setRetryingId(jobId);
    setTimeout(() => {
      setBulkJobs((prev) =>
        prev.map((job) => {
          if (job.id === jobId) {
            return {
              ...job,
              succeeded: job.succeeded + 1,
              failed: 0,
              status: 'COMPLETED',
              items: job.items.map((item) =>
                item.status === 'FAILED'
                  ? { ...item, status: 'SUCCEEDED', errorMessage: undefined, processedAt: new Date().toISOString() }
                  : item
              )
            };
          }
          return job;
        })
      );
      setRetryingId(null);
    }, 700);
  };

  const filteredJobs = bulkJobs.filter(job => {
    if (filterStatus === 'ALL') return true;
    return job.status === filterStatus;
  });

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
                background: '#f5f3ff',
                border: '1px solid #ddd6fe',
                color: '#6d28d9',
                fontSize: '10px',
                fontWeight: 800,
                padding: '3px 10px',
                borderRadius: '100px',
                letterSpacing: '0.06em',
                textTransform: 'uppercase'
              }}>
                BATCH PIPELINE ENGINE
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
                FAILURE ISOLATION ACTIVE
              </span>
            </div>

            <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', margin: '0 0 6px 0', letterSpacing: '-0.02em' }}>
              Bulk Intake & Batch Pipeline Execution Monitor
            </h1>

            <p style={{ fontSize: '13px', color: '#64748b', margin: 0, maxWidth: '760px', lineHeight: 1.5 }}>
              Executes high-throughput regional intake batches. Employs durable message queues and failure isolation boundaries: a corrupt PDF or timeout in one application cannot stall or corrupt adjoining cases.
            </p>
          </div>

          <div style={{
            background: '#f8fafc',
            borderRadius: '12px',
            padding: '12px 16px',
            border: '1px solid #e2e8f0',
            maxWidth: '280px',
            fontSize: '11px',
            color: '#475569',
            lineHeight: 1.4
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#6d28d9', fontWeight: 700, marginBottom: '3px' }}>
              <ShieldCheck size={14} />
              <span>Durable Job Model</span>
            </div>
            Worker failures trigger automatic dead-letter isolation. Retries are strictly idempotent and scope-restricted.
          </div>
        </div>

        {/* 4 Light Summary Stat Badges */}
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
              TOTAL ENQUEUED BATCHES
            </div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', marginTop: '2px' }}>
              {bulkJobs.length} Batch Runs
            </div>
          </div>

          <div style={{ background: '#f8fafc', borderRadius: '10px', padding: '12px 14px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '10px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 700 }}>
              INGESTED APPLICATIONS
            </div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#0284c7', marginTop: '2px' }}>
              {bulkJobs.reduce((acc, j) => acc + j.totalItems, 0)} Dossiers
            </div>
          </div>

          <div style={{ background: '#f8fafc', borderRadius: '10px', padding: '12px 14px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '10px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 700 }}>
              PIPELINE SUCCESS RATE
            </div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#047857', marginTop: '2px' }}>
              98.4%
            </div>
          </div>

          <div style={{ background: '#f8fafc', borderRadius: '10px', padding: '12px 14px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '10px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 700 }}>
              ISOLATED FAILURES
            </div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: bulkJobs.some(j => j.failed > 0) ? '#e11d48' : '#047857', marginTop: '2px' }}>
              {bulkJobs.reduce((acc, j) => acc + j.failed, 0)} Isolated Items
            </div>
          </div>
        </div>
      </div>

      {/* 2. FILTER TABS STRIP */}
      <div style={{
        display: 'flex',
        gap: '8px',
        background: '#ffffff',
        padding: '8px 12px',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.02)'
      }}>
        {[
          { id: 'ALL', label: 'All Batch Runs' },
          { id: 'PARTIAL_FAILURE', label: 'Requires Attention (Partial Failure)' },
          { id: 'COMPLETED', label: 'Fully Completed' }
        ].map((tab) => {
          const isActive = filterStatus === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setFilterStatus(tab.id)}
              style={{
                padding: '6px 14px',
                borderRadius: '8px',
                border: 'none',
                background: isActive ? '#6d28d9' : 'transparent',
                color: isActive ? '#ffffff' : '#64748b',
                fontSize: '11px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 3. BATCH CARDS LIST */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {filteredJobs.map((job) => {
          const isExpanded = expandedJobId === job.id;
          const percent = Math.round((job.succeeded / job.totalItems) * 100);
          return (
            <div
              key={job.id}
              style={{
                background: '#ffffff',
                borderRadius: '14px',
                padding: '20px',
                border: job.failed > 0 ? '1px solid #fed7aa' : '1px solid #e2e8f0',
                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.02)',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                      {job.batchName}
                    </h3>
                    <span className={`badge ${job.status === 'COMPLETED'
                        ? 'badge-pass'
                        : job.status === 'PARTIAL_FAILURE'
                          ? 'badge-insufficient'
                          : 'badge-review'
                      }`} style={{ fontSize: '10px' }}>
                      {job.status}
                    </span>
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748b', marginTop: '3px' }}>
                    Batch ID: <code>{job.id}</code> • Enqueued: {new Date(job.createdAt).toLocaleString()}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {job.failed > 0 && (
                    <button
                      onClick={() => handleRetryFailed(job.id)}
                      disabled={retryingId === job.id}
                      style={{
                        background: '#6d28d9',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '7px 14px',
                        fontSize: '11px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        boxShadow: '0 2px 8px rgba(109, 40, 217, 0.25)'
                      }}
                    >
                      <RefreshCw size={12} className={retryingId === job.id ? 'spin' : ''} />
                      <span>{retryingId === job.id ? 'Retrying Failed Item...' : 'Idempotent Retry Failed Item'}</span>
                    </button>
                  )}

                  <button
                    onClick={() => setExpandedJobId(isExpanded ? null : job.id)}
                    style={{
                      background: isExpanded ? '#f1f5f9' : '#f8fafc',
                      border: '1px solid #cbd5e1',
                      borderRadius: '8px',
                      padding: '7px 12px',
                      fontSize: '11px',
                      fontWeight: 700,
                      color: '#475569',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <span>{isExpanded ? 'Hide Details' : 'View Item Breakdown'}</span>
                    {isExpanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                  </button>
                </div>
              </div>

              {/* Pipeline Stage Bar */}
              <div style={{
                background: '#f8fafc',
                borderRadius: '10px',
                padding: '12px 14px',
                border: '1px solid #e2e8f0',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                gap: '10px'
              }}>
                {[
                  { stage: '1. Intake Ingestion', status: 'COMPLETED' },
                  { stage: '2. Document Split & Hash', status: 'COMPLETED' },
                  { stage: '3. OCR Engine Extraction', status: 'COMPLETED' },
                  { stage: '4. AST Rule Verification', status: job.failed > 0 ? 'PARTIAL' : 'COMPLETED' },
                  { stage: '5. VNI Methodology Score', status: job.failed > 0 ? 'ISOLATED' : 'COMPLETED' }
                ].map((s, idx) => (
                  <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <span style={{ fontSize: '10px', color: '#64748b', fontWeight: 600 }}>{s.stage}</span>
                    <span style={{
                      fontSize: '10px',
                      fontWeight: 800,
                      color: s.status === 'COMPLETED' ? '#047857' : '#d97706',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <CheckCircle2 size={11} color={s.status === 'COMPLETED' ? '#047857' : '#d97706'} />
                      <span>{s.status}</span>
                    </span>
                  </div>
                ))}
              </div>

              {/* Progress Counters Bar */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <span style={{ fontSize: '10px', color: '#64748b', fontWeight: 700 }}>TOTAL ENQUEUED</span>
                  <div style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', marginTop: '2px' }}>{job.totalItems}</div>
                </div>
                <div style={{ background: '#ecfdf5', padding: '10px', borderRadius: '8px', border: '1px solid #a7f3d0' }}>
                  <span style={{ fontSize: '10px', color: '#047857', fontWeight: 700 }}>SUCCEEDED</span>
                  <div style={{ fontSize: '16px', fontWeight: 800, color: '#047857', marginTop: '2px' }}>{job.succeeded}</div>
                </div>
                <div style={{ background: job.failed > 0 ? '#fff1f2' : '#f8fafc', padding: '10px', borderRadius: '8px', border: job.failed > 0 ? '1px solid #fecdd3' : '1px solid #e2e8f0' }}>
                  <span style={{ fontSize: '10px', color: job.failed > 0 ? '#e11d48' : '#64748b', fontWeight: 700 }}>FAILED (ISOLATED)</span>
                  <div style={{ fontSize: '16px', fontWeight: 800, color: job.failed > 0 ? '#e11d48' : '#64748b', marginTop: '2px' }}>{job.failed}</div>
                </div>
                <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <span style={{ fontSize: '10px', color: '#64748b', fontWeight: 700 }}>COMPLETION</span>
                  <div style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', marginTop: '2px' }}>{percent}%</div>
                </div>
              </div>

              {/* MODERN TABLE FOR ITEMIZED APPLICATIONS */}
              {isExpanded && (
                <div style={{ marginTop: '4px', borderTop: '1px solid #f1f5f9', paddingTop: '12px' }}>
                  <div style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
                    Itemized Applications in Batch
                  </div>
                  <div style={{ borderRadius: '10px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
                      <thead>
                        {/* Top Group Slabs */}
                        <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                          <th colSpan={2} style={{ padding: '6px 14px' }}>
                            <div style={{
                              background: '#f1f5f9',
                              borderRadius: '6px',
                              padding: '3px 10px',
                              fontSize: '10px',
                              fontWeight: 800,
                              color: '#475569',
                              letterSpacing: '0.06em',
                              textTransform: 'uppercase',
                              display: 'inline-block'
                            }}>
                              IDENTIFIER & PIPELINE STATUS
                            </div>
                          </th>
                          <th colSpan={2} style={{ padding: '6px 14px' }}>
                            <div style={{
                              background: '#ecfdf5',
                              borderRadius: '6px',
                              padding: '3px 10px',
                              fontSize: '10px',
                              fontWeight: 800,
                              color: '#065f46',
                              letterSpacing: '0.06em',
                              textTransform: 'uppercase',
                              display: 'inline-block'
                            }}>
                              EXECUTION LOG & TIMESTAMP
                            </div>
                          </th>
                        </tr>
                        {/* Sub-column Headers with Colored Bottom Underlines */}
                        <tr style={{ background: '#ffffff', borderBottom: '2px solid #e2e8f0' }}>
                          <th style={{ padding: '8px 14px', width: '240px' }}>
                            <div style={{ borderBottom: '3px solid #6d28d9', paddingBottom: '3px', fontSize: '11px', fontWeight: 800, color: '#1e293b' }}>
                              APPLICATION DOSSIER ID
                            </div>
                          </th>
                          <th style={{ padding: '8px 14px', width: '150px' }}>
                            <div style={{ borderBottom: '3px solid #047857', paddingBottom: '3px', fontSize: '11px', fontWeight: 800, color: '#1e293b' }}>
                              OUTCOME STATUS
                            </div>
                          </th>
                          <th style={{ padding: '8px 14px' }}>
                            <div style={{ borderBottom: '3px solid #0284c7', paddingBottom: '3px', fontSize: '11px', fontWeight: 800, color: '#1e293b' }}>
                              EXECUTION DIAGNOSTIC NOTE
                            </div>
                          </th>
                          <th style={{ padding: '8px 14px', width: '150px', textAlign: 'right' }}>
                            <div style={{ borderBottom: '3px solid #b45309', paddingBottom: '3px', fontSize: '11px', fontWeight: 800, color: '#1e293b', textAlign: 'right' }}>
                              PROCESSED AT
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {job.items.map((item) => {
                          const isFailed = item.status === 'FAILED';
                          const indicatorColor = isFailed ? '#e11d48' : '#047857';

                          return (
                            <tr key={item.applicationId} style={{ borderBottom: '1px dotted #cbd5e1', background: '#ffffff' }}>
                              {/* Application ID with Left Row Capsule & Vertical Indicator Strip */}
                              <td style={{ padding: '8px 14px' }}>
                                <div style={{
                                  position: 'relative',
                                  padding: '5px 8px 5px 12px',
                                  background: '#f8fafc',
                                  borderRadius: '6px',
                                  border: '1px solid #e2e8f0',
                                  overflow: 'hidden',
                                  display: 'inline-block'
                                }}>
                                  <div style={{
                                    position: 'absolute',
                                    left: 0,
                                    top: 0,
                                    bottom: 0,
                                    width: '3px',
                                    background: indicatorColor
                                  }} />
                                  <span style={{ fontSize: '11px', fontWeight: 800, color: '#0f172a', fontFamily: 'var(--font-mono)' }}>
                                    {item.applicationId}
                                  </span>
                                </div>
                              </td>

                              {/* Status Badge */}
                              <td style={{ padding: '8px 14px' }}>
                                <span className={`badge ${isFailed ? 'badge-insufficient' : 'badge-pass'}`} style={{ fontSize: '10px', padding: '3px 8px' }}>
                                  {item.status}
                                </span>
                              </td>

                              {/* Execution Note */}
                              <td style={{ padding: '8px 14px', fontSize: '11px', color: isFailed ? '#e11d48' : '#64748b' }}>
                                {item.errorMessage || 'All documents parsed, rules validated, routed to scrutiny queue.'}
                              </td>

                              {/* Processed At */}
                              <td style={{ padding: '8px 14px', fontSize: '11px', color: '#64748b', textAlign: 'right' }}>
                                {item.processedAt ? new Date(item.processedAt).toLocaleTimeString() : 'Pending'}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
