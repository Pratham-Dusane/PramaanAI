# T00-03: Synthetic seed data and demo reset

**Status:** TODO  
**Track:** T00  
**Suggested owner:** unassigned  
**Dependencies:** T00-01, T00-02

## Objective

Make all tickets demoable with fictional institutions and fully repeatable fixtures.

## Scope of work

Build idempotent seed command using `examples/synthetic_dataset_manifest.json`; seed users per role, institutions, two-year applications, demo-only rules/corpus, documents/fingerprint metadata, connector outcomes, findings, deadlines and relationships. Do not require live service credentials. Make destructive reset refuse outside explicit demo/test environment.

## Acceptance criteria

[ ] Seed can run twice without duplicate rows.
[ ] All names, identifiers and records are clearly synthetic.
[ ] Demo banner/status appears in seeded data.
[ ] Reset fails closed outside approved environment.
[ ] Seed includes clean, missing, mismatch, expired, duplicate, provider-unavailable and cross-year cases.

## Required tests / evidence

Seed twice; inspect database manifest; assert reset refusal with APP_ENV=production.

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
