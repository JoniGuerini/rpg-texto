import React, { useState } from 'react';
import { X, Package, Archive } from 'lucide-react';

const RarityColor = {
    common: 'border-[#444]',
    uncommon: 'border-emerald-900',
    rare: 'border-blue-900',
    epic: 'border-purple-900',
    unique: 'border-[#c5a059]'
};

const ItemSlot = ({ slot, index, source, onDragStart, onDrop, onDragOver, onDragEnd, isDragTarget }) => {
    const item = slot ? slot.item : null;
    const count = slot ? slot.count : 0;

    return (
        <div 
            draggable={!!item}
            onDragStart={(e) => onDragStart(e, index, source)}
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, index, source)}
            onDragEnd={onDragEnd}
            className={`w-12 h-12 bg-[#080808] border relative group transition-all ${
                item 
                    ? `${RarityColor[item.rarity] || 'border-[#444]'} hover:border-white cursor-grab active:cursor-grabbing` 
                    : 'border-[#222] hover:border-[#444]'
            } ${isDragTarget ? 'ring-2 ring-[#c5a059] ring-opacity-50' : ''}`}
            title={item ? item.name : 'Slot Vazio'}
        >
            {item && (
                <>
                    <div className="w-full h-full flex items-center justify-center pointer-events-none">
                        <Package size={20} className={item.rarity === 'unique' ? 'text-[#c5a059]' : item.rarity === 'rare' ? 'text-blue-400' : 'text-[#888]'} />
                    </div>
                    {count > 1 && (
                        <span className="absolute bottom-0 right-0 bg-[#111] text-white text-[9px] px-1 border-t border-l border-[#333] font-mono pointer-events-none">
                            {count}
                        </span>
                    )}
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-44 bg-[#0c0c0c] border-2 border-[#333] p-2 z-[100] hidden group-hover:block pointer-events-none shadow-2xl">
                        <div className={`font-bold text-xs mb-1 font-['Cinzel'] ${item.rarity === 'unique' ? 'text-[#c5a059]' : item.rarity === 'rare' ? 'text-blue-400' : 'text-[#ccc]'}`}>
                            {item.name}
                        </div>
                        <div className="text-[9px] text-[#555] italic uppercase border-b border-[#222] pb-1 mb-1">{item.type}</div>
                        {item.description && (
                            <div className="text-[9px] text-[#888] mb-1 font-serif italic">{item.description}</div>
                        )}
                        {item.stats && Object.keys(item.stats).length > 0 && (
                            <div className="text-[9px] text-[#c5a059] space-y-0.5 border-t border-[#222] pt-1">
                                {Object.entries(item.stats).map(([k, v]) => (
                                    <div key={k} className="flex justify-between">
                                        <span className="text-[#666]">{k.toUpperCase()}</span>
                                        <span className="font-mono">+{v}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                        <div className="text-[8px] text-[#333] mt-1 text-center uppercase tracking-wider">
                            Arraste para mover
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

const InventoryInterface = ({ onClose, inventoryData }) => {
    const { 
        inventory, 
        stash, 
        swapInventorySlots, 
        swapStashSlots, 
        moveToStashSlot, 
        takeFromStashToSlot 
    } = inventoryData;
    
    const [draggedItem, setDraggedItem] = useState(null); // { index, source }
    const [dragTarget, setDragTarget] = useState(null); // { index, source } - for visual feedback

    const handleDragStart = (e, index, source) => {
        setDraggedItem({ index, source });
        e.dataTransfer.effectAllowed = 'move';
        e.currentTarget.style.opacity = '0.4';
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDrop = (e, targetIndex, targetSource) => {
        e.preventDefault();
        
        if (!draggedItem) return;

        const { index: sourceIndex, source: sourceLocation } = draggedItem;

        // Reset visual
        setDragTarget(null);

        // Same slot, do nothing
        if (sourceIndex === targetIndex && sourceLocation === targetSource) {
            return;
        }

        // CASE 1: Moving within Inventory
        if (sourceLocation === 'inventory' && targetSource === 'inventory') {
            swapInventorySlots(sourceIndex, targetIndex);
        }
        // CASE 2: Moving within Stash
        else if (sourceLocation === 'stash' && targetSource === 'stash') {
            swapStashSlots(sourceIndex, targetIndex);
        }
        // CASE 3: Inventory → Stash
        else if (sourceLocation === 'inventory' && targetSource === 'stash') {
            moveToStashSlot(sourceIndex, targetIndex);
        }
        // CASE 4: Stash → Inventory
        else if (sourceLocation === 'stash' && targetSource === 'inventory') {
            takeFromStashToSlot(sourceIndex, targetIndex);
        }

        setDraggedItem(null);
    };

    const handleDragEnd = (e) => {
        e.currentTarget.style.opacity = '1';
        setDraggedItem(null);
        setDragTarget(null);
    };

    const handleDragEnter = (e, index, source) => {
        e.preventDefault();
        setDragTarget({ index, source });
    };

    return (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-8 animate-in fade-in zoom-in-95 duration-300">
            <div className="bg-[#0c0c0c] border-2 border-[#333] shadow-2xl p-1 relative flex gap-1">
                
                {/* Close Button */}
                <button 
                    onClick={onClose}
                    className="absolute -top-10 right-0 text-[#666] hover:text-white bg-[#111] border border-[#333] px-3 py-1 uppercase text-xs font-bold transition-colors hover:border-[#c5a059]"
                >
                    Fechar [ESC]
                </button>

                {/* Left Panel: Inventory */}
                <div className="w-72 bg-[#111] border border-[#333] p-4 flex flex-col">
                    <h2 className="text-[#c5a059] font-['Cinzel'] text-center border-b border-[#333] pb-2 mb-4 flex items-center justify-center gap-2">
                        <Package size={16} /> Mochila
                    </h2>
                    <div className="grid grid-cols-5 gap-1 auto-rows-min">
                        {inventory.map((slot, idx) => (
                            <ItemSlot 
                                key={`inv-${idx}`} 
                                slot={slot} 
                                index={idx}
                                source="inventory"
                                onDragStart={handleDragStart}
                                onDragOver={handleDragOver}
                                onDrop={handleDrop}
                                onDragEnd={handleDragEnd}
                                isDragTarget={dragTarget?.source === 'inventory' && dragTarget?.index === idx}
                            />
                        ))}
                    </div>
                    <div className="mt-auto pt-4 text-center text-[10px] text-[#555] font-mono">
                        {inventory.filter(i => i).length} / {inventory.length} Slots
                    </div>
                </div>

                {/* Divider */}
                <div className="w-1 bg-gradient-to-b from-transparent via-[#c5a059]/20 to-transparent" />

                {/* Right Panel: Stash */}
                <div className="w-96 bg-[#0e0e0e] border border-[#333] p-4 flex flex-col relative overflow-hidden">
                    {/* Texture BG */}
                    <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] pointer-events-none" />
                    
                    <h2 className="text-[#c5a059] font-['Cinzel'] text-center border-b border-[#333] pb-2 mb-4 flex items-center justify-center gap-2 relative z-10">
                        <Archive size={16} /> Baú Pessoal
                    </h2>
                    <div className="grid grid-cols-7 gap-1 auto-rows-min relative z-10">
                        {stash.map((slot, idx) => (
                            <ItemSlot 
                                key={`stash-${idx}`} 
                                slot={slot} 
                                index={idx}
                                source="stash"
                                onDragStart={handleDragStart}
                                onDragOver={handleDragOver}
                                onDrop={handleDrop}
                                onDragEnd={handleDragEnd}
                                isDragTarget={dragTarget?.source === 'stash' && dragTarget?.index === idx}
                            />
                        ))}
                    </div>
                    <div className="mt-auto pt-4 text-center text-[10px] text-[#555] relative z-10 font-mono">
                        Armazenamento Seguro • {stash.filter(i => i).length} / {stash.length} Slots
                    </div>
                </div>

                {/* Drag Hint */}
                <div className="absolute -bottom-8 left-0 right-0 text-center">
                    <div className="inline-block bg-[#111] border border-[#333] px-4 py-1 text-[10px] text-[#666] uppercase tracking-widest">
                        <span className="text-[#c5a059]">Arraste</span> itens livremente • <span className="text-emerald-400">Solte</span> onde quiser • <span className="text-blue-400">Troque</span> de posição
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InventoryInterface;
