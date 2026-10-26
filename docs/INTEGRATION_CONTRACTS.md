# Integration Contracts

## 1. Provider design

Modules never call government/provider URLs directly. Use typed adapters. Credentials remain backend-only. Each provider returns status, latency, provider/version metadata and a safe failure reason.

## 2. Source verification statuses

| Status | Meaning | Live verification? |
|---|---|---:|
| `VERIFIED_MATCH` | Authorized provider returned a verifiable matching record | Yes |
| `VERIFIED_MISMATCH` | Authorized provider returned a record with a material field conflict under a declared comparison rule | Yes; not a fraud verdict |
| `NOT_FOUND` | Provider was reachable and a valid query returned no record | A provider result; not proof of fraud |
| `NOT_SUPPORTED` | Provider lacks this record type/capability | No |
| `UNAVAILABLE` | Disabled/unreachable/maintenance | No |
| `UNAUTHORIZED` | Credentials/permissions insufficient | No |
| `TIMEOUT` | Provider exceeded time budget | No |
| `ERROR` | Unexpected provider/response error | No |
| `SIMULATED_MATCH` | Test fixture returned expected match | **No** |
| `SIMULATED_MISMATCH` | Test fixture returned mismatch | **No** |

A certificate looking plausible is not a source verification. A mock may never return `VERIFIED_*`.

## 3. Connector interface sketch

```python
from dataclasses import dataclass
from datetime import datetime
from enum import StrEnum
from typing import Any, Mapping, Protocol

class VerificationStatus(StrEnum):
    VERIFIED_MATCH = "VERIFIED_MATCH"
    VERIFIED_MISMATCH = "VERIFIED_MISMATCH"
    NOT_FOUND = "NOT_FOUND"
    NOT_SUPPORTED = "NOT_SUPPORTED"
    UNAVAILABLE = "UNAVAILABLE"
    UNAUTHORIZED = "UNAUTHORIZED"
    TIMEOUT = "TIMEOUT"
    ERROR = "ERROR"
    SIMULATED_MATCH = "SIMULATED_MATCH"
    SIMULATED_MISMATCH = "SIMULATED_MISMATCH"

@dataclass(frozen=True)
class VerificationRequest:
    record_type: str
    lookup_key: str | None
    expected_fields: Mapping[str, Any]
    institution_id: str
    consent_reference: str | None = None

@dataclass(frozen=True)
class VerificationResult:
    connector_key: str
    status: VerificationStatus
    checked_at: datetime
    simulated: bool
    source_reference: str | None
    matched_fields: Mapping[str, bool]
    safe_message: str
    latency_ms: int
    response_fingerprint: str | None = None

class SourceVerificationConnector(Protocol):
    connector_key: str
    async def verify(self, request: VerificationRequest) -> VerificationResult: ...
```

The exact typing can be adapted to chosen Python version. Do not log lookup keys or raw provider payload if it contains sensitive identifiers.

## 4. BHASHINI adapter

Required internal method: `translate_text(text, source_language, target_language, purpose, consent_allowed) -> TranslationResult`. If BHASHINI OCR is used, store its output/provider metadata separately from local OCR. Backend-to-provider calls only; never expose API keys to browser JavaScript or logs. Respect current API schema, auth, quotas, rate limits, allowed languages, terms and content limits. The project is free-only by default: do not enable an API that requires paid credits/subscription for this use unless the project owner explicitly approves; use the local/mocked fallback instead.

Translation statuses: `TRANSLATED`, `MOCK_TRANSLATED`, `UNCHANGED_SAME_LANGUAGE`, `UNAVAILABLE`, `UNAUTHORIZED`, `UNSUPPORTED_LANGUAGE_PAIR`, `ERROR`, `NOT_ALLOWED_BY_POLICY`.

Fallback:
1. If external processing is not permitted, do not call the provider.
2. If configured, authorized and permitted, make a bounded request with timeout/retry.
3. If unavailable, preserve original text and use local UI string catalogs. Never fabricate a translated document. Test translations are `MOCK_TRANSLATED`.

Use env vars such as `BHASHINI_ENABLED`, `BHASHINI_API_BASE_URL`, `BHASHINI_API_KEY`, allowed language pairs and service settings. Do not invent endpoints. Confirm service API and access terms during implementation.

## 5. AICTE regulatory corpus

Initially import reviewed official documents manually with URL, retrieval date, edition, hash, effective window and review status. Do not use web search snippets as sole authority. Retain old editions when superseded; link rules to immutable document versions and prompt re-review of mapped rules when a source changes.

## 6. DigiLocker / NAD / Entity Locker / API Setu

These are optional future adapters. Record availability, permission, consent and access arrangements must be confirmed individually. The demo uses a mock connector and reports `SIMULATED_*`. Do not put keys in fixtures/screenshots or claim live integration absent credentials/authorization.

## 7. Connector health

Safe health values: `CONFIGURED_HEALTHY`, `CONFIGURED_DEGRADED`, `NOT_CONFIGURED`, `DISABLED`. Never return secrets or token-bearing URLs. Record failure count and last success. Use bounded retries/circuit breaking. A provider failure cannot block local validation or access to saved records.
