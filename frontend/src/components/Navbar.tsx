import React from 'react';
import { 
  ShieldCheck, 
  Bell, 
  Sparkles, 
  UserCheck, 
  Globe, 
  Database, 
  Cpu, 
  ExternalLink 
} from 'lucide-react';
import { UserRole } from '../types';
import { SupportedLanguage, translations } from '../data/translations';

interface NavbarProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  currentLang: SupportedLanguage;
  onLangChange: (lang: SupportedLanguage) => void;
  unreadAlertsCount: number;
  onToggleNotifications: () => void;
  onToggleCopilot: () => void;
  isCopilotOpen: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRole,
  onRoleChange,
  currentLang,
  onLangChange,
  unreadAlertsCount,
  onToggleNotifications,
  onToggleCopilot,
  isCopilotOpen
}) => {
  const t = translations[currentLang];

  const roleLabels: Record<UserRole, string> = {
    APPLICANT: '👨‍💼 Applicant / College Admin',
    SCRUTINY_OFFICER: '🔍 Scrutiny Officer (Reviewer)',
    SENIOR_APPROVER: '⚖️ Senior Approver (Decision Authority)',
    INSPECTOR: '📐 Domain Expert / Inspector',
    RULE_ADMIN: '📜 Rule Administrator',
    AUDITOR: '🛡️ Auditor / System Admin'
  };

  return (
    <header>
      {/* Mandatory Regulatory Demo Banner */}
      <div className="demo-banner">
        <span className="demo-tag">DEMO PROTOTYPE</span>
        <span>{t.demoBanner}</span>
        <span style={{ opacity: 0.7, fontSize: '11px' }}>| Advisory Decision Support Only</span>
      </div>

      <nav className="navbar">
        {/* Brand */}
        <div className="brand-section">
          <div className="brand-emblem">
            <span>AI</span>
          </div>
          <div className="brand-titles">
            <h1>
              AICTE Compliance Intelligence
              <span className="badge badge-info" style={{ fontSize: '10px', padding: '2px 6px' }}>v1.0</span>
            </h1>
            <p>{t.appSubtitle}</p>
          </div>
        </div>

        {/* Status Pills & Controls */}
        <div className="navbar-controls">
          {/* Provider Status Indicators */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginRight: '6px' }}>
            <span 
              className="badge badge-simulated" 
              title="Storage is configured locally outside web root"
              style={{ fontSize: '10px' }}
            >
              <Database size={11} /> Storage: Local
            </span>
            <span 
              className="badge badge-pass" 
              title="OCR parser is active (Tesseract + Native PDF)"
              style={{ fontSize: '10px' }}
            >
              <Cpu size={11} /> OCR: Local
            </span>
            <span 
              className="badge badge-review" 
              title="Mock BHASHINI Adapter (Free Tier Policy)"
              style={{ fontSize: '10px' }}
            >
              <Globe size={11} /> BHASHINI: Mock
            </span>
          </div>

          {/* Language Switcher */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Globe size={14} color="var(--text-muted)" />
            <select 
              className="select-control"
              value={currentLang}
              onChange={(e) => onLangChange(e.target.value as SupportedLanguage)}
              style={{ padding: '4px 8px', fontSize: '12px', width: 'auto' }}
              aria-label="Select Language"
            >
              <option value="en">English (EN)</option>
              <option value="hi">हिन्दी (HI)</option>
              <option value="mr">मराठी (MR)</option>
            </select>
          </div>

          {/* Role Switcher */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <UserCheck size={14} color="var(--primary-500)" />
            <select
              className="select-control"
              value={currentRole}
              onChange={(e) => onRoleChange(e.target.value as UserRole)}
              style={{ 
                padding: '5px 10px', 
                fontSize: '12px', 
                width: 'auto',
                fontWeight: 600,
                borderColor: currentRole === 'SENIOR_APPROVER' ? 'var(--accent-amber)' : 'var(--border-subtle)'
              }}
              aria-label="Switch User Role"
            >
              <option value="APPLICANT">{roleLabels.APPLICANT}</option>
              <option value="SCRUTINY_OFFICER">{roleLabels.SCRUTINY_OFFICER}</option>
              <option value="SENIOR_APPROVER">{roleLabels.SENIOR_APPROVER}</option>
              <option value="INSPECTOR">{roleLabels.INSPECTOR}</option>
              <option value="RULE_ADMIN">{roleLabels.RULE_ADMIN}</option>
              <option value="AUDITOR">{roleLabels.AUDITOR}</option>
            </select>
          </div>

          {/* Notifications Bell */}
          <button 
            className="btn btn-outline btn-sm"
            onClick={onToggleNotifications}
            title="Expiry & Deadline Alerts"
            style={{ position: 'relative', padding: '6px 10px' }}
            aria-label="View notifications"
          >
            <Bell size={15} />
            {unreadAlertsCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                background: 'var(--accent-rose)',
                color: 'white',
                fontSize: '10px',
                fontWeight: 800,
                borderRadius: '50%',
                width: '16px',
                height: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {unreadAlertsCount}
              </span>
            )}
          </button>

          {/* Regulatory Copilot Button */}
          <button 
            className="btn btn-primary btn-sm"
            onClick={onToggleCopilot}
            style={{ 
              background: isCopilotOpen 
                ? 'linear-gradient(135deg, #4338ca, #3730a3)' 
                : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              gap: '6px'
            }}
          >
            <Sparkles size={14} />
            <span>Copilot</span>
          </button>
        </div>
      </nav>
    </header>
  );
};
