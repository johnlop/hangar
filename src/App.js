import React, { Component } from 'react';
import './App.css';
import * as database from './data/database';
import FactionPicker from './components/factionPicker';
import ShipPicker from './components/shipPicker';
import PilotPicker from './components/pilotPicker';

export default class App extends Component {

    constructor() {
        super();
        database.load();

        this.state = {faction: 'rebelalliance', ship: Object.keys(database.db.factions['rebelalliance'].ships)[0]};

        this.changeFaction = this.changeFaction.bind(this);
        this.changeShip = this.changeShip.bind(this);
    }

    changeFaction(value) {
        this.setState({faction: value, ship: Object.keys(database.db.factions[value].ships)[0]});
    }

    changeShip(value) {
        this.setState({ship: value});
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    Hello
                    <FactionPicker faction={this.state.faction} changeFaction={this.changeFaction}></FactionPicker>
                    <ShipPicker faction={this.state.faction} changeShip={this.changeShip}></ShipPicker>
                    <PilotPicker faction={this.state.faction} ship={this.state.ship}></PilotPicker>
                </header>
            </div>
        );
    }
}