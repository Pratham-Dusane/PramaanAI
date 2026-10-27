# Product Requirements Document (PRD)
## AICTE Application Validation & Institutional Compliance Intelligence Platform

**Version:** 1.0 | **Date:** 2026-10-26 | **Audience:** coding agents, engineering team, evaluators  
**Product type:** secure web-based decision-support prototype. This is not an official AICTE system.

## 1. Executive summary

Build a secure, explainable workspace that helps reviewers process AICTE approval-related applications, including Extension of Approval and other configured application categories. The system ingests submitted documents, classifies them, extracts fields using OCR/document parsing, checks category-specific requirements against versioned rules, compares values across documents and authorized reference records, flags anomalies or potentially manipulated evidence, assists with infrastructure evidence review, and presents traceable findings on a human-review dashboard.

The base problem-statement functionality is mandatory. The requested extras-institutional digital twin, evidence graph, cross-year intelligence, regulatory copilot, infrastructure visual checks, document fingerprints, rule versioning, deadline/expiry alerts, bulk processing, BHASHINI multilingual support, duplicate detection, RBAC, accessibility, cross-institution relationship intelligence and next-application assistance-are additive layers. They must reuse common data and validation services rather than become disconnected demos.

> **Non-negotiable:** The platform is advisory. It must not autonomously approve/reject an application, pronounce fraud, or substitute for an official inspection or decision. Competent officials retain final authority.

## 2. Base problem statement

### 2.1 Context and challenge

AICTE processes Extension of Approval and other approval-related applications that require scrutiny of forms, supporting documents, institutional records, faculty/infrastructure evidence, dates and applicable requirements. Manual inspection and cross-checking can be time-consuming and may make it harder to consistently spot omissions, stale records, contradictory fields or suspicious changes across many applications.

Build a secure, integrated AI-enabled decision-support system that:
1. Performs OCR and document classification for submitted application evidence.
2. Extracts relevant fields from documents and application forms.
3. Validates against category-specific checklists, configurable rules and authorized reference records.
4. Cross-checks information among documents and institution records.
5. Detects anomalies and possible manipulation for human review.
6. Verifies authenticity with issuing authorities where an authorized service/record exists.
7. Assists reviewers with infrastructure evidence compliance checks.
8. Provides dashboard findings, alerts, traceable evidence and audit trails.
9. Uses RBAC and confidentiality controls for applications and documents.
10. Is evaluated with synthetic/anonymized data and meaningful extraction, validation, anomaly, source-verification and time metrics.

### 2.2 Baseline outcome

A reviewer opens an application, sees the category checklist, inspects extracted fields and source pages, understands findings and applicable rule versions, checks issuer-verification status, resolves or disputes findings, requests clarification if needed and records a human decision with an audit trail. An applicant can preflight an application and fix preventable omissions before submission.

### 2.3 Limits in interpreting the PS

- The problem statement does not provide a complete machine-readable rule corpus. Do not invent actual regulatory criteria. Use a small demonstrative rule pack with explicit `DEMO_ONLY` markings until an authorized source has been reviewed.
- External access is only claimed when the service is available and the project has the appropriate access. Use synthetic fixtures for unavailable records; label them as simulated.
- Image analysis can surface observable inconsistencies but cannot prove that a facility exists or is compliant. Human inspections remain authoritative.
- A hash match proves byte-level identity against a prior digest, not that a document was genuinely issued by an authority.

## 3. Goals and measures of success

### 3.1 Product goals

- Reduce repetitive manual checking while increasing traceability.
- Make each material finding evidence-linked and explainable.
- Build a time-aware institutional profile across application years.
- Support multiple categories/academic years via versioned rules.
- Put documents, discrepancies, source verification, expiry alerts and review decisions in one workspace.
- Help applicants fix issues early and safely carry forward stable data with provenance.
- Keep a free/local-first prototype path; integrations are optional adapters.

### 3.2 Prototype evaluation targets

These are project targets, not claims of known performance. Measure on labelled synthetic/anonymized fixtures and report sample size and limitations.

