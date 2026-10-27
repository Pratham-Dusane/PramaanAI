export interface GraphNode {
  id: string;
  name: string;
  type: 'INSTITUTION' | 'DOCUMENT';
  initials?: string;
  category?: 'land_deed' | 'faculty' | 'fire_noc';
  academicYear?: string;
  submissionDate?: string;
  isHighRisk?: boolean;
  clusterId: string;
  applicationId?: string;
  finding?: {
    id: string;
    title: string;
    severity: 'CRITICAL' | 'HIGH' | 'MEDIUM';
    plainEnglish: string;
    factors: { label: string; confidence: number; detail: string }[];
    docComparison: {
      docATitle: string;
      docAInstitution: string;
      docBTitle: string;
      docBInstitution: string;
      overlapType: string;
      highlightedRegionText: string;
      cadastreId?: string;
      sha256A: string;
      sha256B: string;
    };
  };
  x?: number;
  y?: number;
  fx?: number;
  fy?: number;
  vx?: number;
  vy?: number;
}

export interface GraphLink {
  id: string;
  source: string | GraphNode;
  target: string | GraphNode;
  overlapType: 'land_deed' | 'faculty' | 'fire_noc';
  isRisky: boolean;
  year: number; // 2023 - 2027
  submissionOrder: number; // 1..N for chronological playback
  label?: string;
  details?: string;
}

