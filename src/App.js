import React, { useState, useEffect } from 'react';
import './App.css';
import * as database from './data/database';
import FactionPicker from './components/factionPicker';
import ShipContainer from './components/shipContainer';
import getQuote from './data/quotes';
import { updateShipData, generateNewSquad } from './helpers/dbHelper';
import { useSquadActions } from './hooks/commands/useSquadActions';
import SquadList from './components/squadList';
import ShipList from './components/shipList';
import { useSquadsSelectors } from './hooks/selectors/useSquadSelectors';

const App = () => {
    database.load();

    const [faction, setFaction] = useState({ xws: 'rebelalliance', name: database.db.factions['rebelalliance'].name });

    const { updateAllSquads, updateSelectedSquad, updateSelectedShip, updateShip, updateSquad } = useSquadActions();
    const { selectedSquad, selectedShip } = useSquadsSelectors();

    useEffect(() => {
        let s = generateNewSquad(faction);
        updateAllSquads([s]);
        updateSelectedSquad(s.id);
        updateSelectedShip(0);
    }, []);

    const changeFaction = (f) => {
        setFaction(f);
    };

    console.log(selectedSquad);
    const updateShipInfo = (ship) => {
        updateShipData(ship);
        selectedSquad.cost = 0;
        for (let s in selectedSquad.ships) {
            selectedSquad.cost += selectedSquad.ships[s].cost;
            if (selectedSquad.ships[s].id === ship.id) {
                selectedSquad.ships[s] = ship;
            }
        }
        updateShip(ship);
        updateSquad(selectedSquad);
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
                    <SquadList />
                </div>
                {selectedSquad && <ShipList />}
                {selectedShip && (
                    <div>
                        <ShipContainer ship={selectedShip} updateShip={updateShipInfo} />
                    </div>
                )}
            </div>
            <div className="footer">
                <span className="fluff">{getQuote()}</span>
            </div>
        </div>
    );
};

export default App;
