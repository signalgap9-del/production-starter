# AGENTS.md

Rules for coding agents working in this repo. Fill in the bracketed parts.

## Commands
```bash
npm ci               # install (lockfile exact)
npm run lint
npm run typecheck
npm test             # unit + integration
npx playwright test  # e2e (boots the app unless E2E_BASE_URL is set)
npm run build
```

## Workflow
- Never commit to `main`. One task = one branch = one PR. Branches live days, not weeks.
- Commits follow Conventional Commits (`feat:`, `fix:`, `chore:` ...). release-please reads them.
- Non-trivial work starts from `intent/<slug>.md` (why/what), then a spec, then code.
- Structural decisions get an ADR in `docs/adr/` in the same PR.
- A change is done when CI is green AND the user-visible path is verified (e2e or manual, stated in the PR).

## Hard rules
- No secrets in code, logs, fixtures, or prompts. Use the secret manager.
- Do not disable lint rules, skip tests, or add type suppressions to make CI pass. Fix the cause.
- Errors on user-facing or money paths fail loudly (log + alert). No silent catch.
- Destructive actions (data deletion, force-push, prod deploy, customer messages) need explicit human approval.

## Architecture map
[package/dir → responsibility]

## Domain glossary
[terms that mean something specific here]
