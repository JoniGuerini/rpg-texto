import { useState, useCallback } from 'react';
import { ROOM_TYPES, AVAILABLE_ROOM_POOL, getRoomType } from '../data/templeRooms';

const GRID_SIZE = 7;

// Gera um dungeon procedural com caminho garantido
const generateDungeon = () => {
    const grid = [];
    // 1. Inicializa grid vazio
    for (let row = 0; row < GRID_SIZE; row++) {
        grid[row] = [];
        for (let col = 0; col < GRID_SIZE; col++) {
            grid[row][col] = {
                roomType: 'empty',
                level: 0,
                completed: false,
                revealed: false, // Fog of War
                accessible: false // Se pode mover para lá
            };
        }
    }

    // 2. Define Entrada (Embaixo) e Boss (Topo)
    const entranceRow = GRID_SIZE - 1;
    const entranceCol = Math.floor(GRID_SIZE / 2);
    
    const bossRow = 0;
    const bossCol = Math.floor(GRID_SIZE / 2); // Pode ser aleatório no topo depois

    // 3. Gera caminho aleatório (Random Walk)
    let currentRow = entranceRow;
    let currentCol = entranceCol;
    const path = [`${currentRow},${currentCol}`];

    while (currentRow > bossRow) {
        // Decide próximo passo: Cima, Esquerda ou Direita (mas sempre tendendo a subir)
        // 60% Cima, 20% Esq, 20% Dir
        const rand = Math.random();
        let nextRow = currentRow;
        let nextCol = currentCol;

        if (rand < 0.6) {
            nextRow--; // Cima
        } else if (rand < 0.8 && currentCol > 0) {
            nextCol--; // Esquerda
        } else if (currentCol < GRID_SIZE - 1) {
            nextCol++; // Direita
        } else {
            nextRow--; // Força subir se não der pra ir pros lados
        }

        // Evita voltar para casas já visitadas no path (simples)
        if (!path.includes(`${nextRow},${nextCol}`)) {
            currentRow = nextRow;
            currentCol = nextCol;
            path.push(`${currentRow},${currentCol}`);
        } else {
            // Se travou, força subir
            currentRow--;
            path.push(`${currentRow},${currentCol}`);
        }
    }

    // 4. Preenche o grid baseado no caminho
    for (let row = 0; row < GRID_SIZE; row++) {
        for (let col = 0; col < GRID_SIZE; col++) {
            // Se é entrada
            if (row === entranceRow && col === entranceCol) {
                grid[row][col] = {
                    roomType: 'entrance',
                    level: 1,
                    completed: true, // Já começa "completada" para permitir movimento
                    revealed: true,
                    accessible: true,
                    isEntrance: true
                };
                continue;
            }

            // Se é Boss (último do path ou posição fixa)
            if (row === bossRow && col === bossCol) { // Simplificando: Boss fixo no meio topo
                grid[row][col] = {
                    roomType: 'BOSS', // Novo tipo necessário em ROOM_TYPES
                    level: 3,
                    completed: false,
                    revealed: false,
                    accessible: false,
                    isBoss: true
                };
                continue;
            }

            // Resto das salas: Aleatórias do Pool
            const randomRoom = AVAILABLE_ROOM_POOL[Math.floor(Math.random() * AVAILABLE_ROOM_POOL.length)];
            // Nível aleatório (1 a 3), com chance menor para níveis altos
            const randLevel = Math.random();
            const level = randLevel > 0.9 ? 3 : randLevel > 0.6 ? 2 : 1;

            // Se está no caminho crítico, garante que não é 'empty'
            // Se não está, tem chance de ser 'empty' (buraco)
            const isPath = path.includes(`${row},${col}`);
            const isRoom = isPath || Math.random() > 0.3; // 30% de chance de buraco fora do caminho

            grid[row][col] = {
                roomType: isRoom ? randomRoom : 'empty',
                level: isRoom ? level : 0,
                completed: false,
                revealed: false,
                accessible: false
            };
        }
    }

    // Revela adjacentes à entrada
    updateAccessibility(grid, entranceRow, entranceCol);

    return { grid, entrancePos: { row: entranceRow, col: entranceCol } };
};

// Atualiza quais salas são acessíveis a partir da posição atual
const updateAccessibility = (grid, playerRow, playerCol) => {
    // Reseta acessibilidade (opcional, dependendo se queremos histórico ou apenas atual)
    // Vamos manter histórico: se já foi acessível, continua.
    
    const directions = [
        { dr: -1, dc: 0 }, // Cima
        { dr: 1, dc: 0 },  // Baixo
        { dr: 0, dc: -1 }, // Esquerda
        { dr: 0, dc: 1 }   // Direita
    ];

    directions.forEach(({ dr, dc }) => {
        const newRow = playerRow + dr;
        const newCol = playerCol + dc;

        if (newRow >= 0 && newRow < GRID_SIZE && newCol >= 0 && newCol < GRID_SIZE) {
            const targetCell = grid[newRow][newCol];
            // Só revela se não for buraco (empty)
            if (targetCell.roomType !== 'empty') {
                targetCell.revealed = true;
                targetCell.accessible = true;
            }
        }
    });
};

export const useTemple = () => {
    const [dungeonData, setDungeonData] = useState(generateDungeon());
    const [playerPosition, setPlayerPosition] = useState(dungeonData.entrancePos);
    const [templeCompleted, setTempleCompleted] = useState(false);
    const [floor, setFloor] = useState(1); // Andar do templo

    // Move o jogador para uma sala (inicia combate se não completada)
    // Retorna true se iniciou combate, false se apenas moveu
    const moveToRoom = useCallback((row, col) => {
        const grid = dungeonData.grid;
        const cell = grid[row][col];

        if (!cell.accessible) return false; // Não pode mover para lá

        setPlayerPosition({ row, col });
        
        // Atualiza revelação de mapa
        setDungeonData(prev => {
            const newGrid = prev.grid.map(r => r.map(c => ({ ...c })));
            updateAccessibility(newGrid, row, col);
            return { ...prev, grid: newGrid };
        });

        return !cell.completed; // Se não completada, inicia combate
    }, [dungeonData]);

    // Marca sala atual como completada
    const completeCurrentRoom = useCallback(() => {
        setDungeonData(prev => {
            const newGrid = prev.grid.map(r => r.map(c => ({ ...c })));
            const { row, col } = playerPosition;
            newGrid[row][col].completed = true;
            
            // Se era Boss, completa o templo
            if (newGrid[row][col].isBoss) {
                setTempleCompleted(true);
            }

            return { ...prev, grid: newGrid };
        });
    }, [playerPosition]);

    // Avança para o próximo andar (novo dungeon)
    const nextFloor = useCallback(() => {
        setFloor(prev => prev + 1);
        const newData = generateDungeon();
        setDungeonData(newData);
        setPlayerPosition(newData.entrancePos);
        setTempleCompleted(false);
    }, []);

    // Reset completo
    const resetTemple = useCallback(() => {
        setFloor(1);
        const newData = generateDungeon();
        setDungeonData(newData);
        setPlayerPosition(newData.entrancePos);
        setTempleCompleted(false);
    }, []);

    return {
        templeGrid: dungeonData.grid,
        playerPosition,
        templeCompleted,
        floor,
        moveToRoom,
        completeCurrentRoom,
        nextFloor,
        resetTemple,
        GRID_SIZE
    };
};
