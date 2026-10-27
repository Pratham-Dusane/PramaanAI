import {
  ContextSnapshot,
  ScoreRun,
  PolicyGate,
  MethodologyRecommendation,
  PreVisitBrief,
  ModeComparison,
  ChannelMatrixItem,
  RecommendationReview,
} from '../types';

// ─── Context Snapshots ───

export const mockContextSnapshots: ContextSnapshot[] = [
  {
    id: 'CTX-SNAP-001',
    applicationVersionId: 'DEMO-EOA-2026-001-v2',
    pipelineVersion: '1.4.0',
    featureSetVersion: '2.1.0',
    createdAt: '2026-10-27T10:30:00Z',
    features: [
      { featureId: 'F-C1-001', featureLabel: 'Checklist completion rate', family: 'C1', value: 0.82, coverageState: 'OBSERVED', confidence: 0.95, evidenceNodeIds: ['DOC-001', 'DOC-002', 'DOC-005'] },
      { featureId: 'F-C1-002', featureLabel: 'Critical findings count', family: 'C1', value: 3, coverageState: 'OBSERVED', confidence: 1.0, evidenceNodeIds: ['FND-001', 'FND-002', 'FND-003'] },
      { featureId: 'F-C1-003', featureLabel: 'Missing required documents', family: 'C1', value: 2, coverageState: 'OBSERVED', confidence: 1.0, evidenceNodeIds: ['DOC-CHK-001'] },
      { featureId: 'F-C2-001', featureLabel: 'Source verification rate', family: 'C2', value: 0.67, coverageState: 'OBSERVED', confidence: 0.88, evidenceNodeIds: ['VER-001', 'VER-002'] },
      { featureId: 'F-C2-002', featureLabel: 'Verified mismatches found', family: 'C2', value: 1, coverageState: 'OBSERVED', confidence: 1.0, evidenceNodeIds: ['VER-003'] },
      { featureId: 'F-C2-003', featureLabel: 'Connectors unavailable', family: 'C2', value: 2, coverageState: 'OBSERVED', confidence: 1.0, evidenceNodeIds: ['CON-001'] },
      { featureId: 'F-C3-001', featureLabel: 'Exact duplicate documents', family: 'C3', value: 0, coverageState: 'OBSERVED', confidence: 1.0, evidenceNodeIds: [] },
      { featureId: 'F-C3-002', featureLabel: 'Near-duplicate image pairs', family: 'C3', value: 2, coverageState: 'OBSERVED', confidence: 0.78, evidenceNodeIds: ['IMG-DUP-001', 'IMG-DUP-002'] },
      { featureId: 'F-C3-003', featureLabel: 'Hash reuse across institutions', family: 'C3', value: 0, coverageState: 'NOT_AVAILABLE', confidence: null, evidenceNodeIds: [] },
      { featureId: 'F-C4-001', featureLabel: 'Infrastructure photo coverage', family: 'C4', value: 0.72, coverageState: 'OBSERVED', confidence: 0.82, evidenceNodeIds: ['DOC-INFRA-001', 'DOC-INFRA-002'] },
      { featureId: 'F-C4-002', featureLabel: 'Floor plan consistency', family: 'C4', value: 'MISMATCH_DETECTED', coverageState: 'OBSERVED', confidence: 0.68, evidenceNodeIds: ['DOC-FP-001'] },
      { featureId: 'F-C4-003', featureLabel: 'Video evidence duration (min)', family: 'C4', value: 0, coverageState: 'NOT_AVAILABLE', confidence: null, evidenceNodeIds: [] },
      { featureId: 'F-C5-001', featureLabel: 'Prior approval deficiencies (open)', family: 'C5', value: 2, coverageState: 'OBSERVED', confidence: 0.90, evidenceNodeIds: ['TWIN-DEF-001', 'TWIN-DEF-002'] },
      { featureId: 'F-C5-002', featureLabel: 'Years since last verified visit', family: 'C5', value: 3, coverageState: 'OBSERVED', confidence: 0.85, evidenceNodeIds: ['TWIN-VISIT-001'] },
      { featureId: 'F-C6-001', featureLabel: 'Application category', family: 'C6', value: 'VARIATION_IN_INTAKE', coverageState: 'OBSERVED', confidence: 1.0, evidenceNodeIds: ['APP-001'] },
      { featureId: 'F-C6-002', featureLabel: 'Intake change magnitude (%)', family: 'C6', value: 50, coverageState: 'OBSERVED', confidence: 1.0, evidenceNodeIds: ['APP-INTAKE-001'] },
    ]
  },
  {
    id: 'CTX-SNAP-002',
    applicationVersionId: 'DEMO-EOA-2026-001-v1',
    pipelineVersion: '1.3.2',
    featureSetVersion: '2.0.0',
    createdAt: '2026-10-25T14:00:00Z',
    features: [
      { featureId: 'F-C1-001', featureLabel: 'Checklist completion rate', family: 'C1', value: 0.65, coverageState: 'OBSERVED', confidence: 0.90, evidenceNodeIds: ['DOC-001', 'DOC-002'] },
      { featureId: 'F-C1-002', featureLabel: 'Critical findings count', family: 'C1', value: 5, coverageState: 'OBSERVED', confidence: 1.0, evidenceNodeIds: ['FND-001', 'FND-002', 'FND-003', 'FND-004', 'FND-005'] },
      { featureId: 'F-C1-003', featureLabel: 'Missing required documents', family: 'C1', value: 4, coverageState: 'OBSERVED', confidence: 1.0, evidenceNodeIds: ['DOC-CHK-001'] },
      { featureId: 'F-C2-001', featureLabel: 'Source verification rate', family: 'C2', value: 0.45, coverageState: 'OBSERVED', confidence: 0.80, evidenceNodeIds: ['VER-001'] },
      { featureId: 'F-C4-001', featureLabel: 'Infrastructure photo coverage', family: 'C4', value: 0.55, coverageState: 'OBSERVED', confidence: 0.70, evidenceNodeIds: ['DOC-INFRA-001'] },
      { featureId: 'F-C5-001', featureLabel: 'Prior approval deficiencies (open)', family: 'C5', value: 3, coverageState: 'OBSERVED', confidence: 0.85, evidenceNodeIds: ['TWIN-DEF-001'] },
      { featureId: 'F-C6-001', featureLabel: 'Application category', family: 'C6', value: 'VARIATION_IN_INTAKE', coverageState: 'OBSERVED', confidence: 1.0, evidenceNodeIds: ['APP-001'] },
      { featureId: 'F-C6-002', featureLabel: 'Intake change magnitude (%)', family: 'C6', value: 50, coverageState: 'OBSERVED', confidence: 1.0, evidenceNodeIds: ['APP-INTAKE-001'] },
    ]
  }
];

