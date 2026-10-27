# AGENTS.md - mandatory rules for every coding agent

## 1. Mission

Build an AICTE application-validation **decision-support** platform. It assists authorized reviewers with extraction, evidence comparison and review trails. It must never autonomously approve, reject, suspend or revoke approval. AI findings are advisory; competent officials retain the decision.

Agents must work from repository docs, not chat-only context. Do not request a context recap if the answer is documented. For ambiguity, record it and choose the safest non-destructive behaviour unless it blocks progress.

## 2. Source of truth

1. `AGENTS.md`: agent coordination and engineering safeguards.
2. `PRD.md`: product requirements and priorities.
3. `docs/PROBLEM_STATEMENT.md`: baseline PS paraphrase.
4. `docs/ARCHITECTURE.md`, `docs/DOMAIN_MODEL.md`, `docs/API_CONTRACTS.md`, `docs/INTEGRATION_CONTRACTS.md`: shared architecture/interfaces.
5. `docs/SECURITY_PRIVACY.md`, `docs/RULES_ENGINE.md`, `docs/TEST_STRATEGY.md`, `docs/FREE_TIER_POLICY.md`, `docs/INTEGRATION_CAPABILITY_MATRIX.md`: cross-cutting safety, budget and integration requirements.
6. Ticket-specific acceptance criteria.
7. Existing implementation, only when compatible with the above.

If two sources conflict, stop work on the conflicting piece. Add an ADR to `docs/DECISIONS.md` (context, options, decision, consequences, status/date), update authoritative docs, and append a summary to `LOG.md`. Never silently change requirements.

## 3. Work protocol

### Before coding
- Read this file, the whole assigned ticket and its dependency documents.
- Inspect the repository and run relevant baseline tests before assuming any module exists.
- Mark the ticket `IN_PROGRESS` and append a start entry to `LOG.md`.

### While coding
- Stay within the ticket's track; avoid unrelated refactors.
- Shared API/schema/permission/status changes must update canonical docs and be announced in `LOG.md`.
- Use synthetic fixtures and deterministic mock providers. Tests must not depend on live BHASHINI, DigiLocker, NAD or public network availability.
- Never commit secrets, personal data, real institutional identifiers, raw application files or sensitive logs.
- Never trust client-supplied role, institution scope, file type, hash, source-verification status or rule version.
- Describe observable evidence and uncertainty; do not convert a suspicion into an allegation.

### Before completion
- Run relevant tests, formatter, linter and type checks. Record exact commands/outcomes honestly.
- Test migrations from a clean database if schema changed.
- Confirm loading, empty, error and partial-failure states exist for user-facing flows.
- Update ticket checkboxes, `LOG.md`, affected docs/schema examples and traceability.

## 4. Parallel work and shared files

- Agents coordinate through tickets, shared docs and `LOG.md`, not private assumptions.
- `docs/API_CONTRACTS.md`, `docs/DOMAIN_MODEL.md` and `docs/INTEGRATION_CONTRACTS.md` are contract-owned. Other agents propose changes in tickets; only the coordinator/platform owner approves and merges contract changes.
- T00 owns baseline schema conventions and migration coordination. Any track adding tables must announce proposed names/relations in `LOG.md` before creating a migration and check conflicts.
- Do not change another agent's ticket status. The coordinator owns cross-track status updates.
- Use branches `feat/<ticket-id>-short-name` when available.
- Follow dependency graph in `tickets/README.md`. UI and QA can build mocks/fixtures in parallel, but consumers must follow frozen contracts.

## 5. Architecture boundaries

- Frontend accesses the backend only through typed documented REST APIs.
- Backend is a modular monolith: auth, institutions, applications, documents, extraction, rules, validation, evidence, digital twin, anomaly, infrastructure, integration, copilot, notifications, audit and bulk jobs.
- Use service interfaces for cross-module side effects; avoid unscoped cross-module SQL.
- OCR, bulk processing, provider calls and reminder jobs must not block HTTP request workers.
- External providers are adapters with bounded timeouts/retries, rate limits, redaction and explicit statuses; always implement a deterministic fake adapter.
- Rules are deterministic/versioned. The copilot may explain rules but cannot publish or enforce a rule by itself.

## 6. Safety invariants

- Use check results `PASS`, `REVIEW`, `INSUFFICIENT_EVIDENCE`, `NOT_APPLICABLE`, `ERROR`. `REVIEW` does not mean fraud.
- SHA-256 proves byte identity against a known digest, not authenticity. Perceptual similarity proves only similarity.
- Provider failure is unavailable, not mismatch. A mock result is not a live verification.
- Preserve submitted source bytes and keep extracted/corrected/translated fields as separate versions with provenance.
- Treat OCR, metadata, uploaded text, images and retrieved documents as untrusted input. Defend the copilot against prompt injection inside documents.
- Enforce institution/case scope in API calls, jobs, graph traversal, exports, notifications, search and copilot retrieval.
- Only an explicitly authorized human can create an official decision. AI/worker principals must not have `decision.record` permission.
- Never use real sensitive documents in tests, seed data, logs or screenshots.

## 7. Code conventions

### Python
- Type-hint public functions; use Pydantic DTOs, separate from SQLAlchemy models.
- Use timezone-aware UTC timestamps and ISO-8601 serialization.
- Use enums/constants for statuses instead of repeated raw strings.
- Make important state transitions and audit writes transactional, or document a durable outbox mechanism.
- Never call external services at module import time.

### TypeScript/React
- Strict TypeScript and typed API client (generate types from OpenAPI where feasible).
- Semantic HTML, labels, visible focus, keyboard access, responsive layouts and non-colour-only status indicators.
- UI role checks are usability only; backend still enforces access.
- Never render OCR/copilot content as untrusted HTML.

### Database
- UUIDs for internal IDs unless a real external ID requires another format.
- Institution-bound data must carry scope or be reachable only through a scoped parent.
- Add indexes for common filters/foreign keys and uniqueness constraints for idempotency.
- Migrations must be tested from an empty schema and reversible when practical.

## 8. Ticket states

Only `TODO`, `IN_PROGRESS`, `BLOCKED`, `IN_REVIEW`, `DONE`.
- `DONE` requires acceptance criteria and tests.
- `BLOCKED` requires exact blocker, affected dependency and next action in ticket and log.
- A successful mock integration does not prove live access; document live-access status explicitly.

## 9. LOG.md entry format

Append, never replace:

```md
### YYYY-MM-DD HH:MM UTC - <ticket-id> - <agent/owner>
- Status: IN_PROGRESS | DONE | BLOCKED | IN_REVIEW
- Changed: paths and interfaces
- Tests: exact commands and outcomes
- Decisions: ADR IDs or `None`
- Handoff: dependency or next action
```

No PII, credentials, raw document contents or enormous terminal dumps in the log.

## 10. When unsure

Prefer a review flag, unavailable provider status or insufficient-evidence outcome over invented certainty. Record assumptions. Keep the smallest safe end-to-end slice working. Protect source integrity and auditability over cleverness.
