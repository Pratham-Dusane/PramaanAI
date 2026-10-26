# T08-02: BHASHINI adapter and graceful fallback

**Status:** TODO  
**Track:** T08  
**Suggested owner:** unassigned  
**Dependencies:** T00-02, T08-01

## Objective

Integrate BHASHINI behind a backend provider interface while keeping default demo fully free/local and credentialless.

## Scope of work

Implement `TranslationProvider` request/result types; configurable base URL and credentials through server environment only; status mapping; timeout/retry/rate limits; original and translated text as separate records; provider/target language/version/timestamp; mock provider. Live requests disabled by default until terms, access and data-sharing review.

## Acceptance criteria

[ ] No API key in frontend or logs.
[ ] Mock tests cover success, timeout, unsupported language, unauthorized and provider error.
[ ] No credentials means UI remains functional and reports unavailable.
[ ] Source language/original text remains unchanged.
[ ] Mock output is labelled simulated; external data sharing needs explicit opt-in/config.

## Required tests / evidence

Provider contract suite; secret scanning; failure fallback; original/translated provenance test.

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
