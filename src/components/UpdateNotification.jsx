import React from 'react';
import { RefreshCw, Sparkles } from 'lucide-react';

const UpdateNotification = ({ onReload, currentVersion, newVersion }) => {
    return (
        <div className="fixed bottom-4 right-4 z-[100000] animate-in slide-in-from-bottom-5 duration-500">
            <div className="bg-[#0c0c0c] border-2 border-[#c5a059] shadow-[0_0_30px_rgba(197,160,89,0.4)] p-4 max-w-sm">
                <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                        <RefreshCw className="text-[#c5a059] animate-spin" size={24} />
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-[#c5a059] font-['Cinzel'] font-bold text-sm tracking-wider">
                                Nova Versão Disponível
                            </h3>
                            <Sparkles className="text-[#c5a059]" size={14} />
                        </div>
                        
                        {newVersion && (
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-[10px] text-[#666] uppercase tracking-widest">
                                    v{currentVersion || '0.0.0'}
                                </span>
                                <span className="text-[#c5a059]">→</span>
                                <span className="text-[10px] text-[#c5a059] uppercase tracking-widest font-bold">
                                    Patch v{newVersion}
                                </span>
                            </div>
                        )}
                        
                        <p className="text-[#888] text-xs mb-3">
                            Uma atualização do jogo está disponível. Recarregue a página para obter a versão mais recente.
                        </p>
                        <button
                            onClick={onReload}
                            className="w-full bg-[#c5a059] hover:bg-[#d4b06a] text-[#0c0c0c] font-bold text-xs uppercase tracking-wider py-2 px-4 transition-all duration-200 shadow-lg hover:shadow-[0_0_20px_rgba(197,160,89,0.5)]"
                        >
                            <div className="flex items-center justify-center gap-2">
                                <RefreshCw size={14} />
                                Atualizar Agora
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateNotification;

