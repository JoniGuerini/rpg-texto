import React from 'react';
import { QUEST_DATA } from '../data/quests';
import { Scroll, CheckCircle, Circle } from 'lucide-react';

const QuestLog = ({ questState, onClose, onClaim }) => {
    // Auto-claim check when opening (optional, or put a button)
    // For now, let's list them.

    const activeQuests = questState.active.map(id => ({
        ...QUEST_DATA[id],
        progress: questState.progress[id] || 0
    }));

    const completedQuests = questState.completed.map(id => QUEST_DATA[id]);

    return (
        <div className="absolute top-0 left-0 w-full h-full bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in zoom-in-95 duration-300">
            <div className="w-full max-w-2xl h-[80%] panel-diablo flex flex-col bg-texture-dark border-double-gold relative">
                
                {/* Header */}
                <div className="p-4 border-b border-[#333] flex justify-between items-center bg-ornate-pattern">
                    <div className="flex items-center gap-3">
                        <Scroll className="text-[#c5a059]" />
                        <h2 className="text-xl font-bold font-['Cinzel'] text-gold-gradient uppercase tracking-widest">Diário de Missões</h2>
                    </div>
                    <button 
                        onClick={onClose}
                        className="text-[#666] hover:text-white font-bold border border-[#333] px-3 py-1 hover:border-[#c5a059] transition-colors"
                    >
                        X
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                    
                    {/* Active Section */}
                    <section>
                        <h3 className="text-[#c5a059] font-bold uppercase tracking-wider mb-4 border-b border-[#333] pb-2 text-sm">Em Progresso</h3>
                        
                        {activeQuests.length === 0 ? (
                            <p className="text-[#555] italic">Nenhuma missão ativa no momento.</p>
                        ) : (
                            <div className="grid gap-4">
                                {activeQuests.map(quest => {
                                    const isReadyToTurnIn = quest.progress >= quest.amountRequired;
                                    
                                    return (
                                        <div key={quest.id} className="bg-[#0a0a0a] border border-[#333] p-4 group hover:border-[#444] transition-colors relative overflow-hidden">
                                            {isReadyToTurnIn && (
                                                <div className="absolute top-0 right-0 bg-green-900/20 text-green-500 text-[10px] font-bold px-2 py-1 uppercase border-l border-b border-green-900">
                                                    Pronto para Entregar
                                                </div>
                                            )}
                                            
                                            <h4 className="font-bold text-[#ddd] font-serif text-lg mb-1">{quest.title}</h4>
                                            <p className="text-[#888] text-sm mb-3 leading-relaxed">{quest.description}</p>
                                            
                                            {/* Objective */}
                                            <div className="flex items-center justify-between text-xs bg-[#111] p-2 border border-[#222]">
                                                <span className="text-[#aaa] uppercase tracking-wide">
                                                    {quest.type === 'kill' ? 'Eliminar' : 'Coletar'}: <span className="text-[#c5a059]">{quest.target}</span>
                                                </span>
                                                <span className={`font-mono font-bold ${isReadyToTurnIn ? 'text-green-500' : 'text-[#666]'}`}>
                                                    {quest.progress} / {quest.amountRequired}
                                                </span>
                                            </div>

                                            {/* Progress Bar */}
                                            <div className="w-full h-1 bg-[#222] mt-2">
                                                <div 
                                                    className={`h-full transition-all duration-500 ${isReadyToTurnIn ? 'bg-green-600' : 'bg-[#c5a059]'}`}
                                                    style={{ width: `${(quest.progress / quest.amountRequired) * 100}%` }}
                                                />
                                            </div>

                                            {/* Claim Button */}
                                            {isReadyToTurnIn && (
                                                <button 
                                                    onClick={() => onClaim()}
                                                    className="w-full mt-3 py-2 bg-green-900/30 border border-green-800 text-green-400 hover:bg-green-900/50 uppercase text-xs font-bold tracking-widest transition-all"
                                                >
                                                    Receber Recompensa
                                                </button>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </section>

                    {/* Completed Section */}
                    <section className="opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                        <h3 className="text-[#666] font-bold uppercase tracking-wider mb-4 border-b border-[#333] pb-2 text-sm mt-8">Completas</h3>
                        {completedQuests.map(quest => (
                            <div key={quest.id} className="flex items-center gap-3 py-2 border-b border-[#222] last:border-0">
                                <CheckCircle size={16} className="text-green-800" />
                                <span className="text-[#555] line-through decoration-[#333]">{quest.title}</span>
                            </div>
                        ))}
                    </section>

                </div>
            </div>
        </div>
    );
};

export default QuestLog;

