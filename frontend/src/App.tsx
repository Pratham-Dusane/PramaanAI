import React, { useState } from 'react';
import { Navbar, ActiveView } from './components/Navbar';
import { CopilotDrawer } from './components/CopilotDrawer';
import { CopilotButton } from './components/CopilotButton';
import { NotificationCenter } from './components/NotificationCenter';
import { DecisionModal } from './components/DecisionModal';
import { ReviewerQueueView } from './views/ReviewerQueueView';
import { ApplicationDetailView } from './views/ApplicationDetailView';
import { ApplicantPortalView } from './views/ApplicantPortalView';
import { AccessibleGraph } from './components/AccessibleGraph';
import { DigitalTwinView } from './views/DigitalTwinView';
import { InfrastructureView } from './views/InfrastructureView';
import { DuplicatesView } from './views/DuplicatesView';
import { RulesAdminView } from './views/RulesAdminView';
import { BulkProcessingView } from './views/BulkProcessingView';
import { AuditLogView } from './views/AuditLogView';
import { ContextIntelligenceView } from './views/ContextIntelligenceView';
import { VerificationScoringView } from './views/VerificationScoringView';
import { MethodologyDecisionView } from './views/MethodologyDecisionView';
import { PreVisitBriefView } from './views/PreVisitBriefView';
import { ModeComparisonView } from './views/ModeComparisonView';
import { OfficialReviewView } from './views/OfficialReviewView';
import { 
  mockApplications, 
  mockInstitutions, 
  mockNotifications, 
  mockAuditEvents, 
  mockEvidenceNodes, 
  mockEvidenceEdges 
} from './data/mockData';
import { Application, UserRole, NotificationItem } from './types';
import { SupportedLanguage } from './data/translations';

