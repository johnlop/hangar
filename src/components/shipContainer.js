import React, { Component } from 'react';
import ShipPicker from './shipPicker';
import PilotPicker from './pilotPicker';

export default class ShipContainer extends Component {
    constructor(props) {
        super(props);

        this.state = { ship: props.ship };

        this.updateShip = this.updateShip.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.ship !== prevProps.ship) {
            this.setState({ ship: this.props.ship });
        }
    }

    updateShip(value) {
        this.setState({ ship: value });
        this.props.updateShip(value);
    }

    render() {
        return (
            <div className="container">
                <ShipPicker ship={this.state.ship} updateShip={this.updateShip} />
                <PilotPicker ship={this.state.ship} updateShip={this.updateShip} />
            </div>
        );
    }
}
