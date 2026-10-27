import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Sparkles, 
  Scale, 
  FileCheck2, 
  AlertCircle, 
  Sliders, 
  ChevronRight, 
  ArrowRight, 
  Layers, 
  Info, 
  CheckCircle2, 
  XCircle, 
  Eye, 
  HelpCircle,
  ExternalLink,
  Building,
  GraduationCap,
  FlaskConical,
  BookOpen,
  FileSpreadsheet
} from 'lucide-react';
import { 
  mockRecommendation, 
  mockPolicyGates, 
  mockScoreRuns 
} from '../data/mockMethodologyData';
import { Application, UserRole } from '../types';
import { ActiveView } from '../components/Navbar';

interface MethodologyDecisionViewProps {
  application: Application;
  currentRole: UserRole;
  onNavigate: (view: ActiveView) => void;
}

export const MethodologyDecisionView: React.FC<MethodologyDecisionViewProps> = ({
  application,
  currentRole,
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<'GATES' | 'REASONING' | 'WHAT_IF' | 'FOCUS'>('GATES');
  
  // Interactive What-If slider states
  const [simulatedIntake, setSimulatedIntake] = useState<number>(50);
  const [simulatedVideo, setSimulatedVideo] = useState<number>(0);

  const rec = mockRecommendation;
  const scoreRun = mockScoreRuns[0];

  // Dynamic simulation evaluation
  const computeSimulatedMode = (intake: number, video: number): { mode: string; reason: string; color: string } => {
    if (intake > 30) {
      return { 
        mode: 'PHYSICAL EVC', 
        reason: 'Mandatory physical verification triggered by GATE-001 (Intake increase > 30%)',
        color: 'var(--mode-physical)'
      };
    }
    if (video >= 30) {
      return { 
        mode: 'ONLINE EVC', 
        reason: 'Intake is within normal range and adequate 30+ min facility video is present',
        color: 'var(--mode-online)'
      };
    }
    return { 
      mode: 'HYBRID EVC', 
      reason: 'Intake is within normal range, but absent facility video necessitates on-site visit for flagged spaces',
      color: 'var(--mode-hybrid)'
    };
  };

  const simulatedResult = computeSimulatedMode(simulatedIntake, simulatedVideo);

  const getCategoryIcon = (category: string) => {
    switch (category.toUpperCase()) {
      case 'LABORATORY': return <FlaskConical size={16} className="text-amber-600" />;
      case 'FACULTY': return <GraduationCap size={16} className="text-purple-600" />;
      case 'INSTRUCTIONAL': return <BookOpen size={16} className="text-blue-600" />;
      case 'ADMINISTRATIVE': return <FileSpreadsheet size={16} className="text-emerald-600" />;
      default: return <Building size={16} className="text-slate-600" />;
    }
  };

  return (
    <div className="methodology-container" style={{ padding: '24px 32px 80px', maxWidth: '1380px', margin: '0 auto' }}>
      
      {/* ── 1. Advisory Banner (1 slim line) ── */}
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
          <strong>Advisory Methodology Recommendation:</strong> AI-computed methodology is decision-support only. Under AICTE regulations, the competent EVC coordinator retains final authority.
        </span>
        <span 
          style={{
            marginLeft: 'auto',
            background: 'rgba(212, 160, 52, 0.16)',
            padding: '2px 8px',
            borderRadius: '4px',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.04em'
          }}
        >
          DEMO RULES v1.0
        </span>
      </div>

      {/* ── 2. HERO ELEMENT: Large Recommendation Mode Badge + Confidence Arc ── */}
      <div 
        style={{
          background: 'linear-gradient(135deg, #1b2f2b 0%, #263d39 60%, #1a2c29 100%)',
          borderRadius: '20px',
          padding: '36px 40px',
          color: '#ffffff',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 20px 40px -15px rgba(26, 44, 41, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.08)',
          marginBottom: '36px'
        }}
      >
        {/* Ambient background glow ring */}
        <div 
          style={{
            position: 'absolute',
            top: '-50px',
            right: '-50px',
            width: '280px',
            height: '280px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(212, 160, 52, 0.22) 0%, transparent 70%)',
            pointerEvents: 'none'
          }}
        />

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '28px', position: 'relative', zIndex: 1 }}>
          
          {/* Left Hero Segment: Mode Badge & Case Meta */}
          <div style={{ flex: '1 1 540px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <span 
                style={{
                  background: 'rgba(212, 160, 52, 0.2)',
                  color: '#e5b854',
                  fontSize: '11px',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  padding: '4px 10px',
                  borderRadius: '20px',
                  border: '1px solid rgba(212, 160, 52, 0.35)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px'
                }}
              >
                <Sparkles size={12} /> AI Recommendation Engine
              </span>
              <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: '13px' }}>•</span>
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', fontFamily: 'var(--font-mono)' }}>
                {application.id} ({application.institutionName})
              </span>
            </div>

            <h1 style={{ fontSize: '32px', fontWeight: 800, margin: '0 0 12px 0', letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '14px' }}>
              <span 
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  background: 'rgba(217, 119, 6, 0.25)',
                  border: '1.5px solid rgba(217, 119, 6, 0.5)',
                  color: '#fbbf24',
                  flexShrink: 0
                }}
              >
                <Building size={24} color="#fbbf24" />
              </span>
              <span>Physical Expert Visit Committee (EVC)</span>
            </h1>

            <p style={{ margin: '0 0 20px 0', color: 'rgba(255,255,255,0.75)', fontSize: '15px', lineHeight: 1.5, maxWidth: '640px' }}>
              Full on-site verification recommended due to <strong>50% intake expansion</strong> and unresolved spatial discrepancies that cannot be reliably validated via desk review or remote video.
            </p>

            {/* Quick Status Chips */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              <div 
                style={{
                  background: 'rgba(0,0,0,0.25)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: '8px',
                  padding: '6px 14px',
                  fontSize: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <span style={{ color: 'rgba(255,255,255,0.5)' }}>Policy Floor:</span>
                <span style={{ fontWeight: 700, color: '#fbbf24' }}>PHYSICAL_EVC (GATE-001)</span>
              </div>

              <div 
                style={{
                  background: 'rgba(0,0,0,0.25)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: '8px',
                  padding: '6px 14px',
                  fontSize: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <span style={{ color: 'rgba(255,255,255,0.5)' }}>Recommendation State:</span>
                <span style={{ fontWeight: 700, color: '#6ee7b7' }}>COMPUTED (Awaiting Review)</span>
              </div>

              <div 
                style={{
                  background: 'rgba(0,0,0,0.25)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: '8px',
                  padding: '6px 14px',
                  fontSize: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <span style={{ color: 'rgba(255,255,255,0.5)' }}>VNI Compound Need:</span>
                <span style={{ fontWeight: 700, color: '#f87171' }}>{scoreRun.vni} / 100</span>
              </div>
            </div>
          </div>

          {/* Right Hero Segment: Confidence Arc & Action Dock */}
          <div 
            style={{
              flex: '0 0 280px',
              background: 'rgba(0, 0, 0, 0.28)',
              borderRadius: '16px',
              padding: '24px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              textAlign: 'center'
            }}
          >
            <div style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', letterSpacing: '0.05em', marginBottom: '8px' }}>
              Recommendation Confidence
            </div>

            <div style={{ fontSize: '44px', fontWeight: 900, color: '#fbbf24', lineHeight: 1, marginBottom: '6px' }}>
              {Math.round(rec.confidence * 100)}%
            </div>

            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', marginBottom: '16px' }}>
              Ordinal Model Probability: <strong>72%</strong>
            </div>

            {/* Visual Confidence Bar */}
            <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden', marginBottom: '20px' }}>
              <div 
                style={{ 
                  width: `${rec.confidence * 100}%`, 
                  height: '100%', 
                  background: 'linear-gradient(90deg, #d4a034, #fbbf24)',
                  borderRadius: '4px' 
                }} 
              />
            </div>

            {/* Primary Action Button */}
            <button
              onClick={() => onNavigate('OFFICIAL_REVIEW')}
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #d4a034 0%, #bf8e29 100%)',
                color: '#1a2c29',
                border: 'none',
                borderRadius: '10px',
                padding: '12px 16px',
                fontSize: '13px',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 6px 16px rgba(212, 160, 52, 0.35)',
                transition: 'all 0.15s ease'
              }}
            >
              <span>Conduct Official Review</span>
              <ArrowRight size={14} />
            </button>

            {/* Secondary links */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '14px', fontSize: '12px' }}>
              <button 
                onClick={() => onNavigate('BRIEF')}
                style={{ background: 'none', border: 'none', color: '#93c5fd', cursor: 'pointer', textDecoration: 'underline', padding: 0 }}
              >
                Pre-Visit Brief
              </button>
              <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>
              <button 
                onClick={() => onNavigate('MODE_COMPARE')}
                style={{ background: 'none', border: 'none', color: '#93c5fd', cursor: 'pointer', textDecoration: 'underline', padding: 0 }}
              >
                Compare Modes
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* ── 3. TABS BAR: Clean, Breathing Room, Single-Click Inspection ── */}
      <div 
        style={{
          display: 'flex',
          gap: '8px',
          borderBottom: '2px solid rgba(38, 61, 57, 0.1)',
          marginBottom: '28px'
        }}
      >
        {[
          { key: 'GATES', label: 'Policy Gates Scorecard (Tier 0)', count: mockPolicyGates.length, icon: ShieldAlert },
          { key: 'REASONING', label: 'Multi-Tier Decision Logic', icon: Layers },
          { key: 'WHAT_IF', label: 'What-If Sensitivity Simulator', icon: Sliders },
          { key: 'FOCUS', label: 'Priority Focus Areas', count: rec.focusAreas.length, icon: CheckCircle2 }
        ].map(tab => {
          const isActive = activeTab === tab.key;
          const TabIcon = tab.icon;

          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 20px',
                fontSize: '14px',
                fontWeight: isActive ? 800 : 600,
                color: isActive ? 'var(--text-main)' : 'var(--text-secondary)',
                border: 'none',
                background: 'transparent',
                borderBottom: isActive ? '3px solid var(--accent-gold)' : '3px solid transparent',
                marginBottom: '-2px',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              <TabIcon size={16} color={isActive ? 'var(--accent-gold-dark)' : 'var(--text-secondary)'} />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span 
                  style={{
                    background: isActive ? 'var(--bg-pine)' : 'rgba(38, 61, 57, 0.08)',
                    color: isActive ? '#ffffff' : 'var(--text-secondary)',
                    borderRadius: '12px',
                    padding: '2px 8px',
                    fontSize: '11px',
                    fontWeight: 800
                  }}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ── 4. TAB CONTENTS ── */}

      {/* ── TAB 1: Policy Gates Scorecard ── */}
      {activeTab === 'GATES' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '20px' }}>
          {rec.gatesEvaluated.map((evalResult, index) => {
            const gateDef = mockPolicyGates.find(g => g.id === evalResult.gateId) || mockPolicyGates[0];
            const isFired = evalResult.fired;

            return (
              <div 
                key={evalResult.gateId}
                style={{
                  background: '#ffffff',
                  borderRadius: '14px',
                  padding: '20px 24px',
                  border: isFired ? '1.5px solid rgba(220, 38, 38, 0.4)' : '1px solid rgba(38, 61, 57, 0.08)',
                  boxShadow: isFired 
                    ? '0 6px 18px rgba(220, 38, 38, 0.08)' 
                    : '0 4px 12px rgba(38, 61, 57, 0.04)',
                  position: 'relative'
                }}
              >
                {/* Header row */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', marginBottom: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span 
                      style={{
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '11px',
                        fontWeight: 800,
                        background: isFired ? 'rgba(220, 38, 38, 0.12)' : 'rgba(16, 185, 129, 0.1)',
                        color: isFired ? '#b91c1c' : '#047857',
                        border: isFired ? '1px solid rgba(220, 38, 38, 0.25)' : '1px solid rgba(16, 185, 129, 0.2)'
                      }}
                    >
                      {isFired ? 'GATE FIRED' : 'PASSED'}
                    </span>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                      {evalResult.gateId}
                    </span>
                  </div>

                  <span 
                    style={{
                      background: 'rgba(212, 160, 52, 0.12)',
                      color: 'var(--text-accent)',
                      fontSize: '10px',
                      fontWeight: 800,
                      padding: '2px 8px',
                      borderRadius: '4px'
                    }}
                  >
                    DEMO_ONLY
                  </span>
                </div>

                {/* Gate Name */}
                <h3 style={{ fontSize: '16px', fontWeight: 800, margin: '0 0 6px 0', color: 'var(--text-main)' }}>
                  {evalResult.gateName}
                </h3>

                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '0 0 16px 0', lineHeight: 1.4 }}>
                  {gateDef.description}
                </p>

                {/* Technical Predicate & Inputs */}
                <div 
                  style={{
                    background: 'var(--bg-main)',
                    borderRadius: '8px',
                    padding: '12px 14px',
                    fontSize: '12px',
                    fontFamily: 'var(--font-mono)',
                    marginBottom: '14px',
                    border: '1px solid rgba(38, 61, 57, 0.06)'
                  }}
                >
                  <div style={{ color: 'var(--text-muted)', fontSize: '10px', textTransform: 'uppercase', marginBottom: '4px' }}>
                    Predicate Expression & Evaluated Inputs
                  </div>
                  <div style={{ color: '#1e293b', fontWeight: 600 }}>
                    {gateDef.predicate}
                  </div>
                  <div style={{ color: 'var(--text-secondary)', marginTop: '4px', fontSize: '11px' }}>
                    Inputs: {JSON.stringify(evalResult.inputs)}
                  </div>
                </div>

                {/* Bottom row: Citation & Floor */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px', paddingTop: '10px', borderTop: '1px solid rgba(38, 61, 57, 0.06)' }}>
                  <span style={{ color: 'var(--text-muted)' }}>
                    Ref: <em>{gateDef.citation}</em>
                  </span>
                  <span style={{ fontWeight: 700, color: isFired ? 'var(--mode-physical)' : 'var(--text-secondary)' }}>
                    Floor Mode: {evalResult.floorMode}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── TAB 2: Multi-Tier Decision Logic ── */}
      {activeTab === 'REASONING' && (
        <div style={{ background: '#ffffff', borderRadius: '16px', padding: '32px', border: '1px solid rgba(38, 61, 57, 0.08)' }}>
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-main)', margin: '0 0 6px 0' }}>
              Hierarchical Methodology Pipeline
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: 0 }}>
              The platform executes a 3-tier hybrid evaluation where deterministic regulatory policy always takes precedence over statistical recommendations.
            </p>
          </div>

          {/* Stepper Pipeline */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginBottom: '32px' }}>
            
            {/* Step 1: Policy Gates */}
            <div style={{ background: 'rgba(217, 119, 6, 0.06)', borderRadius: '12px', padding: '20px', border: '1px solid rgba(217, 119, 6, 0.25)' }}>
              <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--mode-physical)', textTransform: 'uppercase', marginBottom: '6px' }}>
                Tier 0: Deterministic Gates
              </div>
              <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-main)', marginBottom: '8px' }}>
                Floor Enforcement
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '0 0 12px 0', lineHeight: 1.4 }}>
                Evaluates handbook mandatory-verification triggers. Overrides all machine learning outputs.
              </p>
              <div style={{ background: '#ffffff', borderRadius: '6px', padding: '6px 10px', fontSize: '12px', fontWeight: 700, color: 'var(--mode-physical)', border: '1px solid rgba(217, 119, 6, 0.2)' }}>
                Result: Enforces PHYSICAL_EVC
              </div>
            </div>

            {/* Step 2: Ordinal Logistic Model */}
            <div style={{ background: 'rgba(37, 99, 235, 0.06)', borderRadius: '12px', padding: '20px', border: '1px solid rgba(37, 99, 235, 0.25)' }}>
              <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--dim-d1)', textTransform: 'uppercase', marginBottom: '6px' }}>
                Tier 1: Statistical Model
              </div>
              <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-main)', marginBottom: '8px' }}>
                Ordinal Logistic Regression
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '0 0 12px 0', lineHeight: 1.4 }}>
                Trained on 7-dimension verification scores (VNI: 72) and context vectors.
              </p>
              <div style={{ background: '#ffffff', borderRadius: '6px', padding: '6px 10px', fontSize: '12px', fontWeight: 700, color: 'var(--dim-d1)', border: '1px solid rgba(37, 99, 235, 0.2)' }}>
                Result: Physical EVC (P = 72%)
              </div>
            </div>

            {/* Step 3: Threshold Classifier */}
            <div style={{ background: 'rgba(124, 58, 237, 0.06)', borderRadius: '12px', padding: '20px', border: '1px solid rgba(124, 58, 237, 0.25)' }}>
              <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--dim-d6)', textTransform: 'uppercase', marginBottom: '6px' }}>
                Tier 2: Threshold Bounds
              </div>
              <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-main)', marginBottom: '8px' }}>
                Rule Verification Bounds
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '0 0 12px 0', lineHeight: 1.4 }}>
                Confirms mode satisfies minimum evidence requirement thresholds without blind spots.
              </p>
              <div style={{ background: '#ffffff', borderRadius: '6px', padding: '6px 10px', fontSize: '12px', fontWeight: 700, color: 'var(--dim-d6)', border: '1px solid rgba(124, 58, 237, 0.2)' }}>
                Result: Validated Concordant
              </div>
            </div>

            {/* Step 4: Final Synthesis */}
            <div style={{ background: 'rgba(16, 185, 129, 0.08)', borderRadius: '12px', padding: '20px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
              <div style={{ fontSize: '11px', fontWeight: 800, color: '#047857', textTransform: 'uppercase', marginBottom: '6px' }}>
                Final Advisory State
              </div>
              <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-main)', marginBottom: '8px' }}>
                Synthesized Output
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '0 0 12px 0', lineHeight: 1.4 }}>
                Ready for official sign-off or justification-backed override by authorized official.
              </p>
              <div style={{ background: '#ffffff', borderRadius: '6px', padding: '6px 10px', fontSize: '12px', fontWeight: 800, color: '#047857', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                Confidence: 87% (High)
              </div>
            </div>

          </div>

          {/* Top Feature Drivers Table */}
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-main)', margin: '0 0 14px 0' }}>
              Top Context Feature Influences
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {rec.topFeatures.map((feat, idx) => (
                <div 
                  key={idx}
                  style={{
                    background: 'var(--bg-main)',
                    borderRadius: '8px',
                    padding: '8px 14px',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: 'var(--text-main)',
                    border: '1px solid rgba(38, 61, 57, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <span style={{ color: 'var(--accent-gold-dark)', fontWeight: 800 }}>#{idx + 1}</span>
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 3: What-If Sensitivity Simulator ── */}
      {activeTab === 'WHAT_IF' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '28px' }}>
          
          {/* Left: Counterfactual Cards */}
          <div>
            <div style={{ marginBottom: '18px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-main)', margin: '0 0 4px 0' }}>
                Pre-Computed Counterfactual Scenarios
              </h2>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0 }}>
                These explainable AI paths show the minimum changes in institutional features that would alter the recommended mode.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {rec.counterfactuals.map((cf, idx) => (
                <div 
                  key={idx}
                  style={{
                    background: '#ffffff',
                    borderRadius: '12px',
                    padding: '20px',
                    border: '1.5px dashed rgba(212, 160, 52, 0.5)',
                    boxShadow: '0 4px 14px rgba(38, 61, 57, 0.04)',
                    position: 'relative'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span 
                      style={{
                        background: 'rgba(212, 160, 52, 0.14)',
                        color: 'var(--accent-gold-dark)',
                        fontSize: '10px',
                        fontWeight: 800,
                        padding: '2px 8px',
                        borderRadius: '4px',
                        letterSpacing: '0.05em'
                      }}
                    >
                      HYPOTHETICAL PATH #{idx + 1}
                    </span>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                      Feature: {cf.featureLabel}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '12px' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Original Observed</div>
                      <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-main)' }}>
                        {cf.originalValue} <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>({cf.originalMode})</span>
                      </div>
                    </div>

                    <ArrowRight size={20} color="var(--accent-gold)" />

                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Hypothetical Value</div>
                      <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-accent)' }}>
                        {cf.newValue} <span style={{ fontSize: '12px', color: '#16a34a' }}>→ {cf.newMode}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Interactive Sliders Panel */}
          <div 
            style={{
              background: '#ffffff',
              borderRadius: '16px',
              padding: '24px',
              border: '1px solid rgba(38, 61, 57, 0.1)',
              boxShadow: '0 6px 20px rgba(38, 61, 57, 0.05)',
              height: 'fit-content'
            }}
          >
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-main)', margin: '0 0 4px 0' }}>
              Interactive Sandbox
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '0 0 20px 0' }}>
              Adjust parameters to observe simulated mode transitions:
            </p>

            {/* Slider 1: Intake Change % */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 700, marginBottom: '6px' }}>
                <span>Intake Increase:</span>
                <span style={{ color: simulatedIntake > 30 ? '#dc2626' : '#16a34a' }}>+{simulatedIntake}%</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                step="5"
                value={simulatedIntake} 
                onChange={(e) => setSimulatedIntake(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--accent-gold)' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--text-muted)', marginTop: '2px' }}>
                <span>0%</span>
                <span style={{ color: '#dc2626', fontWeight: 700 }}>Gate threshold: 30%</span>
                <span>100%</span>
              </div>
            </div>

            {/* Slider 2: Video Evidence Duration */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 700, marginBottom: '6px' }}>
                <span>Facility Video:</span>
                <span style={{ color: simulatedVideo >= 30 ? '#16a34a' : '#d97706' }}>{simulatedVideo} mins</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="60" 
                step="5"
                value={simulatedVideo} 
                onChange={(e) => setSimulatedVideo(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--accent-gold)' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--text-muted)', marginTop: '2px' }}>
                <span>0 min</span>
                <span style={{ color: '#16a34a', fontWeight: 700 }}>Min Online: 30 min</span>
                <span>60 min</span>
              </div>
            </div>

            {/* Dynamic Result Box */}
            <div 
              style={{
                background: 'var(--bg-main)',
                borderRadius: '12px',
                padding: '16px',
                border: '1.5px solid rgba(38, 61, 57, 0.1)',
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '4px' }}>
                Predicted Simulation Mode
              </div>
              <div style={{ fontSize: '18px', fontWeight: 900, color: simulatedResult.color, marginBottom: '6px' }}>
                {simulatedResult.mode}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                {simulatedResult.reason}
              </div>
            </div>
          </div>

        </div>
      )}

      {/* ── TAB 4: Priority Focus Areas ── */}
      {activeTab === 'FOCUS' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {rec.focusAreas.map((area) => (
            <div 
              key={area.id}
              style={{
                background: '#ffffff',
                borderRadius: '14px',
                padding: '20px 24px',
                border: '1px solid rgba(38, 61, 57, 0.08)',
                boxShadow: '0 4px 12px rgba(38, 61, 57, 0.03)',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '18px'
              }}
            >
              {/* Left Column: Category icon + Item + Reason */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', flex: '1 1 500px' }}>
                <div 
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    background: 'var(--bg-main)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  {getCategoryIcon(area.category)}
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span 
                      style={{
                        fontSize: '11px',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        color: 'var(--text-muted)',
                        letterSpacing: '0.04em'
                      }}
                    >
                      {area.category}
                    </span>
                    <span 
                      style={{
                        background: area.priority === 'HIGH' ? 'rgba(220, 38, 38, 0.1)' : 'rgba(217, 119, 6, 0.1)',
                        color: area.priority === 'HIGH' ? '#dc2626' : '#d97706',
                        fontSize: '10px',
                        fontWeight: 800,
                        padding: '1px 6px',
                        borderRadius: '4px'
                      }}
                    >
                      {area.priority} PRIORITY
                    </span>
                  </div>

                  <h4 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-main)', margin: '0 0 6px 0' }}>
                    {area.item}
                  </h4>

                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.4 }}>
                    {area.reason}
                  </p>
                </div>
              </div>

              {/* Right Column: Channel Adequacy Badges */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ textAlign: 'center', padding: '6px 10px', borderRadius: '6px', background: 'var(--bg-main)', fontSize: '11px' }}>
                  <div style={{ color: 'var(--text-muted)', fontSize: '10px' }}>Desk</div>
                  <div style={{ fontWeight: 800, color: area.channelAdequacy.desk === 'FULL' ? '#16a34a' : area.channelAdequacy.desk === 'PARTIAL' ? '#d97706' : '#dc2626' }}>
                    {area.channelAdequacy.desk}
                  </div>
                </div>

                <div style={{ textAlign: 'center', padding: '6px 10px', borderRadius: '6px', background: 'var(--bg-main)', fontSize: '11px' }}>
                  <div style={{ color: 'var(--text-muted)', fontSize: '10px' }}>Remote</div>
                  <div style={{ fontWeight: 800, color: area.channelAdequacy.remote === 'FULL' ? '#16a34a' : area.channelAdequacy.remote === 'PARTIAL' ? '#d97706' : '#dc2626' }}>
                    {area.channelAdequacy.remote}
                  </div>
                </div>

                <div style={{ textAlign: 'center', padding: '6px 10px', borderRadius: '6px', background: 'rgba(22, 163, 74, 0.1)', border: '1px solid rgba(22, 163, 74, 0.25)', fontSize: '11px' }}>
                  <div style={{ color: '#15803d', fontSize: '10px' }}>Physical</div>
                  <div style={{ fontWeight: 800, color: '#15803d' }}>
                    {area.channelAdequacy.physical}
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
};
export default MethodologyDecisionView;
