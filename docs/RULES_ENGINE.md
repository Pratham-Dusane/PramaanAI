# Regulatory Rules Engine Contract

**Status:** normative for the prototype. The base PRD and this contract govern implementation.

## Purpose and non-goals

The rules engine evaluates a versioned, authorized rule pack against a fixed application snapshot and returns deterministic, explainable findings. It does not infer law from an LLM, run arbitrary code, decide approval, or turn missing evidence into a legal conclusion. Demo rules must carry `DEMO_ONLY` and must never be presented as official requirements.

## Rule definition

A rule is declarative data. The only executable predicates allowed in the MVP are operations from an allow-listed interpreter: `exists`, `equals`, `not_equals`, `in`, `date_before`, `date_after`, `days_until_lt`, `count_gte`, `count_lte`, `numeric_gte`, `numeric_lte`, `all`, `any`, `not`, `same_as`, and `matches_normalized`. Regex support must have length/time limits and safe-engine constraints. Do not use Python `eval`, `exec`, SQL snippets or dynamically imported functions.

Required fields:

- `rule_id`: stable logical ID, e.g. `DEMO.FACULTY.DEGREE_PRESENT`.
- `version`: immutable version identifier, e.g. `1.0.0`.
- `title`, `description`, `category_ids`, `academic_years`, `effective_from`, `effective_to`.
- `severity`: `INFO | LOW | MEDIUM | HIGH | CRITICAL`; severity means review priority, not guilt or final outcome.
- `result_if_true`, `result_if_false`, `missing_data_result` from `PASS | REVIEW | INSUFFICIENT_EVIDENCE | NOT_APPLICABLE | ERROR`.
- `applicability`: safe declarative condition.
- `required_evidence_types` (may be empty) and `predicate`.
- `source`: title, publisher, edition, clause/section, page, canonical URL, retrieval date, checksum, status (`OFFICIAL_SOURCE_REVIEWED | DEMO_ONLY | NEEDS_REVIEW`).
- `explanation_template`, `recommended_next_action`, `owner`, `tests`, `created_at`, `published_at`, `published_by`.

## Evaluation semantics

1. Resolve exactly one applicable published pack for `application_type`, `category_id`, `academic_year`, and date. If none or more than one applies, return an explicit configuration error and stop rule evaluation for that scope.
2. Pin the resolved `rule_pack_id`, `rule_pack_version`, interpreter version, application snapshot/version and evidence versions in `ValidationRun`.
3. Resolve typed data paths only from the approved input schema. An absent path is `MISSING`, not an empty string, zero or `false`.
4. Evaluate applicability first. False means `NOT_APPLICABLE`.
5. If required evidence or values are absent, use `missing_data_result`, usually `INSUFFICIENT_EVIDENCE`; never silently return `PASS`.
6. Evaluate allow-listed predicates deterministically. Preserve observed value(s), normalized value(s), expected condition, evidence references, and an explanation.
7. Emit a result for each rule, including not-applicable rules, so reviewers understand coverage.
8. Results can only create/update findings. They may not alter application lifecycle to a final approval/rejection state.

## Publication lifecycle

`DRAFT -> TESTED -> PUBLISHED -> SUPERSEDED -> RETIRED`. A published version is immutable. Editing creates a new draft/version. Publishing requires the `rule.publish` permission, valid source citation, reviewer identity and test suite passing. AI-generated wording or proposed logic is draft material, never publishable without explicit human review.

## Rule tests

Every rule has positive, negative, missing-input and boundary test cases. Use stable synthetic fixtures. Example:

```json
{
  "rule_id": "DEMO.DOC.EXPIRY",
  "version": "1.0.0",
  "title": "Demonstration: certificate date appears expired",
  "status": "DEMO_ONLY",
  "category_ids": ["DEMO_EOA"],
  "predicate": {"op": "date_after", "left": {"path": "documents.building_certificate.valid_until"}, "right": {"path": "context.evaluation_date"}},
  "missing_data_result": "INSUFFICIENT_EVIDENCE",
  "source": {"status": "DEMO_ONLY", "title": "Synthetic demonstration rule", "clause": "Not a real regulatory clause"}
}
```

This is a structural illustration, not a valid legal rule. Compare dates with explicit timezone/date-only semantics; no implicit locale parsing.

## Rule pack and replay APIs

Expected services (names can vary if documented in ADR):
- `validate_rule_definition(definition) -> validation_errors[]`
- `run_rule_tests(pack_version) -> test_report`
- `publish_rule_pack(pack_version, actor) -> immutable version`
- `evaluate(snapshot_id, pack_version, evaluation_time) -> ValidationRun`
- `replay(snapshot_id, old_pack_version, new_pack_version) -> ReplayDiff`

Replay returns old/new outcomes with `changed`, `new`, `removed`, and unchanged rules. Historical validation runs remain immutable; replay creates a new run marked `SIMULATION`.

## Explainability payload

Each rule result includes `rule_id`, `rule_version`, `rule_title`, `result`, `severity`, `observed_values`, `expected_condition`, `normalization`, `evidence_refs`, `missing_evidence`, `explanation`, `limitation`, and `next_action`. Values must be permission-filtered before API serialization.

## Guardrails and tests

- Unknown operators are rejected at authoring time.
- Malformed/oversized predicates are rejected.
- The same snapshot + pack + interpreter version returns same output.
- Published rule versions cannot be updated/deleted through regular APIs.
- Missing records and unavailable providers never become mismatch findings by default.
- A `DEMO_ONLY` source is visibly labelled throughout UI, export and copilot citations.
- No result label maps directly to approve/reject or fraud.
