/* eslint-disable no-undef */
export var db = {};

export function load() {
    let factions = require('../data/factions/factions.json');

    db.factions = {};
    for (let f of factions) {
        db.factions[f.xws] = f;
        db.factions[f.xws].ships = [];
    }

    let manifest = require('../data/manifest.json');
    for (let f of manifest.pilots) {
        for (let p of f.ships) {
            let ship = require(`../${p}`);
            ship.statsMap = {};
            for (let s of ship.stats) {
                ship.statsMap[s.type] = s.value;
            }
            db.factions[f.faction].ships.push(ship);
        }
    }

    db.upgrades = {};
    for (let u of manifest.upgrades) {
        let upg = require(`../${u}`);
        let name = u.split('/')[2].replace('.json', '');
        let type = name.replace('-', '');
        upg.unshift({ name: 'No ' + name, cost: { value: 0 }, sides: [{ type: type }] });
        db.upgrades[type] = upg;
    }
}
