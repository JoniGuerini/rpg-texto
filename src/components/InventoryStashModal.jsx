import React, { useState } from 'react';
import { X, Package, Box, ArrowRightLeft, Shield, Sword, Zap, FlaskConical, Search } from 'lucide-react';

const RarityColor = {
    common: 'border-[#444] text-[#a8a8a8]',
    uncommon: 'border-emerald-900 text-emerald-400',
    rare: 'border-blue-900 text-blue-400',
    epic: 'border-purple-900 text-purple-400',
    unique: 'border-[#c5a059] text-[#c5a059]'
};

const RarityBg = {
    common: 'bg-[#1a1a1a]',
    uncommon: 'bg-emerald-900/10',
    rare: 'bg-blue-900/10',
    epic: 'bg-purple-900/10',
    unique: 'bg-[#c5a059]/10'
};

const ItemIcon = ({ item }) => {
    if (!item) return null;
    // Simple icon logic based on type/name if no specific icon component is passed
    if (item.type?.includes('Armadura') || item.type?.includes('Escudo')) return <Shield size={20} />;
    if (item.type?.includes('Arma')) return <Sword size={20} />;
    if (item.type?.includes('Consumível')) return <FlaskConical size={20} />;
    return <Package size={20} />;
};

const ItemSlot = ({ slot, onClick, context }) => {
    const item = slot?.item;
    const isEmpty = !item;

    return (
        <div 
            onClick={() => !isEmpty && onClick(slot)}
            className={`relative aspect-square border-2 transition-all group ${isEmpty 
                ? 'border-[#222] bg-[#0a0a0a] hover:border-[#333]' 
                : `${RarityColor[item.rarity] || RarityColor.common} ${RarityBg[item.rarity] || RarityBg.common} cursor-pointer hover:brightness-125 hover:scale-[1.02] shadow-lg`
            }`}
        >
            {/* Inner Shadow for Depth */}
            <div className="absolute inset-0 shadow-[inset_0_0_10px_rgba(0,0,0,0.5)] pointer-events-none" />

            {!isEmpty && (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-1">
                    <div className={`mb-1 ${RarityColor[item.rarity]}`}>
                        <ItemIcon item={item} />
                    </div>
                    <span className="text-[8px] text-center leading-none font-bold line-clamp-2 w-full px-1 opacity-80 group-hover:opacity-100">
                        {item.name}
                    </span>
                    {slot.count > 1 && (
                        <div className="absolute bottom-0 right-0 bg-[#0a0a0a] border-t border-l border-[#333] px-1 text-[9px] font-mono text-white">
                            {slot.count}
                        </div>
                    )}
                </div>
            )}

            {/* Hover Tooltip (Simple) */}
            {!isEmpty && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-40 bg-[#0c0c0c] border border-[#333] p-2 text-xs hidden group-hover:block z-50 shadow-xl pointer-events-none">
                    <div className={`font-bold mb-1 ${RarityColor[item.rarity]}`}>{item.name}</div>
                    <div className="text-[#666] mb-1">{item.type}</div>
                    <div className="text-[#888] italic text-[10px] leading-tight">"{item.description}"</div>
                    <div className="mt-2 pt-1 border-t border-[#333] text-[#c5a059] text-[10px] text-right">
                        {context === 'inventory' ? 'Clique para guardar' : 'Clique para pegar'}
                    </div>
                </div>
            )}
        </div>
    );
};

const InventoryStashModal = ({ onClose, inventory, stash, onTransfer }) => {
    // Ensure we display a fixed grid size (e.g., 25 slots for inventory, 50 for stash)
    // We fill the rest with nulls
    const INVENTORY_SIZE = 25;
    const STASH_SIZE = 50;

    const inventorySlots = [...inventory, ...Array(Math.max(0, INVENTORY_SIZE - inventory.length)).fill(null)];
    const stashSlots = [...stash, ...Array(Math.max(0, STASH_SIZE - stash.length)).fill(null)];

    return (
        <div className="absolute inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-sm p-8 animate-in fade-in duration-200">
            <div className="w-full max-w-5xl h-[85vh] bg-[#080808] border border-[#333] shadow-2xl flex flex-col relative overflow-hidden">
                
                {/* Close Button */}
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 z-50 text-[#666] hover:text-white transition-colors"
                >
                    <X size={24} />
                </button>

                {/* Header */}
                <div className="h-16 border-b border-[#333] bg-[#111] flex items-center justify-center relative">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')] opacity-50" />
                    <h2 className="text-2xl font-bold font-['Cinzel'] text-[#c5a059] flex items-center gap-3 relative z-10">
                        <Box size={24} /> Gerenciamento de Itens
                    </h2>
                </div>

                {/* Content - Dual Pane */}
                <div className="flex-1 flex overflow-hidden">
                    
                    {/* Left: Inventory */}
                    <div className="w-1/2 flex flex-col border-r border-[#333] bg-[#0a0a0a]">
                        <div className="p-4 border-b border-[#333] flex justify-between items-center bg-[#111]">
                            <h3 className="text-lg font-bold text-[#ccc] font-serif flex items-center gap-2">
                                <Package size={18} className="text-[#888]" /> Mochila
                            </h3>
                            <span className="text-xs text-[#666] font-mono">{inventory.length} / {INVENTORY_SIZE}</span>
                        </div>
                        <div className="flex-1 p-4 overflow-y-auto custom-scrollbar">
                            <div className="grid grid-cols-5 gap-2">
                                {inventorySlots.map((slot, idx) => (
                                    <ItemSlot 
                                        key={`inv-${idx}`} 
                                        slot={slot} 
                                        context="inventory"
                                        onClick={(s) => onTransfer(s, 'inventory', 'stash')} 
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Center Divider/Action Hint */}
                    <div className="w-0 relative flex items-center justify-center">
                        <div className="absolute z-10 bg-[#111] border border-[#333] rounded-full p-2 text-[#c5a059]">
                            <ArrowRightLeft size={16} />
                        </div>
                    </div>

                    {/* Right: Stash */}
                    <div className="w-1/2 flex flex-col bg-[#0c0c0c]">
                        <div className="p-4 border-b border-[#333] flex justify-between items-center bg-[#111]">
                            <h3 className="text-lg font-bold text-[#c5a059] font-serif flex items-center gap-2">
                                <Box size={18} /> Baú Pessoal
                            </h3>
                            <span className="text-xs text-[#666] font-mono">{stash.length} / {STASH_SIZE}</span>
                        </div>
                        <div className="flex-1 p-4 overflow-y-auto custom-scrollbar bg-[#050505]">
                            <div className="grid grid-cols-5 gap-2">
                                {stashSlots.map((slot, idx) => (
                                    <ItemSlot 
                                        key={`stash-${idx}`} 
                                        slot={slot} 
                                        context="stash"
                                        onClick={(s) => onTransfer(s, 'stash', 'inventory')} 
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                </div>

                {/* Footer Help */}
                <div className="h-8 border-t border-[#333] bg-[#0a0a0a] flex items-center justify-center">
                    <p className="text-[10px] text-[#555] uppercase tracking-widest">Clique em um item para transferir • Itens idênticos são agrupados automaticamente</p>
                </div>
            </div>
        </div>
    );
};

export default InventoryStashModal;

