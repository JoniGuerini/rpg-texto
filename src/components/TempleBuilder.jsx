import React, { useState } from 'react';
import { X, Info, Zap, Map } from 'lucide-react';
import { useTemple } from '../hooks/useTemple';
import { useIncursion } from '../hooks/useIncursion';
import { ROOM_TYPES, getRoomType } from '../data/templeRooms';
import TempleGrid from './TempleGrid';
import IncursionCombat from './IncursionCombat';

const TempleBuilder = ({ onClose, hero, onAddGold, onAddItem, onDamageHero, onAddXP, onHeal }) => {
    const {
        templeGrid,
        playerPosition,
        templeCompleted,
        floor,
        moveToRoom,
        completeCurrentRoom,
        nextFloor,
        resetTemple,
        GRID_SIZE
    } = useTemple();

    const {
        incursionActive,
        currentRoom,
        currentMonster,
        lootCollected,
        startIncursion,
        damageMonster,
        defeatCurrentMonster,
        endIncursion,
        skipIncursion
    } = useIncursion();

    const [showDeathScreen, setShowDeathScreen] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const [hoveredCell, setHoveredCell] = useState(null);

    const handleCellClick = (row, col) => {
        // Tenta mover para a sala
        const startedCombat = moveToRoom(row, col);
        
        if (startedCombat) {
            const cell = templeGrid[row][col];
            // Inicia combate imediatamente
            startIncursion(cell.roomType, cell.level || 1, row, col);
        }
    };

    // Combate na incursão (TURN-BASED)
    const handleAttack = () => {
        if (!currentMonster) {
            console.log('[Attack] No current monster');
            return;
        }

        // IMPORTANTE: hero.stats.atk, não hero.atk!
        const heroAtk = hero.stats?.atk || hero.atk || 10;
        const heroDef = hero.stats?.def || hero.def || 2;

        console.log('═══════════════ TURNO ═══════════════');
        console.log('[Hero] ATK:', heroAtk, 'DEF:', heroDef, 'HP:', hero.hp);
        console.log('[Monster]', currentMonster.name, '- HP:', currentMonster.hp, 'ATK:', currentMonster.atk, 'DEF:', currentMonster.def);

        // Validar valores antes de calcular
        const monsterDef = Number(currentMonster.def) || 0;
        const monsterAtk = Number(currentMonster.atk) || 0;
        const monsterHp = Number(currentMonster.hp) || 0;
        const monsterGold = Number(currentMonster.gold) || 0;
        const monsterXp = Number(currentMonster.xp) || 0;

        // === FASE 1: HERÓI ATACA ===
        const heroDamage = Math.max(1, heroAtk - monsterDef);
        console.log('[Hero Attack] Dano causado:', heroDamage);
        
        // Aplica dano ao monstro
        damageMonster(heroDamage);
        
        const newMonsterHp = monsterHp - heroDamage;
        console.log('[Monster] HP após ataque:', newMonsterHp);

        // Verifica se matou
        if (newMonsterHp <= 0) {
            // Monstro morreu - não contra-ataca
            console.log('[Monster] DERROTADO! +' + monsterGold + ' gold, +' + monsterXp + ' XP');
            onAddGold(monsterGold);
            onAddXP(monsterXp);
            defeatCurrentMonster();
        } else {
            // === FASE 2: MONSTRO CONTRA-ATACA ===
            const monsterDamage = Math.max(1, monsterAtk - heroDef);
            console.log('[Monster Counter-Attack] Dano causado:', monsterDamage);
            
            const newHeroHp = hero.hp - monsterDamage;
            console.log('[Hero] HP antes:', hero.hp, '- Dano:', monsterDamage, '= HP depois:', newHeroHp);
            
            onDamageHero(monsterDamage);

            // === VERIFICAR MORTE DO HERÓI ===
            if (newHeroHp <= 0) {
                console.log('[Hero] MORREU! Mostrando tela de morte...');
                // Mostra tela de morte
                setTimeout(() => {
                    setShowDeathScreen(true);
                }, 800);
            }
        }
        
        console.log('═══════════════════════════════════');
    };

    // Morte do herói - reseta templo e sai da incursão
    const handleHeroDeath = () => {
        console.log('[Death] Iniciando processo de morte...');
        
        // 1. Oculta telas internas
        setShowDeathScreen(false);
        
        // 2. Cura o herói (State Global)
        onHeal(); 
        
        // 3. Fecha o Templo e volta para a Vila (Isso desmonta o componente e reseta os estados locais)
        onClose();
        
        console.log('[Death] Retornando à Vila e resetando');
    };

    // Finaliza incursão com sucesso
    const handleEndIncursion = () => {
        if (currentRoom && lootCollected) {
            // Aplica recompensas
            if (lootCollected.gold > 0) {
                onAddGold(lootCollected.gold);
            }
            lootCollected.items.forEach(item => {
                onAddItem(item, item.count);
            });

            // Marca sala como completada
            completeRoom(currentRoom.row, currentRoom.col);
        }
        
        endIncursion();
    };

    // Pula incursão sem completar
    const handleSkipIncursion = () => {
        skipIncursion();
    };

    const handleCellHover = (row, col) => {
        setHoveredCell({ row, col });
    };

    const handleCellLeave = () => {
        setHoveredCell(null);
    };

    return (
        <>
            {/* Incursion Combat Overlay */}
            {incursionActive && (
                <IncursionCombat
                    currentRoom={currentRoom}
                    currentMonster={currentMonster}
                    hero={hero}
                    lootCollected={lootCollected}
                    onAttack={handleAttack}
                    onEndIncursion={handleEndIncursion}
                    onSkipIncursion={handleSkipIncursion}
                />
            )}

            <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm animate-in fade-in duration-300">
                <div className="w-full max-w-7xl h-[95vh] bg-[#0a0a0a] border-2 border-[#c5a059] shadow-[0_0_50px_rgba(197,160,89,0.3)] flex flex-col relative">
                
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-50 p-2 text-[#666] hover:text-white hover:bg-[#222] rounded-full transition-colors"
                >
                    <X size={24} />
                </button>

                {/* Header */}
                <div className="p-6 border-b-2 border-[#c5a059] bg-ornate-pattern">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gold-gradient font-['Cinzel'] tracking-wider flex items-center gap-3">
                                <Map className="text-[#c5a059]" size={32} />
                                Templo de Atzoatl
                            </h1>
                            <p className="text-xs text-[#666] uppercase tracking-widest mt-1">
                                Explore a masmorra gerada • Encontre o Chefe
                            </p>
                        </div>
                        
                        <div className="flex items-center gap-6">
                            <button
                                onClick={() => setShowInfo(!showInfo)}
                                className="px-4 py-2 bg-[#1a1a1a] border border-[#333] hover:border-[#c5a059] text-[#888] hover:text-[#c5a059] transition-all text-xs uppercase tracking-widest flex items-center gap-2"
                            >
                                <Info size={16} />
                                {showInfo ? 'Ocultar' : 'Ajuda'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Info Panel */}
                {showInfo && (
                    <div className="p-4 bg-[#111] border-b border-[#333] text-sm text-[#888]">
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <div className="text-[#c5a059] font-bold mb-1 flex items-center gap-2">
                                    <Zap size={14} /> Como Jogar
                                </div>
                                <p className="text-xs">1. Clique em um slot para mover (adjacente)</p>
                                <p className="text-xs">2. Enfrente o desafio da sala</p>
                                <p className="text-xs">3. Avance até o Chefe (Topo)</p>
                                <p className="text-xs mt-2 text-red-400">Cuidado: Morrer reseta o andar!</p>
                            </div>
                            <div>
                                <div className="text-[#c5a059] font-bold mb-1">Exploração</div>
                                <p>Você começa na Entrada (Embaixo).</p>
                                <p>Mova-se para salas adjacentes.</p>
                                <p>Objetivo: Chegar ao Chefe no topo!</p>
                            </div>
                            <div>
                                <div className="text-[#c5a059] font-bold mb-1">Níveis</div>
                                <p>Nível 1: Inimigos fracos</p>
                                <p>Nível 2: Inimigos veteranos</p>
                                <p>Nível 3: Elite / Boss</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Main Content */}
                <div className="flex-1 flex overflow-hidden">
                    
                    {/* Grid Area */}
                    <div className="flex-1 overflow-auto custom-scrollbar bg-[#050505] flex items-center justify-center">
                        <TempleGrid
                            grid={templeGrid}
                            playerPosition={playerPosition}
                            templeCompleted={templeCompleted}
                            hoveredCell={hoveredCell}
                            onCellClick={handleCellClick}
                            onCellHover={handleCellHover}
                            onCellLeave={handleCellLeave}
                            GRID_SIZE={GRID_SIZE}
                        />
                    </div>

                    {/* Sidebar - Room Info */}
                    <div className="w-80 border-l border-[#333] bg-[#0e0e0e] p-4 overflow-auto custom-scrollbar">
                        {hoveredCell ? (
                            (() => {
                                const cell = templeGrid[hoveredCell.row][hoveredCell.col];
                                const roomData = getRoomType(cell.roomType);
                                
                                if (!roomData) return null;

                                return (
                                    <div>
                                        <div className="text-xs text-[#666] uppercase tracking-widest mb-2">Informação da Sala</div>
                                        <div 
                                            className="p-4 rounded-lg mb-4"
                                            style={{ backgroundColor: roomData.color + '20', borderColor: roomData.color }}
                                        >
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="text-4xl">{roomData.icon}</div>
                                                <div>
                                                    <div className="text-lg font-bold text-white font-['Cinzel']">
                                                        {roomData.name}
                                                    </div>
                                                    <div className="text-xs text-[#888] uppercase">Nível {cell.level || 1}</div>
                                                </div>
                                            </div>
                                            <p className="text-sm text-[#ccc] italic">{roomData.description}</p>
                                        </div>

                                        {/* Status */}
                                        <div className="mb-4">
                                            <div className={`text-xs font-bold uppercase tracking-widest ${
                                                cell.completed ? 'text-green-500' : 
                                                cell.accessible ? 'text-yellow-500' : 
                                                'text-red-500'
                                            }`}>
                                                {cell.completed ? 'COMPLETADA' : 
                                                 cell.accessible ? 'DISPONÍVEL PARA EXPLORAR' : 
                                                 cell.revealed ? 'BLOQUEADA (Sem Caminho)' : 'DESCONHECIDA'}
                                            </div>
                                        </div>

                                        {/* Level Effects (Current Level) */}
                                        <div className="bg-[#111] border border-[#222] p-2 rounded">
                                            <div className="text-xs font-bold text-[#c5a059] mb-1">Desafios (Nível {cell.level || 1})</div>
                                            <div className="text-xs text-[#888]">
                                                {JSON.stringify(roomData.levelEffects[cell.level || 1] || {}, null, 2)
                                                    .replace(/[{}"]/g, '')
                                                    .replace(/,/g, ' •')
                                                }
                                            </div>
                                        </div>
                                    </div>
                                );
                            })()
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-center text-[#555]">
                                <Map size={48} className="opacity-20 mb-4" />
                                <p className="text-sm">Passe o mouse sobre uma sala para ver detalhes</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer (Removido Pool) */}
                <div className="p-4 border-t-2 border-[#c5a059] bg-[#111] flex justify-between items-center">
                    <div className="text-xs text-[#666] uppercase tracking-widest">
                        Andar Atual: <span className="text-[#c5a059] font-bold text-lg ml-2">{floor}</span>
                    </div>
                    <div className="text-xs text-[#666] uppercase tracking-widest">
                        Posição: <span className="text-white font-mono ml-2">{playerPosition.row}, {playerPosition.col}</span>
                    </div>
                </div>

            </div>
        </div>

        {/* Death Screen - Renderizado FORA e ACIMA de tudo */}
        {showDeathScreen && (
            <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-[100000] animate-in fade-in duration-500 pointer-events-auto">
                <div className="bg-[#0a0a0a] border-2 border-red-900 shadow-[0_0_50px_rgba(220,38,38,0.5)] p-8 max-w-md text-center relative z-50">
                    <div className="text-6xl mb-4 animate-pulse">💀</div>
                    <h2 className="text-3xl font-bold text-red-500 font-['Cinzel'] mb-2">
                        VOCÊ MORREU
                    </h2>
                    <p className="text-[#888] mb-2">
                        As sombras do Templo consumiram sua alma.
                    </p>
                    <p className="text-sm text-red-400 mb-6">
                        O Templo de Atzoatl foi perdido e deve ser reconstruído.
                    </p>
                    <button
                        onClick={handleHeroDeath}
                        className="w-full py-4 bg-red-900 hover:bg-red-800 border-2 border-red-700 text-white font-bold uppercase tracking-widest text-sm transition-all shadow-lg hover:shadow-red-900/50"
                    >
                        Retornar à Vila
                    </button>
                </div>
            </div>
        )}
        </>
    );
};

export default TempleBuilder;

