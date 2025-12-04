import React, { useState } from 'react';
import { Hammer, Heart, FlaskConical, DoorOpen, MessageSquare, X, Coins, ArrowLeft, Home, User, Pickaxe, Archive } from 'lucide-react';
import ShopInterface from './ShopInterface';
import CoalMineInterface from './CoalMineInterface';
import { GRISWOLD_SHOP, PEPIN_SHOP, AKARA_SHOP } from '../data/shopData';
import forgeImage from '../assets/forge.png';
import griswoldPortrait from '../assets/griswold.png';

const NPC_DIALOGS = {
    blacksmith: {
        name: 'Griswold',
        title: 'Ferreiro',
        image: griswoldPortrait,
        greeting: 'Ah, um aventureiro! O aço nunca mente, ao contrário das pessoas.',
        stories: [
            "Você ouviu? Gritos vindos das profundezas da Catedral. Até o aço treme com isso.",
            "O Rei Leoric... eu fiz a armadura dele. Era uma obra de arte. Agora, serve a um propósito muito mais sombrio.",
            "Minha forja não é apenas para armas. O fogo purifica. O fogo renova. Lembre-se disso quando estiver lá embaixo.",
            "Dizem que o Arcebispo Lazarus levou o príncipe Albrecht para as catacumbas. Loucura, pura loucura.",
            "Cuidado com o Açougueiro. Ele tem um gosto particular por... carne fresca."
        ],
        options: [
            { id: 'craft', label: 'Forjar', icon: Hammer },
            { id: 'whisper', label: 'Sussurros', icon: MessageSquare }
        ]
    },
    apprentice: {
        name: 'Thomas',
        title: 'Ajudante',
        image: null, // Placeholder icon will be used
        greeting: 'O Mestre Griswold está muito ocupado... posso ajudar com compras?',
        stories: [
            "O Mestre está estranho ultimamente. Fica murmurando para as chamas.",
            "Eu vi uma pedra vermelha brilhando na testa de um viajante... me deu arrepios.",
            "Se você trouxer metal bom, talvez o Mestre deixe eu tentar forjar algo.",
            "Não conte pro Griswold, mas eu perdi o martelo favorito dele semana passada."
        ],
        options: [
            { id: 'trade', label: 'Negociar', icon: Coins },
            { id: 'mine', label: 'Mineração', icon: Pickaxe },
            { id: 'whisper', label: 'Sussurros', icon: MessageSquare }
        ]
    },
    healer: {
        name: 'Akara',
        title: 'Sacerdotisa',
        greeting: 'A luz sagrada brilha sobre você, viajante. Mas cuidado, as sombras são longas.',
        stories: [
            "Sinto uma perturbação no éter mágico. Algo antigo e maligno despertou.",
            "A Irmandade do Olho Cego costumava proteger este lugar. Agora, restam apenas algumas de nós.",
            "Não subestime o poder da fé. Às vezes, é o único escudo que resta contra a escuridão.",
            "Vi corvos pousando no cemitério. Um mau presságio. A morte caminha entre nós.",
            "Estes artefatos mágicos foram abençoados pela Irmandade. Use-os com sabedoria.",
            "Cada varinha carrega uma fração do poder arcano. Nas mãos certas, pode mudar o destino."
        ],
        options: [
            { id: 'trade', label: 'Artefatos Mágicos', icon: Coins },
            { id: 'heal', label: 'Curar Ferimentos', cost: 20, icon: Heart },
            { id: 'whisper', label: 'Sussurros', icon: MessageSquare }
        ]
    },
    alchemist: {
        name: 'Pepin',
        title: 'Alquimista',
        greeting: 'Poções, elixires... a ciência pode resolver o que a espada não consegue.',
        stories: [
            "Estou trabalhando em uma mistura para curar a podridão, mas os ingredientes são... difíceis de encontrar.",
            "Você viu cogumelos negros lá embaixo? Eles têm propriedades fascinantes se preparados corretamente.",
            "A água do poço ficou escura. Receio que o mal esteja envenenando a própria terra.",
            "Se encontrar um tomo antigo, traga para mim. O conhecimento é a arma mais afiada."
        ],
        options: [
            { id: 'shop', label: 'Negociar', icon: FlaskConical },
            { id: 'craft', label: 'Bancada de Alquimia', icon: FlaskConical },
            { id: 'whisper', label: 'Sussurros', icon: MessageSquare }
        ]
    }
};

