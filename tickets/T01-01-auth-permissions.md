# T01-01: Authentication and effective permission model

**Status:** TODO  
**Track:** T01  
**Suggested owner:** unassigned  
**Dependencies:** T00-02

## Objective

Authenticate users and calculate effective permissions without relying on frontend role checks.

## Scope of work

Implement secure demo login or configured auth provider, session handling, user/role/permission models, institution and case scope membership, permission dependencies, expiry/logout, secure cookies or vetted token flow. Demo credentials must be clearly local-only and never production defaults.

## Acceptance criteria

[ ] Anonymous requests cannot access protected data.
[ ] Every protected endpoint uses service/router authorization.
[ ] Role != global access; effective permissions include scope constraints.
[ ] Login/logout/session expiry and denied path are tested.
[ ] Rule Admin does not implicitly gain document content access.

## Required tests / evidence

Role-permission matrix; expired session; forged role claim; applicant cross-institution access.

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
