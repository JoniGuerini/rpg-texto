import React, { useState } from 'react';
import { User, Shield, Sword, Zap, Activity, Crown, X, Heart, Star, Pencil, Check, RefreshCw, Save } from 'lucide-react';
import characterPortrait from '../assets/character_portrait.png';

const StatRow = ({ label, value, bonus, icon: Icon, color = "text-[#888]" }) => (
    <div className="flex items-center justify-between py-2 border-b border-[#333] last:border-0 group hover:bg-[#1a1a1a] px-2 transition-all">
        <div className="flex items-center gap-3">
            <div className={`p-1.5 rounded bg-[#111] border border-[#333] group-hover:border-[#c5a059] transition-colors`}>
                <Icon size={14} className={`${color}`} />
            </div>
            <span className="text-xs uppercase tracking-wider font-bold text-[#888] group-hover:text-[#ccc] transition-colors">
                {label}
            </span>
        </div>
        <div className="text-right">
            <span className="text-sm font-mono font-bold text-[#c5a059]">{value}</span>
            {bonus && <span className="text-[10px] text-[#666] block">{bonus}</span>}
        </div>
    </div>
);

const EquipmentSlot = ({ label, item }) => (
    <div className="relative group">
        <div className="aspect-square bg-[#0a0a0a] border border-[#333] flex items-center justify-center relative overflow-hidden group-hover:border-[#c5a059] transition-colors">
            {item ? (
                <Sword size={24} className="text-[#c5a059] drop-shadow-lg" />
            ) : (
                <div className="text-[10px] text-[#333] uppercase font-bold rotate-45 select-none">{label}</div>
            )}

            {/* Rarity Glow */}
            {item && (
                <div className="absolute inset-0 bg-gradient-to-tr from-[#c5a059]/10 to-transparent pointer-events-none" />
            )}
        </div>
        {item && (
            <div className="absolute bottom-0 left-0 w-full bg-black/80 text-[9px] text-center text-[#c5a059] py-0.5 truncate px-1">
                {item.name}
            </div>
        )}
    </div>
);

