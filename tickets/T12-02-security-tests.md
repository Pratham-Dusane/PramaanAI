# T12-02: Security, privacy and RBAC regression suite

**Status:** TODO  
**Track:** T12  
**Suggested owner:** unassigned  
**Dependencies:** T01-02, T02-02, T08-02, T09-02, T10-02

## Objective

Test the most important security invariants across all new features.

## Scope of work

Create centralized authorization matrix tests for application/doc/graph/copilot/export/bulk/provider settings/decision/rule publication; upload adversarial files; prompt injection; secrets/logging audit; rate limits; session and CORS/security config checks. Add CI gate for critical failures.

## Acceptance criteria

[ ] Applicants cannot access another institution.
[ ] Rules/copy/collaborative graph queries do not leak unauthorized context.
[ ] No critical secrets in repo/logs/response payloads.
[ ] Unsafe file fixtures rejected; size/resource caps enforced.
[ ] AI services cannot mutate official decision or published rule.

## Required tests / evidence

Permission matrix run; malicious upload tests; prompt injection suite; audit/log scan.

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
