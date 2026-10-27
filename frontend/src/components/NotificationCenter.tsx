import React from 'react';
import { X, Bell, Clock, CheckCircle2, AlertTriangle, Calendar } from 'lucide-react';
import { NotificationItem } from '../types';

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onAcknowledge: (id: string) => void;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({
  isOpen,
  onClose,
  notifications,
  onAcknowledge
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop fade-in" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '580px' }}
      >
        <div className="panel-header">
          <div className="panel-title">
            <Bell size={18} color="var(--primary-500)" />
            <span>Deadline & Certificate Expiry Alerts</span>
          </div>
          <button className="btn btn-outline btn-sm" onClick={onClose} aria-label="Close Alerts">
            <X size={16} />
          </button>
        </div>

        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
          Configurable deadline tracking (30d, 14d, 7d, 1d reminder windows) for upcoming application deadlines, clarification response windows, and certificate expiration dates.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {notifications.map((item) => (
            <div
              key={item.id}
              style={{
                background: item.acknowledged ? 'rgba(255, 255, 255, 0.02)' : 'var(--bg-surface-elevated)',
                border: '1px solid',
                borderColor: item.daysRemaining <= 1
                  ? 'rgba(244, 63, 94, 0.4)'
                  : item.daysRemaining <= 7
                    ? 'rgba(245, 158, 11, 0.35)'
                    : 'var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '14px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                opacity: item.acknowledged ? 0.6 : 1
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {item.daysRemaining <= 1 ? (
                    <span className="badge badge-insufficient" style={{ fontSize: '10px' }}>
                      <AlertTriangle size={11} /> Due in {item.daysRemaining} Day
                    </span>
                  ) : (
                    <span className="badge badge-review" style={{ fontSize: '10px' }}>
                      <Clock size={11} /> {item.daysRemaining} Days Left
                    </span>
                  )}
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    Related: {item.relatedEntity}
                  </span>
                </div>

                {!item.acknowledged ? (
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => onAcknowledge(item.id)}
                    style={{ fontSize: '11px', padding: '3px 8px' }}
                  >
                    <CheckCircle2 size={12} /> Acknowledge
                  </button>
                ) : (
                  <span style={{ fontSize: '11px', color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <CheckCircle2 size={12} /> Acknowledged
                  </span>
                )}
              </div>

              <div>
                <h4 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-main)' }}>{item.title}</h4>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  {item.description}
                </p>
              </div>

              <div style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Calendar size={12} />
                <span>Target Due Date: {new Date(item.dueDate).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
          <button className="btn btn-primary btn-sm" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
