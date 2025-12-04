/**
 * Combat Engine - Pure functions for RPG combat
 * Supports damage ranges: { min, max, type }
 */

const getStat = (entity, stat) => {
    if (entity.stats && entity.stats[stat] !== undefined) {
        return entity.stats[stat];
    }
    if (entity[stat] !== undefined) {
        return entity[stat];
    }
    return 0;
};

/**
 * Get weapon damage - supports both damage object and legacy atk stat
 */
const getWeaponDamage = (entity) => {
    if (entity.damage) {
        // Roll random value between min and max
        const roll = entity.damage.min + Math.random() * (entity.damage.max - entity.damage.min);
        return Math.floor(roll);
    }
    // Legacy: use atk stat
    return getStat(entity, 'atk');
};

export const calculateDamage = (attacker, defender, isCrit = false) => {
    const weaponDmg = getWeaponDamage(attacker);
    const str = getStat(attacker, 'str');
    const def = getStat(defender, 'def');

    const strMultiplier = 1 + (str * 0.02);
    const rawDamage = weaponDmg * strMultiplier;

    const defMitigation = def * 0.7;
    let finalDamage = Math.floor(rawDamage - defMitigation);

    finalDamage = Math.max(1, finalDamage);

    if (isCrit) {
        finalDamage = Math.floor(finalDamage * 1.5);
    }

    return {
        rawDamage,
        finalDamage,
        isCrit
    };
};

export const checkCrit = (attacker, rng = Math.random) => {
    // Use weapon crit if available, otherwise base 5%
    const weaponCrit = attacker.crit || 5;
    const dex = getStat(attacker, 'dex');
    const baseCrit = weaponCrit / 100;
    const chance = baseCrit + (dex * 0.01);
    return rng() < chance;
};

export const checkHit = (attacker, defender, rng = Math.random) => {
    return true;
};

export const getTurnOrder = (entityA, entityB) => {
    const spdA = getStat(entityA, 'spd');
    const spdB = getStat(entityB, 'spd');

    if (spdA >= spdB) {
        return [entityA, entityB];
    }
    return [entityB, entityA];
};

export const calculateXP = (level) => {
    return Math.floor(100 * Math.pow(1.25, level - 1));
};

export const processTurn = (attacker, defender, actionType = 'attack') => {
    const log = [];
    let damageResult = { finalDamage: 0, isCrit: false };

    if (actionType === 'attack') {
        const isCrit = checkCrit(attacker);
        damageResult = calculateDamage(attacker, defender, isCrit);

        log.push(`${attacker.name} ataca ${defender.name} causando ${damageResult.finalDamage} de dano${isCrit ? ' CRÍTICO!' : '.'}`);
    } else if (actionType === 'defend') {
        log.push(`${attacker.name} assume uma postura defensiva.`);
    }

    return {
        damage: damageResult.finalDamage,
        log
    };
};
