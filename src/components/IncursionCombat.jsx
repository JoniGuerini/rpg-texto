import React, { useState } from 'react';
import { Swords, ArrowLeft, Trophy, Coins, Heart, Shield } from 'lucide-react';
import { ROOM_TYPES, getRoomType } from '../data/templeRooms';

const IncursionCombat = ({ 
    currentRoom, 
    currentMonster, 
    hero, 
    lootCollected,
    onAttack, 
    onEndIncursion,
    onSkipIncursion
}) => {
    const [combatLog, setCombatLog] = useState([]);
    const roomData = currentRoom?.data || getRoomType(currentRoom?.roomType);

    if (!currentRoom) return null;

    // Acessar stats corretamente
    const heroHp = hero.hp || 0;
    const heroMaxHp = hero.maxHp || 100;
    const heroAtk = hero.stats?.atk || hero.atk || 10;
    const heroDef = hero.stats?.def || hero.def || 2;
    
    const hpPercentage = (heroHp / heroMaxHp) * 100;
    const isLowHp = hpPercentage <= 30;
    const isDead = heroHp <= 0;

    const handleAttackWithLog = () => {
        onAttack();
        // Adiciona log visual (será implementado no próximo step)
    };

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
                                Nível {currentRoom.level} • Combate Turn-Based
                            </p>
                        </div>
                    </div>

                    {/* Hero HP Display */}
                    <div className={`text-center px-6 py-3 rounded-lg border-2 transition-all ${
                        isDead ? 'bg-red-950 border-red-900 animate-pulse' :
                        isLowHp ? 'bg-red-950/50 border-red-700' :
                        'bg-[#0a0a0a] border-[#333]'
                    }`}>
                        <div className="text-xs text-[#666] uppercase tracking-widest mb-2">
                            {isDead ? '💀 MORTO' : isLowHp ? '⚠️ HP CRÍTICO' : 'Sua Vida'}
                        </div>
                        <div className="flex items-center gap-2 justify-center">
                            <Heart className={isDead ? 'text-red-900' : isLowHp ? 'text-red-500 animate-pulse' : 'text-red-500'} size={20} />
                            <div className={`text-2xl font-bold font-mono ${
                                isDead ? 'text-red-900' :
                                isLowHp ? 'text-red-400 animate-pulse' :
                                'text-green-400'
                            }`}>
                                {Math.max(0, heroHp)} / {heroMaxHp}
                            </div>
                        </div>
                        <div className="w-32 h-2 bg-[#222] border border-[#333] overflow-hidden mt-2">
                            <div 
                                className={`h-full transition-all duration-300 ${
                                    isDead ? 'bg-gradient-to-r from-red-950 to-red-900' :
                                    isLowHp ? 'bg-gradient-to-r from-red-900 to-red-500' :
                                    'bg-gradient-to-r from-green-900 to-green-500'
                                }`}
                                style={{ width: `${Math.max(0, hpPercentage)}%` }}
                            />
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
                                    onClick={handleAttackWithLog}
                                    disabled={isDead}
                                    className={`w-full py-6 border-2 font-bold text-xl uppercase tracking-widest transition-all flex items-center justify-center gap-3 ${
                                        isDead 
                                            ? 'bg-[#222] border-[#333] text-[#555] cursor-not-allowed'
                                            : 'bg-red-900 hover:bg-red-800 border-red-700 text-white shadow-[0_0_30px_rgba(220,38,38,0.3)] hover:shadow-[0_0_50px_rgba(220,38,38,0.5)] hover:scale-105 active:scale-95'
                                    }`}
                                >
                                    <Swords size={28} />
                                    {isDead ? 'VOCÊ MORREU' : 'ATACAR (Seu Turno)'}
                                </button>

                                {/* Hero Stats Display */}
                                <div className="mt-6 bg-[#0a0a0a] border-2 border-[#c5a059] p-4">
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="text-center">
                                            <div className="text-xs text-[#666] uppercase tracking-widest mb-1">Seu Ataque</div>
                                            <div className="text-2xl font-bold text-red-400 font-mono flex items-center justify-center gap-2">
                                                <Swords size={20} />
                                                {heroAtk}
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-xs text-[#666] uppercase tracking-widest mb-1">Sua Defesa</div>
                                            <div className="text-2xl font-bold text-blue-400 font-mono flex items-center justify-center gap-2">
                                                <Shield size={20} />
                                                {heroDef}
                                            </div>
                                        </div>
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
                            className="flex items-center gap-2 px-4 py-2 text-[#666] hover:text-white border border-[#333] hover:border-red-500 hover:bg-red-950 transition-all uppercase text-xs tracking-widest"
                        >
                            <ArrowLeft size={16} />
                            Fugir da Sala
                        </button>
                        <div className="text-xs text-[#555] uppercase tracking-widest">
                            Combate Turn-Based • Derrote todos os inimigos
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default IncursionCombat;

