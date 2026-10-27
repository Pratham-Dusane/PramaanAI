import { 
  Application, 
  Institution, 
  RulePack, 
  DigitalTwinAttribute, 
  EvidenceNode, 
  EvidenceEdge, 
  BulkJob, 
  AuditEvent, 
  NotificationItem 
} from '../types';

export const mockInstitutions: Institution[] = [
  {
    id: 'DEMO-INST-001',
    displayName: 'A.P.J. Abdul Kalam Institute of Technology',
    normalizedName: 'apj abdul kalam institute of technology',
    type: 'ENGINEERING_AND_TECHNOLOGY',
    state: 'Maharashtra',
    city: 'Pune',
    establishedYear: 2012,
    activeStatus: true,
    contactsMasked: 'pr******@abdul-kalam-tech.edu.in | +91 98******12'
  },
  {
    id: 'DEMO-INST-002',
    displayName: 'Sardar Patel Institute of Applied Science',
    normalizedName: 'sardar patel institute of applied science',
    type: 'MANAGEMENT_AND_TECHNOLOGY',
    state: 'Gujarat',
    city: 'Ahmedabad',
    establishedYear: 2018,
    activeStatus: true,
    contactsMasked: 'ad******@spias-edu.in | +91 94******44'
  }
];

export const mockApplications: Application[] = [
  {
    id: 'DEMO-EOA-2026-001',
    institutionId: 'DEMO-INST-001',
    institutionName: 'A.P.J. Abdul Kalam Institute of Technology',
    applicationType: 'EXTENSION_OF_APPROVAL',
    applicationCategory: 'DEMO_EOA',
    academicYear: '2026-27',
    status: 'READY_FOR_REVIEW',
    urgencyScore: 88,
    deadlineAt: '2026-11-15T23:59:59Z',
    requiredDocuments: { total: 8, present: 7, missing: 1 },
    openFindingsCount: { high: 1, medium: 2, low: 1 },
    assignedReviewerId: 'REV-402',
    assignedReviewerName: 'Dr. S. K. Raman (Senior Scrutiny Officer)',
    createdAt: '2026-10-18T10:30:00Z',
    updatedAt: '2026-10-25T14:15:00Z',
    checklist: [
      {
        id: 'CHK-01',
        code: 'REQ-FACULTY-COUNT',
        title: 'Faculty Cadre & Cadre Ratio Compliance',
        category: 'FACULTY',
        result: 'REVIEW',
        severity: 'MEDIUM',
        requiredEvidence: 'Certified Faculty Roster & Application Form Section B',
        applicableClause: 'APH 2024-27 Clause 7.1',
        findingId: 'FIND-001'
      },
      {
        id: 'CHK-02',
        code: 'REQ-OCCUPANCY-CERT',
        title: 'Occupancy & Fire Safety Certificate Validity',
        category: 'INFRASTRUCTURE',
        result: 'REVIEW',
        severity: 'HIGH',
        requiredEvidence: 'Municipal Fire NOC & Structural Stability Certificate',
        applicableClause: 'APH 2024-27 Clause 6.4',
        findingId: 'FIND-002'
      },
      {
        id: 'CHK-03',
        code: 'REQ-LAND-TITLE',
        title: 'Continuous Land Ownership & Title Deed Verification',
        category: 'LAND_AND_LEGAL',
        result: 'PASS',
        severity: 'LOW',
        requiredEvidence: 'Registered Sale Deed / 30-Year Lease Registration',
        applicableClause: 'APH 2024-27 Clause 6.1'
      },
      {
        id: 'CHK-04',
        code: 'REQ-LAB-EQUIPMENT',
        title: 'Computing Facility & Essential Laboratory Equipment',
        category: 'ACADEMIC_FACILITIES',
        result: 'PASS',
        severity: 'LOW',
        requiredEvidence: 'Stock Register Excerpt & Geotagged Lab Photographs',
        applicableClause: 'APH 2024-27 Clause 6.8'
      },
      {
        id: 'CHK-05',
        code: 'REQ-NBA-ACCREDITATION',
        title: 'Mandatory NBA / NAAC Program Accreditation Status',
        category: 'ACCREDITATION',
        result: 'INSUFFICIENT_EVIDENCE',
        severity: 'HIGH',
        requiredEvidence: 'NBA Accreditation Letter or SAR Submission Receipt',
        applicableClause: 'APH 2024-27 Clause 4.2',
        findingId: 'FIND-003'
      },
      {
        id: 'CHK-06',
        code: 'REQ-BARRIER-FREE-CAMPUS',
        title: 'Barrier-Free Environment for PwD Persons',
        category: 'ACCESSIBILITY',
        result: 'PASS',
        severity: 'LOW',
        requiredEvidence: 'Lift Certification & Ramp Layout Certificate',
        applicableClause: 'APH 2024-27 Clause 6.14'
      },
      {
        id: 'CHK-07',
        code: 'REQ-PHOTO-AUTHENTICITY',
        title: 'Infrastructure Photographic Verification',
        category: 'INFRASTRUCTURE',
        result: 'REVIEW',
        severity: 'MEDIUM',
        requiredEvidence: 'Geotagged Central Library & Workshop Images',
        applicableClause: 'APH 2024-27 Clause 6.18',
        findingId: 'FIND-004'
      }
    ],
    findings: [
      {
        id: 'FIND-001',
        applicationId: 'DEMO-EOA-2026-001',
        findingKey: 'FACULTY_COUNT_MISMATCH',
        status: 'OPEN',
        severity: 'MEDIUM',
        result: 'REVIEW',
        title: 'Faculty count differs across submitted records',
        whatObserved: 'Application Form Part-II declares 42 full-time faculty members; the uploaded certified Faculty Roster contains 39 unique parsed entries with valid PAN numbers.',
        whyItMatters: 'Cadre ratio validation requires 42 faculty for the approved 600 student intake (1:15 ratio). A deficit of 3 faculty members alters the required Cadre ratio from 1:2:6.',
        uncertaintyNote: 'OCR parsing of Page 3 table had 88% confidence; 2 entries on the bottom row may have been truncated or marked adjunct.',
        recommendedNextStep: 'Officer should inspect Faculty Roster Page 3 to confirm whether adjunct faculty were counted in the total.',
        ruleCitation: {
          ruleKey: 'DEMO.FACULTY.RATIO_CHECK',
          version: '1.0.0',
          sourceLabel: 'AICTE Approval Process Handbook 2024-27',
          sourceClause: 'Clause 7.1 (Faculty Cadre Norms)',
          edition: '2024-2027 Official Edition'
        },
        evidence: [
          {
            kind: 'EXTRACTED_FIELD',
            label: 'Declared Faculty Count in Form',
            documentId: 'DOC-FORM-001',
            pageNumber: 2,
            valueDisplay: '42 faculty'
          },
          {
            kind: 'EXTRACTED_FIELD',
            label: 'Extracted Unique Entries from Certified Roster',
            documentId: 'DOC-ROSTER-002',
            pageNumber: 3,
            valueDisplay: '39 faculty'
          }
        ],
        createdAt: '2026-10-22T11:45:00Z'
      },
      {
        id: 'FIND-002',
        applicationId: 'DEMO-EOA-2026-001',
        findingKey: 'FIRE_SAFETY_NOC_EXPIRED',
        status: 'OPEN',
        severity: 'HIGH',
        result: 'REVIEW',
        title: 'Municipal Fire Safety NOC appears expired prior to academic term',
        whatObserved: 'Uploaded Municipal Fire Department NOC indicates validity date "31-03-2026". The upcoming academic year 2026-27 begins on 01-08-2026.',
        whyItMatters: 'Continuous valid fire safety certificate is mandatory per safety bylaws for student occupancy during the active academic term.',
        uncertaintyNote: 'Date field was extracted with 96% confidence from certificate seal header.',
        recommendedNextStep: 'Applicant must submit renewal application acknowledgment or latest renewed NOC.',
        ruleCitation: {
          ruleKey: 'DEMO.SAFETY.FIRE_NOC_VALIDITY',
          version: '1.0.0',
          sourceLabel: 'AICTE Approval Process Handbook 2024-27',
          sourceClause: 'Clause 6.4 (Campus Safety Clearances)'
        },
        evidence: [
          {
            kind: 'EXTRACTED_FIELD',
            label: 'Extracted Validity Date',
            documentId: 'DOC-NOC-003',
            pageNumber: 1,
            valueDisplay: '31-03-2026'
          },
          {
            kind: 'SNAPSHOT',
            label: 'Evaluation Academic Term Start Date',
            valueDisplay: '01-08-2026'
          }
        ],
        createdAt: '2026-10-22T11:48:00Z'
      },
      {
        id: 'FIND-003',
        applicationId: 'DEMO-EOA-2026-001',
        findingKey: 'MANDATORY_NBA_CERT_ABSENT',
        status: 'OPEN',
        severity: 'HIGH',
        result: 'INSUFFICIENT_EVIDENCE',
        title: 'Required NBA Accreditation certificate not provided',
        whatObserved: 'Checklist requirement "Mandatory NBA Accreditation for Tier-1 Expansion" has no corresponding uploaded document.',
        whyItMatters: 'Autonomous expansion category DEMO_EOA requires at least 2 programs accredited by NBA.',
        uncertaintyNote: 'The applicant may have applied under normal EoA without expansion; verify selected sub-category.',
        recommendedNextStep: 'Request applicant to upload NBA approval letter or clarify tier eligibility.',
        ruleCitation: {
          ruleKey: 'DEMO.DOC.NBA_CERT_PRESENT',
          version: '1.0.0',
          sourceLabel: 'AICTE Approval Process Handbook 2024-27',
          sourceClause: 'Clause 4.2 (Accreditation Eligibility)'
        },
        evidence: [
          {
            kind: 'DOCUMENT',
            label: 'Checklist Slot: NBA Accreditation Document',
            valueDisplay: 'MISSING (No upload found)'
          }
        ],
        createdAt: '2026-10-22T11:50:00Z'
      },
      {
        id: 'FIND-004',
        applicationId: 'DEMO-EOA-2026-001',
        findingKey: 'INFRA_IMAGE_DUPLICATE_CANDIDATE',
        status: 'OPEN',
        severity: 'MEDIUM',
        result: 'REVIEW',
        title: 'Infrastructure photograph matches image submitted by another institution',
        whatObserved: 'Uploaded "Central Computer Center Photo" has perceptual similarity (pHash distance = 2) with an image uploaded by Sardar Patel Institute (DEMO-INST-002) in application DEMO-EOA-2026-002.',
        whyItMatters: 'Infrastructure facilities must be unique to the applying campus. Image reuse may indicate shared stock photography or uninspected facilities.',
        uncertaintyNote: 'This is a visual similarity candidate only, not a conclusive finding. Both colleges may have purchased stock photos from the same interior design contractor.',
        recommendedNextStep: 'Forward to Domain Expert / Inspector for physical campus verification.',
        ruleCitation: {
          ruleKey: 'DEMO.INFRA.IMAGE_UNIQUENESS',
          version: '1.0.0',
          sourceLabel: 'AICTE Integrity Framework',
          sourceClause: 'Integrity Rule 3.2 (Visual Evidence Authenticity)'
        },
        evidence: [
          {
            kind: 'DOCUMENT',
            label: 'Photo 1 (This Institution): Central Lab',
            documentId: 'DOC-PHOTO-004',
            pageNumber: 1,
            valueDisplay: 'SHA-256: e3b0c442... | pHash: 9a4f21b7'
          },
          {
            kind: 'DOCUMENT',
            label: 'Photo 2 (Sardar Patel Inst): Computer Room',
            documentId: 'DOC-PHOTO-SP-01',
            pageNumber: 1,
            valueDisplay: 'SHA-256: d81f9a23... | pHash: 9a4f21b5 (98.4% visual match)'
          }
        ],
        createdAt: '2026-10-23T09:20:00Z'
      }
    ],
    documents: [
      {
        id: 'DOC-FORM-001',
        documentType: 'APPLICATION_FORM',
        title: 'Part I & Part II Consolidated Application Form',
        version: 1,
        filename: 'APJ_Tech_EoA_Form_2026.pdf',
        mimeType: 'application/pdf',
        sizeBytes: 4210980,
        sha256: 'a1b2c3d4e5f60718293a4b5c6d7e8f90123456789abcdef0123456789abcdef0',
        uploadedAt: '2026-10-18T10:32:00Z',
        uploaderName: 'Dr. Ramesh Joshi (Registrar)',
        status: 'EXTRACTED',
        pageCount: 14,
        originalLanguage: 'en',
        previewUrl: '/mock/preview_form.png',
        extractedFields: [
          {
            id: 'FLD-01',
            fieldKey: 'declared_faculty_count',
            label: 'Total Full-Time Faculty Count',
            rawValue: '42',
            normalizedValue: '42',
            confidence: 0.99,
            pageNumber: 2,
            boundingBox: { x: 120, y: 340, width: 80, height: 24 },
            sourceDocumentId: 'DOC-FORM-001',
            sourceExcerpt: 'Total sanctioned and in-position teaching faculty: 42',
            status: 'CONFIRMED'
          },
          {
            id: 'FLD-02',
            fieldKey: 'total_builtup_area',
            label: 'Total Instructional Built-Up Area (sq.m.)',
            rawValue: '14,850 sq. m',
            normalizedValue: '14850',
            confidence: 0.97,
            pageNumber: 5,
            boundingBox: { x: 180, y: 460, width: 140, height: 28 },
            sourceDocumentId: 'DOC-FORM-001',
            sourceExcerpt: 'Total Instructional Carpet Area ready for use: 14850 sq.m.',
            status: 'CONFIRMED'
          },
          {
            id: 'FLD-03',
            fieldKey: 'principal_name',
            label: 'Principal / Director Name',
            rawValue: 'Dr. Anand M. Deshmukh',
            normalizedValue: 'Anand M Deshmukh',
            confidence: 0.98,
            pageNumber: 1,
            boundingBox: { x: 140, y: 210, width: 220, height: 30 },
            sourceDocumentId: 'DOC-FORM-001',
            sourceExcerpt: 'Head of Institution: Dr. Anand M. Deshmukh, Ph.D (IIT Bombay)',
            status: 'CONFIRMED'
          }
        ]
      },
      {
        id: 'DOC-ROSTER-002',
        documentType: 'FACULTY_ROSTER',
        title: 'Approved Teaching Faculty Roster with PAN & Qualifications',
        version: 1,
        filename: 'Approved_Faculty_Roster_2026.pdf',
        mimeType: 'application/pdf',
        sizeBytes: 2890120,
        sha256: 'b2c3d4e5f60718293a4b5c6d7e8f90123456789abcdef0123456789abcdef01',
        uploadedAt: '2026-10-18T10:45:00Z',
        uploaderName: 'Dr. Ramesh Joshi (Registrar)',
        status: 'EXTRACTED',
        pageCount: 5,
        originalLanguage: 'en',
        extractedFields: [
          {
            id: 'FLD-04',
            fieldKey: 'parsed_faculty_entries',
            label: 'Parsed Unique Faculty Roster Entries',
            rawValue: '39 entries detected',
            normalizedValue: '39',
            confidence: 0.88,
            pageNumber: 3,
            boundingBox: { x: 40, y: 150, width: 500, height: 400 },
            sourceDocumentId: 'DOC-ROSTER-002',
            sourceExcerpt: 'Table rows 1 through 39 containing valid Aadhaar/PAN mappings',
            status: 'DISPUTED'
          }
        ]
      },
      {
        id: 'DOC-NOC-003',
        documentType: 'FIRE_SAFETY_NOC',
        title: 'Municipal Fire Safety Department Compliance NOC',
        version: 1,
        filename: 'Pune_PMC_Fire_NOC_2025_26.pdf',
        mimeType: 'application/pdf',
        sizeBytes: 1420800,
        sha256: 'c3d4e5f60718293a4b5c6d7e8f90123456789abcdef0123456789abcdef012',
        uploadedAt: '2026-10-18T10:50:00Z',
        uploaderName: 'Dr. Ramesh Joshi (Registrar)',
        status: 'EXTRACTED',
        pageCount: 2,
        originalLanguage: 'mr',
        translatedLanguage: 'en',
        extractedFields: [
          {
            id: 'FLD-05',
            fieldKey: 'fire_noc_validity_date',
            label: 'Fire NOC Expiration Date',
            rawValue: 'दिनांक ३१ मार्च २०२६ पर्यंत वैध (Valid until 31-03-2026)',
            normalizedValue: '2026-03-31',
            confidence: 0.96,
            pageNumber: 1,
            boundingBox: { x: 80, y: 520, width: 340, height: 40 },
            sourceDocumentId: 'DOC-NOC-003',
            sourceExcerpt: 'सदर प्रमाणपत्र दिनांक ३१/०३/२०२६ पर्यंत वैध राहील.',
            reviewedValue: '2026-03-31',
            reviewedBy: 'Dr. S. K. Raman',
            reviewedAt: '2026-10-22T11:46:00Z',
            status: 'CONFIRMED'
          }
        ]
      },
      {
        id: 'DOC-PHOTO-004',
        documentType: 'INFRASTRUCTURE_PHOTO',
        title: 'Geotagged Photograph - Central Computer Center & Server Room',
        version: 1,
        filename: 'Campus_Computer_Center_Geo.jpg',
        mimeType: 'image/jpeg',
        sizeBytes: 3105000,
        sha256: 'd4e5f60718293a4b5c6d7e8f90123456789abcdef0123456789abcdef0123',
        pHash: '9a4f21b7c3d2e1f0',
        uploadedAt: '2026-10-18T11:02:00Z',
        uploaderName: 'Dr. Ramesh Joshi (Registrar)',
        status: 'NEEDS_REVIEW',
        pageCount: 1,
        originalLanguage: 'en',
        infraSignals: {
          duplicateCandidate: true,
          duplicateTargetId: 'DEMO-EOA-2026-002',
          ocrLabelDiscrepancy: 'Banner in background reads "SP Applied Lab 2" while declared as APJ Tech Lab'
        },
        extractedFields: []
      },
      {
        id: 'DOC-FLOOR-005',
        documentType: 'ARCHITECTURAL_PLAN',
        title: 'Approved Architectural Campus Layout & Floor Plan',
        version: 1,
        filename: 'Approved_Master_Floor_Plan_Bldg_A.pdf',
        mimeType: 'application/pdf',
        sizeBytes: 8940000,
        sha256: 'e5f60718293a4b5c6d7e8f90123456789abcdef0123456789abcdef01234',
        uploadedAt: '2026-10-18T11:10:00Z',
        uploaderName: 'Dr. Ramesh Joshi (Registrar)',
        status: 'EXTRACTED',
        pageCount: 3,
        originalLanguage: 'en',
        infraSignals: {
          isFloorPlan: true,
          ocrLabelDiscrepancy: 'Classroom C-204 labeled 54 sq.m. on blueprint vs 66 sq.m. in form schedule'
        },
        extractedFields: []
      }
    ]
  },
  {
    id: 'DEMO-EOA-2025-001',
    institutionId: 'DEMO-INST-001',
    institutionName: 'A.P.J. Abdul Kalam Institute of Technology',
    applicationType: 'EXTENSION_OF_APPROVAL',
    applicationCategory: 'DEMO_EOA',
    academicYear: '2025-26',
    status: 'DECISION_RECORDED',
    urgencyScore: 10,
    deadlineAt: '2025-05-30T23:59:59Z',
    requiredDocuments: { total: 7, present: 7, missing: 0 },
    openFindingsCount: { high: 0, medium: 0, low: 0 },
    assignedReviewerId: 'REV-402',
    assignedReviewerName: 'Dr. S. K. Raman',
    createdAt: '2025-04-12T09:00:00Z',
    updatedAt: '2025-05-20T16:00:00Z',
    decision: {
      decisionType: 'APPROVED',
      recordedBy: 'Shri A. P. Mehta (Regional Officer, AICTE WRO)',
      recordedAt: '2025-05-22T14:30:00Z',
      reason: 'All cadre norms, land requirements and fire clearances met after scrutiny committee verification.',
      citedEvidence: ['DOC-2025-FORM', 'DOC-2025-ROSTER', 'DOC-2025-FIRE']
    },
    checklist: [],
    findings: [],
    documents: []
  },
  {
    id: 'DEMO-EOA-2026-002',
    institutionId: 'DEMO-INST-002',
    institutionName: 'Sardar Patel Institute of Applied Science',
    applicationType: 'EXTENSION_OF_APPROVAL',
    applicationCategory: 'DEMO_EOA',
    academicYear: '2026-27',
    status: 'UNDER_REVIEW',
    urgencyScore: 65,
    deadlineAt: '2026-11-20T23:59:59Z',
    requiredDocuments: { total: 8, present: 8, missing: 0 },
    openFindingsCount: { high: 0, medium: 1, low: 0 },
    assignedReviewerId: 'REV-305',
    assignedReviewerName: 'Prof. Anjali Saxena',
    createdAt: '2026-10-15T14:00:00Z',
    updatedAt: '2026-10-24T11:00:00Z',
    checklist: [],
    findings: [],
    documents: []
  },
  {
    id: 'DEMO-NEW-2026-003',
    institutionId: 'DEMO-INST-003',
    institutionName: 'Bangalore Institute of Advanced Computing',
    applicationType: 'NEW_PROGRAM',
    applicationCategory: 'DEMO_NEW_INSTITUTION',
    academicYear: '2026-27',
    status: 'READY_FOR_REVIEW',
    urgencyScore: 92,
    deadlineAt: '2026-11-10T23:59:59Z',
    requiredDocuments: { total: 10, present: 9, missing: 1 },
    openFindingsCount: { high: 2, medium: 1, low: 0 },
    assignedReviewerId: 'REV-402',
    assignedReviewerName: 'Dr. S. K. Raman (Senior Scrutiny Officer)',
    createdAt: '2026-10-20T08:00:00Z',
    updatedAt: '2026-10-26T16:20:00Z',
    checklist: [],
    findings: [],
    documents: []
  },
  {
    id: 'DEMO-EOA-2026-004',
    institutionId: 'DEMO-INST-004',
    institutionName: 'Chennai Metropolitan School of Technology',
    applicationType: 'EXTENSION_OF_APPROVAL',
    applicationCategory: 'DEMO_EOA',
    academicYear: '2026-27',
    status: 'UNDER_REVIEW',
    urgencyScore: 78,
    deadlineAt: '2026-11-18T23:59:59Z',
    requiredDocuments: { total: 8, present: 8, missing: 0 },
    openFindingsCount: { high: 1, medium: 0, low: 2 },
    assignedReviewerId: 'REV-305',
    assignedReviewerName: 'Prof. Anjali Saxena',
    createdAt: '2026-10-19T11:30:00Z',
    updatedAt: '2026-10-25T15:45:00Z',
    checklist: [],
    findings: [],
    documents: []
  }
];

