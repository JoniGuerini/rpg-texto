# 📚 DATABASE - Sistema Modular de Dados

Sistema centralizado e organizado para gerenciar todos os dados do **RPG Texto DG**.

## 📂 Estrutura

```
src/database/
├─ items.js          → Catálogo de itens (armas, armaduras, consumíveis, materiais)
├─ enemies.js        → Bestiário completo (inimigos, bosses, mini-bosses)
├─ quests.js         → Missões por tier
├─ events.js         → Eventos de exploração
├─ npcs.js           → NPCs e seus diálogos
├─ professions.js    → Profissões e receitas
├─ talents.js        → Árvores de talentos
└─ index.js          → API Unificada
```

---

## 🔧 Como Usar

### Importação
```javascript
import { DB } from './database';
```

### Queries Comuns

#### Items (Itens)
```javascript
DB.items.getById('iron_sword');            // Buscar item específico
DB.items.getByType('Arma');                // Todos os itens de um tipo
DB.items.getByRarity('legendary');         // Itens lendários
DB.items.getWeapons();                     // Todas as armas
DB.items.search('espada');                 // Busca textual
```

#### Enemies (Inimigos)
```javascript
DB.enemies.getById('rat_catacombs');       // Inimigo específico
DB.enemies.getByLevel(3);                  // Inimigos de um nível
DB.enemies.getBosses();                    // Todos os bosses
DB.enemies.getRandom(5);                   // Inimigo aleatório até nível 5
```

#### Quests (Missões)
```javascript
DB.quests.getById('q1');                   // Missão específica
DB.quests.getByTier(1);                    // Missões de um tier
DB.quests.getAvailable(heroLevel, completedQuests); // Missões disponíveis
```

#### Events (Eventos)
```javascript
DB.events.getByFloor(1);                   // Eventos de um andar
DB.events.getRandom(1, 5);                 // Evento aleatório (andar 1, corredor 5)
```

#### NPCs
```javascript
DB.npcs.getById('griswold');               // NPC específico
DB.npcs.getByLocation('blacksmith_forge'); // NPCs de um local
DB.npcs.getQuestGivers();                  // NPCs que dão missões
```

#### Professions (Profissões)
```javascript
DB.professions.getById('alchemy');         // Profissão completa
DB.professions.getRecipe('alchemy', 'potion_small'); // Receita específica
```

#### Talents (Talentos)
```javascript
DB.talents.getTreeById('warrior');         // Árvore completa
DB.talents.getTalent('warrior', 'str_1');  // Talento específico
```

---

## 📋 Catálogos Disponíveis

### Items (200+ planejados)
- **Armas:** Espadas, Machados, Martelos, Arcos, Cajados
- **Armaduras:** Capacetes, Peitorais, Luvas, Botas, Escudos
- **Consumíveis:** Poções, Elixires, Pergaminhos
- **Materiais:** Carvão, Minérios, Couros, Gemas, Artefatos

### Enemies (8 atuais, 50+ planejados)
- **Normais:** Ratos, Acólitos, Lobos, Espectros
- **Mini-Bosses:** Cavaleiro Corrompido
- **Bosses:** Guardião da Nave

### Quests (12 atuais)
- **Tier 1:** 4 missões iniciantes
- **Tier 2:** 3 missões intermediárias
- **Tier 3:** 3 missões avançadas
- **Tier 4:** 2 missões elite

---

## 🚀 Vantagens

1. **Centralizado:** Um só lugar para gerenciar todos os dados.
2. **Type-Safe:** Estruturas consistentes em todo o jogo.
3. **Fácil Busca:** Funções helper otimizadas.
4. **Escalável:** Adicione novos itens/inimigos sem quebrar o código.
5. **Documentado:** Cada campo tem propósito claro.

---

## 📝 Próximos Passos

- [ ] Migrar imports dos componentes para usar `DB`
- [ ] Adicionar validação de dados (JSON Schema)
- [ ] Implementar persistência (LocalStorage/IndexedDB)
- [ ] Criar editor visual para o banco (GUI para adicionar itens)