export const GRAPH_NODES: GraphNode[] = [
  // Left: Cluster 1 (3 Institutions sharing Land Deed & Faculty)
  {
    id: 'INST-VV',
    name: 'Vidya Vikas College of Engineering',
    type: 'INSTITUTION',
    initials: 'VV',
    isHighRisk: true,
    clusterId: 'cluster-pune-land',
    applicationId: 'DEMO-EOA-2026-003',
    academicYear: '2024-25',
    x: -240,
    y: 5,
    fx: -240,
    fy: 5
  },
  {
    id: 'INST-AK',
    name: 'A.P.J. Abdul Kalam Institute of Tech',
    type: 'INSTITUTION',
    initials: 'AK',
    isHighRisk: true,
    clusterId: 'cluster-pune-land',
    applicationId: 'DEMO-EOA-2026-001',
    academicYear: '2026-27',
    x: -140,
    y: -80,
    fx: -140,
    fy: -80
  },
  {
    id: 'INST-SP',
    name: 'Sardar Patel Institute of Technology',
    type: 'INSTITUTION',
    initials: 'SP',
    isHighRisk: true,
    clusterId: 'cluster-pune-land',
    applicationId: 'DEMO-EOA-2026-002',
    academicYear: '2025-26',
    x: -140,
    y: 80,
    fx: -140,
    fy: 80
  },
  {
    id: 'DOC-LAND-44',
    name: 'Land Deed Survey Cadastre No. 44/2',
    type: 'DOCUMENT',
    category: 'land_deed',
    isHighRisk: true,
    clusterId: 'cluster-pune-land',
    applicationId: 'DEMO-EOA-2026-001',
    academicYear: '2024-25',
    x: -50,
    y: -30,
    fx: -50,
    fy: -30,
    finding: {
      id: 'FIND-LAND-001',
      title: '3 Institutions Sharing Single Revenue Land Deed (Cadastre 44/2)',
      severity: 'CRITICAL',
      plainEnglish: 'Three separate institutions located within 12 km in Pune district have submitted the identical registered land title (Khasra/Survey 44/2, 14.5 acres) to satisfy mandatory AICTE contiguous land requirements.',
      factors: [
        { label: 'Cadastral Geo-Parcel Overlap', confidence: 98, detail: 'Exact GIS boundary match across MH Revenue 7/12 records' },
        { label: 'Deed Registration Digest Identity', confidence: 99, detail: 'Sub-Registrar Haveli Book-1 Reg #11422 exact match' },
        { label: 'Revenue Circle Boundary Intersection', confidence: 91, detail: 'Overlapping physical survey coordinates detected' }
      ],
      docComparison: {
        docATitle: 'APJ_Tech_Registered_Land_Deed_Parcel44.pdf',
        docAInstitution: 'A.P.J. Abdul Kalam Institute (DEMO-EOA-2026-001)',
        docBTitle: 'Sardar_Patel_Campus_Land_Title_Survey44.pdf',
        docBInstitution: 'Sardar Patel Institute (DEMO-EOA-2026-002)',
        overlapType: 'Survey Parcel 44/2 (14.50 Acres)',
        highlightedRegionText: 'Survey Cadastre No. 44, Hissa No. 2, Mauje Wagholi, Taluka Haveli, District Pune. Area: 14 Acres 20 Gunthas (58,680 sq. meters). Reg No: HAV/11422/2019.',
        cadastreId: 'MH-PUN-HAV-0044-0002',
        sha256A: 'a1f8c49e8301d4b299e5f7a1b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2',
        sha256B: 'a1f8c49e8301d4b299e5f7a1b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2'
      }
    }
  },
  {
    id: 'DOC-FAC-SHARMA',
    name: 'Faculty Cadre Roster - Dr. R. Sharma',
    type: 'DOCUMENT',
    category: 'faculty',
    isHighRisk: true,
    clusterId: 'cluster-pune-land',
    applicationId: 'DEMO-EOA-2026-001',
    academicYear: '2025-26',
    x: -50,
    y: 65,
    fx: -50,
    fy: 65,
    finding: {
      id: 'FIND-FAC-002',
      title: 'Dual Full-Time Professor Appointment Declaration',
      severity: 'HIGH',
      plainEnglish: 'Professor Dr. Rajesh Sharma (PAN: ABCPS1234F) is simultaneously declared as regular full-time Professor & HOD in Computer Engineering at both A.P.J. Abdul Kalam Institute and Sardar Patel Institute for concurrent academic sessions.',
      factors: [
        { label: 'Income Tax PAN Exact Match', confidence: 100, detail: 'PAN: ABCPS1234F verified via NSDL deterministic hash' },
        { label: 'Biometric Attendance Overlap', confidence: 94, detail: 'Concurrent check-in logs recorded on identical teaching days' },
        { label: 'AICTE Faculty ID Identifier', confidence: 97, detail: 'Unique National Faculty Code 1-449102931 reused' }
      ],
      docComparison: {
        docATitle: 'APJ_Tech_Approved_Faculty_List_AY2026.pdf',
        docAInstitution: 'A.P.J. Abdul Kalam Institute (DEMO-EOA-2026-001)',
        docBTitle: 'SP_Tech_Teaching_Faculty_Roster_2025_26.pdf',
        docBInstitution: 'Sardar Patel Institute (DEMO-EOA-2026-002)',
        overlapType: 'Faculty PAN: ABCPS1234F',
        highlightedRegionText: 'Faculty Name: Dr. Rajesh K. Sharma | Designation: Professor & Head (CSE) | Appointment: Full-Time Regular Scale | PAN: ABCPS1234F | Joining Date: 01-08-2021',
        sha256A: 'c4e5f60718293a4b5c6d7e8f90123456789abcdef0123456789abcdef012345',
        sha256B: 'f9e8d7c6b5a43210fedcba9876543210abcdef0123456789abcdef01234567'
      }
    }
  },

  // Center-Right: Cluster 2 (Fire NOC Sharing)
  {
    id: 'DOC-NOC-PMC',
    name: 'Municipal Fire Safety NOC #892',
    type: 'DOCUMENT',
    category: 'fire_noc',
    isHighRisk: true,
    clusterId: 'cluster-noc-sharing',
    applicationId: 'DEMO-EOA-2026-001',
    academicYear: '2026-27',
    x: 40,
    y: -35,
    fx: 40,
    fy: -35,
    finding: {
      id: 'FIND-NOC-003',
      title: 'Municipal Fire Safety NOC Certificate Cross-Use',
      severity: 'HIGH',
      plainEnglish: 'The Pune Municipal Corporation Fire NOC certificate (Serial PMC/FS/892) originally issued for campus sector 3 has been submitted across two independent institutional filings with altered building annexures.',
      factors: [
        { label: 'Municipal Certificate Number Match', confidence: 99, detail: 'Exact serial PMC/FS/2024/0892' },
        { label: 'Issuing Officer Signature pHash', confidence: 96, detail: 'Perceptual hash match distance = 1 on seal impression' },
        { label: 'Validity Period Inconsistency', confidence: 89, detail: 'Valid until 31-03-2026; term commences July 2026' }
      ],
      docComparison: {
        docATitle: 'APJ_PMC_Fire_Safety_NOC_2026.pdf',
        docAInstitution: 'A.P.J. Abdul Kalam Institute (DEMO-EOA-2026-001)',
        docBTitle: 'MIT_Alandi_Campus_Fire_Clearance_2025.pdf',
        docBInstitution: 'Maharashtra Institute of Tech (DEMO-EOA-2026-005)',
        overlapType: 'PMC Certificate No: PMC/FS/892',
        highlightedRegionText: 'Chief Fire Officer, Pune Municipal Corporation. Provisional Fire Safety NOC No. PMC/FS/2024/892. Issued: 14/03/2024. Valid strictly up to: 31/03/2026.',
        sha256A: 'd4e5f60718293a4b5c6d7e8f90123456789abcdef0123456789abcdef0123',
        sha256B: 'd4e5f60718293a4b5c6d7e8f90123456789abcdef0123456789abcdef0123'
      }
    }
  },
  {
    id: 'INST-MI',
    name: 'Maharashtra Institute of Tech',
    type: 'INSTITUTION',
    initials: 'MI',
    isHighRisk: false,
    clusterId: 'cluster-noc-sharing',
    applicationId: 'DEMO-EOA-2026-005',
    academicYear: '2026-27',
    x: 135,
    y: -80,
    fx: 135,
    fy: -80
  },
  {
    id: 'INST-CE',
    name: 'College of Engineering Pimpri',
    type: 'INSTITUTION',
    initials: 'CE',
    isHighRisk: false,
    clusterId: 'cluster-noc-sharing',
    academicYear: '2023-24',
    x: 215,
    y: 5,
    fx: 215,
    fy: 5
  },

  // Peripheral Clean Cluster
  {
    id: 'DOC-LAND-KK',
    name: 'Registered Title Deed Nashik Campus',
    type: 'DOCUMENT',
    category: 'land_deed',
    isHighRisk: false,
    clusterId: 'cluster-nashik',
    academicYear: '2023-24',
    x: 55,
    y: 95,
    fx: 55,
    fy: 95
  },
  {
    id: 'INST-KK',
    name: 'K.K. Wagh Institute of Engineering',
    type: 'INSTITUTION',
    initials: 'KK',
    isHighRisk: false,
    clusterId: 'cluster-nashik',
    academicYear: '2023-24',
    x: 165,
    y: 95,
    fx: 165,
    fy: 95
  }
];

