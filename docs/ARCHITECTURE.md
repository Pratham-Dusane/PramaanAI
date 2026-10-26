# Architecture and Module Boundaries

## Principles

- Use a modular monolith for the prototype, plus a separate worker process. Do not add microservices without an ADR.
- PostgreSQL is the durable source of truth. Original files live in private storage and are referenced by opaque keys.
- OCR, translation, source verification and optional LLMs are provider adapters with stable internal contracts.
- Long-running work uses durable jobs and survives process restart.
- Rules and human review are the control plane; generative AI is optional assistance.
- Synthetic fixtures make the demo work without external credentials/network access.

## Component diagram

```mermaid
flowchart LR
  U[Applicant / Reviewer / Rule Admin] --> UI[React + TypeScript]
  UI --> API[FastAPI + AuthZ]
  API --> DB[(PostgreSQL)]
  API --> FS[Private Document Storage]
  API --> J[(Durable Job Table)]
  J --> W[Background Worker]
  W --> OCR[PDF Parser / Tesseract]
  W --> BH[BHASHINI Adapter - Optional]
  W --> RULES[Versioned Rule Engine]
  W --> EG[Evidence Graph + Findings]
  W --> SV[Source Connector Interface]
  UI --> COP[Grounded Regulatory Copilot]
  COP --> RET[Approved Corpus Retrieval + Citations]
  RET --> DB
  EG --> DB
  RULES --> DB
  SV --> DB
```

## Suggested package layout

```text
backend/app/
  main.py
  core/{config,auth,permissions,errors,logging}.py
  api/routes/{health,auth,applications,documents,validation,findings,rules,copilot,bulk,notifications,admin}.py
  modules/{users,institutions,applications,documents,extraction,rules,validation,evidence,digital_twin,anomaly,infrastructure,duplicates,relationships,integrations,notifications,bulk_jobs,copilot,audit}/
  providers/{ocr,translation,verification}/
  workers/ db/models/ db/session.py migrations/ tests/
frontend/src/{app,features,components,api}/
```

Exact folders may be adapted by T00, but don't put business logic in route handlers.

## Processing flow

1. `POST /applications/{id}/documents` checks user, scope, file format, size and magic bytes.
2. Store source file privately, create immutable `DocumentVersion`, compute SHA-256, create audit event and enqueue idempotent processing job.
3. Worker extracts text by page, classifies document, extracts fields, and persists raw/normalized values, confidence, page/region anchors and provider/version metadata.
4. Validation resolves one published rule pack for the application category/year/date. It creates `ValidationRun`, check results, findings and evidence graph records.
5. External source calls happen only when enabled, authorized and required by a check. Every response/failure becomes a typed status.
6. UI fetches scoped application, checklist, extraction, finding and evidence-chain DTOs.
7. Review actions create immutable history and audit events. Only a separately authorized human decision endpoint can write `HumanDecision`.

## Durable job model and idempotency

Each job contains `job_id`, `job_type`, `resource_id`, `resource_version`, `idempotency_key`, `status`, `attempt`, `max_attempts`, timestamps and safe error code. A uniqueness constraint prevents duplicate job requests. Use bounded exponential backoff for transient errors; don't retry deterministic schema failures indefinitely. A PostgreSQL job table with `SELECT ... FOR UPDATE SKIP LOCKED` is adequate for MVP; a separate queue is optional.

## API conventions

- REST under `/api/v1`; JSON DTOs except multipart file upload.
- UUID internal IDs; timezone-aware UTC timestamps; ISO-8601 serialization.
- Pagination default 25, max 100; scope filter before pagination.
- Correlation ID per request/job; stable error shape; no stack traces/SQL/provider secrets in response.
- Use `401` unauthenticated, `403` unauthorized, optionally scope-safe `404`, `409` invalid state/duplicate transition, `422` schema validation, `429` rate limit.

## Example environment

```dotenv
APP_ENV=development
DATABASE_URL=postgresql+psycopg://app:app@localhost:5432/aicte_validation
JWT_SECRET=replace-with-local-only-secret
DOCUMENT_STORAGE=local
DOCUMENT_STORAGE_ROOT=./var/private-documents
OCR_PROVIDER=tesseract
BHASHINI_ENABLED=false
BHASHINI_API_BASE_URL=
BHASHINI_API_KEY=
SOURCE_CONNECTOR_MODE=mock
COPILOT_ENABLED=true
DEFAULT_UI_LANGUAGE=en
REMINDER_TIMEZONE=Asia/Kolkata
MAX_UPLOAD_BYTES=26214400
```

No credentials belong in `.env.example`. Production-like startup must reject development defaults.

## Error isolation

- OCR fail: keep source, mark processing failed, expose safe retry.
- BHASHINI fail: preserve original text, mark translation unavailable/error, continue local validation.
- Source provider fail: persist status and latency; continue unrelated checks.
- Copilot retrieval fail: explain service/corpus unavailable.
- Graph rendering fail: same evidence chain remains available as a table/list.
- Bulk partial failure: successful items remain successful; retry only failed items.
