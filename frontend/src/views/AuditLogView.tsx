import React, { useState } from 'react';
import { ShieldCheck, Search, Filter, Lock, Terminal } from 'lucide-react';
import { mockAuditEvents } from '../data/mockData';

export const AuditLogView: React.FC = () => {
  const [filterAction, setFilterAction] = useState('ALL');

  const filteredEvents = mockAuditEvents.filter((e) => 
    filterAction === 'ALL' || e.action === filterAction
  );

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div className="glass-panel" style={{ padding: '20px' }}>
        <div className="panel-header" style={{ marginBottom: '8px' }}>
          <div className="panel-title">
            <ShieldCheck size={20} color="var(--primary-500)" />
            <span>Immutable Governance Audit Trail & State Transitions (T01-02)</span>
          </div>
          <span className="badge badge-pass">Append-Only Verified Ledger</span>
        </div>
        <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
          Every critical lifecycle state transition, document upload, finding resolution, rule replay, and human decision records an immutable audit event tagged with actor identity, UTC timestamp, and unique correlation ID.
        </p>
      </div>

      <div className="glass-panel">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>
              Filter by Action Event:
            </span>
            <select 
              className="select-control"
              value={filterAction}
              onChange={(e) => setFilterAction(e.target.value)}
              style={{ width: 'auto', padding: '4px 10px', fontSize: '12px' }}
            >
              <option value="ALL">All Recorded Actions</option>
              <option value="FINDING_RESOLVED">FINDING_RESOLVED</option>
              <option value="EXTRACTED_FIELD_REVIEWED">EXTRACTED_FIELD_REVIEWED</option>
              <option value="DOCUMENT_UPLOADED">DOCUMENT_UPLOADED</option>
              <option value="HUMAN_DECISION_RECORDED">HUMAN_DECISION_RECORDED</option>
            </select>
          </div>

          <span className="badge badge-info" style={{ fontSize: '11px' }}>
            {filteredEvents.length} Audit Entries Verified
          </span>
        </div>

        <div className="table-wrapper">
          <table className="data-table" aria-label="Audit Log Ledger">
            <thead>
              <tr>
                <th scope="col">Timestamp (UTC)</th>
                <th scope="col">Action Event</th>
                <th scope="col">Actor & Role</th>
                <th scope="col">Entity Scope</th>
                <th scope="col">Correlation ID</th>
                <th scope="col">Safe Metadata Excerpt</th>
              </tr>
            </thead>
            <tbody>
              {filteredEvents.map((evt) => (
                <tr key={evt.id}>
                  <td style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                    {new Date(evt.timestamp).toLocaleString()}
                  </td>
                  <td>
                    <span className="badge badge-simulated" style={{ fontSize: '10px' }}>
                      {evt.action}
                    </span>
                  </td>
                  <td>
                    <strong>{evt.actor}</strong>
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{evt.role}</div>
                  </td>
                  <td>
                    <code>{evt.applicationId || evt.institutionId || 'GLOBAL'}</code>
                  </td>
                  <td style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)' }}>
                    {evt.correlationId.slice(0, 13)}...
                  </td>
                  <td style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
                    {JSON.stringify(evt.safeMetadata)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
