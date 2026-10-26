# T10-01: Deadline and expiry alerts

**Status:** TODO  
**Track:** T10  
**Suggested owner:** unassigned  
**Dependencies:** T02-01, T02-03, T01-02

## Objective

Schedule alerts for application deadlines, clarification responses and expiring evidence.

## Scope of work

Implement deadline/expiry model, configurable reminder windows, deduplication keys, durable scheduled worker, timezone/date-only handling, acknowledgment/snooze and delivery status. Keep alert messaging advisory and allow category/year-specific configuration.

## Acceptance criteria

[ ] Due-soon, due-today, overdue and expired states compute correctly.
[ ] Repeated scheduler runs do not duplicate alerts.
[ ] Date-only deadlines are not shifted by timezone.
[ ] Recipient and referenced application scope are enforced.
[ ] Expiry alerts have evidence and configurable reminder settings.

## Required tests / evidence

Boundary dates/leap years/timezones; duplicate scheduler run; recipient scope test.

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
