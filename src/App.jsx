import React, { useState, useEffect, useCallback, useMemo } from 'react';
import TalentTree from './components/TalentTree';
import Professions from './components/Professions';
import Village from './components/Village';
import Documentation from './components/Documentation';
import CharacterSheet from './components/CharacterSheet';
import ErrorBoundary from './components/ErrorBoundary';
import UpdateNotification from './components/UpdateNotification';
import TempleBuilder from './components/TempleBuilder';

import HUDLeft from './components/HUDLeft';
import HUDRight from './components/HUDRight';
import CenterGrid from './components/CenterGrid';
import { generateEvent } from './systems/eventGenerator';
import { TALENT_DATA } from './data/talents';
import { INITIAL_HERO } from './data/initialState';
import { useCombat } from './hooks/useCombat';
import { useQuests } from './hooks/useQuests';
import { useCoalMine } from './hooks/useCoalMine';
import { useInventory } from './hooks/useInventory';
import { useSaveGame } from './hooks/useSaveGame';
import { useVersionCheck } from './hooks/useVersionCheck';
import QuestLog from './components/QuestLog';
import InventoryInterface from './components/InventoryInterface';

const INITIAL_INVENTORY = [
    {
        item: {
            id: 'potion_small', // Added ID for new system
            name: "Poção de Vida",
            rarity: "common",
            type: "Consumível",
            value: 10,
            description: "Recupera 50 HP.",
            stats: { heal: 50 }
        },
        count: 3
    }
];

