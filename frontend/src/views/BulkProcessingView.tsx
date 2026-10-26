import React, { useState } from 'react';
import { Layers, CheckCircle, AlertTriangle, RefreshCw, Play, FileDown } from 'lucide-react';
import { mockBulkJobs } from '../data/mockData';
import { BulkJob } from '../types';

export const BulkProcessingView: React.FC = () => {
  const [bulkJobs, setBulkJobs] = useState<BulkJob[]>(mockBulkJobs);
  const [retryingId, setRetryingId] = useState<string | null>(null);

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
    }, 800);
  };

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div className="glass-panel" style={{ padding: '20px' }}>
        <div className="panel-header" style={{ marginBottom: '8px' }}>
          <div className="panel-title">
            <Layers size={20} color="var(--primary-500)" />
            <span>Bulk Application Batch Processing & Failure Isolation (FR-15)</span>
          </div>
          <span className="badge badge-info">Durable Job Model</span>
        </div>
        <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
          Execute and monitor batch intake runs across regional applications. One item failing cannot roll back or block successful items. Retry operations are strictly idempotent and scope-restricted.
        </p>
      </div>

      {bulkJobs.map((job) => (
        <div key={job.id} className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 800 }}>{job.batchName}</h3>
                <span className={`badge ${
                  job.status === 'COMPLETED' 
                    ? 'badge-pass' 
                    : job.status === 'PARTIAL_FAILURE' 
                    ? 'badge-insufficient' 
                    : 'badge-review'
                }`}>
                  {job.status}
                </span>
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                Batch ID: <code>{job.id}</code> • Enqueued at: {new Date(job.createdAt).toLocaleString()}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {job.failed > 0 && (
                <button 
                  className="btn btn-secondary btn-sm"
                  onClick={() => handleRetryFailed(job.id)}
                  disabled={retryingId === job.id}
                >
                  <RefreshCw size={13} className={retryingId === job.id ? 'spin' : ''} />
                  {retryingId === job.id ? 'Retrying Failed Item...' : 'Idempotent Retry Failed Items'}
                </button>
              )}
            </div>
          </div>

          {/* Progress Counters */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
            <div style={{ background: 'var(--bg-surface-elevated)', padding: '12px', borderRadius: 'var(--radius-md)' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>TOTAL ITEMS</span>
              <div style={{ fontSize: '18px', fontWeight: 800 }}>{job.totalItems}</div>
            </div>
            <div style={{ background: 'var(--bg-surface-elevated)', padding: '12px', borderRadius: 'var(--radius-md)' }}>
              <span style={{ fontSize: '11px', color: 'var(--accent-emerald)' }}>SUCCEEDED</span>
              <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--accent-emerald)' }}>{job.succeeded}</div>
            </div>
            <div style={{ background: 'var(--bg-surface-elevated)', padding: '12px', borderRadius: 'var(--radius-md)' }}>
              <span style={{ fontSize: '11px', color: 'var(--accent-rose)' }}>FAILED (ISOLATED)</span>
              <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--accent-rose)' }}>{job.failed}</div>
            </div>
            <div style={{ background: 'var(--bg-surface-elevated)', padding: '12px', borderRadius: 'var(--radius-md)' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>RUNNING</span>
              <div style={{ fontSize: '18px', fontWeight: 800 }}>{job.running}</div>
            </div>
          </div>

          {/* Batch Items Table */}
          <div className="table-wrapper">
            <table className="data-table" aria-label="Batch Job Items">
              <thead>
                <tr>
                  <th scope="col">Application ID</th>
                  <th scope="col">Institution Name</th>
                  <th scope="col">Category</th>
                  <th scope="col">Status</th>
                  <th scope="col">Diagnostics / Error Isolation</th>
                  <th scope="col">Processed Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {job.items.map((item) => (
                  <tr key={item.id}>
                    <td><strong>{item.applicationId}</strong></td>
                    <td>{item.institutionName}</td>
                    <td><span className="badge badge-info">{item.category}</span></td>
                    <td>
                      <span className={`badge ${
                        item.status === 'SUCCEEDED' ? 'badge-pass' : 'badge-insufficient'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td style={{ fontSize: '12px' }}>
                      {item.errorMessage ? (
                        <span style={{ color: 'var(--accent-rose)' }}>
                          ⚠ {item.errorMessage}
                        </span>
                      ) : (
                        <span style={{ color: 'var(--accent-emerald)' }}>
                          ✓ Ingestion, OCR & Rule Validation completed cleanly
                        </span>
                      )}
                    </td>
                    <td style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                      {item.processedAt ? new Date(item.processedAt).toLocaleTimeString() : 'Queued'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};
