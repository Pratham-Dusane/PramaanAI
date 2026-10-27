# PRD v2.0: AICTE Application Validation and Evaluation-Methodology Intelligence Platform

**Version:** 2.0 (supersedes v1.0 of 2026-10-26) | **Date:** 2026-10-27 | **Audience:** coding agents, engineering team, evaluators **Product type:** secure web-based decision-support prototype. This is not an official AICTE system.

## 1. What changed in v2.0

v1.0 specified a validation pipeline (OCR, rules, cross-checks, source verification, dashboard) plus fifteen additive features. v2.0 keeps all of it and adds a second lane that answers a question v1.0 did not: once an application is validated, how rigorously should the institution's infrastructure and faculty claims be verified, and in which mode (desk, online, hybrid or physical)?

| Area | v1.0 | v2.0 |
| --- | --- | --- |
| Core pipeline | Validate, flag, explain, review | Unchanged. It is the data source for Lane 2. |
| New lane | None | Context Intelligence Layer, verification-signal scoring, Methodology Decision Layer, pre-visit brief, mode comparison view |
| Users | Applicant, scrutiny officer, senior reviewer, inspector, admins | Adds Regulation Bureau Official / EVC Coordinator and EVC Expert as distinct personas |
| Evaluation | Extraction, validation, anomaly, connector, performance | Same metrics, now explicitly mapped to the problem-statement list, plus decision-layer metrics and an ablation study |
| Domain grounding | Handbook cited as a reference | Adds a Domain Baseline with confidence labels (section 3) |

**Why:** research on the AICTE process found that its Expert Visit Committee (EVC) can verify physically, online or hybrid, and that the published text we found does not say how the mode is chosen. That gap is a real decision-support opportunity and also a risk, so every part of Lane 2 stays advisory, configurable, versioned and explainable.

## 2. Executive summary

Build a secure, explainable workspace that helps AICTE officials process Extension of Approval and other approval-related applications. It has two lanes that share one data spine.

- **Lane 1, Validation pipeline (mandatory, base problem statement):** ingest documents, classify, OCR, extract fields, apply versioned category checklists and rules, cross-check documents and institutional records, flag anomalies, verify through authorized issuing sources, review infrastructure evidence, and present evidence-linked findings with alerts and an audit trail.
- **Lane 2, Context and decision (flagship enhancement):** beside Lane 1, build a rich versioned context for each application, score it along seven verification-need dimensions, apply deterministic policy gates, and recommend an evaluation methodology (desk, online EVC, hybrid EVC, physical EVC, or defer for more evidence) with focus areas, trade-offs and a cited pre-visit brief.

> **Non-negotiable:** The platform is advisory. It must not approve or reject an application, pronounce fraud, choose an inspection mode on its own authority, or substitute for scrutiny, inspection or the decision of the competent AICTE authority. Scores are prioritisation signals, never approval, quality, compliance or fraud scores.

## 3. Domain baseline (AICTE process)

Confidence reflects how directly the claim was seen in handbook or guideline text. All values used in rules or gates stay `DEMO_ONLY` until checked against the applicable handbook edition and later corrigenda.