// ─── Score Runs ───

export const mockScoreRuns: ScoreRun[] = [
  {
    id: 'SR-001',
    snapshotId: 'CTX-SNAP-001',
    scoringSpecVersion: '1.0.0-DEMO',
    vni: 72,
    vniConfidence: 0.83,
    dimensions: [
      {
        dimension: 'D1', label: 'Evidence Sufficiency', question: 'How much of the checklist is evidenced, and how good is the evidence?',
        score: 68, confidence: 0.88,
        topFeatures: [
          { featureId: 'F-C1-003', featureLabel: 'Missing required documents', contribution: 18, direction: 'raises' },
          { featureId: 'F-C4-001', featureLabel: 'Infrastructure photo coverage (72%)', contribution: 12, direction: 'raises' },
          { featureId: 'F-C1-001', featureLabel: 'Checklist completion rate (82%)', contribution: -8, direction: 'lowers' },
        ],
        evidenceLinks: ['DOC-001', 'DOC-CHK-001', 'DOC-INFRA-001']
      },
      {
        dimension: 'D2', label: 'Consistency', question: 'Do documents and records agree with each other?',
        score: 55, confidence: 0.82,
        topFeatures: [
          { featureId: 'F-C2-002', featureLabel: 'Verified mismatch found', contribution: 22, direction: 'raises' },
          { featureId: 'F-C2-001', featureLabel: 'Source verification rate (67%)', contribution: 10, direction: 'raises' },
          { featureId: 'F-C1-001', featureLabel: 'Checklist completion rate (82%)', contribution: -6, direction: 'lowers' },
        ],
        evidenceLinks: ['VER-001', 'VER-003']
      },
      {
        dimension: 'D3', label: 'Provenance Signals', question: 'Are there reuse, duplication or metadata signals worth a human look?',
        score: 42, confidence: 0.75,
        topFeatures: [
          { featureId: 'F-C3-002', featureLabel: 'Near-duplicate image pairs (2)', contribution: 15, direction: 'raises' },
          { featureId: 'F-C3-001', featureLabel: 'No exact duplicates found', contribution: -10, direction: 'lowers' },
        ],
        evidenceLinks: ['IMG-DUP-001', 'IMG-DUP-002']
      },
      {
        dimension: 'D4', label: 'Remote Verifiability', question: 'Which requirements can only be confirmed physically?',
        score: 78, confidence: 0.80,
        topFeatures: [
          { featureId: 'F-C4-003', featureLabel: 'No video evidence submitted', contribution: 25, direction: 'raises' },
          { featureId: 'F-C4-002', featureLabel: 'Floor plan mismatch detected', contribution: 18, direction: 'raises' },
          { featureId: 'F-C4-001', featureLabel: 'Photo coverage (72%)', contribution: -5, direction: 'lowers' },
        ],
        evidenceLinks: ['DOC-FP-001', 'DOC-INFRA-001']
      },
      {
        dimension: 'D5', label: 'Change Magnitude', question: 'How much changed from the last verified baseline?',
        score: 82, confidence: 0.90,
        topFeatures: [
          { featureId: 'F-C6-002', featureLabel: 'Intake increase 50%', contribution: 30, direction: 'raises' },
          { featureId: 'F-C5-002', featureLabel: '3 years since last visit', contribution: 15, direction: 'raises' },
        ],
        evidenceLinks: ['APP-INTAKE-001', 'TWIN-VISIT-001']
      },
      {
        dimension: 'D6', label: 'Historical Follow-Through', question: 'Were earlier deficiencies closed, and how long since the last verification?',
        score: 74, confidence: 0.87,
        topFeatures: [
          { featureId: 'F-C5-001', featureLabel: '2 open prior deficiencies', contribution: 22, direction: 'raises' },
          { featureId: 'F-C5-002', featureLabel: '3 years since last visit', contribution: 18, direction: 'raises' },
        ],
        evidenceLinks: ['TWIN-DEF-001', 'TWIN-DEF-002']
      },
      {
        dimension: 'D7', label: 'Regulatory Stakes', question: 'Does the category carry a mandatory-verification trigger?',
        score: 65, confidence: 0.95,
        topFeatures: [
          { featureId: 'F-C6-001', featureLabel: 'Category: Intake Variation', contribution: 20, direction: 'raises' },
          { featureId: 'F-C6-002', featureLabel: 'Change >30% threshold', contribution: 15, direction: 'raises' },
        ],
        evidenceLinks: ['APP-001']
      }
    ]
  }
];

