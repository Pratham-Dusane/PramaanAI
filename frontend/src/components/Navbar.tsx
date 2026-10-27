import React, { useState, useRef, useEffect } from 'react';
import { 
  Bell, 
  ChevronDown, 
  LayoutGrid, 
  FileText, 
  Users, 
  FolderTree, 
  BarChart3, 
  FileCheck2, 
  Settings, 
  GitFork, 
  Clock, 
  Building2, 
  Copy, 
  ScrollText, 
  Layers, 
  UserCheck, 
  Globe 
} from 'lucide-react';
import { UserRole } from '../types';
import { SupportedLanguage, translations } from '../data/translations';

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

interface NavbarProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  currentLang: SupportedLanguage;
  onLangChange: (lang: SupportedLanguage) => void;
  unreadAlertsCount: number;
  onToggleNotifications: () => void;
  activeView: ActiveView;
  onSelectView: (view: ActiveView) => void;
  openFindingsCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRole,
  onRoleChange,
  currentLang,
  onLangChange,
  unreadAlertsCount,
  onToggleNotifications,
  activeView,
  onSelectView,
  openFindingsCount
}) => {
  const t = translations[currentLang];
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const userMenuRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openedByHoverRef = useRef<boolean>(false);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleMouseEnter = (tabId: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    openedByHoverRef.current = true;
    setActiveDropdown(tabId);
    setTimeout(() => {
      openedByHoverRef.current = false;
    }, 300);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 250);
  };

  const roleLabels: Record<UserRole, string> = {
    APPLICANT: 'Applicant / College Admin',
    SCRUTINY_OFFICER: 'Scrutiny Officer (Reviewer)',
    SENIOR_APPROVER: 'Senior Approver (Decision Authority)',
    INSPECTOR: 'Domain Expert / Inspector',
    RULE_ADMIN: 'Rule Administrator',
    AUDITOR: 'Auditor / System Admin'
  };

  const roleProfiles: Record<UserRole, { name: string; title: string; email: string; initials: string }> = {
    SCRUTINY_OFFICER: {
      name: 'Dr. S. K. Raman',
      title: 'Scrutiny Officer (Reviewer)',
      email: 'sk.raman@aicte-india.org',
      initials: 'SR'
    },
    SENIOR_APPROVER: {
      name: 'Shri A. P. Mehta',
      title: 'Senior Approver (Decision Authority)',
      email: 'ap.mehta@aicte-india.gov.in',
      initials: 'AM'
    },
    APPLICANT: {
      name: 'Dr. Ramesh Joshi',
      title: 'Applicant / College Admin',
      email: 'registrar@abdul-kalam-tech.edu.in',
      initials: 'RJ'
    },
    INSPECTOR: {
      name: 'Prof. Anjali Saxena',
      title: 'Domain Expert / Inspector',
      email: 'anjali.saxena@inspection.nic.in',
      initials: 'AS'
    },
    RULE_ADMIN: {
      name: 'Officer V. Narayan',
      title: 'Rule Administrator',
      email: 'v.narayan@aicte-policy.gov.in',
      initials: 'VN'
    },
    AUDITOR: {
      name: 'Auditor C. Verma',
      title: 'Auditor / System Admin',
      email: 'c.verma@audit-central.gov.in',
      initials: 'CV'
    }
  };

  const currentProfile = roleProfiles[currentRole];

  // Primary horizontal tabs matching user's reference image
  const tabs = [
    {
      id: 'DASHBOARD',
      label: 'Dashboard',
      icon: LayoutGrid,
      isActive: activeView === 'QUEUE',
      onClick: () => {
        onSelectView('QUEUE');
        setActiveDropdown(null);
      }
    },
    {
      id: 'CASE_MANAGEMENT',
      label: 'Case Management',
      icon: FileText,
      isActive: activeView === 'DETAIL',
      badge: openFindingsCount && openFindingsCount > 0 ? openFindingsCount : undefined,
      onClick: () => {
        onSelectView('DETAIL');
        setActiveDropdown(null);
      }
    },
    {
      id: 'APPLICANT_PORTAL',
      label: 'Applicant Portal',
      icon: Users,
      isActive: activeView === 'APPLICANT',
      onClick: () => {
        onSelectView('APPLICANT');
        setActiveDropdown(null);
      }
    },
    {
      id: 'EVIDENCE_DOCS',
      label: 'Evidence & Documents',
      icon: FolderTree,
      isActive: activeView === 'GRAPH' || activeView === 'TWIN',
      defaultView: 'GRAPH' as ActiveView,
      dropdownItems: [
        { label: 'Evidence Graph & Traceability (FR-08)', view: 'GRAPH' as ActiveView, icon: GitFork },
        { label: 'Digital Twin Timeline & Dossier (FR-07)', view: 'TWIN' as ActiveView, icon: Clock }
      ]
    },
    {
      id: 'ANALYTICS',
      label: 'Analytics',
      icon: BarChart3,
      isActive: activeView === 'INFRA' || activeView === 'DUPLICATES' || activeView === 'TWIN',
      defaultView: 'INFRA' as ActiveView,
      dropdownItems: [
        { label: 'Infrastructure & Satellite Signals (FR-04)', view: 'INFRA' as ActiveView, icon: Building2 },
        { label: 'Duplicate Application Links (FR-05)', view: 'DUPLICATES' as ActiveView, icon: Copy },
        { label: 'Digital Twin Model & Trends (FR-07)', view: 'TWIN' as ActiveView, icon: Clock }
      ]
    },
    {
      id: 'REPORTS',
      label: 'Reports',
      icon: FileCheck2,
      isActive: activeView === 'AUDIT',
      onClick: () => {
        onSelectView('AUDIT');
        setActiveDropdown(null);
      }
    },
    {
      id: 'ADMINISTRATION',
      label: 'Administration',
      icon: Settings,
      isActive: activeView === 'RULES' || activeView === 'BULK',
      defaultView: 'RULES' as ActiveView,
      dropdownItems: [
        { label: 'Rule Pack & Replay Engine (FR-06)', view: 'RULES' as ActiveView, icon: ScrollText },
        { label: 'Bulk Intake & Processing (FR-09)', view: 'BULK' as ActiveView, icon: Layers }
      ]
    }
  ];

  return (
    <header className="horizontal-header">
      {/* 1. TOP BAR (Govt of India Logo + Titles + Language + Notifications + User Profile) */}
      <div className="top-brand-bar">
        {/* Left: Govt of India Emblem & AICTE System Titles */}
        <div 
          className="brand-container"
          onClick={() => onSelectView('QUEUE')}
          title="Return to Dashboard"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onSelectView('QUEUE');
            }
          }}
        >
          {/* Official State Emblem of India (Gold Lion Capital & Satyameva Jayate) */}
          <div className="emblem-wrapper">
            <img 
              src="/india-emblem-gold.jpg" 
              alt="State Emblem of India" 
              className="emblem-img"
            />
          </div>

          <div className="title-stack">
            <h1 className="system-title">
              AICTE Compliance Intelligence
            </h1>
            <p className="system-subtitle">
              Advisory Decision Support System for Institutional Scrutiny
            </p>
          </div>
        </div>

        {/* Right: Controls & User Profile Pill */}
        <div className="header-actions">
          {/* Language Selector Pill from Reference Image */}
          <div className="lang-pill-container">
            <Globe size={13} color="rgba(255,255,255,0.75)" />
            <select
              value={currentLang}
              onChange={(e) => onLangChange(e.target.value as SupportedLanguage)}
              className="lang-select-input"
              aria-label="Select Language"
            >
              <option value="en">English (EN)</option>
              <option value="hi">हिन्दी (HI)</option>
              <option value="mr">मराठी (MR)</option>
            </select>
            <ChevronDown size={12} color="rgba(255,255,255,0.7)" style={{ pointerEvents: 'none' }} />
          </div>

          {/* Notification Bell with Badge */}
          <button 
            className="header-icon-btn"
            onClick={onToggleNotifications}
            title="Expiry & Deadline Alerts"
            aria-label="View notifications"
          >
            <Bell size={18} />
            {unreadAlertsCount > 0 && (
              <span className="bell-badge-count">
                {unreadAlertsCount}
              </span>
            )}
          </button>

          {/* Vertical divider */}
          <div style={{ width: '1px', height: '24px', background: 'rgba(255,255,255,0.15)', margin: '0 4px' }} />

          {/* User Profile on Far Right directly matching Reference Image */}
          <div className="user-profile-wrapper" ref={userMenuRef}>
            <div 
              className="user-profile-trigger"
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              role="button"
              tabIndex={0}
              title="Switch user role or view profile"
            >
              {/* Monogram Avatar Circle ("SR") */}
              <div className="user-monogram-circle">
                {currentProfile.initials}
              </div>

              {/* Name & Role Text Stack */}
              <div className="user-text-stack">
                <div className="user-name-row">
                  <span>{currentProfile.name}</span>
                  <ChevronDown 
                    size={13} 
                    style={{ 
                      transform: isUserMenuOpen ? 'rotate(180deg)' : 'none', 
                      transition: 'transform 0.2s ease' 
                    }} 
                  />
                </div>
                <div className="user-role-label">
                  {currentProfile.title}
                </div>
              </div>
            </div>

            {/* Dropdown Menu for Role Switching */}
            {isUserMenuOpen && (
              <div className="user-dropdown-popover">
                <div style={{ padding: '10px 16px', borderBottom: '1px solid #e2ece9' }}>
                  <div style={{ fontSize: '10px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Authenticated Official
                  </div>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-main)', marginTop: '2px' }}>
                    {currentProfile.name}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                    {currentProfile.email}
                  </div>
                </div>

                <div style={{ padding: '6px 0' }}>
                  <div style={{ fontSize: '10px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', padding: '6px 16px 4px', letterSpacing: '0.04em' }}>
                    Switch System Role
                  </div>
                  {(Object.keys(roleProfiles) as UserRole[]).map((role) => (
                    <button
                      key={role}
                      onClick={() => {
                        onRoleChange(role);
                        setIsUserMenuOpen(false);
                      }}
                      className={`role-option-btn ${currentRole === role ? 'active' : ''}`}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <UserCheck size={14} color={currentRole === role ? 'var(--accent-gold)' : 'var(--text-secondary)'} />
                        <span>{roleLabels[role]}</span>
                      </div>
                      {currentRole === role && (
                        <span style={{ color: 'var(--accent-gold-dark)', fontWeight: 800, fontSize: '13px' }}>✓</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. BOTTOM HORIZONTAL NAVIGATION BAR */}
      <nav className="horizontal-nav-bar" ref={dropdownRef}>
        <div className="horizontal-nav-scroll">
          {tabs.map((tab) => {
            const hasSubmenu = tab.dropdownItems && tab.dropdownItems.length > 0;
            const isMenuOpen = activeDropdown === tab.id;
            const Icon = tab.icon;

            return (
              <div 
                key={tab.id}
                className="horizontal-tab-container"
                onMouseEnter={() => {
                  if (hasSubmenu) handleMouseEnter(tab.id);
                }}
                onMouseLeave={() => {
                  if (hasSubmenu) handleMouseLeave();
                }}
              >
                <button
                  className={`horizontal-tab-btn ${tab.isActive ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (hasSubmenu) {
                      if (timeoutRef.current) clearTimeout(timeoutRef.current);
                      if (openedByHoverRef.current) {
                        // User hovered and immediately clicked: ensure it stays open
                        setActiveDropdown(tab.id);
                      } else {
                        // Intentional click toggle
                        setActiveDropdown(prev => prev === tab.id ? null : tab.id);
                      }
                    } else if (tab.onClick) {
                      tab.onClick();
                      setActiveDropdown(null);
                    }
                  }}
                  aria-expanded={hasSubmenu ? isMenuOpen : undefined}
                >
                  <Icon size={16} className="tab-icon" />
                  <span>{tab.label}</span>

                  {tab.badge !== undefined && tab.badge > 0 && (
                    <span className="tab-badge-pill">
                      {tab.badge}
                    </span>
                  )}

                  {hasSubmenu && (
                    <ChevronDown 
                      size={12} 
                      className="tab-chevron"
                      style={{ 
                        transform: isMenuOpen ? 'rotate(180deg)' : 'none',
                        transition: 'transform 0.15s ease' 
                      }} 
                    />
                  )}
                </button>

                {/* Submenu Popover for Multi-view Tabs */}
                {hasSubmenu && isMenuOpen && (
                  <div 
                    className="horizontal-submenu-popover"
                    onMouseEnter={() => {
                      if (timeoutRef.current) clearTimeout(timeoutRef.current);
                    }}
                    onMouseLeave={handleMouseLeave}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {tab.dropdownItems!.map((item) => {
                      const SubIcon = item.icon;
                      const isSubActive = activeView === item.view;

                      return (
                        <button
                          key={item.view}
                          className={`submenu-item-btn ${isSubActive ? 'active' : ''}`}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onSelectView(item.view);
                            setActiveDropdown(null);
                          }}
                        >
                          <SubIcon size={16} color={isSubActive ? 'var(--accent-gold-dark)' : 'var(--text-secondary)'} />
                          <span>{item.label}</span>
                          {isSubActive && (
                            <span style={{ marginLeft: 'auto', color: 'var(--accent-gold-dark)', fontWeight: 800 }}>✓</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </nav>
    </header>
  );
};
export default Navbar;
