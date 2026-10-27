# API Contracts - v1 Baseline

Shared frontend/backend boundary. Implement under `/api/v1`. Generate TypeScript types from OpenAPI where possible. If route names evolve, update this document before a second track consumes changed semantics.

## 1. Standard shapes

List response:
```json
{"items": [], "next_cursor": null, "total_estimate": 0}
```

Error response:
```json
{"error":{"code":"VALIDATION_ERROR","message":"The request contains invalid fields.","correlation_id":"uuid","details":[{"field":"academic_year","reason":"unsupported_format"}]}}
```
No raw stack traces, SQL, provider credentials or document content in error responses.

## 2. Primary endpoints

| Method | Path | Purpose | Minimum permission |
|---|---|---|---|
| GET | `/health/live` | Liveness | deployment perimeter |
| GET | `/health/ready` | DB/storage readiness summary | ops probe/admin |
| POST | `/auth/login` | Local/demo login if enabled | public + rate limit |
| POST | `/auth/logout` | Invalidate session | authenticated |
| GET | `/me` | Current user/scopes/permissions | authenticated |
| GET/POST | `/institutions` | List/create scoped institutions | explicit permission |
| GET/PATCH | `/institutions/{id}` | Institution detail/profile | institution scope |
| GET | `/institutions/{id}/digital-twin` | Current/history snapshot | scoped permission |
| POST | `/applications` | Create draft | `application.submit_own` or reviewer create |
| GET | `/applications` | Scoped list | `application.list_scoped` |
| GET/PATCH | `/applications/{id}` | Read/update draft | `application.read` / `application.update_own` |
| POST | `/applications/{id}/submit` | Create immutable submitted version | `application.submit_own` |
| POST | `/applications/{id}/documents` | Upload | `document.upload` + scope |
| GET | `/applications/{id}/documents` | List document versions/states | `document.read` + scope |
| GET | `/documents/{version_id}/download` | Authorized download | `document.download` + scope |
| POST | `/documents/{id}/reprocess` | Queue extraction | `document.reprocess` |
| GET | `/jobs/{id}` | Job progress | resource scope |
| POST | `/applications/{id}/validate` | Queue validation | `validation.run` |
| GET | `/applications/{id}/validation-runs` | List validation runs | `application.read` |
| GET | `/applications/{id}/findings` | Findings | `finding.read` |
| GET | `/findings/{id}` | Finding/evidence chain | `finding.read` |
| POST | `/findings/{id}/review-actions` | Resolve/dismiss/escalate/request clarification | `finding.resolve` |
| POST | `/applications/{id}/decisions` | Human decision | `decision.record` |
| GET/POST | `/rules/packs` | List/create draft pack | `rule.read` / `rule.draft` |
| POST | `/rules/packs/{id}/validate` | Schema/fixture tests | `rule.test` |
| POST | `/rules/packs/{id}/publish` | Publish immutable pack | `rule.publish` (+ second review if configured) |
| POST | `/rules/packs/{id}/replay` | Non-destructive replay | `rule.replay` |
| POST | `/copilot/ask` | Grounded question/citations | `copilot.use` + retrieval scope |
| GET | `/notifications` | Current user's alerts | `notification.read_own` |
| POST | `/notifications/{id}/acknowledge` | Ack/snooze | `notification.manage_own` |
| POST | `/bulk-jobs` | Enqueue batch | `bulk.process` |
| GET | `/bulk-jobs/{id}` | Batch progress | scoped job permission |
| POST | `/bulk-jobs/{id}/retry-failed` | Retry failed items | `bulk.process` |
| GET | `/audit-events` | Scoped audit history | `audit.read` |
| GET/PATCH | `/admin/users` | Manage roles/scopes | `user.manage` |
| GET/PATCH | `/admin/integrations` | Provider state/config (no secret return) | `integration.configure` |

## 3. Canonical DTO examples

