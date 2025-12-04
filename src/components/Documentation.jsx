import React, { useState } from 'react';
import { Book, Code, Database, Palette, Sword, Scroll, FlaskConical, Shield, X, Heart, Menu, Activity, Users, Zap, Package, Calculator, Layout, Skull, Hammer, HelpCircle, Target } from 'lucide-react';
import enemiesData from '../data/enemies.json';
import eventsData from '../data/events.json';
import { QUEST_DATA } from '../data/quests';

const MENUS = [
    { id: 'overview', label: 'Visão Geral', icon: Book },
    { id: 'quests', label: 'Lista de Missões', icon: Target },
    { id: 'interface', label: 'Interface & Layout', icon: Layout },
    { id: 'gameplay', label: 'Gameplay', icon: Activity },
    { id: 'events', label: 'Sistema de Eventos', icon: Scroll },
    { id: 'enemies', label: 'Inimigos', icon: Skull },
    { id: 'attributes', label: 'Atributos', icon: Shield },
    { id: 'combat', label: 'Sistema de Combate', icon: Sword },
    { id: 'skills', label: 'Habilidades', icon: Zap },
    { id: 'inventory', label: 'Inventário & Itens', icon: Package },
    { id: 'architecture', label: 'Arquitetura Técnica', icon: Code },
    { id: 'math', label: 'Exemplos de Cálculo', icon: Calculator },
];

