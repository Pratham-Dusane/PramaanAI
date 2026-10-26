# T07-02: Infrastructure reviewer panel and observations

**Status:** TODO  
**Track:** T07  
**Suggested owner:** unassigned  
**Dependencies:** T07-01, T04-01, T11-01

## Objective

Give inspectors a dedicated view to compare declared facilities, submitted evidence and automated cues.

## Scope of work

Build evidence gallery, floor-plan/image view, metadata/label panel, signal explanation, inspector observation form and follow-up evidence request. Link all annotations and observations to application/evidence graph. Provide keyboard-accessible thumbnails/alternatives.

## Acceptance criteria

[ ] Inspector sees original evidence and derived cues separately.
[ ] Each note is actor/time/version attributed.
[ ] Cannot issue official compliance verdict from automated cue alone.
[ ] New evidence adds a new version and rerun possibility.
[ ] Text/list alternative covers image gallery navigation.

## Required tests / evidence

Inspector workflow E2E; authorization; image annotation/audit test.

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