| Measure | Target | Measurement |
|---|---:|---|
| Document-type classification macro-F1 | ≥ 0.85 on curated test split | Classification report per type |
| Clear key-field extraction accuracy | ≥ 0.90; report per field | Exact and normalized comparisons against ground truth |
| Required-document completeness | 100% on deterministic fixtures | Expected versus returned checklist status |
| Rule determinism | 100% same output for same snapshot/rule version | Replay tests |
| Seeded mismatch detection | ≥ 0.90 recall, with false positives reported | Labeled anomaly fixture set |
| Exact file duplicate detection | 100% of byte-identical fixtures | SHA-256 tests |
| Near-duplicate image/evidence detection | Aim ≥ 0.80 recall; report precision | Curated similarity corpus |
| Connector status truthfulness | 100% correct distinction among verified, simulated, unavailable, unsupported and error | Mock provider contract tests |
| Bulk failure isolation | Successful items survive; retry is idempotent | Failure-injection tests |
| Finding traceability | 100% have rule/evidence links or explicit missing-evidence reason | API/UI tests |
| Accessibility | Keyboard-only core flow; automated and manual checks | WCAG-oriented test checklist |
| Performance | Core checks p95 ≤ 10 s for ≤20 small docs, excluding external latency | Repeatable local benchmark |
| Human-decision boundary | No automated path can approve/reject | Permission/state-transition tests |

The evaluation report must include dataset provenance, synthetic/anonymized status, split logic, classification/extraction metrics, false-positive examples, anomaly precision/recall by type, connector-status distribution, measured processing times and known limitations. Do not claim percentage time savings without a measured manual baseline.

## 4. Users and roles

| Role | Responsibilities | Forbidden by default |
|---|---|---|
| Applicant / Institution Operator | Create draft, upload evidence, run preflight, answer clarification, view own institution's applications | View other institutions, internal reviewer notes or other applicants' data |
| Scrutiny Officer | Review assigned cases, inspect evidence, resolve findings, request clarification | Publish rules or access unrelated institutions without scope |
| Senior Reviewer / Approving Official | Review escalations and record final human decision if explicitly authorized | Edit original evidence or erase history |
| Domain Expert / Inspector | Review infrastructure evidence and add inspection observations | Treat image signals as conclusive or change global access |
| Rule Administrator | Draft/test/publish versioned rules with citations/effective dates | Gain application-content access automatically; erase historical rules |
| Auditor | Read permitted audit history, rule versions and decision trail | Modify evidence, findings or decisions |
| System Administrator | Manage users/scopes, configuration, integrations, health and retention settings | Read document contents by default unless separately authorized and audited |

RBAC is permission-based plus institution/case-scope checks. A role does not itself grant access to every case.

## 5. Scope and priorities

**P0 = base PS; P1 = requested enhanced prototype; P2 = later enhancement if time permits.** All named requested features should have at least a minimum demonstrable slice at P1, but may use honest mocks for unavailable external services.

### 5.1 Mandatory base scope (P0)

- Login/session support for demo and server-enforced RBAC.
- Institution/application records with application type/category/year, status, submitted metadata and reviewer assignment.
- Secure uploads of supported PDF/JPG/PNG with type/size validation, private storage and safe download.
- OCR/document parsing, page-level text, classification and extracted fields with confidence/provenance.
- Configurable required-document checklist and deterministic validation rules.
- Cross-document and institution-record consistency checks.
- Anomaly flags for missing/changed/suspicious evidence with caveats and evidence links.
- Source-verification connector interface with real status semantics and mock provider.
- Infrastructure evidence assistance and reviewer dashboard.
- Audit history for uploads, reprocessing, rules, validation, review, external connectors and final decisions.
- Synthetic/anonymized evaluation harness.

### 5.2 Additive requested features (P1)

1. Institutional digital twin.
2. Evidence graph + explainable findings.
3. Cross-year change/anomaly intelligence.
4. Grounded regulatory copilot.
5. Infrastructure evidence checker.
6. Document fingerprinting/provenance.
7. Regulatory rule versioning and replay.
8. Deadline/expiry alerts.
9. Bulk application processing.
10. Multilingual UI and documents via BHASHINI adapter.
11. Duplicate application detection.
12. Strong RBAC and audited access.
13. Accessibility support.
14. Cross-institution relationship intelligence.
15. Next-application assistance / pre-submission simulation.

