/**
 * Graves champion data (level 1 → level 20)
 *
 * Scaling formula: statAt(lvl) = base + (max - base) * (lvl - 1) / 19
 *
 * Total AS = baseAs + asRatio * bonusAs(lvl)
 */
export const graves = {

  // ─── Base Stats ───────────────────────────────────────────────────────────

  stats: {
    hp:      { base: 627,    max: 2709.49 },
    mp:      { base: 325,    max: 1111.6  },
    hp5:     { base: 8,      max: 21.77   },
    mp5:     { base: 8,      max: 21.77   },
    armor:   { base: 33,     max: 123.46  },
    ad:      { base: 68,     max: 146.66  },
    mr:      { base: 30,     max: 55.56   },
    bonusAs: { base: 0,      max: 0.59    }, // per-level AS growth applied via asRatio

    // Constants
    ms:      340,
    range:   425,
    baseAs:  0.475,
    asRatio: 0.49,  // totalAs = baseAs + asRatio * bonusAs
  },

  // ─── Auto Attack (Passive: New Destiny) ───────────────────────────────────

  autoAttack: {
    shells: 2, // max shells; fires 1 per AA, reloads during E or after delay

    normal: {
      pellets: 4,
      // Damage as a multiplier of *total* AD, scales with level.
      // firstPellet + (n - 1) * subsequentPellet = total single-target damage for n pellets.
      firstPellet:      { base: 0.7000, max: 1.0504 }, // 70% → 105.04% total AD
      subsequentPellet: { base: 0.2331, max: 0.3498 }, // 23.31% → 34.98% total AD each (≈ 1/3 of first)
    },

    crit: {
      pellets: 6,
      pelletMultiplier:       1.50,   // each pellet deals +50% damage vs normal
      pelletMultiplierWithIE: 1.65,   // with Infinity Edge: +65% per pellet
    },
  },

  // ─── Abilities ────────────────────────────────────────────────────────────

  abilities: {
    // Q — End of the Line (physical damage)
    // Fires a powder round; detonates after 0.5s or on hitting terrain.
    // Both hits can strike the same target. Detonation is the primary damage.
    Q: {
      damageType:  'physical',
      cooldown:    [13, 11.25, 9.5, 7.75, 6],
      initialHit: {
        base:         [50,  75,  100, 125, 150],
        bonusAdRatio: [0.65, 0.65, 0.65, 0.65, 0.65], // flat 65% bonus AD at all ranks
      },
      detonation: {
        base:         [80,  125, 170, 215, 260],
        bonusAdRatio: [0.55, 0.70, 0.85, 1.00, 1.15], // scales per rank — the main damage source
      },
      // A target caught by both hits takes initialHit + detonation damage
      canHitSameTarget: true,
    },

    // W — Smoke Screen (magic damage)
    // Also slows and blinds enemies in the area. AP ratio is negligible on Graves.
    W: {
      damageType: 'magic',
      cooldown:   [26, 24, 22, 20, 18],
      damage: {
        base:    [60, 110, 160, 210, 260],
        apRatio: [0.60, 0.60, 0.60, 0.60, 0.60], // flat 60% AP at all ranks
      },
    },

    // E — Quickdraw (no damage)
    // Dashes and reloads 1 shell. Cooldown reduced by 0.5s per pellet that hits an enemy
    // (relevant for long combos — e.g. 4-pellet AA reduces E CD by 2s).
    E: {
      damageType:  null,
      cooldown:    [16, 15, 14, 13, 12],
      cdReductionPerPellet: 0.5, // seconds

      // Passive: True Grit — stacks on dash, decays after 4s out of combat
      trueGrit: {
        maxStacks:           8,
        stacksOnDash:        1, // normal dash
        stacksOnDashToEnemy: 2, // dashing toward an enemy champion
        // Per stack bonus, indexed by E rank (rank 1–5):
        bonusArmor: [7,  10, 13, 16, 19],
        bonusMR:    [3.5, 5, 6.5, 8, 9.5],
      },
    },

    // R — Collateral Damage (physical damage)
    // Fires a shell that explodes on impact, sending a cone behind the target.
    // A single target is hit by EITHER the shell OR the cone — never both.
    // Shell is higher damage; cone is what catches enemies behind the primary target.
    R: {
      damageType: 'physical',
      cooldown:   [100, 80, 60],
      shell: {
        base:         [275, 425, 575],
        bonusAdRatio: [1.50, 1.50, 1.50], // flat 150% bonus AD at all ranks
      },
      cone: {
        base:         [200, 320, 440],
        bonusAdRatio: [1.20, 1.20, 1.20], // flat 120% bonus AD at all ranks
      },
    },
  },

  // ─── Computed Stats at Level ──────────────────────────────────────────────

  /**
   * Returns Graves' base stats at a given level (1–20).
   * Does NOT include item stats — add those separately in your tool.
   */
  at(level) {
    if (level < 1 || level > 20) throw new RangeError(`Level must be 1–20, got ${level}`);
    const t = (level - 1) / 19;
    const lerp = ({ base, max }) => base + (max - base) * t;
    const s = this.stats;
    const bonusAs = lerp(s.bonusAs);

    return {
      level,
      hp:      lerp(s.hp),
      mp:      lerp(s.mp),
      hp5:     lerp(s.hp5),
      mp5:     lerp(s.mp5),
      armor:   lerp(s.armor),
      ad:      lerp(s.ad),
      mr:      lerp(s.mr),
      bonusAs,
      totalAs: s.baseAs + s.asRatio * bonusAs,
      ms:      s.ms,
      range:   s.range,
      baseAs:  s.baseAs,
      asRatio: s.asRatio,
    };
  },

  /**
   * Returns pellet damage multipliers for an auto attack at a given level.
   * Pass n = number of pellets that hit the same target (1–4 normal, 1–6 crit).
   * Pass isCrit and hasIE to apply crit modifiers.
   *
   * Returns { pellets: n, totalMultiplier } where totalMultiplier * totalAD = physical damage.
   */
  aaDamage(level, { pelletsHit = 1, isCrit = false, hasIE = false } = {}) {
    const t = (level - 1) / 19;
    const lerp = ({ base, max }) => base + (max - base) * t;
    const aa = this.autoAttack;

    if (isCrit) {
      const critMult = hasIE ? aa.crit.pelletMultiplierWithIE : aa.crit.pelletMultiplier;
      const first = lerp(aa.normal.firstPellet) * critMult;
      const subsequent = lerp(aa.normal.subsequentPellet) * critMult;
      const n = Math.min(pelletsHit, aa.crit.pellets);
      return { pelletsHit: n, totalMultiplier: first + Math.max(0, n - 1) * subsequent };
    } else {
      const first = lerp(aa.normal.firstPellet);
      const subsequent = lerp(aa.normal.subsequentPellet);
      const n = Math.min(pelletsHit, aa.normal.pellets);
      return { pelletsHit: n, totalMultiplier: first + Math.max(0, n - 1) * subsequent };
    }
  },
};
