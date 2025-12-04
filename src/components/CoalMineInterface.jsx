import React from 'react';
import { Hammer, Footprints, Flame, X, AlertTriangle, Package, Pickaxe } from 'lucide-react';

const CoalMineInterface = ({ onClose, miningState, buyUpgrade, resolveStatus, collectResources, upgradesData, heroGold }) => {
    const { coal, maxCoal, rate, upgrades, status, statusMessage, stash } = miningState;
    const percentage = Math.min(100, (coal / maxCoal) * 100);

    return (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-8 animate-in fade-in zoom-in-95 duration-300">
            <div className="w-full max-w-4xl bg-[#0a0a0a] border border-[#333] shadow-2xl relative flex flex-col overflow-hidden h-[80vh]">
                
                {/* Close Button */}
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 z-50 text-[#666] hover:text-white transition-colors"
                >
                    <X size={24} />
                </button>

                {/* Header */}
                <div className="relative p-8 border-b border-[#333] bg-[#050505]">
                    <div className="flex justify-between items-end relative z-10">
                        <div>
                            <h2 className="text-3xl font-bold text-[#c5a059] font-['Cinzel'] flex items-center gap-3">
                                <Flame size={28} className="text-orange-500 animate-pulse" />
                                Mina Profunda
                            </h2>
                            <div className="flex items-center gap-2 mt-1">
                                <span className={`w-2 h-2 rounded-full ${status === 'ACTIVE' ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
                                <p className="text-[#666] uppercase tracking-widest text-xs">
                                    {status === 'ACTIVE' ? 'Operação Normal' : 'PARALISADA'}
                                </p>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-mono font-bold text-white">
                                {Math.floor(coal)} <span className="text-[#555] text-lg">/ {maxCoal}</span>
                            </div>
                            <button 
                                onClick={collectResources}
                                className="mt-2 bg-[#c5a059] hover:bg-[#d4b06a] text-black text-xs font-bold px-4 py-1 uppercase tracking-widest transition-colors flex items-center gap-2 ml-auto"
                            >
                                <Package size={14} /> Coletar Tudo
                            </button>
                        </div>
                    </div>
                </div>

                {/* Problem Alert Overlay/Section */}
                {status !== 'ACTIVE' && (
                    <div className="bg-red-900/20 border-b border-red-900/50 p-4 flex items-center justify-between animate-in slide-in-from-top-2">
                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-red-900/20 rounded-full border border-red-500 animate-bounce">
                                <AlertTriangle size={24} className="text-red-500" />
                            </div>
                            <div>
                                <h3 className="text-red-400 font-bold uppercase tracking-wider text-sm">Produção Interrompida</h3>
                                <p className="text-red-200/70 text-xs italic">{statusMessage}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => resolveStatus(status)}
                            className="bg-red-900/40 hover:bg-red-900/60 border border-red-500 text-red-200 px-6 py-2 text-xs font-bold uppercase tracking-widest transition-all flex flex-col items-center"
                        >
                            <span>Resolver</span>
                            <span className="text-[10px] opacity-70">{status === 'SCARED' ? '10 G' : '50 G'}</span>
                        </button>
                    </div>
                )}

                <div className="flex flex-1 overflow-hidden">
                    {/* Left: Upgrades */}
                    <div className="w-2/3 border-r border-[#333] bg-[#0c0c0c] p-6 overflow-y-auto custom-scrollbar">
                        <h3 className="text-[#c5a059] font-bold uppercase tracking-widest mb-6 border-b border-[#333] pb-2 flex items-center gap-2">
                            <Hammer size={16} /> Melhorias
                        </h3>
                        <div className="space-y-4">
                            {Object.entries(upgradesData).map(([key, data]) => {
                                const currentLevel = upgrades[key];
                                const cost = Math.floor(data.baseCost * Math.pow(data.costMultiplier, currentLevel));
                                const canAfford = heroGold >= cost;
                                const Icon = data.icon === 'Hammer' ? Pickaxe : data.icon === 'Footprints' ? Footprints : Flame;

                                return (
                                    <div key={key} className="bg-[#111] border border-[#333] p-4 hover:border-[#c5a059]/30 transition-all group">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-[#0a0a0a] border border-[#333] group-hover:border-[#c5a059] transition-colors">
                                                    <Icon size={20} className="text-[#666] group-hover:text-[#c5a059]" />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-[#ccc] text-sm">{data.name}</h4>
                                                    <span className="text-[10px] font-mono text-[#555] uppercase">Nível {currentLevel}</span>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => buyUpgrade(key)}
                                                disabled={!canAfford}
                                                className={`px-3 py-1 text-[10px] font-bold uppercase border transition-all ${
                                                    canAfford 
                                                    ? 'bg-[#c5a059]/10 border-[#c5a059] text-[#c5a059] hover:bg-[#c5a059] hover:text-black' 
                                                    : 'bg-[#1a1a1a] border-[#333] text-[#444] cursor-not-allowed'
                                                }`}
                                            >
                                                {cost} G
                                            </button>
                                        </div>
                                        <p className="text-xs text-[#666] mb-2">{data.description}</p>
                                        <div className="text-[10px] text-[#c5a059] bg-[#0a0a0a] inline-block px-2 py-0.5 rounded border border-[#222]">
                                            +{data.baseRate} carvão/s
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right: Stash & Stats */}
                    <div className="w-1/3 bg-[#080808] p-6 flex flex-col">
                        <div className="mb-6">
                            <h3 className="text-[#888] font-bold uppercase tracking-widest mb-4 text-xs border-b border-[#333] pb-2">
                                Estoque
                            </h3>
                            
                            {/* Coal Gauge */}
                            <div className="mb-4">
                                <div className="flex justify-between text-xs text-[#666] mb-1">
                                    <span>Carvão</span>
                                    <span>{Math.floor(percentage)}%</span>
                                </div>
                                <div className="h-2 w-full bg-[#111] rounded-full overflow-hidden border border-[#333]">
                                    <div 
                                        className="h-full bg-gradient-to-r from-orange-900 via-[#c5a059] to-orange-500 transition-all duration-300"
                                        style={{ width: `${percentage}%` }}
                                    />
                                </div>
                            </div>

                            {/* Loot Grid */}
                            <div className="grid grid-cols-3 gap-2">
                                {stash.map((item, idx) => (
                                    <div key={idx} className="aspect-square bg-[#111] border border-[#333] flex flex-col items-center justify-center relative group hover:border-[#c5a059] transition-colors">
                                        <Package size={16} className="text-[#c5a059] mb-1" />
                                        <span className="text-[9px] text-[#888] text-center leading-none px-1 truncate w-full">{item.name}</span>
                                        <span className="absolute top-0 right-0 bg-[#222] text-white text-[8px] px-1 border-l border-b border-[#333]">{item.count}</span>
                                        
                                        {/* Tooltip */}
                                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-32 bg-black border border-[#333] p-2 text-[10px] hidden group-hover:block z-50 text-center">
                                            {item.name} ({item.type})
                                        </div>
                                    </div>
                                ))}
                                {stash.length === 0 && (
                                    <div className="col-span-3 text-center py-4 text-xs text-[#333] italic">
                                        Nenhum tesouro encontrado.
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="mt-auto">
                            <div className="bg-[#111] p-3 border border-[#333] text-xs text-[#666] font-mono">
                                <div className="flex justify-between">
                                    <span>Taxa:</span>
                                    <span className="text-[#c5a059]">{rate}/s</span>
                                </div>
                                <div className="flex justify-between mt-1">
                                    <span>Risco:</span>
                                    <span className="text-red-900">{(0.2 + (upgrades.pickaxe * 0.05)).toFixed(1)}%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoalMineInterface;
