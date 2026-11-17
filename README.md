# production-starter

<p>
  <a href="LICENSE"><img alt="License: MIT" src="https://img.shields.io/badge/license-MIT-blue" /></a>
</p>

Drop-in repository scaffolding for a production service on GitHub — supply-chain hardened CI/CD, SLSA build provenance, OpenSSF Scorecard, CodeQL, TruffleHog secret scanning, Playwright smoke E2E, agent guardrails, and ADR/intent workflows. Assembled from official upstream sources, not invented:

| File | Upstream |
|---|---|
| `workflows/ci.yml` | `actions/starter-workflows` ci/node.js.yml, hardened |
| `workflows/codeql.yml` | `actions/starter-workflows` code-scanning/codeql.yml |
| `workflows/dependency-review.yml` | `actions/starter-workflows` code-scanning/dependency-review.yml |
| `workflows/scorecard.yml` | `actions/starter-workflows` code-scanning/scorecard.yml (OpenSSF) |
| `workflows/e2e.yml` + `playwright.config.ts` | Playwright's generated CI workflow + playwright.dev/docs/ci |
| `workflows/secret-scan.yml` | `trufflesecurity/trufflehog` action |
| `workflows/release-please.yml` | `googleapis/release-please-action` |
| `.github/dependabot.yml` | GitHub Dependabot (with 7-day cooldown) |
| `workflows/deploy.yml` | Build once → SLSA provenance (`actions/attest-build-provenance`) → staging → required-reviewer production gate → canary → auto-rollback. Deploy commands are `TODO` (stack-specific) |
| `.devin/config.json` | Agent permissions: force-push/hard-reset denied; push, merge, release, workflow edits, `.env` writes require approval |
| `intent/`, `docs/adr/` | Anthropic AI-native SDLC playbook (intent.md) + Nygard ADRs |

Hardening applied everywhere: every action pinned to a full commit SHA of a
release at least 7 days old, least-privilege `permissions:`, `persist-credentials: false`,
concurrency cancel, job timeouts. Dependabot keeps the pins fresh.

## Pipeline

```
PR opened
 ├─ CI: lint → typecheck → test → build → npm audit
 ├─ E2E: Playwright against local boot or E2E_BASE_URL preview
 ├─ CodeQL (JS/TS + Actions)
 ├─ Dependency review (blocks new high-severity deps)
 └─ Secret scan (TruffleHog)
      │  branch protection: all green + 1 code-owner review + conversations resolved
      ▼
merge to main ─→ release-please opens/updates release PR (version + CHANGELOG)
      ▼
merge release PR ─→ tag + GitHub release ─→ [add deploy job on release_created]
```

## Adopt in a repo

1. Copy everything except this README into the repo root.
2. Make `package.json` expose `lint`, `typecheck`, `test`, `build`, `start` (missing ones are skipped).
3. `npm i -D @playwright/test` and replace `e2e/smoke.spec.ts` with the real first screen.
4. Edit `.github/CODEOWNERS` and the `AGENTS.md` brackets.
5. Private repo: keep `publish_results: false` in scorecard.yml. Non-Node stack: swap ci.yml steps and the CodeQL language matrix.
6. After the first PR run, protect main: `scripts/protect-main.sh owner/repo`.
   Required check names must match what the PR shows.

## Operating the service

`docs/ops-references.md` lists public operating standards to follow (GDS Way,
GOV.UK and MoJ platform repos): alerting rules, incident workflow, support lines,
reference monitoring stack.

## Not included (stack-specific; add per company)

- The real commands inside `deploy.yml` (wrangler-action / AWS / k8s / Vercel) and preview-per-PR.
- GitHub Environments `staging` and `production` must be created in repo settings; set required reviewers + "prevent self-review" on production.
- Integration test services (Postgres etc. via `services:`).
- Error tracking + canary monitors (Sentry etc.).

## Author & License

Maintained by **Yunseop Im** ([signalgap9-del.github.io](https://signalgap9-del.github.io) · [GitHub](https://github.com/signalgap9-del)). MIT License — see [`LICENSE`](LICENSE).
