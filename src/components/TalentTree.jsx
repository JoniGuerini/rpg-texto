import React, { useState } from 'react';
import { Lock, Check, Star, Shield, Zap, BookOpen, Flame, Skull } from 'lucide-react';

const TalentNode = ({ talent, unlocked, available, maxed, onUnlock, canUnlock }) => {
    const getIcon = () => {
        // Simple icon mapping based on ID prefix or manual mapping
        if (talent.id.startsWith('c')) return <SwordIcon />;
        if (talent.id.startsWith('s')) return <ShieldIcon />;
        if (talent.id.startsWith('a')) return <MagicIcon />;
        return <Star size={24} />;
    };

    // Helper icons
    const SwordIcon = () => <Skull size={24} />;
    const ShieldIcon = () => <Shield size={24} />;
    const MagicIcon = () => <Flame size={24} />;

    return (
        <div className="relative group flex flex-col items-center">
            {/* Connector Line (visual only, simplified) */}

            <button
                onClick={() => canUnlock && !unlocked ? onUnlock(talent.id) : null}
                disabled={unlocked || !canUnlock}
                className={`w-16 h-16 border-2 rotate-45 flex items-center justify-center transition-all duration-300 relative z-10
          ${unlocked
                        ? 'bg-gradient-to-br from-[#c5a059] to-[#8a6e3d] border-[#f0d08d] shadow-[0_0_20px_rgba(197,160,89,0.6)]'
                        : canUnlock
                            ? 'bg-[#0a0a0a] border-[#666] hover:border-[#c5a059] hover:shadow-[0_0_10px_rgba(197,160,89,0.2)] cursor-pointer'
                            : 'bg-[#050505] border-[#333] opacity-50 cursor-not-allowed grayscale'
                    }
        `}
            >
                <div className={`-rotate-45 ${unlocked ? 'text-[#050505]' : 'text-[#c5a059]'}`}>
                    {talent.id.startsWith('c') && <Skull size={24} />}
                    {talent.id.startsWith('s') && <Shield size={24} />}
                    {talent.id.startsWith('a') && <Flame size={24} />}
                </div>

                {/* Status Indicator */}
                {unlocked && (
                    <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-[#0a0a0a] border border-[#c5a059] rounded-full flex items-center justify-center z-20">
                        <Check size={12} className="text-[#c5a059]" />
                    </div>
                )}
                {!unlocked && !canUnlock && (
                    <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-[#0a0a0a] border border-[#333] rounded-full flex items-center justify-center z-20">
                        <Lock size={12} className="text-[#555]" />
                    </div>
                )}
            </button>

            {/* Tooltip */}
            <div className="absolute bottom-full mb-4 w-64 bg-[#0c0c0c] border-double-gold p-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-[0_0_30px_rgba(0,0,0,0.9)]">
                <h4 className={`font-bold font-['Cinzel'] text-lg ${unlocked ? 'text-gold-gradient' : 'text-[#888]'}`}>{talent.name}</h4>
                <div className="text-[10px] uppercase tracking-wider text-[#555] mb-2">{talent.type === 'passive' ? 'Passivo' : 'Ativo'}</div>
                <p className="text-xs text-[#a8a8a8] font-serif italic mb-2">{talent.description}</p>

                {!unlocked && (
                    <div className="border-t border-[#333] pt-2 mt-2">
                        <div className="flex justify-between text-xs">
                            <span className="text-[#666]">Custo:</span>
                            <span className="text-[#c5a059]">1 Ponto</span>
                        </div>
                        {talent.req && (
                            <div className="flex justify-between text-xs mt-1">
                                <span className="text-[#666]">Requer:</span>
                                <span className="text-red-400">{talent.req}</span>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

const ConnectorLines = ({ sources, targets, unlockedTalents }) => {
    // This component draws lines BETWEEN tier N and tier N+1
    // Gap is gap-12 (48px) vertically. Nodes are h-16 (64px).
    // Center is 700 (half of 1400px width).
    // Offset between nodes = 128px (64px node + 64px gap).

    if (!targets || targets.length === 0) return null;

    const sourceCount = sources.length;
    const targetCount = targets.length;
    const center = 700;
    const offset = 128;

    // Generic function to get X positions centered around 'center'
    const getXPositions = (count) => {
        const totalWidth = (count - 1) * offset;
        const startX = center - (totalWidth / 2);
        return Array.from({ length: count }, (_, i) => startX + i * offset);
    };

    const sourcePositions = getXPositions(sourceCount);
    const targetPositions = getXPositions(targetCount);

    // Helper to determine line color
    const getLineColor = (source, target) => {
        const sourceUnlocked = unlockedTalents.includes(source.id);
        const targetUnlocked = unlockedTalents.includes(target.id);

        if (!sourceUnlocked) return '#333333';
        if (targetUnlocked) return '#c5a059';

        let choiceBlocked = false;
        if (target.choiceGroup) {
            const siblings = targets.filter(t => t.choiceGroup === target.choiceGroup && t.id !== target.id);
            if (siblings.some(t => unlockedTalents.includes(t.id))) {
                choiceBlocked = true;
            }
        }

        if (choiceBlocked) return '#333333';
        return '#a0a0a0';
    };

    // Define paths and colors
    const paths = [];

    sources.forEach((source, sIndex) => {
        targets.forEach((target, tIndex) => {
            const x1 = sourcePositions[sIndex];
            const x2 = targetPositions[tIndex];
            const color = getLineColor(source, target);
            const z = color === '#c5a059' ? 2 : color === '#a0a0a0' ? 1 : 0;

            // Draw orthogonal path
            // Start (x1, 0) -> Down (x1, 24) -> Across (x2, 24) -> Down (x2, 48)
            let d = `M ${x1} 0 L ${x1} 24 L ${x2} 24 L ${x2} 48`;
            if (x1 === x2) {
                d = `M ${x1} 0 L ${x1} 48`; // Straight line optimization
            }

            paths.push({ d, color, z });
        });
    });

    // Sort paths by Z-index (Gray < Silver < Gold)
    paths.sort((a, b) => a.z - b.z);

    return (
        <svg
            className="absolute left-1/2 -translate-x-1/2 w-[1400px] h-12 pointer-events-none overflow-visible"
            style={{ top: '4rem', zIndex: 0 }}
            viewBox="0 0 1400 48"
        >
            {paths.map((p, i) => (
                <path
                    key={i}
                    d={p.d}
                    stroke={p.color}
                    strokeWidth="2"
                    fill="none"
                    opacity="0.8"
                />
            ))}
        </svg>
    );
};

const TalentBranch = ({ branch, unlockedTalents, talentPoints, onUnlock }) => {
    // Group talents by tier
    const tiers = branch.talents.reduce((acc, talent) => {
        const tier = talent.tier || 1;
        if (!acc[tier]) acc[tier] = [];
        acc[tier].push(talent);
        return acc;
    }, {});

    const tierKeys = Object.keys(tiers).sort();

    return (
        <>
            <div className="text-center mb-4 relative z-10">
                <h3 className="text-lg font-bold text-gold-gradient font-['Cinzel'] tracking-widest">{branch.name}</h3>
                <div className="h-0.5 w-16 bg-gradient-to-r from-transparent via-[#c5a059] to-transparent mx-auto mt-2 opacity-50" />
            </div>

            <div className="flex flex-col gap-12 relative z-10 w-full items-center">
                {tierKeys.map((tierNum, index) => {
                    const currentTierTalents = tiers[tierNum];
                    const nextTierNum = tierKeys[index + 1];
                    const nextTierTalents = nextTierNum ? tiers[nextTierNum] : null;

                    return (
                        <div key={tierNum} className="flex justify-center gap-16 w-full relative">
                            {/* Draw connectors to NEXT tier */}
                            {nextTierTalents && (
                                <ConnectorLines
                                    sources={currentTierTalents}
                                    targets={nextTierTalents}
                                    unlockedTalents={unlockedTalents}
                                />
                            )}

                            {currentTierTalents.map(talent => {
                                const isUnlocked = unlockedTalents.includes(talent.id);

                                // Check Requirement (Array or Single)
                                let reqMet = true;
                                if (talent.req) {
                                    const reqs = Array.isArray(talent.req) ? talent.req : [talent.req];
                                    reqMet = reqs.some(r => unlockedTalents.includes(r));
                                }

                                // Check Choice Exclusivity
                                let choiceLocked = false;
                                if (talent.choiceGroup) {
                                    const siblings = branch.talents.filter(t => t.choiceGroup === talent.choiceGroup && t.id !== talent.id);
                                    if (siblings.some(t => unlockedTalents.includes(t.id))) {
                                        choiceLocked = true;
                                    }
                                }

                                const canUnlock = !isUnlocked && reqMet && !choiceLocked && talentPoints > 0;

                                return (
                                    <div key={talent.id} className="relative flex flex-col items-center z-10">
                                        <TalentNode
                                            talent={talent}
                                            unlocked={isUnlocked}
                                            available={talentPoints > 0}
                                            canUnlock={canUnlock}
                                            onUnlock={() => onUnlock(talent.id, branch.id)}
                                        />
                                        {choiceLocked && (
                                            <div className="absolute -bottom-6 text-[9px] text-red-500 uppercase tracking-widest font-bold opacity-70">
                                                Bloqueado
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        </>
    );
};

const TalentTree = ({ talentData, hero, onUnlock, onClose }) => {
    const [activeTab, setActiveTab] = useState('combat');

    const tabs = [
        { id: 'combat', label: 'Senhor da Guerra' },
        { id: 'survival', label: 'Guardião' },
        { id: 'arcane', label: 'Arquimago' }
    ];

    return (
        <div className="absolute inset-0 bg-[#050505]/95 backdrop-blur-sm z-50 flex flex-col animate-in fade-in zoom-in-95 duration-300">
            {/* Header */}
            <div className="p-3 md:p-4 lg:p-6 border-b-2 border-[#c5a059] bg-ornate-pattern flex flex-col md:flex-row justify-between items-center shadow-lg relative z-10 gap-3 md:gap-0">
                <div>
                    <h2 className="text-3xl font-bold text-gold-gradient font-['Cinzel'] tracking-[0.2em] drop-shadow-md">Árvore de Talentos</h2>
                    <p className="text-xs text-[#666] uppercase tracking-widest mt-1">Molde o destino do seu herói</p>
                </div>

                <div className="flex items-center gap-6">
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] text-[#888] uppercase tracking-widest">Pontos Disponíveis</span>
                        <span className="text-2xl font-mono text-[#c5a059] font-bold drop-shadow-[0_0_10px_rgba(197,160,89,0.5)]">{hero.talentPoints}</span>
                    </div>
                    <button
                        onClick={onClose}
                        className="px-6 py-2 border border-[#333] hover:border-[#c5a059] bg-[#111] hover:bg-[#1a1a1a] text-[#888] hover:text-[#c5a059] transition-all font-['Cinzel'] uppercase tracking-widest text-xs"
                    >
                        Fechar
                    </button>
                </div>
            </div>

            {/* Tabs Navigation */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 lg:gap-12 py-3 md:py-4 lg:py-6 border-b border-[#222] bg-[#080808] relative z-10">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`text-lg font-['Cinzel'] tracking-widest transition-all duration-300 relative px-4 py-2
                            ${activeTab === tab.id
                                ? 'text-[#c5a059] drop-shadow-[0_0_8px_rgba(197,160,89,0.5)]'
                                : 'text-[#555] hover:text-[#888]'
                            }
                        `}
                    >
                        {tab.label}
                        {activeTab === tab.id && (
                            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#c5a059] shadow-[0_0_10px_#c5a059]" />
                        )}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto p-2 md:p-4 lg:p-6 relative flex flex-col items-center gap-4">
                {/* Background Texture */}
                <div className="absolute inset-0 bg-texture-dark opacity-50 pointer-events-none" />

                {talentData[activeTab] && (
                    <TalentBranch
                        key={activeTab}
                        branch={talentData[activeTab]}
                        unlockedTalents={hero.unlockedTalents}
                        talentPoints={hero.talentPoints}
                        onUnlock={onUnlock}
                    />
                )}
            </div>
        </div>
    );
};

export default TalentTree;