const BUILDINGS = [
    {
        id: 'blacksmith_forge',
        name: 'Forja de Griswold',
        description: 'O som do martelo ecoa constantemente.',
        icon: Hammer,
        image: forgeImage,
        color: 'text-[#c5a059]',
        borderColor: 'group-hover:border-[#c5a059]',
        shadowColor: 'group-hover:shadow-[0_0_50px_rgba(197,160,89,0.5)]',
        bgHover: 'group-hover:bg-[#c5a059]/10',
        npcs: ['blacksmith', 'apprentice']
    },
    {
        id: 'healer_hut',
        name: 'Tenda de Akara',
        description: 'Cheiro de incenso e ervas medicinais.',
        icon: Heart,
        color: 'text-red-500',
        borderColor: 'group-hover:border-red-500',
        shadowColor: 'group-hover:shadow-[0_0_50px_rgba(220,38,38,0.5)]',
        bgHover: 'group-hover:bg-red-900/20',
        npcs: ['healer']
    },
    {
        id: 'alchemist_lab',
        name: 'Laboratório de Pepin',
        description: 'Frascos borbulhantes e livros antigos.',
        icon: FlaskConical,
        color: 'text-emerald-500',
        borderColor: 'group-hover:border-emerald-500',
        shadowColor: 'group-hover:shadow-[0_0_50px_rgba(16,185,129,0.5)]',
        bgHover: 'group-hover:bg-emerald-900/20',
        npcs: ['alchemist']
    }
];

