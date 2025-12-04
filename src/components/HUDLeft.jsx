import React from 'react';
import { Shield, Sword, Heart, Zap, Activity, User, Crown, Skull, Star, Hammer, Book, Scroll } from 'lucide-react';
import characterPortrait from '../assets/character_portrait.png';

const StatRow = ({ icon: Icon, label, value, subValue, color = "text-[#888]" }) => (
  <div className="flex items-center justify-between py-2 border-b border-[#333] last:border-0 group hover:bg-[#1a1a1a] px-2 transition-all duration-300 hover:pl-3 relative overflow-hidden">
    {/* Hover Highlight */}
    <div className="absolute inset-0 bg-gradient-to-r from-[#c5a059]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

    <div className={`flex items-center gap-3 ${color} relative z-10`}>
      <Icon size={16} className="opacity-60 group-hover:opacity-100 group-hover:text-[#c5a059] transition-all" />
      <span className="text-[10px] uppercase tracking-[0.2em] font-bold font-['Cinzel'] opacity-70 text-[#a8a8a8] group-hover:text-white transition-colors">{label}</span>
    </div>
    <div className="text-sm font-mono text-[#c5a059] font-bold relative z-10 group-hover:text-gold-gradient">
      {value}
      {subValue && <span className="text-xs text-[#666] ml-1 font-normal">{subValue}</span>}
    </div>
  </div>
);

