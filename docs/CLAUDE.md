# Docs authoring rules (Alto)

These rules apply **only when writing or editing content under `docs/`**. Site/theme/component code lives in `src/` and is governed by the repo root, not this file.

When in doubt, open [template.md](template.md) — it is the live style reference and contains a working example of every tag below.

---

## File layout

- Top-level sections are folders: `get-started/`, `motors/`, `drivers/`, `run-maintain/`, `reference/`.
- Each section folder has a `_category_.json` controlling its sidebar label, position, and collapse state. Edit it if a section's title or order needs to change — do **not** add sidebar entries by hand in `sidebars.ts` for these folders.
- One page = one `.md` file inside the right section folder. Filenames are kebab-case (`hall-sensor.md`, not `HallSensor.md`).
- Do not create new top-level sections without asking — the nav and home page are wired to the existing five.

## Frontmatter (required on every page)

```yaml
---
title: Full page title (used as H1 if no `# ...` line)
sidebar_label: Short label for the left nav
sidebar_position: <integer> # ordering within the section
description: One sentence; shows in search results and meta tags.
tags: [lowercase, comma-separated]
---
```

- `sidebar_position` must be unique within a folder. Check sibling files before picking a number.
- `description` is one plain sentence, no marketing fluff, no trailing period optional.
- Use `id:` only if the URL slug must differ from the filename (rare).

## Page structure

1. One `# H1` matching the frontmatter `title` (or omit and let `title` render it — be consistent with siblings in the same section).
2. A one-line intro sentence directly under the H1. No "Welcome to…" openers.
3. `<DocMeta ... />` immediately after the intro (see below).
4. Body uses `##` for major sections, `###` only for sub-steps inside a section. Do not go deeper than `###`.
5. End with a "Next" pointer or related-links list when it helps the reader continue.

## Authoring tags (no import needed — globally registered)

Use these instead of plain markdown when the styled version exists:

- `<DocMeta difficulty="Easy|Medium|Advanced" readTime="N min read" steps="N steps" updated="Month YYYY" />` — place once, right after the intro. `steps` is optional; omit on reference/conceptual pages.
- `<Swatch color="#hex">Label</Swatch>` — use inside tables for any wire-colour or visual-colour cell. Two-tone: `color2="#hex"`.
- `<Plain>...</Plain>` or `<Plain label="Not sure?">...</Plain>` — soft, plain-language aside. Use when a paragraph would otherwise need jargon. Don't overuse: max one or two per page.
- `<C c="palette-or-css">text</C>` and `<C bg="...">text</C>` — inline colour/highlight. Palette names: `accent`, `coral`, `gold`, `green`, `blue`, `amber`, `muted`. Prefer palette names over raw hex for consistency.
- `<Code title="filename.ext">` with `<Line>...</Line>` children — hand-coloured code card. Use when colouring matters (pinouts, mappings). For ordinary code, prefer a fenced ` ``` ` block.

Do **not** import these — they're registered globally via theme `MDXComponents`.

## Callouts

Use Docusaurus admonitions for status notes:

- `:::note` — neutral side remark.
- `:::tip` — shortcut or best practice.
- `:::info` — useful background, not critical.
- `:::caution` — proceed carefully.
- `:::danger[Optional title]` — safety-critical. Use sparingly; reserve for genuine hazard (PE bonding, DC bus, live wiring).

For a softer aside, use `<Plain>` instead of `:::note`.

## Tables

- Inline code chips for terminal/pin names: `` `U` ``, `` `PE` ``, `` `+5V` ``.
- Always use `<Swatch>` for colour cells, never raw colour names in text.
- Keep tables narrow (4 columns max). If you need more, split into two tables under separate `###` headings.

## Voice and tone

- Short, direct sentences. Address the reader as "you".
- Imperatives for steps ("Mount the motor", not "The motor should be mounted").
- No marketing language. No "easily", "simply", "just".
- Indian English spelling is fine (colour, organisation) — match the surrounding page.
- Numbers: use digits for quantities (`6 A`, `24 V`), spell out one through nine only in non-quantitative prose ("two cables", "three options").

## Cross-links

- Use relative paths to other docs: `[Hall sensor](../motors/hall-sensor.md)`.
- Link to a heading with `#kebab-case-anchor`.
- Don't link to the website's marketing pages from inside docs unless the reader genuinely needs them.

## Images and assets

- Place per-page images in `static/img/<section>/<page-slug>/`.
- Reference with `![alt](/img/<section>/<page-slug>/<file>.png)` (leading slash, no `static/`).
- Alt text is required and descriptive — not "image1.png".

## Before declaring a page done

1. Frontmatter has all required fields and a unique `sidebar_position`.
2. `<DocMeta>` is present with at least `difficulty`, `readTime`, `updated`.
3. Every wire-colour or visual-colour reference uses `<Swatch>`.
4. Internal links resolve (no `?` in the dev-server console).
5. Run `npm run build` from the repo root — fix any broken-link or MDX-parse warnings before saying it's done. Tests/typecheck are not enough; the build is the source of truth.

## What not to do

- Don't add a page to `sidebars.ts` manually if it lives in one of the five section folders — `_category_.json` + autogeneration handles it.
- Don't import components in MDX — the global registry already covers `<DocMeta>`, `<Swatch>`, `<Plain>`, `<C>`, `<Color>`, `<Code>`, `<Line>`.
- Don't create a new doc page just to hold one paragraph — fold it into the nearest existing page.
- Don't edit theme components, CSS, or `docusaurus.config.ts` from a docs-authoring session. Those changes belong on a separate branch with their own review.