// ─── Policy Gates ───

export const mockPolicyGates: PolicyGate[] = [
  {
    id: 'GATE-001', name: 'Mandatory EVC for Intake Increase >30%',
    description: 'Intake changes exceeding 30% require at minimum a physical EVC to verify infrastructure adequacy.',
    predicate: 'intakeChangePct > 30',
    floorMode: 'PHYSICAL_EVC', citation: 'Approval Process Handbook 2024-27, §4.3.2',
    demoOnly: true, version: '1.0.0'
  },
  {
    id: 'GATE-002', name: 'New Institution Minimum Online EVC',
    description: 'First-time applications for new institutions require at minimum an online EVC.',
    predicate: 'applicationType == NEW_INSTITUTION',
    floorMode: 'ONLINE_EVC', citation: 'Approval Process Handbook 2024-27, §3.1',
    demoOnly: true, version: '1.0.0'
  },
  {
    id: 'GATE-003', name: 'Site Change Physical Verification',
    description: 'Site/location changes require physical verification to confirm building and infrastructure.',
    predicate: 'hasSiteChange == true',
    floorMode: 'PHYSICAL_EVC', citation: 'Approval Process Handbook 2024-27, §5.2.1',
    demoOnly: true, version: '1.0.0'
  },
  {
    id: 'GATE-004', name: 'Required Video for Online EVC',
    description: 'Online EVC requires a facility video of at least 30 minutes. Absent video blocks online mode.',
    predicate: 'videoMinutes >= 30',
    floorMode: 'HYBRID_EVC', citation: 'Corrigendum Dec 2025, Evidence Rules',
    demoOnly: true, version: '1.0.0'
  },
  {
    id: 'GATE-005', name: 'Evidence Reuse Across Institutions',
    description: 'Exact document reuse across institutions triggers physical verification.',
    predicate: 'crossInstitutionHashReuse > 0',
    floorMode: 'PHYSICAL_EVC', citation: 'Integrity Policy §7.1',
    demoOnly: true, version: '1.0.0'
  }
];

