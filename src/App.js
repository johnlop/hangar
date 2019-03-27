import React, { Component } from 'react';
import './App.css';
import './fonts/xwing-miniatures.css';
import * as database from './data/database';
import FactionPicker from './components/factionPicker';
import ShipContainer from './components/shipContainer';
import ShipListItem from './components/shipListItem';
import SquadListItem from './components/squadListItem';
import getQuote from './data/quotes';
import uuidv1 from 'uuid';
import { getUpgradeCost } from './helpers/dbHelper';

export default class App extends Component {
    constructor() {
        super();

        database.load();

        let s = this.generateNewSquad('rebelalliance');
        this.state = {
            faction: 'rebelalliance',
            squads: [s],
            selectedSquad: s,
            selectedShip: s.ships[0],
        };

        this.changeFaction = this.changeFaction.bind(this);
        this.addSquad = this.addSquad.bind(this);
        this.selectSquad = this.selectSquad.bind(this);
        this.addShip = this.addShip.bind(this);
        this.selectShip = this.selectShip.bind(this);
        this.updateShip = this.updateShip.bind(this);
        this.changeSquadName = this.changeSquadName.bind(this);
    }

    changeFaction(faction) {
        this.setState({ faction: faction });
    }

    generateNewSquad(faction) {
        let ship = this.generateNewShip(faction);
        let s = {
            id: uuidv1(),
            faction: faction,
            ships: [ship],
            cost: ship.cost,
            type: 'Extended',
            name: 'New squad',
        };
        return s;
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

        ship.cost = ship.pilot.cost;

        for (let s of ship.pilot.slots) {
            let type = s.toLowerCase().replace(/ /g, '');
            if (ship.upgradeIds[type] === undefined) {
                ship.upgradeIds[type] = 0;
            }
            ship.upgrades[type] = database.db.upgrades[type][ship.upgradeIds[type]];
            ship.cost += getUpgradeCost(ship, ship.upgrades[type]);
        }
    }

    changeSquadName(event) {
        let s = this.state.selectedSquad;
        s.name = event.target.value;
        this.setState({ selectedSquad: s });
    }

    updateShip(ship) {
        this.processShipData(ship);
        let squad = this.state.selectedSquad;
        squad.cost = 0;
        for (let s in squad.ships) {
            squad.cost += squad.ships[s].cost;
            if (squad.ships[s].id === ship.id) {
                squad.ships[s] = ship;
            }
        }
        this.setState({ selectedSquad: squad });
    }

    addSquad() {
        let squads = this.state.squads;
        let squad = this.generateNewSquad(this.state.faction);
        squads.push(squad);
        this.setState({ squads: squads, selectedSquad: squad, selectedShip: squad.ships[0] });
    }

    selectSquad(squad) {
        this.setState({ selectedSquad: squad, selectedShip: squad.ships[0] });
    }

    addShip() {
        let squad = this.state.selectedSquad;
        let ship = this.generateNewShip(squad.faction);
        squad.ships.push(ship);
        squad.cost = 0;
        for (let s in squad.ships) {
            squad.cost += squad.ships[s].cost;
        }
        this.setState({ selectedSquad: squad, selectedShip: ship });
    }

    selectShip(ship) {
        this.setState({ selectedShip: ship });
    }

    render() {
        return (
            <div className="app">
                <div className="body">
                    <div className="list">
                        <div className="header">
                            <div className="logo">HANGAR 19</div>
                            <div className="menu">
                                <FactionPicker faction={this.state.faction} changeFaction={this.changeFaction} />
                            </div>
                        </div>
                        {this.state.squads.map((el) => (
                            <SquadListItem
                                key={el.id}
                                squad={el}
                                onItemClick={this.selectSquad}
                                className={this.state.selectedSquad.id === el.id && 'selected'}
                            />
                        ))}
                        <button className="cell" onClick={this.addSquad}>
                            ADD SQUAD
                        </button>
                    </div>
                    <div className="list">
                        <div className="header">
                            <div className="menu">
                                <input
                                    type="text"
                                    value={this.state.selectedSquad.name}
                                    onChange={this.changeSquadName}
                                />
                            </div>
                        </div>
                        {this.state.selectedSquad.ships.map((el) => (
                            <ShipListItem
                                key={el.id}
                                ship={el}
                                onItemClick={this.selectShip}
                                className={this.state.selectedShip.id === el.id && 'selected'}
                            />
                        ))}
                        <button className="cell" onClick={this.addShip}>
                            ADD SHIP
                        </button>
                    </div>
                    <div>
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
