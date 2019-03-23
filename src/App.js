import React, { Component } from 'react';
import './App.css';
import './fonts/xwing-miniatures.css';
import * as database from './data/database';
import FactionPicker from './components/factionPicker';
import ShipContainer from './components/shipContainer';
import getQuote from './data/quotes';

export default class App extends Component {
    constructor() {
        super();
        database.load();

        this.state = { faction: 'rebelalliance', ship: 0, pilot: 0 };

        this.changeFaction = this.changeFaction.bind(this);
        this.changeShip = this.changeShip.bind(this);
        this.changePilot = this.changePilot.bind(this);
    }

    changeFaction(value) {
        this.setState({ faction: value, ship: 0, pilot: 0 });
    }

    changeShip(value) {
        this.setState({ ship: value, pilot: 0 });
    }

    changePilot(value) {
        this.setState({ pilot: value });
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
                    <ShipContainer faction={this.state.faction} />
                    <ShipContainer faction={this.state.faction} />
                </div>
                <div className="footer">
                    <span className="fluff">{getQuote()}</span>
                </div>
            </div>
        );
    }
}
