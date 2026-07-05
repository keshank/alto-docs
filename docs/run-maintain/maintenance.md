---
sidebar_position: 2
id: maintenance
title: Maintenance schedule
sidebar_label: Maintenance
description: When to inspect, clean, and service an AL57 or AL86 BLDC motor to keep it running
tags: [maintenance, al57, al86, servicing]
---

# Maintenance schedule

Keep an AL57 or AL86 running with a short, repeatable set of checks — a daily glance, a monthly clean, and a quarterly service.

<DocMeta difficulty="Easy" readTime="5 min read" updated="July 2026" />

BLDC motors have no brushes to swap, so maintenance is mostly about keeping them cool, clean, and correctly bonded. Most sites need nothing more than the schedule below.

## At a glance

| Interval | Task | Why it matters |
|----------|------|----------------|
| Daily | Listen and feel for new noise, heat, or vibration | Early warning of a bearing or load problem |
| Monthly | Clear dust from the fins and check the mount bolts | A clogged motor runs hot and drifts out of alignment |
| Quarterly | Full service (below) | Catches wear before it becomes a fault |
| Yearly | Bearing inspection by a technician | Bearings are the main wear item on a brushless motor |

<Plain label="Why brushless is low-upkeep">A brushless motor has no carbon brushes rubbing inside it, so there's nothing that wears down and needs replacing every few months. You're mostly keeping it clean and cool.</Plain>

## Before you open anything

:::caution
Isolate the `24 V` DC bus at the driver and let the DC-link discharge before you touch any phase or Hall wire. Live servicing is the most common cause of injury on these units.
:::

Confirm the earth bond is intact before and after any service — the frame must stay bonded to `PE`.

| Check | Terminal | Wire |
|-------|----------|------|
| Frame earth bond | `PE` | <Swatch color="#2a8a3e" color2="#E0B100">Green / yellow</Swatch> |

## Monthly clean

1. Power down and isolate the `24 V` supply.
2. Blow dust off the cooling fins and vents with dry compressed air — <C c="coral">never</C> a wet cloth on the windings.
3. Check the mount bolts to the specified torque. A loose motor shifts alignment and adds vibration.
4. Wipe the shaft and confirm the coupling has no play.

## Quarterly service

Run the monthly clean, then:

- Inspect the phase and Hall wiring for chafe, discolouration, or heat marks near the terminals.
- Spin the shaft by hand with the supply off. It should turn smoothly with a light, even cogging — no grinding or catching.
- Re-check the earth-bond resistance from the frame to `PE`.
- Log the reading. A drift over time is your earliest sign of a developing fault.

:::tip
Run the built-in health check after every service and keep the report — a trend tells you more than any single reading.
:::

```bash
# Read temperatures, bus voltage, and Hall status (~10s)
alto-cli health --motor "AL57BL02" --driver DRV-BL120
```

## When to stop and investigate

Take the motor out of service and look closer if you see any of these:

- A bearing that rumbles, whines, or runs hot to the touch.
- One phase wire warmer than the other two.
- A frame-to-`PE` reading that has climbed since the last service.
- A fault code at power-on — look it up in [Fault codes](fault-codes.md).

## Next

- Chasing a specific symptom? Start with [Troubleshooting](troubleshooting.md).
- Re-terminating after a service? See [Wiring](wiring.md).
