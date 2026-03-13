/**
 * Target profiles for damage calculations.
 *
 * These are not full champion sheets — only defensive stats needed to model
 * incoming damage. Use targets.at(level) to get stats at a given level,
 * then pass armor/MR/HP into formulas.js functions.
 *
 * Scaling formula: statAt(lvl) = base + (max - base) * (lvl - 1) / 19
 *
 * bonusHP is the target's HP above their base — relevant for Giant Slayer (LDR passive).
 * For a target with no HP items, bonusHP = 0.
 */

function lerp({ base, max }, level) {
  return base + (max - base) * (level - 1) / 19;
}

function makeTarget(id, name, stats) {
  return {
    id,
    name,
    stats,
    at(level, itemBonusHP = 0) {
      if (level < 1 || level > 20) throw new RangeError(`Level must be 1–20, got ${level}`);
      const hp = lerp(this.stats.hp, level);
      return {
        level,
        hp,
        hp5:      lerp(this.stats.hp5, level),
        armor:    lerp(this.stats.armor, level),
        mr:       lerp(this.stats.mr, level),
        bonusHP:  itemBonusHP, // pass item HP separately for Giant Slayer calc
        totalHP:  hp + itemBonusHP,
      };
    },
  };
}

export const targets = {

  // ── ADC / Squishy ──────────────────────────────────────────────────────────

  jinx: makeTarget('jinx', 'Jinx', {
    hp:    { base: 630,   max: 2694.83 },
    hp5:   { base: 3.75,  max: 13.58   },
    armor: { base: 26,    max: 108.59  },
    mr:    { base: 30,    max: 55.56   },
  }),

  // ── Bruiser / Tank ─────────────────────────────────────────────────────────

  amumu: {
    ...makeTarget('amumu', 'Amumu', {
      hp:    { base: 685,   max: 2533.51 },
      hp5:   { base: 9,     max: 25.72   },
      armor: { base: 33,    max: 111.66  },
      mr:    { base: 32,    max: 72.31   },
    }),

    /**
     * E passive — Tantrum: Reduces each instance of incoming pre-mitigation physical
     * damage by a flat amount. Applies PER HIT — each Graves pellet is a separate instance.
     *
     * reduction = base[rank] + 0.03 * bonusArmor + 0.03 * bonusMR
     *
     * @param {number} eRank       - E rank 1–5
     * @param {number} bonusArmor  - Amumu's bonus armor from items
     * @param {number} bonusMR     - Amumu's bonus MR from items
     */
    tantrum: {
      base: [5, 7, 9, 11, 13],
      bonusArmorRatio: 0.03,
      bonusMRRatio:    0.03,
      reduction(eRank, bonusArmor = 0, bonusMR = 0) {
        return this.base[eRank - 1] + this.bonusArmorRatio * bonusArmor + this.bonusMRRatio * bonusMR;
      },
    },
  },

  // ── Placeholders (add stats when needed) ───────────────────────────────────

  // generic-squishy: rough approximation for an unarmored ADC/mid at various levels
  // generic-tank: high HP + armor target (useful for LDR vs LW comparison)

};
