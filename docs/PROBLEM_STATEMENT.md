# Base Problem Statement and Traceability

## Context

AICTE approval-related applications, including Extension of Approval and other changes, require officers to inspect applications, supporting documents, institutional records and applicable requirements. Manual review and cross-checking can be slow and inconsistent when records are incomplete, stale or contradictory.

## Core statement, paraphrased from project context

Build a secure integrated AI-enabled decision-support system that validates applications and evidence by classifying and extracting document content; checking fields against configurable regulatory rules and authorized records; detecting anomalies or possible manipulation; verifying documents with issuing authorities where supported; assisting with infrastructure evidence; and showing findings, alerts and audit trails in a reviewer dashboard. Evaluate using synthetic/anonymized data and meaningful extraction, validation, anomaly, source-verification and time metrics. Final approval/adverse decisions and inspections remain with competent AICTE officials.

This is a structured paraphrase for implementation traceability, not an official verbatim reproduction. Attach the original challenge statement if it is supplied separately.

## Requirements mapping

| Base requirement | Required implementation | Acceptance evidence | Tickets |
|---|---|---|---|
| Secure intake | Institution/application models, scope checks, upload validation | Unauthorized and unsafe-file tests | T01, T02 |
| OCR/classification/extraction | Local parsing + Tesseract, classifier interface, provenance | Fields with source page/confidence on synthetic bundle | T02 |
| Checklists/rules | Versioned declarative rules + executor | Deterministic rule regression suite | T03 |
| Cross-document consistency | Normalization and declared field comparisons | Mismatch finding cites both sources | T03, T04 |
| Anomalies/manipulation cues | Fingerprint, image/text similarity, cross-year changes | Seeded flags with caveats; no fraud claims | T05, T06, T07 |
| Issuer/source verification | Connector interface and truthful statuses | Mock/live/unavailable distinction tests | T02, T08 |
| Infrastructure evidence | Metadata/similarity signals, inspector notes | Duplicate/inconsistent fixture produces review signal | T07 |
| Dashboard | Queue, details, findings, evidence, human actions | End-to-end reviewer journey | T11 |
| Alerts/audit | Audit trail and deadline/expiry worker | Events and idempotent reminders | T01, T10 |
| Evaluation | Synthetic labelled fixtures and metric report | Reproducible evaluation output | T12 |
| Human decision | Permission-protected state transition | Automated jobs cannot approve/reject | T01, T12 |

## Additive features

Digital twin; evidence graph and explainable findings; cross-year change/anomaly intelligence; regulatory copilot; infrastructure evidence checker; document fingerprinting; rule versioning/replay; deadline/expiry alerts; bulk processing; BHASHINI multilingual support; duplicate application detection; RBAC; accessibility; cross-institution relationship intelligence; next-application assistance.

## Regulatory-source discipline

Rules must cite the exact source document/version, section/clause/page when known, effective period and applicability. The AICTE Approval Process Handbook 2024–2027 is only a starting reference; verify amendments and applicability for the target year/category. Clearly mark illustrative rules `DEMO_ONLY`. Never invent a numeric requirement or present generated text as authoritative regulation.