| Topic | What we know | Confidence |
| --- | --- | --- |
| Process stages | Online application with self-disclosure, then Scrutiny/Re-Scrutiny Committee (documents), then Expert Visit Committee (infrastructure), then Standing Hearing/Appellate Committee, then Extension of Approval letter listing deficiencies. Compliance window is about six months. | High |
| Scrutiny committees | Formed by the Regulation Bureau; review documents largely online. | High |
| EVC definition for 2026-27 | Constituted by the Council; verifies infrastructure in physical, online or hybrid mode (December 2025 corrigendum, seen in a legal summary). Earlier text: constituted by the Regional Officer; physical or online. | Medium |
| EVC composition | One academician not below Professor from an Executive Committee-approved panel, plus one expert not below Associate Professor or an industry expert with at least 5 years' experience. For deemed universities a Vice Chancellor, former VC or IIT/NIT Director nominated by AICTE chairs. Earlier handbooks include an architect. Total headcount not confirmed. | Medium |
| Member selection | Automated selection from the approved panel through the AICTE portal. The Regional Officer arranges the visit but is not a member (older handbooks). Co-opting extra experts is allowed. | Medium |
| What the EVC checks | Readiness across instructional, administrative, amenities and laboratory areas; actual building versus the plan shown to scrutiny; location match; shared premises with other courses; faculty availability including salary statements; originals of documents. | Medium-High |
| Evidence rules | Online EVC: institution produces a video of at least 30 minutes of all facilities, publishes it on the trust or society website and shares the link on the portal. Physical EVC: institution records the whole proceedings at its own expense. | Medium-High |
| When an EVC occurs | Existing institutions are inspected at random; nil-deficiency applications proceed to an EVC; intake increases require the Council to ascertain infrastructure and faculty through an EVC; an EVC may occur any time before the first batch graduates. | Medium |
| Additional-EVC fees | About Rs 1.25 lakh online and Rs 2.50 lakh physical (lower for government institutions). | Medium |
| How the mode is chosen | **Not found in any text seen.** Treat as unknown and as a question for mentors or the handbook. | Unknown |

Implication: Lane 2 proposes a decision-support method for an unpublished choice. It must therefore be transparent, easy to override and clearly labelled as a proposal, not as an AICTE rule.

## 4. Base problem statement and metric traceability

The ten base requirements of v1.0 section 2.1 remain mandatory (OCR and classification, field extraction, checklist validation, cross-checks, anomaly detection, issuer verification, infrastructure evidence assistance, dashboard and audit, RBAC, synthetic evaluation). The problem statement lists evaluation criteria; each is mapped to a measured PRD metric below. Targets are project targets, not claims of known performance.

| PS evaluation item | PRD measure | Target |
| --- | --- | --- |
| Document-extraction accuracy | Classification macro-F1; per-field extraction accuracy (exact and normalised) | F1 >= 0.85; fields >= 0.90 |
| Validation accuracy | Rule-outcome accuracy on deterministic fixtures; checklist completeness; replay determinism | >= 0.95; 100%; 100% |
| Anomaly-detection performance | Seeded-mismatch recall and precision by type; near-duplicate recall; exact duplicates | recall >= 0.90; >= 0.80; 100% |
| Successful source-verification rate | Connector status distribution reported separately for live, simulated, unavailable; status truthfulness | 100% truthful; no live-rate claim from mocks |
| Discrepancy-identification reliability | Cross-document discrepancy precision and recall; run-to-run stability | report; 100% stable |
| Average verification time | Pipeline p50 and p95 per case; reviewer time per case in a timed study | p95 <= 10 s for <= 20 small docs, excluding external latency |
| Alert timeliness | Share of alerts created within one scheduler tick of the configured window; deduplication correctness | >= 0.99; 100% |
| Reduction in manual effort | Paired timed study of manual baseline versus assisted review on the same cases | Report only if baseline is measured |

## 5. Product concept: two lanes, one spine

```text
Applicant docs --> Lane 1: OCR > classify > extract > rules > cross-checks > source verify --> findings
                                  |                                              |
                                  v                                              v
                       Lane 2: Context Builder (7 families) --> Signal Scorer (7 dimensions)
                                                                      |
                              Policy Gates (floors, random audit) --->|
                                                                      v
                                       Decision Model --> Recommendation (mode + focus + confidence)
                                                                      |
                                          LLM Explainer --------------+ (brief, cited, schema-checked)
                                                                      v
                              Official review: accept / modify / reject --> audit trail
```

### 5.1 Context families (the rich context built on the side)

