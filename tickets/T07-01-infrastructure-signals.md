# T07-01: Metadata, OCR and image-similarity signals

**Status:** TODO  
**Track:** T07  
**Suggested owner:** unassigned  
**Dependencies:** T02-02, T02-03, T06-01

## Objective

Extract observable cues from infrastructure evidence for inspection support.

## Scope of work

Collect metadata when present, OCR labels/dates, duplicate/similarity signals, image resolution/quality and declared facility ID comparisons. If performing CV, expose model/version/confidence and observable label only. No facial recognition, identity inference or image-only compliance conclusion.

## Acceptance criteria

[ ] Checks return typed signals with evidence/source image reference.
[ ] Missing metadata is not treated as suspicious by default.
[ ] Signals can be unavailable/low-confidence.
[ ] No inference of building compliance from image alone.
[ ] Text says inspector review required for material inconsistencies.

## Required tests / evidence

Metadata absent/malformed; image duplicates; contradictory labels; misleading-case tests.

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
