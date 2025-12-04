import { useState, useCallback } from 'react';
import { QUEST_DATA, INITIAL_QUEST_STATE } from '../data/quests';

export const useQuests = (hero, setHero, addLog, setInventory) => {
    const [questState, setQuestState] = useState(INITIAL_QUEST_STATE);

    const acceptQuest = useCallback((questId) => {
        if (questState.active.includes(questId) || questState.completed.includes(questId)) return;

        setQuestState(prev => ({
            ...prev,
            active: [...prev.active, questId],
            progress: { ...prev.progress, [questId]: 0 }
        }));

        const quest = QUEST_DATA[questId];
        addLog(`Nova Missão Aceita: ${quest.title}`, 'story');
    }, [questState, addLog]);

    const completeQuest = useCallback((questId) => {
        const quest = QUEST_DATA[questId];
        if (!quest) return;

        // Give Rewards
        addLog(`Missão Completa: ${quest.title}!`, 'success'); // 'success' type might need styling
        
        if (quest.reward.xp) {
            setHero(prev => ({ ...prev, xp: prev.xp + quest.reward.xp }));
            addLog(`Ganhou ${quest.reward.xp} XP.`, 'loot');
        }
        if (quest.reward.gold) {
            setHero(prev => ({ ...prev, gold: prev.gold + quest.reward.gold }));
            addLog(`Ganhou ${quest.reward.gold} Ouro.`, 'loot');
        }
        if (quest.reward.item) {
            setInventory(prev => [...prev, { item: quest.reward.item, count: 1 }]);
            addLog(`Recebeu item: ${quest.reward.item.name}`, 'loot');
        }

        setQuestState(prev => ({
            ...prev,
            active: prev.active.filter(id => id !== questId),
            completed: [...prev.completed, questId]
        }));

    }, [addLog, setHero, setInventory]);

    const updateQuestProgress = useCallback((type, targetName, amount = 1) => {
        setQuestState(prev => {
            const newState = { ...prev };
            let hasUpdates = false;

            prev.active.forEach(questId => {
                const quest = QUEST_DATA[questId];
                if (quest.type === type && quest.target === targetName) {
                    const currentProgress = prev.progress[questId] || 0;
                    if (currentProgress < quest.amountRequired) {
                        const newProgress = Math.min(quest.amountRequired, currentProgress + amount);
                        newState.progress = { ...newState.progress, [questId]: newProgress };
                        hasUpdates = true;

                        // Check completion
                        if (newProgress >= quest.amountRequired) {
                            // We can't call completeQuest here directly because it causes side effects 
                            // inside a state setter (bad practice).
                            // We'll trigger it via a separate effect or just check it in render/UI.
                            // Ideally, we return the ID to complete it outside.
                            // For now, let's just update progress and let the UI show "COMPLETO - Clique para Entregar"
                            // OR auto-complete via useEffect.
                            addLog(`Progresso da missão '${quest.title}': ${newProgress}/${quest.amountRequired}`, 'info');
                        }
                    }
                }
            });

            return hasUpdates ? newState : prev;
        });
    }, [addLog]);

    // Helper to check and claim completed quests
    const checkAndClaim = useCallback(() => {
        questState.active.forEach(questId => {
            const quest = QUEST_DATA[questId];
            const progress = questState.progress[questId] || 0;
            if (progress >= quest.amountRequired) {
                completeQuest(questId);
            }
        });
    }, [questState, completeQuest]);

    return {
        questState,
        acceptQuest,
        updateQuestProgress,
        checkAndClaim // Call this periodically or on UI open
    };
};

