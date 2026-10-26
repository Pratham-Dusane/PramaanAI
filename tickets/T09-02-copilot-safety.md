# T09-02: Cited answers, abstention and injection safety

**Status:** TODO  
**Track:** T09  
**Suggested owner:** unassigned  
**Dependencies:** T09-01, T01-02, T03-01

## Objective

Answer regulatory questions from retrieved approved content, cite each material claim and abstain when evidence is insufficient.

## Scope of work

Implement copilot API, retrieval-grounded prompt, structured response with answer/citations/limitations/confidence/abstention reason; treat uploads and retrieved text as untrusted data; reject tool instructions embedded in documents; keep actions read-only; no rule/decision mutation tools.

## Acceptance criteria

[ ] Each substantive answer includes valid source/page/section citations.
[ ] Unsupported query yields explicit abstention.
[ ] Citation IDs resolve to authorized source snippets.
[ ] Prompt injection in corpus/upload cannot invoke unauthorized tools or leak data.
[ ] Copilot cannot publish rules or record decisions.

## Required tests / evidence

Citation correctness; unsupported query; injection; tenant leakage; malformed model output tests.

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
