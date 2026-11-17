---
status: accepted
date: 2026-11-02
---

# ADR-0001: Record architecture decisions

## Context
Decisions made in chat, PR comments, or someone's head get lost. Agents and new
teammates then re-litigate them or silently break them.

## Decision
Every decision that changes structure, a public interface, a data model, or a
dependency gets an ADR in `docs/adr/NNNN-title.md` from `0000-template.md`,
merged in the same PR as the change. ADRs are never edited after acceptance;
a new ADR supersedes an old one.

## Alternatives considered
- Wiki pages: drift from the code, not reviewed with the change.
- PR descriptions only: unsearchable after merge.

## Consequences
Small writing cost per decision. Reviewers can reject a PR whose decision is
undocumented. Agents read `docs/adr/` before changing the areas they cover.
