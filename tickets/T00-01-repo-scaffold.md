# T00-01: Repository scaffold and runnable baseline

**Status:** TODO  
**Track:** T00  
**Suggested owner:** unassigned  
**Dependencies:** None; first ticket

## Objective

Create a clean-checkout runnable modular monolith and enforce consistent lint/type/test commands.

## Scope of work

Create frontend React + TypeScript + Vite; backend FastAPI + Pydantic + SQLAlchemy + Alembic; PostgreSQL via Compose; worker entrypoint; health endpoints; ignored environment files; CI with basic checks; pinned dependencies/lockfiles; root README linking AGENTS/PRD/setup. Preserve modular package boundaries.

## Acceptance criteria

[ ] Fresh clone starts DB, API, worker and frontend using only documented commands.
[ ] Migration and health checks pass.
[ ] CI runs backend tests/lint and frontend typecheck/build.
[ ] `.env.example` has placeholders only; secrets and uploads are ignored.
[ ] `docs/DEVELOPMENT_SETUP.md` contains verified commands, not guessed commands.

## Required tests / evidence

Clean environment boot; DB unhealthy/API health behavior; CI; secret scan or grep for real keys.

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