### Application summary
```json
{
  "id":"8d7c4d2f-0e5f-44fb-8a74-99139d86b7f2",
  "institution_id":"6aa7c7a4-a3b3-4fd0-8ca9-1df00df285c2",
  "application_type":"EXTENSION_OF_APPROVAL",
  "application_category":"DEMO_CATEGORY_A",
  "academic_year":"2026-27",
  "status":"READY_FOR_REVIEW",
  "required_documents":{"total":8,"present":7,"missing":1},
  "open_findings":{"high":1,"medium":2,"low":0},
  "deadline_at":null,
  "assigned_reviewer_id":null,
  "created_at":"2026-10-26T12:00:00Z",
  "updated_at":"2026-10-26T12:10:00Z"
}
```

### Finding
```json
{
  "id":"a40fc5b3-9d69-4d8b-a4f4-f53c97fc3183",
  "finding_key":"FACULTY_COUNT_MISMATCH",
  "status":"OPEN",
  "severity":"MEDIUM",
  "result":"REVIEW",
  "title":"Faculty count differs across submitted records",
  "what_observed":"The form declares 42 faculty members; the uploaded roster contains 39 parsed unique entries.",
  "why_it_matters":"The declared count cannot be reconciled with the evidence currently indexed.",
  "uncertainty_note":"OCR may have missed rows or the roster may use a different counting convention.",
  "recommended_next_step":"Review the cited roster pages and confirm the counting rule.",
  "rule":{"rule_key":"FACULTY_COUNT_CONSISTENCY","version":2,"source_label":"Demo rule pack","source_clause":"DEMO_ONLY"},
  "evidence":[
    {"kind":"EXTRACTED_FIELD","label":"Declared faculty count","document_id":"...","page_number":2,"value_display":"42"},
    {"kind":"EXTRACTED_FIELD","label":"Unique parsed roster entries","document_id":"...","page_number":1,"value_display":"39"}
  ],
  "created_at":"2026-10-26T12:20:00Z"
}
```
Numbers and rule names above are synthetic, not official requirements.

### Source connector response
```json
{"connector_key":"academic_record_demo","status":"UNAVAILABLE","simulated":false,"checked_at":"2026-10-26T12:21:00Z","source_reference":null,"safe_message":"The verification provider is not configured.","latency_ms":0,"response_fingerprint":null}
```
The frontend cannot submit a trusted `VERIFIED_MATCH`; only the connector service can create verification records.

## 4. Job states

`QUEUED` → `RUNNING` → `SUCCEEDED` | `PARTIAL_FAILURE` | `FAILED` | `CANCELLED`. Document jobs may use `RETRY_WAIT`. Bulk jobs include per-item state. Repeated request with the same valid idempotency key returns the same job/result state.

## 5. Authorization contract

- Identity/scopes are derived from verified session/token; ignore role/institution IDs in request bodies for authz.
- Apply tenant filter before database fetch, search and pagination.
- `GET /me` exposes only current user's effective scope/permissions.
- Human decision requires permission, valid transition, non-empty reason and selected evidence references.

## 6. Copilot response

```json
{
  "answer":"The indexed source lists these requirements for the selected category and year...",
  "status":"ANSWERED_WITH_CITATIONS",
  "citations":[{"source_document_id":"...","source_title":"Approval Process Handbook (configured edition)","source_version":"...","section":"...","page":12,"excerpt":"...","retrieval_id":"..."}],
  "limitations":["Based on the configured corpus; confirm the currently applicable edition."],
  "used_rule_pack_id":"..."
}
```

Statuses: `ANSWERED_WITH_CITATIONS`, `INSUFFICIENT_SOURCE_SUPPORT`, `CORPUS_UNAVAILABLE`, `ACCESS_DENIED`, `ERROR`. If source support is absent, citations must be empty and the answer must clearly abstain.

## 7. Pagination and search

Default page size 25, max 100 unless a route uses a smaller limit. Stable ordering is `(created_at DESC, id DESC)` unless documented otherwise. All search indexes and counts must be access-scoped; never build unscoped cross-tenant document search.
