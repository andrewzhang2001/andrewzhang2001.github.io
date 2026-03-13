/**
 * Core League of Legends damage and mitigation formulas.
 *
 * All functions are pure — no side effects, no imports.
 * Import this into any tool page for consistent calculations.
 */

// ─── Resistance Mitigation ────────────────────────────────────────────────────

/**
 * Damage multiplier from a resistance value.
 * Works for both armor (physical) and magic resist (magic).
 *
 *   post_mitigation = pre_mitigation * damageMultiplier(R)
 *
 * When R > 0: damage is reduced (multiplier < 1)
 * When R = 0: no change (multiplier = 1)
 * When R < 0: damage is amplified (multiplier > 1) — possible with armor shred
 */
export function damageMultiplier(resistance) {
  return 100 / (100 + resistance);
}

/**
 * Post-mitigation damage given raw damage and effective resistance.
 *
 *   postMitigation = preMitigation / (1 + R/100)
 *
 * Equivalent to: preMitigation * 100 / (100 + R)
 */
export function applyMitigation(rawDamage, effectiveResistance) {
  return rawDamage * damageMultiplier(effectiveResistance);
}

// ─── Armor Penetration ────────────────────────────────────────────────────────

/**
 * Converts lethality to flat armor penetration.
 *
 * Lethality is a 1:1 flat armor penetration — it no longer scales with level.
 *   flatPen = lethality
 *
 * Level parameter kept for API compatibility but unused.
 */
export function lethalityToFlatPen(lethality) {
  return lethality;
}

/**
 * Effective armor after applying all reduction and penetration sources.
 *
 * Riot's official order of operations:
 *   1. Flat armor reduction   (e.g. Sion W, Jarvan E+Q — can push armor below 0)
 *   2. % armor reduction      (e.g. Black Cleaver max stacks — applied to already-reduced armor)
 *   3. % armor penetration    (e.g. LDR 35%, Last Whisper 18% — attacker stat, multiplicative)
 *   4. Flat armor penetration (lethality — attacker stat, applied last, result floored at 0)
 *
 * Reductions (steps 1–2) are debuffs on the target.
 * Penetrations (steps 3–4) are attacker stats — they don't change the target's armor.
 *
 * @param {number} targetArmor        - Target's base armor
 * @param {number} flatArmorReduction - Flat armor reduction debuff on target (default 0)
 * @param {number} pctArmorReduction  - % armor reduction debuff on target as decimal (default 0)
 * @param {number} armorPenPct        - Attacker's combined % armor pen (multiplicative, default 0)
 * @param {number} lethality          - Attacker's total lethality (1:1 flat armor pen)
 */
export function effectiveArmor(targetArmor, {
  flatArmorReduction = 0,
  pctArmorReduction  = 0,
  armorPenPct        = 0,
  lethality          = 0,
} = {}) {
  const afterFlatReduction = targetArmor - flatArmorReduction;             // step 1 — can go below 0
  const afterPctReduction  = afterFlatReduction * (1 - pctArmorReduction); // step 2
  const afterPctPen        = afterPctReduction  * (1 - armorPenPct);       // step 3
  return Math.max(0, afterPctPen - lethality);                             // step 4, floor at 0
}

/**
 * Combines multiple % armor pen sources multiplicatively.
 * e.g. LDR (35%) + Last Whisper (18%) → combinedArmorPenPct(0.35, 0.18)
 *
 * Formula: 1 - (1 - pen1) * (1 - pen2) * ...
 * This is NOT the same as adding them: 35% + 18% ≠ 53%
 */
export function combinedArmorPenPct(...penValues) {
  return 1 - penValues.reduce((acc, p) => acc * (1 - p), 1);
}

// ─── Character Sheet ──────────────────────────────────────────────────────────

/**
 * Builds a combined character sheet from base stats + item list + rune page + context.
 *
 * @param {object} baseStats    - Output of graves.at(level)
 * @param {object[]} itemList   - Array of item objects from items.js
 * @param {object} runeContext  - { legendAlacrity: stacks, legendBloodline: stacks,
 *                                  hubrisActive: bool, hubrisStacks: n,
 *                                  suddenImpact: bool, ... }
 * @returns {object} sheet      - Full character sheet used by damage calculators
 */
