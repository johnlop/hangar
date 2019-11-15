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

export function generateNewShip(faction, modelId = 0, pilotId = 0, upgradesIds = []) {
    let ship = {
        id: uuidv1(),
        faction: faction,
    };

    setDefaultPilotModel(ship, modelId, pilotId);
    setDefaultUpgrades(ship, upgradesIds);
    setStats(ship);
    updateShipData(ship);

    return ship;
}

export function generateNewSquad(faction) {
    let ship = generateNewShip(faction);
    let s = {
        id: uuidv1(),
        faction: faction,
        ships: [ship],
        cost: ship.cost,
        type: 'Extended',
        name: 'New squad',
    };
    return s;
}

export function setDefaultPilotModel(ship, modelId = 0, pilotId = 0) {
    ship.modelId = modelId;
    ship.pilotId = pilotId;

    ship.model = database.db.factions[ship.faction.xws].ships[ship.modelId];
    ship.pilot = database.db.factions[ship.faction.xws].ships[ship.modelId].pilots[ship.pilotId];
}

export function setDefaultUpgrades(ship, upgradesIds = []) {
    ship.upgradeIds = upgradesIds;
    ship.upgrades = [];

    for (let i in ship.pilot.slots) {
        let s = ship.pilot.slots[i];
        let type = s.toLowerCase().replace(/ /g, '');
        if (ship.upgradeIds[i] === undefined) {
            ship.upgradeIds.push(0);
        }
        let upg = database.db.upgrades[type][ship.upgradeIds[i]];
        ship.upgrades.push(upg);
    }
}

export function setStats(ship) {
    ship.stats = ship.model.stats.slice(0);

    if (ship.pilot.force) {
        ship.stats.push({ type: 'force', ...ship.pilot.force });
    }
    if (ship.pilot.charges) {
        ship.stats.push({ type: 'charges', ...ship.pilot.charges });
    }

    ship.dial = ship.model.dial.slice(0);

    ship.actions = ship.model.actions.slice(0);

    for (let u of ship.upgrades) {
        for (let s of u.sides) {
            if (s.grants) {
                for (let g of s.grants) {
                    if (g.type === 'action') {
                        ship.actions.push(g.value);
                    } else if (g.type === 'stat') {
                        for (let st of ship.stats) {
                            if (st.type === g.value) {
                                st.value += g.amount;
                                break;
                            }
                        }
                    }
                }
            }
        }
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
    setStats(ship);

    ship.cost = ship.pilot.cost;

    for (let u of ship.upgrades) {
        ship.cost += getUpgradeCost(ship, u);
    }
}
