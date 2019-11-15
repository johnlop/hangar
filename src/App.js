import React, { useState } from 'react';
import './App.css';
import * as database from './data/database';
import FactionPicker from './components/factionPicker';
import ShipContainer from './components/shipContainer';
import ShipListItem from './components/shipListItem';
import SquadListItem from './components/squadListItem';
import getQuote from './data/quotes';
import { generateNewShip, updateShipData, generateNewSquad } from './helpers/dbHelper';

const App = () => {
    database.load();

    const [faction, setFaction] = useState({ xws: 'rebelalliance', name: database.db.factions['rebelalliance'].name });
    let s = generateNewSquad(faction);
    const [squads, setSquads] = useState([s]);
    const [selectedSquad, setSelectedSquad] = useState(s);
    const [selectedShip, setSelectedShip] = useState(s.ships[0]);

    const changeFaction = (f) => {
        setFaction(f);
    };

    const changeSquadName = (event) => {
        selectedSquad.name = event.target.value;
        setSelectedSquad(selectedSquad);
    };

    const updateShip = (ship) => {
        updateShipData(ship);
        selectedSquad.cost = 0;
        for (let s in selectedSquad.ships) {
            selectedSquad.cost += selectedSquad.ships[s].cost;
            if (selectedSquad.ships[s].id === ship.id) {
                selectedSquad.ships[s] = ship;
            }
        }
        setSelectedSquad(selectedSquad);
    };

    const addSquad = () => {
        let squad = generateNewSquad(faction);
        squads.push(squad);
        setSquads(squads);
        setSelectedSquad(squad);
        setSelectedShip(squad.ships[0]);
    };

    const selectSquad = (squad) => {
        setSelectedSquad(squad);
        setSelectedShip(squad.ships[0]);
    };

    const addShip = () => {
        let squad = selectedSquad;
        let ship = generateNewShip(squad.faction);
        squad.ships.push(ship);
        squad.cost = 0;
        for (let s in squad.ships) {
            squad.cost += squad.ships[s].cost;
        }
        setSelectedSquad(squad);
        setSelectedShip(ship);
    };

    const selectShip = (ship) => {
        setSelectedShip(ship);
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
        let selected = null;
        if (selectedSquad.ships.length > 0) {
            selected = selectedSquad.ships[0];
        }
        setSelectedSquad(selectedSquad);
        setSelectedShip(selected);
    };

    const copyShip = (ship) => {
        let newShip = generateNewShip(ship.faction, ship.modelId, ship.pilotId, ship.upgradeIds.splice(0));
        selectedSquad.ships.push(newShip);
        selectedSquad.cost += newShip.cost;
        setSelectedSquad(selectedSquad);
        setSelectedShip(newShip);
    };

    return (
        <div className="app">
            <div className="body">
                <div className="list">
                    <div className="header">
                        <div className="logo">[19]</div>
                        <div className="menu">
                            <FactionPicker faction={faction} changeFaction={changeFaction} />
                        </div>
                    </div>
                    {squads.map((el) => (
                        <SquadListItem
                            key={el.id}
                            squad={el}
                            onItemClick={selectSquad}
                            className={selectedSquad.id === el.id && 'selected'}
                        />
                    ))}
                    <button className="cell" onClick={addSquad}>
                        ADD SQUAD
                    </button>
                </div>
                <div className="list">
                    <div className="header">
                        <div className="menu">
                            <input type="text" value={selectedSquad.name} onChange={changeSquadName} />
                        </div>
                    </div>
                    {selectedSquad.ships.map((el) => (
                        <ShipListItem
                            key={el.id}
                            initialShip={el}
                            onItemClick={selectShip}
                            copyShip={copyShip}
                            deleteShip={deleteShip}
                            className={selectedShip.id === el.id && 'selected'}
                        />
                    ))}
                    <button className="cell" onClick={addShip}>
                        ADD SHIP
                    </button>
                </div>
                {selectedShip ? (
                    <div>
                        <ShipContainer ship={selectedShip} updateShip={updateShip} />
                    </div>
                ) : null}
            </div>
            <div className="footer">
                <span className="fluff">{getQuote()}</span>
            </div>
        </div>
    );
};

export default App;
