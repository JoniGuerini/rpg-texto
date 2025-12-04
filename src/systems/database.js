/**
 * DATABASE MANAGER
 * Sistema centralizado de dados do RPG Texto DG
 * 
 * Todas as entidades do jogo estão aqui.
 * Use as funções helper (DB.getItemById, etc) em vez de acessar diretamente.
 */

import enemiesData from '../data/enemies.json';
import eventsData from '../data/events.json';
import itemsData from '../data/items.json';
import { QUEST_DATA } from '../data/quests';
import { PROFESSIONS_DATA } from '../data/professions';
import { TALENT_DATA } from '../data/talents';

// ===== ITEMS =====
// Consolidate all items from different sources
const ITEMS_CATALOG = [
    ...itemsData,
    // Mining Items
    {
        id: 'coal',
        name: 'Carvão',
        type: 'Material',
        rarity: 'common',
        value: 5,
        description: 'Combustível essencial para a forja. Queima com chamas intensas.',
        stackable: true
    },
    {
        id: 'geode_common',
        name: 'Geodo Bruto',
        type: 'Material',
        rarity: 'uncommon',
        value: 50,
        description: 'Uma pedra misteriosa. Talvez contenha algo valioso dentro.',
        stackable: true
    },
    {
        id: 'gem_chip',
        name: 'Lasca de Rubi',
        type: 'Gema',
        rarity: 'rare',
        value: 120,
        description: 'Fragmento de uma gema preciosa. Usada em encantamentos.',
        stackable: true
    },
    {
        id: 'fossil',
        name: 'Fóssil Antigo',
        type: 'Artefato',
        rarity: 'rare',
        value: 200,
        description: 'Resquício de uma era esquecida. Alquimistas pagam bem por isso.',
        stackable: true
    },
    // Shop Items (Griswold)
    {
        id: 'iron_sword',
        name: 'Espada de Ferro',
        type: 'Arma',
        rarity: 'common',
        value: 100,
        description: 'Uma espada simples, mas confiável.',
        stats: { atk: 5 },
        stackable: false
    },
    {
        id: 'iron_shield',
        name: 'Escudo de Ferro',
        type: 'Escudo',
        rarity: 'common',
        value: 80,
        description: 'Proteção básica contra golpes.',
        stats: { def: 5 },
        stackable: false
    },
    {
        id: 'chainmail',
        name: 'Cota de Malha',
        type: 'Armadura',
        rarity: 'uncommon',
        value: 250,
        description: 'Elos de aço entrelaçados para maior defesa.',
        stats: { def: 10, vig: 2 },
        stackable: false
    },
    {
        id: 'warhammer',
        name: 'Martelo de Guerra',
        type: 'Arma',
        rarity: 'uncommon',
        value: 300,
        description: 'Esmaga ossos e armaduras com facilidade.',
        stats: { atk: 12, spd: -2 },
        stackable: false
    },
    {
        id: 'battle_axe',
        name: 'Machado de Batalha',
        type: 'Arma',
        rarity: 'rare',
        value: 500,
        description: 'Uma lâmina pesada para guerreiros fortes.',
        stats: { atk: 15, str: 5 },
        stackable: false
    },
    // Shop Items (Pepin)
    {
        id: 'health_potion',
        name: 'Poção de Vida Menor',
        type: 'Poção',
        rarity: 'common',
        value: 50,
        description: 'Recupera 50 pontos de vida instantaneamente.',
        stats: { heal: 50 },
        stackable: true
    },
    {
        id: 'mana_potion',
        name: 'Poção de Mana Menor',
        type: 'Poção',
        rarity: 'common',
        value: 50,
        description: 'Restaura 30 pontos de mana.',
        stats: { mana: 30 },
        stackable: true
    },
    {
        id: 'elixir_strength',
        name: 'Elixir de Força',
        type: 'Elixir',
        rarity: 'uncommon',
        value: 150,
        description: '+5 Força por 10 minutos.',
        stats: { str: 5 },
        stackable: true
    },
    {
        id: 'antidote',
        name: 'Antídoto',
        type: 'Consumível',
        rarity: 'common',
        value: 30,
        description: 'Cura envenenamento.',
        stats: {},
        stackable: true
    },
    {
        id: 'town_portal',
        name: 'Pergaminho de Portal',
        type: 'Consumível',
        rarity: 'rare',
        value: 200,
        description: 'Retorna para a vila instantaneamente.',
        stats: {},
        stackable: true
    }
];

// ===== ENEMIES =====
const ENEMIES_CATALOG = enemiesData;

// ===== EVENTS =====
const EVENTS_CATALOG = eventsData;

// ===== QUESTS =====
const QUESTS_CATALOG = QUEST_DATA;

// ===== PROFESSIONS =====
const PROFESSIONS_CATALOG = PROFESSIONS_DATA;

// ===== TALENTS =====
const TALENTS_CATALOG = TALENT_DATA;