const Village = ({ onNavigate, hero, onHeal, onDeductGold, onBuyItem, onSellItem, inventory, coalMine, onOpenStash }) => {
    const [activeBuilding, setActiveBuilding] = useState(null);
    const [activeNPC, setActiveNPC] = useState(null);
    const [currentDialog, setCurrentDialog] = useState(''); // Dynamic dialog text
    const [message, setMessage] = useState(null); // System feedback message
    const [showShop, setShowShop] = useState(false);
    const [showWhispers, setShowWhispers] = useState(false);
    const [showMining, setShowMining] = useState(false);
    const [currentShop, setCurrentShop] = useState({ data: [], title: '', subtitle: '' });

    const handleEnterBuilding = (building) => {
        setActiveBuilding(building);
    };

    const handleLeaveBuilding = () => {
        setActiveBuilding(null);
        setActiveNPC(null);
        setMessage(null);
        setShowShop(false);
        setShowWhispers(false);
        setShowMining(false);
    };

    const handleInteraction = (npcId) => {
        const npc = NPC_DIALOGS[npcId];
        setActiveNPC(npc);
        setCurrentDialog(npc.greeting);
        setMessage(null);
        setShowWhispers(false);
        setShowMining(false);
    };

    const handleRepair = () => {
        const repairCost = 50;
        if (hero.gold >= repairCost) {
            onDeductGold(repairCost);
            setMessage("Seu equipamento foi reparado e polido.");
        } else {
            setMessage("Você não tem ouro suficiente para os reparos.");
        }
    };

    const handleOptionClick = (option) => {
        if (option.id === 'whisper') {
            setShowWhispers(true);
        } else if (option.id === 'heal') {
            if (hero.gold >= option.cost) {
                onDeductGold(option.cost);
                onHeal(1000); // Heal full (or a large amount)
                setMessage("Suas feridas foram curadas pela luz!");
            } else {
                setMessage("Você não tem ouro suficiente.");
            }
        } else if (option.id === 'craft') {
            if (activeNPC.name === 'Griswold') {
                onNavigate('PROFESSIONS', 'blacksmithing');
            } else {
                onNavigate('PROFESSIONS', 'alchemy');
            }
        } else if (option.id === 'trade') {
            // Determine which shop based on current NPC
            if (activeNPC.name === 'Thomas') {
                // Griswold's Shop (Managed by Apprentice)
                setCurrentShop({
                    data: GRISWOLD_SHOP,
                    title: 'Loja de Griswold',
                    subtitle: 'Equipamentos de Qualidade'
                });
            } else if (activeNPC.name === 'Akara') {
                // Akara's Magic Shop
                setCurrentShop({
                    data: AKARA_SHOP,
                    title: 'Artefatos de Akara',
                    subtitle: 'Itens Mágicos e Relíquias Sagradas'
                });
            }
            setShowShop(true);
        } else if (option.id === 'shop') {
            // Pepin
            setCurrentShop({
                data: PEPIN_SHOP,
                title: 'Laboratório de Pepin',
                subtitle: 'Poções e Elixires'
            });
            setShowShop(true);
        } else if (option.id === 'mine') {
            setShowMining(true);
        } else {
            setMessage("Esta funcionalidade estará disponível em breve.");
        }
    };

    return (
        <div className="relative w-full h-full bg-[#050505] overflow-auto custom-scrollbar flex flex-col animate-in fade-in duration-500">
            {/* Background Atmosphere */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-20 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80 pointer-events-none" />

            {/* Header */}
            <div className="relative z-10 p-4 md:p-6 lg:p-8 text-center border-b border-[#333] bg-[#0a0a0a]/80 backdrop-blur-md flex flex-col md:flex-row items-center justify-center gap-4">
                {activeBuilding && (
                    <button
                        onClick={handleLeaveBuilding}
                        className="absolute left-8 flex items-center gap-2 text-[#666] hover:text-[#c5a059] transition-colors uppercase tracking-widest text-xs font-bold"
                    >
                        <ArrowLeft size={16} />
                        Voltar para a Vila
                    </button>
                )}
                <div>
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold font-['Cinzel'] text-gold-gradient tracking-[0.2em] drop-shadow-lg">
                        {activeBuilding ? activeBuilding.name : 'Vila de Tristram'}
                    </h1>
                    <p className="text-[#666] font-serif italic mt-2">
                        {activeBuilding ? activeBuilding.description : 'Um refúgio seguro antes da escuridão.'}
                    </p>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 relative z-10 flex items-center justify-center gap-4 md:gap-8 lg:gap-12 p-4 md:p-8 lg:p-12">

                {!activeBuilding ? (
                    // Village Square View (Buildings & Fountain)
                    // Village Square View (Buildings)
                    <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 lg:gap-12">
                        {BUILDINGS.map((building) => (
                            <button
                                key={building.id}
                                onClick={() => handleEnterBuilding(building)}
                                className="group flex flex-col items-center gap-4 transition-transform hover:scale-105"
                            >
                                <div className={`w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-lg border-2 border-[#333] bg-[#111] flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.5)] ${building.borderColor} ${building.shadowColor} transition-all relative overflow-hidden`}>
                                    <div className={`absolute inset-0 ${building.bgHover} transition-colors pointer-events-none z-10`} />
                                    {building.image ? (
                                        <>
                                            <img src={building.image} alt={building.name} className="absolute inset-0 w-full h-full object-cover opacity-100 group-hover:scale-110 transition-all duration-700" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                                        </>
                                    ) : (
                                        <Home size={80} className="text-[#333] absolute opacity-20" />
                                    )}
                                    {!building.image && (
                                        <building.icon size={80} className={`text-[#666] group-hover:${building.color.replace('text-', 'text-')} transition-colors relative z-10`} />
                                    )}
                                </div>
                                <div className="text-center bg-black/80 px-3 py-1 rounded border border-[#333] backdrop-blur-sm">
                                    <div className={`text-[#ccc] font-bold font-['Cinzel'] text-sm group-hover:${building.color.replace('text-', 'text-')} transition-colors`}>{building.name}</div>
                                </div>
                            </button>
                        ))}

                        {/* Personal Stash - Floating/Extra Object */}
                        <button
                            onClick={onOpenStash}
                            className="group flex flex-col items-center gap-4 transition-transform hover:scale-105"
                        >
                            <div className="w-20 h-20 rounded-lg border-2 border-[#333] bg-[#1a1a1a] flex items-center justify-center shadow-lg group-hover:border-[#c5a059] transition-all relative overflow-hidden">
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-[#c5a059]/10 transition-colors" />
                                <Archive size={32} className="text-[#666] group-hover:text-[#c5a059] relative z-10" />
                            </div>
                            <div className="text-center bg-black/80 px-2 py-1 rounded border border-[#333] backdrop-blur-sm">
                                <div className="text-[#ccc] font-bold font-['Cinzel'] text-xs group-hover:text-[#c5a059]">Baú Pessoal</div>
                            </div>
                        </button>
                    </div>
                ) : (
                    // Building Interior View (NPCs)
                    <div className="flex items-center gap-12 animate-in fade-in zoom-in-95 duration-300">
                        {activeBuilding.npcs.map(npcId => {
                            const npc = NPC_DIALOGS[npcId];
                            return (
                                <button
                                    key={npcId}
                                    onClick={() => handleInteraction(npcId)}
                                    className="group flex flex-col items-center gap-4 transition-transform hover:scale-105"
                                >
                                    <div className={`w-32 h-32 rounded-full border-2 border-[#333] bg-[#111] flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.5)] group-hover:border-[#c5a059] group-hover:shadow-[0_0_50px_rgba(197,160,89,0.5)] transition-all relative overflow-hidden`}>
                                        <div className="absolute inset-0 group-hover:bg-[#c5a059]/10 transition-colors pointer-events-none z-10" />
                                        {npc.image ? (
                                            <img src={npc.image} alt={npc.name} className="w-full h-full object-cover opacity-100 transition-opacity" />
                                        ) : (
                                            <MessageSquare size={48} className="text-[#666] group-hover:text-[#c5a059] transition-colors relative z-10" />
                                        )}
                                    </div>
                                    <div className="text-center">
                                        <div className="text-[#ccc] font-bold font-['Cinzel'] text-lg group-hover:text-[#c5a059] transition-colors">{npc.name}</div>
                                        <div className="text-xs text-[#555] uppercase tracking-widest">{npc.title}</div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Gate to Cathedral (Only visible in Village Square) */}
            {!activeBuilding && (
                <div className="relative z-10 pb-12 flex justify-center">
                    <button
                        onClick={() => onNavigate('GAME')}
                        className="group flex items-center gap-4 px-8 py-4 bg-[#1a0505] border border-[#444] hover:border-red-900 hover:bg-[#2a0505] transition-all shadow-[0_0_30px_rgba(0,0,0,0.8)]"
                    >
                        <DoorOpen size={32} className="text-[#666] group-hover:text-red-500 transition-colors" />
                        <div className="text-left">
                            <div className="text-[#ccc] font-bold font-['Cinzel'] text-lg group-hover:text-red-100">Entrar na Catedral</div>
                            <div className="text-xs text-[#555] uppercase tracking-widest group-hover:text-red-900">Iniciar Aventura</div>
                        </div>
                    </button>
                </div>
            )}

            {/* Interaction Modal */}
            {activeNPC && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="w-full max-w-2xl bg-[#0c0c0c] border border-[#333] shadow-2xl relative flex flex-col">
                        {/* Close Button */}
                        <button
                            onClick={() => setActiveNPC(null)}
                            className="absolute top-4 right-4 text-[#666] hover:text-white"
                        >
                            <X size={24} />
                        </button>

                        {/* NPC Header */}
                        <div className="p-8 border-b border-[#333] flex items-center gap-6 bg-[#111]">
                            <div className="w-20 h-20 rounded-full border-2 border-[#c5a059] bg-[#0a0a0a] flex items-center justify-center overflow-hidden shadow-[0_0_20px_rgba(197,160,89,0.3)]">
                                {activeNPC.image ? (
                                    <img src={activeNPC.image} alt={activeNPC.name} className="w-full h-full object-cover" />
                                ) : (
                                    <User size={40} className="text-[#c5a059]" />
                                )}
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-[#c5a059] font-['Cinzel']">{activeNPC.name}</h2>
                                <p className="text-[#666] uppercase tracking-widest text-xs">{activeNPC.title}</p>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-8 flex-1">
                            <p className="text-[#ccc] font-serif italic text-lg mb-8 border-l-2 border-[#333] pl-4 animate-in fade-in slide-in-from-left-2 duration-300">
                                "{currentDialog}"
                            </p>

                            {message && (
                                <div className="mb-6 p-4 bg-[#1a1a1a] border border-[#c5a059]/30 text-[#e6c885] text-sm rounded">
                                    {message}
                                </div>
                            )}

                            {showWhispers ? (
                                <div className="space-y-2">
                                    <button 
                                        onClick={() => setShowWhispers(false)}
                                        className="mb-4 flex items-center gap-2 text-[#666] hover:text-[#c5a059] uppercase tracking-widest text-xs font-bold"
                                    >
                                        <ArrowLeft size={14} /> Voltar
                                    </button>
                                    <div className="grid grid-cols-1 gap-2 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
                                        {activeNPC.stories && activeNPC.stories.map((story, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => setCurrentDialog(story)}
                                                className="bg-[#111] border border-[#333] p-3 text-left hover:border-[#c5a059] hover:bg-[#1a1a1a] transition-all group"
                                            >
                                                <span className="text-[#ccc] text-sm group-hover:text-white font-serif italic line-clamp-1">
                                                    "{story}"
                                                </span>
                                            </button>
                                        ))}
                                        {(!activeNPC.stories || activeNPC.stories.length === 0) && (
                                            <div className="text-[#666] italic text-sm">Nenhum rumor no momento.</div>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 gap-4">
                                    {activeNPC.options.map(option => (
                                        <button
                                            key={option.id}
                                            onClick={() => handleOptionClick(option)}
                                            className="flex items-center gap-4 p-4 bg-[#111] border border-[#333] hover:border-[#c5a059] hover:bg-[#1a1a1a] transition-all group text-left"
                                        >
                                            <option.icon size={24} className="text-[#555] group-hover:text-[#c5a059] transition-colors" />
                                            <div>
                                                <div className="font-bold text-[#ccc] group-hover:text-white">{option.label}</div>
                                                {option.cost && (
                                                    <div className="text-xs text-[#666] group-hover:text-[#c5a059]">Custo: {option.cost} Ouro</div>
                                                )}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
            {/* Shop Interface */}
            {showShop && (
                <ShopInterface
                    onClose={() => setShowShop(false)}
                    heroGold={hero.gold}
                    inventory={inventory}
                    onBuy={onBuyItem}
                    onSell={onSellItem}
                    onRepair={handleRepair}
                    shopData={currentShop.data}
                    title={currentShop.title}
                    subtitle={currentShop.subtitle}
                />
            )}

            {/* Mining Interface */}
            {showMining && coalMine && (
                <CoalMineInterface
                    onClose={() => setShowMining(false)}
                    miningState={coalMine.miningState}
                    buyUpgrade={coalMine.buyUpgrade}
                    collectResources={coalMine.collectResources}
                    resolveStatus={coalMine.resolveStatus}
                    upgradesData={coalMine.UPGRADES}
                    heroGold={hero.gold}
                />
            )}
        </div>
    );
};

export default Village;


