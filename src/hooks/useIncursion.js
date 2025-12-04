import { useState, useCallback } from 'react';
import { ROOM_TYPES } from '../data/templeRooms';

// Gera monstros baseado no tipo e nível da sala
const generateMonstersForRoom = (roomType, level) => {
    const roomData = ROOM_TYPES[roomType];
    if (!roomData || !roomData.levelEffects[level]) {
        return [];
    }

    const effects = roomData.levelEffects[level];
    const quantity = effects.quantity || effects.monsters || 1;
    const difficulty = effects.difficulty || level;

    // Base stats por dificuldade
    const baseStats = {
        1: { hp: 80, atk: 8, def: 3, gold: 15, xp: 20 },
        2: { hp: 150, atk: 15, def: 6, gold: 30, xp: 50 },
        3: { hp: 250, atk: 25, def: 10, gold: 60, xp: 100 },
        4: { hp: 400, atk: 35, def: 15, gold: 100, xp: 180 },
        5: { hp: 650, atk: 50, def: 20, gold: 200, xp: 350 }
    };

    const stats = baseStats[difficulty] || baseStats[1];
    const monsters = [];

    for (let i = 0; i < quantity; i++) {
        monsters.push({
            id: `${roomType}_${level}_${i}`,
            name: effects.monsters || `Inimigo Vaal Nv${level}`,
            ...stats,
            maxHp: stats.hp
        });
    }

    return monsters;
};

// Gera loot baseado no tipo de sala
const generateLootForRoom = (roomType, level) => {
    const roomData = ROOM_TYPES[roomType];
    if (!roomData) return { gold: 0, items: [] };

    const baseGold = level * 50;
    const loot = {
        gold: baseGold,
        items: []
    };

    // Loot específico por categoria
    if (roomData.category === 'combat') {
        loot.gold = baseGold * 1.5;
        if (level === 3) {
            loot.items.push({ 
                id: 'iron_ingot', 
                name: 'Barra de Ferro', 
                count: 2 
            });
        }
    } else if (roomData.category === 'economy') {
        loot.gold = baseGold * 2;
        if (roomData.id === 'treasury' && level === 3) {
            loot.gold *= 3; // Triple gold
        }
    } else if (roomData.category === 'crafting') {
        loot.items.push({ 
            id: 'coal', 
            name: 'Carvão', 
            count: level * 3 
        });
    }

    return loot;
};

export const useIncursion = () => {
    const [incursionActive, setIncursionActive] = useState(false);
    const [currentRoom, setCurrentRoom] = useState(null);
    const [monsters, setMonsters] = useState([]);
    const [currentMonsterIndex, setCurrentMonsterIndex] = useState(0);
    const [incursionTimeRemaining, setIncursionTimeRemaining] = useState(15); // 15 segundos por incursão
    const [lootCollected, setLootCollected] = useState(null);

    // Inicia uma incursão em uma sala específica
    const startIncursion = useCallback((roomType, level, row, col) => {
        const roomData = ROOM_TYPES[roomType];
        const generatedMonsters = generateMonstersForRoom(roomType, level);

        setCurrentRoom({ roomType, level, row, col, data: roomData });
        setMonsters(generatedMonsters);
        setCurrentMonsterIndex(0);
        setIncursionTimeRemaining(15);
        setIncursionActive(true);
        setLootCollected(null);
    }, []);

    // Aplica dano a um monstro
    const damageMonster = useCallback((damage) => {
        setMonsters(prev => {
            const newMonsters = [...prev];
            if (newMonsters[currentMonsterIndex]) {
                newMonsters[currentMonsterIndex] = {
                    ...newMonsters[currentMonsterIndex],
                    hp: Math.max(0, newMonsters[currentMonsterIndex].hp - damage)
                };
            }
            return newMonsters;
        });
    }, [currentMonsterIndex]);

    // Mata monstro atual e avança
    const defeatCurrentMonster = useCallback(() => {
        if (currentMonsterIndex < monsters.length - 1) {
            setCurrentMonsterIndex(prev => prev + 1);
            return { continue: true };
        } else {
            // Último monstro derrotado - gerar loot
            const loot = generateLootForRoom(currentRoom.roomType, currentRoom.level);
            setLootCollected(loot);
            return { continue: false, loot };
        }
    }, [currentMonsterIndex, monsters.length, currentRoom]);

    // Finaliza incursão
    const endIncursion = useCallback(() => {
        setIncursionActive(false);
        const completedRoom = currentRoom;
        setCurrentRoom(null);
        setMonsters([]);
        setCurrentMonsterIndex(0);
        setLootCollected(null);
        return completedRoom;
    }, [currentRoom]);

    // Pula incursão (sem completar)
    const skipIncursion = useCallback(() => {
        setIncursionActive(false);
        setCurrentRoom(null);
        setMonsters([]);
        setCurrentMonsterIndex(0);
        setLootCollected(null);
    }, []);

    const getCurrentMonster = useCallback(() => {
        return monsters[currentMonsterIndex] || null;
    }, [monsters, currentMonsterIndex]);

    return {
        incursionActive,
        currentRoom,
        monsters,
        currentMonster: getCurrentMonster(),
        incursionTimeRemaining,
        lootCollected,
        startIncursion,
        damageMonster,
        defeatCurrentMonster,
        endIncursion,
        skipIncursion,
        setIncursionTimeRemaining
    };
};