const EquipmentSlot = ({ label, item, onShowTooltip, onHideTooltip }) => (
  <div
    className="group relative mb-2"
    onMouseEnter={(e) => item && onShowTooltip && onShowTooltip(item, e.currentTarget.getBoundingClientRect(), 'right')}
    onMouseLeave={() => onHideTooltip && onHideTooltip()}
  >
    <div className="absolute inset-0 bg-[#0a0a0a] border border-[#333] transition-all group-hover:border-[#c5a059] group-hover:shadow-[0_0_10px_rgba(197,160,89,0.2)]" />
    <div className="relative p-2 flex items-center gap-4">
      <div className={`w-10 h-10 border ${item ? 'border-[#c5a059] bg-[#1a1a1a]' : 'border-[#333] bg-[#050505]'} flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform`}>
        {item ? (
          <Sword size={18} className="text-[#c5a059] drop-shadow-md" />
        ) : (
          <div className="w-1.5 h-1.5 bg-[#222] rotate-45" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[9px] text-[#555] uppercase tracking-widest font-['Cinzel'] mb-0.5 group-hover:text-[#888] transition-colors">{label}</div>
        <div className={`text-sm truncate ${item ? 'text-gold-gradient font-serif font-bold' : 'text-[#444] italic'}`}>
          {item ? item.name : 'Vazio'}
        </div>
      </div>
    </div>
  </div>
);

const HUDLeft = ({ hero, onShowTooltip, onHideTooltip, onToggleTalents, onToggleDocumentation, onToggleCharacter, onToggleQuests }) => {
  const nextLevelXp = Math.floor(100 * Math.pow(1.25, hero.level - 1));
  const xpProgress = (hero.xp / nextLevelXp) * 100;
  const hpPercent = (hero.hp / hero.maxHp) * 100;

  return (
    <div className="w-[340px] flex flex-col h-full bg-[#050505] relative z-50 p-2 pr-0">
      {/* The Panel Container */}
      <div className="panel-diablo flex-1 flex flex-col overflow-hidden bg-texture-dark">

        {/* Header Profile */}
        <div className="p-4 pb-2 border-b-2 border-[#333] bg-ornate-pattern relative overflow-hidden z-10">
          <div className="absolute -top-4 -right-4 p-4 opacity-[0.05] rotate-12 text-white">
            <Crown size={180} />
          </div>

          <div className="relative z-10 flex flex-col items-center text-center mb-4">
            {/* Ornate Portrait Frame */}
            <div
              onClick={onToggleCharacter}
              className="w-24 h-24 bg-[#0a0a0a] border-double-gold shadow-[0_0_20px_rgba(0,0,0,0.8)] flex items-center justify-center mb-4 relative group cursor-pointer hover:scale-105 transition-transform overflow-hidden"
            >
              <div className="absolute inset-0 border border-[#c5a059] opacity-30 group-hover:opacity-60 transition-opacity z-20" />
              <img
                src={characterPortrait}
                alt="Portrait"
                className="w-full h-full object-cover opacity-100 transition-opacity"
              />

              {/* Decorative Corners */}
              <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-[#c5a059] z-20" />
              <div className="absolute -top-1 -right-1 w-2 h-2 border-t border-r border-[#c5a059] z-20" />
              <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b border-l border-[#c5a059] z-20" />
              <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-[#c5a059] z-20" />
            </div>

            <h2 className="text-2xl font-bold text-gold-gradient tracking-widest font-['Cinzel'] drop-shadow-lg">{hero.name}</h2>
            <div className="text-[10px] text-[#666] uppercase tracking-[0.3em] font-bold mt-2 border-t border-[#333] pt-2 w-full">Nível {hero.level} Guerreiro</div>
          </div>

          {/* Bars - Vials */}
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-[10px] text-[#888] uppercase tracking-wider mb-1 font-bold px-1">
                <span>Vida</span>
                <span className="font-mono text-[#b30000]">{hero.hp} / {hero.maxHp}</span>
              </div>
              <div className="w-full h-4 vial-glass rounded-sm">
                <div
                  className="h-full vial-liquid-red transition-all duration-500 relative"
                  style={{ width: `${hpPercent}%` }}
                >
                  <div className="vial-shine" />
                </div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[10px] text-[#888] uppercase tracking-wider mb-1 font-bold px-1">
                <span>Experiência</span>
                <span className="font-mono text-[#c5a059]">{hero.xp} / {nextLevelXp}</span>
              </div>
              <div className="w-full h-2 vial-glass rounded-sm">
                <div
                  className="h-full vial-liquid-gold transition-all duration-500 relative"
                  style={{ width: `${xpProgress}%` }}
                >
                  <div className="vial-shine" />
                </div>
              </div>
            </div>

            {/* Talent Button */}
            <button
              onClick={onToggleTalents}
              className="w-full py-2 border border-[#333] bg-[#111] hover:bg-[#1a1a1a] hover:border-[#c5a059] group transition-all relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-ornate-pattern opacity-20 group-hover:opacity-40 transition-opacity" />
              <div className="relative z-10 flex items-center justify-center gap-2">
                <Star size={14} className={`text-[#666] group-hover:text-[#c5a059] ${hero.talentPoints > 0 ? 'animate-pulse text-[#c5a059]' : ''}`} />
                <span className={`text-[10px] font-bold uppercase tracking-[0.2em] font-['Cinzel'] ${hero.talentPoints > 0 ? 'text-[#c5a059]' : 'text-[#888] group-hover:text-[#c5a059]'}`}>
                  Talentos {hero.talentPoints > 0 && `(${hero.talentPoints})`}
                </span>
              </div>
            </button>

            {/* Quests Button */}
            <button
              onClick={onToggleQuests}
              className="w-full py-2 border border-[#333] bg-[#111] hover:bg-[#1a1a1a] hover:border-[#c5a059] group transition-all relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-ornate-pattern opacity-20 group-hover:opacity-40 transition-opacity" />
              <div className="relative z-10 flex items-center justify-center gap-2">
                <Scroll size={14} className="text-[#666] group-hover:text-[#c5a059]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] font-['Cinzel'] text-[#888] group-hover:text-[#c5a059]">
                  Missões
                </span>
              </div>
            </button>

            {/* Documentation Button */}
            <button
              onClick={onToggleDocumentation}
              className="w-full py-2 border border-[#333] bg-[#111] hover:bg-[#1a1a1a] hover:border-[#c5a059] group transition-all relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-ornate-pattern opacity-20 group-hover:opacity-40 transition-opacity" />
              <div className="relative z-10 flex items-center justify-center gap-2">
                <Book size={14} className="text-[#666] group-hover:text-[#c5a059]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] font-['Cinzel'] text-[#888] group-hover:text-[#c5a059]">
                  Códex
                </span>
              </div>
            </button>
          </div>
        </div>


        {/* Stats Sheet */}
        <div className="flex-1 overflow-y-auto custom-scrollbar bg-transparent relative z-10">
          <div className="p-4 pt-2">
            <div className="flex items-center gap-4 mb-2 opacity-80">
              <div className="ornate-divider flex-1" />
              <h3 className="text-[10px] font-bold text-[#c5a059] uppercase tracking-[0.3em] font-['Cinzel']">Atributos</h3>
              <div className="ornate-divider flex-1" />
            </div>

            <div className="bg-[#0a0a0a]/50 border-double-gold p-2 mb-8 shadow-inner backdrop-blur-sm">
              <StatRow icon={Sword} label="Ataque" value={hero.stats.atk} color="text-[#a8a8a8]" />
              <StatRow icon={Shield} label="Defesa" value={hero.stats.def} color="text-[#a8a8a8]" />
              <StatRow icon={Crown} label="Força" value={hero.stats.str} color="text-[#a8a8a8]" />
              <StatRow icon={Zap} label="Vigor" value={hero.stats.vig} color="text-[#a8a8a8]" />
              <StatRow icon={Activity} label="Destreza" value={hero.stats.dex} color="text-[#a8a8a8]" />
              <StatRow icon={Activity} label="Velocidade" value={hero.stats.spd} color="text-[#a8a8a8]" />
            </div>

            <div className="flex items-center gap-4 mb-2 opacity-80">
              <div className="ornate-divider flex-1" />
              <h3 className="text-[10px] font-bold text-[#c5a059] uppercase tracking-[0.3em] font-['Cinzel']">Equipamento</h3>
              <div className="ornate-divider flex-1" />
            </div>

            <div className="space-y-1">
              <EquipmentSlot
                label="Cabeça"
                item={null}
                onShowTooltip={onShowTooltip}
                onHideTooltip={onHideTooltip}
              />
              <EquipmentSlot
                label="Torso"
                item={{
                  name: "Armadura de Placas",
                  rarity: "rare",
                  type: "Armadura Pesada",
                  value: 450,
                  description: "Forjada em aço negro, oferece proteção superior.",
                  stats: { def: +15, vig: +5 }
                }}
                onShowTooltip={onShowTooltip}
                onHideTooltip={onHideTooltip}
              />
              <EquipmentSlot
                label="Mão Direita"
                item={{
                  name: "Machado de Batalha",
                  rarity: "uncommon",
                  type: "Arma de Duas Mãos",
                  value: 120,
                  description: "Um machado pesado capaz de partir escudos.",
                  stats: { atk: +12, str: +3 }
                }}
                onShowTooltip={onShowTooltip}
                onHideTooltip={onHideTooltip}
              />
              <EquipmentSlot
                label="Mão Esquerda"
                item={null}
                onShowTooltip={onShowTooltip}
                onHideTooltip={onHideTooltip}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HUDLeft;
