# T08-03: Provider settings and truthful source status UI

**Status:** TODO  
**Track:** T08  
**Suggested owner:** unassigned  
**Dependencies:** T02-04, T08-02, T11-01

## Objective

Expose integration health and status semantics without misleading users about live verification.

## Scope of work

Add admin-only provider status/configuration panel without displaying secrets; result badges and timestamps for live/simulated/unavailable states; correlation ID and retry action where safe. Avoid implying AIKosh is a live verification source.

## Acceptance criteria

[ ] Each response visibly differentiates verified, simulated, unsupported and unavailable.
[ ] Unprivileged users cannot modify provider settings.
[ ] Key material is never returned to the UI.
[ ] Provider downtime leaves core validation usable.
[ ] Audit records configuration changes and manual retries.

## Required tests / evidence

Role/scope tests; snapshot UI tests for status matrix; timeout integration test.

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
