import React from 'react';
import { Backpack, Scroll, Map, Sparkles, AlertCircle } from 'lucide-react';

const SkillCard = ({ skill, onUse, disabled }) => (
  <button
    onClick={() => onUse(skill)}
    disabled={disabled}
    className={`w-full text-left p-4 border relative overflow-hidden group transition-all duration-300 mb-3 ${disabled
      ? 'bg-[#111] border-[#333] opacity-50 cursor-not-allowed grayscale'
      : 'bg-texture-dark border-[#444] hover:border-double-gold hover:bg-[#1a1a1a] shadow-lg hover:shadow-[0_0_15px_rgba(197,160,89,0.15)]'
      }`}
  >
    {/* Hover Glow */}
    {!disabled && <div className="absolute inset-0 bg-ornate-pattern opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay" />}

    {/* Cooldown Overlay */}
    {disabled && (
      <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-10 backdrop-blur-[1px]">
        <span className="text-3xl font-bold text-[#666] font-['Cinzel'] animate-pulse">{skill.cooldown}</span>
      </div>
    )}

    <div className="flex justify-between items-start mb-2 relative z-0">
      <div className="flex items-center gap-3">
        <div className={`p-1.5 border transition-colors duration-300 ${!disabled ? 'border-[#c5a059] bg-[#0a0a0a] group-hover:bg-[#151515] shadow-[inset_0_0_10px_rgba(0,0,0,1)]' : 'border-[#333] bg-[#111]'}`}>
          <Sparkles size={16} className={disabled ? 'text-[#444]' : 'text-[#c5a059] group-hover:text-white group-hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]'} />
        </div>
        <span className={`font-bold text-sm tracking-wide font-['Cinzel'] transition-colors ${disabled ? 'text-[#555]' : 'text-[#a8a8a8] group-hover:text-gold-gradient'}`}>
          {skill.name}
        </span>
      </div>
    </div>
    <p className="text-xs text-[#666] leading-relaxed pl-10 font-serif italic opacity-90 group-hover:text-[#888] transition-colors">{skill.description}</p>
  </button>
);

const InventoryItem = ({ item, count, onShowTooltip, onHideTooltip }) => {
  const rarityStyles = {
    common: 'text-[#a8a8a8] border-[#333] bg-[#111] hover:border-[#555]',
    uncommon: 'text-emerald-400 border-emerald-900/50 bg-gradient-to-r from-[#051005] to-[#0a0a0a] hover:border-emerald-500/50',
    rare: 'text-blue-400 border-blue-900/50 bg-gradient-to-r from-[#050510] to-[#0a0a0a] hover:border-blue-500/50',
    epic: 'text-purple-400 border-purple-900/50 bg-gradient-to-r from-[#100510] to-[#0a0a0a] hover:border-purple-500/50',
    unique: 'text-[#c5a059] border-double-gold bg-gradient-to-r from-[#1a1005] to-[#0a0a0a] hover:border-[#c5a059] shadow-[inset_0_0_10px_rgba(197,160,89,0.1)]',
  };

  const style = rarityStyles[item.rarity] || rarityStyles.common;

  return (
    <div
      className={`flex items-center justify-between p-3 border mb-2 transition-all duration-300 hover:translate-x-1 hover:shadow-lg group relative overflow-hidden ${style}`}
      onMouseEnter={(e) => onShowTooltip && onShowTooltip(item, e.currentTarget.getBoundingClientRect())}
      onMouseLeave={() => onHideTooltip && onHideTooltip()}
    >
      {/* Shine Effect on Hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />

      {/* Texture Overlay */}
      <div className="absolute inset-0 bg-texture-dark opacity-30 mix-blend-overlay pointer-events-none" />

      <div className="flex items-center gap-3 relative z-10">
        <div className={`w-1.5 h-1.5 rotate-45 shadow-sm transition-transform group-hover:rotate-90 ${item.rarity === 'unique' ? 'bg-[#c5a059]' :
          item.rarity === 'epic' ? 'bg-purple-500' :
            item.rarity === 'rare' ? 'bg-blue-500' :
              item.rarity === 'uncommon' ? 'bg-emerald-500' :
                'bg-[#555]'
          }`} />
        <span className="text-sm font-serif tracking-wide font-medium group-hover:text-white transition-colors">{item.name}</span>
      </div>
      <span className="text-[10px] font-mono text-[#666] bg-black/50 px-2 py-1 border border-[#333] group-hover:border-[#555] transition-colors shadow-inner relative z-10">
        x{count}
      </span>
    </div>
  );
};

const HUDRight = ({ inventory, skills, onUseSkill, onShowTooltip, onHideTooltip }) => {
  return (
    <div className="w-[380px] flex flex-col h-full bg-[#050505] relative z-50 p-2 pl-0">
      {/* The Panel Container */}
      <div className="panel-diablo flex-1 flex flex-col overflow-hidden bg-texture-dark">

        {/* Skills Section */}
        <div className="flex-1 border-b-2 border-[#333] flex flex-col min-h-0 relative z-10">
          <div className="p-6 bg-ornate-pattern border-b border-[#333] flex items-center gap-3 shadow-md relative z-20">
            <Scroll size={18} className="text-[#c5a059] drop-shadow-md" />
            <h3 className="text-[10px] font-bold text-gold-gradient uppercase tracking-[0.3em] font-['Cinzel']">Grimório</h3>
          </div>

          <div className="p-6 overflow-y-auto custom-scrollbar bg-transparent relative">
            {/* Inner Shadow for depth */}
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_30px_rgba(0,0,0,0.8)] z-10" />

            <div className="relative z-0">
              {skills.map(skill => (
                <SkillCard
                  key={skill.id}
                  skill={skill}
                  onUse={onUseSkill}
                  disabled={skill.onCooldown}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Inventory Section */}
        <div className="h-[45%] flex flex-col bg-transparent relative z-10">
          <div className="p-6 bg-ornate-pattern border-b border-[#333] flex items-center gap-3 shadow-md relative z-20">
            <Backpack size={18} className="text-[#c5a059] drop-shadow-md" />
            <h3 className="text-[10px] font-bold text-gold-gradient uppercase tracking-[0.3em] font-['Cinzel']">Inventário</h3>
          </div>

          <div className="p-6 overflow-y-auto custom-scrollbar relative">
            {/* Inner Shadow for depth */}
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_30px_rgba(0,0,0,0.8)] z-10" />

            <div className="relative z-0">
              {inventory.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-32 text-[#333] gap-3">
                  <Backpack size={32} className="opacity-20" />
                  <span className="text-xs italic font-serif opacity-50">Sua bolsa está vazia...</span>
                </div>
              ) : (
                <div className="space-y-1">
                  {inventory.map((slot, idx) => (
                    <InventoryItem
                      key={idx}
                      item={slot.item}
                      count={slot.count}
                      onShowTooltip={onShowTooltip}
                      onHideTooltip={onHideTooltip}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HUDRight;
