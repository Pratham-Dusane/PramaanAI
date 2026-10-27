import React, { useState } from 'react';
import {
  FileText,
  CheckSquare,
  Square,
  ChevronDown,
  ChevronUp,
  Printer,
  Download,
  AlertCircle,
  ShieldAlert,
  FolderCheck,
  Clock,
  ExternalLink,
  BookOpen,
  FlaskConical,
  GraduationCap,
  Building,
  FileSpreadsheet
} from 'lucide-react';
import { mockPreVisitBrief } from '../data/mockMethodologyData';
import { Application, UserRole } from '../types';
import { ActiveView } from '../components/Navbar';

interface PreVisitBriefViewProps {
  application: Application;
  currentRole: UserRole;
  onNavigate: (view: ActiveView) => void;
}

export const PreVisitBriefView: React.FC<PreVisitBriefViewProps> = ({
  application,
  currentRole,
  onNavigate,
}) => {
  const brief = mockPreVisitBrief;

  // Flattened items count and interactive checked state
  const allItems = brief.focusChecklist.flatMap(cat => cat.items);
  const totalItemsCount = allItems.length;

  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  // Accordion open/close state
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    checklist: true,
    documents: false,
    reasons: false,
    deficiencies: false,
    caveats: false
  });

  const toggleSection = (key: string) => {
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleCheck = (label: string) => {
    setCheckedItems(prev => ({ ...prev, [label]: !prev[label] }));
  };

  const completedCount = Object.values(checkedItems).filter(Boolean).length;
  const progressPct = totalItemsCount > 0 ? Math.round((completedCount / totalItemsCount) * 100) : 0;

  // SVG Progress Ring calculations
  const ringRadius = 45;
  const circumference = 2 * Math.PI * ringRadius;
  const strokeDashoffset = circumference - (progressPct / 100) * circumference;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="brief-container" style={{ padding: '24px 32px 80px', maxWidth: '1280px', margin: '0 auto' }}>

      {/* 1. Header Bar with Actions */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          marginBottom: '20px'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span
              style={{
                background: 'rgba(212, 160, 52, 0.16)',
                color: 'var(--accent-gold-dark)',
                fontSize: '11px',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                padding: '3px 10px',
                borderRadius: '6px'
              }}
            >
              Inspection Dossier
            </span>
            <span style={{ color: 'var(--text-muted)', fontSize: '13px' }}>/</span>
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
              REC-001
            </span>
          </div>
          <h1 style={{ fontSize: '26px', fontWeight: 800, color: 'var(--text-main)', margin: 0, letterSpacing: '-0.02em' }}>
            Pre-Visit Expert Inspection Brief
          </h1>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={handlePrint}
            style={{
              background: '#ffffff',
              border: '1px solid rgba(38, 61, 57, 0.15)',
              borderRadius: '8px',
              padding: '8px 16px',
              fontSize: '13px',
              fontWeight: 700,
              color: 'var(--text-main)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 2px 6px rgba(38, 61, 57, 0.04)'
            }}
          >
            <Printer size={15} />
            <span>Print Dossier</span>
          </button>

          <button
            onClick={() => onNavigate('OFFICIAL_REVIEW')}
            style={{
              background: 'var(--bg-pine)',
              border: 'none',
              borderRadius: '8px',
              padding: '8px 18px',
              fontSize: '13px',
              fontWeight: 700,
              color: '#ffffff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>Proceed to Official Review</span>
          </button>
        </div>
      </div>

      {/* Advisory Banner */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '10px 16px',
          borderRadius: '8px',
          background: 'rgba(212, 160, 52, 0.08)',
          border: '1px solid rgba(212, 160, 52, 0.3)',
          marginBottom: '24px',
          fontSize: '13px',
          color: '#85590a'
        }}
      >
        <ShieldAlert size={16} color="#d4a034" style={{ flexShrink: 0 }} />
        <span>
          <strong>EVC Team Briefing Notice:</strong> This dossier is confidential and intended strictly for designated Expert Visit Committee members. AI guidance is advisory and does not replace on-site physical inspection.
        </span>
      </div>

      {/* 2. HERO: Progress Ring and Case Summary */}
      <div
        style={{
          background: 'linear-gradient(135deg, #1b2f2b 0%, #263d39 60%, #1e3531 100%)',
          borderRadius: '20px',
          padding: '30px 36px',
          color: '#ffffff',
          boxShadow: '0 16px 36px -10px rgba(26, 44, 41, 0.45), 0 0 0 1px rgba(255, 255, 255, 0.08)',
          marginBottom: '32px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '36px'
        }}
      >
        {/* Animated Progress Ring */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexShrink: 0 }}>
          <div style={{ position: 'relative', width: '110px', height: '110px' }}>
            <svg width="110" height="110" style={{ transform: 'rotate(-90deg)' }}>
              <circle
                cx="55"
                cy="55"
                r={ringRadius}
                fill="none"
                stroke="rgba(255, 255, 255, 0.12)"
                strokeWidth="8"
              />
              <circle
                cx="55"
                cy="55"
                r={ringRadius}
                fill="none"
                stroke="#fbbf24"
                strokeWidth="8"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                style={{ transition: 'stroke-dashoffset 0.4s ease' }}
              />
            </svg>
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <span style={{ fontSize: '20px', fontWeight: 900, color: '#fbbf24', lineHeight: 1 }}>
                {completedCount}/{totalItemsCount}
              </span>
              <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.6)', marginTop: '2px', textTransform: 'uppercase' }}>
                Verified
              </span>
            </div>
          </div>

          <div>
            <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', fontWeight: 700, letterSpacing: '0.04em' }}>
              Checklist Readiness
            </div>
            <div style={{ fontSize: '22px', fontWeight: 800, color: '#ffffff', margin: '2px 0 4px' }}>
              {progressPct}% Completed
            </div>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)' }}>
              {totalItemsCount - completedCount} items pending on-site verification
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ width: '1px', height: '70px', background: 'rgba(255,255,255,0.15)' }} />

        {/* Summary Info */}
        <div style={{ flex: 1, minWidth: '320px' }}>
          <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', marginBottom: '4px' }}>
            Application Target Summary:
          </div>
          <div style={{ fontSize: '16px', fontWeight: 700, color: '#ffffff', lineHeight: 1.4, marginBottom: '10px' }}>
            {brief.applicationSummary}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            <span
              style={{
                background: 'rgba(217, 119, 6, 0.25)',
                color: '#fbbf24',
                border: '1px solid rgba(217, 119, 6, 0.45)',
                padding: '3px 10px',
                borderRadius: '6px',
                fontSize: '11px',
                fontWeight: 800
              }}
            >
              Mode: PHYSICAL EVC
            </span>
            <span
              style={{
                background: 'rgba(255,255,255,0.1)',
                color: 'rgba(255,255,255,0.85)',
                padding: '3px 10px',
                borderRadius: '6px',
                fontSize: '11px',
                fontWeight: 600
              }}
            >
              Target Window: Within 14 Days
            </span>
          </div>
        </div>

      </div>

      {/* 3. ACCORDIONS: Breathing Room, Clean Details on Demand */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

        {/* Section 1: Focus Checklist (13 items across 5 categories) */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: '14px',
            border: '1px solid rgba(38, 61, 57, 0.1)',
            overflow: 'hidden',
            boxShadow: '0 4px 14px rgba(38, 61, 57, 0.04)'
          }}
        >
          <button
            onClick={() => toggleSection('checklist')}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '18px 24px',
              background: '#ffffff',
              border: 'none',
              cursor: 'pointer',
              textAlign: 'left'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <CheckSquare size={18} color="var(--accent-gold-dark)" />
              <span style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-main)' }}>
                On-Site Focus Checklist
              </span>
              <span style={{ fontSize: '12px', background: 'var(--bg-main)', color: 'var(--text-secondary)', padding: '2px 8px', borderRadius: '12px', fontWeight: 700 }}>
                {completedCount} / {totalItemsCount} verified
              </span>
            </div>
            {openSections.checklist ? <ChevronUp size={18} color="var(--text-muted)" /> : <ChevronDown size={18} color="var(--text-muted)" />}
          </button>

          {openSections.checklist && (
            <div style={{ padding: '0 24px 24px', borderTop: '1px solid rgba(38, 61, 57, 0.08)' }}>
              {brief.focusChecklist.map((group, groupIdx) => (
                <div key={groupIdx} style={{ marginTop: '20px' }}>
                  <div
                    style={{
                      fontSize: '12px',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      color: 'var(--text-muted)',
                      letterSpacing: '0.05em',
                      marginBottom: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <span>{group.category}</span>
                    <span style={{ flex: 1, height: '1px', background: 'rgba(38, 61, 57, 0.08)' }} />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {group.items.map((item, itemIdx) => {
                      const isChecked = checkedItems[item.label] || false;

                      return (
                        <div
                          key={itemIdx}
                          onClick={() => toggleCheck(item.label)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '10px 14px',
                            borderRadius: '8px',
                            background: isChecked ? 'rgba(16, 185, 129, 0.06)' : 'var(--bg-main)',
                            border: isChecked ? '1px solid rgba(16, 185, 129, 0.25)' : '1px solid transparent',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            {isChecked ? (
                              <CheckSquare size={18} color="#047857" style={{ flexShrink: 0 }} />
                            ) : (
                              <Square size={18} color="var(--text-muted)" style={{ flexShrink: 0 }} />
                            )}
                            <span style={{ fontSize: '13px', fontWeight: isChecked ? 700 : 500, color: isChecked ? '#047857' : 'var(--text-main)', textDecoration: isChecked ? 'line-through' : 'none' }}>
                              {item.label}
                            </span>
                          </div>

                          {item.evidenceId && (
                            <span
                              style={{
                                fontSize: '10px',
                                fontFamily: 'var(--font-mono)',
                                color: 'var(--text-muted)',
                                background: 'rgba(255,255,255,0.7)',
                                padding: '2px 6px',
                                borderRadius: '4px',
                                border: '1px solid rgba(38, 61, 57, 0.08)'
                              }}
                            >
                              {item.evidenceId}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Section 2: Documents to Obtain Beforehand (5 physical items) */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: '14px',
            border: '1px solid rgba(38, 61, 57, 0.1)',
            overflow: 'hidden',
            boxShadow: '0 4px 14px rgba(38, 61, 57, 0.04)'
          }}
        >
          <button
            onClick={() => toggleSection('documents')}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '18px 24px',
              background: '#ffffff',
              border: 'none',
              cursor: 'pointer',
              textAlign: 'left'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <FolderCheck size={18} color="#2563eb" />
              <span style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-main)' }}>
                Physical Documents to Inspect and Collect
              </span>
              <span style={{ fontSize: '12px', background: 'var(--bg-main)', color: 'var(--text-secondary)', padding: '2px 8px', borderRadius: '12px', fontWeight: 700 }}>
                {brief.documentsToObtain.length} documents
              </span>
            </div>
            {openSections.documents ? <ChevronUp size={18} color="var(--text-muted)" /> : <ChevronDown size={18} color="var(--text-muted)" />}
          </button>

          {openSections.documents && (
            <div style={{ padding: '0 24px 24px', borderTop: '1px solid rgba(38, 61, 57, 0.08)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '16px' }}>
                {brief.documentsToObtain.map((doc, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      background: 'var(--bg-main)',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: 'var(--text-main)'
                    }}
                  >
                    <span style={{ color: 'var(--dim-d1)', fontWeight: 800 }}>#{idx + 1}</span>
                    <span>{doc}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Section 3: Mode Decision Reasons (3 cited drivers) */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: '14px',
            border: '1px solid rgba(38, 61, 57, 0.1)',
            overflow: 'hidden',
            boxShadow: '0 4px 14px rgba(38, 61, 57, 0.04)'
          }}
        >
          <button
            onClick={() => toggleSection('reasons')}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '18px 24px',
              background: '#ffffff',
              border: 'none',
              cursor: 'pointer',
              textAlign: 'left'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <AlertCircle size={18} color="#d97706" />
              <span style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-main)' }}>
                Evidence Reasons for Physical Mode Selection
              </span>
              <span style={{ fontSize: '12px', background: 'var(--bg-main)', color: 'var(--text-secondary)', padding: '2px 8px', borderRadius: '12px', fontWeight: 700 }}>
                {brief.modeReasons.length} cited
              </span>
            </div>
            {openSections.reasons ? <ChevronUp size={18} color="var(--text-muted)" /> : <ChevronDown size={18} color="var(--text-muted)" />}
          </button>

          {openSections.reasons && (
            <div style={{ padding: '0 24px 24px', borderTop: '1px solid rgba(38, 61, 57, 0.08)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '16px' }}>
                {brief.modeReasons.map((reasonObj, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '14px 18px',
                      borderRadius: '8px',
                      background: 'var(--bg-main)',
                      borderLeft: '4px solid var(--accent-gold)'
                    }}
                  >
                    <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-main)', marginBottom: '6px' }}>
                      {reasonObj.reason}
                    </div>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      {reasonObj.evidenceIds.map(id => (
                        <span
                          key={id}
                          style={{
                            fontSize: '10px',
                            fontFamily: 'var(--font-mono)',
                            color: 'var(--text-muted)',
                            background: '#ffffff',
                            padding: '2px 6px',
                            borderRadius: '4px',
                            border: '1px solid rgba(38, 61, 57, 0.1)'
                          }}
                        >
                          {id}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Section 4: Prior Deficiencies from Digital Twin */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: '14px',
            border: '1px solid rgba(38, 61, 57, 0.1)',
            overflow: 'hidden',
            boxShadow: '0 4px 14px rgba(38, 61, 57, 0.04)'
          }}
        >
          <button
            onClick={() => toggleSection('deficiencies')}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '18px 24px',
              background: '#ffffff',
              border: 'none',
              cursor: 'pointer',
              textAlign: 'left'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Clock size={18} color="#dc2626" />
              <span style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-main)' }}>
                Historical Unresolved Deficiencies
              </span>
              <span style={{ fontSize: '12px', background: 'rgba(220, 38, 38, 0.1)', color: '#dc2626', padding: '2px 8px', borderRadius: '12px', fontWeight: 700 }}>
                {brief.openDeficiencies.length} unresolved
              </span>
            </div>
            {openSections.deficiencies ? <ChevronUp size={18} color="var(--text-muted)" /> : <ChevronDown size={18} color="var(--text-muted)" />}
          </button>

          {openSections.deficiencies && (
            <div style={{ padding: '0 24px 24px', borderTop: '1px solid rgba(38, 61, 57, 0.08)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '16px' }}>
                {brief.openDeficiencies.map((def, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      background: 'rgba(239, 68, 68, 0.04)',
                      border: '1px solid rgba(239, 68, 68, 0.15)'
                    }}
                  >
                    <div>
                      <span style={{ fontSize: '11px', fontWeight: 800, color: '#b91c1c', marginRight: '8px' }}>
                        [{def.year}]
                      </span>
                      <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-main)' }}>
                        {def.deficiency}
                      </span>
                    </div>
                    <span style={{ fontSize: '11px', fontWeight: 800, color: '#b91c1c', background: 'rgba(239, 68, 68, 0.1)', padding: '2px 6px', borderRadius: '4px' }}>
                      {def.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Section 5: Caveats and Demo Disclaimers */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: '14px',
            border: '1px solid rgba(38, 61, 57, 0.1)',
            overflow: 'hidden',
            boxShadow: '0 4px 14px rgba(38, 61, 57, 0.04)'
          }}
        >
          <button
            onClick={() => toggleSection('caveats')}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '18px 24px',
              background: '#ffffff',
              border: 'none',
              cursor: 'pointer',
              textAlign: 'left'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <FileText size={18} color="var(--text-muted)" />
              <span style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-main)' }}>
                Methodology Caveats and Advisory Scope
              </span>
              <span style={{ fontSize: '12px', background: 'var(--bg-main)', color: 'var(--text-secondary)', padding: '2px 8px', borderRadius: '12px', fontWeight: 700 }}>
                {brief.caveats.length} notes
              </span>
            </div>
            {openSections.caveats ? <ChevronUp size={18} color="var(--text-muted)" /> : <ChevronDown size={18} color="var(--text-muted)" />}
          </button>

          {openSections.caveats && (
            <div style={{ padding: '0 24px 24px', borderTop: '1px solid rgba(38, 61, 57, 0.08)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '16px', fontSize: '12px', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                {brief.caveats.map((c, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '8px' }}>
                    <span>*</span>
                    <span>{c}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
export default PreVisitBriefView;
