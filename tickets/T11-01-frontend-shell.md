# T11-01: Frontend shell and typed API client

**Status:** TODO  
**Track:** T11  
**Suggested owner:** unassigned  
**Dependencies:** T00-02

## Objective

Provide a reusable accessible application shell against stable OpenAPI DTOs, supporting backend-ready mock fixtures.

## Scope of work

Build React/TS/Vite layout, route structure, session provider, typed API client generated/derived from canonical contract, error/loading/empty/offline states, design tokens, reusable table/form/dialog components. Keep mock mode explicit and visually labelled.

## Acceptance criteria

[ ] Frontend installs/builds from lockfile.
[ ] Typed API client handles standard errors/correlation IDs.
[ ] Loading/empty/error/retry states exist.
[ ] Mock data is never mistaken for live backend data.
[ ] Responsive layout works at mobile and desktop breakpoints.

## Required tests / evidence

Typecheck/build; component tests; API error mock tests; responsive smoke test.

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
