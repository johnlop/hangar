import React, { Component } from 'react';
import './App.css';
import * as database from './data/database';
import FactionPicker from './components/factionPicker';
import ShipPicker from './components/shipPicker';
import PilotPicker from './components/pilotPicker';
import Pilot from './components/pilot';
import Ship from './components/ship';

export default class App extends Component {

    constructor() {
        super();
        database.load();

        this.state = {faction: 'rebelalliance', ship: 0, pilot: 0};

        this.changeFaction = this.changeFaction.bind(this);
        this.changeShip = this.changeShip.bind(this);
        this.changePilot = this.changePilot.bind(this);
    }

    changeFaction(value) {
        this.setState({faction: value, ship: 0, pilot: 0});
    }

    changeShip(value) {
        this.setState({ship: value, pilot: 0});
    }

    changePilot(value) {
        this.setState({pilot: value});
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <FactionPicker faction={this.state.faction} changeFaction={this.changeFaction}></FactionPicker>
                    <ShipPicker faction={this.state.faction} changeShip={this.changeShip}></ShipPicker>
                    <PilotPicker faction={this.state.faction} ship={this.state.ship} changePilot={this.changePilot}></PilotPicker>
                    <Ship faction={this.state.faction} ship={this.state.ship}></Ship>
                    <Pilot faction={this.state.faction} ship={this.state.ship} pilot={this.state.pilot}></Pilot>
                </header>
            </div>
        );
    }
}