export const mockDigitalTwinAttributes: DigitalTwinAttribute[] = [
  {
    id: 'TWIN-01',
    academicYear: '2026-27',
    attributeKey: 'teaching_faculty_count',
    attributeLabel: 'Approved Faculty Count',
    value: 42,
    sourceKind: 'APPLICANT_DECLARED',
    reviewStatus: 'DISPUTED',
    lastVerifiedAt: '2026-10-22T11:45:00Z',
    confidence: 0.99
  },
  {
    id: 'TWIN-02',
    academicYear: '2025-26',
    attributeKey: 'teaching_faculty_count',
    attributeLabel: 'Approved Faculty Count',
    value: 38,
    sourceKind: 'REVIEWER_CONFIRMED',
    reviewStatus: 'CONFIRMED',
    lastVerifiedAt: '2025-05-20T16:00:00Z',
    confidence: 1.0,
    superseded: true
  },
  {
    id: 'TWIN-03',
    academicYear: '2026-27',
    attributeKey: 'instructional_carpet_area',
    attributeLabel: 'Instructional Built-Up Carpet Area (sq.m.)',
    value: 14850,
    sourceKind: 'REVIEWER_CONFIRMED',
    reviewStatus: 'CONFIRMED',
    lastVerifiedAt: '2026-10-20T10:00:00Z',
    confidence: 0.97
  },
  {
    id: 'TWIN-04',
    academicYear: '2025-26',
    attributeKey: 'instructional_carpet_area',
    attributeLabel: 'Instructional Built-Up Carpet Area (sq.m.)',
    value: 13200,
    sourceKind: 'REVIEWER_CONFIRMED',
    reviewStatus: 'CONFIRMED',
    lastVerifiedAt: '2025-05-20T16:00:00Z',
    confidence: 1.0,
    superseded: true
  },
  {
    id: 'TWIN-05',
    academicYear: '2026-27',
    attributeKey: 'principal_name',
    attributeLabel: 'Principal / Director in Charge',
    value: 'Dr. Anand M. Deshmukh',
    sourceKind: 'AUTHORIZED_EXTERNAL',
    reviewStatus: 'CONFIRMED',
    lastVerifiedAt: '2026-10-18T12:00:00Z',
    confidence: 1.0
  },
  {
    id: 'TWIN-06',
    academicYear: '2026-27',
    attributeKey: 'fire_safety_noc_expiry',
    attributeLabel: 'Fire Safety NOC Expiry Date',
    value: '2026-03-31',
    sourceKind: 'AI_EXTRACTED',
    reviewStatus: 'EXPIRED',
    lastVerifiedAt: '2026-10-18T10:50:00Z',
    confidence: 0.96
  }
];

