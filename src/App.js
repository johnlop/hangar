import React, { Component } from 'react';
import './App.css';
import './fonts/xwing-miniatures.css';
import * as database from './data/database';
import FactionPicker from './components/factionPicker';
import ShipContainer from './components/shipContainer';
import ShipListItem from './components/shipListItem';
import getQuote from './data/quotes';
import uuidv1 from 'uuid';
import { getUpgradeCost } from './helpers/dbHelper';

export default class App extends Component {
    constructor() {
        super();

        database.load();

        let s = this.generateNewShip('rebelalliance');
        this.state = {
            faction: 'rebelalliance',
            ships: [s],
            selectedShip: s,
        };

        this.changeFaction = this.changeFaction.bind(this);
        this.addShip = this.addShip.bind(this);
        this.selectShip = this.selectShip.bind(this);
        this.updateShip = this.updateShip.bind(this);
    }

    changeFaction(value) {
        let s = [
            {
                id: uuidv1(),
                faction: value,
                modelId: 0,
                pilotId: 0,
                upgradeIds: {},
                upgrades: {},
            },
        ];
        this.setState({
            faction: value,
            ships: s,
            selectedShip: s[0],
        });
    }

    generateNewShip(faction) {
        let s = {
            id: uuidv1(),
            faction: faction,
            modelId: 0,
            pilotId: 0,
            upgradeIds: {},
            upgrades: {},
        };
        this.processShipData(s);
        return s;
    }

    processShipData(ship) {
        ship.model = database.db.factions[ship.faction].ships[ship.modelId];
        ship.pilot = database.db.factions[ship.faction].ships[ship.modelId].pilots[ship.pilotId];

        ship.totalCost = ship.pilot.cost;

        for (let s of ship.pilot.slots) {
            let ss = s.toLowerCase().replace(/ /g, '');
            if (ship.upgradeIds[ss] === undefined) {
                ship.upgradeIds[ss] = 0;
            }
            ship.upgrades[ss] = database.db.upgrades[ss][ship.upgradeIds[ss]];
            ship.totalCost += getUpgradeCost(ship, ship.upgrades[ss]);
        }
    }

    updateShip(value) {
        this.processShipData(value);
        let ships = this.state.ships;
        for (let s in ships) {
            if (ships[s].id === value.id) {
                ships[s] = value;
                break;
            }
        }
        this.setState({ ships: ships });
    }

    addShip() {
        let ships = this.state.ships;
        let ship = this.generateNewShip(this.state.faction);
        ships.push(ship);
        this.setState({ ships: ships, selectedShip: ship });
    }

    selectShip(value) {
        this.setState({ selectedShip: value });
    }

    render() {
        return (
            <div className="app">
                <div className="header">
                    <div className="logo">HANGAR 19</div>
                    <div className="menu">
                        <FactionPicker faction={this.state.faction} changeFaction={this.changeFaction} />
                    </div>
                </div>
                <div className="body">
                    <div className="column thin">
                        {this.state.ships.map((el) => (
                            <ShipListItem
                                key={el.id}
                                ship={el}
                                onItemClick={this.selectShip}
                                className={this.state.selectedShip.id === el.id && 'selected'}
                            />
                        ))}
                        <button className="cell" onClick={this.addShip}>
                            +
                        </button>
                    </div>
                    <div className="column">
                        <ShipContainer ship={this.state.selectedShip} updateShip={this.updateShip} />
                    </div>
                </div>
                <div className="footer">
                    <span className="fluff">{getQuote()}</span>
                </div>
            </div>
        );
    }
}
