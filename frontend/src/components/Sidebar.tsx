import React from 'react';
import {
  Inbox,
  FileText,
  UploadCloud,
  GitFork,
  Clock,
  Building2,
  Copy,
  ScrollText,
  Layers,
  ShieldCheck,
  HelpCircle,
  Compass,
  PanelLeftOpen,
  PanelLeftClose
} from 'lucide-react';
import { SupportedLanguage, translations } from '../data/translations';
import { UserRole } from '../types';

export type ActiveView =
  | 'QUEUE'
  | 'DETAIL'
  | 'APPLICANT'
  | 'GRAPH'
  | 'TWIN'
  | 'INFRA'
  | 'DUPLICATES'
  | 'RULES'
  | 'BULK'
  | 'AUDIT';

interface SidebarProps {
  activeView: ActiveView;
  onSelectView: (view: ActiveView) => void;
  currentLang: SupportedLanguage;
  currentRole: UserRole;
  openFindingsCount: number;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeView,
  onSelectView,
  currentLang,
  currentRole,
  openFindingsCount,
  isCollapsed = false,
  onToggleCollapse
}) => {
  const t = translations[currentLang];

  const roleUserProfiles: Record<UserRole, { name: string; email: string; avatar: string }> = {
    SCRUTINY_OFFICER: {
      name: 'DR. S. K. RAMAN',
      email: 'sk.raman@aicte-india.org',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    },
    SENIOR_APPROVER: {
      name: 'SHRI A. P. MEHTA',
      email: 'ap.mehta@aicte-india.gov.in',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
    },
    APPLICANT: {
      name: 'DR. RAMESH JOSHI',
      email: 'registrar@abdul-kalam-tech.edu.in',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
    },
    INSPECTOR: {
      name: 'PROF. ANJALI SAXENA',
      email: 'anjali.saxena@inspection.nic.in',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
    },
    RULE_ADMIN: {
      name: 'OFFICER V. NARAYAN',
      email: 'v.narayan@aicte-policy.gov.in',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80'
    },
    AUDITOR: {
      name: 'AUDITOR C. VERMA',
      email: 'c.verma@audit-central.gov.in',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80'
    },
    EVC_COORDINATOR: {
      name: 'DR. K. VISWANATHAN',
      email: 'evc.coordinator@aicte-india.org',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
    },
    EVC_EXPERT: {
      name: 'PROF. S. MUKHERJEE',
      email: 'evc.expert@inspection.nic.in',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    }
  };

  const user = roleUserProfiles[currentRole];

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`} aria-label="Main Navigation">
      {/* User Profile Header from Inspiration */}
      <div className="sidebar-profile" title={user.name}>
        <div className="sidebar-avatar-wrapper">
          <img
            src={user.avatar}
            alt={user.name}
            className="sidebar-avatar-img"
            onError={(e) => {
              // fallback if network image fails
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
        </div>
        <div className="sidebar-user-name">{user.name}</div>
        <div className="sidebar-user-role">{user.email}</div>
      </div>

      {/* Navigation Sections */}
      <div className="sidebar-heading">Case Management</div>

      <button
        className={`sidebar-nav-item ${activeView === 'QUEUE' ? 'active' : ''}`}
        onClick={() => onSelectView('QUEUE')}
        title={t.navQueue}
      >
        <Inbox size={18} />
        <span>{t.navQueue}</span>
        {openFindingsCount > 0 && (
          <span
            className="badge badge-gold"
            style={{ marginLeft: 'auto', fontSize: '10px', padding: '2px 8px', fontWeight: 800 }}
          >
            {openFindingsCount}
          </span>
        )}
      </button>

      <button
        className={`sidebar-nav-item ${activeView === 'DETAIL' ? 'active' : ''}`}
        onClick={() => onSelectView('DETAIL')}
        title={t.navDetail}
      >
        <FileText size={18} />
        <span>{t.navDetail}</span>
      </button>

      <div className="sidebar-heading">Applicant Workflows</div>

      <button
        className={`sidebar-nav-item ${activeView === 'APPLICANT' ? 'active' : ''}`}
        onClick={() => onSelectView('APPLICANT')}
        title={t.navApplicant}
      >
        <UploadCloud size={18} />
        <span>{t.navApplicant}</span>
        {currentRole === 'APPLICANT' && (
          <span className="live-dot" style={{ marginLeft: 'auto' }} />
        )}
      </button>

      <div className="sidebar-heading">Compliance Intelligence</div>

      <button
        className={`sidebar-nav-item ${activeView === 'GRAPH' ? 'active' : ''}`}
        onClick={() => onSelectView('GRAPH')}
        title={t.navGraph}
      >
        <GitFork size={18} />
        <span>{t.navGraph}</span>
      </button>

      <button
        className={`sidebar-nav-item ${activeView === 'TWIN' ? 'active' : ''}`}
        onClick={() => onSelectView('TWIN')}
        title={t.navTwin}
      >
        <Clock size={18} />
        <span>{t.navTwin}</span>
      </button>

      <button
        className={`sidebar-nav-item ${activeView === 'INFRA' ? 'active' : ''}`}
        onClick={() => onSelectView('INFRA')}
        title={t.navInfra}
      >
        <Building2 size={18} />
        <span>{t.navInfra}</span>
      </button>

      <button
        className={`sidebar-nav-item ${activeView === 'DUPLICATES' ? 'active' : ''}`}
        onClick={() => onSelectView('DUPLICATES')}
        title={t.navDuplicates}
      >
        <Copy size={18} />
        <span>{t.navDuplicates}</span>
      </button>

      <div className="sidebar-heading">Governance & Platform</div>

      <button
        className={`sidebar-nav-item ${activeView === 'RULES' ? 'active' : ''}`}
        onClick={() => onSelectView('RULES')}
        title={t.navRules}
      >
        <ScrollText size={18} />
        <span>{t.navRules}</span>
        {currentRole === 'RULE_ADMIN' && (
          <span className="live-dot" style={{ marginLeft: 'auto' }} />
        )}
      </button>

      <button
        className={`sidebar-nav-item ${activeView === 'BULK' ? 'active' : ''}`}
        onClick={() => onSelectView('BULK')}
        title={t.navBulk}
      >
        <Layers size={18} />
        <span>{t.navBulk}</span>
      </button>

      <button
        className={`sidebar-nav-item ${activeView === 'AUDIT' ? 'active' : ''}`}
        onClick={() => onSelectView('AUDIT')}
        title={t.navAudit}
      >
        <ShieldCheck size={18} />
        <span>{t.navAudit}</span>
      </button>

      {/* Active Users Stack & Geo-Connectivity from Inspiration */}
      <div className="sidebar-active-users">
        <div className="sidebar-active-label">Active Scrutiny Officers</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div className="avatar-stack">
            <img
              className="stack-avatar"
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&auto=format&fit=crop&q=80"
              alt="Officer 1"
            />
            <img
              className="stack-avatar"
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&auto=format&fit=crop&q=80"
              alt="Officer 2"
            />
            <img
              className="stack-avatar"
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&auto=format&fit=crop&q=80"
              alt="Officer 3"
            />
            <img
              className="stack-avatar"
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=60&auto=format&fit=crop&q=80"
              alt="Officer 4"
            />
            <div className="stack-more">+70</div>
          </div>
          <Compass size={16} color="var(--accent-gold)" />
        </div>

        {/* Subtle Dotted Network Arc Vector from Inspiration Image */}
        <div style={{ marginTop: '10px', height: '36px', position: 'relative' }}>
          <svg width="100%" height="36" viewBox="0 0 200 36" fill="none">
            {/* Dotted grid nodes */}
            <circle cx="20" cy="24" r="2.5" fill="#587972" />
            <circle cx="50" cy="12" r="2.5" fill="#587972" />
            <circle cx="95" cy="18" r="3" fill="var(--accent-gold)" />
            <circle cx="140" cy="10" r="2.5" fill="#587972" />
            <circle cx="180" cy="26" r="3" fill="var(--accent-gold)" />
            {/* Golden Arc lines connecting nodes */}
            <path
              d="M 20 24 Q 55 4 95 18 T 180 26"
              stroke="var(--accent-gold)"
              strokeWidth="1.5"
              strokeDasharray="3 3"
              fill="none"
              opacity="0.85"
            />
            <path
              d="M 50 12 Q 110 0 140 10"
              stroke="#8ba6a0"
              strokeWidth="1"
              strokeDasharray="2 2"
              fill="none"
              opacity="0.5"
            />
          </svg>
        </div>
      </div>

      {/* Safety Invariant Notice & Bottom Toggle Controls */}
      {isCollapsed ? (
        <div style={{ marginTop: 'auto', paddingTop: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <button
            onClick={onToggleCollapse}
            title="Open navigation (closes Copilot)"
            aria-label="Open navigation and close Copilot"
            style={{
              background: 'rgba(212, 160, 52, 0.25)',
              border: '1.5px solid var(--accent-gold)',
              color: 'var(--accent-gold)',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25)',
              transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
          >
            <PanelLeftOpen size={18} />
          </button>
        </div>
      ) : (
        <div style={{ marginTop: 'auto', paddingTop: '14px', marginRight: '18px' }}>
          <div className="sidebar-safety-notice" style={{
            background: 'rgba(0, 0, 0, 0.2)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            borderRadius: 'var(--radius-sm)',
            padding: '10px 12px',
            fontSize: '11px',
            color: 'var(--text-on-pine-muted)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-gold)', marginBottom: '3px', fontWeight: 700 }}>
              <HelpCircle size={13} />
              <span>Safety Rule Invariant</span>
            </div>
            <p style={{ lineHeight: 1.4 }}>AI findings are advisory only. Official decisions require human official sign-off.</p>
          </div>

          {/* Small button below to collapse navbar manually */}
          <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'flex-end' }}>
            <button
              onClick={onToggleCollapse}
              title="Collapse navigation"
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: 'var(--text-on-pine-muted)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '11px',
                padding: '5px 10px',
                borderRadius: 'var(--radius-full)',
                transition: 'all 0.2s'
              }}
            >
              <PanelLeftClose size={13} />
              <span>Collapse</span>
            </button>
          </div>
        </div>
      )}
    </aside>
  );
};
