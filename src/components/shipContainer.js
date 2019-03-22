import React, { Component } from 'react';
import ShipPicker from './shipPicker';
import PilotPicker from './pilotPicker';

export default class ShipContainer extends Component {
    constructor(props) {
        super(props);

        this.state = { faction: props.faction, shipId: 0, pilot: 0 };

        this.changeShip = this.changeShip.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.faction !== prevProps.faction) {
            this.setState({ faction: this.props.faction, shipId: 0, pilot: 0 });
        }
    }

    changeShip(value) {
        this.setState({ shipId: value, pilot: 0 });
    }

    render() {
        return (
            <div>
                <ShipPicker faction={this.state.faction} changeShip={this.changeShip} />
                <PilotPicker faction={this.state.faction} shipId={this.state.shipId} />
            </div>
        );
    }
}
