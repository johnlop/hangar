import React from 'react';
import * as database from '../data/database';
import { useSquadActions } from '../hooks/commands/useSquadActions';
import { useSquadsSelectors } from '../hooks/selectors/useSquadSelectors';

const FactionPicker = () => {
    const { updateFaction } = useSquadActions();
    const { faction } = useSquadsSelectors();

    const changeFaction = (event) => {
        let faction = { xws: event.target.value, name: database.db.factions[event.target.value].name };
        updateFaction(faction);
    };

    const getFactions = () => {
        let arr = [];

        for (let key in database.db.factions) {
            arr.push(
                <option key={key} value={key}>
                    {database.db.factions[key].name}
                </option>,
            );
        }

        return arr;
    };

    const factionOptions = getFactions();

    return (
        <select value={faction.xws} onChange={changeFaction}>
            {factionOptions}
        </select>
    );
};

export default FactionPicker;
