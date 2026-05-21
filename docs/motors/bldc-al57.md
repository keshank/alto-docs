---
id: bldc-al57
title: BLDC — AL57 series
sidebar_label: BLDC — AL57 series
description: Datasheets, wiring, mounting drawings, and torque curves for the Alto AL57 BLDC motor series.
tags: [bldc, al57, wiring, datasheet]
---

# BLDC — AL57 series

**Reading time:** 12 min · **Difficulty:** Medium

The AL57 is Alto's compact BLDC motor range, designed for precise speed control in material handling, pumps, and light industrial applications.

---

## Specifications

| Parameter | AL57BL01 | AL57BL02 | AL57BL03 | AL57BL04 |
|-----------|----------|----------|----------|----------|
| Rated voltage | 24 V DC | 36 V DC | 48 V DC | 48 V DC |
| Rated power | 150 W | 350 W | 500 W | 750 W |
| Rated speed | 3000 RPM | 3000 RPM | 3000 RPM | 4000 RPM |
| Rated torque | 0.48 N·m | 1.11 N·m | 1.59 N·m | 1.79 N·m |
| Pole pairs | 4 | 4 | 4 | 5 |
| IP rating | IP54 | IP54 | IP54 | IP54 |
| Weight | 1.2 kg | 1.8 kg | 2.1 kg | 2.4 kg |

---

## Wiring

### Power phases (U / V / W)

| Motor wire | Colour | Driver terminal |
|-----------|--------|----------------|
| Phase A | Yellow | `U` |
| Phase B | Green | `V` |
| Phase C | Blue | `W` |
| Frame ground | Green/Yellow | `PE` |

### Hall sensor connector (5-pin)

```
+5V  → red
GND  → black
HA   → yellow
HB   → green
HC   → blue
```

---

## Mounting dimensions

The AL57 uses an IEC 57 mounting face (4 × M4 holes on a 70 mm PCD). Shaft diameter: **10 mm** with a 3 mm keyway.

---

## Driver compatibility

The AL57 series is compatible with:

- **DRV-BL120** — up to 500 W (AL57BL01–03)
- **DRV-BL300** — up to 3 kW (all variants)

See [DRV-BL120 documentation](/docs/drivers/drv-bl120) for parameter settings specific to the AL57.

---

## Related guides

- [How to wire an AL57 to a DRV-BL120](/docs/drivers/drv-bl120#wiring-the-al57)
- [Hall sensor alignment](/docs/motors/hall-sensor)
- [Fault codes](/docs/run-maintain/fault-codes)
