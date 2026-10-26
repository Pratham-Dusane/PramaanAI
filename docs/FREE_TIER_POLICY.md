# Free-Only Dependency and Integration Policy

**Policy requirement:** The prototype must be usable end-to-end at ₹0 recurring API/service cost. No agent may add a paid API, paid hosted model, metered SaaS feature, cloud resource or paid dataset dependency unless the project owner explicitly approves the cost in writing and records an ADR. Free trials, welcome credits and temporary grants do **not** count as a reliable free dependency.

## Required defaults

- Document parsing/OCR: local open-source parser and Tesseract where suitable.
- Classification/extraction: rules and free/open-source libraries; pretrained models only when license and resource needs are suitable.
- Storage/database: local development storage and PostgreSQL; no paid cloud required.
- Regulatory rules/corpus: approved publicly accessible source documents, recorded with provenance; no assumption that all content is reusable for every purpose.
- Translation: local UI string catalogs are always available. Call BHASHINI only through a specific service/API that has been verified to be accessible at no cost for this project and intended volume, with permitted data handling. Otherwise disable the live adapter and use clearly labelled mock fixtures/local fallback.
- Copilot: no mandatory paid LLM. Use deterministic retrieval/extractive response mode as the no-key fallback. Any optional hosted LLM is off by default and requires explicit cost/privacy review.
- Issuer verification: mock connector must cover the demo. DigiLocker/NAD/API Setu/Entity Locker are not mandatory runtime dependencies; a public portal does not imply free or authorized API access to all records.

## Provider enablement checklist

Before turning any external provider on, record in `docs/INTEGRATION_CAPABILITY_MATRIX.md`:
1. Exact product/API (not only parent platform name) and endpoint/service name.
2. Eligibility and onboarding requirements for this use case.
3. Whether an API key, approval, consent, allow-list, subscription or production access review is required.
4. Cost and quota basis, including trial expiration and overage behaviour.
5. Supported languages/document types and request limits.
6. Whether institutional/personal text can be sent there, data retention terms and applicable permissions.
7. Timeout, retry, rate-limit and graceful local fallback behaviour.
8. Date verified and responsible agent.

Do not enable it if any item that affects cost, legal permission or sensitive data is unknown. Keep live calls disabled in tests/CI by default.

## No-paid-fallback rule

If a free provider limit is reached, return a typed unavailable/quota outcome, tell the user what did not run, preserve the original input, and continue local validation. Never silently fall back to another paid service, and never label mock output as a successful real translation or source check.