### 5.3 Out of scope for initial prototype

- Automatic approval/rejection or legally binding decisions.
- Guaranteed production access to AICTE internal records, DigiLocker, NAD or issuer APIs.
- Complete machine-readable digitization of every AICTE rule/handbook.
- Replacement of inspectors, issuer authentication or official appeals.
- Face recognition, biometric inference or general fraud scoring.
- Training an LLM from scratch.
- Open-web search treated as proof of compliance.
- Definitive inference of building compliance from images or satellite imagery alone.

## 6. End-to-end workflow

1. **Create:** applicant selects institution, application type/category and academic year; app resolves an applicable published rule pack.
2. **Preflight:** show required/optional evidence, accepted formats and eligible carry-forward fields.
3. **Upload:** authorize user/scope; verify file type/signature, size and page limits; compute SHA-256; store bytes privately; create version and audit event.
4. **Queue:** create durable idempotent processing job with visible progress.
5. **Extract:** parse native PDF text or OCR pages; preserve original text, original language, source page, provider/version and confidence.
6. **Classify/map:** classify document type and map field candidates to typed schemas with page/region anchors where available.
7. **Validate:** run checklist/rules, cross-document checks, expiry, duplicate/cross-year signals, infrastructure checks and authorized-source verification.
8. **Explain:** create findings and evidence nodes/edges; link exact rule version, source page, connector response and uncertainty.
9. **Review:** reviewer queue shows urgency, evidence, historical change, duplicate candidates, source states and audit timeline.
10. **Resolve:** reviewer accepts/dismisses/escalates/requests clarification with reason. Preserve original finding and action history.
11. **Decide:** authorized human may record final decision with reason/evidence and audit trail.
12. **Notify:** deadline/expiry reminders and clarification alerts; review resolutions may inform evaluation but never silently auto-train a model.
13. **Next application:** create a carry-forward set from eligible prior fields, with source, last review and expiry status, requiring applicant confirmation.

## 7. Functional requirements

### FR-01 - Institution and application management [P0]
- Model institution identity, contacts/location (sensitive), application type/category/year, prior applications and authorized source references.
- Lifecycle: `DRAFT`, `SUBMITTED`, `QUEUED`, `PROCESSING`, `READY_FOR_REVIEW`, `UNDER_REVIEW`, `CLARIFICATION_REQUESTED`, `RESUBMITTED`, `DECISION_RECORDED`, `CLOSED`, `PROCESSING_FAILED`, `CANCELLED`.
- Keep official decision separate from processing state.
- Every state transition is server-enforced and audited; resubmission creates a new immutable application version.

### FR-02 - Document intake, classification and OCR [P0]
- Accept configured PDF/PNG/JPEG; default local-demo file-size target is 25 MB and configurable.
- Validate magic bytes/content, MIME, parser outcome, page/pixel limits and resource budgets. Reject unapproved archives/executables.
- Use random storage keys; never use untrusted filename as file path.
- Support configurable types such as application form, faculty roster/qualification, occupancy/building certificate, infrastructure images/floor plans and other evidence. Treat list as category-specific, not universal law.
- Extract fields with source page, confidence and provenance. Low confidence cannot silently become verified truth.
- Manual corrections create separate reviewed values; raw extraction remains preserved.

### FR-03 - Rules/checklists [P0]
- Rules are declarative, versioned and category/year/effective-date scoped.
- Each rule stores identifier, title, severity, applicability, required evidence, deterministic predicate, explanation, source citation/edition/clause/page, owner, test cases and publication metadata.
- Results: `PASS`, `REVIEW`, `INSUFFICIENT_EVIDENCE`, `NOT_APPLICABLE`, `ERROR`.
- Never execute arbitrary code/SQL in rules. Missing evidence is not proof of non-compliance.

### FR-04 - Cross-document consistency [P0]
- Compare form, roster, certificates, profile, historical snapshots and authorized source records.
- Each comparator declares field paths, normalization, units/tolerance, severity and missing-data behaviour.
- Persist both compared values, normalization result, page/source anchors and triggering rule.

