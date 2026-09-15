#!/usr/bin/env bash
# Deletes Netlify deploy(s) for a branch preview created with `netlify deploy --alias`.
# Matches deploy.branch (raw git branch) and/or deploy URLs (https://{alias}--...).
# Usage: delete-netlify-branch-deploys.sh <site_id> <auth_token> <branch> <alias>
set -euo pipefail

SITE_ID="$1"
TOKEN="$2"
BRANCH="$3"
ALIAS="$4"

mapfile -t deploy_ids < <(
  page=1
  while true; do
    json="$(curl -fsS -H "Authorization: Bearer ${TOKEN}" \
      "https://api.netlify.com/api/v1/sites/${SITE_ID}/deploys?per_page=100&page=${page}")"
    count="$(echo "$json" | jq 'length')"
    echo "$json" | jq --arg a "$ALIAS" --arg b "$BRANCH" -r '
      .[]
      | select(
          ((.branch // "") == $b)
          or (
            [
              (.deploy_ssl_url // ""),
              (.deploy_url // ""),
              (.ssl_url // ""),
              (.url // "")
            ]
            | any(test("^https?://" + $a + "--"))
          )
        )
      | .id
    '
    if [[ "$count" -eq 0 ]]; then
      break
    fi
    if [[ "$count" -lt 100 ]]; then
      break
    fi
    page=$((page + 1))
  done | sort -u
)

if [[ "${#deploy_ids[@]}" -eq 0 ]]; then
  echo "No Netlify deploys matched branch '${BRANCH}' / alias '${ALIAS}' (nothing to delete)."
  exit 0
fi

for id in "${deploy_ids[@]}"; do
  echo "Deleting deploy ${id}"
  curl -fsS -X DELETE -H "Authorization: Bearer ${TOKEN}" \
    "https://api.netlify.com/api/v1/sites/${SITE_ID}/deploys/${id}"
done

echo "Deleted ${#deploy_ids[@]} deploy(s) for alias '${ALIAS}'."
