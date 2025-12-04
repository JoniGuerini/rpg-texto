import { calculateDamage, checkCrit, getTurnOrder } from './combatEngine';

describe('Combat Engine', () => {
    const hero = {
        name: 'Hero',
        stats: { str: 5, dex: 5, def: 2, atk: 10, spd: 5 }
    };

    const enemy = {
        name: 'Enemy',
        stats: { str: 2, dex: 2, def: 1, atk: 5, spd: 3 }
    };

    test('calculateDamage should apply STR multiplier and DEF mitigation', () => {
        // DANO_BRUTO = 10 * (1 + 5 * 0.02) = 10 * 1.1 = 11
        // DANO_APLICADO = floor(11 - 1 * 0.7) = floor(11 - 0.7) = 10
        const result = calculateDamage(hero, enemy, false);
        expect(result.rawDamage).toBeCloseTo(11);
        expect(result.finalDamage).toBe(10);
    });

    test('calculateDamage should apply Crit multiplier', () => {
        // Base 10. Crit = floor(10 * 1.5) = 15
        const result = calculateDamage(hero, enemy, true);
        expect(result.finalDamage).toBe(15);
        expect(result.isCrit).toBe(true);
    });

    test('getTurnOrder should prioritize higher SPD', () => {
        const fastHero = { ...hero, stats: { ...hero.stats, spd: 10 } };
        const slowEnemy = { ...enemy, stats: { ...enemy.stats, spd: 2 } };
        const order = getTurnOrder(fastHero, slowEnemy);
        expect(order[0]).toBe(fastHero);
    });
});
