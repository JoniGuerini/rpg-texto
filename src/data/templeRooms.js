/**
 * TEMPLE OF ATZOATL - ROOM DEFINITIONS
 * Sistema de salas do templo com mecânicas de adjacência
 */

export const ROOM_TYPES = {
    // === TIER 1: COMBATE ===
    GARRISON: {
        id: 'garrison',
        name: 'Guarnição',
        tier: 1,
        category: 'combat',
        description: 'Quartéis de soldados Vaal. Monstros comuns.',
        icon: '🛡️',
        color: '#ef4444', // red
        rewards: ['gold', 'weapons'],
        adjacencyBonus: {
            receivesFrom: ['commander'], // Recebe boost de Commander
            givesTo: [] // Não dá boost para ninguém
        },
        levelEffects: {
            1: { monsters: 'Guardas Vaal (Normal)', quantity: 3, difficulty: 1 },
            2: { monsters: 'Sentinelas Vaal (Veteranos)', quantity: 5, difficulty: 2 },
            3: { monsters: 'Elite Vaal (Comandantes)', quantity: 7, difficulty: 3 }
        }
    },

    COMMANDER: {
        id: 'commander',
        name: 'Quartel do Comandante',
        tier: 1,
        category: 'combat',
        description: 'Centro de comando militar. Fortalece guarnições vizinhas.',
        icon: '⚔️',
        color: '#dc2626', // darker red
        rewards: ['rare_weapons', 'armor'],
        adjacencyBonus: {
            receivesFrom: [],
            givesTo: ['garrison'] // Dá boost para Garrison
        },
        levelEffects: {
            1: { monsters: 'Comandante Júnior', quantity: 1, difficulty: 2 },
            2: { monsters: 'Comandante Veterano', quantity: 2, difficulty: 3 },
            3: { monsters: 'General Vaal', quantity: 1, difficulty: 5, bossDrop: true }
        }
    },

    // === TIER 2: CRAFTING ===
    FORGE: {
        id: 'forge',
        name: 'Forja Arcana',
        tier: 2,
        category: 'crafting',
        description: 'Forja de armas mágicas. Upgrade de equipamento.',
        icon: '🔥',
        color: '#f59e0b', // amber
        rewards: ['upgrade_weapon', 'enchant'],
        adjacencyBonus: {
            receivesFrom: ['generator'],
            givesTo: []
        },
        levelEffects: {
            1: { craft: 'Adicionar 1 stat aleatório a arma', monsters: 2 },
            2: { craft: 'Adicionar 2 stats aleatórios a arma', monsters: 3 },
            3: { craft: 'Reforjar arma com stats melhorados', monsters: 4 }
        }
    },

    GENERATOR: {
        id: 'generator',
        name: 'Gerador Arcano',
        tier: 2,
        category: 'utility',
        description: 'Alimenta salas vizinhas com energia arcana.',
        icon: '⚡',
        color: '#3b82f6', // blue
        rewards: ['mana_items'],
        adjacencyBonus: {
            receivesFrom: [],
            givesTo: ['forge', 'corruption']
        },
        levelEffects: {
            1: { power: 'Boost +1 nível em salas adjacentes' },
            2: { power: 'Boost +2 níveis em salas adjacentes' },
            3: { power: 'Boost máximo em salas adjacentes' }
        }
    },

    // === TIER 3: ESPECIAL ===
    CORRUPTION: {
        id: 'corruption',
        name: 'Câmara de Corrupção',
        tier: 3,
        category: 'special',
        description: 'Corrompe itens para poder supremo ou destruição.',
        icon: '💀',
        color: '#8b5cf6', // purple
        rewards: ['corrupted_items'],
        adjacencyBonus: {
            receivesFrom: ['generator', 'sacrifice'],
            givesTo: []
        },
        levelEffects: {
            1: { craft: 'Corromper item (50% falha)', risk: 0.5 },
            2: { craft: 'Corromper item (30% falha)', risk: 0.3 },
            3: { craft: 'Corrupção Dupla (10% falha)', risk: 0.1, special: true }
        }
    },

    SACRIFICE: {
        id: 'sacrifice',
        name: 'Altar de Sacrifício',
        tier: 2,
        category: 'special',
        description: 'Sacrifique items por favor dos deuses.',
        icon: '🩸',
        color: '#991b1b', // dark red
        rewards: ['rare_currency'],
        adjacencyBonus: {
            receivesFrom: [],
            givesTo: ['corruption']
        },
        levelEffects: {
            1: { craft: 'Sacrificar item comum por gold' },
            2: { craft: 'Sacrificar item raro por gema' },
            3: { craft: 'Sacrificar item único por artefato' }
        }
    },

    // === TIER 1: ECONOMIA ===
    STORAGE: {
        id: 'storage',
        name: 'Armazém',
        tier: 1,
        category: 'economy',
        description: 'Depósito de recursos. Mais loot ao completar.',
        icon: '📦',
        color: '#059669', // green
        rewards: ['materials', 'gold'],
        adjacencyBonus: {
            receivesFrom: ['treasury'],
            givesTo: []
        },
        levelEffects: {
            1: { loot: 'Pequena quantidade de recursos' },
            2: { loot: 'Média quantidade de recursos' },
            3: { loot: 'Grande quantidade de recursos' }
        }
    },

    TREASURY: {
        id: 'treasury',
        name: 'Tesouro',
        tier: 2,
        category: 'economy',
        description: 'Cofres de ouro. Multiplica recompensas.',
        icon: '💰',
        color: '#ca8a04', // gold
        rewards: ['gold', 'currency'],
        adjacencyBonus: {
            receivesFrom: [],
            givesTo: ['storage']
        },
        levelEffects: {
            1: { goldMultiplier: 1.5 },
            2: { goldMultiplier: 2.0 },
            3: { goldMultiplier: 3.0 }
        }
    },

    // Sala vazia (slot não ocupado)
    EMPTY: {
        id: 'empty',
        name: 'Sala Vazia',
        tier: 0,
        category: 'empty',
        description: 'Um espaço vazio esperando para ser preenchido.',
        icon: '⬜',
        color: '#374151', // gray
        rewards: [],
        adjacencyBonus: { receivesFrom: [], givesTo: [] },
        levelEffects: {}
    }
};

// Pool de salas que podem aparecer nas incursões
export const AVAILABLE_ROOM_POOL = [
    'garrison',
    'commander',
    'forge',
    'generator',
    'corruption',
    'sacrifice',
    'storage',
    'treasury'
];

// Entrada do templo (sempre presente)
export const ENTRANCE_ROOM = {
    id: 'entrance',
    name: 'Entrada',
    tier: 0,
    category: 'entrance',
    description: 'Portal para o presente. Início da jornada.',
    icon: '🚪',
    color: '#22c55e',
    fixed: true
};