// ─── Methodology Recommendation ───

export const mockRecommendation: MethodologyRecommendation = {
  id: 'REC-001',
  snapshotId: 'CTX-SNAP-001',
  scoreRunId: 'SR-001',
  mode: 'PHYSICAL_EVC',
  confidence: 0.87,
  floorMode: 'PHYSICAL_EVC',
  tier1Output: 'PHYSICAL_EVC',
  tier2Output: 'PHYSICAL_EVC',
  tier2Probability: 0.72,
  modelVersion: '1.0.0-ordinal-demo',
  state: 'COMPUTED',
  isRandomAudit: false,
  createdAt: '2026-10-27T10:35:00Z',
  gatesEvaluated: [
    { gateId: 'GATE-001', gateName: 'Mandatory EVC for Intake Increase >30%', fired: true, floorMode: 'PHYSICAL_EVC', inputs: { intakeChangePct: 50 }, status: 'FIRED' },
    { gateId: 'GATE-002', gateName: 'New Institution Minimum Online EVC', fired: false, floorMode: 'ONLINE_EVC', inputs: { applicationType: 'VARIATION_IN_INTAKE' }, status: 'PASSED' },
    { gateId: 'GATE-003', gateName: 'Site Change Physical Verification', fired: false, floorMode: 'PHYSICAL_EVC', inputs: { hasSiteChange: false }, status: 'NOT_APPLICABLE' },
    { gateId: 'GATE-004', gateName: 'Required Video for Online EVC', fired: true, floorMode: 'HYBRID_EVC', inputs: { videoMinutes: 0 }, status: 'FIRED' },
    { gateId: 'GATE-005', gateName: 'Evidence Reuse Across Institutions', fired: false, floorMode: 'PHYSICAL_EVC', inputs: { crossInstitutionHashReuse: 0 }, status: 'PASSED' },
  ],
  topFeatures: ['Intake increase 50%', '3 years since last visit', 'Floor plan mismatch', 'No video evidence', '2 open prior deficiencies'],
  focusAreas: [
    { id: 'FA-001', category: 'LABORATORY', item: 'Laboratory equipment matches declaration for expanded intake', reason: 'Intake increase of 50% requires proportional lab capacity. Cannot be verified remotely.', priority: 'HIGH', channelAdequacy: { desk: 'NONE', remote: 'PARTIAL', physical: 'FULL' }, relatedFindingIds: ['FND-001'] },
    { id: 'FA-002', category: 'AMENITIES', item: 'Building plan vs actual site match', reason: 'Floor plan consistency check flagged a mismatch between submitted plan and satellite imagery.', priority: 'HIGH', channelAdequacy: { desk: 'NONE', remote: 'PARTIAL', physical: 'FULL' }, relatedFindingIds: ['FND-002'] },
    { id: 'FA-003', category: 'FACULTY', item: 'Faculty availability and salary statements', reason: '3 years since last verification - faculty roster needs in-person confirmation.', priority: 'HIGH', channelAdequacy: { desk: 'PARTIAL', remote: 'PARTIAL', physical: 'FULL' }, relatedFindingIds: ['FND-003'] },
    { id: 'FA-004', category: 'INSTRUCTIONAL', item: 'Library resources adequate for expanded capacity', reason: 'Increased intake requires proportional library and digital resource access.', priority: 'MEDIUM', channelAdequacy: { desk: 'PARTIAL', remote: 'FULL', physical: 'FULL' }, relatedFindingIds: [] },
    { id: 'FA-005', category: 'ADMINISTRATIVE', item: 'Fire safety NOC and building completion certificate', reason: 'Prior deficiency from 2025-26 - fire safety NOC remains unsubmitted.', priority: 'HIGH', channelAdequacy: { desk: 'FULL', remote: 'FULL', physical: 'FULL' }, relatedFindingIds: ['TWIN-DEF-001'] },
  ],
  counterfactuals: [
    { featureChanged: 'F-C6-002', featureLabel: 'Intake change magnitude', originalValue: 50, newValue: 15, originalMode: 'PHYSICAL_EVC', newMode: 'ONLINE_EVC' },
    { featureChanged: 'F-C4-003', featureLabel: 'Video evidence duration', originalValue: 0, newValue: 35, originalMode: 'PHYSICAL_EVC', newMode: 'HYBRID_EVC' },
    { featureChanged: 'F-C5-001', featureLabel: 'Open prior deficiencies', originalValue: 2, newValue: 0, originalMode: 'PHYSICAL_EVC', newMode: 'ONLINE_EVC' },
  ]
};

