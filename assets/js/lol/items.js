/**
 * League of Legends item definitions.
 *
 * Each item has:
 *   stats    — always-on flat stat bonuses fed directly into buildStats()
 *   passives — array of structured passive effects the formula engine handles
 *   active   — optional active ability (informational or modeled)
 *
 * Passive types and what the formula engine does with them:
 *   'conditional_ad'            — bonus AD gated on a runtime condition (e.g. Hubris stacks)
 *   'execute'                   — kills target below a % HP threshold post-mitigation
 *   'gold_on_kill'              — informational only, not used in damage calc
 *   'damage_amp_by_bonus_hp'    — % damage increase scaling with target's bonus HP (Giant Slayer)
 *   'ms_out_of_combat'          — informational only
 *
 * NOTE: Rune setups will live in runes.js (not yet created).
 */
export const items = {

  'serrated-dirk': {
    name: 'Serrated Dirk',
    gold: 1000,
    stats: {
      ad:        20,
      lethality: 10,
    },
    passives: [],
  },

  'hubris': {
    name: 'Hubris',
    gold: 2800,
    stats: {
      ad:           60,
      abilityHaste: 10,
      lethality:    18,
    },
    passives: [
      {
        name: 'Eminence',
        type: 'conditional_ad',
        // Scoring a takedown within 3s of damaging a champion generates a permanent stack
        // and grants bonusAD(stacks) for 90 seconds.
        // Pass { hubrisStacks, hubrisActive } at calc time.
        bonusAD:  (stacks) => 15 + 2 * stacks,
        duration: 90, // seconds after takedown
      },
    ],
  },

  'youmuus-ghostblade': {
    name: "Youmuu's Ghostblade",
    gold: 2800, // TODO: verify on next patch check
    stats: {
      ad:        55,
      lethality: 18,
      msPct:     0.04, // +4% movement speed (always on)
    },
    passives: [
      {
        name: 'Out of Combat Speed',
        type: 'ms_out_of_combat',
        // Ranged: +10 flat MS while out of combat for 3s after leaving combat
        flatMS: 10,
      },
    ],
    active: {
      name: 'Spectral Waltz',
      // Ranged values stored here; melee = 20% MS / 6s
      msBonusPct: 0.15,  // +15% bonus MS
      duration:   4,     // seconds
      cooldown:   45,
      ghosting:   true,  // passes through units
    },
  },

  'collector': {
    name: 'The Collector',
    gold: 3000,
    stats: {
      ad:         50,
      lethality:  10,
      critChance: 0.25,
    },
    passives: [
      {
        name: 'Death',
        type: 'execute',
        // If post-mitigation damage would leave target below threshold, they die instantly.
        hpThreshold: 0.05, // 5% of target's max HP
      },
      {
        name: 'Taxes',
        type: 'gold_on_kill',
        gold: 25,
      },
    ],
  },

  'lord-dominiks-regards': {
    name: "Lord Dominik's Regards",
    gold: 3300,
    stats: {
      ad:          35,
      armorPenPct: 0.35, // 35% — applied multiplicatively before lethality in formula
      critChance:  0.25,
    },
    passives: [
      {
        name: 'Giant Slayer',
        type: 'damage_amp_by_bonus_hp',
        // Deals 0%–15% increased damage based on target's bonus HP.
        // Linear: 0% at 0 bonus HP → 15% at 1500 bonus HP (capped).
        // Pass targetBonusHP at calc time.
        maxAmp:       0.15,
        hpThreshold:  1500,
        amp: (targetBonusHP) => Math.min(0.15, (targetBonusHP / 1500) * 0.15),
      },
    ],
  },

  'last-whisper': {
    name: 'Last Whisper',
    gold: 1450,
    stats: {
      ad:          20,
      armorPenPct: 0.18, // 18% armor pen
    },
    passives: [],
  },

  // ── Boots ──────────────────────────────────────────────────────────────────

  'plated-steelcaps': {
    name: 'Plated Steelcaps',
    gold: 1100,
    stats: {
      armor: 20,
      ms:    45, // flat MS — not a % bonus, add directly to base MS
    },
    passives: [
      {
        name: 'Plating',
        type: 'basic_attack_damage_reduction',
        // Reduces incoming damage from basic attacks by 12% (pre-mitigation).
        // Applied before armor mitigation. Relevant when modeling Graves' AAs into Amumu.
        reductionPct: 0.12,
      },
    ],
  },

  'mercury-treads': {
    name: "Mercury's Treads",
    gold: 1100,
    stats: {
      mr: 25,
      ms: 45,
    },
    passives: [
      {
        name: 'Tenacity',
        type: 'tenacity',
        // Reduces duration of stuns, slows, CC by 30%. Not relevant for damage calc.
        value: 0.30,
      },
    ],
  },

  // ── AP / Tank Items ────────────────────────────────────────────────────────

  'liandrys-anguish': {
    name: "Liandry's Anguish",
    gold: 3000, // TODO: verify
    stats: {
      ap: 60,
      hp: 300,
    },
    passives: [
      {
        name: 'Torment',
        type: 'burn_on_ability_damage',
        // Ability damage burns the target: 1% of target's max HP as magic damage
        // every 0.5s over 3s. Refreshes on each new ability damage instance — does
        // NOT stack multiple 3s windows, just resets the timer.
        damagePerTick:     0.01,  // 1% max HP per tick
        tickInterval:      0.5,   // seconds
        duration:          3,     // seconds (refreshed, not stacked)
        damageType:        'magic',
      },
      {
        name: 'Suffering',
        type: 'damage_amp_ramp',
        // Each second in combat with enemy champions: +2% damage, up to 3 stacks (6% max).
        ampPerStack:   0.02,
        maxStacks:     3,
        maxAmp:        0.06,
        stackInterval: 1, // seconds
        amp: (stacks) => Math.min(stacks, 3) * 0.02,
      },
    ],
  },

  'sunfire-aegis': {
    name: 'Sunfire Aegis',
    gold: 2700, // TODO: verify
    stats: {
      abilityHaste: 10,
      armor:        50,
      hp:           350,
    },
    passives: [
      {
        name: 'Immolate',
        type: 'aura_magic_damage',
        // Activated by taking or dealing damage. Lasts 3 seconds.
        // Deals 20 + 1% bonus HP as magic damage per second to nearby enemies.
        // bonusHP = sum of HP from items only (not base HP).
        damageType:       'magic',
        baseDamage:       20,
        bonusHpRatio:     0.01,   // 1% of holder's bonus HP per second
        tickInterval:     1,      // seconds
        activeDuration:   3,      // seconds; resets on damage taken/dealt
        damage: (bonusHP) => 20 + 0.01 * bonusHP,
      },
    ],
  },

};
