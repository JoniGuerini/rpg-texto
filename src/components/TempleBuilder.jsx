import React, { useState } from 'react';
import { X, Info, Zap, Map } from 'lucide-react';
import { useTemple } from '../hooks/useTemple';
import { useIncursion } from '../hooks/useIncursion';
import { ROOM_TYPES } from '../data/templeRooms';
import TempleGrid from './TempleGrid';
import IncursionCombat from './IncursionCombat';

const TempleBuilder = ({ onClose, hero, onAddGold, onAddItem, onDamageHero, onAddXP }) => {
    const {
        templeGrid,
        roomPool,
        incursionsRemaining,
        selectedPoolIndex,
        hoveredCell,
        templeCompleted,
        setSelectedPoolIndex,
        setHoveredCell,
        placeRoom,
        getHoverPreview,
        resetTemple,
        completeRoom,
        GRID_SIZE
    } = useTemple();

    const {
        incursionActive,
        currentRoom,
        currentMonster,
        lootCollected,
        incursionTimeRemaining,
        startIncursion,
        damageMonster,
        defeatCurrentMonster,
        endIncursion,
        skipIncursion,
        setIncursionTimeRemaining
    } = useIncursion();

    const [showInfo, setShowInfo] = useState(false);

    const handleCellClick = (row, col) => {
        const cell = templeGrid[row][col];
        
        // Se tem sala selecionada do pool, tenta colocar
        if (selectedPoolIndex !== null && cell.roomType === 'empty') {
            placeRoom(row, col, roomPool[selectedPoolIndex]);
        } 
        // Se clicou em sala já colocada (não completada e não vazia), inicia incursão
        else if (cell.roomType !== 'empty' && !cell.isEntrance && !cell.completed) {
            startIncursion(cell.roomType, cell.level, row, col);
        }
    };

    // Combate na incursão
    const handleAttack = () => {
        if (!currentMonster) return;

        // Calcular dano do herói
        const heroDamage = Math.max(1, hero.atk - currentMonster.def);
        
        // Aplicar dano ao monstro
        damageMonster(heroDamage);

        // Verificar se matou
        if (currentMonster.hp - heroDamage <= 0) {
            // Monstro morreu
            onAddGold(currentMonster.gold);
            onAddXP(currentMonster.xp);
            defeatCurrentMonster();
        } else {
            // Monstro sobrevive e contra-ataca
            const monsterDamage = Math.max(1, currentMonster.atk - hero.def);
            onDamageHero(monsterDamage);
        }
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

    const selectedRoomType = selectedPoolIndex !== null ? roomPool[selectedPoolIndex] : null;
    const selectedRoomData = selectedRoomType ? ROOM_TYPES[selectedRoomType] : null;

    // Preview de adjacência
    const preview = hoveredCell && selectedPoolIndex !== null && templeGrid[hoveredCell.row][hoveredCell.col].roomType === 'empty'
        ? getHoverPreview(hoveredCell.row, hoveredCell.col)
        : null;

    return (
        <>
            {/* Incursion Combat Overlay */}
            {incursionActive && (
                <IncursionCombat
                    currentRoom={currentRoom}
                    currentMonster={currentMonster}
                    hero={hero}
                    timeRemaining={incursionTimeRemaining}
                    lootCollected={lootCollected}
                    onAttack={handleAttack}
                    onEndIncursion={handleEndIncursion}
                    onSkipIncursion={handleSkipIncursion}
                    setTimeRemaining={setIncursionTimeRemaining}
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
                                Construa sua masmorra • Fase de Planejamento
                            </p>
                        </div>
                        
                        <div className="flex items-center gap-6">
                            <div className="text-right">
                                <div className="text-[10px] text-[#666] uppercase tracking-widest">Incursões Restantes</div>
                                <div className="text-3xl font-bold text-[#c5a059] font-mono">
                                    {incursionsRemaining}
                                </div>
                            </div>
                            
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
                                <p className="text-xs">1. Selecione uma sala do pool abaixo</p>
                                <p className="text-xs">2. Clique em um slot vazio no grid</p>
                                <p className="text-xs">3. Observe os efeitos de adjacência</p>
                                <p className="text-xs mt-2 text-red-400">4. Clique em salas colocadas para explorar!</p>
                            </div>
                            <div>
                                <div className="text-[#c5a059] font-bold mb-1">Adjacência</div>
                                <p>Salas vizinhas podem se fortalecer!</p>
                                <p>Comandante ⚔️ → Guarnição 🛡️</p>
                                <p>Gerador ⚡ → Forja 🔥</p>
                            </div>
                            <div>
                                <div className="text-[#c5a059] font-bold mb-1">Níveis</div>
                                <p>Nível 1: Básico</p>
                                <p>Nível 2: Melhorado</p>
                                <p>Nível 3: Máximo poder!</p>
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
                            selectedPoolIndex={selectedPoolIndex}
                            roomPool={roomPool}
                            hoveredCell={hoveredCell}
                            onCellClick={handleCellClick}
                            onCellHover={handleCellHover}
                            onCellLeave={handleCellLeave}
                            getHoverPreview={getHoverPreview}
                            GRID_SIZE={GRID_SIZE}
                        />
                    </div>

                    {/* Sidebar - Room Info */}
                    <div className="w-80 border-l border-[#333] bg-[#0e0e0e] p-4 overflow-auto custom-scrollbar">
                        {selectedRoomData ? (
                            <div>
                                <div className="text-xs text-[#666] uppercase tracking-widest mb-2">Sala Selecionada</div>
                                <div 
                                    className="p-4 rounded-lg mb-4"
                                    style={{ backgroundColor: selectedRoomData.color + '20', borderColor: selectedRoomData.color }}
                                >
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="text-4xl">{selectedRoomData.icon}</div>
                                        <div>
                                            <div className="text-lg font-bold text-white font-['Cinzel']">
                                                {selectedRoomData.name}
                                            </div>
                                            <div className="text-xs text-[#888] uppercase">{selectedRoomData.category}</div>
                                        </div>
                                    </div>
                                    <p className="text-sm text-[#ccc] italic">{selectedRoomData.description}</p>
                                </div>

                                {/* Preview de Nível */}
                                {preview && (
                                    <div className="bg-[#1a1a1a] border border-[#c5a059] p-3 rounded mb-4">
                                        <div className="text-xs text-[#c5a059] uppercase tracking-widest mb-2 flex items-center gap-2">
                                            <Zap size={12} /> Preview
                                        </div>
                                        <div className="text-sm text-white">
                                            Esta sala será <span className="font-bold text-[#c5a059]">Nível {preview.level}</span>
                                        </div>
                                        {preview.affected.length > 0 && (
                                            <div className="mt-2 pt-2 border-t border-[#333]">
                                                <div className="text-xs text-green-400 mb-1">Salas Afetadas:</div>
                                                {preview.affected.map((aff, idx) => (
                                                    <div key={idx} className="text-xs text-[#888]">
                                                        • {ROOM_TYPES[aff.roomType]?.name}: Nv {aff.oldLevel} → {aff.newLevel}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Level Effects */}
                                <div className="space-y-2">
                                    <div className="text-xs text-[#666] uppercase tracking-widest">Efeitos por Nível</div>
                                    {[1, 2, 3].map(level => (
                                        <div key={level} className="bg-[#111] border border-[#222] p-2 rounded">
                                            <div className="text-xs font-bold text-[#c5a059] mb-1">Nível {level}</div>
                                            <div className="text-xs text-[#888]">
                                                {JSON.stringify(selectedRoomData.levelEffects[level] || {}, null, 2)
                                                    .replace(/[{}"]/g, '')
                                                    .replace(/,/g, ' •')
                                                }
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-center text-[#555]">
                                <Map size={48} className="opacity-20 mb-4" />
                                <p className="text-sm">Selecione uma sala do pool abaixo</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Bottom Pool */}
                <div className="p-4 border-t-2 border-[#c5a059] bg-[#111]">
                    <div className="text-xs text-[#666] uppercase tracking-widest mb-2">Pool de Salas Disponíveis</div>
                    <div className="flex gap-2">
                        {roomPool.map((roomType, index) => {
                            const roomData = ROOM_TYPES[roomType];
                            const isSelected = selectedPoolIndex === index;

                            return (
                                <button
                                    key={index}
                                    onClick={() => setSelectedPoolIndex(isSelected ? null : index)}
                                    className={`
                                        flex-1 p-4 rounded-lg border-2 transition-all
                                        ${isSelected 
                                            ? 'border-[#c5a059] shadow-[0_0_20px_rgba(197,160,89,0.3)] scale-105' 
                                            : 'border-[#333] hover:border-[#555]'
                                        }
                                    `}
                                    style={{ backgroundColor: roomData?.color + '20' }}
                                >
                                    <div className="text-3xl mb-2">{roomData?.icon}</div>
                                    <div className="text-xs font-bold text-white">{roomData?.name}</div>
                                    <div className="text-[10px] text-[#666] uppercase">{roomData?.category}</div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Completion Message */}
                {templeCompleted && (
                    <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-50">
                        <div className="bg-[#0a0a0a] border-2 border-[#c5a059] p-8 max-w-md text-center">
                            <div className="text-6xl mb-4">🏛️</div>
                            <h2 className="text-2xl font-bold text-[#c5a059] font-['Cinzel'] mb-2">
                                Templo Construído!
                            </h2>
                            <p className="text-[#888] mb-6">
                                O Templo de Atzoatl está pronto para ser explorado.
                            </p>
                            <div className="flex gap-2">
                                <button
                                    onClick={resetTemple}
                                    className="flex-1 py-3 bg-[#1a1a1a] border border-[#333] hover:border-[#c5a059] text-[#888] hover:text-[#c5a059] transition-all uppercase tracking-widest text-xs"
                                >
                                    Reconstruir
                                </button>
                                <button
                                    onClick={onClose}
                                    className="flex-1 py-3 bg-[#c5a059] hover:bg-[#d4b06a] text-black font-bold uppercase tracking-widest text-xs transition-all"
                                >
                                    Explorar Templo
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
        </>
    );
};

export default TempleBuilder;

