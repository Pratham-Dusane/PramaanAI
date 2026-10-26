# T03-03: Rule test, publish and replay comparison

**Status:** TODO  
**Track:** T03  
**Suggested owner:** unassigned  
**Dependencies:** T03-01, T03-02, T01-01

## Objective

Provide controlled rule publishing and what-if comparison without rewriting historical results.

## Scope of work

Build fixture-based rule test runner; publish endpoint with `rule.publish`; immutable release metadata; replay simulation for old/new packs; diff changed/new/removed/unchanged rules and affected applications. Include audit event and source review acknowledgement.

## Acceptance criteria

[ ] Failed rule tests block publication.
[ ] Only authorized Rule Admin can publish.
[ ] Publishing makes immutable version and audit event.
[ ] Replay returns diff without altering historical run/decision.
[ ] Copilot cannot publish rule versions.

## Required tests / evidence

Publish auth tests; failed fixture prevents publish; replay historical immutability test.

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