| ID | Family | Examples of features | Source |
| --- | --- | --- | --- |
| C1 | Validation outcomes | Findings by severity and status; missing or expired documents; rule results; extraction confidence | Lane 1 |
| C2 | Source verification | Share of verifiable documents actually verified; mismatches; unavailable or simulated statuses | Connectors |
| C3 | Integrity and provenance | Exact duplicates, near-duplicate images, hashes reused across applications or institutions, metadata inconsistencies (review cues only) | Fingerprints, FR-12, FR-17, FR-20 |
| C4 | Infrastructure evidence quality | Photos, floor plans and videos per required area; OCR legibility of labels; date and metadata presence; consistency with declared facilities; video of required length present | FR-11 |
| C5 | Institutional history | Prior approval status, prior deficiencies and whether closed, time since last verified visit, unexplained cross-year changes, stale attributes | Digital twin, FR-07, FR-09 |
| C6 | Application change profile | Category (new institution, extension, new course, intake increase, site change); size of change; programme tags (for example laboratory-intensive), all configurable | Application |
| C7 | Operational context | Configured mode cost, elapsed time and artefacts produced | Configuration |

C7 is shown in the trade-off view only. It may break a tie between equally adequate modes but never lowers a gate floor or a score.

### 5.2 Seven verification-need dimensions

Each dimension is scored 0-100 where higher means more need for verification, with a separate confidence value from data coverage.

| ID | Dimension | Question it answers | Main families |
| --- | --- | --- | --- |
| D1 | Evidence sufficiency | How much of the checklist is evidenced, and how good is the evidence? | C1, C4 |
| D2 | Consistency | Do documents and records agree with each other? | C1, C2 |
| D3 | Provenance signals | Are there reuse, duplication or metadata signals worth a human look? | C3 |
| D4 | Remote verifiability | For this application, which requirements can only be confirmed physically (for example equipment actually present, building matches plan, faculty on site)? | C4, C6, channel matrix |
| D5 | Change magnitude | How much changed from the last verified baseline without explanation? | C5 |
| D6 | Historical follow-through | Were earlier deficiencies closed, and how long since the last verification? | C5 |
| D7 | Regulatory stakes | Does the category carry a mandatory-verification trigger, and how large is the intake or change? | C6 |

A composite Verification Need Index (VNI) may be shown only beside its dimension breakdown and the label: prioritisation signal, not a compliance, quality, fraud or approval score.

## 6. Users and roles

v1.0 roles remain. Additions below map to the handbook chain and should be validated with mentors.

| Role | Responsibilities | Forbidden by default |
| --- | --- | --- |
| Regulation Bureau Official / EVC Coordinator (new, primary Lane 2 user) | Review context and recommendation, compare modes, accept, modify or reject the recommended methodology with a reason, hand the brief to experts | Edit evidence; see unrelated cases; override a gate floor without the dedicated permission |
| EVC Expert (new) | Read the pre-visit brief for assigned cases only, upload synthetic observation records, mark focus items checked | See scores for unassigned cases; change the recommendation; record final decisions |
| Scrutiny Officer, Senior Reviewer, Inspector, Rule Administrator, Auditor, System Administrator | As v1.0 | As v1.0. Rule Administrator also owns gates, scoring spec and channel matrix drafts but gains no document-content access. |
| Applicant | As v1.0 | **Never sees scores or the recommendation** (prevents gaming and unnecessary alarm) |

New permissions: `context.read`, `methodology.view`, `methodology.review`, `methodology.override_floor`, `brief.read_assigned`, `scenario.manage`. RBAC remains permission plus case-scope.

## 7. Scope and priorities

**P0 = base PS. P1 = enhanced prototype. P1-F = flagship v2.0 slice. P2 = later.**

- **P0:** unchanged from v1.0 section 5.1.
- **P1-F (new flagship):** FR-22 to FR-27, built on the P1 features that feed context (FR-07 digital twin, FR-08 evidence graph, FR-09 cross-year change, FR-11 infrastructure checker, FR-12 fingerprints).
- **P1:** remaining v1.0 enhancements.
- **P2:** FR-28 post-visit reconciliation.
- **Out of scope:** everything in v1.0 section 5.3, plus selecting EVC members, scheduling visits, training on real AICTE decisions, any institutional ranking, and any general fraud score.

**Recommended trade-offs to create room (team decision):** keep BHASHINI as a mock adapter plus static Hindi UI strings; defer ZIP ingestion in bulk processing; keep cross-institution relationships to reused-hash detection that feeds D3; keep the regulatory copilot to a minimal cited slice. Each is a v1.0 P1 item that can drop to a smaller slice without breaking the base PS.

