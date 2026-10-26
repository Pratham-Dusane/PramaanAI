# T05-01: Provenance-aware institutional digital twin

**Status:** TODO  
**Track:** T05  
**Suggested owner:** unassigned  
**Dependencies:** T02-01, T02-03, T04-01

## Objective

Create a temporal institutional profile with explicit source lineage and verification state.

## Scope of work

Store time-aware attributes/snapshots for programmes, faculty, facilities and other configured facts; each attribute records value, effective time/year, source kind/ID, status, confidence, verified timestamp and supersession. UI timeline groups declared/extracted/reviewer-confirmed/authorized/synthetic sources.

## Acceptance criteria

[ ] Each attribute has provenance and state.
[ ] Synthetic/declaration facts are not represented as official record.
[ ] Corrections supersede rather than overwrite source values.
[ ] Users can compare snapshots by year and open supporting evidence.
[ ] Scope limits profile access.

## Required tests / evidence

Attribute source-state tests; timeline/diff tests; reviewer-confirmed update audit.

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
