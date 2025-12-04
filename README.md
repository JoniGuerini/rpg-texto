# 🗡️ RPG Texto DG

Um RPG de texto estilo Diablo, desenvolvido em React com sistema de profissões, crafting e combate estratégico.

## 🎮 Características

### ⚔️ Sistema de Combate
- Combate tático por turnos
- Sistema de dano com ranges (min-max)
- Chance de crítico e velocidade de ataque
- Sistema de XP e progressão de nível

### 🔨 Profissões & Crafting
- **Ferraria**: 52 receitas de armas (espadas, machados, alabardas, maças)
  - 13 Espadas de Duas Mãos
  - 8 Machados de Duas Mãos
  - 5 Alabardas
  - 26 Maças de Duas Mãos (base PoE2)
- **Alquimia**: Sistema de poções e consumíveis
- Sistema de especialização com árvores de talentos
- Interface com categorias colapsáveis

### 🎒 Sistema de Inventário
- Inventário com 20 slots
- Baú com 40 slots
- Sistema de drag & drop funcional
- Tooltips detalhados para itens

### ⛏️ Sistema de Mineração Idle
- Thomas (aprendiz) coleta carvão automaticamente
- Sistema de upgrades para melhorar produção
- Mecânicas de risco (medo/bloqueios)
- Geodas com tesouros escondidos
- Carvão como combustível para buffs de forja

### 🏘️ Vila Interativa
- NPCs com diálogos e histórias (sussurros)
- Sistema de comércio
- Reparação de equipamentos
- Acesso a profissões via NPCs específicos

### 📜 Sistema de Quests
- Quest log completo
- Múltiplas missões por tier
- Recompensas variadas (XP, gold, itens)
- Missões de tipo kill/collect

### 🌟 Sistema de Raridades
- **Comum** (Cinza)
- **Incomum** (Verde)
- **Raro** (Azul)
- **Épico** (Roxo)
- **Único** (Dourado)

## 🗄️ Database Modular

Sistema de database centralizado e modular:
- `items.js` - 1300+ linhas de itens
- `enemies.js` - Bestiário completo
- `quests.js` - Todas as missões
- `talents.js` - Árvore de talentos
- `npcs.js` - Dados de NPCs
- `professions.js` - Receitas e especializações

## 🛠️ Tecnologias

- **React** + **Vite**
- **Tailwind CSS**
- **Lucide Icons**
- Custom Hooks para lógica de jogo
- Sistema de componentes modular

## 📦 Instalação

```bash
# Clone o repositório
git clone https://github.com/JoniGuerini/rpg-texto.git

# Entre na pasta
cd rpg-texto

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

## 🎯 Features Implementadas

✅ Sistema de combate completo  
✅ 52+ receitas de crafting  
✅ Sistema de inventário e stash  
✅ Mineração idle com Thomas  
✅ Tooltips dinâmicos  
✅ NPCs interativos  
✅ Quest log funcional  
✅ Sistema de profissões  
✅ Árvore de talentos  
✅ Sistema de raridades  

## 🚀 Roadmap

- [ ] Sistema de desbloqueio de receitas
- [ ] Mais profissões (Enchanting, etc)
- [ ] Sistema de combate multiplayer
- [ ] Dungeons procedurais
- [ ] Boss fights épicos
- [ ] Sistema de guildas

## 📝 Licença

MIT

---

**Desenvolvido com ❤️ usando o sistema multi-agentes de IA**