## 8. End-to-end workflow v2

1. **Create:** applicant selects institution, category and year; the app resolves a published rule pack.
2. **Preflight:** required evidence, formats and eligible carry-forward fields.
3. **Upload:** type, signature and size checks; SHA-256; private storage; audit.
4. **Queue:** durable idempotent processing job.
5. **Extract and classify:** native text or OCR with page, confidence and provenance.
6. **Validate (Lane 1):** checklist, rules, cross-document checks, expiry, duplicates, authorized-source verification, infrastructure checks.
7. **Explain:** findings with evidence graph links and exact rule versions.
8. **Build context (new):** assemble an immutable context snapshot from families C1-C6.
9. **Score (new):** compute D1-D7 with confidence and top contributing features.
10. **Gate and recommend (new):** apply policy gates, run the decision model, produce the recommendation, focus areas and counterfactuals.
11. **Brief and compare (new):** generate the pre-visit brief and the mode comparison view.
12. **Scrutiny review:** officers resolve, dismiss, escalate or request clarification. Each resolution, resubmission or new source response triggers a new context snapshot and a new recommendation; earlier ones are kept.
13. **Methodology review (new):** the EVC Coordinator accepts, modifies or rejects with a reason. The official choice is the record.
14. **Verification happens outside the system:** the EVC itself is run by AICTE. Optional synthetic observations can be uploaded for demonstration.
15. **Decide:** an authorized human records the decision.
16. **Notify and next application:** as v1.0 steps 12 and 13.

## 9. Functional requirements carried forward from v1.0

v1.0 section 7 definitions (FR-01 to FR-21) remain in force. Changes and new dependencies:

| FR | Name | Priority | v2.0 change |
| --- | --- | --- | --- |
| FR-01 | Institution and application management | P0 | Adds a recommendation state, separate from processing state and from the official decision: `NOT_COMPUTED`, `COMPUTED`, `UNDER_OFFICIAL_REVIEW`, `ACCEPTED`, `MODIFIED`, `REJECTED`, `SUPERSEDED` |
| FR-02 to FR-05 | Intake, rules, consistency, source verification | P0 | No change. Outputs feed context families C1 and C2. |
| FR-06 | Reviewer dashboard and audit | P0 | Adds recommendation panel, dimension breakdown and mode comparison link, visible only with `methodology.view` |
| FR-07 | Digital twin | P1 | Feeds C5; stores last verified visit date and mode as an attribute |
| FR-08 | Evidence graph | P1 | Adds nodes: context snapshot, feature value, score run, gate evaluation, recommendation, brief |
| FR-09 | Cross-year intelligence | P1 | Feeds D5; expected-change rules reduce false escalation |
| FR-10 | Regulatory copilot | P1 | May answer why-this-mode questions only from the stored brief and approved corpus; cannot alter recommendations |
| FR-11 | Infrastructure checker | P1 | Feeds C4 and D1; adds required-area coverage and presence of required video length |
| FR-12, FR-17, FR-20 | Fingerprints, duplicates, relationships | P1 | Feed C3 and D3 as review cues only |
| FR-13 | Rule versioning and replay | P1 | Extends to gates, scoring spec, channel matrix and model versions; replay compares old and new recommendations |
| FR-14 | Deadline alerts | P1 | Adds alerts: recommendation pending review, recommendation superseded by new evidence |
| FR-15 | Bulk processing | P1 | Adds a batch triage view sorted by transparent signals; no bulk acceptance of recommendations |
| FR-18 | RBAC | P0 | Adds the permissions in section 6; recommendation endpoints deny applicants |
| FR-16, FR-19, FR-21 | Multilingual, accessibility, next application | P1 | No change; accessibility applies to every new screen |

## 10. New functional requirements

### FR-22: Context Intelligence Layer \[P1-F\]

