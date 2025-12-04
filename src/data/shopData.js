import { Sword, Shield, Hammer, Axe, Wand2, Sparkles } from 'lucide-react';

export const GRISWOLD_SHOP = [
    {
        id: 'iron_sword',
        name: 'Espada de Ferro',
        type: 'Arma',
        rarity: 'common',
        value: 100,
        description: 'Uma espada simples, mas confiável.',
        stats: { atk: 5 },
        icon: Sword
    },
    {
        id: 'iron_shield',
        name: 'Escudo de Ferro',
        type: 'Escudo',
        rarity: 'common',
        value: 80,
        description: 'Proteção básica contra golpes.',
        stats: { def: 5 },
        icon: Shield
    },
    {
        id: 'chainmail',
        name: 'Cota de Malha',
        type: 'Armadura',
        rarity: 'uncommon',
        value: 250,
        description: 'Elos de aço entrelaçados para maior defesa.',
        stats: { def: 10, vig: 2 },
        icon: Shield // Using Shield icon as placeholder for Armor if needed, or generic
    },
    {
        id: 'warhammer',
        name: 'Martelo de Guerra',
        type: 'Arma',
        rarity: 'uncommon',
        value: 300,
        description: 'Esmaga ossos e armaduras com facilidade.',
        stats: { atk: 12, spd: -2 },
        icon: Hammer
    },
    {
        id: 'battle_axe',
        name: 'Machado de Batalha',
        type: 'Arma',
        rarity: 'rare',
        value: 500,
        description: 'Uma lâmina pesada para guerreiros fortes.',
        stats: { atk: 15, str: 5 },
        icon: Axe
    }
];

export const PEPIN_SHOP = [
    {
        id: 'health_potion',
        name: 'Poção de Vida Menor',
        type: 'Poção',
        rarity: 'common',
        value: 50,
        description: 'Recupera 50 pontos de vida instantaneamente.',
        stats: { heal: 50 },
        icon: null // Will use default Flask icon if null, or import FlaskConical
    },
    {
        id: 'mana_potion',
        name: 'Poção de Mana Menor',
        type: 'Poção',
        rarity: 'common',
        value: 50,
        description: 'Restaura 30 pontos de mana.',
        stats: { mana: 30 },
        icon: null
    },
    {
        id: 'elixir_strength',
        name: 'Elixir de Força',
        type: 'Elixir',
        rarity: 'uncommon',
        value: 150,
        description: '+5 Força por 10 minutos.',
        stats: { str: 5 },
        icon: null
    },
    {
        id: 'antidote',
        name: 'Antídoto',
        type: 'Consumível',
        rarity: 'common',
        value: 30,
        description: 'Cura envenenamento.',
        stats: {},
        icon: null
    },
    {
        id: 'town_portal',
        name: 'Pergaminho de Portal',
        type: 'Consumível',
        rarity: 'rare',
        value: 200,
        description: 'Retorna para a vila instantaneamente.',
        stats: {},
        icon: null
    }
];

export const AKARA_SHOP = [
    // Varinhas (Wands)
    {
        id: 'apprentice_wand',
        name: 'Varinha do Aprendiz',
        type: 'Varinha',
        rarity: 'common',
        value: 120,
        description: 'Uma varinha simples para iniciantes em magia.',
        stats: { int: 3, mana: 10 },
        icon: Wand2
    },
    {
        id: 'bone_wand',
        name: 'Varinha de Osso',
        type: 'Varinha',
        rarity: 'uncommon',
        value: 280,
        description: 'Esculpida em osso de demônio, canaliza energia sombria.',
        stats: { int: 6, mana: 20, atk: 3 },
        icon: Wand2
    },
    {
        id: 'crystal_wand',
        name: 'Varinha Cristalina',
        type: 'Varinha',
        rarity: 'rare',
        value: 520,
        description: 'Cristais arcanos amplificam o poder mágico.',
        stats: { int: 10, mana: 35, atk: 5 },
        icon: Wand2
    },
    
    // Cajados (Staffs)
    {
        id: 'oak_staff',
        name: 'Cajado de Carvalho',
        type: 'Cajado',
        rarity: 'common',
        value: 150,
        description: 'Madeira antiga imbuída com essência da natureza.',
        stats: { int: 5, mana: 15, def: 2 },
        icon: Sparkles
    },
    {
        id: 'serpent_staff',
        name: 'Cajado da Serpente',
        type: 'Cajado',
        rarity: 'uncommon',
        value: 350,
        description: 'Uma serpente de prata enrolada no topo, seus olhos brilham com poder.',
        stats: { int: 8, mana: 25, atk: 6, def: 3 },
        icon: Sparkles
    },
    {
        id: 'archmage_staff',
        name: 'Cajado do Arquimago',
        type: 'Cajado',
        rarity: 'rare',
        value: 680,
        description: 'Apenas os magos mais poderosos podem empunhar este artefato.',
        stats: { int: 15, mana: 50, atk: 10, def: 5 },
        icon: Sparkles
    },
    
    // Robes
    {
        id: 'linen_robe',
        name: 'Robe de Linho',
        type: 'Armadura',
        rarity: 'common',
        value: 100,
        description: 'Tecido leve que não restringe movimentos mágicos.',
        stats: { def: 3, mana: 10 },
        icon: Shield
    },
    {
        id: 'silk_robe',
        name: 'Robe de Seda',
        type: 'Armadura',
        rarity: 'uncommon',
        value: 240,
        description: 'Seda encantada com runas protetoras.',
        stats: { def: 6, int: 4, mana: 20 },
        icon: Shield
    },
    {
        id: 'arcane_robe',
        name: 'Robe Arcano',
        type: 'Armadura',
        rarity: 'rare',
        value: 480,
        description: 'Tecido impregnado com energia mágica pura.',
        stats: { def: 10, int: 8, mana: 35, mag: 5 },
        icon: Shield
    },
    
    // Túnicas
    {
        id: 'acolyte_tunic',
        name: 'Túnica do Acólito',
        type: 'Armadura',
        rarity: 'common',
        value: 90,
        description: 'Vestes simples dos iniciados da Irmandade.',
        stats: { def: 2, int: 2, mana: 15 },
        icon: Shield
    },
    {
        id: 'blessed_tunic',
        name: 'Túnica Abençoada',
        type: 'Armadura',
        rarity: 'uncommon',
        value: 220,
        description: 'Consagrada pela luz sagrada, repele o mal.',
        stats: { def: 5, int: 5, mana: 25, vig: 3 },
        icon: Shield
    },
    {
        id: 'celestial_tunic',
        name: 'Túnica Celestial',
        type: 'Armadura',
        rarity: 'rare',
        value: 550,
        description: 'Brilha com a luz dos céus, protege corpo e alma.',
        stats: { def: 12, int: 10, mana: 40, vig: 5, mag: 5 },
        icon: Shield
    }
];
