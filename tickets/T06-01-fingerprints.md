# T06-01: Fingerprint service and similarity candidates

**Status:** TODO  
**Track:** T06  
**Suggested owner:** unassigned  
**Dependencies:** T02-02

## Objective

Provide exact byte identity and optional near-duplicate signal with algorithm provenance.

## Scope of work

Implement SHA-256 and optional perceptual image hash/text normalized fingerprint as a separate service. Record algorithm, version, threshold, preprocessing, timestamp and evidence version. Index for lookup while respecting scopes. Hashes cannot be treated as issuer authentication.

## Acceptance criteria

[ ] Byte-identical file gets same SHA-256.
[ ] Modified bytes get different SHA-256 in fixture.
[ ] Similarity result includes score/threshold/algorithm.
[ ] Fingerprint changes create version-linked record.
[ ] UI terminology says exact match/similarity candidate, not authentic/fraudulent.

## Required tests / evidence

Known bytes and transformed images; threshold boundaries; version provenance tests.

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
