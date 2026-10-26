# AICTE Application Validation & Institutional Compliance Intelligence

**Purpose:** A self-contained implementation pack for autonomous coding agents. It includes requirements, problem statement, architecture, shared contracts, security controls, ticket backlog and evaluation plan.

> **Source-of-truth order:** `AGENTS.md` → `PRD.md` → `docs/PROBLEM_STATEMENT.md` and `docs/ARCHITECTURE.md` → domain/API/security documents → ticket acceptance criteria. If documents conflict, do not silently choose: add a decision in `docs/DECISIONS.md`, update the authoritative docs, and record it in `LOG.md`.

## Start here (every agent)

1. Read `AGENTS.md`.
2. Read `PRD.md`, `docs/PROBLEM_STATEMENT.md`, `docs/ARCHITECTURE.md`, `docs/DOMAIN_MODEL.md`, and `docs/API_CONTRACTS.md`.
3. Read `docs/FREE_TIER_POLICY.md`, `docs/INTEGRATION_CAPABILITY_MATRIX.md`, then `tickets/README.md` and the assigned ticket.
4. Check `LOG.md`, `docs/DECISIONS.md`, and `docs/INTEGRATION_CONTRACTS.md` before changing shared modules.
5. Implement only the assigned scope; add tests and update the ticket and log.

## Pack contents

- `PRD.md`: authoritative product requirements, scope, priorities and acceptance criteria.
- `AGENTS.md`: multi-agent rules and source-of-truth policy.
- `LOG.md`: append-only collaboration log.
- `docs/`: architecture, data model, API and provider contracts, security/privacy, rule governance, setup, test plan, demo, decisions, traceability and glossary.
- `tickets/`: independently assignable tickets organized into parallel tracks.
- `schemas/`: JSON schemas for rule definitions, findings, evidence graph and provider results.
- `docs/FREE_TIER_POLICY.md` and `docs/INTEGRATION_CAPABILITY_MATRIX.md`: no-cost implementation rules and integration gating.
- `docs/RELEASE_CHECKLIST.md`: final integration, safety and demo acceptance gate.
- `examples/`: synthetic dataset manifest and demo-only rule pack.

## Selected implementation defaults

- Frontend: React + TypeScript + Vite.
- Backend: Python 3.12 + FastAPI + Pydantic v2 + SQLAlchemy 2 + Alembic.
- Database: PostgreSQL 16+.
- Files: private local storage adapter for development; object storage interface for future use.
- OCR: local PDF/text extraction plus Tesseract; BHASHINI through a provider adapter when authorized and configured.
- Processing: modular monolith with durable database-backed jobs and a worker process.
- Evidence graph: relational node/edge tables for MVP.
- Rules: deterministic, declarative, versioned rules; LLM output never executes as a rule.

These are project defaults, not a claim about AICTE's internal technology stack.

## Explicit limitations

This is a project specification, not an official AICTE implementation or a promise of live government API access. Use synthetic/anonymized data. A provider fixture is always marked simulated. `VERIFIED_*` must only be used when an authorized live source actually supports that result.
