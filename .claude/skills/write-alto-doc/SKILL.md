---
name: write-alto-doc
description: >-
  Write, draft, add, or reformat a documentation page/article for the Alto Motors
  Docusaurus docs site so it comes out correctly formatted with the site's custom
  MDX components (DocMeta, Swatch, Plain, C, Code/Line), required frontmatter,
  admonitions, and house voice. Use this WHENEVER the user asks to write/draft/add
  a docs page, article, guide, how-to, or reference for this site — e.g. "write a
  page on wiring the AL86", "draft a troubleshooting article for fault F12", "turn
  these notes into a docs page", "add a glossary entry" — even if they don't say
  "Docusaurus" or name any component. Also use when editing an existing docs page,
  so its styling and conventions stay consistent. Do not use for site/theme/CSS
  code under src/, or for non-docs marketing copy.
---

# Writing an Alto Motors docs page

Your job is to produce a `docs/**/*.md` page that reads like it was written by the
same hand as every other page on the site: same frontmatter, same structure, same
custom components, same plain, no-nonsense voice. A page that looks "off" is worse
than no page — consistency is the whole point of a docs site.

## Always start here — read the living spec

Two files in this repo are the source of truth and may have changed since this
skill was written. **Read both before writing anything:**

1. **`docs/CLAUDE.md`** — the authoring rules (file layout, frontmatter, tags,
   callouts, tables, voice, cross-links, images, and the done-checklist).
2. **`docs/template.md`** — the "Style reference" page. It contains a *working
   example of every styled element*. When you're unsure how a component is used,
   copy its exact shape from here rather than guessing.

The cheat-sheet below is a quick recall aid, not a replacement for those files.

## Step 1 — Place the page

- The site has exactly five sections, each a folder: `get-started/`, `motors/`,
  `drivers/`, `run-maintain/`, `reference/`. Pick the one that fits. **Do not
  invent a new top-level section** — ask the user if nothing fits.
- One page = one kebab-case `.md` file in that folder (`hall-sensor.md`, not
  `HallSensor.md`).
- **Pick a unique `sidebar_position`.** List the sibling files in the target
  folder and read their `sidebar_position` values first, then choose an unused
  integer that places the page where it belongs in reading order. Collisions
  break the sidebar order silently.

## Step 2 — Frontmatter (required on every page)

```yaml
---
title: Full page title            # renders as the H1
sidebar_label: Short nav label     # what shows in the left sidebar
sidebar_position: 3                # unique integer within the folder
description: One plain sentence for search results and meta tags
tags: [lowercase, comma, separated]
---
```

Keep `description` to one plain sentence — no marketing, no "Welcome to…".

## Step 3 — Page skeleton

```mdx
# Title matching the frontmatter

One-line intro sentence. State what the page does. No "Welcome"/"In this guide".

<DocMeta difficulty="Easy" readTime="6 min read" steps="5 steps" updated="July 2026" />

## First major section
...

## Next
Point the reader onward with a link or two when it helps them continue.
```

- `##` for major sections, `###` only for sub-steps. Never go deeper than `###`.
- `<DocMeta>` goes once, right after the intro. Omit `steps` on reference/
  conceptual pages (use it on step-by-step procedures).

## Step 4 — Reach for the custom components

These are registered globally — **never `import` them**. Prefer the styled
version over plain markdown when it exists, but don't sprinkle them for
decoration; each should earn its place.

