# Canonical Demo Scenario

The demo must run with seeded synthetic data and no external credentials. Use fictional institutions and identifiers; visible screens should carry a banner: **Demonstration environment - synthetic records; not an official AICTE system.**

## Cast and seeded records

- `DEMO-INST-001`: fictional college with two application years of history.
- `DEMO-INST-002`: unrelated fictional college; shares one deliberately reused synthetic image with institution 001 to demonstrate cautious relationship review.
- `DEMO-EOA-2025-001`: prior-year application, mostly reviewed, one certificate due to expire.
- `DEMO-EOA-2026-001`: current-year application with a missing mandatory-for-demo certificate, a faculty qualification name mismatch, a scanned image with a suspiciously repeated visual fingerprint, and one expired date.
- One valid synthetic faculty credential in the mock issuer dataset; one mock `UNAVAILABLE` connector response.
- Three infrastructure items: clear evidence, duplicate image candidate, and floor-plan label discrepancy.
- Rule pack `DEMO_EOA_2026-v1`, marked `DEMO_ONLY` with fabricated clause labels.

All values and rules must clearly be synthetic, not real institution or regulatory data.

## Script (8–10 minutes)

1. **Explain the boundary (30 sec):** show demo banner and explain that findings assist reviewers; they do not decide approval or establish fraud.
2. **Applicant preflight (1 min):** select category/year; show checklist, upload guidance, English/selected language toggle and missing-evidence warning before submission.
3. **Upload and processing (1 min):** upload a prepared fixture bundle; show queued/extracting/validating stages, page-level extracted fields and confidence.
4. **Base validation (1 min):** show deterministic missing document, date expiry and cross-document mismatch; each finding opens its exact evidence and rule version.
5. **Evidence graph (45 sec):** navigate application -> document version -> extracted field -> rule -> finding. Switch to accessible table representation.
6. **Source verification (45 sec):** show one `SIMULATED_MATCH` and one `UNAVAILABLE`. Explain unavailable is not mismatch and the source adapter is a mock in the demo.
7. **Digital twin/cross-year (1 min):** compare prior/current snapshots, show changed values and distinguish expected change from review cue.
8. **Infrastructure (45 sec):** open duplicate visual evidence/metadata signals; show why this only requires inspector review.
9. **Duplicate/cross-institution intelligence (45 sec):** show candidate relationship with reasons and restricted summary, never a fraud label.
10. **Copilot (1 min):** ask a question whose answer exists in the seeded demo corpus; inspect citations and run a query with no support to demonstrate abstention. Show document prompt-injection test is ignored as untrusted content.
11. **Bulk + expiry alerts + next application (1 min):** submit small batch, inspect per-item failures/retry, acknowledge deadline alert, create next-year draft with proposed fields requiring confirmation.
12. **Human review and audit (45 sec):** reviewer resolves one finding and authorized role records a human decision; show immutable timeline.

## Required visual proof

- At least one visible finding with a cited rule and source page.
- At least one missing-evidence result, not conflated with mismatch.
- One mock connector response, prominently labelled simulated/unavailable.
- Cross-year diff with old/new values.
- Bulk partial success and retry.
- Copilot grounded answer and explicit abstention.
- Audit entry for reviewer action.
- Keyboard-operable critical path or recorded keyboard check.

## Recovery plan

- If BHASHINI is not configured, use stored local UI translations and show provider state `UNAVAILABLE`.
- If OCR fails on a fixture, use the provided native-text fixture or retrigger the local engine; do not silently load expected values from ground truth into production output.
- If copilot model is unavailable, use a deterministic extractive answerer over the same approved corpus and retain citations.
- Reset the demo database from `examples/synthetic_dataset_manifest.json`. Demo reset must refuse to run unless environment is explicitly development/demo.
