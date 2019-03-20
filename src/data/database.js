export var db = {};

export function load() {

    let factions = require('../data/factions/factions.json');

    db.factions = {};
    for(let f of factions){
        db.factions[f.xws] = f;
        db.factions[f.xws].ships = {};
    }

    let manifest = require('../data/manifest.json');
    for(let f of manifest.pilots){
        for(let p of f.ships){
            let ship = require(`../${p}`);
            db.factions[f.faction].ships[ship.xws] = ship;
        }
    }
}