export const mockEvidenceNodes: EvidenceNode[] = [
  { id: 'node-inst', nodeType: 'INSTITUTION', label: 'A.P.J. Abdul Kalam Institute', detail: 'DEMO-INST-001 (Pune, MH)' },
  { id: 'node-app', nodeType: 'APPLICATION', label: 'EoA 2026-27', detail: 'DEMO-EOA-2026-001 | Status: READY_FOR_REVIEW' },
  { id: 'node-doc-form', nodeType: 'DOCUMENT', label: 'Application Form Part-II', detail: 'DOC-FORM-001 (SHA-256 Verified)' },
  { id: 'node-doc-roster', nodeType: 'DOCUMENT', label: 'Faculty Roster 2026', detail: 'DOC-ROSTER-002 (5 Pages, Extracted)' },
  { id: 'node-fld-count1', nodeType: 'FIELD', label: 'Declared Faculty = 42', detail: 'Page 2, Box [120, 340], Conf: 99%' },
  { id: 'node-fld-count2', nodeType: 'FIELD', label: 'Parsed Faculty = 39', detail: 'Page 3, Table Scan, Conf: 88%' },
  { id: 'node-rule-ratio', nodeType: 'RULE', label: 'Rule: Faculty Cadre 7.1', detail: 'DEMO_EOA_2026 v1.0.0 (Allowlisted Predicate)' },
  { id: 'node-find-mismatch', nodeType: 'FINDING', label: 'Faculty Count Mismatch', detail: 'FIND-001 (Severity: MEDIUM, Status: OPEN)' },
  { id: 'node-doc-noc', nodeType: 'DOCUMENT', label: 'Municipal Fire NOC', detail: 'DOC-NOC-003 (Marathi, Translated)' },
  { id: 'node-fld-expiry', nodeType: 'FIELD', label: 'Expiry: 31-03-2026', detail: 'Page 1 Seal, Conf: 96%' },
  { id: 'node-find-expiry', nodeType: 'FINDING', label: 'NOC Expired Prior to Term', detail: 'FIND-002 (Severity: HIGH, Status: OPEN)' }
];

