import React, { useState, useEffect } from 'react';
import { Search, Hammer, FlaskConical, Scroll, Lock, Star, ArrowRight, X, BookOpen, Award, Flame, CheckCircle, ChevronDown } from 'lucide-react';
import { PROFESSIONS_DATA } from '../data/professions';
import ItemsDB from '../database/items';
import ProfessionSpecialization from './ProfessionSpecialization';

const ProfessionIcon = ({ id, size = 20, className = "" }) => {
    switch (id) {
        case 'alchemy': return <FlaskConical size={size} className={className} />;
        case 'blacksmithing': return <Hammer size={size} className={className} />;
        default: return <Hammer size={size} className={className} />;
    }
};

const RarityColor = {
    common: 'text-[#a8a8a8]',
    uncommon: 'text-emerald-400',
    rare: 'text-blue-400',
    epic: 'text-purple-400',
    unique: 'text-[#c5a059]'
};

const Professions = ({ onClose, initialProfessionId, inventory = [], onUseItem, onAddItem, hero, onShowTooltip, onHideTooltip }) => {
    const [activeProfessionId, setActiveProfessionId] = useState(initialProfessionId || 'alchemy');
    const [activeTab, setActiveTab] = useState('recipes');
    const [selectedRecipeId, setSelectedRecipeId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [forgeHeat, setForgeHeat] = useState(0);
    const [craftAmount, setCraftAmount] = useState(1);
    const [craftFeedback, setCraftFeedback] = useState(null);
    const [professionPoints, setProfessionPoints] = useState(0); // Available points
    const [nodeInvestments, setNodeInvestments] = useState({}); // { nodeId: currentPoints }
    const [expandedCategories, setExpandedCategories] = useState({}); // { categoryName: true/false }

    // Toggle category expansion
    const toggleCategory = (categoryName) => {
        setExpandedCategories(prev => ({
            ...prev,
            [categoryName]: !prev[categoryName]
        }));
    };

    // Helper: Get count of reagent in inventory
    const getReagentCount = (itemId) => {
        const slot = inventory.find(slot => slot.item.id === itemId);
        return slot ? slot.count : 0;
    };

    // Check if player can craft
    const canCraft = (recipe) => {
        if (!recipe) return false;
        return recipe.reagents.every(reagent => {
            const available = getReagentCount(reagent.itemId);
            return available >= reagent.count;
        });
    };

    // Craft Item
    const handleCraft = () => {
        if (!selectedRecipe || !canCraft(selectedRecipe)) return;

        // Consume reagents
        let allConsumed = true;
        selectedRecipe.reagents.forEach(reagent => {
            if (!onUseItem(reagent.itemId, reagent.count)) {
                allConsumed = false;
            }
        });

        if (!allConsumed) {
            setCraftFeedback({ success: false, message: 'Erro ao consumir materiais!' });
            setTimeout(() => setCraftFeedback(null), 2000);
            return;
        }

        // Get item from database
        let resultItem = ItemsDB.getById(selectedRecipe.result.itemId);
        
        // Fallback if not in DB (use recipe data)
        if (!resultItem) {
            resultItem = {
                id: selectedRecipe.result.itemId,
                name: selectedRecipe.name,
                type: selectedRecipe.category,
                rarity: selectedRecipe.rarity,
                value: 100,
                description: selectedRecipe.description,
                stats: {}
            };
        }

        // Add to inventory
        if (onAddItem && onAddItem(resultItem, selectedRecipe.result.count || 1)) {
            // Award Profession Points based on difficulty
            const pointsGained = Math.max(1, Math.floor(selectedRecipe.difficulty / 10));
            setProfessionPoints(prev => prev + pointsGained);
            
            setCraftFeedback({ success: true, message: `${selectedRecipe.name} criado! +${pointsGained} Pontos de ${activeProfession.name}` });
            setTimeout(() => setCraftFeedback(null), 3000);
        } else {
            setCraftFeedback({ success: false, message: 'Inventário cheio!' });
            setTimeout(() => setCraftFeedback(null), 2000);
        }
    };

    // Invest point in specialization node
    const investPoint = (nodeId, specId) => {
        if (professionPoints <= 0) return false;
        
        const spec = activeProfession.specializations.find(s => s.id === specId);
        const node = spec.nodes.find(n => n.id === nodeId);
        if (!node) return false;

        const currentPoints = nodeInvestments[nodeId] || 0;
        
        // Check if maxed
        if (currentPoints >= node.maxPoints) return false;

        // Check parent requirement (must have at least 1 point in parent if not root)
        if (node.parentId) {
            const parentPoints = nodeInvestments[node.parentId] || 0;
            if (parentPoints === 0) return false; // Parent must be invested first
        }

        // Invest
        setNodeInvestments(prev => ({
            ...prev,
            [nodeId]: currentPoints + 1
        }));
        setProfessionPoints(prev => prev - 1);
        return true;
    };

    // Initialize expanded categories when profession changes
    useEffect(() => {
        const activeProfession = PROFESSIONS_DATA[activeProfessionId];
        if (!activeProfession) return;

        // Get all unique categories
        const allCategories = [...new Set(activeProfession.recipes.map(r => r.category))];
        
        // Initialize all categories as expanded (true)
        const initialExpanded = {};
        allCategories.forEach(category => {
            initialExpanded[category] = true;
        });
        
        setExpandedCategories(initialExpanded);
    }, [activeProfessionId]);

    // Passive Heat Decay (For Blacksmithing)
    useEffect(() => {
        if (activeProfessionId !== 'blacksmithing') return;
        
        const decayTimer = setInterval(() => {
            setForgeHeat(prev => Math.max(0, prev - 1)); // Lose 1 heat per second
        }, 1000);

        return () => clearInterval(decayTimer);
    }, [activeProfessionId]);

    const burnCoal = () => {
        const coalSlot = inventory.find(slot => slot.item.id === 'coal');
        if (!coalSlot || coalSlot.count < 1) return;

        if (onUseItem && onUseItem('coal', 1)) {
            setForgeHeat(prev => Math.min(100, prev + 20)); // +20 heat per coal
        }
    };

    const getHeatBuffs = () => {
        if (forgeHeat >= 80) return { qualityBonus: 15, costReduction: 25, label: 'FOGO INFERNAL' };
        if (forgeHeat >= 50) return { qualityBonus: 10, costReduction: 15, label: 'AQUECIDA' };
        if (forgeHeat >= 25) return { qualityBonus: 5, costReduction: 5, label: 'MORNA' };
        return { qualityBonus: 0, costReduction: 0, label: 'FRIA' };
    };

    const heatBuffs = getHeatBuffs();
    const coalCount = inventory.find(slot => slot.item.id === 'coal')?.count || 0;

    const activeProfession = PROFESSIONS_DATA[activeProfessionId];
    const recipes = activeProfession.recipes.filter(r =>
        r.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Group recipes by category
    const categories = [...new Set(recipes.map(r => r.category))];

    const selectedRecipe = selectedRecipeId
        ? activeProfession.recipes.find(r => r.id === selectedRecipeId)
        : activeProfession.recipes[0];

    const canCraftSelected = selectedRecipe ? canCraft(selectedRecipe) : false;

    return (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-8 animate-in fade-in zoom-in-95 duration-300">
            <div className="w-full max-w-5xl h-[80vh] bg-[#0c0c0c] border border-[#333] shadow-2xl flex flex-col relative overflow-hidden">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-50 p-2 text-[#666] hover:text-white hover:bg-[#222] rounded-full transition-colors"
                >
                    <X size={24} />
                </button>

                {/* Header */}
                <div className="h-16 bg-[#111] border-b border-[#333] flex items-center px-6 shrink-0">
                    <div className="flex items-center gap-4">
                        <div className="p-2 bg-[#1a1a1a] border border-[#333] rounded-lg">
                            <ProfessionIcon id={activeProfessionId} size={24} className="text-[#c5a059]" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold font-['Cinzel'] text-gold-gradient tracking-wider">
                                {activeProfession.name}
                            </h2>
                            <div className="flex items-center gap-2 text-xs text-[#666]">
                                <span className="uppercase tracking-widest">Nível {activeProfession.level}/{activeProfession.maxLevel}</span>
                                <div className="w-32 h-1.5 bg-[#222] rounded-full overflow-hidden">
                                    <div className="h-full bg-[#c5a059] w-[18%]" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-1 overflow-hidden relative">
                    {activeTab === 'specs' ? (
                        <div className="absolute inset-0 z-20">
                            <ProfessionSpecialization 
                                key={activeProfession.id} 
                                profession={activeProfession} 
                                availablePoints={professionPoints}
                                nodeInvestments={nodeInvestments}
                                onInvest={investPoint}
                            />
                        </div>
                    ) : (
                        <>
                            {/* Sidebar - Recipe List */}
                            <div className="w-80 bg-[#0a0a0a] border-r border-[#333] flex flex-col">
                                
                                {/* Forge Heat Meter (Blacksmithing Only) */}
                                {activeProfessionId === 'blacksmithing' && (
                                    <div className="p-4 bg-[#111] border-b border-[#333]">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-2">
                                                <Flame size={16} className={forgeHeat > 50 ? 'text-orange-500 animate-pulse' : 'text-[#555]'} />
                                                <span className="text-xs font-bold uppercase tracking-wider text-[#888]">Calor da Forja</span>
                                            </div>
                                            <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                                                forgeHeat >= 80 ? 'bg-red-900/30 border-red-500 text-red-400' :
                                                forgeHeat >= 50 ? 'bg-orange-900/30 border-orange-500 text-orange-400' :
                                                forgeHeat >= 25 ? 'bg-yellow-900/30 border-yellow-700 text-yellow-500' :
                                                'bg-[#1a1a1a] border-[#333] text-[#555]'
                                            }`}>
                                                {heatBuffs.label}
                                            </span>
                                        </div>
                                        <div className="h-2 w-full bg-[#050505] rounded-full overflow-hidden border border-[#333] relative mb-2">
                                            <div 
                                                className={`h-full transition-all duration-500 ${
                                                    forgeHeat >= 80 ? 'bg-gradient-to-r from-red-600 to-orange-500' :
                                                    forgeHeat >= 50 ? 'bg-gradient-to-r from-orange-600 to-yellow-500' :
                                                    'bg-gradient-to-r from-[#666] to-[#888]'
                                                }`}
                                                style={{ width: `${forgeHeat}%` }}
                                            />
                                        </div>
                                        <button
                                            onClick={burnCoal}
                                            disabled={coalCount === 0}
                                            className={`w-full py-2 text-xs font-bold uppercase tracking-wider border transition-all ${
                                                coalCount > 0
                                                ? 'bg-orange-900/20 border-orange-900 text-orange-400 hover:bg-orange-900/40'
                                                : 'bg-[#111] border-[#333] text-[#333] cursor-not-allowed'
                                            }`}
                                        >
                                            <div className="flex items-center justify-center gap-2">
                                                <Flame size={12} />
                                                Queimar Carvão ({coalCount})
                                            </div>
                                        </button>
                                        {heatBuffs.qualityBonus > 0 && (
                                            <div className="mt-2 text-[9px] text-center text-emerald-400 uppercase">
                                                +{heatBuffs.qualityBonus}% Qualidade • -{heatBuffs.costReduction}% Custo
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Search */}
                                <div className="p-4 border-b border-[#333]">
                                    <div className="relative">
                                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#555]" />
                                        <input
                                            type="text"
                                            placeholder="Procurar..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="w-full bg-[#111] border border-[#333] rounded py-2 pl-9 pr-4 text-sm text-[#ccc] focus:border-[#c5a059] focus:outline-none placeholder-[#444]"
                                        />
                                    </div>
                                </div>

                                {/* List */}
                                <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
                                    {categories.map(category => {
                                        const categoryRecipes = recipes.filter(r => r.category === category);
                                        const recipeCount = categoryRecipes.length;
                                        const isExpanded = expandedCategories[category] === true; // Explicitly check for true
                                        
                                        return (
                                        <div key={category} className="mb-4">
                                            <button
                                                onClick={() => toggleCategory(category)}
                                                className="w-full text-left px-3 py-2 flex items-center gap-2 hover:bg-[#111] transition-colors group"
                                            >
                                                <ChevronDown 
                                                    size={14} 
                                                    className={`text-[#666] group-hover:text-[#888] transition-transform duration-200 ${isExpanded ? 'rotate-0' : '-rotate-90'}`}
                                                />
                                                <h3 className="text-xs font-bold text-[#888] group-hover:text-[#aaa] uppercase tracking-wider transition-colors">
                                                    {category} <span className="text-[#c5a059] font-semibold">({recipeCount})</span>
                                                </h3>
                                            </button>
                                            {isExpanded && (
                                                <div className="space-y-0.5 mt-1">
                                                    {categoryRecipes.map(recipe => {
                                                    const recipeItem = ItemsDB.getById(recipe.result.itemId);
                                                    
                                                    return (
                                                        <button
                                                            key={recipe.id}
                                                            onClick={() => setSelectedRecipeId(recipe.id)}
                                                            onMouseEnter={(e) => {
                                                                if (recipeItem && onShowTooltip) {
                                                                    onShowTooltip(recipeItem, e.currentTarget.getBoundingClientRect(), 'right');
                                                                }
                                                            }}
                                                            onMouseLeave={() => onHideTooltip && onHideTooltip()}
                                                            className={`w-full text-left px-3 py-2 flex items-center gap-3 transition-all border border-transparent ${selectedRecipe?.id === recipe.id
                                                                ? 'bg-[#1a1a1a] border-[#333] text-[#c5a059]'
                                                                : 'hover:bg-[#111] text-[#888]'
                                                                }`}
                                                        >
                                                            <span className={`text-sm font-medium truncate ${selectedRecipe?.id === recipe.id ? '' : RarityColor[recipe.rarity] || 'text-[#888]'}`}>
                                                                {recipe.name}
                                                            </span>
                                                        </button>
                                                    );
                                                })}
                                                </div>
                                            )}
                                        </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Main Content - Details */}
                            <div className="flex-1 bg-[#0e0e0e] flex flex-col relative">
                                {/* Background Watermark */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none">
                                    <ProfessionIcon id={activeProfessionId} size={400} />
                                </div>

                                {selectedRecipe ? (
                                    <div className="flex-1 p-8 flex flex-col relative z-10">
                                        {/* Craft Feedback Toast */}
                                        {craftFeedback && (
                                            <div className={`absolute top-4 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded border-2 flex items-center gap-3 animate-in slide-in-from-top-2 fade-in duration-300 ${
                                                craftFeedback.success 
                                                    ? 'bg-emerald-900/30 border-emerald-500 text-emerald-400' 
                                                    : 'bg-red-900/30 border-red-500 text-red-400'
                                            }`}>
                                                {craftFeedback.success && <CheckCircle size={20} />}
                                                {!craftFeedback.success && <X size={20} />}
                                                <span className="font-bold text-sm">{craftFeedback.message}</span>
                                            </div>
                                        )}

                                        {/* Recipe Header */}
                                        <div className="flex items-start gap-6 mb-8">
                                            <div 
                                                className="w-20 h-20 bg-[#111] border-2 border-[#333] shadow-lg flex items-center justify-center relative group cursor-pointer"
                                                onMouseEnter={(e) => {
                                                    const item = ItemsDB.getById(selectedRecipe.result.itemId);
                                                    if (item && onShowTooltip) {
                                                        onShowTooltip(item, e.currentTarget.getBoundingClientRect(), 'right');
                                                    }
                                                }}
                                                onMouseLeave={() => onHideTooltip && onHideTooltip()}
                                            >
                                                <div className={`absolute inset-0 opacity-20 ${selectedRecipe.rarity === 'unique' ? 'bg-yellow-500' :
                                                    selectedRecipe.rarity === 'epic' ? 'bg-purple-500' : 'bg-transparent'
                                                    }`} />
                                                <ProfessionIcon id={activeProfessionId} size={40} className="text-[#888] group-hover:text-[#c5a059] transition-colors" />
                                            </div>
                                            <div>
                                                <h1 className={`text-3xl font-bold font-['Cinzel'] mb-2 ${RarityColor[selectedRecipe.rarity]}`}>
                                                    {selectedRecipe.name}
                                                </h1>
                                                <p className="text-[#666] italic font-serif max-w-lg leading-relaxed">
                                                    "{selectedRecipe.description}"
                                                </p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-8 flex-1">
                                            {/* Reagents */}
                                            <div>
                                                <h3 className="text-xs font-bold text-[#c5a059] uppercase tracking-[0.2em] mb-4 border-b border-[#333] pb-2">
                                                    Reagentes Necessários
                                                </h3>
                                                <div className="space-y-3">
                                                    {selectedRecipe.reagents.map((reagent, idx) => {
                                                        const available = getReagentCount(reagent.itemId);
                                                        const hasEnough = available >= reagent.count;
                                                        let reagentItem = ItemsDB.getById(reagent.itemId);
                                                        
                                                        // Fallback: Create temporary item data for tooltip if not in DB
                                                        if (!reagentItem) {
                                                            reagentItem = {
                                                                id: reagent.itemId,
                                                                name: reagent.name,
                                                                type: 'Material',
                                                                rarity: 'common',
                                                                value: 10,
                                                                description: 'Reagente de crafting.',
                                                                stackable: true
                                                            };
                                                        }
                                                        
                                                        return (
                                                            <div 
                                                                key={idx} 
                                                                className={`flex items-center gap-3 p-2 border transition-all ${
                                                                    hasEnough ? 'bg-[#111] border-[#222]' : 'bg-red-900/10 border-red-900/30'
                                                                }`}
                                                                onMouseEnter={(e) => {
                                                                    if (onShowTooltip) {
                                                                        onShowTooltip(reagentItem, e.currentTarget.getBoundingClientRect(), 'right');
                                                                    }
                                                                }}
                                                                onMouseLeave={() => onHideTooltip && onHideTooltip()}
                                                            >
                                                                <div className={`w-10 h-10 bg-[#050505] border flex items-center justify-center cursor-help ${
                                                                    hasEnough ? 'border-[#333]' : 'border-red-900/50'
                                                                }`}>
                                                                    <div className={`w-2 h-2 rotate-45 ${hasEnough ? 'bg-emerald-500' : 'bg-red-500'}`} />
                                                                </div>
                                                                <div className="flex-1">
                                                                    <div className="text-sm font-bold text-[#ccc]">{reagent.name}</div>
                                                                    <div className="text-xs">
                                                                        Disponível: <span className={hasEnough ? 'text-emerald-500' : 'text-red-500'}>{available}</span> / {reagent.count}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>

                                            {/* Crafting Details */}
                                            <div>
                                                <div className="bg-[#111] border border-[#333] p-6 shadow-inner">
                                                    <h3 className="text-center font-['Cinzel'] text-[#ccc] mb-6 border-b border-[#333] pb-2">Detalhes da Criação</h3>

                                                    <div className="space-y-3 text-sm">
                                                        <div className="flex justify-between">
                                                            <span className="text-[#666]">Dificuldade</span>
                                                            <span className="text-[#ccc] font-mono">{selectedRecipe.difficulty}</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-[#666]">Perícia</span>
                                                            <span className="text-[#c5a059] font-mono">{activeProfession.level}</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-[#666]">Multicriação</span>
                                                            <span className="text-[#ccc] font-mono">10%</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-[#666]">Engenhosidade</span>
                                                            <span className="text-[#ccc] font-mono">5%</span>
                                                        </div>
                                                    </div>

                                                    <div className="mt-6 pt-4 border-t border-[#333]">
                                                        <div className="flex items-center justify-between mb-2">
                                                            <span className="text-xs text-[#888] uppercase">Qualidade Esperada</span>
                                                            <div className="flex gap-1">
                                                                <Star size={12} className="text-[#c5a059] fill-[#c5a059]" />
                                                                <Star size={12} className="text-[#c5a059] fill-[#c5a059]" />
                                                                <Star size={12} className="text-[#333]" />
                                                            </div>
                                                        </div>
                                                        <div className="w-full h-2 bg-[#050505] rounded-full overflow-hidden border border-[#333]">
                                                            <div className="h-full bg-gradient-to-r from-[#c5a059] to-yellow-200 w-[70%]" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Action Bar */}
                                        <div className="mt-auto pt-6 flex items-center justify-between border-t border-[#333]">
                                            <div className="flex items-center gap-4">
                                                <div className="flex items-center gap-2 bg-[#111] border border-[#333] px-2 py-1 rounded">
                                                    <button 
                                                        onClick={() => setCraftAmount(Math.max(1, craftAmount - 1))}
                                                        className="text-[#666] hover:text-white px-2"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="text-white font-mono w-8 text-center">{craftAmount}</span>
                                                    <button 
                                                        onClick={() => setCraftAmount(craftAmount + 1)}
                                                        className="text-[#666] hover:text-white px-2"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                                <span className="text-xs text-[#666] italic">(Multicriação em breve)</span>
                                            </div>

                                            <button 
                                                onClick={handleCraft}
                                                disabled={!canCraftSelected}
                                                className={`font-bold px-8 py-3 font-['Cinzel'] tracking-widest transition-all flex items-center gap-2 ${
                                                    canCraftSelected
                                                    ? 'bg-[#c5a059] hover:bg-[#d4b06a] text-black shadow-[0_0_20px_rgba(197,160,89,0.3)] hover:shadow-[0_0_30px_rgba(197,160,89,0.5)]'
                                                    : 'bg-[#222] text-[#444] cursor-not-allowed border border-[#333]'
                                                }`}
                                            >
                                                {activeProfessionId === 'blacksmithing' ? <Hammer size={18} /> : <FlaskConical size={18} />}
                                                {canCraftSelected ? 'CRIAR' : 'MATERIAIS INSUFICIENTES'}
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex-1 flex items-center justify-center text-[#333] flex-col gap-4">
                                        <ProfessionIcon id={activeProfessionId} size={64} className="opacity-20" />
                                        <p className="font-serif italic">Selecione uma receita para ver os detalhes.</p>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>

                {/* Bottom Tabs */}
                <div className="h-12 bg-[#050505] border-t border-[#333] flex items-center px-4 gap-1 relative z-30">
                    <button
                        onClick={() => setActiveTab('recipes')}
                        className={`flex items-center gap-2 px-6 py-2 h-full border-t-2 transition-all ${activeTab === 'recipes'
                            ? 'border-[#c5a059] bg-[#1a1a1a] text-[#c5a059]'
                            : 'border-transparent text-[#666] hover:text-[#ccc] hover:bg-[#111]'
                            }`}
                    >
                        <BookOpen size={16} />
                        <span className="text-xs font-bold uppercase tracking-widest">Receitas</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('specs')}
                        className={`flex items-center gap-2 px-6 py-2 h-full border-t-2 transition-all ${activeTab === 'specs'
                            ? 'border-[#c5a059] bg-[#1a1a1a] text-[#c5a059]'
                            : 'border-transparent text-[#666] hover:text-[#ccc] hover:bg-[#111]'
                            }`}
                    >
                        <Award size={16} />
                        <span className="text-xs font-bold uppercase tracking-widest">Especializações</span>
                        {professionPoints > 0 && (
                            <span className="bg-[#c5a059] text-black text-[9px] font-bold px-1.5 py-0.5 rounded ml-1 animate-pulse">
                                {professionPoints}
                            </span>
                        )}
                    </button>
                </div>
            </div>
        </div >
    );
};

export default Professions;
