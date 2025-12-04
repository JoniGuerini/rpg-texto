import { useState, useCallback } from 'react';

const INVENTORY_SLOTS = 20;
const STASH_SLOTS = 40;

export const useInventory = (initialItems = []) => {
    const initGrid = (size, items) => {
        const grid = Array(size).fill(null);
        items.forEach((itemData, i) => {
            if (i < size) grid[i] = itemData;
        });
        return grid;
    };

    const [inventory, setInventory] = useState(initGrid(INVENTORY_SLOTS, initialItems));
    const [stash, setStash] = useState(Array(STASH_SLOTS).fill(null));

    const addItem = useCallback((newItem, count = 1) => {
        setInventory(prev => {
            let remaining = count;
            let updatedInv = [...prev];
            let added = false;

            if (newItem.stackable !== false) {
                for (let i = 0; i < updatedInv.length; i++) {
                    if (updatedInv[i] && updatedInv[i].item.id === newItem.id) {
                        updatedInv[i] = {
                            ...updatedInv[i],
                            count: updatedInv[i].count + remaining
                        };
                        remaining = 0;
                        added = true;
                        break;
                    }
                }
            }

            if (remaining > 0) {
                for (let i = 0; i < updatedInv.length; i++) {
                    if (updatedInv[i] === null) {
                        updatedInv[i] = { item: newItem, count: remaining };
                        remaining = 0;
                        added = true;
                        break;
                    }
                }
            }

            return added ? updatedInv : prev;
        });
        return true; // Simplified for now
    }, []);

    const removeItem = useCallback((index, count = 1) => {
        setInventory(prev => {
            const newInv = [...prev];
            if (!newInv[index]) return prev;

            if (newInv[index].count > count) {
                newInv[index] = { ...newInv[index], count: newInv[index].count - count };
            } else {
                newInv[index] = null;
            }
            return newInv;
        });
    }, []);

    const swapInventorySlots = useCallback((indexA, indexB) => {
        setInventory(prev => {
            const newInv = [...prev];
            const temp = newInv[indexA];
            newInv[indexA] = newInv[indexB];
            newInv[indexB] = temp;
            return newInv;
        });
    }, []);

    const swapStashSlots = useCallback((indexA, indexB) => {
        setStash(prev => {
            const newStash = [...prev];
            const temp = newStash[indexA];
            newStash[indexA] = newStash[indexB];
            newStash[indexB] = temp;
            return newStash;
        });
    }, []);

    // FIXED: No nested setState - calculate changes, then apply sequentially
    const moveToStashSlot = useCallback((inventoryIndex, stashIndex) => {
        // Read current states
        const sourceItem = inventory[inventoryIndex];
        const targetItem = stash[stashIndex];
        
        if (!sourceItem) return;

        // Calculate new states
        const newInventory = [...inventory];
        const newStash = [...stash];

        // Case 1: Target is empty
        if (!targetItem) {
            newStash[stashIndex] = sourceItem;
            newInventory[inventoryIndex] = null;
        }
        // Case 2: Same item, stackable
        else if (targetItem.item.id === sourceItem.item.id && sourceItem.item.stackable !== false) {
            newStash[stashIndex] = {
                ...targetItem,
                count: targetItem.count + sourceItem.count
            };
            newInventory[inventoryIndex] = null;
        }
        // Case 3: Different items, swap
        else {
            newStash[stashIndex] = sourceItem;
            newInventory[inventoryIndex] = targetItem;
        }

        // Apply updates
        setInventory(newInventory);
        setStash(newStash);
    }, [inventory, stash]);

    const takeFromStashToSlot = useCallback((stashIndex, inventoryIndex) => {
        // Read current states
        const sourceItem = stash[stashIndex];
        const targetItem = inventory[inventoryIndex];
        
        if (!sourceItem) return;

        // Calculate new states
        const newInventory = [...inventory];
        const newStash = [...stash];

        // Case 1: Target is empty
        if (!targetItem) {
            newInventory[inventoryIndex] = sourceItem;
            newStash[stashIndex] = null;
        }
        // Case 2: Same item, stackable
        else if (targetItem.item.id === sourceItem.item.id && sourceItem.item.stackable !== false) {
            newInventory[inventoryIndex] = {
                ...targetItem,
                count: targetItem.count + sourceItem.count
            };
            newStash[stashIndex] = null;
        }
        // Case 3: Different items, swap
        else {
            newInventory[inventoryIndex] = sourceItem;
            newStash[stashIndex] = targetItem;
        }

        // Apply updates
        setInventory(newInventory);
        setStash(newStash);
    }, [inventory, stash]);

    const moveToStash = useCallback((index) => {
        const emptyIndex = stash.findIndex(slot => slot === null);
        if (emptyIndex >= 0) {
            moveToStashSlot(index, emptyIndex);
        }
    }, [stash, moveToStashSlot]);

    const takeFromStash = useCallback((index) => {
        const emptyIndex = inventory.findIndex(slot => slot === null);
        if (emptyIndex >= 0) {
            takeFromStashToSlot(index, emptyIndex);
        }
    }, [inventory, takeFromStashToSlot]);

    const hasItem = useCallback((itemId) => {
        return inventory.find(slot => slot && slot.item.id === itemId);
    }, [inventory]);

    return {
        inventory,
        setInventory,
        stash,
        addItem,
        removeItem,
        swapInventorySlots,
        swapStashSlots,
        moveToStashSlot,
        takeFromStashToSlot,
        moveToStash,
        takeFromStash,
        hasItem,
        INVENTORY_SLOTS,
        STASH_SLOTS
    };
};