export const mockEvidenceEdges: EvidenceEdge[] = [
  { id: 'edge-1', sourceId: 'node-inst', targetId: 'node-app', relation: 'SUBMITS' },
  { id: 'edge-2', sourceId: 'node-app', targetId: 'node-doc-form', relation: 'INCLUDES' },
  { id: 'edge-3', sourceId: 'node-app', targetId: 'node-doc-roster', relation: 'INCLUDES' },
  { id: 'edge-4', sourceId: 'node-app', targetId: 'node-doc-noc', relation: 'INCLUDES' },
  { id: 'edge-5', sourceId: 'node-doc-form', targetId: 'node-fld-count1', relation: 'EXTRACTS' },
  { id: 'edge-6', sourceId: 'node-doc-roster', targetId: 'node-fld-count2', relation: 'EXTRACTS' },
  { id: 'edge-7', sourceId: 'node-doc-noc', targetId: 'node-fld-expiry', relation: 'EXTRACTS' },
  { id: 'edge-8', sourceId: 'node-fld-count1', targetId: 'node-rule-ratio', relation: 'EVALUATED_BY' },
  { id: 'edge-9', sourceId: 'node-fld-count2', targetId: 'node-rule-ratio', relation: 'COMPARED_AGAINST' },
  { id: 'edge-10', sourceId: 'node-rule-ratio', targetId: 'node-find-mismatch', relation: 'CREATES' },
  { id: 'edge-11', sourceId: 'node-fld-expiry', targetId: 'node-find-expiry', relation: 'TRIGGERS' }
];

