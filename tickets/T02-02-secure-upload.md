# T02-02: Secure upload, versioning and SHA-256

**Status:** TODO  
**Track:** T02  
**Suggested owner:** unassigned  
**Dependencies:** T00-02, T01-02

## Objective

Implement safe evidence intake and immutable source-file versioning.

## Scope of work

Accept configured PDF/PNG/JPEG only; verify content signature, size/page/pixel ceilings, MIME and parser safety; use random storage key and private storage; SHA-256 server-side; store metadata, uploader, byte length, timestamps, document version and hash algorithm. Gate download through authorization.

## Acceptance criteria

[ ] Valid fixture uploads are stored outside public assets.
[ ] Oversize, wrong-signature, malformed and unsupported files are rejected safely.
[ ] Client filename cannot control storage path.
[ ] Identical bytes produce identical SHA-256; reupload creates version/history.
[ ] No endpoint reveals file to unauthorized user.

## Required tests / evidence

OWASP-style upload tests; path traversal; decompression/page limit; hash unit tests; private download test.

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
