/**
 * DATABASE - Unified API
 * Ponto central de acesso a todos os dados do jogo
 * 
 * Uso:
 *   import { DB } from './database';
 *   const sword = DB.items.getById('iron_sword');
 *   const enemies = DB.enemies.getByLevel(3);
 *   const quests = DB.quests.getByTier(1);
 */

import ItemsDB from './items';
import EnemiesDB from './enemies';
import QuestsDB from './quests';
import EventsDB from './events';
import NPCsDB from './npcs';
import ProfessionsDB from './professions';
import TalentsDB from './talents';

export const DB = {
    items: ItemsDB,
    enemies: EnemiesDB,
    quests: QuestsDB,
    events: EventsDB,
    npcs: NPCsDB,
    professions: ProfessionsDB,
    talents: TalentsDB
};

// Shorthand exports for convenience
export {
    ItemsDB,
    EnemiesDB,
    QuestsDB,
    EventsDB,
    NPCsDB,
    ProfessionsDB,
    TalentsDB
};

// Example Queries:
// DB.items.getById('iron_sword')
// DB.enemies.getRandom(3)
// DB.quests.getByTier(1)
// DB.events.getByFloor(1)
// DB.npcs.getByLocation('blacksmith_forge')
// DB.professions.getRecipe('alchemy', 'potion_small')
// DB.talents.getTalent('warrior', 'str_1')

