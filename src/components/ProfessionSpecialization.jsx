import React, { useState } from 'react';
import { Shield, Hammer, Activity, Sparkles, Lock, Crown, FlaskConical, Heart, Zap, Gem, Shirt, Footprints, Hand, Skull, Flame, Droplet, Snowflake, Plus, Check } from 'lucide-react';

const NodeIcon = ({ icon, size = 24, className = "" }) => {
    const icons = { Shield, Hammer, Activity, Sparkles, Lock, Crown, FlaskConical, Heart, Zap, Gem, Shirt, Footprints, Hand, Skull, Flame, Droplet, Snowflake };
    const Icon = icons[icon] || Shield;
    return <Icon size={size} className={className} />;
};

const ProfessionSpecialization = ({ profession, availablePoints, nodeInvestments, onInvest }) => {
    const [activeSpecId, setActiveSpecId] = useState(profession.specializations[0].id);
    const [selectedNodeId, setSelectedNodeId] = useState('root');

    const activeSpec = profession.specializations.find(s => s.id === activeSpecId);
    
    // Enhanced node with current investment
    const getNodeWithInvestment = (node) => ({
        ...node,
        currentPoints: nodeInvestments[node.id] || 0
    });

    const selectedNode = getNodeWithInvestment(
        activeSpec.nodes.find(n => n.id === selectedNodeId) || activeSpec.nodes[0]
    );

    // Check if node can be invested
    const canInvest = (node) => {
        const currentPoints = nodeInvestments[node.id] || 0;
        
        // Maxed out?
        if (currentPoints >= node.maxPoints) return false;
        
        // No points available?
        if (availablePoints <= 0) return false;
        
        // Parent check
        if (node.parentId) {
            const parentPoints = nodeInvestments[node.parentId] || 0;
            if (parentPoints === 0) return false;
        }
        
        return true;
    };

    // Helper to find parent node coordinates
    const getParentCoords = (parentId) => {
        const parent = activeSpec.nodes.find(n => n.id === parentId);
        return parent ? { x: parent.x, y: parent.y } : null;
    };

    const handleInvest = () => {
        if (onInvest && canInvest(selectedNode)) {
            onInvest(selectedNodeId, activeSpecId);
        }
    };

    const isMaxed = selectedNode.currentPoints >= selectedNode.maxPoints;
    const canInvestSelected = canInvest(selectedNode);

    return (
        <div className="flex flex-col h-full bg-[#0e0e0e]">
            {/* Top Tabs - Specializations */}
            <div className="flex items-center justify-center gap-4 p-4 border-b border-[#333] bg-[#0a0a0a]">
                {profession.specializations.map(spec => (
                    <button
                        key={spec.id}
                        onClick={() => { setActiveSpecId(spec.id); setSelectedNodeId('root'); }}
                        className={`px-6 py-2 text-sm font-bold uppercase tracking-wider border transition-all ${activeSpecId === spec.id
                            ? 'bg-[#c5a059] text-black border-[#c5a059] shadow-[0_0_15px_rgba(197,160,89,0.4)]'
                            : 'bg-[#111] text-[#666] border-[#333] hover:border-[#666] hover:text-[#ccc]'
                            }`}
                    >
                        {spec.name}
                    </button>
                ))}
            </div>

            <div className="flex flex-1 overflow-hidden">
                {/* Left: Tree Area */}
                <div className="flex-1 relative bg-[#080808] overflow-hidden">
                    {/* Background Texture */}
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')] pointer-events-none" />

                    {/* Spec Description + Available Points */}
                    <div className="absolute top-8 left-8 max-w-md z-10 pointer-events-none">
                        <h2 className="text-2xl font-bold text-[#c5a059] font-['Cinzel'] mb-2">{activeSpec.name}</h2>
                        <p className="text-[#888] font-serif italic leading-relaxed text-sm mb-4">
                            {activeSpec.description}
                        </p>
                        <div className="bg-[#111]/80 border border-[#c5a059]/30 px-4 py-2 inline-block rounded backdrop-blur-sm">
                            <span className="text-xs text-[#666] uppercase tracking-widest">Pontos Disponíveis:</span>
                            <span className="text-2xl font-bold text-[#c5a059] ml-2 font-mono">{availablePoints}</span>
                        </div>
                    </div>

                    {/* Tree Visualization */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative w-[800px] h-[500px]">
                            {/* Connections */}
                            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                                {activeSpec.nodes.map(node => {
                                    if (!node.parentId) return null;
                                    const parent = getParentCoords(node.parentId);
                                    if (!parent) return null;
                                    
                                    const nodeInvested = (nodeInvestments[node.id] || 0) > 0;
                                    const parentInvested = (nodeInvestments[node.parentId] || 0) > 0;
                                    
                                    return (
                                        <line
                                            key={`line-${node.id}`}
                                            x1={`${parent.x}%`} y1={`${parent.y}%`}
                                            x2={`${node.x}%`} y2={`${node.y}%`}
                                            stroke={nodeInvested && parentInvested ? '#c5a059' : '#333'}
                                            strokeWidth={nodeInvested && parentInvested ? '3' : '2'}
                                            strokeDasharray={nodeInvested && parentInvested ? '0' : '4 2'}
                                            opacity={nodeInvested && parentInvested ? '0.8' : '0.3'}
                                        />
                                    );
                                })}
                            </svg>

                            {/* Nodes */}
                            {activeSpec.nodes.map(node => {
                                const nodeData = getNodeWithInvestment(node);
                                const isMaxed = nodeData.currentPoints >= nodeData.maxPoints;
                                const hasInvestment = nodeData.currentPoints > 0;
                                const isLocked = !canInvest(node) && !hasInvestment;
                                
                                return (
                                    <button
                                        key={node.id}
                                        onClick={() => setSelectedNodeId(node.id)}
                                        className={`absolute w-16 h-16 -ml-8 -mt-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 group z-20 ${
                                            selectedNodeId === node.id
                                                ? 'border-[#c5a059] bg-[#1a1a1a] shadow-[0_0_20px_rgba(197,160,89,0.6)] scale-110'
                                                : isMaxed
                                                    ? 'border-emerald-500 bg-emerald-900/20'
                                                    : hasInvestment
                                                        ? 'border-[#c5a059]/50 bg-[#1a1a1a]/80'
                                                        : isLocked
                                                            ? 'border-[#333] bg-[#0a0a0a]'
                                                            : 'border-[#444] bg-[#0a0a0a] hover:border-[#888]'
                                        }`}
                                        style={{ left: `${node.x}%`, top: `${node.y}%` }}
                                    >
                                        <div className={`relative ${isLocked ? 'opacity-30 grayscale' : ''}`}>
                                            <NodeIcon 
                                                icon={node.icon} 
                                                size={32} 
                                                className={
                                                    selectedNodeId === node.id 
                                                        ? 'text-[#c5a059]' 
                                                        : isMaxed
                                                            ? 'text-emerald-400'
                                                            : hasInvestment
                                                                ? 'text-[#c5a059]/70'
                                                                : 'text-[#555] group-hover:text-[#ccc]'
                                                } 
                                            />
                                        </div>

                                        {/* Lock Icon */}
                                        {isLocked && (
                                            <div className="absolute -bottom-2 -right-2 bg-[#000] rounded-full p-1 border border-[#333]">
                                                <Lock size={10} className="text-[#666]" />
                                            </div>
                                        )}

                                        {/* Maxed Check */}
                                        {isMaxed && (
                                            <div className="absolute -top-2 -right-2 bg-emerald-900 rounded-full p-1 border border-emerald-500">
                                                <Check size={10} className="text-emerald-400" />
                                            </div>
                                        )}

                                        {/* Points Badge */}
                                        <div className={`absolute -bottom-4 border text-[10px] px-1.5 py-0.5 rounded font-mono shadow-md ${
                                            isMaxed 
                                                ? 'bg-emerald-900 border-emerald-500 text-emerald-400'
                                                : hasInvestment
                                                    ? 'bg-[#c5a059]/20 border-[#c5a059] text-[#c5a059]'
                                                    : 'bg-[#000] border-[#333] text-[#888]'
                                        }`}>
                                            {nodeData.currentPoints}/{nodeData.maxPoints}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Right: Details Panel */}
                <div className="w-[400px] bg-[#0c0c0c] border-l border-[#333] flex flex-col relative overflow-hidden">
                    {/* Decorative BG */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                        <div className="w-[300px] h-[300px] rounded-full border-[20px] border-[#c5a059] border-dashed" />
                    </div>

                    <div className="flex-1 flex flex-col items-center justify-center p-8 relative z-10">
                        {/* Node Display Wheel */}
                        <div className="relative w-64 h-64 mb-8">
                            {/* Outer Ring */}
                            <div className="absolute inset-0 rounded-full border-4 border-[#222]" />
                            <div className={`absolute inset-0 rounded-full border-4 border-t-transparent transition-all ${
                                selectedNode.currentPoints >= selectedNode.maxPoints 
                                    ? 'border-emerald-500' 
                                    : 'border-[#c5a059]'
                            }`} style={{ transform: `rotate(${(selectedNode.currentPoints / selectedNode.maxPoints) * 360}deg)` }} />

                            {/* Inner Circle */}
                            <div className="absolute inset-4 rounded-full bg-[#111] border border-[#333] flex items-center justify-center shadow-inner">
                                <div className="text-center">
                                    <div className="w-20 h-20 mx-auto mb-3 bg-[#0a0a0a] rounded-full border-2 border-[#c5a059] flex items-center justify-center shadow-[0_0_15px_rgba(197,160,89,0.2)]">
                                        <NodeIcon icon={selectedNode.icon} size={40} className="text-[#c5a059]" />
                                    </div>
                                    <h3 className="text-lg font-bold text-[#ccc] font-['Cinzel'] px-4">{selectedNode.name}</h3>
                                    <div className="text-3xl font-bold text-[#c5a059] font-mono mt-2">
                                        {selectedNode.currentPoints}<span className="text-sm text-[#555]">/{selectedNode.maxPoints}</span>
                                    </div>
                                    {selectedNode.currentPoints >= selectedNode.maxPoints && (
                                        <div className="text-[9px] text-emerald-400 uppercase tracking-widest mt-1 font-bold">
                                            MAXIMIZADO
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Decorative Spikes */}
                            {[0, 45, 90, 135, 180, 225, 270, 315].map(deg => (
                                <div
                                    key={deg}
                                    className="absolute w-3 h-3 bg-[#111] border border-[#c5a059] rotate-45"
                                    style={{
                                        top: '50%', left: '50%',
                                        transform: `translate(-50%, -50%) rotate(${deg}deg) translateY(-136px)`
                                    }}
                                />
                            ))}
                        </div>

                        <div className="text-center max-w-xs mb-6">
                            <p className="text-[#888] text-xs italic font-serif leading-relaxed">
                                "{selectedNode.id === 'root' 
                                    ? 'O nó fundamental. Destrave os primeiros pontos para acessar os ramos.' 
                                    : 'Invista conhecimento para desbloquear potenciais ocultos.'}"
                            </p>
                        </div>

                        {/* Invest Button */}
                        <button 
                            onClick={handleInvest}
                            disabled={!canInvestSelected}
                            className={`w-full font-bold py-3 uppercase tracking-widest border transition-all flex items-center justify-center gap-2 ${
                                canInvestSelected
                                    ? 'bg-[#c5a059] hover:bg-[#d4b06a] text-black border-[#c5a059] shadow-[0_0_20px_rgba(197,160,89,0.4)]'
                                    : isMaxed
                                        ? 'bg-emerald-900/20 border-emerald-900 text-emerald-500 cursor-not-allowed'
                                        : 'bg-[#222] border-[#333] text-[#444] cursor-not-allowed'
                            }`}
                        >
                            {isMaxed ? (
                                <>
                                    <Check size={18} /> Maximizado
                                </>
                            ) : canInvestSelected ? (
                                <>
                                    <Plus size={18} /> Investir Ponto
                                </>
                            ) : (
                                <>
                                    <Lock size={18} /> 
                                    {availablePoints === 0 ? 'Sem Pontos' : 'Requer Nó Pai'}
                                </>
                            )}
                        </button>

                        {/* Info Footer */}
                        <div className="mt-4 text-center text-[10px] text-[#555] uppercase tracking-widest">
                            Pontos Investidos: {Object.values(nodeInvestments).reduce((acc, val) => acc + val, 0)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfessionSpecialization;
