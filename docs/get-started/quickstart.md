---
id: quickstart
title: How to install your first motor
sidebar_label: Quickstart
description: A 30-minute walkthrough from unboxing to first spin for Alto Motors BLDC and induction motors.
tags: [beginner, installation, bldc, induction]
---

# How to install your first motor

A 30-minute walkthrough from unboxing to first spin.

**Reading time:** 5 min · **Difficulty:** Easy · **Updated:** May 2026

---

## What you'll need

Before you start, have these ready:

- Your Alto motor (BLDC AL57 or induction series)
- Matching driver (DRV-BL120 for BLDC, or a standard VFD for induction)
- 24 V DC supply rated ≥ 6 A (BLDC) or appropriate AC supply (induction)
- Multimeter with continuity buzzer
- 3 mm hex key
- Cable glands and conduit (if permanent installation)

:::note
If you ordered a factory-paired motor + driver set, the U/V/W phases ship pre-numbered to match — you can skip ahead to [Driver parameters](#step-5--driver-parameters).
:::

---

## Step 1 — Inspect the motor

Check for shipping damage before mounting:

1. Inspect the shaft for nicks or burrs
2. Rotate the shaft by hand — it should turn smoothly with light resistance
3. Verify the nameplate matches your order (voltage, power, speed)
4. Check the cable pigtail — all wires should be intact and labelled

---

## Step 2 — Mount the motor

Mount the motor to a heat-dissipating surface (aluminium plate or DIN rail bracket):

1. Align the mounting holes with your bracket
2. Use M4 × 10 mm hex bolts — torque to **4 N·m**
3. Ensure the motor body is thermally coupled to the mounting surface
4. Leave 50 mm clearance around the body for airflow

:::caution
Do not mount with the cable exit pointing upward — water ingress can occur even on IP54-rated units.
:::

---

## Step 3 — Wire the power phases

With the supply **disconnected**, land the three phase conductors on the driver's motor block:

| Driver terminal | Motor wire | Function |
|----------------|------------|----------|
| `U` | Yellow | Phase A |
| `V` | Green | Phase B |
| `W` | Blue | Phase C |
| `PE` | Green/Yellow | Frame ground |

:::danger Ground bond required
The motor frame **must** be bonded to `PE` before applying DC bus power. An ungrounded frame can carry up to 50 V of induced potential.
:::

---

## Step 4 — Connect the Hall sensors (BLDC only)

The five Hall wires land on the `HALL` connector:

```
# pin → motor wire
+5V  → red
GND  → black
HA   → yellow
HB   → green
HC   → blue
```

---

## Step 5 — Driver parameters

Hold **SET** for 3 seconds to enter parameter mode, then set:

1. `P01` — Pole pairs · **4** for AL57BL01–03, **5** for AL57BL04
2. `P02` — Rated current · use the value stamped on the motor nameplate
3. `P03` — Max RPM · default **4000** for the AL57 series

---

## Step 6 — Test run

1. Apply power to the driver (DC bus or AC mains)
2. Slowly increase the speed reference from 0
3. Motor should start smoothly — listen for grinding or clicking
4. Verify rotation direction. If reversed, swap any two of the U/V/W phases

If the motor doesn't start or a fault code appears, see [Fault code lookup](/docs/run-maintain/fault-codes).

---

## Next steps

- [Hall sensor alignment](/docs/motors/hall-sensor) — fine-tune for maximum efficiency
- [Driver parameters](/docs/drivers/parameter-reference) — full parameter reference
- [Maintenance schedule](/docs/run-maintain/maintenance) — know when to inspect