export const mockRulePacks: RulePack[] = [
  {
    rulePackId: 'DEMO_EOA_2026',
    version: '1.0.0',
    status: 'PUBLISHED',
    demoOnly: true,
    applicationCategory: 'DEMO_EOA',
    academicYear: '2026-27',
    effectiveFrom: '2026-04-01',
    effectiveTo: '2027-03-31',
    sourceDisclaimer: 'All rules are synthetic demonstrations; verified citations map to APH 2024-2027 clauses.',
    rules: [
      {
        ruleId: 'DEMO.DOC.FACULTY_CERT_PRESENT',
        version: '1.0.0',
        title: 'Faculty credential evidence is present',
        description: 'Verifies certified faculty roster is submitted for scrutiny.',
        categoryIds: ['DEMO_EOA'],
        academicYears: ['2026-27'],
        severity: 'MEDIUM',
        status: 'PUBLISHED',
        predicate: { op: 'exists', left: { path: 'documents.faculty_roster' } },
        resultIfTrue: 'PASS',
        resultIfFalse: 'INSUFFICIENT_EVIDENCE',
        missingDataResult: 'INSUFFICIENT_EVIDENCE',
        explanationTemplate: 'Faculty roster evidence is verified as present.',
        recommendedNextAction: 'Proceed to cadre ratio validation.',
        source: {
          title: 'Approval Process Handbook 2024-27',
          publisher: 'AICTE New Delhi',
          edition: '2024-27',
          clause: 'Clause 7.1',
          page: 84,
          status: 'OFFICIAL_SOURCE_REVIEWED'
        }
      },
      {
        ruleId: 'DEMO.SAFETY.FIRE_NOC_VALIDITY',
        version: '1.0.0',
        title: 'Fire Safety NOC Validity for Academic Year',
        description: 'NOC validity date must extend beyond the start of the academic term.',
        categoryIds: ['DEMO_EOA'],
        academicYears: ['2026-27'],
        severity: 'HIGH',
        status: 'PUBLISHED',
        predicate: {
          op: 'date_after',
          left: { path: 'documents.fire_safety_noc.valid_until' },
          right: { path: 'context.academic_term_start' }
        },
        resultIfTrue: 'PASS',
        resultIfFalse: 'REVIEW',
        missingDataResult: 'INSUFFICIENT_EVIDENCE',
        explanationTemplate: 'Fire safety certificate valid until {valid_until}; academic term start {term_start}.',
        recommendedNextAction: 'Request renewed fire NOC or certificate of undertaking.',
        source: {
          title: 'Approval Process Handbook 2024-27',
          publisher: 'AICTE New Delhi',
          edition: '2024-27',
          clause: 'Clause 6.4',
          page: 62,
          status: 'OFFICIAL_SOURCE_REVIEWED'
        }
      },
      {
        ruleId: 'DEMO.FACULTY.RATIO_CHECK',
        version: '1.0.0',
        title: 'Cadre & Student-to-Faculty Ratio 1:15 Compliance',
        description: 'Declared faculty count must match unique extracted entries from certified roster.',
        categoryIds: ['DEMO_EOA'],
        academicYears: ['2026-27'],
        severity: 'MEDIUM',
        status: 'PUBLISHED',
        predicate: {
          op: 'equals',
          left: { path: 'form.declared_faculty_count' },
          right: { path: 'documents.faculty_roster.unique_count' }
        },
        resultIfTrue: 'PASS',
        resultIfFalse: 'REVIEW',
        missingDataResult: 'INSUFFICIENT_EVIDENCE',
        explanationTemplate: 'Declared count ({left}) compared to extracted count ({right}).',
        recommendedNextAction: 'Scrutiny officer must manually verify roster page 3 rows.',
        source: {
          title: 'Approval Process Handbook 2024-27',
          publisher: 'AICTE New Delhi',
          edition: '2024-27',
          clause: 'Clause 7.1',
          page: 85,
          status: 'OFFICIAL_SOURCE_REVIEWED'
        }
      }
    ]
  },
  {
    rulePackId: 'DEMO_EOA_2027',
    version: '0.2.0',
    status: 'DRAFT',
    demoOnly: true,
    applicationCategory: 'DEMO_EOA',
    academicYear: '2027-28',
    effectiveFrom: '2027-04-01',
    effectiveTo: '2028-03-31',
    sourceDisclaimer: 'Draft version introducing stricter 1:12 faculty ratio for autonomous departments.',
    rules: [
      {
        ruleId: 'DRAFT.RATIO.AUTONOMOUS_12',
        version: '0.2.0',
        title: 'Autonomous Faculty Ratio 1:12 Strict Enforcement',
        description: 'Autonomous institutions require 1:12 faculty to student ratio.',
        categoryIds: ['DEMO_EOA'],
        academicYears: ['2027-28'],
        severity: 'HIGH',
        status: 'DRAFT',
        predicate: { op: 'numeric_gte', left: { path: 'calculated.ratio' }, right: { value: 12 } },
        resultIfTrue: 'PASS',
        resultIfFalse: 'REVIEW',
        missingDataResult: 'INSUFFICIENT_EVIDENCE',
        explanationTemplate: 'Autonomous ratio enforced at 1:12.',
        recommendedNextAction: 'Notify institution to recruit additional associate professors.',
        source: {
          title: 'Proposed AICTE Policy 2027',
          publisher: 'AICTE Policy Bureau',
          edition: '2027 Draft',
          clause: 'Clause 8.1 (Draft)',
          page: 92,
          status: 'NEEDS_REVIEW'
        }
      }
    ]
  }
];

