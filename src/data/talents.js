export const TALENT_DATA = {
    combat: {
        id: 'combat',
        name: 'Senhor da Guerra',
        talents: [
            // Tier 1 (1 Node - Root)
            { id: 'c1', tier: 1, name: 'Início', type: 'passive', description: 'O começo de tudo', cost: 1, req: null, stats: { str: 1 } },

            // Tier 2 (3 Nodes)
            { id: 'c2a', tier: 2, name: 'Força Bruta', type: 'passive', description: '+Força', cost: 1, req: 'c1', stats: { str: 5 }, choiceGroup: 'c2' },
            { id: 'c2b', tier: 2, name: 'Agilidade', type: 'passive', description: '+Agilidade', cost: 1, req: 'c1', stats: { dex: 5 }, choiceGroup: 'c2' },
            { id: 'c2c', tier: 2, name: 'Vigor', type: 'passive', description: '+Vigor', cost: 1, req: 'c1', stats: { vig: 5 }, choiceGroup: 'c2' },

            // Tier 3 (5 Nodes)
            { id: 'c3a', tier: 3, name: 'Ataque 1', type: 'active', description: 'Dano Físico', cost: 1, req: ['c2a', 'c2b', 'c2c'], skillId: 'atk1', choiceGroup: 'c3' },
            { id: 'c3b', tier: 3, name: 'Defesa 1', type: 'active', description: 'Buff Defesa', cost: 1, req: ['c2a', 'c2b', 'c2c'], skillId: 'def1', choiceGroup: 'c3' },
            { id: 'c3c', tier: 3, name: 'Foco', type: 'passive', description: '+Crítico', cost: 1, req: ['c2a', 'c2b', 'c2c'], stats: { crit: 5 }, choiceGroup: 'c3' },
            { id: 'c3d', tier: 3, name: 'Esquiva', type: 'passive', description: '+Esquiva', cost: 1, req: ['c2a', 'c2b', 'c2c'], stats: { dodge: 5 }, choiceGroup: 'c3' },
            { id: 'c3e', tier: 3, name: 'Regen', type: 'passive', description: '+Regen HP', cost: 1, req: ['c2a', 'c2b', 'c2c'], stats: { regen: 2 }, choiceGroup: 'c3' },

            // Tier 4 (8 Nodes - MAX WIDTH TEST)
            { id: 'c4a', tier: 4, name: 'Espada', type: 'passive', description: 'Mestre Espada', cost: 1, req: ['c3a', 'c3b', 'c3c', 'c3d', 'c3e'], stats: { dmg: 5 }, choiceGroup: 'c4' },
            { id: 'c4b', tier: 4, name: 'Machado', type: 'passive', description: 'Mestre Machado', cost: 1, req: ['c3a', 'c3b', 'c3c', 'c3d', 'c3e'], stats: { dmg: 5 }, choiceGroup: 'c4' },
            { id: 'c4c', tier: 4, name: 'Lança', type: 'passive', description: 'Mestre Lança', cost: 1, req: ['c3a', 'c3b', 'c3c', 'c3d', 'c3e'], stats: { dmg: 5 }, choiceGroup: 'c4' },
            { id: 'c4d', tier: 4, name: 'Maça', type: 'passive', description: 'Mestre Maça', cost: 1, req: ['c3a', 'c3b', 'c3c', 'c3d', 'c3e'], stats: { dmg: 5 }, choiceGroup: 'c4' },
            { id: 'c4e', tier: 4, name: 'Adaga', type: 'passive', description: 'Mestre Adaga', cost: 1, req: ['c3a', 'c3b', 'c3c', 'c3d', 'c3e'], stats: { dmg: 5 }, choiceGroup: 'c4' },
            { id: 'c4f', tier: 4, name: 'Escudo', type: 'passive', description: 'Mestre Escudo', cost: 1, req: ['c3a', 'c3b', 'c3c', 'c3d', 'c3e'], stats: { def: 5 }, choiceGroup: 'c4' },
            { id: 'c4g', tier: 4, name: 'Arco', type: 'passive', description: 'Mestre Arco', cost: 1, req: ['c3a', 'c3b', 'c3c', 'c3d', 'c3e'], stats: { dmg: 5 }, choiceGroup: 'c4' },
            { id: 'c4h', tier: 4, name: 'Besta', type: 'passive', description: 'Mestre Besta', cost: 1, req: ['c3a', 'c3b', 'c3c', 'c3d', 'c3e'], stats: { dmg: 5 }, choiceGroup: 'c4' },

            // Tier 5 (5 Nodes)
            { id: 'c5a', tier: 5, name: 'Elite 1', type: 'active', description: 'Skill Elite', cost: 1, req: ['c4a', 'c4b', 'c4c', 'c4d', 'c4e', 'c4f', 'c4g', 'c4h'], skillId: 'elite1', choiceGroup: 'c5' },
            { id: 'c5b', tier: 5, name: 'Elite 2', type: 'active', description: 'Skill Elite', cost: 1, req: ['c4a', 'c4b', 'c4c', 'c4d', 'c4e', 'c4f', 'c4g', 'c4h'], skillId: 'elite2', choiceGroup: 'c5' },
            { id: 'c5c', tier: 5, name: 'Elite 3', type: 'active', description: 'Skill Elite', cost: 1, req: ['c4a', 'c4b', 'c4c', 'c4d', 'c4e', 'c4f', 'c4g', 'c4h'], skillId: 'elite3', choiceGroup: 'c5' },
            { id: 'c5d', tier: 5, name: 'Elite 4', type: 'active', description: 'Skill Elite', cost: 1, req: ['c4a', 'c4b', 'c4c', 'c4d', 'c4e', 'c4f', 'c4g', 'c4h'], skillId: 'elite4', choiceGroup: 'c5' },
            { id: 'c5e', tier: 5, name: 'Elite 5', type: 'active', description: 'Skill Elite', cost: 1, req: ['c4a', 'c4b', 'c4c', 'c4d', 'c4e', 'c4f', 'c4g', 'c4h'], skillId: 'elite5', choiceGroup: 'c5' },

            // Tier 6 (3 Nodes)
            { id: 'c6a', tier: 6, name: 'Lenda 1', type: 'passive', description: 'Passiva Lendária', cost: 1, req: ['c5a', 'c5b', 'c5c', 'c5d', 'c5e'], stats: { all: 10 }, choiceGroup: 'c6' },
            { id: 'c6b', tier: 6, name: 'Lenda 2', type: 'passive', description: 'Passiva Lendária', cost: 1, req: ['c5a', 'c5b', 'c5c', 'c5d', 'c5e'], stats: { all: 10 }, choiceGroup: 'c6' },
            { id: 'c6c', tier: 6, name: 'Lenda 3', type: 'passive', description: 'Passiva Lendária', cost: 1, req: ['c5a', 'c5b', 'c5c', 'c5d', 'c5e'], stats: { all: 10 }, choiceGroup: 'c6' },

            // Tier 7 (1 Node - Ultimate)
            { id: 'c7', tier: 7, name: 'DEUS DA GUERRA', type: 'active', description: 'PODER SUPREMO', cost: 1, req: ['c6a', 'c6b', 'c6c'], skillId: 'god_mode' }
        ]
    },
    survival: {
        id: 'survival',
        name: 'Guardião',
        talents: [
            // Tier 1
            { id: 's1', tier: 1, name: 'Pele de Ferro', type: 'passive', description: '+3 Defesa', cost: 1, req: null, stats: { def: 3 } },
            // Tier 2
            { id: 's2a', tier: 2, name: 'Vontade de Ferro', type: 'passive', description: '+50 Vida Máxima', cost: 1, req: 's1', stats: { maxHp: 50 }, choiceGroup: 's2' },
            { id: 's2b', tier: 2, name: 'Reflexos', type: 'passive', description: '+5% Esquiva', cost: 1, req: 's1', stats: { dodge: 5 }, choiceGroup: 's2' },
            // Tier 3 (Split 4)
            { id: 's3a', tier: 3, name: 'Sangue de Troll', type: 'passive', description: '+5 HP/Turno', cost: 1, req: ['s2a', 's2b'], effect: 'regen_5', choiceGroup: 's3' },
            { id: 's3b', tier: 3, name: 'Escudo de Espinhos', type: 'passive', description: 'Reflete 10% do Dano', cost: 1, req: ['s2a', 's2b'], effect: 'reflect_10', choiceGroup: 's3' },
            { id: 's3c', tier: 3, name: 'Pele de Pedra', type: 'passive', description: '-5 Dano Recebido', cost: 1, req: ['s2a', 's2b'], effect: 'flat_dr_5', choiceGroup: 's3' },
            { id: 's3d', tier: 3, name: 'Constituição', type: 'passive', description: '+100 HP', cost: 1, req: ['s2a', 's2b'], stats: { maxHp: 100 }, choiceGroup: 's3' },
            // Tier 4 (Merge 2)
            { id: 's4a', tier: 4, name: 'Imortalidade', type: 'active', description: 'Invulnerável 1 turno', cost: 1, req: ['s3a', 's3b', 's3c', 's3d'], skillId: 'immortality', choiceGroup: 's4' },
            { id: 's4b', tier: 4, name: 'Último Suspiro', type: 'passive', description: 'Cura ao morrer (CD)', cost: 1, req: ['s3a', 's3b', 's3c', 's3d'], effect: 'revive', choiceGroup: 's4' },
            // Tier 5 (Split 4)
            { id: 's5a', tier: 5, name: 'Res. Fogo', type: 'passive', description: '+50% Res. Fogo', cost: 1, req: ['s4a', 's4b'], stats: { resFire: 50 }, choiceGroup: 's5' },
            { id: 's5b', tier: 5, name: 'Res. Gelo', type: 'passive', description: '+50% Res. Gelo', cost: 1, req: ['s4a', 's4b'], stats: { resIce: 50 }, choiceGroup: 's5' },
            { id: 's5c', tier: 5, name: 'Res. Raio', type: 'passive', description: '+50% Res. Raio', cost: 1, req: ['s4a', 's4b'], stats: { resLightning: 50 }, choiceGroup: 's5' },
            { id: 's5d', tier: 5, name: 'Res. Veneno', type: 'passive', description: '+50% Res. Veneno', cost: 1, req: ['s4a', 's4b'], stats: { resPoison: 50 }, choiceGroup: 's5' },
            // Tier 6
            { id: 's6', tier: 6, name: 'Juggernaut', type: 'passive', description: 'Imparável', cost: 1, req: ['s5a', 's5b', 's5c', 's5d'], effect: 'unstoppable' }
        ]
    },
    arcane: {
        id: 'arcane',
        name: 'Arquimago',
        talents: [
            // Tier 1
            { id: 'a1', tier: 1, name: 'Estudos Antigos', type: 'passive', description: '+10% XP', cost: 1, req: null, effect: 'xp_10' },
            // Tier 2
            { id: 'a2a', tier: 2, name: 'Bola de Fogo', type: 'active', description: 'Dano Fogo', cost: 1, req: 'a1', skillId: 'fireball', choiceGroup: 'a2' },
            { id: 'a2b', tier: 2, name: 'Seta de Gelo', type: 'active', description: 'Dano Gelo', cost: 1, req: 'a1', skillId: 'frostbolt', choiceGroup: 'a2' },
            // Tier 3 (Split 4)
            { id: 'a3a', tier: 3, name: 'Destruição', type: 'passive', description: '+20% Dano', cost: 1, req: ['a2a', 'a2b'], stats: { magicDmg: 20 }, choiceGroup: 'a3' },
            { id: 'a3b', tier: 3, name: 'Controle', type: 'passive', description: '+5 Mana/Turno', cost: 1, req: ['a2a', 'a2b'], effect: 'mana_regen_5', choiceGroup: 'a3' },
            { id: 'a3c', tier: 3, name: 'Invocação', type: 'passive', description: 'Minions +1 turno', cost: 1, req: ['a2a', 'a2b'], effect: 'minion_duration', choiceGroup: 'a3' },
            { id: 'a3d', tier: 3, name: 'Alquimia', type: 'passive', description: 'Poções +50%', cost: 1, req: ['a2a', 'a2b'], effect: 'potion_boost', choiceGroup: 'a3' },
            // Tier 4 (Merge 2)
            { id: 'a4a', tier: 4, name: 'Apocalipse', type: 'active', description: 'Dano Massivo', cost: 1, req: ['a3a', 'a3b', 'a3c', 'a3d'], skillId: 'apocalypse', choiceGroup: 'a4' },
            { id: 'a4b', tier: 4, name: 'Buraco Negro', type: 'active', description: 'Sugada Gravitacional', cost: 1, req: ['a3a', 'a3b', 'a3c', 'a3d'], skillId: 'blackhole', choiceGroup: 'a4' },
            // Tier 5 (Split 4)
            { id: 'a5a', tier: 5, name: 'Mestre do Fogo', type: 'passive', description: 'Queimadura', cost: 1, req: ['a4a', 'a4b'], effect: 'burn_dot', choiceGroup: 'a5' },
            { id: 'a5b', tier: 5, name: 'Mestre do Gelo', type: 'passive', description: 'Congelamento', cost: 1, req: ['a4a', 'a4b'], effect: 'freeze_stun', choiceGroup: 'a5' },
            { id: 'a5c', tier: 5, name: 'Mestre do Raio', type: 'passive', description: 'Ricochete', cost: 1, req: ['a4a', 'a4b'], effect: 'chain_lightning', choiceGroup: 'a5' },
            { id: 'a5d', tier: 5, name: 'Mestre Arcano', type: 'passive', description: 'Dano Puro', cost: 1, req: ['a4a', 'a4b'], effect: 'true_dmg', choiceGroup: 'a5' },
            // Tier 6
            { id: 'a6', tier: 6, name: 'Arquimago Supremo', type: 'active', description: 'Zero Cooldown', cost: 1, req: ['a5a', 'a5b', 'a5c', 'a5d'], skillId: 'omniscience' }
        ]
    }
};

