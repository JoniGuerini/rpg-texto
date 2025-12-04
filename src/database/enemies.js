/**
 * ENEMIES DATABASE
 * Bestiário completo da Catedral Sombria
 * 
 * Categorias: Normal, Mini-Boss, Boss
 * Escalamento: Atributos multiplicados pelo andar
 */

const ENEMIES_CATALOG = [
    {
        id: 'rat_catacombs',
        name: 'Rato das Catacumbas',
        category: 'Beast',
        level: 1,
        hp: 12,
        maxHp: 12,
        atk: 4,
        def: 1,
        spd: 6,
        xp: 8,
        isBoss: false,
        isMiniBoss: false,
        drops: [
            { itemId: 'leather', chance: 0.6 },
            { itemId: 'glycerin', chance: 0.1 }
        ],
        abilities: [],
        lore: 'Roedores mutados pela corrupção. Seus olhos brilham vermelhos no escuro.'
    },
    {
        id: 'acolyte_dark',
        name: 'Acólito Sombrio',
        category: 'Humanoid',
        level: 2,
        hp: 22,
        maxHp: 22,
        atk: 6,
        def: 3,
        spd: 5,
        xp: 18,
        isBoss: false,
        isMiniBoss: false,
        drops: [
            { itemId: 'cloth', chance: 0.5 },
            { itemId: 'potion_small', chance: 0.2 }
        ],
        abilities: ['dark_bolt'],
        lore: 'Cultistas que sucumbiram à influência demoníaca. Ainda murmuram orações profanas.'
    },
    {
        id: 'guardian_stone',
        name: 'Guardião de Pedra',
        category: 'Construct',
        level: 3,
        hp: 36,
        maxHp: 36,
        atk: 8,
        def: 6,
        spd: 3,
        xp: 32,
        isBoss: false,
        isMiniBoss: false,
        drops: [
            { itemId: 'rune_stone', chance: 0.25 },
            { itemId: 'coin', chance: 0.7 }
        ],
        abilities: ['stone_skin'],
        lore: 'Estátuas animadas por magia antiga. Protegem tesouros há milênios.'
    },
    {
        id: 'wolf_corpse',
        name: 'Lobo Cadavérico',
        category: 'Undead',
        level: 3,
        hp: 30,
        maxHp: 30,
        atk: 9,
        def: 2,
        spd: 8,
        xp: 30,
        isBoss: false,
        isMiniBoss: false,
        drops: [
            { itemId: 'pelt', chance: 0.6 },
            { itemId: 'tooth', chance: 0.2 }
        ],
        abilities: ['feral_rush'],
        lore: 'Lobos reanimados pela necromancia. Famintos mesmo na morte.'
    },
    {
        id: 'specter_nave',
        name: 'Espectro da Nave',
        category: 'Undead',
        level: 4,
        hp: 28,
        maxHp: 28,
        atk: 10,
        def: 2,
        spd: 7,
        xp: 36,
        isBoss: false,
        isMiniBoss: false,
        drops: [
            { itemId: 'spectral_essence', chance: 0.15 },
            { itemId: 'potion_medium', chance: 0.3 }
        ],
        abilities: ['phase_through'],
        lore: 'Almas presas entre o mundo dos vivos e dos mortos.'
    },
    {
        id: 'archer_silent',
        name: 'Arqueiro Silente',
        category: 'Humanoid',
        level: 2,
        hp: 18,
        maxHp: 18,
        atk: 7,
        def: 2,
        spd: 6,
        xp: 20,
        isBoss: false,
        isMiniBoss: false,
        drops: [
            { itemId: 'arrow', chance: 0.8 },
            { itemId: 'old_bow', chance: 0.25 }
        ],
        abilities: ['aimed_shot'],
        lore: 'Guardas do castelo transformados em assassinos sem alma.'
    },
    {
        id: 'knight_corrupted',
        name: 'Cavaleiro Corrompido',
        category: 'Humanoid',
        level: 5,
        hp: 78,
        maxHp: 78,
        atk: 14,
        def: 8,
        spd: 4,
        xp: 100,
        isBoss: false,
        isMiniBoss: true,
        drops: [
            { itemId: 'corroded_sword', chance: 0.4 },
            { itemId: 'coin', chance: 0.8 }
        ],
        abilities: ['shield_bash', 'heavy_strike'],
        lore: 'Cavaleiros leais que caíram em desgraça. Suas armaduras enferrujadas escondem podridão.'
    },
    {
        id: 'guardian_nave_boss',
        name: 'Guardião da Nave',
        category: 'Boss',
        level: 8,
        hp: 220,
        maxHp: 220,
        atk: 22,
        def: 12,
        spd: 5,
        xp: 420,
        isBoss: true,
        isMiniBoss: false,
        drops: [
            { itemId: 'guardian_insignia', chance: 1.0 },
            { itemId: 'battle_axe', chance: 0.6 }
        ],
        abilities: ['divine_smite', 'sanctuary_aura', 'enrage'],
        lore: 'O protetor final da nave principal. Sua fé corrompida o transformou em uma abominação sagrada.'
    }
];

// ===== API FUNCTIONS =====
const EnemiesDB = {
    getById: (id) => ENEMIES_CATALOG.find(enemy => enemy.id === id),
    getByLevel: (level) => ENEMIES_CATALOG.filter(enemy => enemy.level === level && !enemy.isBoss && !enemy.isMiniBoss),
    getByCategory: (category) => ENEMIES_CATALOG.filter(enemy => enemy.category === category),
    getBosses: () => ENEMIES_CATALOG.filter(enemy => enemy.isBoss),
    getMiniBosses: () => ENEMIES_CATALOG.filter(enemy => enemy.isMiniBoss),
    getNormals: () => ENEMIES_CATALOG.filter(enemy => !enemy.isBoss && !enemy.isMiniBoss),
    getAll: () => ENEMIES_CATALOG,
    getRandom: (level, excludeBosses = true) => {
        const pool = excludeBosses 
            ? ENEMIES_CATALOG.filter(e => !e.isBoss && !e.isMiniBoss && e.level <= level)
            : ENEMIES_CATALOG.filter(e => e.level <= level);
        return pool[Math.floor(Math.random() * pool.length)];
    }
};

export default EnemiesDB;
export { ENEMIES_CATALOG };

