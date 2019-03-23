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

        this.state = { faction: 'rebelalliance', ships: [{}] };
        this.shipSeq = 1;
        this.changeFaction = this.changeFaction.bind(this);
        this.addShip = this.addShip.bind(this);
        this.deleteShip = this.deleteShip.bind(this);
    }

    changeFaction(value) {
        this.setState({ faction: value, ships: [] });
        this.shipSeq = 0;
    }

    addShip() {
        let s = this.state.ships;
        s.push({});
        this.setState({ ships: s });
    }

    deleteShip(i) {
        let s = this.state.ships;
        s.splice(i, 1);
        this.setState({ ships: s });
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
                    {this.state.ships.map((s, i) => <ShipContainer key={i} k={i} faction={this.state.faction} deleteShip={this.deleteShip} />)}
                    <button onClick={this.addShip}>+</button>
                </div>
                <div className="footer">
                    <span className="fluff">{getQuote()}</span>
                </div>
            </div>
        );
    }
}