export const mockBulkJobs: BulkJob[] = [
  {
    id: 'BATCH-2026-004',
    batchName: 'Western Region Engineering Batch #04',
    totalItems: 5,
    succeeded: 4,
    failed: 1,
    running: 0,
    status: 'PARTIAL_FAILURE',
    createdAt: '2026-10-25T11:00:00Z',
    items: [
      {
        id: 'ITEM-01',
        applicationId: 'DEMO-EOA-2026-001',
        institutionName: 'A.P.J. Abdul Kalam Institute of Technology',
        category: 'DEMO_EOA',
        status: 'SUCCEEDED',
        processedAt: '2026-10-25T11:02:14Z'
      },
      {
        id: 'ITEM-02',
        applicationId: 'DEMO-EOA-2026-002',
        institutionName: 'Sardar Patel Institute of Applied Science',
        category: 'DEMO_EOA',
        status: 'SUCCEEDED',
        processedAt: '2026-10-25T11:03:02Z'
      },
      {
        id: 'ITEM-03',
        applicationId: 'DEMO-EOA-2026-003',
        institutionName: 'Vidya Vikas College of Engineering',
        category: 'DEMO_EOA',
        status: 'FAILED',
        errorMessage: 'Corrupt PDF signature on Land_Registry.pdf: magic bytes mismatch',
        processedAt: '2026-10-25T11:04:12Z'
      },
      {
        id: 'ITEM-04',
        applicationId: 'DEMO-EOA-2026-004',
        institutionName: 'Sinhgad Technical Campus',
        category: 'DEMO_EOA',
        status: 'SUCCEEDED',
        processedAt: '2026-10-25T11:05:40Z'
      },
      {
        id: 'ITEM-05',
        applicationId: 'DEMO-EOA-2026-005',
        institutionName: 'Maharashtra Institute of Technology Alandi',
        category: 'DEMO_EOA',
        status: 'SUCCEEDED',
        processedAt: '2026-10-25T11:06:55Z'
      }
    ]
  }
];

