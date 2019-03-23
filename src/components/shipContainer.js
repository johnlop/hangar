import React, { Component } from 'react';
import ShipPicker from './shipPicker';
import PilotPicker from './pilotPicker';

export default class ShipContainer extends Component {
    constructor(props) {
        super(props);

        this.state = { faction: props.faction, shipId: 0, key: props.k, deleteShip: props.deleteShip };

        this.changeShip = this.changeShip.bind(this);
        this.deleteShip = this.deleteShip.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.faction !== prevProps.faction) {
            this.setState({ faction: this.props.faction, shipId: 0 });
        }
    }

    changeShip(value) {
        this.setState({ shipId: value });
    }

    deleteShip() {
        this.state.deleteShip(this.state.key);
    }

    render() {
        return (
            <div className="container">
                <ShipPicker faction={this.state.faction} changeShip={this.changeShip} />
                <PilotPicker faction={this.state.faction} shipId={this.state.shipId} />
                <button onClick={this.deleteShip}>x</button>
            </div>
        );
    }
}
