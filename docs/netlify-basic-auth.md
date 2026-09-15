# Netlify branch deploy password (HTTP Basic Auth)

This repo uses a Netlify **Edge Function** to add a browser password prompt (HTTP Basic Auth) in front of **branch deploys** and **deploy previews**.

## Where the protection lives

- `netlify/edge-functions/basic-auth.ts` — checks the `Authorization` header and blocks requests until the credentials match.
- `netlify.toml` — runs the edge function on `/*` (so it protects HTML **and** static assets).

## Netlify setup (Free plan)

In Netlify go to **Site settings → Environment variables** and set:

- **`BASIC_AUTH_USERNAME`**: the username you’ll type into the browser prompt
- **`BASIC_AUTH_PASSWORD`**: the password you’ll type into the browser prompt
- **`BASIC_AUTH_SCOPE`** (optional):
  - `non_production` (default) — protect only `branch-deploy` + `deploy-preview`
  - `all` — protect production too

### Important: don’t store the password in this repo

Do **not** add the actual password to any markdown file or commit it to git.

- This repo is shared with others (and may be cloned/forked), so committing a password is effectively “publishing” it.
- Use Netlify environment variables instead (that’s what the edge function reads at runtime).

## How it behaves

- If you open a branch deploy URL, the browser should show a username/password prompt before anything loads.
- If `BASIC_AUTH_USERNAME` / `BASIC_AUTH_PASSWORD` are missing, non-production deploys will return **500** (fail closed).
- Requests under `/.netlify/*` are not protected to avoid breaking Netlify internals.

## Rotating the password

To change access, update `BASIC_AUTH_PASSWORD` in Netlify and redeploy (or trigger a new deploy). No code changes needed.

