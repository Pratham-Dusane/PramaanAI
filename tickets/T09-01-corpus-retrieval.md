# T09-01: Approved regulatory corpus and retrieval

**Status:** TODO  
**Track:** T09  
**Suggested owner:** unassigned  
**Dependencies:** T03-01, T01-02

## Objective

Build a small versioned corpus from sources reviewed for demo use, with chunk-level citations.

## Scope of work

Ingest only reviewed public source documents and explicitly synthetic demo rules; capture title, edition/date, publisher, canonical URL, checksum, page/section and review status. Chunk with page anchors; implement hybrid/simple lexical retrieval. Keep corpus source version immutable and filter retrieval by user scope.

## Acceptance criteria

[ ] Every chunk maps to source version and page/section when possible.
[ ] Demo-only sources carry visible labels.
[ ] Retrieval returns source spans, not only document title.
[ ] Ingestion rejects unknown/unapproved source state.
[ ] Retrieval is access filtered and reproducible.

## Required tests / evidence

Chunk-anchor tests; source-version test; retrieval results fixture; scope filter.

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
