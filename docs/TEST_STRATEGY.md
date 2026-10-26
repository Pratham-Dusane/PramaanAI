# Test Strategy and Evaluation Protocol

## Principles

Test determinism, traceability, tenant isolation and failure behaviour alongside functional correctness. Most tests must run without root privileges, network credentials or paid services. External services use deterministic contract mocks. A demo dataset is synthetic, labelled and reproducible.

## Test layers

1. **Unit tests:** normalization, field extraction adapters, hashes, rule operators, expiry math, duplicate similarity, graph construction, permissions and state transitions.
2. **Contract tests:** request/response schemas for REST endpoints, OCR provider, BHASHINI translation provider, source-verification connectors, storage adapters and queued jobs.
3. **Integration tests:** PostgreSQL migrations, private object storage/local filesystem adapter, API-to-worker pipeline, batch retry/idempotency, audit events.
4. **Security tests:** cross-tenant IDOR, role escalation, unsafe upload, oversized PDF/image, path traversal filename, prompt injection, secrets/log leakage, unauthorized download and export scope.
5. **End-to-end tests:** applicant preflight -> upload -> processing -> findings -> reviewer resolution -> authorized human decision record -> next-application carry-forward.
6. **Accessibility tests:** automated axe-equivalent scan where available, keyboard-only flow, focus order, labels, announcements, 200% zoom/reflow, graph/table alternative and contrast inspection.
7. **Evaluation tests:** extraction accuracy, classification macro-F1, deterministic rule outcomes, duplicate recall/precision, anomaly precision/recall, copilot citation validity and latency.

## Synthetic fixture design

Create a manifest describing each case ID, expected condition, synthetic/anonymized flag, seeded anomalies, expected rule outcomes, ground-truth fields and safe usage rights. Keep train/tuning fixtures separate from final evaluation fixtures. Do not use the final evaluation labels to tune thresholds. Include clean cases and challenging counterexamples to quantify false positives.

Required scenario families:
- Complete and incomplete applications.
- OCR with different scan quality and rotated pages.
- Values that match after normalization and values that conflict.
- Missing evidence versus explicit mismatch.
- Same document uploaded twice, re-encoded same image, cropped/similar images, unrelated similar image.
- Valid, expired, near-expiry and unknown date fields.
- Expected changes in staff/facilities/intake versus unexplained or suspicious changes.
- Provider live match, live mismatch, not found, not supported, unavailable, unauthorized, timeout, error and simulated outcomes.
- Cross-institution common attributes that are benign and attributes worth review.
- Prompt injection inside uploaded text and regulatory-copilot corpus.
- Bulk job with mixed valid/invalid items and retry after simulated worker failure.

## Metrics and reporting

- Classification: macro-F1, per-class precision/recall and confusion matrix.
- Extraction: exact and normalized accuracy per field, plus missing/low-confidence rate; report source/page-anchor accuracy separately.
- Rules: deterministic replay rate, expected result accuracy on fixture matrix and count of configuration errors.
- Anomalies: precision, recall and F1 per anomaly type; false positives are especially important.
- Duplicates: exact-byte detection precision/recall and near-duplicate precision/recall at documented thresholds.
- Copilot: supported-claim ratio, citation correctness, abstention correctness, unauthorized-context leakage count (must be zero in test suite).
- Integration: correct status classification, retry rate, provider failure isolation.
- Efficiency: wall-clock pipeline duration by stage, p50/p95 on documented local hardware, queue wait and per-document processing time. Any manual time-saving claim needs measured baseline sessions and method.
- Accessibility/security: pass/fail list, severity, remediation and exceptions.

## Evaluation protocol

1. Freeze commit, rule pack, fixture manifest, dependency versions and configuration.
2. Run database migrations and seed synthetic fixture set.
3. Execute all test layers and save machine-readable result artifacts.
4. Calculate metrics from a fixed holdout set and publish scripts/commands.
5. Manually review false positives and false negatives. Show at least 5 representative errors or all errors if fewer.
6. Record limitations and whether results use real, anonymized or synthetic data.

## Definition of done

A ticket is not done because the UI displays a happy-path result. It requires the appropriate unit/contract/integration test, at least one negative/failure path, authorization check where data is involved, documentation update, and a `LOG.md` entry with evidence/command. Never inflate metrics or label a synthetic connector response as real verification.
