# T01-03: Human decision workflow and protected state transitions

**Status:** TODO  
**Track:** T01  
**Suggested owner:** unassigned  
**Dependencies:** T01-01, T01-02, T02-01

## Objective

Separate processing and review states from the final human decision.

## Scope of work

Implement transition service and authorized human decision record with actor, outcome, reason, timestamp, evidence references and optional appeal/clarification notes. Worker/rule/copilot identities must not hold `decision.record`. Keep submitted application version immutable; resubmission creates new version.

## Acceptance criteria

[ ] Every transition is validated against a transition table.
[ ] Unauthorized user cannot record final decision.
[ ] AI/worker service account cannot record a decision.
[ ] Decision requires explicit outcome and reason.
[ ] History of earlier decisions/resubmissions remains visible and immutable.

## Required tests / evidence

Invalid transition tests; service-account attempt; human authorized path; decision/audit consistency.

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