### FR-05 - Authorized source verification [P0]
- Connector statuses: `VERIFIED_MATCH`, `VERIFIED_MISMATCH`, `NOT_FOUND`, `NOT_SUPPORTED`, `UNAVAILABLE`, `UNAUTHORIZED`, `TIMEOUT`, `ERROR`, `SIMULATED_MATCH`, `SIMULATED_MISMATCH`.
- A live verified response requires an authorized source result, timestamp, provider identity, source reference and minimal response fingerprint. Fixtures are always simulated.
- Provider downtime/missing credentials are not a mismatch. Keep payloads and identifiers minimized.

### FR-06 - Reviewer dashboard and audit [P0]
- Filter by type, year, status, institution/scope, assigned reviewer and finding category.
- Queue priorities use transparent urgency factors (deadline proximity, missing evidence, unresolved findings, age), not an opaque approval-likelihood score.
- Detail view shows checklist, documents, fields, source anchors, findings, rule version, history, clarification and authorized review actions.
- Finding view explains what was observed, why it matters, applicable rule/version, source evidence, limitations and next action.
- Audit history is append-only for normal users.

### FR-07 - Institutional digital twin [P1]
- Time-aware, source-attributed institution snapshots from declarations, extraction, reviewer-confirmed facts and authorized sources.
- Attribute stores value, effective year/date, source kind/ID, review state, last verified date, extraction confidence and supersession link.
- Distinguish `APPLICANT_DECLARED`, `AI_EXTRACTED`, `REVIEWER_CONFIRMED`, `AUTHORIZED_EXTERNAL`, `SYNTHETIC_FIXTURE`.
- Show timeline and differences. Do not imply the twin is an official registry without authoritative source data.

### FR-08 - Evidence graph / explainability [P1]
- Model nodes for institution, application, document/version, extracted field, rule/version, source record, validation run, finding and review action.
- Findings link to evidence and rule nodes or explicitly state why evidence is absent.
- UI offers interactive graph plus a complete accessible list/table fallback.
- Graph traversal respects tenant/case scope.

### FR-09 - Cross-year change/anomaly intelligence [P1]
- Compare current data with prior application and reviewer-confirmed snapshots.
- Distinguish expected change, unexplained difference, expired/stale data, missing expected continuation and possible reuse. Do not mark every change suspicious.
- Any anomaly score is a prioritization signal only with contributing features and caveat.
- Show old/new values, source evidence, time gap, applicable expected-change rule and human resolution.

### FR-10 - Regulatory copilot [P1]
- RAG Q&A only over an approved, curated, versioned corpus and accessible rule metadata.
- Every regulatory claim cites source document/version and section/page/clause when available.
- When source support is missing, abstain and say the corpus does not establish an answer. No guessing.
- Retrieval obeys RBAC; uploaded documents are untrusted input and may contain prompt injection.
- Copilot cannot publish rules, mutate decisions or replace authoritative text.

### FR-11 - Infrastructure evidence checker [P1]
- Check metadata where present, image/floor-plan duplicates/similarity, visible labels via OCR and consistency with declared facility records.
- Show signals such as duplicated images, conflicting dates/labels or missing evidence as `REVIEW` cues; do not conclude a building is absent/non-compliant from an image.
- No face recognition, sensitive-trait inference, or unsupported satellite-based verdict.
- Allow inspector observations and further evidence upload; link observations to the graph.

### FR-12 - Fingerprinting/provenance [P1]
- Compute SHA-256 server-side on upload; store byte length, detected MIME, uploader, timestamp, document version and algorithm.
- Optional pHash/text-normalized fingerprint may surface similar evidence. Record algorithm/version/threshold.
- Replacement creates a new version and fingerprint; never mutate originals silently.
- UI says “exact byte match” or “similarity candidate”, never “authentic/fraudulent” from hashes alone.

### FR-13 - Rule versioning/replay [P1]
- Lifecycle: `DRAFT` → `TESTED` → `PUBLISHED` → `SUPERSEDED` or `RETIRED`; published versions immutable.
- Each pack specifies year, category, effective window and source citations. Every validation run pins exact rule pack/version and engine version.
- Changes support non-destructive replay/simulation with old/new outcome comparison. Never rewrite historical runs or human decisions.
- AI may suggest drafts; only authorized Rule Administrator publishes after tests and explicit review.

