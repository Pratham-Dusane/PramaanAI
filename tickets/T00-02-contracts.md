# T00-02: Canonical DTOs, API contracts and schema ownership

**Status:** TODO  
**Track:** T00  
**Suggested owner:** unassigned  
**Dependencies:** T00-01

## Objective

Create stable shared contracts so feature agents can work in parallel without duplicating domain concepts.

## Scope of work

Implement typed entities/status enums and request/response DTOs from DOMAIN_MODEL/API_CONTRACTS. Add schema validation; version API prefix; shared error envelope; correlation ID; pagination conventions; schema fixtures. Register schema owner in LOG and tickets.

## Acceptance criteria

[ ] Every cross-track entity/status is defined once.
[ ] OpenAPI is generated and matches docs/API_CONTRACTS.md.
[ ] Request validation and safe errors work.
[ ] Fixture JSON validates against canonical models.
[ ] Contract changes require documented compatibility note.

## Required tests / evidence

DTO serialization round trips; invalid enum/type tests; OpenAPI snapshot/contract tests.

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
