# T06-02: Duplicate application/document detection

**Status:** TODO  
**Track:** T06  
**Suggested owner:** unassigned  
**Dependencies:** T06-01, T02-01, T04-01

## Objective

Detect exact/repeated/fuzzy application candidates and give authorized reviewers a safe disposition path.

## Scope of work

Combine exact document hash, normalized application reference/institution/category/year and selected similarity signals. Return `EXACT_MATCH`, `LIKELY_DUPLICATE`, `POSSIBLE_REUSE`, `NO_MATCH`, features and evidence links. Reviewer can confirm/dismiss/defer with reason; never auto-merge/delete/reject.

## Acceptance criteria

[ ] Exact duplicate detection is deterministic.
[ ] Fuzzy match exposes reasons and score, not only a label.
[ ] Reviewer disposition is audited.
[ ] Cross-institution source file contents are not leaked.
[ ] Same application retries do not create false duplicates.

## Required tests / evidence

Exact/near/benign-shared fixtures; scope leakage test; manual disposition test.

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
