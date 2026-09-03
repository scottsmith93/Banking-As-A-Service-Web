#!/usr/bin/env bash
# Normalizes a git branch name to the same string used by `netlify deploy --alias=...`
# in .github/workflows/branch-preview.yml. Keep this logic in sync with that workflow.
set -euo pipefail
echo -n "$1" | sed 's/[^a-zA-Z0-9]/-/g' | tr '[:upper:]' '[:lower:]'
