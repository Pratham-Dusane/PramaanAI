# T10-03: Next-application preflight and carry-forward

**Status:** TODO  
**Track:** T10  
**Suggested owner:** unassigned  
**Dependencies:** T05-01, T03-02, T02-01, T01-02

## Objective

Reduce repeat entry by pre-populating candidate fields and evidence references from prior reviewed history.

## Scope of work

Add pre-submission simulator and carry-forward eligibility service. Each proposed field shows source application/year, provenance, verification/review state, timestamp and expiry; applicant confirms or edits all carried values. Block silent carry-forward of expired/disputed/unverified/superseded attributes.

## Acceptance criteria

[ ] User can run preflight before submission.
[ ] Each carried field requires applicant confirmation.
[ ] Expired/disputed/unverified fields are excluded or clearly blocked.
[ ] Changed fields and requirement gaps are shown.
[ ] Source-case permissions are checked before revealing carry-forward details.

## Required tests / evidence

New-year E2E; stale field exclusion; cross-tenant carry-forward denial.

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
