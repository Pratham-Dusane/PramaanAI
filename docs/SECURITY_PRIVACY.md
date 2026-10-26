# Security, Privacy and Human Oversight

## Threat model

Protect against malicious uploads/parser bombs, unauthorized file/application access, institution-ID tampering, role escalation, document substitution, prompt injection in OCR content, credential leakage, bulk-job resource exhaustion, false anomaly allegations, audit tampering, external translation data leakage, ID enumeration, insecure exports and cross-tenant search/graph/copilot leakage.

## Authentication and authorization

- Authenticate all non-public routes. Authorization checks use verified identity + server-side permissions + current institution/case scope.
- Fail closed when permissions/scope are missing. Never trust body-supplied role, institution, reviewer assignment, hash, source status or rule version.
- Test IDOR and background-worker scope. Apply authorization to graph traversal, retrieval, downloads, exports, notifications and bulk jobs.
- A Rule Administrator does not see document content by default; a system admin does not automatically get content access either.

## File and API security

- Verify extension, magic bytes/content, MIME, file size, page/pixel limits, parser timeout, and storage key generation.
- Private storage outside web root, authorization-gated downloads and safe content disposition. Never execute uploads/macros/embedded content.
- Process PDF/image input with resource limits. An optional malware scanner may be added but do not claim scanning occurred if it did not.
- Render OCR as text; never inject it as HTML. Rate limit login, upload, copilot and bulk endpoints.
- Use typed allowlisted update fields, parameterized queries/ORM, safe errors, strict CORS and CSRF protection for cookie auth.

## Secrets, integrations, audit

- Secrets only in environment/secret manager; commit `.env.example` only. Redact PII/provider keys from logs.
- External AI processing is off by default unless explicitly configured and permitted.
- Audit document access/export, role changes, rule publishing, manual overrides, connector calls and final decisions. Keep audit logs access-restricted; never store full provider payloads/raw documents in logs.
- Application-level audit is append-only for normal users. Any integrity chain supplements rather than replaces protected storage and access controls.

## Privacy / minimization

- Use synthetic institution/person data for tests and demo.
- Mask sensitive fields in list views and logs; keep excerpts size-limited and access-restricted.
- Retention/deletion policy is configurable and must be reviewed against the actual deployment's obligations; preserve needed audit metadata.
- Before calling BHASHINI or any provider, check terms and permission for that content. A configuration toggle is not a substitute for consent or legal review.
- Exports are scoped, permission-checked, size-limited, audited and label simulated/live data.

## AI and human oversight

- No automated approval/rejection, legal conclusion, or fraud accusation.
- Scores are not probabilities unless calibrated/validated. Explain contributing signals and uncertainty.
- Use deterministic rules for known requirements; AI assists OCR, extraction, summarization and candidate generation, not final decision-making.
- Human overrides need a reason and create history. Never erase historical findings/decisions to “fix” them.

## Copilot prompt-injection defence

- Retrieved documents/OCR are data, not instructions. Keep them separated from system instructions.
- Retrieve only records accessible to the current user, using a source allowlist and strict context limits.
- No tools for rule publication, official decisions or privilege changes are exposed to the copilot.
- Validate answer schema and citations; never reveal secrets, hidden prompts, other institution data or internal notes.
- Test malicious text embedded inside a source document.

## Audit taxonomy

At minimum: `AUTH_LOGIN_SUCCESS`, `AUTH_LOGIN_FAILURE`, `AUTHORIZATION_DENIED`, `INSTITUTION_CREATED`, `APPLICATION_CREATED`, `APPLICATION_SUBMITTED`, `DOCUMENT_UPLOADED`, `DOCUMENT_DOWNLOADED`, `DOCUMENT_REPROCESSED`, `EXTRACTION_COMPLETED`, `VALIDATION_STARTED`, `VALIDATION_COMPLETED`, `SOURCE_CONNECTOR_CALLED`, `BULK_JOB_CREATED`, `BULK_ITEM_RETRIED`, `FINDING_RESOLVED`, `FINDING_DISMISSED`, `CLARIFICATION_REQUESTED`, `HUMAN_DECISION_RECORDED`, `RULE_DRAFTED`, `RULE_TESTED`, `RULE_PUBLISHED`, `RULE_REPLAYED`, `ROLE_GRANTED`, `ROLE_REVOKED`, `INTEGRATION_CONFIG_CHANGED`, `EXPORT_CREATED`, `NOTIFICATION_ACKNOWLEDGED`.

## Security acceptance tests

- Applicant A cannot access Institution B's application/file by guessing UUID.
- Reviewer assigned case A cannot open case B without explicit scope.
- UI-supplied role/scope/hash/verified status has no effect.
- Timeout/unavailable source never becomes mismatch.
- Client-supplied fingerprint cannot bypass server recomputation.
- Copilot cannot retrieve other tenants' documents.
- Worker/AI principal cannot create `HumanDecision`.
- Path traversal and MIME spoofing are rejected.
- Bulk size and rate limits are enforced.
