import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar, ActiveView } from './components/Sidebar';
import { CopilotDrawer } from './components/CopilotDrawer';
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
      {/* Top Universal Navbar */}
      <Navbar 
        currentRole={currentRole}
        onRoleChange={setCurrentRole}
        currentLang={currentLang}
        onLangChange={setCurrentLang}
        unreadAlertsCount={unreadAlerts}
        onToggleNotifications={() => setIsNotificationsOpen(true)}
        onToggleCopilot={() => setIsCopilotOpen(!isCopilotOpen)}
        isCopilotOpen={isCopilotOpen}
      />

      {/* Main App Workspace */}
      <div className="main-layout">
        {/* Left Primary Navigation Sidebar */}
        <Sidebar 
          activeView={activeView}
          onSelectView={setActiveView}
          currentLang={currentLang}
          currentRole={currentRole}
          openFindingsCount={totalOpenFindings}
        />

        {/* View Content Canvas */}
        <main className="content-area">
          {activeView === 'QUEUE' && (
            <ReviewerQueueView 
              applications={applications}
              onSelectApplication={handleSelectApplication}
              onOpenDecisionModal={(app) => setDecisionModalApp(app)}
              currentRole={currentRole}
              currentLang={currentLang}
            />
          )}

          {activeView === 'DETAIL' && selectedApp && (
            <ApplicationDetailView 
              application={selectedApp}
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
              nodes={mockEvidenceNodes} 
              edges={mockEvidenceEdges} 
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
        </main>
      </div>

      {/* Slide-out Grounded Regulatory Copilot Drawer */}
      <CopilotDrawer 
        isOpen={isCopilotOpen} 
        onClose={() => setIsCopilotOpen(false)} 
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
