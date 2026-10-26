# T02-03: OCR, classification and field extraction

**Status:** TODO  
**Track:** T02  
**Suggested owner:** unassigned  
**Dependencies:** T02-01, T02-02, T00-02

## Objective

Produce page-aware document text and typed field candidates, with confidence and source provenance.

## Scope of work

Implement extraction interfaces for native PDF text and local OCR (Tesseract or supported parser); classify configured demo doc types; extract selected structured fields; record original language, page, coordinates if available, engine/version, confidence, errors and run ID. Low confidence remains candidate, not verified fact. Allow reviewed correction as a separate value.

## Acceptance criteria

[ ] Pipeline works without external credentials.
[ ] Extracted fields retain document version/page anchors.
[ ] Low-confidence/failed OCR states are visible and not converted to empty success.
[ ] Reprocessing is idempotent by document/pipeline version.
[ ] Manual correction preserves raw extraction and actor audit.

## Required tests / evidence

Text PDF + scanned PDF fixtures; rotated/poor scan; field confidence; reprocess idempotency.

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
