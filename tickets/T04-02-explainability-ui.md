# T04-02: Finding details and accessible graph view

**Status:** TODO  
**Track:** T04  
**Suggested owner:** unassigned  
**Dependencies:** T04-01, T11-01

## Objective

Make every finding understandable and actionable with a graph and a non-graph alternative.

## Scope of work

Build finding detail component with observed value, expected condition, source page/field, rule title/version/source clause, severity and its meaning, confidence/limitations, next action, reviewer disposition. Add graph visualization if feasible plus full keyboard-operable table/list alternative.

## Acceptance criteria

[ ] User can navigate finding -> source evidence -> rule version.
[ ] Missing evidence and mismatch are distinguished.
[ ] Graph and table expose the same information.
[ ] Finding cannot be marked resolved without authorized action/reason.
[ ] No language implies fraud or final outcome solely from a signal.

## Required tests / evidence

UI test for link targets; screen reader/keyboard test; graph/table parity fixture.

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