- Build an immutable context snapshot per application version, pipeline version and feature-set version. Rebuild on validation completion, finding resolution, resubmission, rule-pack change or new source response; retain earlier snapshots.
- Feature definitions are declarative and versioned: id, family, type, source query, normalisation, missing-value policy, sensitivity and a `model_allowed` flag.
- Each feature value records provenance (evidence node ids) and a coverage state: `OBSERVED`, `NOT_AVAILABLE`, `NOT_APPLICABLE` or `SIMULATED`.
- Missing is not bad. `NOT_AVAILABLE` lowers confidence and does not raise concern, unless the checklist requires the item, in which case Lane 1 already raises a finding.
- Feature allowlist: ownership type, state or region, trust or promoter identity, religion or minority status, and names are excluded from scoring and models, with a documented proxy review and an automated test.
- Context builds run from Lane 1 outputs with no external provider call.

### FR-23: Verification-signal scoring \[P1-F\]

- Compute D1-D7 (0-100) with a confidence value (0-1) derived from feature coverage, using a versioned deterministic scoring spec. Each score lists its top contributing features and evidence links.
- The optional VNI is a documented monotone aggregation, always shown with the breakdown and the caveat in section 5.2.
- Never show a single number alone. Scores are visible to authorized officials only, never to applicants, and never presented as a ranking of institutions.
- Weights and thresholds are `DEMO_ONLY` until reviewed; changes follow the rule-administrator workflow with replay.

### FR-24: Methodology Decision Layer \[P1-F\]

Output enum: `DESK_ONLY` (scrutiny outcome sufficient, subject to policy confirmation), `ONLINE_EVC`, `HYBRID_EVC` (online baseline plus named items verified physically), `PHYSICAL_EVC`, `DEFER_INSUFFICIENT_CONTEXT` (abstain; more evidence or clarification first).

- **Tier 0, policy gates:** deterministic, versioned rules that set a minimum mode (floor) and flags. Examples to configure and verify: a mandatory-verification category such as intake increase or new institution; an unresolved location or site mismatch; exact evidence reuse across institutions; required video evidence absent for an online recommendation. Each gate cites a clause and edition, or is marked `DEMO_ONLY`.
- **Tier 1, scorecard baseline:** dimension thresholds map to a mode. Always available and ships first.
- **Tier 2, ordinal model:** predicts rigor level 0-3 with monotonic constraints (more concern never lowers required rigor), calibrated probabilities and feature contributions.
- **Final mode = max(floor, model mode)** unless an authorized official overrides. Abstain with `DEFER` when coverage is below threshold, confidence is below threshold, or tiers disagree by two or more levels.
- **Random-audit lane:** a configurable sample is routed for verification regardless of score, marked random in the UI, consistent with the handbook's provision for random inspection, and excluded from model training labels.
- **Recommendation record** stores mode, confidence, floor and gates fired, top features, focus areas, pre-visit requests, counterfactuals, snapshot id, and scorer, model and gate versions.
- **Counterfactuals:** re-run the scorer with a single feature changed and report what would move the recommendation, labelled hypothetical.

### FR-25: Focus areas and pre-visit brief \[P1-F\]

- A versioned **verification channel matrix** lists each checklist or verification item against desk, remote-video and physical channels with adequacy full, partial or none (`DEMO_ONLY`, authored with a domain expert). Items whose adequacy is insufficient in the recommended mode, or whose related findings are unresolved, become focus areas.
- The brief contains: application summary; recommended mode and reasons with evidence links; an ordered focus checklist aligned to the EVC report sections (instructional, administrative, amenities, laboratory, faculty); documents to obtain beforehand; items that cannot be verified in the recommended mode; open deficiencies from earlier approvals; caveats.
- An LLM may draft prose, but every statement must reference evidence ids and pass a verifier that removes unsupported claims. A template brief works with no LLM.
- Export is access-controlled and audited.

### FR-26: Mode comparison and effects view \[P1-F\]

- Side by side for `DESK_ONLY`, `ONLINE_EVC`, `HYBRID_EVC` and `PHYSICAL_EVC`: items verifiable (full, partial, none); evidence artefacts produced (for example a 30-minute video, recorded proceedings, attendance sheet); configured cost; configured elapsed time; residual-uncertainty list; gate status (allowed, or blocked with reason).
- Cost and time come from dated, sourced configuration. No savings claims without a measured baseline.
- Fully keyboard accessible, with a table equivalent.

