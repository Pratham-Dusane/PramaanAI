import React, { useState } from 'react';
import { 
  UploadCloud, 
  CheckCircle, 
  AlertTriangle, 
  FileText, 
  ArrowRight, 
  RefreshCw, 
  HelpCircle, 
  ShieldCheck 
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
  const [selectedCategory, setSelectedCategory] = useState('DEMO_EOA');
  const [selectedYear, setSelectedYear] = useState('2026-27');
  const [preflightRun, setPreflightRun] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [carryForwardItems, setCarryForwardItems] = useState([
    { key: 'land_area', label: 'Continuous Land Ownership (5.2 Acres)', value: '5.2 Acres (Survey 42/1)', confirmed: true, source: '2025-26 Reviewer Confirmed' },
    { key: 'principal_name', label: 'Principal / Director Name', value: 'Dr. Anand M. Deshmukh', confirmed: true, source: '2025-26 Verified' },
    { key: 'fire_safety_noc', label: 'Fire Safety NOC (Expired: 31-03-2026)', value: '31-03-2026', confirmed: false, source: 'Stale / Needs New Upload', blocked: true }
  ]);

  const handleSimulateUpload = () => {
    setUploadProgress(10);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev === null || prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 30;
      });
    }, 250);
  };

  const toggleCarryForward = (index: number) => {
    if (carryForwardItems[index].blocked) return;
    setCarryForwardItems((prev) => 
      prev.map((item, i) => i === index ? { ...item, confirmed: !item.confirmed } : item)
    );
  };

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Institution Banner */}
      <div className="glass-panel" style={{ padding: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <span className="badge badge-info" style={{ marginBottom: '6px' }}>APPLICANT / INSTITUTION SCOPE</span>
            <h2 style={{ fontSize: '18px', fontWeight: 800 }}>{institution.displayName}</h2>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
              Location: {institution.city}, {institution.state} • Established {institution.establishedYear} • Contact: {institution.contactsMasked}
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span className="badge badge-pass">Accreditation Tier-2 Eligible</span>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Module 1: Pre-Submission Preflight Wizard */}
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div className="panel-header" style={{ marginBottom: 0 }}>
            <div className="panel-title">
              <UploadCloud size={18} color="var(--primary-500)" />
              <span>{t.preflightCheck} (FR-21)</span>
            </div>
          </div>

          <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
            Run the automated preflight validator against draft evidence before submitting. Preventable omissions and expired certificates are surfaced early to reduce scrutiny turnaround time.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                APPLICATION CATEGORY
              </label>
              <select 
                className="select-control"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="DEMO_EOA">Extension of Approval (EoA)</option>
                <option value="NEW_PROGRAM">New Technical Program / Department</option>
                <option value="INTAKE_VARIATION">Variation in Sanctioned Intake</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                TARGET ACADEMIC YEAR
              </label>
              <select 
                className="select-control"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                <option value="2026-27">Academic Year 2026-27</option>
                <option value="2027-28">Academic Year 2027-28</option>
              </select>
            </div>
          </div>

          {/* Drag & Drop File Upload Area */}
          <div style={{
            border: '2px dashed var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
            padding: '24px',
            textAlign: 'center',
            background: 'rgba(255, 255, 255, 0.01)',
            cursor: 'pointer'
          }}
          onClick={handleSimulateUpload}
          >
            <UploadCloud size={32} color="var(--primary-500)" style={{ margin: '0 auto 8px' }} />
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#fff' }}>
              Drag & Drop PDF or Image Evidence Dossier
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
              Accepts PDF, JPG, PNG (Max 25 MB). Server verifies magic bytes and computes SHA-256 digest upon intake.
            </div>

            {uploadProgress !== null && (
              <div style={{ marginTop: '14px' }}>
                <div style={{ 
                  height: '6px', 
                  background: 'var(--bg-surface-elevated)', 
                  borderRadius: '3px',
                  overflow: 'hidden'
                }}>
                  <div style={{ 
                    height: '100%', 
                    width: `${uploadProgress}%`, 
                    background: 'var(--primary-500)',
                    transition: 'width 0.2s'
                  }} />
                </div>
                <div style={{ fontSize: '10px', color: 'var(--accent-cyan)', marginTop: '4px' }}>
                  {uploadProgress === 100 ? '✓ Verification & SHA-256 Digest Computed' : `Uploading & Scanning: ${uploadProgress}%`}
                </div>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button 
              className="btn btn-primary"
              onClick={() => setPreflightRun(true)}
            >
              Run Instant Preflight Validation
            </button>
          </div>

          {/* Preflight Report Card */}
          {preflightRun && (
            <div style={{
              background: 'var(--bg-surface-elevated)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '14px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <strong style={{ fontSize: '13px', color: '#fff' }}>Preflight Diagnostic Summary</strong>
                <span className="badge badge-review">1 Preventable Omission Detected</span>
              </div>

              <div style={{ fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-emerald)' }}>
                  <CheckCircle size={14} /> Land ownership deed is complete and matches survey records.
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-emerald)' }}>
                  <CheckCircle size={14} /> Structural stability certificate is within valid 5-year window.
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-rose)' }}>
                  <AlertTriangle size={14} /> <strong>Warning:</strong> Fire NOC validity date (31-03-2026) will expire prior to academic term start.
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Module 2: Next-Application Carry-Forward Assistant */}
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div className="panel-header" style={{ marginBottom: 0 }}>
            <div className="panel-title">
              <RefreshCw size={18} color="var(--primary-500)" />
              <span>{t.nextApplicationAssist} (FR-21)</span>
            </div>
          </div>

          <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
            {t.carryForwardNotice} Safe carry-forward prevents silent propagation of expired or disputed fields. Every field requires applicant confirmation.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {carryForwardItems.map((item, idx) => (
              <div 
                key={item.key}
                style={{
                  background: item.blocked ? 'rgba(244, 63, 94, 0.08)' : 'var(--bg-surface-elevated)',
                  border: '1px solid',
                  borderColor: item.blocked ? 'rgba(244, 63, 94, 0.3)' : 'var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <h4 style={{ fontSize: '13px', fontWeight: 600, color: '#fff' }}>{item.label}</h4>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    Value: <code>{item.value}</code> • Provenance: {item.source}
                  </div>
                  {item.blocked && (
                    <div style={{ fontSize: '10px', color: 'var(--accent-rose)', fontWeight: 600, marginTop: '4px' }}>
                      🚫 Blocked from carry-forward: Certificate must be renewed.
                    </div>
                  )}
                </div>

                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: item.blocked ? 'not-allowed' : 'pointer' }}>
                  <input 
                    type="checkbox"
                    checked={item.confirmed}
                    onChange={() => toggleCarryForward(idx)}
                    disabled={item.blocked}
                  />
                  <span style={{ fontSize: '11px', color: item.blocked ? 'var(--text-muted)' : 'var(--text-main)' }}>
                    Confirm Field
                  </span>
                </label>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 'auto', paddingTop: '10px', display: 'flex', justifyContent: 'flex-end' }}>
            <button className="btn btn-primary btn-sm">
              Apply 2 Confirmed Fields to 2026-27 Draft <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
