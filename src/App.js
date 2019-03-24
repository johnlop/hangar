import React, { Component } from 'react';
import './App.css';
import './fonts/xwing-miniatures.css';
import * as database from './data/database';
import FactionPicker from './components/factionPicker';
import ShipContainer from './components/shipContainer';
import ShipList from './components/shipList';
import getQuote from './data/quotes';
import { addShip } from './redux/actions';
import uuidv1 from 'uuid';
import { connect } from 'react-redux';

function mapDispatchToProps(dispatch) {
    return {
        addShip: (ship) => dispatch(addShip(ship)),
    };
}

class ConnectedApp extends Component {
    constructor() {
        super();

        database.load();
        database.lists.push({
            ships: [],
        });

        this.state = { faction: 'rebelalliance', ships: [] };
        this.shipSeq = 0;

        this.changeFaction = this.changeFaction.bind(this);
        this.addShip = this.addShip.bind(this);
        this.deleteShip = this.deleteShip.bind(this);
    }

    changeFaction(value) {
        this.setState({ faction: value, ships: [] });
        this.shipSeq = 0;
    }

    addShip() {
        this.props.addShip({ title: 'new ship', id: uuidv1() });
    }

    deleteShip(i) {
        let s = database.lists[0].ships;
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
                    <div className="column">
                        <ShipList />
                    </div>
                    <div className="column">
                        {this.state.ships.map((s, i) => (
                            <ShipContainer key={i} k={i} faction={this.state.faction} deleteShip={this.deleteShip} />
                        ))}
                    </div>
                    <button onClick={this.addShip}>+</button>
                </div>
                <div className="footer">
                    <span className="fluff">{getQuote()}</span>
                </div>
            </div>
        );
    }
}

const App = connect(
    null,
    mapDispatchToProps,
)(ConnectedApp);

export default App;
