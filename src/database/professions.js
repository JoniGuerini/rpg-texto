/**
 * PROFESSIONS DATABASE
 * Profissões de crafting e suas especializações
 * 
 * Profissões: Alquimia, Ferraria
 */

import { PROFESSIONS_DATA } from '../data/professions';

const PROFESSIONS_CATALOG = PROFESSIONS_DATA;

// ===== API FUNCTIONS =====
const ProfessionsDB = {
    getById: (id) => PROFESSIONS_CATALOG[id],
    getAll: () => PROFESSIONS_CATALOG,
    getRecipe: (professionId, recipeId) => {
        const profession = PROFESSIONS_CATALOG[professionId];
        return profession?.recipes.find(r => r.id === recipeId);
    },
    getRecipesByCategory: (professionId, category) => {
        const profession = PROFESSIONS_CATALOG[professionId];
        return profession?.recipes.filter(r => r.category === category) || [];
    },
    getSpecialization: (professionId, specId) => {
        const profession = PROFESSIONS_CATALOG[professionId];
        return profession?.specializations.find(s => s.id === specId);
    },
    getAllRecipes: (professionId) => {
        return PROFESSIONS_CATALOG[professionId]?.recipes || [];
    }
};

export default ProfessionsDB;
export { PROFESSIONS_CATALOG };

