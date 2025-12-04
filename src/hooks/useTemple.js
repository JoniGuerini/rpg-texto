import { useState, useCallback } from 'react';
import { ROOM_TYPES, AVAILABLE_ROOM_POOL } from '../data/templeRooms';

const GRID_SIZE = 7;

// Inicializa grid vazio
const createEmptyGrid = () => {
    const grid = [];
    for (let row = 0; row < GRID_SIZE; row++) {
        grid[row] = [];
        for (let col = 0; col < GRID_SIZE; col++) {
            grid[row][col] = {
                roomType: 'empty',
                level: 0,
                completed: false
            };
        }
    }
    // Entrada no meio embaixo
    const entranceRow = GRID_SIZE - 1;
    const entranceCol = Math.floor(GRID_SIZE / 2);
    grid[entranceRow][entranceCol] = {
        roomType: 'entrance',
        level: 1,
        completed: false,
        isEntrance: true
    };
    return grid;
};

// Gera pool de 6 salas aleatórias
const generateRoomPool = () => {
    const pool = [];
    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * AVAILABLE_ROOM_POOL.length);
        pool.push(AVAILABLE_ROOM_POOL[randomIndex]);
    }
    return pool;
};

// Calcula adjacências (vizinhos em cruz: cima, baixo, esquerda, direita)
const getNeighbors = (grid, row, col) => {
    const neighbors = [];
    const directions = [
        { dr: -1, dc: 0, dir: 'up' },
        { dr: 1, dc: 0, dir: 'down' },
        { dr: 0, dc: -1, dir: 'left' },
        { dr: 0, dc: 1, dir: 'right' }
    ];

    directions.forEach(({ dr, dc, dir }) => {
        const newRow = row + dr;
        const newCol = col + dc;
        if (newRow >= 0 && newRow < GRID_SIZE && newCol >= 0 && newCol < GRID_SIZE) {
            neighbors.push({
                row: newRow,
                col: newCol,
                cell: grid[newRow][newCol],
                direction: dir
            });
        }
    });

    return neighbors;
};

// Calcula o nível que uma sala terá baseado em adjacências
const calculateRoomLevel = (grid, row, col, newRoomType) => {
    const neighbors = getNeighbors(grid, row, col);
    const roomData = ROOM_TYPES[newRoomType];
    
    if (!roomData || !roomData.adjacencyBonus) return 1;

    let baseLevel = 1;
    const boostersReceived = roomData.adjacencyBonus.receivesFrom || [];

    // Verifica quantos vizinhos dão boost para esta sala
    let boostCount = 0;
    neighbors.forEach(neighbor => {
        if (boostersReceived.includes(neighbor.cell.roomType)) {
            boostCount += neighbor.cell.level || 1;
        }
    });

    // Nível = 1 + boosts (máximo 3)
    const finalLevel = Math.min(3, baseLevel + boostCount);
    return finalLevel;
};

// Calcula preview de quais salas serão afetadas
const getAdjacencyPreview = (grid, row, col, newRoomType) => {
    const neighbors = getNeighbors(grid, row, col);
    const roomData = ROOM_TYPES[newRoomType];
    const affected = [];

    if (!roomData || !roomData.adjacencyBonus) return affected;

    const givesBoostTo = roomData.adjacencyBonus.givesTo || [];

    neighbors.forEach(neighbor => {
        // Esta nova sala dá boost para o vizinho?
        if (givesBoostTo.includes(neighbor.cell.roomType)) {
            const currentLevel = neighbor.cell.level || 1;
            const newLevel = Math.min(3, currentLevel + 1);
            if (newLevel > currentLevel) {
                affected.push({
                    row: neighbor.row,
                    col: neighbor.col,
                    roomType: neighbor.cell.roomType,
                    oldLevel: currentLevel,
                    newLevel: newLevel
                });
            }
        }
    });

    return affected;
};

export const useTemple = () => {
    const [templeGrid, setTempleGrid] = useState(createEmptyGrid());
    const [roomPool, setRoomPool] = useState(generateRoomPool());
    const [incursionsRemaining, setIncursionsRemaining] = useState(11); // 11 incursões para construir
    const [selectedPoolIndex, setSelectedPoolIndex] = useState(null);
    const [hoveredCell, setHoveredCell] = useState(null);
    const [templeCompleted, setTempleCompleted] = useState(false);

    // Coloca uma sala no grid
    const placeRoom = useCallback((row, col, roomTypeFromPool) => {
        setTempleGrid(prevGrid => {
            const newGrid = prevGrid.map(r => r.map(c => ({ ...c })));
            
            // Calcula nível baseado em adjacências
            const level = calculateRoomLevel(newGrid, row, col, roomTypeFromPool);
            
            // Coloca a nova sala
            newGrid[row][col] = {
                roomType: roomTypeFromPool,
                level: level,
                completed: false
            };

            // Aplica boosts aos vizinhos
            const affected = getAdjacencyPreview(prevGrid, row, col, roomTypeFromPool);
            affected.forEach(({ row: affectedRow, col: affectedCol, newLevel }) => {
                newGrid[affectedRow][affectedCol].level = newLevel;
            });

            return newGrid;
        });

        // Remove sala usada do pool e gera nova
        setRoomPool(prev => {
            const newPool = [...prev];
            newPool[selectedPoolIndex] = AVAILABLE_ROOM_POOL[
                Math.floor(Math.random() * AVAILABLE_ROOM_POOL.length)
            ];
            return newPool;
        });

        setSelectedPoolIndex(null);
        setIncursionsRemaining(prev => prev - 1);

        // Verifica se completou todas as incursões
        if (incursionsRemaining - 1 <= 0) {
            setTempleCompleted(true);
        }
    }, [selectedPoolIndex, incursionsRemaining]);

    // Preview de adjacência ao hover
    const getHoverPreview = useCallback((row, col) => {
        if (selectedPoolIndex === null) return null;
        
        const roomType = roomPool[selectedPoolIndex];
        const level = calculateRoomLevel(templeGrid, row, col, roomType);
        const affected = getAdjacencyPreview(templeGrid, row, col, roomType);

        return { level, affected };
    }, [selectedPoolIndex, roomPool, templeGrid]);

    // Marca sala como completada (após incursão)
    const completeRoom = useCallback((row, col) => {
        setTempleGrid(prevGrid => {
            const newGrid = prevGrid.map(r => r.map(c => ({ ...c })));
            newGrid[row][col].completed = true;
            return newGrid;
        });
    }, []);

    // Reset do templo (nova construção)
    const resetTemple = useCallback(() => {
        setTempleGrid(createEmptyGrid());
        setRoomPool(generateRoomPool());
        setIncursionsRemaining(11);
        setSelectedPoolIndex(null);
        setHoveredCell(null);
        setTempleCompleted(false);
    }, []);

    return {
        templeGrid,
        roomPool,
        incursionsRemaining,
        selectedPoolIndex,
        hoveredCell,
        templeCompleted,
        setSelectedPoolIndex,
        setHoveredCell,
        placeRoom,
        getHoverPreview,
        completeRoom,
        resetTemple,
        GRID_SIZE
    };
};

