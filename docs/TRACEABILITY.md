# Requirement Traceability Matrix

The PRD is the functional authority. Ticket status is tracked in each ticket and summarized in `tickets/README.md`. This table maps requirement groups to implementing tracks and expected proof.

| PRD requirement | Tickets/track | Required evidence |
|---|---|---|
| Base application lifecycle, queue and human decision | T01, T02, T11 | API/state tests; E2E reviewer decision with audit |
| Secure upload, OCR, classification and fields | T02 | Upload security tests; extraction fixture report |
| Rules/checklists and source references | T03 | Rule validation/test/replay outputs |
| Issuer source-verification workflow | T02-04, T08-03 | Connector contract report with simulated and unavailable states |
| Dashboard, findings and audit | T01, T04, T11 | E2E screenshot/test plus authorization checks |
| Digital twin | T05-01 | Provenance-aware snapshot and timeline test |
| Evidence graph/explainability | T04 | Graph edge/reference integrity test; text table fallback |
| Cross-year intelligence | T05-02 | Expected-change and review-cue fixture metrics |
| Regulatory copilot | T09 | Citation correctness, abstention and injection tests |
| Infrastructure evidence checker | T07 | Synthetic duplicate/conflicting-label scenarios and limitation messaging |
| Document fingerprint/provenance | T02-02, T06-01 | SHA-256 exact-match test; immutability test |
| Rule versioning/replay | T03 | Immutable publication and old/new replay comparison |
| Deadline/expiry alerts | T10-01 | Date-boundary, dedupe and idempotent scheduler tests |
| Bulk application processing | T10-02 | Mixed outcome batch, retry, cancel and isolation test |
| BHASHINI multilingual support | T08 | Mock contract test; provider-unavailable fallback; language retention test |
| Duplicate applications | T06-02 | Exact and near-duplicate precision/recall report, manual disposition |
| RBAC/access controls | T01, T12 | Permission matrix and cross-scope tests |
| Accessibility | T11-03, T12 | Keyboard checklist, graph table alternative, scan report |
| Cross-institution relationship intelligence | T06-03 | Benign and suspicious-looking synthetic cases; tenant-safe response test |
| Make next application easier | T10-03 | Carry-forward confirmation/expiry filtering E2E test |
| Evaluation metrics and clean start | T12, T00 | Reproducible report from clean setup commands |

## Traceability rules

- Every FR in `PRD.md` must point to at least one ticket and test.
- Every ticket acceptance criterion must map to a test, observable UI state or reviewed documentation artifact.
- If a requirement is intentionally deferred, amend the ticket and this matrix with an explicit rationale; do not silently omit it.
- A demo-only mock satisfies interface demonstration only, not a claim of real government verification.
