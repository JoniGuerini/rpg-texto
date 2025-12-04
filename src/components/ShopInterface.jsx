import React, { useState, useEffect } from 'react';
import { Coins, X, ShoppingBag, ArrowRight, Hammer } from 'lucide-react';

const RarityColor = {
    common: 'text-[#a8a8a8]',
    uncommon: 'text-emerald-400',
    rare: 'text-blue-400',
    epic: 'text-purple-400',
    unique: 'text-[#c5a059]'
};

const ShopInterface = ({ onClose, heroGold, inventory, onBuy, onSell, onRepair, shopData = [], title = "Loja", subtitle = "Mercadorias" }) => {
    const [activeTab, setActiveTab] = useState('buy'); // 'buy' or 'sell'
    const [selectedItem, setSelectedItem] = useState(null);

    // Filter inventory for sellable items (optional: filter out quest items)
    const sellableItems = inventory.filter(slot => slot.item.value > 0);

    // Update selected item count when inventory changes
    useEffect(() => {
        if (selectedItem && activeTab === 'sell') {
            const updatedSlot = inventory.find(slot => 
                slot && slot.item.id === selectedItem.id
            );
            
            if (updatedSlot) {
                // Update count in selected item
                setSelectedItem(prev => ({ ...prev, count: updatedSlot.count }));
            } else {
                // Item no longer exists, deselect
                setSelectedItem(null);
            }
        }
    }, [inventory, selectedItem, activeTab]);

    const handleBuy = () => {
        if (selectedItem && heroGold >= selectedItem.value) {
            onBuy(selectedItem);
            setSelectedItem(null); // Deselect or keep selected?
        }
    };

    const handleSell = () => {
        if (selectedItem) {
            onSell(selectedItem);
            // Note: useEffect will automatically update count or deselect if item runs out
        }
    };

    return (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-2 md:p-6 lg:p-8 animate-in fade-in zoom-in-95 duration-300">
            <div className="w-[95vw] max-w-5xl h-[90vh] md:h-[75vh] bg-[#0c0c0c] border border-[#333] shadow-2xl flex flex-col relative overflow-hidden">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-50 p-2 text-[#666] hover:text-white hover:bg-[#222] rounded-full transition-colors"
                >
                    <X size={24} />
                </button>

                {/* Header */}
                <div className="h-20 bg-[#111] border-b border-[#333] flex items-center px-8 justify-between shrink-0">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-[#1a1a1a] border border-[#333] rounded-lg">
                            <Coins size={32} className="text-[#c5a059]" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold font-['Cinzel'] text-gold-gradient tracking-wider">
                                {title}
                            </h2>
                            <p className="text-xs text-[#666] uppercase tracking-widest">{subtitle}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Repair Button (Only if onRepair provided) */}
                        {onRepair && (
                            <button
                                onClick={onRepair}
                                className="flex items-center gap-2 bg-[#1a1a1a] px-4 py-2 border border-[#333] rounded hover:border-[#c5a059] hover:text-[#c5a059] transition-all group"
                                title="Reparar Todo o Equipamento (50 Ouro)"
                            >
                                <Hammer size={16} className="text-[#666] group-hover:text-[#c5a059]" />
                                <span className="text-xs font-bold uppercase tracking-wider text-[#888] group-hover:text-[#c5a059]">Reparar</span>
                            </button>
                        )}

                        <div className="flex items-center gap-2 bg-[#0a0a0a] px-4 py-2 border border-[#333] rounded">
                            <span className="text-[#666] text-xs uppercase tracking-widest">Seu Ouro</span>
                            <span className="text-[#c5a059] font-bold font-mono text-lg">{heroGold}</span>
                            <Coins size={16} className="text-[#c5a059]" />
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-[#333] bg-[#0a0a0a]">
                    <button
                        onClick={() => { setActiveTab('buy'); setSelectedItem(null); }}
                        className={`flex-1 py-4 text-sm font-bold uppercase tracking-widest transition-all ${activeTab === 'buy'
                            ? 'bg-[#1a1a1a] text-[#c5a059] border-b-2 border-[#c5a059]'
                            : 'text-[#666] hover:text-[#ccc] hover:bg-[#111]'}`}
                    >
                        Comprar
                    </button>
                    <button
                        onClick={() => { setActiveTab('sell'); setSelectedItem(null); }}
                        className={`flex-1 py-4 text-sm font-bold uppercase tracking-widest transition-all ${activeTab === 'sell'
                            ? 'bg-[#1a1a1a] text-[#c5a059] border-b-2 border-[#c5a059]'
                            : 'text-[#666] hover:text-[#ccc] hover:bg-[#111]'}`}
                    >
                        Vender
                    </button>
                </div>

                {/* Content Area */}
                <div className="flex flex-1 overflow-hidden">
                    {/* Item List */}
                    <div className="w-1/2 border-r border-[#333] overflow-y-auto custom-scrollbar p-4 bg-[#0e0e0e]">
                        <div className="grid grid-cols-1 gap-2">
                            {activeTab === 'buy' ? (
                                shopData.map(item => (
                                    <button
                                        key={item.id}
                                        onClick={() => setSelectedItem(item)}
                                        className={`flex items-center gap-4 p-3 border transition-all text-left ${selectedItem?.id === item.id
                                            ? 'bg-[#1a1a1a] border-[#c5a059]'
                                            : 'bg-[#111] border-[#222] hover:border-[#444]'}`}
                                    >
                                        <div className={`w-12 h-12 bg-[#050505] border border-[#333] flex items-center justify-center shrink-0 ${selectedItem?.id === item.id ? 'border-[#c5a059]' : ''}`}>
                                            {item.icon ? <item.icon size={24} className={RarityColor[item.rarity]} /> : <ShoppingBag size={24} className={RarityColor[item.rarity]} />}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className={`font-bold truncate ${RarityColor[item.rarity]}`}>{item.name}</div>
                                            <div className="text-xs text-[#666]">{item.type}</div>
                                        </div>
                                        <div className="text-[#c5a059] font-mono font-bold text-sm">
                                            {item.value} G
                                        </div>
                                    </button>
                                ))
                            ) : (
                                sellableItems.length > 0 ? (
                                    sellableItems.map((slot, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedItem({ ...slot.item, inventoryIndex: index, count: slot.count })}
                                            className={`flex items-center gap-4 p-3 border transition-all text-left ${selectedItem?.inventoryIndex === index
                                                ? 'bg-[#1a1a1a] border-[#c5a059]'
                                                : 'bg-[#111] border-[#222] hover:border-[#444]'}`}
                                        >
                                            <div className="w-12 h-12 bg-[#050505] border border-[#333] flex items-center justify-center shrink-0 relative">
                                                {/* Placeholder Icon since inventory items might not have icon components yet, or use generic */}
                                                <ShoppingBag size={24} className={RarityColor[slot.item.rarity]} />
                                                <span className="absolute bottom-0 right-0 bg-[#222] text-white text-[10px] px-1 border-t border-l border-[#333]">
                                                    {slot.count}
                                                </span>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className={`font-bold truncate ${RarityColor[slot.item.rarity]}`}>{slot.item.name}</div>
                                                <div className="text-xs text-[#666]">{slot.item.type}</div>
                                            </div>
                                            <div className="text-[#c5a059] font-mono font-bold text-sm">
                                                {Math.floor(slot.item.value / 2)} G
                                            </div>
                                        </button>
                                    ))
                                ) : (
                                    <div className="text-center text-[#555] italic mt-10">Nada para vender.</div>
                                )
                            )}
                        </div>
                    </div>

                    {/* Details Panel */}
                    <div className="w-1/2 bg-[#0a0a0a] p-8 flex flex-col relative">
                        {/* Background Watermark */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none">
                            <Coins size={300} />
                        </div>

                        {selectedItem ? (
                            <div className="relative z-10 flex-1 flex flex-col">
                                <div className="flex items-start gap-4 mb-6">
                                    <div className="w-20 h-20 bg-[#111] border-2 border-[#333] shadow-lg flex items-center justify-center">
                                        {selectedItem.icon ? <selectedItem.icon size={40} className={RarityColor[selectedItem.rarity]} /> : <ShoppingBag size={40} className={RarityColor[selectedItem.rarity]} />}
                                    </div>
                                    <div>
                                        <h3 className={`text-2xl font-bold font-['Cinzel'] ${RarityColor[selectedItem.rarity]}`}>{selectedItem.name}</h3>
                                        <p className="text-[#666] text-sm uppercase tracking-wider">{selectedItem.type} • {selectedItem.rarity}</p>
                                    </div>
                                </div>

                                <p className="text-[#888] italic font-serif mb-6 border-l-2 border-[#333] pl-4">
                                    "{selectedItem.description}"
                                </p>

                                {selectedItem.stats && (
                                    <div className="grid grid-cols-2 gap-2 mb-8">
                                        {Object.entries(selectedItem.stats).map(([key, val]) => (
                                            <div key={key} className="flex justify-between bg-[#111] px-3 py-2 border border-[#222]">
                                                <span className="text-[#555] uppercase text-xs font-bold">{key}</span>
                                                <span className="text-[#ccc] font-mono">{val > 0 ? `+${val}` : val}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <div className="mt-auto pt-6 border-t border-[#333]">
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-[#888] text-sm uppercase tracking-widest">
                                            {activeTab === 'buy' ? 'Custo' : 'Valor de Venda'}
                                            {activeTab === 'sell' && selectedItem.count && (
                                                <span className="ml-2 text-[#c5a059]">({selectedItem.count} disponível)</span>
                                            )}
                                        </span>
                                        <div className="text-2xl font-bold font-mono text-[#c5a059] flex items-center gap-2">
                                            {activeTab === 'buy' ? selectedItem.value : Math.floor(selectedItem.value / 2)} <Coins size={20} />
                                        </div>
                                    </div>

                                    <button
                                        onClick={activeTab === 'buy' ? handleBuy : handleSell}
                                        disabled={activeTab === 'buy' && heroGold < selectedItem.value}
                                        className={`w-full py-4 font-bold font-['Cinzel'] tracking-widest flex items-center justify-center gap-2 transition-all ${activeTab === 'buy' && heroGold < selectedItem.value
                                                ? 'bg-[#222] text-[#555] cursor-not-allowed'
                                                : 'bg-[#c5a059] text-black hover:bg-[#d4b06a] shadow-[0_0_20px_rgba(197,160,89,0.3)]'
                                            }`}
                                    >
                                        {activeTab === 'buy' ? (
                                            <>COMPRAR <ArrowRight size={20} /></>
                                        ) : (
                                            <>VENDER (1x) <Coins size={20} /></>
                                        )}
                                    </button>
                                    {activeTab === 'buy' && heroGold < selectedItem.value && (
                                        <div className="text-center text-red-500 text-xs mt-2 uppercase tracking-widest font-bold">
                                            Ouro Insuficiente
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="flex-1 flex items-center justify-center text-[#333] flex-col gap-4">
                                <ShoppingBag size={64} className="opacity-20" />
                                <p className="font-serif italic">Selecione um item para ver os detalhes.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShopInterface;