### FR-27: Official review, override and feedback \[P1-F\]

- Actions: accept, modify or reject, with a mandatory reason code and free text. Store both the AI recommendation and the official choice; the official choice is the record.
- Choosing a mode below a gate floor requires `methodology.override_floor`, a second approver and an audit entry.
- Overrides feed offline evaluation only (override rate, direction, reasons). No online learning.

### FR-28: Post-visit reconciliation \[P2\]

- Ingest synthetic EVC observation records and compare them with focus areas. Report mode sufficiency: did the visit surface items that the chosen mode could not verify?
- Check video link presence and duration where required, and attendance sheet presence.
- Feeds evaluation only; never changes decisions.

## 11. Decision-layer design

### 11.1 ML, LLM or both

| Criterion | Rules / scorecard | Classical ML | LLM as decider | Layered hybrid (recommended) |
| --- | --- | --- | --- | --- |
| Determinism and replay | Full | Full | Weak | Full on the decision path |
| Auditability | Full | Good with contributions | Weak | Full |
| Labelled data needed | None | Needs labels | Few-shot, unvalidated | Labels only for tier 2 |
| Prompt-injection exposure | None | None | High (uploaded text) | Isolated to the explainer |
| Recurring cost | Rs 0 | Rs 0 | Local model or paid API | Rs 0 with a local or mock LLM |
| Handles messy narrative | No | Limited | Yes | Yes, in the explainer |
| Hackathon feasibility | Easy | Moderate | Easy but risky | Moderate |

**Decision:** gates and scorecard set the floor, an interpretable ordinal model refines above it, and the LLM only explains and drafts. This keeps the decision replayable and auditable, limits exposure to adversarial document text, and still uses an LLM where it is strong. The evaluation compares all variants (section 14.4), so the choice is evidence-based.

### 11.2 Model details

- **Candidates:** ordinal logistic regression (primary, interpretable) and gradient-boosted trees with monotonic constraints (comparison). Choose by evaluation, not preference.
- **Inputs:** D1-D7 plus allow-listed features, roughly 25-40. No text embeddings in the decision path.
- **Calibration:** isotonic or Platt scaling on a validation split; report expected calibration error.
- **Training data:** the synthetic scenario bank (section 14.2). A model trained on synthetic labels learns the labeller's policy. It demonstrates the method and is never presented as a validated predictor of real-world outcomes. Retraining on real labels is a documented future path.

### 11.3 LLM explainer guardrails

- Inputs are structured facts and quoted evidence snippets marked as untrusted data. Output is schema-validated JSON.
- It cannot change the mode, gates or decisions. A verifier rejects any narrative whose mode differs from the recommendation record.
- Temperature 0; prompt, model and version are stored. Default is a local open-weight model or a mock; any external provider is opt-in and policy-gated, in line with v1.0 invariant 6.
- Prompt-injection tests: documents containing instructions must not alter the output.

## 12. Data model and API additions

| Entity | Key fields |
| --- | --- |
| `feature_definition` | id, family, version, spec, model\_allowed, sensitivity |
| `context_snapshot` | id, application\_version\_id, pipeline\_version, feature\_set\_version, created\_at |
| `context_feature_value` | snapshot\_id, feature\_id, value, coverage\_state, evidence\_node\_ids |
| `score_run`, `dimension_score` | snapshot\_id, scoring\_spec\_version; dimension, score, confidence, top\_features |
| `policy_gate_definition`, `gate_evaluation` | predicate, floor\_mode, citation, demo\_only, version; recommendation\_id, gate\_id, fired, inputs |
| `verification_channel_matrix` | version, item\_id, channel, adequacy |
| `methodology_recommendation` | id, snapshot\_id, score\_run\_id, mode, confidence, floor\_mode, model\_version, state, focus\_areas, counterfactuals |
| `recommendation_review` | recommendation\_id, actor, action, final\_mode, reason\_code, reason\_text, second\_approver |
| `pre_visit_brief` | recommendation\_id, content, generator, verifier\_report |
| `scenario_case`, `evaluation_run` | archetype, latent factors, reference labels, annotator ratings; run config, metrics, versions |

