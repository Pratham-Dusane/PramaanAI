# T11-02: Applicant and reviewer workflows

**Status:** TODO  
**Track:** T11  
**Suggested owner:** unassigned  
**Dependencies:** T02-01, T02-03, T03-02, T04-01, T11-01

## Objective

Implement the core end-to-end application creation, upload, validation and review screens.

## Scope of work

Applicant: draft/category/year, checklist, upload, progress, preflight and clarification. Reviewer: scoped queue, application detail, extracted fields with source page, findings, rule details, connector status, timeline, resolution and human decision where permitted. Use typed endpoints and visible scope-aware errors.

## Acceptance criteria

[ ] Applicant completes synthetic end-to-end submission.
[ ] Reviewer sees exact source and rule for each finding.
[ ] Permissions hide actions but backend still validates them.
[ ] Decision is only shown/enabled to authorized role.
[ ] Empty/error/loading and processing states are comprehensible.

## Required tests / evidence

Playwright or equivalent applicant/reviewer E2E; role mismatch; API failure.

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