export function buildCharacterSheet(baseStats, itemList = [], runeContext = {}) {
  // Sum flat item stats
  const itemAD          = itemList.reduce((s, i) => s + (i.stats.ad          ?? 0), 0);
  const itemLethality   = itemList.reduce((s, i) => s + (i.stats.lethality   ?? 0), 0);
  const itemCrit        = itemList.reduce((s, i) => s + (i.stats.critChance  ?? 0), 0);
  const itemAH          = itemList.reduce((s, i) => s + (i.stats.abilityHaste ?? 0), 0);
  const itemBonusAs     = itemList.reduce((s, i) => s + (i.stats.bonusAs     ?? 0), 0);

  // % armor pen: combine multiplicatively across all items
  const penSources = itemList.map(i => i.stats.armorPenPct ?? 0).filter(p => p > 0);
  const armorPenPct = penSources.length > 0 ? combinedArmorPenPct(...penSources) : 0;

  // Conditional AD from passives
  let conditionalAD = 0;
  if (runeContext.suddenImpact)   conditionalAD += 9;  // post-E lethality handled separately
  itemList.forEach(item => {
    item.passives?.forEach(p => {
      if (p.type === 'conditional_ad' && runeContext.hubrisActive) {
        conditionalAD += p.bonusAD(runeContext.hubrisStacks ?? 0);
      }
    });
  });

  // Lethality: items + Sudden Impact window
  const suddenImpactLethality = runeContext.suddenImpact ? 9 : 0;
  const totalLethality = itemLethality + suddenImpactLethality;

  // Bonus AS from runes
  const legendAlacrityAS = runeContext.legendAlacrityStacks != null
    ? (0.03 + Math.min(runeContext.legendAlacrityStacks, 10) * 0.015)
    : 0;

  const bonusAs  = baseStats.bonusAs + itemBonusAs + legendAlacrityAS;
  const bonusAD  = itemAD + conditionalAD;
  const totalAD  = baseStats.ad + bonusAD;
  const totalAs  = baseStats.baseAs + baseStats.asRatio * bonusAs;

  // Lifesteal
  const legendBloodlineLS = runeContext.legendBloodlineStacks != null
    ? Math.min(runeContext.legendBloodlineStacks, 15) * 0.0045
    : 0;

  return {
    level:        baseStats.level,
    // Offense
    totalAD,
    bonusAD,
    totalAs,
    critChance:   Math.min(1, itemCrit),       // cap at 100%
    lethality:    totalLethality,
    armorPenPct,
    abilityHaste: itemAH,
    lifesteal:    legendBloodlineLS,
    hasIE:        itemList.some(i => i.id === 'infinity-edge'),
    // Defense (Graves' own)
    hp:           baseStats.hp + (runeContext.legendBloodlineMaxStacks ? 85 : 0),
    armor:        baseStats.armor,
    mr:           baseStats.mr,
    ms:           baseStats.ms * (1 + itemList.reduce((s, i) => s + (i.stats.msPct ?? 0), 0)),
  };
}

// ─── Damage Calculation ───────────────────────────────────────────────────────

/**
 * Physical damage dealt to a target, after armor mitigation.
 *
 * @param {number} rawDamage      - Pre-mitigation physical damage
 * @param {number} targetArmor    - Target's base armor (before pen)
 * @param {object} sheet          - Character sheet from buildCharacterSheet()
 * @param {object} target         - { bonusHP } for Giant Slayer calc (optional)
 */
export function physicalDamage(rawDamage, targetArmor, sheet, target = {}) {
  const effArmor = effectiveArmor(targetArmor, {
    armorPenPct: sheet.armorPenPct,
    lethality:   sheet.lethality,
  });

  let damage = applyMitigation(rawDamage, effArmor);

  // Giant Slayer (Lord Dominik's)
  // TODO: pass item list reference or pre-compute amp into sheet if needed
  if (target.bonusHP != null) {
    const ldr = sheet._items?.find(i => i.id === 'lord-dominiks-regards');
    if (ldr) {
      const giantSlayer = ldr.passives.find(p => p.type === 'damage_amp_by_bonus_hp');
      if (giantSlayer) damage *= (1 + giantSlayer.amp(target.bonusHP));
    }
  }

  return damage;
}

/**
 * Magic damage dealt to a target, after MR mitigation.
 * (Graves' W and enemy abilities hitting Graves.)
 *
 * @param {number} rawDamage   - Pre-mitigation magic damage
 * @param {number} targetMR    - Target's magic resist
 * @param {number} mrPenPct    - % magic pen (e.g. Void Staff 0.40), default 0
 * @param {number} flatMrPen   - Flat MR pen (e.g. Sorcerer's 18), default 0
 */
export function magicDamage(rawDamage, targetMR, { mrPenPct = 0, flatMrPen = 0 } = {}) {
  const effMR = Math.max(0, targetMR * (1 - mrPenPct) - flatMrPen);
  return applyMitigation(rawDamage, effMR);
}

// ─── Utility ──────────────────────────────────────────────────────────────────

/**
 * Ability haste to cooldown reduction multiplier.
 *   CDR% = AH / (100 + AH)
 *   effectiveCooldown = baseCooldown * (1 - CDR%)
 *                     = baseCooldown * 100 / (100 + AH)
 */
export function cdFromAH(baseCooldown, abilityHaste) {
  return baseCooldown * 100 / (100 + abilityHaste);
}

/**
 * Effective HP: how much raw damage an enemy needs to deal to kill you.
 * Accounts for the fact that armor/MR reduce incoming damage.
 *
 *   effectiveHP = HP * (1 + R/100)
 */
export function effectiveHP(hp, resistance) {
  return hp * (1 + resistance / 100);
}