### FR-14 - Deadline/expiry alerts [P1]
- Track application, clarification and document expiry deadlines with configurable reminder windows (e.g., 30/14/7/1 days for demo).
- Alert includes related entity, recipient, due date, urgency, delivery status, deduplication key, acknowledgment/snooze history.
- Scheduled jobs are idempotent. Use UTC internally and configured display timezone; model date-only values as dates.

### FR-15 - Bulk processing [P1]
- Select multiple applications or submit a manifest. ZIP ingestion is optional and, if implemented, must safely unpack and individually validate every file; manifest-based batch is acceptable for MVP.
- Durable batch with queued/running/succeeded/failed/skipped/partial counts, per-item outcome, progress, cancellation and retry failed.
- One item failing cannot roll back successful items. Retry must be idempotent.
- Apply scope checks, batch limits, rate limits and audit. Provide failed-item export without revealing out-of-scope data.

### FR-16 - Multilingual support using BHASHINI [P1]
- Localize all interface strings; provide English and at least one Indian language (Hindi as default target, Marathi optional if translations are reviewed).
- Implement a backend `TranslationProvider` adapter; use BHASHINI only when the selected service/API is available, configured, authorized and permitted by project policy.
- Never expose keys to frontend. Preserve original file/text and store translation separately with source/target language, provider/service/version, timestamp and status.
- If provider unavailable, preserve the original, display unavailable state and use local UI string catalogs; never pretend original text was translated.
- Legal/rule citations remain linked to original source; machine-translated summaries show a caveat.
- Do not send institutional/personal document text to external providers by default. Mock translations are labelled `MOCK_TRANSLATED` and are test-only.

### FR-17 - Duplicate applications [P1]
- Exact doc duplicate via SHA-256; application candidate using institution/category/year/reference and submission/idempotency metadata.
- Fuzzy similarity creates a candidate only; retain reason features and compared evidence.
- Status: `EXACT_MATCH`, `LIKELY_DUPLICATE`, `POSSIBLE_REUSE`, `NO_MATCH`.
- Never auto-delete, merge, reject or accuse. Reviewer confirms/dismisses/defers.
- Cross-institution shared material uses stricter access checks; never expose protected source files to unrelated applicants.

### FR-18 - RBAC and scope [P0]
- Server-enforce permissions on every route/service operation.
- Example permissions: `application.read_assigned`, `application.submit_own`, `finding.resolve`, `decision.record`, `rule.draft`, `rule.publish`, `audit.read`, `user.manage`, `integration.configure`, `bulk.process`.
- Applicant is institution-scoped; reviewer is assignment-scoped unless assigned broader scope. Rule admin has no document-content access by default.
- Prevent IDOR; audit document access, exports, role changes and rule publication.

### FR-19 - Accessibility [P1]
- Target WCAG 2.2 AA for core flows: landmarks, labels, keyboard access, visible focus, sufficient contrast, zoom/reflow, accessible tables and clear errors.
- Job progress and status changes are screen-reader perceivable without excessive announcements.
- Graph has textual/table alternative; images have neutral descriptions/captions, not claims of certainty.
- No core path requires drag-and-drop, hover-only controls or pointer gestures.

### FR-20 - Cross-institution relationships [P1]
- Surface candidate shared attributes via reused hashes, authorized identifiers, declared cross-appointments and conservative overlaps in names/contact/address/facility evidence.
- Store type, match method, compared fields, evidence edges, confidence and limitations.
- Display only restricted summaries that recipient is authorized to see.
- Use language “potential shared attribute/relationship for review”; avoid labels such as shell institution, collusion or fraud.

### FR-21 - Make next application easier [P1]
- Pre-submission simulator runs checklist/rules for selected category/year.
- Offer prior verified/reviewed fields with provenance and last-reviewed time; applicant confirms every prefilled field.
- Exclude or clearly block expired, disputed, unverified or superseded fields from silent carry-forward.
- Show changed fields, reusable evidence checklist and explainable blockers vs warnings.
- Reuse resolution hints only when the user is authorized to see the source case; no cross-tenant leakage.

## 8. Cross-feature invariants

