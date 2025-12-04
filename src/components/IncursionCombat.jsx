import React, { useEffect } from 'react';
import { Swords, Clock, ArrowLeft, Trophy, Coins } from 'lucide-react';
import { ROOM_TYPES, getRoomType } from '../data/templeRooms';

const IncursionCombat = ({ 
    currentRoom, 
    currentMonster, 
    hero, 
    timeRemaining, 
    lootCollected,
    onAttack, 
    onEndIncursion,
    onSkipIncursion,
    setTimeRemaining 
}) => {
    const roomData = currentRoom?.data || getRoomType(currentRoom?.roomType);

    // Timer countdown
    useEffect(() => {
        if (!lootCollected && timeRemaining > 0) {
            const timer = setInterval(() => {
                setTimeRemaining(prev => {
                    if (prev <= 1) {
                        // Tempo acabou - força fim da incursão
                        onSkipIncursion();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [lootCollected, timeRemaining, setTimeRemaining, onSkipIncursion]);

    if (!currentRoom) return null;

    return (
        <div className="absolute inset-0 z-[60] bg-black/95 backdrop-blur-md flex items-center justify-center animate-in fade-in duration-300">
            <div className="w-full max-w-4xl h-[90vh] bg-[#050505] border-2 shadow-2xl flex flex-col" style={{ borderColor: roomData?.color }}>
                
                {/* Header */}
                <div className="p-6 border-b-2 flex items-center justify-between" style={{ 
                    borderColor: roomData?.color,
                    backgroundColor: roomData?.color + '20'
                }}>
                    <div className="flex items-center gap-4">
                        <div className="text-5xl">{roomData?.icon}</div>
                        <div>
                            <h2 className="text-2xl font-bold text-white font-['Cinzel']">
                                {roomData?.name}
                            </h2>
                            <p className="text-xs text-[#888] uppercase tracking-widest">
                                Nível {currentRoom.level} • Incursão Ativa
                            </p>
                        </div>
                    </div>

                    {/* Timer */}
                    <div className="text-center">
                        <div className="text-xs text-[#666] uppercase tracking-widest mb-1">Tempo Restante</div>
                        <div className={`text-4xl font-bold font-mono flex items-center gap-2 ${
                            timeRemaining <= 5 ? 'text-red-500 animate-pulse' : 'text-[#c5a059]'
                        }`}>
                            <Clock size={32} />
                            {timeRemaining}s
                        </div>
                    </div>
                </div>

                {/* Combat Area */}
                {!lootCollected ? (
                    <div className="flex-1 flex flex-col items-center justify-center p-8 relative">
                        {/* Background Effect */}
                        <div 
                            className="absolute inset-0 opacity-10 bg-gradient-to-b from-transparent to-black pointer-events-none"
                            style={{ backgroundColor: roomData?.color }}
                        />

                        {currentMonster ? (
                            <div className="relative z-10 w-full max-w-2xl">
                                {/* Monster Card */}
                                <div className="bg-[#0a0a0a] border-2 border-[#333] p-6 mb-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-white font-['Cinzel']">
                                                {currentMonster.name}
                                            </h3>
                                            <p className="text-xs text-[#666] uppercase tracking-widest">
                                                Servidor de Atzoatl
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-xs text-[#666]">HP</div>
                                            <div className="text-2xl font-bold text-red-500 font-mono">
                                                {currentMonster.hp}
                                            </div>
                                        </div>
                                    </div>

                                    {/* HP Bar */}
                                    <div className="w-full h-3 bg-[#222] border border-[#333] overflow-hidden mb-4">
                                        <div 
                                            className="h-full bg-gradient-to-r from-red-900 to-red-500 transition-all duration-300"
                                            style={{ width: `${(currentMonster.hp / currentMonster.maxHp) * 100}%` }}
                                        />
                                    </div>

                                    {/* Stats */}
                                    <div className="grid grid-cols-3 gap-2">
                                        <div className="bg-[#111] border border-[#222] p-2 text-center">
                                            <div className="text-xs text-[#666]">ATK</div>
                                            <div className="text-lg font-bold text-red-400">{currentMonster.atk}</div>
                                        </div>
                                        <div className="bg-[#111] border border-[#222] p-2 text-center">
                                            <div className="text-xs text-[#666]">DEF</div>
                                            <div className="text-lg font-bold text-blue-400">{currentMonster.def}</div>
                                        </div>
                                        <div className="bg-[#111] border border-[#222] p-2 text-center">
                                            <div className="text-xs text-[#666]">GOLD</div>
                                            <div className="text-lg font-bold text-[#c5a059]">{currentMonster.gold}</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Combat Button */}
                                <button
                                    onClick={onAttack}
                                    className="w-full py-6 bg-red-900 hover:bg-red-800 border-2 border-red-700 text-white font-bold text-xl uppercase tracking-widest transition-all shadow-[0_0_30px_rgba(220,38,38,0.3)] hover:shadow-[0_0_50px_rgba(220,38,38,0.5)] flex items-center justify-center gap-3"
                                >
                                    <Swords size={28} />
                                    ATACAR
                                </button>

                                {/* Hero HP */}
                                <div className="mt-6 bg-[#0a0a0a] border border-[#333] p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs text-[#666] uppercase tracking-widest">Sua Vida</span>
                                        <span className="text-sm font-mono text-green-400">{hero.hp} / {hero.maxHp}</span>
                                    </div>
                                    <div className="w-full h-2 bg-[#222] border border-[#333] overflow-hidden">
                                        <div 
                                            className="h-full bg-gradient-to-r from-green-900 to-green-500 transition-all duration-300"
                                            style={{ width: `${(hero.hp / hero.maxHp) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center">
                                <div className="text-6xl mb-4">⚔️</div>
                                <p className="text-xl text-[#888]">Preparando próximo inimigo...</p>
                            </div>
                        )}
                    </div>
                ) : (
                    /* Loot Screen */
                    <div className="flex-1 flex flex-col items-center justify-center p-8">
                        <div className="text-6xl mb-6">🏆</div>
                        <h3 className="text-3xl font-bold text-[#c5a059] font-['Cinzel'] mb-2">
                            Sala Limpa!
                        </h3>
                        <p className="text-[#888] mb-8">Você conquistou esta sala do templo.</p>

                        {/* Loot Display */}
                        <div className="bg-[#0a0a0a] border-2 border-[#c5a059] p-6 mb-6 max-w-md w-full">
                            <div className="text-xs text-[#666] uppercase tracking-widest mb-4 text-center">
                                Recompensas
                            </div>
                            
                            {lootCollected.gold > 0 && (
                                <div className="flex items-center justify-between p-3 bg-[#111] border border-[#333] mb-2">
                                    <div className="flex items-center gap-2">
                                        <Coins className="text-[#c5a059]" size={20} />
                                        <span className="text-white font-bold">Ouro</span>
                                    </div>
                                    <span className="text-[#c5a059] font-mono font-bold text-lg">
                                        +{lootCollected.gold}
                                    </span>
                                </div>
                            )}

                            {lootCollected.items.map((item, idx) => (
                                <div key={idx} className="flex items-center justify-between p-3 bg-[#111] border border-[#333] mb-2">
                                    <span className="text-white">{item.name}</span>
                                    <span className="text-[#c5a059] font-mono">×{item.count}</span>
                                </div>
                            ))}

                            {lootCollected.items.length === 0 && lootCollected.gold === 0 && (
                                <div className="text-center text-[#555] italic">Nenhum item encontrado</div>
                            )}
                        </div>

                        <button
                            onClick={onEndIncursion}
                            className="px-8 py-4 bg-[#c5a059] hover:bg-[#d4b06a] text-black font-bold uppercase tracking-widest transition-all shadow-lg"
                        >
                            Retornar ao Templo
                        </button>
                    </div>
                )}

                {/* Footer - Skip Button */}
                {!lootCollected && (
                    <div className="p-4 border-t border-[#333] bg-[#0a0a0a] flex justify-between items-center">
                        <button
                            onClick={onSkipIncursion}
                            className="flex items-center gap-2 px-4 py-2 text-[#666] hover:text-white border border-[#333] hover:border-[#c5a059] transition-all uppercase text-xs tracking-widest"
                        >
                            <ArrowLeft size={16} />
                            Abandonar Incursão
                        </button>
                        <div className="text-xs text-[#555] uppercase tracking-widest">
                            Derrote todos os inimigos antes do tempo acabar
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default IncursionCombat;

