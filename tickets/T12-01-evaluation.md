# T12-01: Synthetic evaluation harness

**Status:** TODO  
**Track:** T12  
**Suggested owner:** unassigned  
**Dependencies:** T00-03, T02-03, T03-02

## Objective

Generate reproducible quantitative evidence for base requirements and added anomaly features.

## Scope of work

Build dataset manifest and ground truth; fixed holdout evaluation for classification, extraction, rule outcomes, anomaly/dedup signal precision/recall, connector status truthfulness, copilot citations and stage timings. Export JSON/CSV/Markdown report with commit/config versions and limitations.

## Acceptance criteria

[ ] Synthetic data/provenance explicitly disclosed.
[ ] Metrics reproduce from documented command.
[ ] Per-class/per-field and false-positive metrics are included.
[ ] Holdout cases are separate from tuning fixtures.
[ ] No fabricated time-saving or accuracy claims.

## Required tests / evidence

Run evaluation twice; compare stable results; validate report contains sample counts and limitations.

## Interfaces and coordination

- Read `AGENTS.md`, `PRD.md`, `docs/ARCHITECTURE.md`, `docs/DOMAIN_MODEL.md`, and relevant contract documents before implementation.
- Do not introduce duplicate entities/statuses or bypass server-side authorization.
- For shared contract changes, document migration/backward-compatibility impact and notify dependent ticket owners before merge.
- Add/update automated tests and user-facing/agent documentation. Append a dated entry to `LOG.md`.

## Completion report (fill before DONE)

- **Files changed:** TBD
- **Commands/tests run and results:** TBD
- **Manual verification:** TBD
- **Known gaps / risks:** TBD
- **Next tickets unblocked:** TBD
- **LOG entry:** TODO
