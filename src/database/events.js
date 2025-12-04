/**
 * EVENTS DATABASE
 * Sistema de eventos procedurais para exploração
 * 
 * Tipos: minor (comum), unique (único), boss (chefe)
 * Triggers: exploration, combat, npc-interaction
 */

const EVENTS_CATALOG = [
    {
        id: 'evt_torch',
        type: 'minor',
        floor: 1,
        description: "Você encontra uma tocha esquisita",
        trigger: 'exploration',
        outcome: "A tocha ilumina seu caminho, revelando um baú escondido contendo 3 de ouro.",
        reward: { gold: 3 },
        penalty: null,
        probability: 0.3,
        repeatable: true,
        cooldown: 0,
        special_conditions: null,
        npc_involved: null,
        item_involved: "tocha",
        time_limit: null,
        location_specific: false,
        quest_related: false,
        difficulty_level: null
    },
    {
        id: 'evt_skeletons',
        type: 'minor',
        floor: 1,
        description: "Um trio de esqueletos guerreiros aparece de repente",
        trigger: 'combat',
        outcome: "Você derrota os esqueletos!",
        reward: "random",
        penalty: null,
        probability: 0.2,
        repeatable: true,
        cooldown: 5,
        special_conditions: null,
        npc_involved: "trio de esqueletos guerreiros",
        item_involved: "poção de cura",
        time_limit: null,
        location_specific: [3, 6, 9],
        quest_related: false,
        difficulty_level: "médio"
    },
    {
        id: 'evt_alchemist',
        type: 'unique',
        floor: 1,
        description: "Você encontra um velho alquimista que oferece uma receita rara",
        trigger: 'npc-interaction',
        outcome: "O alquimista ensina você a criar uma poção de cura maior em troca de 50 de ouro.",
        reward: { recipe: "greater_healing_potion" },
        penalty: { gold: 50 },
        probability: 0.1,
        repeatable: false,
        cooldown: null,
        special_conditions: null,
        npc_involved: "velho alquimista",
        item_involved: "receita de poção de cura maior",
        time_limit: null,
        location_specific: [9],
        quest_related: false,
        difficulty_level: null
    },
    {
        id: 'evt_silence',
        type: 'minor',
        floor: 1,
        description: "O corredor está silencioso e úmido.",
        trigger: 'exploration',
        outcome: "Nada acontece.",
        reward: null,
        penalty: null,
        probability: 0.4,
        repeatable: true,
        cooldown: 0,
        special_conditions: null,
        npc_involved: null,
        item_involved: null,
        time_limit: null,
        location_specific: false,
        quest_related: false,
        difficulty_level: null
    }
];

// ===== API FUNCTIONS =====
const EventsDB = {
    getById: (id) => EVENTS_CATALOG.find(event => event.id === id),
    getByFloor: (floor) => EVENTS_CATALOG.filter(event => event.floor === floor),
    getByType: (type) => EVENTS_CATALOG.filter(event => event.type === type),
    getByTrigger: (trigger) => EVENTS_CATALOG.filter(event => event.trigger === trigger),
    getAll: () => EVENTS_CATALOG,
    getRandom: (floor, corridor = null) => {
        let pool = EVENTS_CATALOG.filter(event => event.floor === floor && event.repeatable);
        
        // Filter by corridor if location-specific events exist
        if (corridor) {
            const specificEvents = pool.filter(e => 
                e.location_specific && 
                Array.isArray(e.location_specific) && 
                e.location_specific.includes(corridor)
            );
            if (specificEvents.length > 0) return specificEvents[Math.floor(Math.random() * specificEvents.length)];
        }
        
        // Weighted random by probability
        const roll = Math.random();
        let cumulative = 0;
        
        for (let event of pool) {
            cumulative += event.probability;
            if (roll <= cumulative) return event;
        }
        
        return pool[0]; // Fallback
    }
};

export default EventsDB;
export { EVENTS_CATALOG };

