# T02-01: Institution and application lifecycle

**Status:** TODO  
**Track:** T02  
**Suggested owner:** unassigned  
**Dependencies:** T00-02

## Objective

Implement institution profiles, application types/categories/years and immutable submission snapshots.

## Scope of work

Create CRUD/query services with tenant scopes, assignments, lifecycle enums, versioned snapshots and application history; create draft, submit, assign, request clarification, resubmit, close/cancel with authorized transitions. Store exact selected rule-pack reference or a resolvable target before validation.

## Acceptance criteria

[ ] Applicant can manage own institution drafts only.
[ ] Submission locks the submitted version; edits create a new version.
[ ] State transitions are audited and invalid transitions rejected.
[ ] Reviewer queues support scope/assignment filters.
[ ] Official decision is separate from processing status.

## Required tests / evidence

Lifecycle integration tests; version immutability; scope isolation; assignment filters.

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