const Section = ({ title, icon: Icon, children }) => (
    <div className="mb-8 border border-[#333] bg-[#0a0a0a]/80 p-6 relative overflow-hidden group hover:border-[#c5a059]/50 transition-colors animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#c5a059]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        <div className="flex items-center gap-3 mb-4 border-b border-[#333] pb-2">
            <Icon className="text-[#c5a059]" size={24} />
            <h2 className="text-xl font-['Cinzel'] font-bold text-gold-gradient tracking-wider">{title}</h2>
        </div>
        <div className="text-[#a8a8a8] font-serif leading-relaxed space-y-4">
            {children}
        </div>
    </div>
);

const TechBadge = ({ name }) => (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-[#1a1a1a] text-[#c5a059] border border-[#333] font-mono mr-2 mb-2">
        {name}
    </span>
);

const Documentation = ({ onClose }) => {
    const [activeSection, setActiveSection] = useState('overview');

    const renderContent = () => {
        switch (activeSection) {
            case 'overview':
                return (
                    <Section title="Visão Geral" icon={Book}>
                        <div className="space-y-6">
                            <div className="bg-[#111] border border-[#333] p-6 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <Sword size={100} />
                                </div>
                                <h3 className="text-[#c5a059] font-bold text-lg mb-2 font-['Cinzel']">Objetivo do Jogo</h3>
                                <p className="text-[#a8a8a8] leading-relaxed relative z-10">
                                    <strong>RPG Texto DG</strong> é uma experiência de <em>Dungeon Crawler</em> infinito baseada em texto, inspirada na estética gótica sombria de clássicos como Diablo.
                                    Você assume o papel de um aventureiro solitário desafiando a <strong>Catedral Sombria</strong>, um labirinto procedural repleto de horrores antigos.
                                </p>
                                <p className="text-[#a8a8a8] leading-relaxed mt-4 relative z-10">
                                    Sua missão é descer o mais fundo possível, enfrentando chefes brutais, coletando artefatos lendários e desvendando os segredos ocultos nas profundezas.
                                    A morte não é o fim, mas um passo na jornada para se tornar o guerreiro definitivo.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-white font-bold text-lg mb-4 font-['Cinzel'] flex items-center gap-2">
                                    <Activity size={20} className="text-[#c5a059]" />
                                    Características Principais
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-[#0a0a0a] border border-[#333] p-4 hover:border-[#c5a059] transition-colors group">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="p-2 bg-[#1a1a1a] rounded border border-[#333] group-hover:border-[#c5a059] transition-colors">
                                                <Scroll size={18} className="text-[#c5a059]" />
                                            </div>
                                            <h4 className="font-bold text-[#e5e5e5]">Exploração Procedural</h4>
                                        </div>
                                        <p className="text-xs text-[#888]">
                                            Cada andar é gerado unicamente. Eventos, inimigos e tesouros mudam a cada descida, garantindo que nenhuma jornada seja igual à anterior.
                                        </p>
                                    </div>

                                    <div className="bg-[#0a0a0a] border border-[#333] p-4 hover:border-[#c5a059] transition-colors group">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="p-2 bg-[#1a1a1a] rounded border border-[#333] group-hover:border-[#8b0000] transition-colors">
                                                <Sword size={18} className="text-[#ff4d4d]" />
                                            </div>
                                            <h4 className="font-bold text-[#e5e5e5]">Combate Estratégico</h4>
                                        </div>
                                        <p className="text-xs text-[#888]">
                                            Sistema de turnos tático. Escolha entre atacar, defender ou usar habilidades poderosas. Gerencie seus cooldowns e recursos para sobreviver.
                                        </p>
                                    </div>

                                    <div className="bg-[#0a0a0a] border border-[#333] p-4 hover:border-[#c5a059] transition-colors group">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="p-2 bg-[#1a1a1a] rounded border border-[#333] group-hover:border-blue-500 transition-colors">
                                                <Zap size={18} className="text-blue-400" />
                                            </div>
                                            <h4 className="font-bold text-[#e5e5e5]">Progressão Profunda</h4>
                                        </div>
                                        <p className="text-xs text-[#888]">
                                            Personalize seu herói com uma Árvore de Talentos ramificada. Especialize-se em força bruta, magia arcana ou sobrevivência impenetrável.
                                        </p>
                                    </div>

                                    <div className="bg-[#0a0a0a] border border-[#333] p-4 hover:border-[#c5a059] transition-colors group">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="p-2 bg-[#1a1a1a] rounded border border-[#333] group-hover:border-emerald-500 transition-colors">
                                                <FlaskConical size={18} className="text-emerald-400" />
                                            </div>
                                            <h4 className="font-bold text-[#e5e5e5]">Economia & Crafting</h4>
                                        </div>
                                        <p className="text-xs text-[#888]">
                                            Colete reagentes, refine minérios e crie seus próprios equipamentos. Negocie com mercadores na vila para obter suprimentos vitais.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Section>
                );
            case 'quests':
                return (
                    <Section title="Lista de Missões Conhecidas" icon={Target}>
                        <p className="mb-6">
                            Um compêndio de todas as missões disponíveis no mundo. Algumas requerem condições específicas para serem encontradas.
                        </p>
                        
                        <div className="space-y-8">
                            {[1, 2, 3, 4].map(tier => {
                                const questsInTier = Object.values(QUEST_DATA).filter(q => q.tier === tier);
                                if (questsInTier.length === 0) return null;

                                return (
                                    <div key={tier}>
                                        <h3 className="text-lg font-bold text-[#c5a059] border-b border-[#333] pb-2 mb-4 font-['Cinzel']">
                                            Tier {tier} - {tier === 1 ? 'Iniciante' : tier === 2 ? 'Intermediário' : tier === 3 ? 'Avançado' : 'Elite'}
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {questsInTier.map(quest => (
                                                <div key={quest.id} className="bg-[#111] border border-[#333] p-4 relative group hover:border-[#c5a059] transition-all">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <h4 className="font-bold text-[#e5e5e5] font-serif">{quest.title}</h4>
                                                        <span className={`text-[10px] px-2 py-1 font-bold uppercase rounded border ${quest.type === 'kill' ? 'bg-red-900/20 border-red-900 text-red-400' : 'bg-blue-900/20 border-blue-900 text-blue-400'}`}>
                                                            {quest.type === 'kill' ? 'Extermínio' : 'Coleta'}
                                                        </span>
                                                    </div>
                                                    <p className="text-xs text-[#888] mb-3 italic">"{quest.description}"</p>
                                                    
                                                    <div className="bg-[#0a0a0a] p-2 rounded border border-[#222] text-xs space-y-1">
                                                        <div className="flex justify-between">
                                                            <span className="text-[#666]">Alvo:</span>
                                                            <span className="text-[#c5a059] font-bold">{quest.target} (x{quest.amountRequired})</span>
                                                        </div>
                                                        <div className="flex justify-between border-t border-[#222] pt-1 mt-1">
                                                            <span className="text-[#666]">Recompensa:</span>
                                                            <div className="text-right">
                                                                <span className="text-white block">{quest.reward.xp} XP, {quest.reward.gold} Ouro</span>
                                                                {quest.reward.item && (
                                                                    <span className={`block text-[10px] mt-0.5 ${
                                                                        quest.reward.item.rarity === 'unique' ? 'text-[#c5a059]' :
                                                                        quest.reward.item.rarity === 'epic' ? 'text-purple-400' :
                                                                        quest.reward.item.rarity === 'rare' ? 'text-blue-400' :
                                                                        'text-emerald-400'
                                                                    }`}>
                                                                        + {quest.reward.item.name}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </Section>
                );
            case 'interface':
                return (
                    <Section title="Interface & Layout" icon={Layout}>
                        <p className="mb-6">
                            A interface do <strong>RPG Texto DG</strong> foi projetada para fornecer todas as informações vitais num relance, mantendo o foco na narrativa e na ação.
                            A tela é dividida em três painéis principais:
                        </p>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                            {/* Left HUD */}
                            <div className="bg-[#0c0c0c] border border-[#333] p-4 flex flex-col gap-3 relative group hover:border-[#c5a059] transition-colors">
                                <div className="absolute -top-3 left-4 bg-[#0c0c0c] px-2 text-[#c5a059] text-xs font-bold font-['Cinzel'] border border-[#333] group-hover:border-[#c5a059]">
                                    HUD ESQUERDO
                                </div>
                                <div className="flex items-center gap-2 text-[#a8a8a8] mb-2">
                                    <Shield size={16} />
                                    <span className="font-bold text-sm">Status do Herói</span>
                                </div>
                                <ul className="text-xs text-[#666] space-y-2 list-disc list-inside">
                                    <li><strong className="text-[#e5e5e5]">Barras Vitais:</strong> Monitore sua Vida (HP) e Experiência (XP).</li>
                                    <li><strong className="text-[#e5e5e5]">Atributos:</strong> Veja seus valores atuais de Força, Destreza, etc.</li>
                                    <li><strong className="text-[#e5e5e5]">Equipamentos:</strong> Slots para armas e armaduras equipadas.</li>
                                </ul>
                            </div>

                            {/* Center Grid */}
                            <div className="bg-[#0c0c0c] border border-[#333] p-4 flex flex-col gap-3 relative group hover:border-[#c5a059] transition-colors lg:scale-105 z-10 shadow-xl">
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0c0c0c] px-2 text-[#c5a059] text-xs font-bold font-['Cinzel'] border border-[#333] group-hover:border-[#c5a059]">
                                    PALCO CENTRAL
                                </div>
                                <div className="flex items-center gap-2 text-[#a8a8a8] mb-2 justify-center">
                                    <Activity size={16} />
                                    <span className="font-bold text-sm">Ação & Narrativa</span>
                                </div>
                                <ul className="text-xs text-[#666] space-y-2 list-disc list-inside text-center">
                                    <li><strong className="text-[#e5e5e5]">Log de Eventos:</strong> A história se desenrola aqui em tempo real.</li>
                                    <li><strong className="text-[#e5e5e5]">Arena de Combate:</strong> Visualize inimigos e seus status.</li>
                                    <li><strong className="text-[#e5e5e5]">Interação:</strong> Botões para viajar, atacar ou interagir.</li>
                                </ul>
                            </div>

                            {/* Right HUD */}
                            <div className="bg-[#0c0c0c] border border-[#333] p-4 flex flex-col gap-3 relative group hover:border-[#c5a059] transition-colors">
                                <div className="absolute -top-3 right-4 bg-[#0c0c0c] px-2 text-[#c5a059] text-xs font-bold font-['Cinzel'] border border-[#333] group-hover:border-[#c5a059]">
                                    HUD DIREITO
                                </div>
                                <div className="flex items-center gap-2 text-[#a8a8a8] mb-2 justify-end">
                                    <span className="font-bold text-sm">Gestão Rápida</span>
                                    <Package size={16} />
                                </div>
                                <ul className="text-xs text-[#666] space-y-2 list-disc list-inside text-right">
                                    <li><strong className="text-[#e5e5e5]">Inventário:</strong> Grade de itens coletados.</li>
                                    <li><strong className="text-[#e5e5e5]">Habilidades:</strong> Atalhos para suas skills ativas.</li>
                                    <li><strong className="text-[#e5e5e5]">Consumíveis:</strong> Acesso rápido a poções.</li>
                                </ul>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-[#111] border border-[#333] p-4">
                                <h4 className="text-[#c5a059] font-bold mb-2 flex items-center gap-2">
                                    <Menu size={16} />
                                    Janelas Modais
                                </h4>
                                <p className="text-xs text-[#888]">
                                    Sistemas complexos como a <strong>Árvore de Talentos</strong>, <strong>Profissões</strong> e este <strong>Códex</strong> abrem em janelas sobrepostas (modais), pausando a ação no grid central para que você possa planejar com calma.
                                </p>
                            </div>
                            <div className="bg-[#111] border border-[#333] p-4">
                                <h4 className="text-[#c5a059] font-bold mb-2 flex items-center gap-2">
                                    <HelpCircle size={16} />
                                    Tooltips Informativos
                                </h4>
                                <p className="text-xs text-[#888]">
                                    Passe o mouse sobre qualquer item, habilidade ou atributo para ver detalhes completos. As cores das bordas indicam a raridade dos itens (Comum, Raro, Lendário, etc).
                                </p>
                            </div>
                        </div>
                    </Section>
                );
            case 'gameplay':
                return (
                    <Section title="Gameplay" icon={Activity}>
                        <p>
                            O ciclo de jogo principal gira em torno da exploração procedural de masmorras.
                        </p>
                        <div className="mt-4 p-4 bg-[#111] border border-[#333]">
                            <h4 className="text-[#c5a059] font-bold mb-2">Ciclo Core:</h4>
                            <ol className="list-decimal list-inside space-y-1 text-sm font-mono text-[#888]">
                                <li>Explorar Corredor (Gera Evento)</li>
                                <li>Resolver Evento (Combate / Tesouro / NPC)</li>
                                <li>Gerenciar Recursos (Vida / Ouro / Itens)</li>
                                <li>Retornar à Vila (Vender / Comprar / Craftar)</li>
                                <li>Repetir em andares mais profundos</li>
                            </ol>
                        </div>
                    </Section>
                );
            case 'events':
                return (
                    <Section title="Registro de Eventos" icon={Scroll}>
                        <p className="mb-6">
                            O sistema de eventos determina o que acontece a cada passo na masmorra.
                            Abaixo estão os eventos possíveis, suas chances de ocorrência e condições especiais.
                        </p>

                        <div className="space-y-8">
                            {/* Group by Floor (Simple implementation for now assuming mostly Floor 1) */}
                            {Array.isArray(eventsData) && [...new Set(eventsData.map(e => e.floor))].sort().map(floor => (
                                <div key={floor}>
                                    <h3 className="text-lg font-bold text-[#c5a059] border-b border-[#333] pb-2 mb-4 font-['Cinzel']">
                                        Andar {floor}
                                    </h3>
                                    <div className="grid grid-cols-1 gap-4">
                                        {eventsData.filter(e => e.floor === floor).map((event, idx) => (
                                            <div key={idx} className="bg-[#111] border border-[#333] p-4 relative group hover:border-[#c5a059] transition-all flex flex-col md:flex-row gap-4">
                                                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-[#c5a059] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                                {/* Icon / Type */}
                                                <div className="flex-shrink-0 flex flex-col items-center justify-center w-16 border-r border-[#222] pr-4">
                                                    {event.trigger === 'combat' ? <Sword size={24} className="text-[#8b0000]" /> :
                                                        event.trigger === 'npc-interaction' ? <Users size={24} className="text-blue-400" /> :
                                                            <Scroll size={24} className="text-[#c5a059]" />}
                                                    <span className="text-[9px] uppercase mt-2 font-bold text-[#666]">{event.type}</span>
                                                </div>

                                                {/* Content */}
                                                <div className="flex-1">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <h4 className="font-bold text-[#a8a8a8] group-hover:text-[#c5a059] transition-colors font-serif text-lg">
                                                            "{event.description}"
                                                        </h4>
                                                        {event.location_specific ? (
                                                            <span className="bg-[#8b0000]/20 text-[#ff4d4d] border border-[#8b0000]/50 px-2 py-1 text-[10px] font-bold uppercase rounded">
                                                                Corredor {Array.isArray(event.location_specific) ? event.location_specific.join(', ') : event.location_specific}
                                                            </span>
                                                        ) : (
                                                            <span className="bg-[#1a1a1a] text-[#666] border border-[#333] px-2 py-1 text-[10px] font-bold uppercase rounded">
                                                                Aleatório ({(event.probability * 100).toFixed(0)}%)
                                                            </span>
                                                        )}
                                                    </div>

                                                    <p className="text-sm text-[#666] italic mb-3">
                                                        {event.outcome}
                                                    </p>

                                                    <div className="flex flex-wrap gap-2">
                                                        <span className="text-[10px] bg-[#0a0a0a] border border-[#333] px-2 py-1 text-[#888] font-mono">
                                                            Gatilho: <span className="text-white uppercase">{event.trigger}</span>
                                                        </span>
                                                        {event.npc_involved && (
                                                            <span className="text-[10px] bg-[#0a0a0a] border border-[#333] px-2 py-1 text-[#888] font-mono">
                                                                NPC: <span className="text-white">{event.npc_involved}</span>
                                                            </span>
                                                        )}
                                                        {event.repeatable ? (
                                                            <span className="text-[10px] bg-[#0a0a0a] border border-[#333] px-2 py-1 text-emerald-500/70 font-mono">
                                                                Repetível
                                                            </span>
                                                        ) : (
                                                            <span className="text-[10px] bg-[#0a0a0a] border border-[#333] px-2 py-1 text-orange-500/70 font-mono">
                                                                Único
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Section>
                );
            case 'enemies':
                return (
                    <Section title="Base de Dados de Inimigos" icon={Skull}>
                        <p className="mb-6">
                            Abaixo estão listados os inimigos conhecidos que habitam a Catedral Sombria.
                            Seus atributos base são multiplicados pelo nível do andar em encontros aleatórios.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {Array.isArray(enemiesData) && enemiesData.map(enemy => (
                                <div key={enemy.id} className="bg-[#111] border border-[#333] p-4 relative group hover:border-[#c5a059] transition-all">
                                    <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#c5a059] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                    <div className="flex justify-between items-start mb-3 border-b border-[#222] pb-2">
                                        <div>
                                            <h4 className={`font-bold font-['Cinzel'] ${enemy.isBoss ? 'text-[#8b0000] text-lg' : enemy.isMiniBoss ? 'text-orange-500' : 'text-[#c5a059]'}`}>
                                                {enemy.name}
                                            </h4>
                                            <span className="text-[10px] text-[#666] uppercase tracking-wider font-bold">
                                                {enemy.isBoss ? 'CHEFE' : enemy.isMiniBoss ? 'MINI-CHEFE' : 'Inimigo Comum'}
                                            </span>
                                        </div>
                                        <div className="bg-[#0a0a0a] border border-[#333] px-2 py-1 text-xs font-mono text-[#888]">
                                            LVL {enemy.level}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-2 mb-4 text-xs font-mono">
                                        <div className="flex justify-between bg-[#0a0a0a] px-2 py-1 rounded border border-[#222]">
                                            <span className="text-[#555]">HP</span>
                                            <span className="text-[#b30000]">{enemy.hp}</span>
                                        </div>
                                        <div className="flex justify-between bg-[#0a0a0a] px-2 py-1 rounded border border-[#222]">
                                            <span className="text-[#555]">XP</span>
                                            <span className="text-[#c5a059]">{enemy.xp}</span>
                                        </div>
                                        <div className="flex justify-between bg-[#0a0a0a] px-2 py-1 rounded border border-[#222]">
                                            <span className="text-[#555]">ATK</span>
                                            <span className="text-[#a8a8a8]">{enemy.atk}</span>
                                        </div>
                                        <div className="flex justify-between bg-[#0a0a0a] px-2 py-1 rounded border border-[#222]">
                                            <span className="text-[#555]">DEF</span>
                                            <span className="text-[#a8a8a8]">{enemy.def}</span>
                                        </div>
                                        <div className="flex justify-between bg-[#0a0a0a] px-2 py-1 rounded border border-[#222]">
                                            <span className="text-[#555]">SPD</span>
                                            <span className="text-[#a8a8a8]">{enemy.spd}</span>
                                        </div>
                                    </div>

                                    {enemy.drops && enemy.drops.length > 0 && (
                                        <div className="mt-2 pt-2 border-t border-[#222]">
                                            <h5 className="text-[10px] uppercase text-[#555] font-bold mb-1">Drops Possíveis</h5>
                                            <div className="space-y-1">
                                                {enemy.drops.map((drop, idx) => (
                                                    <div key={idx} className="flex justify-between text-[10px]">
                                                        <span className="text-[#888]">{drop.itemId}</span>
                                                        <span className="text-[#444] font-mono">{(drop.chance * 100).toFixed(0)}%</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </Section>
                );
            case 'attributes':
                return (
                    <Section title="Atributos & Estatísticas" icon={Shield}>
                        <p className="mb-6">
                            Os atributos definem as capacidades físicas e mágicas do seu personagem.
                            Eles podem ser aumentados através de equipamentos, talentos e poções.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* STR */}
                            <div className="bg-[#111] border border-[#333] p-5 relative group hover:border-[#c5a059] transition-all">
                                <div className="flex items-center gap-3 mb-3 border-b border-[#222] pb-2">
                                    <div className="p-2 bg-[#8b0000]/20 border border-[#8b0000] rounded">
                                        <Sword size={20} className="text-[#ff4d4d]" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-[#c5a059] font-['Cinzel']">Força (STR)</h4>
                                        <p className="text-[10px] text-[#666] uppercase tracking-wider">Poder Físico Bruto</p>
                                    </div>
                                </div>
                                <p className="text-sm text-[#888] mb-4">
                                    Determina a força dos seus golpes e a capacidade de carregar equipamentos pesados.
                                </p>
                                <div className="bg-[#0a0a0a] border border-[#333] p-3 rounded">
                                    <h5 className="text-xs font-bold text-[#c5a059] uppercase mb-2">Cálculo de Impacto</h5>
                                    <ul className="space-y-2 text-xs font-mono text-[#a8a8a8]">
                                        <li className="flex justify-between">
                                            <span>Dano Físico:</span>
                                            <span className="text-white">+2% por Ponto</span>
                                        </li>
                                        <li className="flex justify-between">
                                            <span>Capacidade de Carga:</span>
                                            <span className="text-white">+5kg por Ponto</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* DEX */}
                            <div className="bg-[#111] border border-[#333] p-5 relative group hover:border-[#c5a059] transition-all">
                                <div className="flex items-center gap-3 mb-3 border-b border-[#222] pb-2">
                                    <div className="p-2 bg-emerald-900/20 border border-emerald-900 rounded">
                                        <Activity size={20} className="text-emerald-500" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-[#c5a059] font-['Cinzel']">Destreza (DEX)</h4>
                                        <p className="text-[10px] text-[#666] uppercase tracking-wider">Agilidade e Precisão</p>
                                    </div>
                                </div>
                                <p className="text-sm text-[#888] mb-4">
                                    Afeta sua capacidade de acertar pontos vitais e evitar ataques inimigos.
                                </p>
                                <div className="bg-[#0a0a0a] border border-[#333] p-3 rounded">
                                    <h5 className="text-xs font-bold text-[#c5a059] uppercase mb-2">Cálculo de Impacto</h5>
                                    <ul className="space-y-2 text-xs font-mono text-[#a8a8a8]">
                                        <li className="flex justify-between">
                                            <span>Chance Crítica:</span>
                                            <span className="text-white">+1% por Ponto</span>
                                        </li>
                                        <li className="flex justify-between">
                                            <span>Esquiva:</span>
                                            <span className="text-white">+0.5% por Ponto</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* VIG */}
                            <div className="bg-[#111] border border-[#333] p-5 relative group hover:border-[#c5a059] transition-all">
                                <div className="flex items-center gap-3 mb-3 border-b border-[#222] pb-2">
                                    <div className="p-2 bg-blue-900/20 border border-blue-900 rounded">
                                        <Heart size={20} className="text-blue-500" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-[#c5a059] font-['Cinzel']">Vigor (VIG)</h4>
                                        <p className="text-[10px] text-[#666] uppercase tracking-wider">Resistência e Vitalidade</p>
                                    </div>
                                </div>
                                <p className="text-sm text-[#888] mb-4">
                                    Aumenta sua sobrevivência geral e resistência a efeitos negativos.
                                </p>
                                <div className="bg-[#0a0a0a] border border-[#333] p-3 rounded">
                                    <h5 className="text-xs font-bold text-[#c5a059] uppercase mb-2">Cálculo de Impacto</h5>
                                    <ul className="space-y-2 text-xs font-mono text-[#a8a8a8]">
                                        <li className="flex justify-between">
                                            <span>Vida Máxima (HP):</span>
                                            <span className="text-white">+10 por Ponto</span>
                                        </li>
                                        <li className="flex justify-between">
                                            <span>Regeneração:</span>
                                            <span className="text-white">+0.2 HP/s por Ponto</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* SPD */}
                            <div className="bg-[#111] border border-[#333] p-5 relative group hover:border-[#c5a059] transition-all">
                                <div className="flex items-center gap-3 mb-3 border-b border-[#222] pb-2">
                                    <div className="p-2 bg-amber-900/20 border border-amber-900 rounded">
                                        <Zap size={20} className="text-amber-500" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-[#c5a059] font-['Cinzel']">Velocidade (SPD)</h4>
                                        <p className="text-[10px] text-[#666] uppercase tracking-wider">Rapidez de Ação</p>
                                    </div>
                                </div>
                                <p className="text-sm text-[#888] mb-4">
                                    Determina quem age primeiro no combate e a frequência de ações.
                                </p>
                                <div className="bg-[#0a0a0a] border border-[#333] p-3 rounded">
                                    <h5 className="text-xs font-bold text-[#c5a059] uppercase mb-2">Cálculo de Impacto</h5>
                                    <ul className="space-y-2 text-xs font-mono text-[#a8a8a8]">
                                        <li className="flex justify-between">
                                            <span>Iniciativa:</span>
                                            <span className="text-white">Maior SPD age primeiro</span>
                                        </li>
                                        <li className="flex justify-between">
                                            <span>Chance de Fuga:</span>
                                            <span className="text-white">+2% por Ponto</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </Section>
                );
            case 'combat':
                return (
                    <Section title="Sistema de Combate" icon={Sword}>
                        <div className="space-y-8">

                            {/* Turn Flow Visualization */}
                            <div className="bg-[#111] border border-[#333] p-6 relative overflow-hidden">
                                <h4 className="text-[#c5a059] font-bold mb-6 font-['Cinzel'] text-center">Fluxo do Turno</h4>
                                <div className="relative">
                                    {/* Vertical Line */}
                                    <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-[#333] -translate-x-1/2 hidden md:block" />

                                    <div className="space-y-6 relative z-10">
                                        {/* Player Phase */}
                                        <div className="flex flex-col md:flex-row items-center gap-4">
                                            <div className="w-full md:w-1/2 text-center md:text-right">
                                                <span className="text-[#c5a059] font-bold text-sm block">1. Fase do Jogador</span>
                                                <span className="text-xs text-[#888]">Escolha sua ação (Atacar, Habilidade, Item).</span>
                                            </div>
                                            <div className="w-8 h-8 rounded-full bg-[#1a1a1a] border border-[#c5a059] flex items-center justify-center shrink-0 z-20">
                                                <Sword size={14} className="text-[#c5a059]" />
                                            </div>
                                            <div className="w-full md:w-1/2 hidden md:block" />
                                        </div>

                                        {/* Calculation Phase */}
                                        <div className="flex flex-col md:flex-row items-center gap-4">
                                            <div className="w-full md:w-1/2 hidden md:block" />
                                            <div className="w-6 h-6 rounded-full bg-[#1a1a1a] border border-[#444] flex items-center justify-center shrink-0 z-20">
                                                <Calculator size={12} className="text-[#888]" />
                                            </div>
                                            <div className="w-full md:w-1/2 text-center md:text-left">
                                                <span className="text-[#a8a8a8] font-bold text-sm block">2. Resolução</span>
                                                <span className="text-xs text-[#666]">Dano calculado, críticos e esquivas verificados.</span>
                                            </div>
                                        </div>

                                        {/* Enemy Phase */}
                                        <div className="flex flex-col md:flex-row items-center gap-4">
                                            <div className="w-full md:w-1/2 text-center md:text-right">
                                                <span className="text-[#8b0000] font-bold text-sm block">3. Turno do Inimigo</span>
                                                <span className="text-xs text-[#888]">Inimigo reage e ataca (após breve delay).</span>
                                            </div>
                                            <div className="w-8 h-8 rounded-full bg-[#1a1a1a] border border-[#8b0000] flex items-center justify-center shrink-0 z-20">
                                                <Skull size={14} className="text-[#8b0000]" />
                                            </div>
                                            <div className="w-full md:w-1/2 hidden md:block" />
                                        </div>

                                        {/* End Phase */}
                                        <div className="flex flex-col md:flex-row items-center gap-4">
                                            <div className="w-full md:w-1/2 hidden md:block" />
                                            <div className="w-6 h-6 rounded-full bg-[#1a1a1a] border border-[#444] flex items-center justify-center shrink-0 z-20">
                                                <Activity size={12} className="text-[#888]" />
                                            </div>
                                            <div className="w-full md:w-1/2 text-center md:text-left">
                                                <span className="text-[#a8a8a8] font-bold text-sm block">4. Status & Cooldowns</span>
                                                <span className="text-xs text-[#666]">Buffs/Debuffs tickam, cooldowns reduzem.</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Core Mechanics Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-[#111] border border-[#333] p-4">
                                    <h4 className="text-[#c5a059] font-bold mb-2 font-['Cinzel'] text-sm flex items-center gap-2">
                                        <Sword size={16} /> Tipos de Dano
                                    </h4>
                                    <ul className="space-y-2 text-xs text-[#888]">
                                        <li className="flex justify-between border-b border-[#222] pb-1">
                                            <span>Físico</span>
                                            <span className="text-[#555]">Reduzido por DEF</span>
                                        </li>
                                        <li className="flex justify-between border-b border-[#222] pb-1">
                                            <span>Mágico</span>
                                            <span className="text-[#555]">Ignora DEF (parcialmente)</span>
                                        </li>
                                        <li className="flex justify-between border-b border-[#222] pb-1">
                                            <span>Verdadeiro</span>
                                            <span className="text-[#c5a059]">Ignora toda defesa</span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="bg-[#111] border border-[#333] p-4">
                                    <h4 className="text-[#c5a059] font-bold mb-2 font-['Cinzel'] text-sm flex items-center gap-2">
                                        <Zap size={16} /> Acerto & Crítico
                                    </h4>
                                    <ul className="space-y-2 text-xs text-[#888]">
                                        <li className="flex justify-between border-b border-[#222] pb-1">
                                            <span>Base Crítico</span>
                                            <span className="text-white">5%</span>
                                        </li>
                                        <li className="flex justify-between border-b border-[#222] pb-1">
                                            <span>Dano Crítico</span>
                                            <span className="text-white">150% (1.5x)</span>
                                        </li>
                                        <li className="flex justify-between border-b border-[#222] pb-1">
                                            <span>Esquiva Max</span>
                                            <span className="text-[#555]">75% Cap</span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="bg-[#111] border border-[#333] p-4">
                                    <h4 className="text-[#c5a059] font-bold mb-2 font-['Cinzel'] text-sm flex items-center gap-2">
                                        <Shield size={16} /> Defesa
                                    </h4>
                                    <ul className="space-y-2 text-xs text-[#888]">
                                        <li className="flex justify-between border-b border-[#222] pb-1">
                                            <span>Mitigação</span>
                                            <span className="text-[#555]">DEF * 0.5</span>
                                        </li>
                                        <li className="flex justify-between border-b border-[#222] pb-1">
                                            <span>Bloqueio</span>
                                            <span className="text-[#555]">Requer Escudo</span>
                                        </li>
                                        <li className="flex justify-between border-b border-[#222] pb-1">
                                            <span>Resistência</span>
                                            <span className="text-[#555]">-Dano Mágico</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* Status Effects */}
                            <div>
                                <h4 className="text-[#c5a059] font-bold mb-4 font-['Cinzel'] border-b border-[#333] pb-2">Efeitos de Status</h4>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="bg-[#1a1a1a] p-3 border border-red-900/30 flex items-center gap-3">
                                        <div className="w-8 h-8 bg-red-900/20 rounded flex items-center justify-center">
                                            <Skull size={16} className="text-red-500" />
                                        </div>
                                        <div>
                                            <span className="text-red-400 font-bold text-xs block">Sangramento</span>
                                            <span className="text-[10px] text-[#666]">Dano por turno</span>
                                        </div>
                                    </div>
                                    <div className="bg-[#1a1a1a] p-3 border border-emerald-900/30 flex items-center gap-3">
                                        <div className="w-8 h-8 bg-emerald-900/20 rounded flex items-center justify-center">
                                            <Activity size={16} className="text-emerald-500" />
                                        </div>
                                        <div>
                                            <span className="text-emerald-400 font-bold text-xs block">Veneno</span>
                                            <span className="text-[10px] text-[#666]">-HP e -Cura</span>
                                        </div>
                                    </div>
                                    <div className="bg-[#1a1a1a] p-3 border border-blue-900/30 flex items-center gap-3">
                                        <div className="w-8 h-8 bg-blue-900/20 rounded flex items-center justify-center">
                                            <Shield size={16} className="text-blue-500" />
                                        </div>
                                        <div>
                                            <span className="text-blue-400 font-bold text-xs block">Atordoado</span>
                                            <span className="text-[10px] text-[#666]">Perde o turno</span>
                                        </div>
                                    </div>
                                    <div className="bg-[#1a1a1a] p-3 border border-[#c5a059]/30 flex items-center gap-3">
                                        <div className="w-8 h-8 bg-[#c5a059]/20 rounded flex items-center justify-center">
                                            <Sword size={16} className="text-[#c5a059]" />
                                        </div>
                                        <div>
                                            <span className="text-[#c5a059] font-bold text-xs block">Enfurecido</span>
                                            <span className="text-[10px] text-[#666]">+Dano recebido/causado</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </Section>
                );
            case 'skills':
                return (
                    <Section title="Habilidades de Classe" icon={Zap}>
                        <p className="mb-6">
                            As habilidades são desbloqueadas investindo pontos na Árvore de Talentos.
                            Abaixo estão as habilidades conhecidas da classe <strong>Guerreiro</strong>.
                        </p>

                        <div className="space-y-8">
                            {/* Warrior Skills */}
                            <div>
                                <h3 className="text-lg font-bold text-[#c5a059] border-b border-[#333] pb-2 mb-4 font-['Cinzel'] flex items-center gap-2">
                                    <Sword size={18} />
                                    Senhor da Guerra (Guerreiro)
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                                    {/* Active Skills */}
                                    <div className="bg-[#111] border border-[#333] p-4 relative group hover:border-[#c5a059] transition-all">
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="font-bold text-[#c5a059] font-['Cinzel']">Ataque Brutal</h4>
                                            <span className="text-[10px] bg-[#8b0000]/20 text-[#ff4d4d] border border-[#8b0000] px-1.5 py-0.5 rounded uppercase">Ativa</span>
                                        </div>
                                        <p className="text-xs text-[#888] mb-3">Um golpe poderoso que causa dano físico massivo ao inimigo.</p>
                                        <div className="text-[10px] font-mono text-[#666] border-t border-[#222] pt-2 flex justify-between">
                                            <span>Tier 3</span>
                                            <span>CD: 3 Turnos</span>
                                        </div>
                                    </div>

                                    <div className="bg-[#111] border border-[#333] p-4 relative group hover:border-[#c5a059] transition-all">
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="font-bold text-[#c5a059] font-['Cinzel']">Postura Defensiva</h4>
                                            <span className="text-[10px] bg-[#8b0000]/20 text-[#ff4d4d] border border-[#8b0000] px-1.5 py-0.5 rounded uppercase">Ativa</span>
                                        </div>
                                        <p className="text-xs text-[#888] mb-3">Aumenta significativamente a defesa por 2 turnos.</p>
                                        <div className="text-[10px] font-mono text-[#666] border-t border-[#222] pt-2 flex justify-between">
                                            <span>Tier 3</span>
                                            <span>CD: 4 Turnos</span>
                                        </div>
                                    </div>

                                    <div className="bg-[#111] border border-[#333] p-4 relative group hover:border-[#c5a059] transition-all">
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="font-bold text-[#c5a059] font-['Cinzel']">Golpe de Elite</h4>
                                            <span className="text-[10px] bg-[#8b0000]/20 text-[#ff4d4d] border border-[#8b0000] px-1.5 py-0.5 rounded uppercase">Ativa</span>
                                        </div>
                                        <p className="text-xs text-[#888] mb-3">Técnica avançada de combate com efeitos devastadores.</p>
                                        <div className="text-[10px] font-mono text-[#666] border-t border-[#222] pt-2 flex justify-between">
                                            <span>Tier 5</span>
                                            <span>CD: 5 Turnos</span>
                                        </div>
                                    </div>

                                    <div className="bg-[#111] border border-[#333] p-4 relative group hover:border-[#c5a059] transition-all shadow-[0_0_10px_rgba(197,160,89,0.1)]">
                                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#c5a059]/5 to-transparent pointer-events-none" />
                                        <div className="flex justify-between items-start mb-2 relative z-10">
                                            <h4 className="font-bold text-[#c5a059] font-['Cinzel'] text-lg">DEUS DA GUERRA</h4>
                                            <span className="text-[10px] bg-[#c5a059]/20 text-[#c5a059] border border-[#c5a059] px-1.5 py-0.5 rounded uppercase font-bold">Ultimate</span>
                                        </div>
                                        <p className="text-xs text-[#a8a8a8] mb-3 relative z-10">Libera o poder supremo, tornando-se uma força incontrolável de destruição.</p>
                                        <div className="text-[10px] font-mono text-[#666] border-t border-[#333] pt-2 flex justify-between relative z-10">
                                            <span>Tier 7</span>
                                            <span>CD: 10 Turnos</span>
                                        </div>
                                    </div>

                                    {/* Passive Skills Examples */}
                                    <div className="bg-[#111] border border-[#333] p-4 relative group hover:border-[#c5a059] transition-all opacity-80 hover:opacity-100">
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="font-bold text-[#a8a8a8] group-hover:text-[#c5a059] transition-colors font-['Cinzel']">Força Bruta</h4>
                                            <span className="text-[10px] bg-[#1a1a1a] text-[#888] border border-[#333] px-1.5 py-0.5 rounded uppercase">Passiva</span>
                                        </div>
                                        <p className="text-xs text-[#666] mb-3">Aumenta permanentemente a Força base.</p>
                                        <div className="text-[10px] font-mono text-[#444] border-t border-[#222] pt-2 flex justify-between">
                                            <span>Tier 2</span>
                                            <span>Permanente</span>
                                        </div>
                                    </div>

                                    <div className="bg-[#111] border border-[#333] p-4 relative group hover:border-[#c5a059] transition-all opacity-80 hover:opacity-100">
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="font-bold text-[#a8a8a8] group-hover:text-[#c5a059] transition-colors font-['Cinzel']">Mestre de Armas</h4>
                                            <span className="text-[10px] bg-[#1a1a1a] text-[#888] border border-[#333] px-1.5 py-0.5 rounded uppercase">Passiva</span>
                                        </div>
                                        <p className="text-xs text-[#666] mb-3">Aumenta o dano com tipos específicos de armas (Espada, Machado, etc).</p>
                                        <div className="text-[10px] font-mono text-[#444] border-t border-[#222] pt-2 flex justify-between">
                                            <span>Tier 4</span>
                                            <span>Permanente</span>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </Section>
                );
            case 'inventory':
                return (
                    <Section title="Inventário & Itens" icon={Package}>
                        <p className="mb-6">
                            O inventário é onde você gerencia seus recursos. A itemização segue uma estrutura de <strong>Base + Afixos</strong>, onde a raridade define a complexidade e poder do item.
                        </p>

                        <div className="space-y-8">

                            {/* Rarity Legend */}
                            <div className="bg-[#111] border border-[#333] p-4">
                                <h3 className="text-[#c5a059] font-bold mb-3 font-['Cinzel'] text-sm uppercase tracking-wider">Raridade de Itens</h3>
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-2 py-1 bg-[#222] border border-[#444] text-[#a8a8a8] text-xs font-mono">Comum (Cinza)</span>
                                    <span className="px-2 py-1 bg-emerald-900/20 border border-emerald-900 text-emerald-400 text-xs font-mono">Incomum (Verde)</span>
                                    <span className="px-2 py-1 bg-blue-900/20 border border-blue-900 text-blue-400 text-xs font-mono">Raro (Azul)</span>
                                    <span className="px-2 py-1 bg-purple-900/20 border border-purple-900 text-purple-400 text-xs font-mono">Épico (Roxo)</span>
                                    <span className="px-2 py-1 bg-[#c5a059]/10 border border-[#c5a059] text-[#c5a059] text-xs font-mono">Único (Dourado)</span>
                                </div>
                            </div>

                            {/* Item Anatomy & Affixes */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Base Item Example */}
                                <div>
                                    <h3 className="text-lg font-bold text-[#c5a059] border-b border-[#333] pb-2 mb-4 font-['Cinzel']">
                                        Estrutura do Item
                                    </h3>
                                    <p className="text-xs text-[#888] mb-4">
                                        Todo item começa com uma base sólida. Itens <strong>Comuns</strong> possuem apenas estes status.
                                    </p>

                                    <div className="bg-[#0c0c0c] border border-[#444] p-4 w-full max-w-sm mx-auto shadow-lg relative group">
                                        {/* Tooltip-like appearance */}
                                        <div className="flex justify-between items-start mb-2 border-b border-[#333] pb-2">
                                            <h4 className="font-bold font-['Cinzel'] text-lg text-[#a8a8a8]">Espada Corroida</h4>
                                            <span className="text-[10px] uppercase tracking-wider text-[#555] border border-[#333] px-1">Espada de Duas Mãos</span>
                                        </div>
                                        <div className="space-y-1 font-mono text-xs text-[#a8a8a8]">
                                            <div className="flex justify-between">
                                                <span>Dano Físico</span>
                                                <span className="text-white">9-16</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Chance de Crítico</span>
                                                <span className="text-white">5%</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Velocidade de Ataque</span>
                                                <span className="text-white">1.6</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Affix Progression */}
                                <div className="lg:col-span-2">
                                    <h3 className="text-lg font-bold text-[#c5a059] border-b border-[#333] pb-2 mb-6 font-['Cinzel']">
                                        Progressão de Raridade & Afixos
                                    </h3>

                                    <div className="bg-[#111] border border-[#333] p-4 mb-6 rounded">
                                        <h4 className="text-[#c5a059] font-bold mb-2 text-sm">Regras de Itemização</h4>
                                        <ul className="space-y-2 text-xs text-[#a8a8a8] font-mono">
                                            <li className="flex items-start gap-2">
                                                <span className="text-emerald-400 font-bold min-w-[80px]">Incomum:</span>
                                                <span>Adiciona <strong>1 Afixo</strong> aleatório aos status base.</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-blue-400 font-bold min-w-[80px]">Raro:</span>
                                                <span>Adiciona <strong>2 Afixos</strong> aleatórios. Começa a definir builds.</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-purple-400 font-bold min-w-[80px]">Épico:</span>
                                                <span>Adiciona <strong>3+ Afixos</strong>. Itens poderosos com múltiplos bônus.</span>
                                            </li>
                                            <li className="flex items-start gap-2 border-t border-[#333] pt-2 mt-2">
                                                <span className="text-[#c5a059] font-bold min-w-[80px]">Único:</span>
                                                <span>
                                                    Itens lendários com <strong>Nome Próprio</strong> e <strong>Status Fixos</strong>.
                                                    Possuem propriedades especiais que não existem em outros itens (ex: "Ataque Duplo") e podem definir o funcionamento de uma classe.
                                                </span>
                                            </li>
                                        </ul>
                                    </div>

                                    <p className="text-xs text-[#888] mb-6">
                                        Abaixo, veja a evolução de uma "Espada Corroida" através das raridades:
                                    </p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">

                                        {/* Incomum */}
                                        <div className="bg-[#0c0c0c] border border-emerald-900/50 p-3 shadow-lg relative group hover:border-emerald-500/50 transition-colors">
                                            <div className="flex justify-between items-start mb-2 border-b border-[#333] pb-2">
                                                <h4 className="font-bold font-['Cinzel'] text-sm text-emerald-400">Espada Corroida</h4>
                                                <span className="text-[9px] uppercase tracking-wider text-[#555] border border-[#333] px-1">Incomum</span>
                                            </div>
                                            <div className="space-y-1 font-mono text-[10px] text-[#a8a8a8] mb-3">
                                                <div className="flex justify-between"><span>Dano Físico</span><span className="text-white">9-16</span></div>
                                                <div className="flex justify-between"><span>Chance Crítico</span><span className="text-white">5%</span></div>
                                                <div className="flex justify-between"><span>Vel. Ataque</span><span className="text-white">1.6</span></div>
                                            </div>
                                            <div className="border-t border-[#222] pt-2 space-y-1">
                                                <p className="text-emerald-400 text-[10px] font-bold">+1 de Força</p>
                                            </div>
                                        </div>

                                        {/* Raro */}
                                        <div className="bg-[#0c0c0c] border border-blue-900/50 p-3 shadow-lg relative group hover:border-blue-500/50 transition-colors">
                                            <div className="flex justify-between items-start mb-2 border-b border-[#333] pb-2">
                                                <h4 className="font-bold font-['Cinzel'] text-sm text-blue-400">Espada Corroida</h4>
                                                <span className="text-[9px] uppercase tracking-wider text-[#555] border border-[#333] px-1">Raro</span>
                                            </div>
                                            <div className="space-y-1 font-mono text-[10px] text-[#a8a8a8] mb-3">
                                                <div className="flex justify-between"><span>Dano Físico</span><span className="text-white">9-16</span></div>
                                                <div className="flex justify-between"><span>Chance Crítico</span><span className="text-white">5%</span></div>
                                                <div className="flex justify-between"><span>Vel. Ataque</span><span className="text-white">1.6</span></div>
                                            </div>
                                            <div className="border-t border-[#222] pt-2 space-y-1">
                                                <p className="text-blue-400 text-[10px] font-bold">+1 de Força</p>
                                                <p className="text-blue-400 text-[10px] font-bold">+3 de Dano Físico</p>
                                            </div>
                                        </div>

                                        {/* Épico */}
                                        <div className="bg-[#0c0c0c] border border-purple-900/50 p-3 shadow-lg relative group hover:border-purple-500/50 transition-colors">
                                            <div className="flex justify-between items-start mb-2 border-b border-[#333] pb-2">
                                                <h4 className="font-bold font-['Cinzel'] text-sm text-purple-400">Espada Corroida</h4>
                                                <span className="text-[9px] uppercase tracking-wider text-[#555] border border-[#333] px-1">Épico</span>
                                            </div>
                                            <div className="space-y-1 font-mono text-[10px] text-[#a8a8a8] mb-3">
                                                <div className="flex justify-between"><span>Dano Físico</span><span className="text-white">9-16</span></div>
                                                <div className="flex justify-between"><span>Chance Crítico</span><span className="text-white">5%</span></div>
                                                <div className="flex justify-between"><span>Vel. Ataque</span><span className="text-white">1.6</span></div>
                                            </div>
                                            <div className="border-t border-[#222] pt-2 space-y-1">
                                                <p className="text-purple-400 text-[10px] font-bold">+1 de Força</p>
                                                <p className="text-purple-400 text-[10px] font-bold">+3 de Dano Físico</p>
                                                <p className="text-purple-400 text-[10px] font-bold">+15 de Vida</p>
                                            </div>
                                        </div>

                                        {/* Único */}
                                        <div className="bg-[#0c0c0c] border border-[#c5a059]/50 p-3 shadow-lg relative group hover:border-[#c5a059] transition-colors overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-b from-[#c5a059]/5 to-transparent pointer-events-none" />
                                            <div className="flex justify-between items-start mb-2 border-b border-[#333] pb-2 relative z-10">
                                                <h4 className="font-bold font-['Cinzel'] text-sm text-[#c5a059]">Lâmina do Flagelo</h4>
                                                <span className="text-[9px] uppercase tracking-wider text-[#c5a059] border border-[#c5a059] px-1">Único</span>
                                            </div>
                                            <div className="space-y-1 font-mono text-[10px] text-[#a8a8a8] mb-3 relative z-10">
                                                {/* Base damage increased by 50% (9*1.5=13.5, 16*1.5=24) */}
                                                <div className="flex justify-between"><span className="text-[#c5a059]">Dano Físico</span><span className="text-[#c5a059] font-bold">13-24</span></div>
                                                <div className="flex justify-between"><span>Chance Crítico</span><span className="text-white">5%</span></div>
                                                <div className="flex justify-between"><span>Vel. Ataque</span><span className="text-white">1.6</span></div>
                                            </div>
                                            <div className="border-t border-[#c5a059]/30 pt-2 space-y-1 relative z-10">
                                                <p className="text-[#c5a059] text-[10px] font-bold">+50% Dano Físico</p>
                                                <p className="text-[#c5a059] text-[10px] font-bold">+30 de Vida</p>
                                                <p className="text-[#c5a059] text-[10px] font-bold leading-tight">10% de chance de atacar novamente sem custo</p>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            {/* Reagents by Profession */}
                            <div>
                                <h3 className="text-lg font-bold text-[#c5a059] border-b border-[#333] pb-2 mb-4 font-['Cinzel'] flex items-center gap-2">
                                    <Database size={18} />
                                    Materiais de Profissão (Reagentes)
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                    {/* Alchemy Reagents */}
                                    <div className="bg-[#111] border border-[#333] p-4 relative group hover:border-[#c5a059] transition-all">
                                        <div className="flex items-center gap-2 mb-3">
                                            <FlaskConical size={16} className="text-emerald-500" />
                                            <h4 className="font-bold text-[#a8a8a8] group-hover:text-[#c5a059] transition-colors">Alquimia</h4>
                                        </div>
                                        <ul className="space-y-2 text-xs text-[#888]">
                                            <li className="flex justify-between border-b border-[#222] pb-1">
                                                <span>Ervas (Comum/Rara)</span>
                                                <span className="text-[#555]">Coletado em Florestas</span>
                                            </li>
                                            <li className="flex justify-between border-b border-[#222] pb-1">
                                                <span>Frascos Vazios</span>
                                                <span className="text-[#555]">Comprado no Mercador</span>
                                            </li>
                                            <li className="flex justify-between border-b border-[#222] pb-1">
                                                <span>Essências Elementais</span>
                                                <span className="text-[#555]">Drop de Monstros Mágicos</span>
                                            </li>
                                        </ul>
                                    </div>

                                    {/* Blacksmithing Reagents */}
                                    <div className="bg-[#111] border border-[#333] p-4 relative group hover:border-[#c5a059] transition-all">
                                        <div className="flex items-center gap-2 mb-3">
                                            <Hammer size={16} className="text-orange-500" />
                                            <h4 className="font-bold text-[#a8a8a8] group-hover:text-[#c5a059] transition-colors">Ferraria</h4>
                                        </div>
                                        <ul className="space-y-2 text-xs text-[#888]">
                                            <li className="flex justify-between border-b border-[#222] pb-1">
                                                <span>Minérios (Cobre, Ferro)</span>
                                                <span className="text-[#555]">Extraído em Cavernas</span>
                                            </li>
                                            <li className="flex justify-between border-b border-[#222] pb-1">
                                                <span>Carvão & Combustível</span>
                                                <span className="text-[#555]">Minas Profundas</span>
                                            </li>
                                            <li className="flex justify-between border-b border-[#222] pb-1">
                                                <span>Barras Refinadas</span>
                                                <span className="text-[#555]">Criado na Forja</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Consumables */}
                            <div>
                                <h3 className="text-lg font-bold text-[#c5a059] border-b border-[#333] pb-2 mb-4 font-['Cinzel'] flex items-center gap-2">
                                    <FlaskConical size={18} />
                                    Consumíveis
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="bg-[#111] border border-[#333] p-3 text-center">
                                        <span className="text-red-500 font-bold text-xs block mb-1">Poções de Vida</span>
                                        <p className="text-[10px] text-[#666]">Recuperam HP instantaneamente.</p>
                                    </div>
                                    <div className="bg-[#111] border border-[#333] p-3 text-center">
                                        <span className="text-blue-500 font-bold text-xs block mb-1">Poções de Mana</span>
                                        <p className="text-[10px] text-[#666]">Restauram MP para habilidades.</p>
                                    </div>
                                    <div className="bg-[#111] border border-[#333] p-3 text-center">
                                        <span className="text-[#c5a059] font-bold text-xs block mb-1">Elixires</span>
                                        <p className="text-[10px] text-[#666]">Buffs de longa duração (ex: +Força).</p>
                                    </div>
                                </div>
                            </div>

                            {/* Equipment & Attributes */}
                            <div>
                                <h3 className="text-lg font-bold text-[#c5a059] border-b border-[#333] pb-2 mb-4 font-['Cinzel'] flex items-center gap-2">
                                    <Shield size={18} />
                                    Equipamentos & Atributos
                                </h3>
                                <p className="text-xs text-[#888] mb-4">
                                    Equipamentos fornecem bônus diretos aos seus atributos. Passe o mouse sobre um item no jogo para ver seus detalhes.
                                </p>
                                <div className="bg-[#0a0a0a] border border-[#333] p-4 rounded font-mono text-xs space-y-3">
                                    <div className="flex items-start gap-3">
                                        <span className="text-[#c5a059] font-bold min-w-[40px]">ATK</span>
                                        <span className="text-[#666]">Poder de Ataque. Soma-se à sua Força para calcular o dano físico.</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-[#c5a059] font-bold min-w-[40px]">DEF</span>
                                        <span className="text-[#666]">Defesa Física. Reduz diretamente o dano recebido de ataques físicos.</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-[#c5a059] font-bold min-w-[40px]">SPD</span>
                                        <span className="text-[#666]">Velocidade. Afeta a ordem dos turnos e chance de esquiva.</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-[#c5a059] font-bold min-w-[40px]">VIG</span>
                                        <span className="text-[#666]">Vigor. Aumenta sua Vida Máxima e resistência a venenos.</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </Section>
                );
            case 'architecture':
                return (
                    <Section title="Arquitetura Técnica" icon={Code}>
                        <div className="space-y-8">

                            {/* Tech Stack Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-[#111] border border-[#333] p-4">
                                    <h4 className="text-[#c5a059] font-bold mb-4 font-['Cinzel'] border-b border-[#333] pb-2">Frontend Stack</h4>
                                    <div className="flex flex-wrap gap-2">
                                        <TechBadge name="React 18" />
                                        <TechBadge name="Vite" />
                                        <TechBadge name="Tailwind CSS" />
                                        <TechBadge name="Lucide Icons" />
                                        <TechBadge name="Framer Motion" />
                                    </div>
                                </div>
                                <div className="bg-[#111] border border-[#333] p-4">
                                    <h4 className="text-[#c5a059] font-bold mb-4 font-['Cinzel'] border-b border-[#333] pb-2">Core Systems</h4>
                                    <div className="flex flex-wrap gap-2">
                                        <TechBadge name="Context API" />
                                        <TechBadge name="Custom Hooks" />
                                        <TechBadge name="Local Storage" />
                                        <TechBadge name="Event Driven" />
                                    </div>
                                </div>
                            </div>

                            {/* System Architecture Flow */}
                            <div className="bg-[#0c0c0c] border border-[#333] p-6 relative overflow-hidden">
                                <h4 className="text-[#c5a059] font-bold mb-6 font-['Cinzel'] text-center">Fluxo de Dados</h4>
                                <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-xs font-mono">

                                    <div className="bg-[#1a1a1a] border border-[#444] p-3 text-center w-full md:w-auto">
                                        <span className="text-emerald-400 block mb-1 font-bold">JSON Data</span>
                                        <span className="text-[#666]">Static Assets</span>
                                    </div>

                                    <div className="hidden md:block text-[#333]">➜</div>
                                    <div className="block md:hidden text-[#333]">⬇</div>

                                    <div className="bg-[#1a1a1a] border border-[#444] p-3 text-center w-full md:w-auto">
                                        <span className="text-blue-400 block mb-1 font-bold">Game Logic</span>
                                        <span className="text-[#666]">Pure JS Systems</span>
                                    </div>

                                    <div className="hidden md:block text-[#333]">➜</div>
                                    <div className="block md:hidden text-[#333]">⬇</div>

                                    <div className="bg-[#1a1a1a] border border-[#444] p-3 text-center w-full md:w-auto">
                                        <span className="text-purple-400 block mb-1 font-bold">React State</span>
                                        <span className="text-[#666]">UI Components</span>
                                    </div>

                                </div>
                            </div>

                            {/* Key Concepts & Directory Structure */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                                {/* Key Concepts */}
                                <div>
                                    <h4 className="text-[#c5a059] font-bold mb-4 font-['Cinzel']">Conceitos Chave</h4>
                                    <ul className="space-y-3 text-xs text-[#888]">
                                        <li className="bg-[#111] p-3 border border-[#333]">
                                            <strong className="text-[#a8a8a8] block mb-1">Componentização Atômica</strong>
                                            Interface construída com componentes reutilizáveis (Badges, Panels, Buttons) mantendo consistência visual.
                                        </li>
                                        <li className="bg-[#111] p-3 border border-[#333]">
                                            <strong className="text-[#a8a8a8] block mb-1">Game Loop Híbrido</strong>
                                            Combina atualizações baseadas em eventos (cliques) com ticks periódicos para regeneração de recursos.
                                        </li>
                                        <li className="bg-[#111] p-3 border border-[#333]">
                                            <strong className="text-[#a8a8a8] block mb-1">Separação de Responsabilidades</strong>
                                            Lógica de jogo desacoplada da renderização visual sempre que possível.
                                        </li>
                                    </ul>
                                </div>

                                {/* Directory Structure */}
                                <div>
                                    <h4 className="text-[#c5a059] font-bold mb-4 font-['Cinzel']">Estrutura de Diretórios</h4>
                                    <div className="bg-[#050505] border border-[#333] p-4 font-mono text-xs text-[#666] h-full">
                                        <ul className="space-y-2">
                                            <li><span className="text-blue-500">/src</span></li>
                                            <li className="pl-4 border-l border-[#333]"><span className="text-yellow-500">/assets</span> <span className="text-[#444]">- Imagens e ícones</span></li>
                                            <li className="pl-4 border-l border-[#333]"><span className="text-yellow-500">/components</span> <span className="text-[#444]">- React Components</span></li>
                                            <li className="pl-4 border-l border-[#333]"><span className="text-yellow-500">/data</span> <span className="text-[#444]">- JSONs (Inimigos, Itens)</span></li>
                                            <li className="pl-4 border-l border-[#333]"><span className="text-yellow-500">/hooks</span> <span className="text-[#444]">- Custom React Hooks</span></li>
                                            <li className="pl-4 border-l border-[#333]"><span className="text-yellow-500">/systems</span> <span className="text-[#444]">- Core Game Logic</span></li>
                                            <li className="pl-4 border-l border-[#333]"><span className="text-emerald-500">App.jsx</span> <span className="text-[#444]">- Main Entry Point</span></li>
                                            <li className="pl-4 border-l border-[#333]"><span className="text-emerald-500">main.jsx</span> <span className="text-[#444]">- DOM Render</span></li>
                                        </ul>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </Section>
                );
            case 'math':
                return (
                    <Section title="Exemplos de Cálculo" icon={Calculator}>
                        <div className="space-y-6 font-mono text-xs bg-[#050505] p-4 border border-[#333]">

                            <div>
                                <h5 className="text-[#c5a059] mb-1">// Dano Físico</h5>
                                <p className="text-[#888]">
                                    Multiplicador_Força = 1 + (STR * 0.02)<br />
                                    Dano_Bruto = ATK * Multiplicador_Força<br />
                                    Mitigação = DEF_Alvo * 0.7<br />
                                    <span className="text-white">Dano_Final = floor(Dano_Bruto - Mitigação)</span>
                                </p>
                            </div>

                            <div>
                                <h5 className="text-[#c5a059] mb-1">// Chance de Crítico</h5>
                                <p className="text-[#888]">
                                    Base = 5%<br />
                                    <span className="text-white">Chance = 0.05 + (DEX * 0.01)</span>
                                </p>
                            </div>

                            <div>
                                <h5 className="text-[#c5a059] mb-1">// Experiência (XP)</h5>
                                <p className="text-[#888]">
                                    <span className="text-white">XP_Próximo_Nível = floor(100 * (1.25 ^ (Nível - 1)))</span>
                                </p>
                            </div>

                        </div>
                    </Section>
                );
            default:
                return null;
        }
    };

    return (
        <div className="absolute inset-0 z-[100] bg-[#050505]/95 backdrop-blur-sm flex items-center justify-center p-8 animate-in fade-in zoom-in-95 duration-300">
            <div className="w-full max-w-6xl h-[85vh] panel-diablo flex relative overflow-hidden">

                {/* Sidebar Menu */}
                <div className="w-64 bg-[#0c0c0c] border-r-2 border-[#333] flex flex-col">
                    <div className="p-6 border-b border-[#333] bg-ornate-pattern">
                        <h1 className="text-xl font-bold text-gold-gradient font-['Cinzel'] tracking-wider">
                            CÓDEX
                        </h1>
                        <p className="text-[#666] text-[10px] uppercase tracking-widest mt-1">Base de Conhecimento</p>
                    </div>

                    <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
                        {MENUS.map(menu => {
                            const Icon = menu.icon;
                            const isActive = activeSection === menu.id;
                            return (
                                <button
                                    key={menu.id}
                                    onClick={() => setActiveSection(menu.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-['Cinzel'] font-bold tracking-wide transition-all duration-200 border-l-2 ${isActive
                                        ? 'bg-[#1a1a1a] text-[#c5a059] border-[#c5a059]'
                                        : 'text-[#666] border-transparent hover:bg-[#111] hover:text-[#a8a8a8] hover:border-[#444]'
                                        }`}
                                >
                                    <Icon size={16} className={isActive ? 'text-[#c5a059]' : 'opacity-50'} />
                                    {menu.label}
                                </button>
                            );
                        })}
                    </div>

                    <div className="p-4 border-t border-[#333] text-center">
                        <button
                            onClick={onClose}
                            className="w-full py-2 bg-[#1a1a1a] border border-[#333] text-[#888] hover:text-white hover:border-[#c5a059] transition-all uppercase text-xs font-bold tracking-widest"
                        >
                            Fechar
                        </button>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 flex flex-col bg-texture-dark relative">
                    {/* Header for Mobile/Context (Optional, keeping it clean for now) */}

                    <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
                        {renderContent()}
                    </div>

                    {/* Footer Info */}
                    <div className="p-2 border-t border-[#333] bg-[#0c0c0c] text-center text-[10px] text-[#444] font-mono">
                        RPG TEXTO DG v0.1.0 // SYSTEM_READY
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Documentation;
