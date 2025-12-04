/**
 * NPCS DATABASE
 * Todos os personagens não-jogáveis do jogo
 * 
 * Categorias: Vendor (Mercador), Healer (Curandeiro), Craftsman (Artesão), Quest Giver
 */

const NPCS_CATALOG = {
    griswold: {
        id: 'griswold',
        name: 'Griswold',
        title: 'Ferreiro Mestre',
        category: 'Craftsman',
        faction: 'Tristram',
        location: 'blacksmith_forge',
        greeting: 'Ah, um aventureiro! O aço nunca mente, ao contrário das pessoas.',
        stories: [
            "Você ouviu? Gritos vindos das profundezas da Catedral. Até o aço treme com isso.",
            "O Rei Leoric... eu fiz a armadura dele. Era uma obra de arte. Agora, serve a um propósito muito mais sombrio.",
            "Minha forja não é apenas para armas. O fogo purifica. O fogo renova. Lembre-se disso quando estiver lá embaixo.",
            "Dizem que o Arcebispo Lazarus levou o príncipe Albrecht para as catacumbas. Loucura, pura loucura.",
            "Cuidado com o Açougueiro. Ele tem um gosto particular por... carne fresca."
        ],
        services: ['blacksmithing'],
        questsAvailable: ['q6', 'q8', 'q11']
    },
    thomas: {
        id: 'thomas',
        name: 'Thomas',
        title: 'Ajudante do Ferreiro',
        category: 'Vendor',
        faction: 'Tristram',
        location: 'blacksmith_forge',
        greeting: 'O Mestre Griswold está muito ocupado... posso ajudar com compras?',
        stories: [
            "O Mestre está estranho ultimamente. Fica murmurando para as chamas.",
            "Eu vi uma pedra vermelha brilhando na testa de um viajante... me deu arrepios.",
            "Se você trouxer metal bom, talvez o Mestre deixe eu tentar forjar algo.",
            "Não conte pro Griswold, mas eu perdi o martelo favorito dele semana passada."
        ],
        services: ['trade', 'mining'],
        questsAvailable: ['q4']
    },
    akara: {
        id: 'akara',
        name: 'Akara',
        title: 'Sacerdotisa da Luz',
        category: 'Healer',
        faction: 'Irmandade do Olho Cego',
        location: 'healer_hut',
        greeting: 'A luz sagrada brilha sobre você, viajante. Mas cuidado, as sombras são longas.',
        stories: [
            "Sinto uma perturbação no éter mágico. Algo antigo e maligno despertou.",
            "A Irmandade do Olho Cego costumava proteger este lugar. Agora, restam apenas algumas de nós.",
            "Não subestime o poder da fé. Às vezes, é o único escudo que resta contra a escuridão.",
            "Vi corvos pousando no cemitério. Um mau presságio. A morte caminha entre nós."
        ],
        services: ['healing'],
        questsAvailable: ['q1', 'q3', 'q5', 'q7', 'q9', 'q12']
    },
    pepin: {
        id: 'pepin',
        name: 'Pepin',
        title: 'Alquimista Erudito',
        category: 'Vendor',
        faction: 'Tristram',
        location: 'alchemist_lab',
        greeting: 'Poções, elixires... a ciência pode resolver o que a espada não consegue.',
        stories: [
            "Estou trabalhando em uma mistura para curar a podridão, mas os ingredientes são... difíceis de encontrar.",
            "Você viu cogumelos negros lá embaixo? Eles têm propriedades fascinantes se preparados corretamente.",
            "A água do poço ficou escura. Receio que o mal esteja envenenando a própria terra.",
            "Se encontrar um tomo antigo, traga para mim. O conhecimento é a arma mais afiada."
        ],
        services: ['alchemy', 'trade'],
        questsAvailable: ['q2', 'q10']
    }
};

// ===== API FUNCTIONS =====
const NPCsDB = {
    getById: (id) => NPCS_CATALOG[id],
    getByLocation: (location) => Object.values(NPCS_CATALOG).filter(npc => npc.location === location),
    getByCategory: (category) => Object.values(NPCS_CATALOG).filter(npc => npc.category === category),
    getQuestGivers: () => Object.values(NPCS_CATALOG).filter(npc => npc.questsAvailable && npc.questsAvailable.length > 0),
    getVendors: () => Object.values(NPCS_CATALOG).filter(npc => npc.services.includes('trade')),
    getAll: () => NPCS_CATALOG
};

export default NPCsDB;
export { NPCS_CATALOG };

