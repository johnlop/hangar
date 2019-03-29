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
import { generateNewShip, updateShipData } from './helpers/dbHelper';

export default class App extends Component {
    constructor() {
        super();

        database.load();

        let faction = { xws: 'rebelalliance', name: database.db.factions['rebelalliance'].name };
        let s = this.generateNewSquad(faction);
        this.state = {
            faction: faction,
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
        this.deleteShip = this.deleteShip.bind(this);
        this.copyShip = this.copyShip.bind(this);
        this.changeSquadName = this.changeSquadName.bind(this);
    }

    changeFaction(faction) {
        this.setState({ faction: faction });
    }

    generateNewSquad(faction) {
        let ship = generateNewShip(faction);
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

    changeSquadName(event) {
        let s = this.state.selectedSquad;
        s.name = event.target.value;
        this.setState({ selectedSquad: s });
    }

    updateShip(ship) {
        updateShipData(ship);
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
        let ship = generateNewShip(squad.faction);
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

    deleteShip(ship) {
        let squad = this.state.selectedSquad;
        let idx = 0;
        for (let i in squad.ships) {
            if (squad.ships[i].id === ship.id) {
                idx = i;
                break;
            }
        }
        squad.ships.splice(idx, 1);
        squad.cost -= ship.cost;
        this.setState({ selectedSquad: squad, selectedShip: squad.ships[0] });
    }

    copyShip(ship) {
        let newShip = JSON.parse(JSON.stringify(ship));
        newShip.id = uuidv1();
        let squad = this.state.selectedSquad;
        squad.ships.push(newShip);
        squad.cost += newShip.cost;
        this.setState({ selectedSquad: squad, selectedShip: newShip });
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
                                copyShip={this.copyShip}
                                deleteShip={this.deleteShip}
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
