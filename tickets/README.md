# Ticket Board and Parallel Tracks

All tickets start as `TODO`. Claiming a ticket means adding agent/owner and setting `IN_PROGRESS`; mark `BLOCKED` with a reason if a dependency is missing. Do not mark a ticket `DONE` until acceptance criteria, tests, docs and LOG evidence are complete.

## Parallel execution plan

**Wave 0 (contract spine):** T00-01 -> T00-02 -> T00-03. Other agents may begin only fixture-driven work while shared scaffolding is landing.

**Wave 1 (can run in parallel after T00-02):** T01, T02, T03, T11-01 and T12-01. Use agreed DTOs, not private schemas.

**Wave 2:** T04 depends on T02/T03; T05 depends on institution snapshots/T02 and T03; T06 depends on fingerprints/T02; T07 depends on document metadata/T04; T08 depends on provider contracts/T11 i18n; T09 depends on rules/corpus/RBAC; T10 depends on applications/jobs/rules; T11-02 integrates stable APIs.

**Wave 3:** T12-02/T12-03 integrate and verify all tracks. Perform a release gate only when a clean clone can run the canonical demo.

## Suggested agent allocation

| Agent slot | Primary track | Rules |
|---|---|---|
| A | T00 platform/contracts | Owns global structure and shared contracts; integrates PRs |
| B | T01 security/RBAC/audit | No separate auth implementation inside feature branches |
| C | T02 ingestion/OCR/connectors | Owns upload/document/extraction interfaces |
| D | T03 rules | Deterministic only; do not hardcode legal rules from memory |
| E | T04/T05 evidence and digital twin | Use canonical graph/domain DTOs |
| F | T06/T07 duplicate and infrastructure | Signals are not verdicts |
| G | T08/T09 multilingual and copilot | Mock first; no secrets or unsupported claims |
| H | T10 workflows | Uses durable jobs and idempotent operations |
| I | T11 frontend/a11y | Contract-first, typed API client, no frontend-only security |
| J | T12 evaluation/security/demo | Can start early on fixtures; final gate comes after integration |

This is a suggested allocation, not a requirement for ten people. One agent can take multiple unblocked tickets sequentially; avoid two agents editing the same shared file concurrently.

## Ticket index

### T00 — Foundation and contracts
- [T00-01 Repository scaffold and runnable baseline](T00-01-repo-scaffold.md)
- [T00-02 Canonical DTOs, API contracts and schema ownership](T00-02-contracts.md)
- [T00-03 Synthetic seed data and demo reset](T00-03-demo-seed.md)

### T01 — Identity, RBAC, audit and decision boundary
- [T01-01 Authentication and effective permission model](T01-01-auth-permissions.md)
- [T01-02 Scope enforcement and append-only audit](T01-02-scope-audit.md)
- [T01-03 Human decision workflow and protected state transitions](T01-03-human-decision.md)

### T02 — Application, document ingestion, extraction and external source interface
- [T02-01 Institution/application lifecycle](T02-01-application-lifecycle.md)
- [T02-02 Secure upload, versioning and SHA-256](T02-02-secure-upload.md)
- [T02-03 OCR, classification and field extraction](T02-03-ocr-extraction.md)
- [T02-04 Typed source verification connector and mock](T02-04-source-connector.md)

### T03 — Regulatory rules
- [T03-01 Rule schema, lifecycle and source provenance](T03-01-rule-schema.md)
- [T03-02 Deterministic evaluation and checklist](T03-02-rule-engine.md)
- [T03-03 Rule test, publish and replay comparison](T03-03-rule-publish-replay.md)

### T04 — Evidence graph and explainable findings
- [T04-01 Evidence graph and finding builder](T04-01-evidence-graph.md)
- [T04-02 Finding details and accessible graph view](T04-02-explainability-ui.md)

### T05 — Institutional intelligence
- [T05-01 Provenance-aware institutional digital twin](T05-01-digital-twin.md)
- [T05-02 Cross-year change and anomaly intelligence](T05-02-cross-year.md)

### T06 — Fingerprints, duplicates and relationships
- [T06-01 Fingerprint service and similarity candidates](T06-01-fingerprints.md)
- [T06-02 Duplicate application/document detection](T06-02-duplicates.md)
- [T06-03 Cross-institution relationship intelligence](T06-03-relationships.md)

### T07 — Infrastructure evidence
- [T07-01 Metadata, OCR and image-similarity signals](T07-01-infrastructure-signals.md)
- [T07-02 Infrastructure reviewer panel and observations](T07-02-infrastructure-ui.md)

### T08 — Multilingual and provider UX
- [T08-01 UI internationalization](T08-01-i18n.md)
- [T08-02 BHASHINI adapter and graceful fallback](T08-02-bhashini-adapter.md)
- [T08-03 Provider settings and truthful source status UI](T08-03-provider-status-ui.md)

### T09 — Regulatory copilot
- [T09-01 Approved regulatory corpus and retrieval](T09-01-corpus-retrieval.md)
- [T09-02 Cited answers, abstention and injection safety](T09-02-copilot-safety.md)

### T10 — Workflow intelligence
- [T10-01 Deadline and expiry alerts](T10-01-deadline-alerts.md)
- [T10-02 Bulk application processing](T10-02-bulk-processing.md)
- [T10-03 Next-application preflight and carry-forward](T10-03-next-application.md)

### T11 — Frontend and accessible user experience
- [T11-01 Frontend shell and typed API client](T11-01-frontend-shell.md)
- [T11-02 Applicant and reviewer workflows](T11-02-workflows-ui.md)
- [T11-03 Accessibility and language switching](T11-03-accessibility.md)

### T12 — Evaluation, release and security hardening
- [T12-01 Synthetic evaluation harness](T12-01-evaluation.md)
- [T12-02 Security, privacy and RBAC regression suite](T12-02-security-tests.md)
- [T12-03 Integrated demo, performance and release gate](T12-03-release-demo.md)

## Ticket status summary

Update this table during integration. Keep status consistent with each ticket file.

| Track | TODO | IN_PROGRESS | BLOCKED | DONE |
|---|---:|---:|---:|---:|
| T00–T12 | 36 | 0 | 0 | 0 |
