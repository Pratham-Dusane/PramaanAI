# T04-01: Evidence graph and finding builder

**Status:** TODO  
**Track:** T04  
**Suggested owner:** unassigned  
**Dependencies:** T02-03, T03-02, T00-02

## Objective

Represent traceable relationships among applications, evidence, fields, rules, source responses and findings.

## Scope of work

Use relational graph nodes/edges or normalized FK relations per domain model. Build typed, scoped graph traversal. Findings must link to rule version and evidence nodes or explicit absent-evidence reason. Store source anchors and validation-run membership. Limit graph depth/page size.

## Acceptance criteria

[ ] Graph edges reference existing correctly typed entities.
[ ] Every material finding has rule/evidence link or missing-evidence reason.
[ ] Traversal respects access scope and has bounded limits.
[ ] Deleted/superseded records are represented through status/version semantics, not broken edges.
[ ] Graph output has stable IDs for UI references.

## Required tests / evidence

Referential integrity; graph traversal scope; max-depth/limit; finding completeness tests.

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