export const App: React.FC = () => {
  const [currentRole, setCurrentRole] = useState<UserRole>('SCRUTINY_OFFICER');
  const [currentLang, setCurrentLang] = useState<SupportedLanguage>('en');
  const [activeView, setActiveView] = useState<ActiveView>('QUEUE');
  
  const [applications, setApplications] = useState<Application[]>(mockApplications);
  const [selectedAppId, setSelectedAppId] = useState<string>('DEMO-EOA-2026-001');
  const [notifications, setNotifications] = useState<NotificationItem[]>(mockNotifications);
  
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [decisionModalApp, setDecisionModalApp] = useState<Application | null>(null);

  // Deep-linking state between Reviewer Queue, Evidence Graph, and Split-Pane Case Review
  const [graphFocusedCluster, setGraphFocusedCluster] = useState<string | null>('cluster-pune-land');
  const [graphFocusedInstitutionId, setGraphFocusedInstitutionId] = useState<string | null>(null);
  const [activeSplitFinding, setActiveSplitFinding] = useState<any>(null);

  const handleToggleCopilot = () => {
    setIsCopilotOpen(!isCopilotOpen);
  };

  const handleCloseCopilot = () => {
    setIsCopilotOpen(false);
  };

  const selectedApp = applications.find((a) => a.id === selectedAppId) || applications[0];
  const unreadAlerts = notifications.filter((n) => !n.acknowledged).length;
  const totalOpenFindings = applications.reduce(
    (acc, a) => acc + a.findings.filter((f) => f.status !== 'RESOLVED').length, 
    0
  );

  const handleSelectApplication = (appId: string) => {
    setSelectedAppId(appId);
    setActiveView('DETAIL');
  };

  const handleResolveFinding = (findingId: string, reason: string) => {
    setApplications((prev) => 
      prev.map((app) => ({
        ...app,
        findings: app.findings.map((f) => 
          f.id === findingId 
            ? { ...f, status: 'RESOLVED', resolutionReason: reason, resolvedBy: currentRole, resolvedAt: new Date().toISOString() } 
            : f
        )
      }))
    );

    mockAuditEvents.unshift({
      id: `AUD-${Date.now()}`,
      timestamp: new Date().toISOString(),
      actor: currentRole,
      role: currentRole,
      action: 'FINDING_RESOLVED',
      applicationId: selectedApp.id,
      correlationId: `res-${Math.random().toString(36).substring(2, 9)}`,
      safeMetadata: { findingId, reason }
    });
  };

  const handleRecordDecision = (decision: {
    decisionType: 'APPROVED' | 'REJECTED' | 'DEFERRED_FOR_INSPECTION';
    recordedBy: string;
    reason: string;
    citedEvidence: string[];
  }) => {
    if (!decisionModalApp) return;

    setApplications((prev) => 
      prev.map((app) => 
        app.id === decisionModalApp.id 
          ? {
              ...app,
              status: 'DECISION_RECORDED',
              decision: {
                ...decision,
                recordedAt: new Date().toISOString()
              }
            }
          : app
      )
    );

    mockAuditEvents.unshift({
      id: `AUD-${Date.now()}`,
      timestamp: new Date().toISOString(),
      actor: decision.recordedBy,
      role: 'SENIOR_APPROVER',
      action: 'HUMAN_DECISION_RECORDED',
      applicationId: decisionModalApp.id,
      correlationId: `dec-${Math.random().toString(36).substring(2, 9)}`,
      safeMetadata: { decisionType: decision.decisionType, reason: decision.reason }
    });
  };

  const handleAcknowledgeNotification = (id: string) => {
    setNotifications((prev) => 
      prev.map((n) => n.id === id ? { ...n, acknowledged: true } : n)
    );
  };

  return (
    <div className="app-container">
      {/* Top Universal Horizontal Navigation Bar */}
      <Navbar 
        currentRole={currentRole}
        onRoleChange={setCurrentRole}
        currentLang={currentLang}
        onLangChange={setCurrentLang}
        unreadAlertsCount={unreadAlerts}
        onToggleNotifications={() => setIsNotificationsOpen(true)}
        activeView={activeView}
        onSelectView={setActiveView}
        openFindingsCount={totalOpenFindings}
      />

      {/* Main App Workspace */}
      <div 
        className="main-layout"
        style={{
          marginRight: isCopilotOpen ? '450px' : '0',
          transition: 'margin-right 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* View Content Canvas */}
        <main className="content-area">
          {activeView === 'QUEUE' && (
            <ReviewerQueueView 
              applications={applications}
              onSelectApplication={handleSelectApplication}
              onOpenDecisionModal={(app) => setDecisionModalApp(app)}
              onOpenGraphForCase={(appId, clusterId) => {
                setSelectedAppId(appId);
                setGraphFocusedCluster(clusterId || 'cluster-pune-land');
                setGraphFocusedInstitutionId(appId === 'DEMO-EOA-2026-001' ? 'INST-AK' : 'INST-SP');
                setActiveView('GRAPH');
              }}
              currentRole={currentRole}
              currentLang={currentLang}
            />
          )}

          {activeView === 'DETAIL' && selectedApp && (
            <ApplicationDetailView 
              application={selectedApp}
              initialSplitPaneFinding={activeSplitFinding}
              onClearSplitPaneFinding={() => setActiveSplitFinding(null)}
              onNavigateToGraph={() => setActiveView('GRAPH')}
              onBackToQueue={() => setActiveView('QUEUE')}
              onOpenDecisionModal={(app) => setDecisionModalApp(app)}
              onResolveFinding={handleResolveFinding}
              currentRole={currentRole}
              currentLang={currentLang}
            />
          )}

          {activeView === 'APPLICANT' && (
            <ApplicantPortalView 
              institution={mockInstitutions[0]}
              currentRole={currentRole}
              currentLang={currentLang}
            />
          )}

          {activeView === 'GRAPH' && (
            <AccessibleGraph 
              initialFocusedCluster={graphFocusedCluster}
              initialFocusedInstitutionId={graphFocusedInstitutionId}
              onOpenCaseReview={(finding) => {
                setActiveSplitFinding(finding);
                setSelectedAppId('DEMO-EOA-2026-001');
                setActiveView('DETAIL');
              }}
            />
          )}

          {activeView === 'TWIN' && (
            <DigitalTwinView />
          )}

          {activeView === 'INFRA' && (
            <InfrastructureView />
          )}

          {activeView === 'DUPLICATES' && (
            <DuplicatesView />
          )}

          {activeView === 'RULES' && (
            <RulesAdminView />
          )}

          {activeView === 'BULK' && (
            <BulkProcessingView />
          )}

          {activeView === 'AUDIT' && (
            <AuditLogView />
          )}

          {activeView === 'CONTEXT' && (
            <ContextIntelligenceView 
              application={selectedApp}
              currentRole={currentRole}
              onNavigate={(view) => setActiveView(view)}
            />
          )}

          {activeView === 'SCORING' && (
            <VerificationScoringView 
              application={selectedApp}
              currentRole={currentRole}
              onNavigate={(view) => setActiveView(view)}
            />
          )}

          {activeView === 'METHODOLOGY' && (
            <MethodologyDecisionView 
              application={selectedApp}
              currentRole={currentRole}
              onNavigate={(view) => setActiveView(view)}
            />
          )}

          {activeView === 'BRIEF' && (
            <PreVisitBriefView 
              application={selectedApp}
              currentRole={currentRole}
              onNavigate={(view) => setActiveView(view)}
            />
          )}

          {activeView === 'MODE_COMPARE' && (
            <ModeComparisonView 
              application={selectedApp}
              currentRole={currentRole}
              onNavigate={(view) => setActiveView(view)}
            />
          )}

          {activeView === 'OFFICIAL_REVIEW' && (
            <OfficialReviewView 
              application={selectedApp}
              currentRole={currentRole}
              onNavigate={(view) => setActiveView(view)}
            />
          )}
        </main>
      </div>

      {/* Floating Bottom-Right Kokonut / Bklit Copilot Button */}
      <CopilotButton 
        isOpen={isCopilotOpen} 
        onToggle={handleToggleCopilot} 
      />

      {/* Slide-out Grounded Regulatory Copilot Drawer */}
      <CopilotDrawer 
        isOpen={isCopilotOpen} 
        onClose={handleCloseCopilot} 
      />

      {/* Deadline & Expiry Alerts Modal */}
      <NotificationCenter 
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        notifications={notifications}
        onAcknowledge={handleAcknowledgeNotification}
      />

      {/* Official Human Decision Protected Modal */}
      {decisionModalApp && (
        <DecisionModal 
          isOpen={!!decisionModalApp}
          onClose={() => setDecisionModalApp(null)}
          application={decisionModalApp}
          currentRole={currentRole}
          onRecordDecision={handleRecordDecision}
        />
      )}
    </div>
  );
};

export default App;
