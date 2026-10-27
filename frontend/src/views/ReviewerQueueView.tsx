import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  ChevronRight, 
  ShieldAlert, 
  FileText,
  MapPin,
  Calendar,
  Users,
  GraduationCap,
  X,
  ChevronDown
} from 'lucide-react';
import { Application, UserRole } from '../types';
import { SupportedLanguage, translations } from '../data/translations';
import { ComplianceAnalytics } from '../components/ComplianceAnalytics';
import { GitFork } from 'lucide-react';

interface ReviewerQueueViewProps {
  applications: Application[];
  onSelectApplication: (appId: string) => void;
  onOpenDecisionModal: (app: Application) => void;
  onOpenGraphForCase?: (appId: string, clusterId?: string) => void;
  currentRole: UserRole;
  currentLang: SupportedLanguage;
}

const institutionLocations: Record<string, { city: string; state: string }> = {
  'DEMO-EOA-2026-001': { city: 'Pune', state: 'Maharashtra' },
  'DEMO-EOA-2025-001': { city: 'Pune', state: 'Maharashtra' },
  'DEMO-EOA-2026-002': { city: 'Ahmedabad', state: 'Gujarat' },
  'DEMO-NEW-2026-003': { city: 'Bangalore', state: 'Karnataka' },
  'DEMO-EOA-2026-004': { city: 'Chennai', state: 'Tamil Nadu' }
};