const CharacterSheet = ({ hero, onClose, onUpdateName, onResetGame, hasSave }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [tempName, setTempName] = useState(hero.name);
    const [showResetModal, setShowResetModal] = useState(false);

    const handleSaveName = () => {
        if (tempName.trim()) {
            onUpdateName(tempName);
            setIsEditing(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSaveName();
        } else if (e.key === 'Escape') {
            setTempName(hero.name);
            setIsEditing(false);
        }
    };

    const handleConfirmReset = () => {
        setShowResetModal(false);
        if (onResetGame) {
            onResetGame();
        }
    };

    // Derived Stats Calculations
    const critChance = (5 + (hero.stats.dex * 1)).toFixed(1);
    const physDmgBonus = (hero.stats.str * 2).toFixed(0);
    const dmgMitigation = (hero.stats.def * 0.7).toFixed(1);
    const dodgeChance = (hero.stats.dex * 0.5).toFixed(1);
    const hpRegen = (hero.stats.vig * 0.2).toFixed(1);

    return (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm animate-in fade-in zoom-in-95 duration-300 p-2 md:p-4 lg:p-6">
            <div className="w-full max-w-7xl h-full bg-[#050505] border border-[#333] shadow-2xl flex flex-col relative overflow-hidden">

                {/* Background Texture */}
                <div className="absolute inset-0 bg-texture-dark opacity-50 pointer-events-none" />

                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-[#333] bg-[#0a0a0a] relative z-10">
                    <div className="flex items-center gap-3">
                        <Crown className="text-[#c5a059]" size={24} />
                        <h2 className="text-xl font-['Cinzel'] font-bold text-gold-gradient tracking-[0.2em]">Ficha do Personagem</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-[#222] rounded-full transition-colors group"
                    >
                        <X size={20} className="text-[#666] group-hover:text-white" />
                    </button>
                </div>

                {/* Content Grid */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-0 relative z-10 overflow-auto">

                    {/* Column 1: Profile & Core Stats */}
                    <div className="p-4 md:p-6 lg:p-8 border-r border-[#333] overflow-y-auto custom-scrollbar bg-[#080808] flex flex-col justify-center">

                        {/* Portrait */}
                        <div className="flex flex-col items-center mb-8">
                            <div className="w-32 h-32 bg-[#111] border-2 border-[#c5a059] shadow-[0_0_20px_rgba(197,160,89,0.2)] flex items-center justify-center mb-4 relative rotate-45 overflow-hidden group">
                                <div className="absolute inset-0 bg-ornate-pattern opacity-30 -rotate-45 scale-150" />
                                <img
                                    src={characterPortrait}
                                    alt="Character Portrait"
                                    className="w-[140%] h-[140%] object-cover -rotate-45 relative z-10"
                                />
                            </div>

                            {/* Name Editing */}
                            {isEditing ? (
                                <div className="flex items-center gap-2 mb-1">
                                    <input
                                        type="text"
                                        value={tempName}
                                        onChange={(e) => setTempName(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        autoFocus
                                        className="bg-[#111] border border-[#c5a059] text-white font-['Cinzel'] font-bold text-xl px-2 py-1 text-center w-48 focus:outline-none focus:shadow-[0_0_10px_rgba(197,160,89,0.5)]"
                                    />
                                    <button onClick={handleSaveName} className="p-1 hover:text-[#c5a059] text-[#666] transition-colors">
                                        <Check size={20} />
                                    </button>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2 mb-1 group/name">
                                    <h3 className="text-2xl font-['Cinzel'] font-bold text-white">{hero.name}</h3>
                                    <button
                                        onClick={() => {
                                            setTempName(hero.name);
                                            setIsEditing(true);
                                        }}
                                        className="opacity-0 group-hover/name:opacity-100 transition-opacity p-1 hover:text-[#c5a059] text-[#444]"
                                    >
                                        <Pencil size={16} />
                                    </button>
                                </div>
                            )}

                            <span className="text-xs uppercase tracking-[0.3em] text-[#666] font-bold">Guerreiro Nível {hero.level}</span>
                        </div>

                        {/* XP Bar */}
                        <div className="mb-8">
                            <div className="flex justify-between text-[10px] text-[#888] uppercase font-bold mb-1">
                                <span>Progresso</span>
                                <span>{hero.xp} / 1000 XP</span>
                            </div>
                            <div className="h-1.5 bg-[#1a1a1a] rounded-full overflow-hidden">
                                <div className="h-full bg-[#c5a059] w-[45%]" />
                            </div>
                        </div>

                        {/* Core Attributes */}
                        <div className="space-y-1">
                            <h4 className="text-xs font-bold text-[#444] uppercase mb-3 tracking-widest border-b border-[#222] pb-1">Atributos Base</h4>
                            <StatRow icon={Sword} label="Força (STR)" value={hero.stats.str} bonus={`+${physDmgBonus}% Dano Físico`} color="text-red-500" />
                            <StatRow icon={Activity} label="Destreza (DEX)" value={hero.stats.dex} bonus={`+${critChance}% Crítico`} color="text-emerald-500" />
                            <StatRow icon={Heart} label="Vigor (VIG)" value={hero.stats.vig} bonus={`+${hpRegen} HP/s`} color="text-blue-500" />
                            <StatRow icon={Zap} label="Velocidade (SPD)" value={hero.stats.spd} bonus="Iniciativa" color="text-amber-500" />
                        </div>
                    </div>

                    {/* Column 2: Combat Stats & Details */}
                    <div className="p-4 md:p-6 lg:p-8 bg-[#080808] overflow-y-auto custom-scrollbar flex flex-col justify-center">
                        <h4 className="text-xs font-bold text-[#444] uppercase mb-4 tracking-widest border-b border-[#222] pb-1">Estatísticas de Combate</h4>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="bg-[#111] p-3 border border-[#333] flex flex-col items-center justify-center">
                                <span className="text-[10px] text-[#666] uppercase font-bold">Ataque Total</span>
                                <span className="text-xl font-mono text-[#c5a059] font-bold">{hero.stats.atk}</span>
                            </div>
                            <div className="bg-[#111] p-3 border border-[#333] flex flex-col items-center justify-center">
                                <span className="text-[10px] text-[#666] uppercase font-bold">Defesa Total</span>
                                <span className="text-xl font-mono text-[#c5a059] font-bold">{hero.stats.def}</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <h5 className="text-[10px] font-bold text-[#c5a059] uppercase mb-2">Ofensivo</h5>
                                <div className="bg-[#111] border border-[#333] p-3 space-y-2">
                                    <div className="flex justify-between text-xs">
                                        <span className="text-[#888]">Chance Crítica</span>
                                        <span className="font-mono text-white">{critChance}%</span>
                                    </div>
                                    <div className="flex justify-between text-xs">
                                        <span className="text-[#888]">Dano Crítico</span>
                                        <span className="font-mono text-white">150%</span>
                                    </div>
                                    <div className="flex justify-between text-xs">
                                        <span className="text-[#888]">Precisão</span>
                                        <span className="font-mono text-white">100%</span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h5 className="text-[10px] font-bold text-[#c5a059] uppercase mb-2">Defensivo</h5>
                                <div className="bg-[#111] border border-[#333] p-3 space-y-2">
                                    <div className="flex justify-between text-xs">
                                        <span className="text-[#888]">Mitigação de Dano</span>
                                        <span className="font-mono text-white">{dmgMitigation}</span>
                                    </div>
                                    <div className="flex justify-between text-xs">
                                        <span className="text-[#888]">Chance de Esquiva</span>
                                        <span className="font-mono text-white">{dodgeChance}%</span>
                                    </div>
                                    <div className="flex justify-between text-xs">
                                        <span className="text-[#888]">Resistência Mágica</span>
                                        <span className="font-mono text-white">0%</span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h5 className="text-[10px] font-bold text-[#c5a059] uppercase mb-2">Recursos</h5>
                                <div className="bg-[#111] border border-[#333] p-3 space-y-2">
                                    <div className="flex justify-between text-xs">
                                        <span className="text-[#888]">Vida Máxima</span>
                                        <span className="font-mono text-white">{hero.maxHp}</span>
                                    </div>
                                    <div className="flex justify-between text-xs">
                                        <span className="text-[#888]">Regeneração de Vida</span>
                                        <span className="font-mono text-white">{hpRegen} /s</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Save/Reset Section */}
                    <div className="mt-6 pt-6 border-t border-[#333] space-y-3">
                        <div className="flex items-center justify-between text-xs px-4">
                            <div className="flex items-center gap-2">
                                <Save size={14} className="text-[#c5a059]" />
                                <span className="text-[#888]">
                                    {hasSave ? 'Progresso salvo automaticamente' : 'Nenhum progresso salvo'}
                                </span>
                            </div>
                        </div>
                        
                        <button
                            onClick={() => setShowResetModal(true)}
                            className="w-full py-3 px-4 bg-red-900/20 border border-red-900 text-red-400 hover:bg-red-900/40 transition-all flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-wider"
                        >
                            <RefreshCw size={16} />
                            Resetar Aventura
                        </button>
                    </div>

                </div>

                {/* Reset Confirmation Modal */}
                {showResetModal && (
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-200">
                        <div className="bg-[#0e0e0e] border-2 border-red-900 p-6 max-w-md animate-in zoom-in-95 duration-200">
                            <h3 className="text-xl font-bold text-red-400 mb-4 flex items-center gap-2">
                                <RefreshCw size={24} />
                                Resetar Aventura?
                            </h3>
                            <p className="text-[#ccc] mb-6">
                                Esta ação irá <span className="text-red-400 font-bold">deletar todo o seu progresso</span> atual, incluindo:
                            </p>
                            <ul className="text-[#888] text-sm space-y-1 mb-6 pl-4">
                                <li>• Nível e experiência</li>
                                <li>• Inventário e equipamentos</li>
                                <li>• Missões e conquistas</li>
                                <li>• Recursos e materiais</li>
                            </ul>
                            <p className="text-[#c5a059] font-bold mb-6">
                                Você começará uma nova aventura do zero.
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowResetModal(false)}
                                    className="flex-1 py-2 px-4 bg-[#111] border border-[#333] text-[#ccc] hover:bg-[#1a1a1a] hover:border-[#c5a059] transition-all font-bold uppercase text-sm"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={handleConfirmReset}
                                    className="flex-1 py-2 px-4 bg-red-900/30 border border-red-900 text-red-400 hover:bg-red-900/50 transition-all font-bold uppercase text-sm"
                                >
                                    Resetar
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CharacterSheet;
