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
    { id: 'geode_common', name: 'Geodo Bruto', chance: 0.6, type: 'Material' },
    { id: 'gem_chip', name: 'Lasca de Rubi', chance: 0.3, type: 'Gem' },
    { id: 'fossil', name: 'Fóssil Antigo', chance: 0.1, type: 'Artifact' }
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
        }
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
                setMiningState(prev => ({ ...prev, status: 'ACTIVE', statusMessage: '' }));
                return true;
            }
        } else if (type === 'BLOCKED') {
            // Cost: Moderate Gold for explosives/tools
            const cost = 50;
            if (hero.gold >= cost) {
                setHero(prev => ({ ...prev, gold: prev.gold - cost }));
                setMiningState(prev => ({ ...prev, status: 'ACTIVE', statusMessage: '' }));
                return true;
            }
        }
        return false;
    };

    // Main Loop
    useEffect(() => {
        const timer = setInterval(() => {
            setMiningState(prev => {
                // 1. Check Status
                if (prev.status !== 'ACTIVE') return prev;

                // 2. Check Capacity
                if (prev.coal >= prev.maxCoal) return prev;

                // 3. Roll for Risk (Random Event)
                // Base risk + depth risk
                const riskChance = 0.002 + (prev.upgrades.pickaxe * 0.0005); 
                if (Math.random() < riskChance) {
                    const isCollapse = Math.random() > 0.7; // 30% chance of collapse vs fear
                    return {
                        ...prev,
                        status: isCollapse ? 'BLOCKED' : 'SCARED',
                        statusMessage: isCollapse 
                            ? "Um túnel desabou! A produção parou." 
                            : "Thomas ouviu sussurros e se escondeu."
                    };
                }

                // 4. Roll for Loot (Passive Treasure)
                const lootChance = prev.upgrades.lamp * UPGRADES.lamp.lootChance;
                let newStash = prev.stash;
                
                if (lootChance > 0 && Math.random() < lootChance) {
                    // Pick item
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
                    
                    // Add to stash (consolidate stacks)
                    const existingIdx = newStash.findIndex(i => i.id === selectedItem.id);
                    if (existingIdx >= 0) {
                        newStash = [...prev.stash];
                        newStash[existingIdx].count++;
                    } else {
                        newStash = [...prev.stash, { ...selectedItem, count: 1 }];
                    }
                }

                // 5. Increment Coal
                const newAmount = Math.min(prev.maxCoal, prev.coal + (prev.rate / 10));
                
                return {
                    ...prev,
                    coal: newAmount,
                    stash: newStash
                };
            });
        }, 100);

        return () => clearInterval(timer);
    }, []);

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
                    upgrades: newUpgrades
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

        setMiningState(prev => ({ ...prev, coal: 0, stash: [] }));
        
        return {
            coal: coalAmount,
            items: items
        };
    };

    return {
        miningState,
        buyUpgrade,
        collectResources,
        resolveStatus,
        UPGRADES
    };
};
