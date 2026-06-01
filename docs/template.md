---
title: Style reference
sidebar_label: Style reference
sidebar_position: 99
description: Every styled element available in Alto docs, in one place. Copy from here when writing a new page.
tags: [reference, style]
---

# Style reference

Every styled element available in the docs, in one place. Copy any block below when writing a new page.

<DocMeta difficulty="Easy" readTime="3 min read" updated="May 2026" />

---

## Text and headings

Body copy is warm ink on paper with comfortable line spacing. Inline styles include **bold**, _italic_, `code chips`, and [links](https://altomotors.in). Every `##` heading shows a muted `#` marker.

### Subheading

Use an H3 for sub-steps inside a section.

### Custom text colour

Colour any text — any colour — with the `<C>` tag, straight from Markdown:

- Named palette: <C c="accent">accent</C>, <C c="coral">coral</C>, <C c="gold">gold</C>, <C c="green">green</C>, <C c="blue">blue</C>, <C c="amber">amber</C>, <C c="muted">muted</C>.
- Any CSS colour: <C c="#16a34a">#16a34a</C>, <C c="rebeccapurple">rebeccapurple</C>, <C c="hsl(20 90% 50%)">hsl()</C>.
- Highlight with `bg`: <C bg="#fff3a3">marked text</C>, or both: <C c="white" bg="accent">badge</C>.

```text
<C c="coral">coloured text</C>
<C bg="#fff3a3">highlighted</C>
<C c="white" bg="accent">badge</C>
```

---

## Lists

Unordered lists use red bullets:

- One AL57BL0x motor with the factory pigtail
- A DRV-BL120 driver on a heat-sink plate
- A 24 V DC supply rated ≥ 6 A

Ordered lists use red numbered circles:

1. Inspect the shaft and nameplate.
2. Mount the motor to a heat-dissipating surface.
3. Land the phase and Hall wires.

---

## Callouts

:::note
A neutral note for context or a side remark.
:::

:::tip
A helpful shortcut or best-practice tip.
:::

:::info
Background information that's good to know but not critical.
:::

:::caution
Something to be careful about before you proceed.
:::

:::danger[Earth bond required]
The motor frame **must** be bonded to `PE` before applying DC bus power.
:::

For a softer, plain-language aside, use the `<Plain>` box:

<Plain>You'll connect two cables. A thick one carries power, a thin one tells the driver where the motor is. Match the colours, you're done.</Plain>

<Plain label="Not sure?">Hold `SET + ESC` on the driver for 5 seconds to load the factory defaults.</Plain>

---

## Tables

Terminal cells are inline `code` chips; colour cells use the `<Swatch>` tag:

| Driver terminal | Motor wire | Function |
|-----------------|------------|----------|
| `U` | <Swatch color="#E0B100">Yellow</Swatch> | Phase A |
| `V` | <Swatch color="#2a8a3e">Green</Swatch> | Phase B |
| `W` | <Swatch color="#2d6fc8">Blue</Swatch> | Phase C |
| `PE` | <Swatch color="#2a8a3e" color2="#E0B100">Green / yellow</Swatch> | Frame earth |

---

## Code blocks

Use a `<Code>` block to colour the code yourself — set each colour right in the Markdown with `<C>`. `title` adds the window bar (dots + filename + Copy):

<Code title="hall-pinout.txt">
<Line><C c="muted"># Driver pin → motor wire</C></Line>
<Line><C c="coral">+5V</C>{"  → "}<C c="gold">red</C></Line>
<Line><C c="coral">GND</C>{"  → "}<C c="gold">black</C></Line>
<Line><C c="coral">HA</C>{"   → "}<C c="gold">yellow</C></Line>
</Code>

A plain ` ``` ` fence is syntax-highlighted with a theme-aware palette (the colours flip between light and dark):

```bash
# Flash firmware to a motor (~30s)
alto-cli flash --motor "AL57BL02" --driver DRV-BL120 --retries 3
```

---

## Tag reference

Two tags are available in any page (no import needed):

```text
<DocMeta difficulty="Easy" readTime="8 min read" steps="6 steps" updated="May 2026" />
<Swatch color="#2a8a3e">Green</Swatch>
<Plain label="Not sure?">Plain-language explanation goes here.</Plain>
```

- `<DocMeta>` — `difficulty` (`Easy`/`Medium`/`Advanced`), `readTime`, `steps`, `updated`
- `<Swatch>` — `color`, optional `color2` for a two-tone split
- `<Plain>` — optional `label` (defaults to "In plain English")
- `<C>` / `<Color>` — `c` (text colour) and/or `bg` (highlight); any CSS colour or a palette name
- `<Code>` + `<Line>` — hand-coloured code card; colour parts with `<C>`, `title` adds the window bar
