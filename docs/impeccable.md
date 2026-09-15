# Impeccable design-quality workflow

Impeccable is a repo-scoped agent skill for deliberate design-quality work. It
provides focused playbooks for critique, technical UI auditing, polish,
hardening, responsive adaptation, performance optimization, copy clarity, and
explicit redesigns.

The installed upstream skill is version `4.3.1`; its launcher targets engine
version `0.1.5`. Source: <https://github.com/pbakaus/impeccable>. The project is
licensed under Apache 2.0.

Impeccable adds no npm dependency and no application runtime code. Its skill,
references, agents, launchers, and detector data live under
`.agents/skills/impeccable`.

## Responsibility boundaries

Use the smallest specialist that matches the work:

| Need | Primary skill |
|---|---|
| Build or restructure a prototype screen | `sage-prototype-ui` |
| Translate copy or format locale-aware values | `sage-localization` |
| Select, audit, or upgrade Sage tokens | `sage-design-tokens` |
| Critique, audit, polish, harden, or optimize UI quality | `impeccable` |
| Maintain comparable component variants | `uifork` |

Skills can be combined when necessary, but their scopes do not replace one
another. In particular, Impeccable does not authorize generic visual-system
changes in a Sage prototype.

## Sage constraints

`AGENTS.md` and the repository reference docs always take precedence. Apply
Impeccable's quality guidance inside the established Sage language:

- use `carbon-react`, never IBM Carbon or another product UI library;
- use the approved Sage tokens rather than hardcoded visual values;
- preserve Sage typography, icons, focus states, loaders, and interaction
  conventions;
- keep full translated messages and locale-aware data formatting;
- prefer Impeccable's `Operate` mode for application screens and dashboards;
- treat “bolder”, “colorize”, “typeset”, and “animate” as refinement within the
  Sage system, not permission to replace it.

## Security and activation

Installing the skill does not run its engine. On first invocation, the launcher
may download a platform-specific, version-pinned binary from the official GitHub
release into the user's local Impeccable cache. The launcher verifies the
download against its published SHA-256 sidecar and refuses an unverifiable
binary. This network and filesystem action requires explicit approval.

The repository intentionally does not install `.codex/hooks.json`. Continuous
post-edit detection, live browser injection, and automatic engine execution are
disabled until the user explicitly requests them.

Ephemeral screenshots, caches, live sessions, and per-developer configuration
are ignored by Git. Shared files such as `.impeccable/config.json`, surface
briefs, Markdown critiques, `PRODUCT.md`, and `DESIGN.md` remain trackable when a
requested workflow creates them.

## Recommended entry points

Use `$impeccable` with a focused target rather than applying every mode:

```text
$impeccable critique the portal dashboard
$impeccable audit the file upload flow
$impeccable harden the subscription selection flow
$impeccable optimize the sales invoice table
$impeccable polish the project calculator
```

Use `$impeccable init` only when the team wants to create durable product context
in `PRODUCT.md`. Use `$impeccable document` only when it wants the incumbent
visual system recorded in `DESIGN.md`. Neither file is required merely to keep
the skill installed.

Hooks and live mode remain explicit choices:

```text
$impeccable hooks status
$impeccable hooks on
$impeccable live
```

Hooks run after UI edits, so enable them only when continuous detector feedback
is worth the extra execution and review noise. Live mode may start a local
browser service and should be activated for a named surface, not as a permanent
project default.
