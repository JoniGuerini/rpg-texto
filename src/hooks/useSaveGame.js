import { useEffect, useCallback } from 'react';

const SAVE_KEY = 'rpg-texto-dg-save';
const SAVE_VERSION = '1.0';

export const useSaveGame = (gameState) => {
    // Auto-save game state
    const saveGame = useCallback(() => {
        try {
            const saveData = {
                version: SAVE_VERSION,
                timestamp: new Date().toISOString(),
                ...gameState
            };
            localStorage.setItem(SAVE_KEY, JSON.stringify(saveData));
            console.log('[SAVE] Jogo salvo com sucesso:', new Date().toLocaleTimeString());
            return true;
        } catch (error) {
            console.error('[SAVE ERROR] Falha ao salvar:', error);
            return false;
        }
    }, [gameState]);

    // Load saved game
    const loadGame = useCallback(() => {
        try {
            const savedData = localStorage.getItem(SAVE_KEY);
            if (!savedData) {
                console.log('[LOAD] Nenhum save encontrado');
                return null;
            }

            const parsedData = JSON.parse(savedData);
            console.log('[LOAD] Save carregado:', parsedData.timestamp);
            return parsedData;
        } catch (error) {
            console.error('[LOAD ERROR] Falha ao carregar save:', error);
            return null;
        }
    }, []);

    // Delete saved game
    const deleteSave = useCallback(() => {
        try {
            localStorage.removeItem(SAVE_KEY);
            console.log('[DELETE] Save deletado com sucesso');
            return true;
        } catch (error) {
            console.error('[DELETE ERROR] Falha ao deletar save:', error);
            return false;
        }
    }, []);

    // Check if save exists
    const hasSave = useCallback(() => {
        return localStorage.getItem(SAVE_KEY) !== null;
    }, []);

    // Auto-save every 30 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            saveGame();
        }, 30000); // 30 seconds

        return () => clearInterval(interval);
    }, [saveGame]);

    // Save on page unload
    useEffect(() => {
        const handleBeforeUnload = () => {
            saveGame();
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [saveGame]);

    return {
        saveGame,
        loadGame,
        deleteSave,
        hasSave
    };
};


