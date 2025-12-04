export const PROFESSIONS_DATA = {
    alchemy: {
        id: 'alchemy',
        name: 'Alquimia',
        icon: 'FlaskConical', // Lucide icon name
        level: 1,
        maxLevel: 100,
        description: 'A arte de misturar ervas e reagentes para criar poções poderosas.',
        recipes: [
            {
                id: 'potion_small',
                name: 'Poção Pequena',
                category: 'Poções',
                description: 'Uma poção simples que recupera um pouco de vida.',
                rarity: 'common',
                difficulty: 10, // Skill level where it becomes yellow/green/grey? Or just difficulty rating
                reagents: [
                    { itemId: 'glycerin', name: 'Glicerina', count: 1 },
                    { itemId: 'herb_common', name: 'Erva Comum', count: 2 }
                ],
                result: { itemId: 'potion_small', count: 1 }
            },
            {
                id: 'potion_medium',
                name: 'Poção Média',
                category: 'Poções',
                description: 'Uma poção mais concentrada para ferimentos graves.',
                rarity: 'uncommon',
                difficulty: 25,
                reagents: [
                    { itemId: 'glycerin', name: 'Glicerina', count: 2 },
                    { itemId: 'herb_rare', name: 'Raiz Amarga', count: 1 }
                ],
                result: { itemId: 'potion_medium', count: 1 }
            }
        ],
        specializations: [
            {
                id: 'potions_mastery',
                name: 'Mestria em Poções',
                description: 'Aprimore suas habilidades na criação de poções de cura e mana.',
                nodes: [
                    // Root
                    { id: 'root', name: 'Mestre das Poções', x: 50, y: 15, maxPoints: 30, currentPoints: 0, icon: 'FlaskConical', parentId: null },

                    // Left Branch (Healing)
                    { id: 'healing_mastery', name: 'Vitalidade', x: 20, y: 45, maxPoints: 20, currentPoints: 0, icon: 'Heart', parentId: 'root' },
                    { id: 'regen', name: 'Regeneração', x: 10, y: 75, maxPoints: 10, currentPoints: 0, icon: 'Activity', parentId: 'healing_mastery' },
                    { id: 'instant_heal', name: 'Cura Instantânea', x: 30, y: 75, maxPoints: 10, currentPoints: 0, icon: 'Sparkles', parentId: 'healing_mastery' },

                    // Center Branch (Combat/Poisons)
                    { id: 'poisons', name: 'Toxicologia', x: 50, y: 50, maxPoints: 20, currentPoints: 0, icon: 'Skull', parentId: 'root' },
                    { id: 'acid', name: 'Ácido Corrosivo', x: 42, y: 80, maxPoints: 10, currentPoints: 0, icon: 'Droplet', parentId: 'poisons' },
                    { id: 'explosives', name: 'Explosivos', x: 58, y: 80, maxPoints: 10, currentPoints: 0, icon: 'Flame', parentId: 'poisons' },

                    // Right Branch (Utility/Mana)
                    { id: 'utility', name: 'Arcanismo Líquido', x: 80, y: 45, maxPoints: 20, currentPoints: 0, icon: 'Zap', parentId: 'root' },
                    { id: 'speed', name: 'Velocidade', x: 90, y: 75, maxPoints: 10, currentPoints: 0, icon: 'Footprints', parentId: 'utility' },
                    { id: 'clarity', name: 'Clareza Mental', x: 70, y: 75, maxPoints: 10, currentPoints: 0, icon: 'Gem', parentId: 'utility' }
                ]
            },
            {
                id: 'transmutation',
                name: 'Transmutação',
                description: 'Transforme materiais comuns em recursos raros e elementos puros.',
                nodes: [
                    // Root
                    { id: 'root', name: 'Pedra Filosofal', x: 50, y: 20, maxPoints: 50, currentPoints: 0, icon: 'Gem', parentId: null },

                    // Left Branch (Metals)
                    { id: 'metals', name: 'Metalurgia', x: 30, y: 50, maxPoints: 30, currentPoints: 0, icon: 'Hammer', parentId: 'root' },
                    { id: 'gold', name: 'Midas', x: 20, y: 75, maxPoints: 20, currentPoints: 0, icon: 'Crown', parentId: 'metals' },
                    { id: 'dark_iron', name: 'Ferro Negro', x: 40, y: 75, maxPoints: 20, currentPoints: 0, icon: 'Shield', parentId: 'metals' },

                    // Right Branch (Elements)
                    { id: 'elements', name: 'Elementos Primordiais', x: 70, y: 50, maxPoints: 30, currentPoints: 0, icon: 'Sparkles', parentId: 'root' },
                    { id: 'fire', name: 'Essência de Fogo', x: 60, y: 75, maxPoints: 20, currentPoints: 0, icon: 'Flame', parentId: 'elements' },
                    { id: 'ice', name: 'Essência de Gelo', x: 80, y: 75, maxPoints: 20, currentPoints: 0, icon: 'Snowflake', parentId: 'elements' }
                ]
            }
        ]
    },
    blacksmithing: {
        id: 'blacksmithing',
        name: 'Ferraria',
        icon: 'Hammer',
        level: 1,
        maxLevel: 100,
        description: 'A arte de forjar metais em armas letais e armaduras impenetráveis.',
        recipes: [
            // --- Tier 1: Básico (Ferro) ---
            {
                id: 'corroded_longsword',
                name: 'Espada Corroída',
                category: 'Espadas de Duas Mãos',
                description: 'Uma lâmina gasta pelo tempo. Ainda corta.',
                rarity: 'common',
                difficulty: 5,
                reagents: [
                    { itemId: 'iron_ingot', name: 'Barra de Ferro', count: 2 },
                    { itemId: 'coal', name: 'Carvão', count: 1 }
                ],
                result: { itemId: 'corroded_longsword', count: 1 }
            },
            {
                id: 'iron_greatsword',
                name: 'Montante de Ferro',
                category: 'Espadas de Duas Mãos',
                description: 'Ferro forjado em uma lâmina robusta.',
                rarity: 'common',
                difficulty: 15,
                reagents: [
                    { itemId: 'iron_ingot', name: 'Barra de Ferro', count: 4 },
                    { itemId: 'leather_strip', name: 'Tira de Couro', count: 2 },
                    { itemId: 'coal', name: 'Carvão', count: 2 }
                ],
                result: { itemId: 'iron_greatsword', count: 1 }
            },

            // --- Tier 2: Intermediário (Aço) ---
            {
                id: 'blessed_claymore',
                name: 'Claymore Abençoada',
                category: 'Espadas de Duas Mãos',
                description: 'Benzida por sacerdotes.',
                rarity: 'common',
                difficulty: 25,
                reagents: [
                    { itemId: 'steel_ingot', name: 'Barra de Aço', count: 5 },
                    { itemId: 'blessed_oil', name: 'Óleo Sagrado', count: 1 },
                    { itemId: 'coal', name: 'Carvão', count: 3 }
                ],
                result: { itemId: 'blessed_claymore', count: 1 }
            },
            {
                id: 'broad_greatsword',
                name: 'Montante Largo',
                category: 'Espadas de Duas Mãos',
                description: 'Lâmina larga que parte armaduras.',
                rarity: 'common',
                difficulty: 30,
                reagents: [
                    { itemId: 'steel_ingot', name: 'Barra de Aço', count: 6 },
                    { itemId: 'iron_rivets', name: 'Rebites de Ferro', count: 4 },
                    { itemId: 'coal', name: 'Carvão', count: 4 }
                ],
                result: { itemId: 'broad_greatsword', count: 1 }
            },

            // --- Tier 3: Avançado (Especial) ---
            {
                id: 'rippled_greatsword',
                name: 'Montante Ondulado',
                category: 'Espadas de Duas Mãos',
                description: 'Padrão ondulado aumenta o corte.',
                rarity: 'common',
                difficulty: 45,
                reagents: [
                    { itemId: 'mithril_ingot', name: 'Barra de Mithril', count: 5 },
                    { itemId: 'gem_chip', name: 'Lasca de Rubi', count: 1 },
                    { itemId: 'coal', name: 'Carvão', count: 6 }
                ],
                result: { itemId: 'rippled_greatsword', count: 1 }
            },
            {
                id: 'arced_longsword',
                name: 'Espada Longa Arqueada',
                category: 'Espadas de Duas Mãos',
                description: 'Curvatura sutil permite golpes devastadores.',
                rarity: 'common',
                difficulty: 50,
                reagents: [
                    { itemId: 'mithril_ingot', name: 'Barra de Mithril', count: 6 },
                    { itemId: 'leather_strip', name: 'Tira de Couro', count: 3 },
                    { itemId: 'coal', name: 'Carvão', count: 7 }
                ],
                result: { itemId: 'arced_longsword', count: 1 }
            },
            {
                id: 'stone_greatsword',
                name: 'Montante de Pedra',
                category: 'Espadas de Duas Mãos',
                description: 'Forjada com minério de pedra mística.',
                rarity: 'common',
                difficulty: 55,
                reagents: [
                    { itemId: 'stone_ore', name: 'Minério de Pedra', count: 8 },
                    { itemId: 'mithril_ingot', name: 'Barra de Mithril', count: 4 },
                    { itemId: 'coal', name: 'Carvão', count: 8 }
                ],
                result: { itemId: 'stone_greatsword', count: 1 }
            },

            // --- Tier 4: Elite (Lendário) ---
            {
                id: 'obsidian_greatsword',
                name: 'Montante de Obsidiana',
                category: 'Espadas de Duas Mãos',
                description: 'Vidro vulcânico negro.',
                rarity: 'common',
                difficulty: 65,
                reagents: [
                    { itemId: 'obsidian_shard', name: 'Fragmento de Obsidiana', count: 10 },
                    { itemId: 'infernal_core', name: 'Núcleo Infernal', count: 1 },
                    { itemId: 'coal', name: 'Carvão', count: 12 }
                ],
                result: { itemId: 'obsidian_greatsword', count: 1 }
            },
            {
                id: 'keen_greatsword',
                name: 'Montante Afiada',
                category: 'Espadas de Duas Mãos',
                description: 'Afiada ao extremo.',
                rarity: 'common',
                difficulty: 70,
                reagents: [
                    { itemId: 'adamantite_ingot', name: 'Barra de Adamantita', count: 8 },
                    { itemId: 'whetstone_perfect', name: 'Pedra de Amolar Perfeita', count: 1 },
                    { itemId: 'coal', name: 'Carvão', count: 15 }
                ],
                result: { itemId: 'keen_greatsword', count: 1 }
            },
            {
                id: 'ancient_greatblade',
                name: 'Lâmina Antiga',
                category: 'Espadas de Duas Mãos',
                description: 'Artefato de uma era esquecida.',
                rarity: 'common',
                difficulty: 75,
                reagents: [
                    { itemId: 'ancient_steel', name: 'Aço Antigo', count: 10 },
                    { itemId: 'rune_stone', name: 'Pedra Rúnica', count: 3 },
                    { itemId: 'coal', name: 'Carvão', count: 18 }
                ],
                result: { itemId: 'ancient_greatblade', count: 1 }
            },
            {
                id: 'flanged_greatblade',
                name: 'Lâmina Flangeada',
                category: 'Espadas de Duas Mãos',
                description: 'Lâmina serrilhada causa ferimentos horríveis.',
                rarity: 'common',
                difficulty: 80,
                reagents: [
                    { itemId: 'darksteel_ingot', name: 'Barra de Aço Sombrio', count: 12 },
                    { itemId: 'blood_essence', name: 'Essência de Sangue', count: 2 },
                    { itemId: 'coal', name: 'Carvão', count: 20 }
                ],
                result: { itemId: 'flanged_greatblade', count: 1 }
            },
            {
                id: 'regalia_longsword',
                name: 'Espada Longa Régia',
                category: 'Espadas de Duas Mãos',
                description: 'Carregada pela realeza.',
                rarity: 'common',
                difficulty: 85,
                reagents: [
                    { itemId: 'mithril_ingot', name: 'Barra de Mithril', count: 15 },
                    { itemId: 'gold_leaf', name: 'Folha de Ouro', count: 5 },
                    { itemId: 'gem_chip', name: 'Lasca de Rubi', count: 3 },
                    { itemId: 'coal', name: 'Carvão', count: 25 }
                ],
                result: { itemId: 'regalia_longsword', count: 1 }
            },
            {
                id: 'ultra_greatsword',
                name: 'Ultra Montante',
                category: 'Espadas de Duas Mãos',
                description: 'Uma lâmina tão grande que desafia a lógica.',
                rarity: 'common',
                difficulty: 90,
                reagents: [
                    { itemId: 'titan_ore', name: 'Minério Titânico', count: 20 },
                    { itemId: 'dragon_scale', name: 'Escama de Dragão', count: 1 },
                    { itemId: 'coal', name: 'Carvão', count: 30 }
                ],
                result: { itemId: 'ultra_greatsword', count: 1 }
            },

            // --- MACHADOS E ALABARDAS ---
            // Tier 1: Básico
            {
                id: 'splitting_greataxe',
                name: 'Machado Grande Rachador',
                category: 'Machados de Duas Mãos',
                description: 'Lâmina pesada projetada para rachar escudos.',
                rarity: 'common',
                difficulty: 5,
                reagents: [
                    { itemId: 'iron_ingot', name: 'Barra de Ferro', count: 2 },
                    { itemId: 'wood_plank', name: 'Tábua de Madeira', count: 1 },
                    { itemId: 'coal', name: 'Carvão', count: 1 }
                ],
                result: { itemId: 'splitting_greataxe', count: 1 }
            },
            {
                id: 'light_halberd',
                name: 'Alabarda Leve',
                category: 'Alabardas',
                description: 'Alabarda balanceada para golpes rápidos.',
                rarity: 'common',
                difficulty: 10,
                reagents: [
                    { itemId: 'iron_ingot', name: 'Barra de Ferro', count: 3 },
                    { itemId: 'wood_plank', name: 'Tábua de Madeira', count: 2 },
                    { itemId: 'coal', name: 'Carvão', count: 2 }
                ],
                result: { itemId: 'light_halberd', count: 1 }
            },

            // Tier 2: Intermediário
            {
                id: 'executioner_greataxe',
                name: 'Machado Grande de Carrasco',
                category: 'Machados de Duas Mãos',
                description: 'Usado em execuções públicas.',
                rarity: 'common',
                difficulty: 20,
                reagents: [
                    { itemId: 'steel_ingot', name: 'Barra de Aço', count: 4 },
                    { itemId: 'hardwood', name: 'Madeira Reforçada', count: 1 },
                    { itemId: 'coal', name: 'Carvão', count: 3 }
                ],
                result: { itemId: 'executioner_greataxe', count: 1 }
            },
            {
                id: 'arced_greataxe',
                name: 'Machado Grande Arqueado',
                category: 'Machados de Duas Mãos',
                description: 'Curvatura aumenta o poder de corte.',
                rarity: 'common',
                difficulty: 30,
                reagents: [
                    { itemId: 'steel_ingot', name: 'Barra de Aço', count: 5 },
                    { itemId: 'leather_strip', name: 'Tira de Couro', count: 2 },
                    { itemId: 'coal', name: 'Carvão', count: 4 }
                ],
                result: { itemId: 'arced_greataxe', count: 1 }
            },
            {
                id: 'elegant_glaive',
                name: 'Glaive Elegante',
                category: 'Alabardas',
                description: 'Arte e letalidade em equilíbrio.',
                rarity: 'common',
                difficulty: 35,
                reagents: [
                    { itemId: 'steel_ingot', name: 'Barra de Aço', count: 5 },
                    { itemId: 'hardwood', name: 'Madeira Reforçada', count: 2 },
                    { itemId: 'coal', name: 'Carvão', count: 5 }
                ],
                result: { itemId: 'elegant_glaive', count: 1 }
            },

            // Tier 3: Avançado
            {
                id: 'savage_greataxe',
                name: 'Machado Grande Selvagem',
                category: 'Machados de Duas Mãos',
                description: 'Forjado por tribos bárbaras.',
                rarity: 'common',
                difficulty: 45,
                reagents: [
                    { itemId: 'mithril_ingot', name: 'Barra de Mithril', count: 4 },
                    { itemId: 'bone_fragment', name: 'Fragmento de Osso', count: 3 },
                    { itemId: 'coal', name: 'Carvão', count: 7 }
                ],
                result: { itemId: 'savage_greataxe', count: 1 }
            },
            {
                id: 'rending_halberd',
                name: 'Alabarda Dilacerante',
                category: 'Alabardas',
                description: 'Lâmina serrilhada projetada para rasgar.',
                rarity: 'common',
                difficulty: 50,
                reagents: [
                    { itemId: 'mithril_ingot', name: 'Barra de Mithril', count: 6 },
                    { itemId: 'hardwood', name: 'Madeira Reforçada', count: 3 },
                    { itemId: 'coal', name: 'Carvão', count: 8 }
                ],
                result: { itemId: 'rending_halberd', count: 1 }
            },
            {
                id: 'serrated_greataxe',
                name: 'Machado Grande Serrilhado',
                category: 'Machados de Duas Mãos',
                description: 'Dentes de serra causam ferimentos devastadores.',
                rarity: 'common',
                difficulty: 60,
                reagents: [
                    { itemId: 'darksteel_ingot', name: 'Barra de Aço Sombrio', count: 7 },
                    { itemId: 'razor_edge', name: 'Fio de Navalha', count: 1 },
                    { itemId: 'coal', name: 'Carvão', count: 10 }
                ],
                result: { itemId: 'serrated_greataxe', count: 1 }
            },

            // Tier 4: Elite
            {
                id: 'raider_glaive',
                name: 'Glaive de Saqueador',
                category: 'Alabardas',
                description: 'Arma favorita de invasores nômades.',
                rarity: 'common',
                difficulty: 65,
                reagents: [
                    { itemId: 'adamantite_ingot', name: 'Barra de Adamantita', count: 6 },
                    { itemId: 'enchanted_wood', name: 'Madeira Encantada', count: 1 },
                    { itemId: 'coal', name: 'Carvão', count: 12 }
                ],
                result: { itemId: 'raider_glaive', count: 1 }
            },
            {
                id: 'ember_greataxe',
                name: 'Machado Grande de Brasa',
                category: 'Machados de Duas Mãos',
                description: 'Imbuído com chamas eternas.',
                rarity: 'common',
                difficulty: 75,
                reagents: [
                    { itemId: 'adamantite_ingot', name: 'Barra de Adamantita', count: 8 },
                    { itemId: 'infernal_core', name: 'Núcleo Infernal', count: 1 },
                    { itemId: 'coal', name: 'Carvão', count: 18 }
                ],
                result: { itemId: 'ember_greataxe', count: 1 }
            },
            {
                id: 'ceremonial_halberd',
                name: 'Alabarda Cerimonial',
                category: 'Alabardas',
                description: 'Carregada por guardas de honra.',
                rarity: 'common',
                difficulty: 70,
                reagents: [
                    { itemId: 'mithril_ingot', name: 'Barra de Mithril', count: 12 },
                    { itemId: 'gold_leaf', name: 'Folha de Ouro', count: 3 },
                    { itemId: 'coal', name: 'Carvão', count: 15 }
                ],
                result: { itemId: 'ceremonial_halberd', count: 1 }
            },
            {
                id: 'monumental_greataxe',
                name: 'Machado Grande Monumental',
                category: 'Machados de Duas Mãos',
                description: 'Tamanho colossal. Requer força titânica.',
                rarity: 'common',
                difficulty: 80,
                reagents: [
                    { itemId: 'titan_ore', name: 'Minério Titânico', count: 15 },
                    { itemId: 'ancient_steel', name: 'Aço Antigo', count: 5 },
                    { itemId: 'coal', name: 'Carvão', count: 22 }
                ],
                result: { itemId: 'monumental_greataxe', count: 1 }
            },
            {
                id: 'vile_greataxe',
                name: 'Machado Grande Vil',
                category: 'Machados de Duas Mãos',
                description: 'Corrompido por magia negra.',
                rarity: 'common',
                difficulty: 90,
                reagents: [
                    { itemId: 'cursed_metal', name: 'Metal Amaldiçoado', count: 20 },
                    { itemId: 'void_essence', name: 'Essência do Vazio', count: 2 },
                    { itemId: 'coal', name: 'Carvão', count: 30 }
                ],
                result: { itemId: 'vile_greataxe', count: 1 }
            },

            // --- MAÇAS DE DUAS MÃOS (Base PoE2 - 26 itens) ---
            {
                id: 'felled_greatclub',
                name: 'Clava Abatida',
                category: 'Maças de Duas Mãos',
                description: 'Tronco arrancado e moldado.',
                rarity: 'common',
                difficulty: 5,
                reagents: [
                    { itemId: 'wood_plank', name: 'Tábua de Madeira', count: 3 },
                    { itemId: 'iron_ingot', name: 'Barra de Ferro', count: 1 }
                ],
                result: { itemId: 'felled_greatclub', count: 1 }
            },
            {
                id: 'oak_greathammer',
                name: 'Martelo de Carvalho',
                category: 'Maças de Duas Mãos',
                description: 'Madeira densa com cabeça de ferro.',
                rarity: 'common',
                difficulty: 10,
                reagents: [
                    { itemId: 'iron_ingot', name: 'Barra de Ferro', count: 2 },
                    { itemId: 'hardwood', name: 'Madeira Reforçada', count: 2 },
                    { itemId: 'coal', name: 'Carvão', count: 1 }
                ],
                result: { itemId: 'oak_greathammer', count: 1 }
            },
            {
                id: 'forge_maul',
                name: 'Malho de Forja',
                category: 'Maças de Duas Mãos',
                description: 'Ferramenta de ferreiro transformada em arma.',
                rarity: 'common',
                difficulty: 20,
                reagents: [
                    { itemId: 'iron_ingot', name: 'Barra de Ferro', count: 4 },
                    { itemId: 'hardwood', name: 'Madeira Reforçada', count: 1 },
                    { itemId: 'coal', name: 'Carvão', count: 3 }
                ],
                result: { itemId: 'forge_maul', count: 1 }
            },
            {
                id: 'studded_greatclub',
                name: 'Clava Tachoada',
                category: 'Maças de Duas Mãos',
                description: 'Pregos de ferro cravados.',
                rarity: 'common',
                difficulty: 28,
                reagents: [
                    { itemId: 'steel_ingot', name: 'Barra de Aço', count: 4 },
                    { itemId: 'iron_rivets', name: 'Rebites de Ferro', count: 8 },
                    { itemId: 'coal', name: 'Carvão', count: 4 }
                ],
                result: { itemId: 'studded_greatclub', count: 1 }
            },
            {
                id: 'cultist_greathammer',
                name: 'Martelo Cultista',
                category: 'Maças de Duas Mãos',
                description: 'Usado em rituais profanos.',
                rarity: 'common',
                difficulty: 35,
                reagents: [
                    { itemId: 'steel_ingot', name: 'Barra de Aço', count: 5 },
                    { itemId: 'bone_fragment', name: 'Fragmento de Osso', count: 2 },
                    { itemId: 'coal', name: 'Carvão', count: 5 }
                ],
                result: { itemId: 'cultist_greathammer', count: 1 }
            },
            {
                id: 'temple_maul',
                name: 'Malho de Templo',
                category: 'Maças de Duas Mãos',
                description: 'Guardada em templos antigos.',
                rarity: 'common',
                difficulty: 45,
                reagents: [
                    { itemId: 'mithril_ingot', name: 'Barra de Mithril', count: 5 },
                    { itemId: 'rune_stone', name: 'Pedra Rúnica', count: 1 },
                    { itemId: 'coal', name: 'Carvão', count: 7 }
                ],
                result: { itemId: 'temple_maul', count: 1 }
            },
            {
                id: 'leaden_greathammer',
                name: 'Martelo de Chumbo',
                category: 'Maças de Duas Mãos',
                description: 'Peso brutal.',
                rarity: 'common',
                difficulty: 52,
                reagents: [
                    { itemId: 'lead_ingot', name: 'Barra de Chumbo', count: 8 },
                    { itemId: 'steel_ingot', name: 'Barra de Aço', count: 3 },
                    { itemId: 'coal', name: 'Carvão', count: 10 }
                ],
                result: { itemId: 'leaden_greathammer', count: 1 }
            },
            {
                id: 'crumbling_maul',
                name: 'Malho Esfarelante',
                category: 'Maças de Duas Mãos',
                description: 'Pedra antiga que se desintegra.',
                rarity: 'common',
                difficulty: 58,
                reagents: [
                    { itemId: 'ancient_stone', name: 'Pedra Antiga', count: 10 },
                    { itemId: 'coal', name: 'Carvão', count: 12 }
                ],
                result: { itemId: 'crumbling_maul', count: 1 }
            },
            {
                id: 'snakewood_greathammer',
                name: 'Martelo de Madeira-Serpente',
                category: 'Maças de Duas Mãos',
                description: 'Madeira exótica.',
                rarity: 'common',
                difficulty: 65,
                reagents: [
                    { itemId: 'exotic_wood', name: 'Madeira Exótica', count: 8 },
                    { itemId: 'steel_ingot', name: 'Barra de Aço', count: 4 },
                    { itemId: 'coal', name: 'Carvão', count: 14 }
                ],
                result: { itemId: 'snakewood_greathammer', count: 1 }
            },
            {
                id: 'blacksmith_maul',
                name: 'Malho de Ferreiro',
                category: 'Maças de Duas Mãos',
                description: 'Forjado pelos mestres.',
                rarity: 'common',
                difficulty: 68,
                reagents: [
                    { itemId: 'darksteel_ingot', name: 'Barra de Aço Sombrio', count: 10 },
                    { itemId: 'coal', name: 'Carvão', count: 16 }
                ],
                result: { itemId: 'blacksmith_maul', count: 1 }
            },
            {
                id: 'pointed_maul',
                name: 'Malho Pontiagudo',
                category: 'Maças de Duas Mãos',
                description: 'Ponta afiada para perfuração.',
                rarity: 'common',
                difficulty: 65,
                reagents: [
                    { itemId: 'darksteel_ingot', name: 'Barra de Aço Sombrio', count: 8 },
                    { itemId: 'razor_edge', name: 'Fio de Navalha', count: 1 },
                    { itemId: 'coal', name: 'Carvão', count: 12 }
                ],
                result: { itemId: 'pointed_maul', count: 1 }
            },
            {
                id: 'totemic_greatclub',
                name: 'Clava Totêmica',
                category: 'Maças de Duas Mãos',
                description: 'Entalhes tribais.',
                rarity: 'common',
                difficulty: 72,
                reagents: [
                    { itemId: 'ironwood', name: 'Madeira-Férrea', count: 8 },
                    { itemId: 'tribal_totem', name: 'Totem Tribal', count: 1 },
                    { itemId: 'coal', name: 'Carvão', count: 18 }
                ],
                result: { itemId: 'totemic_greatclub', count: 1 }
            },
            {
                id: 'zealot_greathammer',
                name: 'Martelo Zelota',
                category: 'Maças de Duas Mãos',
                description: 'Empunhado por fanáticos.',
                rarity: 'common',
                difficulty: 70,
                reagents: [
                    { itemId: 'blessed_metal', name: 'Metal Abençoado', count: 10 },
                    { itemId: 'coal', name: 'Carvão', count: 17 }
                ],
                result: { itemId: 'zealot_greathammer', count: 1 }
            },
            {
                id: 'greatmace',
                name: 'Grande Maça',
                category: 'Maças de Duas Mãos',
                description: 'A maça em sua forma mais pura.',
                rarity: 'common',
                difficulty: 73,
                reagents: [
                    { itemId: 'mithril_ingot', name: 'Barra de Mithril', count: 12 },
                    { itemId: 'coal', name: 'Carvão', count: 18 }
                ],
                result: { itemId: 'greatmace', count: 1 }
            },
            {
                id: 'solemn_maul',
                name: 'Malho Solene',
                category: 'Maças de Duas Mãos',
                description: 'Usado em cerimônias de execução.',
                rarity: 'common',
                difficulty: 73,
                reagents: [
                    { itemId: 'ceremonial_metal', name: 'Metal Cerimonial', count: 12 },
                    { itemId: 'coal', name: 'Carvão', count: 19 }
                ],
                result: { itemId: 'solemn_maul', count: 1 }
            },
            {
                id: 'precise_greathammer',
                name: 'Martelo Preciso',
                category: 'Maças de Duas Mãos',
                description: 'Balanceamento perfeito.',
                rarity: 'common',
                difficulty: 75,
                reagents: [
                    { itemId: 'adamantite_ingot', name: 'Barra de Adamantita', count: 10 },
                    { itemId: 'precision_tools', name: 'Ferramentas de Precisão', count: 1 },
                    { itemId: 'coal', name: 'Carvão', count: 20 }
                ],
                result: { itemId: 'precise_greathammer', count: 1 }
            },
            {
                id: 'heavy_greathammer',
                name: 'Martelo Pesado',
                category: 'Maças de Duas Mãos',
                description: 'Peso esmagador.',
                rarity: 'common',
                difficulty: 78,
                reagents: [
                    { itemId: 'titan_ore', name: 'Minério Titânico', count: 12 },
                    { itemId: 'coal', name: 'Carvão', count: 22 }
                ],
                result: { itemId: 'heavy_greathammer', count: 1 }
            },
            {
                id: 'disintegrating_maul',
                name: 'Malho Desintegrante',
                category: 'Maças de Duas Mãos',
                description: 'Irradia energia entrópica.',
                rarity: 'common',
                difficulty: 80,
                reagents: [
                    { itemId: 'void_crystal', name: 'Cristal do Vazio', count: 5 },
                    { itemId: 'darksteel_ingot', name: 'Barra de Aço Sombrio', count: 10 },
                    { itemId: 'coal', name: 'Carvão', count: 24 }
                ],
                result: { itemId: 'disintegrating_maul', count: 1 }
            },
            {
                id: 'giant_maul',
                name: 'Malho Gigante',
                category: 'Maças de Duas Mãos',
                description: 'Tamanho descomunal.',
                rarity: 'common',
                difficulty: 85,
                reagents: [
                    { itemId: 'titan_ore', name: 'Minério Titânico', count: 15 },
                    { itemId: 'ancient_steel', name: 'Aço Antigo', count: 5 },
                    { itemId: 'coal', name: 'Carvão', count: 26 }
                ],
                result: { itemId: 'giant_maul', count: 1 }
            },
            {
                id: 'anvil_maul',
                name: 'Malho de Bigorna',
                category: 'Maças de Duas Mãos',
                description: 'Forjado na própria bigorna.',
                rarity: 'common',
                difficulty: 88,
                reagents: [
                    { itemId: 'anvil_fragment', name: 'Fragmento de Bigorna', count: 1 },
                    { itemId: 'titan_ore', name: 'Minério Titânico', count: 18 },
                    { itemId: 'coal', name: 'Carvão', count: 28 }
                ],
                result: { itemId: 'anvil_maul', count: 1 }
            },
            {
                id: 'sacred_maul',
                name: 'Malho Sagrado',
                category: 'Maças de Duas Mãos',
                description: 'Abençoado por sacerdotes.',
                rarity: 'common',
                difficulty: 92,
                reagents: [
                    { itemId: 'blessed_metal', name: 'Metal Abençoado', count: 15 },
                    { itemId: 'divine_essence', name: 'Essência Divina', count: 2 },
                    { itemId: 'coal', name: 'Carvão', count: 32 }
                ],
                result: { itemId: 'sacred_maul', count: 1 }
            },
            {
                id: 'ironwood_greathammer',
                name: 'Grande Martelo de Pau-Ferro',
                category: 'Maças de Duas Mãos',
                description: 'Madeira petrificada.',
                rarity: 'common',
                difficulty: 95,
                reagents: [
                    { itemId: 'ironwood', name: 'Madeira-Férrea', count: 20 },
                    { itemId: 'titan_ore', name: 'Minério Titânico', count: 10 },
                    { itemId: 'coal', name: 'Carvão', count: 35 }
                ],
                result: { itemId: 'ironwood_greathammer', count: 1 }
            },
            {
                id: 'massive_greathammer',
                name: 'Grande Martelo Maciço',
                category: 'Maças de Duas Mãos',
                description: 'Peso esmagador.',
                rarity: 'common',
                difficulty: 95,
                reagents: [
                    { itemId: 'titan_ore', name: 'Minério Titânico', count: 22 },
                    { itemId: 'dense_metal', name: 'Metal Denso', count: 8 },
                    { itemId: 'coal', name: 'Carvão', count: 38 }
                ],
                result: { itemId: 'massive_greathammer', count: 1 }
            },
            {
                id: 'fanatic_greathammer',
                name: 'Grande Martelo Fanático',
                category: 'Maças de Duas Mãos',
                description: 'Empunhado por devotos.',
                rarity: 'common',
                difficulty: 97,
                reagents: [
                    { itemId: 'blessed_metal', name: 'Metal Abençoado', count: 18 },
                    { itemId: 'holy_relic', name: 'Relíquia Sagrada', count: 2 },
                    { itemId: 'coal', name: 'Carvão', count: 40 }
                ],
                result: { itemId: 'fanatic_greathammer', count: 1 }
            },
            {
                id: 'tawhoan_greatclub',
                name: 'Clava Grande Tawhoan',
                category: 'Maças de Duas Mãos',
                description: 'Artefato tribal ancestral.',
                rarity: 'common',
                difficulty: 97,
                reagents: [
                    { itemId: 'ancient_wood', name: 'Madeira Ancestral', count: 15 },
                    { itemId: 'tribal_essence', name: 'Essência Tribal', count: 3 },
                    { itemId: 'coal', name: 'Carvão', count: 42 }
                ],
                result: { itemId: 'tawhoan_greatclub', count: 1 }
            },
            {
                id: 'doom_maul',
                name: 'Malho da Ruína',
                category: 'Maças de Duas Mãos',
                description: 'Essência da destruição absoluta.',
                rarity: 'common',
                difficulty: 99,
                reagents: [
                    { itemId: 'void_essence', name: 'Essência do Vazio', count: 5 },
                    { itemId: 'titan_ore', name: 'Minério Titânico', count: 25 },
                    { itemId: 'cursed_metal', name: 'Metal Amaldiçoado', count: 10 },
                    { itemId: 'coal', name: 'Carvão', count: 50 }
                ],
                result: { itemId: 'doom_maul', count: 1 }
            }
        ],
        specializations: [
            {
                id: 'weaponsmith',
                name: 'Forja de Armas',
                description: 'Especialize-se na criação de lâminas afiadas e armas de impacto.',
                nodes: [
                    // Root
                    { id: 'root', name: 'Mestre de Armas', x: 50, y: 20, maxPoints: 30, currentPoints: 0, icon: 'Sword', parentId: null },

                    // Left Branch (Swords/Axes)
                    { id: 'blades', name: 'Lâminas', x: 30, y: 45, maxPoints: 20, currentPoints: 0, icon: 'Sword', parentId: 'root' },
                    { id: 'longswords', name: 'Espadas Longas', x: 10, y: 70, maxPoints: 10, currentPoints: 0, icon: 'Sword', parentId: 'blades' },
                    { id: 'axes', name: 'Machados', x: 25, y: 70, maxPoints: 10, currentPoints: 0, icon: 'Hammer', parentId: 'blades' }, // Assuming Axe icon or Hammer placeholder

                    // Right Branch (Hammers/Maces)
                    { id: 'blunt', name: 'Impacto', x: 70, y: 45, maxPoints: 20, currentPoints: 0, icon: 'Hammer', parentId: 'root' },
                    { id: 'maces', name: 'Maças', x: 60, y: 70, maxPoints: 10, currentPoints: 0, icon: 'Circle', parentId: 'blunt' },
                    { id: 'warhammers', name: 'Martelos de Guerra', x: 80, y: 70, maxPoints: 10, currentPoints: 0, icon: 'Hammer', parentId: 'blunt' }
                ]
            },
            {
                id: 'armorsmith',
                name: 'Forja de Armaduras',
                description: 'Crie as defesas mais resistentes conhecidas pelo homem.',
                nodes: [
                    // Root
                    { id: 'root', name: 'Mestre da Bigorna', x: 50, y: 20, maxPoints: 40, currentPoints: 0, icon: 'Shield', parentId: null },

                    // Left Branch (Plate)
                    { id: 'plate', name: 'Placas Pesadas', x: 30, y: 45, maxPoints: 20, currentPoints: 0, icon: 'Shield', parentId: 'root' },
                    { id: 'reinforcement', name: 'Reforço Estrutural', x: 15, y: 70, maxPoints: 10, currentPoints: 0, icon: 'Hammer', parentId: 'plate' },
                    { id: 'alloy', name: 'Ligas Especiais', x: 35, y: 70, maxPoints: 10, currentPoints: 0, icon: 'Gem', parentId: 'plate' },

                    // Right Branch (Shields)
                    { id: 'shields', name: 'Escuderia', x: 70, y: 45, maxPoints: 20, currentPoints: 0, icon: 'Shield', parentId: 'root' },
                    { id: 'blocking', name: 'Bloqueio Perfeito', x: 65, y: 70, maxPoints: 10, currentPoints: 0, icon: 'Shield', parentId: 'shields' },
                    { id: 'spikes', name: 'Espinhos', x: 85, y: 70, maxPoints: 10, currentPoints: 0, icon: 'Sword', parentId: 'shields' }
                ]
            }
        ]
    }
};