export const mockNotifications: NotificationItem[] = [
  {
    id: 'NOTIF-01',
    title: 'Fire NOC Certificate Expiry Imminent',
    description: 'DEMO-INST-001 Municipal Fire Safety NOC validity expires on 31-03-2026 before 2026-27 term start.',
    daysRemaining: 1,
    urgency: 'HIGH',
    relatedEntity: 'DEMO-EOA-2026-001',
    dueDate: '2026-10-27T00:00:00Z',
    acknowledged: false
  },
  {
    id: 'NOTIF-02',
    title: 'Clarification Response Window Closing',
    description: 'Applicant must respond to Faculty Cadre query within 7 days to maintain current scrutiny priority.',
    daysRemaining: 7,
    urgency: 'MEDIUM',
    relatedEntity: 'DEMO-EOA-2026-001',
    dueDate: '2026-11-02T18:00:00Z',
    acknowledged: false
  },
  {
    id: 'NOTIF-03',
    title: 'Extension of Approval Cycle Deadline',
    description: 'Final human decision recording deadline for Western Region Cycle 1 applications.',
    daysRemaining: 20,
    urgency: 'LOW',
    relatedEntity: 'Regional Scrutiny Board',
    dueDate: '2026-11-15T23:59:59Z',
    acknowledged: true
  }
];

