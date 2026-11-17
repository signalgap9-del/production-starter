#!/usr/bin/env bash
# Branch protection for main via the GitHub REST API (needs repo admin).
# Usage: scripts/protect-main.sh owner/repo
# Required checks must match job names as they appear on PRs.
set -euo pipefail
REPO="${1:?usage: protect-main.sh owner/repo}"

gh api -X PUT "repos/${REPO}/branches/main/protection" \
  -H "Accept: application/vnd.github+json" \
  --input - <<'JSON'
{
  "required_status_checks": {
    "strict": true,
    "contexts": ["quality", "e2e", "trufflehog", "Analyze (javascript-typescript)"]
  },
  "enforce_admins": true,
  "required_pull_request_reviews": {
    "required_approving_review_count": 1,
    "dismiss_stale_reviews": true,
    "require_code_owner_reviews": true
  },
  "restrictions": null,
  "required_linear_history": true,
  "allow_force_pushes": false,
  "allow_deletions": false,
  "required_conversation_resolution": true
}
JSON
echo "main protected on ${REPO}"