1. Every material finding links to exact rule version and supporting evidence, or an explicit no-evidence reason.
2. Model scores are not approval scores. Display concrete signals and their limits.
3. No automatic adverse/final decision.
4. Source bytes and submitted fields remain immutable; corrections/resubmissions create versions.
5. Provider failure != mismatch; simulated != verified.
6. External AI processing is opt-in/configurable and policy-gated.
7. Tenant boundaries apply to APIs, graph, workers, search, copilot, notifications and exports.
8. All model output is untrusted and schema-validated.
9. Change is not misconduct.
10. Rule replay preserves historical outputs and decisions.
11. Visualizations have accessible text equivalents.

## 9. Architecture defaults

See `docs/ARCHITECTURE.md` and `docs/DECISIONS.md`. Use a modular monolith: React + TypeScript + Vite frontend; FastAPI/Pydantic/SQLAlchemy backend; PostgreSQL; private file storage; local OCR; DB-backed jobs/worker; relational evidence graph; typed adapters for BHASHINI and source verification. Do not introduce microservices or a graph database unless a documented ADR justifies it.

Suggested layout:

```text
frontend/src/{app,features,components,api}/
backend/app/{api,core,modules,providers,workers,db}/
docs/ tickets/ schemas/ examples/
```

## 10. Core screens

### Applicant
- Sign-in and institution context; create/resume application; category/year/type selection.
- Required document checklist and upload progress/errors/retry.
- Preflight results, field confirmation, multilingual help, submission confirmation and clarification response.
- History and next-application carry-forward preview.

### Reviewer
- Work queue and transparent sorting/filtering.
- Application summary/timeline, documents checklist and page-aware viewer.
- Extracted fields with confidence, source page and original/translated toggle.
- Findings, evidence graph/table, cross-year diff, duplicate/relationship panel, infrastructure signals.
- Connector state and timestamp, resolution/comment/clarification controls, audit trail.
- Final decision action only with `decision.record` permission.

### Rule administrator
- Rule catalogue/version history; safe draft editor; schema validation and fixture test runner.
- Preview affected category/year; publish with effective dates/source citation; replay comparison.

### System administrator/auditor
- User/role scopes, provider health, audit search/export, retention and reminder configuration. System administrators do not automatically receive document-content access.

## 11. Non-functional requirements

### Security/privacy
- Strong auth in non-demo deployments; safe session/token handling; TLS in deployment; secrets from environment/secret manager; no `.env` commits.
- Secure upload checks, private storage, authorization-gated downloads, content-disposition attachment, parser timeouts and size/page limits.
- Audit critical events; never log raw documents, passwords, auth tokens or sensitive identifiers.
- Scope checks, rate limits, CORS allowlist, CSRF protection for cookie auth, and safe errors.
- Retention/deletion configurable and reviewed against real deployment obligations.

### Reliability and performance
- Reprocessing idempotent by document version + pipeline version.
- Worker failures produce durable recoverable states and bounded retries.
- Bulk jobs support partial failure/retry/cancel.
- Provider latency cannot block core local validation; user sees status.
- Paginate lists; index common scope filters; bound graph traversal and copilot context.
- Benchmark and report actual timings; targets in Section 3.2 are not claims.

### Maintainability
- Typed APIs, service boundaries, schema migrations, versioned rule/provider data and network-free tests.
- A clean checkout must be runnable using `docs/DEVELOPMENT_SETUP.md` and root README without private chat context.

## 12. Observability and governance

Log login outcomes, denied access, upload/download, extraction/validation job states, rule publication, connector calls, bulk actions, finding resolution, human decisions, exports, role changes and configuration changes. Use correlation IDs and UTC. Never store full provider payloads or sensitive document text in operational logs.

Each extraction run stores provider/model/version/config/language/confidence metadata where available. Rule packs are versioned independently from extraction models. No online auto-learning from reviewer clicks in MVP; use resolutions for evaluation after review. BHASHINI API availability, terms, languages, costs/quotas and access must be checked at implementation time; app must run without BHASHINI credentials.

## 13. Tracks and release gates

