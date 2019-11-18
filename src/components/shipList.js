import React from 'react';
import ShipListItem from './shipListItem';
import { useSquadActions } from '../hooks/commands/useSquadActions';
import { useSquadsSelectors } from '../hooks/selectors/useSquadSelectors';
import { generateNewShip } from '../helpers/dbHelper';

const ShipList = () => {
    const { selectedSquad, selectedShipId } = useSquadsSelectors();
    const { updateSquad, updateSelectedShip } = useSquadActions();

    const addShip = () => {
        let squad = selectedSquad;
        let ship = generateNewShip(squad.faction);
        squad.ships.push(ship);
        squad.cost = 0;
        for (let s in squad.ships) {
            squad.cost += squad.ships[s].cost;
        }
        updateSquad(squad);
        updateSelectedShip(squad.ships.length - 1);
    };

    const selectShip = (id) => {
        updateSelectedShip(id);
    };

    const deleteShip = (ship) => {
        let idx = 0;
        for (let i in selectedSquad.ships) {
            if (selectedSquad.ships[i].id === ship.id) {
                idx = i;
                break;
            }
        }
        selectedSquad.ships.splice(idx, 1);
        selectedSquad.cost -= ship.cost;
        updateSquad(selectedSquad);
        updateSelectedShip(selectedSquad.ships.length - 1);
    };

    const copyShip = (ship) => {
        let newShip = generateNewShip(ship.faction, ship.modelId, ship.pilotId, ship.upgradeIds.splice(0));
        selectedSquad.ships.push(newShip);
        selectedSquad.cost += newShip.cost;
        updateSquad(selectedSquad);
        updateSelectedShip(selectedSquad.ships.length - 1);
    };

    const changeSquadName = (event) => {
        selectedSquad.name = event.target.value;
        updateSquad(selectedSquad);
    };

    return (
        <div className="list">
            <div className="header">
                <div className="menu">
                    <input type="text" value={selectedSquad.name} onChange={changeSquadName} />
                </div>
            </div>
            {selectedSquad.ships &&
                selectedSquad.ships.map((ship, idx) => (
                    <ShipListItem
                        key={idx}
                        initialShip={ship}
                        onItemClick={() => selectShip(idx)}
                        copyShip={copyShip}
                        deleteShip={() => deleteShip(idx)}
                        className={selectedShipId == idx && 'selected'}
                    />
                ))}
            <button className="cell" onClick={addShip}>
                ADD SHIP
            </button>
        </div>
    );
};

export default ShipList;