// Mode Comparison

export const mockModeComparisons: ModeComparison[] = [
  {
    mode: 'DESK_ONLY', modeLabel: 'Desk Review Only',
    itemsFull: 12, itemsPartial: 5, itemsNone: 8,
    evidenceArtefacts: ['Submitted documents only'],
    cost: 'Rs 0', elapsedTime: '0 additional days',
    residualUncertainties: [
      'Lab equipment presence unverified', 'Building vs plan match unverified',
      'Faculty on-site availability unverified', 'Location accuracy unverified',
      'Shared premises status unverified', 'Original documents not inspected',
      'Amenities condition unverified', 'Safety equipment unverified'
    ],
    gateStatus: 'BLOCKED', gateBlockReason: 'Blocked by GATE-001: Intake increase >30% requires minimum PHYSICAL_EVC'
  },
  {
    mode: 'ONLINE_EVC', modeLabel: 'Online EVC',
    itemsFull: 18, itemsPartial: 4, itemsNone: 3,
    evidenceArtefacts: ['30+ minute facility video', 'Live video tour', 'Screen-shared documents'],
    cost: 'Rs 1.25 Lakh', elapsedTime: '3-5 working days',
    residualUncertainties: [
      'Building structural match uncertain via video', 'Equipment calibration unverifiable',
      'Actual campus boundaries unverified'
    ],
    gateStatus: 'BLOCKED', gateBlockReason: 'Blocked by GATE-001: Intake increase >30% requires minimum PHYSICAL_EVC'
  },
  {
    mode: 'HYBRID_EVC', modeLabel: 'Hybrid EVC',
    itemsFull: 22, itemsPartial: 2, itemsNone: 1,
    evidenceArtefacts: ['30+ minute facility video', 'Physical site visit for flagged items', 'Recorded proceedings', 'Attendance sheet'],
    cost: 'Rs 1.88 Lakh (estimated)', elapsedTime: '5-7 working days',
    residualUncertainties: ['One amenity area partially verifiable (shared campus boundary)'],
    gateStatus: 'BLOCKED', gateBlockReason: 'Blocked by GATE-001: Intake increase >30% requires minimum PHYSICAL_EVC'
  },
  {
    mode: 'PHYSICAL_EVC', modeLabel: 'Physical EVC',
    itemsFull: 25, itemsPartial: 0, itemsNone: 0,
    evidenceArtefacts: ['Complete physical inspection', 'Recorded proceedings', 'Attendance sheet', 'Original document verification', 'Photo/video evidence'],
    cost: 'Rs 2.50 Lakh', elapsedTime: '7-10 working days',
    residualUncertainties: [],
    gateStatus: 'ALLOWED'
  }
];

// Pre-Visit Brief