Typed, scope-checked endpoints (none reachable by applicants):

- `POST /applications/{id}/context:build` and `GET /applications/{id}/context`
- `POST /applications/{id}/methodology:recommend` and `GET /applications/{id}/methodology`
- `POST /applications/{id}/methodology/review` and `GET /applications/{id}/methodology/compare`
- `GET /applications/{id}/brief`
- Admin drafts, tests and publication for gates, scoring spec and channel matrix
- `/eval/scenarios` and `/eval/runs` for the evaluation harness

## 13. Cross-feature invariants

The eleven invariants of v1.0 section 8 remain. v2.0 adds:

12. The recommendation is advisory. The official's choice is the record, and the Council or competent authority runs and decides everything else.
13. Scores are never expressed as approval likelihood, fraud likelihood, institutional quality or compliance.
14. Low evidence quality raises the need for verification, not suspicion. Genuine but messy submissions must be handled as a request for better evidence or a more suitable mode.
15. Gates only raise rigor. Neither the model nor the LLM can lower the mode below the gate floor.
16. The random-audit lane is independent of scores and always labelled random.
17. Excluded and proxy features never enter scoring or models, and this is tested.
18. Applicants never see scores or recommendations.
19. The LLM explainer cannot change the recommended mode, gates, decisions or rules.
20. A model trained on synthetic data is labelled as a demonstration of method, not a validated predictor.
21. Counterfactuals and focus areas are hypotheses for human checking, not findings.

## 14. Evaluation plan

### 14.1 Retained base metrics

The v1.0 section 3.2 table is unchanged and is mapped to the problem-statement criteria in section 4 of this document. The evaluation report must still include dataset provenance, synthetic or anonymised status, split logic, per-type classification and extraction metrics, false-positive examples, anomaly precision and recall by type, connector-status distribution, measured timings and known limitations. Do not claim percentage time savings without a measured manual baseline.

### 14.2 Scenario bank for the decision layer

- At least 300 synthetic institution-application cases from a parametrised generator with archetypes: clean renewal; intake increase with thin evidence; site change with inconsistent plan; duplicated or reused evidence; stale or expired documents; genuine but low-quality scans (hard negatives); polished but inconsistent evidence (adversarial); multilingual documents; unresolved prior deficiencies; first-time application.
- Labels: ordinal rigor level 0-3 and must-verify focus items, produced by a documented reference policy. A stratified subset of at least 60 cases is independently rated by two annotators, with agreement reported (weighted kappa).
- Splits: stratified by archetype, plus a leave-one-archetype-out test of generalisation.
- Disclose that labels are synthetic and policy-derived. If a domain expert or mentor can review the reference policy, record that review.

### 14.3 Decision-layer metrics

| Measure | Target | Method |
| --- | --- | --- |
| Policy-gate compliance | 100%; no recommendation below its floor | Property tests |
| Replay determinism | 100% | Same snapshot and versions |
| Under-escalation on must-verify-physically cases | Recall >= 0.95 for hybrid or physical | Scenario bank |
| Over-escalation | Report rate and configured cost impact | Scenario bank |
| Agreement with reference rigor labels | Weighted kappa >= 0.60 on held-out, with CI | Held-out split |
| Focus-area quality | Recall >= 0.85; report precision | Versus reference focus items |
| Calibration | ECE <= 0.10 | Validation split |
| Monotonicity | 100% | Perturbation tests |
| Stability | >= 0.95 unchanged under irrelevant perturbation | Perturbation tests |
| Abstention quality | >= 0.90 abstain on sparse-context cases | Degraded-context scenarios |
| Explanation faithfulness | 100% cited features exist in the record; unsupported-claim rate <= 2% in brief audit | Verifier plus manual sample |
| Injection resistance | 100% on injection fixtures | Attack fixtures |
| Feature hygiene | Zero prohibited features; report recommendation distribution across synthetic institution-type groups | Allowlist test and group analysis |
| Random-audit lane | Observed share consistent with configured rate; 100% flagged random | Statistical test |
| Added latency | p95 <= 5 s for context, score and recommend (without LLM); brief timed separately | Local benchmark |

