# T05-02: Cross-year change and anomaly intelligence

**Status:** TODO  
**Track:** T05  
**Suggested owner:** unassigned  
**Dependencies:** T05-01, T03-02, T04-01

## Objective

Compare current snapshot with prior state and prioritize changes with explanation, not allegations.

## Scope of work

Implement configurable field comparators, expected-change allow-list, thresholds/time windows and change categories: expected, unexplained, stale/expired, missing continuation, possible reuse. Store old/new values, time gap, evidence and reason features. Allow human disposition and metric reporting.

## Acceptance criteria

[ ] Known expected change does not become automatically suspicious.
[ ] Each cue has field-level old/new values and source links.
[ ] Score/ranking is explainable and explicitly advisory.
[ ] No “fraud” verdict or auto-rejection.
[ ] No-history state is distinct from unchanged.

## Required tests / evidence

Seeded expected/unexplained cases; false-positive report; history-missing test.

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
