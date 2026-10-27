import React, { useState } from 'react';
import { 
  Building2, 
  AlertTriangle, 
  CheckCircle2, 
  FileText, 
  Camera, 
  Plus, 
  Check, 
  Compass, 
  MapPin, 
  Layers, 
  Maximize2, 
  Sliders,
  ShieldCheck,
  TrendingUp,
  FileCheck2
} from 'lucide-react';

export const InfrastructureView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'SPATIAL' | 'NORMS' | 'GEOPHOTOS'>('SPATIAL');
  const [inspectorNotes, setInspectorNotes] = useState('');
  const [submittedNotes, setSubmittedNotes] = useState<string[]>([
    'Physical visit required for Classroom C-204 to reconcile blueprint 54 sq.m. label with declared 66 sq.m. carpet area.'
  ]);

  const handleAddNote = () => {
    if (!inspectorNotes.trim()) return;
    setSubmittedNotes((prev) => [...prev, inspectorNotes]);
    setInspectorNotes('');
  };

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '1440px', margin: '0 auto', width: '100%' }}>
      
      {/* 1. LUMINOUS LIGHT EXECUTIVE HEADER */}
      <div 
        style={{ 
          background: '#ffffff',
          borderRadius: '16px',
          padding: '24px 28px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
          position: 'relative'
        }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '24px', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{
                background: '#ecfdf5',
                border: '1px solid #a7f3d0',
                color: '#065f46',
                fontSize: '10px',
                fontWeight: 800,
                padding: '3px 10px',
                borderRadius: '100px',
                letterSpacing: '0.06em',
                textTransform: 'uppercase'
              }}>
                SPATIAL VERIFICATION ENGINE
              </span>
              <span style={{
                background: '#fef3c7',
                border: '1px solid #fde68a',
                color: '#92400e',
                fontSize: '10px',
                fontWeight: 700,
                padding: '3px 8px',
                borderRadius: '6px'
              }}>
                AICTE HANDBOOK NORMS
              </span>
            </div>

            <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', margin: '0 0 6px 0', letterSpacing: '-0.02em' }}>
              Infrastructure Evidence & Spatial Blueprint Compliance Hub
            </h1>

            <p style={{ fontSize: '13px', color: '#64748b', margin: 0, maxWidth: '760px', lineHeight: 1.5 }}>
              Assists scrutiny officers and Expert Visit Committee (EVC) teams by reconciling applicant declarations against architect-certified CAD drawings, municipal approvals, and geo-tagged photographic evidence.
            </p>
          </div>

          <div style={{
            background: '#f8fafc',
            borderRadius: '12px',
            padding: '12px 16px',
            border: '1px solid #e2e8f0',
            maxWidth: '280px',
            fontSize: '11px',
            color: '#475569',
            lineHeight: 1.4
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#047857', fontWeight: 700, marginBottom: '3px' }}>
              <ShieldCheck size={14} />
              <span>Inspection Protocol</span>
            </div>
            AI extracts dimension labels from drawings; physical verification remains authoritative for all disputed partitions.
          </div>
        </div>

        {/* 4 Light Summary Stat Badges */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '12px', 
          marginTop: '20px', 
          paddingTop: '18px', 
          borderTop: '1px solid #f1f5f9' 
        }}>
          <div style={{ background: '#f8fafc', borderRadius: '10px', padding: '12px 14px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '10px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 700 }}>
              CONTINUOUS CAMPUS LAND
            </div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#047857', marginTop: '2px' }}>
              14.50 Acres
            </div>
            <div style={{ fontSize: '10px', color: '#64748b', marginTop: '2px' }}>
              Norm: 7.50 Acres min. (+93% surplus)
            </div>
          </div>

          <div style={{ background: '#f8fafc', borderRadius: '10px', padding: '12px 14px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '10px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 700 }}>
              TOTAL BUILT-UP AREA
            </div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#0284c7', marginTop: '2px' }}>
              14,850 sq.m.
            </div>
            <div style={{ fontSize: '10px', color: '#64748b', marginTop: '2px' }}>
              Norm: 10,000 sq.m. (+48.5% margin)
            </div>
          </div>

          <div style={{ background: '#f8fafc', borderRadius: '10px', padding: '12px 14px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '10px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 700 }}>
              CLASSROOMS & LAB UNITS
            </div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#b45309', marginTop: '2px' }}>
              68 Rooms / 36 Labs
            </div>
            <div style={{ fontSize: '10px', color: '#64748b', marginTop: '2px' }}>
              100% Barrier-free ramp accessible
            </div>
          </div>

          <div style={{ background: '#f8fafc', borderRadius: '10px', padding: '12px 14px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '10px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 700 }}>
              BLUEPRINT DISCREPANCIES
            </div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#e11d48', marginTop: '2px' }}>
              1 Dimension Cue
            </div>
            <div style={{ fontSize: '10px', color: '#64748b', marginTop: '2px' }}>
              Classroom C-204 carpet area check
            </div>
          </div>
        </div>
      </div>

      {/* 2. PERSPECTIVE TABS (DETACHED FLOATING STRIP) */}
      <div style={{
        display: 'flex',
        gap: '8px',
        background: '#ffffff',
        padding: '8px 12px',
        borderRadius: '14px',
        border: '1px solid #dbe5e2',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.03)'
      }}>
        {[
          { id: 'SPATIAL', label: 'Architectural Drawing OCR Discrepancies', icon: Layers },
          { id: 'NORMS', label: 'AICTE Handbook Space Norms Matrix', icon: TrendingUp },
          { id: 'GEOPHOTOS', label: 'Geo-Tagged Photographic Verification', icon: Camera }
        ].map((tab) => {
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
                padding: '8px 16px',
                borderRadius: '10px',
                border: 'none',
                background: isActive ? '#059669' : 'transparent',
                color: isActive ? '#ffffff' : '#64748b',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.16s ease'
              }}
            >
              <Icon size={14} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 3. TAB 1: BLUEPRINT OCR DISCREPANCY & INSPECTOR NOTES */}
      {activeTab === 'SPATIAL' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '20px' }}>
          {/* Drawing Inspection Card */}
          <div style={{
            background: '#ffffff',
            borderRadius: '16px',
            padding: '26px',
            border: '1px solid #fed7aa',
            boxShadow: '0 4px 16px rgba(234, 88, 12, 0.04)',
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
                  background: '#ffedd5',
                  color: '#c2410c',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <AlertTriangle size={18} />
                </div>
                <div>
                  <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', margin: '0 0 2px 0' }}>
                    Classroom C-204 Dimension Mismatch
                  </h3>
                  <span style={{ fontSize: '11px', color: '#64748b' }}>
                    Document: Architectural_Floor_Plan_Floor2.pdf (Page 3)
                  </span>
                </div>
              </div>

              <span style={{ fontSize: '11px', fontWeight: 800, color: '#c2410c', background: '#ffedd5', padding: '4px 10px', borderRadius: '6px' }}>
                DISCREPANCY: -12 SQ.M.
              </span>
            </div>

            {/* Comparison Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '11px', color: '#64748b' }}>APPLICANT FORM DECLARATION</span>
                <div style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', marginTop: '4px' }}>
                  66.00 sq.m.
                </div>
                <div style={{ fontSize: '11px', color: '#059669', marginTop: '4px' }}>
                  Satisfies 66 sq.m. norm for 60-student batch
                </div>
              </div>

              <div style={{ background: '#fff7ed', padding: '14px', borderRadius: '10px', border: '1px solid #fed7aa' }}>
                <span style={{ fontSize: '11px', color: '#9a3412' }}>EXTRACTED BLUEPRINT OCR LABEL</span>
                <div style={{ fontSize: '18px', fontWeight: 800, color: '#c2410c', marginTop: '4px' }}>
                  54.00 sq.m.
                </div>
                <div style={{ fontSize: '11px', color: '#9a3412', marginTop: '4px' }}>
                  Room label indicates 6.0m x 9.0m = 54 sq.m.
                </div>
              </div>
            </div>

            <p style={{ fontSize: '12px', color: '#475569', margin: 0, lineHeight: 1.5 }}>
              The OCR engine detected dimensions labeled "6.00m x 9.00m" on Classroom C-204 in the municipal approved blueprint, while Part-II application declares 66.0 sq.m. Physical on-site tape measurement is required to determine whether an adjoining partition wall was modified.
            </p>
          </div>

          {/* Inspector Working Notes */}
          <div style={{
            background: '#ffffff',
            borderRadius: '16px',
            padding: '26px',
            border: '1px solid #dbe5e2',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
              Scrutiny & EVC Inspector Working Notes
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {submittedNotes.map((note, index) => (
                <div key={index} style={{ background: '#f8fafc', padding: '10px 12px', borderRadius: '8px', fontSize: '11px', color: '#334155', borderLeft: '3px solid #059669' }}>
                  {note}
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: 'auto' }}>
              <textarea
                rows={3}
                placeholder="Add on-site observation note or instruction for EVC committee..."
                value={inspectorNotes}
                onChange={(e) => setInspectorNotes(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  fontSize: '11px',
                  fontFamily: 'inherit',
                  resize: 'none'
                }}
              />

              <button
                onClick={handleAddNote}
                disabled={!inspectorNotes.trim()}
                style={{
                  background: '#059669',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '8px 16px',
                  fontSize: '11px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <Plus size={14} /> Add Note to Inspection File
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. TAB 2: AICTE SPACE NORMS MATRIX */}
      {activeTab === 'NORMS' && (
        <div style={{
          background: '#ffffff',
          borderRadius: '16px',
          padding: '26px',
          border: '1px solid #dbe5e2',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', margin: '0 0 4px 0' }}>
              Handbook Floor Area Norms Compliance Matrix
            </h3>
            <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>
              Calculated based on declared intake of 480 engineering seats across 4 undergraduate divisions.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { category: 'Instructional Area (Classrooms, Labs, Workshops)', req: 5400, act: 7200, unit: 'sq.m.' },
              { category: 'Administrative Area (Principal Office, Faculty Cabins, Boardroom)', req: 1200, act: 1850, unit: 'sq.m.' },
              { category: 'Amenities Area (Canteen, Common Rooms, First Aid)', req: 800, act: 1200, unit: 'sq.m.' },
              { category: 'Circulation & Corridors (Stairs, Ramps, Lobbies)', req: 2600, act: 4600, unit: 'sq.m.' }
            ].map((item, idx) => {
              const surplusPercent = (((item.act - item.req) / item.req) * 100).toFixed(0);
              const fillPercent = Math.min(100, (item.act / (item.req * 1.5)) * 100);
              return (
                <div key={idx} style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>
                      {item.category}
                    </span>
                    <span style={{ fontSize: '11px', fontWeight: 800, color: '#059669', background: '#ecfdf5', padding: '2px 8px', borderRadius: '4px' }}>
                      +{surplusPercent}% SURPLUS
                    </span>
                  </div>

                  <div style={{ height: '8px', background: '#e2e8f0', borderRadius: '100px', overflow: 'hidden', marginBottom: '8px' }}>
                    <div style={{ width: `${fillPercent}%`, height: '100%', background: '#059669', borderRadius: '100px' }} />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#64748b' }}>
                    <span>Mandatory Minimum: <strong>{item.req.toLocaleString()} {item.unit}</strong></span>
                    <span>Actual Declared: <strong style={{ color: '#059669' }}>{item.act.toLocaleString()} {item.unit}</strong></span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 5. TAB 3: GEO-TAGGED PHOTOGRAPHIC VERIFICATION */}
      {activeTab === 'GEOPHOTOS' && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '16px'
        }}>
          {[
            {
              title: 'Main Institutional Gate & Barrier-Free Entrance',
              file: 'Campus_Main_Gate_Geo.jpg',
              lat: '18.5784 N',
              long: '73.9821 E',
              status: 'VERIFIED',
              date: '24-Oct-2026'
            },
            {
              title: 'Advanced Computer Center & Server Room',
              file: 'Campus_Computer_Center_Geo.jpg',
              lat: '18.5786 N',
              long: '73.9824 E',
              status: 'FLAGGED FOR REVIEW',
              flagged: true,
              date: '24-Oct-2026'
            },
            {
              title: 'Central Engineering Library & Reading Hall',
              file: 'Library_Reading_Hall_Geo.jpg',
              lat: '18.5789 N',
              long: '73.9822 E',
              status: 'VERIFIED',
              date: '23-Oct-2026'
            },
            {
              title: 'Fire Hydrant Pump Room & Water Sump',
              file: 'Fire_Pump_Facility_Geo.jpg',
              lat: '18.5781 N',
              long: '73.9819 E',
              status: 'VERIFIED',
              date: '24-Oct-2026'
            }
          ].map((photo, i) => (
            <div
              key={i}
              style={{
                background: '#ffffff',
                borderRadius: '16px',
                padding: '20px',
                border: photo.flagged ? '1px solid #fed7aa' : '1px solid #dbe5e2',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}
            >
              <div style={{
                height: '140px',
                background: '#071f1a',
                borderRadius: '10px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#a7f3d0'
              }}>
                <Camera size={28} />
                <span style={{ fontSize: '11px', fontWeight: 700, marginTop: '6px' }}>{photo.file}</span>
                <span style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.5)' }}>EXIF GPS Valid</span>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{
                    fontSize: '10px',
                    fontWeight: 800,
                    padding: '2px 6px',
                    borderRadius: '4px',
                    background: photo.flagged ? '#fff7ed' : '#ecfdf5',
                    color: photo.flagged ? '#c2410c' : '#059669'
                  }}>
                    {photo.status}
                  </span>
                  <span style={{ fontSize: '11px', color: '#64748b' }}>{photo.date}</span>
                </div>

                <h4 style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a', margin: '0 0 4px 0' }}>
                  {photo.title}
                </h4>

                <div style={{ fontSize: '11px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <MapPin size={12} color="#059669" />
                  <span>Geo-Coordinates: {photo.lat}, {photo.long}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