| Track | Scope | Dependencies / parallel notes |
|---|---|---|
| T00 | Foundation/contracts | Start first; owns conventions and baseline scaffolding. |
| T01 | Identity, RBAC, audit, human decision boundary | After T00; can run with T02/T03. |
| T02 | Application, uploads, OCR, source adapter | Core data spine; stable interfaces unblock multiple tracks. |
| T03 | Versioned rule engine/checklists/replay | Can implement against fixtures parallel to T02. |
| T04 | Evidence graph/explainability | Needs T03 contract; fixture driven first. |
| T05 | Digital twin/cross-year intelligence | Uses institution snapshots, validation and evidence. |
| T06 | Fingerprints/duplicates/cross-institution links | Hash primitives can start after T02 contracts. |
| T07 | Infrastructure evidence checker | Uses document metadata and evidence graph. |
| T08 | BHASHINI/multilingual | Mock-first; UI i18n and backend adapter can split after contracts. |
| T09 | Regulatory copilot | Needs corpus/rule metadata, RBAC and citations. |
| T10 | Deadlines, bulk jobs, next application | Needs application/rule/snapshot contracts. |
| T11 | Frontend/reviewer dashboard/accessibility | Scaffold early using typed mocks; integrate APIs later. |
| T12 | Evaluation/security/demo | Prepare harness early; final gate after tracks integrate. |

- **Gate A - foundation:** clean boot, migration, synthetic seed users, health checks, typed API.
- **Gate B - base PS:** create → upload → extract → validate → explain → audit → human review works end-to-end.
- **Gate C - enhancement:** each P1 feature has a credible, testable slice; external integrations clearly marked live/mock/unavailable.
- **Gate D - evaluation/demo:** repeatable dataset metrics, a11y/security checks, limitations statement and setup docs.

## 14. Whole-product acceptance checklist

- [ ] Fresh checkout can run UI, API, worker, DB migration and seed flow from docs.
- [ ] Synthetic application bundle works without external credentials.
- [ ] OCR/classification/extraction stores source page and confidence where available.
- [ ] Category checklist and rules are deterministic and versioned.
- [ ] Findings link to evidence and exact rule version or explicit no-evidence reason.
- [ ] Digital twin distinguishes declared/extracted/reviewer-confirmed/external/synthetic attributes.
- [ ] Cross-year, duplicate, image and relationship alerts are explicitly review signals.
- [ ] BHASHINI adapter passes mock contract tests and live integration is optional.
- [ ] Deadline alerts and bulk jobs are durable and idempotent.
- [ ] Copilot cites the approved corpus or abstains; prompt injection is tested.
- [ ] RBAC tests cover every key route, graph, copilot, bulk action and export.
- [ ] UI core flow works using keyboard and graph table fallback.
- [ ] AI/worker cannot write official decisions.
- [ ] Evaluation report states numbers, errors, limitations and reproduction commands.

## 15. References and integration caveats

These references inform design but do not grant access or establish a live integration. The target prototype budget is ₹0 recurring API/service cost: no paid or metered endpoint may be enabled unless explicitly approved. BHASHINI must remain mock/local-fallback when a free, permitted API path and quota cannot be confirmed. The 2024–2027 handbook is a starting reference, not an assumption that no later circular/amendment applies:

- AICTE Approval Process Handbook 2024–2027: https://aicte-qa.aicte-india.org/sites/default/files/APH%20Final.pdf - check applicable edition/amendments for every rule.
- BHASHINI portal: https://bhashini.gov.in/en/ - confirm exact service/API, access, terms, supported languages and limits before enabling.
- BHASHINI service API reference: https://tts.bhashini.ai/openapi/ui/ - visible translation/OCR/TTS/STT API schema; confirm exact endpoint access, price/quota and terms. The project does not rely on paid credits.
- DigiLocker partner portal / API Setu: https://api.apisetu.gov.in/ - access and record coverage require the applicable onboarding/authorization.
- National Academic Depository: https://www.nad.gov.in/ - only records/services supported by the issuing institution and authorized access can be checked.
- Entity Locker: https://entity.digilocker.gov.in/ - optional future organizational exchange.
- AIKosh: https://aikosh.indiaai.gov.in/ - dataset/model discovery, not a source of AICTE institutional truth by itself.
- OWASP File Upload guidance: https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html
- OWASP Logging guidance: https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html
- W3C WCAG 2.2: https://www.w3.org/TR/WCAG22/