export const ReviewerQueueView: React.FC<ReviewerQueueViewProps> = ({
  applications,
  onSelectApplication,
  onOpenDecisionModal,
  onOpenGraphForCase,
  currentRole,
  currentLang
}) => {
  const t = translations[currentLang];
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'ALL' | 'URGENT' | 'REVIEW' | 'DECIDED'>('ALL');
  const [selectedProgram, setSelectedProgram] = useState<string>('ALL');

  // Filter applications
  const filteredApps = applications.filter((app) => {
    const loc = institutionLocations[app.id];
    const locString = loc ? `${loc.city} ${loc.state}` : '';
    const matchesSearch = 
      app.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.institutionName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      locString.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesTab = true;
    if (activeTab === 'URGENT') matchesTab = app.urgencyScore >= 75;
    if (activeTab === 'REVIEW') matchesTab = app.status === 'READY_FOR_REVIEW' || app.status === 'UNDER_REVIEW';
    if (activeTab === 'DECIDED') matchesTab = app.status === 'DECISION_RECORDED';

    let matchesProgram = true;
    if (selectedProgram !== 'ALL') {
      matchesProgram = app.applicationType === selectedProgram;
    }

    return matchesSearch && matchesTab && matchesProgram;
  });

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* 1. Clean Institutional Search & Filter Capsule Bar */}
      <div className="search-capsule">
        {/* Top Input Row */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'minmax(280px, 2fr) minmax(160px, 1fr) minmax(160px, 1fr) minmax(140px, 1fr)', 
          gap: '14px',
          alignItems: 'center'
        }}>
          {/* Institution / Keyword Search Input */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            background: 'var(--bg-surface-elevated)',
            padding: '11px 20px',
            borderRadius: 'var(--radius-full)'
          }}>
            <Search size={17} color="var(--accent-gold-dark)" />
            <input 
              type="text"
              placeholder="SEARCH BY INSTITUTION NAME, ID, OR CITY..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                width: '100%',
                fontSize: '12px',
                fontWeight: 700,
                color: 'var(--text-main)',
                letterSpacing: '0.04em'
              }}
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Academic Session Calendar Pill */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'var(--bg-surface-elevated)',
            padding: '11px 18px',
            borderRadius: 'var(--radius-full)'
          }}>
            <Calendar size={15} color="var(--text-secondary)" />
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-main)', letterSpacing: '0.02em' }}>
              AY 2026-2027
            </span>
          </div>

          {/* Program Category Selector */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'var(--bg-surface-elevated)',
            padding: '8px 16px',
            borderRadius: 'var(--radius-full)'
          }}>
            <GraduationCap size={15} color="var(--text-secondary)" />
            <select
              value={selectedProgram}
              onChange={(e) => setSelectedProgram(e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                fontSize: '12px',
                fontWeight: 700,
                color: 'var(--text-main)',
                cursor: 'pointer',
                width: '100%'
              }}
            >
              <option value="ALL">All Categories</option>
              <option value="EXTENSION_OF_APPROVAL">Extension of Approval</option>
              <option value="NEW_PROGRAM">New Program / Institution</option>
              <option value="VARIATION_IN_INTAKE">Variation in Intake</option>
            </select>
          </div>

          {/* Scrutiny Tier Pill */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'var(--bg-surface-elevated)',
            padding: '11px 18px',
            borderRadius: 'var(--radius-full)'
          }}>
            <Users size={15} color="var(--text-secondary)" />
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-main)', letterSpacing: '0.02em' }}>
              2 REVIEWERS
            </span>
          </div>
        </div>

        {/* Bottom Filter & Segmented Pill Row */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '14px',
          paddingTop: '6px'
        }}>
          {/* Segmented Capsule Toggles */}
          <div className="pill-segmented-toggle">
            <button 
              className={`segmented-pill-btn ${activeTab === 'ALL' ? 'active' : ''}`}
              onClick={() => setActiveTab('ALL')}
            >
              ALL CASES
            </button>
            <button 
              className={`segmented-pill-btn ${activeTab === 'URGENT' ? 'active' : ''}`}
              onClick={() => setActiveTab('URGENT')}
            >
              HIGH URGENCY (≥75)
            </button>
            <button 
              className={`segmented-pill-btn ${activeTab === 'REVIEW' ? 'active' : ''}`}
              onClick={() => setActiveTab('REVIEW')}
            >
              IN SCRUTINY
            </button>
            <button 
              className={`segmented-pill-btn ${activeTab === 'DECIDED' ? 'active' : ''}`}
              onClick={() => setActiveTab('DECIDED')}
            >
              DECISION RECORDED
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Accreditation Class Pill */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'var(--bg-surface-elevated)',
              padding: '9px 18px',
              borderRadius: 'var(--radius-full)',
              fontSize: '12px',
              fontWeight: 700,
              color: 'var(--text-main)',
              letterSpacing: '0.04em'
            }}>
              <GraduationCap size={15} color="var(--text-secondary)" />
              <span>APH TIER-1 ACCREDITED</span>
            </div>

            {/* Warm Mustard Gold Search & Filter Button */}
            <button 
              className="btn btn-primary"
              style={{ padding: '10px 28px', fontSize: '12px', letterSpacing: '0.06em' }}
            >
              SEARCH & FILTER
            </button>
          </div>
        </div>
      </div>

      {/* 2. Top Metric Cards (Image 2 style) */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: '20px' 
      }}>
        {/* Card 1: Warm Mustard Gold Contoured Card */}
        <div style={{
          background: 'linear-gradient(135deg, #d4a034 0%, #c18f27 100%)',
          borderRadius: 'var(--radius-xl)',
          padding: '24px 28px',
          color: '#ffffff',
          boxShadow: '0 10px 28px rgba(212, 160, 52, 0.28)',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: '140px'
        }}>
          <svg style={{ position: 'absolute', right: 0, bottom: 0, width: '180px', height: '100%', opacity: 0.2 }} viewBox="0 0 100 100" fill="none">
            <path d="M0 80 Q 40 20 100 60" stroke="#ffffff" strokeWidth="2" fill="none" />
            <path d="M0 95 Q 50 40 100 80" stroke="#ffffff" strokeWidth="1.5" fill="none" />
            <path d="M0 65 Q 30 10 100 40" stroke="#ffffff" strokeWidth="1" fill="none" />
          </svg>

          <div>
            <div style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', opacity: 0.9 }}>
              High Discrepancy Queue
            </div>
            <div style={{ fontSize: '32px', fontWeight: 900, marginTop: '6px', letterSpacing: '-0.02em' }}>
              42 Cases
            </div>
          </div>
          <div style={{ fontSize: '12px', fontWeight: 600, opacity: 0.85, display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>Urgency index ≥ 75</span> • <span>Immediate Review</span>
          </div>
        </div>

        {/* Card 2: Deep Pine Slate Contoured Card */}
        <div style={{
          background: 'var(--bg-pine)',
          borderRadius: 'var(--radius-xl)',
          padding: '24px 28px',
          color: '#ffffff',
          boxShadow: '0 10px 28px rgba(38, 61, 57, 0.2)',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: '140px'
        }}>
          <svg style={{ position: 'absolute', right: 0, bottom: 0, width: '180px', height: '100%', opacity: 0.15 }} viewBox="0 0 100 100" fill="none">
            <path d="M0 60 Q 50 10 100 50" stroke="var(--accent-gold)" strokeWidth="2" fill="none" />
            <path d="M0 85 Q 40 30 100 70" stroke="var(--accent-gold)" strokeWidth="1.5" fill="none" />
          </svg>

          <div>
            <div style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--accent-gold)' }}>
              Clean Verification Pass
            </div>
            <div style={{ fontSize: '32px', fontWeight: 900, marginTop: '6px', letterSpacing: '-0.02em' }}>
              318 Inst.
            </div>
          </div>
          <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-on-pine-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>Zero Cadre & Land Deficiencies</span>
          </div>
        </div>

        {/* Card 3: Deep Slate Total Cases Card */}
        <div style={{
          background: '#1d312d',
          borderRadius: 'var(--radius-xl)',
          padding: '24px 28px',
          color: '#ffffff',
          boxShadow: '0 10px 28px rgba(29, 49, 45, 0.2)',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: '140px'
        }}>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-on-pine-secondary)' }}>
              Total Scrutiny Applications
            </div>
            <div style={{ fontSize: '32px', fontWeight: 900, marginTop: '6px', letterSpacing: '-0.02em' }}>
              850
            </div>
          </div>
          <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-on-pine-muted)' }}>
            Active AY 2026-27 Cycle
          </div>
        </div>
      </div>

      {/* 3. Main Workspace: Split Grid (Left Boarding Pass Cases, Right Interactive Analytics) */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'minmax(0, 1.85fr) minmax(310px, 1fr)', 
        gap: '24px',
        alignItems: 'start'
      }}>
        
        {/* Left Column: Boarding Pass Cases List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Header Row: RESULT (X) + Filter & Sort Pills */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 4px' }}>
            <h2 style={{ 
              fontSize: '15px', 
              fontWeight: 800, 
              letterSpacing: '0.06em', 
              textTransform: 'uppercase',
              color: 'var(--text-main)'
            }}>
              RESULT ({filteredApps.length})
            </h2>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button style={{
                background: '#ffffff',
                border: '1px solid var(--border-card)',
                borderRadius: 'var(--radius-full)',
                padding: '7px 16px',
                fontSize: '11px',
                fontWeight: 700,
                color: 'var(--text-secondary)',
                letterSpacing: '0.04em',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <Filter size={12} />
                <span>FILTER</span>
              </button>

              <button style={{
                background: '#ffffff',
                border: '1px solid var(--border-card)',
                borderRadius: 'var(--radius-full)',
                padding: '7px 16px',
                fontSize: '11px',
                fontWeight: 700,
                color: 'var(--text-secondary)',
                letterSpacing: '0.04em',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <span>SORT BY URGENCY</span>
                <ChevronDown size={12} />
              </button>
            </div>
          </div>

          {/* Boarding-Pass Application Cards (Fixed: No overlaps, actual location, real progress bar) */}
          {filteredApps.map((app) => {
            // Pick monogram
            const monogram = app.institutionName.split(' ')
              .map(word => word[0])
              .filter(ch => ch && ch.toUpperCase() === ch)
              .slice(0, 3)
              .join('');

            // Real institution location
            const loc = institutionLocations[app.id] || { city: 'Pune', state: 'Maharashtra' };

            // Real dynamic progress percentage
            const presentDocs = app.requiredDocuments.present;
            const totalDocs = app.requiredDocuments.total;
            const missingDocs = app.requiredDocuments.missing;
            const docPercent = Math.min(100, Math.round((presentDocs / totalDocs) * 100));

            // Clean reviewer name by stripping parenthetical designation (e.g., "(Senior Scrutiny Officer)")
            const cleanReviewer = (app.assignedReviewerName || 'Unassigned Queue').replace(/\s*\(.*?\)/g, '').trim();

            // Collect active discrepancies ordered by urgency (HIGH first, then MEDIUM, then LOW)
            const orderedDiscrepancies: { count: number; label: string; badgeClass: string }[] = [];
            if (app.openFindingsCount.high > 0) {
              orderedDiscrepancies.push({
                count: app.openFindingsCount.high,
                label: `${app.openFindingsCount.high} HIGH`,
                badgeClass: 'badge-insufficient'
              });
            }
            if (app.openFindingsCount.medium > 0) {
              orderedDiscrepancies.push({
                count: app.openFindingsCount.medium,
                label: `${app.openFindingsCount.medium} MED`,
                badgeClass: 'badge-review'
              });
            }
            if (app.openFindingsCount.low > 0) {
              orderedDiscrepancies.push({
                count: app.openFindingsCount.low,
                label: `${app.openFindingsCount.low} LOW`,
                badgeClass: 'badge-pass'
              });
            }

            return (
              <div 
                key={app.id} 
                className="boarding-pass-card"
                style={{ padding: '18px 22px', overflow: 'hidden' }}
              >
                {/* Main Card Row: Proportional Grid with ample room for button */}
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'minmax(130px, 1.1fr) minmax(110px, 0.9fr) minmax(130px, 1fr) auto',
                  alignItems: 'center',
                  gap: '14px'
                }}>
                  
                  {/* Column 1: Monogram Emblem & Application Identifiers (Redundant category cylinder removed) */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
                    <div style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '14px',
                      background: 'var(--bg-pine)',
                      color: 'var(--accent-gold)',
                      fontWeight: 900,
                      fontSize: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      letterSpacing: '0.04em',
                      boxShadow: '0 4px 12px rgba(38, 61, 57, 0.15)',
                      flexShrink: 0
                    }}>
                      {monogram || 'INS'}
                    </div>
                    <div style={{ minWidth: 0, overflow: 'hidden' }}>
                      <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '0.02em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {app.id}
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600, marginTop: '2px' }}>
                        AY {app.academicYear}
                      </div>
                    </div>
                  </div>

                  {/* Column 2: Real Institution Location & Scrutiny Stage */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', minWidth: 0 }}>
                    <div style={{ 
                      fontSize: '12px', 
                      fontWeight: 800, 
                      color: 'var(--text-main)', 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '5px',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      <MapPin size={13} color="var(--accent-gold-dark)" style={{ flexShrink: 0 }} />
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{loc.city}, {loc.state}</span>
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600, whiteSpace: 'nowrap' }}>
                      Stage: {app.status === 'READY_FOR_REVIEW' ? 'Initial Scrutiny' : app.status === 'UNDER_REVIEW' ? 'Active Review' : 'Decision Recorded'}
                    </div>
                  </div>

                  {/* Column 3: Real Mathematically Accurate Document Progress Bar */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '0.05em', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                        EVIDENCE DOSSIER
                      </span>
                      <span style={{ 
                        fontSize: '11px', 
                        fontWeight: 800, 
                        color: docPercent === 100 ? 'var(--status-pass-text)' : 'var(--accent-gold-dark)' 
                      }}>
                        {presentDocs}/{totalDocs} ({docPercent}%)
                      </span>
                    </div>

                    {/* Dynamic Capsule Progress Track */}
                    <div style={{ 
                      width: '100%', 
                      height: '8px', 
                      background: 'var(--bg-surface-elevated)', 
                      borderRadius: 'var(--radius-full)', 
                      overflow: 'hidden' 
                    }}>
                      <div style={{ 
                        width: `${docPercent}%`, 
                        height: '100%', 
                        background: docPercent === 100 
                          ? 'var(--status-pass-text)' 
                          : 'linear-gradient(90deg, #d4a034 0%, #c18f27 100%)',
                        borderRadius: 'var(--radius-full)',
                        transition: 'width 0.4s ease'
                      }} />
                    </div>

                    <div style={{ fontSize: '10px', fontWeight: 600, color: missingDocs > 0 ? 'var(--status-insufficient-text)' : 'var(--status-pass-text)', whiteSpace: 'nowrap' }}>
                      {missingDocs > 0 ? `${missingDocs} Required Doc Missing` : 'All Mandatory Docs Attached'}
                    </div>
                  </div>

                  {/* Column 4: Priority Urgency Metric, VNI Score & Spaced Action Button */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexShrink: 0 }}>
                    {app.vniScore !== undefined && (
                      <div style={{ textAlign: 'right', minWidth: '70px', paddingRight: '10px', borderRight: '1px solid rgba(38, 61, 57, 0.1)' }}>
                        <div style={{ fontSize: '9px', fontWeight: 800, letterSpacing: '0.06em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                          VNI NEED
                        </div>
                        <div style={{ 
                          fontSize: '16px', 
                          fontWeight: 900, 
                          color: app.vniScore >= 70 ? 'var(--mode-physical)' : 'var(--dim-d1)',
                          lineHeight: 1.2
                        }}>
                          {app.vniScore} / 100
                        </div>
                        {app.recommendedMode && (
                          <div style={{ fontSize: '9px', fontWeight: 800, color: 'var(--mode-physical)', marginTop: '2px' }}>
                            {app.recommendedMode.replace('_', ' ')}
                          </div>
                        )}
                      </div>
                    )}

                    <div style={{ textAlign: 'right', minWidth: '60px' }}>
                      <div style={{ fontSize: '9px', fontWeight: 800, letterSpacing: '0.06em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                        URGENCY
                      </div>
                      <div style={{ 
                        fontSize: '18px', 
                        fontWeight: 900, 
                        color: app.urgencyScore >= 75 ? 'var(--status-insufficient-text)' : 'var(--accent-gold-dark)',
                        lineHeight: 1.2
                      }}>
                        {app.urgencyScore} / 100
                      </div>
                    </div>

                    <button 
                      className="btn btn-primary"
                      onClick={() => onSelectApplication(app.id)}
                      style={{ 
                        padding: '9px 18px', 
                        fontSize: '11px', 
                        letterSpacing: '0.05em',
                        whiteSpace: 'nowrap',
                        flexShrink: 0
                      }}
                    >
                      EVALUATE CASE
                    </button>
                  </div>
                </div>

                {/* Perforated Boarding Pass Divider Line */}
                <div className="boarding-divider" style={{ margin: '14px 0' }} />

                {/* Card Sub-Details: Single Line (Institute Name + Reviewer + Discrepancies) */}
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between', 
                  flexWrap: 'nowrap', 
                  gap: '12px',
                  fontSize: '12px',
                  overflow: 'hidden'
                }}>
                  {/* Institute Name & Reviewer on same line */}
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px', 
                    minWidth: 0, 
                    overflow: 'hidden', 
                    textOverflow: 'ellipsis', 
                    whiteSpace: 'nowrap' 
                  }}>
                    <strong 
                      style={{ color: 'var(--text-main)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} 
                      title={app.institutionName}
                    >
                      {app.institutionName}
                    </strong>
                    <span style={{ color: 'var(--border-subtle)', flexShrink: 0 }}>•</span>
                    <span style={{ color: 'var(--text-secondary)', flexShrink: 0, whiteSpace: 'nowrap' }}>
                      Reviewer: {cleanReviewer}
                    </span>
                  </div>

                  {/* Discrepancies: Urgent ones first, compact +1 when multiple */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                    <span style={{ fontSize: '10px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>
                      DISCREPANCIES:
                    </span>
                    {orderedDiscrepancies.length === 0 ? (
                      <span style={{ fontSize: '11px', color: 'var(--status-pass-text)', fontWeight: 700, whiteSpace: 'nowrap' }}>
                        Complete Compliance Verified
                      </span>
                    ) : (
                      <>
                        {/* Most urgent discrepancy badge first - Deep Linked to Evidence Graph */}
                        <span 
                          className={`badge ${orderedDiscrepancies[0].badgeClass}`} 
                          style={{ 
                            fontSize: '10px', 
                            padding: '3px 8px', 
                            whiteSpace: 'nowrap',
                            cursor: onOpenGraphForCase ? 'pointer' : 'default',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
                            transition: 'all 0.15s ease'
                          }}
                          onClick={(e) => {
                            if (onOpenGraphForCase) {
                              e.stopPropagation();
                              onOpenGraphForCase(app.id, app.institutionId === 'DEMO-INST-001' ? 'cluster-pune-land' : undefined);
                            }
                          }}
                          title="Click to inspect this case's multi-institution cluster on the Evidence Graph"
                        >
                          <span>{orderedDiscrepancies[0].label}</span>
                          <GitFork size={10} style={{ opacity: 0.8 }} />
                        </span>

                        {/* Compact +1 badge if additional discrepancy levels exist */}
                        {orderedDiscrepancies.length > 1 && (
                          <span 
                            className="badge badge-info"
                            title={orderedDiscrepancies.slice(1).map(d => d.label).join(', ')}
                            style={{ 
                              fontSize: '10px', 
                              padding: '3px 7px', 
                              fontWeight: 800, 
                              cursor: onOpenGraphForCase ? 'pointer' : 'help',
                              whiteSpace: 'nowrap'
                            }}
                            onClick={(e) => {
                              if (onOpenGraphForCase) {
                                e.stopPropagation();
                                onOpenGraphForCase(app.id, app.institutionId === 'DEMO-INST-001' ? 'cluster-pune-land' : undefined);
                              }
                            }}
                          >
                            +{orderedDiscrepancies.length - 1}
                          </span>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {filteredApps.length === 0 && (
            <div className="glass-panel" style={{ textAlign: 'center', padding: '48px 24px' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: 'var(--bg-surface-elevated)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                color: 'var(--text-muted)'
              }}>
                <Search size={24} />
              </div>
              <h3 style={{ fontSize: '16px', color: 'var(--text-main)', fontWeight: 800 }}>
                No Scrutiny Applications Match Filter
              </h3>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                Try clearing search terms or selecting 'ALL CASES'.
              </p>
            </div>
          )}
        </div>

        {/* Right Column: Interactive Kokonut / Bklit Compliance Analytics */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <ComplianceAnalytics />
        </div>

      </div>
    </div>
  );
};
