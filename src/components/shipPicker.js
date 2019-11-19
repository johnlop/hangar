import React from 'react';
import * as database from '../data/database';
import Ship from './ship';

const ShipPicker = ({ ship, updateShip }) => {
    const changeModelId = (event) => {
        let s = ship;
        s.modelId = event.target.value;
        s.pilotId = 0;
        updateShip(s);
    };

    const getShips = (faction) => {
        let arr = [];

        for (let key in database.db.factions[faction].ships) {
            arr.push(
                <option key={key} value={key}>
                    {database.db.factions[faction].ships[key].name}
                </option>,
            );
        }

        return arr;
    };

    const shipOptions = getShips(ship.faction.xws);

    return (
        <div className="block">
            <select value={ship.modelId} onChange={changeModelId}>
                {shipOptions}
            </select>
            <Ship ship={ship} />
        </div>
    );
};

export default ShipPicker;
