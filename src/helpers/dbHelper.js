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
