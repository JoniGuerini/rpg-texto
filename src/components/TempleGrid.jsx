import React from 'react';
import { ROOM_TYPES, getRoomType } from '../data/templeRooms';
import { Check, ArrowUp, Swords, Lock, Eye, Flag } from 'lucide-react';

const TempleGrid = ({ 
    grid, 
    playerPosition,
    templeCompleted,
    onCellClick, 
    onCellHover, 
    onCellLeave,
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
                        const isPlayerHere = playerPosition.row === rowIndex && playerPosition.col === colIndex;
                        const isAccessible = cell.accessible;
                        const isRevealed = cell.revealed;
                        
                        // Fog of War Logic
                        // Se não revelada: Preto total
                        // Se revelada mas não acessível: Cinza escuro
                        // Se acessível: Cor normal
                        
                        let bgStyle = {};
                        if (isRevealed && cell.roomType !== 'empty') {
                            bgStyle = { backgroundColor: roomData?.color };
                        } else if (cell.roomType === 'empty' && isRevealed) {
                            bgStyle = { backgroundColor: '#000' };
                        } else {
                            bgStyle = { backgroundColor: '#0a0a0a' }; // Hidden
                        }

                        return (
                            <div
                                key={`${rowIndex}-${colIndex}`}
                                onClick={() => {
                                    if (isAccessible && cell.roomType !== 'empty') {
                                        onCellClick(rowIndex, colIndex);
                                    }
                                }}
                                onMouseEnter={() => onCellHover(rowIndex, colIndex)}
                                onMouseLeave={onCellLeave}
                                className={`
                                    relative w-16 h-16 border-2 rounded-lg flex flex-col items-center justify-center
                                    transition-all duration-200
                                    ${!isRevealed ? 'border-[#222] cursor-default' : 
                                      cell.roomType === 'empty' ? 'border-[#111] cursor-default' :
                                      isAccessible ? 'border-[#444] cursor-pointer hover:scale-105 hover:shadow-lg hover:border-[#c5a059]' : 
                                      'border-[#333] opacity-50 cursor-not-allowed'}
                                    
                                    ${isPlayerHere ? 'ring-2 ring-[#c5a059] shadow-[0_0_20px_rgba(197,160,89,0.5)] z-10' : ''}
                                    ${cell.completed ? 'opacity-80' : ''}
                                    ${cell.isBoss ? 'border-red-900' : ''}
                                `}
                                style={bgStyle}
                            >
                                {/* Conteúdo da Sala (só se revelado) */}
                                {isRevealed && cell.roomType !== 'empty' && (
                                    <>
                                        <div className="text-2xl">{roomData?.icon}</div>
                                        
                                        {/* Nível */}
                                        {cell.level > 0 && !cell.isEntrance && !cell.isBoss && (
                                            <div className="absolute top-1 right-1 w-5 h-5 bg-black/70 rounded-full flex items-center justify-center">
                                                <span className="text-[10px] font-bold text-[#c5a059]">
                                                    {cell.level}
                                                </span>
                                            </div>
                                        )}

                                        {/* Boss Marker */}
                                        {cell.isBoss && (
                                            <div className="absolute -top-2 -right-2 text-xl animate-bounce">
                                                👑
                                            </div>
                                        )}
                                    </>
                                )}

                                {/* Hidden Icon */}
                                {!isRevealed && (
                                    <div className="text-[#222]">
                                        ?
                                    </div>
                                )}

                                {/* Player Token */}
                                {isPlayerHere && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-8 h-8 bg-[#c5a059] rounded-full border-2 border-white shadow-lg flex items-center justify-center animate-pulse">
                                            <div className="w-2 h-2 bg-white rounded-full" />
                                        </div>
                                    </div>
                                )}

                                {/* Completada */}
                                {cell.completed && !isPlayerHere && (
                                    <div className="absolute inset-0 bg-black/30 rounded-lg flex items-center justify-center">
                                        <Check className="text-green-500 drop-shadow-md" size={24} />
                                    </div>
                                )}

                                {/* Acessível e Não Completada (Indicador de Combate) */}
                                {isAccessible && !cell.completed && !isPlayerHere && cell.roomType !== 'empty' && (
                                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2">
                                        <Swords size={12} className="text-red-400 animate-pulse" />
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