export const GRAPH_LINKS: GraphLink[] = [
  // 1. The 3 institutions sharing Land Deed Survey 44/2 (Red Links)
  {
    id: 'L-LAND-AK',
    source: 'INST-AK',
    target: 'DOC-LAND-44',
    overlapType: 'land_deed',
    isRisky: true,
    year: 2026,
    submissionOrder: 5,
    label: 'Claimed 14.5 Acres (2026 Filing)'
  },
  {
    id: 'L-LAND-SP',
    source: 'INST-SP',
    target: 'DOC-LAND-44',
    overlapType: 'land_deed',
    isRisky: true,
    year: 2025,
    submissionOrder: 3,
    label: 'Claimed 14.5 Acres (2025 Filing)'
  },
  {
    id: 'L-LAND-VV',
    source: 'INST-VV',
    target: 'DOC-LAND-44',
    overlapType: 'land_deed',
    isRisky: true,
    year: 2024,
    submissionOrder: 2,
    label: 'Claimed 14.5 Acres (2024 Filing)'
  },

  // 2. Faculty Overlap (Gold Links)
  {
    id: 'L-FAC-AK',
    source: 'INST-AK',
    target: 'DOC-FAC-SHARMA',
    overlapType: 'faculty',
    isRisky: true,
    year: 2026,
    submissionOrder: 6,
    label: 'Declared Dr. R. Sharma (HOD)'
  },
  {
    id: 'L-FAC-SP',
    source: 'INST-SP',
    target: 'DOC-FAC-SHARMA',
    overlapType: 'faculty',
    isRisky: true,
    year: 2025,
    submissionOrder: 4,
    label: 'Declared Dr. R. Sharma (Professor)'
  },

  // 3. Fire NOC Overlap (Teal Links)
  {
    id: 'L-NOC-AK',
    source: 'INST-AK',
    target: 'DOC-NOC-PMC',
    overlapType: 'fire_noc',
    isRisky: true,
    year: 2026,
    submissionOrder: 7,
    label: 'Submitted PMC NOC #892'
  },
  {
    id: 'L-NOC-MI',
    source: 'INST-MI',
    target: 'DOC-NOC-PMC',
    overlapType: 'fire_noc',
    isRisky: true,
    year: 2025,
    submissionOrder: 3,
    label: 'Submitted PMC NOC #892'
  },
  {
    id: 'L-NOC-CE',
    source: 'INST-CE',
    target: 'DOC-NOC-PMC',
    overlapType: 'fire_noc',
    isRisky: false,
    year: 2023,
    submissionOrder: 1,
    label: 'Prior Municipal Filing'
  },

  // Peripheral Clean Link (2023)
  {
    id: 'L-KK-CLEAN',
    source: 'INST-KK',
    target: 'DOC-LAND-KK',
    overlapType: 'land_deed',
    isRisky: false,
    year: 2023,
    submissionOrder: 1,
    label: 'Sole Owner Title'
  }
];

export const OVERLAP_COLORS = {
  land_deed: '#ef4444', // Red
  faculty: '#eab308',   // Gold
  fire_noc: '#14b8a6'   // Teal
};