function App() {
    const [hero, setHero] = useState(INITIAL_HERO);
    const [activeView, setActiveView] = useState('VILLAGE');
    const [previousView, setPreviousView] = useState('VILLAGE');
    const [selectedProfession, setSelectedProfession] = useState(null);
    const [floor, setFloor] = useState(1);
    const [corridor, setCorridor] = useState(1);
    const [logs, setLogs] = useState([{
        time: new Date().toLocaleTimeString(),
        text: "Você entra na Catedral Sombria. O ar é frio e úmido.",
        type: 'info'
    }]);
    const [saveLoaded, setSaveLoaded] = useState(false);

    // Version Check Hook
    const { newVersionAvailable, reloadApp, isReloading, currentVersion, newVersion } = useVersionCheck();

    if (!hero) {
        return <div className="flex items-center justify-center h-screen text-red-500 font-bold text-2xl">ERRO CRÍTICO: Herói não inicializado. Verifique INITIAL_HERO.</div>;
    }

    const handleViewChange = (view, data = null) => {
        // If navigating TO a menu view FROM a world view, save the world view
        if (['TALENTS', 'PROFESSIONS', 'DOCUMENTATION', 'CHARACTER', 'QUESTS'].includes(view)) {
            if (['GAME', 'VILLAGE'].includes(activeView)) {
                setPreviousView(activeView);
            }
        }

        setActiveView(view);
        if (view === 'PROFESSIONS' && data) {
            setSelectedProfession(data);
        } else {
            setSelectedProfession(null);
        }
    };

    const handleCloseMenu = () => {
        setActiveView(previousView);
    };

    const addLog = useCallback((text, type = 'info') => {
        setLogs(prev => [...prev, { time: new Date().toLocaleTimeString(), text, type }]);
    }, []);

    // --- Inventory System ---
    const inventorySystem = useInventory(INITIAL_INVENTORY);
    const { inventory, addItem, removeItem, hasItem, setInventory, setStash } = inventorySystem;
    
    // Compatibility Adapter: Components expect a simple array of non-null items
    const inventoryList = inventory.filter(slot => slot !== null);

    // Initialize Quests
    // Note: We pass 'inventoryList' for reading, but we might need a better way for quests to consume items later
    // For now, Quests hook might try to setInventory directly, which breaks.
    // We will pass a dummy setter or update useQuests later. 
    // Actually, let's pass a wrapped setter that finds the item and removes it?
    // For MVP, let's keep useQuests decoupled or update it.
    // Let's update useQuests to accept 'hasItem' and 'removeItem' callbacks instead of raw state.
    // But for now, let's keep the prop signature and maybe break it slightly until we fix Quests.
    const { questState, setQuestState, acceptQuest, updateQuestProgress, checkAndClaim } = useQuests(hero, setHero, addLog, inventorySystem.setInventory); 

    // Initialize Coal Mine (Idle Mechanic)
    const coalMine = useCoalMine(hero, setHero);

    // Save/Load System - Memoized to prevent re-creation on every render
    const gameStateToSave = useMemo(() => ({
        hero,
        activeView,
        floor,
        corridor,
        logs,
        questState,
        inventory: inventory, // Save complete grid with nulls to preserve positions
        coalMine: {
            coal: coalMine.miningState.coal,
            maxCoal: coalMine.miningState.maxCoal,
            rate: coalMine.miningState.rate,
            upgrades: coalMine.miningState.upgrades,
            lastUpdateTime: coalMine.miningState.lastUpdateTime
        }
    }), [hero, activeView, floor, corridor, logs, questState, inventory, coalMine.miningState]);

    const { saveGame, loadGame, deleteSave, hasSave } = useSaveGame(gameStateToSave);

    // Load save on mount
    useEffect(() => {
        if (!saveLoaded) {
            const savedData = loadGame();
            if (savedData) {
                setHero(savedData.hero || INITIAL_HERO);
                setActiveView(savedData.activeView || 'VILLAGE');
                setFloor(savedData.floor || 1);
                setCorridor(savedData.corridor || 1);
                setLogs(savedData.logs || logs);
                
                // Restore questState
                if (savedData.questState) {
                    setQuestState(savedData.questState);
                }
                
                // Restore inventory - direct restore since we now save the complete grid
                if (savedData.inventory && Array.isArray(savedData.inventory)) {
                    setInventory(savedData.inventory);
                }

                // Restore coal mine - atualiza timestamp para processar tempo offline
                if (savedData.coalMine) {
                    coalMine.setMiningState(prev => ({
                        ...prev,
                        coal: savedData.coalMine.coal || 0,
                        maxCoal: savedData.coalMine.maxCoal || 100,
                        rate: savedData.coalMine.rate || 1.0,
                        upgrades: savedData.coalMine.upgrades || prev.upgrades,
                        lastUpdateTime: savedData.coalMine.lastUpdateTime || Date.now()
                    }));
                }
                
                addLog("Progresso carregado com sucesso!", 'info');
            }
            setSaveLoaded(true);
        }
    }, [saveLoaded, loadGame, logs, addLog, setQuestState, setInventory, coalMine]);

    // Reset game function
    const handleResetGame = () => {
        deleteSave();
        window.location.reload();
    };

    const handleCollectMine = () => {
        const result = coalMine.collectResources();
        if (result) {
            let addedCount = 0;
            
            // Add Coal
            if (result.coal > 0) {
                const coalItem = { id: 'coal', name: 'Carvão', type: 'Material', rarity: 'common', value: 5, description: 'Combustível para a forja.' };
                if (addItem(coalItem, result.coal)) addedCount++;
            }

            // Add Items
            result.items.forEach(loot => {
                // Ensure loot has ID
                const itemWithId = { ...loot, id: loot.id || loot.name.toLowerCase().replace(/\s+/g, '_') };
                if (addItem(itemWithId, loot.count)) addedCount++;
            });

            if (addedCount > 0) {
                addLog(`Coletou ${result.coal} carvão e itens da mina.`, 'loot');
            } else {
                addLog("Inventário cheio! Não foi possível coletar tudo.", 'info');
                // Ideally refund to mine stash, but for now it's lost (tough world)
            }
        }
    };

    const handleCombatEnd = useCallback((victory, enemy) => {
        if (victory && enemy) {
            // Update Kill Quests
            updateQuestProgress('kill', enemy.name, 1);
        }
    }, [updateQuestProgress]);

    const { 
        gameState, 
        setGameState, 
        combatState, 
        startCombat, 
        performPlayerAction 
    } = useCombat(hero, setHero, addLog, handleCombatEnd);

    const [skills, setSkills] = useState([
        { id: 'slash', name: 'Golpe Cortante', cooldown: 1, description: 'Ataque básico +25% dano', onCooldown: false },

        { id: 'defend', name: 'Postura Defensiva', cooldown: 2, description: '+50% DEF por 1 turno', onCooldown: false }
    ]);

    const handleUnlockTalent = (talentId, branchId) => {
        const branch = TALENT_DATA[branchId];
        const talent = branch.talents.find(t => t.id === talentId);

        if (!talent) return;
        if (hero.talentPoints < talent.cost) return;
        if (hero.unlockedTalents.includes(talentId)) return;

        // Check requirement (Single or Array)
        if (talent.req) {
            const reqs = Array.isArray(talent.req) ? talent.req : [talent.req];
            // For Tier 4 (Ultimate), we usually need ANY of the previous tier's choices, OR ALL?
            // Let's say for now if it's an array, you need AT LEAST ONE of them (converging path).
            const hasReq = reqs.some(r => hero.unlockedTalents.includes(r));

            if (!hasReq) {
                addLog("Pré-requisito não atendido!", 'info');
                return;
            }
        }

        // Check Choice Group Exclusivity
        if (talent.choiceGroup) {
            const groupTalents = branch.talents.filter(t => t.choiceGroup === talent.choiceGroup && t.id !== talent.id);
            const hasLockedSibling = groupTalents.some(t => hero.unlockedTalents.includes(t.id));
            if (hasLockedSibling) {
                addLog("Você já escolheu um caminho neste tier!", 'info');
                return;
            }
        }

        setHero(prev => {
            const newStats = { ...prev.stats };

            // Apply Passive Stats immediately
            if (talent.stats) {
                Object.entries(talent.stats).forEach(([key, val]) => {
                    if (newStats[key] !== undefined) {
                        newStats[key] += val;
                    }
                });
            }

            // Handle MaxHP special case
            let newMaxHp = prev.maxHp;
            let newHp = prev.hp;
            if (talent.stats && talent.stats.maxHp) {
                newMaxHp += talent.stats.maxHp;
                newHp += talent.stats.maxHp; // Heal the amount gained
            }

            return {
                ...prev,
                talentPoints: prev.talentPoints - talent.cost,
                unlockedTalents: [...prev.unlockedTalents, talentId],
                stats: newStats,
                maxHp: newMaxHp,
                hp: newHp
            };
        });

        // Handle Active Skills
        if (talent.type === 'active' && talent.skillId) {
            // Add new skill to skills list
            const newSkill = {
                id: talent.skillId,
                name: talent.name.replace('Desbloqueia Habilidade: ', ''),
                cooldown: 3,
                description: 'Habilidade de Talento',
                onCooldown: false
            };
            setSkills(prev => [...prev, newSkill]);
        }

        addLog(`Talento aprendido: ${talent.name}`, 'loot');
    };


    const handleNavigate = (direction) => {
        if (gameState !== 'EXPLORING') return;

        const nextCorridor = corridor + 1;


        if (nextCorridor > 10) {
            // Descend to next floor
            const nextFloor = floor + 1;
            setFloor(nextFloor);
            setCorridor(1);
            addLog(`Você desce as escadas para o Andar ${nextFloor}...`, 'loot');

            if (nextFloor > 10) {
                addLog("Você alcançou as profundezas finais! (Fim do conteúdo atual)", 'loot');
                // Optional: End game or loop
            }
            return;
        }

        setCorridor(nextCorridor);
        addLog(`Você avança para o corredor ${nextCorridor} do Andar ${floor} (${direction})...`);

        // Trigger Event
        const event = generateEvent(floor, nextCorridor);
        addLog(event.description, 'info');

        if (event.trigger === 'combat') {
            startCombat(event.enemy);
        } else if (event.trigger === 'exploration') {
            if (event.reward && event.reward.gold) {
                setHero(prev => ({ ...prev, gold: prev.gold + event.reward.gold }));
                addLog(`Você ganhou ${event.reward.gold} de ouro!`, 'loot');
            }
            // Handle other rewards or outcomes here
        } else if (event.trigger === 'npc-interaction') {
            addLog(event.outcome, 'story');
            // Basic handling for NPC interaction (e.g., trade) could go here
            // For now, just logging the outcome is enough for the prototype
        }
    };

    const handleCombatAction = (action) => {
        performPlayerAction(action, hero);
    };

    // Removed old startCombat, processTurn logic as it is now in useCombat


    const handleHeal = (amount) => {
        setHero(prev => ({
            ...prev,
            hp: Math.min(prev.maxHp, prev.hp + amount)
        }));
    };

    const handleDeductGold = (amount) => {
        setHero(prev => ({
            ...prev,
            gold: Math.max(0, prev.gold - amount)
        }));
    };

    const handleUpdateName = (newName) => {
        setHero(prev => ({
            ...prev,
            name: newName
        }));
    };

    const handleBuyItem = (item) => {
        if (hero.gold < item.value) {
            addLog("Ouro insuficiente!", 'info');
            return;
        }

        // Ensure item has ID
        const itemWithId = { ...item, id: item.id || item.name.toLowerCase().replace(/\s+/g, '_') };

        if (addItem(itemWithId, 1)) {
            setHero(prev => ({ ...prev, gold: prev.gold - item.value }));
            addLog(`Comprou ${item.name} por ${item.value} ouro.`, 'loot');
        } else {
            addLog("Inventário cheio!", 'info');
        }
    };

    const handleSellItem = (itemData) => {
        // itemData comes from ShopInterface as { ...item, inventoryIndex: index, count: count }
        // But our new system needs to find the item.
        // Since ShopInterface might pass the slot index or the item object, we need to be careful.
        // Assuming ShopInterface passes the ITEM Object from the inventory list.
        
        // We need to find WHERE this item is in the grid. 
        // For now, simple finding by ID.
        const slotIndex = inventory.findIndex(slot => slot && slot.item.id === itemData.id);
        
        if (slotIndex >= 0) {
            const sellValue = Math.floor(itemData.value / 2);
            setHero(prev => ({ ...prev, gold: prev.gold + sellValue }));
            removeItem(slotIndex, 1);
            addLog(`Vendeu ${itemData.name} por ${sellValue} ouro.`, 'loot');
            return true; // Sale successful
        }
        return false; // Item not found
    };

    const [tooltip, setTooltip] = useState(null);

    const handleShowTooltip = (item, rect, side = 'left') => {
        setTooltip({
            item,
            x: rect.left,
            y: rect.top,
            width: rect.width,
            side // 'left' (pop to left) or 'right' (pop to right)
        });
    };

    const handleHideTooltip = () => {
        setTooltip(null);
    };

    return (
        <div className="flex w-screen h-screen bg-[#0a0a0a] text-[#e0e0e0] overflow-hidden font-sans selection:bg-amber-500/30 relative">
            <HUDLeft
                hero={hero}
                onShowTooltip={handleShowTooltip}
                onHideTooltip={handleHideTooltip}
                onToggleTalents={() => activeView === 'TALENTS' ? handleCloseMenu() : handleViewChange('TALENTS')}
                onToggleDocumentation={() => activeView === 'DOCUMENTATION' ? handleCloseMenu() : handleViewChange('DOCUMENTATION')}
                onToggleCharacter={() => activeView === 'CHARACTER' ? handleCloseMenu() : handleViewChange('CHARACTER')}
                onToggleQuests={() => activeView === 'QUESTS' ? handleCloseMenu() : handleViewChange('QUESTS')}
            />
            <div className="flex-1 relative z-0 h-full">
                {activeView === 'VILLAGE' ? (
                    <Village
                        onNavigate={handleViewChange}
                        hero={hero}
                        onHeal={handleHeal}
                        onDeductGold={handleDeductGold}
                        onBuyItem={handleBuyItem}
                        onSellItem={handleSellItem}
                        inventory={inventoryList} 
                        coalMine={{...coalMine, collectResources: handleCollectMine}}
                        onOpenStash={() => handleViewChange('STASH')}
                    />
                ) : activeView === 'TEMPLE' ? (
                    <TempleBuilder
                        onClose={handleCloseMenu}
                    />
                ) : activeView === 'TALENTS' ? (
                    <TalentTree
                        talentData={TALENT_DATA}
                        hero={hero}
                        onUnlock={handleUnlockTalent}
                        onClose={handleCloseMenu}
                    />
                ) : activeView === 'PROFESSIONS' ? (
                    <Professions
                        onClose={handleCloseMenu}
                        initialProfessionId={selectedProfession}
                        inventory={inventoryList}
                        onUseItem={(itemId, count) => {
                            const slotIdx = inventory.findIndex(slot => slot && slot.item.id === itemId);
                            if (slotIdx >= 0) {
                                removeItem(slotIdx, count);
                                return true;
                            }
                            return false;
                        }}
                        onAddItem={(item, count) => {
                            return addItem(item, count);
                        }}
                        onShowTooltip={handleShowTooltip}
                        onHideTooltip={handleHideTooltip}
                        hero={hero}
                    />
                ) : activeView === 'DOCUMENTATION' ? (
                    <ErrorBoundary>
                        <Documentation
                            onClose={handleCloseMenu}
                        />
                    </ErrorBoundary>
                ) : activeView === 'CHARACTER' ? (
                    <CharacterSheet
                        hero={hero}
                        onClose={handleCloseMenu}
                        onUpdateName={handleUpdateName}
                        onResetGame={handleResetGame}
                        hasSave={hasSave()}
                    />
                ) : activeView === 'QUESTS' ? (
                    <QuestLog
                        questState={questState}
                        onClose={handleCloseMenu}
                        onClaim={checkAndClaim}
                    />
                ) : activeView === 'STASH' ? (
                    <InventoryInterface 
                        onClose={handleCloseMenu}
                        inventoryData={inventorySystem}
                    />
                ) : (
                    <CenterGrid
                        logs={logs}
                        onNavigate={handleNavigate}
                        gameState={gameState}
                        combatState={combatState}
                        onCombatAction={handleCombatAction}
                        floor={floor}
                        corridor={corridor}
                    />
                )}
            </div>
            <HUDRight
                inventory={inventoryList}
                skills={skills}
                onUseSkill={() => { }}
                onShowTooltip={handleShowTooltip}
                onHideTooltip={handleHideTooltip}
            />

            {/* Global Tooltip Layer */}
            {tooltip && (() => {
                const rarityColors = {
                    common: { border: 'border-[#444]', text: 'text-[#a8a8a8]', arrow: 'border-[#444]' },
                    uncommon: { border: 'border-emerald-900', text: 'text-emerald-400', arrow: 'border-emerald-900' },
                    rare: { border: 'border-blue-900', text: 'text-blue-400', arrow: 'border-blue-900' },
                    epic: { border: 'border-purple-900', text: 'text-purple-400', arrow: 'border-purple-900' },
                    unique: { border: 'border-[#c5a059]', text: 'text-[#c5a059]', arrow: 'border-[#c5a059]' }
                };

                const colors = rarityColors[tooltip.item.rarity] || rarityColors.common;

                return (
                    <div
                        className={`fixed z-[99999] min-w-80 max-w-96 bg-[#0c0c0c] border-2 shadow-[0_0_30px_rgba(0,0,0,0.9)] p-4 pointer-events-none animate-in fade-in zoom-in-95 duration-150 ${colors.border}`}
                        style={{
                            top: tooltip.y,
                            left: tooltip.side === 'left'
                                ? tooltip.x - 330
                                : tooltip.x + tooltip.width + 10,
                            boxShadow: `0 0 20px ${tooltip.item.rarity === 'unique' ? 'rgba(197,160,89,0.2)' :
                                tooltip.item.rarity === 'epic' ? 'rgba(168,85,247,0.2)' :
                                    tooltip.item.rarity === 'rare' ? 'rgba(59,130,246,0.2)' :
                                        tooltip.item.rarity === 'uncommon' ? 'rgba(16,185,129,0.2)' : 'rgba(0,0,0,0.5)'}`
                        }}
                    >
                        {/* Arrow */}
                        <div className={`absolute top-4 w-4 h-4 bg-[#0c0c0c] border-t border-r rotate-45 ${colors.arrow} ${tooltip.side === 'left'
                            ? '-right-2.5 border-t border-r border-b-0 border-l-0'
                            : '-left-2.5 border-b border-l border-t-0 border-r-0'
                            }`} />

                        <div className="flex justify-between items-start mb-2 pb-2 gap-6">
                            <div className="flex-1">
                                <h4 className={`font-bold font-['Cinzel'] text-lg uppercase ${colors.text}`}>{tooltip.item.name}</h4>
                                {tooltip.item.subtype && (
                                    <div className="text-[10px] text-[#888] uppercase tracking-wider mt-0.5">
                                        {tooltip.item.subtype}
                                    </div>
                                )}
                            </div>
                            {tooltip.item.handType && (
                                <span className="text-[10px] uppercase tracking-wider text-[#555] whitespace-nowrap flex-shrink-0">
                                    {tooltip.item.handType}
                                </span>
                            )}
                        </div>
                        <div className="border-b border-[#333] mb-3" />

                        {/* Weapon Stats (if has damage) */}
                        {tooltip.item.damage && (
                            <div className="space-y-1 font-mono text-xs text-[#a8a8a8] mb-3">
                                <div className="flex justify-between">
                                    <span>{tooltip.item.damage.type === 'fire' ? 'Dano de Fogo' : 'Dano Físico'}</span>
                                    <span className="text-white">{tooltip.item.damage.min}-{tooltip.item.damage.max}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Chance de Crítico</span>
                                    <span className="text-white">{tooltip.item.crit}%</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Velocidade de Ataque</span>
                                    <span className="text-white">{tooltip.item.attackPerSecond}</span>
                                </div>
                            </div>
                        )}

                        {/* Non-weapon description */}
                        {!tooltip.item.damage && (
                            <div className="mb-3">
                                <p className="text-xs text-[#888] italic font-serif leading-relaxed">"{tooltip.item.description || 'Um item misterioso.'}"</p>
                            </div>
                        )}

                        {/* Bonus Stats (if weapon has extra stats OR if non-weapon) */}
                        {((tooltip.item.bonusStats && Object.keys(tooltip.item.bonusStats).length > 0) || 
                          (tooltip.item.stats && !tooltip.item.damage)) && (
                            <div className="border-t border-[#222] pt-2 space-y-1">
                                {tooltip.item.bonusStats && Object.entries(tooltip.item.bonusStats).map(([key, val]) => (
                                    <p key={key} className={`text-[10px] font-bold ${colors.text}`}>
                                        +{val} de {key === 'str' ? 'Força' : key === 'def' ? 'Defesa' : key === 'vig' ? 'Vigor' : key}
                                    </p>
                                ))}
                                {tooltip.item.stats && !tooltip.item.damage && Object.entries(tooltip.item.stats).map(([key, val]) => (
                                    <p key={key} className={`text-[10px] font-bold ${colors.text}`}>
                                        +{val} de {key === 'heal' ? 'Cura' : key === 'atk' ? 'Ataque' : key}
                                    </p>
                                ))}
                            </div>
                        )}

                        {/* Requirements */}
                        {tooltip.item.requirements && (tooltip.item.requirements.level > 0 || tooltip.item.requirements.str > 0 || tooltip.item.requirements.dex > 0) && (
                            <div className="border-t border-[#222] pt-2 mt-2">
                                <div className="text-[9px] text-[#555] uppercase tracking-wider mb-1">Requisitos</div>
                                <div className="flex gap-1 flex-wrap text-[10px] text-red-400 font-mono">
                                    {tooltip.item.requirements.level > 0 && <span>Nível {tooltip.item.requirements.level}</span>}
                                    {tooltip.item.requirements.str > 0 && <span>, {tooltip.item.requirements.str} FOR</span>}
                                    {tooltip.item.requirements.dex > 0 && <span>, {tooltip.item.requirements.dex} DES</span>}
                                </div>
                            </div>
                        )}

                        <div className="flex justify-end border-t border-[#333] pt-2 mt-2">
                            <span className="text-xs font-bold text-[#c5a059] flex items-center gap-1 brightness-90">
                                {tooltip.item.value || 0} <span className="text-[8px] text-[#666]">OURO</span>
                            </span>
                        </div>
                    </div>
                );
            })()}

            {/* Update Notification */}
            {newVersionAvailable && !isReloading && (
                <UpdateNotification 
                    onReload={reloadApp} 
                    currentVersion={currentVersion}
                    newVersion={newVersion}
                />
            )}
        </div>
    );
}

export default App;
