import React from 'react';
import { ROOM_TYPES, getRoomType } from '../data/templeRooms';
import { Check, ArrowUp, Swords } from 'lucide-react';

const TempleGrid = ({ 
    grid, 
    selectedPoolIndex, 
    roomPool, 
    hoveredCell, 
    onCellClick, 
    onCellHover, 
    onCellLeave,
    getHoverPreview,
    GRID_SIZE 
}) => {
    return (
        <div className="flex justify-center items-center p-4">
            <div 
                className="grid gap-2"
                style={{
                    gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))`,
                    gridTemplateRows: `repeat(${GRID_SIZE}, minmax(0, 1fr))`
                }}
            >
                {grid.map((row, rowIndex) =>
                    row.map((cell, colIndex) => {
                        const roomData = getRoomType(cell.roomType);
                        const isHovered = hoveredCell?.row === rowIndex && hoveredCell?.col === colIndex;
                        const canPlace = selectedPoolIndex !== null && cell.roomType === 'empty';
                        const preview = isHovered && canPlace ? getHoverPreview(rowIndex, colIndex) : null;

                        return (
                            <div
                                key={`${rowIndex}-${colIndex}`}
                                onClick={() => {
                                    if (canPlace) {
                                        onCellClick(rowIndex, colIndex);
                                    } else if (cell.roomType !== 'empty' && !cell.isEntrance && !cell.completed) {
                                        onCellClick(rowIndex, colIndex);
                                    }
                                }}
                                onMouseEnter={() => onCellHover(rowIndex, colIndex)}
                                onMouseLeave={onCellLeave}
                                className={`
                                    relative w-16 h-16 border-2 rounded-lg flex flex-col items-center justify-center
                                    transition-all duration-200 cursor-pointer group
                                    ${cell.roomType === 'empty' 
                                        ? 'bg-[#1a1a1a] border-[#333]' 
                                        : 'border-[#444]'
                                    }
                                    ${canPlace && isHovered ? 'ring-2 ring-[#c5a059] scale-105' : ''}
                                    ${cell.completed ? 'opacity-70' : ''}
                                    ${cell.isEntrance ? 'border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.3)]' : ''}
                                    ${cell.roomType !== 'empty' && !cell.isEntrance && !cell.completed ? 'hover:scale-105 hover:shadow-lg' : ''}
                                `}
                                style={{
                                    backgroundColor: cell.roomType !== 'empty' ? roomData?.color : undefined
                                }}
                            >
                                {/* Ícone da Sala */}
                                <div className="text-2xl">{roomData?.icon}</div>

                                {/* Nível da Sala */}
                                {cell.level > 0 && !cell.isEntrance && (
                                    <div className="absolute top-1 right-1 w-5 h-5 bg-black/70 rounded-full flex items-center justify-center">
                                        <span className="text-[10px] font-bold text-[#c5a059]">
                                            {preview ? preview.level : cell.level}
                                        </span>
                                    </div>
                                )}

                                {/* Completada */}
                                {cell.completed && (
                                    <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                                        <Check className="text-green-500" size={24} />
                                    </div>
                                )}

                                {/* Indicador de Explorar (salas não completadas) */}
                                {cell.roomType !== 'empty' && !cell.isEntrance && !cell.completed && !canPlace && (
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-red-900/20 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                                        <Swords className="text-red-500" size={20} />
                                    </div>
                                )}

                                {/* Preview de Colocação */}
                                {isHovered && canPlace && selectedPoolIndex !== null && (
                                    <div className="absolute inset-0 bg-[#c5a059]/20 rounded-lg border-2 border-[#c5a059] flex items-center justify-center">
                                        <div className="text-2xl">
                                            {getRoomType(roomPool[selectedPoolIndex])?.icon}
                                        </div>
                                    </div>
                                )}

                                {/* Indicador de Boost Recebido */}
                                {preview && preview.affected.length > 0 && (
                                    <div className="absolute -top-2 left-1/2 -translate-x-1/2">
                                        <ArrowUp className="text-green-400 animate-bounce" size={16} />
                                    </div>
                                )}
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default TempleGrid;

