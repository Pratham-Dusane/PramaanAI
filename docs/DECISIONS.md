# Architecture Decision Records (ADR Index)

This document is the decision log for architectural choices. Changes require an ADR and a `LOG.md` entry. New agents must not unilaterally replace shared decisions for convenience.

## ADR-001: Modular monolith over microservices

**Status:** Accepted. **Context:** Multiple agents need parallel work, yet a hackathon/academic prototype must stay runnable. **Decision:** One backend deployable with well-defined Python module/provider/worker boundaries and one frontend. **Consequences:** simpler setup; use contracts and internal modules to preserve boundaries. Revisit only with measured scale/deployment need.

## ADR-002: PostgreSQL as canonical store; graph as relational edges

**Status:** Accepted. **Decision:** Store domain entities and graph nodes/edges in relational tables with indexes and traversal limits. **Reason:** evidence graph is moderate and explainability/queryability matter more than introducing a graph database operational burden. **Consequence:** graph API encapsulates storage so a future graph database can be considered without changing clients.

## ADR-003: Object bytes in private storage; metadata in database

**Status:** Accepted. **Decision:** Keep uploads outside public web roots; save random object keys plus metadata, fingerprints, versions and access scope in database. **Consequence:** document reads always go through server authorization. Local filesystem adapter allowed only for development/demo.

## ADR-004: Deterministic rules separate from AI extraction/copilot

**Status:** Accepted. **Decision:** Extraction/candidate discovery may use OCR/models, but compliance rule results are produced by versioned deterministic predicates. Copilot summarizes retrieved approved sources; it cannot invent or publish rules. **Consequence:** easier replay, evaluation and audit.

## ADR-005: Human decision is a separate protected action

**Status:** Accepted. **Decision:** Worker/model/rules have no permission to write an official outcome. A human decision requires `decision.record`, explicit outcome, reason and audit event. **Consequence:** backend enforces the state machine and RBAC at service level.

## ADR-006: Provider adapters and truthful status semantics

**Status:** Accepted. **Decision:** BHASHINI and issuer verification are typed adapters; tests use deterministic mocks; live mode requires explicit opt-in, credentials, policy review and successful service health. **Consequence:** provider failure never blocks core deterministic rules; user sees `UNAVAILABLE`, `UNAUTHORIZED`, `TIMEOUT` or `ERROR`.

## ADR-007: Source citations and demo rule labeling

**Status:** Accepted. **Decision:** Every rule carries source metadata. Unverified or fictional criteria are marked `DEMO_ONLY`/`NEEDS_REVIEW`; never imply an official clause without source verification. **Consequence:** mock demonstrations are honest and cannot be confused with regulatory guidance.

## ADR-008: Immutable evidence, findings and historical runs

**Status:** Accepted. **Decision:** Reuploads and corrections create new versions; published rule versions and validation runs remain immutable; review resolutions are separate append-only events. **Consequence:** comparison/replay and audit evidence remain reproducible.

## ADR-009: Accessibility fallback for graph visuals

**Status:** Accepted. **Decision:** Any graphical evidence graph must have a complete keyboard-operable textual/table alternative. **Consequence:** no functionality depends on color, drag-only interaction or graph layout.

## Change template

For any new decision, append:

```text
## ADR-NNN: Short title
Status: Proposed | Accepted | Superseded | Rejected
Context:
Options considered:
Decision:
Consequences / risks:
Owner and date:
Tests/docs affected:
```