export const mockPreVisitBrief: PreVisitBrief = {
  recommendationId: 'REC-001',
  applicationSummary: 'Extension of Approval - B.Tech Computer Science and Engineering - AY 2026-27 - Intake increase from 120 to 180 seats (+50%)',
  mode: 'PHYSICAL_EVC',
  modeReasons: [
    { reason: 'Intake increase of 50% exceeds the 30% threshold requiring physical verification of expanded infrastructure', evidenceIds: ['APP-INTAKE-001', 'GATE-001'] },
    { reason: 'Floor plan inconsistency detected between submitted plan and prior records requires on-site confirmation', evidenceIds: ['DOC-FP-001', 'FND-002'] },
    { reason: '3 years since last verified visit - institutional state needs refreshed physical baseline', evidenceIds: ['TWIN-VISIT-001'] },
  ],
  focusChecklist: [
    {
      category: 'Instructional',
      items: [
        { label: 'Library and digital resource capacity for 180 students', checked: false, evidenceId: 'DOC-LIB-001' },
        { label: 'Computing facility seats proportional to intake', checked: false, evidenceId: 'DOC-COMP-001' },
      ]
    },
    {
      category: 'Administrative',
      items: [
        { label: 'Faculty salary statements match declared roster', checked: false, evidenceId: 'DOC-FAC-001' },
        { label: 'Fire safety NOC (prior deficiency - unresolved)', checked: false, evidenceId: 'TWIN-DEF-001' },
        { label: 'Building completion certificate current', checked: false, evidenceId: 'DOC-BCC-001' },
      ]
    },
    {
      category: 'Amenities',
      items: [
        { label: 'Building actual vs submitted plan match', checked: false, evidenceId: 'DOC-FP-001' },
        { label: 'Common facilities (canteen, sports, medical)', checked: false },
      ]
    },
    {
      category: 'Laboratory',
      items: [
        { label: 'Lab equipment count matches declaration for expanded intake', checked: false, evidenceId: 'DOC-LAB-001' },
        { label: 'Equipment calibration and maintenance records', checked: false },
        { label: 'Lab space proportional to 180 students', checked: false },
      ]
    },
    {
      category: 'Faculty',
      items: [
        { label: 'Faculty physically present on campus', checked: false, evidenceId: 'DOC-FAC-002' },
        { label: 'Student-faculty ratio within norms for expanded intake', checked: false },
        { label: 'Original appointment letters available', checked: false },
      ]
    }
  ],
  documentsToObtain: [
    'Original land ownership deed and encumbrance certificate',
    'Faculty appointment letters (originals)',
    'Latest audited financial statements',
    'Building completion certificate (post-expansion)',
    'Fire safety NOC from local authority'
  ],
  unverifiableItems: [],
  openDeficiencies: [
    { year: '2025-26', deficiency: 'Fire safety NOC not submitted', status: 'OPEN' },
    { year: '2024-25', deficiency: 'Student-faculty ratio below norm in ECE department', status: 'OPEN' },
  ],
  caveats: [
    'All scores and recommendations are derived from DEMO_ONLY rules and synthetic data',
    'Model trained on synthetic scenario bank - not a validated predictor of real-world outcomes',
    'Policy gate citations reference demo-only handbook interpretations - verify against official edition',
    'This brief is advisory - the EVC team should apply professional judgement on-site',
  ],
  generatedAt: '2026-10-27T10:40:00Z'
};

// ─── Channel Matrix ───