Targets are project targets, not claims of known performance.

### 14.4 Ablation

Compare rules-only, ordinal model, monotonic gradient-boosted trees, LLM-only zero-shot and the hybrid under identical metrics. Report where each fails, especially stability and injection resistance for LLM-only.

### 14.5 Human study

At least five reviewers and ten cases, with and without the brief. Record time to review and findings caught. Report small-sample limits and report only what was measured.

## 15. Non-functional and governance additions

- Pin snapshot, scorer, gate, model and prompt versions on every recommendation; one command reproduces any recommendation.
- Context stores features and evidence ids, not raw document text. Briefs minimise personal data.
- Ship a model card and a datasheet for the scenario bank, with limitations.
- Log context builds, gate evaluations, recommendations, overrides, brief generation and exports with correlation ids. Never log document text or prompts containing it.
- Bias hygiene: allowlist, proxy review and group-wise distribution checks.
- Fallbacks: if the model or LLM is unavailable, the scorecard and template brief still work and the UI shows which tier produced the result.

## 16. Tracks and release gates

| Track | Scope | Dependencies |
| --- | --- | --- |
| T00-T12 | As v1.0 | As v1.0 |
| T13 | Context builder and feature store | After T02 and T03; fixture-driven first |
| T14 | Scoring spec and policy gates | After T13; reuses T03 versioning |
| T15 | Decision model and LLM explainer | After T14; needs the scenario bank |
| T16 | Pre-visit brief, mode comparison, review UI | After T15 contracts; typed mocks early with T11 |
| T17 | Scenario bank and decision evaluation | Start early with the generator and annotation guide; final gate after T15 |

Build order: scorecard and gates first (always demoable), then the ordinal model, then the LLM explainer.

- **Gates A, B:** as v1.0.
- **Gate C2:** on a synthetic bundle, context snapshot, D1-D7, scorecard, gates and the official review UI work end to end with no ML and no LLM.
- **Gate C3:** ordinal model, explainer, brief and mode comparison integrated, with live, mock or unavailable states clearly marked.
- **Gate D:** base metrics, decision-layer metrics, ablation, accessibility and security checks, and a limitations statement.

## 17. Acceptance checklist additions

- Context snapshots are immutable, versioned and rebuilt on defined triggers.
- D1-D7 are deterministic, with confidence and contributing features.
- Gate floors can never be undercut except through the audited override path.
- Applicants cannot reach any context, score, recommendation or brief endpoint.
- Briefs cite evidence ids; unsupported claims are removed; injection fixtures pass.
- Mode comparison and review screens work by keyboard with table alternatives.
- The ablation report and decision-layer metrics are reproducible by documented commands.
- Every value derived from handbook text is marked verified or `DEMO_ONLY`.

## 18. Open questions to resolve before claiming real-world fit

1. Who selects the EVC mode today, and on what criteria?
2. Which application categories mandate an EVC, and in which modes?
3. Is desk-only an allowed outcome for any category?
4. What is the EVC headcount, and is an architect still included?
5. What does the final 2026-27 corrigendum say about the EVC and fees?
6. Is there access to anonymised past EVC reports or complaint data for validating labels?
7. Can a mentor or domain expert review the reference policy and the channel matrix?

## 19. References

- v1.0 section 15 references are retained, including the 2024-2027 Approval Process Handbook, BHASHINI, API Setu, NAD, OWASP and WCAG 2.2.
- AICTE Grant of Approvals guidelines 2024-27 (EVC definition and processing): https://indiankanoon.org/doc/173919027/
- Summary of the December 2025 corrigendum: https://teamleaseregtech.com/updates/article/52940/aicte-issued-the-corrigendum-regarding-the-approval-process-2026-27
- AICTE approval FAQ: https://aicte.gov.in/sites/default/files/FAQ%20Updated.pdf
- Handbook copies used for the domain baseline were secondary copies; confirm every clause against the official edition.
