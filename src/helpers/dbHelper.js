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
    };

    setDefaultPilotModel(ship);
    setDefaultUpgrades(ship);
    updateShipData(ship);

    return ship;
}

export function setDefaultPilotModel(ship) {
    ship.modelId = 0;
    ship.pilotId = 0;

    ship.model = database.db.factions[ship.faction.xws].ships[ship.modelId];
    ship.pilot = database.db.factions[ship.faction.xws].ships[ship.modelId].pilots[ship.pilotId];
}

export function setDefaultUpgrades(ship) {
    ship.upgradeIds = [];
    ship.upgrades = [];

    for (let s of ship.pilot.slots) {
        let type = s.toLowerCase().replace(/ /g, '');
        ship.upgradeIds.push(0);
        let upg = database.db.upgrades[type][0];
        ship.upgrades.push(upg);
    }
}

export function updateShipData(ship) {
    let newModel = database.db.factions[ship.faction.xws].ships[ship.modelId];
    let newPilot = database.db.factions[ship.faction.xws].ships[ship.modelId].pilots[ship.pilotId];

    if (newModel.xws !== ship.model.xws || newPilot.xws !== ship.pilot.xws) {
        ship.model = newModel;
        ship.pilot = newPilot;
        setDefaultUpgrades(ship);
    } else {
        ship.model = newModel;
        ship.pilot = newPilot;
    }

    ship.cost = ship.pilot.cost;

    for (let u of ship.upgrades) {
        ship.cost += getUpgradeCost(ship, u);
    }
}
