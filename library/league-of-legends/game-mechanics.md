---
layout: default
title: Game Mechanics
parent: League of Legends
nav_order: 20
---

# Game Mechanics
{: .no_toc }

Reference for core LoL mechanics used in damage calculations.
{: .fs-6 .fw-300 }

<details open markdown="block">
  <summary>Table of contents</summary>
  {: .text-delta }
- TOC
{:toc}
</details>

---

## Resistance & Damage Mitigation

All resistances (armor and magic resist) use the same mitigation formula:

```
post_mitigation = pre_mitigation / (1 + R / 100)
```

Equivalently: `pre_mitigation × 100 / (100 + R)`

| Effective Armor | Damage taken (% of raw) | Damage reduction |
|---|---|---|
| 0 | 100% | 0% |
| 25 | 80% | 20% |
| 50 | 67% | 33% |
| 100 | 50% | 50% |
| 150 | 40% | 60% |
| 200 | 33% | 67% |
| 300 | 25% | 75% |

Key insight: **each additional point of armor is worth less than the last**. Going from 0→100 armor halves physical damage. Going from 100→200 only reduces it by another 17%.

### Negative resistance

If effective resistance drops below 0 (possible with armor shred), the multiplier exceeds 1 and damage is **amplified**. At -25 armor: `100 / (100 + (-25)) = 100 / 75 = 133%` damage taken.

### Effective HP

A useful alternative view: effective HP is how much raw damage an enemy must deal to kill you.

```
effectiveHP = HP × (1 + R / 100)
```

A champion with 2000 HP and 100 armor has **4000 effective HP** against physical damage. This is why armor/MR are so gold-efficient — they multiply your entire HP bar.

---

## Armor Penetration System

There are four layers, applied in a specific order. **Reductions** are debuffs on the target; **penetrations** are attacker stats that don't change the target's armor value.

### 1. Flat Armor Reduction (debuffs)
Applied first. **Subtracts a flat amount from the target's armor** — can push it below 0. Sources: Sion W, Jarvan E+Q combo, certain items.

### 2. % Armor Reduction (debuffs)
Applied to the already-reduced armor from step 1. Sources: Black Cleaver at max stacks, some abilities.

### 3. % Armor Penetration (attacker stat)
Applied third. **Ignores a % of remaining armor.** Does not change the target's armor — only affects this attacker's calculation. Sources: Lord Dominik's Regards (35%), Last Whisper (18%).

**Multiple sources are multiplicative, not additive:**

```
effectiveArmor = armor × (1 - pen1) × (1 - pen2)
```

LDR (35%) + Last Whisper (18%) is **not** 53%. It's:
```
100 × (1 - 0.35) × (1 - 0.18) = 100 × 0.65 × 0.82 = 53.3 armor
```
(vs 47 armor if they were additive — the difference matters against low-armor targets)

### 4. Flat Armor Penetration / Lethality (attacker stat)
Applied last. **Subtracts a flat amount** from the result (minimum 0 — lethality alone can't make effective armor go negative).

Lethality is a **1:1 flat armor reduction** — it does not scale with level. 28 lethality removes 28 armor at level 1 and level 18 equally.

### Full calculation example

Graves with Hubris + Collector vs a target with 80 armor:
- Lethality: 18 (Hubris) + 10 (Collector) = 28 → removes 28 armor flat
- No % armor pen in this build
- Effective armor = max(0, 80 - 28) = **52**
- Damage multiplier = 100 / (100 + 52) = **65.8%** of raw damage lands

Add LDR (35% armor pen):
- % pen applied first: 80 × (1 - 0.35) = 52 → then lethality: 52 - 28 = **24**
- Damage multiplier = 100 / (100 + 24) = **80.6%** — a significant jump

---

## Ability Haste & Cooldowns

```
CDR% = AH / (100 + AH)
effectiveCooldown = baseCooldown × 100 / (100 + AH)
```

| Ability Haste | CDR% | Q cooldown (rank 5, 6s base) |
|---|---|---|
| 0 | 0% | 6.0s |
| 10 | 9.1% | 5.45s |
| 20 | 16.7% | 5.0s |
| 30 | 23.1% | 4.62s |
| 40 | 28.6% | 4.29s |

Unlike the old CDR system (hard-capped at 40%), ability haste has no cap — each point gives diminishing returns but never stops.

---

## Lethality vs % Armor Pen: When to Buy Which

**Lethality is better against low-armor targets.** Against a 40-armor ADC, 18 lethality removes nearly all their armor. % pen only removes 35% of 40 = 14 armor.

**% Armor pen is better against high-armor targets.** Against a 200-armor tank, 35% pen removes 70 armor. Lethality can't touch that.

**The crossover point** (roughly): at ~80–100 armor, lethality and % pen are comparable. Above that, LDR pulls ahead. Below that, stacking lethality is more efficient.

This is why Graves' lethality build (Hubris/Collector/Youmuu's) demolishes squishies in the midgame but falls off against tanks — and why you often see a LDR or Last Whisper as a 4th item when enemies stack armor.
