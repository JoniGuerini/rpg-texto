import eventsData from '../data/events.json';
import enemiesData from '../data/enemies.json';

export const generateEvent = (floor, corridor, rng = Math.random) => {
    // 1. Check for Location Specific Events (High Priority)
    const locationEvent = eventsData.find(e =>
        e.floor === floor &&
        Array.isArray(e.location_specific) &&
        e.location_specific.includes(corridor)
    );

    if (locationEvent) {
        return resolveEventDetails(locationEvent, floor, rng);
    }

    // 2. Filter valid events for this floor (and non-location specific, or repeatable)
    const validEvents = eventsData.filter(e => {
        // Must match floor
        if (e.floor !== floor) return false;

        // If it has specific locations, we shouldn't pick it randomly unless it's also marked repeatable? 
        // Usually location specific means ONLY there. 
        // But the user's example "Trio" has location specific AND probability. 
        // Let's assume if it's location specific, it ONLY happens there.
        // So we filter OUT location_specific events for random generation.
        if (e.location_specific) return false;

        return true;
    });

    // 3. Weighted Random Selection
    const totalWeight = validEvents.reduce((sum, e) => sum + e.probability, 0);
    let randomValue = rng() * totalWeight;

    for (const event of validEvents) {
        randomValue -= event.probability;
        if (randomValue <= 0) {
            return resolveEventDetails(event, floor, rng);
        }
    }

    // Fallback if something goes wrong (or no events found)
    return resolveEventDetails(validEvents[0] || eventsData[0], floor, rng);
};

const resolveEventDetails = (eventTemplate, floor, rng) => {
    const event = { ...eventTemplate };

    if (event.trigger === 'combat') {
        // Try to find enemy in data
        let enemy = enemiesData.find(e => e.name === event.npc_involved || e.id === event.npc_involved);

        if (!enemy) {
            // Generate dynamic enemy if not found
            const difficultyMultiplier = event.difficulty_level === 'médio' ? 1.2 : event.difficulty_level === 'difícil' ? 1.5 : 1.0;

            enemy = {
                id: `dynamic_${event.npc_involved.replace(/\s+/g, '_').toLowerCase()}`,
                name: event.npc_involved || "Inimigo Desconhecido",
                level: floor,
                hp: Math.floor(20 * floor * difficultyMultiplier),
                maxHp: Math.floor(20 * floor * difficultyMultiplier),
                atk: Math.floor(3 * floor * difficultyMultiplier),
                def: Math.floor(1 * floor * difficultyMultiplier),
                spd: Math.floor(2 * floor),
                xp: Math.floor(10 * floor * difficultyMultiplier),
                drops: [] // No drops for dynamic for now
            };
        } else {
            // Clone existing enemy
            enemy = { ...enemy };
        }

        event.enemy = enemy;
    }

    return event;
};
