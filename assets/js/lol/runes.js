/**
 * League of Legends rune definitions and rune page presets.
 *
 * Rune stat scaling uses level 1–20 (same as champion stats):
 *   statAt(lvl) = base + (max - base) * (lvl - 1) / 19
 *
 * Only runes relevant to Graves are defined here.
 * Rune effects that influence damage output are typed so formulas.js can consume them.
 *
 * Effect types:
 *   'heal_on_energized_aa'   — Fleet Footwork proc
 *   'bonus_damage_on_proc'   — Dark Harvest soul-stacking damage
 *   'flat_ad'                — flat bonus AD (e.g. Triumph, Absolute Focus shards)
 *   'adaptive_force'         — converts to bonus AD for Graves (no AP items)
 *   'armor'                  — flat armor
 *   'mr'                     — flat magic resist
 *   'hp'                     — flat HP
 *   'informational'          — no numeric effect on damage model
 */

// ─── Individual Rune Definitions ──────────────────────────────────────────────

export const runes = {

  // ── Precision Keystones ──

  'fleet-footwork': {
    name: 'Fleet Footwork',
    path: 'Precision',
    slot: 'keystone',
    // Energized mechanic: 100 charges from moving + basic attacking.
    // At 100 charges, next AA heals and grants bonus MS. Ranged values used throughout.
    effects: [
      {
        type: 'heal_on_energized_aa',
        // Heal scales level 1–18. Formula: base + (max - base) * (lvl - 1) / 17
        heal: { base: 6, max: 89.29 }, // ranged
        bonusAdRatio: 0.06,            // +6% bonus AD (ranged)
        apRatio:      0.03,            // +3% AP (irrelevant on Graves)
        msBonusPct:   0.15,            // +15% bonus MS for 1 second (ranged)
        msDuration:   1,               // seconds
        vsMinionsMultiplier: 0.15,     // heal is only 15% effective vs minions
      },
    ],
  },

  'dark-harvest': {
    name: 'Dark Harvest',
    path: 'Domination',
    slot: 'keystone',
    // TODO: fill in Dark Harvest soul stack damage values if you want to model it.
    // Deals bonus adaptive damage based on souls collected.
    effects: [
      {
        type: 'bonus_damage_on_proc',
        // placeholder — add base damage + soul scaling when needed
      },
    ],
  },

  // ── Precision Row 1 ──

  'triumph': {
    name: 'Triumph',
    path: 'Precision',
    slot: 'row1',
    effects: [
      {
        type: 'heal_on_takedown',
        // Heals after a 1 second delay.
        maxHpRatio:     0.025, // 2.5% of max HP
        missingHpRatio: 0.05,  // 5% of missing HP
        gold:           20,
      },
    ],
  },

  'presence-of-mind': {
    name: 'Presence of Mind',
    path: 'Precision',
    slot: 'row1',
    effects: [
      {
        type: 'informational',
        note: 'Takedown restores mana; mana regen increased near objectives.',
      },
    ],
  },

  // ── Precision Row 2 ──

  'legend-alacrity': {
    name: 'Legend: Alacrity',
    path: 'Precision',
    slot: 'row2',
    effects: [
      {
        type: 'bonus_attack_speed',
        // 3% base + 1.5% per stack, up to 10 stacks = 18% max
        // totalAs = baseAs + asRatio * (bonusAs_from_items + bonusAs_from_legend)
        base:          0.03,
        perStack:      0.015,
        maxStacks:     10,
        maxBonus:      0.18,
        bonusAs: (stacks) => 0.03 + Math.min(stacks, 10) * 0.015,
      },
    ],
  },

  'legend-bloodline': {
    name: 'Legend: Bloodline',
    path: 'Precision',
    slot: 'row2',
    effects: [
      {
        type: 'lifesteal_stacking',
        perStack:   0.0045, // 0.45% lifesteal per stack
        maxStacks:  15,
        maxBonus:   0.0675, // 6.75% lifesteal at max stacks
        lifesteal: (stacks) => Math.min(stacks, 15) * 0.0045,
      },
      {
        type: 'bonus_hp',
        // Only granted at max stacks (15)
        hp:            85,
        requiresMaxStacks: true,
      },
    ],
  },

  'legend-haste': {
    name: 'Legend: Haste',
    path: 'Precision',
    slot: 'row2',
    effects: [
      {
        type: 'informational',
        note: 'Stacking ability haste.',
      },
    ],
  },

  // ── Precision Row 3 ──

  'coup-de-grace': {
    name: 'Coup de Grace',
    path: 'Precision',
    slot: 'row3',
    effects: [
      {
        type: 'damage_amp_conditional',
        amp:             0.08,  // 8% more damage
        condition:       'target_hp_below',
        threshold:       0.40,  // triggers when target is below 40% HP
      },
    ],
  },

  'cut-down': {
    name: 'Cut Down',
    path: 'Precision',
    slot: 'row3',
    effects: [
      {
        type: 'damage_amp_conditional',
        amp:             0.08,  // 8% more damage
        condition:       'target_hp_above',
        threshold:       0.60,  // triggers when target is above 60% HP
      },
    ],
  },

  // ── Domination Row 1 ──

  'sudden-impact': {
    name: 'Sudden Impact',
    path: 'Domination',
    slot: 'row1',
    effects: [
      {
        type: 'informational',
        note: 'After dashing (e.g. E), gain +9 lethality and +15% magic pen for 5s. Add +9 lethality to character sheet for post-E window.',
      },
    ],
  },

  // ── Stat Shards ──────────────────────────────────────────────────────────────

  'shard-adaptive-force': {
    name: 'Adaptive Force (shard)',
    slot: 'shard',
    effects: [
      {
        type: 'adaptive_force',
        value: 9, // treated as bonus AD for Graves
      },
    ],
  },

  'shard-attack-speed': {
    name: 'Attack Speed (shard)',
    slot: 'shard',
    effects: [
      {
        type: 'informational',
        note: '+10% attack speed.',
      },
    ],
  },

  'shard-armor': {
    name: 'Armor (shard)',
    slot: 'shard',
    effects: [{ type: 'armor', value: 6 }],
  },

  'shard-mr': {
    name: 'Magic Resist (shard)',
    slot: 'shard',
    effects: [{ type: 'mr', value: 8 }],
  },

  'shard-hp': {
    name: 'Health (shard)',
    slot: 'shard',
    effects: [{ type: 'hp', value: 15, scaling: { base: 15, max: 140 } }], // scales with level
  },
};

// ─── Rune Page Presets ────────────────────────────────────────────────────────

export const runePages = {

  'fleet-standard': {
    name: 'Fleet Footwork — Standard',
    keystone:  'fleet-footwork',
    primary:   'Precision',
    secondary: 'Domination',
    rows: [
      'triumph',
      'legend-alacrity',
      'coup-de-grace',
      'sudden-impact',       // secondary slot 1
      // secondary slot 2 — TODO: fill in (e.g. Treasure Hunter, Eyeball Collection)
    ],
    shards: [
      'shard-adaptive-force',
      'shard-adaptive-force',
      'shard-armor',         // or 'shard-mr' situationally
    ],
  },

};
