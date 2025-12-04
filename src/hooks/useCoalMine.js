import { useState, useEffect, useCallback } from 'react';

const UPGRADES = {
    pickaxe: {
        id: 'pickaxe',
        name: 'Picareta de Aço',
        description: 'Aumenta a quantidade de carvão extraída e desbloqueia veios profundos.',
        baseCost: 100,
        costMultiplier: 1.5,
        baseRate: 0.5,
        riskFactor: 0.0001, // Increases risk slightly
        icon: 'Hammer'
    },
    boots: {
        id: 'boots',
        name: 'Botas de Couro',
        description: 'Thomas corre mais rápido. Reduz o tempo parado por medo.',
        baseCost: 250,
        costMultiplier: 1.6,
        baseRate: 1.0,
        riskFactor: 0,
        icon: 'Footprints'
    },
    lamp: {
        id: 'lamp',
        name: 'Lampião a Óleo',
        description: 'Ilumina tesouros ocultos na escuridão.',
        baseCost: 500,
        costMultiplier: 1.8,
        baseRate: 2.5,
        lootChance: 0.005, // 0.5% chance per tick per level
        icon: 'Flame'
    }
};

const LOOT_TABLE = [
    { id: 'iron_ore', name: 'Minério de Ferro', chance: 0.5, type: 'Material' },
    { id: 'geode_common', name: 'Geodo Bruto', chance: 0.3, type: 'Material' },
    { id: 'gem_chip', name: 'Lasca de Rubi', chance: 0.15, type: 'Gem' },
    { id: 'fossil', name: 'Fóssil Antigo', chance: 0.05, type: 'Artifact' }
];

