/**
 * TALENTS DATABASE
 * Árvores de talentos para progressão do personagem
 * 
 * Classes: Warrior (Guerreiro), Mage (Mago), Rogue (Ladino)
 */

import { TALENT_DATA } from '../data/talents';

const TALENTS_CATALOG = TALENT_DATA;

// ===== API FUNCTIONS =====
const TalentsDB = {
    getTreeById: (id) => TALENTS_CATALOG[id],
    getAllTrees: () => TALENTS_CATALOG,
    getTalent: (treeId, talentId) => {
        const tree = TALENTS_CATALOG[treeId];
        return tree?.talents.find(t => t.id === talentId);
    },
    getTalentsByTier: (treeId, tier) => {
        const tree = TALENTS_CATALOG[treeId];
        return tree?.talents.filter(t => t.tier === tier) || [];
    },
    getRequiredTalents: (treeId, talentId) => {
        const talent = TalentsDB.getTalent(treeId, talentId);
        if (!talent || !talent.req) return [];
        
        const reqs = Array.isArray(talent.req) ? talent.req : [talent.req];
        return reqs;
    }
};

export default TalentsDB;
export { TALENTS_CATALOG };

