# Release Checklist

Release means a reproducible prototype build, not authorization for real regulatory use.

## Repository and reproducibility

- [ ] Clean checkout follows `docs/DEVELOPMENT_SETUP.md`; all dependency files are pinned/locked.
- [ ] Database migrations work from empty DB.
- [ ] Demo seed/reset refuse unsafe environments and contain synthetic records only.
- [ ] All root and docs links resolve; API contract and generated OpenAPI match.
- [ ] No private credentials, real institution records, raw documents or personal data in tracked files.

## Base problem statement

- [ ] Application upload -> OCR/extraction -> checklist/rules -> evidence-backed finding -> review -> authorized human decision works.
- [ ] Missing evidence, contradictory evidence and source unavailability are distinct states.
- [ ] Every material finding cites source document/field and rule version, or explains missing evidence.
- [ ] Rule packs are category/year scoped, versioned and replayable.
- [ ] No automated approval/rejection endpoint or model/worker credential exists.

## Requested feature slices

- [ ] Digital twin and cross-year differences carry provenance.
- [ ] Evidence graph includes accessible table/list fallback.
- [ ] Copilot cites approved corpus and abstains when unsupported.
- [ ] Infrastructure signals are observational and inspector-led.
- [ ] Fingerprinting and duplicates never imply document authenticity/fraud.
- [ ] Deadlines are idempotent; bulk jobs isolate failures and support retry.
- [ ] BHASHINI is off/conditional until free use, API access and data-sharing are verified.
- [ ] Cross-institution relationship summaries obey authorization and use non-accusatory wording.
- [ ] Next application requires confirmation and blocks unsafe carry-forward.

## Privacy, security and accessibility

- [ ] Cross-tenant regression suite passes across APIs, jobs, copilot, graph, notifications and exports.
- [ ] Upload limits, file signatures, private storage and safe downloads are tested.
- [ ] Prompt injection tests pass; AI is read-only with respect to decisions and published rules.
- [ ] Logs are redacted; audit is append-only to application roles.
- [ ] Keyboard-only flow, focus, labels, form errors, zoom/reflow and non-visual graph alternative reviewed.

## Evaluation and demo honesty

- [ ] Report includes counts, metrics, false positives/negatives, timing methodology and limitations.
- [ ] Demo visually labels synthetic data, demo-only rules and simulated connectors.
- [ ] BHASHINI/issuer live status is documented accurately; no screenshot implies unperformed verification.
- [ ] Known limitations, unimplemented/partial features and accepted issues are listed.
- [ ] `LOG.md`, ticket statuses, `TRACEABILITY.md` and README match delivered state.
