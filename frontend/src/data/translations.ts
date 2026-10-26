export type SupportedLanguage = 'en' | 'hi' | 'mr';

export interface TranslationDictionary {
  appTitle: string;
  appSubtitle: string;
  demoBanner: string;
  switchRole: string;
  activeRole: string;
  searchPlaceholder: string;
  navQueue: string;
  navDetail: string;
  navApplicant: string;
  navGraph: string;
  navTwin: string;
  navInfra: string;
  navDuplicates: string;
  navRules: string;
  navBulk: string;
  navAudit: string;
  navCopilot: string;
  statusPass: string;
  statusReview: string;
  statusInsufficient: string;
  statusNotApplicable: string;
  statusSimulated: string;
  statusVerified: string;
  statusUnavailable: string;
  filterAll: string;
  filterUrgent: string;
  actionAcknowledge: string;
  actionResolve: string;
  actionClarification: string;
  actionDecide: string;
  decisionModalTitle: string;
  recordedBy: string;
  justificationNote: string;
  submitDecision: string;
  cancel: string;
  viewDetails: string;
  preflightCheck: string;
  uploadEvidence: string;
  nextApplicationAssist: string;
  carryForwardNotice: string;
  ruleCitationNotice: string;
}

export const translations: Record<SupportedLanguage, TranslationDictionary> = {
  en: {
    appTitle: 'AICTE Application Validation & Compliance Intelligence Platform',
    appSubtitle: 'Advisory Decision Support System for Institutional Scrutiny',
    demoBanner: 'Demonstration environment — synthetic records; not an official AICTE system.',
    switchRole: 'Switch Role',
    activeRole: 'Active Role',
    searchPlaceholder: 'Search by Application ID, Institute Name or Keyword...',
    navQueue: 'Reviewer Queue',
    navDetail: 'Case Workspace',
    navApplicant: 'Applicant Portal',
    navGraph: 'Evidence Graph',
    navTwin: 'Digital Twin & History',
    navInfra: 'Infrastructure Signals',
    navDuplicates: 'Duplicate & Shared Links',
    navRules: 'Rule Pack & Replay',
    navBulk: 'Bulk Processing',
    navAudit: 'Audit Trail',
    navCopilot: 'Regulatory Copilot',
    statusPass: 'PASS',
    statusReview: 'REVIEW',
    statusInsufficient: 'INSUFFICIENT EVIDENCE',
    statusNotApplicable: 'NOT APPLICABLE',
    statusSimulated: 'SIMULATED MOCK',
    statusVerified: 'VERIFIED MATCH',
    statusUnavailable: 'PROVIDER UNAVAILABLE',
    filterAll: 'All Applications',
    filterUrgent: 'Urgent Attention (High Priority)',
    actionAcknowledge: 'Acknowledge',
    actionResolve: 'Resolve Finding',
    actionClarification: 'Request Clarification',
    actionDecide: 'Record Human Decision',
    decisionModalTitle: 'Record Official Human Decision (Authorized Action)',
    recordedBy: 'Authorizing Officer',
    justificationNote: 'Official Justification & Decision Rationale',
    submitDecision: 'Confirm & Sign Official Decision',
    cancel: 'Cancel',
    viewDetails: 'Open Case Details',
    preflightCheck: 'Pre-Submission Preflight Validation',
    uploadEvidence: 'Upload Supporting Documents',
    nextApplicationAssist: 'Next-Application Carry-Forward',
    carryForwardNotice: 'Review prior verified fields before confirming carry-forward.',
    ruleCitationNotice: 'Every finding cites specific versioned regulatory handbook clauses.'
  },
  hi: {
    appTitle: 'एआईसीटीई आवेदन सत्यापन एवं संस्थान अनुपालन आसूचना मंच',
    appSubtitle: 'संस्थागत जांच हेतु सलाहकार निर्णय समर्थन प्रणाली',
    demoBanner: 'प्रदर्शन वातावरण — कृत्रिम आंकड़े; यह एआईसीटीई की आधिकारिक प्रणाली नहीं है।',
    switchRole: 'भूमिका बदलें',
    activeRole: 'सक्रिय भूमिका',
    searchPlaceholder: 'आवेदन आईडी, संस्थान का नाम या कीवर्ड खोजें...',
    navQueue: 'समीक्षा कतार',
    navDetail: 'प्रकरण कार्यस्थान',
    navApplicant: 'आवेदक पोर्टल',
    navGraph: 'साक्ष्य ग्राफ',
    navTwin: 'डिजिटल ट्विन व इतिहास',
    navInfra: 'आधारभूत संरचना संकेत',
    navDuplicates: 'डुप्लीकेट व साझा कड़ियां',
    navRules: 'नियम पैक व पुनरावृत्ति',
    navBulk: 'थोक प्रसंस्करण',
    navAudit: 'ऑडिट ट्रेल',
    navCopilot: 'विनियमन कोपायलट',
    statusPass: 'उत्तीर्ण (PASS)',
    statusReview: 'समीक्षा आवश्यक (REVIEW)',
    statusInsufficient: 'अपर्याप्त साक्ष्य',
    statusNotApplicable: 'लागू नहीं',
    statusSimulated: 'कृत्रिम परीक्षण (MOCK)',
    statusVerified: 'सत्यापित मिलान',
    statusUnavailable: 'सेवा अनुपलब्ध',
    filterAll: 'सभी आवेदन',
    filterUrgent: 'अति आवश्यक (उच्च प्राथमिकता)',
    actionAcknowledge: 'स्वीकार करें',
    actionResolve: 'निष्कर्ष सुलझाएं',
    actionClarification: 'स्पष्टीकरण मांगें',
    actionDecide: 'आधिकारिक मानव निर्णय दर्ज करें',
    decisionModalTitle: 'आधिकारिक मानव निर्णय रिकॉर्ड करें (अधिकृत कार्रवाई)',
    recordedBy: 'अधिकृत अधिकारी',
    justificationNote: 'आधिकारिक कारण व निर्णय का आधार',
    submitDecision: 'निर्णय की पुष्टि व हस्ताक्षर करें',
    cancel: 'रद्द करें',
    viewDetails: 'प्रकरण विवरण खोलें',
    preflightCheck: 'प्रस्तुति पूर्व जांच (Preflight)',
    uploadEvidence: 'सहायक दस्तावेज अपलोड करें',
    nextApplicationAssist: 'आगामी वर्ष डेटा कैरी-फॉरवर्ड',
    carryForwardNotice: 'कैरी-फॉरवर्ड की पुष्टि से पहले पूर्व सत्यापित क्षेत्रों की समीक्षा करें।',
    ruleCitationNotice: 'प्रत्येक निष्कर्ष आधिकारिक हैंडबुक खंडों को संदर्भित करता है।'
  },
  mr: {
    appTitle: 'एआयसीटीई अर्ज पडताळणी व संस्थात्मक अनुपालन बुद्धिमत्ता प्रणाली',
    appSubtitle: 'संस्थात्मक छाननीसाठी सल्लागार निर्णय सहाय्य प्रणाली',
    demoBanner: 'प्रात्यक्षिक पर्यावरण — कृत्रिम नोंदी; ही अधिकृत एआयसीटीई प्रणाली नाही.',
    switchRole: 'भूमिका बदला',
    activeRole: 'सक्रिय भूमिका',
    searchPlaceholder: 'अर्ज क्रमांक, संस्थेचे नाव किंवा शब्द शोधा...',
    navQueue: 'तपासणी रांग',
    navDetail: 'छाननी कार्यस्थान',
    navApplicant: 'अर्जदार पोर्टल',
    navGraph: 'पुरावा आलेख (Graph)',
    navTwin: 'डिजिटल ट्विन व इतिहास',
    navInfra: 'पायाभूत सुविधा संकेत',
    navDuplicates: 'पुनरावृत्ती व सामायिक दुवे',
    navRules: 'नियम संच व सिम्युलेशन',
    navBulk: 'एकत्रित प्रक्रिया (Bulk)',
    navAudit: 'लेखापरीक्षण नोंद (Audit)',
    navCopilot: 'नियामक कोपायलट',
    statusPass: 'उत्तीर्ण (PASS)',
    statusReview: 'पुनरावलोकन आवश्यक',
    statusInsufficient: 'अपुरा पुरावा',
    statusNotApplicable: 'लागू नाही',
    statusSimulated: 'कृत्रिम चाचणी',
    statusVerified: 'सत्यापित जुळणी',
    statusUnavailable: 'सेवा अनुपलब्ध',
    filterAll: 'सर्व अर्ज',
    filterUrgent: 'तातडीचे अर्ज (उच्च प्राधान्य)',
    actionAcknowledge: 'स्वीकृती द्या',
    actionResolve: 'निष्कर्ष निकाली काढा',
    actionClarification: 'खुलासा मागवा',
    actionDecide: 'अधिकृत मानवी निर्णय नोंदवा',
    decisionModalTitle: 'अधिकृत मानवी निर्णय नोंदवा (प्राधिकृत कृती)',
    recordedBy: 'प्राधिकृत अधिकारी',
    justificationNote: 'अधिकृत कारण आणि निर्णयाचा आधार',
    submitDecision: 'निर्णय स्वाक्षरीत करा',
    cancel: 'रद्द करा',
    viewDetails: 'तपशील उघडा',
    preflightCheck: 'सादर करण्यापूर्वी पूर्व-तपासणी',
    uploadEvidence: 'पुरावा कागदपत्रे जोडा',
    nextApplicationAssist: 'पुढील वर्षासाठी डेटा पुढे नेणे',
    carryForwardNotice: 'डेटा पुढे नेण्यापूर्वी मागील पडताळलेल्या क्षेत्रांची खात्री करा.',
    ruleCitationNotice: 'प्रत्येक निष्कर्ष नियम पुस्तिकेतील विशिष्ट कलमांचा संदर्भ देतो.'
  }
};
