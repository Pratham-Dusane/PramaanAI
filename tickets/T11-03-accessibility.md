# T11-03: Accessibility and language switching

**Status:** TODO  
**Track:** T11  
**Suggested owner:** unassigned  
**Dependencies:** T08-01, T11-01, T11-02

## Objective

Make core flows keyboard and assistive-technology usable, and connect locale dictionaries.

## Scope of work

Ensure semantic landmarks/headings, visible focus, proper labels/errors, accessible modal behavior, table captions, live status updates, non-color-only severity and graph/table alternative. Test zoom/reflow, contrast and language selector. Avoid hover-only/drag-only actions.

## Acceptance criteria

[ ] Complete core applicant and reviewer flow using keyboard only.
[ ] Focus is visible and order is logical.
[ ] Errors associate with fields and status updates are announced.
[ ] Graph has equivalent accessible table/list.
[ ] Target WCAG 2.2 AA issues are documented with severity and remediation.

## Required tests / evidence

Automated accessibility scan plus manual keyboard/zoom/screen-reader checklist.

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
