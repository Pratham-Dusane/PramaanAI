export type UserRole = 
  | 'APPLICANT' 
  | 'SCRUTINY_OFFICER' 
  | 'SENIOR_APPROVER' 
  | 'INSPECTOR' 
  | 'RULE_ADMIN' 
  | 'AUDITOR';

export type CheckResult = 
  | 'PASS' 
  | 'REVIEW' 
  | 'INSUFFICIENT_EVIDENCE' 
  | 'NOT_APPLICABLE' 
  | 'ERROR';

export type FindingStatus = 
  | 'OPEN' 
  | 'ACKNOWLEDGED' 
  | 'UNDER_REVIEW' 
  | 'RESOLVED' 
  | 'DISMISSED' 
  | 'ESCALATED' 
  | 'SUPERSEDED';

export type FindingSeverity = 'INFO' | 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export type ApplicationStatus = 
  | 'DRAFT'
  | 'SUBMITTED'
  | 'QUEUED'
  | 'PROCESSING'
  | 'READY_FOR_REVIEW'
  | 'UNDER_REVIEW'
  | 'CLARIFICATION_REQUESTED'
  | 'RESUBMITTED'
  | 'DECISION_RECORDED'
  | 'CLOSED'
  | 'PROCESSING_FAILED'
  | 'CANCELLED';

export type DocumentVersionStatus = 
  | 'UPLOADED'
  | 'QUARANTINED'
  | 'QUEUED'
  | 'PROCESSING'
  | 'EXTRACTED'
  | 'NEEDS_REVIEW'
  | 'FAILED'
  | 'REJECTED_FILE'
  | 'ARCHIVED';

export type SourceKind = 
  | 'APPLICANT_DECLARED'
  | 'AI_EXTRACTED'
  | 'REVIEWER_CONFIRMED'
  | 'AUTHORIZED_EXTERNAL'
  | 'SYNTHETIC_FIXTURE';

export type VerificationStatus = 
  | 'VERIFIED_MATCH'
  | 'VERIFIED_MISMATCH'
  | 'NOT_FOUND'
  | 'NOT_SUPPORTED'
  | 'UNAVAILABLE'
  | 'UNAUTHORIZED'
  | 'TIMEOUT'
  | 'ERROR'
  | 'SIMULATED_MATCH'
  | 'SIMULATED_MISMATCH';

export type RulePackStatus = 'DRAFT' | 'TESTED' | 'PUBLISHED' | 'SUPERSEDED' | 'RETIRED' | 'DEMO_ONLY';

export interface Institution {
  id: string;
  displayName: string;
  normalizedName: string;
  type: string;
  state: string;
  city: string;
  establishedYear: number;
  activeStatus: boolean;
  contactsMasked: string;
}

export interface ExtractedField {
  id: string;
  fieldKey: string;
  label: string;
  rawValue: string;
  normalizedValue: string;
  confidence: number | null;
  pageNumber: number;
  boundingBox?: { x: number; y: number; width: number; height: number };
  sourceDocumentId: string;
  sourceExcerpt?: string;
  reviewedValue?: string;
  reviewedBy?: string;
  reviewedAt?: string;
  status: 'PENDING' | 'CONFIRMED' | 'DISPUTED';
}

export interface ApplicationDocument {
  id: string;
  documentType: string;
  title: string;
  version: number;
  filename: string;
  mimeType: string;
  sizeBytes: number;
  sha256: string;
  uploadedAt: string;
  uploaderName: string;
  status: DocumentVersionStatus;
  pageCount: number;
  originalLanguage: string;
  translatedLanguage?: string;
  extractedFields: ExtractedField[];
  previewUrl?: string;
  pHash?: string;
  infraSignals?: {
    isFloorPlan?: boolean;
    duplicateCandidate?: boolean;
    duplicateTargetId?: string;
    ocrLabelDiscrepancy?: string;
  };
}

export interface EvidenceRef {
  kind: 'DOCUMENT' | 'EXTRACTED_FIELD' | 'SOURCE_RECORD' | 'SNAPSHOT';
  label: string;
  documentId?: string;
  pageNumber?: number;
  valueDisplay: string;
}

