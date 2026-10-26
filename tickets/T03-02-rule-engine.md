# T03-02: Deterministic evaluation and checklist

**Status:** TODO  
**Track:** T03  
**Suggested owner:** unassigned  
**Dependencies:** T03-01, T02-01, T02-03

## Objective

Evaluate rules and completeness checklists against a pinned snapshot reproducibly.

## Scope of work

Implement safe predicate interpreter, missing-value sentinel, applicability, required evidence, typed comparisons/normalization and `ValidationRun`. Persist per-rule result, observed values, evidence refs, normalization and explanation. Results never mutate official decision.

## Acceptance criteria

[ ] Same snapshot/pack/engine yields byte-equivalent normalized results.
[ ] Missing evidence is not silently PASS or mismatch.
[ ] Every rule produces a result including not-applicable coverage.
[ ] Every finding cites evidence or explicit missing-evidence reason.
[ ] Rule processing cannot call final decision service.

## Required tests / evidence

Known-answer rule matrix; missing/boundary/unit/date tests; determinism replay.

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