| Need | Use | Example |
|------|-----|---------|
| Page meta line | `<DocMeta …/>` | `<DocMeta difficulty="Medium" readTime="8 min read" steps="6 steps" updated="July 2026" />` |
| A wire/visual colour in a table | `<Swatch>` | `<Swatch color="#2a8a3e">Green</Swatch>` · two-tone `color2="#E0B100"` |
| Plain-language aside for a jargon-heavy point | `<Plain>` | `<Plain label="Not sure?">Match the colours and you're done.</Plain>` |
| Inline colour / highlight | `<C>` | `<C c="accent">text</C>` · `<C bg="#fff3a3">marked</C>` |
| Hand-coloured code (pinouts, mappings) | `<Code>`+`<Line>` | see `template.md` "Code blocks" |
| Ordinary code | ```` ``` ```` fence | syntax-highlighted, theme-aware |

`<C>` palette names (prefer these over raw hex): `accent`, `coral`, `gold`,
`green`, `blue`, `amber`, `muted`.

Callouts (Docusaurus admonitions): `:::note` neutral · `:::tip` best practice ·
`:::info` background · `:::caution` be careful · `:::danger[Title]` genuine hazard
only (PE bonding, DC bus, live wiring — use sparingly). For a soft aside prefer
`<Plain>` over `:::note`.

Tables: pin/terminal names as inline `` `code` `` chips; colour cells always via
`<Swatch>` (never a bare colour word); max 4 columns — split wider tables under
separate `###` headings.

## Step 5 — Voice (this is what makes it "sound like Alto")

- Short, direct sentences. Address the reader as "you".
- Imperatives for steps: "Mount the motor", not "The motor should be mounted".
- No marketing language. Ban the words **easily, simply, just**.
- Indian English spelling is fine (colour, organisation) — match the page you're near.
- Quantities in digits with a space before the unit: `6 A`, `24 V`. Spell out
  one–nine only in non-quantitative prose ("two cables", "three options").
- Cross-link with relative paths to other docs: `[Hall sensor](../motors/hall-sensor.md)`,
  heading anchors as `#kebab-case`.

## Step 6 — MDX gotchas (these silently break the build)

`.md` here is parsed as **MDX**, so:

- Comments are `{/* like this */}`, **never** `<!-- html comments -->` (they break MDX).
- Inside `<Code>`/`<Line>`, wrap literal punctuation like arrows/spaces in a JS
  string so MDX doesn't try to parse it: `<Line><C c="coral">HA</C>{"   → "}<C c="gold">yellow</C></Line>`.
- A bare `<`, `{`, or `>` in prose can be read as MDX — escape or rephrase.
- Don't hand-edit `sidebars.ts` for these five folders; autogeneration + each
  folder's `_category_.json` handle the sidebar.

## Step 7 — Verify before saying it's done

The dev server is forgiving; the production build is the source of truth.

1. Frontmatter complete, `sidebar_position` unique in the folder.
2. `<DocMeta>` present with at least `difficulty`, `readTime`, `updated`.
3. Every colour reference uses `<Swatch>`; no raw `<!-- -->` comments.
4. Run `npm run build` from the repo root and fix any broken-link or MDX-parse
   warnings it reports. Don't declare the page done until the build is clean.

## A tiny worked example

```mdx
---
title: Replacing the AL57 pigtail
sidebar_label: Replace the pigtail
sidebar_position: 7
description: Swap a damaged AL57 factory pigtail without disturbing the Hall wiring
tags: [al57, maintenance, wiring]
---

# Replacing the AL57 pigtail

Swap a damaged factory pigtail in about ten minutes, without re-terminating the Hall wires.

<DocMeta difficulty="Easy" readTime="4 min read" steps="4 steps" updated="July 2026" />

## Before you start

<Plain label="Not sure?">The pigtail is the short bundle of wires leaving the motor. You're replacing that bundle only — not the motor.</Plain>

:::caution
Isolate the `24 V` supply before touching any phase wire.
:::

## Match the wires

| Motor wire | Driver terminal | Function |
|------------|-----------------|----------|
| <Swatch color="#E0B100">Yellow</Swatch> | `U` | Phase A |
| <Swatch color="#2a8a3e">Green</Swatch> | `V` | Phase B |

## Next

Power back up and re-run the [quickstart smoke test](../get-started/quickstart.md#step-5--power-on).
```

That's the shape every page should have. When in doubt, open `template.md` and copy
the exact component syntax from there.
