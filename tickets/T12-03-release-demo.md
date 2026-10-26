# T12-03: Integrated demo, performance and release gate

**Status:** TODO  
**Track:** T12  
**Suggested owner:** unassigned  
**Dependencies:** All P0 tickets and required P1 slices; T12-01; T12-02

## Objective

Prove a clean, repeatable demo and package release artifacts/known limitations.

## Scope of work

Run canonical DEMO_SCENARIO from clean DB; resolve integration conflicts; measure p50/p95 pipeline/bulk paths; verify all links/docs/scripts; generate screenshots or short recording; add limitations statement and feature status matrix live/mock/unavailable; close critical test defects.

## Acceptance criteria

[ ] Clean setup works with no external credentials.
[ ] Canonical demo covers base PS and every requested P1 feature at its minimum slice.
[ ] P0 and P1 status matrix distinguishes implemented, partial and simulated.
[ ] Test/evaluation report is reproducible and limitations shown.
[ ] No critical/high security issue remains open without accepted, documented exception.
[ ] All tickets/LOG/README reflect final state.

## Required tests / evidence

Full CI; reset-and-demo rehearsal; performance report; security/accessibility smoke; docs command audit.

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
