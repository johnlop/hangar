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
            ship.dialMap = {};
            for (let m of ship.dial) {
                ship.dialMap[m] = true;
            }
            db.factions[f.faction].ships.push(ship);
        }
    }
}
