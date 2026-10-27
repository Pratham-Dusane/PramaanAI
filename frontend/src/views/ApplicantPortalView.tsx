import React, { useState } from 'react';
import {
  UploadCloud,
  CheckCircle2,
  AlertTriangle,
  FileText,
  ArrowRight,
  RefreshCw,
  ShieldCheck,
  Building2,
  Clock,
  Sparkles,
  Lock,
  ExternalLink,
  Award,
  TrendingUp,
  AlertCircle,
  FileCheck2,
  Send,
  Calendar,
  Layers,
  ChevronRight,
  Eye
} from 'lucide-react';
import { Institution, UserRole } from '../types';
import { SupportedLanguage, translations } from '../data/translations';

interface ApplicantPortalViewProps {
  institution: Institution;
  currentRole: UserRole;
  currentLang: SupportedLanguage;
}

export const ApplicantPortalView: React.FC<ApplicantPortalViewProps> = ({
  institution,
  currentRole,
  currentLang
}) => {
  const t = translations[currentLang];
  const [activeTab, setActiveTab] = useState<'PREFLIGHT' | 'CARRY_FORWARD' | 'DOSSIER' | 'QUERIES'>('PREFLIGHT');

  const [selectedCategory, setSelectedCategory] = useState('DEMO_EOA');
  const [selectedYear, setSelectedYear] = useState('2026-27');
  const [preflightRun, setPreflightRun] = useState(true);
  const [isScanning, setIsScanning] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);

  // Carry Forward Attributes State
  const [carryForwardItems, setCarryForwardItems] = useState([
    {
      key: 'land_area',
      label: 'Continuous Campus Land Title (14.50 Acres)',
      value: 'Cadastre Survey No. 44/2, Mauje Wagholi',
      confirmed: true,
      source: 'AY 2025-26 Scrutiny Committee Confirmed',
      category: 'LAND & INFRASTRUCTURE',
      status: 'SAFE',
      badge: 'SAFE TO CARRY FORWARD'
    },
    {
      key: 'principal_name',
      label: 'Principal / Director National Profile',
      value: 'Dr. Ramesh Joshi (Bio-ID: AICTE-FAC-19283)',
      confirmed: true,
      source: 'Aadhaar Biometric Authenticated',
      category: 'GOVERNANCE & LEADERSHIP',
      status: 'SAFE',
      badge: 'VERIFIED CREDENTIAL'
    },
    {
      key: 'fire_safety_noc',
      label: 'Municipal Fire Safety NOC Certificate',
      value: 'Expired on 31-03-2026 (Pune Municipal Corporation)',
      confirmed: false,
      source: 'Stale / Validity Date Lapsed',
      category: 'SAFETY & STATUTORY APPROVALS',
      status: 'BLOCKED',
      blocked: true,
      badge: 'BLOCKED: MUST UPLOAD RENEWED NOC'
    },
    {
      key: 'structural_stability',
      label: 'Architectural Structural Stability Certificate',
      value: 'Issued 12-05-2023 (Valid 5 Years up to 2028)',
      confirmed: true,
      source: 'Registered Municipal Architect Key',
      category: 'BUILDING & CIVIL COMPLIANCE',
      status: 'SAFE',
      badge: 'VALID WITHIN 5-YR WINDOW'
    }
  ]);

  // Uploaded Dossier List
  const [uploadedFiles, setUploadedFiles] = useState([
    {
      id: 'DOC-1',
      title: 'Part-II Institutional Approval Application 2026-27.pdf',
      size: '4.8 MB',
      sha256: 'a1b2c3d4e5f60718293a4b5c6d7e8f90123456789abcdef0123456789abcdef0',
      status: 'VERIFIED',
      type: 'APPLICATION_FORM',
      date: '18 Oct 2026'
    },
    {
      id: 'DOC-2',
      title: 'Certified Teaching Faculty Roster AY 2026.pdf',
      size: '2.4 MB',
      sha256: 'b2c3d4e5f60718293a4b5c6d7e8f90123456789abcdef0123456789abcdef01',
      status: 'VERIFIED',
      type: 'FACULTY_ROSTER',
      date: '18 Oct 2026'
    },
    {
      id: 'DOC-3',
      title: 'Municipal Fire Safety NOC 2025-26.pdf',
      size: '1.9 MB',
      sha256: 'c3d4e5f60718293a4b5c6d7e8f90123456789abcdef0123456789abcdef012',
      status: 'WARNING_EXPIRING',
      type: 'FIRE_SAFETY',
      date: '18 Oct 2026'
    }
  ]);

  // Reviewer Queries state
  const [queryResponse, setQueryResponse] = useState('');
  const [isResponseSent, setIsResponseSent] = useState(false);

  const handleSimulateUpload = () => {
    setUploadProgress(15);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev === null || prev >= 100) {
          clearInterval(interval);
          setUploadedFiles(prevFiles => [
            {
              id: `DOC-${Date.now()}`,
              title: 'PMC_Fire_Renewal_Challan_2026.pdf',
              size: '1.4 MB',
              sha256: 'e8f9a0b1c2d3e4f5061728394a5b6c7d8e9f0123456789abcdef0123456789ab',
              status: 'VERIFIED',
              type: 'UNDERTAKING',
              date: 'Just now'
            },
            ...prevFiles
          ]);
          return 100;
        }
        return prev + 35;
      });
    }, 200);
  };

  const handleRunDiagnosticScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setPreflightRun(true);
    }, 800);
  };

  const toggleCarryForward = (index: number) => {
    if (carryForwardItems[index].blocked) return;
    setCarryForwardItems((prev) =>
      prev.map((item, i) => i === index ? { ...item, confirmed: !item.confirmed } : item)
    );
  };

  const confirmedCount = carryForwardItems.filter(i => i.confirmed && !i.blocked).length;

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '1440px', margin: '0 auto', width: '100%' }}>

      {/* 1. ULTRA-PREMIUM INSTITUTIONAL HERO COMMAND BAR */}
      <div
        style={{
          background: 'radial-gradient(120% 120% at 90% 10%, rgba(212, 160, 52, 0.12) 0%, rgba(13, 40, 34, 0.98) 60%, #081d18 100%)',
          borderRadius: '20px',
          padding: '28px 32px',
          border: '1px solid rgba(212, 160, 52, 0.25)',
          boxShadow: '0 16px 40px rgba(0, 0, 0, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Subtle decorative glow orb */}
        <div style={{
          position: 'absolute',
          top: '-80px',
          right: '180px',
          width: '260px',
          height: '260px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '28px', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
            {/* Institution Crest Monogram */}
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #1b4d40 0%, #0a2620 100%)',
              border: '2px solid rgba(212, 160, 52, 0.6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fbbf24',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35)',
              flexShrink: 0,
              fontSize: '24px',
              fontWeight: 800
            }}>
              <Building2 size={32} />
            </div>

            <div>
              {/* Badges / Pill Tags */}
              <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
                <span style={{
                  background: 'rgba(212, 160, 52, 0.2)',
                  border: '1px solid rgba(212, 160, 52, 0.5)',
                  color: '#fbbf24',
                  fontSize: '10px',
                  fontWeight: 800,
                  padding: '3px 10px',
                  borderRadius: '100px',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase'
                }}>
                  Official Applicant Desk
                </span>
                <span style={{
                  background: 'rgba(16, 185, 129, 0.18)',
                  color: '#34d399',
                  border: '1px solid rgba(16, 185, 129, 0.4)',
                  fontSize: '10px',
                  fontWeight: 800,
                  padding: '3px 10px',
                  borderRadius: '100px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <ShieldCheck size={12} /> AICTE ID: {institution.id}
                </span>
                <span style={{
                  background: 'rgba(245, 158, 11, 0.16)',
                  color: '#fbbf24',
                  border: '1px solid rgba(245, 158, 11, 0.35)',
                  fontSize: '10px',
                  fontWeight: 800,
                  padding: '3px 10px',
                  borderRadius: '100px'
                }}>
                  NAAC A++ (CGPA 3.68)
                </span>
                <span style={{
                  background: 'rgba(56, 189, 248, 0.16)',
                  color: '#38bdf8',
                  border: '1px solid rgba(56, 189, 248, 0.35)',
                  fontSize: '10px',
                  fontWeight: 800,
                  padding: '3px 10px',
                  borderRadius: '100px'
                }}>
                  Tier-1 Autonomous
                </span>
              </div>

              {/* Institution Title */}
              <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#f8fafc', margin: 0, letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                {institution.displayName}
              </h1>

              {/* Location & Masked Telemetry */}
              <div style={{ fontSize: '13px', color: '#94a3b8', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <span style={{ color: '#cbd5e1', fontWeight: 600 }}>{institution.city}, {institution.state}</span>
                <span style={{ color: 'rgba(255,255,255,0.2)' }}>•</span>
                <span>Est. {institution.establishedYear}</span>
                <span style={{ color: 'rgba(255,255,255,0.2)' }}>•</span>
                <span style={{ color: '#fbbf24', fontWeight: 600 }}>Contact: {institution.contactsMasked}</span>
                <span style={{ color: 'rgba(255,255,255,0.2)' }}>•</span>
                <span style={{ color: '#a7f3d0' }}>Western Regional Circle</span>
              </div>
            </div>
          </div>

          {/* Compliance Readiness Circular Ring Badge */}
          <div style={{
            background: 'rgba(15, 34, 29, 0.85)',
            border: '1.5px solid rgba(212, 160, 52, 0.35)',
            borderRadius: '16px',
            padding: '16px 22px',
            display: 'flex',
            alignItems: 'center',
            gap: '18px',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)',
            backdropFilter: 'blur(10px)'
          }}>
            {/* Circular Gauge */}
            <div style={{ position: 'relative', width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="60" height="60" viewBox="0 0 60 60" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="30" cy="30" r="24" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="6" fill="none" />
                <circle
                  cx="30"
                  cy="30"
                  r="24"
                  stroke="#fbbf24"
                  strokeWidth="6"
                  strokeDasharray="150"
                  strokeDashoffset="18"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
              <div style={{ position: 'absolute', fontSize: '13px', fontWeight: 900, color: '#fbbf24' }}>
                88%
              </div>
            </div>

            <div>
              <div style={{ fontSize: '10px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Preflight Readiness
              </div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: '#ffffff', marginTop: '2px' }}>
                1 Attention Item
              </div>
              <div style={{ fontSize: '11px', color: '#f87171', fontWeight: 600, marginTop: '3px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <AlertTriangle size={12} color="#f87171" /> Fire NOC renewal needed
              </div>
            </div>
          </div>
        </div>

        {/* 4 Interactive Fast Metric Cards */}
        <div style={{
          marginTop: '22px',
          paddingTop: '18px',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '14px'
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '12px',
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            backdropFilter: 'blur(6px)'
          }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FileCheck2 size={20} color="#34d399" />
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: '#f8fafc' }}>4 Filings Active</div>
              <div style={{ fontSize: '11px', color: '#94a3b8' }}>2 In-Flight Approval Cycles</div>
            </div>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '12px',
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            backdropFilter: 'blur(6px)'
          }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(245, 158, 11, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShieldCheck size={20} color="#fbbf24" />
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: '#f8fafc' }}>7 Documents</div>
              <div style={{ fontSize: '11px', color: '#94a3b8' }}>SHA-256 Vault Anchored</div>
            </div>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(239, 68, 68, 0.25)',
            borderRadius: '12px',
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            backdropFilter: 'blur(6px)'
          }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(239, 68, 68, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <AlertTriangle size={20} color="#f87171" />
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: '#fca5a5' }}>1 Stale Alert</div>
              <div style={{ fontSize: '11px', color: '#f87171', fontWeight: 600 }}>Fire Clearance Expiring</div>
            </div>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '12px',
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            backdropFilter: 'blur(6px)'
          }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(99, 102, 241, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Calendar size={20} color="#818cf8" />
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: '#f8fafc' }}>18 Days Left</div>
              <div style={{ fontSize: '11px', color: '#94a3b8' }}>AY 2026-27 Window</div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. SUB-PORTAL WORKFLOW TABS */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        background: '#ffffff',
        padding: '8px 12px',
        borderRadius: '14px',
        border: '1px solid #e2ece9',
        boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
      }}>
        {[
          { id: 'PREFLIGHT', label: 'Pre-Submission Preflight Studio', icon: UploadCloud, badge: 'FR-21' },
          { id: 'CARRY_FORWARD', label: 'Smart Safe Carry-Forward Assistant', icon: RefreshCw, badge: `${confirmedCount} Ready` },
          { id: 'DOSSIER', label: 'Immutable Evidence Vault', icon: FileText, count: uploadedFiles.length },
          { id: 'QUERIES', label: 'Scrutiny Officer Clarification Desk', icon: Send, badge: '1 Query' }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '9px 18px',
                borderRadius: '10px',
                border: isActive ? '1px solid #166534' : '1px solid transparent',
                background: isActive ? '#14532d' : 'transparent',
                color: isActive ? '#ffffff' : '#475569',
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: '13px',
                transition: 'all 0.18s ease',
                boxShadow: isActive ? '0 4px 12px rgba(20, 83, 45, 0.25)' : 'none'
              }}
            >
              <Icon size={15} color={isActive ? '#fbbf24' : '#64748b'} />
              <span>{tab.label}</span>
              {tab.badge && (
                <span style={{
                  background: isActive ? 'rgba(251, 191, 36, 0.25)' : '#f1f5f9',
                  color: isActive ? '#fbbf24' : '#475569',
                  padding: '2px 7px',
                  borderRadius: '100px',
                  fontSize: '10px',
                  fontWeight: 800
                }}>
                  {tab.badge}
                </span>
              )}
              {tab.count !== undefined && (
                <span style={{
                  background: isActive ? 'rgba(255, 255, 255, 0.2)' : '#f1f5f9',
                  color: isActive ? '#ffffff' : '#64748b',
                  padding: '2px 7px',
                  borderRadius: '100px',
                  fontSize: '10px',
                  fontWeight: 800
                }}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* 3. TAB CONTENT */}

      {/* TAB 1: PRE-SUBMISSION PREFLIGHT STUDIO */}
      {activeTab === 'PREFLIGHT' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: '24px' }}>
          {/* Left Column: Category, Dropzone, and File Queue */}
          <div style={{
            background: '#ffffff',
            border: '1.5px solid #dbe5e2',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: '#dcfce7',
                  color: '#16a34a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <UploadCloud size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                    Preflight Intake & Upload Diagnostic Engine
                  </h3>
                  <p style={{ fontSize: '11px', color: '#64748b', margin: '2px 0 0 0' }}>
                    Simulates automated AICTE scrutiny checks against draft uploads before formal submission.
                  </p>
                </div>
              </div>
              <span style={{
                background: '#e0f2fe',
                color: '#0284c7',
                border: '1px solid #bae6fd',
                borderRadius: '100px',
                fontSize: '10px',
                fontWeight: 800,
                padding: '3px 10px'
              }}>
                Zero-Rejection
              </span>
            </div>

            {/* Category & Academic Year Selectors */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '11px', fontWeight: 800, color: '#475569', display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>
                  Filing Category
                </label>
                <select
                  className="select-control"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  style={{ width: '100%', fontSize: '12px', padding: '9px 12px', borderRadius: '10px', border: '1px solid #cbd5e1' }}
                >
                  <option value="DEMO_EOA">Extension of Approval (EoA)</option>
                  <option value="NEW_PROGRAM">New Technical Department / Program</option>
                  <option value="INTAKE_VARIATION">Variation in Sanctioned Student Intake</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '11px', fontWeight: 800, color: '#475569', display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>
                  Cycle Academic Year
                </label>
                <select
                  className="select-control"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  style={{ width: '100%', fontSize: '12px', padding: '9px 12px', borderRadius: '10px', border: '1px solid #cbd5e1' }}
                >
                  <option value="2026-27">Academic Year 2026-27 (Upcoming)</option>
                  <option value="2027-28">Academic Year 2027-28</option>
                </select>
              </div>
            </div>

            {/* Interactive Drag & Drop Box */}
            <div
              style={{
                border: '2px dashed #059669',
                borderRadius: '16px',
                textAlign: 'center',
                background: 'radial-gradient(100% 100% at 50% 0%, #f0fdf4 0%, #ffffff 100%)',
                cursor: 'pointer',
                padding: '32px 20px',
                transition: 'all 0.2s ease',
                position: 'relative'
              }}
              onClick={handleSimulateUpload}
            >
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: '14px',
                background: '#dcfce7',
                border: '1px solid #bbf7d0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 12px',
                color: '#15803d',
                boxShadow: '0 4px 12px rgba(22, 163, 74, 0.15)'
              }}>
                <UploadCloud size={28} />
              </div>
              <div style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a' }}>
                Drag & Drop PDF or Scanned Evidence Dossier
              </div>
              <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
                Accepts PDF, JPG, PNG (Max 25 MB). Instant Magic Byte Verification & SHA-256 Digest Computation.
              </div>

              {/* Supported format tags */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '12px' }}>
                {['Municipal Land Deeds', 'PMC Fire NOC', 'Faculty Cadre Roster', 'Building Stability'].map((tag) => (
                  <span key={tag} style={{
                    background: '#f1f5f9',
                    color: '#475569',
                    fontSize: '10px',
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: '6px'
                  }}>
                    {tag}
                  </span>
                ))}
              </div>

              {uploadProgress !== null && (
                <div style={{ marginTop: '18px', maxWidth: '360px', margin: '18px auto 0' }}>
                  <div style={{
                    height: '8px',
                    background: '#e2e8f0',
                    borderRadius: '4px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      height: '100%',
                      width: `${uploadProgress}%`,
                      background: 'linear-gradient(90deg, #10b981 0%, #059669 100%)',
                      transition: 'width 0.2s ease'
                    }} />
                  </div>
                  <div style={{ fontSize: '11px', color: '#15803d', fontWeight: 800, marginTop: '6px' }}>
                    {uploadProgress === 100 ? 'Verification and SHA-256 Digest Successfully Computed' : `Scanning magic bytes: ${uploadProgress}%`}
                  </div>
                </div>
              )}
            </div>

            {/* Run Diagnostic CTA */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '4px' }}>
              <span style={{ fontSize: '12px', color: '#64748b' }}>
                <strong>3 Draft documents</strong> staged for pre-submission checks
              </span>
              <button
                onClick={handleRunDiagnosticScan}
                disabled={isScanning}
                style={{
                  background: 'linear-gradient(135deg, #15803d 0%, #166534 100%)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '10px 20px',
                  fontWeight: 800,
                  fontSize: '12px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: isScanning ? 'not-allowed' : 'pointer',
                  boxShadow: '0 4px 14px rgba(22, 101, 52, 0.3)'
                }}
              >
                {isScanning ? (
                  <>
                    <RefreshCw size={14} className="spin" />
                    <span>Scanning Regulatory Norms...</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={14} color="#fbbf24" />
                    <span>Run AICTE Preflight Diagnostics</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column: Preflight Diagnostic Radar & Fix Suggestions */}
          <div style={{
            background: '#ffffff',
            border: '1.5px solid #dbe5e2',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: '#fef3c7',
                  color: '#d97706',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Sparkles size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                    Preflight Diagnostic Report Card
                  </h3>
                  <p style={{ fontSize: '11px', color: '#64748b', margin: '2px 0 0 0' }}>
                    Instant clearance telemetry against mandatory APH guidelines.
                  </p>
                </div>
              </div>
              <span style={{
                background: '#fee2e2',
                color: '#b91c1c',
                border: '1px solid #fca5a5',
                borderRadius: '100px',
                fontSize: '10px',
                fontWeight: 800,
                padding: '3px 10px'
              }}>
                1 Preventable Defect
              </span>
            </div>

            {/* 4 Categorized Diagnostic Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {/* Check 1: Land Title Norms */}
              <div style={{
                background: '#f0fdf4',
                border: '1px solid #bbf7d0',
                borderRadius: '12px',
                padding: '14px 16px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px'
              }}>
                <CheckCircle2 size={20} color="#16a34a" style={{ marginTop: '2px', flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <strong style={{ fontSize: '13px', color: '#0f172a' }}>
                      Contiguous Land Ownership Norm
                    </strong>
                    <span style={{ background: '#dcfce7', color: '#15803d', fontWeight: 800, fontSize: '9px', padding: '2px 8px', borderRadius: '4px' }}>
                      COMPLIANT
                    </span>
                  </div>
                  <p style={{ fontSize: '11px', color: '#475569', marginTop: '4px', margin: 0, lineHeight: 1.5 }}>
                    5.20 Acres registered title matches revenue circle records. Meets minimum rural/semi-urban AICTE acreage requirement (5.0 Acres).
                  </p>
                </div>
              </div>

              {/* Check 2: Faculty Cadre Ratio */}
              <div style={{
                background: '#f0fdf4',
                border: '1px solid #bbf7d0',
                borderRadius: '12px',
                padding: '14px 16px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px'
              }}>
                <CheckCircle2 size={20} color="#16a34a" style={{ marginTop: '2px', flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <strong style={{ fontSize: '13px', color: '#0f172a' }}>
                      Faculty-to-Student Ratio (1:15)
                    </strong>
                    <span style={{ background: '#dcfce7', color: '#15803d', fontWeight: 800, fontSize: '9px', padding: '2px 8px', borderRadius: '4px' }}>
                      COMPLIANT
                    </span>
                  </div>
                  <p style={{ fontSize: '11px', color: '#475569', marginTop: '4px', margin: 0, lineHeight: 1.5 }}>
                    42 Approved regular teaching faculty declared for 600 sanctioned UG capacity. Ratio = 1:14.28 (Satisfies Section 7.1).
                  </p>
                </div>
              </div>

              {/* Check 3: Fire Safety NOC (CRITICAL ACTION) */}
              <div style={{
                background: '#fff1f2',
                border: '1.5px solid #fecdd3',
                borderRadius: '12px',
                padding: '14px 16px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px'
              }}>
                <AlertTriangle size={20} color="#e11d48" style={{ marginTop: '2px', flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <strong style={{ fontSize: '13px', color: '#9f1239' }}>
                      Fire Safety Clearance Validity
                    </strong>
                    <span style={{ background: '#ffe4e6', color: '#be123c', fontWeight: 800, fontSize: '9px', padding: '2px 8px', borderRadius: '4px' }}>
                      ACTION REQUIRED
                    </span>
                  </div>
                  <p style={{ fontSize: '11px', color: '#881337', marginTop: '4px', margin: 0, lineHeight: 1.5 }}>
                    <strong>Deficiency:</strong> PMC Certificate expires 31-03-2026. Academic term commences 15-07-2026. Scrutiny board requires renewed certificate or official municipal renewal receipt.
                  </p>
                  <div style={{ marginTop: '10px' }}>
                    <button
                      onClick={handleSimulateUpload}
                      style={{
                        fontSize: '11px',
                        padding: '6px 14px',
                        background: 'linear-gradient(135deg, #e11d48 0%, #be123c 100%)',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '8px',
                        fontWeight: 800,
                        cursor: 'pointer',
                        boxShadow: '0 2px 8px rgba(225, 29, 72, 0.3)'
                      }}
                    >
                      Upload Renewed Fire Undertaking
                    </button>
                  </div>
                </div>
              </div>

              {/* Check 4: Structural Stability Certificate */}
              <div style={{
                background: '#fffbeb',
                border: '1px solid #fde68a',
                borderRadius: '12px',
                padding: '14px 16px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px'
              }}>
                <Clock size={20} color="#d97706" style={{ marginTop: '2px', flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <strong style={{ fontSize: '13px', color: '#0f172a' }}>
                      Structural Stability Undertaking
                    </strong>
                    <span style={{ background: '#fef3c7', color: '#92400e', fontWeight: 800, fontSize: '9px', padding: '2px 8px', borderRadius: '4px' }}>
                      VALID TILL 2028
                    </span>
                  </div>
                  <p style={{ fontSize: '11px', color: '#475569', marginTop: '4px', margin: 0, lineHeight: 1.5 }}>
                    Certified by Empanelled Municipal Structural Engineer. 5-year periodic cycle remaining.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SMART SAFE CARRY-FORWARD ASSISTANT (FLOATING CARDS) */}
      {activeTab === 'CARRY_FORWARD' && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '28px',
          padding: '8px 0 24px 0'
        }}>
          {/* Header Row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '4px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: '#dcfce7',
                  color: '#16a34a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 6px rgba(22, 163, 74, 0.15)'
                }}>
                  <RefreshCw size={20} />
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: 0, letterSpacing: '-0.01em' }}>
                  Safe Next-Application Carry-Forward Assistant
                </h3>
              </div>
              <p style={{ fontSize: '12px', color: '#64748b', marginTop: '6px', margin: 0 }}>
                {t.carryForwardNotice} Safe carry-forward prevents silent propagation of expired certificates or disputed data. Each attribute must be explicitly re-confirmed.
              </p>
            </div>

            <div style={{
              background: '#f0fdf4',
              border: '1.5px solid #86efac',
              borderRadius: '100px',
              padding: '8px 18px',
              fontSize: '12px',
              fontWeight: 800,
              color: '#15803d',
              boxShadow: '0 2px 8px rgba(22, 101, 52, 0.08)'
            }}>
              {confirmedCount} of {carryForwardItems.length} Attributes Ready for AY 2026-27
            </div>
          </div>

          {/* Floating Cards Grid with Generous Spacing */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '24px' }}>
            {carryForwardItems.map((item, idx) => (
              <div
                key={item.key}
                style={{
                  background: item.blocked ? '#ffffff' : item.confirmed ? '#ffffff' : '#ffffff',
                  border: '1.5px solid',
                  borderColor: item.blocked
                    ? '#fca5a5'
                    : item.confirmed
                      ? '#86efac'
                      : '#cbd5e1',
                  borderRadius: '16px',
                  padding: '22px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                  boxShadow: item.blocked
                    ? '0 8px 24px rgba(239, 68, 68, 0.08)'
                    : item.confirmed
                      ? '0 8px 24px rgba(16, 185, 129, 0.09)'
                      : '0 6px 18px rgba(0, 0, 0, 0.04)',
                  transition: 'all 0.22s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '10px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    {item.category}
                  </span>
                  <span style={{
                    fontSize: '10px',
                    fontWeight: 800,
                    padding: '3px 10px',
                    borderRadius: '100px',
                    background: item.blocked ? '#fee2e2' : item.confirmed ? '#dcfce7' : '#f1f5f9',
                    color: item.blocked ? '#b91c1c' : item.confirmed ? '#15803d' : '#475569',
                    border: item.blocked ? '1px solid #fca5a5' : item.confirmed ? '1px solid #86efac' : 'none'
                  }}>
                    {item.badge}
                  </span>
                </div>

                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', margin: 0, lineHeight: 1.3 }}>
                    {item.label}
                  </h4>
                  <div style={{ fontSize: '12px', color: '#334155', marginTop: '6px' }}>
                    Verified Record: <code style={{ background: '#f1f5f9', padding: '3px 8px', borderRadius: '6px', border: '1px solid #e2e8f0', color: '#0f172a' }}>{item.value}</code>
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px' }}>
                    Provenance: {item.source}
                  </div>
                </div>

                {item.blocked && (
                  <div style={{
                    background: '#fef2f2',
                    borderLeft: '3.5px solid #ef4444',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    fontSize: '11px',
                    color: '#991b1b',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <Lock size={14} color="#dc2626" />
                    <span style={{ fontWeight: 600 }}>Protected Safeguard: Cannot propagate un-renewed municipal document.</span>
                  </div>
                )}

                <div style={{ marginTop: 'auto', paddingTop: '12px', borderTop: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '11px', color: item.blocked ? '#dc2626' : item.confirmed ? '#15803d' : '#64748b', fontWeight: item.confirmed || item.blocked ? 700 : 500 }}>
                    {item.blocked ? 'Requires Fresh Upload' : item.confirmed ? 'Confirmed for AY 2026-27' : 'Pending Confirmation'}
                  </span>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: item.blocked ? 'not-allowed' : 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={item.confirmed}
                      onChange={() => toggleCarryForward(idx)}
                      disabled={item.blocked}
                      style={{ width: '16px', height: '16px', accentColor: '#16a34a', cursor: item.blocked ? 'not-allowed' : 'pointer' }}
                    />
                    <span style={{ fontSize: '12px', fontWeight: 700, color: item.blocked ? '#94a3b8' : '#0f172a' }}>
                      Confirm Field
                    </span>
                  </label>
                </div>
              </div>
            ))}
          </div>

          {/* Floating Action Row */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 20px',
            background: '#ffffff',
            borderRadius: '14px',
            border: '1px solid #e2ece9',
            boxShadow: '0 4px 14px rgba(0, 0, 0, 0.03)'
          }}>
            <span style={{ fontSize: '12px', color: '#64748b' }}>
              Audit Log Record: <code>AUD-CARRY-FWD-2026</code> will record applicant confirmation timestamp.
            </span>
            <button
              onClick={() => {
                alert(`Successfully carried forward ${confirmedCount} verified institutional attributes to AY 2026-27 filing draft.`);
              }}
              style={{
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                color: '#071f1a',
                border: 'none',
                borderRadius: '10px',
                fontWeight: 800,
                padding: '10px 22px',
                fontSize: '13px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(217, 119, 6, 0.3)'
              }}
            >
              <span>Apply {confirmedCount} Confirmed Fields to 2026-27 Draft</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* TAB 3: IMMUTABLE EVIDENCE VAULT */}
      {activeTab === 'DOSSIER' && (
        <div style={{
          background: '#ffffff',
          border: '1.5px solid #dbe5e2',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
          display: 'flex',
          flexDirection: 'column',
          gap: '18px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: '#e0f2fe',
                color: '#0284c7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <FileText size={20} />
              </div>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                  Immutable Evidence Dossier & Cryptographic Verification Vault
                </h3>
                <p style={{ fontSize: '11px', color: '#64748b', margin: '2px 0 0 0' }}>
                  All submitted records are SHA-256 anchored with verifiable timestamp hashes.
                </p>
              </div>
            </div>
            <span style={{
              background: '#dcfce7',
              color: '#15803d',
              border: '1px solid #86efac',
              borderRadius: '100px',
              fontSize: '10px',
              fontWeight: 800,
              padding: '3px 10px'
            }}>
              Tamper-Evident Storage
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
            {uploadedFiles.map(file => (
              <div
                key={file.id}
                style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '14px',
                  padding: '18px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ background: '#e0f2fe', color: '#0369a1', fontSize: '10px', fontWeight: 800, padding: '2px 8px', borderRadius: '4px' }}>{file.type}</span>
                  <span style={{
                    fontSize: '10px',
                    fontWeight: 800,
                    padding: '2px 8px',
                    borderRadius: '4px',
                    background: file.status === 'VERIFIED' ? '#dcfce7' : '#fef3c7',
                    color: file.status === 'VERIFIED' ? '#15803d' : '#92400e'
                  }}>
                    {file.status}
                  </span>
                </div>
                <h4 style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                  {file.title}
                </h4>
                <div style={{ fontSize: '11px', color: '#64748b' }}>
                  Size: {file.size} • Uploaded: {file.date}
                </div>
                <div style={{ fontSize: '10px', color: '#475569', fontFamily: 'monospace', wordBreak: 'break-all', background: '#e2e8f0', padding: '8px', borderRadius: '6px' }}>
                  SHA-256: {file.sha256}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: REVIEWER CLARIFICATION DESK (CUTE, CENTERED CARD) */}
      {activeTab === 'QUERIES' && (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '10px 0 20px 0' }}>
          <div style={{
            maxWidth: '680px',
            width: '100%',
            background: '#ffffff',
            borderRadius: '20px',
            border: '1.5px solid #dbe5e2',
            boxShadow: '0 12px 36px rgba(0, 0, 0, 0.06)',
            padding: '28px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            position: 'relative'
          }}>
            {/* Header with Cute Badge */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                  border: '1px solid #fcd34d',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#b45309',
                  boxShadow: '0 4px 10px rgba(245, 158, 11, 0.15)'
                }}>
                  <Send size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                    Scrutiny Committee Clarification Desk
                  </h3>
                  <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
                    Direct communication desk with authorized scrutiny panel
                  </div>
                </div>
              </div>

              <span style={{
                background: '#fef3c7',
                color: '#92400e',
                border: '1px solid #fde68a',
                fontSize: '11px',
                fontWeight: 800,
                padding: '4px 12px',
                borderRadius: '100px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <Clock size={12} /> 1 Pending Query
              </span>
            </div>

            {/* Active Notice Card */}
            <div style={{
              background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
              border: '1.5px solid #fcd34d',
              borderRadius: '14px',
              padding: '18px 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              boxShadow: '0 2px 8px rgba(245, 158, 11, 0.08)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                <div>
                  <strong style={{ fontSize: '14px', color: '#92400e', fontWeight: 800 }}>
                    REF-REV-402: Fire NOC Municipal Renewal Undertaking
                  </strong>
                  <div style={{ fontSize: '11px', color: '#b45309', marginTop: '3px', fontWeight: 600 }}>
                    Scrutiny Officer: Dr. S. K. Raman • Western Region Board
                  </div>
                </div>
                <span style={{
                  background: '#fef2f2',
                  color: '#b91c1c',
                  border: '1px solid #fca5a5',
                  fontSize: '10px',
                  fontWeight: 800,
                  padding: '3px 10px',
                  borderRadius: '100px'
                }}>
                  7 Days Left
                </span>
              </div>

              <p style={{ fontSize: '12px', color: '#78350f', lineHeight: 1.6, margin: 0, background: 'rgba(255, 255, 255, 0.6)', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
                "The Scrutiny Committee observed that Municipal Fire NOC validity terminates on 31-03-2026. Please upload either the renewed certificate issued by Pune Municipal Corporation or an official municipal payment challan / undertaking receipt to proceed to final decision recording."
              </p>
            </div>

            {/* Response Form */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <label style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span>Registrar Official Clarification Statement:</span>
                <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 500 }}>Audit timestamped</span>
              </label>

              <textarea
                rows={3}
                placeholder="E.g., Municipal renewal inspection completed on 14th Oct; official payment receipt and verification challan attached..."
                value={queryResponse}
                onChange={(e) => setQueryResponse(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  border: '1.5px solid #cbd5e1',
                  fontSize: '12px',
                  fontFamily: 'inherit',
                  resize: 'vertical',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
              />

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '4px' }}>
                <button
                  onClick={handleSimulateUpload}
                  style={{
                    background: '#f1f5f9',
                    color: '#0f172a',
                    border: '1px solid #cbd5e1',
                    borderRadius: '10px',
                    padding: '8px 14px',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <UploadCloud size={14} color="#059669" /> Attach Municipal Receipt PDF
                </button>
                <button
                  onClick={() => {
                    setIsResponseSent(true);
                    alert('Clarification response submitted to Scrutiny Officer Dr. S. K. Raman with audit log timestamp.');
                  }}
                  disabled={!queryResponse.trim() || isResponseSent}
                  style={{
                    background: isResponseSent
                      ? '#16a34a'
                      : !queryResponse.trim()
                        ? '#cbd5e1'
                        : 'linear-gradient(135deg, #15803d 0%, #166534 100%)',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '8px 18px',
                    fontSize: '12px',
                    fontWeight: 800,
                    cursor: !queryResponse.trim() || isResponseSent ? 'not-allowed' : 'pointer',
                    boxShadow: queryResponse.trim() && !isResponseSent ? '0 4px 14px rgba(22, 101, 52, 0.3)' : 'none'
                  }}
                >
                  {isResponseSent ? 'Response Submitted' : 'Submit Official Response'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ApplicantPortalView;
