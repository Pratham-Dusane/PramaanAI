# T10-02: Bulk application processing

**Status:** TODO  
**Track:** T10  
**Suggested owner:** unassigned  
**Dependencies:** T02-01, T02-02, T03-02, T01-02

## Objective

Process multiple applications/documents using durable jobs and isolate partial failures.

## Scope of work

Implement batch model/API, item-level job outcomes, limits, progress, cancellation, retry failed, idempotency keys, rate control, safe result export and audit. Manifest-based upload is sufficient; ZIP unpacking is optional and must be guarded if added.

## Acceptance criteria

[ ] Batch reports queued/running/success/failure/skipped totals.
[ ] One bad item cannot roll back successful items.
[ ] Retry failed is idempotent.
[ ] Cancellation semantics are documented and tested.
[ ] Export only contains records caller can access.
[ ] Size/item limits are enforced.

## Required tests / evidence

Mixed success/failure fixture; crash and retry injection; cancellation race; export scope.

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