export const mockAuditEvents: AuditEvent[] = [
  {
    id: 'AUD-901',
    timestamp: '2026-10-25T14:15:00Z',
    actor: 'Dr. S. K. Raman',
    role: 'SCRUTINY_OFFICER',
    action: 'FINDING_RESOLVED',
    applicationId: 'DEMO-EOA-2026-001',
    correlationId: 'c1b48f92-56fa-4921-9923-d3c5092a11b0',
    safeMetadata: { findingKey: 'FACULTY_COUNT_MISMATCH', actionReason: 'Requested roster recheck from applicant' }
  },
  {
    id: 'AUD-902',
    timestamp: '2026-10-22T11:46:00Z',
    actor: 'Dr. S. K. Raman',
    role: 'SCRUTINY_OFFICER',
    action: 'EXTRACTED_FIELD_REVIEWED',
    applicationId: 'DEMO-EOA-2026-001',
    correlationId: 'a40fc5b3-9d69-4d8b-a4f4-f53c97fc3183',
    safeMetadata: { fieldKey: 'fire_noc_validity_date', reviewedValue: '2026-03-31' }
  },
  {
    id: 'AUD-903',
    timestamp: '2026-10-18T10:32:00Z',
    actor: 'Dr. Ramesh Joshi',
    role: 'APPLICANT',
    action: 'DOCUMENT_UPLOADED',
    applicationId: 'DEMO-EOA-2026-001',
    institutionId: 'DEMO-INST-001',
    correlationId: 'e207b899-7104-41d3-9bc5-bc108849646b',
    safeMetadata: { filename: 'APJ_Tech_EoA_Form_2026.pdf', sha256: 'a1b2c3d4...' }
  },
  {
    id: 'AUD-904',
    timestamp: '2025-05-22T14:30:00Z',
    actor: 'Shri A. P. Mehta',
    role: 'SENIOR_APPROVER',
    action: 'HUMAN_DECISION_RECORDED',
    applicationId: 'DEMO-EOA-2025-001',
    institutionId: 'DEMO-INST-001',
    correlationId: 'f9301da2-09c3-4211-8201-192a00bc31fe',
    safeMetadata: { decision: 'APPROVED', academicYear: '2025-26' }
  }
];

export const mockCopilotCorpus = [
  {
    queryMatch: 'faculty ratio',
    answer: 'Under Section 7.1 of the Approval Process Handbook 2024–2027, the prescribed Faculty-to-Student Ratio for Engineering & Technology programs at the Undergraduate Degree level is 1:15. For Postgraduate courses, the mandated ratio is 1:12. The faculty cadre ratio should strictly be 1:2:6 (1 Professor : 2 Associate Professors : 6 Assistant Professors).',
    citations: [
      {
        sourceTitle: 'AICTE Approval Process Handbook 2024–2027',
        section: 'Chapter VII: Norms for Faculty Requirements',
        page: 84,
        clause: 'Clause 7.1',
        excerpt: 'The Cadre Ratio shall be 1:2:6 for Engineering and Technology undergraduate degree courses.'
      }
    ],
    limitations: 'Based on configured Approval Process Handbook 2024–2027; verify subsequent circulars for autonomous status exceptions.'
  },
  {
    queryMatch: 'satellite imagery',
    answer: 'Per Clause 6.18 of the Approval Process Handbook, satellite imagery and public map screenshots cannot be accepted as standalone proof of land ownership, continuous boundary, or building completion. All built-up area declarations require architect-certified structural plans, registered land revenue 7/12 extracts, and physical verification by an authorized Scrutiny Committee / Expert Visit Committee (EVC).',
    citations: [
      {
        sourceTitle: 'AICTE Approval Process Handbook 2024–2027',
        section: 'Chapter VI: Norms for Land and Built-up Area',
        page: 63,
        clause: 'Clause 6.18',
        excerpt: 'Satellite imagery or web maps do not constitute admissible legal evidence of campus infrastructure compliance.'
      }
    ],
    limitations: 'Corpus strictly disallows unverified remote sensing data as regulatory evidence.'
  },
  {
    queryMatch: 'injection',
    answer: 'System Security Notice: The input contains an adversarial instruction ("ignore previous instructions"). Untrusted input from user queries or document text layers cannot alter system role assignments, rule packs, or validation results. All AI responses are strictly advisory and require authenticated human reviewer approval.',
    citations: [
      {
        sourceTitle: 'AICTE Security & Integrity Framework',
        section: 'Section 4: Adversarial Input Sanitization',
        page: 12,
        clause: 'Safety Invariant 6',
        excerpt: 'Model output is untrusted and schema-validated. OCR text is processed as data, never executed as control instructions.'
      }
    ],
    limitations: 'Prompt injection defense activated.'
  }
];
