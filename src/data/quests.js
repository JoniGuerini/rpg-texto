export const QUEST_DATA = {
    // --- TIER 1: INICIANTE ---
    'q1': {
        id: 'q1',
        title: "Limpeza nos Esgotos",
        description: "O vilarejo tem sofrido com ataques de ratos gigantes. Elimine a praga.",
        tier: 1,
        type: 'kill',
        target: 'Rato Gigante',
        amountRequired: 5,
        reward: { xp: 100, gold: 50, item: null }
    },
    'q2': {
        id: 'q2',
        title: "O Pergaminho Perdido",
        description: "Um estudioso perdeu um pergaminho antigo no segundo andar. Encontre-o.",
        tier: 1,
        type: 'collect',
        target: 'Pergaminho Antigo',
        amountRequired: 1,
        reward: { 
            xp: 200, 
            gold: 0, 
            item: { name: "Anel de Sabedoria", rarity: "rare", type: "Acessório", value: 200, description: "Um anel que pulsa com luz azul.", stats: { mana: 20, magic: 5 } } 
        }
    },
    'q4': {
        id: 'q4',
        title: "Ameaça Goblin",
        description: "Batedores goblins foram vistos na orla da floresta. Elimine-os antes que se agrupem.",
        tier: 1,
        type: 'kill',
        target: 'Goblin Batedor',
        amountRequired: 8,
        reward: { xp: 150, gold: 80, item: null }
    },
    'q5': {
        id: 'q5',
        title: "Ervas Medicinais",
        description: "A curandeira precisa de ervas raras para fazer poções.",
        tier: 1,
        type: 'collect',
        target: 'Raiz de Sangue',
        amountRequired: 3,
        reward: { xp: 100, gold: 30, item: { name: "Poção de Cura Maior", rarity: "uncommon", type: "Consumível", value: 50, stats: { heal: 100 } } }
    },

    // --- TIER 2: INTERMEDIÁRIO ---
    'q6': {
        id: 'q6',
        title: "O Chefe dos Bandidos",
        description: "Um grupo de bandidos montou acampamento no 3º andar. Elimine o líder deles.",
        tier: 2,
        type: 'kill',
        target: 'Líder Bandido',
        amountRequired: 1,
        reward: { 
            xp: 500, 
            gold: 300, 
            item: { name: "Adaga do Traidor", rarity: "rare", type: "Arma", value: 400, stats: { atk: 15, crit: 5 } } 
        }
    },
    'q7': {
        id: 'q7',
        title: "Caça aos Lobos",
        description: "Lobos Atrozes estão atacando caravanas. Reduza a matilha.",
        tier: 2,
        type: 'kill',
        target: 'Lobo Atroz',
        amountRequired: 10,
        reward: { xp: 400, gold: 150, item: null }
    },
    'q8': {
        id: 'q8',
        title: "Ferro Negro",
        description: "O ferreiro precisa de minério de Ferro Negro das cavernas para forjar armas melhores.",
        tier: 2,
        type: 'collect',
        target: 'Minério de Ferro Negro',
        amountRequired: 5,
        reward: { xp: 300, gold: 200, item: { name: "Escudo de Ferro Negro", rarity: "rare", type: "Escudo", value: 500, stats: { def: 20 } } }
    },

    // --- TIER 3: AVANÇADO ---
    'q9': {
        id: 'q9',
        title: "A Legião dos Mortos",
        description: "Esqueletos estão se erguendo nas criptas. Destrua-os.",
        tier: 3,
        type: 'kill',
        target: 'Guerreiro Esqueleto',
        amountRequired: 15,
        reward: { xp: 800, gold: 400, item: null }
    },
    'q10': {
        id: 'q10',
        title: "O Necromante",
        description: "A fonte da praga de mortos-vivos foi localizada. Elimine o Necromante Sombrio.",
        tier: 3,
        type: 'kill',
        target: 'Necromante',
        amountRequired: 1,
        reward: { 
            xp: 1500, 
            gold: 800, 
            item: { name: "Cajado de Ossos", rarity: "epic", type: "Cajado", value: 1200, stats: { magic: 25, mana: 50 } } 
        }
    },
    'q3': { // Original Boss Quest
        id: 'q3',
        title: "O Rei dos Esqueletos",
        description: "Dizem que um antigo rei habita as profundezas (Andar 5). Dê descanso a ele.",
        tier: 3,
        type: 'kill',
        target: 'Rei Esqueleto',
        amountRequired: 1,
        reward: {
            xp: 2000,
            gold: 1000,
            item: {
                name: "Coroa do Rei Morto",
                rarity: "unique",
                type: "Capacete",
                value: 2000,
                description: "A coroa de um rei esquecido.",
                stats: { def: 10, str: 10, vig: 10 }
            }
        }
    },

    // --- TIER 4: ELITE ---
    'q11': {
        id: 'q11',
        title: "Caçador de Demônios",
        description: "Diabretes escaparam de uma fenda. Mande-os de volta para o inferno.",
        tier: 4,
        type: 'kill',
        target: 'Diabrete',
        amountRequired: 20,
        reward: { xp: 2000, gold: 1000, item: null }
    },
    'q12': {
        id: 'q12',
        title: "O Lorde das Cinzas",
        description: "Um demônio maior surgiu no coração do vulcão. Esta é uma missão suicida.",
        tier: 4,
        type: 'kill',
        target: 'Lorde das Cinzas',
        amountRequired: 1,
        reward: { 
            xp: 10000, 
            gold: 5000, 
            item: { name: "Espada do Apocalipse", rarity: "unique", type: "Espada", value: 10000, stats: { atk: 100, str: 20 } } 
        }
    }
};

export const INITIAL_QUEST_STATE = {
    active: ['q1'], // Começa com a primeira quest
    completed: [],
    progress: {
        'q1': 0 // 0/5 mortos
    }
};
