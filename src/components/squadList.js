import React from 'react';
import SquadListItem from './squadListItem';
import { useSquadsSelectors } from '../hooks/selectors/useSquadSelectors';
import { generateNewSquad } from '../helpers/dbHelper';
import { useSquadActions } from '../hooks/commands/useSquadActions';

const SquadList = () => {
    const { faction, squads, selectedSquad } = useSquadsSelectors();

    const { updateAllSquads, updateSelectedSquad } = useSquadActions();

    const addSquad = () => {
        let newSquad = generateNewSquad(faction);
        squads.push(newSquad);
        updateAllSquads(squads);
    };

    const selectSquad = (squad) => {
        updateSelectedSquad(squad.id);
    };

    return (
        <div>
            {squads &&
                squads.map((squad) => (
                    <SquadListItem
                        key={squad.id}
                        squad={squad}
                        onClick={selectSquad}
                        className={selectedSquad.id === squad.id && 'selected'}
                    />
                ))}
            <button className="cell" onClick={addSquad}>
                ADD SQUAD
            </button>{' '}
        </div>
    );
};

export default SquadList;
