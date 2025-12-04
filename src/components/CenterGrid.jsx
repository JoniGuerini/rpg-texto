import React, { useEffect, useRef } from 'react';
import { ArrowUp, ArrowLeft, ArrowRight, Sword, Shield, Footprints, Skull, Compass, Flame, Heart, Star, Sun } from 'lucide-react';

// --- Sub-components for Atmosphere ---

const Torch = ({ side }) => (
    <div className={`absolute top-1/3 ${side === 'left' ? 'left-[15%]' : 'right-[15%]'} z-0 flex flex-col items-center pointer-events-none`}>
        {/* Chain holding the torch */}
        <div className="h-32 w-1 bg-[#111] border-l border-r border-[#333] mb-[-5px] relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-[#444] bg-[#0a0a0a]" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-[#444] bg-[#0a0a0a]" />
        </div>

        {/* Torch Sconce */}
        <div className="relative">
            <div className="w-4 h-10 bg-[#222] border border-[#444] transform perspective-[10px] rotateX(10deg)" />
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-4 bg-[#333] rounded-full border border-[#555]" />

            {/* The Fire */}
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-12 h-20 animate-torch origin-bottom opacity-90">
                <div className="w-full h-full fire-core rounded-full" />
            </div>

            {/* Light Glow from this torch */}
            <div className="absolute top-[-50px] left-1/2 -translate-x-1/2 w-[300px] h-[300px] torch-light-glow animate-flicker" />
        </div>
    </div>
);

const EmberParticle = ({ delay, left }) => (
    <div
        className="absolute bottom-0 w-1 h-1 bg-orange-500 rounded-full animate-ember pointer-events-none opacity-0"
        style={{
            left: `${left}%`,
            animationDelay: `${delay}s`,
            boxShadow: '0 0 4px #ffaa00'
        }}
    />
);

// --- Main Components ---

const LogEntry = ({ entry }) => {
    const isCombat = entry.type === 'combat';
    const isLoot = entry.type === 'loot';

    return (
        <div className={`mb-5 text-lg leading-relaxed font-serif relative pl-8 transition-all duration-500 animate-in fade-in slide-in-from-bottom-2 ${isCombat ? 'text-red-400' :
            isLoot ? 'text-[#e6c885]' :
                'text-[#a8a8a8]'
            }`}>
            {/* Bullet Point - Gothic Diamond */}
            <div className={`absolute left-2 top-3 w-2 h-2 rotate-45 border border-black shadow-sm ${isCombat ? 'bg-[#8b0000]' :
                isLoot ? 'bg-[#c5a059]' :
                    'bg-[#444]'
                }`} />

            <span className="text-[10px] uppercase tracking-widest text-[#555] block mb-0.5 font-bold font-['Cinzel'] opacity-60">
                {entry.time}
            </span>
            <span className={isCombat ? 'font-bold drop-shadow-md text-red-gradient' : ''}>
                {entry.text}
            </span>
        </div>
    );
};

const ActionButton = ({ onClick, icon: Icon, label, colorClass, subLabel }) => (
    <button
        onClick={onClick}
        className={`group w-full h-full p-4 flex flex-col items-center justify-center gap-2 bg-texture-dark border-double-gold relative overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(197,160,89,0.2)] active:scale-95 ${colorClass}`}
    >
        {/* Inner Glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#c5a059]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative z-10">
            <Icon size={32} className="mb-2 transition-transform group-hover:scale-110 duration-200 drop-shadow-md text-[#666] group-hover:text-[#c5a059]" />
            {/* Glow effect on hover */}
            <div className="absolute inset-0 bg-[#c5a059] blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
        </div>
        <span className="font-bold text-sm text-[#888] group-hover:text-gold-gradient transition-colors font-['Cinzel'] tracking-wider relative z-10">{label}</span>
        {subLabel && <span className="text-[9px] opacity-40 font-sans uppercase tracking-wider text-[#666] group-hover:text-[#c5a059] relative z-10">{subLabel}</span>}

        {/* Corner Accents */}
        <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-[#c5a059] opacity-30 group-hover:opacity-100 transition-opacity" />
        <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-[#c5a059] opacity-30 group-hover:opacity-100 transition-opacity" />
    </button>
);

const EnemyCard = ({ enemy }) => {
    if (!enemy) return null;

    const maxHp = enemy.maxHp || enemy.hp || 100;
    const currentHp = enemy.hp !== undefined ? enemy.hp : maxHp;
    const hpPercent = Math.max(0, Math.min(100, (currentHp / maxHp) * 100));

    return (
        <div className="mx-auto max-w-lg mb-8 bg-texture-dark border-double-gold p-1 relative overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.8)] group">
            {/* Ornate Corner Decorations */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#c5a059] opacity-50" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#c5a059] opacity-50" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#c5a059] opacity-50" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#c5a059] opacity-50" />

            {/* Inner Content */}
            <div className="border border-[#222] p-6 bg-[#050505]/80 relative z-10 backdrop-blur-sm">
                <div className="flex items-center gap-6">
                    {/* Enemy Avatar/Icon - Framed */}
                    <div className="w-24 h-24 bg-[#111] border-double-gold flex items-center justify-center shadow-[inset_0_0_20px_rgba(0,0,0,1)] shrink-0 relative">
                        <div className="absolute inset-0 border border-[#c5a059] opacity-20" />
                        <Skull size={48} className="text-[#8b0000] drop-shadow-[0_0_15px_rgba(139,0,0,0.6)]" />
                    </div>

                    <div className="flex-1">
                        <div className="flex justify-between items-end mb-3">
                            <h3 className="text-2xl font-bold text-gold-gradient font-['Cinzel'] tracking-wider drop-shadow-lg">{enemy.name || "Inimigo"}</h3>
                            <span className="text-xs text-[#666] font-bold uppercase tracking-[0.2em] border border-[#333] px-2 py-1">Nível {enemy.level || 1}</span>
                        </div>

                        {/* HP Bar - Vial Style */}
                        <div className="relative">
                            <div className="flex justify-between text-[10px] text-[#555] uppercase tracking-wider mb-1 font-bold">
                                <span>Vida</span>
                                <span className="font-mono text-[#b30000]">{currentHp} / {maxHp}</span>
                            </div>
                            <div className="w-full h-5 vial-glass rounded-sm">
                                <div
                                    className="h-full vial-liquid-red transition-all duration-200 relative"
                                    style={{ width: `${hpPercent}%` }}
                                >
                                    <div className="vial-shine" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const CenterGrid = ({
    logs,
    onNavigate,
    gameState,
    combatState,
    onCombatAction,
    floor,
    corridor
}) => {
    const logsEndRef = useRef(null);

    useEffect(() => {
        logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [logs, combatState]);

    const isCombat = gameState === 'COMBAT';

    return (
        <div className="flex-1 flex flex-col h-full bg-[#050505] relative z-0 overflow-auto px-4 md:px-8 lg:px-12 animate-in fade-in zoom-in-98 duration-500">

            {/* Main Container - Stone Border with Vignette */}
            <div className="absolute inset-2 mx-4 border-double-gold bg-texture-dark flex flex-col shadow-[inset_0_0_100px_rgba(0,0,0,1)] z-30">
                {/* Decorative Top Border */}
                <div className="h-1 bg-gradient-to-r from-transparent via-[#c5a059] to-transparent opacity-30" />

                {/* Floor & Corridor Indicator */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center">
                    <div className="text-[#c5a059] font-['Cinzel'] font-bold text-xl tracking-[0.2em] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                        ANDAR {floor}
                    </div>
                    <div className="text-[#666] text-xs uppercase tracking-widest font-bold mt-1">
                        Corredor {corridor} / 10
                    </div>
                    {/* Decorative Divider */}
                    <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#c5a059]/50 to-transparent mt-2" />
                </div>

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col relative z-10 overflow-hidden">

                    {/* Dynamic Lighting Overlay - Simulates torch flicker on the content */}
                    <div className="absolute inset-0 pointer-events-none z-0 mix-blend-soft-light opacity-40 animate-flicker bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-900/30 via-transparent to-transparent" />

                    {/* Floating Embers */}
                    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                        <EmberParticle delay={0} left={20} />
                        <EmberParticle delay={1.5} left={50} />
                        <EmberParticle delay={0.8} left={80} />
                        <EmberParticle delay={2.2} left={35} />
                        <EmberParticle delay={3} left={65} />
                    </div>

                    {/* Scrollable Logs */}
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-8 scroll-smooth relative z-10">
                        {/* Subtle noise overlay for texture */}
                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />

                        <div className="max-w-3xl mx-auto min-h-full flex flex-col justify-end pb-4 relative z-10">
                            {logs.map((log, i) => (
                                <LogEntry key={i} entry={log} />
                            ))}
                            <div ref={logsEndRef} />
                        </div>
                    </div>

                    {/* Fixed Enemy Display during Combat */}
                    {isCombat && combatState?.enemy && (
                        <div className="flex-none pb-6 px-8 z-20">
                            <EnemyCard enemy={combatState.enemy} />
                        </div>
                    )}
                </div>

                {/* Controls Area (Footer) */}
                <div className="h-64 bg-ornate-pattern p-6 relative z-30 shadow-[0_-20px_50px_rgba(0,0,0,0.9)]">
                    {/* Ornate Divider Line */}
                    <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#c5a059]/60 via-[#c5a059] to-[#c5a059]/60 opacity-80" />


                    <div className="max-w-2xl mx-auto h-full flex flex-col justify-center relative z-50">

                        {isCombat ? (
                            <div className="grid grid-cols-3 gap-6 h-32">
                                <ActionButton
                                    onClick={() => onCombatAction('attack')}
                                    icon={Sword}
                                    label="Atacar"
                                    subLabel="Físico"
                                />
                                <ActionButton
                                    onClick={() => onCombatAction('defend')}
                                    icon={Shield}
                                    label="Defender"
                                    subLabel="Bloqueio"
                                />
                                <ActionButton
                                    onClick={() => onCombatAction('skill')}
                                    icon={Star}
                                    label="Magia"
                                    subLabel="Mana"
                                />
                            </div>
                        ) : (
                            <div className="grid grid-cols-3 gap-4 h-full max-w-md mx-auto w-full items-center">
                                {/* Navigation Pad */}
                                <div className="col-start-2 h-24">
                                    <button
                                        onClick={() => onNavigate('forward')}
                                        className="w-full h-full flex flex-col items-center justify-center gap-2 group bg-texture-dark border-double-gold relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(197,160,89,0.2)] active:translate-y-0"
                                    >
                                        <div className="absolute inset-0 bg-ornate-pattern opacity-20 group-hover:opacity-40 transition-opacity" />
                                        <ArrowUp className="text-[#666] group-hover:text-[#c5a059] relative z-10" size={32} />
                                        <span className="text-[10px] font-bold font-['Cinzel'] tracking-widest text-[#666] group-hover:text-gold-gradient relative z-10">NORTE</span>
                                    </button>
                                </div>

                                <div className="col-start-1 row-start-2 h-24 -mt-4">
                                    <button
                                        onClick={() => onNavigate('left')}
                                        className="w-full h-full flex flex-col items-center justify-center gap-2 group bg-texture-dark border-double-gold relative overflow-hidden transition-all duration-300 hover:-translate-x-1 hover:shadow-[0_0_20px_rgba(197,160,89,0.2)] active:translate-x-0"
                                    >
                                        <div className="absolute inset-0 bg-ornate-pattern opacity-20 group-hover:opacity-40 transition-opacity" />
                                        <ArrowLeft className="text-[#666] group-hover:text-[#c5a059] relative z-10" size={32} />
                                        <span className="text-[10px] font-bold font-['Cinzel'] tracking-widest text-[#666] group-hover:text-gold-gradient relative z-10">OESTE</span>
                                    </button>
                                </div>

                                <div className="col-start-3 row-start-2 h-24 -mt-4">
                                    <button
                                        onClick={() => onNavigate('right')}
                                        className="w-full h-full flex flex-col items-center justify-center gap-2 group bg-texture-dark border-double-gold relative overflow-hidden transition-all duration-300 hover:translate-x-1 hover:shadow-[0_0_20px_rgba(197,160,89,0.2)] active:translate-x-0"
                                    >
                                        <div className="absolute inset-0 bg-ornate-pattern opacity-20 group-hover:opacity-40 transition-opacity" />
                                        <ArrowRight className="text-[#666] group-hover:text-[#c5a059] relative z-10" size={32} />
                                        <span className="text-[10px] font-bold font-['Cinzel'] tracking-widest text-[#666] group-hover:text-gold-gradient relative z-10">LESTE</span>
                                    </button>
                                </div>

                                {/* Center Compass Decor */}
                                <div className="col-start-2 row-start-2 -mt-4 flex items-center justify-center z-10 pointer-events-none">
                                    <div className="w-20 h-20 bg-[#0a0a0a] border-double-gold shadow-[0_0_30px_rgba(0,0,0,0.8)] flex items-center justify-center rotate-45 relative overflow-hidden">
                                        <div className="absolute inset-0 bg-ornate-pattern opacity-50" />
                                        <Compass size={40} className="text-[#c5a059] -rotate-45 drop-shadow-lg relative z-10 opacity-80" />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CenterGrid;