export interface Finding {
  id: string;
  applicationId: string;
  findingKey: string;
  status: FindingStatus;
  severity: FindingSeverity;
  result: CheckResult;
  title: string;
  whatObserved: string;
  whyItMatters: string;
  uncertaintyNote: string;
  recommendedNextStep: string;
  ruleCitation: {
    ruleKey: string;
    version: string;
    sourceLabel: string;
    sourceClause: string;
    edition?: string;
  };
  evidence: EvidenceRef[];
  resolutionReason?: string;
  resolvedBy?: string;
  resolvedAt?: string;
  createdAt: string;
}

export interface ChecklistItem {
  id: string;
  code: string;
  title: string;
  category: string;
  result: CheckResult;
  severity: FindingSeverity;
  requiredEvidence: string;
  applicableClause: string;
  findingId?: string;
}

export interface DigitalTwinAttribute {
  id: string;
  academicYear: string;
  attributeKey: string;
  attributeLabel: string;
  value: string | number;
  sourceKind: SourceKind;
  reviewStatus: 'UNREVIEWED' | 'CONFIRMED' | 'DISPUTED' | 'STALE' | 'EXPIRED';
  lastVerifiedAt: string;
  confidence: number | null;
  superseded?: boolean;
}

export interface Application {
  id: string;
  institutionId: string;
  institutionName: string;
  applicationType: 'EXTENSION_OF_APPROVAL' | 'NEW_PROGRAM' | 'VARIATION_IN_INTAKE';
  applicationCategory: string;
  academicYear: string;
  status: ApplicationStatus;
  requiredDocuments: { total: number; present: number; missing: number };
  openFindingsCount: { high: number; medium: number; low: number };
  deadlineAt: string;
  urgencyScore: number;
  assignedReviewerId?: string;
  assignedReviewerName?: string;
  createdAt: string;
  updatedAt: string;
  documents: ApplicationDocument[];
  findings: Finding[];
  checklist: ChecklistItem[];
  decision?: {
    decisionType: 'APPROVED' | 'REJECTED' | 'DEFERRED_FOR_INSPECTION';
    recordedBy: string;
    recordedAt: string;
    reason: string;
    citedEvidence: string[];
  };
}

export interface RuleDefinition {
  ruleId: string;
  version: string;
  title: string;
  description: string;
  categoryIds: string[];
  academicYears: string[];
  severity: FindingSeverity;
  status: RulePackStatus;
  predicate: {
    op: string;
    left: any;
    right?: any;
  };
  resultIfTrue: CheckResult;
  resultIfFalse: CheckResult;
  missingDataResult: CheckResult;
  explanationTemplate: string;
  recommendedNextAction: string;
  source: {
    title: string;
    publisher: string;
    edition: string;
    clause: string;
    page: number | null;
    status: 'OFFICIAL_SOURCE_REVIEWED' | 'DEMO_ONLY' | 'NEEDS_REVIEW';
  };
}

export interface RulePack {
  rulePackId: string;
  version: string;
  status: RulePackStatus;
  demoOnly: boolean;
  applicationCategory: string;
  academicYear: string;
  effectiveFrom: string;
  effectiveTo: string;
  sourceDisclaimer: string;
  rules: RuleDefinition[];
}

export interface EvidenceNode {
  id: string;
  nodeType: 'INSTITUTION' | 'APPLICATION' | 'DOCUMENT' | 'FIELD' | 'RULE' | 'FINDING' | 'EXTERNAL_RECORD';
  label: string;
  detail: string;
  status?: string;
  x?: number;
  y?: number;
}

export interface EvidenceEdge {
  id: string;
  sourceId: string;
  targetId: string;
  relation: string;
}

export interface BulkJobItem {
  id: string;
  applicationId: string;
  institutionName: string;
  category: string;
  status: 'PENDING' | 'PROCESSING' | 'SUCCEEDED' | 'FAILED' | 'SKIPPED';
  errorMessage?: string;
  processedAt?: string;
}

export interface BulkJob {
  id: string;
  batchName: string;
  totalItems: number;
  succeeded: number;
  failed: number;
  running: number;
  createdAt: string;
  status: 'RUNNING' | 'COMPLETED' | 'PARTIAL_FAILURE' | 'FAILED';
  items: BulkJobItem[];
}

export interface AuditEvent {
  id: string;
  timestamp: string;
  actor: string;
  role: string;
  action: string;
  institutionId?: string;
  applicationId?: string;
  correlationId: string;
  safeMetadata: Record<string, any>;
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  daysRemaining: number;
  urgency: 'HIGH' | 'MEDIUM' | 'LOW';
  relatedEntity: string;
  dueDate: string;
  acknowledged: boolean;
}