export const useCoalMine = (hero, setHero) => {
    const [miningState, setMiningState] = useState({
        status: 'ACTIVE', // ACTIVE, SCARED, BLOCKED
        statusMessage: '',
        coal: 0,
        maxCoal: 100,
        rate: 1.0,
        stash: [], // Array of items found
        upgrades: {
            pickaxe: 0,
            boots: 0,
            lamp: 0
        },
        lastUpdateTime: Date.now() // Timestamp para calcular tempo offline
    });

    // Calculate Rate
    const calculateRate = useCallback((currentUpgrades) => {
        let rate = 1.0;
        rate += currentUpgrades.pickaxe * UPGRADES.pickaxe.baseRate;
        rate += currentUpgrades.boots * UPGRADES.boots.baseRate;
        rate += currentUpgrades.lamp * UPGRADES.lamp.baseRate;
        return parseFloat(rate.toFixed(1));
    }, []);

    // Calculate Capacity
    const calculateCapacity = useCallback((currentUpgrades) => {
        return 100 + (currentUpgrades.pickaxe * 20);
    }, []);

    // Resolve Problems
    const resolveStatus = (type) => {
        if (type === 'SCARED') {
            // Cost: Small Gold bribe or just comfort (Free for now to keep flow, maybe time penalty?)
            // Let's add a small gold cost to "buy him a drink" to calm down
            const cost = 10;
            if (hero.gold >= cost) {
                setHero(prev => ({ ...prev, gold: prev.gold - cost }));
                setMiningState(prev => ({ ...prev, status: 'ACTIVE', statusMessage: '', lastUpdateTime: Date.now() }));
                return true;
            }
        } else if (type === 'BLOCKED') {
            // Cost: Moderate Gold for explosives/tools
            const cost = 50;
            if (hero.gold >= cost) {
                setHero(prev => ({ ...prev, gold: prev.gold - cost }));
                setMiningState(prev => ({ ...prev, status: 'ACTIVE', statusMessage: '', lastUpdateTime: Date.now() }));
                return true;
            }
        }
        return false;
    };

    // Função para processar mineração baseado em tempo decorrido
    const processMining = useCallback((timeElapsedMs) => {
        setMiningState(prev => {
            // 1. Check Status
            if (prev.status !== 'ACTIVE') {
                return { ...prev, lastUpdateTime: Date.now() };
            }

            // 2. Check Capacity
            if (prev.coal >= prev.maxCoal) {
                return { ...prev, lastUpdateTime: Date.now() };
            }

            // 3. Calcular quanto carvão foi minerado
            const secondsElapsed = timeElapsedMs / 1000;
            const coalMined = prev.rate * secondsElapsed;
            const newCoalAmount = Math.min(prev.maxCoal, prev.coal + coalMined);

            // 4. Roll for Risk (proporcional ao tempo)
            let newStatus = prev.status;
            let newStatusMessage = prev.statusMessage;
            const riskChance = (0.002 + (prev.upgrades.pickaxe * 0.0005)) * (timeElapsedMs / 100);
            
            if (Math.random() < riskChance) {
                const isCollapse = Math.random() > 0.7;
                newStatus = isCollapse ? 'BLOCKED' : 'SCARED';
                newStatusMessage = isCollapse 
                    ? "Um túnel desabou! A produção parou." 
                    : "Thomas ouviu sussurros e se escondeu.";
            }

            // 5. Roll for Loot (proporcional ao tempo)
            const lootChance = prev.upgrades.lamp * UPGRADES.lamp.lootChance * (timeElapsedMs / 100);
            let newStash = prev.stash;
            
            if (lootChance > 0) {
                const expectedLoots = Math.floor(lootChance);
                const fractionalChance = lootChance - expectedLoots;
                const totalLoots = expectedLoots + (Math.random() < fractionalChance ? 1 : 0);
                
                for (let i = 0; i < totalLoots; i++) {
                    const roll = Math.random();
                    let cumulative = 0;
                    let selectedItem = LOOT_TABLE[0];
                    
                    for (let item of LOOT_TABLE) {
                        cumulative += item.chance;
                        if (roll <= cumulative) {
                            selectedItem = item;
                            break;
                        }
                    }
                    
                    const existingIdx = newStash.findIndex(item => item.id === selectedItem.id);
                    if (existingIdx >= 0) {
                        newStash = [...newStash];
                        newStash[existingIdx].count++;
                    } else {
                        newStash = [...newStash, { ...selectedItem, count: 1 }];
                    }
                }
            }
            
            return {
                ...prev,
                coal: newCoalAmount,
                stash: newStash,
                status: newStatus,
                statusMessage: newStatusMessage,
                lastUpdateTime: Date.now()
            };
        });
    }, []);

    // Main Loop + Visibility API
    useEffect(() => {
        // Função de update regular (quando aba está ativa)
        const timer = setInterval(() => {
            if (!document.hidden) {
                processMining(100); // 100ms = 0.1s
            }
        }, 100);

        // Handler para quando usuário volta para a aba
        const handleVisibilityChange = () => {
            if (!document.hidden) {
                // Usuario voltou para a aba - processa tempo offline
                setMiningState(prev => {
                    const now = Date.now();
                    const timeElapsed = now - prev.lastUpdateTime;
                    
                    // Se passou tempo significativo (mais de 1 segundo)
                    if (timeElapsed > 1000) {
                        // Limitar tempo offline para evitar valores absurdos (máximo 4 horas)
                        const cappedTime = Math.min(timeElapsed, 4 * 60 * 60 * 1000);
                        
                        // Processar mineração offline
                        console.log(`[Coal Mine] Processando ${Math.floor(cappedTime / 1000)}s offline`);
                        
                        // Calcular progresso baseado no tempo
                        if (prev.status === 'ACTIVE' && prev.coal < prev.maxCoal) {
                            const secondsElapsed = cappedTime / 1000;
                            const coalMined = prev.rate * secondsElapsed;
                            const newCoalAmount = Math.min(prev.maxCoal, prev.coal + coalMined);
                            
                            console.log(`[Coal Mine] Carvão: ${Math.floor(prev.coal)} -> ${Math.floor(newCoalAmount)}`);
                            
                            return {
                                ...prev,
                                coal: newCoalAmount,
                                lastUpdateTime: now
                            };
                        }
                    }
                    
                    // Apenas atualiza timestamp se não processou nada
                    return { ...prev, lastUpdateTime: now };
                });
            } else {
                // Usuario saiu da aba - atualiza timestamp
                setMiningState(prev => ({ ...prev, lastUpdateTime: Date.now() }));
            }
        };

        // Registra listener
        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            clearInterval(timer);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [processMining]);

    const buyUpgrade = (upgradeId) => {
        const upgrade = UPGRADES[upgradeId];
        const currentLevel = miningState.upgrades[upgradeId];
        const cost = Math.floor(upgrade.baseCost * Math.pow(upgrade.costMultiplier, currentLevel));

        if (hero.gold >= cost) {
            setHero(prev => ({ ...prev, gold: prev.gold - cost }));
            setMiningState(prev => {
                const newUpgrades = { ...prev.upgrades, [upgradeId]: currentLevel + 1 };
                return {
                    ...prev,
                    rate: calculateRate(newUpgrades),
                    maxCoal: calculateCapacity(newUpgrades),
                    upgrades: newUpgrades,
                    lastUpdateTime: Date.now()
                };
            });
            return true;
        }
        return false;
    };

    // Collecting clears the mine buffer and returns data for the App to handle adding to inventory
    const collectResources = () => {
        const coalAmount = Math.floor(miningState.coal);
        const items = [...miningState.stash];
        
        if (coalAmount <= 0 && items.length === 0) return null;

        setMiningState(prev => ({ ...prev, coal: 0, stash: [], lastUpdateTime: Date.now() }));
        
        return {
            coal: coalAmount,
            items: items
        };
    };

    return {
        miningState,
        setMiningState, // Expõe para permitir restaurar save
        buyUpgrade,
        collectResources,
        resolveStatus,
        UPGRADES
    };
};
