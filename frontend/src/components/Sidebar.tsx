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
  Sparkles,
  HelpCircle
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
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeView,
  onSelectView,
  currentLang,
  currentRole,
  openFindingsCount
}) => {
  const t = translations[currentLang];

  return (
    <aside className="sidebar" aria-label="Main Navigation">
      <div className="sidebar-heading">Case Management</div>
      
      <button 
        className={`sidebar-nav-item ${activeView === 'QUEUE' ? 'active' : ''}`}
        onClick={() => onSelectView('QUEUE')}
      >
        <Inbox size={16} />
        <span>{t.navQueue}</span>
        {openFindingsCount > 0 && (
          <span 
            className="badge badge-review" 
            style={{ marginLeft: 'auto', fontSize: '10px', padding: '1px 6px' }}
          >
            {openFindingsCount}
          </span>
        )}
      </button>

      <button 
        className={`sidebar-nav-item ${activeView === 'DETAIL' ? 'active' : ''}`}
        onClick={() => onSelectView('DETAIL')}
      >
        <FileText size={16} />
        <span>{t.navDetail}</span>
      </button>

      <div className="sidebar-heading">Applicant Workflows</div>

      <button 
        className={`sidebar-nav-item ${activeView === 'APPLICANT' ? 'active' : ''}`}
        onClick={() => onSelectView('APPLICANT')}
      >
        <UploadCloud size={16} />
        <span>{t.navApplicant}</span>
        {currentRole === 'APPLICANT' && (
          <span className="live-dot" style={{ marginLeft: 'auto' }} />
        )}
      </button>

      <div className="sidebar-heading">Compliance Intelligence</div>

      <button 
        className={`sidebar-nav-item ${activeView === 'GRAPH' ? 'active' : ''}`}
        onClick={() => onSelectView('GRAPH')}
      >
        <GitFork size={16} />
        <span>{t.navGraph}</span>
      </button>

      <button 
        className={`sidebar-nav-item ${activeView === 'TWIN' ? 'active' : ''}`}
        onClick={() => onSelectView('TWIN')}
      >
        <Clock size={16} />
        <span>{t.navTwin}</span>
      </button>

      <button 
        className={`sidebar-nav-item ${activeView === 'INFRA' ? 'active' : ''}`}
        onClick={() => onSelectView('INFRA')}
      >
        <Building2 size={16} />
        <span>{t.navInfra}</span>
      </button>

      <button 
        className={`sidebar-nav-item ${activeView === 'DUPLICATES' ? 'active' : ''}`}
        onClick={() => onSelectView('DUPLICATES')}
      >
        <Copy size={16} />
        <span>{t.navDuplicates}</span>
      </button>

      <div className="sidebar-heading">Governance & Platform</div>

      <button 
        className={`sidebar-nav-item ${activeView === 'RULES' ? 'active' : ''}`}
        onClick={() => onSelectView('RULES')}
      >
        <ScrollText size={16} />
        <span>{t.navRules}</span>
        {currentRole === 'RULE_ADMIN' && (
          <span className="live-dot" style={{ marginLeft: 'auto' }} />
        )}
      </button>

      <button 
        className={`sidebar-nav-item ${activeView === 'BULK' ? 'active' : ''}`}
        onClick={() => onSelectView('BULK')}
      >
        <Layers size={16} />
        <span>{t.navBulk}</span>
      </button>

      <button 
        className={`sidebar-nav-item ${activeView === 'AUDIT' ? 'active' : ''}`}
        onClick={() => onSelectView('AUDIT')}
      >
        <ShieldCheck size={16} />
        <span>{t.navAudit}</span>
      </button>

      <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.02)', 
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: '12px',
          fontSize: '11px',
          color: 'var(--text-muted)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', marginBottom: '4px', fontWeight: 600 }}>
            <HelpCircle size={13} />
            <span>Safety Rule Invariant</span>
          </div>
          <p>AI findings are advisory only. Final approval or rejection requires an authorized official signature.</p>
        </div>
      </div>
    </aside>
  );
};
