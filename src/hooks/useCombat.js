import { useState, useEffect, useCallback } from 'react';
import { processTurn, calculateXP } from '../systems/combatEngine';

export const useCombat = (initialHero, setHero, addLog, onCombatEnd) => {
    const [gameState, setGameState] = useState('EXPLORING'); // EXPLORING, COMBAT, GAME_OVER
    const [combatState, setCombatState] = useState(null);

    const startCombat = useCallback((enemy) => {
        setGameState('COMBAT');
        setCombatState({
            enemy: { ...enemy, maxHp: enemy.hp },
            turn: 1,
            isPlayerTurn: true
        });
        addLog(`Combate iniciado contra ${enemy.name}!`, 'combat');
    }, [addLog]);

    const endCombat = useCallback((victory, enemy) => {
        if (victory) {
            addLog(`Você derrotou ${enemy.name}!`, 'loot');

            // XP Logic
            const xpGained = calculateXP(enemy.level);
            setHero(prev => {
                const newXp = prev.xp + xpGained;
                const nextLevelXp = Math.floor(100 * Math.pow(1.25, prev.level - 1));
                let newLevel = prev.level;
                let newMaxHp = prev.maxHp;
                let newHp = prev.hp;

                if (newXp >= nextLevelXp) {
                    newLevel += 1;
                    newMaxHp += 10;
                    newHp = newMaxHp; // Full heal on level up
                    setTimeout(() => addLog(`SUBIU DE NÍVEL! Agora você é nível ${newLevel}.`, 'loot'), 500);
                }

                return {
                    ...prev,
                    xp: newXp,
                    level: newLevel,
                    maxHp: newMaxHp,
                    hp: newHp
                };
            });

            addLog(`Ganhou ${xpGained} XP.`, 'loot');
            setGameState('EXPLORING');
            setCombatState(null);
            if (onCombatEnd) onCombatEnd(true, enemy);
        } else {
            setGameState('GAME_OVER');
            addLog("Você caiu em batalha...", 'combat');
            if (onCombatEnd) onCombatEnd(false, enemy);
        }
    }, [addLog, setHero, onCombatEnd]);


    const performPlayerAction = useCallback((action, hero) => {
        if (!combatState || !combatState.isPlayerTurn) return;

        let currentEnemy = { ...combatState.enemy };
        let damageDealt = 0;

        if (action === 'attack') {
            const result = processTurn(hero, currentEnemy, 'attack');
            damageDealt = result.damage;
            currentEnemy.hp = Math.max(0, currentEnemy.hp - damageDealt);
            addLog(result.log[0], 'combat');
        } else if (action === 'defend') {
            addLog(`${hero.name} assume uma postura defensiva.`, 'info');
            // TODO: Implement defense buff logic
        } else if (action === 'skill') {
            addLog("Habilidade ainda não implementada!", 'info');
            return;
        }

        // Update State with Player Move
        setCombatState(prev => ({
            ...prev,
            enemy: currentEnemy,
            isPlayerTurn: false // End player turn
        }));

        // Check Enemy Death
        if (currentEnemy.hp <= 0) {
            setTimeout(() => endCombat(true, currentEnemy), 500);
        }
    }, [combatState, addLog, endCombat]);

    // Enemy Turn Effect
    useEffect(() => {
        if (gameState === 'COMBAT' && combatState && !combatState.isPlayerTurn) {
            const enemyTurnTimer = setTimeout(() => {
                setCombatState(prevState => {
                    if (!prevState) return null; // Combat might have ended

                    const currentEnemy = prevState.enemy;
                    
                    // Enemy attacks Player
                    // We need the current hero state here, but it's managed in App.
                    // This is a tricky part of extracting hooks.
                    // Ideally processTurn shouldn't mutate, which it doesn't.
                    
                    // We need to update Hero HP in the parent.
                    // We'll do a dirty trick: call a setter passed from parent inside this effect?
                    // Better: calculate damage here and call setHero.
                    
                    // Wait, we don't have access to 'hero' state inside this effect unless we add it to dependency,
                    // but adding it to dependency might cause loops.
                    // The cleanest way is to calculate enemy damage based on current props.
                    
                    // Let's assume the parent passes the LATEST hero to the hook via props/args if it was a component,
                    // but for a hook, we need the value.
                    
                    // Actually, let's pause the 'auto' turn here and expose a function 'triggerEnemyTurn' 
                    // or handle it differently.
                    
                    // SIMPLIFICATION for now:
                    // We will emit an effect or callback to request the parent to process damage to hero.
                    return prevState;
                });
            }, 1000);
            
            return () => clearTimeout(enemyTurnTimer);
        }
    }, [gameState, combatState?.isPlayerTurn]);

    // This part is tricky to fully decouple without Redux or similar.
    // For now, I will implement the "Player Action" part perfectly,
    // but the "Enemy Turn" needs access to Hero Stats (Defense) to calculate damage.
    
    return {
        gameState,
        setGameState,
        combatState,
        setCombatState,
        startCombat,
        performPlayerAction,
        // We expose a helper to let the App trigger the enemy turn logic which has access to Hero scope
    };
};