// ===== NPCS =====
const NPCS_CATALOG = {
    griswold: {
        id: 'griswold',
        name: 'Griswold',
        title: 'Ferreiro Mestre',
        faction: 'Tristram',
        location: 'blacksmith_forge',
        greeting: 'Ah, um aventureiro! O aço nunca mente, ao contrário das pessoas.',
        stories: [
            "Você ouviu? Gritos vindos das profundezas da Catedral. Até o aço treme com isso.",
            "O Rei Leoric... eu fiz a armadura dele. Era uma obra de arte. Agora, serve a um propósito muito mais sombrio.",
            "Minha forja não é apenas para armas. O fogo purifica. O fogo renova. Lembre-se disso quando estiver lá embaixo.",
            "Dizem que o Arcebispo Lazarus levou o príncipe Albrecht para as catacumbas. Loucura, pura loucura.",
            "Cuidado com o Açougueiro. Ele tem um gosto particular por... carne fresca."
        ]
    },
    thomas: {
        id: 'thomas',
        name: 'Thomas',
        title: 'Ajudante do Ferreiro',
        faction: 'Tristram',
        location: 'blacksmith_forge',
        greeting: 'O Mestre Griswold está muito ocupado... posso ajudar com compras?',
        stories: [
            "O Mestre está estranho ultimamente. Fica murmurando para as chamas.",
            "Eu vi uma pedra vermelha brilhando na testa de um viajante... me deu arrepios.",
            "Se você trouxer metal bom, talvez o Mestre deixe eu tentar forjar algo.",
            "Não conte pro Griswold, mas eu perdi o martelo favorito dele semana passada."
        ]
    },
    akara: {
        id: 'akara',
        name: 'Akara',
        title: 'Sacerdotisa da Luz',
        faction: 'Irmandade do Olho Cego',
        location: 'healer_hut',
        greeting: 'A luz sagrada brilha sobre você, viajante. Mas cuidado, as sombras são longas.',
        stories: [
            "Sinto uma perturbação no éter mágico. Algo antigo e maligno despertou.",
            "A Irmandade do Olho Cego costumava proteger este lugar. Agora, restam apenas algumas de nós.",
            "Não subestime o poder da fé. Às vezes, é o único escudo que resta contra a escuridão.",
            "Vi corvos pousando no cemitério. Um mau presságio. A morte caminha entre nós."
        ]
    },
    pepin: {
        id: 'pepin',
        name: 'Pepin',
        title: 'Alquimista Erudito',
        faction: 'Tristram',
        location: 'alchemist_lab',
        greeting: 'Poções, elixires... a ciência pode resolver o que a espada não consegue.',
        stories: [
            "Estou trabalhando em uma mistura para curar a podridão, mas os ingredientes são... difíceis de encontrar.",
            "Você viu cogumelos negros lá embaixo? Eles têm propriedades fascinantes se preparados corretamente.",
            "A água do poço ficou escura. Receio que o mal esteja envenenando a própria terra.",
            "Se encontrar um tomo antigo, traga para mim. O conhecimento é a arma mais afiada."
        ]
    }
};

// ===== HELPER FUNCTIONS (API) =====

export const DB = {
    // --- ITEMS ---
    getItemById: (id) => {
        return ITEMS_CATALOG.find(item => item.id === id);
    },
    getItemsByType: (type) => {
        return ITEMS_CATALOG.filter(item => item.type === type);
    },
    getItemsByRarity: (rarity) => {
        return ITEMS_CATALOG.filter(item => item.rarity === rarity);
    },
    getAllItems: () => {
        return ITEMS_CATALOG;
    },

    // --- ENEMIES ---
    getEnemyById: (id) => {
        return ENEMIES_CATALOG.find(enemy => enemy.id === id);
    },
    getEnemiesByLevel: (level) => {
        return ENEMIES_CATALOG.filter(enemy => enemy.level === level && !enemy.isBoss && !enemy.isMiniBoss);
    },
    getBosses: () => {
        return ENEMIES_CATALOG.filter(enemy => enemy.isBoss);
    },
    getMiniBosses: () => {
        return ENEMIES_CATALOG.filter(enemy => enemy.isMiniBoss);
    },
    getAllEnemies: () => {
        return ENEMIES_CATALOG;
    },

    // --- EVENTS ---
    getEventsByFloor: (floor) => {
        return EVENTS_CATALOG.filter(event => event.floor === floor);
    },
    getEventByType: (type) => {
        return EVENTS_CATALOG.filter(event => event.type === type);
    },
    getAllEvents: () => {
        return EVENTS_CATALOG;
    },

    // --- QUESTS ---
    getQuestById: (id) => {
        return QUESTS_CATALOG[id];
    },
    getQuestsByTier: (tier) => {
        return Object.values(QUESTS_CATALOG).filter(quest => quest.tier === tier);
    },
    getAllQuests: () => {
        return QUESTS_CATALOG;
    },

    // --- PROFESSIONS ---
    getProfessionById: (id) => {
        return PROFESSIONS_CATALOG[id];
    },
    getAllProfessions: () => {
        return PROFESSIONS_CATALOG;
    },

    // --- TALENTS ---
    getTalentTreeById: (id) => {
        return TALENTS_CATALOG[id];
    },
    getAllTalentTrees: () => {
        return TALENTS_CATALOG;
    },

    // --- NPCS ---
    getNPCById: (id) => {
        return NPCS_CATALOG[id];
    },
    getNPCsByLocation: (location) => {
        return Object.values(NPCS_CATALOG).filter(npc => npc.location === location);
    },
    getAllNPCs: () => {
        return NPCS_CATALOG;
    }
};

// Export raw catalogs if needed (for Documentation, etc)
export { ITEMS_CATALOG, ENEMIES_CATALOG, EVENTS_CATALOG, QUESTS_CATALOG, PROFESSIONS_CATALOG, TALENTS_CATALOG, NPCS_CATALOG };

