# T06-03: Cross-institution relationship intelligence

**Status:** TODO  
**Track:** T06  
**Suggested owner:** unassigned  
**Dependencies:** T06-01, T05-01, T01-02

## Objective

Surface cautious potential links between institutions without defamatory conclusions or unauthorized disclosure.

## Scope of work

Compare permitted signals: shared document fingerprints, authorized shared identifier, declared faculty cross-appointment, normalized public/contact/address overlaps where permitted. Store method, fields, strength, evidence scope and caveat. Show restricted summaries and only evidence allowed by authorization policy.

## Acceptance criteria

[ ] Only approved feature types participate.
[ ] Result labels say candidate/potential relationship for review.
[ ] Every relationship exposes supporting signal and limitations.
[ ] Cross-institution queries do not disclose protected data/documents.
[ ] Benign shared service-provider cases are included in evaluation.

## Required tests / evidence

Benign/adversarial synthetic graph; cross-tenant API test; explainability and threshold tests.

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
