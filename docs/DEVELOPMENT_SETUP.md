# Development Setup

This guide is intended to be sufficient for a new coding agent on a clean checkout. Exact pinned versions should be captured in lockfiles by the foundation ticket; this guide describes the expected commands and architecture.

## Prerequisites

- Git, Node.js LTS with npm, Python 3.12, PostgreSQL 16+ (or the documented compatible version), and Tesseract OCR installed locally.
- Optional: Docker/Compose for local PostgreSQL and service dependencies; BHASHINI credentials only for optional live provider tests.
- Do not put real applicant data in local development fixtures.

## Expected repository layout

```text
AGENTS.md PRD.md LOG.md README.md
backend/                 FastAPI application and worker
frontend/                React + TypeScript + Vite
migrations/              Alembic or equivalent schema migrations
docs/ tickets/ schemas/ examples/
scripts/                 seed, reset-demo and evaluation commands
tests/                   shared end-to-end fixtures if appropriate
```

## Environment

Create local ignored environment files from `.env.example`. Required settings should include `APP_ENV`, `DATABASE_URL`, `SECRET_KEY`, `UPLOAD_ROOT`, `MAX_UPLOAD_MB`, `OCR_PROVIDER`, `BHASHINI_ENABLED`, `BHASHINI_API_KEY`, `BHASHINI_API_BASE_URL`, `SOURCE_CONNECTOR_MODE`, `CORS_ORIGINS`, `LOG_LEVEL`, `SESSION_SECRET` and timezone display settings. Choose safe local defaults. Secrets must never be included in tracked example files; use placeholders only.

`APP_ENV=development` and a demo seed flag must be explicit for synthetic fixtures. The application must fail closed if a demo reset or fixture endpoint is invoked outside the approved environment.

## Baseline startup sequence

The exact scripts are owned by T00-01 and must be finalized in root README and here. Target developer experience:

```bash
# Terminal 1: infrastructure
docker compose up -d db

# Terminal 2: backend
cd backend
python -m venv .venv
# macOS/Linux: source .venv/bin/activate
# Windows PowerShell: .venv\\Scripts\\Activate.ps1
python -m pip install -r requirements.txt
alembic upgrade head
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000

# Terminal 3: worker
cd backend
python -m app.workers.run

# Terminal 4: frontend
cd frontend
npm ci
npm run dev
```

These commands are target commands, not a claim that scaffolding exists yet. T00-01 must verify them, commit lockfiles and replace any incorrect placeholder.

## Seed and test

```bash
# Must only run with APP_ENV=development/test and use synthetic data.
python -m app.scripts.seed_demo
pytest
npm run typecheck
npm test
npm run build
```

Actual command names must be kept consistent with `README.md`, CI and the ticket handoff. If a frontend test script is not installed, the foundation agent must add one or document the alternative-never leave a command knowingly broken.

## Integration modes

- `LOCAL`: local OCR/local string catalogs, no external provider calls.
- `MOCK`: deterministic BHASHINI/issuer responses for tests and demo.
- `LIVE`: explicitly enabled and configured provider, only after terms/access/permission review. `LIVE` must never be inferred merely from an API key being present.

Use synthetic data when testing live connector wrappers unless a reviewed test environment explicitly authorizes other data. Use loopback binding by default and never expose the demo backend publicly without appropriate security controls.

## Common troubleshooting

- Database connection fails: inspect container health, `DATABASE_URL`, and port conflicts.
- Migration mismatch: apply migrations from current branch; never fix by deleting a shared or user database.
- Missing Tesseract: local OCR is reported unavailable; do not mark documents successfully OCR-processed.
- BHASHINI key missing or rejected: provider reports `UNAVAILABLE`/`UNAUTHORIZED`; local app remains functional.
- Worker stopped: jobs remain recoverable; restart worker and inspect per-job retry limits.
- Frontend cannot access API: verify CORS allowlist and base URL; do not widen CORS to `*` as a shortcut.
