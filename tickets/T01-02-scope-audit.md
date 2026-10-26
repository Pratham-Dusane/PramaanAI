# T01-02: Scope enforcement and append-only audit

**Status:** TODO  
**Track:** T01  
**Suggested owner:** unassigned  
**Dependencies:** T01-01, T00-02

## Objective

Make application scope and audit records consistently enforced across APIs, workers, graphs, downloads and exports.

## Scope of work

Implement reusable scoped queries/services; audit event schema/service; actor, action, target, timestamp UTC, correlation, before/after digest and outcome; record document view/download, exports, role changes, connector calls, reprocessing and sensitive transitions. Avoid storing raw document text/tokens.

## Acceptance criteria

[ ] Cross-tenant IDs return non-leaking 404/403 policy.
[ ] Graph/search/export/worker tasks apply identical scope.
[ ] Audit writes occur for all critical actions.
[ ] Regular users cannot edit/delete audit events.
[ ] Audit records exclude secrets and raw evidence payloads.

## Required tests / evidence

IDOR matrix across routes; append-only update/delete denied; log redaction assertions.

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