export const mockChannelMatrix: ChannelMatrixItem[] = [
  { itemId: 'CM-001', itemLabel: 'Lab equipment physically present', category: 'Laboratory', deskAdequacy: 'NONE', remoteVideoAdequacy: 'PARTIAL', physicalAdequacy: 'FULL' },
  { itemId: 'CM-002', itemLabel: 'Building matches submitted plan', category: 'Amenities', deskAdequacy: 'NONE', remoteVideoAdequacy: 'PARTIAL', physicalAdequacy: 'FULL' },
  { itemId: 'CM-003', itemLabel: 'Faculty on-site availability', category: 'Faculty', deskAdequacy: 'NONE', remoteVideoAdequacy: 'PARTIAL', physicalAdequacy: 'FULL' },
  { itemId: 'CM-004', itemLabel: 'Salary statements match bank records', category: 'Administrative', deskAdequacy: 'PARTIAL', remoteVideoAdequacy: 'PARTIAL', physicalAdequacy: 'FULL' },
  { itemId: 'CM-005', itemLabel: 'Library book count and digital resources', category: 'Instructional', deskAdequacy: 'PARTIAL', remoteVideoAdequacy: 'FULL', physicalAdequacy: 'FULL' },
  { itemId: 'CM-006', itemLabel: 'Fire safety equipment functional', category: 'Amenities', deskAdequacy: 'NONE', remoteVideoAdequacy: 'PARTIAL', physicalAdequacy: 'FULL' },
  { itemId: 'CM-007', itemLabel: 'Campus location matches declaration', category: 'Administrative', deskAdequacy: 'PARTIAL', remoteVideoAdequacy: 'PARTIAL', physicalAdequacy: 'FULL' },
  { itemId: 'CM-008', itemLabel: 'Shared premises with other institutions', category: 'Administrative', deskAdequacy: 'NONE', remoteVideoAdequacy: 'PARTIAL', physicalAdequacy: 'FULL' },
  { itemId: 'CM-009', itemLabel: 'Original document inspection', category: 'Administrative', deskAdequacy: 'NONE', remoteVideoAdequacy: 'NONE', physicalAdequacy: 'FULL' },
  { itemId: 'CM-010', itemLabel: 'Computing facility seats count', category: 'Instructional', deskAdequacy: 'NONE', remoteVideoAdequacy: 'FULL', physicalAdequacy: 'FULL' },
  { itemId: 'CM-011', itemLabel: 'Canteen and mess facilities', category: 'Amenities', deskAdequacy: 'NONE', remoteVideoAdequacy: 'FULL', physicalAdequacy: 'FULL' },
  { itemId: 'CM-012', itemLabel: 'Sports and recreation facilities', category: 'Amenities', deskAdequacy: 'NONE', remoteVideoAdequacy: 'FULL', physicalAdequacy: 'FULL' },
  { itemId: 'CM-013', itemLabel: 'Medical facilities available', category: 'Amenities', deskAdequacy: 'NONE', remoteVideoAdequacy: 'PARTIAL', physicalAdequacy: 'FULL' },
  { itemId: 'CM-014', itemLabel: 'Hostel facilities (if declared)', category: 'Amenities', deskAdequacy: 'NONE', remoteVideoAdequacy: 'FULL', physicalAdequacy: 'FULL' },
  { itemId: 'CM-015', itemLabel: 'Equipment calibration certificates', category: 'Laboratory', deskAdequacy: 'FULL', remoteVideoAdequacy: 'FULL', physicalAdequacy: 'FULL' },
  { itemId: 'CM-016', itemLabel: 'Student-faculty ratio compliance', category: 'Faculty', deskAdequacy: 'FULL', remoteVideoAdequacy: 'FULL', physicalAdequacy: 'FULL' },
  { itemId: 'CM-017', itemLabel: 'Affiliation document authenticity', category: 'Administrative', deskAdequacy: 'PARTIAL', remoteVideoAdequacy: 'PARTIAL', physicalAdequacy: 'FULL' },
  { itemId: 'CM-018', itemLabel: 'Land ownership and encumbrance', category: 'Administrative', deskAdequacy: 'PARTIAL', remoteVideoAdequacy: 'PARTIAL', physicalAdequacy: 'FULL' },
  { itemId: 'CM-019', itemLabel: 'Power backup and generator', category: 'Amenities', deskAdequacy: 'NONE', remoteVideoAdequacy: 'PARTIAL', physicalAdequacy: 'FULL' },
  { itemId: 'CM-020', itemLabel: 'Internet connectivity and bandwidth', category: 'Instructional', deskAdequacy: 'NONE', remoteVideoAdequacy: 'FULL', physicalAdequacy: 'FULL' },
];

// ─── Recommendation Review History ───

export const mockReviews: RecommendationReview[] = [
  {
    recommendationId: 'REC-001',
    actor: 'Shri R. Kumar',
    actorRole: 'EVC_COORDINATOR',
    action: 'ACCEPT',
    finalMode: 'PHYSICAL_EVC',
    reasonCode: 'AGREE_WITH_RECOMMENDATION',
    reasonText: 'Concur with the recommendation. The intake increase magnitude and floor plan mismatch warrant physical verification. Scheduling for November first week.',
    timestamp: '2026-10-27T14:30:00Z'
  }
];
