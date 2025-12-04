import { Sword, Shield, Hammer, Axe } from 'lucide-react';

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
