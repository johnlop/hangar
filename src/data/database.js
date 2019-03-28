/* eslint-disable no-undef */
import React from 'react';

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

            for (let p of ship.pilots) {
                p.ability = insertIcons(p.ability);
                if (p.shipAbility) {
                    p.shipAbility.text = insertIcons(p.shipAbility.text);
                }
            }
        }
    }

    db.upgrades = {};
    for (let u of manifest.upgrades) {
        let upg = require(`../${u}`);
        let name = u.split('/')[2].replace('.json', '');
        let type = name.replace('-', '');
        upg.unshift({ name: 'No ' + name, cost: { value: 0 }, sides: [{ type: type }] });
        db.upgrades[type] = upg;

        for (let up of upg) {
            if (up.sides[0].ability) {
                up.sides[0].ability = insertIcons(up.sides[0].ability);
            }
        }
    }
}

function isEven(value) {
    if (value % 2 == 0) return true;
    else return false;
}

function insertIcons(text) {
    if (!text) return text;

    let arr = [];
    let sp = text.split(/\[|\]/g);
    for (let i in sp) {
        if (isEven(i)) {
            arr.push(<span>{sp[i]}</span>);
        } else {
            let c = 'xwing-miniatures-font xwing-miniatures-font-' + sp[i].toLowerCase().replace(/ /g, '');
            arr.push(<i className={c} />);
        }
    }
    return arr;
}
