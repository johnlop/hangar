import uuidv1 from 'uuid';
import * as database from '../data/database';

export function getUpgradeCost(ship, upgrade) {
    let cost = 999;
    if (upgrade.cost) {
        if (upgrade.cost.value !== undefined) {
            cost = upgrade.cost.value;
        } else if (upgrade.cost.variable) {
            let stat = upgrade.cost.variable;
            if (stat === 'initiative') {
                cost = upgrade.cost.values[ship.pilot.initiative];
            } else if (stat === 'size') {
                cost = upgrade.cost.values[ship.model.size];
            } else {
                cost = upgrade.cost.values[ship.model.statsMap[stat]];
            }
        }
    }
    return cost;
}

export function generateNewShip(faction) {
    let ship = {
        id: uuidv1(),
        faction: faction,
        modelId: 0,
        pilotId: 0,
        upgradeIds: [],
        upgrades: [],
    };
    ship.model = database.db.factions[ship.faction.xws].ships[ship.modelId];
    ship.pilot = database.db.factions[ship.faction.xws].ships[ship.modelId].pilots[ship.pilotId];

    for (let s of ship.pilot.slots) {
        let type = s.toLowerCase().replace(/ /g, '');
        ship.upgradeIds.push(0);
        let upg = database.db.upgrades[type][0];
        ship.upgrades.push(upg);
    }

    processShipData(ship);

    return ship;
}

export function processShipData(ship) {
    ship.model = database.db.factions[ship.faction.xws].ships[ship.modelId];
    ship.pilot = database.db.factions[ship.faction.xws].ships[ship.modelId].pilots[ship.pilotId];

    ship.cost = ship.pilot.cost;

    for (let u of ship.upgrades) {
        ship.cost += getUpgradeCost(ship, u);
    }
}
