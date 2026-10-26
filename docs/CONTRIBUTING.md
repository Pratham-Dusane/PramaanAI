# Contribution and Parallel-Agent Workflow

## Before editing

1. Read root `AGENTS.md`, `PRD.md`, `docs/ARCHITECTURE.md`, `docs/DOMAIN_MODEL.md`, the relevant API/provider contract and assigned ticket.
2. Claim a ticket in `tickets/README.md` with agent/owner and status `IN_PROGRESS`; append a start entry to `LOG.md`.
3. Check dependencies and do not start a blocked integration task by inventing its upstream contract. Work against checked-in fixtures and the existing contract instead.
4. Define affected files, tests and expected handoff. Avoid editing global schemas without coordination.

## Parallel-safe zones

- Frontend may build against the typed API contract and fixture client before backend endpoints are ready.
- Rules engine may run against canonical synthetic snapshot DTOs while application upload/OCR proceeds.
- OCR/provider adapters may be developed against the `DocumentExtractionResult` contract without choosing permanent database schemas independently.
- Copilot may build retrieval/citation logic over the curated demo corpus and rule metadata while UI uses mock endpoints.
- Evaluation harness and synthetic fixture authoring can start early; do not tune thresholds against holdout labels.

## Shared-file ownership

T00 owns root config, CI, dependency lockfiles and initial layout. The domain/API contract owner (T00-02) owns canonical cross-module DTOs. Any change to shared DTO/schema must include: migration impact, backward-compatible API note, test updates, affected tickets and a `LOG.md` record. Announce this change in the handoff before merging integration branches.

## Code review checklist

- Matches ticket scope and existing conventions.
- No duplicated domain entity or incompatible status string.
- Scope/permission enforced on service layer, not merely hidden in UI.
- Inputs validated; failures and provider timeouts have safe typed outcomes.
- Data is versioned where immutable history matters.
- No private data or secrets in logs/fixtures.
- New logic has negative/boundary tests.
- UI is keyboard operable, messages are understandable, and non-text graph has table fallback.
- Docs, ticket status and `LOG.md` updated.

## Handoff format

```markdown
### Ticket: Txx-yy
Status: DONE | BLOCKED | NEEDS_REVIEW
Files changed:
Contract/schema changes:
Tests and commands run (with results):
Known gaps/risks:
Manual verification steps:
Next ticket unlocked:
LOG.md entry added: yes/no
```

## Commit guidance

Use focused commits with descriptive messages, e.g. `feat(rules): add versioned rule evaluation`. Never combine unrelated tracks just to reduce commit count. Do not force-push a shared branch. If a ticket cannot be completed, commit only coherent work, mark it `BLOCKED`, explain why and leave the next step actionable.
