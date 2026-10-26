# T03-01: Rule schema, lifecycle and source provenance

**Status:** TODO  
**Track:** T03  
**Suggested owner:** unassigned  
**Dependencies:** T00-02

## Objective

Define safe declarative rules with source clauses, applicability and versioned lifecycle.

## Scope of work

Implement rule and rule-pack models matching docs/RULES_ENGINE.md; JSON schema validation; approved operator allow-list; date/year/category scoping; source status and citation fields; DEMO_ONLY label; creator/owner fields. No arbitrary eval/sql/plugins.

## Acceptance criteria

[ ] Malformed and unknown operators are rejected.
[ ] Rule requires source status/citation or explicit DEMO_ONLY.
[ ] Published versions are immutable.
[ ] Overlapping applicable pack selection is detected as an error.
[ ] Rule pack has version and effective interval.

## Required tests / evidence

Schema positive/negative tests; mutation after publish denied; overlapping pack test.

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
