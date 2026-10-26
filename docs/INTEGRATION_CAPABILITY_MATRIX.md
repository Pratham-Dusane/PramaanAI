# Integration Capability Matrix

This matrix is a project planning baseline, not evidence of credentials or current entitlements. The agent who implements an adapter must verify exact terms and update the status/date before enabling live calls.

| Platform/service | Direct project use | Free-only implementation rule | Live status for initial prototype |
|---|---|---|---|
| Local parser + Tesseract | PDF text and scanned-page OCR | Use locally; no API bill. Report unavailable if executable is missing. | Implement locally |
| BHASHINI language services | Translate eligible extracted text; optionally OCR if service fits | Do **not** assume every BHASHINI-branded API is unlimited/free. Confirm exact endpoint, onboarding, quotas, cost and terms. If no-cost quota/terms cannot be confirmed, leave live calls disabled and use local UI translations/mock adapter. | Adapter + mock; live conditional |
| AICTE public handbook/rule sources | Seed cited source versions and build rule mapping | Public access does not eliminate need to verify current edition/amendments, clause applicability and reuse conditions. | Manual reviewed ingestion |
| DigiLocker | Verify a supported digitally issued document where requester access and issuer records permit | Partner onboarding/authorization and record coverage required; never depend on it for the demo. | Optional adapter contract/mock only |
| NAD | Check an academic award only if the source participates and permitted verification path exists | Do not infer universal degree coverage or an open public verification API. | Optional future adapter/mock only |
| API Setu | Discover applicable public APIs and their published access methods | Listing an API is not permission to call it; access terms/credentials may apply. | No mandatory dependency |
| Entity Locker | Organization record exchange if a participating issuer/holder supports it | Do not assume institution records relevant to this project are present or freely queryable. | Future adapter only |
| AIKosh | Find potential public datasets/models for experiments | Check resource-specific license, provenance, intended use and access requirements. It is not a live authoritative institution registry. | Optional research-time use, not runtime dependency |

## Required connector status semantics

Every integration screen and exported finding must label result provenance as one of: `LIVE_AUTHORIZED`, `SIMULATED`, `LOCAL_ONLY`, `UNAVAILABLE`, `UNAUTHORIZED`, `UNSUPPORTED`, or `ERROR`. For source verification, use the precise status enums in `docs/INTEGRATION_CONTRACTS.md`. UI color is not the sole indicator; show text, provider, timestamp and limitations.

## References to verify during implementation

- BHASHINI portal and service entry point: https://bhashini.gov.in/en/ and https://bhashini.gov.in/ . Confirm organization onboarding/API terms for the exact selected service.
- BHASHINI REST schema example: https://tts.bhashini.ai/openapi/ui/ ; service pricing/credits overview: https://www.bhashini.ai/pricing . A visible API schema does not prove that the required usage is free or authorized; check current terms for the exact service/product.
- AICTE handbook starting reference (2024–25 to 2026–27): https://aicte-qa.aicte-india.org/sites/default/files/APH%20Final.pdf . Verify the applicable handbook/amendments for the application period; do not freeze the platform to this one edition.
- DigiLocker partner portal: https://api.apisetu.gov.in/ .
- National Academic Depository: https://www.nad.gov.in/ .
- Entity Locker: https://entity.digilocker.gov.in/ .
- AIKosh: https://aikosh.indiaai.gov.in/ .
