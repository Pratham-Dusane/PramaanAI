# T02-04: Typed source verification connector and mock

**Status:** TODO  
**Track:** T02  
**Suggested owner:** unassigned  
**Dependencies:** T00-02, T01-02

## Objective

Offer one honest interface for checking an extracted record against authorized or synthetic sources.

## Scope of work

Implement connector result schema and interface with statuses from FR-05. Provide deterministic fake issuer dataset with simulated match/mismatch/not found and explicit unavailable/unauthorized/timeout/error. Live adapter is optional, disabled by default; minimize stored response and retain provider timestamp/reference/fingerprint.

## Acceptance criteria

[ ] All defined statuses are represented in contract tests.
[ ] Fixtures always return `SIMULATED_*`, never `VERIFIED_*`.
[ ] Provider failure does not block local rules.
[ ] External identifiers/payloads are minimized.
[ ] UI/API distinguishes unavailable from mismatch.

## Required tests / evidence

Contract suite for every status; timeout simulation; no-live-credentials pipeline test.

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
